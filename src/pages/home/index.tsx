/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
import Taro, { useRouter, useDidShow } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Button,
  Image,
  Text,
  Picker,
  Swiper,
  SwiperItem,
  CoverImage,
  ScrollView,
} from "@tarojs/components";
import { add, asyncAdd, asyncSwitchAction } from "../../store/actions";
import { StoreStatus, OrderStatus, UserStatus } from "../../store/types/index";
import {
  AtTabs,
  AtTabsPane,
  AtNavBar,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
  AtCurtain,
  AtGrid,
  AtList,
  AtListItem,
  AtCountdown,
  AtButton,
  AtSearchBar,
  AtActivityIndicator,
} from "taro-ui";

import TaroRequest, { baseUrl } from "../../utils/service/api";
import { api_exhibition, api_orderList } from "../../utils/service/url";

import CustomNavBar from "../../components/customNavBar/index";

import homeEx from "../../assets/home-ex.png";

import rightArrow_noBorder from "../../assets/right-arrow-noBorder.png";
import rightArrow from "../../assets/right-arrow.png";
//快捷键 option+shift+下
import commodity1 from "../../assets/home/commodity1.png";
import commodity2 from "../../assets/home/commodity2.png";
import commodity3 from "../../assets/home/commodity3.png";

import imageError from "../../assets/image-error.png";

import "./index.scss";

export default function Home(): ReturnType<Taro.FC> {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const [swiperList, setSwiperList] = useState([
    { id: 2, img: "http://106.12.154.161/images/mo-design/home-ex.png" },
    { id: 2, img: "http://106.12.154.161/images/mo-design/home-ex.png" },
  ]);

  const [ExData, setExData] = useState<Array<{ minImg?: string }> | []>([]);

  const [commodityList, setCommodityList] = useState([
    {
      imgUrls: "http://106.12.154.161/images/mo-design/commodity1.png",
      theme: "百年无极",
      name: "园丁手机壳",
      isChoiceness: true,
    },
  ]);

  // const [rightArrow, setRightArrow] = useState([{ id: 1 }, { id: 2 }]);

  const user: UserStatus = useSelector((state: StoreStatus) => state.user);

  const onChange = () => {};

  async function imgToBase64({ path }) {
    try {
      const result = await Taro.request({
        url: path,
        responseType: "arraybuffer",
      });
      if (result && result.statusCode !== 200) {
        Taro.getLogManager().warn("图片获取失败", result);
        throw new Error("图片获取失败。");
      }
      let base64 = Taro.arrayBufferToBase64(result.data);
      base64 = "data:image/jpeg;base64," + base64;
      return base64;
    } catch (error) {
      console.warn("=> utilssearch.ts error imgToBase64", error);
      throw error;
    }
  }

  const goExhibitionPage = () => {
    // Taro.preload(
    //   imgToBase64({
    //     path: "http://rjkwz08nt.hn-bkt.clouddn.com/FuyaPr0thb3fEf6_pW-tIStcMdh6",
    //   })
    // );
    Taro.preload(ExData);

    Taro.navigateTo({
      url: "/components/exhibition/index",
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
          data: ExData,
        });
      },
    });
  };

  const goMarket = () => {
    Taro.navigateTo({
      url: "/view/market/index",
    });
  };

  const goMarketDetail = (v) => {
    //TODO 传递数据到详情页面
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
          data: v,
        });
      },
    });
  };

  const initHomeData = () => {
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

  const initExhibition = () => {
    //! 请求EX数据
    Taro.request({
      url: baseUrl + api_exhibition,
      method: "POST",
      data: { page: 1, limit: 1000 },
    }).then((res) => {
      console.log(res.data.data.records, "api_exhibition");
      const imgList: any = [];
      res.data.data.records.forEach((item, index) => {
        const minImg = item.imgUrl.split(",")[0];
        const maxImg = item.imgUrl.split(",")[1];
        const obj = {
          theme: item.theme,
          themeEnglish: item.themeEnglish,
          introduce: item.introduce,
          status: item.status,
          isCarousel: item.isCarousel,
          createTime: item.createTime,
          updateTime: item.updateTime,
          minImg: minImg,
          maxImg: maxImg,
        };
        imgList.push(obj);
      });

      console.log(imgList, "imgList");
      setExData(imgList);
      Taro.hideLoading();
    });
  };

  useDidShow(() => {
    //获取自定义 TabBar 对应的 React 或 Vue 组件实例
    // const pageObj = Taro.getCurrentInstance().page;
    // const tabbar = Taro.getTabBar(pageObj);
    // console.log(tabbar, "tabbar,,pageCtx", pageObj);
    //! 改变tabar
    dispatch(asyncSwitchAction(0));
  });

  useEffect(() => {
    Taro.showLoading({
      title: "Loading...",
      mask: true,
    });

    initHomeData();
    initExhibition();
  }, []);

  return (
    <View className="home">
      <CustomNavBar></CustomNavBar>
      {/* <AtActivityIndicator
        className="Indictor"
        content="加载中..."
        mode="center"
        size={32}
        color="#13CE66"
      ></AtActivityIndicator> */}
      <View style={{ margin: "20px", marginTop: "60px" }} className="">
        <View className="home-title">早上好，</View>
        <View className="home-title">即刻开启您的艺术空间</View>
      </View>
      <AtSearchBar
        // showActionButton={true}
        value={searchValue}
        onChange={onChange}
        placeholder="百年无极艺术展"
      />
      {/*  轮播 */}
      <Swiper
        className="swiper-container"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        // vertical
        circular
        indicatorDots
        autoplay
      >
        {ExData.map((item, index) => {
          return (
            <SwiperItem>
              <View className="Exhibition-btn-swiper">
                {/* //! image coverImage 有区别 */}
                <Image
                  className="bar-image"
                  src={item.minImg}
                  onError={imageError}
                ></Image>
                {/* <CoverImage
                  className="bar-image"
                  // style={{ width: "20px", height: "20px" }}
                  src={item.img}
                  onError={imageError}
                /> */}
                <View className="Exhibition-btn" onClick={goExhibitionPage}>
                  <Text
                    style={{
                      display: "inline-block",
                      verticalAlign: "super",
                      fontWeight: "bold",
                    }}
                  >
                    点击观看精华展
                  </Text>
                  <Image className="img" src={rightArrow_noBorder}></Image>
                </View>
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
      {/*  商品列表 Commodity list */}
      <ScrollView scrollX={false}>
        <View
          style={{ paddingBottom: `${user.customTabBar}px` }}
          className="commodity-list-box"
        >
          <View className="commodity-list-title">
            <View className="text">精选商品</View>
            <View className="right" onClick={goMarket}>
              <Text
                style={{
                  display: "inline-block",
                  verticalAlign: "super",
                  marginRight: "5px",
                  color: "#999999",
                }}
              >
                进入商城
              </Text>
              <Image
                className="img"
                // style={{ width: "200px", height: "200px" }}
                src={rightArrow}
              ></Image>
            </View>
          </View>
          <View className="commodity-list-content">
            {commodityList.map((item, index) => {
              return (
                <>
                  {item.isChoiceness && (
                    <View className="item">
                      <View className="item-img-container">
                        <View
                          onClick={() => goMarketDetail(item)}
                          className="item-img"
                          // style={`background-image: url(${item.img});background-position: center;background-size: contain;`}
                          style={`background-image: url(${
                            item.imgUrls.split(",")[0]
                          });background-position: center;background-size: cover;`}
                        ></View>
                      </View>
                      <View className="item-title">
                        [{item.theme}]&nbsp;{item.name}
                      </View>
                    </View>
                  )}
                </>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
