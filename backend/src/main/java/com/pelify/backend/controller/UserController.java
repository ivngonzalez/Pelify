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

    @GetMapping
    public List<User> obtenerTodos() {
        return userService.obtenerTodos();
    }
}
