package com.pelify.backend.repository;

import com.pelify.backend.model.Lista;
import com.pelify.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListaRepository extends JpaRepository<Lista, Long> {
    List<Lista> findByUsuario(User usuario);
}
