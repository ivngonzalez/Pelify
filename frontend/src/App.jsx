import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion/Nav';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home'; 
import Perfil from './pages/Perfil/Perfil';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import DetallesPelicula from './pages/DetallesPelicula/DetallesPelicula';
import ResultadosBusqueda from './pages/ResultadosBusqueda/ResultadosBusqueda'; 

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* La navegación se mantiene presente en todas las páginas */}
      <Navegacion />

      <main className="flex-grow-1">
        <Routes>
          {/* VISTA DE INICIO */}
          <Route path="/" element={<Home />} />

          {/* VISTA DE DETALLE DE PELÍCULA */}
          <Route path="/pelicula/:id" element={<DetallesPelicula />} />

          {/* VISTA DE RESULTADOS DE BÚSQUEDA */}
          <Route path="/resultados-busqueda" element={<ResultadosBusqueda />} />

          {/* RUTA DE PERFIL DE USUARIO */}
          <Route path="/perfil" element={<Perfil />} />

          {/* RUTA DE INICIO DE SESIÓN */}
          <Route path="/login" element={<Login />} />

          {/* RUTA DE REGISTRO DE NUEVO USUARIO */}
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>

      {/* El footer se mantiene presente en todas las páginas */}
      <Footer />
    </div>
  );
}

export default App;