package com.greenbuilding.formation.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Autoriser les requêtes CORS depuis l'application frontend Angular (http://localhost:4200)
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")  // Remplace si nécessaire
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Méthodes autorisées
                .allowedHeaders("*");  // Autorise tous les headers
    }
}
