import Taro, { request } from "@tarojs/taro";
import { HTTP_STATUS } from "./type";
import { getCurrentPageUrl } from "../hooks/assist";

export const baseUrl = "http://106.12.154.161:3000";
// export const baseUrl = "http://localhost:3000";

export default {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    // TODO 具体接口查看taro的request命名空间
    const option: any = {
      url: url.indexOf("http") !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        "content-type": contentType,
        Authorization: Taro.getStorageSync("Authorization"),
        // Accept: "application/vnd.github.v3+json",
      },
      success(res) {
        console.log(res.data, "00000000000");
        if (res.data.code == 403) {
          Taro.showToast({
            title: "用户登录失效",
            icon: "error",
            duration: 1000,
          });

          setTimeout(() => {
            Taro.redirectTo({
              url: "/pages/login/index",
            });
          }, 1000);
        }
        // if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        //   console.error("请求资源不存在~");
        //   return;
        // } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        //   console.error("服务端出现了问题~!");
        //   return;
        // } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
        //   //403
        //   Taro.setStorageSync("Authorization", "");
        //   let path = getCurrentPageUrl();
        //   if (path !== "pages/login/login") {
        //     Taro.navigateTo({
        //       url: "/pages/login/login",
        //     });
        //   }
        //   console.error("没有权限访问~");
        //   return;
        // } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
        //   Taro.setStorageSync("Authorization", "");
        //   let path = getCurrentPageUrl();
        //   if (path !== "pages/login/login") {
        //     Taro.navigateTo({
        //       url: "/pages/login/login",
        //     });
        //   }
        //   console.error("需要鉴权~");
        //   return;
        // } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
        //   return res.data;
        // }

        return res.data;
      },
      error(e) {
        console.error("请求接口出现问题~", e);
        return;
      },
    };
    return Taro.request(option);
  },
  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  },
  post: function (url, data, contentType?) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  },
  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  },
  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  },
};
