import { ADD, MINUS, SET } from "../types/index";

export const add = (getState, dispatch?) => {
  return {
    type: ADD,
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

// 异步的action   getState, getStates 是传递的两个参数  dispatch是函数
export function asyncAdd(getState, getStates?) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(55555);
      }, 2000);
    }).then((res) => {
      dispatch(add(res));
    });
  };
}
