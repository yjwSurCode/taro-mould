import { Component } from "react";
import Taro from "@tarojs/taro";
import { CoverView, CoverImage } from "@tarojs/components";

// import "./index.scss";

export default class Index extends Component {
  state = {
    selected: 0,
    color: "#000000",
    selectedColor: "#DC143C",
    list: [
      //TODO 这里的path必须在主包
      {
        text: "首页",
        pagePath: "../../pages/home/index",
        iconPath: "../assets/home.png",
        selectedIconPath: "../assets/select-home.png",
      },
      {
        text: "展示",
        pagePath: "../../pages/exhibition-list/index",
        iconPath: "../assets/home.png",
        selectedIconPath: "../assets/select-home.png",
      },
      {
        text: "我的",
        pagePath: "../../pages/my/index",
        iconPath: "../assets/doctor.png",
        selectedIconPath: "../assets/select-doctor.png",
      },
    ],
  };

  switchTab(index, url) {
    this.setSelected(index);
    Taro.switchTab({ url });
  }

  setSelected(idx: number) {
    this.setState({
      selected: idx,
    });
  }

  render() {
    const { list, selected, color, selectedColor } = this.state;

    return (
      <CoverView className="tab-bar">
        1111199999
        <CoverView className="tab-bar-border"></CoverView>
        {list.map((item, index) => {
          return (
            <CoverView
              key={index}
              className="tab-bar-item"
              onClick={this.switchTab.bind(this, index, item.pagePath)}
            >
              <CoverImage
                style={{ width: "20px", height: "20px" }}
                src={selected === index ? item.selectedIconPath : item.iconPath}
              />
              <CoverView
                style={{
                  width: "20px",
                  height: "20px",
                  color: selected === index ? selectedColor : color,
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}
