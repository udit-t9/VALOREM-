package com.propshare.backend.repository;

import com.propshare.backend.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {

    List<Asset> findByCategory(String category);

}