import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

class MyLeagues extends React.Component {
  state = {
    leagues: [
      {
        mongo_id: 3211521423514,
        leagueName: "My League",
        password: "roei848",
        startDate: "13-04-2020",
        participants: [
          {
            userId: 123124142154216,
            team_name: "jordans",
            coach_name: "roei cohen",
            pts: 142,
          },
          {
            userId: 1423341254216,
            team_name: "splash",
            coach_name: "Dan biton",
            pts: 124,
          },
        ],
      },
    ],
  };

  renderTableBody() {
    return (
      <tbody>
        {this.state.leagues.map((league) => {
          return (
            <tr>
              <td>{league.leagueName}</td>
              <td>{league.participants.length}</td>
              <td>4</td>
              <td>{league.startDate}</td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: "20px" }}>
        <table className="ui striped table">
          <thead>
            <tr>
              <th>League Name</th>
              <th>Number of Participants</th>
              <th>Position</th>
              <th>Start Date</th>
              <th></th>
            </tr>
          </thead>
          {this.renderTableBody()}
        </table>
        <div className="buttons-div">
          <Link className="ui button big" to="/leagues/create">
            Create New League
          </Link>
          <Link className="ui button big" to="/leagues/join">
            Join League
          </Link>
        </div>
      </div>
    );
  }
}

export default MyLeagues;
