import React, { useContext } from 'react'
import Key from './Key';
import { BoardContext } from './Wordle';

const KeyBoard = () => {
    const { disabledLetters } = useContext(BoardContext)
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    return (
        <div className='wordle-keyboard'>
            <div className='line1'>
                {keys1.map((key) => {
                    return <Key key={key} val={key} disabled={disabledLetters.includes(key)} />
                })}
            </div>
            <div className='line2'>
                {keys2.map((key) => {
                    return <Key key={key} val={key} disabled={disabledLetters.includes(key)} />
                })}
            </div>
            <div className='line3'>
                <Key val={"DELETE"} bigKey />
                {keys3.map((key) => {
                    return <Key key={key} val={key} disabled={disabledLetters.includes(key)} />
                })}
                <Key val={"ENTER"} bigKey />
            </div>
        </div>
    )
}

export default KeyBoard