const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';
export const TMDB_IMG = 'https://image.tmdb.org/t/p/w500';

const fetchFromTMDB = async (endpoint, params = "") => {
    const res = await fetch(`${TMDB_BASE}${endpoint}?api_key=${TMDB_KEY}&language=es-ES&region=ES&page=1${params}`);
    const data = await res.json();
    
    return (data.results || [])
        .filter(movie => {
            const lang = movie.original_language;
            const title = (movie.title || "").toLowerCase();
            const originalTitle = (movie.original_title || "").toLowerCase();

            // 1. Bloqueo explícito de idioma ruso ('ru')
            if (lang === 'ru') return false;

            // 2. Solo permitimos inglés ('en') o español ('es')
            const isAllowedLang = (lang === 'en' || lang === 'es');

            // 3. SEGURO EXTRA: Si el título contiene caracteres cirílicos (rusos), la descartamos
            // Este regex detecta el alfabeto ruso aunque el idioma diga "en"
            const hasRussianChars = /[а-яА-ЯЁё]/.test(title) || /[а-яА-ЯЁё]/.test(originalTitle);

            return isAllowedLang && !hasRussianChars;
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