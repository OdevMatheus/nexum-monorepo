package com.matheushenrique.nexum.dtos.request;

import com.matheushenrique.nexum.security.validators.ValidEmail;
import com.matheushenrique.nexum.security.validators.ValidPassword;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank(message = "Name is required")
        @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
        String name,

        @NotBlank(message = "Email is required")
        @ValidEmail(message = "Invalid email address")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        @ValidPassword
        String password

) {}