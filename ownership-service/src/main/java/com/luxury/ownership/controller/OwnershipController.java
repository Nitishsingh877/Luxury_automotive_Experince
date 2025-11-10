package com.luxury.ownership.controller;

import com.luxury.ownership.dto.DashboardResponse;
import com.luxury.ownership.dto.OwnedVehicleResponse;
import com.luxury.ownership.dto.VehicleListResponse;
import com.luxury.ownership.entity.OwnedVehicle;
import com.luxury.ownership.service.OwnershipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ownership")
@RequiredArgsConstructor
@Tag(name = "Ownership", description = "Vehicle Ownership API")
public class OwnershipController {
    
    private final OwnershipService ownershipService;
    
    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user's owned vehicles with details")
    public ResponseEntity<List<OwnedVehicleResponse>> getUserVehicles(@PathVariable Long userId) {
        return ResponseEntity.ok(ownershipService.getUserVehicles(userId));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get owned vehicle by ID with details")
    public ResponseEntity<OwnedVehicleResponse> getOwnedVehicleById(@PathVariable Long id) {
        return ResponseEntity.ok(ownershipService.getOwnedVehicleById(id));
    }
    
    @PostMapping
    @Operation(summary = "Add new owned vehicle")
    public ResponseEntity<OwnedVehicle> addVehicle(@RequestBody OwnedVehicle ownedVehicle) {
        return ResponseEntity.ok(ownershipService.addVehicle(ownedVehicle));
    }
    
    @PatchMapping("/{id}/mileage")
    @Operation(summary = "Update vehicle mileage")
    public ResponseEntity<OwnedVehicle> updateMileage(
            @PathVariable Long id, 
            @RequestParam Integer mileage) {
        return ResponseEntity.ok(ownershipService.updateMileage(id, mileage));
    }
    
    @GetMapping("/vehicles")
    @Operation(summary = "Get user's vehicle list for My Garage")
    public ResponseEntity<List<VehicleListResponse>> getVehiclesList(@RequestParam Long userId) {
        return ResponseEntity.ok(ownershipService.getVehiclesList(userId));
    }
    
    @GetMapping("/dashboard/{vin}")
    @Operation(summary = "Get dashboard data for specific vehicle")
    public ResponseEntity<DashboardResponse> getDashboard(@PathVariable String vin) {
        return ResponseEntity.ok(ownershipService.getDashboard(vin));
    }
}
