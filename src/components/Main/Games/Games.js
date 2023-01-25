import React from 'react'
import './Games.css'
import candycrush from '../../../assets/home/candycrush.jpg'
import chess from '../../../assets/home/chess.jpg'
import wordle from '../../../assets/home/wordle.jpg'
import ttt from '../../../assets/home/ttt.jpg'
import bkout from '../../../assets/home/breakout.png'
import mario from '../../../assets/home/mario.gif'
import tetris from '../../../assets/home/tetris.jpg'
import tofe from '../../../assets/home/2048.jpg'
import { useNavigate } from 'react-router-dom'

const Games = () => {
    const navigate = useNavigate()

    return (
        <div className="section-3" id="games">
            <div className="section-3-wrapper">
                <div className='feedback-box'>
                    <div className="feedback">
                        <img alt="Game" src={chess}></img>
                    </div>
                    <div className="feedback-desc">
                        <h2>CHESS</h2>
                        <br />
                        <p>Play chess against family and friends right now! A fun new way to play chess and video-chat at the same time! Ready to be played worldwide.</p>
                        <br />
                        <h4 onClick={() => { navigate('/chess') }}>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback">
                        <img alt="Game" src={candycrush} />
                    </div>
                    <div className="feedback-desc">
                        <h2>CANDY CRUSH</h2>
                        <br />
                        <p>Shift the treats around the board to make matches based on color and shape. Form lines of 3 or more identical tiles to crush them. The larger the combos, the more points you earn!</p>
                        <br />
                        <h4 onClick={() => { navigate('/candy-crush') }}>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback">
                        <img alt="Game" src={wordle}></img>
                    </div>
                    <div className="feedback-desc">
                        <h2>WORDLE</h2>
                        <br />
                        <p>Guess the word in 6 tries !!! Each guess must be a valid 5 letter word.The color of the tile will change to show how close your guess was.</p>
                        <br />
                        <h4 onClick={() => { navigate('/wordle') }}>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback">
                        <img alt="Game" src={bkout}></img>
                    </div>
                    <div className="feedback-desc">
                        <h2>Break Out</h2>
                        <br />
                        <p> In Breakout, a layer of bricks lines the top third of the screen and the goal is to destroy them all by repeatedly bouncing a ball off a paddle into them.</p>
                        <br />
                        <h4 onClick={() => { navigate('/breakout') }}>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback">
                        <img alt="Game" src={tetris}></img>
                    </div>
                    <div className="feedback-desc">
                        <h2>TETRIS</h2>
                        <br />
                        <p>The game requires players to rotate and move falling Tetris pieces. Players clear lines by completing horizontal rows of blocks without empty cells</p>
                        <br />
                        <h4 onClick={() => { navigate('/tetris') }}>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback">
                        <img alt="Game" src={tofe}></img>
                    </div>
                    <div className="feedback-desc">
                        <h2>2048</h2>
                        <br />
                        <p>2048 is a game in which you manoeuvre tiles around a 4x4 board, merging tiles of the same value in an attempt to reach 2048.</p>
                        <br />
                        <h4 onClick={() => { navigate('/2048/rules') }}>Click Here To Play Now</h4>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Games