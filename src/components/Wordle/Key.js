import React, { useContext } from 'react'
import { BoardContext } from './Wordle'

const Key = ({ val, bigKey, disabled }) => {
    const { board,correctWord, setBoard, currentAttempt, setCurrentAttempt, wordSet, setGameOver } = useContext(BoardContext)

    const selectLetter = () => {
        if (val === "ENTER") {
            if (currentAttempt.letterPos !== 5) return;

            let currWord = "";
            for (var i = 0; i < 5; i++)
                currWord += board[currentAttempt.attempt][i]

            if (wordSet.has(currWord.toLowerCase()))
                setCurrentAttempt({ letterPos: 0, attempt: currentAttempt.attempt + 1 })
            else
                alert("No Such Word Found")

            if (currWord.toLowerCase()   === correctWord)
            {
                setGameOver({ gameOver: true, guessedWord: true })
                return;
            }

            if(currentAttempt.attempt===5)
            {
                setGameOver({ gameOver: true, guessedWord: false })
            }
        }
        else if (val === "DELETE") {
            if (currentAttempt.letterPos === 0) return;

            const newBoard = [...board]
            newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = ""
            setCurrentAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos - 1 })
            setBoard(newBoard)
        }
        else {
            if (currentAttempt.letterPos > 4) return;

            const newBoard = [...board]
            newBoard[currentAttempt.attempt][currentAttempt.letterPos] = val
            setCurrentAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos + 1 })
            setBoard(newBoard)
        }
    }

    return (
        <div className='wordle-key' id={bigKey ? 'big' : disabled && "disabled"} onClick={selectLetter}>{val}</div>
    )
}

export default Key  