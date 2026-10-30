import React, { useState } from "react";
import styled from "styled-components";
import { useTasks } from "../context/TaskContext";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 8px;
  width: 90%;
  max-width: 440px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 26px;
  margin: 0 0 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
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

const ErrorMessage = styled.p`
  align-self: flex-start;
  margin: 4px 0 0;
  color: #c0392b;
  font-size: 14px;
`;

const Counter = styled.p`
  align-self: flex-start;
  margin: 16px 0 8px;
  color: #666;
  font-size: 14px;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TaskLabel = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  word-break: break-word;
  text-decoration: ${({ $done }) => ($done ? "line-through" : "none")};
  color: ${({ $done }) => ($done ? "#999" : "inherit")};
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

const ClearButton = styled(DeleteButton)`
  width: 100%;
  padding: 10px;
  margin-top: 4px;
`;

const EmptyMessage = styled.p`
  color: #888;
  margin: 12px 0;
`;

const NucTasks = () => {
  const { tasks, addTask, toggleTask, deleteTask, clearTasks } = useTasks();
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = addTask(newTask);
    if (result.ok) {
      setNewTask("");
      setError("");
    } else {
      setError(result.error);
    }
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);
    if (error) setError("");
  };

  const pending = tasks.filter((task) => !task.done).length;

  return (
    <Container>
      <Title>NucTasks</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="¿Qué tarea querés agregar?"
          aria-label="Nueva tarea"
          value={newTask}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "task-error" : undefined}
        />
        <AddButton type="submit">Agregar</AddButton>
      </Form>

      {error && <ErrorMessage id="task-error" role="alert">{error}</ErrorMessage>}

      {tasks.length === 0 ? (
        <EmptyMessage>Todavía no agregaste tareas.</EmptyMessage>
      ) : (
        <>
          <Counter aria-live="polite" aria-atomic="true">
            {pending} {pending === 1 ? "pendiente" : "pendientes"} de {tasks.length}
          </Counter>
          <TaskList aria-label="Lista de tareas">
            {tasks.map((task) => (
              <TaskItem key={task.id}>
                <TaskLabel $done={task.done}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  {task.text}
                </TaskLabel>
                <DeleteButton
                  type="button"
                  aria-label={`Borrar tarea ${task.text}`}
                  onClick={() => deleteTask(task.id)}
                >
                  Borrar
                </DeleteButton>
              </TaskItem>
            ))}
          </TaskList>
          <ClearButton type="button" onClick={clearTasks}>
            Borrar todas
          </ClearButton>
        </>
      )}
    </Container>
  );
};

export default NucTasks;
