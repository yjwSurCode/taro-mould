/* eslint-disable jsx-quotes */
import { Component, useRef, useState } from "react";
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

import "./index.scss";

export default function Login(): ReturnType<Taro.FC> {
  const router = useRouter();

  const dispatch = useDispatch();
  const order: OrderStatus = useSelector((state: StoreStatus) => state.order);

  const [selector, setselector] = useState([
    "百年无极",
    "MAKE",
    "神空一",
    "太微成",
  ]);

  const [shopNumber, setshopNumber] = useState(1);

  const [shopDetail, setshopDetail] = useState([
    {
      img: [
        "http://106.12.154.161/images/mo-design/merket-detail.png",
        "http://106.12.154.161/images/mo-design/merket-detail.png",
      ],
    },
  ]);

  // const shopInfo=

  // TODO  {order.counter.num} 具体到某一个值
  console.log("router", router, order);

  const shopNumberChange = (e) => {
    console.log(e, "e");
  };

  return (
    <View className="index">
      <CustomNavBar
        logo="left"
        fullScreen={true}
        backUrl="/view/market/index"
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
        {shopDetail[0].img.map((item, index) => {
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
        <View className="action-title">[百年无极] 藤条香氛</View>
        <View className="action-color">#3f7462</View>
        <View className="action-price">¥ 398</View>
        <View className="action-content">
          汉卡·扎布罗夫 斯卡肖像藤条香薰汉卡·扎布罗夫
          斯卡肖像藤条香薰汉卡·扎布罗夫 斯卡肖像藤条香薰汉卡·扎布罗夫
          斯卡肖像藤条香薰
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
            <View className="shop-cart">加入购物车</View>
            <View className="pick">即刻选购</View>
          </View>
        </View>
      </View>
    </View>
  );
}
