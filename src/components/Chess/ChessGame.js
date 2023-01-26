import React from 'react'

import { ColorContext } from './context/colorContext'
import StartGame from './startGame/StartGame';
import useUserStore from '../../store/user'
import JoinGame from './startGame/JoinGame'
import ChessGame from './ui/ChessGame';
import NavBar from '../Main/NavBar/NavBar'
const App = () => {
    const user = useUserStore(state => state.user)
    const [userName, setUserName] = React.useState(user.name)
    const [didRedirect, setDidRedirect] = React.useState(false)

    const playerDidRedirect = React.useCallback(() => {
        setDidRedirect(true)
    }, [])

    const playerDidNotRedirect = React.useCallback(() => {
        setDidRedirect(false)
    }, [])


    return (
        <ColorContext.Provider value={{ didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect }}>
            {didRedirect ? (
                <div className='start-container'>
                    <JoinGame userName={userName} isCreator={true} />
                    <ChessGame myUserName={userName} />
                </div>
            ) : (
                <>
                    <NavBar />
                    <StartGame setUserName={setUserName} />
                </>
            )}
        </ColorContext.Provider>
    )
}

export default App