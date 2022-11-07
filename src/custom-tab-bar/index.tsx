import { Component } from "react";
import Taro from "@tarojs/taro";
import {
  Text,
  View,
  Button,
  CoverView,
  CoverImage,
  Image,
} from "@tarojs/components";

import { add, asyncAdd, asyncSwitchAction } from "../store/actions";
import { StoreStatus, UserStatus } from "../store/types/index";
import { connect } from "react-redux";

import "./index.scss";

const mapStateToProps = (state) => {
  console.log("pp1", state.user.selectIndex);
  return {
    index: state.user.selectIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switch: (v) => {
      const action = asyncSwitchAction(v);
      dispatch(action);
    },
    minus: () => {
      const action = asyncAdd(1);
      dispatch(action);
    },
  };
};

class Tabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      color: "#000000",
      selectedColor: "#DC143C",
      list: [
        //TODO 这里的path必须在主包
        {
          text: "首页",
          pagePath: "/pages/home/index",
          iconPath: "../assets/tab-home.png",
          selectedIconPath: "../assets/select-home.png",
        },
        {
          text: "展示",
          pagePath: "/pages/exhibition-list/index",
          iconPath: "../assets/tab-exhibition.png",
          selectedIconPath: "../assets/select-exhibition.png",
        },
        {
          text: "我的",
          pagePath: "/pages/my/index",
          iconPath: "../assets/tab-my.png",
          selectedIconPath: "../assets/select-my.png",
        },
      ],
    };
  }

  componentDidMount() {
    // const dispatch = useDispatch();
    // const user: UserStatus = useSelector((state: StoreStatus) => state.user);
    // console.log(user, "ppppp");
  }

  switchTab(index, url) {
    Taro.switchTab({
      url,
      complete: () => {
        (this.props as any).switch(index);
      },
    });
    //触发redux
    // (this.props as any).switch(index);
  }

  render() {
    console.log(this.props, "pp--this.props", this.state);
    return (
      //! CoverView --->View
      <View className="tab-bar">
        {/* {(this.props as any).index}
        <Text onClick={() => (this.props as any).switch(1)}>切换1</Text> */}
        {(this.state as any).list.map((item, index) => {
          return (
            <View
              key={index}
              className="tab-bar-item"
              onClick={this.switchTab.bind(this, index, item.pagePath)}
            >
              {/* //! CoverImage ---> Image*/}
              <Image
                className="bar-image"
                // style={{ width: "1.25rem", height: "1.25rem" }}
                src={
                  (this.props as any).index === index
                    ? item.selectedIconPath
                    : item.iconPath
                }
              />
            </View>
          );
        })}
      </View>
    );
  }
}

const ClassComponent = connect(mapStateToProps, mapDispatchToProps)(Tabbar);

export default ClassComponent;
