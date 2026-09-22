import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART9: Problem[] = [
  // --- CONCEPT: 2D MATRIX & HASHING ---
  {
    id: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    leetcodeNumber: 73,
    difficulty: 'Medium',
    patternId: 'hash-map',
    patternName: 'In-Place First Row/Column Marker',
    category: 'Arrays & Hashing',
    conceptId: 'arrays-hashing',
    conceptName: 'In-Place Matrix Boundary Flagging Invariant (O(1) Space)',
    acceptanceRate: '56.1%',
    frequency: 'Top Placement (Amazon, Microsoft, Meta, Apple)',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Apple'],
    description: 'Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0\'s. You must do it in place with O(1) extra memory.',
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', explanation: 'Row 1 and col 1 zeroed out.' },
      { input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]', output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]', explanation: 'Multiple zeros.' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200', '-2^31 <= matrix[i][j] <= 2^31 - 1'],
    patternClues: ['Set zeroes without extra O(M+N) arrays', 'Use row 0 and col 0 as marker flags, with boolean for col0/row0 status'],
    bruteForce: { approach: 'Clone entire matrix or allocate boolean arrays of size M and N.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(M + N)', bottleneck: 'Violates O(1) space constraint.' },
    optimizedApproach: { concept: 'Use first row and first column as in-place storage flags.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(1)', keyIdea: 'Track if col0 has zero. Mark matrix[r][0] = 0 and matrix[0][c] = 0. Iterate backwards from (m-1, n-1) to update cells based on markers.' },
    hints: ['Can you use the first row and column of the matrix itself to store zeroes flags?', 'Be careful with cell (0, 0) as it represents both row 0 and col 0.'],
    pseudocode: `col0 = false
for r in 0..m-1:
    if matrix[r][0] == 0: col0 = true
    for c in 1..n-1:
        if matrix[r][c] == 0: matrix[r][0] = 0; matrix[0][c] = 0
for r from m-1 downTo 0:
    for c from n-1 downTo 1:
        if matrix[r][0] == 0 or matrix[0][c] == 0: matrix[r][c] = 0
    if col0: matrix[r][0] = 0`,
    javaSolution: `public class Solution {
    public void setZeroes(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        boolean col0 = false;

        for (int r = 0; r < rows; r++) {
            if (matrix[r][0] == 0) col0 = true;
            for (int c = 1; c < cols; c++) {
                if (matrix[r][c] == 0) {
                    matrix[r][0] = 0;
                    matrix[0][c] = 0;
                }
            }
        }

        // Iterate in reverse to avoid overwriting marker row/column premature
        for (int r = rows - 1; r >= 0; r--) {
            for (int c = cols - 1; c >= 1; c--) {
                if (matrix[r][0] == 0 || matrix[0][c] == 0) {
                    matrix[r][c] = 0;
                }
            }
            if (col0) {
                matrix[r][0] = 0;
            }
        }
    }
}`,
    starterCode: `class Solution {
    public void setZeroes(int[][] matrix) {
        // Write your solution here
    }
}`,
    testCases: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', expectedOutput: '[[1,0,1],[0,0,0],[1,0,1]]' }
    ],
    hiddenTestCases: [{ input: 'matrix = [[0]]', expectedOutput: '[[0]]' }],
    interviewExplanationScript: '"To achieve O(1) auxiliary space, we repurpose the first row and first column of the matrix itself as the bitmask markers. A boolean variable col0 records whether column 0 initially contains any zeros. If matrix[r][c] is 0, we flag matrix[r][0] = 0 and matrix[0][c] = 0. We then iterate from the bottom-right upwards, zeroing any cell whose row or column header is 0. Time complexity is O(M * N) and space is strictly O(1)."'
  },
  {
    id: 'spiral-matrix',
    title: 'Spiral Matrix',
    leetcodeNumber: 54,
    difficulty: 'Medium',
    patternId: 'two-pointers',
    patternName: 'Four-Boundary Shrinking Loop',
    category: 'Arrays & Hashing',
    conceptId: 'arrays-hashing',
    conceptName: 'Four-Boundary Contracting Perimeter Traversal',
    acceptanceRate: '50.2%',
    frequency: 'Top Placement (Amazon, Microsoft, Apple, Google)',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google'],
    description: 'Given an m x n matrix, return all elements of the matrix in spiral order (clockwise starting from top-left).',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]', explanation: 'Clockwise spiral traversal.' },
      { input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', output: '[1,2,3,4,8,12,11,10,9,5,6,7]', explanation: 'Spiral.' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10', '-100 <= matrix[i][j] <= 100'],
    patternClues: ['Traverse matrix clockwise in layers', 'Maintain 4 boundary pointers: top, bottom, left, right. Inward contract after each row/col traverse.'],
    bruteForce: { approach: 'Maintain visited 2D boolean array with direction vector.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(M * N)', bottleneck: 'Allocates visited matrix.' },
    optimizedApproach: { concept: 'Four boundary pointers contracting inward.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(1) extra space', keyIdea: 'top=0, bottom=m-1, left=0, right=n-1. Traverse left->right (top++), top->bottom (right--), right->left (bottom--), bottom->top (left++).' },
    hints: ['Keep track of 4 variables: top, bottom, left, right.', 'After traversing top row, increment top. If top > bottom, break.'],
    pseudocode: `top = 0, bottom = m - 1, left = 0, right = n - 1
while top <= bottom and left <= right:
    for c from left..right: res.add(matrix[top][c]); top++
    for r from top..bottom: res.add(matrix[r][right]); right--
    if top <= bottom:
        for c from right downTo left: res.add(matrix[bottom][c]); bottom--
    if left <= right:
        for r from bottom downTo top: res.add(matrix[r][left]); left++
return res`,
    javaSolution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix == null || matrix.length == 0) return result;

        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            // Traverse from left to right on current top row
            for (int c = left; c <= right; c++) {
                result.add(matrix[top][c]);
            }
            top++;

            // Traverse from top to bottom on current right column
            for (int r = top; r <= bottom; r++) {
                result.add(matrix[r][right]);
            }
            right--;

            // Traverse from right to left on current bottom row
            if (top <= bottom) {
                for (int c = right; c >= left; c--) {
                    result.add(matrix[bottom][c]);
                }
                bottom--;
            }

            // Traverse from bottom to top on current left column
            if (left <= right) {
                for (int r = bottom; r >= top; r--) {
                    result.add(matrix[r][left]);
                }
                left++;
            }
        }

        return result;
    }
}`,
    starterCode: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[1, 2, 3, 6, 9, 8, 7, 4, 5]' },
      { input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', expectedOutput: '[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]' }
    ],
    hiddenTestCases: [{ input: 'matrix = [[1]]', expectedOutput: '[1]' }],
    interviewExplanationScript: '"We maintain four boundaries: top, bottom, left, and right. In each iteration of the while loop, we traverse four directed edges: left-to-right along top, top-to-bottom along right, right-to-left along bottom (guarded by top <= bottom), and bottom-to-top along left (guarded by left <= right). Contracting each boundary after its traversal guarantees every element is visited exactly once in O(M * N) time with O(1) auxiliary space."'
  },
  {
    id: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    leetcodeNumber: 560,
    difficulty: 'Medium',
    patternId: 'prefix-sum',
    patternName: 'Prefix Sum Hash Map Counting',
    category: 'Arrays & Hashing',
    conceptId: 'arrays-hashing',
    conceptName: 'Prefix Sum Difference Frequency Map Invariant (Sum - K)',
    acceptanceRate: '44.1%',
    frequency: 'Top Placement (Meta, Google, Amazon, Microsoft)',
    companies: ['Meta', 'Google', 'Amazon', 'Microsoft'],
    description: 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. A subarray is a contiguous non-empty sequence of elements within an array.',
    examples: [
      { input: 'nums = [1, 1, 1], k = 2', output: '2', explanation: '[1, 1] at index 0-1 and index 1-2.' },
      { input: 'nums = [1, 2, 3], k = 3', output: '2', explanation: '[1, 2] and [3].' }
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    patternClues: ['Contains negative numbers, so sliding window does NOT work', 'Subarray sum between i and j is prefix[j] - prefix[i-1] == k', 'prefix[i-1] = prefix[j] - k. Use HashMap to count prefix frequencies.'],
    bruteForce: { approach: 'Nested loop computing sum of all subarrays.', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', bottleneck: 'Quadratic pair iteration.' },
    optimizedApproach: { concept: 'Running prefix sum with frequency map.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'map.put(0, 1). For each num: currentSum += num. If map contains (currentSum - k), count += map.get(currentSum - k). Update map with currentSum.' },
    hints: ['Because elements can be negative, the sum is not monotonic, meaning sliding window fails.', 'If prefixSum[j] - prefixSum[i] = k, then prefixSum[i] = prefixSum[j] - k.'],
    pseudocode: `map = new HashMap(); map.put(0, 1)
