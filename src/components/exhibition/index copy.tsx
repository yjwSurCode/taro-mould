/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
import Taro, { useRouter, usePageScroll, useReachBottom } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Button,
  Image,
  Text,
  Picker,
  ScrollView,
} from "@tarojs/components";

import CustomNavBar from "../customNavBar/index";

import { pageHeight, pageWidth } from "../../utils/hooks/getPageHeight";

import topArrow from "../../assets/topArrow.png";
import finishEx from "../../assets/exhibtion-finish.png";

import leftArrow from "../../assets/exli/Slice 44@2x.png";
import leftArrow_s from "../../assets/exli/Slice 45@2x.png";
import rightArrow from "../../assets/exli/Slice 8@2x.png";
import rightArrow_s from "../../assets/exli/Slice 9@2x.png";

import "./index.scss";

export default function Exhibition(): ReturnType<Taro.FC> {
  const startXY = useRef({ startClientX: 0, startClientY: 0 });
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [finish, setfinish] = useState<boolean>(false);
  const [contentList, setContentList] = useState([
    {
      img: "http://106.12.154.161/images/mo-design/all1.png",
      disc: "我拥有自然、艺术和诗歌，我还有什么不满足呢？--梵·高",
    },
    {
      img: "http://106.12.154.161/images/mo-design/all2.png",
      disc: "《R》上一根折叠的线条，划过大红的圆，构成点、线、面的联系，他致力于通过抽象形式引发直觉感受",
    },
    {
      img: "http://106.12.154.161/images/mo-design/all3.png",
      disc: "第二次世界大战期间，许多欧洲艺术家为躲避战乱纷纷前往美国，西方艺术的中心由巴黎移至纽约，为新大陆带去了立体主义、达达主义、超现实主义；美国本土艺术家在此基础上发展出抽象表现主义、波普艺术等新的艺术理念与形式，又反哺旧大陆。",
    },
  ]);

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

  const switchImg = (v: string) => {
    console.log("111111", v);

    if (v === "pre") {
      if (currentImg === 0) {
        return;
      }
      setCurrentImg(currentImg - 1);
    }

    if (v === "next") {
      if (currentImg === contentList.length - 1) {
        return;
      }
      setCurrentImg(currentImg + 1);
    }
  };

  const touchstartFn = (v) => {
    console.log(v.touches, "11111");
    startXY.current = {
      startClientX: v.touches[0].clientX,
      startClientY: v.touches[0].clientY,
    };
  };

  const touchmoveFn = (v) => {
    console.log(
      v.touches,
      "22222",
      startXY.current.startClientY - v.touches[0].clientY
    );
    //简易判断上滑
    if (Math.abs(startXY.current.startClientY - v.touches[0].clientY) > 70) {
      console.log("判断成功上滑");
      Taro.navigateTo({
        url: "/view/market/index",
      });
      return;
    }
  };

  const touchendFn = (v) => {
    console.log(v.touches, "33333");
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

  usePageScroll((res) => {
    console.log(res.scrollTop);
  });

  useReachBottom(() => {
    console.log("onReachBottom");
  });

  return (
    <View className="exhibition-page" style={`height:${pageHeight}px;`}>
      111
      {/* <CustomNavBar fullScreen={true}></CustomNavBar>
      {finish && (
        <View className="overlay">
          <Image className="finish-img" src={finishEx}></Image>
        </View>
      )}
      <View
        className="image-box"
        style={`height:${pageHeight}px;width:${pageWidth}px;`}
      >
        {contentList.map((item, index) => {
          return (
            <View>
              {currentImg === index && (
                <View>
                  <View
                    style={`height:${pageHeight}px;width:${pageWidth}px; background-image: url(${item.img});background-position: center;`}
                    // animation={animationData1}
                    className="exhibition-page-img"
                  ></View>
                  <View className="exhibition-disc">{item.disc}</View>
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View className="action-container">
        <View className="action-bnt-box">
          <Image
            className="action-btn-box-img"
            onClick={() => switchImg("pre")}
            src={currentImg === 0 ? leftArrow : leftArrow_s}
          ></Image>
          <Image
            className="action-btn-box-img"
            onClick={() => switchImg("next")}
            src={
              currentImg === contentList.length - 1 ? rightArrow : rightArrow_s
            }
          ></Image>
        </View>
        <View
          className="action-swiper"
          onTouchStart={touchstartFn}
          onTouchMove={touchmoveFn}
          onTouchEnd={touchendFn}
        >
          <Image className="action-swiper-img" src={topArrow}></Image>
          <View>上滑选购主题商品</View>
        </View>
      </View> */}
    </View>
  );
}
