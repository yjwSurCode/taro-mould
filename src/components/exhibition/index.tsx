/* eslint-disable jsx-quotes */
import { Component, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, Text, Picker } from "@tarojs/components";
import all1 from "../../assets/alll.png";
import all2 from "../../assets/alll2.png";

import "./index.less";

export default function exhibition(): ReturnType<Taro.FC> {
  const [currentImg, setCurrentImg] = useState<number>();
  const switchImg = () => {};
  return (
    <View className="exhibition-page">
      {currentImg === 0 && (
        <Image className="exhibition-page-img" src={all1}></Image>
      )}
      {currentImg === 1 && <Image src={all2}></Image>}
      <View onClick={switchImg}>切换</View>
    </View>
  );
}
