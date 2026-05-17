package com.pelify.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "listas")
public class Lista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(name = "es_predeterminada")
    private boolean esPredeterminada = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @ManyToMany
    @JoinTable(
        name = "listas_peliculas",
        joinColumns = @JoinColumn(name = "lista_id"),
        inverseJoinColumns = @JoinColumn(name = "pelicula_id")
    )
    private Set<Pelicula> peliculas = new HashSet<>();

    public Lista() {}

    public Lista(String nombre, User usuario) {
        this.nombre = nombre;
        this.usuario = usuario;
    }

    public Lista(String nombre, User usuario, boolean esPredeterminada) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.esPredeterminada = esPredeterminada;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public boolean isEsPredeterminada() { return esPredeterminada; }
    public void setEsPredeterminada(boolean esPredeterminada) { this.esPredeterminada = esPredeterminada; }
    public User getUsuario() { return usuario; }
    public void setUsuario(User usuario) { this.usuario = usuario; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    public Set<Pelicula> getPeliculas() { return peliculas; }
    public void setPeliculas(Set<Pelicula> peliculas) { this.peliculas = peliculas; }
}
