import Menu from "./Menu";
import Tetris from "./Tetris";
import Loader from '../Loader/Loader'

import { useGameOver } from "./hooks/useGameOver";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/user";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = useUserStore(state => state.token)
  const getUser = useUserStore(state => state.getUser)
  const start = () => resetGameOver();

  useEffect(() => {
    const setScore = async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer :${token}`,
        },
        body: JSON.stringify({
          game: 'TETRIS',
          score: !localStorage.getItem("points") ? 0 : localStorage.getItem("points"),
          level: !localStorage.getItem("level") ? 0 : localStorage.getItem("level")
        }),
      });

      localStorage.removeItem("level");
      localStorage.removeItem("points")

      getUser(token)

      setLoading(false);
      if (res.status === 200) {
        navigate("/tetris");
      } else {
        alert("Could Not Save Scores ");
      }
    }

    if (loading)
      setScore();
  }, [loading])


  if (loading)
    return <Loader />

  return (
    <div className="Game">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} setLoading={setLoading} />
      )}
    </div>
  );
};

export default Game;
