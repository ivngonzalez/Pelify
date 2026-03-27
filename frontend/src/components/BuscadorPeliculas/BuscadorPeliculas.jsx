import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './BuscadorPeliculas.css';

const BuscadorPeliculas = () => {
  const [filtros, setFiltros] = useState({
    genero: '',
    duracion: '',
    anio: ''
  });

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = () => {
    console.log('Filtros seleccionados:', filtros);
    // aquí llamarás a tu service cuando conectes el backend
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