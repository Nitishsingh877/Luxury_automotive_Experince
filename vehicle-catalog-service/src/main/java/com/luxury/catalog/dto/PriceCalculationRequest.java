package com.luxury.catalog.dto;

import lombok.Data;
import java.util.List;

@Data
public class PriceCalculationRequest {
    private Long vehicleId;
    private String exteriorColor;
    private String interiorTrim;
    private List<String> additionalFeatures;
}
