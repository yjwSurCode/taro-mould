import { Provider } from "react-redux";
import configStore from "./store";
import "./app.scss";
import { View } from "@tarojs/components";

const store = configStore();

export default function App(props): ReturnType<Taro.FC> {
  return (
    <View className="mo-design">
      <Provider store={store}>{props.children}</Provider>
    </View>
  );
}
