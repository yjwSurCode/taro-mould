export const apiAuth = "/api"; // 需要权限的

export const apiPublic = "";

/**
 * 登录
 */
export const api_login = apiPublic + "/login";

/**
 * 获取用户信息
 */
export const api_getUserInfo = apiPublic + "/getUserInfo";

/**
 * 保存用户信息
 */
export const api_setUserInfo = apiPublic + "/setUserInfo";

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
export const api_orderList = apiAuth + "/orderList";

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
