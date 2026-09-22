import { Problem } from '../types';

export const TOP_INTERVIEW_PROBLEMS_PART2: Problem[] = [
  {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    leetcodeNumber: 11,
    difficulty: 'Medium',
    patternId: 'two-pointers',
    patternName: 'Greedy Two Pointers',
    category: 'Two Pointers',
    conceptName: 'Greedy Outermost Two-Pointer Inward Contraction',
    acceptanceRate: '54.6%',
    frequency: 'Top Placement (Amazon, Google, Meta)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Bloomberg'],
    description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    examples: [
      {
        input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
        output: '49',
        explanation: 'The lines are at index 1 (height 8) and index 8 (height 7). Width = 8 - 1 = 7. Area = min(8, 7) * 7 = 49.'
      },
      {
        input: 'height = [1, 1]',
        output: '1',
        explanation: 'Width = 1, min height = 1, area = 1.'
      }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    patternClues: [
      'Area = width * min(height[left], height[right])',
      'Width decreases with each step inwards',
      'Moving the taller pointer cannot possibly increase area, so always advance the shorter pointer'
    ],
    bruteForce: {
      approach: 'Test every pair of lines (i, j) with nested loops.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Quadratic checks on 10^5 elements will exceed time limit.'
    },
    optimizedApproach: {
      concept: 'Two pointers at ends, greedily contracting inward.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      keyIdea: 'Place left at 0 and right at n - 1. Calculate area = (right - left) * min(height[left], height[right]). To have any chance of finding a larger area as width shrinks, we must discard the shorter boundary: if height[left] < height[right], left++, else right--.'
    },
    hints: [
      'Start with the widest container (left = 0, right = n - 1).',
      'If you move the taller line inward, the width decreases and height cannot exceed the shorter line, so area strictly decreases or stays same.',
      'Therefore, only moving the shorter pointer can potentially discover a taller line and larger area.'
    ],
    pseudocode: `left = 0, right = n - 1, maxArea = 0
while left < right:
    area = (right - left) * min(height[left], height[right])
    maxArea = max(maxArea, area)
    if height[left] < height[right]:
        left++
    else:
        right--
return maxArea`,
    javaSolution: `public class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int maxWater = 0;

        while (left < right) {
            int width = right - left;
            int minH = Math.min(height[left], height[right]);
            int currentArea = width * minH;

            maxWater = Math.max(maxWater, currentArea);

            // Move the pointer pointing to the shorter line
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxWater;
    }
}`,
    starterCode: `class Solution {
    public int maxArea(int[] height) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', expectedOutput: '49' },
      { input: 'height = [1, 1]', expectedOutput: '1' }
    ],
    hiddenTestCases: [
      { input: 'height = [4, 3, 2, 1, 4]', expectedOutput: '16' },
      { input: 'height = [1, 2, 1]', expectedOutput: '2' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'left=0(1), right=8(7)', action: 'width=8, minH=1 -> area=8; left < right -> left=1', outcome: 'maxWater=8' },
      { step: 2, vars: 'left=1(8), right=8(7)', action: 'width=7, minH=7 -> area=49; left >= right -> right=7', outcome: 'maxWater=49' },
      { step: 3, vars: 'left=1(8), right=7(3)', action: 'width=6, minH=3 -> area=18; move right=6', outcome: 'maxWater=49' }
    ],
    edgeCases: [
      'Two elements only [1, 1]',
      'All equal heights [5, 5, 5, 5]',
      'Staircase heights [1, 2, 3, 4, 5]'
    ],
    commonMistakes: [
      'Moving both pointers at once',
      'Moving the taller pointer instead of the shorter one'
    ],
    interviewExplanationScript: '"We begin with the maximum possible width using two pointers at the array extremities. The area is bounded by the shorter line. As we contract inward and reduce the width, moving the taller line can never yield a larger area because the height is still bottlenecked by the shorter line. Thus, the only rational greedy choice is to advance the shorter line inward in search of a taller boundary. This runs in O(N) time and O(1) space."'
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    leetcodeNumber: 49,
    difficulty: 'Medium',
    patternId: 'hash-map',
    patternName: 'Hash Table & Categorization',
    category: 'Arrays & Hashing',
    conceptName: 'Canonical Frequency Array Key Hashing',
    acceptanceRate: '68.2%',
    frequency: 'Top Placement (Amazon, Meta, Google)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg', 'Apple'],
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples: [
      {
        input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
        output: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]',
        explanation: 'Words with identical character counts are grouped together.'
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: 'Single empty string.'
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]',
        explanation: 'Single character.'
      }
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    patternClues: [
      'Anagrams have identical sorted character sequences or identical character frequency counts',
      'Map canonical key -> List of anagram words',
      'Frequency counting avoids O(K log K) string sort per word'
    ],
    bruteForce: {
      approach: 'Compare each word against all other words by sorting both.',
      timeComplexity: 'O(N² * K log K)',
      spaceComplexity: 'O(N * K)',
      bottleneck: 'Pairwise quadratic comparisons.'
    },
    optimizedApproach: {
      concept: 'HashMap mapping 26-character frequency signature to list of words.',
      timeComplexity: 'O(N * K)',
      spaceComplexity: 'O(N * K)',
      keyIdea: 'For each string of length K, build an int[26] count. Convert the count array to a unique delimiter-separated String key (e.g. "#1#0#0...#1"). Insert the string into map.computeIfAbsent(key, k -> new ArrayList<>()).add(str).'
    },
    hints: [
      'Two strings are anagrams if and only if their character counts are identical.',
      'How can you turn a character count array of 26 letters into a unique hashable string key?',
      'Group strings by this unique key in a HashMap.'
    ],
    pseudocode: `map = new HashMap()
for s in strs:
    count = new int[26]
    for c in s: count[c - 'a']++
    key = buildStringKey(count)
    map.putIfAbsent(key, []).add(s)
return map.values()`,
    javaSolution: `import java.util.*;

public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        if (strs == null || strs.length == 0) return new ArrayList<>();

        Map<String, List<String>> map = new HashMap<>();

        for (String s : strs) {
            // Count frequencies of each character (26 lowercase English letters)
            int[] count = new int[26];
            for (char c : s.toCharArray()) {
                count[c - 'a']++;
            }

            // Build unique canonical hash key
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 26; i++) {
                sb.append('#').append(count[i]);
            }
            String key = sb.toString();

            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }
            map.get(key).add(s);
        }

        return new ArrayList<>(map.values());
    }
}`,
    starterCode: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]', expectedOutput: '[["bat"], ["tan", "nat"], ["eat", "tea", "ate"]]' },
      { input: 'strs = [""]', expectedOutput: '[[""]]' }
    ],
    hiddenTestCases: [
      { input: 'strs = ["a"]', expectedOutput: '[["a"]]' },
      { input: 'strs = ["bdddddddddd", "bbbbbbbbbbc"]', expectedOutput: '[["bdddddddddd"], ["bbbbbbbbbbc"]]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 's="eat"', action: 'freq: a:1, e:1, t:1 -> key="#1...#1...#1"', outcome: 'map[key]=["eat"]' },
      { step: 2, vars: 's="tea"', action: 'freq: identical key', outcome: 'map[key]=["eat", "tea"]' },
      { step: 3, vars: 's="tan"', action: 'freq: a:1, n:1, t:1 -> new key', outcome: 'map[newKey]=["tan"]' }
    ],
    edgeCases: [
      'Empty string in array [""]',
      'All words are anagrams of each other',
      'No anagrams exist (each word forms its own single-element group)'
    ],
    commonMistakes: [
      'Concatenating character counts without a delimiter (e.g. count for "a": 1, "b": 11 vs "a": 11, "b": 1 would both produce "111")',
      'Using quadratic word comparisons'
    ],
    interviewExplanationScript: '"Two words are anagrams if and only if their character frequency distributions over the 26 alphabet letters match. Instead of sorting each string in O(K log K), we construct an integer frequency count array of size 26 in O(K) time and convert it to a delimited key. We group words using a HashMap keyed on this canonical string. Total complexity is O(N * K) time and O(N * K) space."'
  },
  {
    id: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    leetcodeNumber: 98,
    difficulty: 'Medium',
    patternId: 'tree-dfs',
    patternName: 'Tree DFS / Bounded Invariant',
    category: 'Trees & BST',
    conceptName: 'DFS Range Invariant Propagation [min, max]',
    acceptanceRate: '33.1%',
    frequency: 'Top Placement (Amazon, Meta, Microsoft)',
    companies: ['Amazon', 'Meta', 'Microsoft', 'Bloomberg', 'Google'],
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys strictly less than the node\'s key. The right subtree contains only nodes with keys strictly greater than the node\'s key. Both the left and right subtrees must also be binary search trees.',
    examples: [
      {
        input: 'root = [2, 1, 3]',
        output: 'true',
        explanation: 'Left child 1 < 2 < right child 3. Valid BST.'
      },
      {
        input: 'root = [5, 1, 4, null, null, 3, 6]',
        output: 'false',
        explanation: 'The root node\'s value is 5 but its right child\'s value is 4.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1'
    ],
    patternClues: [
      'It is NOT enough for a node to just be greater than its immediate left child; it must be greater than ALL nodes in its left subtree',
      'Must pass down valid range boundaries (low, high) at each recursive step',
      'Using Long.MIN_VALUE / Long.MAX_VALUE avoids 32-bit integer overflow'
    ],
    bruteForce: {
      approach: 'For each node, find max in left subtree and min in right subtree.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(N)',
      bottleneck: 'Repeatedly scanning subtrees from scratch.'
    },
    optimizedApproach: {
      concept: 'DFS propagating allowable range (minVal, maxVal).',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H) where H is tree height',
      keyIdea: 'A node is valid if minVal < node.val < maxVal. When moving left, the new upper bound is node.val: isValid(node.left, minVal, node.val). When moving right, the new lower bound is node.val: isValid(node.right, node.val, maxVal).'
    },
    hints: [
      'Is checking node.left.val < node.val and node.right.val > node.val sufficient? No!',
      'Each node must satisfy a range (low, high) dictated by its ancestors.',
      'What boundary values should you use to handle Integer.MIN_VALUE and Integer.MAX_VALUE safely?'
    ],
    pseudocode: `isValid(node, low, high):
    if node == null: return true
    if node.val <= low or node.val >= high: return false
    return isValid(node.left, low, node.val) and isValid(node.right, node.val, high)`,
    javaSolution: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int val) { this.val = val; }
 * }
 */
public class Solution {
    public boolean isValidBST(TreeNode root) {
        // Use Long to handle Integer.MIN_VALUE and Integer.MAX_VALUE node values
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;

        if (node.val <= min || node.val >= max) {
            return false;
        }

        // Left child must be in (min, node.val)
        // Right child must be in (node.val, max)
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }
}`,
    starterCode: `class Solution {
    public boolean isValidBST(TreeNode root) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 'root = [2, 1, 3]', expectedOutput: 'true' },
      { input: 'root = [5, 1, 4, null, null, 3, 6]', expectedOutput: 'false' }
    ],
    hiddenTestCases: [
      { input: 'root = [2147483647]', expectedOutput: 'true' },
      { input: 'root = [1, 1]', expectedOutput: 'false' },
      { input: 'root = [5, 4, 6, null, null, 3, 7]', expectedOutput: 'false' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'node=2, range=(-inf, +inf)', action: '2 in range -> check left and right', outcome: 'proceed' },
      { step: 2, vars: 'node=1, range=(-inf, 2)', action: '1 in range -> valid', outcome: 'left subtree valid' },
      { step: 3, vars: 'node=3, range=(2, +inf)', action: '3 in range -> valid', outcome: 'right subtree valid -> return true' }
    ],
    edgeCases: [
      'Single node tree with Integer.MAX_VALUE (needs Long bounds)',
      'Duplicate values (e.g. [1, 1], strictly less/greater required, so false)',
      'Subtree node violating grandparent constraint'
    ],
    commonMistakes: [
      'Only checking immediate children (e.g. node.left.val < node.val), missing violations deeper in subtree',
      'Using <= or >= when strict inequality is required'
    ],
    interviewExplanationScript: '"A common pitfall is only verifying a node against its direct parent. In reality, a node must strictly satisfy all ancestral boundaries. We carry down a valid range [minVal, maxVal] during pre-order DFS. When branching left, the current node becomes the upper bound; when branching right, it becomes the lower bound. Using 64-bit Long boundaries prevents integer overflow issues with Integer.MIN_VALUE. Time complexity is O(N) visiting each node once, and O(H) auxiliary call stack space."'
  },
  {
    id: 'find-median-from-data-stream',
    title: 'Find Median from Data Stream',
    leetcodeNumber: 295,
    difficulty: 'Hard',
    patternId: 'two-heaps',
    patternName: 'Two Heaps',
    category: 'Heap & PriorityQueue',
    conceptName: 'Dual-Heap Median Dynamic Balancing (Max-Heap + Min-Heap)',
    acceptanceRate: '52.3%',
    frequency: 'Top Placement (Google, Amazon, Microsoft)',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Meta', 'Goldman Sachs'],
    description: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the MedianFinder class: MedianFinder() initializes the MedianFinder object. void addNum(int num) adds the integer num from the data stream to the data structure. double findMedian() returns the median of all elements so far.',
    examples: [
      {
        input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]',
        output: '[null, null, null, 1.5, null, 2.0]',
        explanation: 'addNum(1), addNum(2), median of [1,2] is (1+2)/2 = 1.5. addNum(3), median of [1,2,3] is 2.0.'
      }
    ],
    constraints: [
      '-10^5 <= num <= 10^5',
      'There will be at least one element in the data structure before calling findMedian.',
      'At most 5 * 10^4 calls will be made to addNum and findMedian.'
    ],
    patternClues: [
      'Continuously arriving stream of numbers requiring quick median lookup',
      'Median divides the numbers into a smaller half and a larger half',
      'Max-Heap for the smaller half and Min-Heap for the larger half'
    ],
    bruteForce: {
      approach: 'Maintain a sorted list using insertion sort or binary search insertion.',
      timeComplexity: 'O(N) per addNum, O(1) findMedian',
      spaceComplexity: 'O(N)',
      bottleneck: 'Array shifting takes O(N) for every new number.'
    },
    optimizedApproach: {
      concept: 'Two Heaps: maxHeap (lower half) and minHeap (upper half).',
      timeComplexity: 'O(log N) addNum, O(1) findMedian',
      spaceComplexity: 'O(N)',
      keyIdea: 'Keep maxHeap.size() equal to or 1 greater than minHeap.size(). When adding num, push to maxHeap first, then pop maxHeap\'s root into minHeap. If minHeap size exceeds maxHeap, rebalance by popping minHeap root back to maxHeap. If total count is odd, median is maxHeap.peek(); if even, average of both roots.'
    },
    hints: [
      'Divide the numbers into two halves: the smaller half and the larger half.',
      'What heap type gives you the largest of the smaller half? Max-Heap.',
      'What heap type gives you the smallest of the larger half? Min-Heap.'
    ],
    pseudocode: `addNum(num):
    maxHeap.offer(num)
    minHeap.offer(maxHeap.poll())
    if maxHeap.size() < minHeap.size():
        maxHeap.offer(minHeap.poll())

