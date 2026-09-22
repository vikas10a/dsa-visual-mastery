import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART3: Problem[] = [
  // --- CONCEPT: TREE DFS & BFS ---
  {
    id: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    leetcodeNumber: 104,
    difficulty: 'Easy',
    patternId: 'tree-dfs',
    patternName: 'Recursive Post-Order Height Computation',
    category: 'Trees & BST',
    conceptId: 'trees-dfs',
    conceptName: 'Post-Order Bottom-Up Height Induction',
    acceptanceRate: '75.2%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    description: 'Given the root of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '3', explanation: 'Path 3 -> 20 -> 15 or 7 gives depth 3.' },
      { input: 'root = [1, null, 2]', output: '2', explanation: 'Path 1 -> 2 gives depth 2.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
    patternClues: ['Calculate height or depth of a binary tree', 'Depth(node) = 1 + max(Depth(node.left), Depth(node.right))'],
    bruteForce: { approach: 'Level-order traversal queue counting levels.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Queue allocation overhead.' },
    optimizedApproach: { concept: 'Post-order DFS recursive induction.', timeComplexity: 'O(N)', spaceComplexity: 'O(H) recursion stack', keyIdea: 'Base case: if root == null return 0. Recursively compute left and right depths, then return 1 + max(left, right).' },
    hints: ['What is the depth of an empty tree (null node)? 0.', 'If you know the maximum depth of the left and right subtrees, what is the maximum depth of the current root?'],
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
      { input: 'root = [3, 9, 20, null, null, 15, 7]', expectedOutput: '3' },
      { input: 'root = [1, null, 2]', expectedOutput: '2' }
    ],
    hiddenTestCases: [{ input: 'root = []', expectedOutput: '0' }],
    interviewExplanationScript: '"We compute the maximum depth using recursive post-order DFS. The base case is a null node with depth 0. For any node, its depth is 1 plus the maximum of the depths of its left and right subtrees. This visits each node once in O(N) time and requires O(H) call stack space, where H is the height of the tree."'
  },
  {
    id: 'diameter-of-binary-tree',
    title: 'Diameter of Binary Tree',
    leetcodeNumber: 543,
    difficulty: 'Easy',
    patternId: 'tree-dfs',
    patternName: 'DFS Global State Accumulation',
    category: 'Trees & BST',
    conceptId: 'trees-dfs',
    conceptName: 'Post-Order Bottom-Up Global Diameter Accumulation',
    acceptanceRate: '60.4%',
    frequency: 'Top Placement (Meta, Amazon, Google, Microsoft)',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.',
    examples: [
      { input: 'root = [1, 2, 3, 4, 5]', output: '3', explanation: 'Path 4 -> 2 -> 1 -> 3 or 5 -> 2 -> 1 -> 3 has length 3 edges.' },
      { input: 'root = [1, 2]', output: '1', explanation: 'Single edge.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-100 <= Node.val <= 100'],
    patternClues: ['Longest path between any two nodes', 'Path passing through node has length = leftDepth + rightDepth', 'Must track global maximum while returning single branch height upwards'],
    bruteForce: { approach: 'For each node, compute maxDepth(node.left) + maxDepth(node.right) from scratch.', timeComplexity: 'O(N²)', spaceComplexity: 'O(H)', bottleneck: 'Repeated depth traversals.' },
    optimizedApproach: { concept: 'Single-pass post-order DFS computing branch depth and updating global max diameter.', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', keyIdea: 'Helper returns height of subtree (1 + max(left, right)). At each node, candidate diameter is leftHeight + rightHeight.' },
    hints: ['The longest path through any given node is the depth of its left subtree plus the depth of its right subtree.', 'Compute depths from bottom to top so you only visit each node once.'],
    pseudocode: `maxDiameter = 0
dfs(node):
    if node == null: return 0
    left = dfs(node.left)
    right = dfs(node.right)
    maxDiameter = max(maxDiameter, left + right)
    return 1 + max(left, right)`,
    javaSolution: `public class Solution {
    private int maxDiameter = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        depth(root);
        return maxDiameter;
    }

    private int depth(TreeNode node) {
        if (node == null) return 0;

        int left = depth(node.left);
        int right = depth(node.right);

        // Longest path through this node has (left + right) edges
        maxDiameter = Math.max(maxDiameter, left + right);

        // Return height of this subtree to parent
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
      { input: 'root = [1, 2, 3, 4, 5]', expectedOutput: '3' },
      { input: 'root = [1, 2]', expectedOutput: '1' }
    ],
    hiddenTestCases: [{ input: 'root = [1]', expectedOutput: '0' }],
    interviewExplanationScript: '"The longest path between any two nodes might not pass through the root, but it must curve at some node. For any node, the longest path that uses it as the highest point has length leftDepth + rightDepth. In a bottom-up post-order DFS, we calculate subtree heights, update the global maximum diameter at each node, and return 1 + max(left, right) to the caller. This runs in optimal O(N) time and O(H) space."'
  },
  {
    id: 'binary-tree-level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    leetcodeNumber: 102,
    difficulty: 'Medium',
    patternId: 'tree-bfs',
    patternName: 'Queue Snapshot Level BFS',
    category: 'Trees & BST',
    conceptId: 'trees-bfs',
    conceptName: 'FIFO Queue Level-by-Level Snapshot BFS',
    acceptanceRate: '66.8%',
    frequency: 'Top Placement (Amazon, Meta, Google, Microsoft)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '[[3], [9, 20], [15, 7]]', explanation: '3 at level 0, 9 & 20 at level 1, 15 & 7 at level 2.' },
      { input: 'root = [1]', output: '[[1]]', explanation: 'Single node.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
    patternClues: ['Traverse tree level by level', 'Queue snapshot size determines number of elements in current horizontal tier'],
    bruteForce: { approach: 'Recursive DFS passing depth d and inserting into list at index d.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Valid, but iterative BFS is standard and avoids deep recursion.' },
    optimizedApproach: { concept: 'Standard BFS with Queue and level size iteration.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'Push root. In each iteration, levelSize = queue.size(). Pop levelSize nodes, add to level list, push their children.' },
    hints: ['Use a Queue. How do you distinguish between levels?', 'Before looping over the current level, record levelSize = queue.size().'],
    pseudocode: `queue = [root]
while !queue.isEmpty():
    size = queue.size()
    level = []
    for 0..size-1:
        node = queue.poll()
        level.add(node.val)
        if node.left: queue.offer(node.left)
        if node.right: queue.offer(node.right)
    result.add(level)`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

public class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>(levelSize);

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);

                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }

            result.add(currentLevel);
        }

        return result;
    }
}`,
    starterCode: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', expectedOutput: '[[3], [9, 20], [15, 7]]' },
      { input: 'root = [1]', expectedOutput: '[[1]]' }
    ],
    hiddenTestCases: [{ input: 'root = []', expectedOutput: '[]' }],
    interviewExplanationScript: '"To traverse level by level, we use a FIFO Queue. At the start of each level iteration, queue.size() captures the exact number of nodes on the current horizontal tier. We poll exactly that many nodes, append their values to a level list, and enqueue any non-null children for the subsequent tier. Time complexity is O(N) and max space is O(W) where W is the maximum tree width."'
  },
  {
    id: 'kth-smallest-element-in-a-bst',
    title: 'Kth Smallest Element in a BST',
    leetcodeNumber: 230,
    difficulty: 'Medium',
    patternId: 'tree-dfs',
    patternName: 'In-Order Traversal',
    category: 'Trees & BST',
    conceptId: 'binary-search-tree',
    conceptName: 'BST In-Order Monotonic Ascending Traversal',
    acceptanceRate: '72.3%',
    frequency: 'Top Placement (Amazon, Google, Microsoft, Meta)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Uber'],
    description: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
    examples: [
      { input: 'root = [3, 1, 4, null, 2], k = 1', output: '1', explanation: 'Sorted order is [1, 2, 3, 4], 1st smallest is 1.' },
      { input: 'root = [5, 3, 6, 2, 4, null, null, 1], k = 3', output: '3', explanation: 'Sorted order is [1, 2, 3, 4, 5, 6], 3rd smallest is 3.' }
    ],
    constraints: ['The number of nodes in the tree is n.', '1 <= k <= n <= 10^4', '0 <= Node.val <= 10^4'],
    patternClues: ['BST property: Left < Root < Right', 'In-order traversal of a BST produces strictly ascending sorted order', 'Stop traversal as soon as k elements have been visited'],
    bruteForce: { approach: 'In-order traversal dumping all nodes into a list, return list.get(k - 1).', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Stores all N elements unnecessarily.' },
    optimizedApproach: { concept: 'Early-stopping iterative or recursive in-order traversal.', timeComplexity: 'O(H + k)', spaceComplexity: 'O(H)', keyIdea: 'Traverse left subtree. Decrement k on visiting node; if k == 0, record answer and return early.' },
    hints: ['In-order traversal visits nodes in ascending order in a BST.', 'Maintain a counter of visited nodes and stop as soon as you reach k.'],
    pseudocode: `count = k, result = -1
inorder(node):
    if node == null or count == 0: return
    inorder(node.left)
    count--
    if count == 0:
        result = node.val
        return
    inorder(node.right)`,
    javaSolution: `public class Solution {
    private int count;
    private int result;

    public int kthSmallest(TreeNode root, int k) {
        this.count = k;
        inorder(root);
        return result;
    }

    private void inorder(TreeNode node) {
        if (node == null || count == 0) return;

        inorder(node.left);

        count--;
        if (count == 0) {
            result = node.val;
            return;
        }

        inorder(node.right);
    }
}`,
    starterCode: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'root = [3, 1, 4, null, 2], k = 1', expectedOutput: '1' },
      { input: 'root = [5, 3, 6, 2, 4, null, null, 1], k = 3', expectedOutput: '3' }
    ],
    hiddenTestCases: [{ input: 'root = [2, 1, 3], k = 2', expectedOutput: '2' }],
    interviewExplanationScript: '"Because the tree is a Binary Search Tree, an in-order traversal (Left, Root, Right) processes nodes in strictly non-decreasing order. By maintaining a countdown counter k, when k reaches 0 we have located the kth smallest element and can immediately terminate recursion. This runs in O(H + k) time and O(H) auxiliary stack space."'
  },

  // --- CONCEPT: HEAPS & PRIORITY QUEUES ---
  {
    id: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    leetcodeNumber: 347,
    difficulty: 'Medium',
    patternId: 'top-k-elements',
    patternName: 'Min-Heap or Bucket Sort',
    category: 'Heap & PriorityQueue',
    conceptId: 'heaps-pq',
    conceptName: 'Bounded Min-Heap / Frequency Bucket Sort',
    acceptanceRate: '63.9%',
    frequency: 'Top Placement (Amazon, Meta, Google, Microsoft)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Apple'],
    description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Your algorithm\'s time complexity must be better than O(N log N).',
    examples: [
      { input: 'nums = [1, 1, 1, 2, 2, 3], k = 2', output: '[1, 2]', explanation: '1 appears 3 times, 2 appears 2 times.' },
      { input: 'nums = [1], k = 1', output: '[1]', explanation: 'Single element.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, the number of unique elements in the array].', 'It is guaranteed that the answer is unique.'],
    patternClues: ['Find top k items by frequency', 'Can be solved in O(N log K) with Min-Heap or O(N) with Bucket Sort'],
    bruteForce: { approach: 'Count frequencies in HashMap, sort map entries by frequency in O(M log M).', timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)', bottleneck: 'Full sort.' },
    optimizedApproach: { concept: 'Min-Heap of size K storing elements ordered by frequency.', timeComplexity: 'O(N log K)', spaceComplexity: 'O(N)', keyIdea: 'Map frequencies. Maintain a Min-Heap of size k based on count. If heap size > k, poll min frequency element. The k remaining elements are top k.' },
    hints: ['Count the frequency of each number using a HashMap.', 'Use a Min-Heap of size K to keep only the highest frequency numbers.'],
    pseudocode: `map = countFrequencies(nums)
minHeap = PriorityQueue sorted by map.get(x)
for num in map.keySet():
    minHeap.offer(num)
    if minHeap.size() > k: minHeap.poll()
return minHeap.toArray()`,
    javaSolution: `import java.util.*;

public class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> countMap = new HashMap<>();
        for (int num : nums) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }

        // Min-heap ordered by frequency ascending
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(
            Comparator.comparingInt(countMap::get)
        );

        for (int num : countMap.keySet()) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = minHeap.poll();
        }
        return result;
    }
}`,
    starterCode: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Write your solution here
        return new int[0];
    }
}`,
    testCases: [
      { input: 'nums = [1, 1, 1, 2, 2, 3], k = 2', expectedOutput: '[1, 2]' },
      { input: 'nums = [1], k = 1', expectedOutput: '[1]' }
    ],
    hiddenTestCases: [{ input: 'nums = [4, 1, -1, 2, -1, 2, 3], k = 2', expectedOutput: '[-1, 2]' }],
    interviewExplanationScript: '"We first compute frequencies of all numbers in a HashMap in O(N). Then we use a Min-Heap of size K ordered by frequency. For each unique number, we insert it into the heap; if heap size exceeds K, we poll the element with the lowest frequency. After processing all elements, the heap contains the K most frequent numbers. This runs in O(N log K) time and O(N) space, which outperforms O(N log N)."'
  },

  // --- CONCEPT: BACKTRACKING ---
  {
    id: 'permutations',
    title: 'Permutations',
    leetcodeNumber: 46,
    difficulty: 'Medium',
    patternId: 'backtracking',
    patternName: 'Backtracking Permutation Tree',
    category: 'Backtracking',
    conceptId: 'backtracking',
    conceptName: 'State-Space Permutation Exploration with Visited Vector',
    acceptanceRate: '77.8%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.',
    examples: [
      { input: 'nums = [1, 2, 3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', explanation: 'All 6 permutations.' },
      { input: 'nums = [0, 1]', output: '[[0,1],[1,0]]', explanation: '2 permutations.' }
    ],
    constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All the integers of nums are unique.'],
    patternClues: ['Generate all orderings of elements', 'Total permutations = N!', 'Use boolean[] visited array or in-place swapping during backtracking'],
    bruteForce: { approach: 'Recursive branching checking currentList.contains(nums[i]).', timeComplexity: 'O(N * N!)', spaceComplexity: 'O(N * N!)', bottleneck: 'List.contains takes linear time.' },
    optimizedApproach: { concept: 'Backtracking with boolean[] used tracking.', timeComplexity: 'O(N * N!)', spaceComplexity: 'O(N) recursion depth', keyIdea: 'If current.size() == nums.length, add copy to result. Else for each i, if !used[i]: used[i]=true, current.add(nums[i]), recurse, current.remove(last), used[i]=false.' },
    hints: ['How is this different from subsets? Order matters, so we loop through all numbers rather than starting from an index.', 'Keep a boolean used[] array to track which elements are in current permutation.'],
    pseudocode: `backtrack(curr, used):
    if curr.size == nums.length:
        result.add(new ArrayList(curr))
        return
    for i in 0..nums.length-1:
        if !used[i]:
            used[i] = true; curr.add(nums[i])
            backtrack(curr, used)
            curr.remove(curr.size - 1); used[i] = false`,
    javaSolution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, new ArrayList<>(), used, result);
        return result;
    }

    private void backtrack(int[] nums, List<Integer> current, boolean[] used, List<List<Integer>> result) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                current.add(nums[i]);

                backtrack(nums, current, used, result);

                current.remove(current.size() - 1);
                used[i] = false;
            }
        }
    }
}`,
    starterCode: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'nums = [1, 2, 3]', expectedOutput: '[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]' },
      { input: 'nums = [0, 1]', expectedOutput: '[[0, 1], [1, 0]]' }
    ],
    hiddenTestCases: [{ input: 'nums = [1]', expectedOutput: '[[1]]' }],
    interviewExplanationScript: '"To generate all N! permutations, we explore choices recursively using a backtracking decision tree. At each step, we iterate through all elements of the array. If an element has not yet been used in the current branch (tracked in O(1) via a boolean used[] array), we choose it, explore deeper, and then backtrack by unmarking and removing it. When the path reaches length N, we copy the permutation to the output. Total complexity is O(N * N!) time and O(N) recursion stack space."'
  },
  {
    id: 'combination-sum',
    title: 'Combination Sum',
    leetcodeNumber: 39,
    difficulty: 'Medium',
    patternId: 'backtracking',
    patternName: 'Unbounded Knapsack Backtracking',
    category: 'Backtracking',
    conceptId: 'backtracking',
    conceptName: 'Unbounded Multi-Choice Backtracking with Forward Index',
    acceptanceRate: '71.2%',
    frequency: 'Top Placement (Amazon, Meta, Google, Microsoft)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.',
    examples: [
      { input: 'candidates = [2, 3, 6, 7], target = 7', output: '[[2, 2, 3], [7]]', explanation: '2 + 2 + 3 = 7 and 7 = 7.' },
      { input: 'candidates = [2, 3, 5], target = 8', output: '[[2, 2, 2, 2], [2, 3, 3], [3, 5]]', explanation: 'Three combinations.' }
    ],
    constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', 'All elements of candidates are distinct.', '1 <= target <= 40'],
    patternClues: ['Unbounded repetition allowed: can pick same candidate again', 'To avoid duplicate combinations like [2,3,2] and [3,2,2], recurse on index i (not i + 1)'],
    bruteForce: { approach: 'Explore all subsets allowing duplicates without index constraint.', timeComplexity: 'Exponential with duplicates', spaceComplexity: 'O(T)', bottleneck: 'Generates duplicate permutations requiring set filtering.' },
    optimizedApproach: { concept: 'Backtracking passing forward index start and remaining target.', timeComplexity: 'O(N^(T/M)) where T=target, M=min candidate', spaceComplexity: 'O(T/M)', keyIdea: 'If remain == 0, record combination. If remain < 0, return. For i from start to n-1: pick candidates[i], recurse with same index i (allowing reuse) and remain - candidates[i], backtrack.' },
    hints: ['Sort candidates array first to break early when candidates[i] > remain.', 'Pass i as the new start index so candidates can be reused without going backwards.'],
    pseudocode: `backtrack(start, remain, current):
    if remain == 0: result.add(copy(current)); return
    if remain < 0: return
    for i from start to n-1:
        current.add(candidates[i])
        backtrack(i, remain - candidates[i], current)
        current.remove(last)`,
    javaSolution: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates); // Sort to allow early loop termination
        backtrack(candidates, 0, target, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] candidates, int start, int remain, List<Integer> current, List<List<Integer>> result) {
        if (remain == 0) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = start; i < candidates.length; i++) {
            // Prune branch early if candidate exceeds remaining target
            if (candidates[i] > remain) {
                break;
            }

            current.add(candidates[i]);
            // Recurse with 'i' (not i + 1) because same number can be reused
            backtrack(candidates, i, remain - candidates[i], current, result);
            current.remove(current.size() - 1);
        }
    }
}`,
    starterCode: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'candidates = [2, 3, 6, 7], target = 7', expectedOutput: '[[2, 2, 3], [7]]' },
      { input: 'candidates = [2, 3, 5], target = 8', expectedOutput: '[[2, 2, 2, 2], [2, 3, 3], [3, 5]]' }
    ],
    hiddenTestCases: [{ input: 'candidates = [2], target = 1', expectedOutput: '[]' }],
    interviewExplanationScript: '"Because numbers may be chosen repeatedly, but combinations must be order-independent, we pass our loop index i to the next recursive call rather than i + 1. Sorting candidates beforehand allows us to prune unnecessary recursive calls the moment candidates[i] > remain. This systematically explores all valid combinations without generating permutations."'
  }
];
