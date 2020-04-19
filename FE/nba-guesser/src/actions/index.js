import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_GAMES,
  SELECT_DATE,
  FETCH_ROSTERS,
  CREAETE_GUESS,
} from "./types";
import mongo_api from "../apis/mongo_api";
import _ from "lodash";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const fetchGames = (date) => async (dispatch) =>
  _fetchGames(date, dispatch);
const _fetchGames = _.memoize(async (date, dispatch) => {
  const response = await mongo_api.get(`/games/${date}`);

  dispatch({ type: FETCH_GAMES, payload: response.data });
});

export const selectDate = (date) => {
  return {
    type: SELECT_DATE,
    payload: date,
  };
};

export const fetchRosters = () => async (dispatch) => _fetchRosters(dispatch);
const _fetchRosters = _.memoize(async (dispatch) => {
  const response = await mongo_api.get("/rosters");

  dispatch({ type: FETCH_ROSTERS, payload: response.data });
});

export const createGuess = (body) => async (dispatch) => {
  const response = await mongo_api.post("/guesses/post", body);

  dispatch({ type: CREAETE_GUESS, payload: response.data });
};
