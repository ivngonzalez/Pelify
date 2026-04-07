import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion/Nav';
import Footer from './components/Footer/Footer';
import SeccionBienvenida from './components/SeccionBienvenida/SeccionBienvenida';
import BuscadorPeliculas from './components/BuscadorPeliculas/BuscadorPeliculas';
import TarjetasPelicula from './components/TarjetasPelicula/TarjetasPelicula';
import Perfil from './components/Perfil/Perfil';
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
      <main>
        <Routes>
          {/* RUTA INICIO: Todo el contenido de películas */}
          <Route path="/" element={
            <>
              <SeccionBienvenida pelicula={peliculaDestacada} />
              <BuscadorPeliculas />
              <TarjetasPelicula titulo="Peliculas Populares" fetchFunction={getPeliculasPopulares} />
              <TarjetasPelicula titulo="Próximos Lanzamientos" fetchFunction={getProximosLanzamientos} />
              <TarjetasPelicula titulo="Tendencias de la Semana" fetchFunction={getTendenciasSemana} />
              <TarjetasPelicula titulo="Mejor Valoradas" fetchFunction={getMejorValoradas} />
            </>
          } />

          {/* RUTA PERFIL: Solo el componente Perfil */}
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;