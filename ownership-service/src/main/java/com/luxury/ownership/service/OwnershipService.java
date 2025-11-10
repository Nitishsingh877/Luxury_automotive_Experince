package com.luxury.ownership.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luxury.ownership.client.VehicleCatalogClient;
import com.luxury.ownership.dto.DashboardResponse;
import com.luxury.ownership.dto.OwnedVehicleResponse;
import com.luxury.ownership.dto.VehicleDTO;
import com.luxury.ownership.dto.VehicleListResponse;
import com.luxury.ownership.entity.OwnedVehicle;
import com.luxury.ownership.repository.OwnedVehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OwnershipService {
    
    private final OwnedVehicleRepository ownedVehicleRepository;
    private final VehicleCatalogClient vehicleCatalogClient;
    
    public List<OwnedVehicleResponse> getUserVehicles(Long userId) {
        List<OwnedVehicle> ownedVehicles = ownedVehicleRepository.findByUserId(userId);
        
        return ownedVehicles.stream()
                .map(ownedVehicle -> {
                    VehicleDTO vehicleDetails = vehicleCatalogClient.getVehicleById(ownedVehicle.getVehicleId());
                    return new OwnedVehicleResponse(ownedVehicle, vehicleDetails);
                })
                .collect(Collectors.toList());
    }
    
    public OwnedVehicleResponse getOwnedVehicleById(Long id) {
        OwnedVehicle ownedVehicle = ownedVehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Owned vehicle not found"));
        
        VehicleDTO vehicleDetails = vehicleCatalogClient.getVehicleById(ownedVehicle.getVehicleId());
        return new OwnedVehicleResponse(ownedVehicle, vehicleDetails);
    }
    
    public OwnedVehicle addVehicle(OwnedVehicle ownedVehicle) {
        return ownedVehicleRepository.save(ownedVehicle);
    }
    
    public OwnedVehicle updateMileage(Long id, Integer mileage) {
        OwnedVehicle ownedVehicle = ownedVehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Owned vehicle not found"));
        ownedVehicle.setCurrentMileage(mileage);
        return ownedVehicleRepository.save(ownedVehicle);
    }
    
    public List<VehicleListResponse> getVehiclesList(Long userId) {
        List<OwnedVehicle> ownedVehicles = ownedVehicleRepository.findByUserId(userId);
        List<VehicleListResponse> result = new ArrayList<>();
        for (OwnedVehicle ov : ownedVehicles) {
            try {
                VehicleDTO vehicle = vehicleCatalogClient.getVehicleById(ov.getVehicleId());
                result.add(new VehicleListResponse(
                    ov.getVin(),
                    vehicle.getModelName(),
                    ov.getPurchaseYear(),
                    getVehicleImage(ov.getVehicleId())
                ));
            } catch (Exception e) {
                System.err.println("Error fetching vehicle details for vehicleId: " + ov.getVehicleId());
                e.printStackTrace();
            }
        }
        return result;
    }
    
    public DashboardResponse getDashboard(String vin) {
        OwnedVehicle vehicle = ownedVehicleRepository.findByVin(vin);
        if (vehicle == null) {
            throw new RuntimeException("Vehicle not found with VIN: " + vin);
        }
        
        DashboardResponse response = new DashboardResponse();
        response.setVin(vehicle.getVin());
        response.setMileage(vehicle.getCurrentMileage());
        response.setWarrantyStatus(vehicle.getWarrantyStatus());
        response.setNextServiceDue(vehicle.getUpcomingMaintenance());
        response.setServiceProgress(calculateServiceProgress(vehicle.getCurrentMileage()));
        response.setUpcomingAppointments(parseUpcomingAppointments());
        response.setServiceHistory(parseServiceHistory(vehicle.getServiceHistory()));
        response.setAlerts(generateAlerts(vehicle));
        
        return response;
    }
    
    private Integer calculateServiceProgress(Integer mileage) {
        int nextService = 20000;
        return Math.min(100, (mileage * 100) / nextService);
    }
    
    private List<DashboardResponse.AppointmentDTO> parseUpcomingAppointments() {
        List<DashboardResponse.AppointmentDTO> appointments = new ArrayList<>();
        appointments.add(new DashboardResponse.AppointmentDTO("Oil Change", "2025-01-15", "10:00 AM"));
        appointments.add(new DashboardResponse.AppointmentDTO("Software Update", "2025-01-22", "2:30 PM"));
        return appointments;
    }
    
    private List<DashboardResponse.ServiceHistoryDTO> parseServiceHistory(String serviceHistoryJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<Map<String, Object>> history = mapper.readValue(serviceHistoryJson, new TypeReference<List<Map<String, Object>>>(){});
            return history.stream()
                    .map(h -> new DashboardResponse.ServiceHistoryDTO(
                        (String) h.get("service"),
                        (String) h.get("date"),
                        (String) h.get("location")
                    ))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    private List<DashboardResponse.AlertDTO> generateAlerts(OwnedVehicle vehicle) {
        List<DashboardResponse.AlertDTO> alerts = new ArrayList<>();
        if (vehicle.getCurrentMileage() > 15000) {
            alerts.add(new DashboardResponse.AlertDTO("warning", "Service Due Soon", "Your vehicle is approaching the next service interval"));
        }
        return alerts;
    }
    
    private String getVehicleImage(Long vehicleId) {
        if (vehicleId == 1) return "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800";
        if (vehicleId == 2) return "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800";
        return "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800";
    }
}
