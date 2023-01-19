import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../store/user'
import Loader from '../Loader/Loader'
import { BoardContext } from './Wordle'

const GameOver = () => {
    const { gameOver, correctWord, currentAttempt } = useContext(BoardContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const token = useUserStore(state => state.token)
    const getUser = useUserStore(state => state.getUser)

    useEffect(() => {
        const updateScore = async () => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-score`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer :${token}`,
                },
                body: JSON.stringify(data),
            });

            getUser(token)

            setLoading(false);
            if (res.status === 200) {
                navigate("/wordle");
            } else {
                alert("Could Not Save Scores ");
            }
        }

        if (data !== null)
            updateScore()

    }, [data])

    if (loading)
        return <Loader />

    return (
        <div className='gameOver'>
            <h1>{gameOver.guessedWord ? "Guessed Correctly" : " You Failed To Guess The Word Correctly"}</h1>
            <h2>Correct Word: {correctWord.toUpperCase()}</h2>
            {gameOver.guessedWord && (
                <h2>You guessed in {currentAttempt.attempt} attempts</h2>
            )}
            <h2 className='continue' onClick={() => {
                setData({ game: 'WDLE', score: currentAttempt.attempt })
                setLoading(true)
            }}> Click here To Continue</h2>
        </div>
    )
}

export default GameOver