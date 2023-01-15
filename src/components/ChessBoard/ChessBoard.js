import React from 'react'
import Tile from '../Tile/Tile';
import './ChessBoard.css'

import pawn_b from '../../assets/images/pawn_b.png'
import pawn_w from '../../assets/images/pawn_w.png'
import rook_b from '../../assets/images/rook_b.png'
import rook_w from '../../assets/images/rook_w.png'
import bishop_b from '../../assets/images/bishop_b.png'
import bishop_w from '../../assets/images/bishop_w.png'
import knight_b from '../../assets/images/knight_b.png'
import knight_w from '../../assets/images/knight_w.png'
import king_b from '../../assets/images/king_b.png'
import king_w from '../../assets/images/king_w.png'
import queen_b from '../../assets/images/queen_b.png'
import queen_w from '../../assets/images/queen_w.png'

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

const ChessBoard = () => {
    var board = [];
    var image = null;


    for (var j = verticalAxis.length - 1; j >= 0; j--)
        for (var i = 0; i < horizontalAxis.length; i++) {

            if (j === 1) image = pawn_w
            else if (j === 6) image = pawn_b
            else if ((i === 0 && j === 0) || (i === 7 && j === 0)) image = rook_w
            else if ((i === 0 && j === 7) || (i === 7 && j === 7)) image = rook_b
            else if ((i === 2 && j === 0) || (i === 5 && j === 0)) image = bishop_w
            else if ((i === 2 && j === 7) || (i === 5 && j === 7)) image = bishop_b
            else if ((i === 1 && j === 0) || (i === 6 && j === 0)) image = knight_w
            else if ((i === 1 && j === 7) || (i === 6 && j === 7)) image = knight_b
            else if (i === 3 && j === 0) image = queen_w
            else if (i === 3 && j === 7) image = queen_b
            else if (i === 4 && j === 0) image = king_w
            else if (i === 4 && j === 7) image = king_b
            else image = null

            board.push(<Tile key={`${i} ${j}`} i={i} j={j} image={image}></Tile>)
        }

    return (
        <div id="chessboard">{board}</div>
    )
}

export default ChessBoard