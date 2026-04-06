import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TMDB_IMG } from '../../services/tmdbService';
import './TarjetasPelicula.css';

const TarjetasPelicula = ({ titulo, fetchFunction }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (fetchFunction) {
      fetchFunction()
        .then(data => setPeliculas(data))
        .catch(err => console.error("Error cargando peliculas:", err))
        .finally(() => setCargando(false));
    }
  }, [fetchFunction]);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (cargando) return (
    <section className="tarjetas-seccion">
      <Container fluid>
        <p className="tarjetas-label">{titulo || 'Sugerencias para ti'}</p>
        <p className="tarjetas-cargando">Cargando películas...</p>
      </Container>
    </section>
  );

  return (
    <section className="tarjetas-seccion">
      <Container fluid className="position-relative slider-wrapper">
        <p className="tarjetas-label">{titulo}</p>
        
        <button 
          className="slider-control left" 
          onClick={() => scroll('left')}
          aria-label="Desplazar a la izquierda"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="tarjetas-container-horizontal" ref={scrollRef}>
          {peliculas.map(pelicula => (
            <div key={pelicula.id} className="tarjeta-wrapper">
              <div className="tarjeta">
                <div className="tarjeta-imagen">
                  {pelicula.poster_path
                    ? <img
                        src={`${TMDB_IMG}${pelicula.poster_path}`}
                        alt={pelicula.title}
                        className="tarjeta-poster"
                      />
                    : <div className="tarjeta-sin-imagen" />
                  }
                  <span className="tarjeta-score">
                    ★ {pelicula.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="tarjeta-info">
                  <p className="tarjeta-titulo">{pelicula.title}</p>
                  <p className="tarjeta-meta">
                    {pelicula.genre_ids[0] ? 'Cine' : '—'} · {pelicula.release_date?.slice(0, 4)}
                  </p>
                  <button className="tarjeta-boton">+ Mi lista</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="slider-control right" 
          onClick={() => scroll('right')}
          aria-label="Desplazar a la derecha"
        >
          <ChevronRight size={24} />
        </button>
      </Container>
    </section>
  );
};

export default TarjetasPelicula;