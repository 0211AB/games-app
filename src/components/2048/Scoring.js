import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../Main/NavBar/NavBar'

const Scoring = () => {
    return (
        <>
            <NavBar />
            <div className='scoring'>
                <h1>Scoring System</h1>
                <br></br>
                <h3>You must combine tiles containing the same numbers until they reach the number 2048. The tiles can contain only integer values starting from 2, and that are a power of two, like 2, 4, 8, 16, 32, and so on.</h3>
                <br></br>
                <h3>The user's score starts at zero, and is increased whenever two tiles combine, by the value of the new tile</h3>
                <h3>Use Your Arrow Keys To Move The Tiles</h3>
                <br></br>
                <Link to='/2048'>Start Game</Link>
            </div>
        </>
    )
}

export default Scoring