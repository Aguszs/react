# NucTasks

Aplicación de tareas desarrollada con React como proyecto de práctica del curso FullStack de Nucba.

## Funcionalidades

- Agregar tareas desde el botón o presionando Enter.
- Validar que la tarea no esté vacía ni repetida.
- Marcar tareas como completadas y consultar el contador de pendientes.
- Eliminar una tarea o vaciar la lista.
- Guardar las tareas en el almacenamiento local del navegador.
- Pruebas de interfaz con React Testing Library.

## Tecnologías

React 18 · Context API · Hooks · styled-components · Jest · React Testing Library

## Ejecutar en local

```bash
git clone https://github.com/Aguszs/react.git
cd react
npm install
npm start
```

Para ejecutar las pruebas, usá `npm test`. Para generar la versión de producción, usá `npm run build`.

## Alcance

Las tareas se guardan en el navegador actual. La aplicación no tiene cuentas ni sincronización entre dispositivos; si se borra el almacenamiento del sitio, también se eliminan las tareas guardadas.
