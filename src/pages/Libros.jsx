import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { obtenerLibros } from '../api/libros';
import { Contenedor, EncabezadoSeccion } from '../components/estilos';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import ListaLibros from '../components/ListaLibros';

const BarraFiltros = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const ContenedorInput = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;

  svg {
    position: absolute;
    left: 0.95rem;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    stroke: ${({ theme }) => theme.textoMuted};
    fill: none;
    stroke-width: 2.2;
    pointer-events: none;
    transition: stroke 0.15s ease;
  }

  &:focus-within svg {
    stroke: ${({ theme }) => theme.primario};
  }
`;

const Buscador = styled.input`
  width: 100%;
  padding: 0.65rem 0.95rem 0.65rem 2.5rem;
  border-radius: 9px;
  font-size: 0.92rem;
  background: ${({ theme }) => theme.superficie};
  color: ${({ theme }) => theme.texto};
  border: 1px solid ${({ theme }) => theme.borde};
  box-shadow: ${({ theme }) => theme.sombraSm};
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primario};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primarioFocus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textoMuted};
  }
`;

const Conteo = styled.div`
  font-size: 0.88rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textoSuave};

  strong {
    color: ${({ theme }) => theme.texto};
    font-weight: 700;
  }
`;

const ChipsEstado = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

const ChipBoton = styled.button`
  background: ${({ $activo, theme }) => ($activo ? theme.primarioSuave : theme.superficie)};
  border: 1px solid ${({ $activo, theme }) => ($activo ? theme.primario : theme.borde)};
  color: ${({ $activo, theme }) => ($activo ? theme.primario : theme.textoSuave)};
  padding: 0.38rem 0.8rem;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;

  span.numero {
    font-size: 0.74rem;
    padding: 0.05rem 0.45rem;
    border-radius: 10px;
    background: ${({ $activo, theme }) => ($activo ? theme.primario : theme.superficieAlt)};
    color: ${({ $activo }) => ($activo ? '#ffffff' : 'inherit')};
  }

  &:hover {
    border-color: ${({ theme }) => theme.primario};
    color: ${({ theme }) => theme.primario};
  }
`;

function Libros() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError(null);

    obtenerLibros()
      .then((datos) => !cancelado && setLibros(datos))
      .catch(() => !cancelado && setError('No se pudo conectar con el catálogo de la biblioteca.'))
      .finally(() => !cancelado && setCargando(false));

    return () => {
      cancelado = true;
    };
  }, [intento]);

  const total = libros.length;
  const cantDisponibles = libros.filter((l) => l.disponible).length;
  const cantPrestados = total - cantDisponibles;

  const texto = busqueda.trim().toLowerCase();
  const filtrados = libros.filter((l) => {
    const coincideTexto = l.titulo.toLowerCase().includes(texto) || l.autor.toLowerCase().includes(texto);
    if (!coincideTexto) return false;
    if (filtroEstado === 'disponibles') return l.disponible;
    if (filtroEstado === 'prestados') return !l.disponible;
    return true;
  });

  return (
    <Contenedor>
      <EncabezadoSeccion>
        <span className="subtitulo">Inventario General</span>
        <h1>Catálogo de Libros</h1>
        <p>Explorá el repositorio de títulos disponibles, consultá el estado de préstamos o ingresá a cada ficha técnica.</p>
      </EncabezadoSeccion>

      <BarraFiltros>
        <ContenedorInput>
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <Buscador
            type="search"
            placeholder="Buscar por título o autor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </ContenedorInput>

        {!cargando && !error && (
          <ChipsEstado>
            <ChipBoton
              type="button"
              $activo={filtroEstado === 'todos'}
              onClick={() => setFiltroEstado('todos')}
            >
              Todos <span className="numero">{total}</span>
            </ChipBoton>
            <ChipBoton
              type="button"
              $activo={filtroEstado === 'disponibles'}
              onClick={() => setFiltroEstado('disponibles')}
            >
              Disponibles <span className="numero">{cantDisponibles}</span>
            </ChipBoton>
            <ChipBoton
              type="button"
              $activo={filtroEstado === 'prestados'}
              onClick={() => setFiltroEstado('prestados')}
            >
              En préstamo <span className="numero">{cantPrestados}</span>
            </ChipBoton>
          </ChipsEstado>
        )}
      </BarraFiltros>

      {!cargando && !error && (
        <Conteo style={{ marginBottom: '1.25rem' }}>
          Mostrando <strong>{filtrados.length}</strong> {filtrados.length === 1 ? 'ejemplar' : 'ejemplares'}
        </Conteo>
      )}

      {cargando && <Cargando texto="Sincronizando inventario con el servidor..." />}
      {error && <MensajeError mensaje={error} onReintentar={() => setIntento((n) => n + 1)} />}
      {!cargando && !error && (
        <ListaLibros
          libros={filtrados}
          mensajeVacio={
            busqueda
              ? `No se encontraron coincidencias para "${busqueda}".`
              : 'El catálogo está actualmente vacío.'
          }
        />
      )}
    </Contenedor>
  );
}

export default Libros;
