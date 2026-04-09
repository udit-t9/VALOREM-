package com.propshare.backend.service;

import com.propshare.backend.entity.Asset;
import com.propshare.backend.repository.AssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Asset getAssetById(Long id) {
        return assetRepository.findById(id).orElse(null);
    }

    public List<Asset> getByCategory(String category) {
        return assetRepository.findByCategory(category);
    }
}