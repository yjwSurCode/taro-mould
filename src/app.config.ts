export default defineAppConfig({
  pages: [
    "pages/guidePage/index", //引导页
    "pages/home/index",
    "pages/my/index",
    "pages/exhibition-list/index",
  ],
  subpackages: [
    {
      root: "components",
      name: "pack1",
      pages: ["login/index", "exhibition/index"], // 登陆  展览品
    },
    {
      root: "view",
      name: "pack2",
      pages: ["market/index", "market-detail/index", "shop-cart/index"], // 商品列表  商品详情  购物车
    },
    // {
    //   root: "screen",
    //   name: "pack3",
    //   pages: ["guidePage/index"], // 引导开屏
    // },
  ],

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
        iconPath: "./assets/tab-home.png",
        selectedIconPath: "./assets/select-home.png",
      },
      {
        text: "展示",
        pagePath: "pages/exhibition-list/index",
        iconPath: "./assets/tab-exhibition.png",
        selectedIconPath: "./assets/select-exhibition.png",
      },
      {
        text: "我的",
        pagePath: "pages/my/index",
        iconPath: "./assets/tab-my.png",
        selectedIconPath: "./assets/select-my.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "MO DESIGN",
    navigationBarTextStyle: "black",
  },
});
