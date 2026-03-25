package com.pelify.backend.controller;

import com.pelify.backend.model.Pelicula;
import com.pelify.backend.service.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/peliculas")
public class PeliculaController {

    @Autowired
    private PeliculaService peliculaService;

    // Obtener todas las películas: GET http://localhost:8080/api/peliculas
    @GetMapping
    public List<Pelicula> obtenerTodas() {
        return peliculaService.obtenerTodas();
    }

    // Guardar una película: POST http://localhost:8080/api/peliculas
    // El cuerpo del JSON debe ser algo como:
    // { "tmdbId": 550, "titulo": "Fight Club", "rutaPoster": "/pB8BM79vS7vMv0uBh7v3uR9vM.jpg" }
    @PostMapping
    public ResponseEntity<Pelicula> guardarPelicula(@RequestBody Pelicula pelicula) {
        Pelicula nuevaPeli = peliculaService.guardarPelicula(pelicula);
        return ResponseEntity.ok(nuevaPeli);
    }
}
