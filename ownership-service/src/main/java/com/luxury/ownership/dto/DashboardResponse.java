package com.luxury.ownership.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private String vin;
    private Integer mileage;
    private String warrantyStatus;
    private String nextServiceDue;
    private Integer serviceProgress;
    private List<AppointmentDTO> upcomingAppointments;
    private List<ServiceHistoryDTO> serviceHistory;
    private List<AlertDTO> alerts;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AppointmentDTO {
        private String serviceType;
        private String date;
        private String time;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServiceHistoryDTO {
        private String serviceType;
        private String date;
        private String location;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AlertDTO {
        private String type;
        private String title;
        private String message;
    }
}
