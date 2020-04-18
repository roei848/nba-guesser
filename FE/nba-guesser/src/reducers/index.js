import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import gamesReducer from "./gamesReducer";
import datesReducer from "./datesReducer";
import rosterReducer from "./rosterReducer";

export default combineReducers({
  auth: authReducer,
  games: gamesReducer,
  dates: datesReducer,
  form: formReducer,
  rosters: rosterReducer,
});
