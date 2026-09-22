import { Problem } from '../types';
import { TOP_INTERVIEW_PROBLEMS } from './topInterviewProblems';
import { TOP_INTERVIEW_PROBLEMS_PART2 } from './topInterviewProblemsPart2';
import { CONCEPT_PROBLEMS_PART1 } from './conceptProblemsData1';
import { CONCEPT_PROBLEMS_PART2 } from './conceptProblemsData2';
import { CONCEPT_PROBLEMS_PART3 } from './conceptProblemsData3';
import { CONCEPT_PROBLEMS_PART4 } from './conceptProblemsData4';
import { CONCEPT_PROBLEMS_PART5 } from './conceptProblemsData5';
import { CONCEPT_PROBLEMS_PART6 } from './conceptProblemsData6';
import { CONCEPT_PROBLEMS_PART7 } from './conceptProblemsData7';
import { CONCEPT_PROBLEMS_PART8 } from './conceptProblemsData8';
import { CONCEPT_PROBLEMS_PART9 } from './conceptProblemsData9';
import { CONCEPT_PROBLEMS_PART10 } from './conceptProblemsData10';
import { CONCEPT_PROBLEMS_PART11 } from './conceptProblemsData11';
import { CONCEPT_PROBLEMS_PART12 } from './conceptProblemsData12';

