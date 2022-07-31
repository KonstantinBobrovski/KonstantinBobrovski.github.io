import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Bubble from "./components/Bubble/Buble";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Bubble color={"#007bff"} size={"30vmin"} />
    <Bubble color={"rgb(218, 34, 44)"} size={"20vmin"} />
    <Bubble color={"#349a47"} size={"15vmin"} />
    <Bubble color={"#ff8900"} size={"10vmin"} />
    <Bubble color={"#7D59A3"} size={"25vmin"} />
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
