import React from 'react'

const GameLink = ({ gameid, data }) => {
    return (
        <div className='link-container'>
            <h2>
                Hey <strong>{data.myUserName}</strong>, copy and send the
                below Game ID to your friend
            </h2>
            <div className='link'>
                {gameid}{"    "}
                <br></br>
                <br></br>
                <button className='submit' onClick={() => {
                    navigator.clipboard.writeText(`${gameid}`);
                }}> Copy Text</button>
            </div>
            <br></br>

            <h2>
                Waiting for other opponent to join the game...{" "}
            </h2>
        </div>
    )
}

export default GameLink