package com.propshare.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String title;
    private String subtitle;

    private Double priceEth;
    private Double volumeEth;
    private Double yield;
    private Double change;

    private Integer owners;
    private Integer sales;

    private String image;

    private String issuer;
    private String lockupPeriod;

    private Double totalValuation;
    private Double totalValue;
    private Integer totalTokens;
    private Integer availableTokens;
    @Column(length = 1000)
    private String description;
}