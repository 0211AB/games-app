import React from 'react'
import './Hero.css'
import trophy from '../../../assets/home/trophy.png'

const Hero = () => {
    return (
        <div className="content-wrapper">
            <div className="content-desc">
                <h1>THE GAME ZONE</h1>
                <p>Welcome to our <span> Ultimate </span> gaming destination! Whether you're into action, adventure, or strategy, we've got something for everyone ...</p>
                <p>Play and compete with other gamers on our leaderboard to see who reigns supreme . Ready to play? Let's go!</p>

                <button id="btn2">PLAY NOW</button>
            </div>
        </div>
    )
}

export default Hero