import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART1: Problem[] = [
  // --- CONCEPT: ARRAYS & HASHING ---
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    leetcodeNumber: 217,
    difficulty: 'Easy',
    patternId: 'hash-map',
    patternName: 'Hash Set Lookup',
    category: 'Arrays & Hashing',
    conceptId: 'arrays-hashing',
    conceptName: 'Hash Set O(1) Membership Lookup',
    acceptanceRate: '61.8%',
    frequency: 'Very High (Standard Screening)',
    companies: ['Amazon', 'Apple', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: 'true', explanation: '1 appears twice.' },
      { input: 'nums = [1, 2, 3, 4]', output: 'false', explanation: 'All elements distinct.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    patternClues: ['Detecting duplicates without sorting', 'Requires O(1) amortized lookup via HashSet'],
    bruteForce: { approach: 'Nested loop comparing every pair.', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', bottleneck: 'Pairwise quadratic comparisons.' },
    optimizedApproach: { concept: 'Insert each element into a HashSet.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'If set.add(x) returns false, duplicate found.' },
    hints: ['Can you use a data structure that provides constant-time containment check?', 'HashSet.add() returns false if item already exists.'],
    pseudocode: `set = new HashSet()
for x in nums:
    if !set.add(x): return true
return false`,
    javaSolution: `import java.util.HashSet;
import java.util.Set;

public class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) {
                return true;
            }
        }
        return false;
    }
}`,
    starterCode: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 'nums = [1, 2, 3, 1]', expectedOutput: 'true' },
      { input: 'nums = [1, 2, 3, 4]', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 'nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]', expectedOutput: 'true' }],
    interviewExplanationScript: '"We iterate through the array maintaining a HashSet. For each element, if it is already present in the set, we immediately return true. Otherwise, we add it. If the loop completes without finding duplicates, we return false. Time complexity is O(N) and space complexity is O(N)."'
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    leetcodeNumber: 242,
    difficulty: 'Easy',
    patternId: 'hash-map',
    patternName: 'Hash Table / Frequency Array',
    category: 'Arrays & Hashing',
    conceptId: 'arrays-hashing',
    conceptName: 'Alphabet Frequency Counting Vector',
    acceptanceRate: '64.5%',
    frequency: 'Top Placement (Amazon, Google, Microsoft)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg', 'Goldman Sachs'],
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Same letters and counts.' },
      { input: 's = "rat", t = "car"', output: 'false', explanation: 'Different characters.' }
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    patternClues: ['Compare character distributions', 'Fixed alphabet size 26 allows int[26] frequency vector'],
    bruteForce: { approach: 'Sort both strings and compare.', timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)', bottleneck: 'Sorting overhead.' },
    optimizedApproach: { concept: 'Single 26-element integer frequency table.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'Increment for s[i] and decrement for t[i]. Verify all entries are 0.' },
    hints: ['If lengths differ, return false immediately.', 'Use int[26] array to count letter occurrences.'],
    pseudocode: `if s.length != t.length: return false
count = new int[26]
for i in 0..s.length: count[s[i]-'a']++, count[t[i]-'a']--
for c in count: if c != 0: return false
return true`,
    javaSolution: `public class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
}`,
    starterCode: `class Solution {
    public boolean isAnagram(String s, String t) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expectedOutput: 'true' },
      { input: 's = "rat", t = "car"', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 's = "a", t = "ab"', expectedOutput: 'false' }],
    interviewExplanationScript: '"An anagram requires identical character counts. If string lengths differ, we fail fast. Otherwise, we maintain a 26-size integer array, incrementing for chars in s and decrementing for chars in t in a single pass. If all counts return to zero, they are valid anagrams. Runs in O(N) time and O(1) auxiliary space."'
  },
  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    leetcodeNumber: 238,
    difficulty: 'Medium',
    patternId: 'prefix-sum',
    patternName: 'Prefix & Suffix Products',
    category: 'Arrays & Hashing',
    conceptId: 'arrays-hashing',
    conceptName: 'Prefix & Suffix Cumulative Running Product',
    acceptanceRate: '66.1%',
    frequency: 'Top Placement (Amazon, Meta, Google, Microsoft)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Apple', 'Uber'],
    description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(N) time and without using the division operation.',
    examples: [
      { input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]', explanation: 'Prefix products * suffix products.' },
      { input: 'nums = [-1, 1, 0, -3, 3]', output: '[0, 0, 9, 0, 0]', explanation: 'Zeros handled without division.' }
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'Must not use division.'],
    patternClues: ['Calculate product excluding nums[i]', 'answer[i] = (product of nums[0..i-1]) * (product of nums[i+1..n-1])'],
    bruteForce: { approach: 'Nested loop calculating product for each index.', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', bottleneck: 'Repeated multiplication.' },
    optimizedApproach: { concept: 'Two passes accumulating prefix product into result array, then accumulating suffix product.', timeComplexity: 'O(N)', spaceComplexity: 'O(1) extra space', keyIdea: 'In pass 1, res[i] = product of all elements to the left. In pass 2, maintain rightProd variable backwards.' },
    hints: ['How can prefix products help?', 'You can store the left products directly in the output array to achieve O(1) extra space.'],
    pseudocode: `res[0] = 1
for i in 1..n-1: res[i] = res[i-1] * nums[i-1]
right = 1
for i in n-1 downTo 0:
    res[i] = res[i] * right
    right *= nums[i]
return res`,
    javaSolution: `public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        // Pass 1: res[i] contains product of elements to the left of i
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }

        // Pass 2: Multiply by product of elements to the right of i
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] = res[i] * right;
            right *= nums[i];
        }

        return res;
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
    hiddenTestCases: [{ input: 'nums = [4, 5, 1, 8, 2]', expectedOutput: '[80, 64, 320, 40, 160]' }],
    interviewExplanationScript: '"Since division is prohibited, we observe that any element answer[i] is the product of all elements to its left multiplied by all elements to its right. We compute left prefix products directly in the output array in a first pass. Then in a reverse pass, we maintain a running right product multiplier. This satisfies O(N) time and O(1) auxiliary space beyond the output array."'
  },
  {
    id: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    leetcodeNumber: 128,
    difficulty: 'Medium',
    patternId: 'hash-map',
    patternName: 'Hash Set Sequence Expansion',
    category: 'Arrays & Hashing',
    conceptId: 'arrays-hashing',
    conceptName: 'Hash Set Streak Sequence Identification',
    acceptanceRate: '47.8%',
    frequency: 'Top Placement (Google, Amazon, Meta)',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(N) time.',
    examples: [
      { input: 'nums = [100, 4, 200, 1, 3, 2]', output: '4', explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Length = 4.' },
      { input: 'nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]', output: '9', explanation: 'Sequence is 0 through 8, length = 9.' }
    ],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', 'Must be O(N) time.'],
    patternClues: ['Must run in O(N) time so sorting is not allowed', 'A number is the start of a streak if and only if num - 1 is NOT in the set'],
    bruteForce: { approach: 'Sort the array in O(N log N) and count consecutive elements.', timeComplexity: 'O(N log N)', spaceComplexity: 'O(1)', bottleneck: 'Sorting violates O(N) constraint.' },
    optimizedApproach: { concept: 'Load nums into a HashSet. Only expand streaks from sequence start numbers.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'Check if (!set.contains(num - 1)). Only then count while set.contains(num + length).' },
    hints: ['Store all numbers in a HashSet.', 'Only start expanding a streak if the current number is the beginning of a sequence (i.e. num - 1 is not in set).'],
    pseudocode: `set = new HashSet(nums)
longest = 0
for num in set:
    if !set.contains(num - 1):
        curr = num
        streak = 1
        while set.contains(curr + 1):
            curr++, streak++
        longest = max(longest, streak)
return longest`,
    javaSolution: `import java.util.HashSet;
import java.util.Set;

public class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums == null || nums.length == 0) return 0;

        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }

        int longestStreak = 0;

        for (int num : numSet) {
            // Only start counting if 'num' is the beginning of a sequence
            if (!numSet.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (numSet.contains(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }

                longestStreak = Math.max(longestStreak, currentStreak);
            }
        }

        return longestStreak;
    }
}`,
    starterCode: `class Solution {
    public int longestConsecutive(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [100, 4, 200, 1, 3, 2]', expectedOutput: '4' },
      { input: 'nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]', expectedOutput: '9' }
    ],
    hiddenTestCases: [{ input: 'nums = []', expectedOutput: '0' }],
    interviewExplanationScript: '"Sorting takes O(N log N), which exceeds the requirement. Instead, we insert all numbers into a HashSet for O(1) lookups. To avoid quadratic work, we only initiate a count if the number is the start of a streak—meaning (num - 1) is NOT in the set. Since each number is visited at most twice (once in outer iteration, once in while loop), total runtime is strictly O(N) with O(N) space."'
  },
  {
    id: 'majority-element',
    title: 'Majority Element',
    leetcodeNumber: 169,
    difficulty: 'Easy',
    patternId: 'two-pointers',
    patternName: 'Boyer-Moore Voting',
    category: 'Arrays & Hashing',
    conceptId: 'arrays-hashing',
    conceptName: 'Boyer-Moore Linear Majority Voting Algorithm',
    acceptanceRate: '65.2%',
    frequency: 'High (Standard Placement Screener)',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta'],
    description: 'Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array. Can you solve it in O(N) time and O(1) space?',
    examples: [
      { input: 'nums = [3, 2, 3]', output: '3', explanation: '3 appears 2 times out of 3.' },
      { input: 'nums = [2, 2, 1, 1, 1, 2, 2]', output: '2', explanation: '2 appears 4 times out of 7.' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
    patternClues: ['Appears more than n/2 times', 'Opposing pairs cancel out'],
    bruteForce: { approach: 'HashMap counting occurrences.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'O(N) memory allocation.' },
    optimizedApproach: { concept: 'Boyer-Moore Voting Algorithm.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'Maintain candidate and count. If count == 0, candidate = num. If num == candidate, count++, else count--.' },
    hints: ['If you pair up distinct elements and discard both, the majority element will still remain.', 'Keep track of candidate and count.'],
    pseudocode: `count = 0, candidate = 0
for num in nums:
    if count == 0: candidate = num
    count += (num == candidate) ? 1 : -1
return candidate`,
    javaSolution: `public class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        int candidate = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            if (num == candidate) {
                count++;
            } else {
                count--;
            }
        }

        return candidate;
    }
}`,
    starterCode: `class Solution {
    public int majorityElement(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [3, 2, 3]', expectedOutput: '3' },
      { input: 'nums = [2, 2, 1, 1, 1, 2, 2]', expectedOutput: '2' }
    ],
    hiddenTestCases: [{ input: 'nums = [1]', expectedOutput: '1' }],
    interviewExplanationScript: '"We apply the Boyer-Moore Voting Algorithm. Because the majority element appears more than n/2 times, its count will outweigh all other non-majority votes combined. When count drops to 0, we select the current number as the new candidate. This achieves O(N) time and optimal O(1) space."'
  },

  // --- CONCEPT: TWO POINTERS ---
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    leetcodeNumber: 125,
    difficulty: 'Easy',
    patternId: 'two-pointers',
    patternName: 'Two Pointers Colliding',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'Two-Pointer Inward Alphanumeric Scan',
    acceptanceRate: '46.7%',
    frequency: 'Top Placement (Meta, Microsoft, Amazon)',
    companies: ['Meta', 'Microsoft', 'Amazon', 'Google', 'Apple'],
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' }
    ],
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    patternClues: ['Compare from both ends towards center', 'Skip non-alphanumeric characters dynamically'],
    bruteForce: { approach: 'Filter string to new lowercase string, then reverse and compare.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Extra string allocations.' },
    optimizedApproach: { concept: 'Two pointers at head and tail skipping invalid chars.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'While left < right, skip non-alphanumeric chars. If Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right)), return false.' },
    hints: ['Use Character.isLetterOrDigit() to skip punctuation.', 'Use Character.toLowerCase() for case-insensitive matching.'],
    pseudocode: `left = 0, right = s.length - 1
while left < right:
    while left < right and !isLetterOrDigit(s[left]): left++
    while left < right and !isLetterOrDigit(s[right]): right--
    if toLower(s[left]) != toLower(s[right]): return false
    left++, right--
return true`,
    javaSolution: `public class Solution {
    public boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }

            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}`,
    starterCode: `class Solution {
    public boolean isPalindrome(String s) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 's = "A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: 's = "race a car"', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 's = " "', expectedOutput: 'true' }],
    interviewExplanationScript: '"We position pointers at the front and end of the string. In each step, we advance pointers past any non-alphanumeric characters, then compare the lowercase values. If they ever mismatch, we return false. This avoids creating helper strings, giving O(N) time and O(1) space."'
  },
  {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    leetcodeNumber: 283,
    difficulty: 'Easy',
    patternId: 'two-pointers',
    patternName: 'Fast & Slow Writer Pointers',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'In-Place Partitioning / Write-Pointer Compaction',
    acceptanceRate: '61.7%',
    frequency: 'Top Placement (Meta, Amazon, Microsoft)',
    companies: ['Meta', 'Amazon', 'Microsoft', 'Apple', 'Bloomberg'],
    description: 'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.',
    examples: [
      { input: 'nums = [0, 1, 0, 3, 12]', output: '[1, 3, 12, 0, 0]', explanation: 'Non-zeroes preserved in order, zeroes shifted right.' },
      { input: 'nums = [0]', output: '[0]', explanation: 'Single zero stays zero.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    patternClues: ['In-place compaction', 'Maintain order of non-zero elements: writer pointer pattern'],
    bruteForce: { approach: 'Copy non-zeroes to new array, fill remainder with zeroes.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Violates in-place constraint.' },
    optimizedApproach: { concept: 'Slow write pointer for next non-zero position.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'Whenever fast pointer encounters non-zero, swap nums[slow] and nums[fast], then slow++.' },
    hints: ['Think of this as partitioning: all non-zeroes to left, zeroes to right.', 'Maintain a pointer for where the next non-zero should go.'],
    pseudocode: `slow = 0
