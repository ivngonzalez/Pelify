package com.pelify.backend.config;

import com.pelify.backend.model.Role;
import com.pelify.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired private RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        if (roleRepository.findByNombre("ROLE_USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setNombre("ROLE_USER");
            roleRepository.save(userRole);
        }
        if (roleRepository.findByNombre("ROLE_ADMIN").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setNombre("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }
    }
}