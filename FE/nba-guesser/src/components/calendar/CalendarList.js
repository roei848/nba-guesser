import React, { Component } from "react";

class CalendarList extends Component {
  state = {
    dates: [],
  };

  componentDidMount() {
    this.getDatesForCalendar();
  }

  getDatesForCalendar() {
    const dayInMiliSec = 1000 * 60 * 60 * 24;
    var i;
    var dates = [];
    for (i = this.props.daysBack * -1; i < this.props.daysForward; i++) {
      var date = new Date(Date.now() + i * dayInMiliSec);
      var dateString = this.convertDateToString(date);
      dates.push(dateString);
    }
    this.setState({ dates: dates });
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

  render() {
    return (
      <div
        className="ui horizontal bulleted list"
        style={{ justifyContent: "center" }}
      >
        {this.state.dates.map((date, index) => {
          if (date === this.props.selectedDate) {
            return (
              <button key={index} className="item ui button primary">
                {date}
              </button>
            );
          }
          return (
            <button
              key={index}
              className="item ui button"
              onClick={() => this.props.handleChangeDate(date)}
            >
              {date}
            </button>
          );
        })}
      </div>
    );
  }
}

export default CalendarList;
