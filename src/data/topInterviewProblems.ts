import { Problem } from '../types';

export const TOP_INTERVIEW_PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    leetcodeNumber: 1,
    difficulty: 'Easy',
    patternId: 'hash-map',
    patternName: 'Hash Table & Complements',
    category: 'Arrays & Hashing',
    conceptName: 'Hash Table Single-Pass Complement Lookup',
    acceptanceRate: '54.2%',
    frequency: 'Top Placement (Most Asked Ever)',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Bloomberg', 'Uber'],
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
        explanation: 'Both 3s add up to 6.'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    patternClues: [
      'Finding pair summing to target: complement = target - nums[i]',
      'Unsorted array with index retrieval requires O(1) value-to-index lookup',
      'Single pass avoids nested O(N²) traversal'
    ],
    bruteForce: {
      approach: 'Nested loops checking all pairs (i, j) where i < j.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Checking redundant pairs without caching previously seen values.'
    },
    optimizedApproach: {
      concept: 'Single-Pass HashMap storing {element: index}.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      keyIdea: 'For each element nums[i], calculate complement = target - nums[i]. Check if map contains complement; if yes, return [map.get(complement), i]. Otherwise put nums[i] into map.'
    },
    hints: [
      'What if you store the numbers you have seen so far in a HashMap?',
      'As you iterate, what number do you need to add to the current number to get target?',
      'Check if target - nums[i] is already in the map before inserting nums[i].'
    ],
    pseudocode: `map = new HashMap()
for i from 0 to nums.length - 1:
    complement = target - nums[i]
    if map.containsKey(complement):
        return [map.get(complement), i]
    map.put(nums[i], i)
return []`,
    javaSolution: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Map stores value -> index
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }

        // Guaranteed to have a solution per problem constraints
        throw new IllegalArgumentException("No two sum solution");
    }
}`,
    starterCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`,
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]' }
    ],
    hiddenTestCases: [
      { input: 'nums = [1, 5, 8, 3], target = 8', expectedOutput: '[1, 3]' },
      { input: 'nums = [-3, 4, 3, 90], target = 0', expectedOutput: '[0, 2]' },
      { input: 'nums = [1000000000, -1000000000], target = 0', expectedOutput: '[0, 1]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'i=0, num=2, comp=7', action: 'Check map for 7 (absent)', outcome: 'map={2:0}' },
      { step: 2, vars: 'i=1, num=7, comp=2', action: 'Check map for 2 (found at idx 0)', outcome: 'return [0, 1]' }
    ],
    edgeCases: [
      'Duplicate elements adding to target (e.g. [3, 3], target = 6)',
      'Negative values and zero',
      'Target resulting in large integer overflow if not handled carefully'
    ],
    commonMistakes: [
      'Inserting all elements into the map before checking (leads to using the same index twice when target = 2 * nums[i])',
      'Using nested loops resulting in O(N²) Time Limit Exceeded'
    ],
    interviewExplanationScript: '"To avoid the quadratic time complexity of checking all pairs, I use a HashMap to achieve linear time. As I iterate through the array, I calculate the complement needed to reach the target. If the complement is already present in our map, we have found our answer in O(1) lookup time. Otherwise, we record the current number and its index. This achieves O(N) time and O(N) auxiliary space."'
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    leetcodeNumber: 121,
    difficulty: 'Easy',
    patternId: 'dynamic-programming',
    patternName: 'Greedy / Prefix Min Tracking',
    category: 'Dynamic Programming',
    conceptName: 'Single-Pass Prefix Minimum & Peak Profit Tracking',
    acceptanceRate: '54.9%',
    frequency: 'Very High (FAANG Favorite)',
    companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Google', 'Meta', 'Goldman Sachs'],
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples: [
      {
        input: 'prices = [7, 1, 5, 3, 6, 4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.'
      },
      {
        input: 'prices = [7, 6, 4, 3, 1]',
        output: '0',
        explanation: 'In this case, no transactions are done and max profit = 0.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    patternClues: [
      'Must buy before selling (temporal order constraint)',
      'Looking for maximum difference between prices[j] - prices[i] where j > i',
      'Track the minimum price seen so far as the optimal buy day'
    ],
    bruteForce: {
      approach: 'Compare all pairs (i, j) where i < j and compute prices[j] - prices[i].',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Redundantly recalculating min price for every future day.'
    },
    optimizedApproach: {
      concept: 'Single pass maintaining minPriceSoFar and maxProfitSoFar.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      keyIdea: 'At day i, the best price to have bought at is the minimum price observed between day 0 and day i-1. The maximum profit if sold today is prices[i] - minPrice. We update maxProfit and minPrice accordingly.'
    },
    hints: [
      'If you were to sell on day i, when should you have bought the stock?',
      'You should have bought at the lowest price between day 0 and day i.',
      'Maintain the minimum price seen so far in a single loop.'
    ],
    pseudocode: `minPrice = infinity
maxProfit = 0
for price in prices:
    if price < minPrice:
        minPrice = price
    else if price - minPrice > maxProfit:
        maxProfit = price - minPrice
return maxProfit`,
    javaSolution: `public class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }

        return maxProfit;
    }
}`,
    starterCode: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'prices = [7, 1, 5, 3, 6, 4]', expectedOutput: '5' },
      { input: 'prices = [7, 6, 4, 3, 1]', expectedOutput: '0' }
    ],
    hiddenTestCases: [
      { input: 'prices = [2, 4, 1]', expectedOutput: '2' },
      { input: 'prices = [3, 2, 6, 5, 0, 3]', expectedOutput: '4' },
      { input: 'prices = [1]', expectedOutput: '0' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'price=7', action: 'minPrice=7, profit=0', outcome: 'maxProfit=0' },
      { step: 2, vars: 'price=1', action: 'minPrice=1, profit=0', outcome: 'maxProfit=0' },
      { step: 3, vars: 'price=5', action: 'profit=5-1=4', outcome: 'maxProfit=4' },
      { step: 4, vars: 'price=3', action: 'profit=3-1=2', outcome: 'maxProfit=4' },
      { step: 5, vars: 'price=6', action: 'profit=6-1=5', outcome: 'maxProfit=5' },
      { step: 6, vars: 'price=4', action: 'profit=4-1=3', outcome: 'maxProfit=5' }
    ],
    edgeCases: [
      'Strictly decreasing prices (returns 0, no negative profit)',
      'Array length of 1 (cannot sell, returns 0)',
      'All equal prices (returns 0)'
    ],
    commonMistakes: [
      'Finding the absolute maximum and absolute minimum in the entire array without respecting day order (buy must precede sell)',
      'Nested loops causing TLE on 10^5 elements'
    ],
    interviewExplanationScript: '"Instead of testing every buy-sell pair in O(N²), we realize that if we sell on day i, our optimal buy point was the minimum price seen up to day i. We can keep track of minPrice and maxProfit in a single pass in O(N) time and O(1) space."'
  },
  {
    id: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    leetcodeNumber: 3,
    difficulty: 'Medium',
    patternId: 'sliding-window',
    patternName: 'Dynamic Sliding Window',
    category: 'Sliding Window',
    conceptName: 'Sliding Window with Last-Seen Index Map',
    acceptanceRate: '35.6%',
    frequency: 'Top Placement (Google / Amazon / Meta)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'Uber'],
    description: 'Given a string s, find the length of the longest substring without duplicate characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    patternClues: [
      'Contiguous substring condition',
      'Distinct/unique element requirement',
      'Dynamic boundary adjustment (sliding window)'
    ],
    bruteForce: {
      approach: 'Generate all substrings and check each with a HashSet for duplicates.',
      timeComplexity: 'O(N³)',
      spaceComplexity: 'O(min(N, M))',
      bottleneck: 'Redundantly inspecting overlapping substrings from scratch.'
    },
    optimizedApproach: {
      concept: 'Sliding window [left, right] with last seen character index map.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(min(N, AlphabetSize))',
      keyIdea: 'Expand right pointer. If char s[right] was seen inside the current window (lastSeenIndex >= left), jump left pointer directly to lastSeenIndex + 1. Update maxLen and record new index.'
    },
    hints: [
      'Use two pointers to define a valid sliding window [left, right].',
      'Store each character and its most recent index in a map or integer array.',
      'When you see a duplicate, jump the left pointer forward past the previous occurrence.'
    ],
    pseudocode: `left = 0, maxLen = 0
lastSeen = new int[128] initialized to -1
for right from 0 to s.length - 1:
    c = s.charAt(right)
    if lastSeen[c] >= left:
        left = lastSeen[c] + 1
    lastSeen[c] = right
    maxLen = max(maxLen, right - left + 1)
return maxLen`,
    javaSolution: `import java.util.Arrays;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Fast direct indexing for ASCII characters
        int[] lastIndex = new int[128];
        Arrays.fill(lastIndex, -1);

        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastIndex[c] >= left) {
                // Duplicate found inside current window: jump left pointer
                left = lastIndex[c] + 1;
            }
            lastIndex[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,
    starterCode: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 's = "abcabcbb"', expectedOutput: '3' },
      { input: 's = "bbbbb"', expectedOutput: '1' },
      { input: 's = "pwwkew"', expectedOutput: '3' }
    ],
    hiddenTestCases: [
      { input: 's = ""', expectedOutput: '0' },
      { input: 's = " "', expectedOutput: '1' },
      { input: 's = "dvdf"', expectedOutput: '3' },
      { input: 's = "abba"', expectedOutput: '2' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'right=0, c=a', action: 'Expand window [0..0]', outcome: 'maxLen=1' },
      { step: 2, vars: 'right=1, c=b', action: 'Expand window [0..1]', outcome: 'maxLen=2' },
      { step: 3, vars: 'right=2, c=c', action: 'Expand window [0..2]', outcome: 'maxLen=3' },
      { step: 4, vars: 'right=3, c=a', action: 'Duplicate a at idx 0 >= left(0) -> left=1', outcome: 'window=[1..3], maxLen=3' }
    ],
    edgeCases: [
      'Empty string (returns 0)',
      'Single character or spaces (returns 1)',
      'All identical characters (returns 1)',
      'abba pattern where previous duplicate is behind current left pointer'
    ],
    commonMistakes: [
      'Not verifying that lastSeen[c] >= left (accidentally moving left backwards on stale indices like in "abba")',
      'Using a HashSet and moving left by 1 each time instead of jumping directly'
    ],
    interviewExplanationScript: '"I maintain a sliding window [left, right] using an array to store each character\'s most recent index. When character s[right] has been seen within our current window, we jump left to its last seen index + 1. This guarantees each character is processed at most once, providing an O(N) time and O(min(N, M)) space solution."'
  },
  {
    id: '3sum',
    title: '3Sum',
    leetcodeNumber: 15,
    difficulty: 'Medium',
    patternId: 'two-pointers',
    patternName: 'Sorting & Inward Two Pointers',
    category: 'Two Pointers',
    conceptName: 'Sort & Inward Two-Pointer Triplet Search with Duplicate Skipping',
    acceptanceRate: '34.8%',
    frequency: 'Top Placement (Meta / Amazon / Google)',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
    examples: [
      {
        input: 'nums = [-1, 0, 1, 2, -1, -4]',
        output: '[[-1, -1, 2], [-1, 0, 1]]',
        explanation: 'Distinct triplets summing to 0 are [-1, 0, 1] and [-1, -1, 2].'
      },
      {
        input: 'nums = [0, 1, 1]',
        output: '[]',
        explanation: 'The only possible triplet does not sum up to 0.'
      },
      {
        input: 'nums = [0, 0, 0]',
        output: '[[0, 0, 0]]',
        explanation: 'The only possible triplet sums up to 0.'
      }
    ],
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    patternClues: [
      'Finding 3 numbers satisfying a condition: fix 1 and use Two Pointers for the remaining 2',
      'No duplicate triplets allowed in output: sort array first to skip duplicates easily',
      'Target is 0: if nums[i] > 0 in sorted array, no three numbers can sum to 0'
    ],
    bruteForce: {
      approach: 'Three nested loops O(N³) with a HashSet of sorted triplets.',
      timeComplexity: 'O(N³)',
      spaceComplexity: 'O(N)',
      bottleneck: 'Combinatorial cubic exploration of all triplets.'
    },
    optimizedApproach: {
      concept: 'Sort array + fix nums[i] + inward two pointers (left, right).',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1) excluding output list',
      keyIdea: 'Sort nums in ascending order. Loop i from 0 to n-3. If nums[i] == nums[i-1], skip to avoid duplicates. Set left = i + 1, right = n - 1. If sum == 0, record triplet and skip duplicate left and right elements.'
    },
    hints: [
      'Sorting the array makes handling duplicate triplets much simpler.',
      'Fix the first element nums[i]. The problem reduces to finding two numbers that sum to -nums[i].',
      'Use Two Pointers moving inward from both ends to solve the subproblem in O(N).'
    ],
    pseudocode: `sort(nums)
