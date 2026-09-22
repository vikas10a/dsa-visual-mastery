import React, { useState, useEffect } from 'react';
import { CORE_15_PATTERNS } from '../../data/patternsData';
import { PROBLEMS_DATA } from '../../data/problemsData';
import { JAVA_DATA_STRUCTURES } from '../../data/javaDsData';
import { DsaLogo } from '../common/DsaLogo';
import { Search, X, Code, BookOpen, Layers, Sparkles, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPattern: (patternId: string) => void;
  onSelectTab: (tabId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPattern,
  onSelectTab
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPatterns = CORE_15_PATTERNS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProblems = PROBLEMS_DATA.filter(
    (pr) =>
      pr.title.toLowerCase().includes(query.toLowerCase()) ||
      pr.category.toLowerCase().includes(query.toLowerCase()) ||
      pr.patternName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredJavaDs = JAVA_DATA_STRUCTURES.filter(
    (j) =>
      j.name.toLowerCase().includes(query.toLowerCase()) ||
      j.javaPackage.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-16 px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden animate-fade-in">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/80">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search patterns, algorithms, Java structures, interview problems..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-4">
          {/* Welcome Logo Header when search is empty */}
          {query.trim().length === 0 && (
            <div className="py-4 px-2 flex flex-col items-center text-center border-b border-slate-800/80 mb-2">
              <DsaLogo variant="full" showTagline={true} className="scale-90" />
              <p className="text-[11px] text-slate-400 font-mono mt-3 max-w-md">
                Search through Core 15 Patterns, 100+ placement problems, Java data structures, or type any algorithmic question.
              </p>
            </div>
          )}

          {/* Ask AI Option */}
          {query.trim().length > 0 && (
            <button
              onClick={() => {
                try {
                  sessionStorage.setItem('dsa_ai_pending_prompt', query.trim());
                } catch {
                  // ignore
                }
                onSelectTab('ai-expert');
                onClose();
              }}
              className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 hover:from-emerald-900/80 hover:to-cyan-900/80 border border-emerald-700/60 flex items-center justify-between text-left group transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shrink-0">
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    Ask AI DSA Expert
                    <span className="text-[10px] text-emerald-400 font-normal">Gemini 3.8</span>
                  </span>
                  <span className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                    "{query.trim()}"
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}

          {/* Patterns Group */}
          {filteredPatterns.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-wider block mb-2 px-2">
                Algorithms & Core Patterns ({filteredPatterns.length})
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredPatterns.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPattern(p.id);
                      onSelectTab('visualizer');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between text-left group transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded bg-emerald-950 text-emerald-400 text-[11px] font-mono font-bold flex items-center justify-center border border-emerald-800">
                        #{p.number}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white font-mono">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-slate-500 block font-mono">
                          {p.category} • {p.timeComplexity}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Java Collections Group */}
          {filteredJavaDs.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider block mb-2 px-2">
                Java Data Structures ({filteredJavaDs.length})
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredJavaDs.map((j) => (
                  <button
                    key={j.name}
                    onClick={() => {
                      onSelectTab('guide');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between text-left group transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white font-mono">
                          {j.name}
                        </span>
                        <span className="text-[10px] text-slate-500 block font-mono">
                          {j.javaPackage}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Problems Group */}
          {filteredProblems.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-purple-400 tracking-wider block mb-2 px-2">
                Interview Problems ({filteredProblems.length})
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredProblems.map((pr) => (
                  <button
                    key={pr.id}
                    onClick={() => {
                      onSelectTab('problems');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between text-left group transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white font-mono">
                          {pr.title}
                        </span>
                        <span className="text-[10px] text-slate-500 block font-mono">
                          {pr.difficulty} • {pr.patternName}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPatterns.length === 0 && filteredProblems.length === 0 && filteredJavaDs.length === 0 && (
            <div className="text-center py-8 text-slate-500 font-mono text-xs">
              No matching algorithms or patterns for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
