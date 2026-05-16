import api from '../api';

const listaService = {
    obtenerListas: async () => {
        const response = await api.get('/listas');
        return response.data;
    },

    crearLista: async (nombre) => {
        const response = await api.post('/listas', { nombre });
        return response.data;
    },

    agregarPelicula: async (listaId, pelicula) => {
        // Adaptar el objeto pelicula de TMDB al formato que espera el backend
        const peliDto = {
            tmdbId: pelicula.id,
            titulo: pelicula.title,
            rutaPoster: pelicula.poster_path,
            voteAverage: pelicula.vote_average,
            releaseDate: pelicula.release_date
        };
        const response = await api.post(`/listas/${listaId}/peliculas`, peliDto);
        return response.data;
    },

    eliminarPelicula: async (listaId, peliculaId) => {
        const response = await api.delete(`/listas/${listaId}/peliculas/${peliculaId}`);
        return response.data;
    },

    eliminarLista: async (listaId) => {
        const response = await api.delete(`/listas/${listaId}`);
        return response.data;
    }
};

export default listaService;
