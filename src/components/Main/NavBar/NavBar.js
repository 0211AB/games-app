import React from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()

    return (
        <header>
            <div className="logo" onClick={() => {
                navigate('/')
            }}>
                <ion-icon name="game-controller"></ion-icon>
                <p>The Game Zone</p>
            </div>
            <button onClick={() => {
                navigate('/leaderboard')
            }}
                type="button" id="btn">LEADERBOARD</button>
        </header>
    )
}

export default NavBar