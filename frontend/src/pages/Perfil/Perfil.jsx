import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos el hook para navegar
import './Perfil.css';

const Perfil = () => {
  const navigate = useNavigate(); // Inicializamos la función de navegación

  // Datos de ejemplo
  const usuario = {
    nombre: "Esteban",
    email: "esteban@ejemplo.com",
    miembroDesde: "Enero 2024",
    favoritas: 12,
    vistas: 45
  };

  const handleLogout = () => {
    // Aquí más adelante borrarás el Token o la sesión del LocalStorage
    console.log("Cerrando sesión...");
    
    // Redirigir al Login
    navigate('/login');
  };

  return (
    <div className="perfil-container container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card-perfil p-4 shadow-lg">
            <div className="d-flex align-items-center mb-4">
              <div className="avatar-placeholder me-4">
                {usuario.nombre.charAt(0)}
              </div>
              <div>
                <h2 className="text-acento mb-0">{usuario.nombre}</h2>
                <p className="text-secondary">{usuario.email}</p>
              </div>
            </div>

            <hr className="border-secondary" />

            <div className="row text-center my-4">
              <div className="col-4">
                <h4 className="fw-bold">{usuario.favoritas}</h4>
                <p className="text-secondary small">Favoritas</p>
              </div>
              <div className="col-4 border-start border-end border-secondary">
                <h4 className="fw-bold">{usuario.vistas}</h4>
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
                <span className="text-acento">{usuario.miembroDesde}</span>
              </div>
              
              <div className="d-flex flex-column gap-2 mt-4">
                <button className="btn btn-outline-acento w-100">
                  Editar Perfil
                </button>
                
                {/* BOTÓN DE CERRAR SESIÓN */}
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