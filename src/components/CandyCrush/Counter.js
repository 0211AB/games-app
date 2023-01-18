import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'
import useUserStore from '../../store/user';

const Counter = ({ score }) => {
    const [counter, setCounter] = useState(90)
    const [loading, setLoading] = useState(false)
    const token = useUserStore(state => state.token)
    const getUser = useUserStore(state => state.getUser)
    const navigate = useNavigate()

    // Third Attempts
    useEffect(() => {
        const updateScore = async () => {
            var ans = 0;
            if (score > 300)
                ans = 5;
            else if (score > 250)
                ans = 4;
            else if (score > 200)
                ans = 3;
            else if (score > 150)
                ans = 2;
            else if (score > 100)
                ans = 1;


            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-score`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer :${token}`,
                },
                body: JSON.stringify({ game: 'CC', score: ans, total: score }),
            });

            // getUser(token)

            setLoading(false);
            if (res.status === 200) {
                navigate("/");
            } else {
                alert("Could Not Sign In ");
            }
        }

        if (loading)
            updateScore();
    }, [loading])

    useEffect(() => {

        if (counter <= 0) {
            setLoading(true);
        }

        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    if (loading)
        return <Loader />
    return (
        <h3>Time Remaining: {counter} seconds</h3>
    );
}

export default Counter