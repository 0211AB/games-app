import { useEffect } from 'react';
import './App.css';
import { gapi } from "gapi-script";
import Login from './components/Main/Login/Login';
import useUserStore from "./store/user";

import { Navigate, Route, Routes } from "react-router-dom";

import LeaderBoard from './components/Main/LeaderBoard/LeaderBoard';
import Main from './components/Main/Main';
import ChessWrapper from './components/ChessBoard/ChessWrapper';
import Wordle from './components/Wordle/Wordle';

import CCScores from './components/CandyCrush/CCScores';
import CandyCrush from './components/CandyCrush/CandyCrush';

function App() {
  const { getUser, isLoggedIn, token } = useUserStore();

  useEffect(() => {
    if (isLoggedIn === true && token)
      getUser(token);
  }, [isLoggedIn, token]);


  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      plugin_name: "chat",
    });
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/leaderboard" element={<LeaderBoard />}></Route>
        <Route path="/candy-crush" element={isLoggedIn ? <CCScores /> : <Navigate to="/login" />}></Route>
        <Route path="/candy-crush/game" element={isLoggedIn ? <CandyCrush /> : <Navigate to="/login" />}></Route>
      </Routes>
    </>
  );
}

export default App;
