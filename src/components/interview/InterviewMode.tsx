import React, { useState, useEffect } from 'react';
import { PROBLEMS_DATA } from '../../data/problemsData';
import { Clock, Play, Pause, RotateCcw, CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';

const INTERVIEW_STAGES = [
  { stage: 1, name: '1. Clarify & Confirm Inputs', timeMinutes: 3, goal: 'Ask clarifying questions about constraints, negative numbers, empty input, sorted order, and return format.' },
  { stage: 2, name: '2. Pattern Recognition Clues', timeMinutes: 5, goal: 'Identify the underlying algorithm pattern and explain WHY it is optimal.' },
  { stage: 3, name: '3. State Brute Force & Bottleneck', timeMinutes: 5, goal: 'Explain the naive approach first, its Big-O complexity, and why it is suboptimal.' },
  { stage: 4, name: '4. Write Clean Java Code', timeMinutes: 10, goal: 'Write modular, well-named Java code using standard Java Collections without syntax errors.' },
  { stage: 5, name: '5. Step-by-Step Dry Run', timeMinutes: 4, goal: 'Manually trace variable state step-by-step on a small test case with the interviewer.' },
  { stage: 6, name: '6. Edge Cases & Complexity Summary', timeMinutes: 3, goal: 'Walk through extreme edge cases (empty, duplicates, single element) and summarize Time & Space.' }
];

export const InterviewMode: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState(PROBLEMS_DATA[0]);
  const [activeStage, setActiveStage] = useState(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(30 * 60); // 30 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [stageChecklist, setStageChecklist] = useState<boolean[]>([false, false, false, false, false, false]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeftSeconds]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleChecklist = (idx: number) => {
    const updated = [...stageChecklist];
    updated[idx] = !updated[idx];
    setStageChecklist(updated);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeftSeconds(30 * 60);
    setActiveStage(0);
    setStageChecklist([false, false, false, false, false, false]);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-12">
      {/* Header with Timer */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Clock className="w-4 h-4" />
            30-Minute Mock Interview Simulator
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            FAANG Structured Placement Interview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
            Strict 6-stage candidate assessment rubric with countdown pressure
          </p>
        </div>

        {/* Live Timer Card */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 self-start md:self-auto shadow-inner">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Interview Time Remaining:</span>
            <span className={`text-2xl font-mono font-extrabold ${timeLeftSeconds < 300 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
              {formatTimer(timeLeftSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2 rounded-lg font-bold text-xs transition ${
                isRunning
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Problem Selection & Stage Rubric */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6 Structured Stages (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
            Standard 6-Stage FAANG Process:
          </span>

          {INTERVIEW_STAGES.map((st, idx) => {
            const isCurrent = activeStage === idx;
            const isDone = stageChecklist[idx];

            return (
              <div
                key={st.stage}
                onClick={() => setActiveStage(idx)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isCurrent
                    ? 'bg-slate-800 border-rose-500/80 ring-2 ring-rose-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChecklist(idx);
                    }}
                    className="shrink-0"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600"></div>
                    )}
                  </button>

                  <div>
                    <h4 className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                      {st.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">
                      Target: ~{st.timeMinutes} mins
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isCurrent ? 'bg-rose-500 text-white' : 'bg-slate-950 text-slate-500'
                }`}>
                  STAGE {st.stage}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Active Stage Action & Notes Editor (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">
              Active Stage Focus
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">
              {INTERVIEW_STAGES[activeStage].name}
            </h2>
            <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed">
              {INTERVIEW_STAGES[activeStage].goal}
            </p>
          </div>

          {/* Active Problem Prompt */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-cyan-400 font-bold">
                Assigned Problem: {selectedProblem.title}
              </span>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                {selectedProblem.difficulty}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans">
              {selectedProblem.description}
            </p>
          </div>

          {/* Candidate Interactive Response / Scratchpad */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs font-mono text-slate-400 font-bold">
              Candidate Scratchpad / Live Code Notes:
            </label>
            <textarea
              rows={8}
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Type your clarifying questions, pattern deduction, pseudocode, or Java implementation here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-300 placeholder-slate-600 focus:outline-none focus:border-rose-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => toggleChecklist(activeStage)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition"
            >
              {stageChecklist[activeStage] ? 'Unmark Stage' : '✓ Mark Stage Complete'}
            </button>

            {activeStage < INTERVIEW_STAGES.length - 1 && (
              <button
                onClick={() => setActiveStage(activeStage + 1)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-mono font-bold text-white shadow"
              >
                Proceed to Stage {activeStage + 2} →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
