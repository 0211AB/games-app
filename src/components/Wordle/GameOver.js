import React, { useContext } from 'react'
import { BoardContext } from './Wordle'

const GameOver = () => {
    const { gameOver, correctWord, currentAttempt } = useContext(BoardContext)
    return (
        <div className='gameOver'>
            <h1>{gameOver.guessedWord ? "Guessed Correctly" : " You Failed To Guess The Word Correctly"}</h1>
            <h2>Correct Word: {correctWord.toUpperCase()}</h2>
            {gameOver.guessedWord && (
                <h2>You guessed in {currentAttempt.attempt} attempts</h2>
            )}
        </div>
    )
}

export default GameOver