for fast in 0..n-1:
    if nums[fast] != 0:
        swap(nums[slow], nums[fast])
        slow++`,
    javaSolution: `public class Solution {
    public void moveZeroes(int[] nums) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                int temp = nums[slow];
                nums[slow] = nums[fast];
                nums[fast] = temp;
                slow++;
            }
        }
    }
}`,
    starterCode: `class Solution {
    public void moveZeroes(int[] nums) {
        // Write your solution here
    }
}`,
    testCases: [
      { input: 'nums = [0, 1, 0, 3, 12]', expectedOutput: '[1, 3, 12, 0, 0]' },
      { input: 'nums = [0]', expectedOutput: '[0]' }
    ],
    hiddenTestCases: [{ input: 'nums = [1, 0, 1]', expectedOutput: '[1, 1, 0]' }],
    interviewExplanationScript: '"We use a fast-and-slow two-pointer approach. The slow pointer marks the target index for the next non-zero element. When the fast pointer encounters a non-zero, we swap nums[slow] and nums[fast] and increment slow. This preserves the relative order of non-zero elements while pushing all zeroes to the end in O(N) time and O(1) space."'
  },
  {
    id: 'sort-colors',
    title: 'Sort Colors (Dutch National Flag)',
    leetcodeNumber: 75,
    difficulty: 'Medium',
    patternId: 'two-pointers',
    patternName: 'Three-Way Partitioning',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'Dutch National Flag 3-Way Partitioning (Dijkstra)',
    acceptanceRate: '61.4%',
    frequency: 'Top Placement (Amazon, Microsoft, Meta)',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google', 'Apple'],
    description: 'Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the colors red, white, and blue respectively. You must solve this problem without using the library\'s sort function and in one pass.',
    examples: [
      { input: 'nums = [2, 0, 2, 1, 1, 0]', output: '[0, 0, 1, 1, 2, 2]', explanation: '0s first, 1s middle, 2s end.' },
      { input: 'nums = [2, 0, 1]', output: '[0, 1, 2]', explanation: 'Sorted order.' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 300', 'nums[i] is either 0, 1, or 2.'],
    patternClues: ['Three distinct categories', 'One-pass in-place partitioning: Dijkstra Dutch National Flag'],
    bruteForce: { approach: 'Counting sort in two passes: count 0s, 1s, 2s, overwrite array.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', bottleneck: 'Requires two passes.' },
    optimizedApproach: { concept: 'Three pointers: low (next 0), mid (current), high (next 2).', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'If nums[mid]==0 swap(low++, mid++); if nums[mid]==1 mid++; if nums[mid]==2 swap(mid, high--).' },
    hints: ['Maintain three sections: [0..low-1] are 0s, [low..mid-1] are 1s, [high+1..n-1] are 2s.', 'Careful: when swapping with high, do NOT increment mid because the swapped element is uninspected.'],
    pseudocode: `low = 0, mid = 0, high = n - 1
