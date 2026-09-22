import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART6: Problem[] = [
  // --- CONCEPT: ADVANCED BACKTRACKING ---
  {
    id: 'subsets',
    title: 'Subsets (Power Set)',
    leetcodeNumber: 78,
    difficulty: 'Medium',
    patternId: 'backtracking',
    patternName: 'Pick / Don\'t Pick Binary Decision Tree',
    category: 'Backtracking',
    conceptId: 'backtracking',
    conceptName: 'Power-Set Binary Decision Tree Exploration (2^N)',
    acceptanceRate: '78.5%',
    frequency: 'Top Placement (Amazon, Meta, Google, Microsoft)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
    examples: [
      { input: 'nums = [1, 2, 3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', explanation: 'All 8 subsets.' },
      { input: 'nums = [0]', output: '[[],[0]]', explanation: '2 subsets.' }
    ],
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All the numbers of nums are unique.'],
    patternClues: ['Generate all subsets: 2^N total subsets', 'At each index i, we can either include or exclude nums[i]'],
    bruteForce: { approach: 'Bit manipulation from 0 to 2^N - 1 checking set bits.', timeComplexity: 'O(N * 2^N)', spaceComplexity: 'O(N * 2^N)', bottleneck: 'Equivalent complexity, backtracking is more extensible.' },
    optimizedApproach: { concept: 'Recursive DFS backtracking with start index.', timeComplexity: 'O(N * 2^N)', spaceComplexity: 'O(N) recursion stack', keyIdea: 'At each invocation, add current to result. Then for i from start to n-1: current.add(nums[i]), backtrack(i+1), current.remove(last).' },
    hints: ['Each element has two choices: to be included or excluded.', 'At each step in the backtracking function, current is already a valid subset, so add it to result.'],
    pseudocode: `backtrack(start, current):
    result.add(new ArrayList(current))
    for i in start..n-1:
        current.add(nums[i])
        backtrack(i + 1, current)
        current.remove(last)`,
    javaSolution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current));

        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }
}`,
    starterCode: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'nums = [1, 2, 3]', expectedOutput: '[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]' },
      { input: 'nums = [0]', expectedOutput: '[[], [0]]' }
    ],
    hiddenTestCases: [{ input: 'nums = [9]', expectedOutput: '[[], [9]]' }],
    interviewExplanationScript: '"To generate the 2^N subsets of the power set, we build an exploration tree. At each state, the current list represents a valid subset, which we immediately copy into the result. For each index from start to n-1, we include nums[i], recurse with start = i + 1 to prevent ordering duplicates, and then remove the element on backtracking. This runs in O(N * 2^N) time and O(N) recursion stack space."'
  },
  {
    id: 'word-search',
    title: 'Word Search',
    leetcodeNumber: 79,
    difficulty: 'Medium',
    patternId: 'backtracking',
    patternName: '2D Grid In-Place Backtracking',
    category: 'Backtracking',
    conceptId: 'backtracking',
    conceptName: '2D Grid DFS State Backtracking with In-Place Visited Masking',
    acceptanceRate: '42.3%',
    frequency: 'Top Placement (Amazon, Microsoft, Bloomberg, Google)',
    companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Google', 'Meta'],
    description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.',
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true', explanation: 'Word traced along cells.' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true', explanation: 'Word traced along cells.' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false', explanation: 'Cannot reuse cell \'B\'.' }
    ],
    constraints: ['m == board.length', 'n = board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15', 'board and word consist of only lowercase and uppercase English letters.'],
    patternClues: ['Find contiguous path matching string on 2D grid', 'In-place masking: board[r][c] = \'#\' avoids separate visited matrix, restore on backtrack'],
    bruteForce: { approach: 'Examine all paths of length L with separate visited array.', timeComplexity: 'O(M * N * 4^L)', spaceComplexity: 'O(M * N)', bottleneck: 'Extra space allocation.' },
    optimizedApproach: { concept: 'DFS backtracking with in-place character masking.', timeComplexity: 'O(M * N * 3^L)', spaceComplexity: 'O(L) recursion depth', keyIdea: 'Try every cell as starting point. If board[r][c] == word[k], temporarily set board[r][c] = \'#\', explore 4 directions with k+1, restore board[r][c].' },
    hints: ['If board[r][c] != word.charAt(index), return false immediately.', 'Temporarily change board[r][c] to \'#\' to mark it as visited, then restore it afterwards.'],
    pseudocode: `for r in 0..m-1:
    for c in 0..n-1:
        if dfs(r, c, 0): return true
