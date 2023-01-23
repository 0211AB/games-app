import React from "react";

import "./GameStats.css";

const GameStats = ({ gameStats }) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <div className="GameStats">
      <div className="value">LEVEL : {level}</div>
      <div className="value">Lines to level : {linesToLevel}</div>
      <div className="value">Points : {points}</div>
    </div>
  );
};

export default React.memo(GameStats);
