import React from 'react';
import { StepState } from '../../types';

interface HeapViewProps {
  stepState: StepState;
}

export const HeapView: React.FC<HeapViewProps> = ({ stepState }) => {
  const { heapData } = stepState;

  if (!heapData || !heapData.array) {
    return null;
  }

  const { array, activeIndex, isMinHeap = true } = heapData;

  // Node positions for binary tree visualization up to 7 elements
  const nodePositions = [
    { x: 180, y: 35 },   // Root 0
    { x: 100, y: 100 },  // Left child 1
    { x: 260, y: 100 },  // Right child 2
    { x: 60, y: 165 },   // Child 3
    { x: 140, y: 165 },  // Child 4
    { x: 220, y: 165 },  // Child 5
    { x: 300, y: 165 }   // Child 6
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="flex items-center justify-between w-full max-w-md mb-2 px-2 text-xs font-mono">
        <span className="text-cyan-400 font-bold">
          {isMinHeap ? 'PriorityQueue (Min-Heap)' : 'PriorityQueue (Max-Heap)'}
        </span>
        <span className="text-slate-400">
          Root = {array[0] !== undefined ? array[0] : 'empty'}
        </span>
      </div>

      {/* Tree View (SVG) */}
      <div className="relative w-full max-w-[360px] h-[210px] bg-slate-950/70 rounded-2xl border border-slate-800 p-2 flex items-center justify-center shadow-inner">
        <svg viewBox="0 0 360 210" className="w-full h-full">
          {/* Edges */}
          {array.map((_, i) => {
            if (i === 0) return null;
            const parentIdx = Math.floor((i - 1) / 2);
            if (!nodePositions[i] || !nodePositions[parentIdx]) return null;

            return (
              <line
                key={`edge-${i}`}
                x1={nodePositions[parentIdx].x}
                y1={nodePositions[parentIdx].y}
                x2={nodePositions[i].x}
                y2={nodePositions[i].y}
                stroke="#334155"
                strokeWidth="2.5"
                strokeDasharray="2 2"
              />
            );
          })}

          {/* Nodes */}
          {array.slice(0, 7).map((val, i) => {
            const pos = nodePositions[i];
            if (!pos) return null;
            const isActive = i === activeIndex;
            const isRoot = i === 0;

            return (
              <g key={`node-${i}`} className="cursor-pointer transition-all duration-300">
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="18"
                  className={
                    isActive
                      ? 'fill-amber-500 stroke-amber-300 stroke-2'
                      : isRoot
                      ? 'fill-emerald-600 stroke-emerald-400 stroke-2'
                      : 'fill-slate-800 stroke-cyan-500 stroke-2'
                  }
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  className={`font-mono text-xs font-bold ${
                    isActive ? 'fill-slate-950' : 'fill-white'
                  }`}
                >
                  {val}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 28}
                  textAnchor="middle"
                  className="font-mono text-[9px] fill-slate-500"
                >
                  [{i}]
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Flat Array Representation View */}
      <div className="mt-4 flex flex-col items-center">
        <span className="text-[11px] font-mono text-slate-400 mb-1">
          Backing Array Representation (Object[]):
        </span>
        <div className="flex items-center gap-1.5 p-2 bg-slate-900/80 rounded-xl border border-slate-800">
          {array.length === 0 ? (
            <span className="text-xs text-slate-500 font-mono">Heap is empty</span>
          ) : (
            array.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-9 h-10 flex items-center justify-center font-mono font-bold text-xs rounded-lg border ${
                    idx === 0
                      ? 'bg-emerald-600/90 text-white border-emerald-400'
                      : idx === activeIndex
                      ? 'bg-amber-500/80 text-slate-950 border-amber-300'
                      : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  {val}
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1">
                  [{idx}]
                </span>
              </div>
            ))
          )}
        </div>
        <span className="text-[10px] font-mono text-slate-500 mt-1">
          Parent: (i-1)/2 | Left: 2i+1 | Right: 2i+2
        </span>
      </div>
    </div>
  );
};
