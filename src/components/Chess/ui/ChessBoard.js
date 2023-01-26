import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Game from '../model/Chess'
import Square from '../model/Square'
import { Stage, Layer } from 'react-konva';
import Board from '../assets/chessBoard.png'
import Piece from './Piece'
import piecemap from './PieceMap'
import './ChessBoard.css'
const socket = require('../apis/scoket').socket

const ChessBoard = (props) => {
    const navigate = useNavigate()
    const [gameState, setgameState] = useState(new Game(props.color))
    const [draggedPieceTargetId, setdraggedPieceTargetId] = useState("")
    const [playerTurnToMoveIsWhite, setplayerTurnToMoveIsWhite] = useState(true)
    const [whiteKingInCheck, setwhiteKingInCheck] = useState(false)
    const [blackKingInCheck, setblackKingInCheck] = useState(false)

    useEffect(() => {

        console.log("My User Name: ", props.myUserName)
        console.log("Opponent User Name: ", props.opponentUserName)

        // register event listeners
        socket.on('opponent move', move => {
            // move == [pieceId, finalPosition]
            // console.log("opponenet's move: " + move.selectedId + ", " + move.finalPosition)
            if (move.playerColorThatJustMovedIsWhite !== props.color) {
                movePiece(move.selectedId, move.finalPosition, gameState, false)
                setplayerTurnToMoveIsWhite(!move.playerColorThatJustMovedIsWhite)
            }
        })

    }, [])

    const startDragging = (e) => {
        setdraggedPieceTargetId(e.target.attrs.id)
    }

    const movePiece = (selectedId, finalPosition, currentGame, isMyMove) => {
        /**
         * "update" is the connection between the model and the UI. 
         * This could also be an HTTP request and the "update" could be the server response.
         * (model is hosted on the server instead of the browser)
         */
        var whiteKingInCheck = false
        var blackKingInCheck = false
        var blackCheckmated = false
        var whiteCheckmated = false
        const update = currentGame.movePiece(selectedId, finalPosition, isMyMove)

        if (update === "moved in the same position.") {
            revertToPreviousState(selectedId) // pass in selected ID to identify the piece that messed up
            return
        } else if (update === "user tried to capture their own piece") {
            revertToPreviousState(selectedId)
            return
        } else if (update === "b is in check" || update === "w is in check") {
            // change the fill of the enemy king or your king based on which side is in check. 
            // play a sound or something
            if (update[0] === "b") {
                blackKingInCheck = true
            } else {
                whiteKingInCheck = true
            }
        } else if (update === "b has been checkmated" || update === "w has been checkmated") {
            if (update[0] === "b") {
                blackCheckmated = true
            } else {
                whiteCheckmated = true
            }
        } else if (update === "invalid move") {
            revertToPreviousState(selectedId)
            return
        }

        // let the server and the other client know your move
        if (isMyMove) {
            console.log("My Move", isMyMove)
            socket.emit('new move', {
                nextPlayerColorToMove: !gameState.thisPlayersColorIsWhite,
                playerColorThatJustMovedIsWhite: gameState.thisPlayersColorIsWhite,
                selectedId: selectedId,
                finalPosition: finalPosition,
                gameId: props.gameId
            })
        }

        props.playAudio()

        // sets the new game state. 
        setdraggedPieceTargetId("")
        setgameState(currentGame)
        setplayerTurnToMoveIsWhite(!props.color)
        setwhiteKingInCheck(whiteKingInCheck)
        setblackKingInCheck(blackKingInCheck)

        if (blackCheckmated) {
            alert("WHITE WON BY CHECKMATE!")
            navigate('/')
        } else if (whiteCheckmated) {
            alert("BLACK WON BY CHECKMATE!")
            navigate('/')
        }
    }

    const revertToPreviousState = (selectedId) => {
        /**
         * Should update the UI to what the board looked like before. 
         */
        const oldGS = gameState
        const oldBoard = oldGS.getBoard()
        const tmpGS = new Game(true)
        const tmpBoard = []

        for (var i = 0; i < 8; i++) {
            tmpBoard.push([])
            for (var j = 0; j < 8; j++) {
                if (oldBoard[i][j].getPieceIdOnThisSquare() === selectedId) {
                    tmpBoard[i].push(new Square(j, i, null, oldBoard[i][j].canvasCoord))
                } else {
                    tmpBoard[i].push(oldBoard[i][j])
                }
            }
        }

        // temporarily remove the piece that was just moved
        tmpGS.setBoard(tmpBoard)

        setgameState(tmpGS)
        setdraggedPieceTargetId("")
        setgameState(oldGS)
    }

    const endDragging = (e) => {
        const currentGame = gameState
        const currentBoard = currentGame.getBoard()
        const finalPosition = inferCoord(e.target.x() + 90, e.target.y() + 90, currentBoard)
        const selectedId = draggedPieceTargetId
        movePiece(selectedId, finalPosition, currentGame, true)
    }

    const inferCoord = (x, y, chessBoard) => {
        // console.log("actual mouse coordinates: " + x + ", " + y)
        /*
            Should give the closest estimate for new position. 
        */
        var hashmap = {}
        var shortestDistance = Infinity
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                const canvasCoord = chessBoard[i][j].getCanvasCoord()
                // calculate distance
                const delta_x = canvasCoord[0] - x
                const delta_y = canvasCoord[1] - y
                const newDistance = Math.sqrt(delta_x ** 2 + delta_y ** 2)
                hashmap[newDistance] = canvasCoord
                if (newDistance < shortestDistance) {
                    shortestDistance = newDistance
                }
            }
        }

        return hashmap[shortestDistance]
    }

    return (
        <React.Fragment>
            <div style={{
                backgroundImage: `url(${Board})`,
                width: "720px",
                height: "720px"
            }}
            >
                <Stage width={720} height={720}>
                    <Layer>
                        {gameState.getBoard().map((row,idx1) => {
                            return (<React.Fragment>
                                {row.map((square, idx2) => {
                                    if (square.isOccupied()) {
                                        return (
                                            <Piece
                                                x={square.getCanvasCoord()[0]}
                                                y={square.getCanvasCoord()[1]}
                                                imgurls={piecemap[square.getPiece().name]}
                                                isWhite={square.getPiece().color === "white"}
                                                draggedPieceTargetId={draggedPieceTargetId}
                                                onDragStart={startDragging}
                                                onDragEnd={endDragging}
                                                id={square.getPieceIdOnThisSquare()}
                                                thisPlayersColorIsWhite={props.color}
                                                playerTurnToMoveIsWhite={playerTurnToMoveIsWhite}
                                                whiteKingInCheck={whiteKingInCheck}
                                                blackKingInCheck={blackKingInCheck}
                                                key={idx1+""+idx2}
                                            />)
                                    }
                                    return
                                })}
                            </React.Fragment>)
                        })}
                    </Layer>
                </Stage>
            </div>
        </React.Fragment>)
}

export default ChessBoard