sum = 0, count = 0
for num in nums:
    sum += num
    if map.containsKey(sum - k):
        count += map.get(sum - k)
    map.put(sum, map.getOrDefault(sum, 0) + 1)
return count`,
    javaSolution: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        int currentSum = 0;
        Map<Integer, Integer> prefixMap = new HashMap<>();

        // Base case: prefix sum of 0 has occurred once (for subarrays starting at index 0)
        prefixMap.put(0, 1);

        for (int num : nums) {
            currentSum += num;

            // If (currentSum - k) occurred before, those prefixes form valid subarrays ending here
            if (prefixMap.containsKey(currentSum - k)) {
                count += prefixMap.get(currentSum - k);
            }

            prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1);
        }

        return count;
    }
}`,
    starterCode: `class Solution {
    public int subarraySum(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [1, 1, 1], k = 2', expectedOutput: '2' },
      { input: 'nums = [1, 2, 3], k = 3', expectedOutput: '2' }
    ],
    hiddenTestCases: [{ input: 'nums = [-1, -1, 1], k = 0', expectedOutput: '1' }],
    interviewExplanationScript: '"Because nums contains negative values, the cumulative sum is non-monotonic, ruling out standard two-pointer sliding windows. Instead, we notice that any subarray nums[i..j] with sum k satisfies prefixSum[j] - prefixSum[i-1] = k, which rearranges to prefixSum[i-1] = prefixSum[j] - k. We maintain a running prefix sum and a frequency map. At each index, we look up how many times (currentSum - k) was observed previously. This evaluates all valid subarrays in O(N) time and O(N) space."'
  },

  // --- CONCEPT: FAST & SLOW CYCLE II ---
  {
    id: 'linked-list-cycle-ii',
    title: 'Linked List Cycle II (Find Entry Point)',
    leetcodeNumber: 142,
    difficulty: 'Medium',
    patternId: 'fast-slow-pointers',
    patternName: 'Floyd\'s Cycle Entry Point Identification',
    category: 'Linked List',
    conceptId: 'fast-slow-pointers',
    conceptName: 'Floyd\'s Cycle Entry Mathematical Convergence (L1 = L2)',
    acceptanceRate: '51.3%',
    frequency: 'Top Placement (Amazon, Microsoft, Meta)',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google'],
    description: 'Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. Do not modify the linked list. Can you solve it using O(1) memory?',
    examples: [
      { input: 'head = [3, 2, 0, -4], pos = 1', output: 'Node with val 2', explanation: 'Tail connects to node index 1.' },
      { input: 'head = [1, 2], pos = 0', output: 'Node with val 1', explanation: 'Cycle begins at head.' },
      { input: 'head = [1], pos = -1', output: 'null', explanation: 'No cycle.' }
    ],
    constraints: ['The number of the nodes in the list is in the range [0, 10^4].', '-10^5 <= Node.val <= 10^5', 'pos is -1 or a valid index in the linked-list.'],
    patternClues: ['Find exact start node of linked list cycle in O(1) space', 'Floyd\'s cycle detection: After slow and fast meet, reset one pointer to head. Move both 1 step at a time; their collision point is the cycle origin.'],
    bruteForce: { approach: 'Store visited nodes in a HashSet. First repeated node is the entrance.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Violates O(1) space requirement.' },
    optimizedApproach: { concept: 'Floyd\'s cycle phase 1 (detect collision) and phase 2 (find entrance).', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'Phase 1: fast moves 2, slow moves 1 until collision. If fast reaches null, return null. Phase 2: p1 = head, p2 = collision. Move both 1 step; collision is entry.' },
    hints: ['Let distance to cycle start be L1, distance from start to meeting point be L2, cycle length be C.', 'Mathematically, 2(L1 + L2) = L1 + L2 + nC => L1 = nC - L2. Thus, advancing from head and meeting point simultaneously will collide at cycle start.'],
    pseudocode: `slow = head, fast = head
