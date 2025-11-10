package com.luxury.ownership.dto;

import lombok.Data;

@Data
public class VehicleDTO {
    private Long id;
    private String modelName;
    private Double basePrice;
    private String specs;
    private String features;
    private String exteriorColors;
    private String interiorTrims;
}
