import styled from 'styled-components';
import { girar } from './estilos';

const ContenedorSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3.5rem 1.5rem;
  color: ${({ theme }) => theme.textoSuave};
`;

const Spinner = styled.div`
  width: 38px;
  height: 38px;
  border: 3px solid ${({ theme }) => theme.borde};
  border-top-color: ${({ theme }) => theme.primario};
  border-radius: 50%;
  animation: ${girar} 0.75s linear infinite;
`;

const Texto = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
`;

function Cargando({ texto = 'Cargando contenido...' }) {
  return (
    <ContenedorSpinner role="status" aria-live="polite">
      <Spinner />
      <Texto>{texto}</Texto>
    </ContenedorSpinner>
  );
}

export default Cargando;
