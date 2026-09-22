import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART10: Problem[] = [
  // --- CONCEPT: BST STRUCTURAL INVARIANTS ---
  {
    id: 'lowest-common-ancestor-of-a-bst',
    title: 'Lowest Common Ancestor of a BST',
    leetcodeNumber: 235,
    difficulty: 'Medium',
    patternId: 'tree-dfs',
    patternName: 'BST Value Split Search',
    category: 'Trees & BST',
    conceptId: 'binary-search-tree',
    conceptName: 'BST Value Range Split Invariant (p.val <= LCA <= q.val)',
    acceptanceRate: '64.5%',
    frequency: 'Top Placement (Amazon, Microsoft, Meta, Google)',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google'],
    description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. According to the definition of LCA: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."',
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explanation: 'LCA of 2 and 8 is 6.' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', explanation: 'LCA of 2 and 4 is 2 since a node can be descendant of itself.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [2, 10^5].', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique.', 'p != q', 'p and q will exist in the BST.'],
    patternClues: ['BST property: Left < Root < Right', 'If both p and q < curr.val, LCA is in left subtree', 'If both p and q > curr.val, LCA is in right subtree', 'First node where p and q split (or one equals curr.val) is the LCA'],
    bruteForce: { approach: 'Traverse root-to-node paths for p and q into lists and find lowest common element.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Path storage.' },
    optimizedApproach: { concept: 'Iterative BST bisection without recursion stack.', timeComplexity: 'O(H)', spaceComplexity: 'O(1)', keyIdea: 'curr = root. While curr != null: if p.val < curr.val and q.val < curr.val curr = curr.left. Else if p.val > curr.val and q.val > curr.val curr = curr.right. Else return curr.' },
    hints: ['Take advantage of the BST property: all left nodes are smaller, all right nodes are greater.', 'When does the path to p and the path to q diverge? That divergence point is the LCA.'],
    pseudocode: `curr = root
while curr != null:
    if p.val < curr.val and q.val < curr.val:
        curr = curr.left
    else if p.val > curr.val and q.val > curr.val:
        curr = curr.right
    else:
        return curr`,
    javaSolution: `public class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode curr = root;

        while (curr != null) {
            if (p.val < curr.val && q.val < curr.val) {
                // Both nodes lie strictly in the left subtree
                curr = curr.left;
            } else if (p.val > curr.val && q.val > curr.val) {
                // Both nodes lie strictly in the right subtree
                curr = curr.right;
            } else {
                // We have reached the split point (or curr equals p or q)
                return curr;
            }
        }

        return null;
    }
}`,
    starterCode: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Write your solution here
        return null;
    }
}`,
    testCases: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', expectedOutput: '6' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', expectedOutput: '2' }
    ],
    hiddenTestCases: [{ input: 'root = [2, 1], p = 2, q = 1', expectedOutput: '2' }],
    interviewExplanationScript: '"In a Binary Search Tree, all nodes in the left subtree have values strictly less than the root, and all nodes in the right subtree have values strictly greater than the root. We traverse down the tree: if both p and q are smaller than the current node, the LCA must reside in the left subtree. If both are larger, the LCA resides in the right subtree. The very first node where p and q split into opposite sides (or where the current node equals p or q) is mathematically guaranteed to be the lowest common ancestor. This runs in O(H) time and O(1) space."'
  },

  // --- CONCEPT: TREE BFS RIGHT SIDE VIEW ---
  {
    id: 'binary-tree-right-side-view',
    title: 'Binary Tree Right Side View',
    leetcodeNumber: 199,
    difficulty: 'Medium',
    patternId: 'tree-bfs',
    patternName: 'Level-Order Last Node Extraction',
    category: 'Trees & BST',
    conceptId: 'trees-bfs',
    conceptName: 'Level-Order Snapshotting Rightmost Boundary Projection',
    acceptanceRate: '63.9%',
    frequency: 'Top Placement (Meta, Amazon, Google)',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft'],
    description: 'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.',
    examples: [
      { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]', explanation: 'Rightmost nodes at each level.' },
      { input: 'root = [1,null,3]', output: '[1,3]', explanation: 'Right nodes.' },
      { input: 'root = []', output: '[]', explanation: 'Empty tree.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    patternClues: ['Rightmost node at each depth level', 'BFS queue snapshotting: node at index size - 1 of each level is visible from right side'],
    bruteForce: { approach: 'Record full level order traversal matrix and extract last element of each list.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Redundant full matrix creation.' },
    optimizedApproach: { concept: 'Level order BFS queue snapshot.', timeComplexity: 'O(N)', spaceComplexity: 'O(W)', keyIdea: 'Queue initialized with root. While !queue.isEmpty(): levelSize = queue.size(). For i in 0..levelSize-1: curr = queue.poll(). If i == levelSize - 1, result.add(curr.val). Enqueue left and right.' },
    hints: ['Level order traversal allows you to inspect every horizontal slice of the tree.', 'The node visible from the right side is simply the last node encountered at that level.'],
    pseudocode: `queue = [root]
