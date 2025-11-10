package com.luxury.appointment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dealership")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dealership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String address;
    
    @Column(length = 500)
    private String servicesOffered; // Comma-separated
    
    @Column(length = 200)
    private String operatingHours;
}
