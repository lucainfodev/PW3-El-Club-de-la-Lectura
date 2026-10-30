import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Boton, Contenedor } from '../components/estilos';

const Centrado = styled.div`
  text-align: center;
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.superficie};
  border: 1px solid ${({ theme }) => theme.borde};
  border-radius: 14px;
  max-width: 540px;
  margin: 2rem auto;
  box-shadow: ${({ theme }) => theme.sombra};

  h1 {
    font-size: 3.5rem;
    color: ${({ theme }) => theme.primario};
    margin-bottom: 0.5rem;
    font-weight: 800;
  }

  h2 {
    font-size: 1.35rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: ${({ theme }) => theme.textoSuave};
    margin-bottom: 1.75rem;
  }
`;

function NoEncontrada() {
  return (
    <Contenedor>
      <Centrado>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>La ruta que intentás visitar no existe o fue trasladada dentro del sistema.</p>
        <Boton as={Link} to="/">
          Volver a la página principal
        </Boton>
      </Centrado>
    </Contenedor>
  );
}

export default NoEncontrada;
