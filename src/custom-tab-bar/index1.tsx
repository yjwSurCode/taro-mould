import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { CoverView, CoverImage } from "@tarojs/components";

const Index: React.FC<{}> = () => {
  const list = [
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
  ];

  const color = "#000000";
  const selectedColor = "#DC143C";

  const [selected, setSelected] = useState(0);

  const switchTab = (index, url) => {
    setSelected(index);
    Taro.switchTab({ url });
  };

  return (
    <div>
      <CoverView className="tab-bar">
        <CoverView className="tab-bar-border"></CoverView>
        {list.map((item, index) => {
          return (
            <CoverView
              key={index}
              className="tab-bar-item"
              onClick={() => switchTab(index, item.pagePath)}
            >
              111111
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
    </div>
  );
};

export default Index;
