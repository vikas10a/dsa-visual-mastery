import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART11: Problem[] = [
  // --- CONCEPT: TWO POINTERS ---
  {
    id: 'two-sum-ii',
    title: 'Two Sum II - Input Array Is Sorted',
    leetcodeNumber: 167,
    difficulty: 'Medium',
    patternId: 'two-pointers',
    patternName: 'Converging Sorted Pointers',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'Sorted Sequence Converging Bounded Sum Invariant',
    acceptanceRate: '61.4%',
    frequency: 'Top Placement (Amazon, Google, Meta, Apple)',
    companies: ['Amazon', 'Google', 'Meta', 'Apple'],
    description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2. Your solution must use only constant O(1) extra space.',
    examples: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: 'The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2. We return [1, 2].' },
      { input: 'numbers = [2,3,4], target = 6', output: '[1,3]', explanation: '2 + 4 = 6. index1 = 1, index2 = 3.' },
      { input: 'numbers = [-1,0], target = -1', output: '[1,2]', explanation: '-1 + 0 = -1. index1 = 1, index2 = 2.' }
    ],
    constraints: ['2 <= numbers.length <= 3 * 10^4', '-1000 <= numbers[i] <= 1000', 'numbers is sorted in non-decreasing order.', 'Exactly one solution exists.'],
    patternClues: ['Sorted array with O(1) space constraint', 'Left pointer at 0, right pointer at n-1. If sum < target, left++. If sum > target, right--.'],
    bruteForce: { approach: 'Nested loops checking all pairs.', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', bottleneck: 'Quadratic pair checking.' },
    optimizedApproach: { concept: 'Two converging pointers starting at opposite boundaries.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'Because the array is sorted, incrementing left increases sum, and decrementing right decreases sum. Converge until numbers[left] + numbers[right] == target.' },
    hints: ['How does sorting help us eliminate choices without checking?', 'If numbers[left] + numbers[right] < target, can numbers[right] pair with any element to the left of right to make target? No.'],
    pseudocode: `left = 0, right = n - 1
while left < right:
    sum = numbers[left] + numbers[right]
    if sum == target: return [left + 1, right + 1]
    else if sum < target: left++
    else: right--`,
    javaSolution: `public class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];

            if (sum == target) {
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
        return new int[0];
    }
}`,
    testCases: [
      { input: 'numbers = [2,7,11,15], target = 9', expectedOutput: '[1, 2]' },
      { input: 'numbers = [2,3,4], target = 6', expectedOutput: '[1, 3]' }
    ],
    hiddenTestCases: [{ input: 'numbers = [-1,0], target = -1', expectedOutput: '[1, 2]' }],
    interviewExplanationScript: '"Because the array is strictly sorted in non-decreasing order, we can initialize two pointers at the extreme ends: left at index 0 and right at index n - 1. If their sum is less than target, any pair involving the current left element with a smaller right element would also be too small, so left must advance. Conversely, if the sum exceeds target, right must decrement. This systematically eliminates an entire row or column of search space at each iteration, achieving linear O(N) time and strictly O(1) auxiliary space."'
  },
  {
    id: 'valid-palindrome-ii',
    title: 'Valid Palindrome II (At Most One Deletion)',
    leetcodeNumber: 680,
    difficulty: 'Easy',
    patternId: 'two-pointers',
    patternName: 'Greedy Mismatch Branching',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'Two-Pointer Tolerant Palindromic Single-Skip Invariant',
    acceptanceRate: '40.8%',
    frequency: 'Top Placement (Meta, Google, Amazon)',
    companies: ['Meta', 'Google', 'Amazon', 'Microsoft'],
    description: 'Given a string s, return true if the s can be palindrome after deleting at most one character from it.',
    examples: [
      { input: 's = "aba"', output: 'true', explanation: 'Already palindrome.' },
      { input: 's = "abca"', output: 'true', explanation: 'Delete \'c\' to get "aba".' },
      { input: 's = "abc"', output: 'false', explanation: 'Cannot form palindrome with 1 deletion.' }
    ],
    constraints: ['1 <= s.length <= 10^5', 's consists of lowercase English letters.'],
    patternClues: ['Palindrome with at most 1 deletion allowed', 'When s[left] != s[right], branch into checking if substring(left+1, right) OR substring(left, right-1) is a palindrome'],
    bruteForce: { approach: 'Try deleting each character one by one and check if result is palindrome.', timeComplexity: 'O(N²)', spaceComplexity: 'O(N)', bottleneck: 'Testing all N deletions.' },
    optimizedApproach: { concept: 'Two pointers with at most one branching decision on mismatch.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'Advance left and right inward. On first mismatch s[left] != s[right], check if s[left+1..right] is palindrome or s[left..right-1] is palindrome.' },
    hints: ['When a mismatch occurs, you only have two options: skip s[left] or skip s[right].', 'Once you skip one character, the remainder of the substring must be an exact palindrome.'],
    pseudocode: `left = 0, right = s.length - 1
while left < right:
    if s[left] != s[right]:
        return isPal(s, left + 1, right) or isPal(s, left, right - 1)
    left++; right--
return true`,
    javaSolution: `public class Solution {
    public boolean validPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                // We have one chance to delete either s[left] or s[right]
                return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
            }
            left++;
            right--;
        }

        return true;
    }

    private boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
    starterCode: `class Solution {
    public boolean validPalindrome(String s) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 's = "aba"', expectedOutput: 'true' },
      { input: 's = "abca"', expectedOutput: 'true' },
      { input: 's = "abc"', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 's = "deeee"', expectedOutput: 'true' }],
    interviewExplanationScript: '"We converge inward with two pointers left and right. While characters match, both pointers move inward. Upon the first character mismatch (s[left] != s[right]), we are permitted at most one deletion. Our only two choices are skipping the character at left (testing substring [left+1, right]) or skipping the character at right (testing substring [left, right-1]). If either sub-problem is a strict palindrome, we return true. Since the helper runs in linear time and is called at most twice, total time is O(N) with O(1) space."'
  },
  {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    leetcodeNumber: 283,
    difficulty: 'Easy',
    patternId: 'two-pointers',
    patternName: 'Fast-Slow Partitioning In-Place',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'In-Place Fast-Slow Partition Swap (Zero Compaction)',
    acceptanceRate: '61.8%',
    frequency: 'Top Placement (Meta, Amazon, Google, Microsoft)',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements. You must do this in-place without making a copy of the array.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]', explanation: 'Zeros moved to end, order preserved.' },
      { input: 'nums = [0]', output: '[0]', explanation: 'Single zero.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    patternClues: ['In-place compaction maintaining relative order', 'Slow pointer marks boundary of non-zero elements; fast pointer scans ahead and swaps non-zeros with slow'],
    bruteForce: { approach: 'Create a new array, copy non-zero elements, fill rest with zeros.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'Violates in-place requirement.' },
    optimizedApproach: { concept: 'Slow-pointer write index with in-place swap.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'insertPos = 0. For i in 0..n-1: if nums[i] != 0, swap nums[i] with nums[insertPos] and insertPos++.' },
    hints: ['Keep a pointer for where the next non-zero should be placed.', 'Swapping preserves all values and zeros without needing an extra array.'],
    pseudocode: `insertPos = 0
for i in 0..n-1:
    if nums[i] != 0:
        swap(nums[insertPos], nums[i])
        insertPos++`,
    javaSolution: `public class Solution {
    public void moveZeroes(int[] nums) {
        int insertPos = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                // Swap current non-zero element with the element at insertPos
                int temp = nums[insertPos];
                nums[insertPos] = nums[i];
                nums[i] = temp;
                insertPos++;
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
      { input: 'nums = [0,1,0,3,12]', expectedOutput: '[1, 3, 12, 0, 0]' },
      { input: 'nums = [0]', expectedOutput: '[0]' }
    ],
    hiddenTestCases: [{ input: 'nums = [1]', expectedOutput: '[1]' }],
    interviewExplanationScript: '"To compact all zeroes to the end in-place while preserving relative order, we use a two-pointer partitioning approach. insertPos tracks the boundary where the next non-zero element belongs. We iterate index i from 0 to n - 1. Whenever nums[i] is non-zero, we swap nums[insertPos] with nums[i] and increment insertPos. This guarantees every non-zero shifts to the front in its original order and zeroes naturally accumulate at the rear. Runs in O(N) time with strictly O(1) space."'
  },

  // --- CONCEPT: SLIDING WINDOW FIXED ---
  {
    id: 'permutation-in-string',
    title: 'Permutation in String',
    leetcodeNumber: 567,
    difficulty: 'Medium',
    patternId: 'sliding-window',
    patternName: 'Fixed-Size Sliding Window Character Frequency Matching',
    category: 'Sliding Window',
    conceptId: 'sliding-window',
    conceptName: 'Fixed-Width Sliding Window Character Frequency Hash Vector',
    acceptanceRate: '44.5%',
    frequency: 'Top Placement (Meta, Microsoft, Amazon, Google)',
    companies: ['Meta', 'Microsoft', 'Amazon', 'Google'],
    description: 'Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1\'s permutations is the substring of s2.',
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explanation: 's2 contains "ba" which is a permutation of "ab".' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false', explanation: 'No substring is a permutation of "ab".' }
    ],
    constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters.'],
    patternClues: ['Check if any substring of length len(s1) matches s1 frequency count', 'Fixed sliding window of size len(s1) over s2 using 26-element frequency vector'],
    bruteForce: { approach: 'Generate all permutations of s1 and check s2.contains.', timeComplexity: 'O(N! * M)', spaceComplexity: 'O(N)', bottleneck: 'Factorial permutation count.' },
    optimizedApproach: { concept: 'Fixed-size sliding window with 26-int frequency matching.', timeComplexity: 'O(N2)', spaceComplexity: 'O(1) (26-element arrays)', keyIdea: 'Window size is s1.length(). Count chars of s1 and first window of s2. Slide window across s2: add s2[i], remove s2[i - s1.length()]. Check Arrays.equals().' },
    hints: ['A permutation has identical character frequencies.', 'The window length in s2 is fixed at s1.length().'],
    pseudocode: `count1 = new int[26], count2 = new int[26]
for c in s1: count1[c - 'a']++
for i in 0..s2.length-1:
    count2[s2[i] - 'a']++
    if i >= s1.length: count2[s2[i - s1.length] - 'a']--
    if Arrays.equals(count1, count2): return true
return false`,
    javaSolution: `import java.util.Arrays;

public class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;

        int[] count1 = new int[26];
        int[] count2 = new int[26];

        for (int i = 0; i < s1.length(); i++) {
            count1[s1.charAt(i) - 'a']++;
            count2[s2.charAt(i) - 'a']++;
        }

        if (Arrays.equals(count1, count2)) return true;

        for (int i = s1.length(); i < s2.length(); i++) {
            count2[s2.charAt(i) - 'a']++;
            count2[s2.charAt(i - s1.length()) - 'a']--;

            if (Arrays.equals(count1, count2)) {
                return true;
            }
        }

        return false;
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
    interviewExplanationScript: '"Any valid permutation of string s1 has identical character counts and the exact same length as s1. Therefore, the problem reduces to checking whether any fixed-size window of length s1.length() in s2 matches s1\'s character frequency array. We maintain two frequency arrays of size 26. We slide the window across s2 by adding the incoming character and subtracting the outgoing character at each step. Comparing the 26-element arrays takes O(1) time, yielding total time O(len(s2)) and O(1) space."'
  },

  // --- CONCEPT: STACK MONOTONIC ---
  {
    id: 'next-greater-element-i',
    title: 'Next Greater Element I',
    leetcodeNumber: 496,
    difficulty: 'Easy',
    patternId: 'monotonic-stack',
    patternName: 'Monotonic Decreasing Stack with Hash Table',
    category: 'Stack',
    conceptId: 'stack',
    conceptName: 'Monotonic Decreasing Stack Resolution into Lookup Map',
    acceptanceRate: '72.3%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2. For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1. Return an array ans of length nums1.length.',
    examples: [
      { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]', explanation: 'For 4: no greater. For 1: next greater is 3. For 2: no greater.' },
      { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', output: '[3,-1]', explanation: 'For 2: next is 3. For 4: no greater.' }
    ],
    constraints: ['1 <= nums1.length <= nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 10^4', 'All integers in nums1 and nums2 are unique.', 'All the integers of nums1 also appear in nums2.'],
    patternClues: ['Find next greater element to the right in O(N)', 'Monotonic decreasing stack over nums2: when nums2[i] > stack.peek(), stack.pop() resolved! Store in HashMap.'],
    bruteForce: { approach: 'For each number in nums1, search in nums2 and scan right linearly.', timeComplexity: 'O(nums1.length * nums2.length)', spaceComplexity: 'O(1)', bottleneck: 'Nested linear search.' },
    optimizedApproach: { concept: 'Monotonic decreasing stack pre-computing next greater elements into a HashMap.', timeComplexity: 'O(nums1.length + nums2.length)', spaceComplexity: 'O(nums2.length)', keyIdea: 'For num in nums2: while stack not empty and stack.peek() < num: map.put(stack.pop(), num). Push num to stack. Build ans array from map.' },
    hints: ['Process nums2 first using a monotonic stack to find the next greater element for every number.', 'Save the mappings in a HashMap so nums1 queries are answered in O(1).'],
    pseudocode: `stack = new Deque(), map = new HashMap()
for num in nums2:
    while !stack.isEmpty() and stack.peek() < num:
        map.put(stack.pop(), num)
    stack.push(num)
ans = new int[nums1.length]
for i in 0..nums1.length-1:
    ans[i] = map.getOrDefault(nums1[i], -1)
return ans`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> nextGreaterMap = new HashMap<>();
        Deque<Integer> stack = new ArrayDeque<>();

        // Process nums2 with a monotonic decreasing stack
        for (int num : nums2) {
            while (!stack.isEmpty() && stack.peek() < num) {
                nextGreaterMap.put(stack.pop(), num);
            }
            stack.push(num);
        }

        // Answer queries for nums1 in O(1) each
        int[] result = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            result[i] = nextGreaterMap.getOrDefault(nums1[i], -1);
        }

        return result;
    }
}`,
    starterCode: `class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        // Write your solution here
        return new int[0];
    }
}`,
    testCases: [
      { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', expectedOutput: '[-1, 3, -1]' },
      { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', expectedOutput: '[3, -1]' }
    ],
    hiddenTestCases: [{ input: 'nums1 = [1], nums2 = [1]', expectedOutput: '[-1]' }],
    interviewExplanationScript: '"To resolve next greater element queries in linear time, we scan nums2 with a monotonic decreasing stack. When a scanned number exceeds the stack top, that number is the immediate next greater element for all smaller values currently on the stack. We pop those elements and record the mapping in a hash table. After processing nums2, remaining elements in the stack have no greater element to their right. Finally, each element in nums1 is looked up in O(1) time. Runs in O(N + M) time and O(M) space."'
  },

  // --- CONCEPT: LINKED LIST POINTER REWIRING ---
  {
    id: 'middle-of-the-linked-list',
    title: 'Middle of the Linked List',
    leetcodeNumber: 876,
    difficulty: 'Easy',
    patternId: 'fast-slow-pointers',
    patternName: 'Fast-Slow Halving Velocity',
    category: 'Linked List',
    conceptId: 'fast-slow-pointers',
    conceptName: '2:1 Relative Velocity Midpoint Traversal (Fast/Slow)',
    acceptanceRate: '78.9%',
    frequency: 'Top Placement (Amazon, Google, Microsoft, Meta)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta'],
    description: 'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[3,4,5]', explanation: 'Middle node is 3.' },
      { input: 'head = [1,2,3,4,5,6]', output: '[4,5,6]', explanation: 'Two middle nodes 3 and 4, return second middle node (4).' }
    ],
    constraints: ['The number of nodes in the list is in the range [1, 100].', '1 <= Node.val <= 100'],
    patternClues: ['Find middle in single pass with O(1) space', 'Slow moves 1 step, fast moves 2 steps. When fast reaches end, slow is at middle.'],
    bruteForce: { approach: 'Pass 1 counts length N, Pass 2 traverses N / 2 steps.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', bottleneck: 'Requires two passes.' },
    optimizedApproach: { concept: 'Single pass two-pointer speed ratio 2:1.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'slow = head, fast = head. While fast != null and fast.next != null: slow = slow.next, fast = fast.next.next. Return slow.' },
    hints: ['What if fast advances twice as fast as slow?', 'When fast reaches the end of the list, where will slow be?'],
    pseudocode: `slow = head, fast = head
while fast != null and fast.next != null:
    slow = slow.next
    fast = fast.next.next
return slow`,
    javaSolution: `public class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}`,
    starterCode: `class Solution {
    public ListNode middleNode(ListNode head) {
        // Write your solution here
        return null;
    }
}`,
    testCases: [
      { input: 'head = [1,2,3,4,5]', expectedOutput: '[3, 4, 5]' },
      { input: 'head = [1,2,3,4,5,6]', expectedOutput: '[4, 5, 6]' }
    ],
    hiddenTestCases: [{ input: 'head = [1]', expectedOutput: '[1]' }],
    interviewExplanationScript: '"By initializing two pointers at the head and advancing fast at twice the velocity of slow (fast = fast.next.next and slow = slow.next), slow traverses exactly half the distance that fast travels. When fast reaches null (for even-length lists) or fast.next reaches null (for odd-length lists), slow points precisely at the middle (or the second middle) node in a single pass. This runs in O(N) time and O(1) space."'
  }
];
