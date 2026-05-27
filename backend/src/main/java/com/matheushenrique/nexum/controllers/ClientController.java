package com.matheushenrique.nexum.controllers;

import com.matheushenrique.nexum.dtos.request.CreateClientRequest;
import com.matheushenrique.nexum.dtos.request.UpdateClientRequest;
import com.matheushenrique.nexum.dtos.response.ClientResponse;
import com.matheushenrique.nexum.dtos.response.MessageResponse;
import com.matheushenrique.nexum.dtos.response.PageResponse;
import com.matheushenrique.nexum.services.impl.ClientServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientServiceImpl clientService;

    @GetMapping
    public ResponseEntity<PageResponse<ClientResponse>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(clientService.findAll(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(clientService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ClientResponse> create(@Valid @RequestBody CreateClientRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateClientRequest request
    ) {
        return ResponseEntity.ok(clientService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deactivate(@PathVariable UUID id) {
        return ResponseEntity.ok(clientService.deactivate(id));
    }
}