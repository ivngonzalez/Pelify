import api from '../api'; // Cliente axios que ya configurado para el backend

// URL base para las imágenes de TMDB
export const TMDB_IMG = 'https://image.tmdb.org/t/p/w500';

/**
 * Ahora todas las peticiones van al BACKEND
 * NO al frontend. Esto es mucho más seguro.
 * 
 * Ejemplo de flujo:
 * 1. Frontend llama → api.get('/tmdb/populares')
 * 2. Backend recibe → /api/tmdb/populares
 * 3. Backend llama → TMDB API (con API key protegida)
 * 4. Backend devuelve → los datos al frontend
 */

// GET /api/tmdb/populares
export const getPeliculasPopulares = () => 
    api.get('/tmdb/populares').then(res => res.data);

// GET /api/tmdb/proximos-lanzamientos
export const getProximosLanzamientos = () => 
    api.get('/tmdb/proximos-lanzamientos').then(res => res.data);

// GET /api/tmdb/mejor-valoradas
export const getMejorValoradas = () => 
    api.get('/tmdb/mejor-valoradas').then(res => res.data);

// GET /api/tmdb/en-cartelera
export const getEnCartelera = () => 
    api.get('/tmdb/en-cartelera').then(res => res.data);

// GET /api/tmdb/tendencias-semana
export const getTendenciasSemana = () => 
    api.get('/tmdb/tendencias-semana').then(res => res.data);

// GET /api/tmdb/detalle/{id}
export const getPeliculaDetalle = (id) => 
    api.get(`/tmdb/detalle/${id}`).then(res => res.data);

/**
 * Busca películas o descubre con filtros
 * 
 * Dos casos:
 * 1. Si es un string → búsqueda por nombre
 *    searchMovies("Avengers")
 * 
 * 2. Si es un objeto → búsqueda con filtros
 *    searchMovies({ generos: ["28"], anioMin: 2020 })
 */
export const searchMovies = async (queryOrFilters) => {
    if (typeof queryOrFilters === 'string') {
        // Caso 1: Búsqueda por nombre
        // GET /api/tmdb/buscar?q=Avengers
        return api.get('/tmdb/buscar', { params: { q: queryOrFilters } })
            .then(res => res.data);
    } else if (typeof queryOrFilters === 'object' && queryOrFilters !== null) {
        // Caso 2: Descubrir con filtros
        // POST /api/tmdb/descubrir
        // Body: { generos: ["28"], anioMin: 2020, ... }
        return api.post('/tmdb/descubrir', queryOrFilters)
            .then(res => res.data);
    }
    return [];
};