/* eslint-disable import/first */
import { Component } from "react";
import { connect } from "react-redux";
import { OpenData, View } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtToast,
  AtGrid,
  AtFloatLayout,
  AtCard,
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

class Setting extends Component {
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

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    console.log("getDatagetDatagetDatagetData");
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

  opinion = () => {
    Taro.navigateTo({
      url: "/pages/login/index",
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

  render() {
    return (
      <View>
        {/* <Header title="设置" /> */}
        <View
          style={{ marginTop: "20px" }}
          className="at-row at-row__justify--center at-row__align--center"
        >
          <View className="at-col-2 at-col--auto">
            <OpenData type="userAvatarUrl" />
          </View>
          <View style={{ marginLeft: "20px" }} className="at-col-2">
            <OpenData type="userNickName" defaultText="微信用户" />
          </View>
        </View>
        <AtFloatLayout
          isOpened={(this.state as any).isOpened}
          title="记录"
          onClose={this.handleClose.bind(this)}
        >
          {(this.state as any).list.map((item, index) => {
            return (
              <AtCard
                note="" //小Tips
                extra={item.time} //额外信息
                title="吹风小队抢购表"
                thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
              >
                {item.status}
                {/* {Taro.getStorageSync("status") == ""
                  ? "今日未抢到"
                  : Taro.getStorageSync("status")} */}
              </AtCard>
            );
          })}
        </AtFloatLayout>
        <AtGrid
          onClick={(_, index) => this.orderDetail(this, index)}
          mode="rect"
          data={[
            {
              image:
                "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
              value: "我的订单",
            },
            {
              image:
                "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
              value: "待付款",
            },
            {
              image:
                "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
              value: "未使用",
            },
            {
              image:
                "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
              value: "已使用",
            },
            {
              image:
                "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
              value: "已退款",
            },

            {
              image:
                "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
              value: "手机馆",
            },
          ]}
        />

        <View>
          <AtList hasBorder={false}>
            <AtListItem title="意见反馈" arrow="right" />
            <AtListItem
              title="退出登录"
              onClick={this.handleLogoutClick}
              arrow="right"
            />
          </AtList>
        </View>
      </View>
    );
  }
}

export default Setting;
