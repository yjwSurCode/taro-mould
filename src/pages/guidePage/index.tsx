/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, Text, Picker } from "@tarojs/components";
import { add, asyncAdd } from "../../store/actions";
import { StoreStatus, OrderStatus } from "../../store/types/index";
import { getSystemInfo } from "../../utils/hooks/getSystemInfo";

import guideImg from "../../assets/动图.gif";

import logo1 from "../../assets/login/logo1.png";
import logo2 from "../../assets/login/logo2.png";
import logo3 from "../../assets/login/logo3.png";

import "./index.scss";

export default function Login(): ReturnType<Taro.FC> {
  const [configStyle, setConfigStyle] = useState<any>();

  useEffect(() => {
    let globalSystemInfo = getSystemInfo();
    console.log(
      "globalSystemInfo",
      globalSystemInfo.then((res) => setConfigStyle(res))
    );

    // console.log(
    //   Taro.getStorageSync("initFlag"),
    //   'Taro.getStorageSync("initFlag")'
    // );

    // if (Taro.getStorageSync("initFlag") == 1) {
    //   Taro.switchTab({
    //     url: "/pages/home/index",
    //   });
    //   return;
    // }

    setTimeout(() => {
      Taro.switchTab({
        url: "/pages/home/index",
      });
    }, 1000);
  }, []);

  useEffect(() => {}, [configStyle]);

  return (
    <View className="guideImgPage">
      {/* <CustomNavBar></CustomNavBar> */}
      {/* <Image src={guideImg} /> */}
      <View style={{ lineHeight: "100%" }}>
        <Image className="img" src={logo3} />
        <View className="text">设计商店</View>
      </View>
    </View>
  );
}

Login.config = {
  navigationBarTitleText: "引导页面",
  navigationStyle: "custom",
  enablePullDownRefresh: true,
  backgroundTextStyle: "dark",
} as Taro.PageConfig;
