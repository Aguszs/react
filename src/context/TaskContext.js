// src/context/TaskContext.js
import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    if (!newTask.trim()) return;
    if (tasks.includes(newTask)) {
      alert("La tarea ya existe");
      return;
    }
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, clearTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
