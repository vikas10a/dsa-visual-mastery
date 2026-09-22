import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART5: Problem[] = [
  // --- CONCEPT: TWO POINTERS EXPANSION ---
  {
    id: 'three-sum-closest',
    title: '3Sum Closest',
    leetcodeNumber: 16,
    difficulty: 'Medium',
    patternId: 'two-pointers',
    patternName: 'Sorted Inward Scan with Target Delta',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'Sorted 3-Pointer Minimum Delta Convergence',
    acceptanceRate: '46.1%',
    frequency: 'High (Meta, Amazon, Google)',
    companies: ['Meta', 'Amazon', 'Google', 'Apple'],
    description: 'Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.',
    examples: [
      { input: 'nums = [-1, 2, 1, -4], target = 1', output: '2', explanation: 'The sum closest to target is 2 (-1 + 2 + 1 = 2).' },
      { input: 'nums = [0, 0, 0], target = 1', output: '0', explanation: 'Sum 0 is closest to target 1.' }
    ],
    constraints: ['3 <= nums.length <= 500', '-1000 <= nums[i] <= 1000', '-10^4 <= target <= 10^4'],
    patternClues: ['Triplet sum closest to target', 'Sort array, fix i, use inward two pointers low and high to minimize abs(sum - target)'],
    bruteForce: { approach: 'Triple loop over all triplets.', timeComplexity: 'O(N³)', spaceComplexity: 'O(1)', bottleneck: 'Cubic triplet generation.' },
    optimizedApproach: { concept: 'Sort and two-pointer delta tracking.', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', keyIdea: 'Sort nums. Fix i from 0 to n-3. Set left = i+1, right = n-1. If abs(sum - target) < abs(closest - target), update closest. If sum < target left++, else right--.' },
    hints: ['Sort the array first.', 'If current sum is less than target, how do you increase it? Move left pointer right.'],
    pseudocode: `sort(nums)
closest = nums[0] + nums[1] + nums[2]
for i in 0..n-3:
    left = i + 1, right = n - 1
    while left < right:
        sum = nums[i] + nums[left] + nums[right]
        if abs(target - sum) < abs(target - closest): closest = sum
        if sum < target: left++
        else: right--
return closest`,
    javaSolution: `import java.util.Arrays;

public class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int closestSum = nums[0] + nums[1] + nums[2];

        for (int i = 0; i < nums.length - 2; i++) {
            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int currentSum = nums[i] + nums[left] + nums[right];

                if (Math.abs(target - currentSum) < Math.abs(target - closestSum)) {
                    closestSum = currentSum;
                }

                if (currentSum < target) {
                    left++;
                } else if (currentSum > target) {
                    right--;
                } else {
                    return target; // Exact match found
                }
            }
        }

        return closestSum;
    }
}`,
    starterCode: `class Solution {
    public int threeSumClosest(int[] nums, int target) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [-1, 2, 1, -4], target = 1', expectedOutput: '2' },
      { input: 'nums = [0, 0, 0], target = 1', expectedOutput: '0' }
    ],
    hiddenTestCases: [{ input: 'nums = [1, 1, 1, 0], target = -100', expectedOutput: '2' }],
    interviewExplanationScript: '"We sort the array in O(N log N) and fix each element i. For the remaining sub-array, we use two converging pointers left and right. In each step, we record if currentSum is closer to target than our previous closest. If currentSum is below target, we advance left; if above, we decrement right. If sum equals target exactly, we terminate early. Overall time complexity is O(N²) with O(1) extra space."'
  },
  {
    id: 'squares-of-a-sorted-array',
    title: 'Squares of a Sorted Array',
    leetcodeNumber: 977,
    difficulty: 'Easy',
    patternId: 'two-pointers',
    patternName: 'Two Pointers Outward/Inward',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'Two-Pointer Absolute Extremum Inward Compaction',
    acceptanceRate: '72.5%',
    frequency: 'High (Meta, Google, Amazon)',
    companies: ['Meta', 'Google', 'Amazon', 'Apple'],
    description: 'Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order. Solve in O(N) time without sorting after squaring.',
    examples: [
      { input: 'nums = [-4, -1, 0, 3, 10]', output: '[0, 1, 9, 16, 100]', explanation: 'Squares are [16, 1, 0, 9, 100], sorted is [0, 1, 9, 16, 100].' },
      { input: 'nums = [-7, -3, 2, 3, 11]', output: '[4, 9, 9, 49, 121]', explanation: 'Sorted squares.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in non-decreasing order.'],
    patternClues: ['Input already sorted, but negative numbers square to large values', 'The largest squares can only come from the extreme left or extreme right of nums', 'Fill result array backwards from index n-1 to 0'],
    bruteForce: { approach: 'Square every element and call Arrays.sort().', timeComplexity: 'O(N log N)', spaceComplexity: 'O(1)', bottleneck: 'Violates O(N) requirement.' },
    optimizedApproach: { concept: 'Two pointers at ends filling result array from back to front.', timeComplexity: 'O(N)', spaceComplexity: 'O(1) extra space', keyIdea: 'left = 0, right = n - 1, pos = n - 1. Compare nums[left]^2 and nums[right]^2. Place larger at result[pos--] and move corresponding pointer inward.' },
    hints: ['Where are the largest squared values located in the input? At the two ends.', 'Fill the result array backwards from the largest square to the smallest.'],
    pseudocode: `left = 0, right = n - 1, p = n - 1
res = new int[n]
while left <= right:
    if abs(nums[left]) > abs(nums[right]):
        res[p--] = nums[left] * nums[left]; left++
    else:
        res[p--] = nums[right] * nums[right]; right--
return res`,
    javaSolution: `public class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        int left = 0;
        int right = n - 1;
        int p = n - 1;

        while (left <= right) {
            int leftSq = nums[left] * nums[left];
            int rightSq = nums[right] * nums[right];

            if (leftSq > rightSq) {
                result[p] = leftSq;
                left++;
            } else {
                result[p] = rightSq;
                right--;
            }
            p--;
        }

        return result;
    }
}`,
    starterCode: `class Solution {
    public int[] sortedSquares(int[] nums) {
        // Write your solution here
        return new int[0];
    }
}`,
    testCases: [
      { input: 'nums = [-4, -1, 0, 3, 10]', expectedOutput: '[0, 1, 9, 16, 100]' },
      { input: 'nums = [-7, -3, 2, 3, 11]', expectedOutput: '[4, 9, 9, 49, 121]' }
    ],
    hiddenTestCases: [{ input: 'nums = [-1]', expectedOutput: '[1]' }],
    interviewExplanationScript: '"Because the array is already sorted, the largest squared values must reside at either the leftmost (most negative) or rightmost (most positive) end. By using two pointers at both ends and comparing their squares, we place the larger square into the back of our result array and move that pointer inward. This achieves strictly O(N) time and O(1) auxiliary space."'
  },
  {
    id: 'remove-duplicates-from-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    leetcodeNumber: 26,
    difficulty: 'Easy',
    patternId: 'two-pointers',
    patternName: 'Fast & Slow Reader-Writer',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'In-Place Unique Writer Pointer Compaction',
    acceptanceRate: '56.3%',
    frequency: 'Top Placement (Amazon, Microsoft, Meta)',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google'],
    description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums. Do this with O(1) extra memory.',
    examples: [
      { input: 'nums = [1, 1, 2]', output: '2 (nums = [1, 2, _])', explanation: 'Unique elements are 1 and 2.' },
      { input: 'nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]', output: '5 (nums = [0, 1, 2, 3, 4, ...])', explanation: 'First 5 elements contain unique numbers.' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-100 <= nums[i] <= 100', 'nums is sorted in non-decreasing order.'],
    patternClues: ['Sorted array: duplicates are adjacent', 'Slow pointer tracks write position for next distinct value'],
    bruteForce: { approach: 'Collect distinct values in a LinkedHashSet and copy back.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Violates in-place memory constraint.' },
    optimizedApproach: { concept: 'Two pointers: slow write pointer, fast read pointer.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'write = 1. For read = 1 to n-1: if nums[read] != nums[read-1]: nums[write++] = nums[read]. Return write.' },
    hints: ['Since array is sorted, duplicate elements are always adjacent.', 'Use a pointer write to keep track of where the next unique number should be inserted.'],
    pseudocode: `write = 1
for read in 1..n-1:
    if nums[read] != nums[read - 1]:
        nums[write++] = nums[read]
return write`,
    javaSolution: `public class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int write = 1;
        for (int read = 1; read < nums.length; read++) {
            if (nums[read] != nums[read - 1]) {
                nums[write] = nums[read];
                write++;
            }
        }

        return write;
    }
}`,
    starterCode: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [1, 1, 2]', expectedOutput: '2' },
      { input: 'nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]', expectedOutput: '5' }
    ],
    hiddenTestCases: [{ input: 'nums = [1]', expectedOutput: '1' }],
    interviewExplanationScript: '"Because the array is already sorted, all duplicates are adjacent. We initialize a write pointer at index 1. As a read pointer iterates from index 1 onward, whenever nums[read] differs from nums[read - 1], we overwrite nums[write] with the new unique value and increment write. This performs in-place compaction in O(N) time and O(1) space."'
  },

  // --- CONCEPT: SLIDING WINDOW ADVANCED ---
  {
    id: 'permutation-in-string',
    title: 'Permutation in String',
    leetcodeNumber: 567,
    difficulty: 'Medium',
    patternId: 'sliding-window',
    patternName: 'Fixed-Size Sliding Window Character Frequency',
    category: 'Sliding Window',
    conceptId: 'sliding-window',
    conceptName: 'Fixed-Width Frequency Vector Match Tracking',
    acceptanceRate: '44.8%',
    frequency: 'Top Placement (Meta, Microsoft, Amazon)',
    companies: ['Meta', 'Microsoft', 'Amazon', 'Google'],
    description: 'Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1\'s permutations is the substring of s2.',
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explanation: 's2 contains one permutation of s1 ("ba").' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false', explanation: 'No substring of s2 is an anagram of "ab".' }
    ],
    constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters.'],
    patternClues: ['Substring of s2 must have same character frequency as s1', 'Window size is fixed to s1.length()', 'Slide window of length s1.length() over s2, updating character frequency differences'],
    bruteForce: { approach: 'Generate all permutations of s1 and check s2.contains().', timeComplexity: 'O(N! * M)', spaceComplexity: 'O(N!)', bottleneck: 'Combinatorial explosion.' },
    optimizedApproach: { concept: 'Fixed-size sliding window with 26-element frequency vector.', timeComplexity: 'O(M)', spaceComplexity: 'O(1)', keyIdea: 'Compare frequency array of s1 with current window in s2. On sliding right, add incoming char and subtract outgoing char.' },
    hints: ['The window size in s2 must be exactly s1.length().', 'Maintain counts of characters in s1 and current window in s2.'],
    pseudocode: `if len(s1) > len(s2): return false
