export const apiAuth = "/api"; // 需要权限的

export const apiPublic = "";

/**
 * 登录
 */
export const api_login = apiPublic + "/login";

/**
 * 获取用户信息  获取opneid1
 */
export const api_getUserInfo = "/api/wechat/code2Session"; //apiPublic + "/getUserInfo";

/**
 * 保存用户信息1
 */
export const api_setUserInfo = "/api/user/login"; //apiPublic + "/setUserInfo";

/**
 * exhibition接口1
 */
export const api_exhibition = "/api/exhibition/list"; //apiPublic + "/setUserInfo";

//添加购物车1
export const api_addShopCart = "/api/product/addShopCart";

// 查询购物车1
export const api_queryShopCart = "/api/product/getShopCart";

/**
 * 修改用户信息
 */
export const api_modifyUserInfo = apiAuth + "/modifyUserInfo";

/**
 * 准备
 */
export const api_prepare = apiAuth + "/prepare";

/**
 * 取消准备
 */
export const api_cancel = apiAuth + +"/cancel ";

/**
 * 抢购商品信息
 */
// export const api_orderList = apiAuth + "/orderList";
export const api_orderList = "/api/product/list";

/**
 * 抢购
 */
export const api_seckill = apiAuth + "/seckill";

/**
 * 获取已抢购到的列表
 */
export const api_seckillList = apiAuth + "/seckillList";

//用户抢购记录
export const api_recordList = apiAuth + "/recordList";
