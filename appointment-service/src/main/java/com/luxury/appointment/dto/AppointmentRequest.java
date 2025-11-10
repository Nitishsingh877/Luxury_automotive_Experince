package com.luxury.appointment.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AppointmentRequest {
    private Long userId;
    private Long dealershipId;
    private String serviceType;
    private LocalDateTime date;
}
