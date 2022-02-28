import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
