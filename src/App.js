import './App.css';
import { gapi } from "gapi-script";
import Login from './components/Main/Login/Login';
// import LeaderBoard from './components/Main/LeaderBoard/LeaderBoard';
// import Main from './components/Main/Main';
// import CandyCrush from './components/CandyCrush/CandyCrush'; 
// import ChessWrapper from './components/ChessBoard/ChessWrapper';
// import Wordle from './components/Wordle/Wordle';

function App() {
  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      plugin_name: "chat",
    });
  });

  return (
    <div>
      {/* <ChessWrapper /> */}
      {/* <CandyCrush /> */}
      {/* <Wordle /> */}
      {/* <Main /> */}
      {/* <LeaderBoard /> */}
      <Login />
    </div>
  );
}

export default App;
