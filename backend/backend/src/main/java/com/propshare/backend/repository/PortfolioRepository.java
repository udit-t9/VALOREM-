package com.propshare.backend.repository;

import com.propshare.backend.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    Optional<Portfolio> findByAssetIdAndUserId(Long assetId, Long userId);

    List<Portfolio> findByUserId(Long userId);
}