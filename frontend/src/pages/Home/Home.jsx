import React, { useEffect, useState } from 'react';
import SeccionBienvenida from '../../components/SeccionBienvenida/SeccionBienvenida';
import BuscadorPeliculas from '../../components/BuscadorPeliculas/BuscadorPeliculas';
import TarjetasPelicula from '../../components/TarjetasPelicula/TarjetasPelicula';
import { 
  getPeliculasPopulares, 
  getProximosLanzamientos, 
  getTendenciasSemana,
  getMejorValoradas 
} from '../../services/tmdbService';

function Home() {
  const [peliculaDestacada, setPeliculaDestacada] = useState(null);

  useEffect(() => {
    getPeliculasPopulares().then(peliculas => {
      if (peliculas && peliculas.length > 0) {
        setPeliculaDestacada(peliculas[0]);
      }
    });
  }, []);

  return (
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
  );
}

export default Home;
