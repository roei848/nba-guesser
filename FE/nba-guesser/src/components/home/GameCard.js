import React from "react";
import "./style.css";

class GameCard extends React.Component {
  render() {
    const { home_team, away_team } = this.props.game;
    return (
      <div className="card">
        <div className="content">
          <h5>
            {home_team.name}
            <span className="score">{home_team.score}</span>
          </h5>
          <p>
            {home_team.leadingScorer.name}
            <span className="scorer-pts">
              {home_team.leadingScorer.pts} pts
            </span>
          </p>
          <h4
            className="ui horizontal inverted divider"
            style={{ color: "black" }}
          >
            VS
          </h4>
          <h5>
            {away_team.name}
            <span className="score">{away_team.score}</span>
          </h5>
          <p>
            {away_team.leadingScorer.name}
            <span className="scorer-pts">
              {away_team.leadingScorer.pts} pts
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default GameCard;
