import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge, Modal, Spinner } from 'react-bootstrap';
import { getPeliculaDetalle, TMDB_IMG } from '../../services/tmdbService';
import './DetallesPelicula.css';
import './ModalStyles.css';
import { Play, Plus, ArrowLeft, Star, Clock, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DetallesPelicula = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pelicula, setPelicula] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const repartoScrollRef = useRef(null); // Ref for the reparto container

    const handleCloseTrailer = () => setShowTrailerModal(false);
    const handleShowTrailer = () => setShowTrailerModal(true);

    const scrollReparto = (direction) => {
        const { current } = repartoScrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -600 : 600; // Adjust scroll amount as needed
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchDetalle = async () => {
            try {
                setCargando(true);
                const data = await getPeliculaDetalle(id);
                setPelicula(data);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar el detalle de la película.");
            } finally {
                setCargando(false);
            }
        };
        fetchDetalle();
    }, [id]);

    // Componente interno para estados de carga/error que mantiene el Layout
    const RenderContent = () => {
        if (cargando) {
            return (
                <div className="status-container">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Cargando película...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="status-container">
                    <h2 className="text-danger">Error</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate(-1)} className="btn btn-outline-light">Volver</button>
                </div>
            );
        }

        if (!pelicula) return <div className="status-container">Película no encontrada.</div>;

        const generos = pelicula.genres || [];
        const directores = pelicula.credits?.crew?.filter(m => m.job === 'Director').map(d => d.name).join(', ') || 'N/A';
        const reparto = pelicula.credits?.cast || [];
        const trailerKey = pelicula.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key;
        const año = pelicula.release_date?.split('-')[0] || '';
        const duracion = pelicula.runtime ? `${pelicula.runtime} min.` : '';

        return (
            <>
                {/* BACKDROP DE FONDO */}
                {pelicula.backdrop_path && (
                    <div
                        className="backdrop-header"
                        style={{ backgroundImage: `url(${TMDB_IMG.replace('w500', 'original')}${pelicula.backdrop_path})` }}
                    />
                )}

                <div className="detalles-pelicula-content">
                    <button className="volver-link" onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} /> Volver
                    </button>

                    <div className="detalles-main-row">
                        {pelicula.poster_path && (
                            <img
                                src={`${TMDB_IMG}${pelicula.poster_path}`}
                                alt={pelicula.title}
                                className="detalles-poster"
                            />
                        )}

                        <div className="info-principal">
                            <h1 className="movie-title-main">{pelicula.title}</h1>

                            <div className="movie-meta-line">
                                {pelicula.vote_average > 0 && (
                                    <span className="rating">
                                        <Star size={15} fill="var(--acento)" style={{ marginRight: 4 }} />
                                        {pelicula.vote_average.toFixed(1)}
                                    </span>
                                )}
                                <span><Clock size={14} /> {duracion}</span>
                                <span><Calendar size={14} /> {año}</span>
                            </div>

                            <div className="genre-badges">
                                {generos.map(g => (
                                    <span key={g.id} className="genre-badge">{g.name}</span>
                                ))}
                            </div>

                            <p className="director-text"><strong>Director:</strong> {directores}</p>

                            <div className="sinopsis-section">
                                <h5>Sinopsis</h5>
                                <p>{pelicula.overview || 'Sin descripción disponible.'}</p>
                            </div>

                            <div className="action-buttons">
                                {trailerKey && (
                                    <button onClick={handleShowTrailer} className="btn-trailer-main">
                                        <Play size={15} fill="currentColor" /> VER TRÁILER
                                    </button>
                                )}
                                <button className="btn-mi-lista"><Plus size={15} /> MI LISTA</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN REPARTO */}
                {reparto.length > 0 && (
                    <div className="reparto-section">
                        <h4>Reparto Principal</h4>
                        <div className="slider-wrapper"> {/* Add wrapper for controls */}
                            <button
                                className="slider-control left"
                                onClick={() => scrollReparto('left')}
                                aria-label="Desplazar a la izquierda"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <div className="reparto-grid" ref={repartoScrollRef}>
                                {reparto.map(actor => (
                                    <div key={actor.id} className="actor-card">
                                        {actor.profile_path ? (
                                            <img src={`${TMDB_IMG}${actor.profile_path}`} alt={actor.name} className="actor-foto" />
                                        ) : (
                                            <div className="actor-initial-placeholder">
                                                <span className="initial-text">
                                                    {actor.name ? actor.name.charAt(0).toUpperCase() : ''}
                                                </span>
                                            </div>                                        )}
                                        <div className="actor-nombre">{actor.name}</div>
                                        <div className="actor-personaje">{actor.character}</div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="slider-control right"
                                onClick={() => scrollReparto('right')}
                                aria-label="Desplazar a la derecha"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                )}

                {/* MODAL TRÁILER */}
                <Modal show={showTrailerModal} onHide={handleCloseTrailer} size="lg" centered>
                    <Modal.Header closeButton className="bg-dark text-white border-0">
                        <Modal.Title>{pelicula.title} - Tráiler</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark p-0">
                        <iframe
                            width="100%"
                            height="450"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="YouTube Trailer"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </Modal.Body>
                </Modal>
            </>
        );
    };

    return (
        <div className="detalles-pelicula-page">
            <RenderContent />
        </div>
    );
};

export default DetallesPelicula;