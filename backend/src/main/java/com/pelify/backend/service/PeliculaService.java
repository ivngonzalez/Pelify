package com.pelify.backend.service;

import com.pelify.backend.model.Pelicula;
import com.pelify.backend.repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeliculaService {

    @Autowired
    private PeliculaRepository peliculaRepository;

    public Pelicula guardarPelicula(Pelicula pelicula) {
        return peliculaRepository.save(pelicula);
    }

    public List<Pelicula> obtenerTodas() {
        return peliculaRepository.findAll();
    }
}
