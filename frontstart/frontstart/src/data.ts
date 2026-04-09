// ─── Types ──────────────────────────────────────────────────────────────────

export type View = 'home' | 'marketplace' | 'asset_details' | 'portfolio' | 'issuer_portal';
export type Category = 'real-estate' | 'fine-art' | 'automotive' | 'gaming' | 'invoices';

export interface Asset {
  id: string;
  category: Category;
  title: string;
  collection: string;
  subtitle: string;
  priceEth: number;
  volumeEth: number;
  yield: number;
  change: number;
  sales: number;
  owners: number;
  image: string;
  type?: string;       // Villa, Flat, Building, Resort, Penthouse, Motorcycle, Classic Car, Corporate Invoice...
  description?: string;
  issuer?: string;
  lockupPeriod?: string;
  totalValuation?: number;
}

export interface PortfolioHolding {
  asset: Asset;
  tokensOwned: number;
  avgBuyPrice: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
}

export interface Payout {
  assetTitle: string;
  type: string;
  amount: number;
  date: string;
}

// ─── Price History Generator ─────────────────────────────────────────────────

export const generatePriceHistory = (basePrice: number, months: number = 12) => {
  const data = [];
  let price = basePrice * 0.7;
  for (let i = 0; i < months; i++) {
    price += (Math.random() - 0.35) * basePrice * 0.08;
    price = Math.max(price, basePrice * 0.3);
    data.push({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i % 12],
      price: parseFloat(price.toFixed(4)),
    });
  }
  // Ensure last point is near current price
  data[data.length - 1].price = basePrice;
  return data;
};

// ─── Mock Assets ─────────────────────────────────────────────────────────────

