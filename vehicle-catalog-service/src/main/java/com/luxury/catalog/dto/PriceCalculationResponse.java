package com.luxury.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PriceCalculationResponse {
    private Double basePrice;
    private Double customizationCost;
    private Double totalPrice;
}
