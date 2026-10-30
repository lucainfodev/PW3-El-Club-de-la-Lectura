import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { actualizarLibro, obtenerLibro } from '../api/libros';
import { Contenedor, EncabezadoSeccion } from '../components/estilos';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import FormularioLibro from '../components/FormularioLibro';

const Volver = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textoSuave};
  margin-bottom: 1.5rem;
  transition: color 0.15s ease;

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2.2;
  }

  &:hover {
    color: ${({ theme }) => theme.primario};
  }
`;

function EditarLibro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [libro, setLibro] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [guardarError, setGuardarError] = useState(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    let cancelado = false;
    obtenerLibro(id)
      .then((dato) => !cancelado && setLibro(dato))
      .catch((e) => !cancelado && setError(e.message))
      .finally(() => !cancelado && setCargando(false));
    return () => {
      cancelado = true;
    };
  }, [id]);

  const handleGuardar = async (datos) => {
    setGuardarError(null);
    setGuardando(true);
    try {
      await actualizarLibro(id, datos);
      navigate(`/libros/${id}`);
    } catch {
      setGuardarError('No se pudieron actualizar los datos del libro en el servidor.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <Contenedor><Cargando texto="Cargando datos del libro..." /></Contenedor>;
  if (error) {
    return (
      <Contenedor>
        <Volver to="/libros">
          Volver al catálogo
        </Volver>
        <MensajeError mensaje={error} />
      </Contenedor>
    );
  }

  return (
    <Contenedor>
      <Volver to={`/libros/${id}`}>
        Cancelar y volver a la ficha
      </Volver>

      <EncabezadoSeccion>
        <span className="subtitulo">Actualización de Inventario</span>
        <h1>Editar Libro #{id}</h1>
        <p>Modificá los campos necesarios para mantener actualizada la ficha de la obra.</p>
      </EncabezadoSeccion>

      {guardarError && (
        <div style={{ marginBottom: '1.5rem', maxWidth: '560px' }}>
          <MensajeError mensaje={guardarError} />
        </div>
      )}

      <FormularioLibro
        inicial={libro}
        textoBoton="Guardar y aplicar cambios"
        onEnviar={handleGuardar}
        enviando={guardando}
      />
    </Contenedor>
  );
}

export default EditarLibro;
