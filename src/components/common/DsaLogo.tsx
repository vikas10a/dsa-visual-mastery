import React from 'react';

interface DsaLogoProps {
  variant?: 'icon' | 'full' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const DsaLogo: React.FC<DsaLogoProps> = ({
  variant = 'icon',
  size = 'md',
  className = '',
  showTagline = true,
}) => {
  // Dimensions based on size
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  // If variant is icon-only (e.g. for Header brand badge)
  if (variant === 'icon') {
    return (
      <div
        className={`relative flex items-center justify-center rounded-xl bg-[#090d16] p-1 border border-slate-700/60 shadow-md shadow-cyan-950/40 select-none overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/20 ${iconDimensions} ${className}`}
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="treeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            <linearGradient id="sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            <linearGradient id="nodeCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="nodePurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>

            <linearGradient id="nodeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            <linearGradient id="nodeOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            <linearGradient id="nodePink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>

            <linearGradient id="nodeAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Tree Structure (Nodes & Edges) */}
          <g className="tree-group">
            {/* Branches */}
            <path
              d="M100 28 L65 54 M100 28 L135 54 M65 54 L45 78 M65 54 L82 78 M135 54 L118 78 M135 54 L155 78"
              stroke="url(#treeLineGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Tree Nodes */}
            {/* Root Node */}
            <circle cx="100" cy="28" r="13" fill="url(#nodeCyan)" />
            {/* Level 1 Nodes */}
            <circle cx="65" cy="54" r="11" fill="url(#nodePurple)" />
            <circle cx="135" cy="54" r="11" fill="url(#nodeGreen)" />
            {/* Level 2 Leaf Nodes */}
            <circle cx="45" cy="78" r="9" fill="url(#nodeOrange)" />
            <circle cx="82" cy="78" r="9" fill="url(#nodePink)" />
            <circle cx="118" cy="78" r="9" fill="url(#nodeOrange)" />
            <circle cx="155" cy="78" r="9" fill="url(#nodeAmber)" />
          </g>

          {/* DSA Monogram */}
          <g transform="translate(10, 92)">
            {/* 'D' */}
            <path
              d="M16 12 C16 6 22 2 32 2 L46 2 C68 2 76 16 76 38 C76 60 68 74 46 74 L32 74 C22 74 16 70 16 64 Z M36 20 L36 56 L44 56 C54 56 57 48 57 38 C57 28 54 20 44 20 Z"
              fill="url(#dGrad)"
            />

            {/* 'S' Upper White Loop */}
            <path
              d="M116 2 C100 2 86 10 86 26 C86 42 100 48 114 54 C124 58 126 62 126 66 C126 72 120 74 110 74 C96 74 88 66 86 54 L72 54 C74 72 88 84 110 84 C130 84 142 74 142 62 C142 46 128 40 114 34 C104 30 102 26 102 22 C102 16 108 12 118 12 C128 12 134 18 136 26 L148 24 C146 10 134 2 116 2 Z"
              fill="url(#sGrad)"
            />

            {/* Code Brackets </> inside S */}
            <g transform="translate(94, 28) scale(0.9)">
              <path
                d="M10 14 L3 20 L10 26"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 10 L14 30"
                stroke="#c084fc"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M22 14 L29 20 L22 26"
                stroke="#f472b6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* 'A' */}
            <path
              d="M158 74 L175 6 L189 6 L206 74 L191 74 L187 56 L167 56 L163 74 Z M170 42 L184 42 L177 16 Z"
              fill="#ffffff"
            />
            {/* Cyan triangle cutout in A */}
            <polygon points="177,22 172,38 182,38" fill="#38bdf8" />
          </g>
        </svg>
      </div>
    );
  }

  // Full / Extended Logo with Tree, DSA, "Visual Mastery", and Tagline
  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Ambient Top Glow */}
        <div className="absolute -top-6 w-48 h-20 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 blur-xl pointer-events-none rounded-full" />

