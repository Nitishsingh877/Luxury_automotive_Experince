package com.luxury.auth.controller;

import com.luxury.auth.dto.PasswordChangeRequest;
import com.luxury.auth.dto.ProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/profile")
@Tag(name = "Profile", description = "User Profile API")
public class ProfileController {
    
    @GetMapping
    @Operation(summary = "Get user profile")
    public ResponseEntity<ProfileResponse> getProfile() {
        ProfileResponse profile = new ProfileResponse(
            "John",
            "Doe",
            "john.doe@example.com",
            "(555) 123-4567",
            "123 Main Street",
            "Los Angeles",
            "CA",
            "90001"
        );
        return ResponseEntity.ok(profile);
    }
    
    @PutMapping
    @Operation(summary = "Update user profile")
    public ResponseEntity<ProfileResponse> updateProfile(@RequestBody ProfileResponse request) {
        return ResponseEntity.ok(request);
    }
    
    @PutMapping("/password")
    @Operation(summary = "Change password")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeRequest request) {
        return ResponseEntity.ok("Password updated successfully");
    }
}
