/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
import Taro, {
  useRouter,
  useDidShow,
  usePageScroll,
  useReachBottom,
} from "@tarojs/taro";
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

import { AtCurtain, AtButton } from "taro-ui";

// import { pageHeight, pageWidth } from "../../utils/hooks/getPageHeight";

import topArrow from "../../assets/topArrow.png";
import finishEx from "../../assets/exhibtion-finish.png";

import leftArrow from "../../assets/exli/leftArrow.png";
import leftArrow_s from "../../assets/exli/leftArrows.png";
import rightArrow from "../../assets/exli/rightArrow.png";
import rightArrow_s from "../../assets/exli/rightArrows.png";

import "./index.scss";

export default function Exhibition(): ReturnType<Taro.FC> {
  const startXY = useRef({ startClientX: 0, startClientY: 0 });
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [pageHeight, setheightPage] = useState<number>(0);
  const [pageWidth, setpageWidth] = useState<number>(0);
  const [finish, setfinish] = useState<boolean>(false);
  const [animationExport, setanimationExport] = useState<any>();
  const [exData, setExData] = useState<
    Array<{ maxImg: string; introduce: string }> | []
  >([
    {
      maxImg: "http://106.12.154.161/images/mo-design/all1.png",
      introduce: "12312",
    },
    {
      maxImg: "http://106.12.154.161/images/mo-design/all2.png",
      introduce: "12312",
    },
  ]);

  const [isGO, setisGO] = useState<boolean>(false);

  const createAnimation = Taro.createAnimation({
    transformOrigin: "50% 50%",
    duration: 1000,
    timingFunction: "ease",
    delay: 0,
  });

  const switchImg = (v: string) => {
    // createAnimation.opacity

    // setanimationExport(createAnimation.export());

    if (v === "pre") {
      if (currentImg === 0) {
        return;
      }
      setCurrentImg(currentImg - 1);
    }

    if (v === "next") {
      if (currentImg === exData.length - 1) {
        return;
      }
      setCurrentImg(currentImg + 1);
    }
  };

  const touchstartFn = (v) => {
    console.log(v.touches, "11111");
    setisGO(false);
    startXY.current = {
      startClientX: v.touches[0].clientX,
      startClientY: v.touches[0].clientY,
    };
  };

  const touchmoveFn = (v) => {
    console.log(
      v.touches,
      "22222222222222222222",
      startXY.current.startClientY - v.touches[0].clientY
    );

    //简易判断上滑
    if (
      Math.abs(startXY.current.startClientY - v.touches[0].clientY) > 70 &&
      isGO == false
    ) {
      console.log("判断成功上滑"); //多次触发
      setisGO(true);
      Taro.navigateTo({
        url: "/view/market/index",
      });
      return;
    }

    return;
  };

  const touchendFn = (v) => {
    console.log(v.touches, "33333");
  };

  const AtCurtainonClose = (v) => {
    console.log(v.touches, "4455");
  };

  useDidShow(() => {
    console.log("aaaaaaaaaa");
    console.log("获取到数据", Taro.getCurrentInstance().preloadData); // 获取到数据
    const obj: any = Taro.getCurrentInstance().preloadData;
    if (obj == undefined) {
      Taro.showLoading();
      // Taro.showLoading({
      //   title: "",
      // });
      return;
    }
    setExData(obj);
  });

  useEffect(() => {
    Taro.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight, "7777");
        setheightPage(res.windowHeight);
        setpageWidth(res.windowWidth);
      },
    });
    // Promise.all(
    //   [
    //     actInfo.template?.cardBackImg || actInfo.cardList[0].cardBackImg,
    //     count1,
    //     count2,
    //     count3,
    //     gameContentBg,
    //     gamePopupBg,
    //     step1,
    //     step2,
    //     step3,
    //     step4,
    //     stageTip,
    //   ].map((url) =>
    //     loadImage(url).catch((err) => {
    //       logUtils.error(`load image ${url} failed: ${err}`);
    //     })
    //   )
    // );

    // var img = new Image(); //创建一个Image对象，实现图片的预下载
    // img.onload = function () {
    //   img.onload = null;
    //   callback(img);
    // };
    // img.src = url;

    return;

    Taro.showLoading({
      title: "加载中",
    });
    const pages = Taro.getCurrentPages();
    const current = pages[pages.length - 1];
    const eventChannel = current.getOpenerEventChannel();

    // 触发A页面的 events 中的 someEvent
    eventChannel.emit("someEvent", { queNumber: "lsk--->" });

    // 接收 A页面的 events 中的 acceptDataFromOpenerPage 传递的数据
    eventChannel.on("acceptDataFromOpenerPage", (res) => {
      console.log("page_test", res);
      setExData(res.data);

      if (!res) {
        Taro.showToast({ title: "error", icon: "error" });
        return;
      }
      setTimeout(function () {
        Taro.hideLoading();
      }, 300);
    });
  }, []);

  usePageScroll((res) => {
    console.log(res.scrollTop);
  });

  useReachBottom(() => {
    console.log("onReachBottom");
  });

  return (
    <View
      className="exhibition-page"
      style={`height:${pageHeight}px;backgroundColor: #ffffff`}
    >
      <CustomNavBar fullScreen={true} logo="white"></CustomNavBar>
      <AtCurtain isOpened={finish} onClose={AtCurtainonClose}>
        <Image className="finish-img" src={finishEx}></Image>
      </AtCurtain>
      {/* 展示区 */}
      <View
        className="image-box"
        style={`height:${pageHeight}px;width:${pageWidth}px;`}
      >
        {exData.map((item, index) => {
          return (
            <View
              style={{
                backgroundImage: `url(${item.maxImg})`,
                backgroundPosition: "center",
              }}
              className="exhibition-page-img-box"
            >
              {currentImg === index && (
                <View>
                  {/* display:${
                      currentImg === index ? "block" : "none"
                    }; */}
                  {/* <View
                    style={`height:${pageHeight}px;width:${pageWidth}px; background-image: url(${item.maxImg});background-position: center;`}
                    className="exhibition-page-img"
                    // animation={animationExport}
                  ></View> */}
                  <Image
                    src={item.maxImg}
                    style={`height:${pageHeight}px;width:${pageWidth}px;background-position: center;`}
                    className="exhibition-page-img"
                  ></Image>
                  <View className="exhibition-disc">{item.introduce}</View>
                </View>
              )}
            </View>
          );
        })}
      </View>
      {/* 页码 */}
      <View className="action-page">
        <View className="action-left">{currentImg + 1}</View>
        <View className="action-flag">/</View>
        <View className="action-right">{exData.length}</View>
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
            src={currentImg === exData.length - 1 ? rightArrow : rightArrow_s}
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
      </View>
    </View>
  );
}
