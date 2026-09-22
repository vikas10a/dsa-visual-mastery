import React from 'react';
import { StepState } from '../../types';

interface TreeViewProps {
  stepState: StepState;
}

export const TreeView: React.FC<TreeViewProps> = ({ stepState }) => {
  const { treeData } = stepState;

  if (!treeData || !treeData.nodes) {
    return null;
  }

  const { nodes } = treeData;

  // Preset 2D coordinate layout for 3-level binary tree
  const positions: Record<number, { x: number; y: number }> = {
    4: { x: 200, y: 40 },
    2: { x: 110, y: 110 },
    6: { x: 290, y: 110 },
    1: { x: 65, y: 180 },
    3: { x: 155, y: 180 },
    5: { x: 245, y: 180 },
    7: { x: 335, y: 180 }
  };

  const edges = [
    { from: 4, to: 2 },
    { from: 4, to: 6 },
    { from: 2, to: 1 },
    { from: 2, to: 3 },
    { from: 6, to: 5 },
    { from: 6, to: 7 }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> Visiting Node
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Visited
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span> Unvisited
        </span>
      </div>

      <div className="w-full max-w-[420px] h-[230px] bg-slate-950/80 rounded-2xl border border-slate-800 p-2 shadow-inner flex items-center justify-center">
        <svg viewBox="0 0 400 220" className="w-full h-full">
          {/* Edges */}
          {edges.map((edge, i) => {
            const p1 = positions[edge.from];
            const p2 = positions[edge.to];
            if (!p1 || !p2) return null;

            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#334155"
                strokeWidth="2.5"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;

            const isCurrent = node.state === 'current';
            const isVisited = node.state === 'visited';

            return (
              <g key={node.id} className="transition-all duration-300">
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="19"
                  className={`transition-all duration-300 ${
                    isCurrent
                      ? 'fill-amber-500 stroke-amber-200 stroke-2 filter drop-shadow(0 0 8px rgba(245,158,11,0.5))'
                      : isVisited
                      ? 'fill-emerald-600 stroke-emerald-300 stroke-2'
                      : 'fill-slate-800 stroke-slate-600 stroke-2'
                  }`}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  className={`font-mono text-xs font-bold select-none ${
                    isCurrent ? 'fill-slate-950' : 'fill-white'
                  }`}
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
