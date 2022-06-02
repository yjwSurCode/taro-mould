# taro-mould

taro 初始化+工具类

trao 版本 3.4.9
yarn add taro-ui@3.0.0-alpha.10

yarn global add @tarojs/cli@3.4.8
yarn global add @tarojs/cli@1.2.4 npm install -g @tarojs/cli@1.2.4
yarn global add @tarojs/cli@1.3.17

npm info @tarojs/cli

npx @tarojs/cli init taskApp

#8a8a8a
主题色：#1296db

安装 sass: (可以自带安装)

npm install taro-ui------------------------"taro-ui": "^3.0.0-alpha.3",

项目自带了自适应：
projectName: 'taskApp',
date: '2022-4-27',
designWidth: 750,
deviceRatio: {
640: 2.34 / 2,
750: 1,
828: 1.81 / 2
},

<!-- 会自带返回 -->

Taro.navigateTo({
url: "/pages/setting/index",
});

<!-- tab 切换 -->

Taro.switchTab({
url: "/pages/task/index",
});
Taro.switchTab({
url: "/pages/task/index",
});

<!-- 重定向  不自带返回-->

Taro.redirectTo({
url: "/pages/task/index",
});

<!-- 关闭所有页面，打开到应用内的某个页面   不会有返回 有主页标示 -->

Taro.reLaunch({
url: 'test?id=1'
})

if (routerProps) {
this.setState(
{
pageTitle: routerProps,
},
() => console.log("setState 完成", this.state)
);
}

// encodeURIComponent(JSON.stringify(obj))--------------为跳转 url 时的转换方法。

const routerProps = getCurrentInstance().router.params;
// JSON.parse(decodeURIComponent(options.obj))-----------为接收参数页面的转换方法。

问题：Deprecation Warning: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0. border-radius: $at-button-height / 2;

因为 sass 新版本目前弃用“/”的用法，sass 自定义 element theme 时会报 warnning

解决：
npm install -g sass-migrator
进入项目 node\*modules 文件
执行 npx sass-migrator division \*\*/\_.scss

下拉刷新知识点：：：：：：
// 监听下拉刷新
onPullDownRefresh() {
console.log("onPullDownRefresh");
}
// 监听上拉触底
onReachBottom() {
console.log("onReachBottom");
}

分包知识点：：：：：：：：
看 app.config.ts

一键登录知识点：：：：：：：：

小程序开放平台：
https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Resource_Center_Homepage.html?action=dir_list&t=resource%2Fres_list&verify=1&lang=zh_CN&token=b04f52feae6e132cbca9c4685c5c17ed1188e32f

小程序公众平台：https://mp.weixin.qq.com/wxamp/home/guide?lang=zh_CN&token=1911103417

appID:wx21850caa5b1a9a71

页面配置：https://taro-docs.jd.com/taro/docs/page-config

Taro.checkSession({
success: function () {
//session_key 未过期，并且在本生命周期一直有效
},
fail: function () {
// session_key 已经失效，需要重新执行登录流程
Taro.login() //重新登录
}
})
