import { createContext, useContext, useEffect, useReducer } from 'react';

const FavoritosContext = createContext(null);

function normalizarId(id) {
  const num = Number(id);
  return Number.isNaN(num) ? String(id) : num;
}

// El estado es un arreglo de ids. Nunca se modifica: siempre se devuelve uno nuevo.
function reducer(state, action) {
  const idNorm = normalizarId(action.id);
  switch (action.type) {
    case 'ALTERNAR':
      return state.some((id) => normalizarId(id) === idNorm)
        ? state.filter((id) => normalizarId(id) !== idNorm)
        : [...state, idNorm];
    case 'QUITAR':
      return state.filter((id) => normalizarId(id) !== idNorm);
    case 'VACIAR':
      return [];
    default:
      return state;
  }
}

function cargarInicial() {
  try {
    return JSON.parse(localStorage.getItem('favoritos')) ?? [];
  } catch {
    return [];
  }
}

export function FavoritosProvider({ children }) {
  const [favoritos, dispatch] = useReducer(reducer, [], cargarInicial);

  useEffect(() => {
    try {
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    } catch {
      /* sin almacenamiento disponible: se sigue funcionando en memoria */
    }
  }, [favoritos]);

  // Valores derivados: se calculan a partir del estado, no se guardan aparte.
  const cantidad = favoritos.length;
  const esFavorito = (id) => favoritos.some((f) => normalizarId(f) === normalizarId(id));

  const value = {
    favoritos,
    cantidad,
    esFavorito,
    alternar: (id) => dispatch({ type: 'ALTERNAR', id }),
    quitar: (id) => dispatch({ type: 'QUITAR', id }),
    vaciar: () => dispatch({ type: 'VACIAR' }),
  };

  return <FavoritosContext.Provider value={value}>{children}</FavoritosContext.Provider>;
}

export function useFavoritos() {
  const ctx = useContext(FavoritosContext);
  if (!ctx) throw new Error('useFavoritos debe usarse dentro de FavoritosProvider');
  return ctx;
}
