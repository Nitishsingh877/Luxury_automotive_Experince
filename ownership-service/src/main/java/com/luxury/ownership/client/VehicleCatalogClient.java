package com.luxury.ownership.client;

import com.luxury.ownership.dto.VehicleDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "vehicle-catalog-service")
public interface VehicleCatalogClient {
    
    @GetMapping("/api/catalog/{id}")
    VehicleDTO getVehicleById(@PathVariable Long id);
}
