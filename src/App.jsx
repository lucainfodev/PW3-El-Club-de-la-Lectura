import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { temaClaro, temaOscuro } from './theme';
import { EstilosGlobales } from './components/estilos';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Libros from './pages/Libros';
import LibroDetalle from './pages/LibroDetalle';
import NuevoLibro from './pages/NuevoLibro';
import EditarLibro from './pages/EditarLibro';
import Favoritos from './pages/Favoritos';
import NoEncontrada from './pages/NoEncontrada';

function modoInicial() {
  try {
    return localStorage.getItem('modo') || 'claro';
  } catch {
    return 'claro';
  }
}

function App() {
  const [modo, setModo] = useState(modoInicial);

  useEffect(() => {
    try {
      localStorage.setItem('modo', modo);
    } catch {
      /* se ignora: el modo solo vive en memoria */
    }
  }, [modo]);

  const alternarModo = () => setModo((m) => (m === 'claro' ? 'oscuro' : 'claro'));

  return (
    <ThemeProvider theme={modo === 'claro' ? temaClaro : temaOscuro}>
      <EstilosGlobales />
      <Routes>
        <Route element={<Layout modo={modo} alternarModo={alternarModo} />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/libros/nuevo" element={<NuevoLibro />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="/libros/:id/editar" element={<EditarLibro />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
