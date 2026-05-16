import React, { useState, useEffect } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import { Plus } from 'lucide-react';
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

    const handleAgregarALista = async (listaId, listaNombre) => {
        try {
            await listaService.agregarPelicula(listaId, pelicula);
            setMensaje(`¡Añadida!`);
            setTimeout(() => setMensaje(''), 3000);
            if (onSelect) onSelect();
        } catch (error) {
            console.error("Error al añadir película:", error);
            alert("Error al añadir la película a la lista");
        }
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
                    listas.map(lista => (
                        <Dropdown.Item 
                            key={lista.id} 
                            onClick={() => handleAgregarALista(lista.id, lista.nombre)}
                        >
                            {lista.nombre}
                        </Dropdown.Item>
                    ))
                )}
                <Dropdown.Divider />
                <Dropdown.Item href="/mi-lista" className="text-acento d-flex align-items-center gap-2">
                    <Plus size={16} /> Gestionar listas
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SelectorLista;