findMedian():
    if maxHeap.size() > minHeap.size():
        return maxHeap.peek()
    return (maxHeap.peek() + minHeap.peek()) / 2.0`,
    javaSolution: `import java.util.Collections;
import java.util.PriorityQueue;

public class MedianFinder {
    // maxHeap stores the smaller half of numbers (root is largest of smaller half)
    private final PriorityQueue<Integer> maxHeap;
    // minHeap stores the larger half of numbers (root is smallest of larger half)
    private final PriorityQueue<Integer> minHeap;

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        maxHeap.offer(num);
        // Ensure every element in maxHeap is <= every element in minHeap
        minHeap.offer(maxHeap.poll());

        // Balance sizes: maxHeap can have at most 1 more element than minHeap
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,
    starterCode: `class MedianFinder {
    public MedianFinder() {
        
    }
    
    public void addNum(int num) {
        
    }
    
    public double findMedian() {
        return 0.0;
    }
}`,
    testCases: [
      { input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()', expectedOutput: '1.5, 2.0' }
    ],
    hiddenTestCases: [
      { input: 'addNum(-1), findMedian(), addNum(-2), findMedian()', expectedOutput: '-1.0, -1.5' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'add 1', action: 'maxHeap=[1], minHeap=[]', outcome: 'median=1.0' },
      { step: 2, vars: 'add 2', action: 'maxHeap=[1], minHeap=[2]', outcome: 'median=(1+2)/2=1.5' },
      { step: 3, vars: 'add 3', action: 'maxHeap=[2, 1], minHeap=[3]', outcome: 'median=2.0' }
    ],
    edgeCases: [
      'Odd vs even total element counts',
      'Duplicate values stream',
      'Negative numbers'
    ],
    commonMistakes: [
      'Integer division when calculating median (must divide by 2.0, not 2)',
      'Not maintaining the invariant that maxHeap elements are <= minHeap elements'
    ],
    interviewExplanationScript: '"To retrieve the median in O(1) time without re-sorting the stream, we split the incoming numbers into two halves: the lower half in a Max-Heap and the upper half in a Min-Heap. The roots of these two heaps are the exact elements surrounding the median. By maintaining size balance with at most one extra element in the Max-Heap, insertions take O(log N) and findMedian runs in strictly O(1) time."'
  },
  {
    id: 'subsets',
    title: 'Subsets',
    leetcodeNumber: 78,
    difficulty: 'Medium',
    patternId: 'backtracking',
    patternName: 'Backtracking / Power Set',
    category: 'Backtracking',
    conceptName: 'Backtracking State-Space Tree Exploration',
    acceptanceRate: '78.5%',
    frequency: 'Top Placement (Amazon, Meta, Google)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
    examples: [
      {
        input: 'nums = [1, 2, 3]',
        output: '[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]',
        explanation: 'There are 2^3 = 8 subsets.'
      },
      {
        input: 'nums = [0]',
        output: '[[], [0]]',
        explanation: '2^1 = 2 subsets.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10',
      '-10 <= nums[i] <= 10',
      'All the numbers of nums are unique.'
    ],
    patternClues: [
      'Generate all combinations or power set: Backtracking',
      'For each element, we have a binary choice: include it or exclude it',
      'Total subsets for N elements is exactly 2^N'
    ],
    bruteForce: {
      approach: 'Generate subsets iteratively or bit manipulation.',
      timeComplexity: 'O(N * 2^N)',
      spaceComplexity: 'O(N * 2^N)',
      bottleneck: 'Exponential nature is inevitable, but recursion is most expressive.'
    },
    optimizedApproach: {
      concept: 'Standard Backtracking appending snapshots at each recursive state.',
      timeComplexity: 'O(N * 2^N)',
      spaceComplexity: 'O(N) recursion stack',
      keyIdea: 'At each invocation backtrack(start, currentList), add a copy of currentList to result. Then loop i from start to n-1: add nums[i] to currentList, recurse backtrack(i + 1, currentList), and remove the last element (backtrack step).'
    },
    hints: [
      'Each node in the decision tree represents a valid subset that should be saved.',
      'Use a start index to ensure elements are only added in forward order, preventing duplicate subsets like [1, 2] and [2, 1].',
      'Always make a deep copy new ArrayList<>(current) when saving to result.'
    ],
    pseudocode: `backtrack(start, current):
    result.add(new ArrayList(current))
    for i from start to nums.length - 1:
        current.add(nums[i])
        backtrack(i + 1, current)
        current.remove(current.size() - 1)`,
    javaSolution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int start, int[] nums, List<Integer> current, List<List<Integer>> result) {
        // Every state in the exploration tree corresponds to a valid subset
        result.add(new ArrayList<>(current));

        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);                     // Choose
            backtrack(i + 1, nums, current, result);  // Explore
            current.remove(current.size() - 1);       // Unchoose (backtrack)
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
    hiddenTestCases: [
      { input: 'nums = [1, 2]', expectedOutput: '[[], [1], [1, 2], [2]]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'start=0, curr=[]', action: 'add [] to result', outcome: 'result has []' },
      { step: 2, vars: 'i=0, curr=[1]', action: 'add [1], recurse start=1', outcome: 'result has [], [1]' },
      { step: 3, vars: 'i=1, curr=[1,2]', action: 'add [1,2], recurse start=2', outcome: 'result has [], [1], [1,2]' },
      { step: 4, vars: 'backtrack', action: 'remove 2, next i=2 -> [1,3]', outcome: 'result has [1,3]' }
    ],
    edgeCases: [
      'Array of length 1 (returns [[], [num]])',
      'All negative values'
    ],
    commonMistakes: [
      'Adding current directly without creating a new copy (e.g. result.add(current) leaves a bunch of empty lists)',
      'Starting inner loop from 0 instead of start (generates permutations instead of subsets)'
    ],
    interviewExplanationScript: '"To generate all 2^N subsets without duplicates, we use backtracking. At each recursive call, we record the current state as a valid subset. We then iterate from our start index forward, making a choice to include nums[i], exploring all subsets containing it, and finally backtracking by removing nums[i]. This explores all 2^N states with O(N * 2^N) total time and O(N) recursion stack depth."'
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    leetcodeNumber: 70,
    difficulty: 'Easy',
    patternId: 'dynamic-programming',
    patternName: '1D Dynamic Programming',
    category: 'Dynamic Programming',
    conceptName: 'Fibonacci State Compression DP',
    acceptanceRate: '53.1%',
    frequency: 'High (Standard Placement Screener)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Meta'],
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps.'
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways: 1. 1+1+1, 2. 1+2, 3. 2+1.'
      }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    patternClues: [
      'To reach step i, you could have only come from step i - 1 (with 1 step) or step i - 2 (with 2 steps)',
      'Ways(i) = Ways(i - 1) + Ways(i - 2)',
      'Classic Fibonacci progression with constant O(1) space optimization'
    ],
    bruteForce: {
      approach: 'Naive recursion f(n) = f(n-1) + f(n-2).',
      timeComplexity: 'O(2^N)',
      spaceComplexity: 'O(N)',
      bottleneck: 'Exponential repeated work for small n.'
    },
    optimizedApproach: {
      concept: 'Constant space state compression using two variables.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      keyIdea: 'Maintain prev2 = 1 (ways for step 1) and prev1 = 2 (ways for step 2). Loop i from 3 to n: current = prev1 + prev2, prev2 = prev1, prev1 = current. Return prev1.'
    },
    hints: [
      'How many ways can you reach step 1? (1 way: [1]).',
      'How many ways to reach step 2? (2 ways: [1,1] or [2]).',
      'For any step i >= 3, the total ways is the sum of ways to reach (i-1) plus ways to reach (i-2).'
    ],
    pseudocode: `if n <= 2: return n
prev2 = 1, prev1 = 2
for i from 3 to n:
    curr = prev1 + prev2
    prev2 = prev1
    prev1 = curr
return prev1`,
    javaSolution: `public class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;

        int prev2 = 1; // ways(1)
        int prev1 = 2; // ways(2)

        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}`,
    starterCode: `class Solution {
    public int climbStairs(int n) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'n = 2', expectedOutput: '2' },
      { input: 'n = 3', expectedOutput: '3' }
    ],
    hiddenTestCases: [
      { input: 'n = 1', expectedOutput: '1' },
      { input: 'n = 4', expectedOutput: '5' },
      { input: 'n = 5', expectedOutput: '8' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'n=4', action: 'prev2=1, prev1=2', outcome: 'init' },
      { step: 2, vars: 'i=3', action: 'curr = 2 + 1 = 3; prev2=2, prev1=3', outcome: 'ways(3)=3' },
      { step: 3, vars: 'i=4', action: 'curr = 3 + 2 = 5; prev2=3, prev1=5', outcome: 'ways(4)=5' }
    ],
    edgeCases: [
      'n = 1 (returns 1)',
      'n = 2 (returns 2)'
    ],
    commonMistakes: [
      'Using unmemoized recursion leading to exponential time limit exceeded',
      'Allocating an O(N) array when only the last two values are needed'
    ],
    interviewExplanationScript: '"To reach step n, the final move must have been either a 1-step from (n-1) or a 2-step from (n-2). Hence, ways(n) = ways(n-1) + ways(n-2), which is the Fibonacci sequence. Rather than using an array or recursion, we track only the preceding two states in variables. This yields an optimal O(N) time and O(1) space solution."'
  }
];
