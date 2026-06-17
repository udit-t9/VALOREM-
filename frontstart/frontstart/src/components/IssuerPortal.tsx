import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Wallet, FileText, DollarSign, Percent, Building2, Palette, Car, Receipt } from 'lucide-react';
import clsx from 'clsx';

type AssetType = 'real-estate' | 'invoice' | 'fine-art' | 'automotive';

const ASSET_TYPES: { value: AssetType; label: string; icon: typeof Building2 }[] = [
  { value: 'real-estate', label: 'Real Estate', icon: Building2 },
  { value: 'invoice', label: 'Invoice Bill', icon: Receipt },
  { value: 'fine-art', label: 'Fine Art', icon: Palette },
  { value: 'automotive', label: 'Automotive', icon: Car },
];

export default function IssuerPortal() {
  const [assetType, setAssetType] = useState<AssetType>('real-estate');
  const [formData, setFormData] = useState({
    assetName: '', assetValue: '', fundingAmount: '', expectedYield: '', description: '',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).map(f => f.name);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-light text-white tracking-tight">Tokenize Your Asset</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Request funding by collateralizing real-world assets or unpaid invoices. Submit your asset for institutional review.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-8">

          {/* ─── Asset Type Selection ─── */}
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3 block">Asset Type</label>
            <div className="grid grid-cols-4 gap-3">
              {ASSET_TYPES.map(type => (
                <button key={type.value} onClick={() => setAssetType(type.value)}
                  className={clsx("flex flex-col items-center gap-2 py-4 px-3 rounded-xl border transition-all",
                    assetType === type.value
                      ? "bg-white text-black border-white"
                      : "bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:border-zinc-600 hover:text-white")}>
                  <type.icon size={22} />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ─── Valuation & Details ─── */}
          <div className="space-y-4">
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Valuation & Details</label>

            {/* Asset Name */}
            <div>
              <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 block">Asset Name</label>
              <input type="text" placeholder="e.g. Dubai Marina Penthouse / Acme Corp Q3 Invoice"
                value={formData.assetName} onChange={e => handleChange('assetName', e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-white/20" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Asset Value */}
              <div>
                <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1 block">
                  <DollarSign size={10} /> Asset Value ($)
                </label>
                <input type="number" placeholder="500,000"
                  value={formData.assetValue} onChange={e => handleChange('assetValue', e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-white/20" />
              </div>
              {/* Funding Amount */}
              <div>
                <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1 block">
                  <DollarSign size={10} /> Requested Funding ($)
                </label>
                <input type="number" placeholder="250,000"
                  value={formData.fundingAmount} onChange={e => handleChange('fundingAmount', e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-white/20" />
              </div>
              {/* Expected Yield */}
              <div>
                <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1 block">
                  <Percent size={10} /> Expected Yield (%)
                </label>
                <input type="number" placeholder="12.5"
                  value={formData.expectedYield} onChange={e => handleChange('expectedYield', e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-white/20" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 block">Description</label>
              <textarea placeholder="Provide details about the asset, location, condition, or invoice terms..."
                rows={3} value={formData.description} onChange={e => handleChange('description', e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 resize-none" />
            </div>
          </div>

          {/* ─── Document Upload ─── */}
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3 block">Documents</label>
            <div onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={clsx("border-2 border-dashed rounded-xl py-10 px-6 text-center transition-colors",
                isDragging ? "border-green-400 bg-green-400/5" : "border-zinc-700 hover:border-zinc-600")}>
              <Upload size={32} className={clsx("mx-auto mb-3", isDragging ? "text-green-400" : "text-zinc-500")} />
              <p className="text-sm text-slate-400 mb-1">Drag & drop files here</p>
              <p className="text-[11px] text-zinc-600">Appraisals, Legal PDFs, Invoice PDFs, Smart Contract Audits</p>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 bg-zinc-800/50 rounded-lg px-3 py-2">
                    <FileText size={14} className="text-green-400" />
                    <span className="text-xs text-slate-400">{file}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── Wallet Connection ─── */}
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3 block">Wallet Connection</label>
            <button onClick={() => setWalletConnected(!walletConnected)}
              className={clsx("w-full flex items-center justify-center gap-3 py-3 rounded-xl border transition-all font-medium text-sm",
                walletConnected
                  ? "bg-green-400/10 border-green-400/30 text-green-400"
                  : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600")}>
              <Wallet size={18} />
              {walletConnected ? 'Multi-sig Wallet Connected ✓' : 'Connect Multi-sig / Corporate Wallet'}
            </button>
          </div>

          {/* ─── Submit Button ─── */}
          <button className="w-full bg-white text-black py-4 rounded-xl font-medium text-sm hover:bg-zinc-200 transition-colors">
            Submit Asset for Review
          </button>

          <p className="text-[10px] text-zinc-600 text-center">
            Submissions are reviewed by our institutional due diligence team within 48 hours.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
