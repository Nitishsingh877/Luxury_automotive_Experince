package com.luxury.ownership.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleListResponse {
    private String vin;
    private String model;
    private Integer year;
    private String imageUrl;
}
