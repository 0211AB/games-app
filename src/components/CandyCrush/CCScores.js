import React from 'react'
import NavBar from '../Main/NavBar/NavBar'
import './CandyCrush.css'
import { Link } from 'react-router-dom'

const CCScores = () => {
    return (
        <>
            <NavBar />
            <div className='scoring'>
                <h1>Scoring System</h1>
                <br></br>
                <h3>You will have a total time of 90s. You can connect candies in rows and colums of 4 or 3 to earn points</h3>
                <br></br>
                <h3>If scored points {`>`} 300 you get 5 points</h3>
                <h3>If scored points {`<`} 300  and scored points {`>`} 250 you get 4 points</h3>
                <h3>If scored points {`<`} 250  and scored points {`>`} 200 you get 3 points</h3>
                <h3>If scored points {`<`} 200  and scored points {`>`} 150 you get 2 points</h3>
                <h3>If scored points {`>`} 150 you get 1 points</h3>
                <br></br>
                <Link to='game'>Start Game</Link>
            </div>
        </>
    )
}

export default CCScores