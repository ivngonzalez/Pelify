import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import logo from '../../assets/logo-pelify.png';

const Navegacion = () => {
  return (
    <Navbar expand="lg" className="nav-principal">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="nav-logo d-flex align-items-center">
          <img
            src={logo}
            alt="Pelify Logo"
            width="40"
            height="40"
            className="d-inline-block"
          />
          Pelify
        </Navbar.Brand>

        <div className="d-flex align-items-center d-lg-none">
          <Link to="/perfil" className="nav-avatar me-2 text-decoration-none text-white">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Navbar.Toggle aria-controls="nav-contenido-principal" className="border-0 shadow-none" />
        </div>

        <Navbar.Collapse id="nav-contenido-principal">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="nav-enlace">Inicio</Nav.Link>
            <Nav.Link href="#explorar" className="nav-enlace">Explorar</Nav.Link>
            <Nav.Link href="#mi-lista" className="nav-enlace">Mi lista</Nav.Link>

            <Link to="/perfil" className="nav-avatar ms-lg-3 d-none d-lg-flex text-decoration-none text-white">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacion;