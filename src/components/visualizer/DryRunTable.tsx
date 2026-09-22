import React from 'react';

interface DryRunTableProps {
  history: Record<string, string | number>[];
  currentStepIndex: number;
}

export const DryRunTable: React.FC<DryRunTableProps> = ({ history, currentStepIndex }) => {
  if (!history || history.length === 0) {
    return (
      <div className="p-4 text-center text-xs text-slate-500 italic">
        Dry run steps will populate as the algorithm executes.
      </div>
    );
  }

  const columns = Object.keys(history[0] || {});

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/60 shadow-inner">
      <table className="w-full text-left text-[11px] font-mono border-collapse">
        <thead>
          <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
            {columns.map((col) => (
              <th key={col} className="px-3 py-2 font-semibold text-cyan-300 uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {history.map((row, idx) => {
            const isCurrent = idx === currentStepIndex;
            return (
              <tr
                key={idx}
                className={`transition-colors duration-150 ${
                  isCurrent
                    ? 'bg-amber-500/20 text-amber-200 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/30'
                }`}
              >
                {columns.map((col) => (
                  <td key={col} className="px-3 py-1.5 whitespace-nowrap">
                    {String(row[col] ?? '-')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
