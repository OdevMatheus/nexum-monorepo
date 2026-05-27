package com.matheushenrique.nexum.dtos.response;

import com.matheushenrique.nexum.entities.Client;

import java.time.Instant;
import java.util.UUID;

public record ClientResponse(
        UUID id,
        String name,
        String email,
        String phone,
        String document,
        boolean active,
        Instant createdAt,
        Instant updatedAt
) {
    public static ClientResponse from(Client client) {
        return new ClientResponse(
                client.getId(),
                client.getName(),
                client.getEmail(),
                client.getPhone(),
                client.getDocument(),
                client.isActive(),
                client.getCreatedAt(),
                client.getUpdatedAt()
        );
    }
}