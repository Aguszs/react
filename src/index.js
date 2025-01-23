import React from "react";
import ReactDOM from "react-dom";
import NucTasks from "./App"; // Asegúrate de que el nombre sea correcto
import { createGlobalStyle } from "styled-components";

ReactDOM.render(
  <React.StrictMode>
    <NucTasks />
  </React.StrictMode>,
  document.getElementById("root")
);
