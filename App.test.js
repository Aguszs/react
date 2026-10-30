import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const addTask = (text) => {
  fireEvent.change(screen.getByLabelText(/nueva tarea/i), { target: { value: text } });
  fireEvent.click(screen.getByRole("button", { name: /^agregar$/i }));
};

beforeEach(() => {
  localStorage.clear();
});

test("muestra el título y el mensaje de lista vacía", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /nuctasks/i })).toBeInTheDocument();
  expect(screen.getByText(/todavía no agregaste tareas/i)).toBeInTheDocument();
});

test("agrega una tarea y limpia el input", () => {
  render(<App />);
  addTask("Estudiar React");
  expect(screen.getByText("Estudiar React")).toBeInTheDocument();
  expect(screen.getByLabelText(/nueva tarea/i)).toHaveValue("");
  expect(screen.getByText(/1 pendiente de 1/i)).toBeInTheDocument();
});

test("no permite tareas vacías ni repetidas (sin importar mayúsculas)", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /^agregar$/i }));
  expect(screen.getByRole("alert")).toHaveTextContent(/no puede estar vacía/i);

  addTask("Comprar pan");
  addTask("comprar PAN");
  expect(screen.getByRole("alert")).toHaveTextContent(/ya existe/i);
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
});

test("marca una tarea como hecha y actualiza el contador", () => {
  render(<App />);
  addTask("Hacer ejercicio");
  fireEvent.click(screen.getByRole("checkbox"));
  expect(screen.getByRole("checkbox")).toBeChecked();
  expect(screen.getByText(/0 pendientes de 1/i)).toBeInTheDocument();
});

test("borra una tarea y todas las tareas", () => {
  render(<App />);
  addTask("Tarea uno");
  addTask("Tarea dos");
  fireEvent.click(screen.getByRole("button", { name: /borrar tarea tarea uno/i }));
  expect(screen.queryByText("Tarea uno")).not.toBeInTheDocument();
  expect(screen.getByText("Tarea dos")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /borrar todas/i }));
  expect(screen.getByText(/todavía no agregaste tareas/i)).toBeInTheDocument();
});

test("conserva las tareas al recargar la página", () => {
  const { unmount } = render(<App />);
  addTask("Tarea persistente");
  unmount();

  render(<App />);
  expect(screen.getByText("Tarea persistente")).toBeInTheDocument();
});
