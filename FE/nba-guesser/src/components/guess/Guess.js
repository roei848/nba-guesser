import React from "react";
import GuessCard from "./GuessCard";
import "./style.css";
import { connect } from "react-redux";
import {
  fetchGames,
  fetchRosters,
  fetchUserGuessesByDate,
} from "../../actions";
import _ from "lodash";
import CalendarList from "../calendar/CalendarList";
import CircularProgress from "@material-ui/core/CircularProgress";

class Guess extends React.Component {
  state = {
    date: null, //the selected date, shows game cards of this date
  };

  componentDidMount() {
    //get current date and render game cards for this date, and get all rosters to store
    this.props.fetchRosters();
    this.getDate();
  }

  onChangeDate = (date) => {
    //when we call this it replace the date and render our date game cards
    this.setState({ date: date });
    this.props.fetchGames(date);
  };

  getDate() {
    const date = new Date();
    const dateString = this.convertDateToString(date);
    this.onChangeDate(dateString);
  }

  convertDateToString(date) {
    //convert date to a string that our api could work with
    var dateStr = date.toLocaleDateString();
    var dateSplit = dateStr.split(".");
    var dateSplitAfter = dateSplit.map((number) => {
      if (number.length === 1) {
        return `0${number}`;
      }
      return number;
    });
    var dateString = dateSplitAfter.join("-");
    return dateString;
  }

  componentDidUpdate = () => {
    console.log("componentDid Update");
    if (this.props.userId && this.state.date) {
      console.log("call fetch");
      this.props.fetchUserGuessesByDate(this.state.date, this.props.userId);
    }
  };

  renderGuessCards() {
    //render game cards depending on the api response
    const userGuesses = this.props.userGuesses[this.state.date];
    const isGamesNotLoaded = _.isEmpty(this.props.games);

    if (isGamesNotLoaded || userGuesses === undefined) {
      return (
        <CircularProgress
          size={200}
          thickness={5}
          className="loading"
        ></CircularProgress>
      );
    } else if (this.state.date in this.props.games) {
      if (_.isEmpty(this.props.games[this.state.date].games)) {
        return <h1>No games at this day... :(</h1>;
      } else {
        return this.props.games[this.state.date].games.map((game) => {
          const isGameGuessedAlready = userGuesses.some(
            (guess) => guess.game_id === game.game_id
          );
          if (isGameGuessedAlready) {
            return (
              <GuessCard
                game={game}
                key={game.game_id}
                form={game.game_id}
                date={this.state.date}
                guessed={true}
              />
            );
          } else {
            return (
              <GuessCard
                game={game}
                key={game.game_id}
                form={game.game_id}
                date={this.state.date}
                guessed={false}
              />
            );
          }
        });
      }
    } else {
      return (
        <CircularProgress
          size={200}
          thickness={5}
          className="loading"
        ></CircularProgress>
      );
    }
  }

  render() {
    return (
      <div className="ui container div-container">
        <CalendarList
          daysForward={7}
          daysBack={0}
          handleChangeDate={this.onChangeDate}
          selectedDate={this.state.date}
        />
        <div className="ui cards cards-div">{this.renderGuessCards()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    rosters: state.rosters,
    userId: state.auth.userId,
    userGuesses: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchRosters,
  fetchGames,
  fetchUserGuessesByDate,
})(Guess);
