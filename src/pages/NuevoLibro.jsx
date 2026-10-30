import { Link, useNavigate } from 'react-router-dom';
import { crearLibro } from '../api/libros';
import { Contenedor, EncabezadoSeccion } from '../components/estilos';
import FormularioLibro from '../components/FormularioLibro';
import MensajeError from '../components/MensajeError';
import { useState } from 'react';
import styled from 'styled-components';

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

function NuevoLibro() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleCrear = async (datos) => {
    setError(null);
    setEnviando(true);
    try {
      const nuevo = await crearLibro(datos);
      navigate(`/libros/${nuevo.id}`);
    } catch {
      setError('No se pudo registrar la obra en el servidor.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Contenedor>
      <Volver to="/libros">
        Volver al catálogo
      </Volver>

      <EncabezadoSeccion>
        <span className="subtitulo">Ingreso de Ejemplar</span>
        <h1>Cargar Nuevo Libro</h1>
        <p>Completá el formulario para dar de alta una nueva obra en el catálogo institucional.</p>
      </EncabezadoSeccion>

      {error && (
        <div style={{ marginBottom: '1.5rem', maxWidth: '560px' }}>
          <MensajeError mensaje={error} />
        </div>
      )}

      <FormularioLibro
        textoBoton="Guardar y registrar libro"
        onEnviar={handleCrear}
        enviando={enviando}
      />
    </Contenedor>
  );
}

export default NuevoLibro;
