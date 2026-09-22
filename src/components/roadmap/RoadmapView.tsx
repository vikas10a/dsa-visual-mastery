import React, { useState } from 'react';
import { CORE_15_PATTERNS } from '../../data/patternsData';
import { CheckCircle2, ArrowRight, BookOpen, Clock, Lock, Sparkles, Trophy } from 'lucide-react';

interface RoadmapNode {
  id: string;
  stage: number;
  title: string;
  category: string;
  estimatedHours: number;
  description: string;
  coreConcepts: string[];
  associatedPatternId?: string;
  mustSolveProblems: string[];
}

const ROADMAP_STAGES: RoadmapNode[] = [
  {
    id: 'java-fundamentals',
    stage: 1,
    title: 'Java Fundamentals & Big-O Complexity',
    category: 'Foundations',
    estimatedHours: 8,
    description: 'Master time and space complexity analysis, primitive vs reference types, and standard memory models.',
    coreConcepts: ['Big-O Analysis (O(1) to O(2^N))', 'Primitives vs Objects', 'Garbage Collection & JVM Heap', 'Integer overflow traps'],
    mustSolveProblems: ['Count operations loop', 'Compare ArrayList vs ArrayDeque']
  },
  {
    id: 'arrays-strings',
    stage: 2,
    title: 'Arrays, Strings & Frequency Counting',
    category: 'Core Data Structures',
    estimatedHours: 12,
    description: 'In-place manipulations, string builder optimization, and frequency hashing.',
    coreConcepts: ['StringBuilder in-place mutation', 'Frequency array int[26]', 'HashMap putIfAbsent / getOrDefault'],
    associatedPatternId: 'frequency-counting',
    mustSolveProblems: ['Valid Anagram', 'Group Anagrams', 'Two Sum']
  },
  {
    id: 'two-pointers-window',
    stage: 3,
    title: 'Two Pointers & Sliding Window',
    category: 'Essential Pointer Patterns',
    estimatedHours: 16,
    description: 'The two foundational patterns for linear array/string problems in O(N) time and O(1) space.',
    coreConcepts: ['Opposite-ends inward convergence', 'Fixed vs Variable size window', 'Window validity maintenance'],
    associatedPatternId: 'two-pointers',
    mustSolveProblems: ['Two Sum II Sorted', '3Sum', 'Longest Substring Without Repeating Characters', 'Minimum Size Subarray Sum']
  },
  {
    id: 'prefix-fast-slow',
    stage: 4,
    title: 'Prefix Sum & Fast-Slow Pointers',
    category: 'Range Queries & Cycles',
    estimatedHours: 10,
    description: 'Constant time range queries and Floyd cycle detection algorithm in linked structures.',
    coreConcepts: ['Prefix sum array: sum(i..j) = P[j+1] - P[i]', 'Running sum hash map for target difference', 'Tortoise and Hare pointer speeds'],
    associatedPatternId: 'prefix-sum',
    mustSolveProblems: ['Subarray Sum Equals K', 'Linked List Cycle', 'Find the Duplicate Number']
  },
  {
    id: 'stack-queue-monotonic',
    stage: 5,
    title: 'Stacks, Queues & Monotonic Deque',
    category: 'Linear Structures',
    estimatedHours: 14,
    description: 'Master ArrayDeque as modern stack/queue and monotonic stacks for Next Greater Element.',
    coreConcepts: ['ArrayDeque vs java.util.Stack', 'Monotonic decreasing stack for next greater', 'Sliding window maximum with Deque'],
    associatedPatternId: 'monotonic-stack',
    mustSolveProblems: ['Daily Temperatures', 'Valid Parentheses', 'Next Greater Element I', 'Largest Rectangle in Histogram']
  },
  {
    id: 'binary-search-intervals',
    stage: 6,
    title: 'Binary Search & Intervals Merging',
    category: 'Logarithmic & Scheduling',
    estimatedHours: 14,
    description: 'Binary search on sorted arrays and answer spaces; interval sorting and merging sweeps.',
    coreConcepts: ['mid = left + (right - left) / 2', 'Binary search on answer predicate', 'Sorting intervals by start time'],
    associatedPatternId: 'binary-search',
    mustSolveProblems: ['Binary Search', 'Search in Rotated Sorted Array', 'Merge Intervals', 'Meeting Rooms II']
  },
  {
    id: 'heaps-top-k',
    stage: 7,
    title: 'Binary Heaps & Top K Elements',
    category: 'Priority Queues',
    estimatedHours: 12,
    description: 'PriorityQueue comparator traps, K-way merges, and streaming top K extraction.',
    coreConcepts: ['Min-Heap bounded to size K for Kth largest', 'Integer.compare(a, b) comparator safety', 'Two Heaps for running median'],
    associatedPatternId: 'top-k-elements',
    mustSolveProblems: ['Kth Largest Element', 'Top K Frequent Elements', 'Find Median from Data Stream', 'Merge K Sorted Lists']
  },
  {
    id: 'trees-bfs-dfs',
    stage: 8,
    title: 'Binary Trees, BST & Tree Traversals',
    category: 'Hierarchical Structures',
    estimatedHours: 20,
    description: 'Level-order BFS, DFS preorder/inorder/postorder, and Binary Search Tree properties.',
    coreConcepts: ['Queue level-by-level sizing: int size = queue.size()', 'BST in-order sorted traversal', 'Lowest Common Ancestor'],
    associatedPatternId: 'tree-bfs',
    mustSolveProblems: ['Binary Tree Level Order Traversal', 'Validate BST', 'Maximum Depth of Binary Tree', 'Lowest Common Ancestor']
  },
  {
    id: 'graphs-bfs-dfs',
    stage: 9,
    title: 'Graphs: BFS, DFS & Topological Sort',
    category: 'Networks & Dependencies',
    estimatedHours: 24,
    description: 'Adjacency lists, visited tracking, cycle detection, Kahn algorithm for DAG topological ordering.',
    coreConcepts: ['Graph representation: Map<Integer, List<Integer>>', 'Mark visited ON ENQUEUE in BFS', 'In-degree array for Kahn\'s algorithm'],
    associatedPatternId: 'graph-dfs-bfs',
    mustSolveProblems: ['Number of Islands', 'Course Schedule', 'Clone Graph', 'Rotting Oranges']
  },
  {
    id: 'backtracking',
    stage: 10,
    title: 'Backtracking & State Exploration',
    category: 'Combinatorics',
    estimatedHours: 16,
    description: 'Systematic exploration of decision trees with choice -> recurse -> backtrack state restoration.',
    coreConcepts: ['Base case check', 'Loop through candidates', 'list.remove(list.size() - 1) cleanup'],
    associatedPatternId: 'backtracking',
    mustSolveProblems: ['Subsets', 'Permutations', 'Combination Sum', 'N-Queens']
  },
  {
    id: 'dynamic-programming',
    stage: 11,
    title: 'Dynamic Programming (1D, 2D & Knapsack)',
    category: 'Optimal Substructure',
    estimatedHours: 30,
    description: 'Memoization top-down and tabulation bottom-up, state definition, and transition formulas.',
    coreConcepts: ['dp[i] state representation', 'Transition equation', 'Base case initialization', '0/1 Knapsack & Unbounded'],
    associatedPatternId: 'dynamic-programming',
    mustSolveProblems: ['Climbing Stairs', 'Coin Change', 'Longest Increasing Subsequence', 'Longest Common Subsequence']
  }
];

