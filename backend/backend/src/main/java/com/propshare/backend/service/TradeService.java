package com.propshare.backend.service;

import com.propshare.backend.entity.Asset;
import com.propshare.backend.entity.Transaction;
import com.propshare.backend.entity.Portfolio;
import com.propshare.backend.repository.AssetRepository;
import com.propshare.backend.repository.TransactionRepository;
import com.propshare.backend.repository.PortfolioRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TradeService {

    private final AssetRepository assetRepository;
    private final TransactionRepository transactionRepository;
    private final PortfolioRepository portfolioRepository;

    public TradeService(AssetRepository assetRepository,
                        TransactionRepository transactionRepository,
                        PortfolioRepository portfolioRepository) {
        this.assetRepository = assetRepository;
        this.transactionRepository = transactionRepository;
        this.portfolioRepository = portfolioRepository;
    }

    public Transaction buy(Long assetId, int quantity) {

        // ✅ 1. FETCH ASSET
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        // ✅ 2. CHECK TOKEN AVAILABILITY
        if (asset.getAvailableTokens() < quantity) {
            throw new RuntimeException("Not enough tokens available");
        }

        // ✅ 3. CALCULATE PRICE PER TOKEN
        double pricePerToken = asset.getTotalValue() / asset.getTotalTokens();

        // ✅ 4. TOTAL COST
        double total = quantity * pricePerToken;

        // ✅ 5. UPDATE AVAILABLE TOKENS
        asset.setAvailableTokens(asset.getAvailableTokens() - quantity);
        assetRepository.save(asset);

        // ✅ 6. SAVE TRANSACTION
        Transaction tx = Transaction.builder()
                .assetId(assetId)
                .quantity(quantity)
                .pricePerToken(pricePerToken)
                .totalAmount(total)
                .type("BUY")
                .createdAt(LocalDateTime.now())
                .build();

        transactionRepository.save(tx);

        // 🔥 7. UPDATE PORTFOLIO (VERY IMPORTANT)
        Long userId = 1L; // hackathon simplification

        Optional<Portfolio> existing = portfolioRepository
                .findByAssetIdAndUserId(assetId, userId);

        if (existing.isPresent()) {
            Portfolio p = existing.get();
            p.setTokensOwned(p.getTokensOwned() + quantity);
            portfolioRepository.save(p);
        } else {
            Portfolio p = Portfolio.builder()
                    .assetId(assetId)
                    .tokensOwned(quantity)
                    .userId(userId)
                    .build();
            portfolioRepository.save(p);
        }

        return tx;
    }

    public Transaction sell(Long assetId, int quantity) {

        Long userId = 1L;

        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        Portfolio portfolio = portfolioRepository
                .findByAssetIdAndUserId(assetId, userId)
                .orElseThrow(() -> new RuntimeException("No tokens owned"));

        // ❌ CHECK IF USER HAS ENOUGH TOKENS
        if (portfolio.getTokensOwned() < quantity) {
            throw new RuntimeException("Not enough tokens to sell");
        }

        double pricePerToken = asset.getTotalValue() / asset.getTotalTokens();
        double total = quantity * pricePerToken;

        // ✅ INCREASE AVAILABLE TOKENS
        asset.setAvailableTokens(asset.getAvailableTokens() + quantity);
        assetRepository.save(asset);

        // ✅ UPDATE PORTFOLIO
        portfolio.setTokensOwned(portfolio.getTokensOwned() - quantity);
        portfolioRepository.save(portfolio);

        // ✅ SAVE TRANSACTION
        Transaction tx = Transaction.builder()
                .assetId(assetId)
                .quantity(quantity)
                .pricePerToken(pricePerToken)
                .totalAmount(total)
                .type("SELL")
                .createdAt(LocalDateTime.now())
                .build();

        return transactionRepository.save(tx);
    }
}