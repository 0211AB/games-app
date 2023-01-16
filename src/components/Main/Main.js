import React from 'react'
import Hero from './Hero/Hero'
import NavBar from './NavBar/NavBar'
import './Main.css'
import bg from '../../assets/home/bg.png'
import Footer from './Footer/Footer'
import Games from './Games/Games'

const Main = () => {
    return (
        <>
            <div className='container'
                style={{ background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${bg})` }}>
                <NavBar />
                <Hero />
            </div>
            <div className="logo-section">
                <ion-icon name="game-controller"></ion-icon>
                <h1>The Game Zone</h1>
            </div>
            <Games/>
            <Footer/>
        </>
    )
}

export default Main