while mid <= high:
    if nums[mid] == 0: swap(low++, mid++)
    else if nums[mid] == 1: mid++
    else: swap(mid, high--)`,
    javaSolution: `public class Solution {
    public void sortColors(int[] nums) {
        int low = 0;
        int mid = 0;
        int high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
            }
        }
    }
}`,
    starterCode: `class Solution {
    public void sortColors(int[] nums) {
        // Write your solution here
    }
}`,
    testCases: [
      { input: 'nums = [2, 0, 2, 1, 1, 0]', expectedOutput: '[0, 0, 1, 1, 2, 2]' },
      { input: 'nums = [2, 0, 1]', expectedOutput: '[0, 1, 2]' }
    ],
    hiddenTestCases: [{ input: 'nums = [0]', expectedOutput: '[0]' }],
    interviewExplanationScript: '"This is the classic Dutch National Flag 3-way partitioning problem. We maintain three invariants: elements before low are 0s, elements after high are 2s, and elements between low and mid-1 are 1s. We process nums[mid]: if 0, swap with low and advance both; if 1, advance mid; if 2, swap with high and decrement high without advancing mid since the swapped item is uninspected. This runs in a single pass in O(N) time and O(1) space."'
  },

  // --- CONCEPT: SLIDING WINDOW ---
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    leetcodeNumber: 121,
    difficulty: 'Easy',
    patternId: 'sliding-window',
    patternName: 'Greedy One-Pass Min Tracking',
    category: 'Sliding Window',
    conceptId: 'sliding-window',
    conceptName: 'Dynamic Minimum Valley Tracking / Kadane 1D',
    acceptanceRate: '54.1%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Bloomberg'],
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples: [
      { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.' },
      { input: 'prices = [7, 6, 4, 3, 1]', output: '0', explanation: 'In this case, no transactions are done and max profit = 0.' }
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    patternClues: ['Find max difference with j > i', 'Track running minimum price seen so far'],
    bruteForce: { approach: 'Check every buy-sell pair (i, j) with j > i.', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', bottleneck: 'Quadratic pair comparisons.' },
    optimizedApproach: { concept: 'Single pass maintaining minPrice so far and maxProfit.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'For each price, update minPrice = min(minPrice, price), and maxProfit = max(maxProfit, price - minPrice).' },
    hints: ['If you sell on day i, what was the best day to have bought? The day with the lowest price prior to day i.', 'Keep track of the minimum price as you scan forward.'],
    pseudocode: `minPrice = infinity, maxProfit = 0
