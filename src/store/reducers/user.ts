import { ADD, MINUS, TOKEN, SWITCH } from "../types/index";

const INITIAL_STATE = {
  userInit: 0,
  userToken: "",
  selectIndex: 0,
  customTabBar: 75,
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
    case SWITCH:
      return {
        ...state,
        selectIndex: action.payload,
      };

    default:
      return state;
  }
}
