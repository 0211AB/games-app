import React from 'react'
import './Games.css'
import candycrush from '../../../assets/home/candycrush.jpg'
import chess from '../../../assets/home/chess.jpg'
import wordle from '../../../assets/home/wordle.jpg'
import ttt from '../../../assets/home/ttt.jpg'
import wam from '../../../assets/home/whackamole.webp'
import mario from '../../../assets/home/mario.gif'
import tetris from '../../../assets/home/tetris.jpg'
import tofe from '../../../assets/home/2048.jpg'

const Games = () => {
    return (
        <div className="section-3">
            <div className="section-3-wrapper">
                <div className='feedback-box'>
                    <div className="feedback" style={{ background: `url(${chess})` }}></div>
                    <div className="feedback-desc">
                        <h4>CHESS</h4>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum delectus error,
                            tempora laborum, voluptas magnam animi quo repudiandae asperiores
                            totam dolore commodi perspiciatis sapiente accusamus alias non vitae incidunt nisi!</p>
                        <br />
                        <h4>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback" style={{ background: `url(${candycrush})` }}></div>
                    <div className="feedback-desc">
                        <h4>CANDY CRUSH</h4>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum delectus error,
                            tempora laborum, voluptas magnam animi quo repudiandae asperiores
                            totam dolore commodi perspiciatis sapiente accusamus alias non vitae incidunt nisi!</p>
                        <br />
                        <h4>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback" style={{ background: `url(${wordle})` }}></div>
                    <div className="feedback-desc">
                        <h4>WORDLE</h4>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum delectus error,
                            tempora laborum, voluptas magnam animi quo repudiandae asperiores
                            totam dolore commodi perspiciatis sapiente accusamus alias non vitae incidunt nisi!</p>
                        <br />
                        <h4>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback" style={{ background: `url(${ttt})` }}></div>
                    <div className="feedback-desc">
                        <h4>TIC TAC TOE</h4>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum delectus error,
                            tempora laborum, voluptas magnam animi quo repudiandae asperiores
                            totam dolore commodi perspiciatis sapiente accusamus alias non vitae incidunt nisi!</p>
                        <br />
                        <h4>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback" style={{ background: `url(${mario})` }}></div>
                    <div className="feedback-desc">
                        <h4>MARIO</h4>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum delectus error,
                            tempora laborum, voluptas magnam animi quo repudiandae asperiores
                            totam dolore commodi perspiciatis sapiente accusamus alias non vitae incidunt nisi!</p>
                        <br />
                        <h4>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback" style={{ background: `url(${wam})` }}></div>
                    <div className="feedback-desc">
                        <h4>WHACK A MOLE</h4>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum delectus error,
                            tempora laborum, voluptas magnam animi quo repudiandae asperiores
                            totam dolore commodi perspiciatis sapiente accusamus alias non vitae incidunt nisi!</p>
                        <br />
                        <h4>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback" style={{ background: `url(${tetris})` }}></div>
                    <div className="feedback-desc">
                        <h4>TETRIS</h4>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum delectus error,
                            tempora laborum, voluptas magnam animi quo repudiandae asperiores
                            totam dolore commodi perspiciatis sapiente accusamus alias non vitae incidunt nisi!</p>
                        <br />
                        <h4>Click Here To Play Now</h4>
                    </div>
                </div>

                <div className='feedback-box'>
                    <div className="feedback" style={{ background: `url(${tofe})` }}></div>
                    <div className="feedback-desc">
                        <h4>2048</h4>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum delectus error,
                            tempora laborum, voluptas magnam animi quo repudiandae asperiores
                            totam dolore commodi perspiciatis sapiente accusamus alias non vitae incidunt nisi!</p>
                        <br />
                        <h4>Click Here To Play Now</h4>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Games