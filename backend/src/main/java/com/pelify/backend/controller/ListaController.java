package com.pelify.backend.controller;

import com.pelify.backend.model.Lista;
import com.pelify.backend.model.Pelicula;
import com.pelify.backend.model.User;
import com.pelify.backend.repository.UserRepository;
import com.pelify.backend.service.ListaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/listas")
public class ListaController {

    @Autowired
    private ListaService listaService;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser(Principal principal) {
        String email = principal.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @GetMapping
    public ResponseEntity<List<Lista>> obtenerListas(Principal principal) {
        User user = getAuthenticatedUser(principal);
        return ResponseEntity.ok(listaService.obtenerListasPorUsuario(user));
    }

    @PostMapping
    public ResponseEntity<Lista> crearLista(@RequestBody Map<String, String> body, Principal principal) {
        User user = getAuthenticatedUser(principal);
        String nombre = body.get("nombre");
        return ResponseEntity.ok(listaService.crearLista(nombre, user));
    }

    @PostMapping("/{listaId}/peliculas")
    public ResponseEntity<Void> agregarPelicula(@PathVariable Long listaId, @RequestBody Pelicula pelicula, Principal principal) {
        User user = getAuthenticatedUser(principal);
        listaService.agregarPeliculaALista(listaId, pelicula, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{listaId}/peliculas/{peliculaId}")
    public ResponseEntity<Void> eliminarPelicula(@PathVariable Long listaId, @PathVariable Integer peliculaId, Principal principal) {
        User user = getAuthenticatedUser(principal);
        listaService.eliminarPeliculaDeLista(listaId, peliculaId, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{listaId}")
    public ResponseEntity<Void> eliminarLista(@PathVariable Long listaId, Principal principal) {
        User user = getAuthenticatedUser(principal);
        listaService.eliminarLista(listaId, user);
        return ResponseEntity.ok().build();
    }
}
