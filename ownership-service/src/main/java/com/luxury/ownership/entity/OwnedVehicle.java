package com.luxury.ownership.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "owned_vehicle")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnedVehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private Long vehicleId; // Links to vehicle-catalog-service
    
    @Column(unique = true, length = 20)
    private String vin;
    
    @Column(nullable = false)
    private Integer currentMileage;
    
    @Column
    private Integer purchaseYear;
    
    @Column(length = 2000)
    private String serviceHistory; // JSON array as string
    
    @Column(length = 500)
    private String upcomingMaintenance;
    
    @Column(length = 100)
    private String warrantyStatus = "Active - 3 years remaining";
}
