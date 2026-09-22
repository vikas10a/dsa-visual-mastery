import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART8: Problem[] = [
  // --- CONCEPT: 2D DYNAMIC PROGRAMMING ALIGNMENT ---
  {
    id: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    leetcodeNumber: 1143,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: '2D Matrix String Alignment DP',
    category: 'Dynamic Programming',
    conceptId: '2d-dp',
    conceptName: '2D String Alignment Matrix Recurrence (LCS)',
    acceptanceRate: '58.4%',
    frequency: 'Top Placement (Amazon, Google, Microsoft, Meta)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Bloomberg'],
    description: 'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.',
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'The longest common subsequence is "ace" and its length is 3.' },
      { input: 'text1 = "abc", text2 = "abc"', output: '3', explanation: 'The LCS is "abc".' },
      { input: 'text1 = "abc", text2 = "def"', output: '0', explanation: 'No common subsequence.' }
    ],
    constraints: ['1 <= text1.length, text2.length <= 1000', 'text1 and text2 consist of only lowercase English characters.'],
    patternClues: ['Compare two strings for longest matching relative sequence', 'If text1[i] == text2[j]: dp[i][j] = 1 + dp[i-1][j-1]', 'Else dp[i][j] = max(dp[i-1][j], dp[i][j-1])'],
    bruteForce: { approach: 'Generate all 2^N subsequences of text1 and search in text2.', timeComplexity: 'O(2^N * M)', spaceComplexity: 'O(N)', bottleneck: 'Exponential subsequence generation.' },
    optimizedApproach: { concept: 'Bottom-up DP table of size (m+1) x (n+1) with 1D row compression.', timeComplexity: 'O(M * N)', spaceComplexity: 'O(min(M, N))', keyIdea: 'If chars match, take diagonal + 1. If mismatch, take max of top and left cells. Only previous row needed.' },
    hints: ['If the last characters match, they must be part of the LCS.', 'If they do not match, the answer is the maximum of ignoring the last char of text1 or ignoring the last char of text2.'],
    pseudocode: `dp = new int[m + 1][n + 1]
for i in 1..m:
    for j in 1..n:
        if text1[i-1] == text2[j-1]:
            dp[i][j] = 1 + dp[i-1][j-1]
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])
return dp[m][n]`,
    javaSolution: `public class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[m][n];
    }
}`,
    starterCode: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'text1 = "abcde", text2 = "ace"', expectedOutput: '3' },
      { input: 'text1 = "abc", text2 = "abc"', expectedOutput: '3' }
    ],
    hiddenTestCases: [{ input: 'text1 = "abc", text2 = "def"', expectedOutput: '0' }],
    interviewExplanationScript: '"We define dp[i][j] as the length of the longest common subsequence of prefixes text1[0..i-1] and text2[0..j-1]. If the characters text1[i-1] and text2[j-1] are identical, they extend the subsequence from the previous diagonal, dp[i-1][j-1] + 1. If they differ, the optimal alignment either skips the character in text1 or the character in text2, giving max(dp[i-1][j], dp[i][j-1]). Runs in O(M * N) time and O(M * N) space (optimizable to O(min(M, N)))."'
  },
  {
    id: 'edit-distance',
    title: 'Edit Distance (Levenshtein Distance)',
    leetcodeNumber: 72,
    difficulty: 'Hard',
    patternId: 'dynamic-programming',
    patternName: '2D Levenshtein Alignment DP',
    category: 'Dynamic Programming',
    conceptId: '2d-dp',
    conceptName: 'Levenshtein 3-Operation Alignment DP',
    acceptanceRate: '56.1%',
    frequency: 'Top Placement (Google, Amazon, Microsoft)',
    companies: ['Google', 'Amazon', 'Microsoft', 'Bloomberg'],
    description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.',
    examples: [
      { input: 'word1 = "horse", word2 = "ros"', output: '3', explanation: 'horse -> rorse (replace \'h\' with \'r\') -> rose (remove \'r\') -> ros (remove \'e\').' },
      { input: 'word1 = "intention", word2 = "execution"', output: '5', explanation: '5 edit operations.' }
    ],
    constraints: ['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters.'],
    patternClues: ['Minimum operations between two strings', 'Three operations: Insert (dp[i][j-1]), Delete (dp[i-1][j]), Replace (dp[i-1][j-1])', 'Base cases: empty word1 requires j insertions; empty word2 requires i deletions'],
    bruteForce: { approach: 'Examine all edit combinations recursively.', timeComplexity: 'O(3^(M+N))', spaceComplexity: 'O(M+N)', bottleneck: 'Exponential recursion tree.' },
    optimizedApproach: { concept: 'Bottom-up DP table of size (m+1) x (n+1).', timeComplexity: 'O(M * N)', spaceComplexity: 'O(M * N)', keyIdea: 'dp[i][j] = if chars match ? dp[i-1][j-1] : 1 + min(dp[i-1][j-1] (replace), dp[i-1][j] (delete), dp[i][j-1] (insert)).' },
    hints: ['What are the base cases when one of the words is empty?', 'If word1[i-1] == word2[j-1], cost is 0, just take dp[i-1][j-1].'],
    pseudocode: `dp = new int[m + 1][n + 1]
for i in 0..m: dp[i][0] = i
for j in 0..n: dp[0][j] = j
for i in 1..m:
    for j in 1..n:
        if word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1]
        else: dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
return dp[m][n]`,
    javaSolution: `public class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        int[][] dp = new int[m + 1][n + 1];

        // Base cases: transforming to/from empty string
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1]; // No operation needed
                } else {
                    int replace = dp[i - 1][j - 1];
                    int delete = dp[i - 1][j];
                    int insert = dp[i][j - 1];
                    dp[i][j] = 1 + Math.min(replace, Math.min(delete, insert));
                }
            }
        }

        return dp[m][n];
    }
}`,
    starterCode: `class Solution {
    public int minDistance(String word1, String word2) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'word1 = "horse", word2 = "ros"', expectedOutput: '3' },
      { input: 'word1 = "intention", word2 = "execution"', expectedOutput: '5' }
    ],
    hiddenTestCases: [{ input: 'word1 = "", word2 = "a"', expectedOutput: '1' }],
    interviewExplanationScript: '"This is the classic Levenshtein Edit Distance problem. We construct a 2D matrix where dp[i][j] represents the minimum operations to convert word1[0..i-1] to word2[0..j-1]. When characters match, cost is zero so dp[i][j] = dp[i-1][j-1]. When characters differ, we evaluate the 3 allowed actions: replace (diagonal + 1), delete from word1 (top + 1), or insert into word1 (left + 1), and take their minimum. Runs in O(M * N) time and O(M * N) space."'
  },

  // --- CONCEPT: 1D DP PARTITIONING ---
  {
    id: 'decode-ways',
    title: 'Decode Ways',
    leetcodeNumber: 91,
    difficulty: 'Medium',
    patternId: 'dynamic-programming',
    patternName: 'Prefix Decision DP',
    category: 'Dynamic Programming',
    conceptId: '1d-dp',
    conceptName: '1-or-2 Digit Valid Prefix Decoding DP',
    acceptanceRate: '34.7%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'A message containing letters from A-Z can be encoded into numbers using the following mapping: \'A\' -> "1", \'B\' -> "2", ... \'Z\' -> "26". To decode an encoded message, all the digits must be grouped then mapped back into letters. Given a string s containing only digits, return the number of ways to decode it.',
    examples: [
      { input: 's = "12"', output: '2', explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).' },
      { input: 's = "226"', output: '3', explanation: '"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).' },
      { input: 's = "06"', output: '0', explanation: '"06" cannot be mapped because \'0\' is invalid on its own.' }
    ],
    constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zero(s).'],
    patternClues: ['Decode string into 1-digit (1-9) or 2-digit (10-26) chunks', 'Leading zeros are invalid', 'State transition resembles Fibonacci: dp[i] = dp[i-1] (if 1-digit valid) + dp[i-2] (if 2-digit valid)'],
    bruteForce: { approach: 'Recursive branching exploring 1-digit and 2-digit paths.', timeComplexity: 'O(2^N)', spaceComplexity: 'O(N)', bottleneck: 'Repeated subproblem calls.' },
    optimizedApproach: { concept: 'Constant space 1D dynamic programming.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'If s[0] == \'0\', return 0. Maintain prev2 = 1, prev1 = 1. For i from 1 to n-1: check 1-digit s[i] != \'0\' and 2-digit 10 <= s[i-1..i] <= 26.' },
    hints: ['Consider what happens when a digit is \'0\'.', 'Can a \'0\' stand by itself? No, it must pair with \'1\' or \'2\' before it.'],
    pseudocode: `if s[0] == '0': return 0
prev2 = 1, prev1 = 1
for i in 1..n-1:
    curr = 0
    if s[i] != '0': curr += prev1
    twoDigit = parseInt(s[i-1..i])
    if twoDigit >= 10 and twoDigit <= 26: curr += prev2
    prev2 = prev1; prev1 = curr
return prev1`,
    javaSolution: `public class Solution {
    public int numDecodings(String s) {
        if (s == null || s.length() == 0 || s.charAt(0) == '0') {
            return 0;
        }

        int n = s.length();
        int prev2 = 1; // dp[i-2]
        int prev1 = 1; // dp[i-1]

        for (int i = 1; i < n; i++) {
            int current = 0;
            char c = s.charAt(i);
            int oneDigit = c - '0';
            int twoDigit = Integer.parseInt(s.substring(i - 1, i + 1));

            // Single digit decoding
            if (oneDigit >= 1) {
                current += prev1;
            }

            // Two digit decoding (10 to 26)
            if (twoDigit >= 10 && twoDigit <= 26) {
                current += prev2;
            }

            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}`,
    starterCode: `class Solution {
    public int numDecodings(String s) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 's = "12"', expectedOutput: '2' },
      { input: 's = "226"', expectedOutput: '3' },
      { input: 's = "06"', expectedOutput: '0' }
    ],
    hiddenTestCases: [{ input: 's = "10"', expectedOutput: '1' }],
    interviewExplanationScript: '"Decoding can proceed by taking either the single current digit (valid if 1-9) or the 2-digit pair combining the previous and current digits (valid if between 10 and 26). This forms a Fibonacci-like recurrence: dp[i] = (valid 1-digit ? dp[i-1] : 0) + (valid 2-digit ? dp[i-2] : 0). Since computing the current state only requires the preceding two counts, we compress memory to two scalar variables. Runs in O(N) time and strictly O(1) space."'
  },

  // --- CONCEPT: INTERVAL MERGING & INSERTION ---
  {
    id: 'insert-interval',
    title: 'Insert Interval',
    leetcodeNumber: 57,
    difficulty: 'Medium',
    patternId: 'intervals',
    patternName: 'Three-Phase Linear Interval Insertion',
    category: 'Intervals',
    conceptId: 'intervals',
    conceptName: 'Three-Stage Interval Insertion & Overlap Fusion',
    acceptanceRate: '41.5%',
    frequency: 'Top Placement (Google, Amazon, Meta, Microsoft)',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).',
    examples: [
      { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]', explanation: '[1,3] and [2,5] merge to [1,5].' },
      { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]', explanation: '[3,5],[6,7],[8,10] merge with [4,8] into [3,10].' }
    ],
    constraints: ['0 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= starti <= endi <= 10^5', 'intervals is sorted by starti in ascending order.'],
    patternClues: ['Insert new interval into sorted non-overlapping list in O(N)', 'Phase 1: Add all intervals ending before newInterval.start', 'Phase 2: Merge all intervals overlapping with newInterval', 'Phase 3: Add all remaining intervals'],
    bruteForce: { approach: 'Append newInterval to intervals and call standard Merge Intervals (which sorts in O(N log N)).', timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)', bottleneck: 'Re-sorting when array is already sorted.' },
    optimizedApproach: { concept: 'Single pass three-phase linear insertion.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'Phase 1: while intervals[i][1] < newInterval[0], add intervals[i]. Phase 2: while intervals[i][0] <= newInterval[1], merge newInterval = [min(start), max(end)]. Add newInterval. Phase 3: add remaining intervals.' },
    hints: ['The input is already sorted, so you can do this in a single O(N) pass.', 'Break the algorithm into three phases: strictly before, overlapping, strictly after.'],
    pseudocode: `res = []
i = 0
while i < n and intervals[i][1] < newInterval[0]: res.add(intervals[i++])
while i < n and intervals[i][0] <= newInterval[1]:
    newInterval[0] = min(newInterval[0], intervals[i][0])
    newInterval[1] = max(newInterval[1], intervals[i][1])
    i++
res.add(newInterval)
while i < n: res.add(intervals[i++])
return res`,
    javaSolution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        int n = intervals.length;

        // Phase 1: Add all intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }

        // Phase 2: Merge all overlapping intervals into newInterval
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);

        // Phase 3: Add all remaining intervals that start after newInterval ends
        while (i < n) {
            result.add(intervals[i]);
            i++;
        }

        return result.toArray(new int[result.size()][]);
    }
}`,
    starterCode: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        // Write your solution here
        return new int[0][0];
    }
}`,
    testCases: [
      { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', expectedOutput: '[[1, 5], [6, 9]]' },
      { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', expectedOutput: '[[1, 2], [3, 10], [12, 16]]' }
    ],
    hiddenTestCases: [{ input: 'intervals = [], newInterval = [5,7]', expectedOutput: '[[5, 7]]' }],
    interviewExplanationScript: '"Because the intervals are already sorted and disjoint, we can execute the insertion in a single linear pass using three phases: First, append all intervals that terminate before newInterval begins. Second, for all intervals that overlap with newInterval (intervals[i].start <= newInterval.end), expand newInterval to span min(start) and max(end). We insert the merged newInterval. Third, append all remaining intervals that begin after newInterval ends. Runs in strictly O(N) time and O(N) space."'
  },

  // --- CONCEPT: TOPOLOGICAL SORT & DAGS ---
  {
    id: 'course-schedule-ii',
    title: 'Course Schedule II',
    leetcodeNumber: 210,
    difficulty: 'Medium',
    patternId: 'topological-sort',
    patternName: 'Kahn\'s Algorithm for Topological Order',
    category: 'Graph Algorithms',
    conceptId: 'graphs',
    conceptName: 'Kahn\'s In-Degree BFS Complete Topological Ordering',
    acceptanceRate: '50.6%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Uber'],
    description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.',
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: '[0,1]', explanation: 'Take course 0 then course 1.' },
      { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,2,1,3] (or [0,1,2,3])', explanation: 'Valid topological order.' },
      { input: 'numCourses = 1, prerequisites = []', output: '[0]', explanation: 'Single course with no prereqs.' }
    ],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= numCourses * (numCourses - 1)', 'prerequisites[i].length == 2', '0 <= ai, bi < numCourses', 'ai != bi', 'All prerequisite pairs are unique.'],
    patternClues: ['Find a valid ordering with dependencies: Topological Sort', 'If cycle exists, ordering is impossible (return [])', 'Kahn\'s Algorithm: Queue courses with inDegree == 0; as courses are taken, decrement neighbor inDegrees'],
    bruteForce: { approach: 'Examine all permutations of courses to verify dependency ordering.', timeComplexity: 'O(N!)', spaceComplexity: 'O(N)', bottleneck: 'Factorial complexity.' },
    optimizedApproach: { concept: 'Kahn\'s BFS Topological Sort.', timeComplexity: 'O(V + E)', spaceComplexity: 'O(V + E)', keyIdea: 'Build adjacency list and inDegree array. Queue all courses with inDegree == 0. Poll course, append to order array, decrement neighbor inDegrees; if inDegree becomes 0, enqueue. If order count == numCourses return order, else return [].' },
    hints: ['Count in-degrees for each course.', 'Courses with in-degree 0 can be taken immediately because they have no prerequisites.'],
    pseudocode: `adj = list of lists, inDegree = new int[V]
for [a, b] in prerequisites: adj[b].add(a), inDegree[a]++
queue = all courses with inDegree == 0
order = new int[V], idx = 0
while !queue.isEmpty():
    c = queue.poll()
    order[idx++] = c
    for next in adj[c]:
        if --inDegree[next] == 0: queue.offer(next)
return idx == V ? order : new int[0]`,
    javaSolution: `import java.util.*;

public class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }

        int[] inDegree = new int[numCourses];
        for (int[] pre : prerequisites) {
            int course = pre[0];
            int prerequisite = pre[1];
            adj.get(prerequisite).add(course);
            inDegree[course]++;
        }

        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }

        int[] order = new int[numCourses];
        int index = 0;

        while (!queue.isEmpty()) {
            int curr = queue.poll();
            order[index++] = curr;

            for (int neighbor : adj.get(curr)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        return index == numCourses ? order : new int[0];
    }
}`,
    starterCode: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        // Write your solution here
        return new int[0];
    }
}`,
    testCases: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', expectedOutput: '[0, 1]' },
      { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', expectedOutput: '[0, 1, 2, 3]' }
    ],
    hiddenTestCases: [{ input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expectedOutput: '[]' }],
    interviewExplanationScript: '"To determine a valid linear sequence of courses subject to prerequisite dependencies, we model the problem as a Directed Acyclic Graph (DAG) and apply Kahn\'s algorithm for Topological Sorting. We track the in-degree of each node. Courses with in-degree 0 have no outstanding prerequisites and can be completed immediately. As each course is taken, we decrement the in-degrees of all dependent courses. If the final ordered list contains all numCourses nodes, we return the schedule; otherwise, a cycle exists and we return an empty array. Runs in O(V + E) time and O(V + E) space."'
  }
];
