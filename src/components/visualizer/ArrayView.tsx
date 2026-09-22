import React from 'react';
import { StepState } from '../../types';

interface ArrayViewProps {
  stepState: StepState;
}

export const ArrayView: React.FC<ArrayViewProps> = ({ stepState }) => {
  const { arrayData, pointers, window } = stepState;

  if (!arrayData || arrayData.length === 0) {
    return null;
  }

  // Pointer helpers
  const getPointersForIndex = (index: number) => {
    return pointers?.filter((p) => p.index === index) || [];
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 w-full overflow-x-auto">
      {/* Sliding window span indicator if present */}
      {window && (
        <div className="w-full max-w-2xl mb-3 flex items-center justify-between px-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 rounded-lg py-1.5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-semibold">Active Window: [{window.start} .. {window.end}]</span>
          </div>
          {window.sum !== undefined && (
            <span className="bg-cyan-900/80 px-2 py-0.5 rounded text-cyan-200 font-bold">
              Sum = {window.sum}
            </span>
          )}
        </div>
      )}

      {/* Main Array Elements */}
      <div className="flex items-end gap-2 sm:gap-3 py-6 px-4">
        {arrayData.map((item, idx) => {
          const itemPointers = getPointersForIndex(idx);
          const isWindow = window && idx >= window.start && idx <= window.end;

          let boxBg = 'bg-slate-800/90 text-slate-100 border-slate-700';
          if (item.state === 'match') {
            boxBg = 'bg-emerald-600/90 text-white border-emerald-400 ring-2 ring-emerald-500/50 shadow-emerald-500/20';
          } else if (item.state === 'pointer-left') {
            boxBg = 'bg-emerald-950/80 text-emerald-300 border-emerald-500 ring-1 ring-emerald-500/40';
          } else if (item.state === 'pointer-right') {
            boxBg = 'bg-rose-950/80 text-rose-300 border-rose-500 ring-1 ring-rose-500/40';
          } else if (item.state === 'pointer-mid') {
            boxBg = 'bg-cyan-950/80 text-cyan-300 border-cyan-400 ring-1 ring-cyan-400/40';
          } else if (item.state === 'eliminated') {
            boxBg = 'bg-slate-900/40 text-slate-600 border-slate-800/60 opacity-40 line-through';
          } else if (item.state === 'window' || isWindow) {
            boxBg = 'bg-cyan-950/60 text-cyan-200 border-cyan-500/80 shadow-md shadow-cyan-950/50';
          } else if (item.state === 'active') {
            boxBg = 'bg-amber-500/30 text-amber-200 border-amber-400 ring-2 ring-amber-400/50';
          } else if (item.state === 'visited') {
            boxBg = 'bg-slate-800/50 text-slate-400 border-slate-700/50';
          }

          return (
            <div key={idx} className="flex flex-col items-center relative group">
              {/* Pointer Markers Above (Pointers like L, R, Mid) */}
              <div className="h-9 flex items-center justify-center gap-1 mb-1">
                {itemPointers.map((p, pIdx) => {
                  let badgeColor = 'bg-emerald-500 text-slate-950 border-emerald-300';
                  if (p.color === 'rose') badgeColor = 'bg-rose-500 text-white border-rose-300';
                  if (p.color === 'cyan') badgeColor = 'bg-cyan-400 text-slate-950 border-cyan-200';
                  if (p.color === 'amber') badgeColor = 'bg-amber-400 text-slate-950 border-amber-200';

                  return (
                    <span
                      key={pIdx}
                      className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border animate-bounce ${badgeColor}`}
                    >
                      {p.name}
                    </span>
                  );
                })}
              </div>

              {/* Array Box */}
              <div
                className={`w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center font-mono font-bold text-base sm:text-lg rounded-xl border-2 shadow-lg transition-all duration-300 select-none ${boxBg}`}
              >
                {item.value}
              </div>

              {/* Index Subscript Below */}
              <span className="text-[11px] font-mono text-slate-500 mt-2 font-medium">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
