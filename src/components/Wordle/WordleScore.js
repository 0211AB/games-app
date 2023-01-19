import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../Main/NavBar/NavBar'

const WordleScore = () => {
    return (
        <>
            <NavBar />
            <div className='scoring'>
                <h1>Scoring System</h1>
                <br></br>
                <h3>You will have a total of 6 tries . You can guess any valid 5 letter word .</h3>
                <br></br>
                <h3>If you guess in 1 try , you get 5 points</h3>
                <h3>If you guess in 2 try , you get 4 points</h3>
                <h3>If you guess in 3 try , you get 3 points</h3>
                <h3>If you guess in 4 try , you get 2 points</h3>
                <h3>If you guess in 5 try , you get 1 points</h3>
                <br></br>
                <Link to='game'>Start Game</Link>
            </div>
        </>
    )
}

export default WordleScore