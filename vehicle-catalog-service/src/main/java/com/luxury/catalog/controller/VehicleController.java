package com.luxury.catalog.controller;

import com.luxury.catalog.dto.PriceCalculationRequest;
import com.luxury.catalog.dto.PriceCalculationResponse;
import com.luxury.catalog.entity.Vehicle;
import com.luxury.catalog.service.VehicleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@RequiredArgsConstructor
@Tag(name = "Vehicle Catalog", description = "Vehicle Catalog API")
public class VehicleController {
    
    private final VehicleService vehicleService;
    
    @GetMapping
    @Operation(summary = "Get all vehicles")
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get vehicle by ID")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return ResponseEntity.ok(vehicleService.getVehicleById(id));
    }
    
    @PostMapping
    @Operation(summary = "Create new vehicle")
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleService.createVehicle(vehicle));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update vehicle")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleService.updateVehicle(id, vehicle));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete vehicle")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search vehicles by model name")
    public ResponseEntity<List<Vehicle>> searchVehicles(@RequestParam String modelName) {
        return ResponseEntity.ok(vehicleService.searchVehicles(modelName));
    }
    
    @GetMapping("/filter")
    @Operation(summary = "Filter vehicles by price range")
    public ResponseEntity<List<Vehicle>> filterByPrice(
            @RequestParam Double minPrice, 
            @RequestParam Double maxPrice) {
        return ResponseEntity.ok(vehicleService.filterByPriceRange(minPrice, maxPrice));
    }
    
    @PostMapping("/price")
    @Operation(summary = "Calculate dynamic pricing based on customization")
    public ResponseEntity<PriceCalculationResponse> calculatePrice(
            @RequestBody PriceCalculationRequest request) {
        return ResponseEntity.ok(vehicleService.calculatePrice(request));
    }
}
