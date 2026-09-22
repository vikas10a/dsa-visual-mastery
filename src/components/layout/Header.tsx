import React from 'react';
import { CORE_15_PATTERNS } from '../../data/patternsData';
import { DsaLogo } from '../common/DsaLogo';
import {
  Code,
  Search,
  Sparkles,
  Bookmark,
  FolderTree,
  Zap,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenTaxonomy: () => void;
  bookmarkedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  onOpenTaxonomy,
  bookmarkedCount
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-slate-950/90 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div
          onClick={() => onSelectTab('visualizer')}
          className="flex items-center gap-3 cursor-pointer group"
          title="DSA Visual Mastery - Go to Home"
        >
          <DsaLogo variant="icon" size="md" className="group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight font-sans">
                DSA <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Visual Mastery</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-bold">
                Java 17+
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 hidden sm:flex items-center gap-1.5 mt-0.5">
              <span className="hover:text-cyan-300 transition">Learn</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400 inline-block" />
              <span className="hover:text-purple-300 transition">Visualize</span>
              <span className="w-1 h-1 rounded-full bg-purple-400 inline-block" />
              <span className="hover:text-emerald-300 transition">Solve</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
              <span className="text-slate-200 font-semibold">Get Placed</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Search */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button (Cmd+K) */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-mono transition shadow-inner"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search DSA...</span>
            <kbd className="hidden sm:inline-block bg-slate-950 px-1.5 py-0.5 rounded text-[10px] text-slate-400 border border-slate-800 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* 329 Taxonomy Trigger */}
          <button
            onClick={onOpenTaxonomy}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-800/60 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition"
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span className="hidden md:inline">329 Categories</span>
          </button>

          {/* Ask AI Expert Trigger */}
          <button
            onClick={() => onSelectTab('ai-expert')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition shadow-sm ${
              currentTab === 'ai-expert'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/20'
                : 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/70 hover:border-emerald-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Ask AI</span>
          </button>

          {/* Daily Streak & Bookmark Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-amber-300 font-bold">7d</span>
          </div>

          <button
            onClick={() => onSelectTab('notes')}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 transition"
            title="Bookmarked Patterns"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-white">{bookmarkedCount}</span>
          </button>

          {/* Dark / Light Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-700/80 text-xs font-mono transition shadow-sm group"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-45" />
                <span className="hidden lg:inline text-slate-300 font-bold">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500 transition-transform group-hover:-rotate-12" />
                <span className="hidden lg:inline text-slate-700 font-bold">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
