import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART7: Problem[] = [
  // --- CONCEPT: TWO POINTERS GREEDY ---
  {
    id: 'boats-to-save-people',
    title: 'Boats to Save People',
    leetcodeNumber: 881,
    difficulty: 'Medium',
    patternId: 'two-pointers',
    patternName: 'Greedy Converging Pair Matching',
    category: 'Two Pointers',
    conceptId: 'two-pointers',
    conceptName: 'Greedy Heaviest-Lightest Two-Pointer Boat Allocation',
    acceptanceRate: '56.8%',
    frequency: 'High (Google, Amazon, Meta)',
    companies: ['Google', 'Amazon', 'Meta'],
    description: 'You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit. Return the minimum number of boats to carry every given person.',
    examples: [
      { input: 'people = [1, 2], limit = 3', output: '1', explanation: '1 boat (1, 2).' },
      { input: 'people = [3, 2, 2, 1], limit = 3', output: '3', explanation: '3 boats: (1, 2), (2), (3).' },
      { input: 'people = [3, 5, 3, 4], limit = 5', output: '4', explanation: '4 boats: (3), (3), (4), (5).' }
    ],
    constraints: ['1 <= people.length <= 5 * 10^4', '1 <= people[i] <= limit <= 3 * 10^4'],
    patternClues: ['Pair at most 2 people to not exceed limit', 'Sort people: always try to pair the heaviest person with the lightest person'],
    bruteForce: { approach: 'Examine all pairings recursively.', timeComplexity: 'Exponential', spaceComplexity: 'O(N)', bottleneck: 'Combinatorial explosion.' },
    optimizedApproach: { concept: 'Sort and two-pointer greedy pairing.', timeComplexity: 'O(N log N)', spaceComplexity: 'O(1)', keyIdea: 'Sort people. left = 0, right = n - 1. In each step, right person must take a boat. If people[left] + people[right] <= limit, left also fits on that boat (left++). right--, boats++.' },
    hints: ['The heaviest person must get on a boat.', 'The best companion for the heaviest person is the lightest person.'],
    pseudocode: `sort(people)
left = 0, right = n - 1, boats = 0
while left <= right:
    if people[left] + people[right] <= limit: left++
    right--
    boats++
return boats`,
    javaSolution: `import java.util.Arrays;

public class Solution {
    public int numRescueBoats(int[] people, int limit) {
        Arrays.sort(people);
        int left = 0;
        int right = people.length - 1;
        int boats = 0;

        while (left <= right) {
            // If the lightest person can share the boat with the heaviest, include them
            if (people[left] + people[right] <= limit) {
                left++;
            }
            // Heaviest person always takes the boat
            right--;
            boats++;
        }

        return boats;
    }
}`,
    starterCode: `class Solution {
    public int numRescueBoats(int[] people, int limit) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'people = [1, 2], limit = 3', expectedOutput: '1' },
      { input: 'people = [3, 2, 2, 1], limit = 3', expectedOutput: '3' }
    ],
    hiddenTestCases: [{ input: 'people = [5], limit = 5', expectedOutput: '1' }],
    interviewExplanationScript: '"To minimize boats, we sort people by weight. The heaviest person (at right) must be assigned a boat. The most optimal passenger to accompany them is the lightest person available (at left). If their combined weight fits within limit, both board the boat and we advance left. Otherwise, the heaviest person rides alone. In either case, right decrements and boat count increments. Time complexity is O(N log N) dominated by sorting, and space is O(1)."'
  },

  // --- CONCEPT: SLIDING WINDOW VARIABLE ---
  {
    id: 'max-consecutive-ones-iii',
    title: 'Max Consecutive Ones III',
    leetcodeNumber: 1004,
    difficulty: 'Medium',
    patternId: 'sliding-window',
    patternName: 'Variable Sliding Window Zero Counter',
    category: 'Sliding Window',
    conceptId: 'sliding-window',
    conceptName: 'Sliding Window Bounded Zero-Count Invariant (<= k)',
    acceptanceRate: '63.5%',
    frequency: 'Top Placement (Meta, Google, Amazon)',
    companies: ['Meta', 'Google', 'Amazon', 'Microsoft'],
    description: 'Given a binary array nums and an integer k, return the maximum number of consecutive 1\'s in the array if you can flip at most k 0\'s.',
    examples: [
      { input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2', output: '6', explanation: 'Flip 0s at indices 5 and 10 to get 6 consecutive 1s.' },
      { input: 'nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3', output: '10', explanation: 'Flip 3 zeroes to get 10 consecutive 1s.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', 'nums[i] is either 0 or 1.', '0 <= k <= nums.length'],
    patternClues: ['Longest subarray with at most k zeroes', 'Expand right pointer, when zeroCount > k shrink left pointer until zeroCount <= k'],
    bruteForce: { approach: 'Examine all subarrays and count zeroes.', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', bottleneck: 'Quadratic scan.' },
    optimizedApproach: { concept: 'Sliding window tracking zeroCount.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'For right in 0..n-1: if nums[right] == 0 zeroCount++. While zeroCount > k: if nums[left] == 0 zeroCount--; left++. Update maxLen = max(maxLen, right - left + 1).' },
    hints: ['The question is equivalent to finding the longest subarray with at most k zeroes.', 'Use a sliding window [left, right] and count how many zeroes are currently inside the window.'],
    pseudocode: `left = 0, zeroes = 0, maxLen = 0
for right in 0..n-1:
    if nums[right] == 0: zeroes++
    while zeroes > k:
        if nums[left] == 0: zeroes--
        left++
    maxLen = max(maxLen, right - left + 1)
return maxLen`,
    javaSolution: `public class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0;
        int zeroCount = 0;
        int maxLen = 0;

        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) {
                zeroCount++;
            }

            while (zeroCount > k) {
                if (nums[left] == 0) {
                    zeroCount--;
                }
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,
    starterCode: `class Solution {
    public int longestOnes(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2', expectedOutput: '6' },
      { input: 'nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3', expectedOutput: '10' }
    ],
    hiddenTestCases: [{ input: 'nums = [0, 0, 0], k = 1', expectedOutput: '1' }],
    interviewExplanationScript: '"This problem reduces to finding the longest subarray containing at most k zeroes. We use a sliding window [left, right] and maintain a counter for zeroes in the current window. We expand right; if zeroCount exceeds k, we increment left until a zero is evicted. Because each pointer moves at most N times, the algorithm executes in linear O(N) time and O(1) space."'
  },

  // --- CONCEPT: STACK PATH CANONICALIZATION ---
  {
    id: 'simplify-path',
    title: 'Simplify Path',
    leetcodeNumber: 71,
    difficulty: 'Medium',
    patternId: 'monotonic-stack',
    patternName: 'Directory Token LIFO Stack',
    category: 'Stack',
    conceptId: 'stack',
    conceptName: 'Unix Directory Tokenization & LIFO Stack Resolution',
    acceptanceRate: '43.2%',
    frequency: 'Top Placement (Meta, Google, Amazon)',
    companies: ['Meta', 'Google', 'Amazon', 'Microsoft'],
    description: 'Given an absolute path for a Unix-style file system, which begins with a slash \'/\', transform this path into its simplified canonical path. In Unix-style file systems, a period \'.\' refers to the current directory, a double period \'..\' moves up a level, and multiple slashes are treated as a single slash.',
    examples: [
      { input: 'path = "/home/"', output: '"/home"', explanation: 'Trailing slash removed.' },
      { input: 'path = "/../"', output: '"/"', explanation: 'Cannot go above root.' },
      { input: 'path = "/home//foo/"', output: '"/home/foo"', explanation: 'Multiple slashes condensed.' }
    ],
    constraints: ['1 <= path.length <= 3000', 'path consists of English letters, digits, period \'.\', slash \'/\' or \'_\'.', 'path is a valid absolute Unix path.'],
    patternClues: ['Simplify Unix file path', 'Split by \'/\', push valid directory names to stack, pop on \'..\', ignore \'.\' and empty tokens'],
    bruteForce: { approach: 'Regex iterative string replacement.', timeComplexity: 'O(N²)', spaceComplexity: 'O(N)', bottleneck: 'Complex regex passes.' },
    optimizedApproach: { concept: 'Tokenization with Deque stack.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'Split string by "/". For token in tokens: if token is "..", pop if stack not empty. Else if token is valid directory (not empty and not "."), push. Reconstruct path with join.' },
    hints: ['Split path by \'/\'. What are the possible tokens? Empty strings, ".", "..", or directory names.', 'Use a stack to simulate moving into directories (push) and out of directories (pop on "..").'],
    pseudocode: `tokens = path.split("/")
stack = new Deque()
for t in tokens:
    if t == ".." and !stack.isEmpty(): stack.pop()
    else if t != "" and t != "." and t != "..": stack.push(t)
return "/" + String.join("/", reversed(stack))`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public String simplifyPath(String path) {
        Deque<String> stack = new ArrayDeque<>();
        String[] tokens = path.split("/");

        for (String token : tokens) {
            if (token.equals("..")) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else if (!token.isEmpty() && !token.equals(".")) {
                stack.push(token);
            }
        }

        if (stack.isEmpty()) {
            return "/";
        }

        StringBuilder canonical = new StringBuilder();
        // ArrayDeque iterating descending (bottom of stack to top)
        while (!stack.isEmpty()) {
            canonical.append("/").append(stack.pollLast());
        }

        return canonical.toString();
    }
}`,
    starterCode: `class Solution {
    public String simplifyPath(String path) {
        // Write your solution here
        return "";
    }
}`,
    testCases: [
      { input: 'path = "/home/"', expectedOutput: '"/home"' },
      { input: 'path = "/../"', expectedOutput: '"/"' },
      { input: 'path = "/home//foo/"', expectedOutput: '"/home/foo"' }
    ],
    hiddenTestCases: [{ input: 'path = "/a/./b/../../c/"', expectedOutput: '"/c"' }],
    interviewExplanationScript: '"We split the input path by \'/\' to isolate directory tokens. We use a Deque as a directory stack. We ignore empty tokens and single periods \'.\' representing the current directory. When encountering \'..\', we pop the previous directory from our stack if non-empty. Any standard directory name is pushed onto the stack. Finally, we reconstruct the canonical path from bottom to top. Runs in O(N) time and O(N) space."'
  },

  // --- CONCEPT: LINKED LIST PALINDROME ---
  {
    id: 'palindrome-linked-list',
    title: 'Palindrome Linked List',
    leetcodeNumber: 234,
    difficulty: 'Easy',
    patternId: 'fast-slow-pointers',
    patternName: 'Midpoint Inversion Comparison',
    category: 'Linked List',
    conceptId: 'linked-list',
    conceptName: 'Halving Midpoint Reversal & Two-Pointer Verification',
    acceptanceRate: '51.8%',
    frequency: 'Top Placement (Amazon, Microsoft, Meta)',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google'],
    description: 'Given the head of a singly linked list, return true if it is a palindrome or false otherwise. Can you do it in O(N) time and O(1) space?',
    examples: [
      { input: 'head = [1, 2, 2, 1]', output: 'true', explanation: 'Reads same forwards and backwards.' },
      { input: 'head = [1, 2]', output: 'false', explanation: 'Mismatch.' }
    ],
    constraints: ['The number of nodes in the list is in the range [1, 10^5].', '0 <= Node.val <= 9'],
    patternClues: ['Check palindrome in O(1) space', 'Step 1: Find middle using slow/fast. Step 2: Reverse second half. Step 3: Compare halves. Step 4: Restore list.'],
    bruteForce: { approach: 'Copy values into an ArrayList and compare with two pointers.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'O(N) memory allocation.' },
    optimizedApproach: { concept: 'Find middle, reverse second half, compare.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'Advance slow by 1, fast by 2 to find middle. Reverse list starting from slow. Compare first half and reversed second half node by node.' },
    hints: ['Use fast and slow pointers to find the middle of the list.', 'Reverse the second half of the linked list in-place.'],
    pseudocode: `slow = head, fast = head
while fast != null and fast.next != null:
    slow = slow.next; fast = fast.next.next
secondHalf = reverse(slow)
p1 = head, p2 = secondHalf
while p2 != null:
    if p1.val != p2.val: return false
    p1 = p1.next; p2 = p2.next
return true`,
    javaSolution: `public class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;

        // Step 1: Find middle of the linked list
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // Step 2: Reverse the second half in-place
        ListNode secondHalf = reverse(slow);

        // Step 3: Compare first half and second half
        ListNode p1 = head;
        ListNode p2 = secondHalf;
        boolean isPal = true;
        while (p2 != null) {
            if (p1.val != p2.val) {
                isPal = false;
                break;
            }
            p1 = p1.next;
            p2 = p2.next;
        }

        return isPal;
    }

    private ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
    starterCode: `class Solution {
    public boolean isPalindrome(ListNode head) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 'head = [1, 2, 2, 1]', expectedOutput: 'true' },
      { input: 'head = [1, 2]', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 'head = [1]', expectedOutput: 'true' }],
    interviewExplanationScript: '"To verify if a singly linked list is a palindrome in O(1) space, we divide the task into three linear steps: First, use fast and slow pointers to find the midpoint in one pass. Second, reverse the second half of the linked list in-place. Third, compare node values from the head and the reversed second half sequentially. This runs in O(N) time and requires strictly O(1) auxiliary space."'
  },

  // --- CONCEPT: HEAP SELECTION & SCHEDULING ---
  {
    id: 'k-closest-points-to-origin',
    title: 'K Closest Points to Origin',
    leetcodeNumber: 973,
    difficulty: 'Medium',
    patternId: 'top-k-elements',
    patternName: 'Max-Heap of Size K',
    category: 'Heap & PriorityQueue',
    conceptId: 'heaps-pq',
    conceptName: 'Bounded Max-Heap Distance Eviction',
    acceptanceRate: '66.1%',
    frequency: 'Top Placement (Amazon, Meta, Google, Microsoft)',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    description: 'Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0). The distance between two points on the X-Y plane is the Euclidean distance (√(x1 - x2)² + (y1 - y2)²). You may return the answer in any order.',
    examples: [
      { input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]', explanation: 'Distance (-2, 2) is sqrt(8) ~ 2.82, while (1, 3) is sqrt(10) ~ 3.16. Closest is [-2, 2].' },
      { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', output: '[[3,3],[-2,4]]', explanation: 'Distances are 18, 26, 20. Two closest are [3,3] and [-2,4].' }
    ],
    constraints: ['1 <= k <= points.length <= 10^4', '-10^4 <= xi, yi <= 10^4'],
    patternClues: ['Find k smallest elements by distance', 'Maintain Max-Heap of size K: if current distance < max distance in heap, replace root'],
    bruteForce: { approach: 'Sort all points by distance in O(N log N).', timeComplexity: 'O(N log N)', spaceComplexity: 'O(log N)', bottleneck: 'Full sorting overhead.' },
    optimizedApproach: { concept: 'Max-Heap of size K storing points.', timeComplexity: 'O(N log K)', spaceComplexity: 'O(K)', keyIdea: 'Comparator orders points by descending squared distance x^2 + y^2. If heap size exceeds k, poll the largest point. Result holds the k closest points.' },
    hints: ['No need to compute sqrt: comparing x1^2 + y1^2 with x2^2 + y2^2 avoids floating point inaccuracies.', 'Use a Max-Heap of size K so the farthest point among the k points is easily evicted.'],
    pseudocode: `maxHeap = PriorityQueue comparing (p[0]^2 + p[1]^2) descending
for p in points:
    maxHeap.offer(p)
    if maxHeap.size > k: maxHeap.poll()
return maxHeap.toArray()`,
    javaSolution: `import java.util.PriorityQueue;

public class Solution {
    public int[][] kClosest(int[][] points, int k) {
        // Max-heap comparing distance descending: farthest of the k points at the top
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> 
            Integer.compare((b[0] * b[0] + b[1] * b[1]), (a[0] * a[0] + a[1] * a[1]))
        );

        for (int[] point : points) {
            maxHeap.offer(point);
            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }

        int[][] result = new int[k][2];
        for (int i = 0; i < k; i++) {
            result[i] = maxHeap.poll();
        }

        return result;
    }
}`,
    starterCode: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        // Write your solution here
        return new int[0][0];
    }
}`,
    testCases: [
      { input: 'points = [[1,3],[-2,2]], k = 1', expectedOutput: '[[-2, 2]]' },
      { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', expectedOutput: '[[3, 3], [-2, 4]]' }
    ],
    hiddenTestCases: [{ input: 'points = [[0,1],[1,0]], k = 2', expectedOutput: '[[0, 1], [1, 0]]' }],
    interviewExplanationScript: '"To select the K closest points without sorting all N points, we maintain a bounded Max-Heap of size K ordered by distance to origin descending. Squared distance (x^2 + y^2) is used directly to prevent precision issues. For every incoming point, we insert it into the heap; whenever size exceeds K, the point with the largest distance is polled. At termination, the heap retains the K closest points in O(N log K) time and O(K) space."'
  }
];
