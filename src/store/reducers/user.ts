import { ADD, MINUS } from "../types/index";

const INITIAL_STATE = {
  userInit: 0,
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MINUS:
      return {
        ...state,
        userInit: state.userInit - 1,
      };
    default:
      return state;
  }
}
