import React from "react";
import "./style.css";
import GameCard from "../home/GameCard";
import { Field, reduxForm } from "redux-form";
import DropdownList from "react-widgets/lib/DropdownList";
import SelectList from "react-widgets/lib/SelectList";
import "react-widgets/dist/css/react-widgets.css";
import { connect } from "react-redux";
import _ from "lodash";
import "./style.css";

const renderDropdownList = ({ input, ...rest }) => (
  <DropdownList {...input} {...rest} />
);

const renderSelectList = ({ input, ...rest }) => (
  <SelectList {...input} onBlur={() => input.onBlur()} {...rest} />
);

const GuessCard = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const { home_team, away_team } = props.game;
  const isGamePlayed = home_team.score != null;
  const isRostersLoaded = !_.isEmpty(props.rosters);

  const createPlayers = (team_name) => {
    let players = [];

    props.rosters[team_name].map((player) => {
      const playerObj = {
        player: {
          first_name: player.first_name,
          last_name: player.last_name,
          status: player.status,
          ppg: player.ppg,
        },
        text: `${player.first_name.charAt(0)}. ${player.last_name}`,
        value: `${player.first_name} ${player.last_name}`,
      };
      players.push(playerObj);
    });

    //sort list in dropdown by point per game
    players.sort((a, b) => {
      return parseFloat(a.player.ppg) > parseFloat(b.player.ppg) ? -1 : 1;
    });

    return players;
  };

  var homeTeamPlayers, awayTeamPlayers;

  if (isRostersLoaded) {
    homeTeamPlayers = createPlayers(home_team.name);
    awayTeamPlayers = createPlayers(away_team.name);
  }

  let playerInDropdown = ({ item }) => {
    const { player } = item;
    return (
      <span className="dropdown-list-item">
        <strong>{`${player.first_name.charAt(0)}. ${player.last_name}`}</strong>
        <span style={{ float: "right" }}>
          <span>{player.ppg} PPG</span>
          <span
            className={
              player.status === "Active"
                ? "dot active"
                : player.status === "Day-To-Day"
                ? "dot day-to-day"
                : "dot out"
            }
          ></span>
        </span>
      </span>
    );
  };

  const onResetValues = () => {
    console.log("called reset");
    document.getElementById("guess-form").reset();
  };

  const onSubmit = () => {
    console.log("called submit");
  };

  //check if the game played or in the future
  const renderCard = () => {
    //render scorer only if the game has played
    if (isGamePlayed) {
      return <GameCard game={props.game}></GameCard>;
    } else {
      return (
        <div className="ui card">
          <form className="guess-form" id="guess-form">
            <div className="content ">
              <h5>{home_team.name}</h5>
              <label>Scoring Leader: </label>
              <Field
                name="homeScorer"
                busy={homeTeamPlayers === undefined}
                className="scorer-dropdown"
                component={renderDropdownList}
                data={homeTeamPlayers}
                value={props.key}
                valueField="value"
                itemComponent={playerInDropdown}
                textField="text"
              />
              <h4
                className="ui horizontal inverted divider"
                style={{ color: "black" }}
              >
                VS
              </h4>
              <h5>{away_team.name}</h5>
              <label>Scoring Leader: </label>
              <Field
                name="awayScorer"
                busy={awayTeamPlayers === undefined}
                className="scorer-dropdown"
                component={renderDropdownList}
                data={awayTeamPlayers}
                value={props.key}
                valueField="value"
                itemComponent={playerInDropdown}
                textField="text"
              />
            </div>
            <Field
              name="winner"
              component={renderSelectList}
              data={[home_team.name, away_team.name]}
            />
            <div className="buttons-div">
              <button type="submit" onClick={onSubmit}>
                Submit
              </button>
              <button type="button" onClick={reset}>
                Reset Values
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  console.log(props.id);

  return <>{renderCard()}</>;
};

const mapStateToProps = (state) => {
  return {
    rosters: state.rosters,
  };
};

const formWrapped = reduxForm()(GuessCard);

export default connect(mapStateToProps)(formWrapped);
