import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../../data/flashcardsData';
import { RotateCw, CheckCircle2, BookOpen, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const RevisionFlashcards: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);

  const card = FLASHCARDS_DATA[currentIdx];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIdx < FLASHCARDS_DATA.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    } else {
      setCurrentIdx(FLASHCARDS_DATA.length - 1);
    }
  };

  const toggleMastered = (id: string) => {
    if (masteredCards.includes(id)) {
      setMasteredCards(masteredCards.filter((c) => c !== id));
    } else {
      setMasteredCards([...masteredCards, id]);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest font-bold">
            <BookOpen className="w-4 h-4" />
            Spaced Repetition System
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            DSA Revision Flashcards
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
            Quick 5-minute daily recall cards for patterns & Java traps
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs self-start sm:self-auto">
          <span className="text-slate-400">Mastered:</span>
          <span className="text-emerald-400 font-bold">{masteredCards.length}</span>
          <span className="text-slate-600">/ {FLASHCARDS_DATA.length}</span>
        </div>
      </div>

      {/* Flashcard Component */}
      <div
        onClick={handleFlip}
        className="w-full min-h-[300px] cursor-pointer bg-slate-900/95 border-2 border-slate-800 hover:border-indigo-500/60 p-8 rounded-3xl shadow-2xl flex flex-col justify-between transition-all duration-300 relative group"
      >
        {/* Top bar of card */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
            {card.category}
          </span>
          <span className="text-xs font-mono text-slate-500">
            Card {currentIdx + 1} of {FLASHCARDS_DATA.length} • Interval: {card.intervalDays}d
          </span>
        </div>

        {/* Card Body: Question or Answer */}
        <div className="my-auto py-6 flex flex-col items-center text-center">
          {!isFlipped ? (
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-mono uppercase text-slate-500">Prompt / Question</span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono leading-relaxed max-w-xl">
                {card.question}
              </h2>
              <span className="text-xs text-indigo-400 font-mono mt-4 flex items-center gap-1 group-hover:underline">
                <RotateCw className="w-3.5 h-3.5" /> Click anywhere to reveal answer & key clue
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 animate-fade-in w-full">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Answer & Key Clue</span>
              <p className="text-base sm:text-lg font-bold text-emerald-300 font-mono leading-relaxed whitespace-pre-line max-w-xl">
                {card.answer}
              </p>

              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-left w-full text-xs font-mono">
                <span className="text-amber-400 font-bold block mb-1">Key Clue:</span>
                <p className="text-slate-300 font-sans">{card.keyClue}</p>
                <div className="mt-2 text-cyan-300">
                  <span className="text-slate-500 block mb-0.5">Java Idiom:</span>
                  <code className="text-[11px] bg-slate-900 px-2 py-1 rounded block overflow-x-auto">{card.javaTip}</code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom card indicators */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs font-mono">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMastered(card.id);
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400"
          >
            {masteredCards.includes(card.id) ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-600"></div>
            )}
            <span>{masteredCards.includes(card.id) ? 'Mastered' : 'Mark as Mastered'}</span>
          </button>

          <span className="text-slate-500">
            {isFlipped ? 'Flipped (Answer)' : 'Front (Question)'}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Card
        </button>

        <button
          onClick={handleFlip}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold shadow-lg"
        >
          {isFlipped ? 'Show Question' : 'Flip to Answer'}
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono"
        >
          Next Card <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
