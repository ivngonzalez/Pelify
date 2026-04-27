import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email, password);
    // Aquí irá tu lógica de conexión con el backend más adelante
  };

  return (
    <Container className="login-container d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={5} lg={4}>
          <Card className="login-card p-4 shadow-lg border-0">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="text-acento fw-bold">Pelify</h2>
                <p className="text-secondary">Inicia sesión para continuar</p>
              </div>

              <Form onSubmit={handleSubmit}>
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

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="********" 
                    className="input-custom"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="acento" type="submit" className="w-100 fw-bold mb-3 py-2">
                  Entrar
                </Button>
              </Form>

              <div className="text-center mt-3">
                <span className="small text-secondary">¿No tienes cuenta? </span>
                <Link to="/registro" className="text-acento small text-decoration-none">Regístrate</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;