res = []
for i from 0 to nums.length - 3:
    if nums[i] > 0: break
    if i > 0 and nums[i] == nums[i-1]: continue
    left = i + 1, right = nums.length - 1
    while left < right:
        sum = nums[i] + nums[left] + nums[right]
        if sum == 0:
            res.add([nums[i], nums[left], nums[right]])
            while left < right and nums[left] == nums[left+1]: left++
            while left < right and nums[right] == nums[right-1]: right--
            left++; right--
        else if sum < 0: left++
        else: right--
return res`,
    javaSolution: `import java.util.*;

public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        if (nums == null || nums.length < 3) return result;

        Arrays.sort(nums);

        for (int i = 0; i < nums.length - 2; i++) {
            // Optimization: if first element is > 0, sum cannot be 0
            if (nums[i] > 0) break;

            // Skip duplicate first elements
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));

                    // Skip duplicate second elements
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    // Skip duplicate third elements
                    while (left < right && nums[right] == nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return result;
    }
}`,
    starterCode: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    testCases: [
      { input: 'nums = [-1, 0, 1, 2, -1, -4]', expectedOutput: '[[-1, -1, 2], [-1, 0, 1]]' },
      { input: 'nums = [0, 1, 1]', expectedOutput: '[]' },
      { input: 'nums = [0, 0, 0]', expectedOutput: '[[0, 0, 0]]' }
    ],
    hiddenTestCases: [
      { input: 'nums = [-2, 0, 1, 1, 2]', expectedOutput: '[[-2, 0, 2], [-2, 1, 1]]' },
      { input: 'nums = [-1, -1, -1, 2, 2]', expectedOutput: '[[-1, -1, 2]]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'sorted=[-4, -1, -1, 0, 1, 2]', action: 'i=0 (nums[0]=-4), left=1, right=5', outcome: 'no triplet sums to 0' },
      { step: 2, vars: 'i=1 (nums[1]=-1)', action: 'left=2 (nums[2]=-1), right=5 (nums[5]=2)', outcome: 'sum = -1 + -1 + 2 = 0 -> add [-1, -1, 2]' },
      { step: 3, vars: 'i=1 continued', action: 'left=3 (0), right=4 (1)', outcome: 'sum = -1 + 0 + 1 = 0 -> add [-1, 0, 1]' }
    ],
    edgeCases: [
      'All zeroes [0, 0, 0, 0]',
      'No triplets summing to zero',
      'Extreme duplicates like [-2, -2, -2, 1, 1, 1, 1]'
    ],
    commonMistakes: [
      'Not sorting before applying two pointers',
      'Failing to skip duplicate values for i, left, and right, leading to duplicated triplets in output',
      'Prematurely terminating loops'
    ],
    interviewExplanationScript: '"To eliminate duplicate triplets without expensive set hashing, we sort the array first in O(N log N). Then we fix the first element nums[i] and use inward two pointers for the remaining pair. Because the array is sorted, we can skip consecutive identical values at each pointer. This reduces the time complexity to O(N²) with O(1) extra space."'
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    leetcodeNumber: 42,
    difficulty: 'Hard',
    patternId: 'two-pointers',
    patternName: 'Two Pointers / Boundary Maxima',
    category: 'Two Pointers',
    conceptName: 'Two-Pointer Opposing Boundary Invariant',
    acceptanceRate: '61.5%',
    frequency: 'Top Placement (Google, Amazon, Goldman Sachs)',
    companies: ['Google', 'Amazon', 'Meta', 'Goldman Sachs', 'Microsoft', 'Apple', 'Bloomberg'],
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      {
        input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]',
        output: '6',
        explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.'
      },
      {
        input: 'height = [4, 2, 0, 3, 2, 5]',
        output: '9',
        explanation: 'Total trapped water is 9 units.'
      }
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    patternClues: [
      'Water trapped above bar i is min(maxLeft, maxRight) - height[i]',
      'The bottleneck is always the smaller of maxLeft and maxRight',
      'Two pointers moving towards the highest peak solve it in O(1) space'
    ],
    bruteForce: {
      approach: 'For each element, scan left to find maxLeft and right to find maxRight.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Recomputing left and right maxima repeatedly for every bar.'
    },
    optimizedApproach: {
      concept: 'Two pointers (left, right) tracking leftMax and rightMax.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      keyIdea: 'Maintain left = 0, right = n-1. If height[left] <= height[right], we know leftMax is the true limiting boundary (even without knowing the exact rightMax, we know there is a bar on the right >= height[left]). We process left and increment. Otherwise, we process right and decrement.'
    },
    hints: [
      'How much water can a single bar at index i hold?',
      'Water at i depends on: min(maxLeftHeight, maxRightHeight) - height[i].',
      'If height[left] < height[right], water trapped at left is determined strictly by leftMax.'
    ],
    pseudocode: `left = 0, right = n - 1
