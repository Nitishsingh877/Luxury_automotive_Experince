package com.luxury.catalog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicle")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String modelName;
    
    @Column(nullable = false)
    private Double basePrice;
    
    @Column(length = 1000)
    private String specs;
    
    @Column(length = 1000)
    private String features;
    
    @Column(length = 500)
    private String exteriorColors; // JSON array as string
    
    @Column(length = 500)
    private String interiorTrims; // JSON array as string
}
