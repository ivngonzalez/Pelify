import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion/Nav';
import Footer from './components/Footer/Footer';
import SeccionBienvenida from './components/SeccionBienvenida/SeccionBienvenida';
import BuscadorPeliculas from './components/BuscadorPeliculas/BuscadorPeliculas';
import TarjetasPelicula from './components/TarjetasPelicula/TarjetasPelicula';
import Perfil from './pages/Perfil/Perfil';
import DetallesPelicula from './pages/DetallesPelicula/DetallesPelicula';
import ResultadosBusqueda from './pages/ResultadosBusqueda/ResultadosBusqueda'; 
import { 
  getPeliculasPopulares, 
  getProximosLanzamientos, 
  getTendenciasSemana,
  getMejorValoradas 
} from './services/tmdbService';

function App() {
  const [peliculaDestacada, setPeliculaDestacada] = useState(null);

  useEffect(() => {
    getPeliculasPopulares().then(peliculas => {
      if (peliculas && peliculas.length > 0) {
        setPeliculaDestacada(peliculas[0]);
      }
    });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navegacion />
      
      <main className="flex-grow-1">
        <Routes>
          {/* VISTA DE INICIO */}
          <Route path="/" element={
            <>
              <SeccionBienvenida pelicula={peliculaDestacada} />
              <BuscadorPeliculas />
              
              <TarjetasPelicula 
                titulo="Películas Populares" 
                fetchFunction={getPeliculasPopulares} 
              />
              <TarjetasPelicula 
                titulo="Próximos Lanzamientos" 
                fetchFunction={getProximosLanzamientos} 
              />
              <TarjetasPelicula 
                titulo="Tendencias de la Semana" 
                fetchFunction={getTendenciasSemana} 
              />
              <TarjetasPelicula 
                titulo="Mejor Valoradas" 
                fetchFunction={getMejorValoradas} 
              />
            </>
          } />

          {/* VISTA DE PERFIL */}
          <Route path="/perfil" element={<Perfil />} />

          {/* VISTA DE DETALLE DE PELÍCULA */}
          <Route path="/pelicula/:id" element={<DetallesPelicula />} />

          {/* VISTA DE RESULTADOS DE BÚSQUEDA */}
          <Route path="/resultados" element={<ResultadosBusqueda />} />

          {/* Puedes agregar una ruta para "No encontrado" aquí */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;