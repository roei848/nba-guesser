import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_GAMES,
  SELECT_DATE,
  FETCH_ROSTERS,
  CREATE_GUESS,
  CREATE_USER_COLLECTIONS,
  FETCH_USER_GUESSES_BY_DATE,
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

export const createGuess = (userId, body) => async (dispatch) => {
  const response = await mongo_api.post(`/guesses/post/${userId}`, body);

  dispatch({ type: CREATE_GUESS, payload: response.data });
};

export const createUserCollections = (userId) => async (dispatch) => {
  const response = await mongo_api.get(`/userCreate/${userId}`);

  dispatch({ type: CREATE_USER_COLLECTIONS, payload: response.data });
};

export const fetchUserGuessesByDate = (date, userId) => async (dispatch) =>
  _fetchUserGuessesByDate(date, userId, dispatch);
const _fetchUserGuessesByDate = _.memoize(async (date, userId, dispatch) => {
  console.log(`/userGuesses/${userId}/${date}`);
  const response = await mongo_api.get(`/userGuesses/${userId}/${date}`);

  dispatch({
    type: FETCH_USER_GUESSES_BY_DATE,
    payload: response.data,
    date: date,
  });
});
