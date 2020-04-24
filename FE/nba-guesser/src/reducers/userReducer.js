import {
  CREATE_USER_COLLECTIONS,
  CREATE_GUESS,
  FETCH_USER_GUESSES_BY_DATE,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_COLLECTIONS:
      return { ...state, userCreateCollection: action.payload };
    case CREATE_GUESS:
      return { ...state, guess: action.payload };
    case FETCH_USER_GUESSES_BY_DATE:
      return { ...state, [action.date]: action.payload };
    default:
      return state;
  }
};
