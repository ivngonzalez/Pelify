package com.pelify.backend.service;

import com.pelify.backend.model.Pelicula;
import com.pelify.backend.model.User;
import com.pelify.backend.repository.PeliculaRepository;
import com.pelify.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PeliculaService {

    @Autowired
    private PeliculaRepository peliculaRepository;

    @Autowired
    private UserRepository userRepository;

    public Pelicula guardarPelicula(Pelicula pelicula) {
        return peliculaRepository.save(pelicula);
    }

    public List<Pelicula> obtenerTodas() {
        return peliculaRepository.findAll();
    }

    // --- NUEVO MÉTODO: AÑADIR A FAVORITOS ---
    @Transactional
    public void agregarAFavoritos(Long userId, Pelicula peliculaData) {
        // 1. Buscamos al usuario
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Verificamos si la película ya existe en nuestra DB local por su tmdbId
        // Si no existe, la guardamos primero
        Pelicula pelicula = peliculaRepository.findById(peliculaData.getTmdbId())
                .orElseGet(() -> peliculaRepository.save(peliculaData));

        // 3. Añadimos la relación si no existe ya en la lista del usuario
        if (!user.getFavoritos().contains(pelicula)) {
            user.getFavoritos().add(pelicula);
            userRepository.save(user);
        }
    }

    // --- NUEVO MÉTODO: OBTENER MI LISTA ---
    public List<Pelicula> obtenerFavoritos(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return user.getFavoritos();
    }
}