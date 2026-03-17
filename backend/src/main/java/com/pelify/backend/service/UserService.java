package com.pelify.backend.service;

import com.pelify.backend.model.User;
import com.pelify.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    // Aquí le decimos a Spring: "Traeme el mando a distancia de la base de datos"
    @Autowired
    private UserRepository userRepository;

    public User registrarUsuario(User user) {
        // Aquí podrías añadir lógica: cifrar contraseña, validar email, etc.
        // Y finalmente, usas el repository para guardarlo físicamente:
        return userRepository.save(user);
    }

    public List<User> obtenerTodos() {
        // Usas el método que Spring ya programó por ti
        return userRepository.findAll();
    }
}