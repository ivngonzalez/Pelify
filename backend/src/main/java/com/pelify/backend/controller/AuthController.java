package com.pelify.backend.controller;
import com.pelify.backend.dto.LoginRequest;
import com.pelify.backend.model.User;
import com.pelify.backend.service.UserService;
import com.pelify.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired private AuthenticationManager authManager;
    @Autowired private UserService userService;
    @Autowired private UserRepository userRepository;
    private SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.registrarUsuario(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req, HttpServletRequest request, HttpServletResponse response) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
            );

            // 1. Establecemos la autenticación en el contexto
            SecurityContextHolder.getContext().setAuthentication(auth);

            // 2. IMPORTANTE: Guardamos el contexto en la sesión para que genere la Cookie
            securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);

            return ResponseEntity.ok("Login exitoso");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("Sesión cerrada");
    }
    @GetMapping("/me")
    public ResponseEntity<?> getMe(Authentication auth) {
        if (auth == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(userRepository.findByEmail(auth.getName()));
    }
}