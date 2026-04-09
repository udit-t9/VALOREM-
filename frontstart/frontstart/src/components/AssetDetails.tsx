import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import clsx from 'clsx';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrency } from '../contexts/CurrencyContext';
import { generatePriceHistory, type Asset, type View } from '../data';
import { buyAsset, sellAsset } from '../services/api';
import toast from 'react-hot-toast';

interface AssetDetailsProps {
  asset: Asset;
  setView: (v: View) => void;
}

export default function AssetDetails({ asset, setView }: AssetDetailsProps) {

  const [tradeTab, setTradeTab] = useState<'buy' | 'sell'>('buy');
  const [tokenAmount, setTokenAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPayment, setShowPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'processing' | 'success'>('select');

  const { formatPrice } = useCurrency();

  if (!asset) {
    return <div className="text-white p-10">Loading...</div>;
  }

  // ✅ TOKEN LOGIC
  const pricePerToken = asset.totalValue / asset.totalTokens;
  const estimatedCost = parseFloat(tokenAmount || '0') * pricePerToken;

  const priceHistory = useMemo(() => generatePriceHistory(pricePerToken), [pricePerToken]);

  // BUY
  const handleBuy = () => {
    if (!tokenAmount || Number(tokenAmount) <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    if (Number(tokenAmount) > asset.availableTokens) {
      toast.error("Not enough tokens available");
      return;
    }

    setShowPayment(true);
    setPaymentStep('select');
  };

  // PAYMENT
  const processPayment = async () => {
    setPaymentStep('processing');

    try {
      await new Promise(res => setTimeout(res, 1200));
      await buyAsset(asset.id, Number(tokenAmount));

      setPaymentStep('success');
      setTokenAmount('');

      setTimeout(() => window.location.reload(), 800);

    } catch (err) {
      toast.error("Payment Failed ❌");
      setShowPayment(false);
    }
  };

  // SELL
  const handleSell = async () => {
    if (!tokenAmount || Number(tokenAmount) <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    const loadingToast = toast.loading("Processing sell...");

    try {
      setLoading(true);

      await sellAsset(asset.id, Number(tokenAmount));

      toast.dismiss(loadingToast);
      toast.success("Sold successfully 💸");

      setTimeout(() => window.location.reload(), 800);

    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data || "Sell Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">

      {/* BACK */}
      <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6">
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          <motion.div className="relative h-[400px] rounded-2xl overflow-hidden">
            <img src={asset.image} className="w-full h-full object-cover" />

            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={14} className="text-green-400" />
                <span className="text-green-400 text-xs">VERIFIED</span>
              </div>

              <h1 className="text-4xl text-white">{asset.title}</h1>
              <p className="text-slate-400">{asset.subtitle}</p>
            </div>
          </motion.div>

          {/* GRAPH */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-white mb-4">Price History</h2>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistory}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => formatPrice(v)} />
                  <Area dataKey="price" stroke="#4ade80" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div>
          <div className="sticky top-24 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">

            {/* TOKEN PRICE */}
            <div>
              <p className="text-xs text-zinc-500 mb-1">CURRENT TOKEN PRICE</p>
              <p className="text-2xl text-white">{formatPrice(pricePerToken)}</p>
            </div>

            {/* ✅ NEW DATA BLOCK */}
            <div className="grid grid-cols-2 gap-3">

              <div className="bg-zinc-800 p-3 rounded-lg">
                <p className="text-xs text-zinc-400">TOTAL VALUE</p>
                <p className="text-white">{formatPrice(asset.totalValue)}</p>
              </div>

              <div className="bg-zinc-800 p-3 rounded-lg">
                <p className="text-xs text-zinc-400">TOTAL TOKENS</p>
                <p className="text-white">{asset.totalTokens}</p>
              </div>

              <div className="bg-zinc-800 p-3 rounded-lg col-span-2">
                <p className="text-xs text-zinc-400">AVAILABLE TOKENS</p>
                <p className="text-green-400">{asset.availableTokens}</p>
              </div>

            </div>

            {/* YIELD + CHANGE */}
            <div className="grid grid-cols-2 gap-3">

              <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                <p className="text-xs text-zinc-400 mb-1">EST. YIELD / APY</p>
                <p className="text-green-400 font-semibold">{asset.yield}%</p>
              </div>

              <div className="bg-zinc-800 rounded-lg p-3">
                <p className="text-xs text-zinc-400 mb-1">24H CHANGE</p>
                <p className={asset.change >= 0 ? "text-green-400" : "text-red-400"}>
                  {asset.change >= 0 ? "+" : ""}{asset.change}%
                </p>
              </div>

            </div>

            {/* BUY / SELL */}
            <div className="flex bg-zinc-800 rounded-lg p-1">
              <button onClick={() => setTradeTab('buy')} className={clsx("flex-1 py-2", tradeTab === 'buy' ? "bg-white text-black" : "")}>
                Buy
              </button>
              <button onClick={() => setTradeTab('sell')} className={clsx("flex-1 py-2", tradeTab === 'sell' ? "bg-white text-black" : "")}>
                Sell
              </button>
            </div>

            {/* INPUT */}
            <input
              type="number"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              className="w-full p-3 bg-zinc-800 text-white rounded-lg"
            />

            {/* TOTAL */}
            <div className="bg-zinc-800 p-3 rounded-lg">
              <p className="text-xs text-zinc-400">EST. TOTAL</p>
              <p className="text-white">{formatPrice(estimatedCost)}</p>
            </div>

            {/* BUTTON */}
            <button
              onClick={tradeTab === 'buy' ? handleBuy : handleSell}
              className="w-full bg-white text-black py-3 rounded-lg"
            >
              Confirm Transaction
            </button>

          </div>
        </div>

      </div>

      {/* PAYMENT */}
{/* PAYMENT */}
{showPayment && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

    {/* ================= SELECT PAYMENT ================= */}
    {paymentStep === 'select' && (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-[380px] p-6 space-y-5 shadow-2xl">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-white text-lg font-semibold">
            Select Payment Method
          </h2>
          <button
            onClick={() => setShowPayment(false)}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* TOTAL */}
        <div className="bg-zinc-800 rounded-xl p-4 flex justify-between">
          <p className="text-zinc-400 text-sm">Total Payable</p>
          <p className="text-white font-semibold">
            {formatPrice(estimatedCost)}
          </p>
        </div>

        {/* OPTIONS */}
        <div className="space-y-3">

          <button
            onClick={processPayment}
            className="w-full flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl transition"
          >
            <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center">📱</div>
            <div>
              <p className="text-white text-sm font-medium">UPI</p>
              <p className="text-zinc-400 text-xs">GPay, PhonePe, Paytm</p>
            </div>
          </button>

          <button
            onClick={processPayment}
            className="w-full flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl transition"
          >
            <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center">💳</div>
            <div>
              <p className="text-white text-sm font-medium">Card</p>
              <p className="text-zinc-400 text-xs">Visa, Mastercard</p>
            </div>
          </button>

          <button
            onClick={processPayment}
            className="w-full flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl transition"
          >
            <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center">🏦</div>
            <div>
              <p className="text-white text-sm font-medium">Net Banking</p>
              <p className="text-zinc-400 text-xs">All banks supported</p>
            </div>
          </button>

        </div>

        <p className="text-center text-xs text-zinc-500">
          Secured by VALOREM 🔒
        </p>

      </div>
    )}

    {/* ================= PROCESSING ================= */}
    {paymentStep === 'processing' && (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-[300px] p-6 text-center space-y-4">

        <p className="text-white">Processing Payment...</p>

        <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"></div>

      </div>
    )}

    {/* ================= SUCCESS ================= */}
    {paymentStep === 'success' && (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-[360px] p-6 text-center space-y-4 shadow-2xl">

        <h2 className="text-white text-lg font-semibold">
          Transaction Status
        </h2>

        {/* ICON */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black">
              ✔
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div>
          <p className="text-white font-medium">Payment Successful</p>
          <p className="text-zinc-400 text-sm">
            Your portfolio has been updated.
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => {
            setShowPayment(false);
            window.location.reload();
          }}
          className="w-full bg-white text-black py-2 rounded-lg"
        >
          Continue
        </button>

      </div>
    )}

  </div>
)}

    </div>
  );
}