const BASE_PATTERN_PROBLEMS: Problem[] = [
  {
    id: 'two-sum-sorted',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Easy',
    patternId: 'two-pointers',
    patternName: 'Two Pointers',
    category: 'Arrays & Two Pointers',
    description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers, index1 and index2, added by one.',
    examples: [
      {
        input: 'numbers = [2, 7, 11, 15], target = 9',
        output: '[1, 2]',
        explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].'
      },
      {
        input: 'numbers = [2, 3, 4], target = 6',
        output: '[1, 3]',
        explanation: 'The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].'
      }
    ],
    constraints: [
      '2 <= numbers.length <= 3 * 10^4',
      '-1000 <= numbers[i] <= 1000',
      'numbers is sorted in non-decreasing order',
      '-1000 <= target <= 1000',
      'Tests are generated such that there is exactly one solution'
    ],
    patternClues: [
      'Array is already sorted in non-decreasing order',
      'Asked to find a pair of indices whose values satisfy an equality condition',
      'Guaranteed exactly one unique solution',
      'Constant space O(1) desired'
    ],
    bruteForce: {
      approach: 'Check all pairs (i, j) with nested loops where i < j.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Checking all pairs redundantly without leveraging the sorted order of the elements.'
    },
    optimizedApproach: {
      concept: 'Two Pointers moving inwards from opposite extremities.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      keyIdea: 'Because the array is sorted, if numbers[left] + numbers[right] < target, no element paired with numbers[left] can reach target, so left can be incremented. If sum > target, right can be decremented.'
    },
    hints: [
      'Stage 1: Can we use the fact that the array is already sorted to eliminate useless checks?',
      'Stage 2: What happens if the sum of the smallest number and largest number is less than target?',
      'Stage 3: Place one pointer at 0 and one at N-1. Move one pointer per iteration based on sum vs target.'
    ],
    pseudocode: `left = 0, right = n - 1
while left < right:
    sum = nums[left] + nums[right]
    if sum == target:
        return [left + 1, right + 1]
    else if sum < target:
        left++
    else:
        right--`,
    javaSolution: `public class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];

            if (sum == target) {
                // Return 1-indexed positions
                return new int[]{left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }

        return new int[]{-1, -1};
    }
}`,
    starterCode: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
    testCases: [
      { input: '[2, 7, 11, 15], target = 9', expectedOutput: '[1, 2]' },
      { input: '[2, 3, 4], target = 6', expectedOutput: '[1, 3]' },
      { input: '[-1, 0], target = -1', expectedOutput: '[1, 2]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'left=0(2), right=3(15), sum=17', action: '17 > 9 -> right--', outcome: 'right becomes 2' },
      { step: 2, vars: 'left=0(2), right=2(11), sum=13', action: '13 > 9 -> right--', outcome: 'right becomes 1' },
      { step: 3, vars: 'left=0(2), right=1(7), sum=9', action: '9 == 9 -> MATCH!', outcome: 'return [1, 2]' }
    ],
    edgeCases: [
      'Two elements only',
      'Negative numbers in array',
      'Target is negative',
      'Target equals 0'
    ],
    commonMistakes: [
      'Returning 0-indexed values when question explicitly requests 1-indexed values',
      'Using left <= right instead of left < right (cannot use the same element twice)'
    ],
    interviewExplanationScript: '"Since the array is sorted, we can avoid the quadratic brute force and the O(N) space of a HashMap by using two pointers at the two ends. If the sum is smaller than the target, we must increase the sum by shifting the left pointer right. If the sum is larger, we decrement the right pointer. This converges in O(N) time with O(1) space."'
  },
  {
    id: 'max-subarray-k',
    title: 'Maximum Average Subarray I',
    difficulty: 'Easy',
    patternId: 'sliding-window',
    patternName: 'Sliding Window',
    category: 'Arrays & Sliding Window',
    description: 'You are given an integer array nums consisting of n elements, and an integer k. Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.',
    examples: [
      {
        input: 'nums = [1, 12, -5, -6, 50, 3], k = 4',
        output: '12.75000',
        explanation: 'Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75'
      }
    ],
    constraints: [
      'n == nums.length',
      '1 <= k <= n <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    patternClues: [
      'Fixed window size of contiguous elements of length K',
      'Looking for maximum average (which is directly equivalent to maximum sum)',
      'Subarray is strictly contiguous'
    ],
    bruteForce: {
      approach: 'For each index i from 0 to N-K, compute the sum of K elements using an inner loop.',
      timeComplexity: 'O(N * K)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Summing overlapping elements repeatedly.'
    },
    optimizedApproach: {
      concept: 'Fixed-size Sliding Window of length K.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      keyIdea: 'Slide the window rightwards by adding nums[i] and subtracting nums[i - k] in O(1) time.'
    },
    hints: [
      'Stage 1: Can you compute the sum of the first k elements first?',
      'Stage 2: When you slide the window by 1 position, how does the sum change?',
      'Stage 3: New sum = Old sum + nums[i] - nums[i - k].'
    ],
    pseudocode: `sum = sum(nums[0..k-1])
maxSum = sum
for i from k to n - 1:
    sum += nums[i] - nums[i - k]
    maxSum = max(maxSum, sum)
return maxSum / k`,
    javaSolution: `public class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int sum = 0;
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }

        int maxSum = sum;
        for (int i = k; i < nums.length; i++) {
            sum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, sum);
        }

        return (double) maxSum / k;
    }
}`,
    starterCode: `class Solution {
    public double findMaxAverage(int[] nums, int k) {
        // Write your solution here
        return 0.0;
    }
}`,
    testCases: [
      { input: 'nums = [1, 12, -5, -6, 50, 3], k = 4', expectedOutput: '12.75000' },
      { input: 'nums = [5], k = 1', expectedOutput: '5.00000' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'Window [1, 12, -5, -6], sum=2', action: 'Initial k=4 window sum', outcome: 'maxSum = 2' },
      { step: 2, vars: 'Slide -> add 50, remove 1, sum=51', action: 'nums[4] in, nums[0] out', outcome: 'maxSum = 51' },
      { step: 3, vars: 'Slide -> add 3, remove 12, sum=42', action: 'nums[5] in, nums[1] out', outcome: 'maxSum remains 51' },
      { step: 4, vars: 'Final division: 51 / 4.0', action: 'Divide by k', outcome: 'Return 12.75' }
    ],
    edgeCases: [
      'k equals array length (only 1 window possible)',
      'All elements are negative',
      'k = 1'
    ],
    commonMistakes: [
      'Dividing before finding maximum sum (leads to precision issues)',
      'Integer division without casting to (double)'
    ],
    interviewExplanationScript: '"To avoid recalculating the sum of K elements from scratch at every step, we initialize a window sum of the first K elements. Then, for each subsequent element, we slide the window by adding the new element on the right and subtracting the element leaving on the left in O(1). We then divide the maximum sum by K."'
  },
  {
    id: 'next-greater-element',
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    patternId: 'monotonic-stack',
    patternName: 'Monotonic Stack',
    category: 'Stack',
    description: 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0.',
    examples: [
      {
        input: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]',
        output: '[1, 1, 4, 2, 1, 1, 0, 0]'
      }
    ],
    constraints: [
      '1 <= temperatures.length <= 10^5',
      '30 <= temperatures[i] <= 100'
    ],
    patternClues: [
      'Find the first greater element to the right for each index',
      'Compute distance between current index and next greater index',
      'O(N) time required on up to 10^5 elements'
    ],
    bruteForce: {
      approach: 'For each day i, iterate through days j > i until a warmer temperature is found.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Searching repeatedly forward for days that could be resolved in batch.'
    },
    optimizedApproach: {
      concept: 'Monotonic Decreasing Stack storing indices.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      keyIdea: 'Push indices onto stack. When the current temperature is warmer than temperatures[stack.peek()], pop and set answer[popped] = current - popped.'
    },
    hints: [
      'Stage 1: Can you store indices whose answers have not been found yet in a data structure?',
      'Stage 2: If tomorrow is warmer than today, today is immediately resolved. What if tomorrow is colder?',
      'Stage 3: Keep unresolved indices in a stack with temperatures in decreasing order.'
    ],
    pseudocode: `stack = empty stack of indices
answer = array of size n with 0s
for i from 0 to n - 1:
    while !stack.isEmpty() and temp[i] > temp[stack.peek()]:
        prev = stack.pop()
        answer[prev] = i - prev
    stack.push(i)
return answer`,
    javaSolution: `public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevDay = stack.pop();
                answer[prevDay] = i - prevDay;
            }
            stack.push(i);
        }

        return answer;
    }
}`,
    starterCode: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        // Write your solution here
        return new int[]{};
    }
}`,
    testCases: [
      { input: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]', expectedOutput: '[1, 1, 4, 2, 1, 1, 0, 0]' },
      { input: 'temperatures = [30, 40, 50, 60]', expectedOutput: '[1, 1, 1, 0]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'i=0 (73), stack=[]', action: 'Push 0', outcome: 'stack=[0]' },
      { step: 2, vars: 'i=1 (74), stack=[0]', action: '74 > 73 -> pop 0', outcome: 'ans[0] = 1 - 0 = 1, push 1' },
      { step: 3, vars: 'i=2 (75), stack=[1]', action: '75 > 74 -> pop 1', outcome: 'ans[1] = 2 - 1 = 1, push 2' }
    ],
    edgeCases: [
      'Strictly decreasing temperatures (all 0s in output)',
      'Strictly increasing temperatures (all 1s except last)',
      'Single day'
    ],
    commonMistakes: [
      'Storing temperatures instead of indices in stack',
      'Using java.util.Stack instead of ArrayDeque'
    ],
    interviewExplanationScript: '"We maintain a monotonic decreasing stack of indices. For each day, if the current temperature is warmer than the temperature at the index on top of the stack, we have found that days warmer day. We pop the index, calculate the difference in days, and repeat until the stack is monotonic again."'
  },
  {
    id: 'kth-largest-element',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    patternId: 'top-k-elements',
    patternName: 'Top K Elements',
    category: 'Heap & PriorityQueue',
    description: 'Given an integer array nums and an integer k, return the kth largest element in the array. Can you solve it without sorting in O(N log N)?',
    examples: [
      {
        input: 'nums = [3, 2, 1, 5, 6, 4], k = 2',
        output: '5',
        explanation: 'The sorted array is [1, 2, 3, 4, 5, 6], so the 2nd largest is 5.'
      }
    ],
    constraints: [
      '1 <= k <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    patternClues: [
      'Looking for Kth largest / smallest element',
      'K is significantly smaller than N',
      'Streaming or large dataset'
    ],
    bruteForce: {
      approach: 'Sort the entire array in descending order and return nums[k - 1].',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(1) to O(N)',
      bottleneck: 'Sorting all N elements when we only care about the top K.'
    },
    optimizedApproach: {
      concept: 'Min-Heap of bounded size K.',
      timeComplexity: 'O(N log K)',
      spaceComplexity: 'O(K)',
      keyIdea: 'Maintain a PriorityQueue of size K. The root will always contain the smallest of the top K elements, which is the K-th largest overall.'
    },
    hints: [
      'Stage 1: Do you really need to sort all N elements?',
      'Stage 2: What happens if you keep a Min-Heap of size K?',
      'Stage 3: If you insert every number and discard when size > K, the K largest numbers remain, and the root is the Kth largest.'
    ],
    pseudocode: `minHeap = new PriorityQueue()
