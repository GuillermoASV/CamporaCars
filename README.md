##  TodoCars

Este proyecto es una aplicación para el control de trabajos en un taller de latonería y pintura. Permite asignar tareas/actividades a los trabajadores y dar seguimiento de presupuesto a las tareas del taller, facilitando la gestión. 
  
### Estructura de carpetas del proyecto

```plaintext
src /
├── __tests__
├── app/
│   ├── (admin)/menu/
│   │   ├── (contenido)/
│   │   │   ├── historial
│   │   │   ├── presupuesto/
│   │   │   │   └── components
│   │   │   ├── setting/
│   │   │   │   └── components
│   │   │   └── todoapp/
│   │   │       └── components
│   │   └── components
│   ├── (mainlayout)/
│   │   └── login
│   ├── api/
│   │   ├── borrarTODO
│   │   ├── buscarTODO
│   │   ├── completarTODO
│   │   ├── gastosTODO
│   │   ├── generarHistorial
│   │   ├── generarHistorialPresupuesto
│   │   ├── generarTODO
│   │   ├── generarToken
│   │   ├── logout
│   │   ├── materiales
│   │   ├── modificarTODO
│   │   ├── presupuestoTODO
│   │   └── verificarToken
│   └── hooks
├── components/ui
├── hooks
├── lib
├── mongoose
└── utils
└── middleware.js
```
