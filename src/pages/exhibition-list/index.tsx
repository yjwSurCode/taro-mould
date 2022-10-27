/* eslint-disable jsx-quotes */
import { Component, useRef, useMemo, useState, useEffect } from "react";
import Taro, { useRouter, useDidShow } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Button,
  Image,
  Text,
  Picker,
  ScrollView,
} from "@tarojs/components";
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
  AtSearchBar,
} from "taro-ui";

import TaroRequest, { baseUrl } from "../../utils/service/api";
import { api_login, api_exhibition } from "../../utils/service/url";

import CustomNavBar from "../../components/customNavBar/index";

// import img1 from "../../assets/home-ex.png";
// import img2 from "../../assets/ex-list2.png";

import "./index.scss";

export default function Home(): ReturnType<Taro.FC> {
  const [searchValue, setSearchValue] = useState("");
  const [exList, setExList] = useState([
    {
      title: "百年无极",
      disc: "The Infinite Univeris of WUJI",
      img: "http://106.12.154.161/images/mo-design/home-ex.png",
    },
    {
      title: "“叙”写传奇",
      disc: "An Exhibition of Antiquities Form Syrie",
      img: "http://106.12.154.161/images/mo-design/ex-list2.png",
    },
    {
      title: "百年无极",
      disc: "The Infinite Univeris of WUJI",
      img: "http://106.12.154.161/images/mo-design/home-ex.png",
    },
    {
      title: "“叙”写传奇",
      disc: "An Exhibition of Antiquities Form Syrie",
      img: "http://106.12.154.161/images/mo-design/ex-list2.png",
    },
  ]);

  const dispatch = useDispatch();
  const user: UserStatus = useSelector((state: StoreStatus) => state.user);

  console.log("111", user);

  const onChange = () => {};

  const page = useMemo(() => Taro.getCurrentInstance().page, []);

  useDidShow(() => {
    //获取自定义 TabBar 对应的 React 或 Vue 组件实例
    // const pageObj = Taro.getCurrentInstance().page;
    // const tabbar = Taro.getTabBar(page);
    // console.log(tabbar, "tabbar,,pageCtx");
    // (tabbar as any).setSelected(0);
    // Taro.switchTab(pageObj.path);
    // tabbar?.setSelected(0);
  });

  useEffect(() => {
    Taro.showLoading({
      title: "Loading...",
      mask: true,
    });

    Taro.request({
      url: baseUrl + api_exhibition,
      method: "GET",
      data: { page: "res.code", limit: "123" },
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

      // return Taro.getSetting().then((getSetting) => {
      //   if (getSetting.authSetting["scope.userInfo"]) {
      //     return getUserInfo(loginResult.data[0].data.openid);
      //   }
      // }); //
    });

    setTimeout(() => {
      Taro.hideLoading();
    }, 1000);
  }, []);

  useDidShow(() => {
    //获取自定义 TabBar 对应的 React 或 Vue 组件实例
    // const pageObj = Taro.getCurrentInstance().page;
    // const tabbar = Taro.getTabBar(pageObj);
    // console.log(tabbar, "tabbar,,pageCtx", pageObj);
    //! 改变tabar
    // dispatch(asyncSwitchAction(0));
  });

  return (
    <View className="exhibition-list-page">
      <CustomNavBar></CustomNavBar>
      {/* 搜索 */}
      <View
        style={{ margin: "20px", marginTop: "50px" }}
        className="exhibition-search"
      >
        <AtSearchBar
          value={searchValue}
          onChange={onChange}
          placeholder="百年无极艺术展"
        />
      </View>

      {/* 展品列表 */}
      <ScrollView scrollX={false}>
        <View
          className="exhibition-list"
          //!! tabbar navbar
          style={{ paddingBottom: `${user.customTabBar}px` }}
        >
          <View className="exhibition-list-title">近期展览</View>
          {exList.map((item, index) => {
            return (
              <View className="list-item">
                <Image src={item.img} className="list-item-img"></Image>
                <View className="list-item-title">{item.title}</View>
                <View className="list-item-disc">{item.disc}</View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
