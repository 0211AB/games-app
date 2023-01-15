import React, { useRef } from 'react'
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

    const chessboardRef = useRef(null)
    var board = [];
    var image = null;
    var activePiece = null;

    const grabPiece = (e) => {
        const element = e.target

        if (element.classList.contains("chess-piece")) {
            const x = e.clientX - 40;
            const y = e.clientY - 40;
            element.style.position = "absolute"
            element.style.left = `${x}px`
            element.style.top = `${y}px`

            activePiece = element
        }
    }

    const movePiece = (e) => {
        const chessboard = chessboardRef.current
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft;
            const minY = chessboard.offsetTop;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            const maxY = chessboard.offsetTop + chessboard.clientWidth - 75;


            const x = e.clientX - 40;
            const y = e.clientY - 40;
            activePiece.style.position = "absolute"

            if (x > maxX)
                activePiece.style.left = `${maxX}px`;
            else if (x < minX)
                activePiece.style.left = `${minX}px`;
            else
                activePiece.style.left = `${x}px`;

            if (y > maxY)
                activePiece.style.top = `${maxY}px`;
            else if (y < minY)
                activePiece.style.top = `${minY}px`;
            else
                activePiece.style.top = `${y}px`;

        }
    }

    const dropPiece = (e) => {
        activePiece = null;
    }


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
        <div id="chessboard"
            ref={chessboardRef}
            onMouseUp={(e) => { dropPiece(e) }}
            onMouseMove={(e) => movePiece(e)}
            onMouseDown={(e) => grabPiece(e)}
        >{board}
        </div>
    )
}

export default ChessBoard