s1Count = new int[26], s2Count = new int[26]
populate first s1.length chars
matches = count of matching indices (0..25)
slide window through s2:
    if matches == 26: return true
    update incoming and outgoing chars and matches
return matches == 26`,
    javaSolution: `public class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;

        int[] s1Count = new int[26];
        int[] s2Count = new int[26];

        for (int i = 0; i < s1.length(); i++) {
            s1Count[s1.charAt(i) - 'a']++;
            s2Count[s2.charAt(i) - 'a']++;
        }

        int matches = 0;
        for (int i = 0; i < 26; i++) {
            if (s1Count[i] == s2Count[i]) matches++;
        }

        for (int i = 0; i < s2.length() - s1.length(); i++) {
            if (matches == 26) return true;

            int right = s2.charAt(i + s1.length()) - 'a';
            int left = s2.charAt(i) - 'a';

            s2Count[right]++;
            if (s2Count[right] == s1Count[right]) {
                matches++;
            } else if (s2Count[right] == s1Count[right] + 1) {
                matches--;
            }

            s2Count[left]--;
            if (s2Count[left] == s1Count[left]) {
                matches++;
            } else if (s2Count[left] == s1Count[left] - 1) {
                matches--;
            }
        }

        return matches == 26;
    }
}`,
    starterCode: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 's1 = "ab", s2 = "eidbaooo"', expectedOutput: 'true' },
      { input: 's1 = "ab", s2 = "eidboaoo"', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 's1 = "a", s2 = "a"', expectedOutput: 'true' }],
    interviewExplanationScript: '"A permutation requires an exact match of character counts over a window of length equal to s1. We slide a window of size s1.length() across s2. By tracking the count of matching characters across all 26 lowercase alphabet positions, adding a new right character and removing the left character updates our match score in O(1) time. Total runtime is O(|s2|) with O(1) space."'
  },
  {
    id: 'longest-repeating-character-replacement',
    title: 'Longest Repeating Character Replacement',
    leetcodeNumber: 424,
    difficulty: 'Medium',
    patternId: 'sliding-window',
    patternName: 'Sliding Window Frequency Dominance',
    category: 'Sliding Window',
    conceptId: 'sliding-window',
    conceptName: 'Sliding Window Dominant Character Invariant',
    acceptanceRate: '54.9%',
    frequency: 'Top Placement (Google, Amazon, Meta)',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    description: 'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.',
    examples: [
      { input: 's = "ABAB", k = 2', output: '4', explanation: 'Replace the two \'A\'s with \'B\'s or vice versa to get "BBBB" or "AAAA".' },
      { input: 's = "AABABBA", k = 1', output: '4', explanation: 'Replace the middle \'A\' with \'B\' to get "AABBBBA", substring "BBBB" length 4.' }
    ],
    constraints: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters.', '0 <= k <= s.length'],
    patternClues: ['Window valid if: (windowLength - maxFreqCharCount) <= k', 'Expand right, if invalid shrink left by 1'],
    bruteForce: { approach: 'Examine all substrings, check if non-majority chars count <= k.', timeComplexity: 'O(26 * N²)', spaceComplexity: 'O(1)', bottleneck: 'Quadratic substring examination.' },
    optimizedApproach: { concept: 'Sliding window maintaining maxFrequency seen in any valid window.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'Track count[26] and maxCount. If (right - left + 1) - maxCount > k, decrement count[s[left]] and left++. Window size never needs to shrink.' },
    hints: ['The number of characters we need to replace in window [left, right] is (length - maxFrequency).', 'If this replacement count exceeds k, we must contract the window.'],
    pseudocode: `count = new int[26]
