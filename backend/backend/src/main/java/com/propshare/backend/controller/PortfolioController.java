package com.propshare.backend.controller;

import com.propshare.backend.entity.Portfolio;
import com.propshare.backend.repository.PortfolioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {

    private final PortfolioRepository portfolioRepository;

    public PortfolioController(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    @GetMapping
    public List<Portfolio> getPortfolio() {
        return portfolioRepository.findByUserId(1L);
    }
}