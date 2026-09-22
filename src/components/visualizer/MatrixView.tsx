import React from 'react';
import { StepState } from '../../types';

interface MatrixViewProps {
  stepState: StepState;
}

export const MatrixView: React.FC<MatrixViewProps> = ({ stepState }) => {
  const { matrixData } = stepState;

  if (!matrixData || !matrixData.grid || matrixData.grid.length === 0) {
    return null;
  }

  const { grid, currentRow, currentCol, visitedCells = [] } = matrixData;

  const isVisited = (r: number, c: number) => {
    return visitedCells.some(([vr, vc]) => vr === r && vc === c);
  };

  const isCurrent = (r: number, c: number) => {
    return (currentRow === r && (currentCol === undefined || currentCol === c)) ||
           (currentCol === c && (currentRow === undefined || currentRow === r));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500/80 inline-block border border-amber-300"></span> Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-cyan-950/80 inline-block border border-cyan-500"></span> Visited (Spiral Path)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-800 inline-block border border-slate-700"></span> Unvisited
        </span>
      </div>

      <div className="grid gap-2 p-3 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl">
        {grid.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-2">
            {row.map((val, cIdx) => {
              const visited = isVisited(rIdx, cIdx);
              const active = isCurrent(rIdx, cIdx);

              let cellStyle = 'bg-slate-800/80 text-slate-300 border-slate-700';
              if (active) {
                cellStyle = 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400 font-extrabold shadow-lg shadow-amber-500/20 scale-105';
              } else if (visited) {
                cellStyle = 'bg-cyan-950/70 text-cyan-300 border-cyan-500 font-bold';
              }

              return (
                <div
                  key={cIdx}
                  className={`w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center font-mono rounded-xl border-2 transition-all duration-200 select-none ${cellStyle}`}
                >
                  <span className="text-base sm:text-lg">{val}</span>
                  <span className="text-[9px] opacity-60">({rIdx},{cIdx})</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