while !queue.isEmpty():
    size = queue.size()
    for i in 0..size-1:
        curr = queue.poll()
        if i == size - 1: res.add(curr.val)
        if curr.left: queue.offer(curr.left)
        if curr.right: queue.offer(curr.right)
return res`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

public class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();

            for (int i = 0; i < levelSize; i++) {
                TreeNode curr = queue.poll();

                // If this is the last node of the current level, it is visible from the right
                if (i == levelSize - 1) {
                    result.add(curr.val);
                }

                if (curr.left != null) queue.offer(curr.left);
                if (curr.right != null) queue.offer(curr.right);
            }
        }

        return result;
    }
}`,
    starterCode: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'root = [1,2,3,null,5,null,4]', expectedOutput: '[1, 3, 4]' },
      { input: 'root = [1,null,3]', expectedOutput: '[1, 3]' }
    ],
    hiddenTestCases: [{ input: 'root = []', expectedOutput: '[]' }],
    interviewExplanationScript: '"To capture the right side view of a binary tree, we apply a level-order BFS traversal. By capturing queue.size() at each tier, we process nodes level by level. The node processed at the final index (i == levelSize - 1) of each tier is the rightmost node at that depth and is therefore the sole node visible from the right. It achieves O(N) time and O(W) auxiliary space where W is maximum tree width."'
  },

  // --- CONCEPT: BACKTRACKING COMBINATIONS ---
  {
    id: 'letter-combinations-of-a-phone-number',
    title: 'Letter Combinations of a Phone Number',
    leetcodeNumber: 17,
    difficulty: 'Medium',
    patternId: 'backtracking',
    patternName: 'Multi-Way Decision Tree Backtracking',
    category: 'Backtracking',
    conceptId: 'backtracking',
    conceptName: 'Cartesian Product Multi-Way Decision Backtracking',
    acceptanceRate: '60.1%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Uber'],
    description: 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters (just like on the telephone buttons) is given: 2:"abc", 3:"def", 4:"ghi", 5:"jkl", 6:"mno", 7:"pqrs", 8:"tuv", 9:"wxyz".',
    examples: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', explanation: 'Combinations of 2 (a,b,c) and 3 (d,e,f).' },
      { input: 'digits = ""', output: '[]', explanation: 'Empty string.' },
      { input: 'digits = "2"', output: '["a","b","c"]', explanation: 'Single digit.' }
    ],
    constraints: ['0 <= digits.length <= 4', 'digits[i] is a digit in the range [\'2\', \'9\'].'],
    patternClues: ['Cartesian product of letters across digits', 'DFS with index tracking depth in digits string; base case index == digits.length()'],
    bruteForce: { approach: 'Nested loops for each digit (limited to 4 digits).', timeComplexity: 'O(4^N)', spaceComplexity: 'O(N)', bottleneck: 'Rigid loop structure, not generalizable.' },
    optimizedApproach: { concept: 'DFS backtracking with character mapping table.', timeComplexity: 'O(4^N * N)', spaceComplexity: 'O(N) recursion stack', keyIdea: 'Map 2..9 to strings. In backtrack(index, sb): if index == digits.length: add to result. For char in mapping[digits[index]]: sb.append(char), backtrack(index+1), sb.deleteLast().' },
    hints: ['Store the keypad mapping in an array indexed by digit.', 'At each recursive level, iterate through all characters mapped to the current digit.'],
    pseudocode: `backtrack(index, current):
    if index == digits.length:
        result.add(current.toString()); return
    letters = map[digits[index] - '0']
    for ch in letters:
        current.append(ch)
        backtrack(index + 1, current)
        current.deleteLast()`,
    javaSolution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    private static final String[] KEYPAD = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    public List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits == null || digits.isEmpty()) {
            return result;
        }

        backtrack(digits, 0, new StringBuilder(), result);
        return result;
    }

    private void backtrack(String digits, int index, StringBuilder current, List<String> result) {
        if (index == digits.length()) {
            result.add(current.toString());
            return;
        }

        String letters = KEYPAD[digits.charAt(index) - '0'];
        for (int i = 0; i < letters.length(); i++) {
            current.append(letters.charAt(i));
            backtrack(digits, index + 1, current, result);
            current.deleteCharAt(current.length() - 1);
        }
    }
}`,
    starterCode: `class Solution {
    public List<String> letterCombinations(String digits) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'digits = "23"', expectedOutput: '["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]' },
      { input: 'digits = "2"', expectedOutput: '["a", "b", "c"]' }
    ],
    hiddenTestCases: [{ input: 'digits = ""', expectedOutput: '[]' }],
    interviewExplanationScript: '"To generate all possible phone keypad letter combinations, we traverse a tree of possibilities using backtracking. Each digit corresponds to a level in the tree, branching 3 or 4 ways. When the recursion depth equals the number of digits, we capture the built string. We then pop the last character to explore the neighboring branch. The total combinations are at most 4^N, running in O(4^N * N) time with O(N) recursion stack space."'
  },

  // --- CONCEPT: 0/1 KNAPSACK DYNAMIC PROGRAMMING ---
  {
    id: 'partition-equal-subset-sum',
    title: 'Partition Equal Subset Sum',
    leetcodeNumber: 416,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: '0/1 Knapsack Boolean DP',
    category: 'Dynamic Programming',
    conceptId: '1d-dp',
    conceptName: '0/1 Knapsack Target-Sum Subset Reduction (Sum / 2)',
    acceptanceRate: '46.8%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.',
    examples: [
      { input: 'nums = [1, 5, 11, 5]', output: 'true', explanation: 'Array can be partitioned as [1, 5, 5] and [11].' },
      { input: 'nums = [1, 2, 3, 5]', output: 'false', explanation: 'Cannot be partitioned into equal sum subsets.' }
    ],
    constraints: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
    patternClues: ['Partition into two equal subsets == Find subset whose sum is totalSum / 2', 'If totalSum % 2 != 0 return false', '0/1 Knapsack: each number can be picked at most once, traverse backwards from target to num'],
    bruteForce: { approach: 'Examine all 2^N subsets to check if any sum equals totalSum / 2.', timeComplexity: 'O(2^N)', spaceComplexity: 'O(N)', bottleneck: 'Exponential search.' },
    optimizedApproach: { concept: '1D boolean array 0/1 Knapsack traversing backwards.', timeComplexity: 'O(N * Target)', spaceComplexity: 'O(Target)', keyIdea: 'target = sum / 2. dp[0] = true. For num in nums: for j from target downTo num: dp[j] = dp[j] || dp[j - num]. Return dp[target].' },
    hints: ['If total sum is odd, can it ever be partitioned equally? No.', 'This is identical to the classic 0/1 Knapsack: can we achieve a capacity of sum / 2?'],
    pseudocode: `if sum % 2 != 0: return false
target = sum / 2
dp = new boolean[target + 1]
dp[0] = true
for num in nums:
    for j from target downTo num:
        dp[j] = dp[j] or dp[j - num]
return dp[target]`,
    javaSolution: `public class Solution {
    public boolean canPartition(int[] nums) {
        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }

        // Odd sum cannot be partitioned into two equal integer halves
        if (totalSum % 2 != 0) {
            return false;
        }

        int target = totalSum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true; // A subset sum of 0 is always achievable with empty set

        for (int num : nums) {
            // Traverse backwards to prevent using the same element multiple times
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }

        return dp[target];
    }
}`,
    starterCode: `class Solution {
    public boolean canPartition(int[] nums) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 'nums = [1, 5, 11, 5]', expectedOutput: 'true' },
      { input: 'nums = [1, 2, 3, 5]', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 'nums = [2, 2]', expectedOutput: 'true' }],
    interviewExplanationScript: '"Partitioning an array into two subsets of equal sum is equivalent to finding whether a subset exists with a sum equal to totalSum / 2. If the total sum is odd, an equal partition is impossible, so we immediately return false. Otherwise, this maps directly to the 0/1 Knapsack problem. We maintain a boolean array dp of size target + 1, where dp[j] indicates whether sum j can be formed. By iterating backwards from target down to num, we ensure each element is utilized at most once. Runs in O(N * Target) time with O(Target) space."'
  },

  // --- CONCEPT: BITWISE PARITY & COUNTING ---
  {
    id: 'counting-bits',
    title: 'Counting Bits',
    leetcodeNumber: 338,
    difficulty: 'Easy',
    patternId: 'bit-manipulation',
    patternName: 'Bitwise Dynamic Programming',
    category: 'Bit Manipulation',
    conceptId: 'bit-manipulation',
    conceptName: 'DP Bitwise Right-Shift Recurrence (ans[i] = ans[i >> 1] + (i & 1))',
    acceptanceRate: '78.2%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    description: 'Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1\'s in the binary representation of i. Must solve in linear O(N) time in a single pass without using built-in popcount functions.',
    examples: [
      { input: 'n = 2', output: '[0,1,1]', explanation: '0: 0, 1: 1, 2: 10.' },
      { input: 'n = 5', output: '[0,1,1,2,1,2]', explanation: '0 to 5 in binary 1s count.' }
    ],
    constraints: ['0 <= n <= 10^5'],
    patternClues: ['Calculate set bits for all numbers from 0 to n in linear O(N) time', 'i >> 1 is already solved in previous DP state: ans[i] = ans[i >> 1] + (i & 1)'],
    bruteForce: { approach: 'For each number from 0 to n, loop through all 32 bits.', timeComplexity: 'O(N * 32)', spaceComplexity: 'O(1)', bottleneck: 'Performs 32 bit checks for every number.' },
    optimizedApproach: { concept: 'Bitwise DP using right-shift and lowest bit.', timeComplexity: 'O(N)', spaceComplexity: 'O(1) extra space', keyIdea: 'ans[i] = ans[i >> 1] + (i & 1). Shifting right removes the last bit, which has already been computed.' },
    hints: ['Notice that i >> 1 shifts out the least significant bit.', 'The number of set bits in i is equal to the number of set bits in (i >> 1) plus 1 if i is odd (i & 1).'],
    pseudocode: `ans = new int[n + 1]
for i in 1..n:
    ans[i] = ans[i >> 1] + (i & 1)
return ans`,
    javaSolution: `public class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            // Number of 1s in i = number of 1s in (i >> 1) + 1 if the last bit is 1
            ans[i] = ans[i >> 1] + (i & 1);
        }

        return ans;
    }
}`,
    starterCode: `class Solution {
    public int[] countBits(int n) {
        // Write your solution here
        return new int[0];
    }
}`,
    testCases: [
      { input: 'n = 2', expectedOutput: '[0, 1, 1]' },
      { input: 'n = 5', expectedOutput: '[0, 1, 1, 2, 1, 2]' }
    ],
    hiddenTestCases: [{ input: 'n = 0', expectedOutput: '[0]' }],
    interviewExplanationScript: '"To solve Counting Bits in strictly O(N) linear time without inspecting all 32 bits for each number, we use dynamic programming. Observe that shifting a number right by 1 bit (i >> 1) preserves all bits except the least significant bit (LSB). Because i >> 1 is strictly less than i, its bit count is already memoized in ans[i >> 1]. The only remaining bit is determined in O(1) via (i & 1). This yields ans[i] = ans[i >> 1] + (i & 1), computing the answer for all values up to N in a single linear pass in O(N) time and O(1) extra space."'
  }
];
