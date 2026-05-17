import React, { useState } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import { Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import listaService from '../../services/listaService';

const SelectorLista = ({ pelicula, onSelect }) => {
    const [listas, setListas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const cargarListas = async () => {
        setCargando(true);
        try {
            const data = await listaService.obtenerListas();
            setListas(data);
        } catch (error) {
            console.error("Error al cargar listas:", error);
        } finally {
            setCargando(false);
        }
    };

    const handleAgregarALista = async (listaId) => {
        try {
            await listaService.agregarPelicula(listaId, pelicula);
            setMensaje(`¡Añadida!`);
            setTimeout(() => setMensaje(''), 3000);
            if (onSelect) onSelect();
        } catch (error) {
            console.error("Error al añadir película:", error);
            if (error.response?.data?.includes("ya está en esta lista")) {
                alert("Esta película ya está en la lista");
            } else {
                alert("Error al añadir la película a la lista");
            }
        }
    };

    const estaEnLista = (lista) => {
        return lista.peliculas.some(p => p.tmdbId === pelicula.id);
    };

    return (
        <Dropdown onToggle={(isOpen) => isOpen && cargarListas()}>
            <Dropdown.Toggle 
                as="button"
                className="tarjeta-boton"
                id={`dropdown-lista-${pelicula.id}`}
            >
                {mensaje || '+ Mi lista'}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" className="selector-lista-menu">
                {cargando ? (
                    <div className="text-center p-2">
                        <Spinner animation="border" size="sm" variant="light" />
                    </div>
                ) : listas.length === 0 ? (
                    <Dropdown.Item disabled>No tienes listas creadas</Dropdown.Item>
                ) : (
                    listas.map(lista => {
                        const yaAñadida = estaEnLista(lista);
                        return (
                            <Dropdown.Item 
                                key={lista.id} 
                                onClick={() => !yaAñadida && handleAgregarALista(lista.id, lista.nombre)}
                                className={yaAñadida ? "text-muted d-flex justify-content-between align-items-center" : "d-flex justify-content-between align-items-center"}
                                disabled={yaAñadida}
                            >
                                {lista.nombre}
                                {yaAñadida && <Check size={14} className="text-acento" />}
                            </Dropdown.Item>
                        );
                    })
                )}
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/mi-lista" className="text-acento d-flex align-items-center gap-2">
                    <Plus size={16} /> Gestionar listas
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SelectorLista;
