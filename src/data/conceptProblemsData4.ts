import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART4: Problem[] = [
  // --- CONCEPT: GRAPH ALGORITHMS ---
  {
    id: 'rotting-oranges',
    title: 'Rotting Oranges',
    leetcodeNumber: 994,
    difficulty: 'Medium',
    patternId: 'graph-bfs',
    patternName: 'Multi-Source Level-Order BFS',
    category: 'Graph Algorithms',
    conceptId: 'graphs',
    conceptName: 'Multi-Source Grid BFS Time-Step Propagation',
    acceptanceRate: '54.5%',
    frequency: 'Top Placement (Amazon, Microsoft, Google, Bloomberg)',
    companies: ['Amazon', 'Microsoft', 'Google', 'Bloomberg', 'Meta'],
    description: 'You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.',
    examples: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4', explanation: 'Takes 4 minutes for all oranges to rot.' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1', explanation: 'Bottom left fresh orange cannot be reached.' },
      { input: 'grid = [[0,2]]', output: '0', explanation: 'No fresh oranges exist at time 0.' }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2.'],
    patternClues: ['Simultaneous propagation from multiple starting points: Multi-source BFS', 'Each minute is a BFS tier/level', 'Track count of remaining fresh oranges to detect disconnected nodes'],
    bruteForce: { approach: 'Repeatedly scan the entire grid each minute to rot adjacent fresh oranges.', timeComplexity: 'O((M*N)²)', spaceComplexity: 'O(M*N)', bottleneck: 'Full grid rescan on every tick.' },
    optimizedApproach: { concept: 'Multi-source BFS pushing all rotten oranges into queue at minute 0.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(M * N)', keyIdea: 'Enqueue all cells with value 2, count fresh oranges. While queue is not empty and fresh > 0: increment minutes, expand 4-directionally for queue.size() nodes, decrement fresh. Return fresh == 0 ? minutes : -1.' },
    hints: ['All rotten oranges rot neighboring fresh oranges simultaneously.', 'Initialize a queue with all cells that are initially 2. Use level-by-level BFS.'],
    pseudocode: `queue = all rotten cells
freshCount = count of 1s
minutes = 0
while !queue.isEmpty() and freshCount > 0:
    for 0..queue.size - 1:
        pop (r, c)
        for each 4 dirs (nr, nc):
            if inBounds and grid[nr][nc] == 1:
                grid[nr][nc] = 2; freshCount--; queue.push(nr, nc)
    minutes++
return freshCount == 0 ? minutes : -1`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Queue;

public class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        Queue<int[]> queue = new ArrayDeque<>();
        int freshCount = 0;

        // Step 1: Enqueue all initial rotten oranges & count fresh ones
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) {
                    queue.offer(new int[]{r, c});
                } else if (grid[r][c] == 1) {
                    freshCount++;
                }
            }
        }

        if (freshCount == 0) return 0;

        int minutes = 0;
        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        // Step 2: Multi-source BFS
        while (!queue.isEmpty() && freshCount > 0) {
            int size = queue.size();
            minutes++;

            for (int i = 0; i < size; i++) {
                int[] curr = queue.poll();
                int r = curr[0];
                int c = curr[1];

                for (int[] d : dirs) {
                    int nr = r + d[0];
                    int nc = c + d[1];

                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2; // Mark as rotten
                        freshCount--;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
        }

        return freshCount == 0 ? minutes : -1;
    }
}`,
    starterCode: `class Solution {
    public int orangesRotting(int[][] grid) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', expectedOutput: '4' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', expectedOutput: '-1' }
    ],
    hiddenTestCases: [{ input: 'grid = [[0,2]]', expectedOutput: '0' }],
    interviewExplanationScript: '"Because all rotten oranges rot their neighbors in parallel, this requires Multi-Source BFS. We push all initial rotten cells into a Queue at minute 0 and count all fresh oranges. At each level of BFS, we expand into 4-directionally adjacent fresh oranges, convert them to rotten, and decrement our fresh count. When the queue empties, if fresh count is 0, we return elapsed minutes; otherwise -1 indicates unreachable oranges. Runs in O(M * N) time and space."'
  },
  {
    id: 'clone-graph',
    title: 'Clone Graph',
    leetcodeNumber: 133,
    difficulty: 'Medium',
    patternId: 'graph-dfs',
    patternName: 'DFS / BFS with Node Mapping',
    category: 'Graph Algorithms',
    conceptId: 'graphs',
    conceptName: 'DFS Graph Traversal with Visited Node Hash Identity Mapping',
    acceptanceRate: '56.7%',
    frequency: 'Top Placement (Amazon, Meta, Google, Microsoft)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.',
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explanation: 'Deep copy of 4-node cycle graph.' }
    ],
    constraints: ['The number of nodes in the graph is in the range [0, 100].', '1 <= Node.val <= 100', 'Node.val is unique for each node.'],
    patternClues: ['Deep copy graph with cycles: Must track visited copies to avoid infinite loops', 'Use a Map<Node, Node> mapping original nodes to cloned nodes'],
    bruteForce: { approach: 'Naive DFS without memoizing cloned nodes.', timeComplexity: 'Infinite loop due to cycles', spaceComplexity: 'Stack overflow', bottleneck: 'Cycles in graph.' },
    optimizedApproach: { concept: 'DFS caching cloned instances in a HashMap.', timeComplexity: 'O(V + E)', spaceComplexity: 'O(V)', keyIdea: 'If node is null return null. If node in map, return map.get(node). Otherwise create clone, put in map, then for each neighbor recurse and add to clone.neighbors.' },
    hints: ['How do you handle cycles in the graph so you don\'t create infinite copies?', 'Map each original node to its freshly created clone.'],
    pseudocode: `map = new HashMap()
clone(node):
    if node == null: return null
    if map.contains(node): return map.get(node)
    copy = new Node(node.val)
    map.put(node, copy)
    for neighbor in node.neighbors:
        copy.neighbors.add(clone(neighbor))
    return copy`,
    javaSolution: `import java.util.*;

// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() { val = 0; neighbors = new ArrayList<Node>(); }
    public Node(int _val) { val = _val; neighbors = new ArrayList<Node>(); }
    public Node(int _val, ArrayList<Node> _neighbors) { val = _val; neighbors = _neighbors; }
}

public class Solution {
    private final Map<Node, Node> visited = new HashMap<>();

    public Node cloneGraph(Node node) {
        if (node == null) return null;

        // If node was already cloned, return the existing clone to prevent cyclic loops
        if (visited.containsKey(node)) {
            return visited.get(node);
        }

        // Create deep clone of current node
        Node clone = new Node(node.val, new ArrayList<>());
        visited.put(node, clone);

        // Recursively clone all neighbors
        for (Node neighbor : node.neighbors) {
            clone.neighbors.add(cloneGraph(neighbor));
        }

        return clone;
    }
}`,
    starterCode: `class Solution {
    public Node cloneGraph(Node node) {
        // Write your solution here
        return null;
    }
}`,
    testCases: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' }
    ],
    hiddenTestCases: [{ input: 'adjList = [[]]', expectedOutput: '[[]]' }],
    interviewExplanationScript: '"To deep-clone a graph that contains cycles, we must avoid creating duplicate nodes and prevent infinite recursion. We maintain a HashMap mapping each original node to its newly instantiated clone. During recursive DFS, if a node has already been visited, we return its existing clone immediately. Otherwise, we instantiate the clone, register it in the map, and recursively clone and attach all neighbors. Runs in O(V + E) time and O(V) space."'
  },

  // --- CONCEPT: 1D DYNAMIC PROGRAMMING ---
  {
    id: 'house-robber',
    title: 'House Robber',
    leetcodeNumber: 198,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: '1D DP State Compression',
    category: 'Dynamic Programming',
    conceptId: '1d-dp',
    conceptName: 'Non-Adjacent Dynamic Choice State Compression',
    acceptanceRate: '50.9%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Return the maximum amount of money you can rob tonight without alerting the police.',
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 4.' },
      { input: 'nums = [2, 7, 9, 3, 1]', output: '12', explanation: 'Rob house 1 (2), 3 (9), 5 (1). Total = 12.' }
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    patternClues: ['Cannot choose adjacent elements', 'At house i, choices are: Rob (nums[i] + dp[i-2]) or Skip (dp[i-1])', 'Only previous two states needed: O(1) space'],
    bruteForce: { approach: 'Examine all 2^N subsets of non-adjacent houses recursively.', timeComplexity: 'O(2^N)', spaceComplexity: 'O(N)', bottleneck: 'Exponential branching.' },
    optimizedApproach: { concept: 'Constant space dynamic programming.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'robPrev1 and robPrev2. For each num: current = max(robPrev1, robPrev2 + num); robPrev2 = robPrev1; robPrev1 = current. Return robPrev1.' },
    hints: ['To decide for house i: do you rob it (meaning you could not rob house i-1) or skip it?', 'Formula: dp[i] = max(dp[i-1], dp[i-2] + nums[i]).'],
    pseudocode: `prev2 = 0, prev1 = 0
for num in nums:
    curr = max(prev1, prev2 + num)
    prev2 = prev1
    prev1 = curr
return prev1`,
    javaSolution: `public class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;

        int prev2 = 0; // max profit ending 2 houses ago
        int prev1 = 0; // max profit ending 1 house ago

        for (int num : nums) {
            int current = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}`,
    starterCode: `class Solution {
    public int rob(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [1, 2, 3, 1]', expectedOutput: '4' },
      { input: 'nums = [2, 7, 9, 3, 1]', expectedOutput: '12' }
    ],
    hiddenTestCases: [{ input: 'nums = [0]', expectedOutput: '0' }],
    interviewExplanationScript: '"At each house, we have two mutually exclusive optimal choices: skip this house (yielding the maximum profit achieved up through the previous house, prev1), or rob this house (adding its money to the profit from two houses back, prev2 + num). Because computing current requires only the previous two outcomes, we maintain two rolling variables. This produces an optimal O(N) time and O(1) space solution."'
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    leetcodeNumber: 322,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: 'Unbounded Knapsack 1D DP',
    category: 'Dynamic Programming',
    conceptId: '1d-dp',
    conceptName: 'Unbounded Knapsack Bottom-Up Minimization DP',
    acceptanceRate: '44.8%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.',
    examples: [
      { input: 'coins = [1, 2, 5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1 (3 coins).' },
      { input: 'coins = [2], amount = 3', output: '-1', explanation: 'Cannot make 3 using 2.' },
      { input: 'coins = [1], amount = 0', output: '0', explanation: '0 coins required.' }
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    patternClues: ['Unbounded choices to reach exact target with minimum count', 'Bottom-up DP table: dp[i] = min(dp[i], 1 + dp[i - coin])'],
    bruteForce: { approach: 'Recursive tree trying all coins for remaining amount.', timeComplexity: 'O(S^N)', spaceComplexity: 'O(amount)', bottleneck: 'Exponential repeated overlapping subproblems.' },
    optimizedApproach: { concept: 'Bottom-up 1D DP array of size amount + 1.', timeComplexity: 'O(amount * coins.length)', spaceComplexity: 'O(amount)', keyIdea: 'Initialize dp array to amount + 1. dp[0] = 0. For a from 1 to amount: for each coin: if a - coin >= 0, dp[a] = min(dp[a], 1 + dp[a - coin]). Return dp[amount] > amount ? -1 : dp[amount].' },
    hints: ['Define dp[i] as the minimum coins needed to make amount i.', 'If you use coin c, the subproblem is 1 + dp[i - c].'],
    pseudocode: `dp = array of size (amount + 1) filled with amount + 1
dp[0] = 0
for a from 1 to amount:
    for c in coins:
        if a - c >= 0:
            dp[a] = min(dp[a], 1 + dp[a - c])
return dp[amount] > amount ? -1 : dp[amount]`,
    javaSolution: `import java.util.Arrays;

public class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (a - coin >= 0) {
                    dp[a] = Math.min(dp[a], 1 + dp[a - coin]);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    starterCode: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'coins = [1, 2, 5], amount = 11', expectedOutput: '3' },
      { input: 'coins = [2], amount = 3', expectedOutput: '-1' },
      { input: 'coins = [1], amount = 0', expectedOutput: '0' }
    ],
    hiddenTestCases: [{ input: 'coins = [2, 5, 10, 1], amount = 27', expectedOutput: '4' }],
    interviewExplanationScript: '"This is an unbounded knapsack minimization problem. We define dp[a] as the minimum coins needed to form amount a. Initializing dp with amount + 1 (representing infinity) and base case dp[0] = 0, we compute each amount from 1 up to target. For each valid coin, we transition via dp[a] = min(dp[a], 1 + dp[a - coin]). If dp[amount] remains unchanged, the amount is unattainable, so we return -1. Time complexity is O(amount * |coins|) and space is O(amount)."'
  },
  {
    id: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    leetcodeNumber: 300,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: 'Patience Sorting / Binary Search LIS',
    category: 'Dynamic Programming',
    conceptId: '1d-dp',
    conceptName: 'Patience Sorting Greedy Tails Array with Bisection',
    acceptanceRate: '55.3%',
    frequency: 'Top Placement (Amazon, Google, Microsoft, Meta)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Apple'],
    description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence. Can you solve it in O(N log N) time complexity?',
    examples: [
      { input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]', output: '4', explanation: 'The longest increasing subsequence is [2, 3, 7, 101] or [2, 5, 7, 101], length 4.' },
      { input: 'nums = [0, 1, 0, 3, 2, 3]', output: '4', explanation: 'LIS is [0, 1, 2, 3], length 4.' },
      { input: 'nums = [7, 7, 7, 7, 7, 7, 7]', output: '1', explanation: 'Strictly increasing, so length is 1.' }
    ],
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    patternClues: ['Strictly increasing subsequence', 'O(N²) DP vs O(N log N) Patience Sorting with Binary Search', 'Maintain tails array where tails[i] is the smallest tail of all increasing subsequences of length i + 1'],
    bruteForce: { approach: 'Standard O(N²) DP where dp[i] = 1 + max(dp[j]) for j < i and nums[j] < nums[i].', timeComplexity: 'O(N²)', spaceComplexity: 'O(N)', bottleneck: 'Quadratic DP loops.' },
    optimizedApproach: { concept: 'Patience sorting with binary search.', timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)', keyIdea: 'Maintain tails array. For each x in nums, binary search for x in tails. If x > all tails, tails.append(x). Otherwise overwrite the first element >= x.' },
    hints: ['Can you maintain an array of the smallest tail elements of increasing subsequences of each length?', 'Binary search finds where each number belongs in the tails array in O(log N).'],
    pseudocode: `tails = new int[n]
size = 0
for x in nums:
    idx = binarySearch(tails, 0, size, x)
    if idx < 0: idx = -(idx + 1)
    tails[idx] = x
    if idx == size: size++
return size`,
    javaSolution: `import java.util.Arrays;

public class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;

        for (int x : nums) {
            int i = 0, j = size;
            // Binary search for first element >= x
            while (i != j) {
                int mid = (i + j) / 2;
                if (tails[mid] < x) {
                    i = mid + 1;
                } else {
                    j = mid;
                }
            }

            tails[i] = x;
            if (i == size) {
                size++;
            }
        }

        return size;
    }
}`,
    starterCode: `class Solution {
    public int lengthOfLIS(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]', expectedOutput: '4' },
      { input: 'nums = [0, 1, 0, 3, 2, 3]', expectedOutput: '4' }
    ],
    hiddenTestCases: [{ input: 'nums = [7, 7, 7, 7]', expectedOutput: '1' }],
    interviewExplanationScript: '"While a standard DP runs in O(N²), we can optimize to O(N log N) using Patience Sorting. We maintain a tails array where tails[i] stores the smallest ending element of any increasing subsequence of length i + 1. For each incoming number, we binary search tails for the first element >= x. If found, we overwrite it greedily to keep the tail as small as possible. If x is greater than all existing tails, we extend the length by 1. The final size of tails is the LIS length."'
  },

  // --- CONCEPT: 2D DYNAMIC PROGRAMMING ---
  {
    id: 'unique-paths',
    title: 'Unique Paths',
    leetcodeNumber: 62,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: '2D Grid DP Combinatorics',
    category: 'Dynamic Programming',
    conceptId: '2d-dp',
    conceptName: 'Grid Directional DAG Path Invariant (1D Compression)',
    acceptanceRate: '64.2%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.',
    examples: [
      { input: 'm = 3, n = 7', output: '28', explanation: 'Total 28 distinct paths.' },
      { input: 'm = 3, n = 2', output: '3', explanation: 'Down-Right-Down, Down-Down-Right, Right-Down-Down.' }
    ],
    constraints: ['1 <= m, n <= 100'],
    patternClues: ['Grid navigation moving only down and right', 'Paths(r, c) = Paths(r-1, c) + Paths(r, c-1)', 'Can be compressed to single 1D row array of size n'],
    bruteForce: { approach: 'Recursive branching f(r, c) = f(r+1, c) + f(r, c+1).', timeComplexity: 'O(2^(M+N))', spaceComplexity: 'O(M+N)', bottleneck: 'Exponential recalculations.' },
    optimizedApproach: { concept: '1D row array DP state compression.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(N)', keyIdea: 'Initialize row array of size n with 1s. Loop r from 1 to m-1: for c from 1 to n-1: row[c] += row[c - 1]. Return row[n - 1].' },
    hints: ['The number of ways to reach cell (i, j) is the sum of ways to reach (i-1, j) and (i, j-1).', 'Notice each row only depends on the previous row, so a 1D array of size n is sufficient.'],
    pseudocode: `row = new int[n] filled with 1
