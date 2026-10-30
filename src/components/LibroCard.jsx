import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { aparecer } from './estilos';
import BotonFavorito from './BotonFavorito';

const Tarjeta = styled.article`
  background: ${({ theme }) => theme.superficie};
  border: 1px solid ${({ theme }) => theme.borde};
  border-radius: 12px;
  padding: 1.35rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${({ theme }) => theme.sombraSm};
  animation: ${aparecer} 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.sombraMd};
    border-color: ${({ theme }) => theme.bordeHover};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const TarjetaHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
`;

const GeneroPill = styled.span`
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.primario};
  background: ${({ theme }) => theme.primarioSuave};
  padding: 0.2rem 0.55rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

const Titulo = styled.h3`
  font-size: 1.15rem;
  margin: 0 0 0.35rem;
  line-height: 1.35;

  a {
    color: ${({ theme }) => theme.texto};
    transition: color 0.15s ease;

    &:hover {
      color: ${({ theme }) => theme.primario};
    }
  }
`;

const Autor = styled.div`
  font-size: 0.92rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textoSecundario};
  margin-bottom: 0.4rem;
`;

const Anio = styled.div`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textoMuted};
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 1.1rem;
`;

const TarjetaFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.borde};
  margin-top: auto;
`;

const BadgeDisponibilidad = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
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
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

const EnlaceDetalle = styled(Link)`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primario};
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: gap 0.15s ease;

  &:hover {
    gap: 0.45rem;
  }
`;

function LibroCard({ libro }) {
  return (
    <Tarjeta $disponible={libro.disponible}>
      <div>
        <TarjetaHeader>
          <div>
            <GeneroPill>{libro.genero}</GeneroPill>
            <Titulo>
              <Link to={`/libros/${libro.id}`}>{libro.titulo}</Link>
            </Titulo>
            <Autor>{libro.autor}</Autor>
            <Anio>Año {libro.anio}</Anio>
          </div>
          <BotonFavorito id={libro.id} />
        </TarjetaHeader>
      </div>

      <TarjetaFooter>
        <BadgeDisponibilidad $disponible={libro.disponible}>
          {libro.disponible ? 'Disponible' : 'Prestado'}
        </BadgeDisponibilidad>
        <EnlaceDetalle to={`/libros/${libro.id}`}>
          <span>Ver ficha</span>
        </EnlaceDetalle>
      </TarjetaFooter>
    </Tarjeta>
  );
}

export default LibroCard;
