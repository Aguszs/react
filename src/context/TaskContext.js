import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "nuctasks:tasks";

const TaskContext = createContext(null);

// Lee las tareas guardadas en el navegador (si hay) sin romper la app si falla
const loadTasks = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(loadTasks);

  // Guarda las tareas cada vez que cambian
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // si el navegador bloquea el almacenamiento, la app sigue funcionando sin guardar
    }
  }, [tasks]);

  // Devuelve { ok: true } o { ok: false, error: "mensaje" }
  const addTask = useCallback(
    (text) => {
      const clean = text.trim();
      if (!clean) {
        return { ok: false, error: "La tarea no puede estar vacía." };
      }
      if (tasks.some((task) => task.text.toLowerCase() === clean.toLowerCase())) {
        return { ok: false, error: "La tarea ya existe en la lista." };
      }
      setTasks((prev) => [...prev, { id: createId(), text: clean, done: false }]);
      return { ok: true };
    },
    [tasks]
  );

  const toggleTask = useCallback((id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const clearTasks = useCallback(() => setTasks([]), []);

  const value = useMemo(
    () => ({ tasks, addTask, toggleTask, deleteTask, clearTasks }),
    [tasks, addTask, toggleTask, deleteTask, clearTasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks debe usarse dentro de un <TaskProvider>");
  }
  return context;
};
