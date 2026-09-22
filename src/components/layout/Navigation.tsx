import React from 'react';
import { CORE_15_PATTERNS } from '../../data/patternsData';
import {
  Sparkles,
  GitFork,
  Map,
  Layers,
  BookOpen,
  Clock,
  Briefcase,
  HelpCircle,
  Repeat,
  Edit3,
  PlayCircle
} from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  selectedPatternId: string;
  onSelectPattern: (patternId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  selectedPatternId,
  onSelectPattern
}) => {
  const tabs = [
    { id: 'visualizer', label: '15 Patterns Visual Lab', icon: PlayCircle },
    { id: 'ai-expert', label: 'AI Java Expert', icon: Sparkles },
    { id: 'detective', label: 'Pattern Detective', icon: Sparkles },
    { id: 'tree', label: 'Decision Tree', icon: GitFork },
    { id: 'roadmap', label: 'DSA Roadmap', icon: Map },
    { id: 'guide', label: 'Java Collections', icon: Layers },
    { id: 'problems', label: '100+ Placement & Concepts', icon: BookOpen },
    { id: 'complexity', label: 'Big-O Visualizer', icon: Clock },
    { id: 'interview', label: '30m Interview', icon: Briefcase },
    { id: 'quiz', label: 'Quizzes', icon: HelpCircle },
    { id: 'flashcards', label: 'Flashcards', icon: Repeat },
    { id: 'notes', label: 'Study Notes', icon: Edit3 }
  ];

  return (
    <div className="w-full bg-slate-950/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Tab Links */}
        <div className="flex items-center gap-1 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Pattern Selector Pills (Visible when in Visualizer Tab) */}
        {currentTab === 'visualizer' && (
          <div className="py-2.5 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold shrink-0 mr-1">
              Core 15:
            </span>
            {CORE_15_PATTERNS.map((p) => {
              const isSelected = selectedPatternId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPattern(p.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-slate-950' : 'text-slate-500'}`}>
                    #{p.number}
                  </span>
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
