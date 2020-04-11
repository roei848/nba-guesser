import React from "react";
import { Switch, Route, Router } from "react-router-dom";

import Home from "./home/Home";
import Guess from "./guess/Guess";
import HistoryGuesses from "./guess/HistoryGuesses";
import MyLeagues from "./leagues/MyLeagues";
import CreateLeague from "./leagues/CreateLeague";
import JoinLeague from "./leagues/JoinLeague";
import Navbar from "./navbar/Navbar";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/guess/guess" exact component={Guess} />
              <Route
                path="/guess/historyGuesses"
                exact
                component={HistoryGuesses}
              />
              <Route path="/leagues/myLeagues" exact component={MyLeagues} />
              <Route path="/leagues/create" exact component={CreateLeague} />
              <Route path="/leagues/join" exact component={JoinLeague} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
