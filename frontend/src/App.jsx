import React, { useEffect, useState } from 'react';
import Navegacion from './components/Navegacion/Nav';
import Footer from './components/Footer/Footer';
import SeccionBienvenida from './components/SeccionBienvenida/SeccionBienvenida';
import BuscadorPeliculas from './components/BuscadorPeliculas/BuscadorPeliculas';
import TarjetasPelicula from './components/TarjetasPelicula/TarjetasPelicula';
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
        <SeccionBienvenida pelicula={peliculaDestacada} />
        <BuscadorPeliculas />
        
        {/* Secciones de Películas */}
        <TarjetasPelicula 
          titulo="Peliculas Populares" 
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
      </main>
      <Footer />
    </div>
  );
}

export default App;