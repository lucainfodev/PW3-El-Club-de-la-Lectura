import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useFavoritos } from '../context/FavoritosContext';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContenidoPrincipal = styled.div`
  flex: 1;
`;

const Cabecera = styled.header`
  background: ${({ theme }) => theme.superficie};
  border-bottom: 1px solid ${({ theme }) => theme.borde};
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  box-shadow: ${({ theme }) => theme.sombraSm};
  transition: background-color 0.25s ease, border-color 0.25s ease;
`;

const Barra = styled.nav`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;

  @media (max-width: 640px) {
    padding: 0.65rem 1rem;
    flex-wrap: wrap;
  }
`;

const Marca = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;

  img.logo-svg {
    height: 56px;
    width: auto;
    display: block;
    object-fit: contain;
    transition: transform 0.2s ease;

    @media (max-width: 640px) {
      height: 44px;
    }
  }

  &:hover img.logo-svg {
    transform: scale(1.02);
  }
`;

const GrupoEnlaces = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
`;

const Enlace = styled(NavLink)`
  padding: 0.45rem 0.8rem;
  border-radius: 7px;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textoSuave};
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;

  &:hover {
    color: ${({ theme }) => theme.texto};
    background: ${({ theme }) => theme.superficieAlt};
  }

  &.active {
    background: ${({ theme }) => theme.primarioSuave};
    color: ${({ theme }) => theme.primario};
    font-weight: 700;
  }
`;

const Badge = styled.span`
  background: ${({ theme }) => theme.superficieAlt};
  color: ${({ theme }) => theme.texto};
  padding: 0.1rem 0.45rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: -0.01em;

  ${Enlace}.active & {
    background: ${({ theme }) => theme.primario};
    color: #ffffff;
  }
`;

const DivisorVertical = styled.div`
  width: 1px;
  height: 20px;
  background: ${({ theme }) => theme.borde};
  margin: 0 0.25rem;

  @media (max-width: 500px) {
    display: none;
  }
`;

const BotonTema = styled.button`
  background: ${({ theme }) => theme.superficieAlt};
  color: ${({ theme }) => theme.texto};
  border: 1px solid ${({ theme }) => theme.borde};
  padding: 0.45rem 0.75rem;
  border-radius: 7px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
  }

  &:hover {
    background: ${({ theme }) => theme.superficieHover};
    border-color: ${({ theme }) => theme.bordeHover};
  }
`;

const PiePagina = styled.footer`
  background: ${({ theme }) => theme.superficie};
  border-top: 1px solid ${({ theme }) => theme.borde};
  padding: 1.5rem 1rem;
  margin-top: auto;
  transition: background-color 0.25s ease, border-color 0.25s ease;
`;

const PieContenido = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textoSuave};

  p.datos-materia {
    margin: 0;
    font-weight: 600;
    color: ${({ theme }) => theme.texto};
  }

  p.datos-integrantes {
    margin: 0;
    font-size: 0.82rem;
    color: ${({ theme }) => theme.textoSuave};
  }
`;

function Layout({ modo, alternarModo }) {
  const { cantidad } = useFavoritos();

  return (
    <LayoutWrapper>
      <Cabecera>
        <Barra>
          <Marca to="/">
            <img src="/logo.svg" alt="El club de la lectura" className="logo-svg" />
          </Marca>

          <GrupoEnlaces>
            <Enlace to="/" end>Inicio</Enlace>
            <Enlace to="/libros" end>Catálogo</Enlace>
            <Enlace to="/libros/nuevo">Nuevo Libro</Enlace>
            <Enlace to="/favoritos">
              Favoritos
              <Badge>{cantidad}</Badge>
            </Enlace>
            <DivisorVertical />
            <BotonTema type="button" onClick={alternarModo}>
              {modo === 'claro' ? (
                <>
                  <svg viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span>Oscuro</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <span>Claro</span>
                </>
              )}
            </BotonTema>
          </GrupoEnlaces>
        </Barra>
      </Cabecera>

      <ContenidoPrincipal>
        <Outlet />
      </ContenidoPrincipal>

      <PiePagina>
        <PieContenido>
          <p className="datos-materia">2026 · Programación Web III - TUDAI - Integrantes: Luca Gomez y Juan Artusa</p>
        </PieContenido>
      </PiePagina>
    </LayoutWrapper>
  );
}

export default Layout;
