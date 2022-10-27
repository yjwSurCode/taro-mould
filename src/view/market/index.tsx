/* eslint-disable jsx-quotes */
import { Component, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { AtList, AtListItem, AtIcon } from "taro-ui";
import { View, Button, Image, Text, Picker } from "@tarojs/components";
import { useDispatch, useSelector } from "react-redux";
import { add, asyncAdd } from "../../store/actions";
import { StoreStatus, OrderStatus } from "../../store/types/index";

import CustomNavBar from "../../components/customNavBar/index";

import commodity1 from "../../assets/home/commodity1.png";
import commodity2 from "../../assets/home/commodity2.png";
import commodity3 from "../../assets/home/commodity3.png";
import commodity4 from "../../assets/home/commity4.png";

import "./index.scss";

export default function Login(): ReturnType<Taro.FC> {
  const router = useRouter();

  const dispatch = useDispatch();
  const order: OrderStatus = useSelector((state: StoreStatus) => state.order);

  const [commodityList, setCommodityList] = useState([
    {
      img: "http://106.12.154.161/images/mo-design/commodity1.png",
      classic: "百年无极",
      title: "园丁手机壳",
    },
    {
      img: "http://106.12.154.161/images/mo-design/commodity2.png",
      classic: "百年无极",
      title: "主题马克杯",
    },
    {
      img: "http://106.12.154.161/images/mo-design/commodity3.png",
      classic: "百年无极",
      title: "园丁手机壳",
    },
    {
      img: "http://106.12.154.161/images/mo-design/commity4.png",
      classic: "百年无极",
      title: "园丁手机壳",
    },
    {
      img: "http://106.12.154.161/images/mo-design/commodity1.png",
      classic: "百年无极",
      title: "园丁手机壳",
    },
    {
      img: "http://106.12.154.161/images/mo-design/commodity2.png",
      classic: "百年无极",
      title: "主题马克杯",
    },
    {
      img: "http://106.12.154.161/images/mo-design/commodity3.png",
      classic: "百年无极",
      title: "园丁手机壳",
    },
    {
      img: "http://106.12.154.161/images/mo-design/commity4.png",
      classic: "百年无极",
      title: "园丁手机壳",
    },
  ]);

  const [selector, setselector] = useState([
    "百年无极",
    "MAKE",
    "神空一",
    "太微成",
  ]);

  const [selectorChecked, setselectorChecked] = useState("百年无极");

  // TODO  {order.counter.num} 具体到某一个值
  console.log("router", router, order);

  const PickeronChange = (e) => {
    setselectorChecked(e);
  };

  const gomarketDetail = () => {
    Taro.navigateTo({
      url: "/view/market-detail/index",
    });
  };
  return (
    <View className="index">
      <CustomNavBar logo="left"></CustomNavBar>
      <View
        style={{ margin: "20px", marginTop: "50px" }}
        className="market-title"
      >
        主题商城
      </View>
      {/* 筛选 */}
      <View className="filter-box">
        <Picker mode="selector" range={selector} onChange={PickeronChange}>
          <View style={{ color: "grey" }}>
            {selectorChecked}
            <AtIcon value="chevron-down" size="30" color="grey"></AtIcon>
          </View>
        </Picker>
        <View>销量</View>
        <View>上新</View>
      </View>
      {/*  商品列表 Commodity list */}
      <View
        // style={{ paddingBottom: `${user.customTabBar}px` }}
        className="commodity-list-box"
      >
        <View className="commodity-list-content">
          {commodityList.map((item, index) => {
            return (
              <View className="item">
                <View className="item-img-container" onClick={gomarketDetail}>
                  <View
                    className="item-img"
                    style={`background-image: url(${item.img});background-position: center;background-size: contain;`}
                  ></View>
                </View>
                <View className="item-title">
                  [{item.classic}]{item.title}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

Login.config = {
  navigationBarTitleText: "我的",
  navigationStyle: "custom",
  enablePullDownRefresh: true,
  backgroundTextStyle: "dark",
} as Taro.PageConfig;
