package com.pelify.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permitimos que el frontend acceda a todas las rutas del backend (/**)
        registry.addMapping("/**")
                // Aquí indicas la URL exacta de tu frontend de Vite
                .allowedOrigins("http://localhost:5173")
                // Permitimos los métodos HTTP estándar
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // Permitimos que se envíen cabeceras (como tokens de seguridad)
                .allowedHeaders("*")
                // Permitimos el envío de cookies o credenciales si fuera necesario
                .allowCredentials(true);
    }
}