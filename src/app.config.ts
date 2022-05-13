export default defineAppConfig({
  pages: [
    // 测试
    "pages/test/index",
    "pages/test/indexs",
  ],
  tabBar: {
    backgroundColor: "#fff",
    color: "#999",
    borderStyle: "black",
    selectedColor: "#1296db",
    list: [
      {
        text: "测试",
        pagePath: "pages/test/index",
        // iconPath: "./assets/image/task.png",
        // selectedIconPath: "./assets/image/task-select.png",
      },
      {
        text: "测试",
        pagePath: "pages/test/indexs",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "任务单",
    navigationBarTextStyle: "black",
  },
});
