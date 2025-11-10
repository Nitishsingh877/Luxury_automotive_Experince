package com.luxury.reporting.listener;

import com.luxury.reporting.dto.AppointmentNotification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AppointmentNotificationListener {
    
    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void handleAppointmentNotification(AppointmentNotification notification) {
        log.info("========================================");
        log.info("Received Appointment Notification:");
        log.info("Appointment ID: {}", notification.getAppointmentId());
        log.info("User ID: {}", notification.getUserId());
        log.info("Dealership ID: {}", notification.getDealershipId());
        log.info("Service Type: {}", notification.getServiceType());
        log.info("Date: {}", notification.getDate());
        log.info("Status: {}", notification.getStatus());
        log.info("========================================");
        
        // Additional processing logic can be added here
        // e.g., send email, SMS, update analytics, etc.
    }
}
