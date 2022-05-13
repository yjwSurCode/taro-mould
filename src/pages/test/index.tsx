/* eslint-disable jsx-quotes */
import { Component, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, Text, Picker } from "@tarojs/components";
import { add, asyncAdd } from "../../store/actions";
import { StoreStatus, OrderStatus } from "../../store/types/index";

export default function Login(): ReturnType<Taro.FC> {
  const router = useRouter();

  const dispatch = useDispatch();
  const order: OrderStatus = useSelector((state: StoreStatus) => state.order);

  // TODO  {order.counter.num} 具体到某一个值
  console.log("router", router, order);
  return (
    <View className="index">
      <View>{order.orderInit}</View>
      <Button onClick={() => dispatch(asyncAdd(1))}>++++++++++++++</Button>
    </View>
  );
}

Login.config = {
  navigationBarTitleText: "我的",
  navigationStyle: "custom",
  enablePullDownRefresh: true,
  backgroundTextStyle: "dark",
} as Taro.PageConfig;
