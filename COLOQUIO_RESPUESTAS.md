# Proyecto Integrador / Coloquio – Programación Web 3
**Cátedra:** Programación Web 3 (PW3) – TUDAI  
**Profesora / Tutora:** Giuliana Dealbera Etchechoury  
**Integrantes:**
- Luca Emmanuel Gomez (DNI: [Completar DNI])
- Juan Artusa (DNI: [Completar DNI])

---

## Respuestas Individuales a las Preguntas Teóricas (Parte 2)

### Integrante 1: Luca Emmanuel Gomez

#### Pregunta 1: ¿Qué datos de su proyecto guardaron en estado local (`useState`) y cuáles en estado global (`Context`)? Justifiquen la decisión.
**Respuesta:**  
En estado local con `useState` manejamos los datos propios de cada vista que no necesitan compartirse, como los campos del formulario de alta/edición de libros (`FormularioLibro`), el término del buscador en tiempo real en el catálogo y los indicadores de carga (`cargando`) y errores de red. En cambio, en estado global con `Context` y `useReducer` administramos la colección de libros favoritos (`FavoritosContext`). Tomamos esta decisión porque los favoritos deben persistir y estar disponibles en toda la navegación, permitiendo calcular al vuelo valores derivados como la cantidad total para el badge del menú y sincronizar el botón de guardado en las tarjetas sin recurrir a prop drilling.

#### Pregunta 2: Si la aplicación se publicara, ¿qué cosas no estarían protegidas por estar solo en el front? ¿Qué debería validar el servidor?
**Respuesta:**  
Al ejecutarse en el cliente, las validaciones del formulario (año válido, campos no vacíos) y las restricciones de interfaz son meramente para experiencia de usuario y pueden eludirse fácilmente usando herramientas como Postman o modificando el código en las DevTools del navegador. El servidor backend debe validar obligatoriamente la autenticidad y permisos del usuario mediante tokens (JWT/sesiones), sanitizar los datos de entrada para evitar inyecciones, comprobar que el año y los tipos de datos sean correctos según el esquema de la base de datos, y verificar que los recursos existan antes de ejecutar operaciones de actualización (`PUT/PATCH`) o eliminación (`DELETE`).

---

### Integrante 2: Juan Artusa

#### Pregunta 1: ¿Qué datos de su proyecto guardaron en estado local (`useState`) y cuáles en estado global (`Context`)? Justifiquen la decisión.
**Respuesta:**  
Utilizamos `useState` para el estado interno y efímero de los componentes: la lista de libros obtenida de la API en la página del catálogo, los errores de peticiones HTTP, el detalle del libro seleccionado y el estado de los inputs controlados. Por el contrario, ubicamos en el `Context` global la lista de IDs de favoritos junto a su `useReducer`, además del tema visual (claro/oscuro) en `ThemeProvider`. Esto fue fundamental porque la cantidad de favoritos y el modo de pantalla deben reflejarse de forma reactiva e instantánea en el encabezado general (`Layout`), sin importar en qué ruta o componente hijo se encuentre navegando el usuario.

#### Pregunta 2: Si la aplicación se publicara, ¿qué cosas no estarían protegidas por estar solo en el front? ¿Qué debería validar el servidor?
**Respuesta:**  
Cualquier regla implementada exclusivamente en React no brinda seguridad real: un atacante puede enviar solicitudes HTTP directas a los endpoints de la API (`POST`, `PUT`, `DELETE`) enviando datos corruptos, eliminando registros ajenos o saltándose la comprobación de campos requeridos. Por lo tanto, el servidor debe actuar como la barrera de seguridad definitiva: debe autenticar y autorizar a quien hace la petición, validar el formato y tamaño del payload JSON, impedir la manipulación indebida de IDs existentes y asegurar la integridad referencial de los datos antes de persistirlos en la base de datos.

