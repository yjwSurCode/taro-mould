export default defineAppConfig({
  pages: [
    // 测试
    "pages/home/index",
    "pages/login/index",
    "pages/my/index",
  ],
  subpackages: [
    {
      root: "components",
      name: "pack1",
      pages: ["test/index", "test/template"],
    },
    {
      root: "view",
      name: "pack2",
      pages: ["test/index"],
    },
  ],

  tabBar: {
    backgroundColor: "#fff",
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
