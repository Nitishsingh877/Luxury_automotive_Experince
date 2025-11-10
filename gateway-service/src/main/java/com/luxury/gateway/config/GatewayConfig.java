package com.luxury.gateway.config;

import com.luxury.gateway.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration
public class GatewayConfig {
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("authentication-service", r -> r
                        .path("/api/auth/**")
                        .uri("lb://authentication-service"))
                .route("vehicle-catalog-service", r -> r
                        .path("/api/catalog/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter))
                        .uri("lb://vehicle-catalog-service"))
                .route("appointment-service", r -> r
                        .path("/api/appointments/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter))
                        .uri("lb://appointment-service"))
                .route("ownership-service", r -> r
                        .path("/api/ownership/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter))
                        .uri("lb://ownership-service"))
                .route("payment-service", r -> r
                        .path("/api/payments/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter))
                        .uri("lb://payment-service"))
                .build();
    }
}
