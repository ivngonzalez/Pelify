import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion/Nav';
import Footer from './components/Footer/Footer';
import SeccionBienvenida from './components/SeccionBienvenida/SeccionBienvenida';
import BuscadorPeliculas from './components/BuscadorPeliculas/BuscadorPeliculas';
import TarjetasPelicula from './components/TarjetasPelicula/TarjetasPelicula';
import Perfil from './components/Perfil/Perfil';
import Login from './components/Login/Login';
import Registro from './components/Registro/Registro';
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
      {/* La navegación se mantiene presente en todas las páginas */}
      <Navegacion />
      
      <main className="flex-grow-1">
        <Routes>
          {/* RUTA DE INICIO (HOME) */}
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