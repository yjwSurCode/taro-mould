/* eslint-disable jsx-quotes */
import { Component, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { AtList, AtListItem, AtIcon, AtInputNumber, AtCheckbox } from "taro-ui";
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

  const [list, setlist] = useState([
    { id: 1, img: "http://106.12.154.161/images/mo-design/merket-detail.png" },
    { id: 2, img: "http://106.12.154.161/images/mo-design/merket-detail.png" },
    { id: 1, img: "http://106.12.154.161/images/mo-design/merket-detail.png" },
    { id: 2, img: "http://106.12.154.161/images/mo-design/merket-detail.png" },
  ]);

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

  const allcheckboxOption = [
    {
      value: "list1",
      label: "全选",
    },
  ];

  const checkboxOption = [
    {
      value: "list1",
      label: "",
      // desc: "部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。",
    },
  ];

  const [shopNumber, setshopNumber] = useState(1);

  const handleChange = (e) => {
    console.log("handleChange", e);
  };

  return (
    <View className="index">
      <CustomNavBar
        title="购物袋"
        logo="left"
        fullScreen={false}
        backUrl="/view/market/index"
      ></CustomNavBar>
      {/* 物品列表 */}
      <View className="shop-list" style={{ marginTop: "65px" }}>
        {list.map((item, index) => {
          return (
            <View className="shop-list-item">
              <View style={{ display: "flex", alignItems: "center" }}>
                <AtCheckbox
                  options={checkboxOption}
                  selectedList={["list1"]}
                  onChange={handleChange}
                />
                <Image className="item-img" src={item.img}></Image>
              </View>
              <View className="item-content">
                <View className="action-title">[百年无极]藤条香氛</View>
                <View className="action-have">有货</View>
                <View className="action">
                  <View className="action-price">¥ 398</View>
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
                </View>
              </View>
            </View>
          );
        })}
      </View>
      {/* 结算 */}
      <View className="settlement-box">
        <AtCheckbox
          options={allcheckboxOption}
          selectedList={["list1"]}
          onChange={handleChange}
        />
        <View className="settlement-content">
          <View style={{ textAlign: "center", marginRight: "10px" }}>
            <View className="allPrice">¥ 0</View>
            <View className="disc">不含运费</View>
          </View>
          <View className="settlement">结算</View>
        </View>
      </View>
    </View>
  );
}