hasCycle = false
while fast != null and fast.next != null:
    slow = slow.next; fast = fast.next.next
    if slow == fast: hasCycle = true; break
if !hasCycle: return null
p1 = head, p2 = slow
while p1 != p2:
    p1 = p1.next; p2 = p2.next
return p1`,
    javaSolution: `public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;

        ListNode slow = head;
        ListNode fast = head;
        boolean hasCycle = false;

        // Phase 1: Determine if a cycle exists
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }

        if (!hasCycle) return null;

        // Phase 2: Find cycle entrance node
        ListNode p1 = head;
        ListNode p2 = slow;

        while (p1 != p2) {
            p1 = p1.next;
            p2 = p2.next;
        }

        return p1;
    }
}`,
    starterCode: `public class Solution {
    public ListNode detectCycle(ListNode head) {
        // Write your solution here
        return null;
    }
}`,
    testCases: [
      { input: 'head = [3, 2, 0, -4], pos = 1', expectedOutput: 'Node with val 2' },
      { input: 'head = [1], pos = -1', expectedOutput: 'null' }
    ],
    hiddenTestCases: [{ input: 'head = [1, 2], pos = 0', expectedOutput: 'Node with val 1' }],
    interviewExplanationScript: '"In Phase 1, we deploy Floyd\'s Tortoise and Hare algorithm. If slow and fast collide, a cycle exists. Let L1 be the distance from head to cycle entrance, and L2 be distance from entrance to collision point. Fast travels twice as far as slow, yielding 2(L1 + L2) = L1 + L2 + nC, which simplifies to L1 = nC - L2. Therefore, in Phase 2, resetting one pointer to head and advancing both pointers at 1 step per turn causes them to meet exactly at the cycle entrance node. Time is O(N) and space is O(1)."'
  },

  // --- CONCEPT: BINARY SEARCH ON DISCONTINUITIES ---
  {
    id: 'single-element-in-a-sorted-array',
    title: 'Single Element in a Sorted Array',
    leetcodeNumber: 540,
    difficulty: 'Medium',
    patternId: 'binary-search',
    patternName: 'Parity-Indexed Binary Search',
    category: 'Binary Search',
    conceptId: 'binary-search',
    conceptName: 'Index Parity Bisection (Even-Odd Pair Invariant)',
    acceptanceRate: '59.2%',
    frequency: 'Top Placement (Amazon, Google, Microsoft)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Return the single element that appears only once. Your solution must run in O(log N) time and O(1) space.',
    examples: [
      { input: 'nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]', output: '2', explanation: '2 is the only unique element.' },
      { input: 'nums = [3, 3, 7, 7, 10, 11, 11]', output: '10', explanation: '10 is the unique element.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '0 <= nums[i] <= 10^5'],
    patternClues: ['Every number appears twice except one, array sorted, O(log N) required', 'Before the single element, pairs start at even index (even, odd)', 'After the single element, pairs start at odd index (odd, even)'],
    bruteForce: { approach: 'XOR all elements in O(N).', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', bottleneck: 'Fails O(log N) requirement.' },
    optimizedApproach: { concept: 'Binary search comparing mid with its pair index.', timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', keyIdea: 'Ensure mid is even (if mid % 2 == 1 mid--). If nums[mid] == nums[mid + 1], single element is to the right (low = mid + 2). Else single element is at mid or to the left (high = mid).' },
    hints: ['Check the index of the first occurrence of pairs before and after the single element.', 'Before the single element: 1st copy is at even index, 2nd copy is at odd index.'],
    pseudocode: `low = 0, high = n - 1