interface RoadmapViewProps {
  onSelectPattern: (patternId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onSelectPattern }) => {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode>(ROADMAP_STAGES[0]);
  const [completedStages, setCompletedStages] = useState<string[]>(['java-fundamentals', 'arrays-strings']);

  const toggleCompleted = (id: string) => {
    if (completedStages.includes(id)) {
      setCompletedStages(completedStages.filter((s) => s !== id));
    } else {
      setCompletedStages([...completedStages, id]);
    }
  };

  const progressPercent = Math.round((completedStages.length / ROADMAP_STAGES.length) * 100);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-12">
      {/* Header & Progress Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Trophy className="w-4 h-4 text-amber-400" />
              Structured Curriculum
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Java DSA Mastery Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
              Zero to FAANG placement curriculum sequenced by mathematical dependency
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Roadmap Progress:</span>
              <span className="text-emerald-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block text-right">
              {completedStages.length} of {ROADMAP_STAGES.length} Stages Mastered
            </span>
          </div>
        </div>
      </div>

      {/* Main Roadmap Split View: Sequence List on Left, Detail Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stage Timeline List (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {ROADMAP_STAGES.map((node) => {
            const isCompleted = completedStages.includes(node.id);
            const isSelected = selectedNode.id === node.id;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow ${
                  isSelected
                    ? 'bg-slate-850 border-emerald-500/80 ring-2 ring-emerald-500/20 shadow-emerald-950/30'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompleted(node.id);
                    }}
                    className="shrink-0"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-600 hover:border-slate-400"></div>
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                        Stage {node.stage}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {node.category}
                      </span>
                    </div>
                    <h3 className={`text-sm font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {node.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {node.estimatedHours}h
                  </span>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-slate-900/95 border border-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col gap-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                  Stage #{selectedNode.stage} Blueprint
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  {selectedNode.title}
                </h2>
              </div>
              <span className="text-xs font-mono bg-slate-950 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800">
                ~{selectedNode.estimatedHours} Hours
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {selectedNode.description}
            </p>

            {/* Core Concepts */}
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                Core Conceptual Milestones:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                {selectedNode.coreConcepts.map((concept, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">▹</span>
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Must-Solve Interview Problems */}
            <div className="border-t border-slate-800 pt-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Benchmark Interview Problems:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.mustSolveProblems.map((prob, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono bg-slate-950 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg"
                  >
                    {prob}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-2 pt-3 border-t border-slate-800 flex flex-col gap-2">
              {selectedNode.associatedPatternId ? (
                <button
                  onClick={() => onSelectPattern(selectedNode.associatedPatternId!)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-950/40"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Visual Pattern Simulation</span>
                </button>
              ) : (
                <div className="text-center text-xs font-mono text-slate-500 py-1">
                  Foundational theory milestone
                </div>
              )}

              <button
                onClick={() => toggleCompleted(selectedNode.id)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition"
              >
                {completedStages.includes(selectedNode.id)
                  ? 'Mark as Incomplete'
                  : '✓ Mark Stage Completed'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
