import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axe from "@axe-core/react";
import "./language/i18n.js";

if (import.meta.env.DEV) {
  axe(React, ReactDOM, 1000);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
);
