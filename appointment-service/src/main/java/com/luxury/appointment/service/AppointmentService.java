package com.luxury.appointment.service;

import com.luxury.appointment.dto.AppointmentNotification;
import com.luxury.appointment.dto.AppointmentRequest;
import com.luxury.appointment.entity.Appointment;
import com.luxury.appointment.entity.Dealership;
import com.luxury.appointment.repository.AppointmentRepository;
import com.luxury.appointment.repository.DealershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    
    private final AppointmentRepository appointmentRepository;
    private final DealershipRepository dealershipRepository;
    private final RabbitTemplate rabbitTemplate;
    
    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;
    
    @Value("${rabbitmq.routing.key}")
    private String routingKey;
    
    public List<Dealership> getAllDealerships() {
        return dealershipRepository.findAll();
    }
    
    public Dealership getDealershipById(Long id) {
        return dealershipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dealership not found"));
    }
    
    public List<Dealership> searchDealerships(String location) {
        return dealershipRepository.findByAddressContainingIgnoreCase(location);
    }
    
    public Appointment bookAppointment(AppointmentRequest request) {
        Appointment appointment = new Appointment();
        appointment.setUserId(request.getUserId());
        appointment.setDealershipId(request.getDealershipId());
        appointment.setServiceType(request.getServiceType());
        appointment.setDate(request.getDate());
        appointment.setStatus("CONFIRMED");
        
        appointment = appointmentRepository.save(appointment);
        
        // Send notification via RabbitMQ
        AppointmentNotification notification = new AppointmentNotification(
                appointment.getId(),
                appointment.getUserId(),
                appointment.getDealershipId(),
                appointment.getServiceType(),
                appointment.getDate(),
                appointment.getStatus()
        );
        
        rabbitTemplate.convertAndSend(exchangeName, routingKey, notification);
        
        return appointment;
    }
    
    public List<Appointment> getUserAppointments(Long userId) {
        return appointmentRepository.findByUserId(userId);
    }
    
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }
}
