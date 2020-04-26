import React from "react";
import { reduxForm, Field } from "redux-form";

class LeagueForm extends React.Component {
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
          name="leagueName"
          component={this.renderInput}
          label="Enter League Name"
        />
        <Field
          name="password"
          component={this.renderInput}
          label="Enter Password"
        />
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.leagueName) {
    errors.leagueName = "You must enter a league name";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

export default reduxForm({
  form: "leagueForm",
  validate,
})(LeagueForm);
