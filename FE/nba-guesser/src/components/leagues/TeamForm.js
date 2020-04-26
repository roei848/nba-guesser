import React from "react";
import { reduxForm, Field } from "redux-form";

class TeamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label htmlFor="">{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="teamName"
          component={this.renderInput}
          label="Enter Team Name"
        />
        <Field
          name="coachName"
          component={this.renderInput}
          label="Enter Coach Name"
        />
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.teamName) {
    errors.teamName = "You must enter a team name";
  }
  if (!formValues.coachName) {
    errors.coachName = "You must enter a coach name";
  }

  return errors;
};

export default reduxForm({
  form: "TeamForm",
  validate,
})(TeamForm);
