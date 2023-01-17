import React from 'react'
import NavBar from '../NavBar/NavBar'
import './LeaderBoard.css'
import one from '../../../assets/home/first.jpg'
import two from '../../../assets/home/second.jpg'
import three from '../../../assets/home/third.jpg'


const LeaderBoard = () => {
    return (
        <div>
            <NavBar />
            <h1 className='leader-board-title'>LeaderBoard</h1>
            <div className="leaderboard">
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>
                                Player
                            </td>
                            <td>
                                Score
                            </td>
                            <td>
                                Average
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="winner">1</td>
                            <td><img src={one} alt="First" /><p> Jose Brag</p></td>
                            <td>239</td>
                            <td>12.54</td>
                        </tr>

                        <tr>
                            <td id="runner-up">2</td>
                            <td><img src={two} alt="Second" /><p> Lily Simons</p></td>
                            <td>209</td>
                            <td>10.2</td>
                        </tr>

                        <tr>
                            <td id="second-runner-up">3</td>
                            <td><img src={three} alt="Third" /><p> Tom Higgle</p></td>
                            <td>154</td>
                            <td>8.4</td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td><p> Alex Roger</p></td>
                            <td>100</td>
                            <td>3.1</td>
                        </tr>

                        <tr>
                            <td>5</td>
                            <td><p> Mavie Ruth</p></td>
                            <td>82</td>
                            <td>2.0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default LeaderBoard