import styled, { createGlobalStyle, css, keyframes } from 'styled-components';

export const EstilosGlobales = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${({ theme }) => theme.fondo};
    color: ${({ theme }) => theme.texto};
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 0.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.texto};
    letter-spacing: -0.025em;
    line-height: 1.25;
  }

  p {
    margin: 0 0 1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input, select, textarea, button {
    font-family: inherit;
  }

  /* Custom scrollbar estilizada */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.fondo};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.borde};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.textoMuted};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export const aparecer = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const girar = keyframes`
  to { transform: rotate(360deg); }
`;

export const Contenedor = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 2.25rem 1.5rem 4.5rem;
  animation: ${aparecer} 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 640px) {
    padding: 1.5rem 1rem 3.5rem;
  }
`;

export const EncabezadoSeccion = styled.div`
  margin-bottom: 2rem;

  span.subtitulo {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.primario};
    margin-bottom: 0.4rem;
  }

  h1 {
    font-size: 1.95rem;
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.texto};

    @media (max-width: 640px) {
      font-size: 1.6rem;
    }
  }

  p {
    color: ${({ theme }) => theme.textoSuave};
    font-size: 1rem;
    line-height: 1.55;
    margin: 0;
    max-width: 680px;
  }
`;

// Botón con variantes por props: $variante = 'primario' | 'secundario' | 'peligro' | 'fantasma'
export const Boton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.15rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  white-space: nowrap;
  user-select: none;

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${({ $variante = 'primario', theme }) => {
    switch ($variante) {
      case 'secundario':
        return css`
          background: ${theme.superficie};
          color: ${theme.texto};
          border-color: ${theme.borde};
          box-shadow: ${theme.sombraSm};

          &:hover:not(:disabled) {
            background: ${theme.superficieAlt};
            border-color: ${theme.bordeHover};
          }
        `;
      case 'peligro':
        return css`
          background: ${theme.peligroSuave};
          color: ${theme.peligro};
          border-color: ${theme.peligroBorde};

          &:hover:not(:disabled) {
            background: ${theme.peligro};
            color: ${theme.peligroTexto};
            border-color: ${theme.peligro};
          }
        `;
      case 'fantasma':
        return css`
          background: transparent;
          color: ${theme.textoSuave};

          &:hover:not(:disabled) {
            background: ${theme.superficieAlt};
            color: ${theme.texto};
          }
        `;
      case 'primario':
      default:
        return css`
          background: ${theme.primario};
          color: ${theme.primarioTexto};
          box-shadow: 0 1px 2px 0 rgba(37, 99, 235, 0.2);

          &:hover:not(:disabled) {
            background: ${theme.primarioHover};
            box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
          }
        `;
    }
  }}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:active {
      transform: none;
    }
  }
`;

export const Fila = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const Texto = styled.p`
  color: ${({ theme }) => theme.textoSuave};
  line-height: 1.6;
  font-size: 0.98rem;
`;

export const TarjetaBase = styled.div`
  background: ${({ theme }) => theme.superficie};
  border: 1px solid ${({ theme }) => theme.borde};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.sombra};
`;
