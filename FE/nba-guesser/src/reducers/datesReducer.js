import { SELECT_DATE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_DATE:
      return action.payload;
    default:
      return state;
  }
};