export const ALL_ASSETS: Asset[] = [
  // ── Real Estate ──
  { id: 're-1', category: 'real-estate', title: 'Dubai Marina Penthouse', collection: 'GULF LUXURY', subtitle: 'Dubai, UAE', priceEth: 12.5, volumeEth: 420, yield: 14.2, change: 4.5, sales: 32, owners: 120, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', type: 'Penthouse', issuer: 'Gulf Real Estate Holdings', lockupPeriod: '12 months', totalValuation: 32500, description: 'Luxury penthouse in Dubai Marina with panoramic views of the Arabian Gulf.' },
  { id: 're-2', category: 'real-estate', title: 'Bali Soho Villa', collection: 'PACIFIC PROPERTIES', subtitle: 'Bali, Indonesia', priceEth: 8.3, volumeEth: 285, yield: 11.8, change: -2.1, sales: 18, owners: 85, image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800', type: 'Villa', issuer: 'Pacific Properties Ltd', lockupPeriod: '6 months', totalValuation: 21580, description: 'Premium beachfront villa with infinity pool and tropical gardens.' },
  { id: 're-3', category: 'real-estate', title: 'NYC Manhattan Loft', collection: 'MANHATTAN PRIME', subtitle: 'New York, USA', priceEth: 15.7, volumeEth: 520, yield: 9.3, change: 6.8, sales: 45, owners: 156, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', type: 'Flat', issuer: 'Manhattan Prime Realty', lockupPeriod: '12 months', totalValuation: 40820, description: 'Industrial-chic loft in SoHo with exposed brick and skyline views.' },
  { id: 're-4', category: 'real-estate', title: 'London Kensington Flat', collection: 'UK ESTATES', subtitle: 'London, UK', priceEth: 9.2, volumeEth: 310, yield: 8.1, change: 1.3, sales: 22, owners: 98, image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800', type: 'Flat', issuer: 'UK Estates Group', lockupPeriod: '12 months', totalValuation: 23920, description: 'Georgian-era flat in prestigious Kensington neighborhood.' },
  { id: 're-5', category: 'real-estate', title: 'Paris Champs-Élysées', collection: 'EUROPEAN CLASSIC', subtitle: 'Paris, France', priceEth: 18.9, volumeEth: 645, yield: 10.7, change: 3.7, sales: 28, owners: 142, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800', type: 'Building', issuer: 'European Classic Holdings', lockupPeriod: '24 months', totalValuation: 49140, description: 'Historic Haussmann building on the world-famous Champs-Élysées.' },
  { id: 're-6', category: 'real-estate', title: 'Maldives Beach Resort', collection: 'LUXURY BEACHFRONT', subtitle: 'Maldives', priceEth: 22.4, volumeEth: 780, yield: 15.6, change: 8.2, sales: 51, owners: 201, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', type: 'Resort', issuer: 'Luxury Beachfront Corp', lockupPeriod: '18 months', totalValuation: 58240, description: 'Overwater bungalow resort with private lagoon access.' },
  { id: 're-7', category: 'real-estate', title: 'Monaco Estate', collection: 'RIVIERA LUXURY', subtitle: 'Monaco', priceEth: 28.3, volumeEth: 920, yield: 7.5, change: 5.4, sales: 38, owners: 178, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800', type: 'Villa', issuer: 'Riviera Luxury SA', lockupPeriod: '24 months', totalValuation: 73580, description: 'Clifftop villa overlooking the Mediterranean with private helipad.' },

  // ── Fine Art ──
  { id: 'art-1', category: 'fine-art', title: 'Basquiat Fragment #4', collection: 'NEO-EXPRESSIONISM', subtitle: 'Jean-Michel Basquiat, 1982', priceEth: 42.5, volumeEth: 445, yield: 8.5, change: 12.3, sales: 8, owners: 45, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800', type: 'Oil', issuer: 'Blue Chip Art Vault', lockupPeriod: '36 months', totalValuation: 110500, description: 'Authenticated fragment from Basquiat\'s seminal 1982 collection.' },
  { id: 'art-2', category: 'fine-art', title: 'Warhol Marilyn Print', collection: 'POP ART ICONS', subtitle: 'Andy Warhol, 1967', priceEth: 63.0, volumeEth: 527, yield: 6.3, change: 8.7, sales: 12, owners: 68, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', type: 'Digital', issuer: 'Pop Art Vault LLC', lockupPeriod: '24 months', totalValuation: 163800, description: 'Original screen print from Warhol\'s iconic Marilyn Monroe series.' },
  { id: 'art-3', category: 'fine-art', title: 'Banksy Street Piece', collection: 'STREET ART', subtitle: 'Banksy, 2015', priceEth: 29.1, volumeEth: 260, yield: 15.6, change: 15.6, sales: 22, owners: 92, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', type: 'Mixed Media', issuer: 'Street Art Collective', lockupPeriod: '12 months', totalValuation: 75660, description: 'Authenticated Banksy piece from the London series.' },
  { id: 'art-4', category: 'fine-art', title: 'Picasso Blue Study', collection: 'MODERNIST LEGENDS', subtitle: 'Pablo Picasso, 1903', priceEth: 150.0, volumeEth: 1005, yield: 5.4, change: 9.2, sales: 4, owners: 32, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', type: 'Oil', issuer: 'Modernist Legends Fund', lockupPeriod: '60 months', totalValuation: 390000, description: 'Rare study from Picasso\'s legendary Blue Period.' },
  { id: 'art-5', category: 'fine-art', title: 'Monet Water Lilies', collection: 'IMPRESSIONIST', subtitle: 'Claude Monet, 1906', priceEth: 128.3, volumeEth: 826, yield: 4.8, change: 4.8, sales: 3, owners: 28, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', type: 'Oil', issuer: 'Impressionist Heritage Trust', lockupPeriod: '48 months', totalValuation: 333580, description: 'Fragment from Monet\'s iconic Water Lilies series at Giverny.' },
  { id: 'art-6', category: 'fine-art', title: 'Kusama Infinity Dots', collection: 'CONTEMPORARY ICONS', subtitle: 'Yayoi Kusama, 2019', priceEth: 52.6, volumeEth: 278, yield: 11.9, change: -3.2, sales: 9, owners: 52, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800', type: 'Mixed Media', issuer: 'Contemporary Art Fund', lockupPeriod: '18 months', totalValuation: 136760, description: 'Large-scale installation piece from Kusama\'s Infinity series.' },

  // ── Automotive & Motorcycles ──
  { id: 'auto-1', category: 'automotive', title: '1962 Ferrari 250 GTO', collection: 'PRANCING HORSE', subtitle: 'Maranello, Italy', priceEth: 185.0, volumeEth: 1250, yield: 3.2, change: 7.8, sales: 2, owners: 18, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', type: 'Classic Car', issuer: 'Heritage Motors Trust', lockupPeriod: '60 months', totalValuation: 481000, description: 'One of 36 ever made. Pebble Beach concours winner with full provenance.' },
  { id: 'auto-2', category: 'automotive', title: 'Porsche 911 GT3 RS', collection: 'GERMAN PRECISION', subtitle: 'Stuttgart, Germany', priceEth: 12.8, volumeEth: 340, yield: 8.5, change: 5.2, sales: 28, owners: 95, image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800', type: 'Classic Car', issuer: 'German Auto Vault', lockupPeriod: '12 months', totalValuation: 33280, description: 'Track-focused 992 GT3 RS with Weissach package in Shark Blue.' },
  { id: 'auto-3', category: 'automotive', title: 'Custom Café Racer', collection: 'BESPOKE BUILDS', subtitle: 'Brooklyn, USA', priceEth: 3.8, volumeEth: 120, yield: 12.4, change: 11.5, sales: 42, owners: 180, image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', type: 'Motorcycle', issuer: 'Bespoke Moto Co', lockupPeriod: '6 months', totalValuation: 9880, description: 'Hand-built café racer on a vintage Triumph Bonneville platform.' },
  { id: 'auto-4', category: 'automotive', title: 'Ducati Panigale V4 R', collection: 'ITALIAN SUPERBIKES', subtitle: 'Bologna, Italy', priceEth: 5.2, volumeEth: 168, yield: 9.8, change: 6.3, sales: 35, owners: 145, image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800', type: 'Motorcycle', issuer: 'Italian Motors Fund', lockupPeriod: '12 months', totalValuation: 13520, description: 'Race-homologated Panigale V4 R with full Akrapovič exhaust system.' },
  { id: 'auto-5', category: 'automotive', title: 'McLaren P1 GTR', collection: 'HYPERCAR VAULT', subtitle: 'Woking, UK', priceEth: 95.0, volumeEth: 680, yield: 4.1, change: 9.4, sales: 5, owners: 24, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800', type: 'Classic Car', issuer: 'Hypercar Vault Ltd', lockupPeriod: '36 months', totalValuation: 247000, description: 'Track-only McLaren P1 GTR in Gulf livery, 1 of 58 produced.' },

  // ── Gaming ──
  { id: 'game-1', category: 'gaming', title: 'Seoul eSports Arena', collection: 'ASIA ESPORTS', subtitle: 'Seoul, South Korea', priceEth: 18.5, volumeEth: 520, yield: 18.2, change: 14.2, sales: 38, owners: 165, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', type: 'Villa', issuer: 'Asia eSports Holdings', lockupPeriod: '12 months', totalValuation: 48100, description: '500-seat competitive arena hosting League of Legends and Valorant tournaments.' },
  { id: 'game-2', category: 'gaming', title: 'LA Streaming Studio', collection: 'CONTENT HUBS', subtitle: 'Los Angeles, USA', priceEth: 7.2, volumeEth: 245, yield: 22.5, change: 18.7, sales: 52, owners: 220, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800', type: 'Building', issuer: 'Content Hub Ventures', lockupPeriod: '6 months', totalValuation: 18720, description: 'State-of-the-art streaming facility with 12 individual production rooms.' },
  { id: 'game-3', category: 'gaming', title: 'Tokyo Gaming Lounge', collection: 'NIPPON GAMING', subtitle: 'Akihabara, Tokyo', priceEth: 11.4, volumeEth: 380, yield: 16.8, change: 10.5, sales: 44, owners: 190, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', type: 'Building', issuer: 'Nippon Gaming Corp', lockupPeriod: '12 months', totalValuation: 29640, description: 'Premium gaming lounge in Akihabara with 200 high-end gaming stations.' },

  // ── Invoice Bills ──
  { id: 'inv-1', category: 'invoices', title: 'Tech Corp $50k Net-60', collection: 'TECH INVOICES', subtitle: 'Invoice #TC-2024-0847', priceEth: 1.92, volumeEth: 58, yield: 32.5, change: 0.8, sales: 120, owners: 340, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', type: 'Corporate Invoice', issuer: 'Tech Corp International', lockupPeriod: '60 days', totalValuation: 50000, description: 'Net-60 invoice from Tech Corp International for cloud infrastructure services.' },
  { id: 'inv-2', category: 'invoices', title: 'Acme Corp Q3 Invoice', collection: 'MANUFACTURING', subtitle: 'Invoice #AC-2024-1205', priceEth: 3.85, volumeEth: 115, yield: 28.0, change: 1.2, sales: 95, owners: 280, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', type: 'Corporate Invoice', issuer: 'Acme Manufacturing Corp', lockupPeriod: '90 days', totalValuation: 100000, description: 'Q3 manufacturing supply chain invoice from Acme Corp, AAA-rated debtor.' },
  { id: 'inv-3', category: 'invoices', title: 'MedTech $75k Net-90', collection: 'HEALTHCARE', subtitle: 'Invoice #MT-2024-0392', priceEth: 2.88, volumeEth: 86, yield: 24.8, change: 0.5, sales: 78, owners: 215, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', type: 'Corporate Invoice', issuer: 'MedTech Solutions Inc', lockupPeriod: '90 days', totalValuation: 75000, description: 'Medical equipment supply invoice from MedTech Solutions, backed by hospital PO.' },
  { id: 'inv-4', category: 'invoices', title: 'AutoParts $120k Net-45', collection: 'AUTOMOTIVE SUPPLY', subtitle: 'Invoice #AP-2024-0671', priceEth: 4.62, volumeEth: 138, yield: 35.2, change: 1.8, sales: 110, owners: 310, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', type: 'Corporate Invoice', issuer: 'AutoParts Global Ltd', lockupPeriod: '45 days', totalValuation: 120000, description: 'OEM auto parts supply invoice backed by Fortune 500 automotive manufacturer.' },
  { id: 'inv-5', category: 'invoices', title: 'CloudSaaS $200k Net-30', collection: 'TECH INVOICES', subtitle: 'Invoice #CS-2024-0158', priceEth: 7.69, volumeEth: 230, yield: 38.5, change: 2.1, sales: 145, owners: 420, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', type: 'Corporate Invoice', issuer: 'CloudSaaS Enterprise', lockupPeriod: '30 days', totalValuation: 200000, description: 'Enterprise SaaS subscription invoice from CloudSaaS, publicly traded debtor.' },
];

// ─── Portfolio Mock Data ─────────────────────────────────────────────────────

export const PORTFOLIO_HOLDINGS: PortfolioHolding[] = [
  { asset: ALL_ASSETS[0],  tokensOwned: 25,  avgBuyPrice: 11.2,  currentValue: 312.5,  pnl: 32.5,  pnlPercent: 11.6 },
  { asset: ALL_ASSETS[7],  tokensOwned: 5,   avgBuyPrice: 38.0,  currentValue: 212.5,  pnl: 22.5,  pnlPercent: 11.8 },
  { asset: ALL_ASSETS[13], tokensOwned: 8,   avgBuyPrice: 11.5,  currentValue: 102.4,  pnl: 10.4,  pnlPercent: 11.3 },
  { asset: ALL_ASSETS[14], tokensOwned: 15,  avgBuyPrice: 3.2,   currentValue: 57.0,   pnl: 9.0,   pnlPercent: 18.8 },
  { asset: ALL_ASSETS[20], tokensOwned: 3,   avgBuyPrice: 16.5,  currentValue: 55.5,   pnl: 6.0,   pnlPercent: 12.1 },
  { asset: ALL_ASSETS[23], tokensOwned: 50,  avgBuyPrice: 1.8,   currentValue: 96.0,   pnl: 6.0,   pnlPercent: 6.7  },
  { asset: ALL_ASSETS[24], tokensOwned: 30,  avgBuyPrice: 3.5,   currentValue: 115.5,  pnl: 10.5,  pnlPercent: 10.0 },
];

export const UPCOMING_PAYOUTS: Payout[] = [
  { assetTitle: 'Tech Corp $50k Net-60',    type: 'Invoice Maturity', amount: 1.92, date: '2024-04-15' },
  { assetTitle: 'Dubai Marina Penthouse',    type: 'Quarterly Yield',  amount: 0.44, date: '2024-04-30' },
  { assetTitle: 'Acme Corp Q3 Invoice',      type: 'Invoice Maturity', amount: 3.85, date: '2024-05-10' },
  { assetTitle: 'Custom Café Racer',         type: 'Revenue Share',    amount: 0.12, date: '2024-05-22' },
  { assetTitle: 'Bali Soho Villa',           type: 'Quarterly Yield',  amount: 0.25, date: '2024-06-01' },
  { assetTitle: 'MedTech $75k Net-90',       type: 'Invoice Maturity', amount: 2.88, date: '2024-06-15' },
];

// ─── Home Page Category Data Helper ──────────────────────────────────────────

export const getCategoryLabel = (cat: Category): string => {
  switch (cat) {
    case 'real-estate': return 'Real Estate';
    case 'fine-art': return 'Fine Art';
    case 'automotive': return 'Automotive & Motorcycles';
    case 'gaming': return 'Gaming';
    case 'invoices': return 'Invoice Bills';
  }
};

export const HOME_CATEGORIES: Category[] = ['real-estate', 'fine-art', 'automotive', 'gaming', 'invoices'];
export const MARKET_CATEGORIES: Category[] = ['real-estate', 'fine-art', 'automotive', 'invoices'];

export const ASSET_TYPE_OPTIONS: Record<Category, string[]> = {
  'real-estate': ['Villa', 'Flat', 'Building', 'Resort', 'Penthouse'],
  'fine-art': ['Oil', 'Digital', 'Mixed Media', 'Sculpture'],
  'automotive': ['Classic Car', 'Motorcycle'],
  'gaming': ['Villa', 'Building'],
  'invoices': ['Corporate Invoice'],
};
