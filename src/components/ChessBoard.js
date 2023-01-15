import React from 'react'
import './ChessBoard.css'

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

const ChessBoard = () => {
    var board = [];

    for (var j = verticalAxis.length - 1; j >= 0; j--)
        for (var i = 0; i < horizontalAxis.length; i++)
            board.push(<div key={`${i} ${j}`} className={`tile ${(i + j) % 2 === 0 ? 'black-tile' : 'white-tile'}`}></div>)

    return (
        <div id="chessboard">{board}</div>
    )
}

export default ChessBoard