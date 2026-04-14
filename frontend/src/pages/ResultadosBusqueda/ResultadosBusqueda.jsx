import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies } from '../../services/tmdbService';
import TarjetasPelicula from '../../components/TarjetasPelicula/TarjetasPelicula';
import { Container, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';

import './ResultadosBusqueda.css';

const ResultadosBusqueda = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Resultados de Búsqueda");
    const location = useLocation();
    const navigate = useNavigate();

    const genreDisplayMap = {
        '28': 'Acción',
        '18': 'Drama',
        '35': 'Comedia',
        '27': 'Terror',
        '878': 'Ciencia ficción',
        '16': 'Animación',
        '10749': 'Romance',
        '53': 'Thriller',
        '12': 'Aventura',
        '14': 'Fantasía'
    };

    const idiomesDisplayMap = {
        'es': 'Español',
        'en': 'Inglés',
        'fr': 'Francés',
        'de': 'Alemán',
        'it': 'Italiano',
        'pt': 'Portugués',
        'ja': 'Japonés',
        'ko': 'Coreano'
    };

    const plataformasDisplayMap = {
        '8': 'Netflix',
        '3': 'HBO',
        '37': 'Disney+',
        '119': 'Amazon Prime',
        '40': 'Apple TV'
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            const queryParams = new URLSearchParams(location.search);
            const searchTerm = queryParams.get('query');
            const filtros = {
                generos: (queryParams.get('generos') || '').split(',').filter(Boolean),
                anioMin: queryParams.get('anioMin') || '',
                anioMax: queryParams.get('anioMax') || '',
                duracionMax: queryParams.get('duracionMax') || '',
                puntuacionMin: queryParams.get('puntuacionMin') || '',
                votosMin: queryParams.get('votosMin') || '',
                idiomaOriginal: queryParams.get('idiomaOriginal') || '',
                plataforma: queryParams.get('plataforma') || '',
                incluirAdultos: queryParams.get('incluirAdultos') === 'true'
            };

            let pageTitle = "Resultados de Búsqueda";
            if (searchTerm) {
                pageTitle = `Resultados para: "${searchTerm}"`;
            } else if (
                filtros.generos.length > 0 ||
                filtros.anioMin ||
                filtros.anioMax ||
                filtros.duracionMax ||
                filtros.puntuacionMin ||
                filtros.idiomaOriginal
            ) {
                pageTitle = "Recomendaciones para ti";
            } else {
                pageTitle = "Todas las Películas";
            }
            setTitle(pageTitle);

            const results = await searchMovies(searchTerm || filtros);
            setMovies(results);
            setLoading(false);
        };

        fetchSearchResults();
    }, [location.search]);

    // Construct active filters for display
    const queryParams = new URLSearchParams(location.search);
    const activeFilters = [];

    // Géneros
    const currentGeneros = (queryParams.get('generos') || '').split(',').filter(Boolean);
    if (currentGeneros.length > 0) {
        currentGeneros.forEach(genreId => {
            if (genreDisplayMap[genreId]) {
                activeFilters.push(genreDisplayMap[genreId]);
            }
        });
    }

    // Duración
    const currentDuracionMax = queryParams.get('duracionMax');
    if (currentDuracionMax) {
        activeFilters.push(`Duración: hasta ${currentDuracionMax} min`);
    }

    // Años
    const currentAnioMin = queryParams.get('anioMin');
    const currentAnioMax = queryParams.get('anioMax');

    if (currentAnioMin && currentAnioMax) {
        activeFilters.push(`${currentAnioMin}-${currentAnioMax}`);
    } else if (currentAnioMin) {
        activeFilters.push(`Desde ${currentAnioMin}`);
    } else if (currentAnioMax) {
        activeFilters.push(`Hasta ${currentAnioMax}`);
    }

    // Puntuación
    const currentPuntuacionMin = queryParams.get('puntuacionMin');
    if (currentPuntuacionMin && currentPuntuacionMin !== '1') {
        activeFilters.push(`Puntuación: ${currentPuntuacionMin}+`);
    }

    // Votos
    const currentVotosMin = queryParams.get('votosMin');
    if (currentVotosMin) {
        const votosLabel = {
            '100': '100+ votos',
            '500': '500+ votos',
            '1000': '1000+ votos',
            '5000': '5000+ votos'
        };
        if (votosLabel[currentVotosMin]) {
            activeFilters.push(votosLabel[currentVotosMin]);
        }
    }

    // Idioma
    const currentIdiomaOriginal = queryParams.get('idiomaOriginal');
    if (currentIdiomaOriginal && idiomesDisplayMap[currentIdiomaOriginal]) {
        activeFilters.push(`Idioma: ${idiomesDisplayMap[currentIdiomaOriginal]}`);
    }

    // Plataforma
    const currentPlataforma = queryParams.get('plataforma');
    if (currentPlataforma && plataformasDisplayMap[currentPlataforma]) {
        activeFilters.push(`En: ${plataformasDisplayMap[currentPlataforma]}`);
    }

    // Contenido adulto
    const incluirAdultos = queryParams.get('incluirAdultos') === 'true';
    if (incluirAdultos) {
        activeFilters.push('Incluyendo +18');
    }

    if (loading) {
        return (
            <div className="status-container">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando resultados...</p>
            </div>
        );
    }

    return (
        <div className="resultados-busqueda-page">
            <Container className="my-4">
                <button className="volver-link" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Volver
                </button>
                <h1 className="mb-4">{title}</h1>

                {activeFilters.length > 0 && (
                    <div className="mb-4">
                        <p className="lead">Filtros aplicados: <span className="filtros-activos">{activeFilters.join(' • ')}</span></p>
                    </div>
                )}

                {movies.length > 0 ? (
                    <TarjetasPelicula movies={movies} />
                ) : (
                    <p>No se encontraron películas con los filtros seleccionados.</p>
                )}
            </Container>
        </div>
    );
};

export default ResultadosBusqueda;