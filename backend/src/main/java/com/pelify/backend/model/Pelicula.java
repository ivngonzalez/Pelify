package com.pelify.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "peliculas")
public class Pelicula {

    @Id
    @Column(name = "tmdb_id") // Coincide con tu SQL
    private Integer tmdbId;

    @Column(nullable = false)
    private String titulo;

    @Column(name = "ruta_poster")
    private String rutaPoster;

    // Constructor vacío obligatorio para JPA
    public Pelicula() {
    }

    // Constructor útil para crear películas manualmente
    public Pelicula(Integer tmdbId, String titulo, String rutaPoster) {
        this.tmdbId = tmdbId;
        this.titulo = titulo;
        this.rutaPoster = rutaPoster;
    }

    // --- GETTERS Y SETTERS ---

    public Integer getTmdbId() {
        return tmdbId;
    }

    public void setTmdbId(Integer tmdbId) {
        this.tmdbId = tmdbId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getRutaPoster() {
        return rutaPoster;
    }

    public void setRutaPoster(String rutaPoster) {
        this.rutaPoster = rutaPoster;
    }
}