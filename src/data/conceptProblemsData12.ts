import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART12: Problem[] = [
  // --- CONCEPT: BINARY SEARCH FUNDAMENTALS ---
  {
    id: 'binary-search',
    title: 'Binary Search',
    leetcodeNumber: 704,
    difficulty: 'Easy',
    patternId: 'binary-search',
    patternName: 'Canonical Half-Interval Bisection',
    category: 'Binary Search',
    conceptId: 'binary-search',
    conceptName: 'Canonical Sorted Array Bisection (low <= high)',
    acceptanceRate: '58.2%',
    frequency: 'Top Placement (Amazon, Google, Microsoft, Meta)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Apple'],
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
    patternClues: ['Sorted array searching in O(log N)', 'Calculate mid = low + (high - low) / 2 to avoid integer overflow'],
    bruteForce: { approach: 'Linear scan through array.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', bottleneck: 'Violates O(log N) requirement.' },
    optimizedApproach: { concept: 'Binary search with inclusive bounds [low, high].', timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', keyIdea: 'low = 0, high = n - 1. While low <= high: mid = low + (high - low)/2. If nums[mid] == target return mid. Else if nums[mid] < target low = mid + 1. Else high = mid - 1.' },
    hints: ['Avoid (low + high) / 2 overflow in languages like Java by using low + (high - low) / 2.', 'Remember that the search space is cut in half on every step.'],
    pseudocode: `low = 0, high = n - 1
while low <= high:
    mid = low + (high - low) / 2
    if nums[mid] == target: return mid
    else if nums[mid] < target: low = mid + 1
    else: high = mid - 1
return -1`,
    javaSolution: `public class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            // Safe midpoint calculation preventing 32-bit signed integer overflow
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}`,
    starterCode: `class Solution {
    public int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }
}`,
    testCases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expectedOutput: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', expectedOutput: '-1' }
    ],
    hiddenTestCases: [{ input: 'nums = [5], target = 5', expectedOutput: '0' }],
    interviewExplanationScript: '"Binary Search is the fundamental logarithmic search technique on sorted sequences. We define an inclusive search interval [low, high]. At each step, we evaluate the element at mid = low + (high - low) / 2 (preventing integer overflow). If nums[mid] matches target, we return mid immediately. If nums[mid] < target, the target must lie strictly to the right, so we set low = mid + 1; otherwise, high = mid - 1. Every comparison discards half of the remaining elements, guaranteeing O(log N) runtime and O(1) space."'
  },

  // --- CONCEPT: TREE DFS HEIGHT & INVARIANTS ---
  {
    id: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    leetcodeNumber: 104,
    difficulty: 'Easy',
    patternId: 'tree-dfs',
    patternName: 'Post-Order Subtree Height Propagation',
    category: 'Trees & BST',
    conceptId: 'trees-dfs',
    conceptName: 'Post-Order Subtree Height Accumulation (1 + max(L, R))',
    acceptanceRate: '75.4%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    description: 'Given the root of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3', explanation: 'Path 3 -> 20 -> 15 has 3 nodes.' },
      { input: 'root = [1,null,2]', output: '2', explanation: 'Path 1 -> 2 has 2 nodes.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
    patternClues: ['Calculate tree height or maximum depth', 'Depth of node = 1 + max(depth(left), depth(right)); base case root == null returns 0'],
    bruteForce: { approach: 'Same as optimal: recursive depth is canonical.', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', bottleneck: 'None.' },
    optimizedApproach: { concept: 'Bottom-up post-order divide and conquer.', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', keyIdea: 'if root == null return 0. Return 1 + Math.max(maxDepth(root.left), maxDepth(root.right)).' },
    hints: ['The height of an empty tree is 0.', 'The height of any node is 1 plus the maximum height of its children.'],
    pseudocode: `maxDepth(node):
    if node == null: return 0
    return 1 + max(maxDepth(node.left), maxDepth(node.right))`,
    javaSolution: `public class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        return 1 + Math.max(leftDepth, rightDepth);
    }
}`,
    starterCode: `class Solution {
    public int maxDepth(TreeNode root) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '3' },
      { input: 'root = [1,null,2]', expectedOutput: '2' }
    ],
    hiddenTestCases: [{ input: 'root = []', expectedOutput: '0' }],
    interviewExplanationScript: '"To compute the maximum depth, we recursively evaluate each subtree in post-order. An empty node has depth 0. For any non-null node, its maximum depth is 1 (for the node itself) plus the maximum between the depth of its left and right subtrees: 1 + Math.max(leftDepth, rightDepth). Every node is traversed once, yielding an optimal O(N) time complexity and O(H) space on the recursion call stack."'
  },
  {
    id: 'diameter-of-binary-tree',
    title: 'Diameter of Binary Tree',
    leetcodeNumber: 543,
    difficulty: 'Easy',
    patternId: 'tree-dfs',
    patternName: 'Global Maxima Post-Order Traversal',
    category: 'Trees & BST',
    conceptId: 'trees-dfs',
    conceptName: 'Post-Order Left-Right Subtree Path Fusion Invariant',
    acceptanceRate: '60.8%',
    frequency: 'Top Placement (Meta, Amazon, Google, Microsoft)',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.',
    examples: [
      { input: 'root = [1,2,3,4,5]', output: '3', explanation: 'Path [4,2,1,3] or [5,2,1,3] has 3 edges.' },
      { input: 'root = [1,2]', output: '1', explanation: '1 edge.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-100 <= Node.val <= 100'],
    patternClues: ['Longest path between any two nodes in a tree', 'At each node, the longest path passing through it is leftHeight + rightHeight', 'Update a global max diameter variable while returning height to parent'],
    bruteForce: { approach: 'For each node, compute height of left and right subtrees separately in O(N²).', timeComplexity: 'O(N²)', spaceComplexity: 'O(H)', bottleneck: 'Recalculating subtree heights repeatedly.' },
    optimizedApproach: { concept: 'Single-pass DFS calculating height and updating diameter simultaneously.', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', keyIdea: 'In helper: left = height(node.left), right = height(node.right). maxDiameter = max(maxDiameter, left + right). Return 1 + max(left, right).' },
    hints: ['The longest path through a given node is the sum of the maximum depths of its left and right subtrees.', 'Compute height bottom-up and update the maximum diameter seen so far at each node.'],
    pseudocode: `maxDiameter = 0
dfs(node):
    if node == null: return 0
    left = dfs(node.left)
    right = dfs(node.right)
    maxDiameter = max(maxDiameter, left + right)
    return 1 + max(left, right)
dfs(root)
return maxDiameter`,
    javaSolution: `public class Solution {
    private int maxDiameter = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        getHeight(root);
        return maxDiameter;
    }

    private int getHeight(TreeNode node) {
        if (node == null) {
            return 0;
        }

        int left = getHeight(node.left);
        int right = getHeight(node.right);

        // Path through current node has length left + right edges
        maxDiameter = Math.max(maxDiameter, left + right);

        // Return height of current node to its parent
        return 1 + Math.max(left, right);
    }
}`,
    starterCode: `class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'root = [1,2,3,4,5]', expectedOutput: '3' },
      { input: 'root = [1,2]', expectedOutput: '1' }
    ],
    hiddenTestCases: [{ input: 'root = [1]', expectedOutput: '0' }],
    interviewExplanationScript: '"The diameter passing through any given node equals the depth of its left subtree plus the depth of its right subtree (measured in edges). Because the path does not necessarily pass through the root, we update a global maxDiameter at each node while returning 1 + Math.max(left, right) to the caller. This computes both tree heights and the maximum diameter in a single post-order pass, running in O(N) time and O(H) recursion stack space."'
  },

  // --- CONCEPT: BINARY SEARCH TREE VALIDATION ---
  {
    id: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    leetcodeNumber: 98,
    difficulty: 'Medium',
    patternId: 'tree-dfs',
    patternName: 'Bounded Range Propagation',
    category: 'Trees & BST',
    conceptId: 'binary-search-tree',
    conceptName: 'BST Open Interval Value Constraint Propagation (min < val < max)',
    acceptanceRate: '32.8%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys strictly less than the node\'s key. The right subtree of a node contains only nodes with keys strictly greater than the node\'s key. Both the left and right subtrees must also be binary search trees.',
    examples: [
      { input: 'root = [2,1,3]', output: 'true', explanation: 'Valid BST.' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'Root is 5, but right child 4 is smaller than 5.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
    patternClues: ['Valid BST: It is NOT sufficient to check left.val < root.val and right.val > root.val! All nodes in left must be < root', 'Pass lower and upper bounds [min, max] down during recursion'],
    bruteForce: { approach: 'For each node, find max in left subtree and min in right subtree in O(N²).', timeComplexity: 'O(N²)', spaceComplexity: 'O(H)', bottleneck: 'Redundant subtree min/max scans.' },
    optimizedApproach: { concept: 'Recursive DFS with valid interval bounds (min, max).', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', keyIdea: 'isValid(node, min, max): if node == null return true. If min != null and node.val <= min return false. If max != null and node.val >= max return false. Return isValid(node.left, min, node.val) && isValid(node.right, node.val, max).' },
    hints: ['A common mistake is checking only immediate children. What if a node deep in the left subtree is larger than the root?', 'Pass the allowable open interval (min, max) as Long objects to prevent 32-bit integer overflow.'],
    pseudocode: `isValid(node, min, max):
    if node == null: return true
    if min != null and node.val <= min: return false
    if max != null and node.val >= max: return false
    return isValid(node.left, min, node.val) and isValid(node.right, node.val, max)`,
    javaSolution: `public class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }

    private boolean validate(TreeNode node, Integer min, Integer max) {
        if (node == null) {
            return true;
        }

        // Violates lower bound constraint from ancestor
        if (min != null && node.val <= min) {
            return false;
        }

        // Violates upper bound constraint from ancestor
        if (max != null && node.val >= max) {
            return false;
        }

        // Left subtree must be strictly less than node.val
        // Right subtree must be strictly greater than node.val
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
}`,
    starterCode: `class Solution {
    public boolean isValidBST(TreeNode root) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 'root = [2,1,3]', expectedOutput: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 'root = [2147483647]', expectedOutput: 'true' }],
    interviewExplanationScript: '"A frequent pitfall in BST validation is verifying only that immediate children satisfy node.left.val < node.val < node.right.val. In reality, all descendants in the left subtree must be strictly less than every ancestor on whose right it resides. We pass an open interval constraint (min, max) down the recursion tree. When traversing left, max becomes node.val. When traversing right, min becomes node.val. If any node breaches its allowed range, we immediately return false. Runs in O(N) time and O(H) space."'
  },

  // --- CONCEPT: 2D GRID DYNAMIC PROGRAMMING ---
  {
    id: 'unique-paths',
    title: 'Unique Paths',
    leetcodeNumber: 62,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: '2D Grid Path Accumulation',
    category: 'Dynamic Programming',
    conceptId: '2d-dp',
    conceptName: '2D Grid Boundary Down/Right Path Combinatorics (dp[r][c] = top + left)',
    acceptanceRate: '64.5%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    description: 'There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.',
    examples: [
      { input: 'm = 3, n = 7', output: '28', explanation: '28 distinct paths from (0,0) to (2,6).' },
      { input: 'm = 3, n = 2', output: '3', explanation: '3 paths: (Right, Down, Down), (Down, Down, Right), (Down, Right, Down).' }
    ],
    constraints: ['1 <= m, n <= 100'],
    patternClues: ['Count paths on grid moving only right and down', 'dp[r][c] = dp[r-1][c] + dp[r][c-1]', 'Space can be compressed to a single 1D array of size n'],
    bruteForce: { approach: 'Exhaustive recursive DFS exploring all paths.', timeComplexity: 'O(2^(M+N))', spaceComplexity: 'O(M+N)', bottleneck: 'Explores duplicate sub-paths.' },
    optimizedApproach: { concept: '1D space-optimized dynamic programming.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(N)', keyIdea: 'dp initialized to 1 for all columns. For each row from 1 to m-1: for c from 1 to n-1: dp[c] += dp[c-1]. Return dp[n-1].' },
    hints: ['To arrive at cell (r, c), the robot must come from either (r-1, c) or (r, c-1).', 'Notice you only need the previous row values to compute the current row.'],
    pseudocode: `dp = new int[n]; fill with 1
for r in 1..m-1:
    for c in 1..n-1:
        dp[c] += dp[c-1]
return dp[n-1]`,
    javaSolution: `import java.util.Arrays;

public class Solution {
    public int uniquePaths(int m, int n) {
        // Space-optimized 1D array representing the current row
        int[] dp = new int[n];
        Arrays.fill(dp, 1); // Only 1 way to reach any cell in the first row (all rights)

        for (int r = 1; r < m; r++) {
            for (int c = 1; c < n; c++) {
                // dp[c] was top; dp[c-1] is left
                dp[c] += dp[c - 1];
            }
        }

        return dp[n - 1];
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
    interviewExplanationScript: '"Because the robot can only move down or right, any cell (r, c) can only be entered from cell (r - 1, c) directly above or cell (r, c - 1) directly to the left. The recurrence is therefore dp[r][c] = dp[r - 1][c] + dp[r][c - 1]. Because each row only depends on the previous row and the cell directly to the left in the current row, we can compress the 2D matrix into a single 1D array of size n. This computes the answer in O(M * N) time with O(N) auxiliary space."'
  },
  {
    id: 'minimum-path-sum',
    title: 'Minimum Path Sum',
    leetcodeNumber: 64,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: '2D Grid Cost Accumulation',
    category: 'Dynamic Programming',
    conceptId: '2d-dp',
    conceptName: '2D Grid Min-Cost Path Accumulation (In-Place or 1D)',
    acceptanceRate: '64.1%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. Note: You can only move either down or right at any point in time.',
    examples: [
      { input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]', output: '7', explanation: 'Path 1 -> 3 -> 1 -> 1 -> 1 minimizes sum to 7.' },
      { input: 'grid = [[1,2,3],[4,5,6]]', output: '12', explanation: '1 -> 2 -> 3 -> 6 = 12.' }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 200', '0 <= grid[i][j] <= 200'],
    patternClues: ['Min-cost path in 2D grid moving only right and down', 'dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1])', 'Can be solved in-place or with 1D array of size n'],
    bruteForce: { approach: 'Examine all paths recursively.', timeComplexity: 'O(2^(M+N))', spaceComplexity: 'O(M+N)', bottleneck: 'Exponential search.' },
    optimizedApproach: { concept: '1D space-optimized DP table.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(N)', keyIdea: 'dp[c] holds min cost to column c. Base row initialized by prefix sums. For each row: dp[0] += grid[r][0]; for c from 1 to n-1: dp[c] = grid[r][c] + min(dp[c], dp[c-1]).' },
    hints: ['The cost to enter cell (r, c) is grid[r][c] plus the minimum of coming from above or coming from the left.', 'Row 0 and column 0 are straightforward cumulative sums.'],
    pseudocode: `dp = new int[n]
dp[0] = grid[0][0]
for c in 1..n-1: dp[c] = dp[c-1] + grid[0][c]
for r in 1..m-1:
    dp[0] += grid[r][0]
    for c in 1..n-1:
        dp[c] = grid[r][c] + min(dp[c], dp[c-1])
return dp[n-1]`,
    javaSolution: `public class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[] dp = new int[n];

        // Initialize first cell and first row
        dp[0] = grid[0][0];
        for (int c = 1; c < n; c++) {
            dp[c] = dp[c - 1] + grid[0][c];
        }

        // Process remaining rows
        for (int r = 1; r < m; r++) {
            dp[0] += grid[r][0]; // First column can only come from above

            for (int c = 1; c < n; c++) {
                // dp[c] was top; dp[c-1] is left
                dp[c] = grid[r][c] + Math.min(dp[c], dp[c - 1]);
            }
        }

        return dp[n - 1];
    }
}`,
    starterCode: `class Solution {
    public int minPathSum(int[][] grid) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]', expectedOutput: '7' },
      { input: 'grid = [[1,2,3],[4,5,6]]', expectedOutput: '12' }
    ],
    hiddenTestCases: [{ input: 'grid = [[5]]', expectedOutput: '5' }],
    interviewExplanationScript: '"To find the minimum path sum on a grid with non-negative weights where only down and right moves are allowed, we recognize optimal substructure: the minimum cost to arrive at cell (r, c) is the cell value grid[r][c] plus the minimum of the cost to reach (r - 1, c) directly above and (r, c - 1) directly to the left. We optimize space by allocating a single 1D array of size n, updating column by column. This completes in O(M * N) time with O(N) space."'
  }
];
