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

function Home( { user }) {
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
        user={user}
      />
      <TarjetasPelicula 
        titulo="Próximos Lanzamientos" 
        fetchFunction={getProximosLanzamientos} 
        user={user}
      />
      <TarjetasPelicula 
        titulo="Tendencias de la Semana" 
        fetchFunction={getTendenciasSemana} 
        user={user}
      />
      <TarjetasPelicula 
        titulo="Mejor Valoradas" 
        fetchFunction={getMejorValoradas} 
        user={user}
      />
    </>
  );
}

export default Home;
