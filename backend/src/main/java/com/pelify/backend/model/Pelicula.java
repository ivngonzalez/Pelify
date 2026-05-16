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

    @Column(name = "puntuacion")
    private Double voteAverage;

    @Column(name = "fecha_lanzamiento")
    private String releaseDate;

    // Constructor vacío obligatorio para JPA
    public Pelicula() {
    }

    // Constructor útil para crear películas manualmente
    public Pelicula(Integer tmdbId, String titulo, String rutaPoster, Double voteAverage, String releaseDate) {
        this.tmdbId = tmdbId;
        this.titulo = titulo;
        this.rutaPoster = rutaPoster;
        this.voteAverage = voteAverage;
        this.releaseDate = releaseDate;
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

    public Double getVoteAverage() {
        return voteAverage;
    }

    public void setVoteAverage(Double voteAverage) {
        this.voteAverage = voteAverage;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }
}