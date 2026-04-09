import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

type Category = 'Real Estate' | 'Fine Art' | 'Automotive';

interface HeroContent {
    title: string;
    subtitle: string;
    image: string;
}

const CONTENT: Record<Category, HeroContent> = {
    'Real Estate': {
        title: "The Bali Soho Villa",
        subtitle: "Verified Yield 14%",
        image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=2000&q=80"
    },
    'Fine Art': {
        title: "Basquiat Fragment #4",
        subtitle: "Blue Chip Art",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=2000&q=80"
    },
    'Automotive': {
        title: "Porsche 911 GT3 RS",
        subtitle: "Classic Asset",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80"
    }
};

export default function Hero() {
    const [activeCategory, setActiveCategory] = useState<Category>('Real Estate');

    return (
        <div className="w-full relative group">
            {/* Category Switcher */}
            <div className="flex gap-8 mb-6 ml-1">
                {(Object.keys(CONTENT) as Category[]).map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={clsx(
                            "text-sm font-medium tracking-wide transition-colors duration-300 relative py-1",
                            activeCategory === category ? "text-white" : "text-gray-500 hover:text-white"
                        )}
                    >
                        {category}
                        {activeCategory === category && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Hero Image Container */}
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-dark-grey">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        <img
                            src={CONTENT[activeCategory].image}
                            alt={CONTENT[activeCategory].title}
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                    <motion.div
                        key={activeCategory + "-text"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <p className="font-mono text-white/70 text-sm mb-2 tracking-wider uppercase">
                            {CONTENT[activeCategory].subtitle}
                        </p>
                        <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight">
                            {CONTENT[activeCategory].title}
                        </h1>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
