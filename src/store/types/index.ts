export const ADD = "ADD";
export const MINUS = "MINUS";
export const SET = "SET";
export const TOKEN = "TOKEN";

//每一个库的属性值

export interface OrderStatus {
  orderInit: number;
}

export interface UserStatus {
  userToken: string;
  userInit: number;
}

export interface StoreStatus {
  order: OrderStatus;
  user: any;
}
