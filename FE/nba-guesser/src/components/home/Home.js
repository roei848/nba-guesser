import React from "react";
import GameCard from "./GameCard";
import "./style.css";
import CalendarDiv from "./CalendarDiv";

class Home extends React.Component {
  state = {
    date: null,
    document: {
      date: "2020-01-01",
      gamesArr: [
        {
          home_team: {
            name: "WSH",
            score: 101,
            leadingScorer: { name: "Bradley Beal", pts: 27 },
          },
          away_team: {
            name: "ORL",
            score: 122,
            leadingScorer: { name: "D.J. Augustin", pts: 25 },
          },
        },
        {
          home_team: {
            name: "NY",
            score: 117,
            leadingScorer: { name: "Julius Randle", pts: 22 },
          },
          away_team: {
            name: "POR",
            score: 93,
            leadingScorer: { name: "Carmelo Anthony", pts: 26 },
          },
        },
      ],
    },
  };

  componentWillMount() {
    this.renderDate();
  }

  renderDate() {
    const date = new Date().toLocaleDateString();
    const dateString = this.convertDateToString(date);

    this.setState({ date: dateString });
  }

  convertDateToString(date) {
    var dateSplit = date.split(".");
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
    return this.state.document.gamesArr.map((game) => {
      return <GameCard game={game} />;
    });
  }

  render() {
    return (
      <div className="ui container div-container">
        <CalendarDiv date={this.state.date} />
        <div className="ui cards">{this.renderGameCards()}</div>
      </div>
    );
  }
}

export default Home;
