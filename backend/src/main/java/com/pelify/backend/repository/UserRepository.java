package com.pelify.backend.repository;

import com.pelify.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Hereda todos los métodos CRUD (save, findAll, delete, etc.)
    // El primer parámetro 'User' es la entidad, el segundo 'Long' es el tipo de su ID.
}
