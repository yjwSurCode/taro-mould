import { ADD, MINUS, TOKEN } from "../types/index";

const INITIAL_STATE = {
  userInit: 0,
  userToken: "",
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MINUS:
      return {
        ...state,
        userInit: state.userInit - 1,
      };
    case TOKEN:
      return {
        ...state,
        userToken: action.payload.token,
      };
    default:
      return state;
  }
}
