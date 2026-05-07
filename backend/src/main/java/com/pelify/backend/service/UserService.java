package com.pelify.backend.service;

import com.pelify.backend.model.*;
import com.pelify.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List; // <--- NO OLVIDES ESTE IMPORT

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    public User registrarUsuario(User user) {
        if(userRepository.existsByEmail(user.getEmail())) throw new RuntimeException("Email en uso");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role defaultRole = roleRepository.findByNombre("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Error: Rol no inicializado en DB"));

        user.getRoles().add(defaultRole);
        return userRepository.save(user);
    }

    // --- AÑADE ESTE MÉTODO PARA QUE EL USERCONTROLLER NO DÉ ERROR ---
    public List<User> obtenerTodos() {
        return userRepository.findAll();
    }
}