import styled from 'styled-components';
import { Boton } from './estilos';

const Cuadro = styled.div`
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid ${({ theme }) => theme.peligro};
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  color: ${({ theme }) => theme.peligro};
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  p {
    margin: 0;
    font-weight: 500;
  }
`;

function MensajeError({ mensaje, onReintentar }) {
  return (
    <Cuadro role="alert">
      <p>{mensaje}</p>
      {onReintentar && (
        <div>
          <Boton type="button" $variante="peligro" onClick={onReintentar}>
            Reintentar conexión
          </Boton>
        </div>
      )}
    </Cuadro>
  );
}

export default MensajeError;
