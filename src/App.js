import React, { useState } from "react";
import styled from "styled-components";






// Componente principal
const NucTasks = () => {
  const [tasks, setTasks] = useState([]); // Estado para la lista de tareas
  const [newTask, setNewTask] = useState(''); // Estado para el valor del input
  const [error, setError] = useState(''); // Estado para el mensaje de error

 // Función para manejar el cambio en el input
 const handleInputChange = (event) => {
  setNewTask(event.target.value);
  setError(''); // Limpiar el mensaje de error cuando se cambia el input
};

// Función para agregar la tarea
const handleAddTask = () => {
  if (tasks.includes(newTask)) {
    setError('Esta tarea ya está en la lista'); // Mostrar mensaje de error
  } else if (newTask.trim() !== '') {
    setTasks([...tasks, newTask]); // Agregar la tarea a la lista
    setNewTask(''); // Limpiar el input
  }
};

return (
  <div>
    <h1>Lista de Tareas</h1>
    <input
      type="text"
      value={newTask}
      onChange={handleInputChange}
      placeholder="Agregar nueva tarea"
    />
    <button onClick={handleAddTask}>Agregar tarea</button>

    {/* Mostrar mensaje de error si hay un duplicado */}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    <ul>
      {tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
  </div>
);
}
export default NucTasks;