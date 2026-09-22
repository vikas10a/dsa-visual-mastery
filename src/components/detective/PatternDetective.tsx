import React, { useState } from 'react';
import { CORE_15_PATTERNS } from '../../data/patternsData';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Code, ExternalLink, Lightbulb } from 'lucide-react';

interface PatternDetectiveProps {
  onSelectPattern: (patternId: string) => void;
}

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: { label: string; clue: string; targetPatternId?: string }[];
}

const SAMPLE_PROBLEMS = [
  {
    title: 'Two Sum II',
    text: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a target number.',
    answers: { sorted: 'yes', contiguous: 'no', targetType: 'pair', dataStructure: 'array' }
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    text: 'Given a string s, find the length of the longest contiguous substring without duplicate characters.',
    answers: { sorted: 'no', contiguous: 'yes', targetType: 'substring', dataStructure: 'hashmap' }
  },
  {
    title: 'Daily Temperatures',
    text: 'Given an array of temperatures, return an array answer where answer[i] is the number of days you have to wait for a warmer temperature.',
    answers: { sorted: 'no', contiguous: 'no', targetType: 'next_greater', dataStructure: 'stack' }
  },
  {
    title: 'Merge Intervals',
    text: 'Given an array of intervals [start, end], merge all overlapping intervals into non-overlapping spans.',
    answers: { sorted: 'intervals', contiguous: 'no', targetType: 'overlap', dataStructure: 'array' }
  },
  {
    title: 'Kth Largest Element',
    text: 'Find the kth largest element in an unsorted stream of integers without sorting the entire array.',
    answers: { sorted: 'no', contiguous: 'no', targetType: 'top_k', dataStructure: 'heap' }
  }
];

