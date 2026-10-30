const URL = 'http://localhost:3001/libros';

async function pedir(url, opciones) {
  const respuesta = await fetch(url, opciones);
  if (!respuesta.ok) {
    throw new Error(
      respuesta.status === 404 ? 'No se encontró el libro' : `Error ${respuesta.status} del servidor`
    );
  }
  return respuesta.json();
}

const json = (metodo, datos) => ({
  method: metodo,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(datos),
});

// READ
export const obtenerLibros = () => pedir(URL);
export const obtenerLibro = (id) => pedir(`${URL}/${id}`);
// CREATE
export const crearLibro = (libro) => pedir(URL, json('POST', libro));
// UPDATE
export const actualizarLibro = (id, libro) => pedir(`${URL}/${id}`, json('PUT', libro));
export const cambiarDisponibilidad = (id, disponible) =>
  pedir(`${URL}/${id}`, json('PATCH', { disponible }));
// DELETE
export const eliminarLibro = (id) => pedir(`${URL}/${id}`, { method: 'DELETE' });
