import React from "react";

import "./GameStats.css";

const GameStats = ({ gameStats }) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;


  return (
    <>
    <br></br>
    <br></br>
      <div className="GameStats">
        <div className="value">LEVEL <span>{level}</span></div>
        <div className="value">Lines to level  <span>{linesToLevel}</span></div>
        <div className="value">Points <span>{points}</span></div>
      </div>
    </>
  );
};

export default React.memo(GameStats);
