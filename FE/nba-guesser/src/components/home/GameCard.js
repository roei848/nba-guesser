import React from "react";
import "./style.css";

const GameCard = (props) => {
  //Game card component, render for every game a card
  const { home_team, away_team } = props.game;
  const isGamePlayed = home_team.score != null;
  //check if the game played or in the future
  const renderScores = (scorer) => {
    //render scorer only if the game has played
    if (isGamePlayed) {
      return (
        <p>
          {scorer.name}
          <span className="scorer-pts">{scorer.pts} pts</span>
        </p>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="card">
      <div className="content">
        <h5>
          {home_team.name}
          <span className="score">{isGamePlayed ? home_team.score : ""}</span>
        </h5>
        {renderScores(home_team.leading_scorer)}
        <h4
          className="ui horizontal inverted divider"
          style={{ color: "black" }}
        >
          VS
        </h4>
        <h5>
          {away_team.name}
          <span className="score">{isGamePlayed ? away_team.score : ""}</span>
        </h5>
        {renderScores(away_team.leading_scorer)}
      </div>
    </div>
  );
};

export default GameCard;
