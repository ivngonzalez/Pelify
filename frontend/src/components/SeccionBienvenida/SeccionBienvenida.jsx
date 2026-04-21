import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SeccionBienvenida.css';

const SeccionBienvenida = ({ pelicula }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const backdropUrl = pelicula?.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${pelicula.backdrop_path}`
    : null;

  const handleMoreInfoClick = () => {
    if (pelicula?.id) {
      navigate(`/pelicula/${pelicula.id}`);
    }
  };

  return (
    <section 
      className={`bienvenida-seccion ${backdropUrl ? 'con-fondo' : ''}`}
      style={backdropUrl ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${backdropUrl})` } : {}}
    >
      <Container>
        <Row className="justify-content-start text-start">
          <Col lg={8} xl={6}>
            <p className="bienvenida-tag">#1 Popular hoy</p>
            <h1 className="bienvenida-titulo">
              {pelicula ? pelicula.title : <>Bienvenido a <span className="marca-pelify">Pelify</span></>}
            </h1>
            <p className="bienvenida-subtitulo">
              {pelicula 
                ? pelicula.overview.slice(0, 180) + '...'
                : 'Descubre y comparte tus películas favoritas con la mayor comunidad de amantes del cine.'
              }
            </p>
            <div className="mt-4">
              <Button onClick={handleMoreInfoClick} variant="outline-light" className="bienvenida-boton-secundario">
                <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                Más información
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeccionBienvenida;