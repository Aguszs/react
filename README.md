# NucTasks ✅

Lista de tareas hecha con **React**. Proyecto del curso de Desarrollador FullStack en Nucba.

## Funcionalidades

- Agregar tareas (con el botón o con **Enter**).
- Validaciones: no permite tareas vacías ni repetidas (sin distinguir mayúsculas).
- Marcar tareas como hechas, con contador de pendientes.
- Borrar una tarea o todas juntas.
- **Las tareas se guardan en el navegador** (`localStorage`) y siguen ahí al recargar la página.
- Tests automáticos con Testing Library.

## Tecnologías

React 18 · Context API + hooks (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`) · styled-components · Jest y React Testing Library

## Estructura

```
src/
  index.js                          Punto de entrada
  App.js                            Provider + estilos globales + componente principal
  context/TaskContext.js            Estado global de las tareas y persistencia
  components/NucTasks.js            Interfaz de la lista de tareas
  components/globalStyles/          Estilos globales
  App.test.js                       Tests
```

## Cómo correrlo en local

```bash
git clone https://github.com/Aguszs/react.git
cd react
npm install
npm start      # abre http://localhost:3000
npm test       # corre los tests
npm run build  # genera la versión de producción
```

## Mejoras pendientes

- Editar el texto de una tarea.
- Filtros por estado (todas, pendientes, hechas).
