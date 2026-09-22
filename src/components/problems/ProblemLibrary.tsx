import React, { useState, useEffect } from 'react';
import { PROBLEMS_DATA } from '../../data/problemsData';
import { DSA_CONCEPTS_LIST, DsaConcept } from '../../data/dsaConceptsData';
import { Problem } from '../../types';
import {
  Search,
  BookOpen,
  Sparkles,
  Lightbulb,
  Code2,
  Play,
  CheckCircle,
  Building2,
  Briefcase,
  Flame,
  Clock,
  Layers,
  CheckCircle2,
  Cpu,
  HelpCircle,
  Award,
  ChevronRight,
  Filter,
  Trophy,
  Compass,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  LayoutGrid,
  FileCode2
} from 'lucide-react';
import { CodePlaygroundRunner } from './CodePlaygroundRunner';
import { PlacementMockTestModal } from './PlacementMockTestModal';
import { ConceptRoadmapView } from './ConceptRoadmapView';

interface ProblemLibraryProps {
  onSelectPattern: (patternId: string) => void;
  onOpenAiWithPrompt?: (prompt: string) => void;
}

export const ProblemLibrary: React.FC<ProblemLibraryProps> = ({
  onSelectPattern,
  onOpenAiWithPrompt
}) => {
  const [viewMode, setViewMode] = useState<'workspace' | 'concept-matrix'>('workspace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedConcept, setSelectedConcept] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const [activeProblem, setActiveProblem] = useState<Problem>(PROBLEMS_DATA[0]);
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'practice' | 'analysis' | 'hints' | 'solution' | 'pitch'>('practice');
  const [expandedConceptId, setExpandedConceptId] = useState<string | null>(null);

  const [solvedProblemIds, setSolvedProblemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dsa_solved_problems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);

  // Load active problem
  const handleSelectProblem = (p: Problem) => {
    setActiveProblem(p);
    setUnlockedHints([]);
  };

  const handleProblemSolved = (id: string) => {
    if (!solvedProblemIds.includes(id)) {
      const updated = [...solvedProblemIds, id];
      setSolvedProblemIds(updated);
      try {
        localStorage.setItem('dsa_solved_problems', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  const unlockNextHint = () => {
    if (unlockedHints.length < activeProblem.hints.length) {
      setUnlockedHints([...unlockedHints, unlockedHints.length]);
    }
  };

  const handleAskAi = (prompt: string) => {
    try {
      sessionStorage.setItem('dsa_ai_pending_prompt', prompt);
    } catch {
      // ignore
    }
    if (onOpenAiWithPrompt) {
      onOpenAiWithPrompt(prompt);
    }
  };

  // Companies list
  const companiesList = ['All', 'Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Bloomberg', 'Goldman Sachs'];

  // Categories list
  const categoriesList = [
    'All',
    'Arrays & Two Pointers',
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Stack & Monotonic Stack',
    'Linked List',
    'Binary Search',
    'Trees & BST',
    'Heap & PriorityQueue',
    'Backtracking',
    'Dynamic Programming',
    'Graph Algorithms',
    'Intervals & Greedy'
  ];

  // Filter problems
  const filteredProblems = PROBLEMS_DATA.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patternName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.conceptName && p.conceptName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.leetcodeNumber && p.leetcodeNumber.toString().includes(searchQuery));

    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

    const matchesCompany =
      selectedCompany === 'All' ||
      (p.companies && p.companies.some((c) => c.toLowerCase() === selectedCompany.toLowerCase()));

    const matchesConcept =
      selectedConcept === 'All' ||
      p.conceptId === selectedConcept ||
      (p.conceptName && p.conceptName.toLowerCase().includes(selectedConcept.toLowerCase()));

    const isSolved = solvedProblemIds.includes(p.id);
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Solved' && isSolved) ||
      (selectedStatus === 'Unsolved' && !isSolved);

    return matchesSearch && matchesDiff && matchesCompany && matchesConcept && matchesStatus;
  });

  const solvedCount = solvedProblemIds.length;
  const progressPercent = Math.min(100, Math.round((solvedCount / PROBLEMS_DATA.length) * 100));

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-16 px-2 sm:px-4">
      {/* Header Banner */}
      <div className="bg-slate-900/95 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            Top Company Placement & Interview Problem Set
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight mt-1 flex items-center gap-2.5">
            Top LeetCode Interview Problems in Java
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500 shrink-0" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Real FAANG & Tier-1 placement questions with interactive Java runner, Run & Submit test suite, concept deep-dives & AI review.
          </p>
        </div>

        {/* Action & Stats Panel */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Progress Tracker */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-center min-w-[210px]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400 font-bold flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Solved:
              </span>
              <span className="text-emerald-400 font-bold">
                {solvedCount} / {PROBLEMS_DATA.length} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Launch Placement Mock Test */}
          <button
            onClick={() => setIsPlacementModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-950/60 border border-emerald-500 transition"
          >
            <Clock className="w-4 h-4" />
            <span>Placement Mock Test</span>
          </button>
        </div>
      </div>

      {/* View Mode Switcher: Workspace vs Concept-Wise Roadmap */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('workspace')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
              viewMode === 'workspace'
                ? 'bg-emerald-600 text-white shadow-md border border-emerald-500'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Code Practice & Runner ({filteredProblems.length} Problems)</span>
          </button>

          <button
            onClick={() => setViewMode('concept-matrix')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
              viewMode === 'concept-matrix'
                ? 'bg-cyan-600 text-white shadow-md border border-cyan-500'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-cyan-300" />
            <span>Concept-Wise DSA Roadmap (100+ Questions across 17 Concepts)</span>
          </button>
        </div>

        <div className="text-xs font-mono text-slate-400 px-2 flex items-center gap-2">
          <span className="text-amber-400 font-bold">100+ Top Placement Questions</span>
          <span>•</span>
          <span className="text-slate-400">All Java Solutions with Run & Submit</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by problem name, LeetCode #, pattern, or concept (e.g., 'Trapping Rain', '42', 'Monotonic Stack', 'DP')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Status & Difficulty Controls */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {/* Status Filter */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono shrink-0">
              {['All', 'Solved', 'Unsolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedStatus === st
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono shrink-0">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedDifficulty === diff
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Concept Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-slate-500 text-[11px] font-bold mr-1 shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Concepts:
          </span>
          <button
            onClick={() => setSelectedConcept('All')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition text-[11px] ${
              selectedConcept === 'All'
                ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Concepts (100+)
          </button>
          {DSA_CONCEPTS_LIST.map((c) => {
            const isSelected = selectedConcept === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedConcept(c.id)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition text-[11px] ${
                  isSelected
                    ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Company Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-slate-500 text-[11px] font-bold mr-1 shrink-0 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" /> Companies:
          </span>
          {companiesList.map((comp) => {
            const isSelected = selectedCompany === comp;
            return (
              <button
                key={comp}
                onClick={() => setSelectedCompany(comp)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition text-[11px] ${
                  isSelected
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {comp}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Split Workspace View OR Concept Roadmap View */}
      {viewMode === 'workspace' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Problems List Sidebar (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 max-h-[820px] overflow-y-auto pr-1">
          <div className="text-xs font-mono text-slate-400 px-1 flex items-center justify-between">
            <span>Showing {filteredProblems.length} Problems</span>
            {selectedCompany !== 'All' && <span className="text-cyan-400">Target: {selectedCompany}</span>}
          </div>

          {filteredProblems.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
              <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs font-mono text-slate-400">No problems found matching filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDifficulty('All');
                  setSelectedCompany('All');
                  setSelectedStatus('All');
                }}
                className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-slate-200 hover:bg-slate-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredProblems.map((prob) => {
              const isSelected = activeProblem.id === prob.id;
              const isSolved = solvedProblemIds.includes(prob.id);

              return (
                <button
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col gap-1.5 shadow ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/80 ring-2 ring-emerald-500/20'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50'
                  }`}
                >
                  {/* Top row: LC#, Difficulty, Solved check */}
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      {prob.leetcodeNumber && (
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                          #{prob.leetcodeNumber}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          prob.difficulty === 'Easy'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : prob.difficulty === 'Medium'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isSolved && (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Solved
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">
                        {prob.patternName}
                      </span>
                    </div>
                  </div>

                  {/* Problem Title */}
                  <h3 className={`text-sm font-bold font-mono ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {prob.title}
                  </h3>

                  {/* Concept Name & Companies preview */}
                  <div className="flex flex-col gap-1 mt-0.5">
                    {prob.conceptName && (
                      <span className="text-[11px] font-mono text-slate-400 line-clamp-1">
                        ⚡ {prob.conceptName}
                      </span>
                    )}

                    {prob.companies && prob.companies.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap mt-0.5">
                        {prob.companies.slice(0, 3).map((comp) => (
                          <span
                            key={comp}
                            className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800/80"
                          >
                            {comp}
                          </span>
                        ))}
                        {prob.companies.length > 3 && (
                          <span className="text-[9px] font-mono text-slate-500">
                            +{prob.companies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Selected Problem Deep Detail Workspace (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
          {/* Problem Header Information */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {activeProblem.leetcodeNumber && (
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/70 border border-amber-800/80 px-2 py-0.5 rounded">
                    LeetCode #{activeProblem.leetcodeNumber}
                  </span>
                )}
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
                    activeProblem.difficulty === 'Easy'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : activeProblem.difficulty === 'Medium'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {activeProblem.difficulty}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {activeProblem.patternName}
                </span>
                {activeProblem.acceptanceRate && (
                  <span className="text-xs font-mono text-slate-400">
                    Acceptance: {activeProblem.acceptanceRate}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1.5">
                {activeProblem.title}
              </h2>

              {activeProblem.conceptName && (
                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/30 border border-cyan-800/40 px-3 py-1 rounded-lg w-fit">
                  <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-bold">Core Concept:</span>
                  <span>{activeProblem.conceptName}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onSelectPattern(activeProblem.patternId)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold border border-slate-700 shadow shrink-0 transition"
              >
                <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
                <span>Simulate Pattern</span>
              </button>

              <button
                onClick={() =>
                  handleAskAi(
                    `Can you explain the algorithmic concept behind "${activeProblem.title}" (LeetCode #${activeProblem.leetcodeNumber})? It falls under the "${activeProblem.conceptName}" concept and "${activeProblem.patternName}" pattern. Walk me through the core intuition, invariants, time/space trade-offs in Java, and what interviewers look for.`
                  )
                }
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/70 hover:bg-purple-900/80 text-purple-200 font-mono text-xs font-bold border border-purple-700/80 shadow shrink-0 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Ask AI Concept Expert</span>
              </button>
            </div>
          </div>

          {/* Companies Tags */}
          {activeProblem.companies && activeProblem.companies.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
              <span className="text-slate-500 font-bold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" /> Frequently Asked in:
              </span>
              {activeProblem.companies.map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 text-[11px]"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Workspace Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveWorkspaceTab('practice')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeWorkspaceTab === 'practice'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Practice & Run / Submit</span>
            </button>

            <button
              onClick={() => setActiveWorkspaceTab('analysis')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeWorkspaceTab === 'analysis'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Problem Analysis & Clues</span>
            </button>

            <button
              onClick={() => setActiveWorkspaceTab('hints')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeWorkspaceTab === 'hints'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Hints ({unlockedHints.length}/{activeProblem.hints.length})</span>
            </button>

            <button
              onClick={() => setActiveWorkspaceTab('solution')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeWorkspaceTab === 'solution'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Java Solution</span>
            </button>

            <button
              onClick={() => setActiveWorkspaceTab('pitch')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeWorkspaceTab === 'pitch'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Interview Pitch</span>
            </button>
          </div>

          {/* TAB 1: PRACTICE CODE RUNNER (RUN & SUBMIT BUTTONS) */}
          {activeWorkspaceTab === 'practice' && (
            <div className="flex flex-col gap-4">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>
                  Write your Java solution below. Click <strong className="text-cyan-300">Run Code</strong> to test sample cases, or <strong className="text-emerald-400">Submit</strong> to evaluate all visible and hidden edge cases.
                </span>
              </div>

              <CodePlaygroundRunner
                problem={activeProblem}
                onAskAi={handleAskAi}
                onProblemSolved={handleProblemSolved}
              />
            </div>
          )}

          {/* TAB 2: PROBLEM ANALYSIS & CLUES */}
          {activeWorkspaceTab === 'analysis' && (
            <div className="flex flex-col gap-5">
              {/* Description */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  Problem Description
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {activeProblem.description}
                </p>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                  Examples
                </span>
                {activeProblem.examples.map((ex, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs space-y-1">
                    <div>
                      <span className="text-slate-500">Input: </span>
                      <span className="text-slate-200">{ex.input}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Output: </span>
                      <span className="text-emerald-400 font-bold">{ex.output}</span>
                    </div>
                    {ex.explanation && (
                      <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/80">
                        {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs">
                <span className="text-slate-400 font-bold uppercase block mb-1.5">Constraints:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {activeProblem.constraints.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Pattern Recognition Clues Box */}
              <div className="p-4 bg-cyan-950/20 border border-cyan-800/40 rounded-xl">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Pattern Recognition Clues:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                  {activeProblem.patternClues.map((clue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400">▹</span>
                      <span>{clue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brute Force vs Optimal Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-rose-400 font-bold uppercase">Brute Force:</span>
                    <span className="text-rose-300 font-bold">{activeProblem.bruteForce.timeComplexity}</span>
                  </div>
                  <p className="text-slate-400 font-sans leading-relaxed">
                    {activeProblem.bruteForce.approach}
                  </p>
                  <div className="mt-2.5 text-[11px] text-rose-300/80">
                    <span className="font-bold">Bottleneck:</span> {activeProblem.bruteForce.bottleneck}
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-emerald-400 font-bold uppercase">Optimal Solution:</span>
                    <span className="text-emerald-300 font-bold">{activeProblem.optimizedApproach.timeComplexity}</span>
                  </div>
                  <p className="text-slate-400 font-sans leading-relaxed">
                    {activeProblem.optimizedApproach.concept}
                  </p>
                  <div className="mt-2.5 text-[11px] text-emerald-300/80">
                    <span className="font-bold">Key Insight:</span> {activeProblem.optimizedApproach.keyIdea}
                  </div>
                </div>
              </div>

              {/* Dry Run Steps Trace */}
              {activeProblem.dryRunSteps && activeProblem.dryRunSteps.length > 0 && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs">
                  <span className="text-slate-300 font-bold uppercase block mb-2">Step-by-Step Dry Run Trace:</span>
                  <div className="space-y-2">
                    {activeProblem.dryRunSteps.map((step) => (
                      <div key={step.step} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                        <div>
                          <span className="text-emerald-400 font-bold mr-2">Step {step.step}:</span>
                          <span className="text-cyan-300">{step.vars}</span>
                          <span className="text-slate-400 ml-2">→ {step.action}</span>
                        </div>
                        <span className="text-amber-300 font-semibold">{step.outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROGRESSIVE HINTS */}
          {activeWorkspaceTab === 'hints' && (
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" /> Tiered Progressive Hints ({unlockedHints.length}/{activeProblem.hints.length})
                </span>
                {unlockedHints.length < activeProblem.hints.length && (
                  <button
                    onClick={unlockNextHint}
                    className="text-xs font-mono px-3.5 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 transition font-bold"
                  >
                    Reveal Hint #{unlockedHints.length + 1}
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                {unlockedHints.map((idx) => (
                  <div key={idx} className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-lg text-xs text-amber-200 font-mono">
                    <span className="font-bold text-amber-400 block mb-1">Hint {idx + 1}:</span>
                    {activeProblem.hints[idx]}
                  </div>
                ))}
                {unlockedHints.length === 0 && (
                  <div className="p-6 text-center text-slate-500 font-mono text-xs italic bg-slate-900/40 rounded-lg border border-slate-800/60">
                    Try solving without hints first! Click "Reveal Hint" whenever you need guidance.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: COMPLETE JAVA SOLUTION */}
          {activeWorkspaceTab === 'solution' && (
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-emerald-950/30 border border-emerald-800/50 rounded-xl text-xs font-mono text-emerald-300 flex items-center justify-between">
                <span>Production-ready optimal Java solution with time/space complexity analysis.</span>
                <span className="font-bold">{activeProblem.optimizedApproach.timeComplexity} Time</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-hidden">
                <pre className="text-emerald-300 text-xs font-mono overflow-x-auto whitespace-pre p-3 bg-slate-900 rounded-lg leading-relaxed">
                  {activeProblem.javaSolution}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: INTERVIEW PITCH SCRIPT */}
          {activeWorkspaceTab === 'pitch' && (
            <div className="p-5 bg-purple-950/30 border border-purple-800/60 rounded-xl text-xs text-purple-200 font-sans leading-relaxed space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-purple-300 font-bold uppercase text-[11px]">
                  Verbatim Interviewer Pitch Script (60-Second Explanation)
                </span>
              </div>
              <p className="text-sm font-serif italic text-purple-100 bg-slate-950/60 p-4 rounded-lg border border-purple-900/40 leading-relaxed">
                {activeProblem.interviewExplanationScript}
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-purple-900/40">
                Tip: Speak clearly, state your asymptotic bounds before writing code, and mention edge cases first.
              </div>
            </div>
          )}
        </div>
      </div>
      ) : (
        <ConceptRoadmapView
          concepts={DSA_CONCEPTS_LIST}
          allProblems={PROBLEMS_DATA}
          solvedProblemIds={solvedProblemIds}
          onSelectProblem={(prob) => {
            handleSelectProblem(prob);
            setViewMode('workspace');
            setActiveWorkspaceTab('practice');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onFilterByConcept={(conceptId) => {
            setSelectedConcept(conceptId);
            setViewMode('workspace');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Placement Mock Test Modal */}
      <PlacementMockTestModal
        isOpen={isPlacementModalOpen}
        onClose={() => setIsPlacementModalOpen(false)}
        allProblems={PROBLEMS_DATA}
        onSelectProblemForTest={(p) => {
          handleSelectProblem(p);
          setActiveWorkspaceTab('practice');
        }}
        solvedProblemIds={solvedProblemIds}
      />
    </div>
  );
};