leftMax = 0, rightMax = 0
totalWater = 0
while left < right:
    if height[left] < height[right]:
        if height[left] >= leftMax:
            leftMax = height[left]
        else:
            totalWater += leftMax - height[left]
        left++
    else:
        if height[right] >= rightMax:
            rightMax = height[right]
        else:
            totalWater += rightMax - height[right]
        right--
return totalWater`,
    javaSolution: `public class Solution {
    public int trap(int[] height) {
        if (height == null || height.length < 3) return 0;

        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int totalWater = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    totalWater += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    totalWater += rightMax - height[right];
                }
                right--;
            }
        }

        return totalWater;
    }
}`,
    starterCode: `class Solution {
    public int trap(int[] height) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]', expectedOutput: '6' },
      { input: 'height = [4, 2, 0, 3, 2, 5]', expectedOutput: '9' }
    ],
    hiddenTestCases: [
      { input: 'height = [2, 0, 2]', expectedOutput: '2' },
      { input: 'height = [3, 0, 0, 2, 0, 4]', expectedOutput: '10' },
      { input: 'height = [1, 2, 3, 4, 5]', expectedOutput: '0' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'left=0(0), right=11(1)', action: 'height[left] < height[right] -> leftMax=0', outcome: 'water=0, left=1' },
      { step: 2, vars: 'left=1(1), right=11(1)', action: 'height[left] >= height[right] -> rightMax=1', outcome: 'water=0, right=10' },
      { step: 3, vars: 'left=1(1), right=10(2)', action: 'height[left] < height[right] -> leftMax=1', outcome: 'water=0, left=2' },
      { step: 4, vars: 'left=2(0), right=10(2)', action: '0 < leftMax(1) -> water += 1-0 = 1', outcome: 'totalWater=1, left=3' }
    ],
    edgeCases: [
      'Monotonically increasing or decreasing heights (cannot trap water, returns 0)',
      'Array length < 3 (returns 0)',
      'Plateaus with wide valleys'
    ],
    commonMistakes: [
      'Allocating two O(N) prefix/suffix max arrays when O(1) space is achievable with two pointers',
      'Adding water when height[left] is equal to or greater than leftMax'
    ],
    interviewExplanationScript: '"The water trapped at any position is bounded by min(leftMax, rightMax) - height[i]. With two pointers at opposite ends, whenever height[left] < height[right], we are guaranteed that leftMax is the true bottleneck, regardless of any peaks further right. This lets us calculate water at left and advance in O(N) time with strictly O(1) auxiliary space."'
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    leetcodeNumber: 20,
    difficulty: 'Easy',
    patternId: 'monotonic-stack',
    patternName: 'LIFO Stack',
    category: 'Stack',
    conceptName: 'LIFO Stack Bracket Matching & Nesting Verification',
    acceptanceRate: '40.8%',
    frequency: 'Top Placement (Amazon, Google, Bloomberg)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'Apple'],
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: 1. Open brackets must be closed by the same type of brackets. 2. Open brackets must be closed in the correct order. 3. Every close bracket has a corresponding open bracket of the same type.',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'Simple valid parenthesis pair.'
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All three bracket types are opened and closed in correct order.'
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: 'Mismatched bracket types.'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    patternClues: [
      'Last opened must be first closed: classic LIFO Stack behavior',
      'Closing bracket must match the most recent unmatched opening bracket',
      'Odd length string can never be valid'
    ],
    bruteForce: {
      approach: 'Repeatedly replace "()", "[]", "{}" with "" until string is empty or no changes occur.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(N)',
      bottleneck: 'Repeated string copying and scanning.'
    },
    optimizedApproach: {
      concept: 'ArrayDeque / Character Stack matching corresponding closing tags.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      keyIdea: 'When encountering \'(\', push \')\'. When \'{\', push \'}\'. When \'[\', push \']\'. When encountering a closing bracket, pop from stack and check if it matches. If stack is empty or mismatch, return false. Finally check stack.isEmpty().'
    },
    hints: [
      'If string length is odd, can it ever be valid?',
      'Whenever you see an opening bracket, push its expected closing bracket onto the stack.',
      'When you see a closing bracket, compare it with stack.pop().'
    ],
    pseudocode: `if length is odd: return false
stack = new Stack()
for char c in s:
    if c == '(': stack.push(')')
    else if c == '{': stack.push('}')
    else if c == '[': stack.push(']')
    else if stack.isEmpty() or stack.pop() != c: return false
return stack.isEmpty()`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public boolean isValid(String s) {
        if (s.length() % 2 != 0) return false;

        // Using ArrayDeque instead of legacy java.util.Stack for better performance
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(')');
            } else if (c == '{') {
                stack.push('}');
            } else if (c == '[') {
                stack.push(']');
            } else {
                if (stack.isEmpty() || stack.pop() != c) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }
}`,
    starterCode: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "(]"', expectedOutput: 'false' }
    ],
    hiddenTestCases: [
      { input: 's = "([)]"', expectedOutput: 'false' },
      { input: 's = "{[]}"', expectedOutput: 'true' },
      { input: 's = "["', expectedOutput: 'false' },
      { input: 's = "]"', expectedOutput: 'false' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'c=(', action: 'Push ) onto stack', outcome: 'stack=[)]' },
      { step: 2, vars: 'c=[', action: 'Push ] onto stack', outcome: 'stack=[), ]]' },
      { step: 3, vars: 'c=]', action: 'Pop ] == c', outcome: 'match, stack=[)]' },
      { step: 4, vars: 'c=)', action: 'Pop ) == c', outcome: 'match, stack=[] (valid)' }
    ],
    edgeCases: [
      'Odd length string (instant false)',
      'Starts with closing bracket (e.g. "]")',
      'All open brackets with no closings (e.g. "(((")'
    ],
    commonMistakes: [
      'Using legacy synchronized Stack instead of ArrayDeque in Java interviews',
      'Forgetting to check if stack is empty at the end (e.g. "((" leaves items on stack)'
    ],
    interviewExplanationScript: '"Parentheses matching requires Last-In-First-Out semantics because the most recently opened bracket must be the first closed. By pushing expected closing characters onto an ArrayDeque, we can validate each closing character in O(1) time. This achieves O(N) time and O(N) space."'
  },
  {
    id: 'daily-temperatures',
    title: 'Daily Temperatures',
    leetcodeNumber: 739,
    difficulty: 'Medium',
    patternId: 'monotonic-stack',
    patternName: 'Monotonic Decreasing Stack',
    category: 'Stack',
    conceptName: 'Monotonic Decreasing Stack for Next Greater Element Distance',
    acceptanceRate: '66.1%',
    frequency: 'Very High (Meta, Amazon, Google)',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.',
    examples: [
      {
        input: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]',
        output: '[1, 1, 4, 2, 1, 1, 0, 0]',
        explanation: 'Day 0 needs 1 day to reach 74, Day 2 needs 4 days to reach 76, etc.'
      },
      {
        input: 'temperatures = [30, 40, 50, 60]',
        output: '[1, 1, 1, 0]',
        explanation: 'Each day increases until the last.'
      },
      {
        input: 'temperatures = [30, 60, 90]',
        output: '[1, 1, 0]',
        explanation: 'Day 0 waits 1, Day 1 waits 1, Day 2 has no warmer day.'
      }
    ],
    constraints: [
      '1 <= temperatures.length <= 10^5',
      '30 <= temperatures[i] <= 100'
    ],
    patternClues: [
      'Finding the next element greater than the current one',
      'Need distance between indices (i to j)',
      'Monotonic stack stores unresolved day indices in decreasing temperature order'
    ],
    bruteForce: {
      approach: 'For each day i, scan forward j = i + 1 until temperatures[j] > temperatures[i].',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Scanning forward repeatedly through cold stretches.'
    },
    optimizedApproach: {
      concept: 'Monotonic Decreasing Stack storing day indices.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      keyIdea: 'Iterate through temperatures. While stack is not empty and current temp > temperatures[stack.peek()], pop the prevIndex and set ans[prevIndex] = currIndex - prevIndex. Then push currIndex onto stack.'
    },
    hints: [
      'When you see a warmer temperature today, which previous days have just found their answer?',
      'Store indices of days that are still waiting for a warmer temperature in a stack.',
      'The stack will naturally maintain temperatures in descending order.'
    ],
    pseudocode: `stack = new ArrayDeque()
