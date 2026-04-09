package com.propshare.backend.controller;

import com.propshare.backend.entity.Asset;
import com.propshare.backend.service.AssetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:5173")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    //  GET ALL
    @GetMapping
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }

    //  GET BY ID
    @GetMapping("/{id}")
    public Asset getAssetById(@PathVariable Long id) {
        return assetService.getAssetById(id);
    }

    //  GET BY CATEGORY
    @GetMapping("/category/{category}")
    public List<Asset> getByCategory(@PathVariable String category) {
        return assetService.getByCategory(category);
    }
}