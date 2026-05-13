package com.pelify.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;

/**
 * Servicio para comunicarse con la API de TMDB
 * 
 * ¿QUÉ HACE?
 * - Hace peticiones a https://api.themoviedb.org/3
 * - Obtiene datos de películas (populares, estrenos, etc)
 * - Filtra resultados por idioma
 * - Convierte JSON a Map (diccionarios) de Java
 * 
 * ¿POR QUÉ AQUÍ Y NO EN EL FRONTEND?
 * - Seguridad: La API key no está expuesta en el navegador
 * - Control: Podemos cachear, validar y limitar peticiones
 * - Mantenimiento: Si TMDB cambia, solo modificamos aquí
 */
@Service
public class TmdbService {

    // Lee la API key del archivo application.properties
    // Que a su vez la lee del .env
    @Value("${tmdb.api.key}")
    private String tmdbApiKey;

    // WebClient es como axios o fetch pero para Java
    // Sirve para hacer peticiones HTTP
    private final WebClient webClient;
    private final String TMDB_BASE = "https://api.themoviedb.org/3";
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Constructor: Se ejecuta cuando Spring crea este servicio
    public TmdbService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(TMDB_BASE).build();
    }

    // ========== MÉTODOS PÚBLICOS ==========
    // Estos métodos los llama el controlador

    /**
     * Obtiene las películas populares
     */
    public List<Map<String, Object>> getPeliculasPopulares() {
        return fetchFromTMDB("/movie/popular", "");
    }

    /**
     * Obtiene películas que se estrenarán próximamente
     */
    public List<Map<String, Object>> getProximosLanzamientos() {
        return fetchFromTMDB("/movie/upcoming", "");
    }

    /**
     * Obtiene las películas mejor valoradas
     */
    public List<Map<String, Object>> getMejorValoradas() {
        return fetchFromTMDB("/movie/top_rated", "");
    }

    /**
     * Obtiene películas en cartelera ahora
     */
    public List<Map<String, Object>> getEnCartelera() {
        return fetchFromTMDB("/movie/now_playing", "");
    }

    /**
     * Obtiene tendencias de esta semana
     */
    public List<Map<String, Object>> getTendenciasSemana() {
        return fetchFromTMDB("/trending/movie/week", "");
    }

    /**
     * Obtiene detalles completos de una película por su ID
     */
    public Map<String, Object> getPeliculaDetalle(int id) {
        String url = TMDB_BASE + "/movie/" + id 
            + "?api_key=" + tmdbApiKey 
            + "&language=es-ES"
            + "&append_to_response=credits,videos,watch/providers";
        
        try {
            String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // Espera a que termine la petición
            
            return parseJson(response);
        } catch (Exception e) {
            System.err.println("Error obteniendo detalle de película: " + e.getMessage());
            return new HashMap<>();
        }
    }

    /**
     * Busca películas por título
     */
    public List<Map<String, Object>> buscarPeliculas(String query) {
        String params = "&query=" + encodeURIComponent(query);
        return fetchFromTMDB("/search/movie", params);
    }

    /**
     * Descubre películas con filtros avanzados
     * Ejemplo: por género, año, duración, puntuación, etc
     */
    public List<Map<String, Object>> descubrirPeliculas(Map<String, Object> filtros) {
        List<Map<String, Object>> todasLasPeliculas = new ArrayList<>();
        String params = buildDiscoverParams(filtros);

        // Realizamos 3 peticiones (páginas 1, 2 y 3) para tener más variedad
        for (int i = 1; i <= 3; i++) {
            List<Map<String, Object>> pagina = fetchFromTMDB("/discover/movie", params + "&page=" + i, false);
            todasLasPeliculas.addAll(pagina);
        }

        // Filtrar duplicados por ID usando un Set
        Set<Object> idsVistos = new HashSet<>();
        return todasLasPeliculas.stream()
                .filter(movie -> idsVistos.add(movie.get("id")))
                .toList();
    }

    // ========== MÉTODOS PRIVADOS ==========
    // Solo se usan dentro de esta clase

    /**
     * Método genérico para hacer peticiones a TMDB (Por defecto usa región ES)
     */
    private List<Map<String, Object>> fetchFromTMDB(String endpoint, String params) {
        return fetchFromTMDB(endpoint, params, true);
    }

    /**
     * Método genérico para hacer peticiones a TMDB
     * 
     * @param useRegion Si es true, añade region=ES (para estrenos locales)
     */
    private List<Map<String, Object>> fetchFromTMDB(String endpoint, String params, boolean useRegion) {
    String regionParam = useRegion ? "&region=ES" : "";
    String url = TMDB_BASE + endpoint 
        + "?api_key=" + tmdbApiKey 
        + "&language=es-ES" + regionParam
        + params;

    try {
        String response = webClient.get()
            .uri(url)
            .retrieve()
            .bodyToMono(String.class)
            .block();

        Map<String, Object> data = parseJson(response);
        
        // Obtenemos los resultados del JSON
        List<Map<String, Object>> results = (List<Map<String, Object>>) data.get("results");

        // Si hay resultados, los devolvemos directamente sin filtrar por idioma
        return results != null ? results : new ArrayList<>();

    } catch (Exception e) {
        System.err.println("Error fetching from TMDB: " + e.getMessage());
        return new ArrayList<>();
    }
}

    /**
     * Construye los parámetros para el endpoint /discover/movie
     */
    private String buildDiscoverParams(Map<String, Object> filtros) {
        StringBuilder params = new StringBuilder();

        // Filtro de calidad por defecto: mínimo 50 votos (si no se especifica o llega vacío)
        Object votosMin = filtros.get("votosMin");
        if (votosMin == null || votosMin.toString().isEmpty()) {
            params.append("&vote_count.gte=50");
        } else {
            params.append("&vote_count.gte=").append(votosMin);
        }

        // Filtro por géneros (puede ser Lista o String separado por comas)
        Object generos = filtros.get("generos");
        if (generos != null && !generos.toString().isEmpty()) {
            if (generos instanceof List) {
                List<?> list = (List<?>) generos;
                if (!list.isEmpty()) {
                    params.append("&with_genres=").append(String.join(",", list.stream().map(Object::toString).toList()));
                }
            } else {
                params.append("&with_genres=").append(generos.toString());
            }
        }

        // Filtro por año mínimo
        if (filtros.get("anioMin") != null && !filtros.get("anioMin").toString().isEmpty()) {
            params.append("&primary_release_date.gte=").append(filtros.get("anioMin")).append("-01-01");
        }

        // Filtro por año máximo
        if (filtros.get("anioMax") != null && !filtros.get("anioMax").toString().isEmpty()) {
            params.append("&primary_release_date.lte=").append(filtros.get("anioMax")).append("-12-31");
        }

        // Filtro por duración máxima
        if (filtros.get("duracionMax") != null && !filtros.get("duracionMax").toString().isEmpty()) {
            params.append("&with_runtime.lte=").append(filtros.get("duracionMax"));
        }

        // Filtro por puntuación mínima
        if (filtros.get("puntuacionMin") != null && !filtros.get("puntuacionMin").toString().isEmpty()) {
            params.append("&vote_average.gte=").append(filtros.get("puntuacionMin"));
        }

        // Filtro por plataforma (Watch Providers)
        if (filtros.get("plataforma") != null && !filtros.get("plataforma").toString().isEmpty()) {
            params.append("&with_watch_providers=").append(filtros.get("plataforma"))
            .append("&watch_region=ES");
        }

        // Otros filtros
        if (filtros.get("idiomaOriginal") != null && !filtros.get("idiomaOriginal").toString().isEmpty()) {
            params.append("&with_original_language=").append(filtros.get("idiomaOriginal"));
        }

        boolean incluirAdultos = Boolean.parseBoolean(String.valueOf(filtros.getOrDefault("incluirAdultos", false)));
        params.append("&include_adult=").append(incluirAdultos);

        return params.toString();
    }

    /**
     * Codifica un string para que sea válido en una URL
     * Ejemplo: "Avengers Endgame" → "Avengers+Endgame"
     */
    private String encodeURIComponent(String str) {
        try {
            return java.net.URLEncoder.encode(str, "UTF-8").replace("+", "%20");
        } catch (Exception e) {
            return str;
        }
    }

    /**
     * Convierte un string JSON a Map de Java
     * ¿Por qué? Para poder acceder fácilmente a los datos
     */
    private Map<String, Object> parseJson(String json) {
        try {
            return objectMapper.readValue(json, Map.class);
        } catch (Exception e) {
            System.err.println("Error parsing JSON: " + e.getMessage());
            return new HashMap<>();
        }
    }
}
