import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { CheckCircle2, XCircle, Sparkles, RotateCcw, Trophy, Award } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pattern' | 'complexity' | 'javads'>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) =>
    activeCategory === 'all' ? true : q.category === activeCategory
  );

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Trophy className="w-4 h-4" />
            Pattern Recognition & Java Knowledge Drills
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Interactive DSA Quizzes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
            Test your ability to spot patterns and avoid Java memory traps
          </p>
        </div>

        {/* Score pill */}
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 self-start md:self-auto font-mono text-xs">
          <span className="text-slate-400">Score:</span>
          <span className="text-emerald-400 font-extrabold text-sm">{score}</span>
          <span className="text-slate-600">/ {filteredQuestions.length}</span>
        </div>
      </div>

      {/* Category selector */}
      <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start text-xs font-mono">
        <button
          onClick={() => { setActiveCategory('all'); handleReset(); }}
          className={`px-3 py-1.5 rounded-lg transition ${activeCategory === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          All Quizzes
        </button>
        <button
          onClick={() => { setActiveCategory('pattern'); handleReset(); }}
          className={`px-3 py-1.5 rounded-lg transition ${activeCategory === 'pattern' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Pattern Recognition
        </button>
        <button
          onClick={() => { setActiveCategory('complexity'); handleReset(); }}
          className={`px-3 py-1.5 rounded-lg transition ${activeCategory === 'complexity' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Big-O Analysis
        </button>
        <button
          onClick={() => { setActiveCategory('javads'); handleReset(); }}
          className={`px-3 py-1.5 rounded-lg transition ${activeCategory === 'javads' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Java Collections & Traps
        </button>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Question {currentIdx + 1} of {filteredQuestions.length}
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            {currentQ.category}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-white font-mono leading-relaxed whitespace-pre-line">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQ.options.map((opt, i) => {
            const isCorrect = i === currentQ.correctIndex;
            const isSelected = i === selectedOption;

            let btnStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
            if (hasAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
              } else {
                btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(i)}
                disabled={hasAnswered}
                className={`p-4 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                {hasAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {hasAnswered && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col gap-2 animate-fade-in">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" /> Explanation & Insight:
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {currentQ.explanation}
            </p>
            {currentQ.clueOrTip && (
              <span className="text-[11px] font-mono text-amber-300 mt-1 block">
                💡 {currentQ.clueOrTip}
              </span>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart Quiz
          </button>

          {hasAnswered && currentIdx < filteredQuestions.length - 1 && (
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold shadow-lg"
            >
              Next Question →
            </button>
          )}

          {hasAnswered && currentIdx === filteredQuestions.length - 1 && (
            <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Quiz Completed! Final Score: {score}/{filteredQuestions.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
