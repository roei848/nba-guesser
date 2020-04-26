import React from "react";
import LeagueForm from "./LeagueForm";
import FormStepper from "./FormStepper";

class CreateLeague extends React.Component {
  onSubmit = (formValues) => {
    console.log(formValues);
  };

  render() {
    return (
      <div className="ui container create-div">
        <h3>Create New League</h3>
        <FormStepper handleSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default CreateLeague;
