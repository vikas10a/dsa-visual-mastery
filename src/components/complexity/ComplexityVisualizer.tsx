import React, { useState } from 'react';
import { Sliders, Clock, Cpu, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ComplexityVisualizer: React.FC = () => {
  const [nValue, setNValue] = useState<number>(100);

  // Compute operation counts for given N
  const computeOps = (n: number) => {
    return [
      { name: 'O(1) - Constant', formula: '1', ops: 1, color: '#10b981', status: 'Instant (< 1 µs)' },
      { name: 'O(log N) - Logarithmic', formula: 'log₂(N)', ops: Math.round(Math.log2(n)), color: '#06b6d4', status: 'Instant (< 1 µs)' },
      { name: 'O(N) - Linear', formula: 'N', ops: n, color: '#3b82f6', status: n > 1e7 ? 'Borderline (~0.1s)' : 'Extremely Fast (< 5 ms)' },
      { name: 'O(N log N) - Linearithmic', formula: 'N × log₂(N)', ops: Math.round(n * Math.log2(n)), color: '#a855f7', status: n > 1e6 ? 'Slow (> 0.2s)' : 'Fast (< 20 ms)' },
      { name: 'O(N²) - Quadratic', formula: 'N²', ops: n <= 10000 ? n * n : Infinity, color: '#f59e0b', status: n > 1000 ? 'TIME LIMIT EXCEEDED (> 1s)' : 'Acceptable for N ≤ 1,000' },
      { name: 'O(2^N) - Exponential', formula: '2^N', ops: n <= 30 ? Math.pow(2, n) : Infinity, color: '#ef4444', status: n > 25 ? 'SYSTEM CRASH (TLE)' : 'Only works for N ≤ 20' }
    ];
  };

  const complexities = computeOps(nValue);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Big-O Complexity & Operations Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
              Input Size N vs 10^8 Operations/sec Rule of Thumb
            </p>
          </div>
        </div>

        {/* N Slider Control */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Adjust Input Size (N):
            </label>
            <span className="text-base font-mono font-extrabold text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              N = {nValue.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="10000"
            step="10"
            value={nValue}
            onChange={(e) => setNValue(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>N = 10 (Small)</span>
            <span>N = 1,000 (Medium)</span>
            <span>N = 10,000 (Large)</span>
          </div>
        </div>
      </div>

      {/* Operations Comparison Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <h2 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
            Operations count at N = {nValue.toLocaleString()}
          </h2>
          <span className="text-[11px] font-mono text-emerald-400">
            Benchmark: 10⁸ ops ≈ 1.0 second on LeetCode/Codeforces
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {complexities.map((comp) => {
            const isDanger = comp.ops > 1e8 || comp.ops === Infinity;
            return (
              <div
                key={comp.name}
                className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between shadow"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold" style={{ color: comp.color }}>
                      {comp.name.split(' - ')[0]}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {comp.formula}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    {comp.name.split(' - ')[1]}
                  </span>

                  <div className="my-3 text-lg font-mono font-extrabold text-white">
                    {comp.ops === Infinity ? (
                      <span className="text-rose-400">Overflow (Huge)</span>
                    ) : (
                      comp.ops.toLocaleString() + ' ops'
                    )}
                  </div>
                </div>

                <div
                  className={`text-[11px] font-mono p-2 rounded-lg border ${
                    isDanger
                      ? 'bg-rose-950/40 text-rose-300 border-rose-900/60'
                      : 'bg-emerald-950/40 text-emerald-300 border-emerald-900/60'
                  }`}
                >
                  {comp.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAANG Constraint Decoding Cheat Sheet */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h3 className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          The Secret LeetCode Constraint Decoder
        </h3>
        <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
          In coding interviews, the problem constraints directly dictate which algorithm you are expected to write:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-cyan-300 font-bold block">N ≤ 12:</span>
            <span className="text-slate-400">O(N!) Factorial or O(N² × 2^N) TSP / Backtracking</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-cyan-300 font-bold block">N ≤ 25:</span>
            <span className="text-slate-400">O(2^N) Exponential Backtracking / Bitmask DP</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-cyan-300 font-bold block">N ≤ 500:</span>
            <span className="text-slate-400">O(N³) Floyd-Warshall or 3D Dynamic Programming</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-cyan-300 font-bold block">N ≤ 5,000:</span>
            <span className="text-slate-400">O(N²) Quadratic Nested Loops or 2D Dynamic Programming</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-emerald-300 font-bold block">N ≤ 10⁵ to 10⁶:</span>
            <span className="text-slate-400">O(N log N) Sorting/Heap or O(N) Two Pointers/Sliding Window/Stack</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-emerald-300 font-bold block">N ≥ 10⁹:</span>
            <span className="text-slate-400">O(log N) Binary Search or O(1) Math Closed-Form</span>
          </div>
        </div>
      </div>
    </div>
  );
};
