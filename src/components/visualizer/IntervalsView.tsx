import React from 'react';
import { StepState } from '../../types';

interface IntervalsViewProps {
  stepState: StepState;
}

export const IntervalsView: React.FC<IntervalsViewProps> = ({ stepState }) => {
  const { intervalsData } = stepState;

  if (!intervalsData || !intervalsData.intervals) {
    return null;
  }

  const { intervals, activeIndices = [], mergedIntervals = [] } = intervalsData;

  // Compute time scale minimum and maximum
  const allPoints = intervals.flatMap(([s, e]) => [s, e]);
  const minTime = Math.min(...allPoints, 0);
  const maxTime = Math.max(...allPoints, 16);
  const range = Math.max(maxTime - minTime, 1);

  const getPercent = (time: number) => {
    return `${((time - minTime) / range) * 100}%`;
  };

  const getWidthPercent = (start: number, end: number) => {
    return `${Math.max(((end - start) / range) * 100, 4)}%`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="w-full max-w-lg mb-2 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="text-cyan-400 font-semibold">1D Timeline Projection</span>
        <span>Min: {minTime} | Max: {maxTime}</span>
      </div>

      {/* Timeline Ruler */}
      <div className="w-full max-w-lg h-6 relative border-b border-slate-700 flex items-center mb-4">
        {Array.from({ length: maxTime - minTime + 1 }).map((_, i) => {
          const val = minTime + i;
          if (val % 2 !== 0 && val !== minTime && val !== maxTime) return null;
          return (
            <div
              key={val}
              className="absolute flex flex-col items-center transform -translate-x-1/2"
              style={{ left: getPercent(val) }}
            >
              <div className="w-0.5 h-2 bg-slate-600"></div>
              <span className="text-[10px] font-mono text-slate-500">{val}</span>
            </div>
          );
        })}
      </div>

      {/* Input Intervals */}
      <div className="w-full max-w-lg flex flex-col gap-2.5 mb-6">
        <span className="text-[11px] font-mono text-slate-400">Input Intervals (Sorted):</span>
        {intervals.map(([start, end], idx) => {
          const isActive = activeIndices.includes(idx);
          return (
            <div key={idx} className="relative w-full h-8 bg-slate-900/60 rounded-lg flex items-center px-1">
              <div
                className={`absolute h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 shadow ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border border-amber-300 ring-2 ring-amber-400'
                    : 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/80'
                }`}
                style={{
                  left: getPercent(start),
                  width: getWidthPercent(start, end)
                }}
              >
                [{start}, {end}]
              </div>
            </div>
          );
        })}
      </div>

      {/* Merged Intervals Stream */}
      {mergedIntervals.length > 0 && (
        <div className="w-full max-w-lg flex flex-col gap-2 border-t border-slate-800 pt-3">
          <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Merged Non-Overlapping Spans:
          </span>
          {mergedIntervals.map(([start, end], idx) => (
            <div key={idx} className="relative w-full h-9 bg-slate-900/60 rounded-lg flex items-center px-1">
              <div
                className="absolute h-7 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center border border-emerald-400 shadow-lg"
                style={{
                  left: getPercent(start),
                  width: getWidthPercent(start, end)
                }}
              >
                [{start}, {end}]
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
