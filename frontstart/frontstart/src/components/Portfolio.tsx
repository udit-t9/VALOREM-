import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, Calendar } from 'lucide-react';
import clsx from 'clsx';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useCurrency } from '../contexts/CurrencyContext';
import { getAssets } from '../services/api';
import axios from 'axios';
import { UPCOMING_PAYOUTS, type Asset, type View } from '../data';

interface PortfolioProps {
  setView: (v: View) => void;
  setSelectedAsset: (a: Asset) => void;
}

const DONUT_COLORS = ['#4ade80', '#60a5fa', '#f472b6', '#fbbf24', '#a78bfa', '#34d399', '#fb923c'];

export default function Portfolio({ setView, setSelectedAsset }: PortfolioProps) {

  const { formatPrice } = useCurrency();

  const [assets, setAssets] = useState<Asset[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);

  // ✅ FETCH ASSETS
  useEffect(() => {
    getAssets()
      .then(res => setAssets(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ FETCH PORTFOLIO
  useEffect(() => {
    axios.get("http://localhost:8081/api/portfolio")
      .then(res => setPortfolio(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ MERGE DATA (VERY IMPORTANT 🔥)
  const PORTFOLIO_HOLDINGS = portfolio.map(p => {
    const asset = assets.find(a => a.id === p.assetId);
    if (!asset) return null;

    const pricePerToken = asset.totalValue / asset.totalTokens;

    return {
      asset,
      tokensOwned: p.tokensOwned,
      currentValue: pricePerToken * p.tokensOwned,
      pnl: 0,
      pnlPercent: 0,
    };
  }).filter(Boolean);

  // ✅ TOTALS
  const totalValue = PORTFOLIO_HOLDINGS.reduce((sum, h) => sum + h.currentValue, 0);
  const totalYield = 0;
  const activeInvestments = PORTFOLIO_HOLDINGS.length;

  // ✅ DONUT
  const categoryMap = new Map<string, number>();
  PORTFOLIO_HOLDINGS.forEach(h => {
    const cat = h.asset.category.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + h.currentValue);
  });

  const donutData = Array.from(categoryMap.entries()).map(([name, value]) => ({
    name,
    value: totalValue === 0 ? 0 : parseFloat(((value / totalValue) * 100).toFixed(1)),
    rawValue: value,
  }));

  const handleRowClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setView('asset_details');
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight">Portfolio</h1>
          <p className="text-slate-400 text-sm mt-1">Your tokenized asset holdings</p>
        </div>
        <button className="bg-green-400 text-black px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-green-300 transition-colors flex items-center gap-2">
          <DollarSign size={16} /> Claim Yield
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Portfolio Value', value: formatPrice(totalValue), icon: BarChart3, color: 'text-white' },
          { label: 'Yield Earned', value: formatPrice(totalYield), icon: TrendingUp, color: 'text-green-400' },
          { label: 'Active Investments', value: String(activeInvestments), icon: Calendar, color: 'text-white' },
        ].map((metric, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">{metric.label}</p>
              <metric.icon size={18} className="text-zinc-600" />
            </div>
            <p className={clsx("text-2xl font-mono font-medium", metric.color)}>{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart + Holdings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Donut */}
        <motion.div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-sm font-mono text-white mb-4">Allocation Breakdown</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutData} dataKey="value">
                  {donutData.map((_, i) => (
                    <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Holdings */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-white mb-4">Holdings</h2>

          {PORTFOLIO_HOLDINGS.map((holding, i) => (
            <div key={i}
              onClick={() => handleRowClick(holding.asset)}
              className="flex justify-between p-4 bg-zinc-800 rounded-lg mb-2 cursor-pointer">

              <div className="flex gap-3">
                <img src={holding.asset.image} className="w-10 h-10 rounded" />
                <div>
                  <p className="text-white">{holding.asset.title}</p>
                  <p className="text-zinc-400 text-xs">{holding.asset.category}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-white">{formatPrice(holding.currentValue)}</p>
                <p className="text-green-400">{holding.tokensOwned} tokens</p>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Upcoming */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-white mb-4">Upcoming Payouts</h2>
        {UPCOMING_PAYOUTS.map((payout, i) => (
          <div key={i} className="flex justify-between mb-2">
            <span>{payout.assetTitle}</span>
            <span>{formatPrice(payout.amount)}</span>
          </div>
        ))}
      </div>

    </div>
  );
}