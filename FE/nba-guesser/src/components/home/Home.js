import React from "react";
import GameCard from "./GameCard";
import "./style.css";
import { connect } from "react-redux";
import { fetchGames, selectDate } from "../../actions";
import _ from "lodash";
import CalendarList from "../calendar/CalendarList";
import CircularProgress from "@material-ui/core/CircularProgress";

class Home extends React.Component {
  state = {
    date: null, //the selected date, shows game cards of this date
  };

  componentDidMount() {
    //get current date and render game cards for this date
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

  renderGameCards() {
    //render game cards depending on the api response
    if (_.isEmpty(this.props.games)) {
      return (
        <CircularProgress
          size={200}
          thickness={5}
          className="loading"
        ></CircularProgress>
      );
    } else if (this.state.date in this.props.games) {
      if (_.isEmpty(this.props.games[this.state.date].games)) {
        return <h1>No games Today... :(</h1>;
      } else {
        return this.props.games[this.state.date].games.map((game, index) => {
          return <GameCard game={game} key={index} />;
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
          daysBack={2}
          handleChangeDate={this.onChangeDate}
          selectedDate={this.state.date}
        />
        <div className="ui cards cards-div">{this.renderGameCards()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { games: state.games, dates: state.dates };
};

export default connect(mapStateToProps, { fetchGames, selectDate })(Home);
