package com.pelify.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_usuario", unique = true, nullable = false)
    private String username;

    @Column(name = "contrasena", nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    private Boolean activo = true;

    // --- NUEVA RELACIÓN: Mi Lista de Favoritos ---
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "user_favorites",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "pelicula_id") // Se refiere al tmdb_id de Pelicula
    )
    private List<Pelicula> favoritos = new ArrayList<>();

    // --- CONSTRUCTORES ---

    public User() {
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // --- GETTERS Y SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    // Getter y Setter para la lista de favoritos
    public List<Pelicula> getFavoritos() {
        return favoritos;
    }

    public void setFavoritos(List<Pelicula> favoritos) {
        this.favoritos = favoritos;
    }
}