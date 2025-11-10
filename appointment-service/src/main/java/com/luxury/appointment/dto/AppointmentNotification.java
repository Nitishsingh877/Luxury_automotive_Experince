package com.luxury.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentNotification {
    private Long appointmentId;
    private Long userId;
    private Long dealershipId;
    private String serviceType;
    private LocalDateTime date;
    private String status;
}