for p in prices:
    minPrice = min(minPrice, p)
    maxProfit = max(maxProfit, p - minPrice)
return maxProfit`,
    javaSolution: `public class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else {
                maxProfit = Math.max(maxProfit, price - minPrice);
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
    hiddenTestCases: [{ input: 'prices = [2, 4, 1]', expectedOutput: '2' }],
    interviewExplanationScript: '"To maximize profit when selling on any given day, we should have bought at the lowest price observed before that day. We iterate through the price array in a single pass, updating the historical minimum price and computing potential profit. This gives an optimal O(N) time and O(1) space solution."'
  },
  {
    id: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    leetcodeNumber: 3,
    difficulty: 'Medium',
    patternId: 'sliding-window',
    patternName: 'Variable Sliding Window',
    category: 'Sliding Window',
    conceptId: 'sliding-window',
    conceptName: 'Dynamic Window with Last-Seen Index Map',
    acceptanceRate: '34.8%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Bloomberg'],
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with length 3.' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    patternClues: ['Contiguous substring without duplicates', 'Sliding window [left, right] jumping left pointer past previous occurrence'],
    bruteForce: { approach: 'Check all O(N²) substrings for duplicates.', timeComplexity: 'O(N³)', spaceComplexity: 'O(min(N, M))', bottleneck: 'Cubic substring generation and validation.' },
    optimizedApproach: { concept: 'Sliding window tracking character last seen index in an array or map.', timeComplexity: 'O(N)', spaceComplexity: 'O(min(N, M))', keyIdea: 'When duplicate char c is seen at index lastIndex >= left, contract window by jumping left = lastIndex + 1.' },
    hints: ['Use an array int[128] or Map<Character, Integer> to remember the latest index of each character.', 'If the character was seen inside current window, move the left pointer past it.'],
    pseudocode: `lastSeen = new int[128] filled with -1
left = 0, maxLen = 0
for right in 0..s.length-1:
    c = s[right]
    if lastSeen[c] >= left:
        left = lastSeen[c] + 1
    lastSeen[c] = right
    maxLen = max(maxLen, right - left + 1)
return maxLen`,
    javaSolution: `public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] lastSeen = new int[128];
        for (int i = 0; i < 128; i++) lastSeen[i] = -1;

        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen[c] >= left) {
                left = lastSeen[c] + 1;
            }
            lastSeen[c] = right;
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
    hiddenTestCases: [{ input: 's = "abba"', expectedOutput: '2' }],
    interviewExplanationScript: '"We maintain a variable sliding window [left, right] and store the last observed index of each character in an ASCII array. When character s[right] has been seen within our current window (lastSeen[c] >= left), we jump the left boundary to lastSeen[c] + 1, thereby evicting the duplicate in O(1) time without shrinking one by one. This achieves optimal O(N) time and O(1) space for standard character sets."'
  },
  {
    id: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    leetcodeNumber: 76,
    difficulty: 'Hard',
    patternId: 'sliding-window',
    patternName: 'Sliding Window Frequency Invariant',
    category: 'Sliding Window',
    conceptId: 'sliding-window',
    conceptName: 'Sliding Window Frequency Match Vector Invariant',
    acceptanceRate: '42.1%',
    frequency: 'Top Placement (Meta, Google, Amazon, Microsoft)',
    companies: ['Meta', 'Google', 'Amazon', 'Microsoft', 'Bloomberg', 'Uber'],
    description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: '"BANC" includes A, B, and C.' },
      { input: 's = "a", t = "a"', output: '"a"', explanation: 'Entire string.' },
      { input: 's = "a", t = "aa"', output: '""', explanation: 'Both a characters must be present, impossible.' }
    ],
    constraints: ['m == s.length, n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
    patternClues: ['Find smallest substring containing all target characters', 'Track matchCount of target characters satisfied'],
    bruteForce: { approach: 'Examine all O(M²) substrings and check if they contain t.', timeComplexity: 'O(M² * N)', spaceComplexity: 'O(M + N)', bottleneck: 'Polynomial scanning.' },
    optimizedApproach: { concept: 'Expand right to satisfy all requirements, contract left to minimize.', timeComplexity: 'O(M + N)', spaceComplexity: 'O(1) with 128-element table', keyIdea: 'Maintain targetCount[] and haveCount[]. Track matched count of characters. When matched == requiredUnique, contract left while valid.' },
    hints: ['Count frequency of each character in t.', 'Expand right until all characters in t are covered, then shrink left to find the minimal valid window.'],
    pseudocode: `countT = new int[128]