return false

dfs(r, c, k):
    if k == word.length: return true
    if outOfBounds or board[r][c] != word[k]: return false
    temp = board[r][c]
    board[r][c] = '#'
    found = dfs(r+1,c,k+1) or dfs(r-1,c,k+1) or dfs(r,c+1,k+1) or dfs(r,c-1,k+1)
    board[r][c] = temp
    return found`,
    javaSolution: `public class Solution {
    public boolean exist(char[][] board, String word) {
        int rows = board.length;
        int cols = board[0].length;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (board[r][c] == word.charAt(0)) {
                    if (dfs(board, r, c, word, 0)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private boolean dfs(char[][] board, int r, int c, String word, int index) {
        if (index == word.length()) {
            return true;
        }

        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(index)) {
            return false;
        }

        // Mark cell visited in-place
        char temp = board[r][c];
        board[r][c] = '#';

        boolean found = dfs(board, r + 1, c, word, index + 1)
                     || dfs(board, r - 1, c, word, index + 1)
                     || dfs(board, r, c + 1, word, index + 1)
                     || dfs(board, r, c - 1, word, index + 1);

        // Backtrack: restore cell
        board[r][c] = temp;

        return found;
    }
}`,
    starterCode: `class Solution {
    public boolean exist(char[][] board, String word) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', expectedOutput: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', expectedOutput: 'true' }
    ],
    hiddenTestCases: [{ input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', expectedOutput: 'false' }],
    interviewExplanationScript: '"We iterate through all board cells as prospective start positions. When a cell matches word.charAt(0), we trigger a 4-directional DFS. To adhere to the constraint that a cell may not be reused in the same path without allocating extra memory, we temporarily replace board[r][c] with a sentinel \'#\'. After exploring the 4 branches, we restore the original character during the backtracking phase. The runtime is O(M * N * 3^L) where L is word length, and space is O(L) on the call stack."'
  },
  {
    id: 'generate-parentheses',
    title: 'Generate Parentheses',
    leetcodeNumber: 22,
    difficulty: 'Medium',
    patternId: 'backtracking',
    patternName: 'Constrained Tree Backtracking',
    category: 'Backtracking',
    conceptId: 'backtracking',
    conceptName: 'Dyck Path Open/Close Bracket Invariant Backtracking',
    acceptanceRate: '75.1%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    examples: [
      { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]', explanation: '5 valid combinations (Catalan number C3 = 5).' },
      { input: 'n = 1', output: '["()"]', explanation: '1 valid combination.' }
    ],
    constraints: ['1 <= n <= 8'],
    patternClues: ['Generate well-formed parentheses of length 2n', 'Catalan number of combinations', 'Can add \'(\' if open < n; can add \')\' if close < open'],
    bruteForce: { approach: 'Generate all 2^(2N) strings and validate each with stack.', timeComplexity: 'O(2^(2N) * N)', spaceComplexity: 'O(N)', bottleneck: 'Generates mostly invalid strings.' },
    optimizedApproach: { concept: 'Backtracking with prefix invariants: open < n and close < open.', timeComplexity: 'O(4^N / sqrt(N)) (Catalan number)', spaceComplexity: 'O(N) recursion stack', keyIdea: 'Maintain open and close counters. Only branch into \'(\' if open < n, and \')\' if close < open. Guarantees every generated path is strictly valid.' },
    hints: ['You can only add an opening bracket if you have not used all n open brackets.', 'You can only add a closing bracket if there are more open brackets than closing brackets so far.'],
    pseudocode: `backtrack(open, close, current):
    if current.length == 2 * n:
        result.add(current.toString()); return
    if open < n:
        backtrack(open + 1, close, current + '(')
    if close < open:
        backtrack(open, close + 1, current + ')')`,
    javaSolution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(n, 0, 0, new StringBuilder(), result);
        return result;
    }

    private void backtrack(int n, int open, int close, StringBuilder current, List<String> result) {
        if (current.length() == 2 * n) {
            result.add(current.toString());
            return;
        }

        if (open < n) {
            current.append('(');
            backtrack(n, open + 1, close, current, result);
            current.deleteCharAt(current.length() - 1);
        }

        if (close < open) {
            current.append(')');
            backtrack(n, open, close + 1, current, result);
            current.deleteCharAt(current.length() - 1);
        }
    }
}`,
    starterCode: `class Solution {
    public List<String> generateParenthesis(int n) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'n = 3', expectedOutput: '["((()))", "(()())", "(())()", "()(())", "()()()"]' },
      { input: 'n = 1', expectedOutput: '["()"]' }
    ],
    hiddenTestCases: [{ input: 'n = 2', expectedOutput: '["(())", "()()"]' }],
    interviewExplanationScript: '"Instead of generating all 2^(2n) sequences and filtering, we maintain two invariants during backtracking: (1) We can only append \'(\' if open < n, and (2) We can only append \')\' if close < open. This ensures that every prefix remains valid and every leaf corresponds to a well-formed string. The total number of valid strings is given by the nth Catalan number, C_n = (1/(n+1)) * (2n choose n), running in O(4^n / sqrt(n)) time with O(n) stack space."'
  },

  // --- CONCEPT: BINARY SEARCH INVARIANTS ---
  {
    id: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    leetcodeNumber: 153,
    difficulty: 'Medium',
    patternId: 'binary-search',
    patternName: 'Boundary Discontinuity Binary Search',
    category: 'Binary Search',
    conceptId: 'binary-search',
    conceptName: 'Inflection Point Boundary Bisection (nums[mid] vs nums[high])',
    acceptanceRate: '50.9%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log N) time.',
    examples: [
      { input: 'nums = [3, 4, 5, 1, 2]', output: '1', explanation: 'Original was [1, 2, 3, 4, 5] rotated 3 times.' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2]', output: '0', explanation: 'Original was [0, 1, 2, 4, 5, 6, 7] rotated 4 times.' },
      { input: 'nums = [11, 13, 15, 17]', output: '11', explanation: 'Rotated 4 times (identical to sorted).' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All the integers of nums are unique.'],
    patternClues: ['Rotated sorted array with unique elements', 'Compare nums[mid] with nums[high]', 'If nums[mid] > nums[high], minimum must be in right half (low = mid + 1). Else in left half including mid (high = mid).'],
    bruteForce: { approach: 'Linear scan to find minimum.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', bottleneck: 'Violates O(log N) constraint.' },
    optimizedApproach: { concept: 'Binary search comparing mid against high.', timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', keyIdea: 'low = 0, high = n - 1. While low < high: mid = low + (high - low)/2. If nums[mid] > nums[high] low = mid + 1; else high = mid. Return nums[low].' },
    hints: ['Compare nums[mid] with nums[high] instead of nums[low].', 'If nums[mid] > nums[high], the inflection point (minimum) must be strictly to the right of mid.'],
    pseudocode: `low = 0, high = n - 1
while low < high:
    mid = low + (high - low) / 2
    if nums[mid] > nums[high]:
        low = mid + 1
    else:
        high = mid
return nums[low]`,
    javaSolution: `public class Solution {
    public int findMin(int[] nums) {
        int low = 0;
        int high = nums.length - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] > nums[high]) {
                // Minimum must be strictly to the right of mid
                low = mid + 1;
            } else {
                // Minimum could be at mid or to the left of mid
                high = mid;
            }
        }

        return nums[low];
    }
}`,
    starterCode: `class Solution {
    public int findMin(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [3, 4, 5, 1, 2]', expectedOutput: '1' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2]', expectedOutput: '0' },
      { input: 'nums = [11, 13, 15, 17]', expectedOutput: '11' }
    ],
    hiddenTestCases: [{ input: 'nums = [2, 1]', expectedOutput: '1' }],
    interviewExplanationScript: '"In a rotated sorted array without duplicates, comparing nums[mid] against nums[high] reveals where the inflection point lies. If nums[mid] > nums[high], the sequence between mid and high contains the cliff, so the minimum is strictly to the right (low = mid + 1). Conversely, if nums[mid] <= nums[high], the right half is sorted, so the minimum must be at mid or to its left (high = mid). When low converges with high, nums[low] is the minimum. Time complexity is O(log N) with O(1) space."'
  },
  {
    id: 'search-a-2d-matrix',
    title: 'Search a 2D Matrix',
    leetcodeNumber: 74,
    difficulty: 'Medium',
    patternId: 'binary-search',
    patternName: 'Flattened Virtual 1D Binary Search',
    category: 'Binary Search',
    conceptId: 'binary-search',
    conceptName: '2D-to-1D Row-Major Virtual Index Mapping',
    acceptanceRate: '50.4%',
    frequency: 'Top Placement (Amazon, Microsoft, Meta)',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google'],
    description: 'You are given an m x n integer matrix matrix with the following two properties: Each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise. Must write a solution in O(log(m * n)) time.',
    examples: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true', explanation: '3 is in row 0, col 1.' },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'false', explanation: '13 is not present.' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 100', '-10^4 <= matrix[i][j], target <= 10^4'],
    patternClues: ['2D matrix strictly sorted across all rows and columns in reading order', 'Can be treated as a single 1D sorted array of length m * n', 'Virtual index mid maps to row = mid / n and col = mid % n'],
    bruteForce: { approach: 'Search row by row or scan all elements.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(1)', bottleneck: 'Linear scan.' },
    optimizedApproach: { concept: 'Standard binary search on virtual 1D interval [0, m * n - 1].', timeComplexity: 'O(log(M * N))', spaceComplexity: 'O(1)', keyIdea: 'low = 0, high = m * n - 1. In each step, val = matrix[mid / n][mid % n]. Halve interval.' },
    hints: ['Notice that if you read the matrix row-by-row, it is one continuous sorted array.', 'Convert a 1D index i into 2D coordinates: row = i / n, col = i % n.'],
    pseudocode: `low = 0, high = m * n - 1
while low <= high:
    mid = low + (high - low) / 2
    val = matrix[mid / n][mid % n]
    if val == target: return true
    else if val < target: low = mid + 1
    else: high = mid - 1
return false`,
    javaSolution: `public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return false;
        }

        int m = matrix.length;
        int n = matrix[0].length;
        int low = 0;
        int high = m * n - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int r = mid / n;
            int c = mid % n;
            int val = matrix[r][c];

            if (val == target) {
                return true;
            } else if (val < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return false;
    }
}`,
    starterCode: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', expectedOutput: 'true' },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 'matrix = [[1]], target = 1', expectedOutput: 'true' }],
    interviewExplanationScript: '"Because the first integer of each row is strictly greater than the last integer of the previous row, the entire m x n matrix can be viewed as a flattened 1D sorted array of length m * n. We perform standard binary search over the range [0, m * n - 1]. We map any virtual 1D index mid back to 2D coordinates using integer division (mid / n) for row and modulo (mid % n) for column. This achieves strictly O(log(m * n)) time and O(1) space."'
  },

  // --- CONCEPT: LINKED LIST STRUCTURAL ---
  {
    id: 'remove-nth-node-from-end-of-list',
    title: 'Remove Nth Node From End of List',
    leetcodeNumber: 19,
    difficulty: 'Medium',
    patternId: 'fast-slow-pointers',
    patternName: 'Two Pointers with Fixed Offset Gap',
    category: 'Linked List',
    conceptId: 'linked-list',
    conceptName: 'Sentinel Dummy Head with N-Stride Lead Pointer',
    acceptanceRate: '45.8%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head. Solve in one pass.',
    examples: [
      { input: 'head = [1, 2, 3, 4, 5], n = 2', output: '[1, 2, 3, 5]', explanation: '2nd node from end (4) is removed.' },
      { input: 'head = [1], n = 1', output: '[]', explanation: 'Single node removed.' },
      { input: 'head = [1, 2], n = 1', output: '[1]', explanation: 'Last node removed.' }
    ],
    constraints: ['The number of nodes in the list is sz.', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
    patternClues: ['Remove nth node from end in a single pass', 'Advance fast pointer n+1 steps ahead of slow pointer to position slow right before target'],
    bruteForce: { approach: 'Pass 1 finds length L, Pass 2 traverses L - n nodes.', timeComplexity: 'O(L)', spaceComplexity: 'O(1)', bottleneck: 'Requires two passes.' },
    optimizedApproach: { concept: 'Dummy head and two pointers maintaining gap of n + 1.', timeComplexity: 'O(L)', spaceComplexity: 'O(1)', keyIdea: 'dummy.next = head. Move fast n + 1 steps ahead. Then move slow and fast together until fast == null. slow.next = slow.next.next.' },
    hints: ['Create a dummy node pointing to head to handle edge cases like removing the head.', 'Give the fast pointer an n-step head start.'],
    pseudocode: `dummy = new ListNode(0); dummy.next = head
fast = dummy, slow = dummy
for 0..n: fast = fast.next
while fast != null:
    fast = fast.next
    slow = slow.next
slow.next = slow.next.next
return dummy.next`,
    javaSolution: `public class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode fast = dummy;
        ListNode slow = dummy;

        // Advances fast pointer so that the gap between fast and slow is n + 1 nodes
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }

        // Move fast to the end, maintaining the gap
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        // Delete target node
        slow.next = slow.next.next;

        return dummy.next;
    }
}`,
    starterCode: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Write your solution here
        return null;
    }
}`,
    testCases: [
      { input: 'head = [1, 2, 3, 4, 5], n = 2', expectedOutput: '[1, 2, 3, 5]' },
      { input: 'head = [1], n = 1', expectedOutput: '[]' }
    ],
    hiddenTestCases: [{ input: 'head = [1, 2], n = 1', expectedOutput: '[1]' }],
    interviewExplanationScript: '"To remove the nth node from the end in a single pass without prior knowledge of the list length, we attach a dummy node before head and initialize two pointers, fast and slow. We advance fast n + 1 steps ahead. Then, we advance fast and slow in tandem until fast reaches null. At this point, slow rests precisely on the node preceding the target node, allowing an immediate O(1) removal via slow.next = slow.next.next. Runs in O(L) time and O(1) auxiliary space."'
  },

  // --- CONCEPT: TREE STRUCTURAL INVARIANTS ---
  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    leetcodeNumber: 226,
    difficulty: 'Easy',
    patternId: 'tree-dfs',
    patternName: 'Recursive Subtree Swap',
    category: 'Trees & BST',
    conceptId: 'trees-dfs',
    conceptName: 'Recursive Subtree Mirror Swap Invariant',
    acceptanceRate: '77.8%',
    frequency: 'Top Placement (Google, Amazon, Meta, Microsoft)',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple'],
    description: 'Given the root of a binary tree, invert the tree, and return its root. (Famous interview problem that flips left and right children recursively).',
    examples: [
      { input: 'root = [4, 2, 7, 1, 3, 6, 9]', output: '[4, 7, 2, 9, 6, 3, 1]', explanation: 'Every left and right child is mirrored.' },
      { input: 'root = [2, 1, 3]', output: '[2, 3, 1]', explanation: 'Children 1 and 3 swapped.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    patternClues: ['Mirror a binary tree', 'At each node, swap left and right subtrees and recurse'],
    bruteForce: { approach: 'Same as optimal: recursive inversion is inherently optimal.', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', bottleneck: 'None.' },
    optimizedApproach: { concept: 'Post-order or pre-order recursive swap.', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', keyIdea: 'If root == null return null. Invert left, invert right, swap left and right pointers. Return root.' },
    hints: ['Think of this as swapping two variables: temp = root.left; root.left = root.right; root.right = temp.', 'Apply the same logic recursively to every node.'],
    pseudocode: `invertTree(node):
    if node == null: return null
    left = invertTree(node.left)
    right = invertTree(node.right)
    node.left = right
    node.right = left
    return node`,
    javaSolution: `public class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }

        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);

        root.left = right;
        root.right = left;

        return root;
    }
}`,
    starterCode: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        // Write your solution here
        return null;
    }
}`,
    testCases: [
      { input: 'root = [4, 2, 7, 1, 3, 6, 9]', expectedOutput: '[4, 7, 2, 9, 6, 3, 1]' },
      { input: 'root = [2, 1, 3]', expectedOutput: '[2, 3, 1]' }
    ],
    hiddenTestCases: [{ input: 'root = []', expectedOutput: '[]' }],
    interviewExplanationScript: '"To mirror a binary tree, for every node in the tree, its left child must become the inverted right subtree and its right child must become the inverted left subtree. We recurse on left and right subtrees, swap the resulting pointers, and return the node. Each node is visited exactly once, yielding an optimal O(N) time complexity and O(H) space on the recursion call stack."'
  },

  // --- CONCEPT: INTERVALS & SCHEDULING ---
  {
    id: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    leetcodeNumber: 435,
    difficulty: 'Medium',
    patternId: 'intervals',
    patternName: 'Greedy Interval Scheduling by End Time',
    category: 'Intervals',
    conceptId: 'intervals',
    conceptName: 'Greedy Interval Earliest End-Time Scheduling',
    acceptanceRate: '53.6%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explanation: '[1,3] can be removed and the rest are non-overlapping.' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2', explanation: 'Must remove two [1,2] intervals.' },
      { input: 'intervals = [[1,2],[2,3]]', output: '0', explanation: 'Already non-overlapping.' }
    ],
    constraints: ['1 <= intervals.length <= 10^5', 'intervals[i].length == 2', '-5 * 10^4 <= starti < endi <= 5 * 10^4'],
    patternClues: ['Minimum removals to make non-overlapping == Maximum number of non-overlapping intervals (Interval Scheduling Theorem)', 'Sort by end time ascending; pick interval with earliest end time to maximize remaining room'],
    bruteForce: { approach: 'Check all subsets of intervals for non-overlapping property.', timeComplexity: 'O(2^N)', spaceComplexity: 'O(N)', bottleneck: 'Exponential subset exploration.' },
    optimizedApproach: { concept: 'Greedy Earliest Deadline First (EDF) scheduling.', timeComplexity: 'O(N log N)', spaceComplexity: 'O(1)', keyIdea: 'Sort intervals by end time. Keep track of prevEnd. For each interval: if start < prevEnd, conflict exists so increment removals. Else update prevEnd = end.' },
    hints: ['Sorting by end time allows you to keep intervals that finish earliest, leaving maximal room for future intervals.', 'If current start < prevEnd, an overlap occurred. Remove the one that ends later.'],
    pseudocode: `sort(intervals by end time)
count = 0, prevEnd = intervals[0][1]
for i in 1..n-1:
    if intervals[i][0] < prevEnd:
        count++
    else:
        prevEnd = intervals[i][1]
return count`,
    javaSolution: `import java.util.Arrays;
import java.util.Comparator;

public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;

        // Sort by end time ascending (Earliest Deadline First)
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[1]));

        int removals = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < prevEnd) {
                // Overlap: greedily remove current interval because it finishes later or at same time
                removals++;
            } else {
                // No overlap: update end time
                prevEnd = intervals[i][1];
            }
        }

        return removals;
    }
}`,
    starterCode: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', expectedOutput: '1' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', expectedOutput: '2' },
      { input: 'intervals = [[1,2],[2,3]]', expectedOutput: '0' }
    ],
    hiddenTestCases: [{ input: 'intervals = [[1,100],[11,22],[1,11],[2,12]]', expectedOutput: '2' }],
    interviewExplanationScript: '"Minimizing the number of removed intervals is mathematically equivalent to maximizing the number of compatible non-overlapping intervals. By the classic Interval Scheduling Theorem, the optimal greedy strategy is to sort intervals by their end times (Earliest Deadline First). An interval that finishes earlier leaves maximum possible capacity for future intervals. Whenever an interval starts before the previous interval finishes (start < prevEnd), an overlap occurs and we greedily drop the one ending later. Runs in O(N log N) time and O(1) space."'
  }
];
