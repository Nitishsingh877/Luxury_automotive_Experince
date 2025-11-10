package com.luxury.payment.service;

import com.luxury.payment.dto.PaymentRequest;
import com.luxury.payment.dto.PaymentVerificationRequest;
import com.luxury.payment.entity.Payment;
import com.luxury.payment.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {
    
    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;
    
    public Payment createOrder(PaymentRequest request) throws Exception {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", request.getAmount() * 100); // Amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt_" + System.currentTimeMillis());
        
        Order order = razorpayClient.orders.create(orderRequest);
        
        Payment payment = new Payment();
        payment.setRazorpayOrderId(order.get("id"));
        payment.setUserId(request.getUserId());
        payment.setAppointmentId(request.getAppointmentId());
        payment.setAmount(request.getAmount());
        payment.setCurrency("INR");
        payment.setStatus("CREATED");
        
        return paymentRepository.save(payment);
    }
    
    public Payment verifyPayment(PaymentVerificationRequest request) throws Exception {
        Payment payment = paymentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", request.getRazorpayOrderId());
        options.put("razorpay_payment_id", request.getRazorpayPaymentId());
        options.put("razorpay_signature", request.getRazorpaySignature());
        
        boolean isValid = Utils.verifyPaymentSignature(options, String.valueOf(razorpayClient.getClass()));
        
        if (isValid) {
            payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
            payment.setStatus("SUCCESS");
        } else {
            payment.setStatus("FAILED");
        }
        
        return paymentRepository.save(payment);
    }
    
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}