for r from 1 to m-1:
    for c from 1 to n-1:
        row[c] += row[c - 1]
return row[n - 1]`,
    javaSolution: `import java.util.Arrays;

public class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        Arrays.fill(row, 1);

        for (int r = 1; r < m; r++) {
            for (int c = 1; c < n; c++) {
                // row[c] currently holds value from previous row (up)
                // row[c-1] holds newly updated value from current row (left)
                row[c] += row[c - 1];
            }
        }

        return row[n - 1];
    }
}`,
    starterCode: `class Solution {
    public int uniquePaths(int m, int n) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'm = 3, n = 7', expectedOutput: '28' },
      { input: 'm = 3, n = 2', expectedOutput: '3' }
    ],
    hiddenTestCases: [{ input: 'm = 1, n = 1', expectedOutput: '1' }],
    interviewExplanationScript: '"Since movement is restricted to down and right, reaching cell (r, c) requires coming from either (r-1, c) or (r, c-1). Hence, dp[r][c] = dp[r-1][c] + dp[r][c-1]. Because each row update only depends on the row above and the cell to its left, we compress the DP matrix into a single 1D array of size n. This achieves O(M * N) time and O(N) space."'
  },

  // --- CONCEPT: BIT MANIPULATION ---
  {
    id: 'single-number',
    title: 'Single Number',
    leetcodeNumber: 136,
    difficulty: 'Easy',
    patternId: 'bitwise-xor',
    patternName: 'XOR Parity Cancellation',
    category: 'Bit Manipulation',
    conceptId: 'bit-manipulation',
    conceptName: 'XOR Self-Inversion Neutralization Property (A ^ A = 0)',
    acceptanceRate: '73.2%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.',
    examples: [
      { input: 'nums = [2, 2, 1]', output: '1', explanation: '2 ^ 2 = 0, 0 ^ 1 = 1.' },
      { input: 'nums = [4, 1, 2, 1, 2]', output: '4', explanation: 'Pairs cancel out leaving 4.' },
      { input: 'nums = [1]', output: '1', explanation: 'Single element.' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element appears twice except one.'],
    patternClues: ['Every number appears twice except one', 'XOR properties: A ^ A = 0, A ^ 0 = A, XOR is commutative and associative'],
    bruteForce: { approach: 'HashSet storing numbers, removing on duplicate.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Violates O(1) space constraint.' },
    optimizedApproach: { concept: 'XOR all elements together.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'result = 0. For each num in nums: result ^= num. All paired numbers cancel out to 0, leaving the unique single number.' },
    hints: ['Recall what happens when you XOR a number with itself: x ^ x = 0.', 'XOR is commutative: a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b.'],
    pseudocode: `res = 0
for num in nums: res ^= num
return res`,
    javaSolution: `public class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }
}`,
    starterCode: `class Solution {
    public int singleNumber(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [2, 2, 1]', expectedOutput: '1' },
      { input: 'nums = [4, 1, 2, 1, 2]', expectedOutput: '4' }
    ],
    hiddenTestCases: [{ input: 'nums = [-1]', expectedOutput: '-1' }],
    interviewExplanationScript: '"We exploit the mathematical properties of the bitwise XOR operator: XOR is both commutative and associative, any number XORed with itself is 0 (a ^ a = 0), and any number XORed with 0 is itself (a ^ 0 = a). XORing all array elements together cancels every duplicate pair, leaving strictly the single unique element. Runs in O(N) time and strictly O(1) space."'
  },
  {
    id: 'number-of-1-bits',
    title: 'Number of 1 Bits (Hamming Weight)',
    leetcodeNumber: 191,
    difficulty: 'Easy',
    patternId: 'bitwise-xor',
    patternName: 'Brian Kernighan\'s Bit Manipulation',
    category: 'Bit Manipulation',
    conceptId: 'bit-manipulation',
    conceptName: 'Brian Kernighan\'s Lowest Set-Bit Clearing (n & (n - 1))',
    acceptanceRate: '72.1%',
    frequency: 'Top Placement (Amazon, Microsoft, Google, Meta)',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple'],
    description: 'Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).',
    examples: [
      { input: 'n = 11 (binary 1011)', output: '3', explanation: 'Three 1s.' },
      { input: 'n = 128 (binary 10000000)', output: '1', explanation: 'One 1.' },
      { input: 'n = 2147483645', output: '30', explanation: 'Thirty 1s.' }
    ],
    constraints: ['1 <= n <= 2^31 - 1'],
    patternClues: ['Count set bits', 'Brian Kernighan\'s algorithm: n & (n - 1) always clears the lowest set bit in O(1)'],
    bruteForce: { approach: 'Shift right 32 times checking (n & 1).', timeComplexity: 'O(32)', spaceComplexity: 'O(1)', bottleneck: 'Always loops 32 times even for numbers with few 1s.' },
    optimizedApproach: { concept: 'Brian Kernighan\'s bit clearing.', timeComplexity: 'O(k) where k is number of 1-bits', spaceComplexity: 'O(1)', keyIdea: 'While n != 0: n = n & (n - 1); count++. Loops exactly once per set bit.' },
    hints: ['What does the operation n & (n - 1) do to the binary representation of n?', 'It resets the lowest set bit to 0!'],
    pseudocode: `count = 0
while n != 0:
    n = n & (n - 1)
    count++
return count`,
    javaSolution: `public class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n = n & (n - 1); // Clears lowest set bit
            count++;
        }
        return count;
    }
}`,
    starterCode: `class Solution {
    public int hammingWeight(int n) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'n = 11', expectedOutput: '3' },
      { input: 'n = 128', expectedOutput: '1' }
    ],
    hiddenTestCases: [{ input: 'n = 1', expectedOutput: '1' }],
    interviewExplanationScript: '"We apply Brian Kernighan\'s algorithm. Subtracting 1 from a binary number flips all the bits after the rightmost set bit, including that set bit itself. Therefore, computing n & (n - 1) turns off the lowest set bit in a single CPU cycle. The loop executes exactly as many times as there are set bits, achieving optimal O(k) time where k is the number of 1s, and O(1) space."'
  }
];
