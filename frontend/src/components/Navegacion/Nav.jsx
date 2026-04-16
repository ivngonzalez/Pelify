import React, { useState } from 'react';
import { Navbar, Nav, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import logo from '../../assets/logo-pelify.png';

const Navegacion = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/resultados-busqueda?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

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

        {/* Barra de búsqueda */}
        <div className="d-none d-lg-flex search-bar-container me-auto ms-3">
          <InputGroup className="nav-search-input-group">
            <FormControl
              placeholder="Buscar películas..."
              aria-label="Buscar películas"
              className="nav-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }
              }}
            />
            <Button variant="outline-secondary" className="nav-search-button" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </div>

        {/* Avatar para móviles */}
        <div className="d-flex align-items-center d-lg-none">
          <Link to="/perfil" className="nav-avatar me-2 text-decoration-none text-white">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Navbar.Toggle aria-controls="nav-contenido-principal" className="border-0 shadow-none" />
        </div>

        <Navbar.Collapse id="nav-contenido-principal">
          <Nav className="ms-auto align-items-center">
            {/* Barra de búsqueda pantallas pequeñas */}
            <div className="d-lg-none w-100 mb-3 mt-2">
              <InputGroup className="nav-search-input-group">
                <FormControl
                  placeholder="Buscar películas..."
                  aria-label="Buscar películas"
                  className="nav-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e);
                    }
                  }}
                />
                <Button variant="outline-secondary" className="nav-search-button" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
            </div>
            <Nav.Link as={Link} to="/" className="nav-enlace">Inicio</Nav.Link>
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