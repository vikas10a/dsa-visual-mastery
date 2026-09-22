import React, { useState } from 'react';
import { COMPLETE_DSA_TAXONOMY, TaxonomyCategory } from '../../data/patternsData';
import { Search, X, FolderTree, ExternalLink, Layers } from 'lucide-react';

interface TaxonomyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryName: string) => void;
}

export const TaxonomyModal: React.FC<TaxonomyModalProps> = ({ isOpen, onClose, onSelectCategory }) => {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  if (!isOpen) return null;

  const groups = ['All', ...COMPLETE_DSA_TAXONOMY.map((c) => c.title)];

  const filteredCategories: TaxonomyCategory[] = COMPLETE_DSA_TAXONOMY.filter((cat) => {
    const matchesSearch =
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase()) ||
      cat.techniques.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesGroup = selectedGroup === 'All' || cat.title === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const totalTechniques = COMPLETE_DSA_TAXONOMY.reduce((acc, curr) => acc + curr.techniques.length, 0);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-5xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Complete DSA Master Taxonomy ({totalTechniques} Techniques across {COMPLETE_DSA_TAXONOMY.length} Categories)
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                The exhaustive master index of computer science algorithms, data structures, and interview patterns
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-slate-800 bg-slate-900 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search techniques: e.g. Monotonic Deque, Dijkstra, Bitmask DP, Kadane, Fast & Slow..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Group dropdown / filter */}
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            {groups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Categories Grid List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-3 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-base font-bold text-white font-mono">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60 font-bold">
                  {cat.techniques.length} Techniques
                </span>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {cat.description}
              </p>

              {/* Techniques Chips */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {cat.techniques.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 transition cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              No categories matching "{search}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Showing {filteredCategories.length} categories</span>
          <span>Press ESC or ✕ to close</span>
        </div>
      </div>
    </div>
  );
};
