package com.pelify.backend.controller;

import com.pelify.backend.service.TmdbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * Controlador para exponer los endpoints de TMDB
 * 
 * ¿QUÉ HACE?
 * Define las rutas HTTP que el frontend puede llamar
 * 
 * RUTAS DISPONIBLES:
 * GET  /api/tmdb/populares           → Películas populares
 * GET  /api/tmdb/proximos-lanzamientos → Próximos estrenos
 * GET  /api/tmdb/mejor-valoradas     → Mejor valoradas
 * GET  /api/tmdb/en-cartelera        → En cartelera ahora
 * GET  /api/tmdb/tendencias-semana   → Tendencias de la semana
 * GET  /api/tmdb/detalle/{id}        → Detalles de una película
 * GET  /api/tmdb/buscar?q=...        → Buscar películas
 * POST /api/tmdb/descubrir           → Descubrir con filtros
 */
@RestController
@RequestMapping("/api/tmdb")
public class TmdbController {

    // @Autowired: Spring inyecta automáticamente el servicio
    // Es como cuando el jefe te da las herramientas para trabajar
    @Autowired
    private TmdbService tmdbService;

    /**
     * GET /api/tmdb/populares
     * Devuelve las películas populares
     */
    @GetMapping("/populares")
    public ResponseEntity<List<Map<String, Object>>> getPeliculasPopulares() {
        List<Map<String, Object>> peliculas = tmdbService.getPeliculasPopulares();
        return ResponseEntity.ok(peliculas);
    }

    /**
     * GET /api/tmdb/proximos-lanzamientos
     * Devuelve los próximos estrenos
     */
    @GetMapping("/proximos-lanzamientos")
    public ResponseEntity<List<Map<String, Object>>> getProximosLanzamientos() {
        List<Map<String, Object>> peliculas = tmdbService.getProximosLanzamientos();
        return ResponseEntity.ok(peliculas);
    }

    /**
     * GET /api/tmdb/mejor-valoradas
     * Devuelve las películas mejor valoradas
     */
    @GetMapping("/mejor-valoradas")
    public ResponseEntity<List<Map<String, Object>>> getMejorValoradas() {
        List<Map<String, Object>> peliculas = tmdbService.getMejorValoradas();
        return ResponseEntity.ok(peliculas);
    }

    /**
     * GET /api/tmdb/en-cartelera
     * Devuelve las películas en cartelera ahora
     */
    @GetMapping("/en-cartelera")
    public ResponseEntity<List<Map<String, Object>>> getEnCartelera() {
        List<Map<String, Object>> peliculas = tmdbService.getEnCartelera();
        return ResponseEntity.ok(peliculas);
    }

    /**
     * GET /api/tmdb/tendencias-semana
     * Devuelve las tendencias de la semana
     */
    @GetMapping("/tendencias-semana")
    public ResponseEntity<List<Map<String, Object>>> getTendenciasSemana() {
        List<Map<String, Object>> peliculas = tmdbService.getTendenciasSemana();
        return ResponseEntity.ok(peliculas);
    }

    /**
     * GET /api/tmdb/detalle/{id}
     * Devuelve los detalles de una película específica
     * 
     * @PathVariable significa que "id" viene en la URL
     * Ejemplo: /api/tmdb/detalle/550 → id = 550
     */
    @GetMapping("/detalle/{id}")
    public ResponseEntity<Map<String, Object>> getPeliculaDetalle(@PathVariable int id) {
        Map<String, Object> detalle = tmdbService.getPeliculaDetalle(id);
        return ResponseEntity.ok(detalle);
    }

    /**
     * GET /api/tmdb/buscar?q=...
     * Busca películas por título
     * 
     * @RequestParam significa que "q" viene en la query string
     * Ejemplo: /api/tmdb/buscar?q=Avengers → busca "Avengers"
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<Map<String, Object>>> buscar(@RequestParam String q) {
        List<Map<String, Object>> resultados = tmdbService.buscarPeliculas(q);
        return ResponseEntity.ok(resultados);
    }

    /**
     * POST /api/tmdb/descubrir
     * Descubre películas con filtros avanzados
     * 
     * @RequestBody significa que los filtros vienen en el body (JSON)
     * 
     * Ejemplo de body:
     * {
     *     "generos": ["28", "35"],      // Acción y comedia
     *     "anioMin": 2020,
     *     "anioMax": 2024,
     *     "puntuacionMin": 7.5,
     *     "incluirAdultos": false
     * }
     */
    @PostMapping("/descubrir")
    public ResponseEntity<List<Map<String, Object>>> descubrir(@RequestBody Map<String, Object> filtros) {
        List<Map<String, Object>> resultados = tmdbService.descubrirPeliculas(filtros);
        return ResponseEntity.ok(resultados);
    }
}
