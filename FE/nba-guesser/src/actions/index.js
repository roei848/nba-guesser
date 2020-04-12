import { SIGN_IN, SIGN_OUT, FETCH_GAMES, SELECT_DATE } from "./types";
import mongo_api from "../apis/mongo_api";

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

export const fetchGames = (date) => async (dispatch) => {
  const response = await mongo_api.get(`/games/${date}`);

  dispatch({ type: FETCH_GAMES, payload: response.data });
};

export const selectDate = (date) => {
  return {
    type: SELECT_DATE,
    payload: date,
  };
};
