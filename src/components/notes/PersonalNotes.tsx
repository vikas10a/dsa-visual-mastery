import React, { useState, useEffect } from 'react';
import { CORE_15_PATTERNS } from '../../data/patternsData';
import { Bookmark, Save, Trash2, Edit3, CheckCircle2, Sparkles } from 'lucide-react';

interface PersonalNotesProps {
  bookmarkedPatterns: string[];
  onSelectPattern: (patternId: string) => void;
}

export const PersonalNotes: React.FC<PersonalNotesProps> = ({ bookmarkedPatterns, onSelectPattern }) => {
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('dsa_visual_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedPatternId, setSelectedPatternId] = useState<string>(CORE_15_PATTERNS[0].id);
  const [currentNoteText, setCurrentNoteText] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    setCurrentNoteText(notes[selectedPatternId] || '');
  }, [selectedPatternId, notes]);

  const handleSaveNote = () => {
    const updated = { ...notes, [selectedPatternId]: currentNoteText };
    setNotes(updated);
    try {
      localStorage.setItem('dsa_visual_notes', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleClearNote = () => {
    const updated = { ...notes };
    delete updated[selectedPatternId];
    setNotes(updated);
    try {
      localStorage.setItem('dsa_visual_notes', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setCurrentNoteText('');
  };

  const activePattern = CORE_15_PATTERNS.find((p) => p.id === selectedPatternId) || CORE_15_PATTERNS[0];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Edit3 className="w-4 h-4" />
            Candidate Notebook & Revision Journal
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Personal Notes & Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
            Your private study notes, company interview takeaways, and pinned patterns
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono text-xs self-start md:self-auto">
          <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-slate-400">Bookmarked:</span>
          <span className="text-white font-bold">{bookmarkedPatterns.length} Patterns</span>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Pattern List (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider mb-1 px-1">
            Select Pattern to Note:
          </span>
          {CORE_15_PATTERNS.map((pat) => {
            const isSelected = selectedPatternId === pat.id;
            const hasNote = Boolean(notes[pat.id]?.trim());
            const isBookmarked = bookmarkedPatterns.includes(pat.id);

            return (
              <button
                key={pat.id}
                onClick={() => setSelectedPatternId(pat.id)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between shadow ${
                  isSelected
                    ? 'bg-slate-800 border-amber-500/80 ring-2 ring-amber-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded bg-slate-950 text-slate-400 text-[10px] font-mono font-bold flex items-center justify-center border border-slate-800">
                    #{pat.number}
                  </span>
                  <div>
                    <span className={`text-xs font-bold font-mono block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {pat.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {pat.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {hasNote && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400" title="Has saved notes"></span>
                  )}
                  {isBookmarked && (
                    <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Note Editor (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                Pattern #{activePattern.number} Study Notes
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {activePattern.name}
              </h2>
            </div>

            <button
              onClick={() => onSelectPattern(activePattern.id)}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              Open in Visualizer →
            </button>
          </div>

          {/* Quick Pattern Summary Recap */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 flex flex-col gap-1">
            <span className="text-slate-300 font-bold">Interview Clue Reminder:</span>
            <span>{activePattern.interviewMemoryCard.clue}</span>
          </div>

          {/* Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-slate-300 font-bold">
              Your Personal Notes, Edge Case Reminders & Company Experiences:
            </label>
            <textarea
              rows={10}
              value={currentNoteText}
              onChange={(e) => setCurrentNoteText(e.target.value)}
              placeholder="Write your personal reminders here (e.g. 'Google asked me this with negative numbers on 2024 phone screen...', 'Always remember to initialize right pointer to length-1...')"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 leading-relaxed"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleClearNote}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-mono"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Note
            </button>

            <button
              onClick={handleSaveNote}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold shadow-lg shadow-amber-950/40"
            >
              <Save className="w-4 h-4" />
              <span>{saveStatus === 'saved' ? 'Saved to Local Storage!' : 'Save Notes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