        {/* Tree and DSA Emblem */}
        <div className="w-52 h-44 sm:w-64 sm:h-52">
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-lg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="fullTreeLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="fullDGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>

              <linearGradient id="fullSGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e2e8f0" />
                <stop offset="70%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>

              <linearGradient id="masteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="40%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>

              {/* Node Gradients */}
              <linearGradient id="fNodeCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="fNodePurple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="fNodeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <linearGradient id="fNodeOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              <linearGradient id="fNodePink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
              <linearGradient id="fNodeAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>

            {/* Glowing Tree Graph */}
            <g className="tree-graph">
              <path
                d="M120 22 L82 50 M120 22 L158 50 M82 50 L60 76 M82 50 L100 76 M158 50 L140 76 M158 50 L180 76"
                stroke="url(#fullTreeLine)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Root */}
              <circle cx="120" cy="22" r="14" fill="url(#fNodeCyan)" />
              {/* Children */}
              <circle cx="82" cy="50" r="12" fill="url(#fNodePurple)" />
              <circle cx="158" cy="50" r="12" fill="url(#fNodeGreen)" />
              {/* Leaves */}
              <circle cx="60" cy="76" r="10" fill="url(#fNodeOrange)" />
              <circle cx="100" cy="76" r="10" fill="url(#fNodePink)" />
              <circle cx="140" cy="76" r="10" fill="url(#fNodeOrange)" />
              <circle cx="180" cy="76" r="10" fill="url(#fNodeAmber)" />
            </g>

            {/* Stylized Big DSA */}
            <g transform="translate(18, 88)">
              {/* 'D' */}
              <path
                d="M10 8 C10 3 16 0 24 0 L40 0 C64 0 74 14 74 36 C74 58 64 72 40 72 L24 72 C16 72 10 69 10 64 Z M30 18 L30 54 L38 54 C48 54 53 46 53 36 C53 26 48 18 38 18 Z"
                fill="url(#fullDGrad)"
              />

              {/* 'S' */}
              <path
                d="M112 0 C95 0 82 8 82 24 C82 40 96 46 110 52 C120 56 122 60 122 64 C122 70 116 72 106 72 C92 72 84 64 82 52 L68 52 C70 70 84 82 106 82 C126 82 138 72 138 60 C138 44 124 38 110 32 C100 28 98 24 98 20 C98 14 104 10 114 10 C124 10 130 16 132 24 L144 22 C142 8 130 0 112 0 Z"
                fill="url(#fullSGrad)"
              />

              {/* Code Brackets </> inside S */}
              <g transform="translate(90, 26)">
                <path
                  d="M10 12 L3 18 L10 24"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 8 L14 28"
                  stroke="#c084fc"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22 12 L29 18 L22 24"
                  stroke="#f472b6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* 'A' */}
              <path
                d="M152 72 L169 0 L185 0 L202 72 L186 72 L182 54 L161 54 L157 72 Z M165 40 L178 40 L171 14 Z"
                fill="#ffffff"
              />
              <polygon points="171,18 166,35 176,35" fill="#38bdf8" />
            </g>
          </svg>
        </div>

        {/* 'Visual Mastery' Headline */}
        <div className="mt-1 flex items-baseline gap-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
          <span className="text-white drop-shadow-sm font-sans">Visual</span>
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent font-sans">
            Mastery
          </span>
        </div>

        {/* Tagline: Learn • Visualize • Solve • Get Placed */}
        {showTagline && (
          <div className="mt-2.5 flex items-center gap-2 text-[11px] sm:text-xs font-mono font-medium text-slate-300">
            <span>Learn</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block shadow-sm shadow-cyan-400/50" />
            <span>Visualize</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block shadow-sm shadow-purple-400/50" />
            <span>Solve</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shadow-sm shadow-emerald-400/50" />
            <span className="text-white font-semibold">Get Placed</span>
          </div>
        )}
      </div>
    </div>
  );
};
