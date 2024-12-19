import React, { useState } from "react";
import styled from "styled-components";


// Estilos con Styled-Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const ClearButton = styled.button`
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #cc0000;
  }
`;




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