import { SWITCH, ADD, TOKEN, MINUS, SET } from "../types/index";

export const switchFn = (getState, dispatch?) => {
  return {
    type: SWITCH,
    payload: getState,
  };
};

export const add = (getState, dispatch?) => {
  return {
    type: ADD,
    payload: getState,
  };
};

export const setToken = (getState, dispatch?) => {
  console.log("1111111111111", getState); // { {},token: "Bearer undefined" }
  return {
    type: TOKEN,
    payload: getState,
  };
};

export const setCurrentList = () => (dispatch, getState) => {
  const { list, current } = getState().order;
  if (current === 0) {
    dispatch({
      type: ADD,
      payload: list,
    });
  } else {
    dispatch({
      type: ADD,
      payload: list.filter((v) => current - 1 === v.status),
    });
  }
};

// 异步的action   getState, getStates 是传递的参数  dispatch是函数
export function asyncAdd(getState, getStates?) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(55555);
      }, 200);
    }).then((res) => {
      dispatch(add(res));
    });
  };
}

export function asyncSwitchAction(getState, getStates?) {
  // return (dispatch) => {
  //   dispatch(switchFn(getState));
  // };
  console.log(getState, "p-getState");
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getState);
      }, 0);
    }).then((res) => {
      dispatch(switchFn(res));
    });
  };
}
