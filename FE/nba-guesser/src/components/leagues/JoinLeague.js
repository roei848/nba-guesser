import React from "react";
import LeagueForm from "./LeagueForm";

class JoinLeague extends React.Component {
  onSubmit = (formValues) => {
    console.log(formValues);
  };

  render() {
    return (
      <div className="ui container join-div">
        <h3>Join New League</h3>
        <LeagueForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default JoinLeague;
