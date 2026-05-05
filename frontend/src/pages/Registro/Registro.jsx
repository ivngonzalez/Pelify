import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../Login/Login.css'; 

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault(); // Evita el refresco de página
  setError(''); // Limpia errores previos

  // VALIDACIONES MANUALES (Para que salgan en tu Alert rojo arriba)
  if (!nombre.trim()) {
    setError('El nombre de usuario es obligatorio.');
    return;
  }

  if (!email.trim()) {
    setError('El correo electrónico es obligatorio.');
    return;
  }

  if (!password) {
    setError('La contraseña es obligatoria.');
    return;
  }

  if (!confirmPassword) {
    setError('Debes confirmar la contraseña.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    setError('El correo electrónico debe de ser válido.');
    return;
  }

  if (password.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden.');
    return;
  }

  setCargando(true);
  try {
    await api.post('/auth/register', {
      username: nombre.trim(),
      email: email.trim(),
      password: password
    });
    navigate('/login', { state: { message: '¡Cuenta creada! Ya puedes entrar.' } });
  } catch (err) {
    const mensaje = err.response?.data || 'El correo o el usuario ya están en uso.';
    setError(mensaje);
  } finally {
    setCargando(false);
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

              {error && (
                <Alert variant="danger" className="py-2 small text-center">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Tu apodo o nombre" 
                    className="input-custom"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control 
                    placeholder="ejemplo@pelify.com" 
                    className="input-custom"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="********" 
                        className="input-custom"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Confirmar</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="********" 
                        className="input-custom"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button 
                  type="submit" 
                  className="btn-acento w-100 fw-bold mb-3 py-2"
                  disabled={cargando}
                >
                  {cargando ? 'Registrando...' : 'Registrarse'}
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