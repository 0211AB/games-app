import React, { useContext, useRef, useState } from 'react'
import './StartGame.css'
import { v4 as uuidv4 } from 'uuid';
import { ColorContext } from '../context/colorContext'
import { useNavigate } from 'react-router-dom';

import rook from '../assets/rook.png'
import pawn from '../assets/pawn.png'
import useUserStore from '../../../store/user';

const socket = require('../apis/scoket').socket

const StartGame = () => {
    const user = useUserStore(state => state.user)
    const [gameId, setGameId] = useState("")
    const navigate = useNavigate()
    const colorCtx = useContext(ColorContext)
    const textRef = useRef(null)

    const JoinGameRoom = (gameid, userName, isCreator) => {
        const idData = {
            gameId: gameid,
            userName: userName,
            isCreator: isCreator
        }
        console.log(idData)
        socket.emit("playerJoinGame", idData)
    }

    const newGameHandler = () => {
        colorCtx.playerDidRedirect();
        const newGameRoomId = uuidv4();
        setGameId(newGameRoomId)
        socket.emit('createNewGame', newGameRoomId)
        JoinGameRoom(newGameRoomId, user.name, true)
        navigate(`/chess?id=${newGameRoomId}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        colorCtx.playerDidRedirect();
        JoinGameRoom(textRef.current.value, user.name, false)
        navigate(`/chess?id=${textRef.current.value}`)
    }

    return (
        <>
            <div className='start-container'>
                <h1>Kings of the 64</h1>
                <br></br>
                <button className="submit" onClick={() => { newGameHandler() }}> Start New Game</button>
                <br></br>
                <div className='join-game-container'>
                    <h3>Please Enter Game ID</h3>
                    <form className='form' onSubmit={submitHandler}>
                        <input className='input' ref={textRef} required></input>
                        <br></br>
                        <button type='submit' className='submit'> Join Game </button>
                    </form>
                </div>
            </div >
            <img src={rook} alt="Rook" className='img-1'></img>
            <img src={pawn} alt="Pawn" className='img-2'></img>
        </>
    )
}

export default StartGame