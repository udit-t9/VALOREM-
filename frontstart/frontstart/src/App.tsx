import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import clsx from 'clsx';
import { useCurrency } from './contexts/CurrencyContext';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Marketplace from './components/Marketplace';
import AssetDetails from './components/AssetDetails';
import Portfolio from './components/Portfolio';
import IssuerPortal from './components/IssuerPortal';
import type { View, Asset } from './data';

// ✅ TOAST IMPORT
import { Toaster } from 'react-hot-toast';

// ─── Currency Toggle ─────────────────────────────────────────────────────────
const CurrencyToggle = () => {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="flex items-center bg-white/5 border border-zinc-800 rounded-md overflow-hidden">
      {(['ETH', 'SOL', 'USD'] as const).map((curr) => (
        <button
          key={curr}
          onClick={() => setCurrency(curr)}
          className={clsx(
            "px-3 py-1.5 text-xs font-mono font-medium transition-colors",
            currency === curr
              ? "bg-white text-black"
              : "text-zinc-400 hover:text-white"
          )}
        >
          {curr}
        </button>
      ))}
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [view, setView] = useState<View>('home');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleSetView = (v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    handleSetView('asset_details');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* ✅ TOASTER (GLOBAL POPUP SYSTEM) */}
      <Toaster position="top-right" />

      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Sidebar */}
      <Sidebar view={view} setView={handleSetView} />

      {/* Main Content */}
      <main className="pl-20">

        {/* Top Navigation */}
        <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
          <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-between">

            <div className="w-32" />

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="text"
                  placeholder="Search by Asset, Collection, or Address..."
                  className="w-full bg-zinc-950 text-white placeholder:text-zinc-500 rounded-md pl-12 pr-6 py-2.5 text-sm border border-zinc-800"
                />
              </div>
            </div>

            <div className="flex gap-3 ml-4">
              <CurrencyToggle />
              <button className="bg-white text-black rounded-md px-5 py-2 text-sm font-medium">
                Connect
              </button>
            </div>
          </div>
        </nav>

        {/* ROUTING */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >

            {view === 'home' && (
              <HomePage setView={handleSetView} setSelectedAsset={handleSelectAsset} />
            )}

            {view === 'marketplace' && (
              <Marketplace setView={handleSetView} setSelectedAsset={handleSelectAsset} />
            )}

            {view === 'asset_details' && selectedAsset && (
              <AssetDetails asset={selectedAsset} setView={handleSetView} />
            )}

            {view === 'portfolio' && (
              <Portfolio setView={handleSetView} setSelectedAsset={handleSelectAsset} />
            )}

            {view === 'issuer_portal' && (
              <IssuerPortal />
            )}

          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}

export default App;