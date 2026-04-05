const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';
export const TMDB_IMG = 'https://image.tmdb.org/t/p/w500';

const fetchFromTMDB = async (endpoint, params = "") => {
    const res = await fetch(`${TMDB_BASE}${endpoint}?api_key=${TMDB_KEY}&language=es-ES&region=ES&page=1${params}`);
    const data = await res.json();
    return (data.results || [])
        .filter(movie => movie.original_language === 'es' || movie.original_language === 'en')
        .slice(0, 20);
};

export const getPeliculasPopulares = () => fetchFromTMDB('/movie/popular');
export const getProximosLanzamientos = () => fetchFromTMDB('/movie/upcoming');
export const getMejorValoradas = () => fetchFromTMDB('/movie/top_rated');
export const getEnCartelera = () => fetchFromTMDB('/movie/now_playing');
export const getTendenciasSemana = () => fetchFromTMDB('/trending/movie/week');