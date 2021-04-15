import React from "react";
import ReactDOM from "react-dom";
// import "./styles/App.css";
import App from "./App";
import { AsteroidProvider } from "./providers/AsteroidProvider";
import { DestroyProvider } from "./providers/DestroyProvider";

ReactDOM.render(
  <React.StrictMode>
    <AsteroidProvider>
      <DestroyProvider>
        <App />
      </DestroyProvider>
    </AsteroidProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