while low < high:
    mid = low + (high - low) / 2
    if mid % 2 == 1: mid--
    if nums[mid] == nums[mid + 1]:
        low = mid + 2
    else:
        high = mid
return nums[low]`,
    javaSolution: `public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int low = 0;
        int high = nums.length - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            // Force mid to be an even index
            if (mid % 2 == 1) {
                mid--;
            }

            // In normal pairs, the even index matches the subsequent odd index
            if (nums[mid] == nums[mid + 1]) {
                // The anomaly has not occurred yet, search right half
                low = mid + 2;
            } else {
                // The anomaly is at mid or to the left
                high = mid;
            }
        }

        return nums[low];
    }
}`,
    starterCode: `class Solution {
    public int singleNonDuplicate(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]', expectedOutput: '2' },
      { input: 'nums = [3, 3, 7, 7, 10, 11, 11]', expectedOutput: '10' }
    ],
    hiddenTestCases: [{ input: 'nums = [1]', expectedOutput: '1' }],
    interviewExplanationScript: '"Before the unique element, all pairs follow an (even, odd) index alignment: the first instance is at an even index and the second at the following odd index. After the single element is introduced, the alignment shifts to (odd, even). We binary search by aligning mid to an even index. If nums[mid] == nums[mid + 1], the sequence remains aligned and the unique item lies to the right (low = mid + 2). Otherwise, the single item lies at mid or to its left (high = mid). This achieves O(log N) time and O(1) space."'
  }
];
