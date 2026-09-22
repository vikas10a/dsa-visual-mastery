export type TabType =
  | 'home'
  | 'roadmap'
  | 'patterns'
  | 'visualizer'
  | 'problems'
  | 'javads'
  | 'cheatsheet'
  | 'detective'
  | 'decisiontree'
  | 'complexity'
  | 'interview'
  | 'quiz'
  | 'revision'
  | 'notes'
  | 'progress';

export type PatternDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface StepState {
  stepNumber: number;
  title: string;
  explanation: string;
  beginnerNote?: string;
  javaLineHighlight: number[];
  variables: Record<string, string | number | boolean | null>;
  actionType?: 'compare' | 'move' | 'swap' | 'match' | 'insert' | 'delete' | 'push' | 'pop' | 'visit' | 'found';
  
  // Visual payload representations
  arrayData?: {
    value: number | string;
    index: number;
    state?: 'default' | 'active' | 'pointer-left' | 'pointer-right' | 'pointer-mid' | 'match' | 'eliminated' | 'swapped' | 'window' | 'visited';
    highlight?: boolean;
    annotation?: string;
  }[];

  pointers?: {
    name: string;
    index: number;
    color: 'emerald' | 'cyan' | 'amber' | 'rose' | 'indigo' | 'purple';
  }[];

  window?: {
    start: number;
    end: number;
    sum?: number | string;
    label?: string;
  };

  matrixData?: {
    grid: (number | string)[][];
    currentRow?: number;
    currentCol?: number;
    visitedCells?: [number, number][];
    path?: [number, number][];
    traversalOrder?: [number, number][];
  };

  stackData?: (number | string)[];
  queueData?: (number | string)[];
  dequeData?: (number | string)[];
  
  heapData?: {
    array: number[];
    activeIndex?: number;
    comparedIndex?: number;
    isMinHeap?: boolean;
  };

  treeData?: {
    nodes: { id: number; value: number | string; left?: number; right?: number; state?: 'default' | 'current' | 'visited' | 'target' }[];
    rootId: number;
    currentPath?: number[];
  };

  graphData?: {
    nodes: { id: string; label: string; x: number; y: number; state?: 'unvisited' | 'visiting' | 'visited' | 'current' }[];
    edges: { from: string; to: string; weight?: number; highlighted?: boolean }[];
    activeQueueOrStack?: string[];
    visitedOrder?: string[];
  };

  intervalsData?: {
    intervals: [number, number][];
    activeIndices?: number[];
    mergedIntervals?: [number, number][];
    sweepLine?: number;
  };

  dpTable?: {
    headersX: (string | number)[];
    headersY: (string | number)[];
    cells: (number | string | null)[][];
    activeCell?: [number, number];
    dependentCells?: [number, number][];
    formula?: string;
  };

  hashMapData?: { key: string | number; value: string | number; active?: boolean }[];

  dryRunRow?: Record<string, string | number>;
}

export interface Pattern {
  id: string;
  number: number;
  name: string;
  category: string;
  tagline: string;
  isCore15: boolean;
  difficulty: PatternDifficulty;
  whatIsIt: string;
  whyItWorks: string;
  whenToUse: string[];
  whenNotToUse: string[];
  problemClues: string[];
  javaDataStructures: string[];
  timeComplexity: string;
  timeComplexityReason: string;
  spaceComplexity: string;
  spaceComplexityReason: string;
  commonMistakes: string[];
  edgeCases: string[];
  interviewMemoryCard: {
    clue: string;
    think: string;
    typicalComplexity: string;
    commonTrap: string;
    javaSnippet: string;
  };
  javaCode: string;
  defaultInputs: {
    label: string;
    input: any;
    target?: any;
    k?: any;
  };
  presetCases?: {
    label: string;
    input: any;
    target?: any;
    k?: any;
  }[];
  practiceProblems: {
    id: string;
    title: string;
    difficulty: PatternDifficulty;
    platform: 'LeetCode' | 'HackerRank' | 'GFG';
    link?: string;
  }[];
}

export interface Problem {
  id: string;
  title: string;
  leetcodeNumber?: number;
  companies?: string[];
  acceptanceRate?: string;
  frequency?: string;
  conceptId?: string;
  conceptName?: string;
  difficulty: PatternDifficulty;
  patternId: string;
  patternName: string;
  category: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  patternClues: string[];
  bruteForce: {
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
    bottleneck: string;
  };
  optimizedApproach: {
    concept: string;
    timeComplexity: string;
    spaceComplexity: string;
    keyIdea: string;
  };
  hints: string[];
  pseudocode: string;
  javaSolution: string;
  starterCode: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  hiddenTestCases?: {
    input: string;
    expectedOutput: string;
  }[];
  dryRunSteps?: {
    step: number;
    vars: string;
    action: string;
    outcome: string;
  }[];
  edgeCases?: string[];
  commonMistakes?: string[];
  interviewExplanationScript: string;
}

export interface JavaDataStructureInfo {
  name: string;
  javaPackage: string;
  interfaceOrClass: string;
  what: string;
  why: string;
  whenToUse: string;
  syntax: string;
  importantMethods: { method: string; desc: string; time: string }[];
  codeExample: string;
  timeComplexity: { operation: string; complexity: string }[];
  spaceComplexity: string;
  interviewUse: string;
  commonMistakes: string[];
  underTheHood: string;
}

export interface QuizQuestion {
  id: string;
  category: 'pattern' | 'complexity' | 'javads';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  clueOrTip: string;
}

export interface Flashcard {
  id: string;
  question: string;
  category: string;
  patternId?: string;
  answer: string;
  keyClue: string;
  javaTip: string;
  intervalDays: number;
}

export interface PersonalNote {
  id: string;
  title: string;
  patternId?: string;
  content: string;
  isPinned: boolean;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

export interface UserProgress {
  completedPatternIds: string[];
  solvedProblemIds: string[];
  quizScores: { quizId: string; score: number; total: number; date: number }[];
  streakDays: number;
  lastActiveDate: string;
  bookmarkedPatternIds: string[];
  confidenceRatings: Record<string, number>; // 1 to 5
}
