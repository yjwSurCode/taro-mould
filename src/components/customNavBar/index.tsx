/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, Text, Picker } from "@tarojs/components";
import { add, asyncAdd } from "../../store/actions";
import { StoreStatus, OrderStatus } from "../../store/types/index";
import { getSystemInfo } from "../../utils/hooks/getSystemInfo";
import logoImg from "../../assets/logo1.png";

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
    backgroundColor = "red",
  } = props;

  const [configStyle, setConfigStyle] = useState<any>();

  const navBarHeight = useRef<number>();

  useEffect(() => {
    let globalSystemInfo = getSystemInfo();
    console.log(
      "globalSystemInfo",
      configStyle?.windowHeight,
      configStyle?.safeArea.height,
      globalSystemInfo.then((res) => setConfigStyle(res))
    );
    // setTimeout(() => {
    //   Taro.redirectTo({
    //     url: "/pages/home/index",
    //   });
    // }, 2000);
  }, []);

  useEffect(() => {
    navBarHeight.current =
      configStyle?.windowHeight - configStyle?.safeArea.height;

    console.log(
      "111",
      configStyle?.statusBarHeight,
      configStyle?.windowHeight,
      configStyle?.safeArea.height,
      "-----",
      navBarHeight.current
    );

    navBarHeight.current =
      configStyle?.windowHeight - configStyle?.safeArea.height + 20;

    // let rightDistance = windowWidth - capsulePosition.right; //胶囊按钮右侧到屏幕右侧的边距
    // let leftWidth = windowWidth - capsulePosition.left; //胶囊按钮左侧到屏幕右侧的边距
  }, [configStyle]);

  // const {
  //   navigationbarinnerStyle,
  //   navBarLeft,
  //   navBarHeight,
  //   capsulePosition,
  //   navBarExtendHeight,
  //   ios,
  //   rightDistance,
  // } = configStyle;

  // const {
  //   title,
  //   background,
  //   backgroundColorTop,
  //   back,
  //   home,
  //   searchBar,
  //   searchText,
  //   iconTheme,
  //   extClass,
  // } = this.props;

  // let nav_bar__center: any = null;

  // if (title) {
  //   nav_bar__center = <text>{title}</text>;
  // } else if (searchBar) {
  //   nav_bar__center = (
  //     <View
  //       className="lxy-nav-bar-search"
  //       style={`height:${capsulePosition.height}px;`}
  //       onClick={this.handleSearchClick.bind(this)}
  //     >
  //       <View className="lxy-nav-bar-search__icon" />
  //       <View className="lxy-nav-bar-search__input">{searchText}</View>
  //     </View>
  //   );
  // } else {
  //   /* eslint-disable */
  //   nav_bar__center = this.props.renderCenter;
  //   /* eslint-enable */
  // }

  return (
    <View
      className="customNavPage"
      style={`backgroundColor: ${backgroundColor};height:${navBarHeight.current}px;`}
    >
      <Image
        src={logoImg}
        style={{
          width: "60px",
          height: "60px",
          position: "absolute",
          bottom: "0px",
        }}
      ></Image>
    </View>
    // <View
    //   className={`lxy-nav-bar ${ios ? "ios" : "android"} ${extClass}`}
    //   style={`background: ${
    //     backgroundColorTop ? backgroundColorTop : background
    //   };height:${navBarHeight + navBarExtendHeight}px;`}
    // >
    //   <View
    //     className={`lxy-nav-bar__placeholder ${ios ? "ios" : "android"}`}
    //     style={`padding-top: ${navBarHeight + navBarExtendHeight}px;`}
    //   />
    //   <View
    //     className={`lxy-nav-bar__inner ${ios ? "ios" : "android"}`}
    //     style={`background:${background};${navigationbarinnerStyle};`}
    //   >
    //     <View className="lxy-nav-bar__left" style={navBarLeft}>
    //       {back && !home && (
    //         <View
    //           onClick={this.handleBackClick.bind(this)}
    //           className={`lxy-nav-bar__button lxy-nav-bar__btn_goback ${iconTheme}`}
    //         />
    //       )}
    //       {!back && home && (
    //         <View
    //           onClick={this.handleGoHomeClick.bind(this)}
    //           className={`lxy-nav-bar__button lxy-nav-bar__btn_gohome ${iconTheme}`}
    //         />
    //       )}
    //       {back && home && (
    //         <View className={`lxy-nav-bar__buttons ${ios ? "ios" : "android"}`}>
    //           <View
    //             onClick={this.handleBackClick.bind(this)}
    //             className={`lxy-nav-bar__button lxy-nav-bar__btn_goback ${iconTheme}`}
    //           />
    //           <View
    //             onClick={this.handleGoHomeClick.bind(this)}
    //             className={`lxy-nav-bar__button lxy-nav-bar__btn_gohome ${iconTheme}}`}
    //           />
    //         </View>
    //       )}
    //       {!back && !home && this.props.renderLeft}
    //     </View>
    //     <View
    //       className="lxy-nav-bar__center"
    //       style={`padding-left: ${rightDistance}px`}
    //     >
    //       {nav_bar__center}
    //     </View>
    //     <View
    //       className="lxy-nav-bar__right"
    //       style={`margin-right: ${rightDistance}px`}
    //     >
    //       {this.props.renderRight}
    //     </View>
    //   </View>
    // </View>
  );
}