ans = new int[n]
for i from 0 to n - 1:
    while !stack.isEmpty() and temperatures[i] > temperatures[stack.peek()]:
        prev = stack.pop()
        ans[prev] = i - prev
    stack.push(i)
return ans`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>(); // stores indices

        for (int i = 0; i < n; i++) {
            // While today is warmer than the day at the top of the stack
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIndex = stack.pop();
                answer[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }

        return answer;
    }
}`,
    starterCode: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        // Write your solution here
        return new int[0];
    }
}`,
    testCases: [
      { input: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]', expectedOutput: '[1, 1, 4, 2, 1, 1, 0, 0]' },
      { input: 'temperatures = [30, 40, 50, 60]', expectedOutput: '[1, 1, 1, 0]' },
      { input: 'temperatures = [30, 60, 90]', expectedOutput: '[1, 1, 0]' }
    ],
    hiddenTestCases: [
      { input: 'temperatures = [89, 62, 70, 58, 47, 47, 46, 76, 100, 70]', expectedOutput: '[8, 1, 5, 4, 3, 2, 1, 1, 0, 0]' },
      { input: 'temperatures = [50]', expectedOutput: '[0]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'i=0, temp=73', action: 'Push index 0', outcome: 'stack=[0(73)]' },
      { step: 2, vars: 'i=1, temp=74', action: '74 > 73 -> pop 0, ans[0] = 1 - 0 = 1; push 1', outcome: 'ans[0]=1, stack=[1(74)]' },
      { step: 3, vars: 'i=2, temp=75', action: '75 > 74 -> pop 1, ans[1] = 2 - 1 = 1; push 2', outcome: 'ans[1]=1, stack=[2(75)]' }
    ],
    edgeCases: [
      'Strictly decreasing temperatures (all 0s in output)',
      'Array of length 1 (returns [0])',
      'All identical temperatures (all 0s)'
    ],
    commonMistakes: [
      'Storing temperature values instead of indices on the stack (indices are needed to calculate wait days)',
      'Using >= instead of > (the problem requires strictly warmer temperature)'
    ],
    interviewExplanationScript: '"To avoid the quadratic complexity of nested forward scans, we maintain a monotonic decreasing stack of indices. When a warmer temperature is encountered, it resolves all pending days on top of the stack whose temperatures are lower. Since each index is pushed and popped at most once, the algorithm operates in O(N) linear time and O(N) space."'
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    leetcodeNumber: 206,
    difficulty: 'Easy',
    patternId: 'in-place-reversal',
    patternName: 'In-Place Pointer Reversal',
    category: 'Linked List',
    conceptName: 'Three-Pointer In-Place Iterative Node Reversal',
    acceptanceRate: '75.3%',
    frequency: 'Top Placement (Classic Interview Gatekeeper)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Meta', 'Bloomberg'],
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: 'The linked list direction is completely reversed.'
      },
      {
        input: 'head = [1, 2]',
        output: '[2, 1]',
        explanation: 'Two-node list is reversed.'
      },
      {
        input: 'head = []',
        output: '[]',
        explanation: 'Empty list remains empty.'
      }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    patternClues: [
      'In-place modification without allocating new nodes',
      'Requires reversing next pointer of each node to point to its predecessor',
      'Keep track of prev, curr, and nextTemp'
    ],
    bruteForce: {
      approach: 'Copy values into an ArrayList, reverse the list, and construct a new linked list.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      bottleneck: 'Violates constant O(1) auxiliary space expectation.'
    },
    optimizedApproach: {
      concept: 'Three pointers: prev = null, curr = head, nextTemp.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      keyIdea: 'At each step, save curr.next into nextTemp. Point curr.next = prev. Advance prev = curr, and curr = nextTemp. When curr is null, prev is the new head.'
    },
    hints: [
      'Before you change curr.next, you must remember where the rest of the list was.',
      'Initialize prev to null and curr to head.',
      'Loop while curr != null.'
    ],
    pseudocode: `prev = null
curr = head
while curr != null:
    nextTemp = curr.next
    curr.next = prev
    prev = curr
    curr = nextTemp
return prev`,
    javaSolution: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next; // save next node
            curr.next = prev;             // reverse pointer
            prev = curr;                  // advance prev
            curr = nextTemp;              // advance curr
        }

        return prev; // prev is the new head
    }
}`,
    starterCode: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your solution here
        return null;
    }
}`,
    testCases: [
      { input: 'head = [1, 2, 3, 4, 5]', expectedOutput: '[5, 4, 3, 2, 1]' },
      { input: 'head = [1, 2]', expectedOutput: '[2, 1]' },
      { input: 'head = []', expectedOutput: '[]' }
    ],
    hiddenTestCases: [
      { input: 'head = [1]', expectedOutput: '[1]' },
      { input: 'head = [10, 20, 30]', expectedOutput: '[30, 20, 10]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'curr=1, prev=null', action: 'nextTemp=2; 1.next=null; prev=1, curr=2', outcome: '1 -> null' },
      { step: 2, vars: 'curr=2, prev=1', action: 'nextTemp=3; 2.next=1; prev=2, curr=3', outcome: '2 -> 1 -> null' },
      { step: 3, vars: 'curr=3, prev=2', action: 'nextTemp=null; 3.next=2; prev=3, curr=null', outcome: '3 -> 2 -> 1 -> null' }
    ],
    edgeCases: [
      'Empty list head == null (returns null)',
      'Single node list (returns head untouched)',
      'Two node list'
    ],
    commonMistakes: [
      'Losing reference to the rest of the list before redirecting curr.next',
      'Returning curr instead of prev (curr is null when the loop finishes)'
    ],
    interviewExplanationScript: '"We reverse the list iteratively in-place using three pointers: prev, curr, and nextTemp. At each step, we preserve curr.next, redirect curr.next back to prev, and advance our pointers forward. When curr reaches null, prev points to the newly inverted head. This takes O(N) time and O(1) extra space."'
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    leetcodeNumber: 146,
    difficulty: 'Medium',
    patternId: 'hash-map',
    patternName: 'Hash Table + Doubly Linked List',
    category: 'Design & Linked List',
    conceptName: 'O(1) Hash Table with Doubly Linked List Node Splice',
    acceptanceRate: '42.1%',
    frequency: 'Top Placement (Google / Amazon System Design Favorite)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Apple', 'Bloomberg', 'Uber'],
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class: LRUCache(int capacity) Initialize with positive size capacity. int get(int key) Return the value of the key if it exists, otherwise return -1. void put(int key, int value) Update value if key exists, otherwise add the key-value pair. If number of keys exceeds capacity, evict the least recently used key. Both get and put must run in O(1) average time complexity.',
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'Cache operations: put(1,1), put(2,2), get(1)->1, put(3,3) evicts key 2, get(2)->-1, put(4,4) evicts key 1, get(1)->-1, get(3)->3, get(4)->4.'
      }
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    patternClues: [
      'Both get and put in O(1) time complexity requirement',
      'Order of usage matters: most recently used vs least recently used',
      'HashMap gives O(1) key lookup, Doubly Linked List allows O(1) node removal and insertion'
    ],
    bruteForce: {
      approach: 'Single array or list of pairs with timestamp scanning.',
      timeComplexity: 'O(N) per get/put',
      spaceComplexity: 'O(Capacity)',
      bottleneck: 'Finding least recently used element takes linear scan.'
    },
    optimizedApproach: {
      concept: 'HashMap<Integer, Node> + Doubly Linked List with dummy head and dummy tail.',
      timeComplexity: 'O(1) for both get and put',
      spaceComplexity: 'O(Capacity)',
      keyIdea: 'Dummy head represents MRU, dummy tail represents LRU. When accessing or updating an existing node, remove it from its current position in the DLL and insert it right after head. When capacity is exceeded, evict the node right before tail (tail.prev).'
    },
    hints: [
      'To achieve O(1) removal of an arbitrary element, you need a Doubly Linked List node reference.',
      'Combine a HashMap storing key -> Node with a DLL.',
      'Use sentinel (dummy) head and tail nodes to eliminate edge cases when inserting/deleting.'
    ],
    pseudocode: `class Node: key, val, prev, next
