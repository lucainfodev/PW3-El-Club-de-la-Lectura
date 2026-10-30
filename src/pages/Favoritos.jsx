import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { obtenerLibros } from '../api/libros';
import { useFavoritos } from '../context/FavoritosContext';
import { Boton, Contenedor, EncabezadoSeccion } from '../components/estilos';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import ListaLibros from '../components/ListaLibros';

const BarraResumen = styled.div`
  background: ${({ theme }) => theme.superficie};
  border: 1px solid ${({ theme }) => theme.borde};
  border-radius: 12px;
  padding: 1.25rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  box-shadow: ${({ theme }) => theme.sombraSm};
  margin-bottom: 2rem;
`;

const MetricasFavoritos = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;

  div.bloque-dato {
    display: flex;
    flex-direction: column;

    span.label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: ${({ theme }) => theme.textoSuave};
      margin-bottom: 0.15rem;
    }

    span.valor {
      font-size: 1.35rem;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      color: ${({ theme }) => theme.texto};
    }
  }
`;

function Favoritos() {
  const { favoritos, cantidad, vaciar } = useFavoritos();
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;
    obtenerLibros()
      .then((datos) => !cancelado && setLibros(datos))
      .catch(() => !cancelado && setError('No se pudieron recuperar los libros.'))
      .finally(() => !cancelado && setCargando(false));
    return () => {
      cancelado = true;
    };
  }, []);

  // Valores derivados calculados: libros favoritos y cuántos están disponibles.
  const favoritosCompletos = libros.filter((l) =>
    favoritos.some((f) => String(f) === String(l.id))
  );
  const disponibles = favoritosCompletos.filter((l) => l.disponible).length;
  const prestados = favoritosCompletos.filter((l) => !l.disponible).length;

  const confirmarVaciar = () => {
    if (window.confirm('¿Deseas vaciar tu lista de favoritos completa?')) {
      vaciar();
    }
  };

  return (
    <Contenedor>
      <EncabezadoSeccion>
        <span className="subtitulo">Colección Personal</span>
        <h1>Mis Libros Favoritos</h1>
        <p>Listado de obras guardadas en tu colección para acceso rápido y seguimiento.</p>
      </EncabezadoSeccion>

      {cargando && <Cargando texto="Cargando favoritos..." />}
      {error && <MensajeError mensaje={error} />}

      {!cargando && !error && (
        <>
          <BarraResumen>
            <MetricasFavoritos>
              <div className="bloque-dato">
                <span className="label">Total Guardados</span>
                <span className="valor">{cantidad}</span>
              </div>
              <div className="bloque-dato">
                <span className="label">Disponibles</span>
                <span className="valor" style={{ color: '#059669' }}>{disponibles}</span>
              </div>
              <div className="bloque-dato">
                <span className="label">En Préstamo</span>
                <span className="valor" style={{ color: '#dc2626' }}>{prestados}</span>
              </div>
            </MetricasFavoritos>

            {cantidad > 0 && (
              <Boton type="button" $variante="peligro" onClick={confirmarVaciar}>
                Vaciar lista de favoritos
              </Boton>
            )}
          </BarraResumen>

          <ListaLibros
            libros={favoritosCompletos}
            mensajeVacio="Todavía no guardaste ningún libro en tus favoritos. Explorá el catálogo y guardá los títulos que desees consultar con frecuencia."
          />
        </>
      )}
    </Contenedor>
  );
}

export default Favoritos;
