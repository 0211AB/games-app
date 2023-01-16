import React, { useContext, useEffect } from 'react'
import { BoardContext } from './Wordle'

const Letter = ({ letterPos, attemptVal }) => {
    const { board, correctWord, currentAttempt, setDisabledLetters } = useContext(BoardContext)
    const letter = board[attemptVal][letterPos]

    const correct = correctWord.toUpperCase()[letterPos] === letter
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter)

    var letterState = (currentAttempt.attempt > attemptVal) &&
        (correct ? "correct" : almost ? "almost" : "error")

    useEffect(() => {
        if (letter !== "" && !correct && !almost)
            setDisabledLetters((prev) => [...prev, letter]);

        // eslint-disable-next-line
    }, [currentAttempt.attempt]);

    return (
        <div className='wordle-letter' id={letterState}>{letter}</div>
    )
}

export default Letter