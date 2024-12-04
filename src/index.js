import React from "react";
import ReactDOM from "react-dom";
import NucTasks from "./App"; // Asegúrate de que el nombre del archivo principal sea App.js

ReactDOM.render(
  <React.StrictMode>
    <NucTasks />
  </React.StrictMode>,
  document.getElementById("root") // Este debe coincidir con el `div` en index.html
);
