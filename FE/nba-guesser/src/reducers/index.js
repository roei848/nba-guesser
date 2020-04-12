import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gamesReducer from "./gamesReducer";
import datesReducer from "./datesReducer";

export default combineReducers({
  auth: authReducer,
  games: gamesReducer,
  dates: datesReducer,
});
