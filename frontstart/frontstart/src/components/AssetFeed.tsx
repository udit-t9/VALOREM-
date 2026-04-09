import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';

interface Asset {
    id: number;
    title: string;
    collection: string;
    price: string;
    vol: string;
    change: number;
    img: string;
}

const ASSETS: Asset[] = [
    { id: 1, title: "NYC SoHo Loft", collection: "MANHATTAN PRIME", price: "$1,675.00", vol: "$2.8M", change: -0.89, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800" },
    { id: 2, title: "Basquiat Fragment", collection: "MODERN MASTERS", price: "$12,500.00", vol: "$5.1M", change: +12.4, img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800" },
    { id: 3, title: "Aston Martin DB5", collection: "CLASSIC MOTORS", price: "$850,000.00", vol: "$1.2M", change: +5.2, img: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=800" },
    { id: 4, title: "Royal Oak 'Jumbo'", collection: "HOROLOGY", price: "$145,000.00", vol: "$890K", change: +2.1, img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800" },
    { id: 5, title: "Seaside Villa", collection: "COASTAL LUXE", price: "$2,400.00", vol: "$4.1M", change: -1.2, img: "https://images.unsplash.com/photo-1613490493576-2f9b5c80a9b3?auto=format&fit=crop&w=800" },
];

const AssetCard = ({ asset }: { asset: Asset }) => (
    <div className="w-[320px] h-[380px] shrink-0 flex flex-col rounded-xl overflow-hidden group cursor-pointer">
        {/* Top 60% Image */}
        <div className="h-[60%] w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
            <img src={asset.img} alt={asset.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
        </div>

        {/* Bottom 40% Info - Solid Dark Grey */}
        <div className="h-[40%] bg-dark-grey border-t border-white/5 p-5 flex flex-col justify-between relative">
            <div>
                <p className="text-xs text-gray-500 font-mono mb-1 tracking-wider">{asset.collection}</p>
                <h3 className="text-white text-lg font-medium">{asset.title}</h3>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <p className="text-xs text-gray-500 font-mono mb-1">Floor Price</p>
                    <p className="font-mono text-white text-base">{asset.price}</p>
                </div>

                {/* Badge Bottom Right */}
                <div className={clsx(
                    "px-2 py-1 rounded-full text-xs font-mono flex items-center gap-1",
                    asset.change >= 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                )}>
                    {asset.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(asset.change)}%
                </div>
            </div>
        </div>
    </div>
);

export default function AssetFeed() {
    // Duplicate assets to fill the marquee
    const infiniteAssets = [...ASSETS, ...ASSETS, ...ASSETS];

    return (
        <div className="space-y-12 py-12 w-full overflow-hidden">

            {/* Row 1: Featured (Manual Scroll) */}
            <section>
                <div className="flex items-center justify-between mb-6 px-1">
                    <h2 className="text-xl font-light tracking-wide text-white">Featured Opportunities</h2>
                    <button className="text-xs font-mono text-gray-500 hover:text-white transition-colors">VIEW ALL</button>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6">
                    {ASSETS.map((asset) => (
                        <AssetCard key={`featured-${asset.id}`} asset={asset} />
                    ))}
                </div>
            </section>

            {/* Row 2: Highest Weekly Sales (Manual Scroll) */}
            <section>
                <div className="flex items-center justify-between mb-6 px-1">
                    <h2 className="text-xl font-light tracking-wide text-white">Highest Weekly Sales</h2>
                    <button className="text-xs font-mono text-gray-500 hover:text-white transition-colors">VIEW ALL</button>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6">
                    {[...ASSETS].reverse().map((asset) => (
                        <AssetCard key={`weekly-${asset.id}`} asset={asset} />
                    ))}
                </div>
            </section>

            {/* Row 3: Trending Collections (Infinite Marquee) */}
            <section>
                <div className="flex items-center justify-between mb-6 px-1">
                    <h2 className="text-xl font-light tracking-wide text-white">Trending Collections</h2>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-mono text-green-500">LIVE FEED</span>
                    </div>
                </div>

                <div className="relative w-full overflow-hidden -mx-6 px-6">
                    {/* Gradient masks for smooth fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-matte-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-matte-black to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex gap-6 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    >
                        {[...infiniteAssets, ...infiniteAssets].map((asset, i) => (
                            <AssetCard key={`marquee-${i}`} asset={asset} />
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
