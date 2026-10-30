import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { cambiarDisponibilidad, eliminarLibro, obtenerLibro } from '../api/libros';
import { useFavoritos } from '../context/FavoritosContext';
import { Boton, Contenedor, Fila } from '../components/estilos';
import BotonFavorito from '../components/BotonFavorito';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';

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

const Ficha = styled.article`
  background: ${({ theme }) => theme.superficie};
  border: 1px solid ${({ theme }) => theme.borde};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.sombraSm};

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const FichaHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.25rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borde};
  margin-bottom: 2rem;

  span.genero-tag {
    display: inline-block;
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.primario};
    background: ${({ theme }) => theme.primarioSuave};
    padding: 0.25rem 0.65rem;
    border-radius: 5px;
    margin-bottom: 0.6rem;
  }

  h1 {
    font-size: 2.1rem;
    margin-bottom: 0.4rem;
    letter-spacing: -0.025em;

    @media (max-width: 640px) {
      font-size: 1.6rem;
    }
  }

  p.autor {
    font-size: 1.15rem;
    color: ${({ theme }) => theme.textoSecundario};
    margin: 0;
  }
`;

const GrillaDatos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.25rem;
`;

const DatoItem = styled.div`
  background: ${({ theme }) => theme.fondo};
  padding: 1.15rem 1.25rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.borde};

  span.etiqueta {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 700;
    color: ${({ theme }) => theme.textoSuave};
    margin-bottom: 0.4rem;
  }

  span.valor {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.texto};
    font-family: ${({ $mono }) => ($mono ? "'JetBrains Mono', monospace" : 'inherit')};
  }
`;

const BarraAcciones = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1.75rem;
  border-top: 1px solid ${({ theme }) => theme.borde};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  background: ${({ $disponible, theme }) =>
    $disponible ? theme.exitoSuave : theme.peligroSuave};
  color: ${({ $disponible, theme }) =>
    $disponible ? theme.exito : theme.peligro};
  border: 1px solid
    ${({ $disponible, theme }) =>
      $disponible ? theme.exitoBorde : theme.peligroBorde};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

function LibroDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quitar } = useFavoritos();

  const [libro, setLibro] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [accionError, setAccionError] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError(null);

    obtenerLibro(id)
      .then((dato) => !cancelado && setLibro(dato))
      .catch((e) => !cancelado && setError(e.message))
      .finally(() => !cancelado && setCargando(false));

    return () => {
      cancelado = true;
    };
  }, [id]);

  const alternarDisponible = async () => {
    setAccionError(null);
    setActualizando(true);
    try {
      const actualizado = await cambiarDisponibilidad(libro.id, !libro.disponible);
      setLibro(actualizado);
    } catch {
      setAccionError('No se pudo actualizar el estado de disponibilidad en el servidor.');
    } finally {
      setActualizando(false);
    }
  };

  const borrar = async () => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar permanentemente "${libro.titulo}" del catálogo?`)) {
      return;
    }
    setAccionError(null);
    try {
      await eliminarLibro(libro.id);
      quitar(libro.id);
      navigate('/libros');
    } catch {
      setAccionError('No se pudo eliminar el ejemplar.');
    }
  };

  if (cargando) return <Contenedor><Cargando texto="Cargando ficha del libro..." /></Contenedor>;
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
      <Volver to="/libros">
        Volver al catálogo
      </Volver>

      <Ficha>
        <FichaHeader>
          <div>
            <span className="genero-tag">{libro.genero}</span>
            <h1>{libro.titulo}</h1>
            <p className="autor">{libro.autor}</p>
          </div>
          <BotonFavorito id={libro.id} />
        </FichaHeader>

        {accionError && (
          <div style={{ marginBottom: '1.5rem' }}>
            <MensajeError mensaje={accionError} />
          </div>
        )}

        <GrillaDatos>
          <DatoItem>
            <span className="etiqueta">Identificador Interno</span>
            <span className="valor" $mono>#{libro.id}</span>
          </DatoItem>
          <DatoItem>
            <span className="etiqueta">Año de Publicación</span>
            <span className="valor" $mono>{libro.anio}</span>
          </DatoItem>
          <DatoItem>
            <span className="etiqueta">Disponibilidad de Préstamo</span>
            <span className="valor">
              <Badge $disponible={libro.disponible}>
                {libro.disponible ? 'Disponible para retiro' : 'Actualmente prestado'}
              </Badge>
            </span>
          </DatoItem>
        </GrillaDatos>

        <BarraAcciones>
          <Fila>
            <Boton
              type="button"
              $variante={libro.disponible ? 'secundario' : 'primario'}
              onClick={alternarDisponible}
              disabled={actualizando}
            >
              {libro.disponible ? 'Registrar como prestado' : 'Registrar devolución'}
            </Boton>
            <Boton as={Link} to={`/libros/${libro.id}/editar`} $variante="secundario">
              Editar información
            </Boton>
          </Fila>

          <Boton type="button" $variante="peligro" onClick={borrar}>
            Dar de baja ejemplar
          </Boton>
        </BarraAcciones>
      </Ficha>
    </Contenedor>
  );
}

export default LibroDetalle;
