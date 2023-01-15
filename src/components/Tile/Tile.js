import React from 'react'
import './Tile.css'

const Tile = ({ i, j, image }) => {
    return (
        <div className={`tile ${(i + j) % 2 === 0 ? 'black-tile' : 'white-tile'}`}>
            {image === null ? <></> : <div className='chess-piece' style={{ backgroundImage: `url(${image})` }}></div>}
        </div>
    )
}

export default Tile