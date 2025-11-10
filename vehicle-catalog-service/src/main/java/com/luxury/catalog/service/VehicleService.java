package com.luxury.catalog.service;

import com.luxury.catalog.dto.PriceCalculationRequest;
import com.luxury.catalog.dto.PriceCalculationResponse;
import com.luxury.catalog.entity.Vehicle;
import com.luxury.catalog.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {
    
    private final VehicleRepository vehicleRepository;
    
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
    
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }
    
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
    
    public Vehicle updateVehicle(Long id, Vehicle vehicle) {
        Vehicle existing = getVehicleById(id);
        existing.setModelName(vehicle.getModelName());
        existing.setBasePrice(vehicle.getBasePrice());
        existing.setSpecs(vehicle.getSpecs());
        existing.setFeatures(vehicle.getFeatures());
        existing.setExteriorColors(vehicle.getExteriorColors());
        existing.setInteriorTrims(vehicle.getInteriorTrims());
        return vehicleRepository.save(existing);
    }
    
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
    
    public List<Vehicle> searchVehicles(String modelName) {
        return vehicleRepository.findByModelNameContainingIgnoreCase(modelName);
    }
    
    public List<Vehicle> filterByPriceRange(Double minPrice, Double maxPrice) {
        return vehicleRepository.findByPriceRange(minPrice, maxPrice);
    }
    
    public PriceCalculationResponse calculatePrice(PriceCalculationRequest request) {
        Vehicle vehicle = getVehicleById(request.getVehicleId());
        Double basePrice = vehicle.getBasePrice();
        
        // Simple pricing logic: $2000 per customization option
        Double customizationCost = 0.0;
        if (request.getExteriorColor() != null) customizationCost += 2000;
        if (request.getInteriorTrim() != null) customizationCost += 3000;
        if (request.getAdditionalFeatures() != null) {
            customizationCost += request.getAdditionalFeatures().size() * 1500;
        }
        
        Double totalPrice = basePrice + customizationCost;
        return new PriceCalculationResponse(basePrice, customizationCost, totalPrice);
    }
}
