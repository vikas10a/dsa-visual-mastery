import React from 'react';
import { StepState } from '../../types';

interface StackQueueViewProps {
  stepState: StepState;
}

export const StackQueueView: React.FC<StackQueueViewProps> = ({ stepState }) => {
  const { stackData, queueData } = stepState;

  return (
    <div className="flex flex-wrap items-start justify-center gap-8 p-4 sm:p-6 w-full">
      {/* Monotonic / LIFO Stack Tube */}
      {stackData !== undefined && (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-semibold text-cyan-400">
            <span>Deque&lt;Integer&gt; stack (LIFO)</span>
          </div>

          <div className="w-36 min-h-[180px] p-2 bg-slate-950/80 rounded-b-2xl border-x-4 border-b-4 border-cyan-500/70 shadow-2xl flex flex-col-reverse items-center gap-2">
            {stackData.length === 0 ? (
              <span className="text-[11px] font-mono text-slate-600 my-auto">
                Empty Stack
              </span>
            ) : (
              stackData.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-full py-2 px-3 text-center font-mono font-bold text-xs rounded-lg border shadow transition-all duration-200 ${
                    idx === stackData.length - 1
                      ? 'bg-amber-500/30 text-amber-200 border-amber-400 ring-2 ring-amber-400/50'
                      : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    {idx === stackData.length - 1 && (
                      <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-1 rounded">
                        TOP
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-500 mt-2">
            Push ↓ | Pop ↑
          </span>
        </div>
      )}

      {/* Queue Pipeline (FIFO) */}
      {queueData !== undefined && (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-semibold text-emerald-400">
            <span>Queue&lt;Integer&gt; queue (FIFO)</span>
          </div>

          <div className="min-w-[220px] max-w-md h-16 p-2 bg-slate-950/80 rounded-2xl border-y-4 border-emerald-500/70 shadow-2xl flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono font-bold text-rose-400 px-1 border-r border-rose-500/40">
              OUT →
            </span>
            {queueData.length === 0 ? (
              <span className="text-[11px] font-mono text-slate-600 mx-auto">
                Queue Empty
              </span>
            ) : (
              queueData.map((item, idx) => (
                <div
                  key={idx}
                  className={`min-w-[44px] h-10 flex items-center justify-center font-mono font-bold text-xs rounded-lg border shadow ${
                    idx === 0
                      ? 'bg-emerald-500 text-slate-950 border-emerald-300 font-extrabold'
                      : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  {item}
                </div>
              ))
            )}
            <span className="text-[10px] font-mono font-bold text-emerald-400 px-1 border-l border-emerald-500/40 ml-auto">
              ← IN
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 mt-2">
            Offer (Tail) → Poll (Head)
          </span>
        </div>
      )}
    </div>
  );
};
