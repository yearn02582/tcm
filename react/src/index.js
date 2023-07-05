import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index.js";
import App from "./App.js";
import "./index.css";

const tem = document.querySelector("#root");
const root = ReactDom.createRoot(tem);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