head.next = tail; tail.prev = head

get(key):
    if key not in map: return -1
    node = map.get(key)
    moveToHead(node)
    return node.val

put(key, value):
    if key in map:
        node = map.get(key)
        node.val = value
        moveToHead(node)
    else:
        node = new Node(key, value)
        map.put(key, node)
        addToHead(node)
        if map.size() > capacity:
            lru = removeTail()
            map.remove(lru.key)`,
    javaSolution: `import java.util.HashMap;
import java.util.Map;

public class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { this.key = k; this.value = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail; // dummy sentinels

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = map.get(key);
        if (node == null) return -1;
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node node = map.get(key);
        if (node != null) {
            node.value = value;
            moveToHead(node);
        } else {
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            addToHead(newNode);

            if (map.size() > capacity) {
                Node lru = removeTail();
                map.remove(lru.key);
            }
        }
    }

    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    private Node removeTail() {
        Node res = tail.prev;
        removeNode(res);
        return res;
    }
}`,
    starterCode: `class LRUCache {
    public LRUCache(int capacity) {
        // Initialize your cache
    }
    
    public int get(int key) {
        return -1;
    }
    
    public void put(int key, int value) {
        
    }
}`,
    testCases: [
      { input: 'capacity = 2, put(1,1), put(2,2), get(1), put(3,3), get(2)', expectedOutput: '[1, -1]' }
    ],
    hiddenTestCases: [
      { input: 'capacity = 1, put(2,1), get(2), put(3,2), get(2), get(3)', expectedOutput: '[1, -1, 2]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'cap=2, put(1,1)', action: 'add 1 to head', outcome: 'head <-> [1:1] <-> tail' },
      { step: 2, vars: 'put(2,2)', action: 'add 2 to head', outcome: 'head <-> [2:2] <-> [1:1] <-> tail' },
      { step: 3, vars: 'get(1)', action: 'move 1 to head', outcome: 'head <-> [1:1] <-> [2:2] <-> tail (returns 1)' },
      { step: 4, vars: 'put(3,3)', action: 'size>2 -> evict tail.prev (2)', outcome: 'head <-> [3:3] <-> [1:1] <-> tail' }
    ],
    edgeCases: [
      'Capacity = 1 (every put evicts the previous item)',
      'Updating an existing key without increasing cache size',
      'Getting a non-existent key (returns -1 without modifying list order)'
    ],
    commonMistakes: [
      'Forgetting to remove evicted node key from the HashMap',
      'Not using dummy head/tail sentinels (leads to complex null checks and bugs)'
    ],
    interviewExplanationScript: '"To achieve O(1) time for both lookup and eviction, we pair a HashMap with a Doubly Linked List. The HashMap provides O(1) node access by key. The Doubly Linked List allows us to unlink and move any node to the head (most recently used) or evict from the tail (least recently used) in constant time. Using dummy head and tail sentinel nodes eliminates boundary null checks."'
  },
  {
    id: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    leetcodeNumber: 33,
    difficulty: 'Medium',
    patternId: 'binary-search',
    patternName: 'Modified Binary Search',
    category: 'Binary Search',
    conceptName: 'Sorted Sub-Array Invariant Binary Search',
    acceptanceRate: '41.3%',
    frequency: 'Top Placement (Amazon, Meta, Google)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Uber'],
    description: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      {
        input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0',
        output: '4',
        explanation: 'Target 0 is found at index 4.'
      },
      {
        input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3',
        output: '-1',
        explanation: '3 is not in the array, so return -1.'
      },
      {
        input: 'nums = [1], target = 0',
        output: '-1',
        explanation: 'Single element does not match.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'All values of nums are unique.',
      'nums is an ascending array that is possibly rotated.'
    ],
    patternClues: [
      'O(log N) required on rotated sorted array',
      'Dividing rotated array in half always produces at least one perfectly sorted half',
      'Check if target falls within the bounds of the sorted half'
    ],
    bruteForce: {
      approach: 'Linear search checking every element.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Fails to exploit the partial sorted structure and violates O(log N) requirement.'
    },
    optimizedApproach: {
      concept: 'Binary search determining which half is normally sorted.',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      keyIdea: 'Compute mid = left + (right - left) / 2. If nums[left] <= nums[mid], the left half [left..mid] is monotonically sorted. Check if target lies within [nums[left], nums[mid]]. If so, search left (right = mid - 1); otherwise search right (left = mid + 1). If right half is sorted, apply symmetric logic.'
    },
    hints: [
      'Notice that if you split the array at any mid index, at least one of the two halves is sorted.',
      'You can verify if the left half is sorted by checking if nums[left] <= nums[mid].',
      'Once you know which half is sorted, check if target falls inside that range.'
    ],
    pseudocode: `left = 0, right = n - 1
while left <= right:
    mid = left + (right - left) / 2
    if nums[mid] == target: return mid
    if nums[left] <= nums[mid]: // left half is sorted
        if nums[left] <= target and target < nums[mid]:
            right = mid - 1
        else:
            left = mid + 1
    else: // right half is sorted
        if nums[mid] < target and target <= nums[right]:
            left = mid + 1
        else:
            right = mid - 1
