export default defineAppConfig({
  pages: [
    // 测试
    // "components/guidePage/index",
    "pages/home/index",
    "pages/login/index",
    "pages/my/index",
    "pages/exhibition-list/index",
  ],
  // subpackages: [
  //   {
  //     root: "components",
  //     name: "pack1",
  //     pages: ["test/index", "test/template"],
  //   },
  //   {
  //     root: "view",
  //     name: "pack2",
  //     pages: ["test/index"],
  //   },
  // ],

  // 自定义遇到的问题  https://github.com/NervJS/taro/issues/7302
  tabBar: {
    custom: true,
    backgroundColor: "#000000",
    color: "#999",
    borderStyle: "black",
    selectedColor: "#00d093",
    list: [
      //TODO 这里的path必须在主包
      {
        text: "首页",
        pagePath: "pages/home/index",
        iconPath: "./assets/home.png",
        selectedIconPath: "./assets/select-home.png",
      },
      {
        text: "展示",
        pagePath: "pages/exhibition-list/index",
        iconPath: "./assets/home.png",
        selectedIconPath: "./assets/select-home.png",
      },
      {
        text: "我的",
        pagePath: "pages/my/index",
        iconPath: "./assets/doctor.png",
        selectedIconPath: "./assets/select-doctor.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "吹风小队",
    navigationBarTextStyle: "black",
  },
});
