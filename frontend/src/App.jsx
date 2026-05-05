import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import api from './api';
import Navegacion from './components/Navegacion/Nav';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home'; 
import Perfil from './pages/Perfil/Perfil';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import DetallesPelicula from './pages/DetallesPelicula/DetallesPelicula';
import ResultadosBusqueda from './pages/ResultadosBusqueda/ResultadosBusqueda'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = setTimeout(() => {
      api.get('/auth/me')
        .then(res => {
          if (res.status === 200) {
            setUser(res.data);
          } else {
            setUser(null);
          }
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    }, 100);

    return () => clearTimeout(checkAuth); 
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando Pelify...</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* La navegación se mantiene presente en todas las páginas */}
      <Navegacion user={user}/>

      <main className="flex-grow-1">
        <Routes>
          {/* VISTA DE INICIO */}
          <Route path="/" element={<Home user={user} />} />

          {/* VISTA DE DETALLE DE PELÍCULA */}
          <Route path="/pelicula/:id" element={<DetallesPelicula />} />

          {/* VISTA DE RESULTADOS DE BÚSQUEDA */}
          <Route path="/resultados-busqueda" element={<ResultadosBusqueda />} />

          {/* RUTA DE PERFIL DE USUARIO */}
          <Route 
            path="/perfil" 
            element={user ? <Perfil user={user} setUser={setUser} /> : <Navigate to="/login" />} 
          />

          {/* RUTA DE INICIO DE SESIÓN */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* RUTA DE REGISTRO DE NUEVO USUARIO */}
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>

      {/* El footer se mantiene presente en todas las páginas */}
      <Footer />
    </div>
  );
}

export default App;