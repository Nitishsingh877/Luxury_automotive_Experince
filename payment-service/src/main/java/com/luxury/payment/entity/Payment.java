package com.luxury.payment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String razorpayOrderId;
    
    private String razorpayPaymentId;
    
    @Column(nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private Long appointmentId;
    
    @Column(nullable = false)
    private Double amount;
    
    @Column(nullable = false)
    private String currency = "INR";
    
    @Column(nullable = false)
    private String status = "CREATED";
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
