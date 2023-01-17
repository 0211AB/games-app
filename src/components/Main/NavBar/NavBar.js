import React from 'react'
import './NavBar.css'

const NavBar = () => {
    return (
        <header>
            <div className="logo">
                <ion-icon name="game-controller"></ion-icon>
                <p>The Game Zone</p>
            </div>
            <button type="button" id="btn">LEADERBOARD</button>
        </header>
    )
}

export default NavBar