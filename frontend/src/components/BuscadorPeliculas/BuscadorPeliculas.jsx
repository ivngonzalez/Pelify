import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './BuscadorPeliculas.css';

const BuscadorPeliculas = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    genero: '',
    duracion: '',
    anio: ''
  });

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = () => {
    const queryParams = new URLSearchParams();

    // Mapping for genre
    const genreMap = {
      'accion': '28',
      'drama': '18',
      'comedia': '35',
      'terror': '27',
      'scifi': '878',
      'animacion': '16'
    };
    if (filtros.genero && genreMap[filtros.genero]) {
      queryParams.append('generos', genreMap[filtros.genero]);
    }

    // Mapping for duration
    if (filtros.duracion === 'corta') {
      queryParams.append('duracionMax', '89'); // Less than 90 min
    } else if (filtros.duracion === 'media') {
      queryParams.append('duracionMax', '120'); // Up to 120 min (to filter out longer ones)
    }
    // 'larga' is ignored as ResultadosBusqueda only uses duracionMax

    // Mapping for year
    if (filtros.anio === '2024-2025') {
      queryParams.append('anioMin', '2024');
      queryParams.append('anioMax', '2025');
    } else if (filtros.anio === '2010-2023') {
      queryParams.append('anioMin', '2010');
      queryParams.append('anioMax', '2023');
    } else if (filtros.anio === '2000-2009') {
      queryParams.append('anioMin', '2000');
      queryParams.append('anioMax', '2009');
    } else if (filtros.anio === 'clasicos') {
      queryParams.append('anioMax', '1999'); // Assuming classics are before 2000
    }

    navigate(`/resultados?${queryParams.toString()}`);
  };

  return (
    <section className="buscador-seccion">
      <Container>
        <p className="buscador-label">Recomendador</p>
        <div className="buscador-card">
          <h2 className="buscador-titulo">¿Qué quieres ver hoy?</h2>
          <Row className="mb-3">
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <label className="buscador-field-label">Género</label>
                <select
                    name="genero"
                    className="buscador-select"
                    onChange={handleChange}
                    value={filtros.genero}
                >
                <option value="">Todos</option>
                <option value="accion">Acción</option>
                <option value="drama">Drama</option>
                <option value="comedia">Comedia</option>
                <option value="terror">Terror</option>
                <option value="scifi">Ciencia ficción</option>
                <option value="animacion">Animación</option>
                </select>
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
                <label className="buscador-field-label">Duración</label>
                <select
                    name="duracion"
                    className="buscador-select"
                    onChange={handleChange}
                    value={filtros.duracion}
                >
                <option value="">Cualquiera</option>
                <option value="corta">Menos de 90 min</option>
                <option value="media">90 – 120 min</option>
                <option value="larga">Más de 120 min</option>
                </select>
            </Col>
            <Col xs={12} md={4}>
                <label className="buscador-field-label">Año</label>
                <select
                    name="anio"
                    className="buscador-select"
                    onChange={handleChange}
                    value={filtros.anio}
                >
                <option value="">Todos</option>
                <option value="2024-2025">2024 – 2025</option>
                <option value="2010-2023">2010 – 2023</option>
                <option value="2000-2009">2000 – 2009</option>
                <option value="clasicos">Clásicos</option>
                </select>
            </Col>
            </Row>
            <Button className="buscador-boton" onClick={handleBuscar}>
            Buscar recomendaciones
            </Button>
        </div>
        </Container>
    </section>
    );
};

export default BuscadorPeliculas;