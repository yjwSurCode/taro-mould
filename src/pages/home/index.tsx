/* eslint-disable jsx-quotes */
import { Component, useRef, useState, useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, Text, Picker } from "@tarojs/components";
import { add, asyncAdd } from "../../store/actions";
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
} from "taro-ui";

import TaroRequest, { baseUrl } from "../../utils/service/api";
import {
  api_login,
  api_getUserInfo,
  api_setUserInfo,
  api_seckill,
  api_seckillList,
  api_orderList,
} from "../../utils/service/url";

import "./index.scss";

export default function Home(): ReturnType<Taro.FC> {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [off, setOff] = useState(false);
  const [title, setTitle] = useState("即将开始！耐心等待");
  const [text, setText] = useState("火热抢购ing...");

  const [handing, sethanding] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const dispatch = useDispatch();
  const user: UserStatus = useSelector((state: StoreStatus) => state.user);

  const onTimeUp = () => {
    if (seconds != 0) {
      console.log("onTimeUponTimeUponTimeUponTimeUponTimeUponTimeUponTimeUp");
      setBtnDisabled(true);
    }
  };

  useEffect(() => {
    if (!Taro.getStorageSync("userId")) {
      Taro.showToast({
        title: "请登录",
        icon: "error",
        duration: 1000,
      });

      setTimeout(() => {
        Taro.redirectTo({
          url: "/pages/login/index",
        });
      }, 2000);

      return;
    }

    Taro.showLoading({
      title: "加载中",
    });

    TaroRequest.post(api_orderList, {
      // userId: Taro.getStorageSync("userId"),
    }).then((res) => {
      console.log(res, "api_orderList");
      Taro.hideLoading();
      //TODO 后台定义数据格式 res.data.data[0].goods
      if (res.data.data[0].goods == 0) {
        setTitle("抢购结束");
        setText("秒杀已抢购结束");
      }
    });

    init();
  }, []);

  const init = () => {
    const nowTime = new Date().getTime();
    const entTime =
      new Date(new Date().toLocaleDateString()).getTime() +
      16 * 60 * 60 * 1000 +
      19 * 60 * 1000;

    function intervalTime(startTime, endTime) {
      var timeDiff = endTime - startTime; //时间差
      let days = Math.floor(timeDiff / (24 * 3600 * 1000)); // 计算出天数
      let leavel1 = timeDiff % (24 * 3600 * 1000); // 计算天数后剩余的时间

      let hours = Math.floor(leavel1 / (3600 * 1000)); // 计算天数后剩余的小时数
      let leavel2 = timeDiff % (3600 * 1000); // 计算剩余小时后剩余的毫秒数

      let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
      let leavel3 = timeDiff % (60 * 1000); // 计算剩余分钟后剩余的毫秒数

      let scends = Math.floor(leavel3 / 1000);
      let leavel4 = timeDiff % 1000; // 计算剩余分钟后剩余的毫秒数

      console.log(
        Math.abs(hours * 60 * 60 + minutes * 60 + scends) - 3600,
        "11111111111",
        hours * 60 * 60 + minutes * 60 + scends,
        24 * 3600 - (Math.abs(hours * 60 * 60 + minutes * 60 + scends) - 3600)
      );

      console.log(
        "222",
        hours * 60 * 60 + minutes * 60 + scends < 0,
        title != "抢购结束"
      );
      if (hours * 60 * 60 + minutes * 60 + scends < 0 && title != "抢购结束") {
        sethanding(true);
        setBtnDisabled(true);
      }

      if (hours * 60 * 60 + minutes * 60 + scends < -3800) {
        console.log("距离抢购时间过去一段时间");
        setSeconds(
          24 * 3600 - (Math.abs(hours * 60 * 60 + minutes * 60 + scends) - 3600)
        );
        return;
      }

      setSeconds(hours * 60 * 60 + minutes * 60 + scends);

      return `${days}天${hours}时${minutes}分${scends}秒`;
    }

    intervalTime(nowTime, entTime);
  };

  const handleSeckill = () => {
    if (!Taro.getStorageSync("userId")) {
      Taro.showToast({
        title: "用户登录失效",
        icon: "error",
        duration: 1000,
      });
      return;
    }

    if (!btnDisabled) {
      // todo emoemeoemoemoemo
      Taro.showToast({
        title: title,
        icon: "error",
        duration: 500,
      });
      return;
    }

    Taro.showLoading({
      title: "加载中",
    });

    TaroRequest.post(
      api_seckill,
      {
        userId: Taro.getStorageSync("userId"), //todo 返回的openid
      }
      // {
      //   contentType: "application/json",
      //   Authorization: user.userToken,
      // }
    ).then((res) => {
      console.log("res", res.data[0].msg);
      Taro.hideLoading();
      Taro.showToast({
        title: res.data[0].msg,
        icon: "error",
        duration: 2000,
      });

      if (res.data[0].msg == "抢购成功") {
        Taro.setStorageSync("status", `日期：${new Date()},是否成功：是`);
      }
    });
  };

  return (
    <View className="index">
      <AtGrid
        columnNum={4}
        data={[
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
            value: "库里",
          },
          {
            image:
              "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
            value: "保罗",
          },
          {
            image:
              "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
            value: "东七七",
          },
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
            value: "詹姆斯",
          },
          {
            image:
              "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
            value: "安东尼",
          },
          {
            image:
              "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
            value: "巴特勒",
          },
          {
            image:
              "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
            value: "哈登",
          },
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
            value: "汤普森",
          },
        ]}
      />
      <View style={{ textAlign: "center" }}>(每日PM-15:00开始抢购)</View>
      {handing && (
        <View
          style={{ textAlign: "center", color: "red", marginBottom: "50px" }}
        >
          {text}
        </View>
      )}

      {handing && <View style={{ textAlign: "center" }}>预告下一轮时间：</View>}
      <AtCountdown
        customStyle={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          margin: "50rpx",
        }}
        format={{ hours: ":", minutes: ":", seconds: "" }}
        isCard
        seconds={seconds}
        onTimeUp={onTimeUp}
      />
      <AtButton loading={false} onClick={handleSeckill} type="primary">
        开始抢购
      </AtButton>
    </View>
  );
}
