package com.pelify.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Esto permite usar @PreAuthorize("hasRole('ADMIN')") en el futuro
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Usamos BCrypt para que las contraseñas no se guarden en texto plano
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session -> session
                    .sessionCreationPolicy(org.springframework.security.config.http.SessionCreationPolicy.IF_REQUIRED)
            )

            .authorizeHttpRequests(auth -> auth
                    // Permitimos que todo el mundo pueda registrarse y loguearse
                    .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()

                    // Cualquier otra ruta requiere estar autenticado
                    .anyRequest().authenticated()
            )

            // Configuramos el Logout
            .logout(logout -> logout
                    .logoutUrl("/api/auth/logout")
                    .logoutSuccessHandler((req, res, auth) -> res.setStatus(200))
            )

            // Como usamos sesiones (JSESSIONID), deshabilitamos el formulario por defecto de Spring
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}