import { Provider } from "react-redux";
import configStore from "./store";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "animate.css";
import "./app.scss";

const store = configStore();

export default function App(props): ReturnType<Taro.FC> {
  // Taro.setStorage({
  //   key: "initFlag",
  //   data: "1",
  // });

  return (
    <View className="mo-design">
      <Provider store={store}>{props.children}</Provider>
    </View>
  );
}
