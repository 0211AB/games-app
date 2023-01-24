import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../store/user'
import Loader from '../Loader/Loader'

const Stats = ({ score, loading }) => {
    const user = useUserStore((state) => state.user)
    const token = useUserStore(state => state.token)
    const getUser = useUserStore(state => state.getUser)
    const navigate = useNavigate()

    useEffect(() => {
        const updateScore = async () => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-score`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer :${token}`,
                },
                body: JSON.stringify({ game: '2048', score }),
            });

            getUser(token)

            if (res.status === 200) {
                navigate("/2048/rules");
            } else {
                alert("Could Not Save Scores ");
            }
        }

        if (loading)
            updateScore();
    }, [loading])

    if (loading)
        return <Loader />

    return (
        <div className='stats'>
            <h1>2048</h1>
            <h3>Name : {user.name}</h3>
            <h3>Score: {score}</h3>
            <h3>HighScore:{user.tzfe.highScore}</h3>
        </div>
    )
}

export default Stats