package com.luxury.ownership.dto;

import com.luxury.ownership.entity.OwnedVehicle;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OwnedVehicleResponse {
    private OwnedVehicle ownedVehicle;
    private VehicleDTO vehicleDetails;
}
