import React from "react";
import "./style.css";

class CalendarDiv extends React.Component {
  render() {
    return (
      <div className="calendar-div">
        <button className="ui button">{this.props.date}</button>
      </div>
    );
  }
}

export default CalendarDiv;
