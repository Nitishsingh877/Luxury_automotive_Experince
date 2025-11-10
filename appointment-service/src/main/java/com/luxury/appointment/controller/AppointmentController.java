package com.luxury.appointment.controller;

import com.luxury.appointment.dto.AppointmentRequest;
import com.luxury.appointment.entity.Appointment;
import com.luxury.appointment.entity.Dealership;
import com.luxury.appointment.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@Tag(name = "Appointments", description = "Appointment Management API")
public class AppointmentController {
    
    private final AppointmentService appointmentService;
    
    @GetMapping("/dealerships")
    @Operation(summary = "Get all dealerships")
    public ResponseEntity<List<Dealership>> getAllDealerships() {
        return ResponseEntity.ok(appointmentService.getAllDealerships());
    }
    
    @GetMapping("/dealerships/{id}")
    @Operation(summary = "Get dealership by ID")
    public ResponseEntity<Dealership> getDealershipById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getDealershipById(id));
    }
    
    @GetMapping("/dealerships/search")
    @Operation(summary = "Search dealerships by location")
    public ResponseEntity<List<Dealership>> searchDealerships(@RequestParam String location) {
        return ResponseEntity.ok(appointmentService.searchDealerships(location));
    }
    
    @PostMapping
    @Operation(summary = "Book new appointment")
    public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.bookAppointment(request));
    }
    
    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user appointments")
    public ResponseEntity<List<Appointment>> getUserAppointments(@PathVariable Long userId) {
        return ResponseEntity.ok(appointmentService.getUserAppointments(userId));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get appointment by ID")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }
}
