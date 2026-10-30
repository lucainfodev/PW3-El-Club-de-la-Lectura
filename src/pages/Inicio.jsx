import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { obtenerLibros } from '../api/libros';
import { useFavoritos } from '../context/FavoritosContext';
import { Contenedor, Boton, Fila } from '../components/estilos';

const Hero = styled.section`
  background: ${({ theme }) => theme.superficie};
  border: 1px solid ${({ theme }) => theme.borde};
  border-radius: 16px;
  padding: 3rem 2.5rem;
  box-shadow: ${({ theme }) => theme.sombraSm};
  margin-bottom: 2.25rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primario}, #38bdf8);
  }

  span.pill-contexto {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.primario};
    background: ${({ theme }) => theme.primarioSuave};
    padding: 0.25rem 0.65rem;
    border-radius: 20px;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.35rem;
    color: ${({ theme }) => theme.texto};
    margin-bottom: 0.85rem;
    letter-spacing: -0.03em;
    line-height: 1.2;

    @media (max-width: 640px) {
      font-size: 1.8rem;
    }
  }

  p.bajada {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.textoSecundario};
    line-height: 1.6;
    max-width: 720px;
    margin-bottom: 2rem;
  }
`;

const TarjetasMetricas = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.25rem;
`;

const MetricaCard = styled.div`
  background: ${({ theme }) => theme.fondo};
  border: 1px solid ${({ theme }) => theme.borde};
  border-radius: 12px;
  padding: 1.25rem 1.4rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.bordeHover};
    box-shadow: ${({ theme }) => theme.sombraSm};
  }

  span.label-sup {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.textoSuave};
    margin-bottom: 0.4rem;
  }

  div.valor {
    font-size: 1.9rem;
    font-weight: 800;
    color: ${({ theme }) => theme.texto};
    line-height: 1.1;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 0.35rem;
  }

  p.detalle {
    font-size: 0.82rem;
    color: ${({ theme }) => theme.textoMuted};
    margin: 0;
    line-height: 1.4;
  }
`;

const AccionesHero = styled(Fila)`
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.borde};
`;

function Inicio() {
  const { cantidad } = useFavoritos();
  const [metricas, setMetricas] = useState({ total: 0, disponibles: 0, prestados: 0 });

  useEffect(() => {
    let cancelado = false;
    obtenerLibros()
      .then((datos) => {
        if (!cancelado && Array.isArray(datos)) {
          const disponibles = datos.filter((l) => l.disponible).length;
          setMetricas({
            total: datos.length,
            disponibles,
            prestados: datos.length - disponibles,
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <Contenedor>
      <Hero>
        <span className="pill-contexto">Biblioteca comunitaria</span>
        <h1>El club de la lectura</h1>
        <p className="bajada">
          Espacio dedicado a descubrir, organizar y compartir lecturas. Explora el
          catálogo general de ejemplares, gestiona tu lista personal de favoritos y
          agrega nuevas obras a la colección.
        </p>

        <TarjetasMetricas>
          <MetricaCard>
            <span className="label-sup">Total en catálogo</span>
            <div className="valor">{metricas.total}</div>
            <p className="detalle">Ejemplares registrados en la biblioteca</p>
          </MetricaCard>
          <MetricaCard>
            <span className="label-sup">Disponibles</span>
            <div className="valor" style={{ color: '#059669' }}>{metricas.disponibles}</div>
            <p className="detalle">Listos para retiro y consulta inmediata</p>
          </MetricaCard>
          <MetricaCard>
            <span className="label-sup">En préstamo</span>
            <div className="valor" style={{ color: '#dc2626' }}>{metricas.prestados}</div>
            <p className="detalle">Ejemplares actualmente en lectura externa</p>
          </MetricaCard>
          <MetricaCard>
            <span className="label-sup">Tu colección</span>
            <div className="valor">{cantidad}</div>
            <p className="detalle">Títulos guardados en tu lista de favoritos</p>
          </MetricaCard>
        </TarjetasMetricas>

        <AccionesHero>
          <Boton as={Link} to="/libros">
            Explorar catálogo general
          </Boton>
          <Boton as={Link} to="/libros/nuevo" $variante="secundario">
            + Cargar nuevo ejemplar
          </Boton>
        </AccionesHero>
      </Hero>
    </Contenedor>
  );
}

export default Inicio;
