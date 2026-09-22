import { Pattern } from '../types';

export const CORE_15_PATTERNS: Pattern[] = [
  {
    id: 'two-pointers',
    number: 1,
    name: 'Two Pointers',
    category: 'Arrays & Strings',
    tagline: 'Opposite or equidirectional movement to eliminate suboptimal states in O(N)',
    isCore15: true,
    difficulty: 'Easy',
    whatIsIt: 'A technique that maintains two index references (typically left and right, or slow and fast) that move across one or two arrays according to strict logical invariants.',
    whyItWorks: 'In sorted or monotonic collections, moving a pointer in a specific direction guarantees whether the value will strictly increase, decrease, or maintain a condition. This eliminates an entire dimension of search space without nested loops.',
    whenToUse: [
      'Data is sorted (or can be sorted in O(N log N))',
      'Searching for pairs, triplets, or pairs with target sums/differences',
      'Reversing arrays, detecting palindromes, or partitioning in-place (Dutch National Flag)',
      'Trapping rainwater, container with most water (bounded by extremities)'
    ],
    whenNotToUse: [
      'Unsorted arrays where sorting destroys index requirements (and HashMap lookup in O(N) is needed)',
      'Subarrays with arbitrary positive/negative sums requiring contiguous segment tracking (use Prefix Sum or Sliding Window)',
      'When elements have non-monotonic transitions'
    ],
    problemClues: [
      'Array is sorted or sorted output requested',
      'Find pair (i, j) such that A[i] + A[j] == target',
      'Find triplet with sum zero',
      'Check if string is a palindrome ignoring alphanumeric chars'
    ],
    javaDataStructures: ['int[]', 'ArrayList<Integer>', 'char[]', 'String'],
    timeComplexity: 'O(N)',
    timeComplexityReason: 'Both pointers traverse the array at most once (left moves rightward, right moves leftward, meeting in at most N steps).',
    spaceComplexity: 'O(1)',
    spaceComplexityReason: 'Operates directly in-place with only two integer pointer variables.',
    commonMistakes: [
      'Incrementing/decrementing the wrong pointer on equality checks',
      'Using <= instead of < causing infinite loop or out-of-bounds index',
      'Forgetting to sort the array when elements are not pre-sorted',
      'Not skipping duplicates when finding unique pairs/triplets'
    ],
    edgeCases: [
      'Empty array or single element (return empty/false immediately)',
      'All elements equal',
      'Target smaller than minimum possible pair or larger than maximum',
      'Negative numbers causing arithmetic overflow (use long if needed)'
    ],
    interviewMemoryCard: {
      clue: 'Sorted input + pair / extreme bounding values',
      think: 'left = 0, right = n - 1. Sum too small? left++. Sum too big? right--.',
      typicalComplexity: 'Time: O(N) | Space: O(1)',
      commonTrap: 'Applying to unsorted array without considering if sorting is allowed.',
      javaSnippet: 'int l = 0, r = nums.length - 1;\nwhile (l < r) {\n    int sum = nums[l] + nums[r];\n    if (sum == target) return new int[]{l, r};\n    if (sum < target) l++; else r--;\n}'
    },
    javaCode: `public class TwoPointersTwoSum {
    public static int[] twoSumSorted(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            int currentSum = nums[left] + nums[right];

            if (currentSum == target) {
                // Match found! Return 0-indexed positions
                return new int[]{left, right};
            } else if (currentSum < target) {
                // Sum is too small: advance left pointer to increase sum
                left++;
            } else {
                // Sum is too large: decrement right pointer to reduce sum
                right--;
            }
        }
        return new int[]{-1, -1}; // No valid pair exists
    }
}`,
    defaultInputs: {
      label: 'Sorted Array + Target',
      input: [1, 3, 5, 7, 9, 11],
      target: 12
    },
    presetCases: [
      { label: 'Standard Pair (Target 12)', input: [1, 3, 5, 7, 9, 11], target: 12 },
      { label: 'Extremities Pair (Target 14)', input: [2, 4, 6, 8, 10, 12], target: 14 },
      { label: 'Adjacent Pair (Target 7)', input: [1, 2, 3, 4, 5], target: 7 },
      { label: 'No Match Found', input: [2, 5, 8, 11, 14], target: 17 },
      { label: 'Negative Numbers', input: [-8, -3, 0, 2, 5, 9], target: 2 }
    ],
    practiceProblems: [
      { id: '167', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '15', title: '3Sum', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '11', title: 'Container With Most Water', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '125', title: 'Valid Palindrome', difficulty: 'Easy', platform: 'LeetCode' }
    ]
  },
  {
    id: 'sliding-window',
    number: 2,
    name: 'Sliding Window',
    category: 'Arrays & Strings',
    tagline: 'Maintain a running state over contiguous subsegments to convert O(N²) into O(N)',
    isCore15: true,
    difficulty: 'Medium',
    whatIsIt: 'A technique that expands an end pointer to grow a window while contracting a start pointer to restore a required invariant over a contiguous subsegment.',
    whyItWorks: 'Instead of recalculating overlapping subproblems from scratch for every index, we subtract the leaving element (start) and add the entering element (end), doing O(1) state updates.',
    whenToUse: [
      'Problem specifies contiguous subarray or substring',
      'Target involves max/min length, target sum, or at most K distinct elements',
      'Fixed window size K (moving average, max sum subarray of size K)',
      'Variable window size based on condition (longest substring without repeating characters)'
    ],
    whenNotToUse: [
      'Negative numbers when finding exact subarray sums (shrinking window does not monotonically decrease sum! Use Prefix Sum + HashMap instead)',
      'Subsequence problems (elements do not need to be contiguous; use DP or Greedy)',
      'Non-linear or tree-based paths'
    ],
    problemClues: [
      'Contiguous subarray / substring',
      'Window of fixed size K',
      'Longest / shortest segment satisfying property P',
      'At most K distinct elements'
    ],
    javaDataStructures: ['int[]', 'HashMap<Character, Integer>', 'HashSet<Character>', 'int[] frequency'],
    timeComplexity: 'O(N)',
    timeComplexityReason: 'Each element enters the window via the right pointer once and leaves via the left pointer at most once (total 2N steps).',
    spaceComplexity: 'O(1) to O(K)',
    spaceComplexityReason: 'O(1) auxiliary space for fixed alphabets (ASCII 128/256 array) or O(K) for HashMap storing distinct characters.',
    commonMistakes: [
      'Shrinking with an if condition instead of a while loop when multiple violations exist',
      'Updating the answer before shrinking the invalid window state',
      'Off-by-one errors calculating window size: size is (right - left + 1)',
      'Assuming it works with negative numbers for sum targets'
    ],
    edgeCases: [
      'String or array length less than K',
      'All characters are duplicates',
      'All characters are distinct',
      'Empty string or null'
    ],
    interviewMemoryCard: {
      clue: 'Contiguous subarray / substring + max/min/target condition',
      think: 'Expand right pointer. When window invalid, shrink left pointer until valid again. Track best answer.',
      typicalComplexity: 'Time: O(N) | Space: O(K) or O(1)',
      commonTrap: 'Using sliding window on arrays with negative numbers for exact sum problems.',
      javaSnippet: 'int left = 0, maxLen = 0;\nfor (int right = 0; right < n; right++) {\n    // add nums[right] to state\n    while (/* condition invalid */) {\n        // remove nums[left] from state\n        left++;\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n}'
    },
    javaCode: `public class SlidingWindowFixed {
    public static int maxSubarraySumK(int[] nums, int k) {
        if (nums == null || nums.length < k) return 0;
        
        int currentSum = 0;
        // Build initial window of size k
        for (int i = 0; i < k; i++) {
            currentSum += nums[i];
        }

        int maxSum = currentSum;

        // Slide the window: subtract leftmost element, add new rightmost
        for (int right = k; right < nums.length; right++) {
            currentSum += nums[right] - nums[right - k];
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }
}`,
    defaultInputs: {
      label: 'Array + Window Size K=3',
      input: [2, 1, 5, 1, 3, 2, 4],
      k: 3
    },
    presetCases: [
      { label: 'Standard Window (K=3)', input: [2, 1, 5, 1, 3, 2, 4], k: 3 },
      { label: 'Small Array (K=2)', input: [4, 2, 1, 7, 8, 1, 2, 8, 1, 0], k: 3 },
      { label: 'Descending Elements (K=2)', input: [9, 8, 7, 6, 5, 4], k: 2 },
      { label: 'Window Equal to Length', input: [3, 5, 2, 1], k: 4 }
    ],
    practiceProblems: [
      { id: '643', title: 'Maximum Average Subarray I', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '209', title: 'Minimum Size Subarray Sum', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '76', title: 'Minimum Window Substring', difficulty: 'Hard', platform: 'LeetCode' }
    ]
  },
  {
    id: 'binary-search',
    number: 3,
    name: 'Binary Search',
    category: 'Searching',
    tagline: 'Logarithmic search space halving on sorted data or monotonic answer spaces',
    isCore15: true,
    difficulty: 'Easy',
    whatIsIt: 'A divide-and-conquer algorithm that compares the target against the middle element, eliminating half of the search range in every step.',
    whyItWorks: 'Due to the monotonicity of sorted sequences (f(x) <= f(x+1)), if target > mid, target cannot possibly exist at mid or anywhere to its left.',
    whenToUse: [
      'Array is strictly sorted or rotated sorted',
      'Finding lower/upper bound, first or last occurrence of duplicates',
      'Binary Search on Answer: Finding min/max capacity, speed, or allocation satisfying a feasibility check condition'
    ],
    whenNotToUse: [
      'Unsorted array without permission or budget to sort',
      'Linked lists (no O(1) random access to mid node)',
      'Non-monotonic search spaces where target could lie on either side unpredictably'
    ],
    problemClues: [
      'Sorted array given with requirement to search in O(log N)',
      'Find the minimum speed to arrive on time / Koko Eating Bananas',
      'Find peak element / rotated sorted array'
    ],
    javaDataStructures: ['int[]', 'Arrays.binarySearch()', 'List<Integer>'],
    timeComplexity: 'O(log N)',
    timeComplexityReason: 'The search range is divided by 2 at each iteration: N, N/2, N/4 ... 1, requiring log2(N) steps.',
    spaceComplexity: 'O(1)',
    spaceComplexityReason: 'Iterative implementation requires only three integer variables: low, high, and mid.',
    commonMistakes: [
      'Integer overflow computing (low + high) / 2 instead of low + (high - low) / 2',
      'Infinite loop caused by improper boundary updates (using low = mid instead of low = mid + 1)',
      'Off-by-one termination condition (using < when <= is needed)',
      'Misidentifying the monotonic condition in "Binary Search on Answer"'
    ],
    edgeCases: [
      'Empty array',
      'Single element array (target present vs absent)',
      'Target smaller than nums[0] or larger than nums[n-1]',
      'Target occurs multiple times'
    ],
    interviewMemoryCard: {
      clue: 'Sorted array / "find minimum X such that condition is met" (log N target)',
      think: 'low = 0, high = n - 1. mid = low + (high - low) / 2. Eliminate half each step.',
      typicalComplexity: 'Time: O(log N) | Space: O(1)',
      commonTrap: 'Using (low + high)/2 which overflows for large 32-bit signed ints.',
      javaSnippet: 'int low = 0, high = nums.length - 1;\nwhile (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) low = mid + 1;\n    else high = mid - 1;\n}\nreturn -1;'
    },
    javaCode: `public class BinarySearchIterative {
    public static int binarySearch(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            // Prevent integer overflow: equivalent to (low + high) / 2
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found at index mid
            } else if (nums[mid] < target) {
                // Target is in the right half: eliminate left half
                low = mid + 1;
            } else {
                // Target is in the left half: eliminate right half
                high = mid - 1;
            }
        }
        return -1; // Target not present in array
    }
}`,
    defaultInputs: {
      label: 'Sorted Array + Target=9',
      input: [1, 3, 5, 7, 9, 11, 13],
      target: 9
    },
    presetCases: [
      { label: 'Target in Middle (7)', input: [1, 3, 5, 7, 9, 11, 13], target: 7 },
      { label: 'Target on Left (1)', input: [1, 3, 5, 7, 9, 11, 13], target: 1 },
      { label: 'Target on Right (13)', input: [1, 3, 5, 7, 9, 11, 13], target: 13 },
      { label: 'Target Missing (6)', input: [1, 3, 5, 7, 9, 11, 13], target: 6 },
      { label: 'Even Length Array (8)', input: [2, 4, 6, 8, 10, 12], target: 8 }
    ],
    practiceProblems: [
      { id: '704', title: 'Binary Search', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '33', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '34', title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '875', title: 'Koko Eating Bananas', difficulty: 'Medium', platform: 'LeetCode' }
    ]
  },
  {
    id: 'frequency-counting',
    number: 4,
    name: 'Frequency Counting',
    category: 'Hashing',
    tagline: 'Count element occurrences in O(N) using HashMap or direct-addressed frequency arrays',
    isCore15: true,
    difficulty: 'Easy',
    whatIsIt: 'Tracking the count of each distinct element or character to enable O(1) existence, equality, anagram, and complement checks.',
    whyItWorks: 'Direct index addressing or hash functions map arbitrary values to counters, enabling constant-time checks for duplicates, missing numbers, and balance.',
    whenToUse: [
      'Checking if two strings are anagrams or permutations of each other',
      'Finding majority elements or elements appearing exactly K times',
      'Complement lookups (Two Sum in unsorted arrays)',
      'Tracking character frequencies for palindromes or word construction'
    ],
    whenNotToUse: [
      'When elements have wide sparse ranges with tight memory constraints (requires HashMap overhead)',
      'Sorted order traversal is needed (TreeMap O(log N) needed instead)',
      'Subarray sum problems without fixed window (needs Prefix Sum + Map)'
    ],
    problemClues: [
      'Valid Anagram',
      'First Unique Character in a String',
      'Two Sum in unsorted array',
      'Check if characters can be rearranged to form a palindrome'
    ],
    javaDataStructures: ['HashMap<T, Integer>', 'int[] count = new int[26]', 'HashSet<T>'],
    timeComplexity: 'O(N)',
    timeComplexityReason: 'Single linear pass over the input of size N to populate counts, plus O(K) to evaluate.',
    spaceComplexity: 'O(K) or O(1)',
    spaceComplexityReason: 'Fixed size array of 26/128 characters requires O(1) auxiliary space; arbitrary objects require O(U) for U unique keys.',
    commonMistakes: [
      'Allocating HashMap when simple int[26] array would be 10x faster and memory friendly',
      'Not handling negative numbers when using values directly as array indices',
      'Assuming map.get() never returns null before unboxing into primitive int (leads to NullPointerException)'
    ],
    edgeCases: [
      'Strings with unequal lengths (cannot be anagrams)',
      'Strings with uppercase, digits, or spaces',
      'All characters are identical',
      'Empty string'
    ],
    interviewMemoryCard: {
      clue: 'Anagram, character counts, single unique element, Two Sum unsorted',
      think: 'Direct array int[26] for lowercase English, or HashMap<K, Integer> for generic objects.',
      typicalComplexity: 'Time: O(N) | Space: O(K)',
      commonTrap: 'NPE on map.get(x) when key is absent; always use map.getOrDefault(x, 0).',
      javaSnippet: 'int[] freq = new int[26];\nfor (char c : s.toCharArray()) freq[c - \'a\']++;\nfor (char c : t.toCharArray()) freq[c - \'a\']--;\nfor (int val : freq) if (val != 0) return false;'
    },
    javaCode: `public class FrequencyCounterAnagram {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        // 26 buckets for lowercase English letters
        int[] freq = new int[26];

        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }

        // If counts match exactly, all buckets will be zero
        for (int count : freq) {
            if (count != 0) return false;
        }

        return true;
    }
}`,
    defaultInputs: {
      label: 'Character String',
      input: 'abacb',
      target: 'abc'
    },
    presetCases: [
      { label: 'String "abacb"', input: 'abacb' },
      { label: 'Word "leetcode"', input: 'leetcode' },
      { label: 'Word "anagram"', input: 'anagram' },
      { label: 'Word "success"', input: 'success' }
    ],
    practiceProblems: [
      { id: '242', title: 'Valid Anagram', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '387', title: 'First Unique Character in a String', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '49', title: 'Group Anagrams', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '1', title: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode' }
    ]
  },
  {
    id: 'matrix-traversal',
    number: 5,
    name: 'Matrix Traversal',
    category: 'Arrays & Matrices',
    tagline: 'Systematic grid boundary navigation with directional vectors and layer-by-layer peeling',
    isCore15: true,
    difficulty: 'Medium',
    whatIsIt: 'Navigating 2D row/column grids in specialized trajectories: Spiral, Diagonal, Transpose, Boundary, or BFS/DFS flood fill.',
    whyItWorks: 'By defining four boundary markers (top, bottom, left, right) or directional vectors int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}}, we systematically cover every cell without missing or repeating.',
    whenToUse: [
      'Spiral Matrix output or filling',
      'Matrix rotation (Rotate Image 90 degrees)',
      'Grid island counting (Number of Islands)',
      'Word search on 2D board',
      'Diagonal or boundary sum calculations'
    ],
    whenNotToUse: [
      'When the 2D grid represents an arbitrary graph with disconnected components requiring adjacency list representation',
      'When coordinates are continuous floating point values'
    ],
    problemClues: [
      'Given an m x n matrix, return all elements in spiral order',
      'Rotate matrix by 90 degrees clockwise in-place',
      'Traverse diagonal strips or boundary edges'
    ],
    javaDataStructures: ['int[][]', 'List<Integer>', 'boolean[][] visited'],
    timeComplexity: 'O(M * N)',
    timeComplexityReason: 'Every cell in the M x N grid is visited exactly once.',
    spaceComplexity: 'O(1) auxiliary',
    spaceComplexityReason: 'Only boundary index markers (top, bottom, left, right) are stored aside from the output list.',
    commonMistakes: [
      'Forgetting to check top <= bottom and left <= right inside the inner loop for non-square matrices',
      'Mixing row (i) and column (j) index boundaries',
      'Row-major vs column-major indexing errors (grid[row][col], not grid[col][row])'
    ],
    edgeCases: [
      'Single row matrix (1 x N)',
      'Single column matrix (M x 1)',
      'Single element (1 x 1)',
      'Empty matrix'
    ],
    interviewMemoryCard: {
      clue: 'Spiral order, 2D matrix traversal, layer-by-layer shrinking',
      think: 'top=0, bottom=m-1, left=0, right=n-1. Traverse: L->R (top++), T->B (right--), R->L (bottom--), B->T (left++).',
      typicalComplexity: 'Time: O(M * N) | Space: O(1)',
      commonTrap: 'Missing boundary validation before reverse passes on rectangular grids.',
      javaSnippet: 'while (top <= bottom && left <= right) {\n    for (int j = left; j <= right; j++) res.add(mat[top][j]);\n    top++;\n    for (int i = top; i <= bottom; i++) res.add(mat[i][right]);\n    right--;\n    if (top <= bottom) for (int j = right; j >= left; j--) res.add(mat[bottom][j]); bottom--;\n    if (left <= right) for (int i = bottom; i >= top; i--) res.add(mat[i][left]); left++;\n}'
    },
    javaCode: `public class SpiralMatrixTraversal {
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix == null || matrix.length == 0) return result;

        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            // 1. Traverse Left to Right along top boundary
            for (int col = left; col <= right; col++) {
                result.add(matrix[top][col]);
            }
            top++;

            // 2. Traverse Top to Bottom along right boundary
            for (int row = top; row <= bottom; row++) {
                result.add(matrix[row][right]);
            }
            right--;

            // 3. Traverse Right to Left along bottom boundary (if rows remain)
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    result.add(matrix[bottom][col]);
                }
                bottom--;
            }

            // 4. Traverse Bottom to Top along left boundary (if cols remain)
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    result.add(matrix[row][left]);
                }
                left++;
            }
        }
        return result;
    }
}`,
    defaultInputs: {
      label: '4x4 Matrix',
      input: [
        [1, 2, 3, 4],
        [12, 13, 14, 5],
        [11, 16, 15, 6],
        [10, 9, 8, 7]
      ]
    },
    presetCases: [
      {
        label: '4x4 Matrix (1-16)',
        input: [
          [1, 2, 3, 4],
          [12, 13, 14, 5],
          [11, 16, 15, 6],
          [10, 9, 8, 7]
        ]
      },
      {
        label: '3x3 Matrix',
        input: [
          [1, 2, 3],
          [8, 9, 4],
          [7, 6, 5]
        ]
      },
      {
        label: '3x4 Rectangular Matrix',
        input: [
          [1, 2, 3, 4],
          [10, 11, 12, 5],
          [9, 8, 7, 6]
        ]
      }
    ],
    practiceProblems: [
      { id: '54', title: 'Spiral Matrix', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '59', title: 'Spiral Matrix II', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '48', title: 'Rotate Image', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '73', title: 'Set Matrix Zeroes', difficulty: 'Medium', platform: 'LeetCode' }
    ]
  },
  {
    id: 'monotonic-stack',
    number: 6,
    name: 'Monotonic Stack',
    category: 'Stack',
    tagline: 'Maintain elements in strictly increasing/decreasing order to find next/previous greater/smaller in O(N)',
    isCore15: true,
    difficulty: 'Medium',
    whatIsIt: 'A stack whose elements are always sorted monotonically. When a new element violates the monotonicity, elements are popped until the invariant is restored.',
    whyItWorks: 'Popping an element immediately identifies the current element as the "Next Greater" or "Next Smaller" for the popped item, resolving query pairs in amortized O(1).',
    whenToUse: [
      'Next Greater Element (NGE) or Next Smaller Element (NSE)',
      'Daily Temperatures (days until warmer weather)',
      'Largest Rectangle in Histogram',
      'Trapping Rainwater stack approach',
      'Stock Span problem'
    ],
    whenNotToUse: [
      'General LIFO function call stacks where order is predetermined',
      'When elements need to be accessed by arbitrary indices or keys',
      'When search is not directional (needs 2D queries)'
    ],
    problemClues: [
      'For each element, find the next element greater than it',
      'Days until a higher temperature appears',
      'Largest rectangular area under histogram bars'
    ],
    javaDataStructures: ['Deque<Integer> stack = new ArrayDeque<>()', 'int[] result'],
    timeComplexity: 'O(N)',
    timeComplexityReason: 'Each array element is pushed onto the stack at most once and popped at most once (amortized 2N operations).',
    spaceComplexity: 'O(N)',
    spaceComplexityReason: 'In the worst case (strictly decreasing input), the stack stores up to N indices.',
    commonMistakes: [
      'Storing element values instead of their indices in the stack (indices let you access both the value and calculate distance!)',
      'Using java.util.Stack (synchronized, slow) instead of Deque<Integer> with ArrayDeque',
      'Incorrect comparison operator (> vs >=) causing duplicates to break monotonic property'
    ],
    edgeCases: [
      'Array already strictly decreasing or increasing',
      'All elements equal',
      'Single element array',
      'No greater element exists (default to -1)'
    ],
    interviewMemoryCard: {
      clue: 'Next/Previous Greater/Smaller element, histogram bars, temperature wait',
      think: 'Store INDICES in ArrayDeque. While (!stack.isEmpty() && nums[i] > nums[stack.peek()]) { pop and resolve! }',
      typicalComplexity: 'Time: O(N) | Space: O(N)',
      commonTrap: 'Storing values instead of indices; always store indices.',
      javaSnippet: 'Deque<Integer> stack = new ArrayDeque<>();\nint[] res = new int[n];\nArrays.fill(res, -1);\nfor (int i = 0; i < n; i++) {\n    while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n        res[stack.pop()] = nums[i];\n    }\n    stack.push(i);\n}'
    },
    javaCode: `public class NextGreaterElement {
    public static int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);

        // ArrayDeque is faster than legacy java.util.Stack
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // While current element is greater than element at top index
            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
                int resolvedIndex = stack.pop();
                result[resolvedIndex] = nums[i];
            }
            // Store current index to resolve its next greater later
            stack.push(i);
        }

        return result;
    }
}`,
    defaultInputs: {
      label: 'Input Array',
      input: [1, 3, 2, 4]
    },
    presetCases: [
      { label: 'Example: [1, 3, 2, 4]', input: [1, 3, 2, 4] },
      { label: 'Daily Temperatures: [73, 74, 75, 71, 69, 72, 76, 73]', input: [73, 74, 75, 71, 69, 72, 76, 73] },
      { label: 'Strictly Decreasing: [5, 4, 3, 2, 1]', input: [5, 4, 3, 2, 1] },
      { label: 'Strictly Increasing: [1, 2, 3, 4, 5]', input: [1, 2, 3, 4, 5] }
    ],
    practiceProblems: [
      { id: '496', title: 'Next Greater Element I', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '739', title: 'Daily Temperatures', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '84', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', platform: 'LeetCode' },
      { id: '901', title: 'Online Stock Span', difficulty: 'Medium', platform: 'LeetCode' }
    ]
  },
  {
    id: 'prefix-sum',
    number: 7,
    name: 'Prefix Sum',
    category: 'Prefix / Suffix',
    tagline: 'Precompute cumulative sums in O(N) to answer any range sum query in O(1)',
    isCore15: true,
    difficulty: 'Easy',
    whatIsIt: 'An array where prefix[i] stores the sum of all elements from index 0 through i - 1, allowing range sum sum(L, R) to be calculated as prefix[R + 1] - prefix[L].',
    whyItWorks: 'The difference between the cumulative sum up to R and the cumulative sum up to L-1 isolates the exact sum of elements between L and R in a single subtraction.',
    whenToUse: [
      'Frequent static range sum queries on an array',
      'Subarray Sum Equals K (combined with HashMap)',
      'Contiguous subarrays with sum divisible by K',
      '2D Matrix block sum queries'
    ],
    whenNotToUse: [
      'Dynamic arrays with frequent updates/mutations (updates take O(N); use Segment Tree or Fenwick Tree instead)',
      'Non-associative operations (e.g. range median)',
      'Multiplication with zero elements causing loss of information'
    ],
    problemClues: [
      'Subarray sum equals target',
      'Multiple range sum queries [left, right]',
      'Find pivot index where left sum equals right sum',
      'Subarray with sum divisible by K'
    ],
    javaDataStructures: ['int[] prefix', 'HashMap<Integer, Integer> countMap'],
    timeComplexity: 'O(N) precomputation, O(1) query',
    timeComplexityReason: 'Building the prefix array takes linear time; each query is a single arithmetic subtraction.',
    spaceComplexity: 'O(N)',
    spaceComplexityReason: 'Stores an auxiliary array of size N + 1.',
    commonMistakes: [
      'Using 0-indexed prefix array instead of 1-indexed (prefix of size N+1 with prefix[0] = 0 avoids special if-checks for left == 0)',
      'Integer overflow when summing large integer arrays (use long[] prefix)',
      'Forgetting to initialize HashMap with map.put(0, 1) when finding subarray sums equal to K'
    ],
    edgeCases: [
      'Range covering entire array (L=0, R=N-1)',
      'Single element range (L=R)',
      'Array with negative numbers and zeroes',
      'Target K equals zero'
    ],
    interviewMemoryCard: {
      clue: 'Range sum queries, subarray sum equals K with negative numbers',
      think: 'prefix[i] = prefix[i-1] + nums[i-1]. Range [L, R] = prefix[R+1] - prefix[L].',
      typicalComplexity: 'Time: O(N) build, O(1) query | Space: O(N)',
      commonTrap: 'Forgetting map.put(0, 1) in Subarray Sum = K (misses subarrays starting at index 0).',
      javaSnippet: 'int[] prefix = new int[n + 1];\nfor (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n// query [L, R]:\nint rangeSum = prefix[R + 1] - prefix[L];'
    },
    javaCode: `public class PrefixSumArray {
    private final int[] prefix;

    public PrefixSumArray(int[] nums) {
        // Size n + 1 simplifies edge case where L = 0
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    public int queryRangeSum(int left, int right) {
        // Returns sum of nums[left ... right] in O(1)
        return prefix[right + 1] - prefix[left];
    }
}`,
    defaultInputs: {
      label: 'Array [1, 2, 3, 4]',
      input: [1, 2, 3, 4]
    },
    presetCases: [
      { label: 'Array: [1, 2, 3, 4]', input: [1, 2, 3, 4] },
      { label: 'With Negatives: [2, -1, 3, -2, 4]', input: [2, -1, 3, -2, 4] },
      { label: 'All Ones: [1, 1, 1, 1, 1]', input: [1, 1, 1, 1, 1] }
    ],
    practiceProblems: [
      { id: '303', title: 'Range Sum Query - Immutable', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '560', title: 'Subarray Sum Equals K', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '724', title: 'Find Pivot Index', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '974', title: 'Subarray Sums Divisible by K', difficulty: 'Medium', platform: 'LeetCode' }
    ]
  },
  {
    id: 'overlapping-intervals',
    number: 8,
    name: 'Overlapping Intervals',
    category: 'Intervals',
    tagline: 'Sort by start time and resolve overlaps sequentially on a 1D timeline',
    isCore15: true,
    difficulty: 'Medium',
    whatIsIt: 'Technique for merging, inserting, or scheduling intervals by sorting them chronologically and merging adjacent pairs whose start <= previous end.',
    whyItWorks: 'Sorting by start time ensures that any interval that could possibly overlap with interval i must appear immediately after i, converting an O(N²) pairwise check into a single O(N) sweep.',
    whenToUse: [
      'Merging overlapping calendar appointments or ranges',
      'Insert new interval into non-overlapping list',
      'Minimum meeting rooms required (Sweep-line / Heap)',
      'Non-overlapping intervals (remove minimum overlaps)'
    ],
    whenNotToUse: [
      'Unbounded multi-dimensional spatial intervals (use R-trees or KD-trees)',
      'When intervals cannot be sorted due to streaming input with immediate output required'
    ],
    problemClues: [
      'Given an array of intervals [start, end], merge all overlapping intervals',
      'Meeting rooms requirement',
      'Find maximum concurrent active events'
    ],
    javaDataStructures: ['int[][] intervals', 'Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]))', 'List<int[]>'],
    timeComplexity: 'O(N log N)',
    timeComplexityReason: 'Sorting the N intervals takes O(N log N); the subsequent linear scan takes O(N).',
    spaceComplexity: 'O(N)',
    spaceComplexityReason: 'Output list stores up to N merged intervals.',
    commonMistakes: [
      'Using (a, b) -> a[0] - b[0] which can cause integer subtraction overflow on negative inputs; always use Integer.compare(a[0], b[0])',
      'Forgetting that interval [1, 4] and [4, 6] overlap if they touch at 4',
      'Updating current end as Math.max(current[1], next[1]) rather than simply next[1]'
    ],
    edgeCases: [
      'Single interval',
      'All intervals completely nested within one giant interval',
      'No intervals overlap at all',
      'Intervals touch at endpoints ([1, 3] and [3, 5])'
    ],
    interviewMemoryCard: {
      clue: 'Intervals [start, end], merge, schedule, conflict check',
      think: 'SORT BY START TIME! Keep last merged. If next.start <= last.end, last.end = max(last.end, next.end). Else add new.',
      typicalComplexity: 'Time: O(N log N) | Space: O(N)',
      commonTrap: 'Using a[0] - b[0] comparator instead of Integer.compare(a[0], b[0]).',
      javaSnippet: 'Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\nList<int[]> res = new ArrayList<>();\nfor (int[] cur : intervals) {\n    if (res.isEmpty() || res.get(res.size() - 1)[1] < cur[0]) {\n        res.add(cur);\n    } else {\n        res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], cur[1]);\n    }\n}'
    },
    javaCode: `public class MergeIntervals {
    public static int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;

        // Step 1: Sort chronologically by start time safely
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];
        merged.add(current);

        for (int i = 1; i < intervals.length; i++) {
            int[] next = intervals[i];

            // Overlap detected: next starts before or when current ends
            if (next[0] <= current[1]) {
                current[1] = Math.max(current[1], next[1]);
            } else {
                // No overlap: start a new interval
                current = next;
                merged.add(current);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}`,
    defaultInputs: {
      label: 'Intervals [[1, 4], [3, 6]]',
      input: [[1, 4], [3, 6]]
    },
    presetCases: [
      { label: 'Image Example: [[1, 4], [3, 6]]', input: [[1, 4], [3, 6]] },
      { label: 'Multiple Merges: [[1, 3], [2, 6], [8, 10], [15, 18]]', input: [[1, 3], [2, 6], [8, 10], [15, 18]] },
      { label: 'Nested Intervals: [[1, 8], [2, 4], [5, 7]]', input: [[1, 8], [2, 4], [5, 7]] },
      { label: 'Touching Points: [[1, 4], [4, 5]]', input: [[1, 4], [4, 5]] }
    ],
    practiceProblems: [
      { id: '56', title: 'Merge Intervals', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '57', title: 'Insert Interval', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '435', title: 'Non-overlapping Intervals', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '252', title: 'Meeting Rooms', difficulty: 'Easy', platform: 'LeetCode' }
    ]
  },
  {
    id: 'greedy',
    number: 9,
    name: 'Greedy',
    category: 'Greedy',
    tagline: 'Make the locally optimal choice at each step to reach a global optimum',
    isCore15: true,
    difficulty: 'Medium',
    whatIsIt: 'An algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most immediate benefit without ever reconsidering past choices.',
    whyItWorks: 'Works when the problem exhibits the Greedy-Choice Property (a globally optimal solution can be reached through local optimal choices) and Optimal Substructure.',
    whenToUse: [
      'Activity selection / Interval scheduling (earliest end time)',
      'Coin change with canonical denominations (e.g., US currency)',
      'Fractional Knapsack',
      'Jump Game (maximum reachable index)',
      'Gas Station circuit completion'
    ],
    whenNotToUse: [
      '0/1 Knapsack (items cannot be split; requires Dynamic Programming)',
      'Coin change with arbitrary denominations (e.g. coins [1, 3, 4] for amount 6; greedy picks 4+1+1 = 3 coins, but optimal is 3+3 = 2 coins!)',
      'Problems with non-local state dependencies'
    ],
    problemClues: [
      'Find minimum moves/jumps to reach end',
      'Schedule maximum non-conflicting events',
      'Make change with canonical coin set'
    ],
    javaDataStructures: ['Arrays.sort()', 'PriorityQueue<T>'],
    timeComplexity: 'O(N log N) if sorting is required, O(N) if already sorted',
    timeComplexityReason: 'Evaluating each candidate takes O(1) after sorting.',
    spaceComplexity: 'O(1)',
    spaceComplexityReason: 'Requires only scalar tracker variables for current best choice.',
    commonMistakes: [
      'Assuming greedy works without proving the greedy choice property (very common interview pitfall!)',
      'Sorting by the wrong attribute (e.g., in interval scheduling, sort by END time, not start time)',
      'Not validating edge case where no choice is valid'
    ],
    edgeCases: [
      'Amount is 0',
      'Cannot make exact amount',
      'Single large denomination',
      'Target smaller than smallest coin'
    ],
    interviewMemoryCard: {
      clue: 'Min/max optimization where local best never harms future options',
      think: 'Sort by strategic attribute (e.g., earliest finish time or highest ratio). Choose greedily.',
      typicalComplexity: 'Time: O(N log N) | Space: O(1)',
      commonTrap: 'Using greedy on arbitrary coin denominations where DP is strictly required.',
      javaSnippet: 'int count = 0;\nfor (int coin : coins) {\n    if (amount >= coin) {\n        count += amount / coin;\n        amount %= coin;\n    }\n}'
    },
    javaCode: `public class GreedyCoinChange {
    // Note: Valid for canonical currency systems like US coins [25, 10, 5, 1]
    public static List<Integer> makeChangeGreedy(int[] denominationsDescending, int amount) {
        List<Integer> coinsUsed = new ArrayList<>();

        for (int coin : denominationsDescending) {
            while (amount >= coin) {
                amount -= coin;
                coinsUsed.add(coin);
            }
        }

        return coinsUsed;
    }
}`,
    defaultInputs: {
      label: 'Canonical Denominations [25, 10, 5, 1] & Amount 15',
      input: [25, 10, 5, 1],
      target: 15
    },
    presetCases: [
      { label: 'Image Example: Amount 15', input: [25, 10, 5, 1], target: 15 },
      { label: 'Amount 36', input: [25, 10, 5, 1], target: 36 },
      { label: 'Amount 41', input: [25, 10, 5, 1], target: 41 },
      { label: 'Amount 7', input: [25, 10, 5, 1], target: 7 }
    ],
    practiceProblems: [
      { id: '55', title: 'Jump Game', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '45', title: 'Jump Game II', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '134', title: 'Gas Station', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '455', title: 'Assign Cookies', difficulty: 'Easy', platform: 'LeetCode' }
    ]
  },
  {
    id: 'top-k-elements',
    number: 10,
    name: 'Top K Elements',
    category: 'Heap / PriorityQueue',
    tagline: 'Bounded Min-Heap of size K to find top elements in O(N log K) instead of O(N log N)',
    isCore15: true,
    difficulty: 'Medium',
    whatIsIt: 'Using a PriorityQueue bounded to size K. To find K largest elements, maintain a Min-Heap of size K. If a new element is larger than the root, poll the root and insert the new element.',
    whyItWorks: 'The Min-Heap always holds the K largest elements seen so far at its bottom and interior, with the smallest of those K elements conveniently at the top root in O(1).',
    whenToUse: [
      'Find Kth Largest / Smallest element in an unsorted stream or array',
      'Top K Frequent Elements (combined with frequency map)',
      'K Closest Points to Origin',
      'Sort a K-sorted (nearly sorted) array'
    ],
    whenNotToUse: [
      'When K == N or K is very close to N (standard sorting is cleaner and faster)',
      'When elements can be bucket sorted in O(N) linear time (e.g. frequencies bounded by array length)'
    ],
    problemClues: [
      'Find the Kth largest element in an unsorted array',
      'Return the top K most frequent elements',
      'Continuously extract top K from dynamic stream of numbers'
    ],
    javaDataStructures: ['PriorityQueue<Integer> minHeap = new PriorityQueue<>()', 'HashMap<Integer, Integer>'],
    timeComplexity: 'O(N log K)',
    timeComplexityReason: 'Processing N elements through a heap of fixed size K takes log(K) per insertion/poll.',
    spaceComplexity: 'O(K)',
    spaceComplexityReason: 'The heap maintains at most K elements at any given moment.',
    commonMistakes: [
      'Using a Max-Heap instead of a Min-Heap for K largest (a Max-Heap would grow to size N, taking O(N log N)!)',
      'Not specifying comparator correctly when storing custom objects or frequencies',
      'Assuming PriorityQueue iteration returns elements in sorted order (it does not; it only guarantees root is min)'
    ],
    edgeCases: [
      'K equals 1 (equivalent to finding max/min)',
      'K equals array length',
      'Array contains duplicates',
      'Negative values'
    ],
    interviewMemoryCard: {
      clue: 'Top K largest / smallest, dynamic stream ranking',
      think: 'K LARGEST -> MIN-HEAP of size K! If (heap.size() > K) heap.poll(). Root is Kth largest.',
      typicalComplexity: 'Time: O(N log K) | Space: O(K)',
      commonTrap: 'Using Max-Heap for K-largest which takes O(N log N) space/time.',
      javaSnippet: 'PriorityQueue<Integer> minHeap = new PriorityQueue<>();\nfor (int num : nums) {\n    minHeap.offer(num);\n    if (minHeap.size() > k) minHeap.poll();\n}\nreturn minHeap.peek();'
    },
    javaCode: `public class KthLargestElement {
    public static int findKthLargest(int[] nums, int k) {
        // Min-Heap in Java (natural ordering)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num);

            // If heap size exceeds k, discard the smallest candidate
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        // The root is the k-th largest element!
        return minHeap.peek();
    }
}`,
    defaultInputs: {
      label: 'Numbers + K=3',
      input: [3, 2, 1, 5, 6, 4],
      k: 3
    },
    presetCases: [
      { label: 'Example: [3, 2, 1, 5, 6, 4], K=3', input: [3, 2, 1, 5, 6, 4], k: 3 },
      { label: 'Image Example: Top K Elements with K=3', input: [7, 3, 5, 2, 9, 1], k: 3 },
      { label: 'With Duplicates: [3, 2, 3, 1, 2, 4, 5, 5, 6], K=4', input: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }
    ],
    practiceProblems: [
      { id: '215', title: 'Kth Largest Element in an Array', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '347', title: 'Top K Frequent Elements', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '973', title: 'K Closest Points to Origin', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '295', title: 'Find Median from Data Stream', difficulty: 'Hard', platform: 'LeetCode' }
    ]
  },
  {
    id: 'backtracking',
    number: 11,
    name: 'Backtracking',
    category: 'Backtracking',
    tagline: 'Choose, Explore, Undo: Depth-first search of the state space with pruning',
    isCore15: true,
    difficulty: 'Hard',
    whatIsIt: 'A recursive algorithmic-technique for solving problems incrementally, trying to build a solution candidate and abandoning ("backtracking") as soon as it determines the candidate cannot lead to a valid solution.',
    whyItWorks: 'Systematically traverses the decision tree while pruning dead-end branches before exploring them, avoiding generating all permutations blindly.',
    whenToUse: [
      'Generating all Subsets (Power Set)',
      'Generating all Permutations or Combinations',
      'Combination Sum',
      'N-Queens puzzle',
      'Sudoku solver',
      'Word Search on 2D board'
    ],
    whenNotToUse: [
      'When you only need the COUNT of solutions or min/max value with overlapping subproblems (use Dynamic Programming!)',
      'When greedy choice is proven optimal'
    ],
    problemClues: [
      'Find all possible subsets / permutations',
      'Place N queens so no two attack each other',
      'Find all unique combinations that sum to target'
    ],
    javaDataStructures: ['List<List<Integer>> result', 'List<Integer> currentPath', 'boolean[] used'],
    timeComplexity: 'O(2^N) for subsets, O(N!) for permutations',
    timeComplexityReason: 'Exponential search space corresponding to the decision tree size.',
    spaceComplexity: 'O(N)',
    spaceComplexityReason: 'Recursion call stack depth plus current path size.',
    commonMistakes: [
      'Adding currentPath directly to result instead of a deep copy: result.add(new ArrayList<>(currentPath))',
      'Forgetting the "Undo" step (currentPath.remove(currentPath.size() - 1)) causing path pollution',
      'Not skipping duplicate branches in Permutations II or Subsets II'
    ],
    edgeCases: [
      'Empty input array -> returns [[]]',
      'Target cannot be achieved',
      'Array contains duplicates'
    ],
    interviewMemoryCard: {
      clue: 'Find ALL combinations / permutations / partitions / valid placements',
      think: 'Pattern: Choose -> Explore -> Undo. Always copy list: res.add(new ArrayList<>(path)).',
      typicalComplexity: 'Time: O(2^N) or O(N!) | Space: O(N) recursion stack',
      commonTrap: 'result.add(path) adds reference to empty list; MUST do new ArrayList<>(path).',
      javaSnippet: 'void backtrack(int start, List<Integer> path) {\n    res.add(new ArrayList<>(path));\n    for (int i = start; i < nums.length; i++) {\n        path.add(nums[i]);\n        backtrack(i + 1, path);\n        path.remove(path.size() - 1); // Undo\n    }\n}'
    },
    javaCode: `public class SubsetsBacktracking {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<List<Integer>> result = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int start, int[] nums, List<Integer> path, List<List<Integer>> result) {
        // Every state in the decision tree is a valid subset
        result.add(new ArrayList<>(path));

        for (int i = start; i < nums.length; i++) {
            // 1. CHOOSE
            path.add(nums[i]);
            // 2. EXPLORE
            backtrack(i + 1, nums, path, result);
            // 3. UNDO (Backtrack)
            path.remove(path.size() - 1);
        }
    }
}`,
    defaultInputs: {
      label: 'Input Set [1, 2, 3]',
      input: [1, 2, 3]
    },
    presetCases: [
      { label: 'Set: [1, 2, 3]', input: [1, 2, 3] },
      { label: 'Set: [1, 2]', input: [1, 2] },
      { label: 'Set: [4, 5, 6, 7]', input: [4, 5, 6, 7] }
    ],
    practiceProblems: [
      { id: '78', title: 'Subsets', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '46', title: 'Permutations', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '39', title: 'Combination Sum', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '51', title: 'N-Queens', difficulty: 'Hard', platform: 'LeetCode' }
    ]
  },
  {
    id: 'binary-tree-traversal',
    number: 12,
    name: 'Binary Tree Traversal',
    category: 'Binary Tree',
    tagline: 'Recursive and iterative tree exploration: Inorder, Preorder, Postorder, and Level Order',
    isCore15: true,
    difficulty: 'Easy',
    whatIsIt: 'Methods of visiting every node in a binary tree exactly once in a well-defined topological or hierarchical sequence.',
    whyItWorks: 'Binary trees are recursively defined as a root node with two disjoint subtrees. Depth-First Traversals follow the call stack; Breadth-First Traversals use a Queue to visit level-by-level.',
    whenToUse: [
      'Inorder (Left -> Root -> Right): Gives strictly sorted values in Binary Search Trees (BST)',
      'Preorder (Root -> Left -> Right): Useful for cloning, copying, or serializing trees',
      'Postorder (Left -> Right -> Root): Bottom-up calculation (tree height, diameter, deleting nodes)',
      'Level Order (BFS): Printing by levels, finding minimum depth, zigzag order'
    ],
    whenNotToUse: [
      'Graphs with cycles (requires visited set to prevent infinite recursion)',
      'Arbitrary n-ary structures without adapting child iterators'
    ],
    problemClues: [
      'Binary Tree Level Order Traversal',
      'Validate Binary Search Tree (Inorder must be strictly increasing)',
      'Maximum Depth of Binary Tree (Postorder)',
      'Lowest Common Ancestor'
    ],
    javaDataStructures: ['TreeNode', 'Queue<TreeNode> queue = new ArrayDeque<>()', 'List<Integer>'],
    timeComplexity: 'O(N)',
    timeComplexityReason: 'Every node in the tree of size N is visited exactly once.',
    spaceComplexity: 'O(H) or O(W)',
    spaceComplexityReason: 'O(H) recursion stack for DFS where H is height; O(W) queue space for BFS where W is maximum width.',
    commonMistakes: [
      'Not checking if root == null at the start of recursion (NullPointerException)',
      'Forgetting to snapshot queue size (int size = queue.size()) before the level-order inner loop',
      'Modifying tree references when only traversal was requested'
    ],
    edgeCases: [
      'Null/empty tree',
      'Single root node',
      'Skewed tree (degenerate linked list where height = N)',
      'Complete/balanced tree'
    ],
    interviewMemoryCard: {
      clue: 'Tree traversal, height, depth, BST validation, level by level',
      think: 'Inorder = BST sorted! Level order = Queue with level size snapshot! Postorder = bottom-up metrics.',
      typicalComplexity: 'Time: O(N) | Space: O(H) DFS / O(W) BFS',
      commonTrap: 'In BFS level-order, forgetting int levelSize = queue.size() before the loop.',
      javaSnippet: 'Queue<TreeNode> q = new ArrayDeque<>();\nq.offer(root);\nwhile (!q.isEmpty()) {\n    int size = q.size();\n    for (int i = 0; i < size; i++) {\n        TreeNode cur = q.poll();\n        if (cur.left != null) q.offer(cur.left);\n        if (cur.right != null) q.offer(cur.right);\n    }\n}'
    },
    javaCode: `public class BinaryTreeLevelOrder {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // Freeze size of current level
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll();
                currentLevel.add(current.val);

                if (current.left != null) queue.offer(current.left);
                if (current.right != null) queue.offer(current.right);
            }

            result.add(currentLevel);
        }

        return result;
    }
}`,
    defaultInputs: {
      label: 'Balanced Tree [4, 2, 6, 1, 3, 5, 7]',
      input: [4, 2, 6, 1, 3, 5, 7]
    },
    presetCases: [
      { label: 'Full 3-Level BST: [4, 2, 6, 1, 3, 5, 7]', input: [4, 2, 6, 1, 3, 5, 7] },
      { label: 'Unbalanced Tree: [10, 5, 15, null, 8, null, 20]', input: [10, 5, 15, null, 8, null, 20] },
      { label: 'Single Node: [1]', input: [1] }
    ],
    practiceProblems: [
      { id: '102', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '94', title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '104', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '236', title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', platform: 'LeetCode' }
    ]
  },
  {
    id: 'depth-first-search',
    number: 13,
    name: 'Depth-First Search (DFS)',
    category: 'Graph',
    tagline: 'Go deep along each path as far as possible before backtracking',
    isCore15: true,
    difficulty: 'Medium',
    whatIsIt: 'A graph and tree exploration algorithm that starts at a root node and explores as far along each branch as possible before backtracking, naturally implemented via recursion or an explicit stack.',
    whyItWorks: 'DFS tracks visited vertices to prevent infinite cycles, ensuring that every connected reachable vertex is visited in linear time.',
    whenToUse: [
      'Connected components detection (Number of Islands, Flood Fill)',
      'Detecting cycles in directed/undirected graphs',
      'Topological sorting of Directed Acyclic Graphs (DAG)',
      'Finding all paths from source to destination',
      'Solving maze or grid reachability'
    ],
    whenNotToUse: [
      'Finding the shortest path in an UNWEIGHTED graph (DFS can find unnecessarily long detour paths! Use BFS instead)',
      'Graphs with massive branching where call stack depth causes StackOverflowError'
    ],
    problemClues: [
      'Number of Islands in 2D grid',
      'Clone Graph',
      'Course Schedule (Cycle detection)',
      'Find all paths from node A to node B'
    ],
    javaDataStructures: ['boolean[] visited', 'List<List<Integer>> adjList', 'Deque<Integer> stack'],
    timeComplexity: 'O(V + E)',
    timeComplexityReason: 'Visits each vertex V once and explores each outgoing edge E once.',
    spaceComplexity: 'O(V)',
    spaceComplexityReason: 'Requires visited array of size V and recursion stack up to depth V in the worst case (e.g. linear chain).',
    commonMistakes: [
      'Forgetting to mark current node as visited immediately, causing infinite recursion loop in graphs with cycles',
      'Confusing directed graph cycle detection (requires 3 states: UNVISITED, VISITING, VISITED) with undirected graph cycle check (requires parent pointer)',
      'Grid out-of-bounds check placed after array access'
    ],
    edgeCases: [
      'Disconnected graph with multiple isolated components',
      'Graph containing self-loops or duplicate parallel edges',
      'Single isolated node with no edges'
    ],
    interviewMemoryCard: {
      clue: 'Connected components, islands, cycle detection, topological sort, path finding',
      think: 'Go deep! Use recursion or Stack. Mark visited immediately. For undirected cycle, check neighbor != parent.',
      typicalComplexity: 'Time: O(V + E) | Space: O(V)',
      commonTrap: 'Using DFS for shortest path in unweighted graph; BFS is required for shortest path.',
      javaSnippet: 'void dfs(int u, boolean[] visited, List<List<Integer>> adj) {\n    visited[u] = true;\n    for (int v : adj.get(u)) {\n        if (!visited[v]) dfs(v, visited, adj);\n    }\n}'
    },
    javaCode: `public class GraphDFS {
    public static void dfs(int node, List<List<Integer>> adj, boolean[] visited, List<Integer> traversal) {
        visited[node] = true;
        traversal.add(node);

        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited, traversal);
            }
        }
    }
}`,
    defaultInputs: {
      label: 'Graph (5 Nodes: A, B, C, D, E)',
      input: {
        nodes: ['A', 'B', 'C', 'D', 'E'],
        edges: [['A', 'B'], ['B', 'C'], ['A', 'D'], ['D', 'E'], ['B', 'E']]
      }
    },
    presetCases: [
      {
        label: 'Image Graph (A-B-C-D-E)',
        input: {
          nodes: ['A', 'B', 'C', 'D', 'E'],
          edges: [['A', 'B'], ['B', 'C'], ['A', 'D'], ['D', 'E'], ['B', 'E']]
        }
      },
      {
        label: 'Cycle Graph (4 nodes)',
        input: {
          nodes: ['0', '1', '2', '3'],
          edges: [['0', '1'], ['1', '2'], ['2', '3'], ['3', '0']]
        }
      }
    ],
    practiceProblems: [
      { id: '200', title: 'Number of Islands', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '133', title: 'Clone Graph', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '207', title: 'Course Schedule', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '547', title: 'Number of Provinces', difficulty: 'Medium', platform: 'LeetCode' }
    ]
  },
  {
    id: 'breadth-first-search',
    number: 14,
    name: 'Breadth-First Search (BFS)',
    category: 'Graph',
    tagline: 'Explore nearest neighbors level-by-level to guarantee shortest path in unweighted graphs',
    isCore15: true,
    difficulty: 'Medium',
    whatIsIt: 'A graph traversal algorithm that explores all vertices at the present depth before moving to vertices at the next depth level, using a FIFO Queue.',
    whyItWorks: 'Because the queue processes vertices strictly in non-decreasing order of distance from the source, the first time a target vertex is dequeued, it is GUARANTEED to be via the shortest possible path.',
    whenToUse: [
      'Shortest path in unweighted graphs or grids (e.g. Knight Moves on chessboard)',
      'Level-order processing and shortest transformation sequences (Word Ladder)',
      'Multi-source BFS (e.g., Rotting Oranges, 01 Matrix)',
      'Finding all nodes within distance K'
    ],
    whenNotToUse: [
      'Weighted graphs with varying edge costs (requires Dijkstra\'s algorithm with PriorityQueue)',
      'Graphs with negative edge weights (requires Bellman-Ford)',
      'Finding all permutations/combinations (use Backtracking)'
    ],
    problemClues: [
      'Find the shortest path or minimum steps from start to target',
      'Rotting Oranges (simultaneous spread)',
      'Word Ladder (minimum transformations)'
    ],
    javaDataStructures: ['Queue<Integer> queue = new ArrayDeque<>()', 'boolean[] visited', 'int[] distance'],
    timeComplexity: 'O(V + E)',
    timeComplexityReason: 'Each vertex is enqueued and dequeued once, and each incident edge is traversed once.',
    spaceComplexity: 'O(V)',
    spaceComplexityReason: 'The queue holds all frontier vertices at maximum width of the graph.',
    commonMistakes: [
      'Marking node as visited when DEQUEUED instead of when ENQUEUED (causes duplicate enqueuing of the same node from multiple neighbors, leading to memory explosion!)',
      'Using LinkedList instead of ArrayDeque in Java (ArrayDeque has better cache locality and zero node allocation overhead)',
      'Not maintaining step/level count for multi-level questions'
    ],
    edgeCases: [
      'Start node is already the destination',
      'Destination is unreachable (returns -1)',
      'Disconnected graph',
      'Multi-source starting states'
    ],
    interviewMemoryCard: {
      clue: 'Shortest path in unweighted graph/grid, minimum moves, level-by-level spread',
      think: 'Queue FIFO! Mark visited WHEN OFFERED, never when polled. Measure steps level by level.',
      typicalComplexity: 'Time: O(V + E) | Space: O(V)',
      commonTrap: 'Marking visited on poll instead of offer -> causes huge memory explosion with duplicate nodes.',
      javaSnippet: 'Queue<Integer> q = new ArrayDeque<>();\nq.offer(start);\nvisited[start] = true;\nint steps = 0;\nwhile (!q.isEmpty()) {\n    int size = q.size();\n    for (int i = 0; i < size; i++) {\n        int u = q.poll();\n        if (u == target) return steps;\n        for (int v : adj.get(u)) {\n            if (!visited[v]) {\n                visited[v] = true;\n                q.offer(v);\n            }\n        }\n    }\n    steps++;\n}'
    },
    javaCode: `public class GraphBFS {
    public static List<Integer> bfs(int startNode, List<List<Integer>> adj, int numNodes) {
        List<Integer> order = new ArrayList<>();
        boolean[] visited = new boolean[numNodes];
        Queue<Integer> queue = new ArrayDeque<>();

        // CRITICAL: Mark visited immediately upon ENQUEUE
        visited[startNode] = true;
        queue.offer(startNode);

        while (!queue.isEmpty()) {
            int current = queue.poll();
            order.add(current);

            for (int neighbor : adj.get(current)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true; // Mark visited HERE!
                    queue.offer(neighbor);
                }
            }
        }

        return order;
    }
}`,
    defaultInputs: {
      label: 'Graph (5 Nodes: A, B, C, D, E)',
      input: {
        nodes: ['A', 'B', 'C', 'D', 'E'],
        edges: [['A', 'B'], ['B', 'C'], ['A', 'D'], ['D', 'E'], ['B', 'E']]
      }
    },
    presetCases: [
      {
        label: 'Image Graph (A-B-C-D-E)',
        input: {
          nodes: ['A', 'B', 'C', 'D', 'E'],
          edges: [['A', 'B'], ['B', 'C'], ['A', 'D'], ['D', 'E'], ['B', 'E']]
        }
      },
      {
        label: 'Bipartite Ring: [0-1-2-3-4-5]',
        input: {
          nodes: ['0', '1', '2', '3', '4', '5'],
          edges: [['0', '1'], ['1', '2'], ['2', '3'], ['3', '4'], ['4', '5'], ['5', '0']]
        }
      }
    ],
    practiceProblems: [
      { id: '1091', title: 'Shortest Path in Binary Matrix', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '994', title: 'Rotting Oranges', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '127', title: 'Word Ladder', difficulty: 'Hard', platform: 'LeetCode' },
      { id: '752', title: 'Open the Lock', difficulty: 'Medium', platform: 'LeetCode' }
    ]
  },
  {
    id: 'dynamic-programming',
    number: 15,
    name: 'Dynamic Programming',
    category: 'Dynamic Programming',
    tagline: 'Break into overlapping subproblems, store intermediate results, and transition optimally',
    isCore15: true,
    difficulty: 'Hard',
    whatIsIt: 'A method for solving complex optimization problems by breaking them down into simpler subproblems, solving each subproblem once, and storing their solutions (memoization or tabulation).',
    whyItWorks: 'Eliminates exponential recomputation (2^N) by recognizing overlapping subproblems (e.g. fib(5) computes fib(3) multiple times) and caching states in a table, dropping time complexity to polynomial O(N) or O(N*W).',
    whenToUse: [
      'Problem asks for maximum/minimum value, count of unique ways, or feasibility',
      'Optimal choice at current state depends on solutions to previous subproblems',
      'Fibonacci, Climbing Stairs, House Robber (1D DP)',
      '0/1 Knapsack, Coin Change, Subset Sum',
      'Longest Common Subsequence (LCS), Edit Distance (String 2D DP)',
      'Grid unique paths, minimum path sum'
    ],
    whenNotToUse: [
      'When problem has NO overlapping subproblems (e.g. Merge Sort is Divide & Conquer, not DP)',
      'When greedy choice is proven optimal (Greedy avoids computing all subproblems)',
      'When state space is too vast to fit in memory (need Branch and Bound or heuristics)'
    ],
    problemClues: [
      'Find the MAXIMUM profit or MINIMUM cost',
      'Count the NUMBER OF WAYS to reach target',
      'Can target be formed? (True/False)',
      'Choices made at index i affect remaining choices'
    ],
    javaDataStructures: ['int[] dp', 'int[][] dp', 'Integer[][] memo'],
    timeComplexity: 'O(N) for 1D, O(M * N) for 2D grids/strings',
    timeComplexityReason: 'Number of states multiplied by transition cost per state.',
    spaceComplexity: 'O(N) or O(M * N), often optimizable to O(1) or O(N)',
    spaceComplexityReason: 'Table storage size; can be reduced if state only depends on previous row or previous two variables.',
    commonMistakes: [
      'Confusing 1-based indexing in DP table with 0-based indexing of input strings/arrays',
      'Incorrect base cases leading to off-by-one or wrong boundary values',
      'Forgetting that Coin Change requires checking if subproblem is reachable (dp[i - coin] != Integer.MAX_VALUE) to prevent integer underflow',
      'Jumping straight to tabulation without defining the state relation mathematically first'
    ],
    edgeCases: [
      'Target is 0 (base case)',
      'Input array empty or target unreachable (return -1 or 0)',
      'Single element input',
      'Constraints requiring space optimization'
    ],
    interviewMemoryCard: {
      clue: 'Max/min, count of ways, can-do? Overlapping choices',
      think: '1. State: dp[i][j] meaning? 2. Base case? 3. Transition: dp[i] = max(dp[i-1], ...)? 4. Direction? 5. Space optimize?',
      typicalComplexity: 'Time: O(N) or O(M*N) | Space: O(N) or O(1)',
      commonTrap: 'Using Integer.MAX_VALUE + 1 which overflows to Integer.MIN_VALUE in min-cost problems.',
      javaSnippet: 'int[] dp = new int[n + 1];\ndp[0] = 0; dp[1] = 1;\nfor (int i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n}'
    },
    javaCode: `public class DynamicProgrammingFib {
    // Demonstrates DP transition: dp[i] = dp[i - 1] + dp[i - 2]
    public static int fibTabulation(int n) {
        if (n <= 1) return n;

        int[] dp = new int[n + 1];
        // 1. Base cases
        dp[0] = 0;
        dp[1] = 1;

        // 2. Tabulation bottom-up
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }

    // Space optimized O(1) version
    public static int fibSpaceOptimized(int n) {
        if (n <= 1) return n;
        int prev2 = 0, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
}`,
    defaultInputs: {
      label: 'Fibonacci N=6',
      input: 6
    },
    presetCases: [
      { label: 'Fibonacci N=6', input: 6 },
      { label: 'Fibonacci N=8', input: 8 },
      { label: 'Grid Paths 3x3', input: 3 }
    ],
    practiceProblems: [
      { id: '70', title: 'Climbing Stairs', difficulty: 'Easy', platform: 'LeetCode' },
      { id: '198', title: 'House Robber', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '322', title: 'Coin Change', difficulty: 'Medium', platform: 'LeetCode' },
      { id: '1143', title: 'Longest Common Subsequence', difficulty: 'Medium', platform: 'LeetCode' }
    ]
  }
];

// Full comprehensive 329 taxonomy categories for the library & search index
export interface TaxonomyCategory {
  title: string;
  count: number;
  description: string;
  techniques: string[];
}

export const COMPLETE_DSA_TAXONOMY: TaxonomyCategory[] = [
  {
    title: 'Array Patterns',
    count: 19,
    description: 'Direct index manipulations, window mechanics, prefix aggregations, and 2D matrix traversal techniques.',
    techniques: [
      'Array Traversal', 'Two Pointers', 'Sliding Window', 'Prefix Sum', 'Suffix Sum',
      'Difference Array', "Kadane's Algorithm", 'Dutch National Flag', 'Cyclic Sort',
      'In-place Array Manipulation', 'Array Partitioning', 'Subarray Problems', 'Subsequence Problems',
      'Matrix Traversal', 'Spiral Matrix', 'Diagonal Traversal', 'Boundary Traversal',
      '2D Prefix Sum', 'Coordinate/Direction Traversal'
    ]
  },
  {
    title: 'Searching',
    count: 11,
    description: 'Logarithmic search space halving, partition pivots, and monotonic answer-space optimizations.',
    techniques: [
      'Linear Search', 'Binary Search', 'Binary Search on Answer', 'Lower Bound',
      'Upper Bound', 'First Occurrence', 'Last Occurrence', 'Search in Rotated Sorted Array',
      'Peak Finding', 'Ternary Search', 'Quick Select'
    ]
  },
  {
    title: 'Hashing',
    count: 10,
    description: 'Constant-time bucket addressing, frequency tracking, complement discovery, and duplicate identification.',
    techniques: [
      'Frequency Counting', 'HashMap Lookup', 'HashSet Lookup', 'Complement Pattern',
      'Frequency Map', 'Grouping by Key', 'Prefix Sum + HashMap', 'Hashing for Subarrays',
      'Duplicate Detection', 'Anagram Pattern'
    ]
  },
  {
    title: 'Strings',
    count: 15,
    description: 'Character buffers, palindrome checks, rolling hashes, and advanced string matching algorithms.',
    techniques: [
      'Two Pointers on Strings', 'Sliding Window on Strings', 'Frequency Counting', 'Character Mapping',
      'Anagram', 'Palindrome', 'String Hashing', 'Prefix/Suffix Matching', 'StringBuilder',
      'Substring Problems', 'Subsequence Problems', 'Pattern Matching', 'KMP', 'Rabin-Karp', 'Z Algorithm'
    ]
  },
  {
    title: 'Linked List',
    count: 15,
    description: 'Pointer adjustments, Floyd cycle finding, reversal sublists, and multi-list merges.',
    techniques: [
      'Fast and Slow Pointers', 'Reverse Linked List', 'Reverse Sublist', 'Merge Two Lists',
      'Merge K Lists', 'Find Middle', 'Detect Cycle', 'Find Cycle Start', 'Remove Nth Node',
      'Intersection of Linked Lists', 'Palindrome Linked List', 'Reorder Linked List',
      'Split Linked List', 'Doubly Linked List', 'Circular Linked List'
    ]
  },
  {
    title: 'Stack',
    count: 15,
    description: 'LIFO order, monotonic stacks, expression parsing, parentheses balancing, and histogram bounds.',
    techniques: [
      'Stack Simulation', 'Monotonic Stack', 'Next Greater Element', 'Next Smaller Element',
      'Previous Greater Element', 'Previous Smaller Element', 'Valid Parentheses', 'Balanced Brackets',
      'Min Stack', 'Expression Evaluation', 'Infix to Postfix', 'Postfix Evaluation',
      'Largest Rectangle in Histogram', 'Stock Span', 'Remove K Digits'
    ]
  },
  {
    title: 'Queue / Deque',
    count: 7,
    description: 'FIFO buffers, monotonic double-ended queues, sliding window maximums, and level-order queues.',
    techniques: [
      'Queue Simulation', 'BFS Queue', 'Circular Queue', 'Deque', 'Monotonic Deque',
      'Sliding Window Maximum', 'Sliding Window Minimum'
    ]
  },
  {
    title: 'Heap / Priority Queue',
    count: 12,
    description: 'Priority ordering, top K ranking, two-heap medians, and K-way sorted merges.',
    techniques: [
      'Top K Elements', 'Kth Largest', 'Kth Smallest', 'K Most Frequent', 'K Closest Elements',
      'Two Heaps', 'Median from Data Stream', 'Merge K Sorted Lists', 'Merge K Sorted Arrays',
      'Scheduling with Heap', 'Min Heap', 'Max Heap'
    ]
  },
  {
    title: 'Binary Tree',
    count: 20,
    description: 'Hierarchical traversals, path sums, views, diameters, and recursive invariants.',
    techniques: [
      'Tree Traversal', 'Preorder', 'Inorder', 'Postorder', 'Level Order', 'Reverse Level Order',
      'Zigzag Traversal', 'Height / Depth', 'Diameter', 'Maximum Path Sum', 'Lowest Common Ancestor',
      'Symmetric Tree', 'Balanced Tree', 'Left View', 'Right View', 'Top View', 'Bottom View',
      'Boundary Traversal', 'Vertical Order Traversal', 'Serialize / Deserialize'
    ]
  },
  {
    title: 'Binary Search Tree',
    count: 11,
    description: 'Ordered binary trees, predecessor/successor lookups, validations, and BST reconstruction.',
    techniques: [
      'BST Search', 'BST Insert', 'BST Delete', 'Validate BST', 'Kth Smallest', 'Kth Largest',
      'LCA in BST', 'Inorder Successor', 'Inorder Predecessor', 'Sorted Array to BST', 'Recover BST'
    ]
  },
  {
    title: 'Graph & Traversals',
    count: 15,
    description: 'Adjacency representations, DFS, BFS, topological sorting, connected islands, and coloring.',
    techniques: [
      'Graph Representation', 'DFS', 'BFS', 'Connected Components', 'Cycle Detection - Undirected',
      'Cycle Detection - Directed', 'Number of Islands', 'Flood Fill', 'Shortest Path',
      'Multi-source BFS', 'Bipartite Graph', 'Topological Sort', 'Course Schedule',
      'Path Finding', 'Graph Coloring'
    ]
  },
  {
    title: 'Advanced Graph',
    count: 13,
    description: 'Weighted shortest paths, minimum spanning trees, disjoint sets, and strongly connected components.',
    techniques: [
      'Dijkstra', 'Bellman-Ford', 'Floyd-Warshall', 'Minimum Spanning Tree', "Prim's Algorithm",
      "Kruskal's Algorithm", 'Disjoint Set Union', 'Union Find', 'Strongly Connected Components',
      'Kosaraju', 'Tarjan', 'Bridges', 'Articulation Points'
    ]
  },
  {
    title: 'Recursion & Backtracking',
    count: 21,
    description: 'Choose-Explore-Undo, decision trees, permutations, combinations, and constraint satisfaction.',
    techniques: [
      'Basic Recursion', 'Recursive Traversal', 'Divide and Conquer', 'Recursion Tree', 'Backtracking',
      'Choose → Explore → Undo', 'Multiple Recursive Calls', 'Tail Recursion', 'Memoized Recursion',
      'Subsets', 'Subsets II', 'Permutations', 'Combinations', 'Combination Sum', 'N-Queens',
      'Sudoku', 'Rat in a Maze', 'Word Search', 'Generate Parentheses', 'Partitioning', 'Palindrome Partitioning'
    ]
  },
  {
    title: 'Greedy Algorithms',
    count: 11,
    description: 'Locally optimal decisions, interval scheduling, platform allocation, and coin distributions.',
    techniques: [
      'Greedy Selection', 'Activity Selection', 'Interval Scheduling', 'Fractional Knapsack',
      'Jump Game', 'Gas Station', 'Assign Cookies', 'Minimum Platforms', 'Job Sequencing',
      'Meeting Rooms', 'Huffman Coding'
    ]
  },
  {
    title: 'Dynamic Programming',
    count: 33,
    description: 'State memoization, bottom-up tabulation, knapsacks, strings, grids, and interval transitions.',
    techniques: [
      '1D DP', '2D DP', 'Memoization', 'Tabulation', 'State Transition', 'Base Case Design',
      'Fibonacci DP', 'Climbing Stairs', 'House Robber', 'Coin Change', '0/1 Knapsack',
      'Unbounded Knapsack', 'Subset Sum', 'Partition Equal Subset Sum', 'Target Sum',
      'Longest Common Subsequence', 'Longest Common Substring', 'Edit Distance',
      'Longest Palindromic Subsequence', 'Palindrome Partitioning DP', 'Longest Increasing Subsequence',
      'Longest Decreasing Subsequence', 'Maximum Sum Increasing Subsequence', 'Unique Paths',
      'Minimum Path Sum', 'Grid DP', 'Triangle DP', 'Interval DP', 'Bitmask DP', 'Tree DP',
      'Digit DP', 'DP on Subsequences', 'DP on Strings'
    ]
  },
  {
    title: 'Trie & Prefix Trees',
    count: 8,
    description: 'Prefix indexing, autocomplete dictionaries, wildcard searches, and bitwise XOR tries.',
    techniques: [
      'Trie Construction', 'Insert', 'Search', 'Prefix Search', 'Word Dictionary',
      'Word Search with Trie', 'Autocomplete', 'Maximum XOR Trie'
    ]
  },
  {
    title: 'Bit Manipulation',
    count: 14,
    description: 'Bitwise operators (&, |, ^, ~, <<, >>, >>>), bitmasks, subset generation, and parity checks.',
    techniques: [
      'AND', 'OR', 'XOR', 'NOT', 'Check Odd/Even', 'Check Power of Two', 'Set Bit',
      'Clear Bit', 'Toggle Bit', 'Count Set Bits', 'Bitmask', 'Subsets using Bitmask',
      'Prefix XOR', 'Maximum XOR'
    ]
  },
  {
    title: 'Mathematics & Number Theory',
    count: 13,
    description: 'Primes, Euclidean GCD, modular arithmetic, fast exponentiation, and combinatorics.',
    techniques: [
      'GCD', 'LCM', 'Euclidean Algorithm', 'Prime Checking', 'Sieve of Eratosthenes',
      'Prime Factorization', 'Fast Exponentiation', 'Modular Arithmetic', 'Modular Exponentiation',
      'Combinatorics', 'Permutations', 'Probability Basics', 'Matrix Exponentiation'
    ]
  },
  {
    title: 'Sorting Algorithms',
    count: 13,
    description: 'Comparison and non-comparison sorts, custom comparators, and hybrid sorting applications.',
    techniques: [
      'Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort',
      'Counting Sort', 'Radix Sort', 'Bucket Sort', 'Custom Comparator', 'Sorting + Two Pointers',
      'Sorting + Greedy', 'Sorting + Binary Search'
    ]
  },
  {
    title: 'Combination & Hybrid Patterns',
    count: 18,
    description: 'High-frequency interview combinations pairing multiple core patterns for optimal solutions.',
    techniques: [
      'Sorting + Two Pointers', 'HashMap + Prefix Sum', 'Sliding Window + HashMap',
      'Binary Search + Greedy', 'Binary Search + Prefix Sum', 'Heap + HashMap', 'Heap + Greedy',
      'DFS + Memoization', 'BFS + HashSet', 'BFS + Priority Queue', 'DFS + Backtracking',
      'Tree + DP', 'Graph + DP', 'Graph + Union Find', 'Stack + Greedy',
      'Monotonic Stack + DP', 'Binary Search + DP', 'Bitmask + DP'
    ]
  }
];
