import React, { useState } from 'react';
import { Navbar, Nav, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import logo from '../../assets/logo-pelify.png';

const Navegacion = ({ user }) => {
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
          <img src={logo} alt="Pelify Logo" width="40" height="40" className="d-inline-block" />
          Pelify
        </Navbar.Brand>

        <div className="d-none d-lg-flex search-bar-container me-auto ms-3">
          <InputGroup className="nav-search-input-group">
            <FormControl
              placeholder="Buscar películas..."
              className="nav-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <Button variant="outline-secondary" className="nav-search-button" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </div>

        {/* --- AVATAR MÓVIL --- */}
        <div className="d-flex align-items-center d-lg-none">
          <Link to={user ? "/perfil" : "/login"} className="nav-avatar me-2 text-decoration-none text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: user ? '#e50914' : '#333' }}>
            {user ? (
                <span className="fw-bold">{user.username?.charAt(0).toUpperCase()}</span>
            ) : (
                <FontAwesomeIcon icon={faUser} />
            )}
          </Link>
          <Navbar.Toggle aria-controls="nav-contenido-principal" className="border-0 shadow-none" />
        </div>

        <Navbar.Collapse id="nav-contenido-principal">
          <Nav className="ms-auto align-items-center">
            {/* Buscador móvil... (lo dejamos igual) */}
            <div className="d-lg-none w-100 mb-3 mt-2">
              <InputGroup className="nav-search-input-group">
                <FormControl
                  placeholder="Buscar películas..."
                  className="nav-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                />
                <Button variant="outline-secondary" className="nav-search-button" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
            </div>
            
            <Nav.Link as={Link} to="/" className="nav-enlace">Inicio</Nav.Link>
            <Nav.Link as={Link} to={user ? "/mi-lista" : "/login"} className="nav-enlace">Mi lista</Nav.Link>

            {/* --- AVATAR ESCRITORIO --- */}
            <Link 
              to={user ? "/perfil" : "/login"} 
              className="nav-avatar ms-lg-3 d-none d-lg-flex text-decoration-none text-white align-items-center justify-content-center"
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: user ? '#e50914' : '#333', // Rojo si está logueado, gris si no
                fontSize: '1.1rem'
              }}
            >
              {user ? (
                // Si está logueado, inicial en mayúscula
                <span className="fw-bold">{user.username?.charAt(0).toUpperCase()}</span>
              ) : (
                // Si no, icono de usuario normal
                <FontAwesomeIcon icon={faUser} />
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacion;