import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, CornerDownRight, Sparkles } from 'lucide-react';

interface DecisionNode {
  id: string;
  label: string;
  type: 'question' | 'pattern';
  patternId?: string;
  patternName?: string;
  explanation?: string;
  children?: { answer: string; nextNode: DecisionNode }[];
}

const DECISION_TREE_DATA: DecisionNode = {
  id: 'root',
  label: 'What does the problem structure look like?',
  type: 'question',
  children: [
    {
      answer: 'Input array is Sorted or Non-decreasing',
      nextNode: {
        id: 'sorted-branch',
        label: 'Are you searching for a pair/triplet or looking up an element/threshold?',
        type: 'question',
        children: [
          {
            answer: 'Pair or triplet meeting sum/difference condition',
            nextNode: {
              id: 'res-two-pointers',
              label: 'Two Pointers (Opposite Ends)',
              type: 'pattern',
              patternId: 'two-pointers',
              patternName: 'Two Pointers',
              explanation: 'Inwards pointers Left & Right eliminate values based on sum vs target in O(N) time with O(1) space.'
            }
          },
          {
            answer: 'Searching a value or finding optimal threshold (min-max)',
            nextNode: {
              id: 'res-binary-search',
              label: 'Modified Binary Search',
              type: 'pattern',
              patternId: 'binary-search',
              patternName: 'Binary Search',
              explanation: 'Halve the search space every iteration: mid = left + (right - left) / 2 in O(log N) time.'
            }
          }
        ]
      }
    },
    {
      answer: 'Contiguous Subarray or Substring',
      nextNode: {
        id: 'res-sliding-window',
        label: 'Sliding Window',
        type: 'pattern',
        patternId: 'sliding-window',
        patternName: 'Sliding Window',
        explanation: 'Expand right pointer while valid, shrink left pointer when window condition is violated.'
      }
    },
    {
      answer: 'Next / Previous Greater or Smaller Element',
      nextNode: {
        id: 'res-monotonic-stack',
        label: 'Monotonic Stack',
        type: 'pattern',
        patternId: 'monotonic-stack',
        patternName: 'Monotonic Stack',
        explanation: 'Keep indices in increasing or decreasing order. Pop when a violating element arrives to resolve previous queries.'
      }
    },
    {
      answer: 'Top K Largest, Smallest, or Most Frequent Elements',
      nextNode: {
        id: 'res-top-k',
        label: 'Top K Elements (PriorityQueue)',
        type: 'pattern',
        patternId: 'top-k-elements',
        patternName: 'Top K Elements',
        explanation: 'Maintain a Min-Heap capped at size K. Root is the Kth largest element in O(N log K) time.'
      }
    },
    {
      answer: 'Overlapping Time Spans or Meeting Rooms',
      nextNode: {
        id: 'res-intervals',
        label: 'Overlapping Intervals',
        type: 'pattern',
        patternId: 'overlapping-intervals',
        patternName: 'Overlapping Intervals',
        explanation: 'Sort intervals by start time. Check if next.start <= current.end to merge in a single linear pass.'
      }
    },
    {
      answer: 'Linked List cycle detection or finding middle node',
      nextNode: {
        id: 'res-fast-slow',
        label: 'Fast & Slow Pointers (Floyd\'s Cycle)',
        type: 'pattern',
        patternId: 'fast-slow-pointers',
        patternName: 'Fast & Slow Pointers',
        explanation: 'Slow moves 1 step, fast moves 2 steps. If they meet, a cycle exists. O(N) time with O(1) space.'
      }
    },
    {
      answer: 'Cumulative range sums or subarray sum equals K',
      nextNode: {
        id: 'res-prefix-sum',
        label: 'Prefix Sum & Hash Array',
        type: 'pattern',
        patternId: 'prefix-sum',
        patternName: 'Prefix Sum',
        explanation: 'Precompute running totals. Sum(i..j) = prefix[j+1] - prefix[i] in O(1) query time.'
      }
    },
    {
      answer: 'Tree Level by Level or Shortest Path in unweighted graph',
      nextNode: {
        id: 'res-bfs',
        label: 'Breadth-First Search (BFS)',
        type: 'pattern',
        patternId: 'tree-bfs',
        patternName: 'Tree BFS',
        explanation: 'Queue<TreeNode> queue = new ArrayDeque<>(). Track level size to process wave by wave.'
      }
    },
    {
      answer: 'Explore all paths, deep descent, or cycle detection in graphs',
      nextNode: {
        id: 'res-dfs',
        label: 'Depth-First Search (DFS)',
        type: 'pattern',
        patternId: 'graph-dfs-bfs',
        patternName: 'Graph DFS / BFS',
        explanation: 'Recursion with boolean[] visited array. Backtrack once branch is exhausted.'
      }
    },
    {
      answer: 'Generate all combinations, subsets, or permutations',
      nextNode: {
        id: 'res-backtracking',
        label: 'Backtracking',
        type: 'pattern',
        patternId: 'backtracking',
        patternName: 'Backtracking',
        explanation: 'Choose element -> explore recursion -> undo choice (backtrack) to restore state.'
      }
    },
    {
      answer: 'Overlapping subproblems with optimal substructure (min cost / max profit)',
      nextNode: {
        id: 'res-dp',
        label: 'Dynamic Programming (1D / 2D)',
        type: 'pattern',
        patternId: 'dynamic-programming',
        patternName: 'Dynamic Programming',
        explanation: 'Express state as dp[i] = transition(dp[i-1], dp[i-2]). Memoize or bottom-up tabulate.'
      }
    }
  ]
};

