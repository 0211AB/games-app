import React from 'react'
import './Hero.css'
import trophy from '../../../assets/home/trophy.png'

const Hero = () => {
    return (
        <div className="content-wrapper">
            <div className="content-desc">
                <h1>THE GAME ZONE</h1>
                <p>Compete with <span> Gamers </span>all around the world in this immense challenge and be the
                    winner of all TIme.</p>
                <p>Our Top Players are listed in the leaderboard below, click the
                    button below to see the highscores.</p>

                <button id="btn2">LEADERBOARD</button>
            </div>
        </div>
    )
}

export default Hero