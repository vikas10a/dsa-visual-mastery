import React, { useState } from 'react';
import { DsaConcept } from '../../data/dsaConceptsData';
import { Problem } from '../../types';
import { DsaLogo } from '../common/DsaLogo';
import {
  Layers,
  CheckCircle2,
  Code2,
  ChevronDown,
  ChevronUp,
  Building2,
  Flame,
  ArrowRight,
  Sparkles,
  Trophy,
  Search,
  BookOpen
} from 'lucide-react';

interface ConceptRoadmapViewProps {
  concepts: DsaConcept[];
  allProblems: Problem[];
  solvedProblemIds: string[];
  onSelectProblem: (problem: Problem) => void;
  onFilterByConcept: (conceptId: string) => void;
}

export const ConceptRoadmapView: React.FC<ConceptRoadmapViewProps> = ({
  concepts,
  allProblems,
  solvedProblemIds,
  onSelectProblem,
  onFilterByConcept
}) => {
  const [conceptSearch, setConceptSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedConceptIds, setExpandedConceptIds] = useState<string[]>(() =>
    concepts.slice(0, 3).map((c) => c.id)
  );

  const toggleExpand = (conceptId: string) => {
    if (expandedConceptIds.includes(conceptId)) {
      setExpandedConceptIds(expandedConceptIds.filter((id) => id !== conceptId));
    } else {
      setExpandedConceptIds([...expandedConceptIds, conceptId]);
    }
  };

  const expandAll = () => {
    setExpandedConceptIds(concepts.map((c) => c.id));
  };

  const collapseAll = () => {
    setExpandedConceptIds([]);
  };

  const categories = [
    'All',
    'Linear & Pointers',
    'Windows & Stacks',
    'Linked Structures',
    'Searching & Bisection',
    'Trees & Hierarchies',
    'Heaps & Priority',
    'Exhaustive Search',
    'Graph Traversal',
    'Dynamic Programming',
    'Greedy & Bit'
  ];

  // Group problems by concept
  const problemsByConcept: Record<string, Problem[]> = {};
  concepts.forEach((c) => {
    problemsByConcept[c.id] = allProblems.filter(
      (p) =>
        p.conceptId === c.id ||
        (p.conceptName && p.conceptName.toLowerCase().includes(c.name.toLowerCase()))
    );
  });

  const filteredConcepts = concepts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(conceptSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(conceptSearch.toLowerCase()) ||
      c.coreRule.toLowerCase().includes(conceptSearch.toLowerCase()) ||
      (problemsByConcept[c.id] || []).some(
        (p) =>
          p.title.toLowerCase().includes(conceptSearch.toLowerCase()) ||
          (p.leetcodeNumber && p.leetcodeNumber.toString().includes(conceptSearch))
      );

    const matchesCategory =
      selectedCategory === 'All' ||
      c.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const totalConceptProblems = allProblems.length;
  const totalSolved = solvedProblemIds.length;
  const overallPercent = Math.min(100, Math.round((totalSolved / totalConceptProblems) * 100));

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Concept Roadmap Header Overview */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <DsaLogo variant="icon" size="lg" className="shrink-0 hidden sm:flex" />
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Layers className="w-4 h-4 text-cyan-400" />
              Concept-Wise Master Curriculum
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 flex items-center gap-2">
              100+ Placement Questions Organized by DSA Concept
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1 max-w-3xl">
              Master the underlying algorithmic invariant for each concept rather than memorizing individual solutions. Each concept contains top tier-1 company problems with verified Java solutions.
            </p>
          </div>
        </div>

        {/* Global Stats */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-center min-w-[170px]">
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Overall:
              </span>
              <span className="text-emerald-400 font-bold">
                {totalSolved} / {totalConceptProblems}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Concept Filtering & Quick Controls */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Concept Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts or questions (e.g. 'Two Pointers', 'Subarray', 'Binary Search Tree', '#42')..."
              value={conceptSearch}
              onChange={(e) => setConceptSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Expand/Collapse All */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-mono text-slate-300 border border-slate-800 transition"
            >
              Expand All ({concepts.length})
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-mono text-slate-300 border border-slate-800 transition"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-slate-500 text-[11px] font-bold mr-1 shrink-0 flex items-center gap-1">
            Domain:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition text-[11px] ${
                  isSelected
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* List of Concepts and their respective 100+ questions */}
      <div className="flex flex-col gap-4">
        {filteredConcepts.map((concept, index) => {
          const isExpanded = expandedConceptIds.includes(concept.id);
          const conceptProblems = problemsByConcept[concept.id] || [];
          const solvedInConcept = conceptProblems.filter((p) => solvedProblemIds.includes(p.id)).length;
          const conceptPercent =
            conceptProblems.length > 0
              ? Math.round((solvedInConcept / conceptProblems.length) * 100)
              : 0;

          return (
            <div
              key={concept.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              {/* Concept Accordion Header */}
              <div
                onClick={() => toggleExpand(concept.id)}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 font-bold">
                        {concept.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {concept.timeComplexityGuideline}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-mono mt-0.5 flex items-center gap-2">
                      {concept.name}
                    </h3>
                  </div>
                </div>

                {/* Right Progress & Expand icon */}
                <div className="flex items-center justify-between md:justify-end gap-4">
                  {/* Solved Progress Bar */}
                  <div className="flex flex-col items-end min-w-[130px]">
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <span className="text-slate-400">Progress:</span>
                      <span className="text-emerald-400 font-bold">
                        {solvedInConcept} / {conceptProblems.length} ({conceptPercent}%)
                      </span>
                    </div>
                    <div className="w-32 bg-slate-800 rounded-full h-1.5 overflow-hidden mt-1">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${conceptPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFilterByConcept(concept.id);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1 transition"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Practice ({conceptProblems.length})</span>
                    </button>

                    <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion Expanded Body */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 flex flex-col gap-4">
                  {/* Algorithmic Invariant Box */}
                  <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-amber-300 font-bold mr-1">Core Invariant:</span>
                        <span className="text-slate-300">{concept.coreRule}</span>
                      </div>
                    </div>
                    <div className="text-cyan-300 shrink-0">
                      <span className="text-slate-500">Top Recruiters: </span>
                      {concept.commonCompanies.slice(0, 3).join(', ')}
                    </div>
                  </div>

                  {/* List of Problems in this Concept */}
                  <div className="flex flex-col gap-2">
                    <div className="text-xs font-mono text-slate-400 px-1 font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>Curated LeetCode Problems for {concept.name}</span>
                      <span>{conceptProblems.length} High-Yield Problems</span>
                    </div>

                    {conceptProblems.length === 0 ? (
                      <div className="p-4 text-center text-xs font-mono text-slate-500 bg-slate-950 rounded-xl border border-slate-800">
                        Problems are indexing into this concept.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {conceptProblems.map((prob) => {
                          const isSolved = solvedProblemIds.includes(prob.id);
                          return (
                            <div
                              key={prob.id}
                              className="p-3 bg-slate-950/90 border border-slate-800/90 rounded-xl flex flex-col justify-between gap-2.5 hover:border-slate-700 transition"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <div className="flex items-center gap-1.5">
                                    {prob.leetcodeNumber && (
                                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/60">
                                        #{prob.leetcodeNumber}
                                      </span>
                                    )}
                                    <span
                                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
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

                                  {isSolved && (
                                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                      Solved
                                    </span>
                                  )}
                                </div>

                                <h4 className="text-sm font-bold text-white font-mono line-clamp-1">
                                  {prob.title}
                                </h4>

                                {prob.companies && prob.companies.length > 0 && (
                                  <div className="flex items-center gap-1 flex-wrap mt-1">
                                    {prob.companies.slice(0, 3).map((comp) => (
                                      <span
                                        key={comp}
                                        className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800"
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

                              {/* Action Row */}
                              <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                                <span className="text-[11px] font-mono text-cyan-400">
                                  {prob.patternName}
                                </span>

                                <button
                                  onClick={() => onSelectProblem(prob)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1 shadow transition"
                                >
                                  <Code2 className="w-3.5 h-3.5" />
                                  <span>Solve in Java</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
