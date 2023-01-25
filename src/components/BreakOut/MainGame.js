import { useEffect, useRef, useState } from "react";
import { MoveBall } from "./props/Ball";
import { useNavigate } from "react-router-dom";
import data from "./data";
import WallCollision from "./utils/WallCollision";
import Racquet from "./props/Racquet";
import Brick from "./props/Brick";
import BrickCollision from "./utils/BrickCollision";
import RacquetHit from "./utils/RacquetHit";
import ScoreBoard from "./props/ScoreBoard";
import AllBroken from "./utils/AllBroken";
import ResetBall from "./utils/ResetBall";
import './MainGame.css'

import useUserStore from '../../store/user'
import Loader from '../Loader/Loader'

const MainGame = () => {
    const canvasRef = useRef(null);
    const { ballData, racquetData, brickData, playerData } = data;
    const [gameOver, setGameOver] = useState(false)
    const [gameStart, setGameStart] = useState(false)
    const [loading, setLoading] = useState(false)
    const [finalScore, setFinalScore] = useState(0)
    const user = useUserStore(state => state.user)

    const token = useUserStore(state => state.token)
    const getUser = useUserStore(state => state.getUser)
    const navigate = useNavigate()

    useEffect(() => {
        const updateScore = async () => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-score`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer :${token}`,
                },
                body: JSON.stringify({ game: 'BKOUT', score: finalScore }),
            });

            getUser(token)

            if (res.status === 200) {
                navigate("/");
            } else {
                alert("Could Not Save Scores ");
            }
        }

        if (loading)
            updateScore();
    }, [loading])


    const moveRacquet = (event) => racquetData.x = event.clientX - racquetData.width * 2;

    const startGame = () => {
        setGameStart(true);
    }
    const restartGame = () => {
        setLoading(true);
    }

    useEffect(() => {
        let bricks = [];

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            canvas.height = window.innerHeight * 90 / 100;
            canvas.width = window.innerWidth * 80 / 100;

            racquetData.y = canvas.height - 30;

            let brickSet = Brick(playerData.level, bricks, canvas, brickData);

            if (brickSet && brickSet.length > 0) {
                bricks = brickSet;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ScoreBoard(ctx, playerData, canvas);

            if (gameStart && playerData.lives === 0) {
                setFinalScore(playerData.score)
                // alert(`GAMEOVER! You scored ${playerData.score} points`);
                setGameOver(true)
                // setGameStart(false);
                playerData.lives = 3;
                playerData.level = 1;
                playerData.score = 0;
                bricks.length = 0;
                ResetBall(ballData, canvas, racquetData);
            }

            bricks.map((brick) => brick.draw(ctx));

            MoveBall(ctx, ballData);

            AllBroken(bricks, playerData, canvas, ballData, brickData);

            WallCollision(ballData, playerData, canvas, racquetData);

            let brickCollision;

            for (let i = 0; i < bricks.length; i++) {
                brickCollision = BrickCollision(ballData, bricks[i]);

                if (brickCollision.hit && !bricks[i].broke) {
                    if (brickCollision.axis === "X") {
                        ballData.dx *= -1;
                        bricks[i].broke = true;
                    } else if (brickCollision.axis === "Y") {
                        ballData.dy *= -1;
                        bricks[i].broke = true;
                    }
                    playerData.score += 10;
                }
            }

            Racquet(ctx, canvas, racquetData);
            RacquetHit(ballData, racquetData);
            requestAnimationFrame(render);
            ctx.fillText(`Player Name : ${user.name}`, 200, 30)
            ctx.fillText(`HighScore : ${user.breakout.highScore}`, 800, 30)
        };

        if (gameStart) {
            render();
        }

    }, [ballData, brickData, playerData, racquetData, gameStart]);

    if (loading)
        return <Loader />

    return (
        <div className="BreakOut-Board">
            <h1 style={{ display: !gameStart || gameOver ? "none" : "flex" }}>Break Out</h1>
            <canvas
                id="canvas"
                ref={canvasRef}
                onMouseMove={(e) => moveRacquet(e)}
                style={{ display: !gameStart || gameOver ? "none" : "flex" }}
            />
            <div
                className="GameStartWindow"
                style={{ display: gameStart ? "none" : "flex" }}>
                <div
                    className="GameStartInner"
                    style={{
                        width: `${window.innerWidth * 80 / 100}px`,
                        height: `${window.innerHeight * 90 / 100}px`
                    }}>
                    <h1>{playerData.name}</h1>
                    <br></br>
                    <button onClick={() => startGame()}>Start</button>
                </div>
            </div>
            <div
                className="GameStartWindow"
                style={{ display: !gameOver ? "none" : "flex" }}>
                <div
                    className="GameStartInner"
                    style={{
                        width: `${window.innerWidth * 80 / 100}px`,
                        height: `${window.innerHeight * 90 / 100}px`
                    }}>
                    <h1>Game Over</h1>
                    <h2>{finalScore} pts</h2>
                    <br></br>
                    <button onClick={() => restartGame()}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default MainGame;