for num in nums:
    minHeap.offer(num)
    if minHeap.size() > k:
        minHeap.poll()
return minHeap.peek()`,
    javaSolution: `public class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        return minHeap.peek();
    }
}`,
    starterCode: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [3, 2, 1, 5, 6, 4], k = 2', expectedOutput: '5' },
      { input: 'nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4', expectedOutput: '4' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'num=3, 2, 1', action: 'Offer first 3 elements', outcome: 'heap=[1, 2, 3]' },
      { step: 2, vars: 'num=5', action: 'Offer 5 -> size 4 -> poll min (1)', outcome: 'heap=[2, 3, 5]' },
      { step: 3, vars: 'num=6', action: 'Offer 6 -> size 4 -> poll min (2)', outcome: 'heap=[3, 5, 6]' },
      { step: 4, vars: 'num=4', action: 'Offer 4 -> size 4 -> poll min (3)', outcome: 'heap=[4, 5, 6], root=4 (if k=3)' }
    ],
    edgeCases: [
      'k = 1 (find maximum)',
      'k = nums.length (find minimum)',
      'Array contains many duplicate values'
    ],
    commonMistakes: [
      'Using a Max-Heap instead of a Min-Heap (Max-Heap requires storing all N elements)',
      'Not specifying comparator when sorting custom pairs'
    ],
    interviewExplanationScript: '"We can use a Min-Heap of size K. As we iterate through the array, we push each element into the heap. Whenever the heap size exceeds K, we poll the minimum element. After processing all elements, the heap contains the K largest elements, and the root is the smallest among them—which is the Kth largest element. This runs in O(N log K) time and O(K) space."'
  }
];

function resolveConcept(p: Problem): { conceptId: string; conceptName: string } {
  if (p.conceptId && p.conceptName) {
    return { conceptId: p.conceptId, conceptName: p.conceptName };
  }
  const pid = (p.patternId || '').toLowerCase();
  const cat = (p.category || '').toLowerCase();
  if (pid.includes('two-pointer') || cat.includes('two pointer')) return { conceptId: 'two-pointers', conceptName: 'Two Pointers (Inward & Outward Scan)' };
  if (pid.includes('sliding-window') || cat.includes('sliding window')) return { conceptId: 'sliding-window', conceptName: 'Sliding Window (Fixed & Variable)' };
  if (pid.includes('fast-slow') || cat.includes('fast') || cat.includes('slow')) return { conceptId: 'fast-slow-pointers', conceptName: 'Fast & Slow Pointers (Tortoise & Hare)' };
  if (pid.includes('stack') || cat.includes('stack')) return { conceptId: 'stack', conceptName: 'Stack & Monotonic Stack' };
  if (pid.includes('linked-list') || cat.includes('linked list')) return { conceptId: 'linked-list', conceptName: 'In-Place Linked List Operations' };
  if (pid.includes('binary-search') || cat.includes('binary search')) return { conceptId: 'binary-search', conceptName: 'Binary Search & Range Bisection' };
  if (pid.includes('tree-dfs') || cat.includes('trees & bst') || cat.includes('tree')) return { conceptId: 'trees-dfs', conceptName: 'Tree DFS (Pre/In/Post-Order Recursion)' };
  if (pid.includes('tree-bfs')) return { conceptId: 'trees-bfs', conceptName: 'Tree BFS & Level-Order Traversal' };
  if (pid.includes('bst') || cat.includes('bst')) return { conceptId: 'binary-search-tree', conceptName: 'Binary Search Tree (BST) Invariants' };
  if (pid.includes('heap') || pid.includes('top-k') || cat.includes('heap')) return { conceptId: 'heaps-pq', conceptName: 'Heaps & PriorityQueues (Top-K)' };
  if (pid.includes('backtrack') || cat.includes('backtrack')) return { conceptId: 'backtracking', conceptName: 'Backtracking & State Exploration' };
  if (pid.includes('graph') || pid.includes('topological') || cat.includes('graph')) return { conceptId: 'graphs', conceptName: 'Graph BFS / DFS & Topological Sort' };
  if (pid.includes('interval') || cat.includes('interval')) return { conceptId: 'intervals', conceptName: 'Intervals & Greedy Scheduling' };
  if (pid.includes('bit') || cat.includes('bit')) return { conceptId: 'bit-manipulation', conceptName: 'Bit Manipulation & XOR Properties' };
  if (pid.includes('dynamic') || cat.includes('dynamic') || cat.includes('dp')) return { conceptId: '1d-dp', conceptName: '1D Dynamic Programming' };
  return { conceptId: 'arrays-hashing', conceptName: 'Arrays & Hashing' };
}

const RAW_COMBINED_PROBLEMS: Problem[] = [
  ...BASE_PATTERN_PROBLEMS,
  ...TOP_INTERVIEW_PROBLEMS,
  ...TOP_INTERVIEW_PROBLEMS_PART2,
  ...CONCEPT_PROBLEMS_PART1,
  ...CONCEPT_PROBLEMS_PART2,
  ...CONCEPT_PROBLEMS_PART3,
  ...CONCEPT_PROBLEMS_PART4,
  ...CONCEPT_PROBLEMS_PART5,
  ...CONCEPT_PROBLEMS_PART6,
  ...CONCEPT_PROBLEMS_PART7,
  ...CONCEPT_PROBLEMS_PART8,
  ...CONCEPT_PROBLEMS_PART9,
  ...CONCEPT_PROBLEMS_PART10,
  ...CONCEPT_PROBLEMS_PART11,
  ...CONCEPT_PROBLEMS_PART12
];

// Deduplicate by problem ID, preserving full metadata and assigning concept identifiers
const seenIds = new Set<string>();
export const PROBLEMS_DATA: Problem[] = [];

for (const p of RAW_COMBINED_PROBLEMS) {
  if (!seenIds.has(p.id)) {
    seenIds.add(p.id);
    const { conceptId, conceptName } = resolveConcept(p);
    PROBLEMS_DATA.push({
      ...p,
      conceptId: p.conceptId || conceptId,
      conceptName: p.conceptName || conceptName
    });
  }
}


