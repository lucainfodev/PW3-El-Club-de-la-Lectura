import styled from 'styled-components';
import { useFavoritos } from '../context/FavoritosContext';

const BotonIcono = styled.button`
  background: ${({ $activo, theme }) => ($activo ? theme.primarioSuave : 'transparent')};
  border: 1px solid ${({ $activo, theme }) => ($activo ? theme.primario : theme.borde)};
  color: ${({ $activo, theme }) => ($activo ? theme.primario : theme.textoSuave)};
  padding: 0.35rem 0.65rem;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s ease;
  user-select: none;

  svg {
    width: 13px;
    height: 13px;
    stroke: currentColor;
    fill: ${({ $activo }) => ($activo ? 'currentColor' : 'none')};
    stroke-width: 2;
    transition: transform 0.15s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.primario};
    color: ${({ theme }) => theme.primario};
    background: ${({ theme }) => theme.primarioSuave};

    svg {
      transform: scale(1.15);
    }
  }

  &:active {
    transform: scale(0.96);
  }
`;

function BotonFavorito({ id }) {
  const { esFavorito, alternar } = useFavoritos();
  const activo = esFavorito(id);

  return (
    <BotonIcono
      type="button"
      $activo={activo}
      onClick={() => alternar(id)}
      title={activo ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      aria-label={activo ? 'Quitar de favoritos' : 'Guardar en favoritos'}
    >
      <svg viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span>{activo ? 'Guardado' : 'Guardar'}</span>
    </BotonIcono>
  );
}

export default BotonFavorito;
