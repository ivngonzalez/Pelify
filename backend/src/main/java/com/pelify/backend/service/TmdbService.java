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
        String params = buildDiscoverParams(filtros);
        return fetchFromTMDB("/discover/movie", params);
    }

    // ========== MÉTODOS PRIVADOS ==========
    // Solo se usan dentro de esta clase

    /**
     * Método genérico para hacer peticiones a TMDB
     * 
     * ¿QUÉ HACE?
     * 1. Construye la URL completa con endpoint + parámetros
     * 2. Hace la petición HTTP GET
     * 3. Convierte el JSON a Map
     * 4. Filtra películas por idioma (español e inglés)
     * 5. Devuelve máximo 20 resultados
     */
    private List<Map<String, Object>> fetchFromTMDB(String endpoint, String params) {
        String url = TMDB_BASE + endpoint 
            + "?api_key=" + tmdbApiKey 
            + "&language=es-ES&region=ES&page=1" 
            + params;

        try {
            // Paso 1: Hacer la petición HTTP
            String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // .block() espera a que termine

            // Paso 2: Convertir JSON a Map
            Map<String, Object> data = parseJson(response);
            List<Map<String, Object>> results = (List<Map<String, Object>>) data.get("results");

            // Paso 3 y 4: Filtrar y devolver
            return results != null ? results.stream()
                .filter(movie -> {
                    String lang = (String) movie.get("original_language");
                    return lang != null && (lang.equals("en") || lang.equals("es"));
                })
                .limit(20) // Máximo 20 películas
                .toList() 
                : new ArrayList<>();

        } catch (Exception e) {
            System.err.println("Error fetching from TMDB: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Construye los parámetros para el endpoint /discover/movie
     * 
     * ¿QUÉ HACE?
     * - Recibe un mapa con filtros (género, año, duración, etc)
     * - Convierte esos filtros a formato de URL (?with_genres=28,35&...)
     */
    private String buildDiscoverParams(Map<String, Object> filtros) {
        StringBuilder params = new StringBuilder();

        // Filtro por géneros (ej: 28,35 = acción y comedia)
        if (filtros.get("generos") != null) {
            params.append("&with_genres=")
                .append(String.join(",", (List<String>) filtros.get("generos")));
        }

        // Filtro por año mínimo
        if (filtros.get("anioMin") != null) {
            params.append("&primary_release_date.gte=")
                .append(filtros.get("anioMin")).append("-01-01");
        }

        // Filtro por año máximo
        if (filtros.get("anioMax") != null) {
            params.append("&primary_release_date.lte=")
                .append(filtros.get("anioMax")).append("-12-31");
        }

        // Filtro por duración máxima (en minutos)
        if (filtros.get("duracionMax") != null) {
            params.append("&with_runtime.lte=").append(filtros.get("duracionMax"));
        }

        // Filtro por puntuación mínima (0-10)
        if (filtros.get("puntuacionMin") != null) {
            params.append("&vote_average.gte=").append(filtros.get("puntuacionMin"));
        }

        // Filtro por cantidad mínima de votos
        if (filtros.get("votosMin") != null) {
            params.append("&vote_count.gte=").append(filtros.get("votosMin"));
        }

        // Filtro por idioma original (ej: "es", "en")
        if (filtros.get("idiomaOriginal") != null) {
            params.append("&with_original_language=").append(filtros.get("idiomaOriginal"));
        }

        // Filtro para incluir o no películas para adultos
        boolean incluirAdultos = (boolean) filtros.getOrDefault("incluirAdultos", false);
        params.append("&include_adult=").append(incluirAdultos);

        // Filtro por plataforma de streaming (ej: Netflix = 8)
        if (filtros.get("plataforma") != null) {
            params.append("&with_watch_providers=").append(filtros.get("plataforma"))
                .append("&watch_region=ES");
        }

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
