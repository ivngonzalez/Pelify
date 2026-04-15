import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './BuscadorPeliculas.css';

const BuscadorPeliculas = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    generos: [],
    duracionMax: '120',
    anioMin: '',
    anioMax: '',
    puntuacionMin: '6',
    votosMin: ''
  });

  const genreMap = {
    accion: '28',
    drama: '18',
    comedia: '35',
    terror: '27',
    scifi: '878',
    animacion: '16',
    romance: '10749',
    thriller: '53'
  };

  const genreOptions = [
    { value: 'accion', label: 'Acción' },
    { value: 'drama', label: 'Drama' },
    { value: 'comedia', label: 'Comedia' },
    { value: 'terror', label: 'Terror' },
    { value: 'scifi', label: 'Ciencia ficción' },
    { value: 'animacion', label: 'Animación' },
    { value: 'romance', label: 'Romance' },
    { value: 'thriller', label: 'Thriller' }
  ];

  const toggleGenero = (genero) => {
    setFiltros((prev) => ({
      ...prev,
      generos: prev.generos.includes(genero)
        ? prev.generos.filter((item) => item !== genero)
        : [...prev.generos, genero]
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBuscar = () => {
    const queryParams = new URLSearchParams();

    const generosSeleccionados = filtros.generos
      .filter((genero) => genreMap[genero])
      .map((genero) => genreMap[genero]);

    if (generosSeleccionados.length > 0) {
      queryParams.append('generos', generosSeleccionados.join(','));
    }

    if (filtros.duracionMax) {
      queryParams.append('duracionMax', filtros.duracionMax);
    }

    let anioMin = filtros.anioMin;
    let anioMax = filtros.anioMax;

    if (anioMin && anioMax && Number(anioMin) > Number(anioMax)) {
      [anioMin, anioMax] = [anioMax, anioMin];
    }

    if (anioMin) {
      queryParams.append('anioMin', anioMin);
    }

    if (anioMax) {
      queryParams.append('anioMax', anioMax);
    }

    if (filtros.puntuacionMin) {
      queryParams.append('puntuacionMin', filtros.puntuacionMin);
    }

    if (filtros.votosMin) {
      queryParams.append('votosMin', filtros.votosMin);
    }

    navigate(`/resultados-busqueda?${queryParams.toString()}`);
  };

  return (
    <section className="buscador-seccion">
      <Container>
        <div className="buscador-card">
          <h1 className="buscador-titulo">Encuentra tu próxima película</h1>
          <p className="buscador-subtitulo">
            Filtra por género, duración, año y puntuación para encontrar algo que encaje contigo.
          </p>

          <div className="mb-4">
            <label className="buscador-field-label">Género</label>
            <div className="buscador-generos-grid">
              {genreOptions.map((genre) => (
                <button
                  key={genre.value}
                  type="button"
                  className={`buscador-genero-chip ${
                    filtros.generos.includes(genre.value) ? 'activo' : ''
                  }`}
                  onClick={() => toggleGenero(genre.value)}
                  aria-pressed={filtros.generos.includes(genre.value)}
                >
                  {genre.label}
                </button>
              ))}
            </div>
          </div>

          <Row className="mb-4">
            <Col xs={12} md={6}>
              <label className="buscador-field-label">Año desde</label>
              <input
                type="number"
                name="anioMin"
                className="buscador-input" // Assuming a class for number inputs, adjust if needed
                value={filtros.anioMin}
                onChange={handleChange}
                min="1800" // Example min year
                max={new Date().getFullYear().toString()} // Max year is current year
                placeholder="Ej: 1990"
              />
            </Col>

            <Col xs={12} md={6}>
              <label className="buscador-field-label">Año hasta</label>
              <input
                type="number"
                name="anioMax"
                className="buscador-input" // Assuming a class for number inputs, adjust if needed
                value={filtros.anioMax}
                onChange={handleChange}
                min="1800" // Example min year
                max={new Date().getFullYear().toString()} // Max year is current year
                placeholder="Ej: 2023"
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <label className="buscador-field-label">
                Duración máxima ({filtros.duracionMax} min)
              </label>
              <div className="buscador-duracion-container">
                <input
                  type="range"
                  name="duracionMax"
                  className="buscador-slider"
                  min="75"
                  max="240"
                  step="5"
                  value={filtros.duracionMax}
                  onChange={handleChange}
                />
                <span className="buscador-duracion-valor">{filtros.duracionMax} min</span>
              </div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12} md={6}>
              <label className="buscador-field-label">
                Puntuación mínima ({Number(filtros.puntuacionMin).toFixed(1)})
              </label>
              <div className="buscador-puntuacion-container">
                <input
                  type="range"
                  name="puntuacionMin"
                  className="buscador-slider"
                  min="1"
                  max="10"
                  step="0.5"
                  value={filtros.puntuacionMin}
                  onChange={handleChange}
                />
                <span className="buscador-puntuacion-valor">
                  {Number(filtros.puntuacionMin).toFixed(1)}
                </span>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <label className="buscador-field-label">Votos mínimos</label>
              <select
                name="votosMin"
                className="buscador-select"
                value={filtros.votosMin}
                onChange={handleChange}
              >
                <option value="">Sin restricción</option>
                <option value="100">100+</option>
                <option value="500">500+</option>
                <option value="1000">1000+</option>
                <option value="5000">5000+</option>
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

