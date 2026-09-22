import React, { useState } from 'react';
import { JAVA_DATA_STRUCTURES } from '../../data/javaDsData';
import { Search, Code2, AlertTriangle, Layers, Clock, Cpu, CheckCircle } from 'lucide-react';

export const JavaDsGuide: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDs, setSelectedDs] = useState(JAVA_DATA_STRUCTURES[0]);

  const filteredDs = JAVA_DATA_STRUCTURES.filter((ds) =>
    ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ds.javaPackage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ds.what.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Layers className="w-4 h-4" />
            Standard Java Library Reference
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Java DSA Collections & Memory Deep Dive
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
            Internal JVM workings, amortized Big-O, and FAANG interview pitfalls
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ArrayDeque, HashMap..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Main Split Layout: DS Selector on Left, Deep Dive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          {filteredDs.map((ds) => {
            const isSelected = selectedDs.name === ds.name;
            return (
              <button
                key={ds.name}
                onClick={() => setSelectedDs(ds)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col shadow ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-500/80 ring-2 ring-cyan-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold font-mono ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {ds.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {ds.spaceComplexity}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">
                  {ds.javaPackage}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Detail Card (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                {selectedDs.javaPackage}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {selectedDs.name}
              </h2>
              <span className="text-xs font-mono text-slate-400">
                {selectedDs.interfaceOrClass}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-slate-950 text-emerald-400 px-3 py-1 rounded-lg border border-slate-800">
                Space: {selectedDs.spaceComplexity}
              </span>
            </div>
          </div>

          {/* What & Why Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="font-mono text-emerald-400 font-bold block mb-1">WHAT IS IT?</span>
              <p className="text-slate-300 leading-relaxed font-sans">{selectedDs.what}</p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="font-mono text-cyan-400 font-bold block mb-1">WHY USE IT OVER ALTERNATIVES?</span>
              <p className="text-slate-300 leading-relaxed font-sans">{selectedDs.why}</p>
            </div>
          </div>

          {/* Under the Hood (Architecture & JVM mechanics) */}
          <div className="bg-purple-950/20 border border-purple-800/40 p-4 rounded-xl flex items-start gap-3 text-xs">
            <Cpu className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-purple-300 font-bold uppercase tracking-wider block mb-1">
                Under the Hood (JVM Memory & Implementation):
              </span>
              <p className="text-slate-300 leading-relaxed font-sans">
                {selectedDs.underTheHood}
              </p>
            </div>
          </div>

          {/* Core Methods Table */}
          <div>
            <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Key API Methods & Time Complexities:
            </span>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-400">
                    <th className="p-2.5">Method</th>
                    <th className="p-2.5">Description</th>
                    <th className="p-2.5">Time Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {selectedDs.importantMethods.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-800/20">
                      <td className="p-2.5 font-bold text-cyan-300">{m.method}</td>
                      <td className="p-2.5 font-sans text-slate-400">{m.desc}</td>
                      <td className="p-2.5 font-bold text-emerald-400">{m.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Java Code Syntax */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400 font-bold block mb-2 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-400" /> Java Syntax Example:
            </span>
            <pre className="text-emerald-300 text-xs font-mono p-3 bg-slate-900 rounded-lg overflow-x-auto whitespace-pre">
              {selectedDs.syntax}
            </pre>
          </div>

          {/* Common Mistakes & Interview Traps */}
          <div className="bg-rose-950/20 border border-rose-900/50 p-4 rounded-xl flex flex-col gap-2">
            <span className="text-xs font-mono text-rose-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Dangerous Interview Traps:
            </span>
            <ul className="space-y-1.5 text-xs text-rose-200">
              {selectedDs.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
