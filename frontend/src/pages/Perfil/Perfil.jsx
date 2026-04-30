import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './Perfil.css';

// Cambiamos el nombre a 'user' para que coincida con lo que envías desde App.jsx
const Perfil = ({ user, setUser }) => { 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  // --- SOLUCIÓN AL ERROR ---
  // Si 'user' es null o undefined, mostramos un mensaje de carga en lugar de romper la app
  if (!user) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando perfil o sesión no iniciada...</p>
      </div>
    );
  }

  return (
    <div className="perfil-container container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card-perfil p-4 shadow-lg">
            <div className="d-flex align-items-center mb-4">
              <div className="avatar-placeholder me-4">
                {/* Usamos el nombre que venga del backend (username o nombre) */}
                {(user.username || user.nombre || "U").charAt(0)}
              </div>
              <div>
                <h2 className="text-acento mb-0">{user.username || user.nombre}</h2>
                <p className="text-secondary">{user.email}</p>
              </div>
            </div>

            <hr className="border-secondary" />

            <div className="row text-center my-4">
              <div className="col-4">
                {/* Añadimos || 0 para que no falle si el campo no existe aún */}
                <h4 className="fw-bold">{user.favoritas || 0}</h4>
                <p className="text-secondary small">Favoritas</p>
              </div>
              <div className="col-4 border-start border-end border-secondary">
                <h4 className="fw-bold">{user.vistas || 0}</h4>
                <p className="text-secondary small">Vistas</p>
              </div>
              <div className="col-4">
                <h4 className="fw-bold">Gold</h4>
                <p className="text-secondary small">Nivel</p>
              </div>
            </div>

            <div className="info-detalles mt-4">
              <h5 className="mb-3">Información de la cuenta</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Miembro desde:</span>
                <span className="text-acento">{user.miembroDesde || 'Reciente'}</span>
              </div>
              
              <div className="d-flex flex-column gap-2 mt-4">
                <button className="btn btn-outline-acento w-100">
                  Editar Perfil
                </button>
                
                <button 
                  className="btn btn-danger w-100" 
                  onClick={handleLogout}
                  style={{ backgroundColor: '#dc3545', border: 'none' }}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;