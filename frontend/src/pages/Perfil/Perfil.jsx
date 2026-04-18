import React from 'react';
import './Perfil.css';

const Perfil = () => {
  const usuario = {
    nombre: "Esteban",
    email: "esteban@ejemplo.com",
    miembroDesde: "Enero 2024",
    favoritas: 12,
    vistas: 45
  };

  return (
    <div className="perfil-container container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Card Principal de Perfil */}
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

            {/* Estadísticas Rápidas */}
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
                <h4 className="fw-bold">España</h4>
                <p className="text-secondary small">Pais</p>
              </div>
            </div>

            {/* Información Detallada */}
            <div className="info-detalles mt-4">
              <h5 className="mb-3">Información de la cuenta</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Miembro desde:</span>
                <span className="text-acento">{usuario.miembroDesde}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Estado:</span>
                <span className="badge bg-success">Activo</span>
              </div>
              
              <button className="btn btn-outline-acento w-100">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;