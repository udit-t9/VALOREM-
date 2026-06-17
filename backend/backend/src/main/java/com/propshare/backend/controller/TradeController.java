package com.propshare.backend.controller;

import com.propshare.backend.entity.Transaction;
import com.propshare.backend.service.TradeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trade")
@CrossOrigin(origins = "http://localhost:5173")
public class TradeController {

    private final TradeService tradeService;

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    // ✅ BUY TOKENS
    @PostMapping("/buy")
    public ResponseEntity<?> buy(
            @RequestParam Long assetId,
            @RequestParam int quantity
    ) {
        try {
            Transaction tx = tradeService.buy(assetId, quantity);
            return ResponseEntity.ok(tx);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/sell")
    public ResponseEntity<?> sell(
            @RequestParam Long assetId,
            @RequestParam int quantity
    ) {
        try {
            return ResponseEntity.ok(tradeService.sell(assetId, quantity));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}