maxFreq = 0, left = 0, maxLen = 0
for right in 0..s.length-1:
    count[s[right]-'A']++
    maxFreq = max(maxFreq, count[s[right]-'A'])
    if (right - left + 1) - maxFreq > k:
        count[s[left]-'A']--
        left++
    maxLen = max(maxLen, right - left + 1)
return maxLen`,
    javaSolution: `public class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int maxCount = 0;
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            int charIndex = s.charAt(right) - 'A';
            count[charIndex]++;
            maxCount = Math.max(maxCount, count[charIndex]);

            // Number of characters needing replacement: (windowLen - maxCount)
            while ((right - left + 1) - maxCount > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,
    starterCode: `class Solution {
    public int characterReplacement(String s, int k) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 's = "ABAB", k = 2', expectedOutput: '4' },
      { input: 's = "AABABBA", k = 1', expectedOutput: '4' }
    ],
    hiddenTestCases: [{ input: 's = "AAAA", k = 2', expectedOutput: '4' }],
    interviewExplanationScript: '"Within any sliding window [left, right], the optimal strategy is to convert all minority characters into the most frequent character. Hence, the window is valid if and only if (windowLength - maxFrequency) <= k. We expand the right pointer, tracking character counts and updating maxFrequency. If the required substitutions exceed k, we contract the left pointer. This operates in strictly O(N) time and O(1) space with a 26-element array."'
  },

  // --- CONCEPT: MONOTONIC STACK & EVALUATION ---
  {
    id: 'daily-temperatures',
    title: 'Daily Temperatures',
    leetcodeNumber: 739,
    difficulty: 'Medium',
    patternId: 'monotonic-stack',
    patternName: 'Monotonic Decreasing Stack',
    category: 'Stack',
    conceptId: 'stack',
    conceptName: 'Monotonic Decreasing Stack Next-Greater Index Distance',
    acceptanceRate: '66.2%',
    frequency: 'Top Placement (Amazon, Meta, Google, Microsoft)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.',
    examples: [
      { input: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]', output: '[1, 1, 4, 2, 1, 1, 0, 0]', explanation: 'Next warmer day index differences.' },
      { input: 'temperatures = [30, 40, 50, 60]', output: '[1, 1, 1, 0]', explanation: 'Consecutive days warmer.' }
    ],
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    patternClues: ['Find the next greater element for each index', 'Maintain monotonic decreasing stack storing indices', 'When warmer temp arrives, pop index and record difference (i - poppedIdx)'],
    bruteForce: { approach: 'Nested loop searching forward for first warmer day.', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', bottleneck: 'Quadratic worst-case on descending arrays.' },
    optimizedApproach: { concept: 'Monotonic decreasing stack of indices.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'Iterate i through temperatures. While stack not empty and temperatures[i] > temperatures[stack.peek()]: prevIndex = stack.pop(), res[prevIndex] = i - prevIndex. Then stack.push(i).' },
    hints: ['Store indices on the stack instead of values.', 'Keep temperatures on the stack in strictly non-increasing order.'],
    pseudocode: `stack = new ArrayDeque()
res = new int[n]
for i in 0..n-1:
    while !stack.isEmpty() and temps[i] > temps[stack.peek()]:
        idx = stack.pop()
        res[idx] = i - idx
    stack.push(i)
return res`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
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
        return new int[0];
    }
}`,
    testCases: [
      { input: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]', expectedOutput: '[1, 1, 4, 2, 1, 1, 0, 0]' },
      { input: 'temperatures = [30, 40, 50, 60]', expectedOutput: '[1, 1, 1, 0]' }
    ],
    hiddenTestCases: [{ input: 'temperatures = [30, 60, 90]', expectedOutput: '[1, 1, 0]' }],
    interviewExplanationScript: '"This is a classic Next Greater Element problem solved using a Monotonic Decreasing Stack. We push day indices onto the stack. When we reach day i whose temperature exceeds that of the day at stack.peek(), we know day i is the first warmer day for the day at stack top. We pop and record the difference (i - prevDay). Since each day is pushed and popped at most once, the total runtime is O(N) with O(N) space."'
  },
  {
    id: 'evaluate-reverse-polish-notation',
    title: 'Evaluate Reverse Polish Notation',
    leetcodeNumber: 150,
    difficulty: 'Medium',
    patternId: 'monotonic-stack',
    patternName: 'Operand Stack Evaluation',
    category: 'Stack',
    conceptId: 'stack',
    conceptName: 'Postfix LIFO Operand Arithmetic Stack Evaluation',
    acceptanceRate: '48.9%',
    frequency: 'Top Placement (Amazon, Google, Microsoft)',
    companies: ['Amazon', 'Google', 'Microsoft', 'LinkedIn'],
    description: 'You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation (Postfix). Evaluate the expression. Return an integer that represents the value of the expression. Valid operators are \'+\', \'-\', \'*\', and \'/\'.',
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: '9', explanation: '((2 + 1) * 3) = 9' },
      { input: 'tokens = ["4","13","5","/","+"]', output: '6', explanation: '(4 + (13 / 5)) = 6' }
    ],
    constraints: ['1 <= tokens.length <= 10^4', 'tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].'],
    patternClues: ['Postfix expression evaluation', 'Operands pushed onto stack, operator pops top two operands (b = pop(), a = pop(), calculate a op b)'],
    bruteForce: { approach: 'Regex or recursive replacement of sub-expressions.', timeComplexity: 'O(N²)', spaceComplexity: 'O(N)', bottleneck: 'String parsing overhead.' },
    optimizedApproach: { concept: 'Stack of integers.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'Iterate tokens: if operator, pop b then a, evaluate a op b, push result. Else push Integer.parseInt(token). Return stack.pop().' },
    hints: ['Notice the order of operands: first popped is the right operand, second popped is the left operand.', 'Remember division truncates toward zero in Java.'],
    pseudocode: `stack = new ArrayDeque()
for token in tokens:
    if isOperator(token):
        b = stack.pop()
        a = stack.pop()
        stack.push(apply(a, b, token))
    else:
        stack.push(parseInt(token))
return stack.pop()`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public int evalRPN(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();

        for (String token : tokens) {
            switch (token) {
                case "+":
                    stack.push(stack.pop() + stack.pop());
                    break;
                case "-": {
                    int b = stack.pop();
                    int a = stack.pop();
                    stack.push(a - b);
                    break;
                }
                case "*":
                    stack.push(stack.pop() * stack.pop());
                    break;
                case "/": {
                    int b = stack.pop();
                    int a = stack.pop();
                    stack.push(a / b);
                    break;
                }
                default:
                    stack.push(Integer.parseInt(token));
                    break;
            }
        }

        return stack.pop();
    }
}`,
    starterCode: `class Solution {
    public int evalRPN(String[] tokens) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'tokens = ["2", "1", "+", "3", "*"]', expectedOutput: '9' },
      { input: 'tokens = ["4", "13", "5", "/", "+"]', expectedOutput: '6' }
    ],
    hiddenTestCases: [{ input: 'tokens = ["18"]', expectedOutput: '18' }],
    interviewExplanationScript: '"In Reverse Polish Notation, operators follow their operands. We use an operand stack. As we iterate through the tokens, any numerical value is parsed and pushed onto the stack. When an operator is encountered, we pop the top two numbers—noting that the first popped is the right operand and the second is the left operand—evaluate the operation, and push the result back onto the stack. At the end, the stack top contains the evaluated result. Runs in O(N) time and O(N) space."'
  }
];
