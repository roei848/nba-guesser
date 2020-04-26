import React from "react";
import "./style.css";
import GameCard from "../home/GameCard";
import { Field, reduxForm, SubmissionError } from "redux-form";
import DropdownList from "react-widgets/lib/DropdownList";
import SelectList from "react-widgets/lib/SelectList";
import "react-widgets/dist/css/react-widgets.css";
import { connect } from "react-redux";
import { createGuess } from "../../actions";
import _ from "lodash";
import "./style.css";

const renderDropdownList = ({ input, ...rest }) => (
  <div>
    <DropdownList {...input} {...rest} />
  </div>
);

const renderSelectList = ({ input, ...rest }) => (
  <SelectList {...input} onBlur={() => input.onBlur()} {...rest} />
);

const GuessCard = (props) => {
  const { handleSubmit, reset, error, userId, date, guessed } = props;
  const { home_team, away_team, game_id } = props.game;
  const isGamePlayed = home_team.score != null;
  const isRostersLoaded = !_.isEmpty(props.rosters);

  const createPlayers = (team_name) => {
    //create players for dropdown list
    let players = [];

    props.rosters[team_name].forEach((player) => {
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
    //if rosters in store loaded create dropdown lists
    homeTeamPlayers = createPlayers(home_team.name);
    awayTeamPlayers = createPlayers(away_team.name);
  }

  let playerInDropdown = ({ item }) => {
    //component for every player in dropdown
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

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const submit = (values) => {
    //called when we submit our guess
    return sleep(1000).then(() => {
      // simulate server latency
      if (!("homeScorer" in values)) {
        throw new SubmissionError({
          homeScorer: "Choose home scorer",
          _error: "Submit failed - Choose home team scorer",
        });
      } else if (!("awayScorer" in values)) {
        throw new SubmissionError({
          awayScorer: "Choose away scorer",
          _error: "Submit failed - Choose away team scorer",
        });
      } else if (!("winner" in values)) {
        throw new SubmissionError({
          winner: "Choose winner",
          _error: "Submit failed - Choose winner",
        });
      } else {
        const guess = {
          winner: values.winner,
          homeScorer: values.homeScorer.value,
          awayScorer: values.awayScorer.value,
        };
        const body = {
          date: date,
          game_id: game_id,
          guess: guess,
        };
        props.createGuess(userId, body);
        reset();
      }
    });
  };

  //check if the game played or in the future
  const renderCard = () => {
    //render scorer only if the game has played
    if (isGamePlayed) {
      return <GameCard game={props.game}></GameCard>;
    } else {
      return (
        <div className={`ui card ${guessed ? "guessed" : ""}`}>
          <form className="guess-form" onSubmit={handleSubmit(submit)}>
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
                placeholder="Choose Scoring Leader"
                disabled={guessed}
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
                placeholder="Choose Scoring Leader"
                disabled={guessed}
              />
            </div>
            <Field
              name="winner"
              component={renderSelectList}
              data={[home_team.name, away_team.name]}
              disabled={guessed}
            />
            {error && <strong>{error}</strong>}
            <div className="buttons-div">
              <button
                type="submit"
                className="ui button primary"
                disabled={guessed}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={reset}
                className="ui button"
                disabled={guessed}
              >
                Reset Values
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  return <>{renderCard()}</>;
};

const mapStateToProps = (state) => {
  return {
    rosters: state.rosters,
    userId: state.auth.userId,
  };
};

const formWrapped = reduxForm()(GuessCard);

export default connect(mapStateToProps, { createGuess })(formWrapped);
