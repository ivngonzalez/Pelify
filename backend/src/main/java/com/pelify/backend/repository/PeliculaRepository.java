package com.pelify.backend.repository;

import com.pelify.backend.model.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula, Integer> {
    // Al extender JpaRepository, ya tienes findAll(), save(), etc.
}