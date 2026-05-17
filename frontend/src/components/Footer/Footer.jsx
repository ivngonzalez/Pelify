import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-principal">
      <Container fluid>
        <Row>
          <Col xs={12} lg={4} className="footer-columna mb-4 mb-lg-0">
            <Link to="/" className="footer-logo">Pelify</Link>
            <p className="footer-eslogan">
              Descubre y comparte tus películas favoritas.
            </p>
          </Col>

          <Col xs={6} lg={2} className="footer-columna">
            <div className="footer-titulo-seccion">Navegación</div>
            <Link to="/" className="footer-enlace">Inicio</Link>
            <Link to="/mi-lista" className="footer-enlace">Mi lista</Link>
          </Col>

          <Col xs={6} lg={2} className="footer-columna">
            <div className="footer-titulo-seccion">Cuenta</div>
            <Link to="/perfil" className="footer-enlace">Mi perfil</Link>
            <Link to="/mi-lista" className="footer-enlace">Watchlist</Link>
          </Col>

          <Col xs={6} lg={2} className="footer-columna">
            <div className="footer-titulo-seccion">Descubrir</div>
            <a href="#" className="footer-enlace">Próximamente</a>
            <a href="#" className="footer-enlace">Más populares</a>
            <a href="#" className="footer-enlace">Premios Óscar</a>
          </Col>
        </Row>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center footer-inferior">
          <span>© 2026 Pelify — Ismael Bardera, Iván González y Juan Esteban Noreña</span>
          <p className="mb-0">Datos por <span className="footer-marca-api">TMDB API</span></p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;