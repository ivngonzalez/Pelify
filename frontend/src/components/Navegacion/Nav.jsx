import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import logo from '../../assets/logo-pelify.png';

const Navegacion = () => {
  return (
    <Navbar expand="lg" className="nav-pelify">
      <Container fluid>
        <Navbar.Brand href="/" className="logo-pelify d-flex align-items-center">
          {/* Añadimos la imagen aquí */}
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
          <div className="avatar-pelify me-2">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <Navbar.Toggle aria-controls="nav-pelify-content" className="border-0 shadow-none" />
        </div>

        <Navbar.Collapse id="nav-pelify-content">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/" className="enlace-nav">Inicio</Nav.Link>
            <Nav.Link href="#explorar" className="enlace-nav">Explorar</Nav.Link>
            <Nav.Link href="#mi-lista" className="enlace-nav">Mi lista</Nav.Link>

            <div className="avatar-pelify ms-lg-3 d-none d-lg-flex">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacion;