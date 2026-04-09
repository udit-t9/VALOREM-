import { useState } from 'react';
import { Grid, Building2, PieChart, Plus } from 'lucide-react';
import clsx from 'clsx';
import type { View } from '../data';

interface SidebarProps {
  view: View;
  setView: (v: View) => void;
}

const navItems: { icon: typeof Grid; label: string; view: View }[] = [
  { icon: Grid, label: 'Home', view: 'home' },
  { icon: Building2, label: 'Marketplace', view: 'marketplace' },
  { icon: PieChart, label: 'Portfolio', view: 'portfolio' },
  { icon: Plus, label: 'Issuer Portal', view: 'issuer_portal' },
];

export default function Sidebar({ view, setView }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={clsx(
        "fixed left-0 top-0 h-screen bg-black border-r border-zinc-800 flex flex-col py-6 z-50 transition-all duration-300",
        isExpanded ? "w-56" : "w-20"
      )}>
      {/* Logo */}
      <div className="px-6 mb-8 cursor-pointer" onClick={() => setView('home')}>
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-xl">P</span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <button key={item.view}
            onClick={() => setView(item.view)}
            className={clsx(
              "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
              (view === item.view || (item.view === 'home' && view === 'asset_details'))
                ? "text-white bg-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}>
            <item.icon size={20} strokeWidth={1.5} className="shrink-0" />
            {isExpanded && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
