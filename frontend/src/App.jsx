import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion/Nav';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import MiLista from './pages/MiLista/MiLista';
import Perfil from './pages/Perfil/Perfil';
import DetallesPelicula from './pages/DetallesPelicula/DetallesPelicula';
import ResultadosBusqueda from './pages/ResultadosBusqueda/ResultadosBusqueda'; 

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navegacion />

      <main className="flex-grow-1">
        <Routes>
          {/* VISTA DE INICIO */}
          <Route path="/" element={<Home />} />

          {/* VISTA DE PERFIL */}
          <Route path="/perfil" element={<Perfil />} />

          {/* VISTA DE DETALLE DE PELÍCULA */}
          <Route path="/pelicula/:id" element={<DetallesPelicula />} />

          {/* VISTA DE RESULTADOS DE BÚSQUEDA */}
          <Route path="/resultados-busqueda" element={<ResultadosBusqueda />} />

          {/* VISTA DE MI LISTA */}
          <Route path="/mi-lista" element={<MiLista />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;