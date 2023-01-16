import React from 'react'
import './NavBar.css'

const NavBar = () => {
    return (
        <header>
            <div className="logo">
                <ion-icon name="game-controller"></ion-icon>
                <p>The Game Zone</p>
            </div>
            <ul className="navbar">
                <li><a href="#" className="active">CHESS</a></li>
                <li><a href="#">CANDY CRUSH</a></li>
                <li><a href="#">WORDLE</a></li>
                <li><a href="#">TIC-TAC-TOE</a></li>
                <li><a href="#">MARIO</a></li>
                <li><a href="#">WHACK A MOLE</a></li>
            </ul>
            <button type="button" id="btn">PLAY NOW</button>
        </header>
    )
}

export default NavBar