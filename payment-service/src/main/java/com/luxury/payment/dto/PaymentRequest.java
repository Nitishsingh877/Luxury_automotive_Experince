package com.luxury.payment.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long userId;
    private Long appointmentId;
    private Double amount;
}
