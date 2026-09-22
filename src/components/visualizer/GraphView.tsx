import React from 'react';
import { StepState } from '../../types';

interface GraphViewProps {
  stepState: StepState;
}

export const GraphView: React.FC<GraphViewProps> = ({ stepState }) => {
  const { graphData } = stepState;

  if (!graphData || !graphData.nodes) {
    return null;
  }

  const { nodes, edges, visitedOrder = [] } = graphData;

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="text-xs font-mono text-slate-400 mb-2 flex flex-wrap items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block border border-amber-200"></span> Current Node
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block border border-emerald-300"></span> Visited Node
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-800 inline-block border border-slate-600"></span> Unvisited
        </span>
      </div>

      <div className="w-full max-w-[420px] h-[240px] bg-slate-950/80 rounded-2xl border border-slate-800 p-2 shadow-inner flex items-center justify-center relative">
        <svg viewBox="0 0 380 320" className="w-full h-full">
          {/* Edges */}
          {edges.map((edge, idx) => {
            const n1 = nodes.find((n) => n.id === edge.from);
            const n2 = nodes.find((n) => n.id === edge.to);
            if (!n1 || !n2) return null;

            const isTraversed = visitedOrder.includes(edge.from) && visitedOrder.includes(edge.to);

            return (
              <line
                key={idx}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke={isTraversed ? '#10b981' : '#334155'}
                strokeWidth={isTraversed ? '3' : '2'}
                className="transition-colors duration-300"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isCurrent = node.state === 'current';
            const isVisited = node.state === 'visited';

            return (
              <g key={node.id} className="cursor-pointer transition-all duration-300">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  className={`transition-all duration-300 ${
                    isCurrent
                      ? 'fill-amber-500 stroke-amber-200 stroke-3 filter drop-shadow(0 0 10px rgba(245,158,11,0.6))'
                      : isVisited
                      ? 'fill-emerald-600 stroke-emerald-300 stroke-2'
                      : 'fill-slate-800 stroke-slate-600 stroke-2'
                  }`}
                />
                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  className={`font-mono text-sm font-bold select-none ${
                    isCurrent ? 'fill-slate-950' : 'fill-white'
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Traversal sequence badge */}
        {visitedOrder.length > 0 && (
          <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg text-[11px] font-mono text-emerald-400">
            Order: {visitedOrder.join(' → ')}
          </div>
        )}
      </div>
    </div>
  );
};
