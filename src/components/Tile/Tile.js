import React from 'react'
import './Tile.css'

const Tile = ({ i, j, image }) => {
    return (
        <div className={`tile ${(i + j) % 2 === 0 ? 'black-tile' : 'white-tile'}`}>
            <img src={image} alt=""></img>
        </div>
    )
}

export default Tile