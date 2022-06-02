import Taro, { useRouter, useDidShow } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, Text } from "@tarojs/components";

import "./index.scss";

export default function Login(): ReturnType<Taro.FC> {
  const handleLogin = () => {
    Taro.switchTab({
      url: "/pages/task/index"
    });
  };
  return (
    <View className="index" onClick={handleLogin}>
      一键登录登录
    </View>
  );
}

Login.config = {
  navigationBarTitleText: "我的",
  navigationStyle: "custom",
  enablePullDownRefresh: true,
  backgroundTextStyle: "dark"
} as Taro.PageConfig;
