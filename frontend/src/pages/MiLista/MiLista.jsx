import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';
import { Bookmark, Plus, Trash2 } from 'lucide-react';
import TarjetasPelicula from '../../components/TarjetasPelicula/TarjetasPelicula';
import listaService from '../../services/listaService';
import './MiLista.css';

const MiLista = ({ user }) => {
    const [listas, setListas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [nombreNuevaLista, setNombreNuevaLista] = useState('');

    useEffect(() => {
        cargarListas();
    }, []);

    const cargarListas = async () => {
        try {
            const data = await listaService.obtenerListas();
            setListas(data);
        } catch (error) {
            console.error("Error al cargar las listas:", error);
        } finally {
            setCargando(false);
        }
    };

    const handleCrearLista = async (e) => {
        e.preventDefault();
        if (!nombreNuevaLista.trim()) return;
        try {
            await listaService.crearLista(nombreNuevaLista);
            setNombreNuevaLista('');
            setShowModal(false);
            cargarListas();
        } catch (error) {
            console.error("Error al crear lista:", error);
        }
    };

    const handleEliminarLista = async (listaId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta lista entera?")) {
            try {
                await listaService.eliminarLista(listaId);
                cargarListas();
            } catch (error) {
                console.error("Error al eliminar lista:", error);
            }
        }
    };

    const handleEliminarPelicula = async (listaId, peliculaId) => {
        try {
            await listaService.eliminarPelicula(listaId, peliculaId);
            setListas(prevListas => 
                prevListas.map(lista => {
                    if (lista.id === listaId) {
                        return {
                            ...lista,
                            peliculas: lista.peliculas.filter(p => p.tmdbId !== peliculaId)
                        };
                    }
                    return lista;
                })
            );
        } catch (error) {
            console.error("Error al eliminar película de la lista:", error);
            alert("No se pudo eliminar la película. Inténtalo de nuevo.");
        }
    };

    const adaptarPeliculas = (peliculas) => {
        return peliculas.map(p => ({
            id: p.tmdbId,
            title: p.titulo,
            poster_path: p.rutaPoster,
            vote_average: p.voteAverage || 0,
            release_date: p.releaseDate || ''
        }));
    };

    if (cargando) return <div className="text-center mt-5 text-white">Cargando tus listas...</div>;

    return (
        <div className="mi-lista-page">
            <Container className="my-4">
                <div className="mi-lista-header d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center">
                        <Bookmark size={35} className="text-acento" />
                        <h1 className="ms-3 text-white mb-0 h2">Mis Listas</h1>
                    </div>
                    <Button 
                        variant="secondary" 
                        className="d-flex align-items-center gap-2"
                        onClick={() => setShowModal(true)}
                    >
                        <Plus size={20} /> Nueva Lista
                    </Button>
                </div>

                {listas.length === 0 ? (
                    <div className="text-center text-muted my-5 py-5">
                        <p className="h5">Aún no tienes listas.</p>
                    </div>
                ) : (
                    <div className="listas-contenedor">
                        {listas.map((lista) => (
                            <div key={lista.id} className="mb-5 pb-3">
                                <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                                    <h2 className="text-white h4 mb-0">{lista.nombre} <span className="text-muted h6 ms-2">({lista.peliculas.length})</span></h2>
                                    {!lista.esPredeterminada && (
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            onClick={() => handleEliminarLista(lista.id)}
                                            className="d-flex align-items-center gap-1 opacity-75"
                                            style={{ fontSize: '0.75rem' }}
                                        >
                                            <Trash2 size={14} /> Eliminar Lista
                                        </Button>
                                    )}
                                </div>
                                
                                {lista.peliculas.length > 0 ? (
                                    <TarjetasPelicula 
                                        movies={adaptarPeliculas(lista.peliculas)}
                                        ocultarBotonLista={true}
                                        onRemove={(peliculaId) => handleEliminarPelicula(lista.id, peliculaId)}
                                    />
                                ) : (
                                    <div className="px-2">
                                        <p className="text-muted small py-4 border border-secondary border-dashed text-center rounded">
                                            Esta lista está vacía.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </Container>

            {/* Modal para crear lista */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="modal-pelify">
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Lista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCrearLista}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la lista</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={nombreNuevaLista}
                                onChange={(e) => setNombreNuevaLista(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-light" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                            <Button variant="secondary" type="submit">
                                Crear Lista
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MiLista;