return -1`,
    javaSolution: `public class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            // Check if left half is normally sorted
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1; // target is in the left sorted range
                } else {
                    left = mid + 1;
                }
            } else { // right half is normally sorted
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1; // target is in the right sorted range
                } else {
                    right = mid - 1;
                }
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
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0', expectedOutput: '4' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3', expectedOutput: '-1' },
      { input: 'nums = [1], target = 0', expectedOutput: '-1' }
    ],
    hiddenTestCases: [
      { input: 'nums = [1], target = 1', expectedOutput: '0' },
      { input: 'nums = [5, 1, 3], target = 5', expectedOutput: '0' },
      { input: 'nums = [3, 1], target = 1', expectedOutput: '1' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'left=0, right=6, mid=3 (7)', action: 'nums[0](4) <= nums[3](7) -> left half sorted', outcome: 'target 0 not in [4..7] -> left = 4' },
      { step: 2, vars: 'left=4, right=6, mid=5 (1)', action: 'nums[4](0) <= nums[5](1) -> left half sorted', outcome: 'target 0 in [0..1] -> right = 4' },
      { step: 3, vars: 'left=4, right=4, mid=4 (0)', action: 'nums[4] == 0 (target matched)', outcome: 'return 4' }
    ],
    edgeCases: [
      'Unrotated array (k = 0)',
      'Array length 1 or 2',
      'Target at the pivot or boundary index'
    ],
    commonMistakes: [
      'Using < instead of <= when checking nums[left] <= nums[mid] (breaks on 2-element arrays)',
      'Assuming the entire array is sorted'
    ],
    interviewExplanationScript: '"Even though the array is rotated, dividing it at mid always yields at least one cleanly sorted half. We determine whether the left half is sorted by checking nums[left] <= nums[mid]. If it is, we easily verify whether the target lies inside that boundary. Otherwise, the right half is sorted, and we test that boundary instead. Each iteration halves the search space, giving guaranteed O(log N) time and O(1) space."'
  },
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    leetcodeNumber: 200,
    difficulty: 'Medium',
    patternId: 'tree-dfs',
    patternName: 'Matrix DFS / Connected Components',
    category: 'Graphs & BFS/DFS',
    conceptName: 'Grid BFS/DFS Flood Fill & In-Place Sinking',
    acceptanceRate: '58.8%',
    frequency: 'Top Placement (Amazon #1 Most Asked)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'Apple'],
    description: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
    examples: [
      {
        input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
        output: '1',
        explanation: 'All 1s are connected to form one single island.'
      },
      {
        input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: '3',
        explanation: 'Three disconnected islands.'
      }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is \'0\' or \'1\'.'
    ],
    patternClues: [
      'Connected components in a 2D matrix',
      'Horizontal and vertical 4-directional adjacency',
      'Sinking visited land to \'0\' avoids O(M*N) extra visited set space'
    ],
    bruteForce: {
      approach: 'BFS with an explicit boolean visited[][] matrix.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      bottleneck: 'Extra space overhead when in-place modification is permitted.'
    },
    optimizedApproach: {
      concept: 'DFS Flood Fill sinking visited land from \'1\' to \'0\'.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N) worst case recursion stack',
      keyIdea: 'Iterate through all cells (r, c). When grid[r][c] == \'1\', increment island count and invoke dfs(r, c) to visit all 4 neighbors, sinking each reached \'1\' into \'0\'.'
    },
    hints: [
      'Think of this as finding connected components in an undirected graph.',
      'Whenever you discover land (\'1\'), traverse its full component using DFS or BFS.',
      'Mark visited cells as \'0\' so you do not count them again.'
    ],
    pseudocode: `islands = 0
for r from 0 to m-1:
    for c from 0 to n-1:
        if grid[r][c] == '1':
            islands++
            dfs(grid, r, c)
return islands

dfs(grid, r, c):
    if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
        return
    grid[r][c] = '0' // sink land
    dfs(grid, r+1, c)
    dfs(grid, r-1, c)
    dfs(grid, r, c+1)
    dfs(grid, r, c-1)`,
    javaSolution: `public class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;

        int m = grid.length;
        int n = grid[0].length;
        int count = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    sinkDfs(grid, r, c, m, n);
                }
            }
        }

        return count;
    }

    private void sinkDfs(char[][] grid, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') {
            return;
        }

        // Sink the land in-place
        grid[r][c] = '0';

        // Explore 4 cardinal directions
        sinkDfs(grid, r + 1, c, m, n);
        sinkDfs(grid, r - 1, c, m, n);
        sinkDfs(grid, r, c + 1, m, n);
        sinkDfs(grid, r, c - 1, m, n);
    }
}`,
    starterCode: `class Solution {
    public int numIslands(char[][] grid) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: '3' }
    ],
    hiddenTestCases: [
      { input: 'grid = [["1"]]', expectedOutput: '1' },
      { input: 'grid = [["0"]]', expectedOutput: '0' },
      { input: 'grid = [["1","0","1"],["0","1","0"],["1","0","1"]]', expectedOutput: '5' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'cell (0,0)=\'1\'', action: 'count = 1, start DFS flood fill', outcome: 'sinks (0,0), (0,1), (0,2), (0,3), (1,0), (1,1), (1,3), (2,0), (2,1) to \'0\'' },
      { step: 2, vars: 'scan remaining cells', action: 'all remaining cells are \'0\'', outcome: 'total islands = 1' }
    ],
    edgeCases: [
      'Grid with only water (returns 0)',
      'Grid with only land (returns 1)',
      'Diagonal land (not connected, counts as separate islands)'
    ],
    commonMistakes: [
      'Checking diagonal neighbors (problem specifies only vertical and horizontal)',
      'Forgetting bounds checks before accessing grid[r][c]',
      'StackOverflowError if matrix is very large (BFS is alternative if recursion limit is an issue)'
    ],
    interviewExplanationScript: '"This problem models finding connected components in a grid graph. We iterate through every cell; when we encounter a \'1\', we increment our island count and trigger a DFS flood fill to sink all connected land cells to \'0\'. Sinking in-place avoids allocating a separate visited matrix. Time complexity is O(M * N) since each cell is visited a constant number of times, with O(M * N) worst-case call stack space."'
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    leetcodeNumber: 322,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: 'Bottom-Up Dynamic Programming',
    category: 'Dynamic Programming',
    conceptName: 'Bottom-Up 1D DP Unbounded Knapsack',
    acceptanceRate: '43.7%',
    frequency: 'Top Placement (Amazon, Google, Microsoft)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Bloomberg', 'Goldman Sachs'],
    description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.',
    examples: [
      {
        input: 'coins = [1, 2, 5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins total).'
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1',
        explanation: 'Cannot make 3 using only 2s.'
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0',
        explanation: '0 coins needed for amount 0.'
      }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    patternClues: [
      'Fewest / minimum number of items to reach a target sum',
      'Infinite supply of each denomination: Unbounded Knapsack',
      'Optimal substructure: dp[i] depends on min(dp[i - coin]) + 1'
    ],
    bruteForce: {
      approach: 'Exhaustive recursive backtracking testing every coin choice.',
      timeComplexity: 'O(S^N) where S is amount and N is coin count',
      spaceComplexity: 'O(amount)',
      bottleneck: 'Massive overlapping subproblems recomputed exponentially.'
    },
    optimizedApproach: {
      concept: 'Bottom-Up 1D Dynamic Programming array dp[0..amount].',
      timeComplexity: 'O(amount * coins.length)',
      spaceComplexity: 'O(amount)',
      keyIdea: 'Define dp[i] as the minimum coins to make amount i. Initialize dp array with amount + 1 (representing infinity), with base case dp[0] = 0. For i from 1 to amount, for each coin in coins: if i - coin >= 0, dp[i] = min(dp[i], dp[i - coin] + 1). Return dp[amount] > amount ? -1 : dp[amount].'
    },
    hints: [
      'What is the base case? For amount = 0, how many coins are needed? (0 coins).',
      'If you knew the minimum coins for amount 10, how does knowing coin 5 help you find amount 15?',
      'Initialize dp array to amount + 1 to easily check if an amount is unreachable.'
    ],
    pseudocode: `dp = new int[amount + 1]
fill(dp, amount + 1)
dp[0] = 0
for i from 1 to amount:
    for coin in coins:
        if i - coin >= 0:
            dp[i] = min(dp[i], dp[i - coin] + 1)
return dp[amount] > amount ? -1 : dp[amount]`,
    javaSolution: `import java.util.Arrays;

