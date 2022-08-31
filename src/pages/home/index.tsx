/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
import Taro, { useRouter, useDidShow } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, Text, Picker } from "@tarojs/components";
import { add, asyncAdd } from "../../store/actions";
import { StoreStatus, OrderStatus, UserStatus } from "../../store/types/index";
import {
  AtTabs,
  AtTabsPane,
  AtNavBar,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
  AtCurtain,
  AtGrid,
  AtList,
  AtListItem,
  AtCountdown,
  AtButton,
} from "taro-ui";

import TaroRequest, { baseUrl } from "../../utils/service/api";
import {
  api_login,
  api_getUserInfo,
  api_setUserInfo,
  api_seckill,
  api_seckillList,
  api_orderList,
} from "../../utils/service/url";

import type CustomTabBar from "../../custom-tab-bar/index";

import "./index.scss";

export default function Home(): ReturnType<Taro.FC> {
  // useEffect(() => {
  //   const pageCtx = Taro.getCurrentInstance().page;

  //   const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
  //   console.log(tabbar, "tabbar,,pageCtx", pageCtx);
  //   tabbar?.setSelected(0);

  // }, []);

  useDidShow(() => {
    //获取自定义 TabBar 对应的 React 或 Vue 组件实例
    const pageObj = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar(pageObj);

    // console.log(tabbar, "tabbar,,pageCtx", pageObj);
    // tabbar?.setSelected(0);
  });

  return (
    <View className="home">
      {/* <CustomNavBar></CustomNavBar> */}
      <View>homehomehomehome</View>
    </View>
  );
}
