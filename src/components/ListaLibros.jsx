import styled from 'styled-components';
import LibroCard from './LibroCard';

const Grilla = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
`;

const Vacio = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.textoSuave};
  background: ${({ theme }) => theme.superficie};
  border: 1px dashed ${({ theme }) => theme.borde};
  border-radius: 12px;
  margin-top: 1.5rem;
`;

function ListaLibros({ libros, mensajeVacio = 'No se encontraron libros.' }) {
  if (libros.length === 0) {
    return <Vacio>{mensajeVacio}</Vacio>;
  }

  return (
    <Grilla>
      {libros.map((libro) => (
        <LibroCard key={libro.id} libro={libro} />
      ))}
    </Grilla>
  );
}

export default ListaLibros;
