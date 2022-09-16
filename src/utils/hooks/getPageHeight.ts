import Taro, { useRouter } from "@tarojs/taro";

let height = 0;

const windowInfo = Taro.getWindowInfo();
// const info = Taro.getSystemInfoAsync().then((res) => res.windowHeight);

console.log("33333info", windowInfo.windowHeight);

const pageHeight = windowInfo.windowHeight;
const pageWidth = windowInfo.windowWidth;

export { pageWidth, pageHeight };

// let globalSystemInfo = getSystemInfo();

// const res = globalSystemInfo.then((res) => res.windowHeight);

// export default res;