public class Solution {
    public int coinChange(int[] coins, int amount) {
        if (amount < 1) return 0;

        int[] dp = new int[amount + 1];
        // Fill with amount + 1 as safe upper bound (cannot need more than amount coins of 1)
        Arrays.fill(dp, amount + 1);
        dp[0] = 0; // Base case: 0 coins needed for amount 0

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    starterCode: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // Write your solution here
        return -1;
    }
}`,
    testCases: [
      { input: 'coins = [1, 2, 5], amount = 11', expectedOutput: '3' },
      { input: 'coins = [2], amount = 3', expectedOutput: '-1' },
      { input: 'coins = [1], amount = 0', expectedOutput: '0' }
    ],
    hiddenTestCases: [
      { input: 'coins = [1], amount = 2', expectedOutput: '2' },
      { input: 'coins = [186, 419, 83, 408], amount = 6249', expectedOutput: '20' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'dp[0]=0, coins=[1,2,5]', action: 'i=1: coin 1 -> dp[1]=min(inf, dp[0]+1)=1', outcome: 'dp[1]=1' },
      { step: 2, vars: 'i=2', action: 'coin 1 -> dp[1]+1=2, coin 2 -> dp[0]+1=1', outcome: 'dp[2]=1' },
      { step: 3, vars: 'i=5', action: 'coin 5 -> dp[0]+1=1', outcome: 'dp[5]=1' },
      { step: 4, vars: 'i=11', action: 'coin 5 -> dp[6]+1 = 2+1=3', outcome: 'dp[11]=3' }
    ],
    edgeCases: [
      'amount = 0 (returns 0)',
      'Unreachable amount (returns -1)',
      'Coin larger than amount'
    ],
    commonMistakes: [
      'Greedy approach (picking the largest coin first fails, e.g. coins=[1,3,4,5], amount=7: greedy gives 5+1+1=3 coins, but optimal is 4+3=2 coins)',
      'Using Integer.MAX_VALUE which overflows when adding + 1'
    ],
    interviewExplanationScript: '"Greedy does not work for arbitrary coin denominations. Instead, this problem exhibits optimal substructure and overlapping subproblems suitable for dynamic programming. We build an array dp where dp[i] is the minimum coins needed for amount i. We populate it iteratively from 1 to amount by testing each coin. This provides a clean O(amount * N) time and O(amount) space solution."'
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    leetcodeNumber: 56,
    difficulty: 'Medium',
    patternId: 'merge-intervals',
    patternName: 'Sorting & Interval Union',
    category: 'Intervals',
    conceptName: 'Sort by Start Time & Greedy Interval Extension',
    acceptanceRate: '47.5%',
    frequency: 'Top Placement (Google, Meta, Microsoft)',
    companies: ['Google', 'Meta', 'Microsoft', 'Amazon', 'Apple', 'Bloomberg'],
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      {
        input: 'intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]',
        output: '[[1, 6], [8, 10], [15, 18]]',
        explanation: 'Since intervals [1, 3] and [2, 6] overlap, merge them into [1, 6].'
      },
      {
        input: 'intervals = [[1, 4], [4, 5]]',
        output: '[[1, 5]]',
        explanation: 'Intervals [1, 4] and [4, 5] are considered overlapping.'
      }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= starti <= endi <= 10^4'
    ],
    patternClues: [
      'Interval scheduling, timeline overlap detection',
      'Sorting by start time orders the intervals chronologically',
      'Overlaps occur when current interval start <= previous interval end'
    ],
    bruteForce: {
      approach: 'Graph connected components or quadratic merging checks.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(N)',
      bottleneck: 'Checking every pair of intervals for mutual intersection.'
    },
    optimizedApproach: {
      concept: 'Sort by start time + single pass linear merge.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N) for sorting/output',
      keyIdea: 'Sort intervals by start time: (a, b) -> a[0] - b[0]. Add the first interval to merged. For each subsequent interval, if its start <= merged.last.end, extend merged.last.end = max(merged.last.end, current.end). Otherwise, append as a distinct new interval.'
    },
    hints: [
      'What happens if you sort the intervals by their start times?',
      'Once sorted, any overlapping intervals will be adjacent in the array.',
      'Compare the current interval start with the previous interval end.'
    ],
    pseudocode: `sort(intervals by start time)
merged = []
for interval in intervals:
    if merged is empty or merged.last.end < interval.start:
        merged.add(interval)
    else:
        merged.last.end = max(merged.last.end, interval.end)
return merged.toArray()`,
    javaSolution: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals == null || intervals.length <= 1) return intervals;

        // Sort by interval start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();
        int[] currentInterval = intervals[0];
        merged.add(currentInterval);

        for (int[] interval : intervals) {
            int currentEnd = currentInterval[1];
            int nextBegin = interval[0];
            int nextEnd = interval[1];

            if (currentEnd >= nextBegin) {
                // Overlap: extend end of current interval
                currentInterval[1] = Math.max(currentEnd, nextEnd);
            } else {
                // Disjoint: start a new interval
                currentInterval = interval;
                merged.add(currentInterval);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}`,
    starterCode: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your solution here
        return new int[0][0];
    }
}`,
    testCases: [
      { input: 'intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]', expectedOutput: '[[1, 6], [8, 10], [15, 18]]' },
      { input: 'intervals = [[1, 4], [4, 5]]', expectedOutput: '[[1, 5]]' }
    ],
    hiddenTestCases: [
      { input: 'intervals = [[1, 4], [0, 4]]', expectedOutput: '[[0, 4]]' },
      { input: 'intervals = [[1, 4], [2, 3]]', expectedOutput: '[[1, 4]]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'sorted=[[1,3],[2,6],[8,10],[15,18]]', action: 'init merged=[[1,3]]', outcome: 'merged has [1,3]' },
      { step: 2, vars: 'next=[2,6]', action: '3 >= 2 -> merge into [1, max(3,6)=6]', outcome: 'merged=[[1,6]]' },
      { step: 3, vars: 'next=[8,10]', action: '6 < 8 -> disjoint, append [8,10]', outcome: 'merged=[[1,6],[8,10]]' },
      { step: 4, vars: 'next=[15,18]', action: '10 < 15 -> disjoint, append [15,18]', outcome: 'merged=[[1,6],[8,10],[15,18]]' }
    ],
    edgeCases: [
      'Single interval [[1, 4]]',
      'One interval completely engulfing another [[1, 10], [2, 3]]',
      'Adjacent boundary touches [[1, 4], [4, 5]]'
    ],
    commonMistakes: [
      'Using a[0] - b[0] subtraction for sorting (can overflow on extreme negative values, use Integer.compare instead)',
      'Forgetting to update currentInterval[1] with Math.max'
    ],
    interviewExplanationScript: '"By sorting the intervals by their start time in O(N log N), any intervals that can possibly merge are placed adjacent to each other. We can then do a single linear pass: if the next interval starts before or at the current interval\'s end, we merge them by extending the end boundary. Otherwise, we start a new interval. Total time is dominated by the sort at O(N log N) with O(N) space."'
  },
  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    leetcodeNumber: 238,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: 'Prefix & Suffix Products',
    category: 'Arrays & Hashing',
    conceptName: 'Two-Pass Prefix & Suffix Cumulative Product',
    acceptanceRate: '65.4%',
    frequency: 'Top Placement (Amazon, Meta, Apple)',
    companies: ['Amazon', 'Meta', 'Apple', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operator.',
    examples: [
      {
        input: 'nums = [1, 2, 3, 4]',
        output: '[24, 12, 8, 6]',
        explanation: 'For idx 0: 2*3*4=24. For idx 1: 1*3*4=12. For idx 2: 1*2*4=8. For idx 3: 1*2*3=6.'
      },
      {
        input: 'nums = [-1, 1, 0, -3, 3]',
        output: '[0, 0, 9, 0, 0]',
        explanation: 'Zero at index 2 cancels out all other positions except index 2.'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30',
      'The product of any prefix or suffix of nums fits in a 32-bit integer.',
      'Follow-up: Solve it with O(1) extra space complexity (output array does not count).'
    ],
    patternClues: [
      'Division operator forbidden',
      'Product except self = (product of elements to the left) * (product of elements to the right)',
      'Precomputing prefix and suffix products solves it in two passes'
    ],
    bruteForce: {
      approach: 'Multiply total product and divide by nums[i], or use nested loop.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      bottleneck: 'Division is prohibited, and nested loop takes O(N²).'
    },
    optimizedApproach: {
      concept: 'Single output array storing left products, followed by a right suffix pass.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) extra space',
      keyIdea: 'Pass 1 (left to right): ans[i] stores the product of all elements to the left of i. Pass 2 (right to left): maintain running suffix product R and multiply ans[i] *= R, then update R *= nums[i].'
    },
    hints: [
      'Think of each output element as: (everything to the left) * (everything to the right).',
      'First calculate prefix products and store them in the output array.',
      'In a second reverse pass, maintain a running suffix product and multiply.'
    ],
    pseudocode: `ans = new int[n]
