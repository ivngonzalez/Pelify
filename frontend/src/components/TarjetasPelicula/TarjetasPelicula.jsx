import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TMDB_IMG } from '../../services/tmdbService';
import './TarjetasPelicula.css';

const TarjetasPelicula = ({ titulo, fetchFunction, movies: initialMovies }) => {
  const [peliculas, setPeliculas] = useState(initialMovies || []);
  const [cargando, setCargando] = useState(!initialMovies && !!fetchFunction); 
  const scrollRef = useRef(null);

  useEffect(() => {
    let active = true; 

    if (fetchFunction && !initialMovies && peliculas.length === 0) {
      const fetchData = async () => {
        if (active) {
            setCargando(true);
        }
        try {
          const data = await fetchFunction();
          if (active) {
            setPeliculas(data);
          }
        } catch (err) {
          console.error("Error cargando peliculas:", err);
        } finally {
          if (active) {
            setCargando(false);
          }
        }
      };
      fetchData();
    }

    return () => {
      active = false; // Cleanup to prevent memory leaks and state updates on unmounted components
    };
  }, [fetchFunction, initialMovies, peliculas.length]);

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

  if (peliculas.length === 0) return null;

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
                <Link to={`/pelicula/${pelicula.id}`} className="tarjeta-link">
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
                </Link>
                <div className="tarjeta-info">
                  <Link to={`/pelicula/${pelicula.id}`} className="tarjeta-titulo-link">
                    <p className="tarjeta-titulo">{pelicula.title}</p>
                  </Link>
                  <p className="tarjeta-meta">
                    {pelicula.genre_ids && pelicula.genre_ids.length > 0 ? 'Cine' : '—'} · {pelicula.release_date?.slice(0, 4)}
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