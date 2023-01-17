import NavBar from '../NavBar/NavBar'
import './Login.css'
import GoogleLogin from 'react-google-login'
import trophy from '../../../assets/home/trophy.png'
import { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader'

const Login = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const signIn = async () => {

    }

    useEffect(() => {
        if (data !== null)
            signIn()
    }, [data])

    const handleFailure = (res) => {
        alert(res)
    }

    const handleLogin = (data) => {
        const { email, name, imageUrl, googleId } = data.profileObj
        setData({ email, name, imageUrl, googleId })
        setLoading(true);
    }

    if (loading)
        return <Loader />
    else
        return (
            <>
                <NavBar />
                <div className='google-container'>
                    <h1>Login With Google</h1>
                    <img src={trophy} alt="Winner"></img>
                    <br></br>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Login With Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                    >
                    </GoogleLogin>
                </div>
            </>
        )
}

export default Login