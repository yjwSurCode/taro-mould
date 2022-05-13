import { ADD } from "../types/index";

const INITIAL_STATE = {
  orderInit: 0,
};

export default function counter(state = INITIAL_STATE, action) {
  //action.payload就是对应action传递的
  switch (action.type) {
    case ADD:
      return {
        ...state,
        orderInit: action.payload,
      };
    default:
      return state;
  }
}
