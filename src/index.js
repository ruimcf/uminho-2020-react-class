import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import createMockServer from "./mock/server";

createMockServer();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
