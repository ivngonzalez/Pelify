package com.pelify.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Desactivamos CSRF para poder hacer POST desde el navegador o Postman sin tokens
            .csrf(csrf -> csrf.disable())
            // Autorizamos todas las peticiones (abierto para desarrollo)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            // Desactivamos el formulario de login por defecto
            .formLogin(form -> form.disable())
            .httpBasic(withDefaults());

        return http.build();
    }
}
