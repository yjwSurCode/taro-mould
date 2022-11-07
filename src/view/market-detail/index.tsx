/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { AtList, AtListItem, AtIcon, AtInputNumber } from "taro-ui";
import {
  View,
  Button,
  Image,
  Text,
  Picker,
  Swiper,
  SwiperItem,
  CoverImage,
} from "@tarojs/components";
import { useDispatch, useSelector } from "react-redux";
import { add, asyncAdd } from "../../store/actions";
import { StoreStatus, OrderStatus } from "../../store/types/index";

import CustomNavBar from "../../components/customNavBar/index";

import TaroRequest, { baseUrl } from "../../utils/service/api";
import { api_exhibition, api_addShopCart } from "../../utils/service/url";

import "./index.scss";

export default function Login(): ReturnType<Taro.FC> {
  const router = useRouter();
  const dispatch = useDispatch();
  const order: OrderStatus = useSelector((state: StoreStatus) => state.order);

  const [shopNumber, setshopNumber] = useState(1);
  const [swiper, setSwiper] = useState([]);
  const [shopDetail, setshopDetail] = useState({
    img: [
      "http://106.12.154.161/images/mo-design/merket-detail.png",
      "http://106.12.154.161/images/mo-design/merket-detail.png",
    ],
    id: 1,
    theme: "1",
    name: "2",
    price: "123",
    introduce: "123",
    num: "1",
    exhibitionId: "1",
  });

  // const shopInfo=

  // TODO  {order.counter.num} 具体到某一个值
  console.log("router", router, order);

  const shopNumberChange = (e) => {
    console.log(e, "e");
    setshopNumber(e);
  };

  const addShopCart = (v) => {
    const val = Taro.getStorageSync("userId");
    if (!val) {
      setTimeout(() => {
        Taro.showToast({
          title: "请登录",
          icon: "error",
          duration: 500,
        });
      }, 500);

      setTimeout(() => {
        Taro.redirectTo({
          url: "/components/login/index",
        });
      }, 1500);

      return;
    }

    Taro.showLoading({
      title: "adding...",
      mask: true,
    });

    TaroRequest.post(api_addShopCart, {
      productList: [
        {
          id: shopDetail.id,
          num: shopNumber,
          exhibitionId: shopDetail.exhibitionId,
          // name: shopDetail.name,
          // theme: shopDetail.name,
          // stock: shopDetail.num,
          // price: shopDetail.price,
        },
      ],
      userId: Taro.getStorageSync("userId"),
    }).then((res) => {
      Taro.hideLoading();

      setTimeout(() => {
        Taro.navigateTo({
          url: "/view/shop-cart/index",
        });
      }, 100);

      //TODO 后台定义数据格式 res.data.data
    });
  };

  useEffect(() => {
    Taro.showLoading({
      title: "加载中",
    });
    const pages = Taro.getCurrentPages();
    const current = pages[pages.length - 1];
    const eventChannel = current.getOpenerEventChannel();

    //! 触发A页面的 events 中的 someEvent
    eventChannel.emit("someEvent", { queNumber: "lsk--->" });
    //! 接收 A页面的 events 中的 acceptDataFromOpenerPage 传递的数据
    eventChannel.on("acceptDataFromOpenerPage", (res) => {
      console.log("page_test222222", res);
      //TODO 判断是否数组
      setshopDetail(res.data);
      //! 获取轮播图数据
      const arr = res.data.imgUrls.split(","); //[111, 222, 33333];
      arr.splice(
        arr.findIndex((item, index) => index === 0),
        1
      );
      setSwiper(arr);
      if (!res) {
        Taro.showToast({ title: "error", icon: "error" });
        return;
      }
      setTimeout(function () {
        Taro.hideLoading();
      }, 0);
    });
  }, []);

  return (
    <View className="index">
      <CustomNavBar
        logo="left"
        fullScreen={true}
        backUrl="/view/market/index"
        navigateBack={true}
      ></CustomNavBar>

      {/*  轮播 */}
      <Swiper
        className="swiper-container"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        {swiper.map((item, index) => {
          return (
            <SwiperItem>
              <View className="demo-text-1">
                {/* <CoverImage className="shop-img" src={item} /> */}
                <Image className="shop-img" src={item} />
                <View>{item}</View>
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
      {/* <Image src={item.img} ></Image> */}
      {/* 操作区 */}
      <View className="action-region">
        {/* //! 数据不对就会导致渲染错误 */}
        <View className="action-title">
          [{shopDetail?.theme || "undefined"}]{shopDetail?.name || "undefined"}
        </View>
        <View className="action-color">#3f7462</View>
        <View className="action-price">
          ¥ {shopDetail?.price || "undefined"}
        </View>
        <View className="action-content">
          {shopDetail.introduce || "undefined"}
          {/* 汉卡·扎布罗夫 斯卡肖像藤条香薰汉卡·扎布罗夫
          斯卡肖像藤条香薰汉卡·扎布罗夫 斯卡肖像藤条香薰汉卡·扎布罗夫
          斯卡肖像藤条香薰 */}
        </View>
        <View className="purchasing">
          <AtInputNumber
            customStyle={{ color: "red" }}
            type="number"
            min={0}
            max={10}
            step={1}
            size="normal"
            value={shopNumber}
            onChange={shopNumberChange}
          />
          <View className="btn-box">
            <View className="shop-cart" onClick={addShopCart}>
              加入购物车
            </View>
            <View className="pick">即刻选购</View>
          </View>
        </View>
      </View>
    </View>
  );
}
