package tn.iit.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@EnableWebMvc
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Autoriser toutes les requêtes sur toutes les routes
            .allowedOrigins("http://localhost:4200") // Autoriser les requêtes depuis localhost:4200
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Spécifiez les méthodes HTTP autorisées
            .allowedHeaders("*"); // Autoriser tous les en-têtes
    }
}