ans[0] = 1
for i from 1 to n - 1:
    ans[i] = ans[i-1] * nums[i-1]

right = 1
for i from n - 1 down to 0:
    ans[i] *= right
    right *= nums[i]
return ans`,
    javaSolution: `public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];

        // Pass 1: answer[i] contains the product of all elements to the left of i
        answer[0] = 1;
        for (int i = 1; i < n; i++) {
            answer[i] = answer[i - 1] * nums[i - 1];
        }

        // Pass 2: Multiply by product of all elements to the right
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= rightProduct;
            rightProduct *= nums[i];
        }

        return answer;
    }
}`,
    starterCode: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        // Write your solution here
        return new int[0];
    }
}`,
    testCases: [
      { input: 'nums = [1, 2, 3, 4]', expectedOutput: '[24, 12, 8, 6]' },
      { input: 'nums = [-1, 1, 0, -3, 3]', expectedOutput: '[0, 0, 9, 0, 0]' }
    ],
    hiddenTestCases: [
      { input: 'nums = [0, 0]', expectedOutput: '[0, 0]' },
      { input: 'nums = [4, 5]', expectedOutput: '[5, 4]' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'Pass 1 (left)', action: 'ans[0]=1, ans[1]=1, ans[2]=2, ans[3]=6', outcome: 'prefix=[1, 1, 2, 6]' },
      { step: 2, vars: 'Pass 2 (right)', action: 'i=3: ans[3]*=1 -> 6; right=4', outcome: 'ans[3]=6' },
      { step: 3, vars: 'i=2', action: 'ans[2]*=4 -> 8; right=12', outcome: 'ans[2]=8' },
      { step: 4, vars: 'i=1', action: 'ans[1]*=12 -> 12; right=24', outcome: 'ans[1]=12' },
      { step: 5, vars: 'i=0', action: 'ans[0]*=24 -> 24', outcome: 'ans[0]=24' }
    ],
    edgeCases: [
      'Contains a single 0 (only the 0 index has a non-zero product)',
      'Contains multiple 0s (all products are 0)',
      'Negative numbers and alternations'
    ],
    commonMistakes: [
      'Using division (explicitly banned by problem statement)',
      'Allocating two separate O(N) prefix and suffix arrays when O(1) space is required'
    ],
    interviewExplanationScript: '"Since division is prohibited, we observe that the result at index i is simply the product of all elements to its left multiplied by the product of all elements to its right. We compute the left prefix products directly inside our output array in one pass. Then, using a single running variable for the right suffix product, we traverse backwards to multiply. This delivers an optimal O(N) time and O(1) auxiliary space solution."'
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    leetcodeNumber: 207,
    difficulty: 'Medium',
    patternId: 'graph-bfs-dfs',
    patternName: 'Topological Sort / Cycle Detection',
    category: 'Graphs & BFS/DFS',
    conceptName: 'Kahn\'s BFS Algorithm / In-Degree Topological Cycle Detection',
    acceptanceRate: '47.2%',
    frequency: 'Top Placement (Amazon, Google, Meta)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'Uber'],
    description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.',
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1, 0]]',
        output: 'true',
        explanation: 'There are a total of 2 courses. To take course 1 you should have finished course 0. So it is possible.'
      },
      {
        input: 'numCourses = 2, prerequisites = [[1, 0], [0, 1]]',
        output: 'false',
        explanation: 'To take course 1 you need 0, and to take 0 you need 1. There is a cyclic dependency, so impossible.'
      }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= ai, bi < numCourses',
      'All the pairs prerequisites[i] are unique.'
    ],
    patternClues: [
      'Prerequisite ordering: Directed Graph',
      'Determine if all courses can be completed: Directed Acyclic Graph (DAG) check',
      'Cycle detection via In-Degree array & Queue (Kahn\'s Algorithm)'
    ],
    bruteForce: {
      approach: 'DFS from each node without state memoization.',
      timeComplexity: 'O(V * (V + E))',
      spaceComplexity: 'O(V)',
      bottleneck: 'Redundant traversal of shared subgraphs.'
    },
    optimizedApproach: {
      concept: 'Kahn\'s Algorithm (BFS with in-degree array).',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      keyIdea: 'Build adjacency list and compute inDegree for every course. Add all courses with inDegree == 0 into a Queue. While queue is not empty, pop a course, increment processedCount, and decrement inDegree of its neighbors. If neighbor inDegree reaches 0, offer it to queue. Finally, return processedCount == numCourses.'
    },
    hints: [
      'Model the courses as nodes and prerequisites as directed edges (bi -> ai).',
      'A cycle means some courses can never be taken.',
      'Courses with 0 prerequisites (in-degree = 0) can be taken immediately.'
    ],
    pseudocode: `adj = new List[numCourses]
inDegree = new int[numCourses]
for [a, b] in prerequisites:
    adj[b].add(a)
    inDegree[a]++

queue = all courses with inDegree == 0
count = 0
while !queue.isEmpty():
    curr = queue.poll()
    count++
    for neighbor in adj[curr]:
        inDegree[neighbor]--
        if inDegree[neighbor] == 0:
            queue.offer(neighbor)
return count == numCourses`,
    javaSolution: `import java.util.*;

public class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }

        int[] inDegree = new int[numCourses];

        // Edge bi -> ai: taking bi unlocks ai
        for (int[] pre : prerequisites) {
            int course = pre[0];
            int prerequisite = pre[1];
            adj.get(prerequisite).add(course);
            inDegree[course]++;
        }

        // Queue holds all courses that currently have 0 prerequisites pending
        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }

        int coursesTaken = 0;

        while (!queue.isEmpty()) {
            int curr = queue.poll();
            coursesTaken++;

            for (int nextCourse : adj.get(curr)) {
                inDegree[nextCourse]--;
                if (inDegree[nextCourse] == 0) {
                    queue.offer(nextCourse);
                }
            }
        }

        return coursesTaken == numCourses;
    }
}`,
    starterCode: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 'numCourses = 2, prerequisites = [[1, 0]]', expectedOutput: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1, 0], [0, 1]]', expectedOutput: 'false' }
    ],
    hiddenTestCases: [
      { input: 'numCourses = 3, prerequisites = [[0, 1], [0, 2], [1, 2]]', expectedOutput: 'true' },
      { input: 'numCourses = 1, prerequisites = []', expectedOutput: 'true' }
    ],
    dryRunSteps: [
      { step: 1, vars: 'num=2, pre=[[1,0]]', action: 'inDegree=[0:0, 1:1], queue=[0]', outcome: 'course 0 is ready' },
      { step: 2, vars: 'poll 0', action: 'coursesTaken=1, decrement inDegree[1] -> 0 -> queue=[1]', outcome: 'course 1 unlocked' },
      { step: 3, vars: 'poll 1', action: 'coursesTaken=2, queue empty', outcome: '2 == 2 -> return true' }
    ],
    edgeCases: [
      'No prerequisites at all (returns true)',
      'Self-loop dependency [0, 0] (returns false)',
      'Multiple independent subgraphs'
    ],
    commonMistakes: [
      'Reversing the directed edge direction (bi -> ai vs ai -> bi)',
      'Using unmemoized DFS which leads to TLE or infinite loops on cycles'
    ],
    interviewExplanationScript: '"This problem reduces to detecting whether a directed graph contains a cycle. We use Kahn\'s algorithm for topological sorting. We maintain the in-degree of each course and start with all nodes with in-degree 0 in a queue. As we remove each course, we decrement the in-degree of its dependents. If all courses are eventually processed, the graph is a Directed Acyclic Graph (DAG) and all courses can be finished in O(V + E) time and space."'
  }
];
