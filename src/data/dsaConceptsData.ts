export interface DsaConcept {
  id: string;
  name: string;
  category: string;
  description: string;
  coreRule: string;
  timeComplexityGuideline: string;
  commonCompanies: string[];
  triggerKeywords: string[];
}

export const DSA_CONCEPTS_LIST: DsaConcept[] = [
  {
    id: 'arrays-hashing',
    name: 'Arrays & Hashing',
    category: 'Fundamentals',
    description: 'Constant time element lookup, frequency counting, and hash-set membership identification.',
    coreRule: 'Trade O(N) memory to turn quadratic O(N²) scans into O(1) instantaneous lookups using HashTables or 26-char frequency vectors.',
    timeComplexityGuideline: 'O(N) time, O(N) space',
    commonCompanies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    triggerKeywords: ['find duplicate', 'two sum', 'anagram', 'frequency', 'lookup', 'unique elements']
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers (Inward & Outward Scan)',
    category: 'Pointers & Windows',
    description: 'Converging or divergent pointer pairs scanning sorted sequences or performing in-place partitioning.',
    coreRule: 'When an array is sorted or monotonic, two pointers eliminate one entire dimension of searching per step.',
    timeComplexityGuideline: 'O(N) time, O(1) space',
    commonCompanies: ['Meta', 'Amazon', 'Microsoft', 'Google', 'Apple'],
    triggerKeywords: ['sorted array', 'pair sum', 'triplet', 'palindrome', 'in-place swap', 'dutch national flag']
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window (Fixed & Variable)',
    category: 'Pointers & Windows',
    description: 'Dynamic contiguous sub-array or sub-string boundaries maintaining invariant criteria (e.g. at most k distinct elements).',
    coreRule: 'Expand right boundary to include new elements; contract left boundary to restore the required invariant.',
    timeComplexityGuideline: 'O(N) time, O(K) space',
    commonCompanies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Uber'],
    triggerKeywords: ['contiguous substring', 'longest substring', 'minimum window', 'subarray sum', 'at most k']
  },
  {
    id: 'fast-slow-pointers',
    name: 'Fast & Slow Pointers (Tortoise & Hare)',
    category: 'Pointers & Windows',
    description: 'Pointers moving at different velocities (1x vs 2x) for cycle detection and midpoint bisecting.',
    coreRule: 'On a circular or finite path, a 2x faster pointer is guaranteed to collide with a 1x pointer within one cycle.',
    timeComplexityGuideline: 'O(N) time, O(1) space',
    commonCompanies: ['Microsoft', 'Amazon', 'Google', 'Meta'],
    triggerKeywords: ['cycle detection', 'linked list loop', 'middle node', 'happy number']
  },
  {
    id: 'stack',
    name: 'Stack & Monotonic Stack',
    category: 'Linear Structures',
    description: 'LIFO evaluation and monotonic stacks for finding next/previous greater or smaller elements in O(N).',
    coreRule: 'Pop elements from the stack whenever the incoming element violates the monotonic order; the popped element resolves its nearest bound.',
    timeComplexityGuideline: 'O(N) time, O(N) space',
    commonCompanies: ['Amazon', 'Google', 'Meta', 'Bloomberg', 'ByteDance'],
    triggerKeywords: ['next greater element', 'daily temperatures', 'histogram', 'parentheses matching', 'expression parsing']
  },
  {
    id: 'linked-list',
    name: 'In-Place Linked List Operations',
    category: 'Linear Structures',
    description: 'Pointer redirection without node re-allocation, including list reversal, merging, and dummy head patterns.',
    coreRule: 'Use a sentinel dummy node to eliminate edge-case branching for list head updates, and cache next before re-pointing.',
    timeComplexityGuideline: 'O(N) time, O(1) auxiliary space',
    commonCompanies: ['Amazon', 'Microsoft', 'Google', 'Apple'],
    triggerKeywords: ['reverse list', 'merge sorted lists', 'remove nth from end', 'reorder list']
  },
  {
    id: 'binary-search',
    name: 'Binary Search & Range Bisection',
    category: 'Divide & Conquer',
    description: 'Logarithmic search space elimination on sorted arrays or monotonic answer spaces.',
    coreRule: 'If a predicate f(x) is monotonic (False ... False, True ... True), binary search finds the optimal boundary in O(log N).',
    timeComplexityGuideline: 'O(log N) time, O(1) space',
    commonCompanies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Bloomberg'],
    triggerKeywords: ['sorted array', 'search in rotated', 'minimum speed', 'capacity to ship', 'koko bananas']
  },
  {
    id: 'trees-dfs',
    name: 'Tree DFS (Pre/In/Post-Order Recursion)',
    category: 'Hierarchical Structures',
    description: 'Recursive divide-and-conquer traversing tree structures, calculating subtree heights, and propagating invariants.',
    coreRule: 'Solve subtrees independently; combine left and right results in post-order (bottom-up) to evaluate parent nodes.',
    timeComplexityGuideline: 'O(N) time, O(H) call stack',
    commonCompanies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    triggerKeywords: ['max depth', 'diameter of tree', 'path sum', 'invert tree', 'lowest common ancestor']
  },
  {
    id: 'trees-bfs',
    name: 'Tree BFS & Level-Order Traversal',
    category: 'Hierarchical Structures',
    description: 'Breadth-first exploration using a FIFO queue to process nodes level by level.',
    coreRule: 'Snapshot queue.size() at each tier to isolate all nodes at depth d before enqueueing depth d+1.',
    timeComplexityGuideline: 'O(N) time, O(W) queue width',
    commonCompanies: ['Meta', 'Amazon', 'Google', 'Microsoft'],
    triggerKeywords: ['level order', 'zigzag level', 'right side view', 'cousins in binary tree']
  },
  {
    id: 'binary-search-tree',
    name: 'Binary Search Tree (BST) Invariants',
    category: 'Hierarchical Structures',
    description: 'Trees adhering to Left < Root < Right, where in-order traversal yields strictly sorted values.',
    coreRule: 'Leverage BST invariants [min, max] to steer search left or right without traversing irrelevant branches.',
    timeComplexityGuideline: 'O(H) average, O(N) worst case',
    commonCompanies: ['Microsoft', 'Amazon', 'Google', 'Meta'],
    triggerKeywords: ['validate BST', 'kth smallest in BST', 'LCA in BST', 'convert sorted array to BST']
  },
  {
    id: 'heaps-pq',
    name: 'Heaps & PriorityQueues (Top-K)',
    category: 'Selection & Scheduling',
    description: 'Min-heaps and max-heaps maintaining partial orders for stream medians and top-K frequent elements.',
    coreRule: 'A min-heap of size K keeps the K largest elements seen so far; evict root when size > K.',
    timeComplexityGuideline: 'O(N log K) time, O(K) space',
    commonCompanies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Uber'],
    triggerKeywords: ['kth largest', 'top k frequent', 'median from data stream', 'task scheduler']
  },
  {
    id: 'backtracking',
    name: 'Backtracking & State Exploration',
    category: 'Combinatorial & Search',
    description: 'Exhaustive exploration of search spaces (subsets, permutations, combinations) with state pruning.',
    coreRule: 'Choose an option, recurse to explore the resulting branch, then un-choose (undo state mutation) before the next choice.',
    timeComplexityGuideline: 'O(2^N) or O(N!) depending on permutation vs subset',
    commonCompanies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Bloomberg'],
    triggerKeywords: ['subsets', 'permutations', 'combination sum', 'word search', 'n-queens', 'generate parentheses']
  },
  {
    id: 'graphs',
    name: 'Graph BFS / DFS & Multi-Source Traversal',
    category: 'Graph Theory',
    description: 'Connected components, cycle detection, grid flood-fill, and multi-source propagation.',
    coreRule: 'Always maintain a visited state (hash set, boolean matrix, or in-place sentinel) to prevent infinite loops in cyclic graphs.',
    timeComplexityGuideline: 'O(V + E) time, O(V) space',
    commonCompanies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
    triggerKeywords: ['number of islands', 'rotting oranges', 'clone graph', 'connected components', 'course schedule']
  },
  {
    id: '1d-dp',
    name: '1D Dynamic Programming',
    category: 'Optimization & DP',
    description: 'Solving linear optimization and counting problems by caching answers to overlapping subproblems.',
    coreRule: 'Define dp[i] clearly as the optimal answer for prefix i. If dp[i] depends only on the last k states, compress space to O(1).',
    timeComplexityGuideline: 'O(N) time, O(1) or O(N) space',
    commonCompanies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    triggerKeywords: ['climbing stairs', 'house robber', 'coin change', 'longest increasing subsequence', 'decode ways']
  },
  {
    id: '2d-dp',
    name: '2D Dynamic Programming & Grids',
    category: 'Optimization & DP',
    description: 'Grid pathfinding, sequence alignment (LCS, Edit Distance), and knapsack matrices.',
    coreRule: 'dp[i][j] combines sub-problems from (i-1, j) and (i, j-1). Can often be compressed into a single 1D rolling row array.',
    timeComplexityGuideline: 'O(M * N) time, O(N) space',
    commonCompanies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    triggerKeywords: ['unique paths', 'longest common subsequence', 'edit distance', 'minimum path sum']
  },
  {
    id: 'intervals',
    name: 'Intervals & Greedy Scheduling',
    category: 'Selection & Scheduling',
    description: 'Sorting time intervals by start or end times to merge overlaps or schedule disjoint tasks.',
    coreRule: 'Sort intervals by start time to detect consecutive overlaps; sort by end time (Earliest Deadline First) to maximize disjoint count.',
    timeComplexityGuideline: 'O(N log N) time, O(1) space',
    commonCompanies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    triggerKeywords: ['merge intervals', 'insert interval', 'meeting rooms', 'non-overlapping intervals']
  },
  {
    id: 'bit-manipulation',
    name: 'Bit Manipulation & XOR Properties',
    category: 'Fundamentals',
    description: 'Binary bitwise operations (&, |, ^, ~, <<, >>) for constant-time arithmetic and parity checking.',
    coreRule: 'x ^ x = 0 (self-cancellation) and x & (x - 1) clears the lowest set bit in O(1).',
    timeComplexityGuideline: 'O(1) or O(32) time, O(1) space',
    commonCompanies: ['Amazon', 'Microsoft', 'Google', 'Apple'],
    triggerKeywords: ['single number', 'hamming weight', 'counting bits', 'power of two', 'bitwise AND']
  }
];
