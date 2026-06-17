package com.propshare.backend;

import com.propshare.backend.entity.Asset;
import com.propshare.backend.repository.AssetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(AssetRepository repository) {
        return args -> {

            // ✅ VERY IMPORTANT FIX
            if (repository.count() > 0) {
                return; // 🔥 STOP reloading data
            }

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("Dubai Marina Penthouse")
                    .subtitle("Dubai, UAE")
                    .priceEth(12.5)
                    .totalValue(1000000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(800)      // REMAINING TOKENS
                    .yield(14.2)
                    .change(4.5)
                    .owners(120)
                    .sales(32)
                    .image("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800")
                    .issuer("Gulf Real Estate Holdings")
                    .lockupPeriod("12 months")
                    .totalValuation(32500.0)
                    .description("Luxury penthouse in Dubai Marina")
                    .build());

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("Bali Soho Villa")
                    .subtitle("Bali, Indonesia")
                    .priceEth(8.3)
                    .totalValue(1870000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(1000)      // REMAINING TOKE
                    .yield(11.8)
                    .change(-2.1)
                    .owners(85)
                    .sales(18)
                    .image("https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800")
                    .issuer("Pacific Properties Ltd")
                    .lockupPeriod("6 months")
                    .totalValuation(21580.0)
                    .description("Beachfront villa")
                    .build());

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("NYC Manhattan Loft")
                    .subtitle("New York, USA")
                    .priceEth(15.7)
                    .totalValue(970000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(800)      // REMAINING TOKEN
                    .yield(9.3)
                    .change(6.8)
                    .owners(156)
                    .sales(45)
                    .image("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800")
                    .issuer("Manhattan Prime Realty")
                    .lockupPeriod("12 months")
                    .totalValuation(40820.0)
                    .description("Luxury loft")
                    .build());

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("London Kensington Flat")
                    .subtitle("London, UK")
                    .priceEth(9.2)
                    .totalValue(3400000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(1000)      // REMAINING TOKENS



                    .yield(8.1)
                    .change(1.3)
                    .owners(98)
                    .sales(22)
                    .image("https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800")
                    .issuer("UK Estates Group")
                    .lockupPeriod("12 months")
                    .totalValuation(23920.0)
                    .description("Premium flat")
                    .build());

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("Paris Champs-Élysées Building")
                    .subtitle("Paris, France")
                    .priceEth(18.9)
                    .totalValue(3000000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(1000)      // REMAINING TOKENS

                    .priceEth(1000.0) // optional (can remove later)

                    .yield(10.7)
                    .change(3.7)
                    .owners(142)
                    .sales(28)
                    .image("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800")
                    .issuer("European Classic Holdings")
                    .lockupPeriod("24 months")
                    .totalValuation(49140.0)
                    .description("Historic building")
                    .build());

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("Maldives Beach Resort")
                    .subtitle("Maldives")
                    .priceEth(22.4)
                    .totalValue(4500000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(1000)      // REMAINING TOKENS
                    .yield(15.6)
                    .change(8.2)
                    .owners(201)
                    .sales(51)
                    .image("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800")
                    .issuer("Luxury Beachfront Corp")
                    .lockupPeriod("18 months")
                    .totalValuation(58240.0)
                    .description("Luxury resort")
                    .build());

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("Monaco Estate")
                    .subtitle("Monaco")
                    .priceEth(28.3)
                    .totalValue(1000000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(800)      // REMAINING TOKENS
                    .yield(7.5)
                    .change(5.4)
                    .owners(178)
                    .sales(38)
                    .image("https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800")
                    .issuer("Riviera Luxury SA")
                    .lockupPeriod("24 months")
                    .totalValuation(73580.0)
                    .description("Clifftop villa")
                    .build());
            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("California Hills Mansion")
                    .subtitle("Los Angeles, USA")
                    .priceEth(18.2)
                    .totalValue(1000000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(800)      // REMAINING TOKENS
                    .yield(12.4)
                    .change(5.6)
                    .owners(140)
                    .sales(40)
                    .image("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800")
                    .issuer("West Coast Estates")
                    .lockupPeriod("12 months")
                    .totalValuation(47300.0)
                    .description("Modern hillside mansion")
                    .build());

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("Santorini Cliff Villa")
                    .subtitle("Santorini, Greece")
                    .priceEth(14.7)
                    .totalValue(1000000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(800)      // REMAINING TOKENS
                    .yield(10.2)
                    .change(3.9)
                    .owners(110)
                    .sales(28)
                    .image("https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800")
                    .issuer("Mediterranean Villas")
                    .lockupPeriod("10 months")
                    .totalValuation(38220.0)
                    .description("Ocean-view villa")
                    .build());

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("Tokyo Smart Apartment")
                    .subtitle("Tokyo, Japan")
                    .priceEth(9.5)
                    .totalValue(1000000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(800)      // REMAINING TOKENS
                    .yield(7.8)
                    .change(-1.2)
                    .owners(85)
                    .sales(22)
                    .image("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800")
                    .issuer("Asia Urban Living")
                    .lockupPeriod("8 months")
                    .totalValuation(24700.0)
                    .description("Compact smart apartment")
                    .build());

            repository.save(Asset.builder()
                    .category("Real Estate")
                    .title("Sydney Harbour House")
                    .subtitle("Sydney, Australia")
                    .priceEth(16.1)
                    .totalValue(1000000.0)     // FULL PROPERTY VALUE
                    .totalTokens(1000)         // TOTAL TOKENS
                    .availableTokens(1000)      // REMAINING TOKENS
                    .yield(11.1)
                    .change(4.2)
                    .owners(125)
                    .sales(34)
                    .image("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800")
                    .issuer("Aussie Prime Realty")
                    .lockupPeriod("11 months")
                    .totalValuation(41800.0)
                    .description("Luxury harbour home")
                    .build());

        };
    }
}