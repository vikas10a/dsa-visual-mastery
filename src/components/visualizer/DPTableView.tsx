import React from 'react';
import { StepState } from '../../types';

interface DPTableViewProps {
  stepState: StepState;
}

export const DPTableView: React.FC<DPTableViewProps> = ({ stepState }) => {
  const { dpTable } = stepState;

  if (!dpTable || !dpTable.cells || dpTable.cells.length === 0) {
    return null;
  }

  const { headersX, headersY, cells, activeCell, dependentCells = [], formula } = dpTable;

  const isDependent = (r: number, c: number) => {
    return dependentCells.some(([dr, dc]) => dr === r && dc === c);
  };

  const isActive = (r: number, c: number) => {
    return activeCell && activeCell[0] === r && activeCell[1] === c;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      {/* Recurrence Formula Banner */}
      {formula && (
        <div className="w-full max-w-md mb-3 p-2 bg-purple-950/40 border border-purple-800/60 rounded-xl text-center">
          <span className="text-xs font-mono text-purple-300 font-semibold">
            Transition Formula: {formula}
          </span>
        </div>
      )}

      <div className="w-full overflow-x-auto flex justify-center">
        <table className="border-collapse font-mono text-xs shadow-2xl bg-slate-900/90 rounded-xl overflow-hidden border border-slate-800">
          <thead>
            <tr className="bg-slate-800/90 text-slate-300">
              <th className="p-2 border border-slate-700/80 bg-slate-950/60 text-slate-500">i</th>
              {headersX.map((h, idx) => (
                <th key={idx} className="p-2.5 min-w-[42px] text-center border border-slate-700/80 text-cyan-400 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map((row, rIdx) => (
              <tr key={rIdx}>
                <td className="p-2 text-center font-bold bg-slate-950/60 border border-slate-700/80 text-purple-400">
                  {headersY[rIdx] ?? rIdx}
                </td>
                {row.map((val, cIdx) => {
                  const active = isActive(rIdx, cIdx);
                  const dep = isDependent(rIdx, cIdx);

                  let cellClass = 'bg-slate-800/40 text-slate-400';
                  if (active) {
                    cellClass = 'bg-amber-500 text-slate-950 font-extrabold ring-2 ring-amber-400 scale-105 shadow-lg';
                  } else if (dep) {
                    cellClass = 'bg-cyan-950/80 text-cyan-300 border-2 border-cyan-400 font-bold animate-pulse';
                  } else if (val !== null && val !== undefined) {
                    cellClass = 'bg-slate-800 text-emerald-300 font-semibold';
                  }

                  return (
                    <td
                      key={cIdx}
                      className={`p-2.5 min-w-[42px] text-center border border-slate-700/80 transition-all duration-200 select-none ${cellClass}`}
                    >
                      {val !== null && val !== undefined ? val : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 mt-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span> Current Cell
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-cyan-900 border border-cyan-400 inline-block"></span> Dependencies (dp[i-1], dp[i-2])
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-slate-800 inline-block"></span> Computed Value
        </span>
      </div>
    </div>
  );
};
