import React from 'react'
import useUserStore from "../../store/user";

const UserStats = () => {
    const user = useUserStore(state => state.user)

    return (
        <>
            <h1 className='main-title'>TETRIS</h1>
            <div className="GameStats">
                <div className="value">User Name <br></br> <span>{user.name}</span></div>
                <div className="value">Max Level Reached <br></br> <span>{user.tetris.maxLevelReached}</span></div>
                <div className="value">HighScore <br></br> <span>{user.tetris.highScore}</span></div>
            </div>
        </>
    )
}

export default UserStats