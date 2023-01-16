import React, { useState, createContext, useEffect } from 'react'
import { boardDefault } from '../../utils/Wordle'
import Board from './Board'
import KeyBoard from './KeyBoard'
import './Wordle.css'
import wordBank from "../../utils/WordBank.txt";
import GameOver from './GameOver'

export const BoardContext = createContext()

const Wordle = () => {
    const [board, setBoard] = useState(boardDefault)
    const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPos: 0 })
    const [wordSet, setWordSet] = useState(new Set())
    const [disabledLetters, setDisabledLetters] = useState([])
    const [gameOver, setGameOver] = useState({
        gameOver: false,
        guessedWord: false
    })
    const [correctWord, setCorrectWord] = useState("");

    const generateWordSet = async () => {
        await fetch(wordBank)
            .then((response) => response.text())
            .then((result) => {
                const wordArr = result.split("\r\n");
                setCorrectWord(wordArr[Math.floor(Math.random() * wordArr.length)]);
                setWordSet(new Set(wordArr));
            });
    };

    useEffect(() => {
        generateWordSet();
    }, [])

    return (
        <div className='wordle'>
            <nav className='wordle-nav'>
                <h1>Wordle</h1>
            </nav>
            <BoardContext.Provider value={{ board, setBoard, currentAttempt, setCurrentAttempt, correctWord, wordSet, setDisabledLetters, disabledLetters, gameOver, setGameOver }}>
                <div className='wordle-game'>
                    <Board />
                    {gameOver.gameOver ? <GameOver /> : <KeyBoard />}
                </div>
            </BoardContext.Provider>
        </div>
    )
}

export default Wordle