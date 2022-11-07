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
      theme: "",
      themeEnglish: "",
      minImg: "http://106.12.154.161/images/mo-design/home-ex.png",
    },
  ]);

  const dispatch = useDispatch();
  const user: UserStatus = useSelector((state: StoreStatus) => state.user);

  console.log("111", user);

  const onChange = () => {};

  const page = useMemo(() => Taro.getCurrentInstance().page, []);

  const goExhibitionPage = () => {
    Taro.preload(exList);

    Taro.navigateTo({
      url: "/components/exhibition/index",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data);
        },
        someEvent: function (data) {
          console.log(data);
        },
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit("acceptDataFromOpenerPage", {
          data: exList,
        });
      },
    });
  };

  const initExhibition = () => {
    //! 请求EX数据
    Taro.request({
      url: baseUrl + api_exhibition,
      method: "POST",
      data: { page: 1, limit: 1000 },
    }).then((res) => {
      console.log(res.data.data.records, "api_exhibition");
      const imgList: any = [];
      res.data.data.records.forEach((item, index) => {
        const minImg = item.imgUrl.split(",")[0];
        const maxImg = item.imgUrl.split(",")[1];
        const obj = {
          theme: item.theme,
          themeEnglish: item.themeEnglish,
          introduce: item.introduce,
          status: item.status,
          isCarousel: item.isCarousel,
          createTime: item.createTime,
          updateTime: item.updateTime,
          minImg: minImg,
          maxImg: maxImg,
        };
        imgList.push(obj);
      });

      console.log(imgList, "imgList");
      setExList(imgList);
      Taro.hideLoading();
    });
  };

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

    initExhibition();
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
      <View className="exhibition-search">
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
                <Image
                  src={item.minImg}
                  className="list-item-img"
                  onClick={goExhibitionPage}
                ></Image>
                <View className="list-item-title">{item.theme}</View>
                <View className="list-item-disc">{item.themeEnglish}</View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
