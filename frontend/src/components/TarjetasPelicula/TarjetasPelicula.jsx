import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TMDB_IMG } from '../../services/tmdbService';
import SelectorLista from './SelectorLista';
import './TarjetasPelicula.css';

const TarjetasPelicula = ({ titulo, fetchFunction, movies: initialMovies, user, ocultarBotonLista = false, onRemove }) => {
  const [peliculas, setPeliculas] = useState(initialMovies || []);
  const [cargando, setCargando] = useState(!initialMovies && !!fetchFunction);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialMovies) {
      setPeliculas(initialMovies);
    }
  }, [initialMovies]);

  useEffect(() => {
    let active = true;

    if (fetchFunction && !initialMovies && peliculas.length === 0) {
      const fetchData = async () => {
        if (active) setCargando(true);
        try {
          const data = await fetchFunction();
          if (active) setPeliculas(data);
        } catch (err) {
          console.error("Error cargando peliculas:", err);
        } finally {
          if (active) setCargando(false);
        }
      };
      fetchData();
    }

    return () => { active = false; };
  }, [fetchFunction, initialMovies, peliculas.length]);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAddToList = (e, pelicula) => {
    e.preventDefault();
    if (!user) {
      navigate('/perfil');
    } else {
      console.log("Añadiendo a la lista de:", user.username, pelicula.title);
      alert(`"${pelicula.title}" se añadirá a tu lista pronto.`);
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

          <button className="slider-control left" onClick={() => scroll('left')} aria-label="Desplazar">
            <ChevronLeft size={24} />
          </button>

          <div className="tarjetas-container-horizontal" ref={scrollRef}>
            {peliculas.map(pelicula => (
                <div key={pelicula.id} className="tarjeta-wrapper">
                  <div className="tarjeta">
                    <Link to={`/pelicula/${pelicula.id}`} className="tarjeta-link">
                      <div className="tarjeta-imagen">
                        {pelicula.poster_path ? (
                            <img
                                src={
                                  pelicula.poster_path.startsWith('http')
                                      ? pelicula.poster_path
                                      : `${TMDB_IMG.replace(/\/$/, '')}/${pelicula.poster_path.replace(/^\//, '')}`
                                }
                                alt={pelicula.title}
                                className="tarjeta-poster"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/500x750?text=Sin+Imagen';
                                }}
                            />
                        ) : (
                            <div className="tarjeta-sin-imagen" />
                        )}
                        <span className="tarjeta-score">
                      ★ {pelicula.vote_average?.toFixed(1) || '0.0'}
                    </span>
                      </div>
                    </Link>

                    <div className="tarjeta-info">
                      <Link to={`/pelicula/${pelicula.id}`} className="tarjeta-titulo-link">
                        <p className="tarjeta-titulo">{pelicula.title}</p>
                      </Link>
                      <p className="tarjeta-meta">
                        {pelicula.genre_ids?.length > 0 ? 'Cine' : 'Película'} · {pelicula.release_date?.slice(0, 4) || 's/f'}
                      </p>

                      {!ocultarBotonLista && (
                        user ? (
                          <SelectorLista pelicula={pelicula} />
                        ) : (
                          <button
                              className="tarjeta-boton"
                              onClick={(e) => handleAddToList(e, pelicula)}
                          >
                            + Mi lista
                          </button>
                        )
                      )}

                      {onRemove && (
                        <div className="d-flex justify-content-end mt-2">
                          <button 
                            className="boton-eliminar-peli" 
                            onClick={() => onRemove(pelicula.id)}
                            title="Eliminar de la lista"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            ))}
          </div>

          <button className="slider-control right" onClick={() => scroll('right')} aria-label="Desplazar">
            <ChevronRight size={24} />
          </button>
        </Container>
      </section>
  );
};

export default TarjetasPelicula;