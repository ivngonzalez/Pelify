import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'; 
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api'; 
import './Login.css';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('El correo electrónico es obligatorio.');
      return;
    }

    if (!password) {
      setError('La contraseña es obligatoria.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Íntroduce un correo electrónico válido.');
      return;
    }

    setCargando(true);

    try {
        const response = await api.post('/auth/login', { 
            email: email.trim(), 
            password: password 
        });

        if (response.data === "Login exitoso") {
            const userResponse = await api.get('/auth/me'); 
            setUser(userResponse.data); 
            navigate('/perfil'); 
        }
    } catch (err) {
        if (err.response?.status === 401) {
            setError('Credenciales incorrectas. Revisa tu correo y contraseña.');
        } else {
            setError('Hubo un problema al conectar con el servidor.');
        }
        console.error("Login fallido", err);
    } finally {
        setCargando(false); 
    }
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

              {error && (
                <Alert variant="danger" className="py-2 small text-center">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleLogin} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="ejemplo@pelify.com" 
                    className="input-custom"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="********" 
                    className="input-custom"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="btn-acento w-100 fw-bold mb-3 py-2"
                  disabled={cargando}
                >
                  {cargando ? 'Iniciando sesión...' : 'Entrar'}
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