import { useState } from 'react';
import styled from 'styled-components';
import { Boton, Fila } from './estilos';

const Formulario = styled.form`
  display: grid;
  gap: 1.35rem;
  max-width: 560px;
  background: ${({ theme }) => theme.superficie};
  border: 1px solid ${({ theme }) => theme.borde};
  border-radius: 14px;
  padding: 2.25rem;
  box-shadow: ${({ theme }) => theme.sombraSm};

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const Campo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  label {
    font-size: 0.88rem;
    font-weight: 600;
    color: ${({ theme }) => theme.texto};
    display: flex;
    justify-content: space-between;

    span.opcional {
      font-weight: 400;
      color: ${({ theme }) => theme.textoMuted};
      font-size: 0.8rem;
    }
  }
`;

const Entrada = styled.input`
  padding: 0.7rem 0.95rem;
  border-radius: 8px;
  font-size: 0.92rem;
  background: ${({ theme }) => theme.fondo};
  color: ${({ theme }) => theme.texto};
  border: 1px solid ${({ $error, theme }) => ($error ? theme.peligro : theme.borde)};
  box-shadow: ${({ theme }) => theme.sombraSm};
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: ${({ theme }) => theme.textoMuted};
  }

  &:focus {
    outline: none;
    background: ${({ theme }) => theme.superficie};
    border-color: ${({ $error, theme }) => ($error ? theme.peligro : theme.primario)};
    box-shadow: 0 0 0 3px ${({ $error, theme }) => ($error ? theme.peligroFocus : theme.primarioFocus)};
  }
`;

const Seleccion = styled(Entrada).attrs({ as: 'select' })`
  cursor: pointer;
`;

const CheckboxCard = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.fondo};
  border: 1px solid ${({ theme }) => theme.borde};
  cursor: pointer;
  user-select: none;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.bordeHover};
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-top: 0.15rem;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.primario};
  }

  div.texto-check {
    span.titulo {
      display: block;
      font-size: 0.88rem;
      font-weight: 600;
      color: ${({ theme }) => theme.texto};
      margin-bottom: 0.15rem;
    }

    span.descripcion {
      display: block;
      font-size: 0.78rem;
      color: ${({ theme }) => theme.textoSuave};
      line-height: 1.4;
    }
  }
`;

const MensajeError = styled.span`
  color: ${({ theme }) => theme.peligro};
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  &::before {
    content: '!';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ theme }) => theme.peligro};
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 800;
  }
`;

const GENEROS = ['Novela', 'Cuento', 'Poesía', 'Ensayo', 'Teatro', 'Crónica', 'Otro'];
const ANIO_ACTUAL = new Date().getFullYear();

const VACIO = { titulo: '', autor: '', genero: 'Novela', anio: '', disponible: true };

function validar(form) {
  const errores = {};
  if (!form.titulo || form.titulo.trim() === '') {
    errores.titulo = 'El título de la obra es obligatorio.';
  } else if (form.titulo.trim().length < 2) {
    errores.titulo = 'El título debe tener al menos 2 caracteres.';
  }

  if (!form.autor || form.autor.trim() === '') {
    errores.autor = 'El nombre del autor es obligatorio.';
  } else if (form.autor.trim().length < 2) {
    errores.autor = 'El autor debe tener al menos 2 caracteres.';
  }

  const anio = Number(form.anio);
  if (form.anio === '' || !Number.isInteger(anio)) {
    errores.anio = 'Ingresá un año válido en formato numérico.';
  } else if (anio < 1000 || anio > ANIO_ACTUAL) {
    errores.anio = `El año debe estar comprendido entre 1000 y ${ANIO_ACTUAL}.`;
  }

  return errores;
}

function FormularioLibro({ inicial = VACIO, textoBoton, onEnviar, enviando = false }) {
  const [form, setForm] = useState({ ...VACIO, ...inicial });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = validar(form);
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      onEnviar({
        titulo: form.titulo.trim(),
        autor: form.autor.trim(),
        genero: form.genero,
        anio: Number(form.anio),
        disponible: form.disponible,
      });
    }
  };

  return (
    <Formulario onSubmit={handleSubmit} noValidate>
      <Campo>
        <label htmlFor="titulo">Título de la obra</label>
        <Entrada
          id="titulo"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          $error={Boolean(errores.titulo)}
          placeholder="Ej: Rayuela"
        />
        {errores.titulo && <MensajeError>{errores.titulo}</MensajeError>}
      </Campo>

      <Campo>
        <label htmlFor="autor">Autor / Escritor</label>
        <Entrada
          id="autor"
          name="autor"
          value={form.autor}
          onChange={handleChange}
          $error={Boolean(errores.autor)}
          placeholder="Ej: Julio Cortázar"
        />
        {errores.autor && <MensajeError>{errores.autor}</MensajeError>}
      </Campo>

      <Campo>
        <label htmlFor="genero">Género literario</label>
        <Seleccion id="genero" name="genero" value={form.genero} onChange={handleChange}>
          {GENEROS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Seleccion>
      </Campo>

      <Campo>
        <label htmlFor="anio">Año de publicación</label>
        <Entrada
          id="anio"
          type="number"
          name="anio"
          value={form.anio}
          onChange={handleChange}
          $error={Boolean(errores.anio)}
          placeholder="Ej: 1963"
        />
        {errores.anio && <MensajeError>{errores.anio}</MensajeError>}
      </Campo>

      <CheckboxCard>
        <input
          type="checkbox"
          name="disponible"
          checked={form.disponible}
          onChange={handleChange}
        />
        <div className="texto-check">
          <span className="titulo">Ejemplar disponible para préstamo</span>
          <span className="descripcion">
            Desmarcalo si el ejemplar ya fue entregado a un socio o se encuentra en reparación.
          </span>
        </div>
      </CheckboxCard>

      <Fila style={{ marginTop: '0.5rem' }}>
        <Boton type="submit" disabled={enviando}>
          {enviando ? 'Guardando cambios...' : textoBoton}
        </Boton>
      </Fila>
    </Formulario>
  );
}

export default FormularioLibro;
