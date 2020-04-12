import React from "react";
import GameCard from "./GameCard";
import "./style.css";
import CalendarDiv from "./CalendarDiv";
import { connect } from "react-redux";
import { fetchGames, selectDate } from "../../actions";
import _ from "lodash";
import CalendarList from "../calendar/CalendarList";

class Home extends React.Component {
  state = {
    date: null,
  };

  componentDidMount() {
    this.getDate();
  }

  onChangeDate(date) {
    this.props.fetchGames(date);
  }

  getDate() {
    const date = new Date();
    const dateString = this.convertDateToString(date);
    this.props.fetchGames(dateString);
  }

  convertDateToString(date) {
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
    if (_.isEmpty(this.props.games)) {
      return <h1>Loading...</h1>;
    } else {
      return this.props.games.games.map((game, index) => {
        return <GameCard game={game} key={index} />;
      });
    }
  }

  render() {
    return (
      <div className="ui container div-container">
        {/* <CalendarDiv date={this.state.date} /> */}
        <CalendarList daysForward={3} daysBack={2} />
        <div className="ui cards">{this.renderGameCards()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { games: state.games, dates: state.dates };
};

export default connect(mapStateToProps, { fetchGames, selectDate })(Home);
