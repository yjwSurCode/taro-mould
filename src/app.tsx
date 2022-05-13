import { Provider } from "react-redux";
import configStore from "./store";
import "./app.scss";

const store = configStore();

export default function App(props): ReturnType<Taro.FC> {
  return <Provider store={store}>{props.children}</Provider>;
}
