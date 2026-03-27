import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TMDB_IMG } from '../../services/tmdbService';
import './TarjetasPelicula.css';

const TarjetasPelicula = ({ titulo, fetchFunction }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (fetchFunction) {
      fetchFunction()
        .then(data => setPeliculas(data))
        .catch(err => console.error("Error cargando peliculas:", err))
        .finally(() => setCargando(false));
    }
  }, [fetchFunction]);

  if (cargando) return (
    <section className="tarjetas-seccion">
      <Container>
        <p className="tarjetas-label">{titulo || 'Sugerencias para ti'}</p>
        <p className="tarjetas-cargando">Cargando películas...</p>
      </Container>
    </section>
  );

  return (
    <section className="tarjetas-seccion">
      <Container>
        <p className="tarjetas-label">{titulo}</p>
        <Row>
          {peliculas.map(pelicula => (
            <Col key={pelicula.id} xs={12} sm={6} lg={3} className="mb-3">
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
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TarjetasPelicula;