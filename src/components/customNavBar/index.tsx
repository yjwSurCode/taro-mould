/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, Text, Picker } from "@tarojs/components";
import { add, asyncAdd } from "../../store/actions";
import { StoreStatus, OrderStatus } from "../../store/types/index";
import { getSystemInfo } from "../../utils/hooks/getSystemInfo";
import logoImg_black from "../../assets/logo.png";
import logoImg_white from "../../assets/logo_white.png";

import logiImg_left from "../../assets/left-arrow.png";

import small_logiImg_left from "../../assets/small-left-arrow.png";

import "./index.less";

export default function CustomNavBar(props): ReturnType<Taro.FC> {
  const {
    title,
    background,
    backgroundColorTop,
    back,
    home,
    searchBar,
    searchText,
    iconTheme,
    extClass,
    navigateBack = false,
    isBackTab = false,
    backUrl = null,
    logo = "black", // black white left  right
    fullScreen = false,
    backgroundColor,
  } = props;

  const [configStyle, setConfigStyle] = useState<any>();

  const [navBarHeight, setNavBarHeight] = useState<any>();

  // const [navBarHeight, setNavBarHeight] = useState<any>();

  const goHome = () => {
    if (navigateBack) {
      Taro.navigateBack();
      return;
    }

    if (isBackTab) {
      Taro.switchTab({
        url: backUrl,
      });
      return;
    }

    if (backUrl) {
      Taro.navigateTo({
        url: backUrl,
      });
      return;
    }
    Taro.switchTab({
      url: "/pages/home/index",
    });
  };

  useEffect(() => {
    let globalSystemInfo = getSystemInfo();
    console.log(
      "22222222222222",
      configStyle?.windowHeight,
      configStyle?.safeArea.height,
      globalSystemInfo.then((res) => {
        console.log(
          res?.windowHeight - (res.safeArea as any).height,
          "2221",
          res
        );
        //设置距离顶部距离
        setNavBarHeight(res.statusBarHeight);

        // statusBarHeight;

        // let rightDistance = windowWidth - capsulePosition.right; //胶囊按钮右侧到屏幕右侧的边距
        // let leftWidth = windowWidth - capsulePosition.left; //胶囊按钮左侧到屏幕右侧的边距
      })
    );
  }, []);

  return (
    <View className="customNavPage-box">
      <View
        className="customNavPage"
        style={`z-index:99; backgroundColor: ${backgroundColor};height:${navBarHeight}px;position:${
          fullScreen ? "absolute" : "relative"
        };left:10px;top:${navBarHeight - 20}px`}
      >
        {logo === "black" && (
          <Image
            src={logoImg_black}
            onClick={goHome}
            className="imageLogo"
          ></Image>
        )}

        {logo === "white" && (
          <Image
            src={logoImg_white}
            onClick={goHome}
            className="imageLogo"
          ></Image>
        )}

        {logo === "left" && (
          <Image
            src={true ? small_logiImg_left : logoImg_black}
            onClick={goHome}
            className="imageLogo_small"
          ></Image>
        )}

        {/* {fullScreen ? (
        <Image src={logoImg} className="imageLogo"></Image>
      ) : (
        <Image src={logoImg} className="imageLogo"></Image>
      )} */}
      </View>
      {title && (
        <View className="title" style={`top:${navBarHeight + 10}px`}>
          {title}
        </View>
      )}
    </View>
  );
}
