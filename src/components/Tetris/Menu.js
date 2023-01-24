import "./Menu.css";
import NavBar from "../Main/NavBar/NavBar";

const Menu = ({ onClick }) => (
  <>
    <NavBar />
    <div className='scoring'>
      <h1>Scoring And Controls</h1>
      <br></br>
      <h3>You will have a Tetris board where there will be tetrominoes of different shapes and colors. 1 Point will be awarded for every line cleared.</h3>
      <br></br>
      <h3> ArrowUp: Rotate</h3>
      <h3>ArrowDown: SlowDrop</h3>
      <h3>ArrowLeft: Left</h3>
      <h3>ArrowRight: Right</h3>
      <h3>KeyQ: Quit</h3>
      <h3>KeyP: Pause</h3>
      <h3>Space:FastDrop</h3>
      <br></br>
      <div className="Menu">
        <button className="Button" onClick={onClick}>
          Play Tetris
        </button>
      </div>
    </div>
  </>
);

export default Menu;
