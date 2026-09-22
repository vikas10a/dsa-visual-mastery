import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, ExternalLink, Bot } from 'lucide-react';
import { Pattern } from '../../types';

interface FloatingAiChatWidgetProps {
  onOpenFullAiTab: () => void;
  currentPattern?: Pattern;
}

export const FloatingAiChatWidget: React.FC<FloatingAiChatWidgetProps> = ({
  onOpenFullAiTab,
  currentPattern
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickQuestion, setQuickQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAskQuick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;

    // Save prompt to draft storage so full AI view can pick it up immediately
    try {
      sessionStorage.setItem('dsa_ai_pending_prompt', quickQuestion);
    } catch {
      // ignore
    }
    setQuickQuestion('');
    setIsOpen(false);
    onOpenFullAiTab();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  Java DSA AI Expert
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {currentPattern ? `Context: ${currentPattern.name}` : 'Ready to answer'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Have a doubt about this Java code, edge case, or time complexity? Ask our AI DSA Expert:
            </p>

            <form onSubmit={handleAskQuick} className="space-y-2">
              <input
                type="text"
                value={quickQuestion}
                onChange={(e) => setQuickQuestion(e.target.value)}
                placeholder="Ask e.g. Why O(1) space here?..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFullAiTab();
                  }}
                  className="text-[11px] font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open Full Chat
                </button>
                <button
                  type="submit"
                  disabled={!quickQuestion.trim()}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-mono font-bold transition flex items-center gap-1 shadow-md"
                >
                  <span>Ask Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-xs px-4 py-3 rounded-full shadow-xl shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all group"
      >
        <Sparkles className="w-4 h-4 fill-slate-950 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Ask AI DSA Expert</span>
        <span className="sm:hidden">Ask AI</span>
      </button>
    </div>
  );
};
