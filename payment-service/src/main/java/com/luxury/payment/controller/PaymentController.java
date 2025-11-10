package com.luxury.payment.controller;

import com.luxury.payment.dto.PaymentRequest;
import com.luxury.payment.dto.PaymentVerificationRequest;
import com.luxury.payment.entity.Payment;
import com.luxury.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Tag(name = "Payments", description = "Payment API with Razorpay")
public class PaymentController {
    
    private final PaymentService paymentService;
    
    @PostMapping("/create-order")
    @Operation(summary = "Create Razorpay order for appointment deposit")
    public ResponseEntity<Payment> createOrder(@RequestBody PaymentRequest request) throws Exception {
        return ResponseEntity.ok(paymentService.createOrder(request));
    }
    
    @PostMapping("/verify")
    @Operation(summary = "Verify Razorpay payment")
    public ResponseEntity<Payment> verifyPayment(@RequestBody PaymentVerificationRequest request) throws Exception {
        return ResponseEntity.ok(paymentService.verifyPayment(request));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get payment by ID")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }
}
