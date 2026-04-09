import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowDownRight, Shield, TrendingUp } from 'lucide-react';
import clsx from 'clsx';
import { useCurrency } from '../contexts/CurrencyContext';
import { HOME_CATEGORIES, getCategoryLabel, type Asset, type Category, type View } from '../data';
import { getAssets } from '../services/api';

// ─── Sparkline ────────────────────────────────────────────────────────────────
const Sparkline = ({ trend }: { trend: 'up' | 'down' }) => {
  const points = trend === 'up' ? "0,20 10,18 20,15 30,12 40,10 50,8 60,5" : "0,5 10,8 20,10 30,12 40,15 50,18 60,20";
  const color = trend === 'up' ? '#10b981' : '#ef4444';
  return <svg width="60" height="20" className="absolute bottom-2 right-2 opacity-20"><polyline points={points} fill="none" stroke={color} strokeWidth="1.5" /></svg>;
};

// ─── Asset Card ───────────────────────────────────────────────────────────────
const AssetCard = ({ asset, onClick }: { asset: Asset; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { formatPrice } = useCurrency();

  // Safety check for change percentage
  const changeValue = asset.change ?? 0;

  return (
    <div ref={cardRef}
      onClick={onClick}
      onMouseMove={(e) => { if (!cardRef.current) return; const rect = cardRef.current.getBoundingClientRect(); setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top }); }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      className="min-w-[260px] w-[260px] rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-hidden cursor-pointer transition-all duration-300 shrink-0 relative group"
      style={{ boxShadow: isHovered ? `0 0 30px -5px rgba(255, 255, 255, 0.1)` : 'none' }}>

      {isHovered && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none z-10"
          style={{ background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent)` }}
        />
      )}

      <div className="relative h-[156px] overflow-hidden">
        <img src={asset.image} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className={clsx(
          "absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm flex items-center gap-0.5 text-[10px] font-mono font-medium",
          changeValue >= 0 ? "text-green-400" : "text-red-500"
        )}>
          {changeValue >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {changeValue >= 0 ? '+' : ''}{changeValue}%
        </div>
      </div>

      <div className="p-4 space-y-2 relative">
        <div>
          <p className="text-[11px] text-slate-400 font-medium tracking-wider uppercase mb-1.5 truncate">{asset.subtitle}</p>
          <h3 className="text-white text-sm font-medium truncate">{asset.title}</h3>
        </div>

        <div className="flex items-end justify-between pt-2 border-t border-zinc-800 relative">
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-0.5 font-medium">PRICE</p>
            {/* Added null-check ?? 0 here */}
            <p className="text-white font-mono text-xs font-medium">{formatPrice(asset.priceEth ?? 0)}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-0.5 font-medium">24H VOL</p>
            {/* Added null-check ?? 0 here */}
            <p className="text-slate-400 font-mono text-xs">{formatPrice(asset.volumeEth ?? 0)}</p>
          </div>
          <Sparkline trend={changeValue >= 0 ? 'up' : 'down'} />
        </div>
      </div>
    </div>
  );
};

// ─── Marquee ──────────────────────────────────────────────────────────────────
const Marquee = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden">
    <motion.div className="flex gap-4" animate={{ x: [0, -1920] }} transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 50, ease: "linear" } }}>
      {children}{children}
    </motion.div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
interface HomePageProps {
  setView: (v: View) => void;
  setSelectedAsset: (a: Asset) => void;
}

export default function HomePage({ setView, setSelectedAsset }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<Category>('real-estate');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    getAssets()
      .then((res) => {
        setAssets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const categoryAssets = assets.filter(
    (a) => a.category.toLowerCase().replace(/\s+/g, '-') === activeTab
  );

  const heroAsset = categoryAssets[0];
  const featured = categoryAssets.slice(0, 8);
  const topMovers = [...categoryAssets].sort((a, b) => Math.abs(b.change ?? 0) - Math.abs(a.change ?? 0)).slice(0, 8);
  const newListings = [...categoryAssets].reverse().slice(0, 8);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setView('asset_details');
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">Fetching Markets...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Category Tabs */}
      <section className="max-w-[1600px] mx-auto px-8 py-6">
        <div className="flex gap-6 mb-6 border-b border-zinc-800 pb-4 overflow-x-auto scrollbar-hide">
          {HOME_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className={clsx("text-sm font-medium tracking-wide transition-colors duration-300 relative pb-2 whitespace-nowrap", activeTab === cat ? "text-white" : "text-zinc-500 hover:text-white")}>
              {getCategoryLabel(cat)}
              {activeTab === cat && <motion.div layoutId="homeTab" className="absolute bottom-0 left-0 right-0 h-px bg-white" transition={{ duration: 0.3 }} />}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        {heroAsset ? (
          <AnimatePresence mode="wait">
            <motion.div key={heroAsset.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="relative h-[55vh] rounded-2xl overflow-hidden group">
              <img src={heroAsset.image} alt={heroAsset.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={14} className="text-green-400" />
                  <span className="text-[10px] text-slate-400 tracking-widest uppercase font-medium">VERIFIED ASSET</span>
                </div>
                <h1 className="text-5xl font-light text-white mb-2 tracking-tight">{heroAsset.title}</h1>
                <p className="text-slate-400 text-lg mb-2">{heroAsset.subtitle}</p>
                <p className="text-zinc-500 text-sm mb-6 max-w-[600px] leading-relaxed line-clamp-2">{heroAsset.description}</p>
                <div className="flex gap-8 mb-6">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">EST. YIELD</p>
                    <p className="text-3xl font-light text-green-400 font-mono">{heroAsset.yield ?? 0}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">TOKEN PRICE</p>
                    <p className="text-3xl font-medium text-white font-mono">{formatPrice(heroAsset.priceEth ?? 0)}</p>
                  </div>
                </div>
                <button onClick={() => handleAssetClick(heroAsset)}
                  className="bg-white text-black px-6 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-zinc-200 transition-colors">
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="h-[40vh] border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 font-mono text-xs">
            NO FEATURED ASSET IN THIS CATEGORY
          </div>
        )}
      </section>

      {/* Card Rows */}
      <section className="max-w-[1600px] mx-auto px-8 py-12 space-y-12">
        {featured.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 font-mono">FEATURED ASSETS</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {featured.map((asset) => <AssetCard key={asset.id} asset={asset} onClick={() => handleAssetClick(asset)} />)}
            </div>
          </div>
        )}

        {topMovers.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">TOP MOVERS</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-mono uppercase tracking-wider">LIVE</span>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {topMovers.map((asset) => <AssetCard key={asset.id} asset={asset} onClick={() => handleAssetClick(asset)} />)}
            </div>
          </div>
        )}

        {newListings.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">NEW LISTINGS</h3>
              <TrendingUp size={14} className="text-zinc-500" />
            </div>
            <Marquee>
              {newListings.map((asset) => <AssetCard key={asset.id} asset={asset} onClick={() => handleAssetClick(asset)} />)}
            </Marquee>
          </div>
        )}
      </section>
    </>
  );
}