/* eslint-disable jsx-quotes */
import { Component, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, Text, Picker } from "@tarojs/components";
import { add, asyncAdd, setToken } from "../../store/actions";
import { StoreStatus, OrderStatus } from "../../store/types/index";
import { AtButton } from "taro-ui";

import TaroRequest, { baseUrl } from "../../utils/service/api";
import {
  api_login,
  api_getUserInfo,
  api_setUserInfo,
} from "../../utils/service/url";

import logo1 from "../../assets/login/logo1.png";
import logo2 from "../../assets/login/logo2.png";
import logo from "../../assets/login/logo3.png";

import "./index.scss";

export default function Login(): ReturnType<Taro.FC> {
  const router = useRouter();

  const dispatch = useDispatch();
  const order: OrderStatus = useSelector((state: StoreStatus) => state.order);

  // TODO  {order.counter.num} 具体到某一个值
  console.log("router", router, order);

  const getUserInfo = (openid) => {
    console.log(openid, "33333333333333");
    return Promise.resolve({ data: openid });
  };

  const handleLogin = () => {
    console.log("111111111111111111111", baseUrl + api_getUserInfo);
    return Taro.login().then((res) => {
      console.log("1.1", res); // {errMsg: "login:ok", code: "063n2f0w3zx9rZ2rLf1w3AEm6t4n2f0r"}
      Taro.hideLoading();
      return Taro.request({
        url: baseUrl + api_getUserInfo,
        method: "GET",
        data: { code: res.code },
      }).then((loginResult) => {
        console.log(
          loginResult,
          "2222222222222222-loginResult",
          loginResult.data.data.openid
        );
        if (loginResult.statusCode != 200) {
          Taro.showToast({
            title: "登录失败",
            icon: "error",
            duration: 2000,
          });
          return;
        }

        //! 存opneid
        Taro.setStorageSync("openid", loginResult.data.data.openid);

        return loginResult.data.data.openid;

        return Taro.getSetting().then((getSetting) => {
          if (getSetting.authSetting["scope.userInfo"]) {
            return getUserInfo(loginResult.data[0].data.openid);
          }
        }); //
      });
    });
  };

  const login = () => {
    Taro.showLoading({
      title: "加载中",
    });
    handleLogin().then((res) => {
      console.log(res, "44444444444444444444444");
      if (!res) {
        return;
      }
      Taro.showModal({
        title: "提示",
        content: "是否授权",
        success: (v) => {
          if (v.confirm) {
            console.log("用户点击确定", v);
            Taro.getUserProfile({ desc: "用于完善用户信息" })
              .then((userProfile) => {
                console.log(
                  userProfile,
                  userProfile.userInfo.nickName,
                  "userProfile.userInfo.nickName",
                  JSON.stringify(userProfile.userInfo.nickName)
                );

                return TaroRequest.post(api_setUserInfo, {
                  openid: Taro.getStorageSync("openid"),
                  nickName: userProfile.userInfo.nickName,
                  gender: userProfile.userInfo.gender,
                }).then((res) => {
                  console.log("登录返回信息", res.data.data);

                  // dispatch(setToken({ token: "Bearer " + res.data[0].token }));
                  //!存token(具体数据结构项目来定)
                  Taro.setStorageSync(
                    "Authorization",
                    "Bearer " + res.data.data.token
                  );
                  //!存userId(具体数据结构项目来定)
                  Taro.setStorageSync("userId", res.data.data.id);
                  //!存userId(具体数据结构项目来定)
                  Taro.setStorageSync(
                    "userName",
                    userProfile.userInfo.nickName
                  );

                  Taro.showToast({
                    title: "欢迎 " + userProfile.userInfo.nickName + "登录",
                    icon: "success",
                    duration: 5000,
                  });

                  setTimeout(() => {
                    Taro.switchTab({
                      url: "/pages/home/index",
                    });
                  }, 1000);
                });
              })
              .catch((error) => {
                console.log(error, "error");
              });
          } else if (v.cancel) {
            console.log("用户点击取消");
            Taro.showToast({
              title: "用户点击取消",
              icon: "error",
              duration: 2000,
            });
          }
        },
      });
    });
  };

  return (
    <View className="index">
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40%",
        }}
      >
        {/* <Image className="img" src={logo1} />
        <Image className="img" src={logo2} /> */}
        <Image className="img" src={logo} />
      </View>
      <Button className="btn" style={{ marginTop: "30vh" }} onClick={login}>
        一键登录
      </Button>

      {/* taro getPhoneNumber:fail no permission 微信认证-未认证-个人号无法认证 */}
      {/* <AtButton
        type="primary"
        openType="getPhoneNumber"
        onGetPhoneNumber={getPhoneNumber}
      >
        微信绑定手机号登录
      </AtButton> */}
    </View>
  );
}

Login.config = {
  navigationBarTitleText: "登录",
  navigationStyle: "custom",
  enablePullDownRefresh: true,
  backgroundTextStyle: "dark",
} as Taro.PageConfig;
