package com.pelify.backend.controller;

import com.pelify.backend.model.User;
import com.pelify.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Obtener todos los usuarios: GET http://localhost:8080/api/users
    @GetMapping
    public List<User> obtenerTodos() {
        return userService.obtenerTodos();
    }

    // Crear un usuario: POST http://localhost:8080/api/users
    // El cuerpo del JSON debe ser algo como:
    // { "username": "pepe", "password": "123", "email": "pepe@mail.com", "role": "USER" }
    @PostMapping
    public ResponseEntity<User> registrarUsuario(@RequestBody User user) {
        User nuevoUser = userService.registrarUsuario(user);
        return ResponseEntity.ok(nuevoUser);
    }
}
