import React, { useEffect, useState } from 'react'
import './CandyCrush.css'

import blue from '../../assets/candies/blue.webp'
import green from '../../assets/candies/green.webp'
import orange from '../../assets/candies/orange.webp'
import purple from '../../assets/candies/purple.webp'
import red from '../../assets/candies/red.webp'
import yellow from '../../assets/candies/yellow.webp'
import blank from '../../assets/candies/blank.png'
import NavBar from '../Main/NavBar/NavBar'
import Counter from './Counter'
import useUserStore from '../../store/user'

const WIDTH = 8;
const CANDY_COLORS = [
    blue,
    green,
    orange,
    purple,
    red,
    yellow
]

const CandyCrush = () => {
    const [currentColorArrangement, setcurrentColorArrangement] = useState([])
    const [beingDragged, setBeingDragged] = useState(null)
    const [beingReplaced, setBeingReplaced] = useState(null)
    const user = useUserStore(state => state.user)
    const [score, setScore] = useState(0)

    const createBoard = () => {
        const randomColorArrangement = [];
        for (let i = 0; i < WIDTH * WIDTH; i++) {
            const color = CANDY_COLORS[Math.floor(CANDY_COLORS.length * Math.random())]
            randomColorArrangement.push(color)
        }
        setcurrentColorArrangement(randomColorArrangement)
    }

    const checkForCol3 = () => {
        for (let i = 0; i <= 47; i++) {
            const colOf3 = [i, i + WIDTH, i + WIDTH * 2];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank

            if (colOf3.every(square => currentColorArrangement[square] === decidedColor) && !isBlank) {
                colOf3.forEach(square => currentColorArrangement[square] = blank)
                setScore(prev => prev + 3)
                return true;
            }
        }
    }

    const checkForCol4 = () => {
        for (let i = 0; i <= 39; i++) {
            const colOf4 = [i, i + WIDTH, i + WIDTH * 2, i + WIDTH * 3];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank

            if (colOf4.every(square => currentColorArrangement[square] === decidedColor) && !isBlank) {
                colOf4.forEach(square => currentColorArrangement[square] = blank)
                setScore(prev => prev + 4)
                return true;
            }
        }
    }

    const checkForRow3 = () => {
        for (let i = 0; i < 64; i++) {
            const rowOf3 = [i, i + 1, i + 2];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

            if (notValid.includes(i)) continue;

            if (rowOf3.every(square => currentColorArrangement[square] === decidedColor) && !isBlank) {
                rowOf3.forEach(square => currentColorArrangement[square] = blank)
                setScore(prev => prev + 3)
                return true;
            }
        }
    }

    const checkForRow4 = () => {
        for (let i = 0; i < 39; i++) {
            const rowOf4 = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

            if (notValid.includes(i)) continue;

            if (rowOf4.every(square => currentColorArrangement[square] === decidedColor) && !isBlank) {
                rowOf4.forEach(square => currentColorArrangement[square] = blank)
                setScore(prev => prev + 4)
                return true;
            }
        }
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 64 - WIDTH; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === blank) {
                const color = CANDY_COLORS[Math.floor(CANDY_COLORS.length * Math.random())]
                currentColorArrangement[i] = color
            }

            if (currentColorArrangement[i + WIDTH] === blank) {
                currentColorArrangement[i + WIDTH] = currentColorArrangement[i]
                currentColorArrangement[i] = blank
            }
        }
    }

    const dragStart = (e) => {
        setBeingDragged(e.target)
    }

    const dragDrop = (e) => {
        setBeingReplaced(e.target)
    }

    const dragEnd = () => {
        const replaceId = parseInt(beingReplaced.getAttribute('data-id'))
        const dragId = parseInt(beingDragged.getAttribute('data-id'))

        currentColorArrangement[replaceId] = beingDragged.getAttribute('src')
        currentColorArrangement[dragId] = beingReplaced.getAttribute('src')

        const validMoves = [dragId - 1, dragId - WIDTH, dragId + 1, dragId + WIDTH]
        const isValidMove = validMoves.includes(replaceId)

        if (isValidMove && replaceId &&
            (checkForCol4() || checkForCol3() || checkForRow4() || checkForRow3())) {
            setBeingDragged(null)
            setBeingReplaced(null)
        }
        else {
            currentColorArrangement[replaceId] = beingReplaced.getAttribute('src')
            currentColorArrangement[dragId] = beingDragged.getAttribute('src')
            setcurrentColorArrangement([...currentColorArrangement])
        }

    }

    useEffect(() => {
        createBoard();
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForCol4();
            checkForRow4();
            checkForCol3();
            checkForRow3();
            moveIntoSquareBelow();
            setcurrentColorArrangement([...currentColorArrangement])
        }, 100)

        return () => clearInterval(timer)
    }, [checkForCol4, checkForCol3, checkForRow4, checkForRow3, moveIntoSquareBelow, currentColorArrangement])

    return (
        <>
            <NavBar />
            <div className='candy-crush-app'>
                <h1>CandyCrush</h1>
                <div className='cc-score'>
                    <h3>Current Score: {score}</h3>
                    <Counter score={score} />
                    <h3>Your High Score : {user.candyCrush.highScore}</h3>
                </div>
                <br></br>
                <div className='game'>
                    {currentColorArrangement.map((color, index) => {
                        return <img
                            key={index}
                            src={color}
                            alt={color}
                            data-id={index}
                            draggable={true}
                            onDragStart={dragStart}
                            onDragOver={(e) => { e.preventDefault() }}
                            onDragEnter={(e) => { e.preventDefault() }}
                            onDrop={dragDrop}
                            onDragEnd={dragEnd}
                        ></img>
                    })}
                </div>
            </div>
        </>
    )
}

export default CandyCrush