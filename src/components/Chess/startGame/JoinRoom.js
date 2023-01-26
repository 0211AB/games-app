import React, { useState, useRef } from 'react'
import JoinGame from './JoinGame'
import ChessGame from '../ui/ChessGame'

import rook from '../assets/rook.png'
import pawn from '../assets/pawn.png'

const JoinRoom = () => {
    const [didGetUserName, setDidGetUserName] = useState(false)
    const [inputText, setInputText] = useState("")

    const textRef = useRef(null)
    const submitHandler = (e) => {
        e.preventDefault();
        setInputText(textRef.current.value)
        // console.log(textRef.current.value)
        setDidGetUserName(true)
    }

    return (
        <>
            {didGetUserName ?
                <div className='start-container'>
                    <JoinGame userName={inputText} isCreator={false} />
                    <ChessGame myUserName={inputText} />
                </div> :
                <div className='start-container'>
                    <h3>Please Enter Your Name</h3>
                    <form className='form' onSubmit={submitHandler}>
                        <input className='input' ref={textRef} required></input>
                        <br></br>
                        <button type='submit' className='submit'> Submit </button>
                    </form>
                    <img src={rook} alt="Rook" className='img-1'></img>
                    <img src={pawn} alt="Pawn" className='img-2'></img>
                </div>
            }
        </>
    )
}

export default JoinRoom