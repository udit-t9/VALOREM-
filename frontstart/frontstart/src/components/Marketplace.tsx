import { useEffect, useState } from 'react'; // ✅ added
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useCurrency } from '../contexts/CurrencyContext';
import { getAssets } from '../services/api'; // ✅ added
import type { Asset, View } from '../data';

interface MarketplaceProps {
  setView: (v: View) => void;
  setSelectedAsset: (a: Asset) => void;
}

export default function Marketplace({ setView, setSelectedAsset }: MarketplaceProps) {

  const { formatPrice } = useCurrency();

  // ✅ backend state
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // ✅ fetch backend
  useEffect(() => {
    getAssets()
      .then(res => {
        console.log("Marketplace Data:", res.data);
        setAssets(res.data || []); // safety
      })
      .catch(err => console.error(err));
  }, []);

  // ✅ SAME LOGIC (JUST SAFETY ADDED)
  const filteredAssets =
    selectedCategory === 'all'
      ? assets
      : assets.filter(a =>
          a?.category &&
          a.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
        );

  const handleClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setView('asset_details');
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">

      {/* HEADER */}
      <h1 className="text-3xl text-white mb-6">Marketplace</h1>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        {['all', 'real-estate', 'automotive'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm",
              selectedCategory === cat
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-400"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredAssets.map((asset) => (
          <motion.div
            key={asset.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleClick(asset)}
            className="bg-zinc-900 rounded-xl overflow-hidden cursor-pointer border border-zinc-800"
          >

            <img
              src={asset.image}
              className="w-full h-[160px] object-cover"
            />

            <div className="p-4">
              <p className="text-zinc-400 text-xs">{asset.subtitle}</p>
              <h3 className="text-white text-sm">{asset.title}</h3>

              <div className="flex justify-between mt-2">
                <p className="text-white text-sm">
                  {formatPrice(asset.priceEth)}
                </p>

                <p className={asset.change >= 0 ? "text-green-400" : "text-red-400"}>
                  {asset.change >= 0 ? "+" : ""}{asset.change}%
                </p>
              </div>
            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}