for c in t: countT[c]++
required = number of unique chars in t with count > 0
formed = 0, left = 0, minLen = inf, startIdx = 0
for right in 0..s.length-1:
    c = s[right]
    window[c]++
    if window[c] == countT[c]: formed++
    while formed == required:
        update minLen, startIdx
        window[s[left]]--
        if window[s[left]] < countT[s[left]]: formed--
        left++
return s.substring(startIdx, startIdx + minLen)`,
    javaSolution: `public class Solution {
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";

        int[] map = new int[128];
        for (char c : t.toCharArray()) {
            map[c]++;
        }

        int count = t.length();
        int left = 0, right = 0;
        int minLen = Integer.MAX_VALUE;
        int start = 0;

        while (right < s.length()) {
            char rChar = s.charAt(right);
            if (map[rChar] > 0) {
                count--;
            }
            map[rChar]--;
            right++;

            while (count == 0) {
                if (right - left < minLen) {
                    minLen = right - left;
                    start = left;
                }

                char lChar = s.charAt(left);
                map[lChar]++;
                if (map[lChar] > 0) {
                    count++;
                }
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }
}`,
    starterCode: `class Solution {
    public String minWindow(String s, String t) {
        // Write your solution here
        return "";
    }
}`,
    testCases: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', expectedOutput: '"BANC"' },
      { input: 's = "a", t = "a"', expectedOutput: '"a"' }
    ],
    hiddenTestCases: [{ input: 's = "a", t = "aa"', expectedOutput: '""' }],
    interviewExplanationScript: '"We use an expanding and contracting sliding window. We populate a frequency map for t. We expand the right pointer, decrementing character requirements; when count hits 0, all characters in t are satisfied. We then greedily contract the left pointer to find the minimal valid window, updating the minimum length. Each character is visited at most twice, resulting in O(M + N) time and O(1) auxiliary space."'
  }
];
