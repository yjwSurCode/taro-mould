/* eslint-disable import/first */
import { Component } from "react";
import { connect } from "react-redux";
import { OpenData, View, Image, Text, ScrollView } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtToast,
  AtGrid,
  AtFloatLayout,
  AtCard,
  AtDivider,
} from "taro-ui";
import Taro from "@tarojs/taro";

import TaroRequest, { baseUrl } from "../../utils/service/api";
import {
  api_login,
  api_getUserInfo,
  api_setUserInfo,
  api_seckill,
  api_seckillList,
  api_recordList,
} from "../../utils/service/url";

import CustomNavBar from "../../components/customNavBar/index";

import logoImg from "../../assets/logo.png";

import shop1 from "../../assets/my/Slice 21@2x.png";
import shop2 from "../../assets/my/Slice 22@2x.png";
import shop3 from "../../assets/my/Slice 23@2x.png";
import shop4 from "../../assets/my/Slice 24@2x.png";

import rightArrow from "../../assets/right-arrow-noBorder.png";

import "./index.scss";
class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      status: "",
      text: "",
      icon: "check",
      list: [],
    };
  }

  // 监听下拉刷新
  onPullDownRefresh() {
    this.getData();
    console.log("onPullDownRefresh");
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  }
  // 监听上拉触底
  onReachBottom() {
    this.getData();
    console.log("onReachBottom");
  }

  getData = () => {
    console.log("111111");
    return;
    TaroRequest.post(api_recordList, {
      userId: Taro.getStorageSync("userId"), //todo 返回的openid
    }).then((res) => {
      console.log("res66", res.data.data);

      this.setState(
        {
          list: res.data.data,
        },
        () => {
          setTimeout(() => {}, 1200);
        }
      );

      Taro.hideLoading();
      Taro.showToast({
        title: res.data[0].msg,
        icon: "error",
        duration: 1000,
      });
    });
  };

  handleLogoutClick = () => {
    //存token(具体数据结构项目来定)
    // dispatch(setToken({ token: "Bearer " + res.data[0].token }));
    Taro.setStorageSync("Authorization", "");
    // 存userId(具体数据结构项目来定)
    Taro.setStorageSync("userId", "");

    setTimeout(() => {
      Taro.redirectTo({
        url: "/pages/login/index",
      });
    });
  };

  handleClose = (v, v1) => {
    this.setState(
      {
        isOpened: false,
      },
      () => {
        setTimeout(() => {}, 1200);
      }
    );
  };

  orderDetail = (v, v1) => {
    this.setState(
      {
        isOpened: true,
      },
      () => {
        setTimeout(() => {}, 1200);
      }
    );
  };

  goShopCart = () => {
    Taro.navigateTo({
      url: "/view/shop-cart/index",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data);
        },
        someEvent: function (data) {
          console.log(data);
        },
        // ...
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit("acceptDataFromOpenerPage", { data: "test" });
      },
    });
  };

  componentDidMount = () => {
    const val = Taro.getStorageSync("userId");
    if (!val) {
      setTimeout(() => {
        Taro.showToast({
          title: "请登录",
          icon: "error",
          duration: 1000,
        });
      }, 1000);

      setTimeout(() => {
        Taro.redirectTo({
          url: "/components/login/index",
        });
      }, 2000);

      return;
    }

    this.getData();
  };

  render() {
    return (
      <View className="My">
        <ScrollView scrollX={false}>
          <CustomNavBar></CustomNavBar>
          <View className="my-page">
            <View className="Exhibition-box" style={{ marginTop: "85px" }}>
              <Image
                onClick={this.goShopCart}
                className="logo-img"
                // style={{ width: "100%", height: "90vh" }}
                src={logoImg}
              ></Image>
              <Text className="nickname">
                {Taro.getStorageSync("userName") || "我的昵称"}
              </Text>
              <View className="Exhibition-number">
                <View className="Exhibition-number-item">
                  <View className="nm">0</View>
                  <View className="tx">我的订单</View>
                </View>
                <View className="Exhibition-number-item">
                  <View className="nm">0</View>
                  <View className="tx">文创碎片</View>
                </View>
                <View className="Exhibition-number-item">
                  <View className="nm">0</View>
                  <View className="tx">搜索指南</View>
                </View>
              </View>
            </View>
            {/* 轨迹 */}
            <View className="trajectory-box">
              <View className="trajectory-title">Mo轨迹</View>
              <AtDivider
                // content="Mo轨迹"
                // className="trajectory-title"
                lineColor="#dedede"
                fontColor="#000000"
                customStyle={{ fontWeight: "bold", height: "20px" }}
              />
              <View className="trajectory">
                <View className="trajectory-item">
                  <Image
                    onClick={this.goShopCart}
                    className="trajectory-img"
                    src={shop1}
                  ></Image>
                  <View>待付款</View>
                </View>
                <View className="trajectory-item">
                  <Image
                    onClick={this.goShopCart}
                    className="trajectory-img"
                    src={shop2}
                  ></Image>
                  <View>待发货</View>
                </View>
                <View className="trajectory-item">
                  <Image
                    onClick={this.goShopCart}
                    className="trajectory-img"
                    src={shop3}
                  ></Image>
                  <View>待收货</View>
                </View>
                <View className="trajectory-item">
                  <Image
                    onClick={this.goShopCart}
                    className="trajectory-img"
                    src={shop4}
                  ></Image>
                  <View>待评价</View>
                </View>
              </View>
            </View>
            {/* 其他服务 */}
            <View className="service-box">
              <View className="service-title">其他服务</View>
              <AtDivider
                lineColor="#dedede"
                fontColor="#000000"
                customStyle={{ fontWeight: "bold", height: "20px" }}
              />
              <View className="service">
                <View className="service-item">
                  <View>我的客服</View>
                  <Image
                    onClick={this.goShopCart}
                    className="service-img"
                    src={rightArrow}
                  ></Image>
                </View>
                <View className="service-item">
                  <View>我的地址</View>
                  <Image
                    onClick={this.goShopCart}
                    className="service-img"
                    src={rightArrow}
                  ></Image>
                </View>
                <View className="service-item">
                  <View>常见问题</View>
                  <Image
                    onClick={this.goShopCart}
                    className="service-img"
                    src={rightArrow}
                  ></Image>
                </View>
              </View>
            </View>

            {/* <View className="service-box">
            <View className="service-title">Mo轨迹</View>
            <View className="service-item">
              <View>我的客服</View>
              <Image
                onClick={this.goShopCart}
                className="logo-img"
                src={shop2}
              ></Image>
            </View>
            <View className="service-item">
              <View>我的地址</View>
              <Image
                onClick={this.goShopCart}
                className="logo-img"
                src={shop3}
              ></Image>
            </View>
            <View className="service-item">
              <View>常见问题</View>
              <Image
                onClick={this.goShopCart}
                className="logo-img"
                src={shop4}
              ></Image>
            </View>
          </View> */}

            {/* <Image
          onClick={this.goShopCart}
          style={{ width: "100%", height: "90vh" }}
          src={"http://106.12.154.161/images/mo-design/my.jpg"}
        ></Image> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MyPage;
