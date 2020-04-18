import { FETCH_ROSTERS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROSTERS:
      let newState = {};
      action.payload.forEach((team) => {
        newState[team.team_name] = team.players;
      });
      return newState;
    default:
      return state;
  }
};
