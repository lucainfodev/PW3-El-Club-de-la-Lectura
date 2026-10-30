# El Club de la Lectura — Sistema de Gestión de Biblioteca

Proyecto Integrador Final para la cátedra de **Programación Web III (PW3)**  
**Tecnicatura Universitaria en Desarrollo de Aplicaciones Informáticas (TUDAI) — 2026**

### Integrantes del equipo:
- **Luca Emmanuel Gomez**
- **Juan Artusa**

---

## 📖 Descripción General

**El Club de la Lectura** es una aplicación web SPA (Single Page Application) desarrollada con **React 18** y **Vite**, orientada a la gestión integral del acervo bibliográfico de una comunidad de lectura. Permite explorar el inventario de libros disponibles, consultar fichas técnicas detalladas, registrar nuevos ejemplares, modificar información existente, controlar el estado de préstamo y organizar colecciones personales de favoritos con persistencia local.

La interfaz implementa una arquitectura de estilos modernos mediante **Styled Components**, sistema de tematización dinámico (Modo Claro / Modo Oscuro) y un diseño adaptable a diferentes dispositivos.

---

## 🛠️ Tecnologías y Herramientas

- **React 18** (Functional Components, Hooks avanzados)
- **Vite** (Herramienta de compilación y servidor de desarrollo)
- **React Router v6** (Enrutamiento declarativo, parámetros dinámicos, rutas comodín)
- **Styled Components** (CSS-in-JS, tematización con `ThemeProvider`, variantes con props `$variante`)
- **Context API + useReducer** (Gestión de estado global predecible para favoritos)
- **JSON Server** (API REST mockeada con soporte completo de operaciones HTTP)
- **LocalStorage API** (Persistencia local de preferencias y colecciones)

---

## 🚀 Puesta en Marcha

Para ejecutar el proyecto en tu entorno local se requieren **dos terminales**:

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/lucainfodev/PW3-El-Club-de-la-Lectura.git
cd PW3-El-Club-de-la-Lectura
npm install
```

### 2. Iniciar el servidor API (Terminal 1)
Levanta la API REST simulada en el puerto `3001` consumiendo el archivo `db.json`:
```bash
npm run server
```

### 3. Iniciar el servidor de desarrollo Vite (Terminal 2)
Inicia la aplicación frontend en `http://localhost:5173`:
```bash
npm run dev
```

---

## 📋 Mapeo de Requisitos de la Cátedra

| Requisito | Implementación en el proyecto |
|---|---|
| **Componentes con props (5 o más)** | `LibroCard`, `ListaLibros`, `BotonFavorito`, `Cargando`, `MensajeError`, `FormularioLibro`, `Layout`. |
| **Renderizado de listas con `map` y `key` única** | `ListaLibros.jsx` mapea los libros utilizando `key={libro.id}`. |
| **Inmutabilidad en `useState` / `useReducer`** | Actualizaciones mediante spread operator (`[...items]`, `{ ...libro }`) y métodos inmutables (`filter`, `map`). |
| **Layout principal con `Outlet`** | `Layout.jsx` define el Navbar superior, el contenedor dinámico `<Outlet />` y el Footer institucional. |
| **Rutas con parámetros dinámicos** | `/libros/:id` (ficha de detalle) y `/libros/:id/editar` (edición) consumidas con `useParams`. |
| **Ruta 404 comodín** | `path="*"` vinculada a `NoEncontrada.jsx`. |
| **Formularios controlados con validación** | `FormularioLibro.jsx` gestiona campos controlados, validación de obligatoriedad, tipos numéricos y muestra mensajes de error contextuales. |
| **Estado global con `useReducer` + valores derivados** | `FavoritosContext.jsx` almacena los IDs de favoritos y calcula valores derivados (`cantidad`, `esFavorito`, `disponibles`) sin duplicación de estado. |
| **Consumo de API REST (CRUD completo)** | Módulo `src/api/libros.js` con soporte para: `GET` (catálogo y detalle), `POST` (alta), `PUT`/`PATCH` (modificación y cambio de estado) y `DELETE` (eliminación). |
| **Manejo de estados de carga y error** | Indicadores visuales durante las peticiones y pantallas de reintento en caso de fallo de red. |
| **Styled Components y variantes por props** | Componentes estilizados (`Boton`, `LibroCard`, `Badge`) con variantes condicionales `$variante` y `$disponible`. |
| **Tematización Claro / Oscuro** | `ThemeProvider` con paletas semánticas completas en `theme.js` y alternador en el encabezado. |
| **Animaciones y transiciones fluidas** | Keyframes `aparecer` y `girar` en `estilos.js` junto a transiciones CSS en tarjetas y botones. |

---

## 📝 Respuestas al Coloquio Teórico (Parte 2)

Las respuestas teóricas individuales requeridas por la consigna para **Luca Gomez** y **Juan Artusa** se encuentran documentadas en el archivo:
- [COLOQUIO_RESPUESTAS.md](./COLOQUIO_RESPUESTAS.md)

---

## 📂 Estructura del Código

```text
├── public/
│   ├── favicon.svg
│   └── logo.svg
├── src/
│   ├── api/
│   │   └── libros.js           # Servicios HTTP para el CRUD con json-server
│   ├── components/
│   │   ├── BotonFavorito.jsx   # Botón de guardado a favoritos
│   │   ├── Cargando.jsx        # Spinner accesible de estado de carga
│   │   ├── estilos.js          # Componentes base compartidos y keyframes
│   │   ├── FormularioLibro.jsx # Formulario controlado reutilizable
│   │   ├── Layout.jsx          # Header con logo, navegación y Footer
│   │   ├── LibroCard.jsx       # Tarjeta individual de libro
│   │   ├── ListaLibros.jsx     # Grilla responsiva de libros
│   │   └── MensajeError.jsx    # Componente visual para excepciones
│   ├── context/
│   │   └── FavoritosContext.jsx# Estado global y reducer de favoritos
│   ├── pages/
│   │   ├── EditarLibro.jsx     # Vista de edición de ejemplar
│   │   ├── Favoritos.jsx       # Vista de colección personal y métricas
│   │   ├── Inicio.jsx          # Portada y estadísticas del club
│   │   ├── LibroDetalle.jsx    # Ficha técnica, acciones y cambio de estado
│   │   ├── Libros.jsx          # Catálogo con buscador y filtros
│   │   └── NoEncontrada.jsx    # Vista 404 personalizada
│   ├── App.jsx                 # Configuración de temas y rutas
│   ├── main.jsx                # Punto de entrada de la aplicación
│   └── theme.js                # Tokens de diseño (temas claro y oscuro)
├── db.json                     # Base de datos simulada para json-server
├── package.json
└── vite.config.js
```
