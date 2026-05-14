import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TMDB_IMG } from '../../services/tmdbService';
import './TarjetasPelicula.css';

const TarjetasPelicula = ({ titulo, fetchFunction, movies: initialMovies, ocultarBotonLista = false }) => {
  const [peliculas, setPeliculas] = useState(initialMovies || []);
  const [cargando, setCargando] = useState(!initialMovies && !!fetchFunction);
  const scrollRef = useRef(null);

  // --- NUEVA FUNCIÓN PARA AÑADIR A FAVORITOS ---
  const agregarAMiLista = async (pelicula) => {
    try {
      // Nota: Enviamos el objeto película completo o el ID según pida tu Backend
      // Usamos credentials: 'include' para enviar la cookie JSESSIONID de Java
      const response = await fetch(`http://localhost:8080/api/favoritos/agregar/${pelicula.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' 
      });

      if (response.ok) {
        alert(`"${pelicula.title}" se añadió a tu lista`);
      } else if (response.status === 401) {
        alert("Debes iniciar sesión para guardar favoritos");
      } else {
        alert("Error al añadir a la lista");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("No se pudo conectar con el servidor");
    }
  };

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

        <button className="slider-control left" onClick={() => scroll('left')} aria-label="Desplazar a la izquierda">
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
                          src={pelicula.poster_path.startsWith('http') 
                            ? pelicula.poster_path 
                            : `${TMDB_IMG.replace(/\/$/, '')}/${pelicula.poster_path.replace(/^\//, '')}`}
                          alt={pelicula.title}
                          className="tarjeta-poster"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                          }}
                        />
                      : <div className="tarjeta-sin-imagen"/>
                    }
                    <span className="tarjeta-score">★ {pelicula.vote_average?.toFixed(1) || '0.0'}</span>
                  </div>
                </Link>
                <div className="tarjeta-info">
                  <Link to={`/pelicula/${pelicula.id}`} className="tarjeta-titulo-link">
                    <p className="tarjeta-titulo">{pelicula.title}</p>
                  </Link>
                  <p className="tarjeta-meta">
                    {pelicula.genre_ids && pelicula.genre_ids.length > 0 ? 'Cine' : 'Película'} · {pelicula.release_date?.slice(0, 4)}
                  </p>

                  {!ocultarBotonLista && (
                    <button 
                      className="tarjeta-boton"
                      onClick={() => agregarAMiLista(pelicula)} // LLAMADA A LA FUNCIÓN
                    >
                      + Mi lista
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-control right" onClick={() => scroll('right')} aria-label="Desplazar a la derecha">
          <ChevronRight size={24} />
        </button>
      </Container>
    </section>
  );
};

export default TarjetasPelicula;