import React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import ExpandTab from "./ExpandTab";
import GoogleAuth from "../GoogleAuth";
import { Link } from "react-router-dom";
import "./style.css";

class Navbar extends React.Component {
  state = {
    Tabs: {
      guess: [
        { id: 1, tabName: "Guess Scores", path: "/guess/guess" },
        { id: 2, tabName: "History Guesses", path: "/guess/historyGuesses" },
      ],
      leagues: [
        { id: 1, tabName: "My Leagues", path: "/leagues/myLeagues" },
        { id: 1, tabName: "Create New League", path: "/leagues/create" },
        { id: 1, tabName: "Join League", path: "/leagues/join" },
      ],
    },
  };

  render() {
    return (
      <AppBar
        title="Nba Guesser"
        className="app-bar-container"
        position="relative"
      >
        <Tabs>
          <Tab
            component={Link}
            to="/"
            label="Nba Guesser"
            textColor="inherit"
          ></Tab>
          <Tab
            component={React.forwardRef(() => (
              <ExpandTab title="Guess" menuItems={this.state.Tabs.guess} />
            ))}
          ></Tab>
          <Tab
            component={React.forwardRef(() => (
              <ExpandTab title="Leagues" menuItems={this.state.Tabs.leagues} />
            ))}
          ></Tab>
          <Tab
            component={React.forwardRef(() => (
              <GoogleAuth />
            ))}
          ></Tab>
        </Tabs>
      </AppBar>
    );
  }
}

export default Navbar;
