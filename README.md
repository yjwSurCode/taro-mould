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

<!-- 页面间事件通信通道 -->

EventChannel

emit once off

## 导航栏

https://docs.taro.zone/docs/apis/ui/navigation-bar/showNavigationBarLoading

页面配置：：
https://docs.taro.zone/docs/page-config

navigationStyle: "custom", 设置之后后面的参数不生效

## 下面的 tabbar

interface TabBar {
/** tab 上的文字默认颜色 \*/
color?: string
/** tab 上的文字选中时的颜色 _/
selectedColor?: string
/\*\* tab 的背景色 _/
backgroundColor?: string
/** tabbar 上边框的颜色， 仅支持 black/white
_ @default: black
_/
borderStyle?: 'black' | 'white'
/** tab 的列表，详见 list 属性说明，最少 2 个、最多 5 个 tab _/
list: TabBarItem[]
/\*\* tabbar 的位置，可选值 bottom、top
_ @default: 'bottom'
_/
position?: 'bottom' | 'top'
/\*\* 自定义 tabBar，见[详情](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)
_ @default false
_ @since 2.1.0
_/
custom?: boolean
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

appID:wx21850caa5b1a9a71 wxd0ba8f6181d3b17c

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

# taro animation 用法

# animation.css

#tabbar

文件夹名字和位置必须正确
必须使用类组件
点击两次才会切换 使用 redux 解决

蓝湖地址：
https://lanhuapp.com/?utm_source=baidu&utm_medium=brandzone&utm_campaign=zhutu&utm_term=an

figma 地址：
https://www.figma.com/file/oU0iyOKBlKjenP6r1YrFl9/MO%E6%96%87%E5%88%9B%E8%A1%8D%E7%94%9F%E5%93%81-%E4%BA%A4%E4%BB%98%E7%A8%BF?node-id=0%3A1

"http://106.12.154.161/images/mo-design/home-ex.png"
