const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';
export const TMDB_IMG = 'https://image.tmdb.org/t/p/w500';

const fetchFromTMDB = async (endpoint, params = "") => {
    const url = `${TMDB_BASE}${endpoint}?api_key=${TMDB_KEY}&language=es-ES&region=ES&page=1${params}`;
    console.log("Fetching from TMDB URL:", url); // Log the URL
    const res = await fetch(url);
    const data = await res.json();
    console.log("Raw TMDB results:", data.results); // Log raw results

    return (data.results || [])
        .filter(movie => {
            const lang = movie.original_language;
            // Only allow English ('en') or Spanish ('es')
            const isAllowedLang = (lang === 'en' || lang === 'es');
            return isAllowedLang;
        })
        .slice(0, 20);
};

export const getPeliculaDetalle = async (id) => {
    const res = await fetch(`${TMDB_BASE}/movie/${id}?api_key=${TMDB_KEY}&language=es-ES&append_to_response=credits,videos,watch/providers`);        return await res.json();
};

export const getPeliculasPopulares = () => fetchFromTMDB('/movie/popular');
export const getProximosLanzamientos = () => fetchFromTMDB('/movie/upcoming');
export const getMejorValoradas = () => fetchFromTMDB('/movie/top_rated');
export const getEnCartelera = () => fetchFromTMDB('/movie/now_playing');
export const getTendenciasSemana = () => fetchFromTMDB('/trending/movie/week');

export const searchMovies = async (queryOrFilters) => {
    let endpoint = '';
    let params = '';

    if (typeof queryOrFilters === 'string') {
        // It's a search term
        endpoint = '/search/movie';
        params = `&query=${encodeURIComponent(queryOrFilters)}`;
    } else if (typeof queryOrFilters === 'object' && queryOrFilters !== null) {
        // It's a filters object for discovery
        endpoint = '/discover/movie';

        const {
            generos,
            anioMin,
            anioMax,
            duracionMax,
            puntuacionMin,
            votosMin,
            idiomaOriginal,
            incluirAdultos
        } = queryOrFilters;

        if (generos && generos.length > 0) params += `&with_genres=${generos.join(',')}`;
        if (anioMin) params += `&primary_release_date.gte=${anioMin}-01-01`;
        if (anioMax) params += `&primary_release_date.lte=${anioMax}-12-31`;
        if (duracionMax) params += `&with_runtime.lte=${duracionMax}`;
        if (puntuacionMin) params += `&vote_average.gte=${puntuacionMin}`;
        if (votosMin) params += `&vote_count.gte=${votosMin}`;
        if (idiomaOriginal) params += `&with_original_language=${idiomaOriginal}`;
        params += `&include_adult=${incluirAdultos ? 'true' : 'false'}`;
    } else {
        // Default to popular movies if no specific query or filters are provided
        endpoint = '/movie/popular';
    }

    return fetchFromTMDB(endpoint, params);
};