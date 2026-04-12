import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../../services/tmdbService';
import TarjetasPelicula from '../../components/TarjetasPelicula/TarjetasPelicula';
import { Container } from 'react-bootstrap';

import './ResultadosBusqueda.css';

const ResultadosBusqueda = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Resultados de Búsqueda");
    const location = useLocation();

    // Define mappings for display
    const genreDisplayMap = {
        '28': 'Acción',
        '18': 'Drama',
        '35': 'Comedia',
        '27': 'Terror',
        '878': 'Ciencia ficción',
        '16': 'Animación'
    };

    const durationDisplayMap = {
        '89': 'Menos de 90 min',
        '120': '90 – 120 min' // This range in BuscadorPeliculas.jsx is 90-120 min
    };

    const yearDisplayMap = {
        '2024-2025': '2024 – 2025',
        '2010-2023': '2010 – 2023',
        '2000-2009': '2000 – 2009',
        '1999': 'Clásicos (antes de 2000)' // anioMax=1999 from BuscadorPeliculas.jsx
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
                pageTitle = "Recomendaciones para ti"; // Restored phrase
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
    const currentGeneros = (queryParams.get('generos') || '').split(',').filter(Boolean);
    if (currentGeneros.length > 0) {
        currentGeneros.forEach(genreId => {
            if (genreDisplayMap[genreId]) {
                activeFilters.push(genreDisplayMap[genreId]);
            }
        });
    }
    const currentDuracionMax = queryParams.get('duracionMax');
    if (currentDuracionMax && durationDisplayMap[currentDuracionMax]) {
        activeFilters.push(durationDisplayMap[currentDuracionMax]);
    }
    
    const currentAnioMin = queryParams.get('anioMin');
    const currentAnioMax = queryParams.get('anioMax');

    // Handle year filter display logic
    if (currentAnioMin && currentAnioMax) {
        let yearRangeKey = `${currentAnioMin}-${currentAnioMax}`;
        if (yearDisplayMap[yearRangeKey]) {
            activeFilters.push(yearDisplayMap[yearRangeKey]);
        } else {
            activeFilters.push(`Año: ${currentAnioMin}-${currentAnioMax}`);
        }
    } else if (currentAnioMax === '1999') { // Handle 'Clásicos'
        activeFilters.push(yearDisplayMap['1999']);
    } else if (currentAnioMin) { // Only min year specified
        activeFilters.push(`Año desde: ${currentAnioMin}`);
    } else if (currentAnioMax) { // Only max year specified
        activeFilters.push(`Año hasta: ${currentAnioMax}`);
    }


    if (loading) {
        return (
            <Container className="text-center my-5">
                <h2>Cargando resultados...</h2>
            </Container>
        );
    }

    return (
        <div className="resultados-busqueda-page">
            <Container className="my-4">
                <h1 className="mb-4">{title}</h1>

                {activeFilters.length > 0 && (
                    <div className="mb-4">
                        <p className="lead">Filtros aplicados: {activeFilters.join(', ')}</p>
                    </div>
                )}

                {movies.length > 0 ? (
                    <TarjetasPelicula movies={movies} />
                ) : (
                    <p>No se encontraron películas con los filtros seleccionadas.</p>
                )}
            </Container>
        </div>
    );
};

export default ResultadosBusqueda;