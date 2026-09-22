import React from 'react';

interface JavaCodeHighlighterProps {
  code: string;
  highlightedLines: number[];
}

export const JavaCodeHighlighter: React.FC<JavaCodeHighlighterProps> = ({ code, highlightedLines }) => {
  const lines = code.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#0d1117] text-slate-200 rounded-xl border border-slate-800 font-mono text-xs overflow-hidden shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          <span className="ml-2 font-medium text-slate-300">Solution.java</span>
        </div>
        <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
          Java 17+
        </span>
      </div>

      <div className="flex-1 overflow-auto p-2 sm:p-3 leading-relaxed">
        {lines.map((lineText, idx) => {
          const lineNumber = idx + 1;
          const isHighlighted = highlightedLines.includes(lineNumber);

          return (
            <div
              key={idx}
              className={`flex items-start rounded px-2 py-0.5 transition-colors duration-150 ${
                isHighlighted
                  ? 'bg-amber-500/20 border-l-2 border-amber-400 text-amber-100 font-medium'
                  : 'hover:bg-slate-800/40 text-slate-300'
              }`}
            >
              <span className={`w-8 select-none text-right pr-3 shrink-0 text-[10px] ${
                isHighlighted ? 'text-amber-400 font-bold' : 'text-slate-600'
              }`}>
                {lineNumber}
              </span>
              <pre className="flex-1 font-mono text-[12px] whitespace-pre overflow-x-auto">
                <code>{renderHighlightedJava(lineText)}</code>
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Lightweight client-side Java syntax decorator
function renderHighlightedJava(text: string): React.ReactNode {
  // Comments
  if (text.trim().startsWith('//')) {
    return <span className="text-slate-500 italic">{text}</span>;
  }

  // Keywords
  const keywords = ['public', 'class', 'static', 'void', 'int', 'double', 'boolean', 'char', 'if', 'else', 'while', 'for', 'return', 'new', 'null', 'true', 'false'];
  const tokens = text.split(/(\s+|[(),;.[\]{}<>!=+\-*/%])/);

  return (
    <>
      {tokens.map((token, i) => {
        if (keywords.includes(token)) {
          return <span key={i} className="text-purple-400 font-semibold">{token}</span>;
        }
        if (['List', 'ArrayList', 'Deque', 'ArrayDeque', 'Queue', 'PriorityQueue', 'Map', 'HashMap', 'Set', 'HashSet', 'String', 'TreeNode', 'Arrays', 'Math'].includes(token)) {
          return <span key={i} className="text-cyan-300 font-semibold">{token}</span>;
        }
        if (/^\d+$/.test(token)) {
          return <span key={i} className="text-amber-300">{token}</span>;
        }
        if (token.startsWith('"') && token.endsWith('"')) {
          return <span key={i} className="text-emerald-300">{token}</span>;
        }
        return <span key={i}>{token}</span>;
      })}
    </>
  );
}
