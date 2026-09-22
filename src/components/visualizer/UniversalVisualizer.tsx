import React, { useState, useEffect, useRef } from 'react';
import { Pattern, StepState } from '../../types';
import { generatePatternSteps } from '../../engine/algorithmGenerators';
import { JavaCodeHighlighter } from './JavaCodeHighlighter';
import { DryRunTable } from './DryRunTable';
import { ArrayView } from './ArrayView';
import { MatrixView } from './MatrixView';
import { StackQueueView } from './StackQueueView';
import { HeapView } from './HeapView';
import { TreeView } from './TreeView';
import { GraphView } from './GraphView';
import { IntervalsView } from './IntervalsView';
import { DPTableView } from './DPTableView';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Sparkles,
  Sliders,
  HelpCircle,
  Clock,
  Database,
  AlertTriangle,
  Bookmark,
  ChevronDown,
  Info,
  CheckCircle
} from 'lucide-react';

interface UniversalVisualizerProps {
  pattern: Pattern;
  onBookmarkToggle?: (patternId: string) => void;
  isBookmarked?: boolean;
  onSelectTab?: (tab: string) => void;
}

export const UniversalVisualizer: React.FC<UniversalVisualizerProps> = ({
  pattern,
  onBookmarkToggle,
  isBookmarked = false,
  onSelectTab
}) => {
  const [prevPatternId, setPrevPatternId] = useState(pattern.id);
  const [currentInput, setCurrentInput] = useState<any>(pattern.defaultInputs.input);
  const [currentParam, setCurrentParam] = useState<any>(pattern.defaultInputs.target ?? pattern.defaultInputs.k);
  const [steps, setSteps] = useState<StepState[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInputString, setCustomInputString] = useState('');
  const [customParamString, setCustomParamString] = useState('');
  const [activeTab, setActiveTab] = useState<'visualizer' | 'theory' | 'mistakes' | 'memory'>('visualizer');

  // Synchronize input when user selects a different pattern
  if (pattern.id !== prevPatternId) {
    setPrevPatternId(pattern.id);
    setCurrentInput(pattern.defaultInputs.input);
    setCurrentParam(pattern.defaultInputs.target ?? pattern.defaultInputs.k);
    setCustomInputString('');
    setCustomParamString('');
    setShowCustomInput(false);
  }

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or re-generate steps when pattern, input, or param changes
  useEffect(() => {
    const generated = generatePatternSteps(pattern.id, currentInput, currentParam);
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [pattern.id, currentInput, currentParam]);

  // Handle Play / Auto-stepping
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(1400 / playbackSpeed);
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, intervalMs);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, playbackSpeed]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Dry run historical rows up to current step
  const dryRunHistory = steps
    .slice(0, currentStepIndex + 1)
    .map((s) => s.dryRunRow)
    .filter(Boolean) as Record<string, string | number>[];

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleApplyPreset = (preset: any) => {
    setCurrentInput(preset.input);
    if (preset.target !== undefined) setCurrentParam(preset.target);
    else if (preset.k !== undefined) setCurrentParam(preset.k);
    setShowCustomInput(false);
  };

  const handleApplyCustomInput = () => {
    try {
      if (customInputString.trim()) {
        const parsed = JSON.parse(customInputString);
        setCurrentInput(parsed);
      }
      if (customParamString.trim()) {
        const parsedP = isNaN(Number(customParamString)) ? customParamString : Number(customParamString);
        setCurrentParam(parsedP);
      }
      setShowCustomInput(false);
    } catch {
      alert('Invalid JSON or format. Please input a valid JSON array or string (e.g. [1, 3, 5]).');
    }
  };

  const handleRandomize = () => {
    if (Array.isArray(currentInput)) {
      if (pattern.id === 'two-pointers' || pattern.id === 'binary-search') {
        const randomSorted = Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 1).sort((a, b) => a - b);
        setCurrentInput(randomSorted);
        if (pattern.id === 'two-pointers') {
          setCurrentParam(randomSorted[0] + randomSorted[randomSorted.length - 1]);
        } else {
          setCurrentParam(randomSorted[Math.floor(Math.random() * randomSorted.length)]);
        }
      } else {
        const randomArr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 30) + 1);
        setCurrentInput(randomArr);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-7xl mx-auto pb-12">
      {/* Pattern Header & Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xl backdrop-blur">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              #{pattern.number}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {pattern.name}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {pattern.category}
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                pattern.difficulty === 'Easy'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : pattern.difficulty === 'Medium'
                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                  : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}
            >
              {pattern.difficulty}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            {pattern.tagline}
          </p>
        </div>

        {/* Action Tabs & Bookmarks */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'visualizer'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Visual Lab
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'theory'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Deep Dive & Why
            </button>
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'mistakes'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mistakes & Traps
            </button>
            <button
              onClick={() => setActiveTab('memory')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'memory'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Memory Card
            </button>
          </div>

          {onBookmarkToggle && (
            <button
              onClick={() => onBookmarkToggle(pattern.id)}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Bookmark Pattern"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          )}
        </div>
      </div>

      {activeTab === 'visualizer' && (
        <>
          {/* Universal Playback & Input Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-xl shadow-lg">
            {/* Playback Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                title="Reset to Step 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleStepBackward}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition"
                title="Step Backward"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 shadow-lg transition ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </button>
              <button
                onClick={handleStepForward}
                disabled={currentStepIndex === steps.length - 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition"
                title="Step Forward"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Step counter pill */}
              <div className="ml-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Step <span className="text-emerald-400 font-bold">{currentStepIndex + 1}</span> of{' '}
                <span className="text-slate-300 font-bold">{steps.length}</span>
              </div>
            </div>

            {/* Speed & Input controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Speed Selector */}
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs font-mono text-slate-400">
                <span className="text-[10px] text-slate-500 uppercase">Speed:</span>
                {[0.5, 1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPlaybackSpeed(s)}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                      playbackSpeed === s
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Presets dropdown */}
              {pattern.presetCases && pattern.presetCases.length > 0 && (
                <div className="relative group">
                  <button className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                    <span>Presets</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-slate-900 border border-slate-800 shadow-2xl rounded-xl p-1.5 w-60 z-30">
                    {pattern.presetCases.map((pc, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleApplyPreset(pc)}
                        className="w-full text-left text-xs text-slate-300 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg font-mono"
                      >
                        {pc.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Random Input Button */}
              <button
                onClick={handleRandomize}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                Random Input
              </button>

              {/* Custom Input Modal Toggle */}
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/60"
              >
                <Sliders className="w-3.5 h-3.5" />
                Custom Input
              </button>

              {/* "EXPLAIN THIS STEP" button */}
              <button
                onClick={() => setShowExplainModal(true)}
                className="flex items-center gap-1.5 text-xs font-bold font-mono px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-900/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                EXPLAIN THIS STEP
              </button>
            </div>
          </div>

          {/* Custom Input Drawer / Box */}
          {showCustomInput && (
            <div className="p-4 bg-slate-900 border border-cyan-700/50 rounded-xl flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Custom Input (JSON format e.g. [1, 3, 5, 7, 9, 11]):
                </label>
                <input
                  type="text"
                  placeholder={JSON.stringify(currentInput)}
                  value={customInputString}
                  onChange={(e) => setCustomInputString(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {(currentParam !== undefined || pattern.defaultInputs.target !== undefined || pattern.defaultInputs.k !== undefined) && (
                <div className="w-full sm:w-44">
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    Target / K param:
                  </label>
                  <input
                    type="text"
                    placeholder={String(currentParam ?? '')}
                    value={customParamString}
                    onChange={(e) => setCustomParamString(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleApplyCustomInput}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold shadow"
                >
                  Apply & Run
                </button>
                <button
                  onClick={() => setShowCustomInput(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 font-mono text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* MAIN 3-PANEL SYNCHRONIZED LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* LEFT PANEL: Algorithm Visual Canvas (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Visual State Simulation
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {currentStep?.actionType ? `Action: ${currentStep.actionType.toUpperCase()}` : 'Idle'}
                </span>
              </div>

              {/* Dynamic View rendering based on state */}
              <div className="flex-1 flex flex-col items-center justify-center min-h-[260px] bg-slate-950/60 rounded-xl border border-slate-800/80 p-2 overflow-auto">
                {currentStep?.arrayData && <ArrayView stepState={currentStep} />}
                {currentStep?.matrixData && <MatrixView stepState={currentStep} />}
                {(currentStep?.stackData !== undefined || currentStep?.queueData !== undefined) && (
                  <StackQueueView stepState={currentStep} />
                )}
                {currentStep?.heapData && <HeapView stepState={currentStep} />}
                {currentStep?.treeData && <TreeView stepState={currentStep} />}
                {currentStep?.graphData && <GraphView stepState={currentStep} />}
                {currentStep?.intervalsData && <IntervalsView stepState={currentStep} />}
                {currentStep?.dpTable && <DPTableView stepState={currentStep} />}
                {currentStep?.hashMapData && (
                  <div className="w-full max-w-sm flex flex-col gap-2 p-3">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      Frequency Map (Key → Count):
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {currentStep.hashMapData.map((item, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-lg border font-mono text-xs flex justify-between ${
                            item.active
                              ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="font-bold">'{item.key}'</span>
                          <span className="font-extrabold text-emerald-400">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Current Step Title & Explanation Banner */}
              <div className="mt-3 p-3 bg-slate-950/90 border border-slate-800 rounded-xl">
                <h4 className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {currentStep?.title || 'Execution Step'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentStep?.explanation}
                </p>
              </div>
            </div>

            {/* CENTER PANEL: Synchronized Java Code (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col h-[480px] lg:h-auto">
              <JavaCodeHighlighter
                code={pattern.javaCode}
                highlightedLines={currentStep?.javaLineHighlight || []}
              />
            </div>

            {/* RIGHT PANEL: Live Variable Watch & Complexity (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* Variables Watcher */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Variables Watch
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Live Memory</span>
                </div>
                <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                  {currentStep?.variables && Object.keys(currentStep.variables).length > 0 ? (
                    Object.entries(currentStep.variables).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800/80 font-mono text-xs"
                      >
                        <span className="text-slate-400">{key}</span>
                        <span className="text-amber-300 font-bold truncate max-w-[120px]">
                          {String(val)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic p-1">No variables at this step</span>
                  )}
                </div>
              </div>

              {/* Big-O Complexity Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-lg flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider border-b border-slate-800 pb-1">
                  Complexity Profile
                </span>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Time:
                  </span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    {pattern.timeComplexity}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {pattern.timeComplexityReason}
                </p>

                <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Database className="w-3.5 h-3.5 text-cyan-400" /> Space:
                  </span>
                  <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                    {pattern.spaceComplexity}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {pattern.spaceComplexityReason}
                </p>
              </div>

              {/* Beginner Clue Box */}
              {currentStep?.beginnerNote && (
                <div className="bg-indigo-950/30 border border-indigo-800/50 rounded-xl p-2.5 text-xs text-indigo-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <span className="font-semibold text-indigo-300">Intuition: </span>
                    {currentStep.beginnerNote}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM SECTION: Live Dry Run Execution History Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Step-by-Step Dry Run History
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                Active row highlighted in gold
              </span>
            </div>
            <DryRunTable history={dryRunHistory} currentStepIndex={currentStepIndex} />
          </div>
        </>
      )}

      {/* TAB 2: Deep Dive Theory & Why It Works */}
      {activeTab === 'theory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col gap-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-emerald-400 uppercase font-mono tracking-wider">
                1. What is it?
              </h3>
              <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                {pattern.whatIsIt}
              </p>
            </div>

            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-cyan-400 uppercase font-mono tracking-wider">
                2. Why Does It Work?
              </h3>
              <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                {pattern.whyItWorks}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-purple-400 uppercase font-mono tracking-wider mb-2">
                Java Data Structures Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {pattern.javaDataStructures.map((ds, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-800/80 px-2.5 py-1 rounded-lg"
                  >
                    {ds}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-bold text-amber-400 uppercase font-mono tracking-wider mb-2">
                When Should I Use It? (Problem Clues)
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {pattern.whenToUse.map((clue, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <h3 className="text-sm font-bold text-rose-400 uppercase font-mono tracking-wider mb-2">
                When Should I NOT Use It?
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {pattern.whenNotToUse.map((trap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Common Mistakes & Edge Cases */}
      {activeTab === 'mistakes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-rose-400 uppercase font-mono tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Common Implementation Mistakes
            </h3>
            <div className="space-y-2.5">
              {pattern.commonMistakes.map((mistake, i) => (
                <div key={i} className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs text-rose-200">
                  <span className="font-bold text-rose-300">Mistake #{i + 1}: </span>
                  {mistake}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-amber-400 uppercase font-mono tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              Mandatory Edge Cases to Test
            </h3>
            <div className="space-y-2.5">
              {pattern.edgeCases.map((ec, i) => (
                <div key={i} className="p-3 bg-amber-950/30 border border-amber-900/50 rounded-xl text-xs text-amber-200">
                  <span className="font-bold text-amber-300">Edge Case #{i + 1}: </span>
                  {ec}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Interview Memory Card */}
      {activeTab === 'memory' && (
        <div className="max-w-2xl mx-auto w-full bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Quick Placement Revision Card
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">{pattern.name}</h2>
            </div>
            <span className="bg-emerald-950 text-emerald-300 font-mono text-xs px-3 py-1 rounded-full border border-emerald-700">
              {pattern.interviewMemoryCard.typicalComplexity}
            </span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">INTERVIEW CLUE:</span>
              <p className="text-slate-300">{pattern.interviewMemoryCard.clue}</p>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">HOW TO THINK:</span>
              <p className="text-slate-300">{pattern.interviewMemoryCard.think}</p>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">COMMON INTERVIEW TRAP:</span>
              <p className="text-slate-300">{pattern.interviewMemoryCard.commonTrap}</p>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">JAVA SYNTAX SKELETON:</span>
              <pre className="text-emerald-300 text-[11px] overflow-x-auto whitespace-pre p-2 bg-slate-900 rounded-lg">
                {pattern.interviewMemoryCard.javaSnippet}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* "EXPLAIN THIS STEP" MODAL */}
      {showExplainModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Deep Step Explanation (Step #{currentStepIndex + 1})</span>
              </div>
              <button
                onClick={() => setShowExplainModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs leading-relaxed text-slate-200 font-sans">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 font-bold block mb-1 uppercase">
                  Action Executed:
                </span>
                <p className="text-amber-200 font-medium">
                  {currentStep?.title}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 font-bold block mb-1 uppercase">
                  Logical Reasoning:
                </span>
                <p className="text-slate-300">
                  {currentStep?.explanation}
                </p>
              </div>

              {currentStep?.beginnerNote && (
                <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-indigo-200">
                  <span className="font-mono text-[11px] text-indigo-300 font-bold block mb-1">
                    BEGGINER INTUITION:
                  </span>
                  <p>{currentStep.beginnerNote}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              {onSelectTab && (
                <button
                  onClick={() => {
                    try {
                      sessionStorage.setItem(
                        'dsa_ai_pending_prompt',
                        `I am studying the "${pattern.name}" pattern in Java. In Step ${currentStepIndex + 1} ("${currentStep?.title}"), the explanation states: "${currentStep?.explanation}". Can you explain the deep algorithmic intuition, what memory changes occur in Java, and what common interview traps exist for this step?`
                      );
                    } catch {
                      // ignore
                    }
                    setShowExplainModal(false);
                    onSelectTab('ai-expert');
                  }}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono text-xs font-bold rounded-xl shadow flex items-center justify-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Ask AI Expert More</span>
                </button>
              )}
              <button
                onClick={() => setShowExplainModal(false)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-semibold rounded-xl border border-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