export const PatternDetective: React.FC<PatternDetectiveProps> = ({ onSelectPattern }) => {
  const [problemText, setProblemText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [diagnosedPatternId, setDiagnosedPatternId] = useState<string | null>(null);

  const handleSelectSample = (sample: typeof SAMPLE_PROBLEMS[0]) => {
    setProblemText(sample.text);
    setAnswers(sample.answers);
    diagnoseFromAnswers(sample.answers);
  };

  const handleAnswer = (key: string, val: string) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);
    if (step < 4) {
      setStep(step + 1);
    } else {
      diagnoseFromAnswers(updated);
    }
  };

  const diagnoseFromAnswers = (ans: Record<string, string>) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let result = 'two-pointers';
      if (ans.contiguous === 'yes' || ans.targetType === 'substring') {
        result = 'sliding-window';
      } else if (ans.targetType === 'next_greater') {
        result = 'monotonic-stack';
      } else if (ans.targetType === 'top_k' || ans.dataStructure === 'heap') {
        result = 'top-k-elements';
      } else if (ans.targetType === 'overlap' || ans.sorted === 'intervals') {
        result = 'overlapping-intervals';
      } else if (ans.sorted === 'yes' && ans.targetType === 'pair') {
        result = 'two-pointers';
      } else if (ans.sorted === 'yes') {
        result = 'binary-search';
      } else if (ans.dataStructure === 'hashmap') {
        result = 'frequency-counting';
      } else if (ans.targetType === 'all_combinations') {
        result = 'backtracking';
      } else if (ans.targetType === 'optimal_subproblem') {
        result = 'dynamic-programming';
      }
      setDiagnosedPatternId(result);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleReset = () => {
    setProblemText('');
    setAnswers({});
    setStep(1);
    setDiagnosedPatternId(null);
  };

  const patternData = CORE_15_PATTERNS.find((p) => p.id === diagnosedPatternId);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Pattern Detective
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
              "When I see a new coding problem, how do I know what to do?"
            </p>
          </div>
        </div>

        {/* Sample Problems Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Try a real interview question:
          </span>
          {SAMPLE_PROBLEMS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(sample)}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Input & Guided Diagnostic Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Problem Text Input */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
              1. Paste Problem Statement
            </span>
            <textarea
              rows={6}
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Paste any coding interview question here (e.g. 'Given a sorted array of numbers, find two elements that sum to target...')"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Or answer the 4 questions on the right →</span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-300"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        {/* Right: Guided Clue Diagnostic Questionnaire */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                2. Guided Clue Diagnostic (Question {step}/4)
              </span>
              <span className="text-[10px] font-mono text-slate-500">Elimination Matrix</span>
            </div>

            {/* Question 1 */}
            {step === 1 && (
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  Is the input data sorted, or can it be sorted without breaking required index positions?
                </h3>
                <div className="flex flex-col gap-2 mt-1">
                  <button
                    onClick={() => handleAnswer('sorted', 'yes')}
                    className="p-3 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-xs font-mono text-slate-200 transition"
                  >
                    ✓ Yes, data is strictly sorted or monotonic
                  </button>
                  <button
                    onClick={() => handleAnswer('sorted', 'intervals')}
                    className="p-3 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-xs font-mono text-slate-200 transition"
                  >
                    ⏱ It represents intervals [start, end]
                  </button>
                  <button
                    onClick={() => handleAnswer('sorted', 'no')}
                    className="p-3 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-200 transition"
                  >
                    ✗ No, arbitrary unsorted order
                  </button>
                </div>
              </div>
            )}

            {/* Question 2 */}
            {step === 2 && (
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  Does the problem ask for a CONTIGUOUS subarray, substring, or window?
                </h3>
                <div className="flex flex-col gap-2 mt-1">
                  <button
                    onClick={() => handleAnswer('contiguous', 'yes')}
                    className="p-3 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-xs font-mono text-slate-200 transition"
                  >
                    ✓ Yes, explicitly mentions contiguous subarray/substring
                  </button>
                  <button
                    onClick={() => handleAnswer('contiguous', 'no')}
                    className="p-3 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-200 transition"
                  >
                    ✗ No, pairs, arbitrary elements, or subsequences
                  </button>
                </div>
              </div>
            )}

            {/* Question 3 */}
            {step === 3 && (
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  What is the target operation being searched or calculated?
                </h3>
                <div className="flex flex-col gap-2 mt-1">
                  <button
                    onClick={() => handleAnswer('targetType', 'pair')}
                    className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    • Find a pair or triplet with target sum
                  </button>
                  <button
                    onClick={() => handleAnswer('targetType', 'next_greater')}
                    className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    • Find Next/Previous Greater or Smaller element
                  </button>
                  <button
                    onClick={() => handleAnswer('targetType', 'top_k')}
                    className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    • Extract Top K largest / most frequent
                  </button>
                  <button
                    onClick={() => handleAnswer('targetType', 'overlap')}
                    className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    • Merge overlapping time intervals or meeting rooms
                  </button>
                </div>
              </div>
            )}

            {/* Question 4 */}
            {step === 4 && (
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  Which auxiliary data structure seems most natural?
                </h3>
                <div className="flex flex-col gap-2 mt-1">
                  <button
                    onClick={() => handleAnswer('dataStructure', 'pointers')}
                    className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    • In-place integer pointers (Left, Right)
                  </button>
                  <button
                    onClick={() => handleAnswer('dataStructure', 'stack')}
                    className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    • LIFO Deque / Stack (Monotonic order)
                  </button>
                  <button
                    onClick={() => handleAnswer('dataStructure', 'heap')}
                    className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    • PriorityQueue (Min/Max Binary Heap)
                  </button>
                  <button
                    onClick={() => handleAnswer('dataStructure', 'hashmap')}
                    className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    • HashMap / HashSet for frequency or complement lookup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DIAGNOSED RESULT CARD */}
      {isAnalyzing && (
        <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-slate-400 mt-2">Deducing optimal pattern from problem clues...</p>
        </div>
      )}

      {diagnosedPatternId && patternData && !isAnalyzing && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/40 border-2 border-purple-500/50 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col gap-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Deduction Concluded: Most Probable DSA Pattern
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                {patternData.name} (Pattern #{patternData.number})
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {patternData.tagline}
              </p>
            </div>

            <button
              onClick={() => onSelectPattern(patternData.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-950/40 self-start sm:self-auto"
            >
              <span>OPEN IN VISUALIZER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Reasoning Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">WHY THIS PATTERN?</span>
              <p className="text-slate-300 font-sans leading-relaxed">
                {patternData.whyItWorks}
              </p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">TYPICAL COMPLEXITY</span>
              <p className="text-slate-200 font-bold">
                Time: {patternData.timeComplexity}
              </p>
              <p className="text-slate-200 font-bold mt-1">
                Space: {patternData.spaceComplexity}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                {patternData.timeComplexityReason}
              </p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">INTERVIEW TRAP TO AVOID</span>
              <p className="text-slate-300 font-sans leading-relaxed">
                {patternData.interviewMemoryCard.commonTrap}
              </p>
            </div>
          </div>

          {/* Java Boilerplate Skeleton */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-400 font-bold flex items-center gap-1.5">
                <Code className="w-4 h-4" /> Recommended Java Skeleton
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Copy into your solution</span>
            </div>
            <pre className="text-emerald-300 text-xs font-mono p-3 bg-slate-900 rounded-lg overflow-x-auto whitespace-pre">
              {patternData.interviewMemoryCard.javaSnippet}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
