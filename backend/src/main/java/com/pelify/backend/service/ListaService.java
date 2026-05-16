package com.pelify.backend.service;

import com.pelify.backend.model.Lista;
import com.pelify.backend.model.Pelicula;
import com.pelify.backend.model.User;
import com.pelify.backend.repository.ListaRepository;
import com.pelify.backend.repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ListaService {

    @Autowired
    private ListaRepository listaRepository;

    @Autowired
    private PeliculaRepository peliculaRepository;

    public List<Lista> obtenerListasPorUsuario(User usuario) {
        return listaRepository.findByUsuario(usuario);
    }

    public Lista crearLista(String nombre, User usuario) {
        Lista nuevaLista = new Lista(nombre, usuario);
        return listaRepository.save(nuevaLista);
    }

    @Transactional
    public void agregarPeliculaALista(Long listaId, Pelicula pelicula, User usuario) {
        Lista lista = listaRepository.findById(listaId)
                .orElseThrow(() -> new RuntimeException("Lista no encontrada"));

        // Seguridad: Verificar que la lista pertenece al usuario
        if (!lista.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No tienes permiso para modificar esta lista");
        }

        // Asegurarse de que la película existe y está actualizada en la BD local
        peliculaRepository.save(pelicula);

        lista.getPeliculas().add(pelicula);
        listaRepository.save(lista);
    }

    @Transactional
    public void eliminarPeliculaDeLista(Long listaId, Integer peliculaId, User usuario) {
        Lista lista = listaRepository.findById(listaId)
                .orElseThrow(() -> new RuntimeException("Lista no encontrada"));

        if (!lista.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No tienes permiso para modificar esta lista");
        }

        lista.getPeliculas().removeIf(p -> p.getTmdbId().equals(peliculaId));
        listaRepository.save(lista);
    }

    public void eliminarLista(Long listaId, User usuario) {
        Lista lista = listaRepository.findById(listaId)
                .orElseThrow(() -> new RuntimeException("Lista no encontrada"));

        if (!lista.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No tienes permiso para eliminar esta lista");
        }

        listaRepository.delete(lista);
    }
}
