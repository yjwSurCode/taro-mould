/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
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

import TaroRequest, { baseUrl } from "../../utils/service/api";
import { api_exhibition, api_orderList } from "../../utils/service/url";

import "./index.scss";

export default function Login(): ReturnType<Taro.FC> {
  const router = useRouter();
  const dispatch = useDispatch();
  const order: OrderStatus = useSelector((state: StoreStatus) => state.order);
  const [commodityList, setCommodityList] = useState([
    {
      imgUrls: "http://106.12.154.161/images/mo-design/commodity1.png",
      theme: "百年无极",
      name: "园丁手机壳",
      isChoiceness: true,
      spec: "78M",
      num: "200",
    },
  ]);
  const [selector, setselector] = useState([
    "全部",
    "百年无极",
    "MAKE",
    "神空一",
    "太微成",
  ]);
  const [selectorChecked, setselectorChecked] = useState("百年无极");
  const [selectItem, setselectItem] = useState(1);
  // TODO  {order.counter.num} 具体到某一个值
  console.log("router", router, order);

  const PickeronChange = (e) => {
    console.log("选择", e);
    setselectorChecked(selector[e.detail.value]);
    setselectItem(1);
  };

  const gomarketDetail = (val) => {
    Taro.navigateTo({
      url: "/view/market-detail/index",
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
          data: val,
        });
      },
    });
  };

  const initMarketData = () => {
    //! 请求首页数据
    TaroRequest.post(api_orderList, {
      page: 1,
      limit: 1000,
      // userId: Taro.getStorageSync("userId"),
    }).then((res) => {
      console.log(res.data.data, res.data.data.records, "api_orderList1111");
      setCommodityList(res.data.data.records);
      Taro.hideLoading();
      //TODO 后台定义数据格式 res.data.data
    });
  };

  useEffect(() => {
    Taro.showLoading({
      title: "Loading...",
      mask: true,
    });

    initMarketData();
  }, []);
  return (
    <View className="index">
      <CustomNavBar logo="left"></CustomNavBar>
      <View className="market-title">主题商城</View>
      {/* 筛选 */}
      <View className="filter-box">
        <Picker mode="selector" range={selector} onChange={PickeronChange}>
          <View style={{ color: selectItem === 1 ? "black" : "grey" }}>
            {selectorChecked}
            <AtIcon
              value="chevron-down"
              size="30"
              color={selectItem === 1 ? "black" : "grey"}
            ></AtIcon>
          </View>
        </Picker>
        <View
          onClick={() => setselectItem(2)}
          style={{ color: `${selectItem === 2 ? "black" : "grey"}` }}
        >
          销量
        </View>
        <View
          onClick={() => setselectItem(3)}
          style={{ color: `${selectItem === 3 ? "black" : "grey"}` }}
        >
          上新
        </View>
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
                <View
                  className="item-img-container"
                  onClick={() => gomarketDetail(item)}
                >
                  <View
                    className="item-img"
                    style={`background-image: url(${
                      item.imgUrls.split(",")[0]
                    });background-position: center;background-size: cover;`}
                  ></View>
                </View>
                <View className="item-title">
                  [{item.theme}]{item.name}
                </View>
                <View className="item-spec">{item.spec}</View>
                <View className="item-num">
                  仅剩{item.num ? item.num : "200"}件
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
