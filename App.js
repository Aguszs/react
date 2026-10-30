import React from "react";
import GlobalStyle from "./components/globalStyles/GlobalStyle";
import NucTasks from "./components/NucTasks";
import { TaskProvider } from "./context/TaskContext";

const App = () => (
  <TaskProvider>
    <GlobalStyle />
    <NucTasks />
  </TaskProvider>
);

export default App;