interface PatternDecisionTreeProps {
  onSelectPattern: (patternId: string) => void;
}

export const PatternDecisionTree: React.FC<PatternDecisionTreeProps> = ({ onSelectPattern }) => {
  const [currentPath, setCurrentPath] = useState<DecisionNode[]>([DECISION_TREE_DATA]);

  const activeNode = currentPath[currentPath.length - 1];

  const handleSelectOption = (nextNode: DecisionNode) => {
    setCurrentPath([...currentPath, nextNode]);
  };

  const handleBackToStep = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const handleReset = () => {
    setCurrentPath([DECISION_TREE_DATA]);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <CornerDownRight className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Pattern Decision Tree
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
                Interactive flowchart leading from problem properties directly to the optimal algorithm
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          >
            Reset Tree
          </button>
        </div>

        {/* Breadcrumb Path */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-slate-500 uppercase text-[10px]">Path:</span>
          {currentPath.map((node, idx) => (
            <React.Fragment key={node.id}>
              <button
                onClick={() => handleBackToStep(idx)}
                className={`px-2.5 py-1 rounded-md transition ${
                  idx === currentPath.length - 1
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {idx === 0 ? 'Start' : node.label.slice(0, 24) + '...'}
              </button>
              {idx < currentPath.length - 1 && <span className="text-slate-600">/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Current Step Node */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        {activeNode.type === 'question' ? (
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
              Decision Point
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-5">
              {activeNode.label}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeNode.children?.map((branch, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(branch.nextNode)}
                  className="p-4 text-left rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group shadow"
                >
                  <span className="text-xs font-mono text-slate-200 group-hover:text-cyan-300">
                    {branch.answer}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Target Pattern Result */
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Target Pattern Identified
            </div>

            <h2 className="text-2xl font-extrabold text-white">
              {activeNode.patternName}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              {activeNode.explanation}
            </p>

            <div className="flex items-center gap-3 mt-2">
              {activeNode.patternId && (
                <button
                  onClick={() => onSelectPattern(activeNode.patternId!)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-lg"
                >
                  <span>OPEN IN VISUALIZER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs"
              >
                Try Another Problem
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Pattern Clue Matrix Table */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h3 className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Pattern Recognition Cheat Table
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="p-3">Problem Clue / Buzzword</th>
                <th className="p-3">Optimal Pattern</th>
                <th className="p-3">Java Data Structure</th>
                <th className="p-3">Typical Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 text-cyan-300">Sorted array + find pair with target sum</td>
                <td className="p-3 font-semibold text-white">Two Pointers</td>
                <td className="p-3 text-slate-400">int left, right</td>
                <td className="p-3 text-emerald-400 font-bold">O(N)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 text-cyan-300">Contiguous subarray of size K or condition</td>
                <td className="p-3 font-semibold text-white">Sliding Window</td>
                <td className="p-3 text-slate-400">int left, right, windowSum</td>
                <td className="p-3 text-emerald-400 font-bold">O(N)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 text-cyan-300">Next greater or smaller element / temperatures</td>
                <td className="p-3 font-semibold text-white">Monotonic Stack</td>
                <td className="p-3 text-slate-400">Deque&lt;Integer&gt; stack = new ArrayDeque&lt;&gt;()</td>
                <td className="p-3 text-emerald-400 font-bold">O(N)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 text-cyan-300">Kth largest / smallest / most frequent</td>
                <td className="p-3 font-semibold text-white">Top K Elements</td>
                <td className="p-3 text-slate-400">PriorityQueue&lt;Integer&gt; minHeap</td>
                <td className="p-3 text-emerald-400 font-bold">O(N log K)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 text-cyan-300">Overlapping time intervals / meeting rooms</td>
                <td className="p-3 font-semibold text-white">Overlapping Intervals</td>
                <td className="p-3 text-slate-400">Arrays.sort(intervals, (a,b)-&gt;...)</td>
                <td className="p-3 text-emerald-400 font-bold">O(N log N)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 text-cyan-300">Subarray sum equals K / running range queries</td>
                <td className="p-3 font-semibold text-white">Prefix Sum</td>
                <td className="p-3 text-slate-400">int[] prefix, HashMap&lt;Integer, Integer&gt;</td>
                <td className="p-3 text-emerald-400 font-bold">O(N)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 text-cyan-300">Shortest path in unweighted maze / level order</td>
                <td className="p-3 font-semibold text-white">Tree / Graph BFS</td>
                <td className="p-3 text-slate-400">Queue&lt;T&gt; queue = new ArrayDeque&lt;&gt;()</td>
                <td className="p-3 text-emerald-400 font-bold">O(V + E)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
