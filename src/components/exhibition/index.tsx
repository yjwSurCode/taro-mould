/* eslint-disable jsx-quotes */
import { Component, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, Text, Picker } from "@tarojs/components";

import CustomNavBar from "../customNavBar/index";
import all1 from "../../assets/alll.png";
import all2 from "../../assets/alll2.png";

import { pageHeight, pageWidth } from "../../utils/hooks/getPageHeight";

import "./index.less";
import { useEffect } from "react";

export default function exhibition(): ReturnType<Taro.FC> {
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [animationData1, setAnimationData1] = useState<any>(0);
  const [animationData2, setAnimationData2] = useState<any>(0);

  let animation1 = Taro.createAnimation({
    // transformOrigin: "50% 50%",
    duration: 1000,
    timingFunction: "ease",
    delay: 0,
  });

  let animation2 = Taro.createAnimation({
    // transformOrigin: "50% 50%",
    duration: 1000,
    timingFunction: "ease",
    delay: 0,
  });

  const switchImg = () => {
    console.log("1");

    setCurrentImg(currentImg === 1 ? 0 : 1);

    animation1.translateX(-400).step();
    animation1.opacity(0).step();
    setAnimationData1(animation1.export());

    animation2.translateX(-400).step();
    setAnimationData2(animation2.export());
  };

  useEffect(() => {
    // animation.translate(150, 0).rotate(180).step();
    // animation.opacity(0).scale(0).step();

    console.log("88888");

    // animation2.translateX(300).step();
    // animation2.opacity(1).step();
    // setAnimationData2(animation2.export());
    // else {
    //   animation2.opacity(0);
    //   setAnimationData2(animation2.export());
    // }
  }, [currentImg]);
  return (
    <View className="exhibition-page" style={`height:${pageHeight}px;`}>
      <CustomNavBar fullScreen={true}></CustomNavBar>

      <View className="image-box" style={`width:${pageWidth * 2}px;`}>
        <View
          style={`height:${pageHeight}px;width:${pageWidth}px; background-image: url(${all1});`}
          animation={animationData1}
          className="exhibition-page-img"
        ></View>
        <View
          style={`height:${pageHeight}px;width:${pageWidth}px; background-image: url(${all2});`}
          animation={animationData2}
          className="exhibition-page-img"
        ></View>
        {/* {currentImg === 0 && (
          <Image
            style={`height:${pageHeight}px;width:${pageWidth}px`}
            animation={animationData1}
            className="exhibition-page-img"
            src={all1}
          ></Image>
        )}
        {currentImg === 1 && (
          <Image
            style={`height:${pageHeight}px;width:${pageWidth}px`}
            animation={animationData2}
            className="exhibition-page-img"
            src={all2}
          ></Image>
        )} */}
      </View>
      <View
        style={`height:${100}px;width:${100}px; background-image: url(${all2});`}
        animation={animationData1}
        className="exhibition-page-img"
      ></View>
      <View animation={animationData1}>999999999999999</View>
      <View onClick={() => alert(1)}>文案1</View>

      <View onClick={() => switchImg()}>切换切换切换切换切换切换切换切换</View>
    </View>
  );
}
