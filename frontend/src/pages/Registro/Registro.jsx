import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css'; 

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
  }

  try {
    // IMPORTANTE: Usa los nombres de las variables de tu clase Java
    await api.post('/auth/register', {
      username: nombre,  // Mapea a 'private String username' en Java
      password: password, // Mapea a 'private String password' en Java
      email: email        // Mapea a 'private String email' en Java
    });

    alert('¡Usuario registrado con éxito!');
    navigate('/login');
    
  } catch (err) {
    // Si el backend devuelve un string, lo mostramos; si no, un error genérico
    const mensaje = typeof err.response?.data === 'string' 
      ? err.response.data 
      : 'Error al registrar el usuario';
    setError(mensaje);
  }
};

  return (
    <Container className="login-container d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="login-card p-4 shadow-lg border-0 my-5">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="text-acento fw-bold">Pelify</h2>
                <p className="text-secondary">Crea tu cuenta gratis</p>
              </div>

              {error && <div className="alert alert-danger p-2 small">{error}</div>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicNombre">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Esteban Pérez" 
                    className="input-custom"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="ejemplo@pelify.com" 
                    className="input-custom"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="********" 
                        className="input-custom"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6} // Mínimo de caracteres
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                      <Form.Label>Confirmar Contraseña</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="********" 
                        className="input-custom"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="acento" type="submit" className="w-100 fw-bold mb-3 py-2 btn-acento">
                  Registrarse
                </Button>
              </Form>

              <div className="text-center mt-3">
                <span className="small text-secondary">¿Ya tienes cuenta? </span>
                <Link to="/login" className="text-acento small text-decoration-none">Inicia sesión</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;