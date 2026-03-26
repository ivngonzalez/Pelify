import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-pelify">
      <Container fluid>
        <Row>
          <Col xs={12} lg={4} className="footer-col mb-4 mb-lg-0">
            <a href="/" className="footer-logo">Pelify</a>
            <p className="footer-tagline">
              Descubre y comparte tus películas favoritas.
            </p>
          </Col>

          <Col xs={6} lg={2} className="footer-col">
            <div className="footer-col-title">Navegación</div>
            <a href="/" className="footer-link">Inicio</a>
            <a href="#explorar" className="footer-link">Explorar</a>
            <a href="#mi-lista" className="footer-link">Mi lista</a>
          </Col>

          <Col xs={6} lg={2} className="footer-col">
            <div className="footer-col-title">Cuenta</div>
            <a href="#perfil" className="footer-link">Mi perfil</a>
            <a href="#historial" className="footer-link">Historial</a>
            <a href="#watchlist" className="footer-link">Watchlist</a>
          </Col>

          <Col xs={6} lg={2} className="footer-col">
            <div className="footer-col-title">Descubrir</div>
            <a href="#" className="footer-link">Próximamente</a>
            <a href="#" className="footer-link">Más populares</a>
            <a href="#" className="footer-link">Premios Óscar</a>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center footer-bottom">
          <span>© 2026 Pelify — Ismael Bardera, Iván González y Juan Esteban Noreña</span>
          <span>Datos por <span>TMDB API</span></span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;