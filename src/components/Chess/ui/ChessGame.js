import React, { useEffect, useState, useContext } from 'react'
import useSound from 'use-sound'
import chessMove from '../assets/moveSoundEffect.mp3'
import { useParams, useSearchParams } from 'react-router-dom'
import { ColorContext } from '../context/colorContext'
import VideoChatApp from '../apis/videochat'
import GameLink from './GameLink';
import ChessBoard from './ChessBoard';
const socket = require('../apis/scoket').socket

const ChessGameWrapper = (props) => {
    const color = useContext(ColorContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const gameid = searchParams.get("id")
    const [play] = useSound(chessMove);
    const [opponentSocketId, setOpponentSocketId] = useState('')
    const [opponentDidJoinTheGame, didJoinGame] = useState(false)
    const [opponentUserName, setUserName] = useState('')
    const [gameSessionDoesNotExist, doesntExist] = useState(false)

    useEffect(() => {
        socket.on("playerJoinedRoom", statusUpdate => {
            console.log(statusUpdate)
            console.log("A new player has joined the room! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
            if (socket.id !== statusUpdate.mySocketId) {
                setOpponentSocketId(statusUpdate.mySocketId)
            }
        })

        socket.on("status", statusUpdate => {
            console.log(statusUpdate)
            alert(statusUpdate)
            if (statusUpdate === 'This game session does not exist.' || statusUpdate === 'There are already 2 people playing in this room.') {
                doesntExist(true)
            }
        })


        socket.on('start game', (opponentUserName) => {
            console.log("START!")
            if (opponentUserName !== props.myUserName) {
                setUserName(opponentUserName)
                didJoinGame(true)
            } else {
                // in chessGame, pass opponentUserName as a prop and label it as the enemy. 
                // in chessGame, use reactContext to get your own userName
                // socket.emit('myUserName')
                socket.emit('request username', gameid)
            }
        })


        socket.on('give userName', (socketId) => {
            if (socket.id !== socketId) {
                console.log("give userName stage: " + props.myUserName)
                socket.emit('recieved userName', { userName: props.myUserName, gameId: gameid })
            }
        })

        socket.on('get Opponent UserName', (data) => {
            if (socket.id !== data.socketId) {
                setUserName(data.userName)
                console.log('data.socketId:', data.socketId)
                setOpponentSocketId(data.socketId)
                didJoinGame(true)
            }
        })
    }, [])


    return (
        <React.Fragment>
            {opponentDidJoinTheGame ? (
                <div className='main-game'>
                    <VideoChatApp
                        mySocketId={socket.id}
                        opponentSocketId={opponentSocketId}
                        myUserName={props.myUserName}
                        opponentUserName={opponentUserName}
                        type={2}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <ChessBoard playAudio={play}
                            gameId={gameid}
                            color={color.didRedirect} />
                    </div>
                    <VideoChatApp
                        mySocketId={socket.id}
                        opponentSocketId={opponentSocketId}
                        myUserName={props.myUserName}
                        opponentUserName={opponentUserName}
                        type={1}
                    />
                </div>
            ) : gameSessionDoesNotExist ? (
                <div>
                    <h1 style={{ textAlign: "center", marginTop: "200px" }}> :( </h1>
                </div>
            ) : (
                <GameLink gameid={gameid} data={props} />
            )}
        </React.Fragment>
    );
};

export default ChessGameWrapper