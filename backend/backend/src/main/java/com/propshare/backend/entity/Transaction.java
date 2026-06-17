package com.propshare.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assetId;

    private int quantity;

    private double pricePerToken;

    private double totalAmount;

    private String type; // BUY / SELL

    private LocalDateTime createdAt;
}