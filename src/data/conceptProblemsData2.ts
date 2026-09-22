import { Problem } from '../types';

export const CONCEPT_PROBLEMS_PART2: Problem[] = [
  // --- CONCEPT: STACK & MONOTONIC STACK ---
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    leetcodeNumber: 20,
    difficulty: 'Easy',
    patternId: 'monotonic-stack',
    patternName: 'LIFO Stack Matching',
    category: 'Stack',
    conceptId: 'stack',
    conceptName: 'LIFO Bracket Complement Matching',
    acceptanceRate: '40.8%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Bloomberg'],
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and in the correct order, and every close bracket has a corresponding open bracket of the same type.',
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'Direct open-close match.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All pairs properly closed in order.' },
      { input: 's = "(]"', output: 'false', explanation: 'Type mismatch.' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\'.'],
    patternClues: ['Nested and contiguous matching', 'Most recent unclosed open bracket must match next closing bracket: LIFO stack'],
    bruteForce: { approach: 'Repeatedly replace "()", "[]", "{}" with empty string until unchanged.', timeComplexity: 'O(N²)', spaceComplexity: 'O(N)', bottleneck: 'Repeated string copies.' },
    optimizedApproach: { concept: 'Stack pushing expected closing bracket on seeing opening bracket.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'When seeing \'(\', push \')\'; on seeing \'[\', push \']\'; on seeing \'{\', push \'}\'. On closing bracket, pop and ensure match.' },
    hints: ['Push the expected closing bracket when you see an opening bracket.', 'If stack is empty when closing bracket arrives, or popped value does not match, return false.'],
    pseudocode: `stack = new ArrayDeque()
for c in s:
    if c == '(': stack.push(')')
    else if c == '{': stack.push('}')
    else if c == '[': stack.push(']')
    else if stack.isEmpty() or stack.pop() != c: return false
return stack.isEmpty()`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(')');
            } else if (c == '{') {
                stack.push('}');
            } else if (c == '[') {
                stack.push(']');
            } else if (stack.isEmpty() || stack.pop() != c) {
                return false;
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
    hiddenTestCases: [{ input: 's = "([)]"', expectedOutput: 'false' }, { input: 's = "["', expectedOutput: 'false' }],
    interviewExplanationScript: '"Parentheses matching requires Last-In-First-Out resolution. We iterate through the string with a Deque stack. For each opening bracket, we push its corresponding closing bracket. When encountering a closing bracket, it must match the top of the stack. At the end, an empty stack confirms all brackets were closed properly. Runs in O(N) time and O(N) space."'
  },
  {
    id: 'min-stack',
    title: 'Min Stack',
    leetcodeNumber: 155,
    difficulty: 'Medium',
    patternId: 'monotonic-stack',
    patternName: 'Auxiliary Minimum Stack',
    category: 'Stack',
    conceptId: 'stack',
    conceptName: 'Parallel Min-Prefix Tracking Stack',
    acceptanceRate: '53.6%',
    frequency: 'Top Placement (Amazon, Microsoft, Bloomberg)',
    companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Google', 'Apple'],
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1). Implement the MinStack class with push(val), pop(), top(), and getMin(). You must implement a solution with O(1) time complexity for each operation.',
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: '[null,null,null,null,-3,null,0,-2]',
        explanation: 'getMin() returns -3, after pop() top is 0 and getMin() is -2.'
      }
    ],
    constraints: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and getMin will always be called on non-empty stacks.', 'At most 3 * 10^4 calls will be made.'],
    patternClues: ['Retrieve minimum in O(1) without iterating', 'Pair each pushed value with current minimum or use a secondary min stack'],
    bruteForce: { approach: 'Scan stack on each getMin() call.', timeComplexity: 'O(N) for getMin', spaceComplexity: 'O(1)', bottleneck: 'Linear scan violates O(1) requirement.' },
    optimizedApproach: { concept: 'Two stacks: main stack and minStack tracking prefix minima.', timeComplexity: 'O(1) for all operations', spaceComplexity: 'O(N)', keyIdea: 'minStack pushes min(val, minStack.peek()). When main stack pops, minStack pops in lockstep.' },
    hints: ['Each state of the stack has a specific minimum up to that point.', 'Maintain a parallel stack that records the minimum value at each depth.'],
    pseudocode: `push(val):
    main.push(val)
    minStack.push(minStack.isEmpty() ? val : min(val, minStack.peek()))
pop(): main.pop(), minStack.pop()
top(): return main.peek()
getMin(): return minStack.peek()`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

public class MinStack {
    private final Deque<Integer> stack;
    private final Deque<Integer> minStack;

    public MinStack() {
        stack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,
    starterCode: `class MinStack {
    public MinStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public void pop() {
        
    }
    
    public int top() {
        return 0;
    }
    
    public int getMin() {
        return 0;
    }
}`,
    testCases: [
      { input: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()', expectedOutput: '-3, 0, -2' }
    ],
    hiddenTestCases: [{ input: 'push(2), push(2), pop(), getMin()', expectedOutput: '2' }],
    interviewExplanationScript: '"To ensure getMin() is strictly O(1) without scanning, we maintain a secondary minStack that records the current running minimum at each depth of the stack. On each push, minStack records the minimum between the new value and its current top. When popping, both stacks pop together. All four operations execute in guaranteed O(1) time."'
  },
  {
    id: 'largest-rectangle-in-histogram',
    title: 'Largest Rectangle in Histogram',
    leetcodeNumber: 84,
    difficulty: 'Hard',
    patternId: 'monotonic-stack',
    patternName: 'Monotonic Increasing Stack',
    category: 'Stack',
    conceptId: 'stack',
    conceptName: 'Monotonic Increasing Stack Rectangle Expansion',
    acceptanceRate: '44.3%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'ByteDance'],
    description: 'Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.',
    examples: [
      { input: 'heights = [2, 1, 5, 6, 2, 3]', output: '10', explanation: 'The rectangle [5, 6] has min height 5 and width 2, giving area 10.' },
      { input: 'heights = [2, 4]', output: '4', explanation: 'Max area is 4 (either height 4 * 1 or height 2 * 2).' }
    ],
    constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
    patternClues: ['For each bar i, find how far left and right it can extend while height >= heights[i]', 'Previous smaller element and next smaller element: Monotonic stack'],
    bruteForce: { approach: 'For each bar, expand left and right to find boundaries.', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', bottleneck: 'Worst-case quadratic expansions.' },
    optimizedApproach: { concept: 'Monotonic increasing stack of bar indices.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', keyIdea: 'When heights[i] < heights[stack.peek()], pop height h. Width is i - stack.peek() - 1 (or i if stack is empty). Update maxArea.' },
    hints: ['Each bar acts as the bottleneck height of some rectangle.', 'When a shorter bar arrives, it limits the right boundary of taller bars on the stack.'],
    pseudocode: `stack = new Deque()
maxArea = 0
for i in 0..n:
    h = (i == n) ? 0 : heights[i]
    while !stack.isEmpty() and h < heights[stack.peek()]:
        height = heights[stack.pop()]
        width = stack.isEmpty() ? i : (i - stack.peek() - 1)
        maxArea = max(maxArea, height * width)
    stack.push(i)
return maxArea`,
    javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;
        int n = heights.length;

        for (int i = 0; i <= n; i++) {
            int currentH = (i == n) ? 0 : heights[i];

            while (!stack.isEmpty() && currentH < heights[stack.peek()]) {
                int h = heights[stack.pop()];
                int width = stack.isEmpty() ? i : (i - stack.peek() - 1);
                maxArea = Math.max(maxArea, h * width);
            }

            stack.push(i);
        }

        return maxArea;
    }
}`,
    starterCode: `class Solution {
    public int largestRectangleArea(int[] heights) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'heights = [2, 1, 5, 6, 2, 3]', expectedOutput: '10' },
      { input: 'heights = [2, 4]', expectedOutput: '4' }
    ],
    hiddenTestCases: [{ input: 'heights = [1, 1]', expectedOutput: '2' }],
    interviewExplanationScript: '"To find the maximum rectangle, each bar heights[i] can be considered the bottleneck height of a rectangle bounded by the first smaller bar to its left and first smaller bar to its right. We maintain a monotonic increasing stack of indices. When we encounter a bar shorter than the stack top, the popped bar has its right boundary at the current index i, and left boundary at the new stack top. With a dummy 0 height at index n, all bars are resolved in O(N) time and O(N) space."'
  },

  // --- CONCEPT: FAST & SLOW POINTERS / LINKED LIST ---
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    leetcodeNumber: 141,
    difficulty: 'Easy',
    patternId: 'fast-slow-pointers',
    patternName: 'Floyd\'s Tortoise and Hare',
    category: 'Linked List',
    conceptId: 'fast-slow-pointers',
    conceptName: 'Floyd\'s Cycle-Detection Tortoise & Hare',
    acceptanceRate: '49.8%',
    frequency: 'Top Placement (Amazon, Microsoft, Google, Meta)',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple'],
    description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list. Otherwise, return false. Solve in O(1) memory.',
    examples: [
      { input: 'head = [3, 2, 0, -4], pos = 1', output: 'true', explanation: 'There is a cycle where tail connects to 1st node.' },
      { input: 'head = [1, 2], pos = 0', output: 'true', explanation: 'Cycle connects back to head.' },
      { input: 'head = [1], pos = -1', output: 'false', explanation: 'No cycle.' }
    ],
    constraints: ['The number of nodes in the list is in the range [0, 10^4].', '-10^5 <= Node.val <= 10^5'],
    patternClues: ['Cycle detection in linked list without mutating values or using hash set', 'Two pointers moving at speed 1 and speed 2 must collide if a loop exists'],
    bruteForce: { approach: 'Store visited nodes in a HashSet.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'O(N) extra space.' },
    optimizedApproach: { concept: 'Floyd\'s Cycle Finding Algorithm with slow and fast pointers.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'Advance slow by 1, fast by 2. If fast == slow at any point, cycle exists. If fast reaches null, no cycle.' },
    hints: ['If two runners race on a circular track at different speeds, the faster runner will eventually lap the slower runner.', 'Move slow by 1 node, fast by 2 nodes.'],
    pseudocode: `slow = head, fast = head
while fast != null and fast.next != null:
    slow = slow.next
    fast = fast.next.next
    if slow == fast: return true
return false`,
    javaSolution: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; next = null; }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}`,
    starterCode: `public class Solution {
    public boolean hasCycle(ListNode head) {
        // Write your solution here
        return false;
    }
}`,
    testCases: [
      { input: 'head = [3, 2, 0, -4], pos = 1', expectedOutput: 'true' },
      { input: 'head = [1], pos = -1', expectedOutput: 'false' }
    ],
    hiddenTestCases: [{ input: 'head = [], pos = -1', expectedOutput: 'false' }],
    interviewExplanationScript: '"We use Floyd\'s cycle-finding algorithm (tortoise and hare). We initialize a slow pointer moving 1 step and a fast pointer moving 2 steps. If the list is acyclic, fast reaches null in O(N) time. If a cycle exists, the relative speed difference of 1 step per iteration guarantees fast will catch up and collide with slow. This achieves O(N) time and optimal O(1) space."'
  },
  {
    id: 'middle-of-the-linked-list',
    title: 'Middle of the Linked List',
    leetcodeNumber: 876,
    difficulty: 'Easy',
    patternId: 'fast-slow-pointers',
    patternName: 'Fast & Slow 1:2 Stride',
    category: 'Linked List',
    conceptId: 'fast-slow-pointers',
    conceptName: 'Fast-Slow 2:1 Pointer Midpoint Bisection',
    acceptanceRate: '78.2%',
    frequency: 'High (Standard Screener)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta'],
    description: 'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.',
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[3, 4, 5]', explanation: 'Middle node is 3.' },
      { input: 'head = [1, 2, 3, 4, 5, 6]', output: '[4, 5, 6]', explanation: 'Two middle nodes: 3 and 4, return 4.' }
    ],
    constraints: ['The number of nodes in the list is in the range [1, 100].', '1 <= Node.val <= 100'],
    patternClues: ['Find midpoint in one pass without counting length first', 'When fast travels 2x distance of slow, slow is exactly at mid'],
    bruteForce: { approach: 'Pass 1 counts total nodes N, Pass 2 travels N/2 steps.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', bottleneck: 'Requires two passes.' },
    optimizedApproach: { concept: 'Single-pass fast and slow pointer.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'While fast != null && fast.next != null: slow = slow.next, fast = fast.next.next. Return slow.' },
    hints: ['Move fast 2 steps forward for every 1 step slow moves.', 'When fast hits the end, slow will be at the middle.'],
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
      { input: 'head = [1, 2, 3, 4, 5]', expectedOutput: '[3, 4, 5]' },
      { input: 'head = [1, 2, 3, 4, 5, 6]', expectedOutput: '[4, 5, 6]' }
    ],
    hiddenTestCases: [{ input: 'head = [1]', expectedOutput: '[1]' }],
    interviewExplanationScript: '"By utilizing a 2:1 speed ratio between fast and slow pointers, when the fast pointer reaches the end of the list, the slow pointer has traversed exactly half the distance, landing directly on the middle node (or second middle if length is even). This solves the problem in a single pass with O(N) time and O(1) space."'
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    leetcodeNumber: 206,
    difficulty: 'Easy',
    patternId: 'in-place-reversal',
    patternName: 'In-Place Pointer Redirection',
    category: 'Linked List',
    conceptId: 'linked-list',
    conceptName: 'Three-Pointer In-Place Link Inversion',
    acceptanceRate: '76.8%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Bloomberg'],
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'Reversed order.' },
      { input: 'head = [1, 2]', output: '[2, 1]', explanation: 'Reversed two nodes.' }
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    patternClues: ['In-place list inversion', 'Redirect next pointers backwards: prev, curr, nextTemp'],
    bruteForce: { approach: 'Collect all values in an ArrayList, reverse and recreate nodes.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', bottleneck: 'O(N) unnecessary memory.' },
    optimizedApproach: { concept: 'Iterative 3-pointer redirection.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', keyIdea: 'prev = null, curr = head. While curr != null: next = curr.next, curr.next = prev, prev = curr, curr = next. Return prev.' },
    hints: ['Keep track of the previous node so you can point current.next to it.', 'Remember to save current.next in a temporary variable before overwriting it.'],
    pseudocode: `prev = null, curr = head
while curr != null:
    next = curr.next
    curr.next = prev
    prev = curr
    curr = next
return prev`,
    javaSolution: `public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }

        return prev;
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
      { input: 'head = [1, 2]', expectedOutput: '[2, 1]' }
    ],
    hiddenTestCases: [{ input: 'head = []', expectedOutput: '[]' }],
    interviewExplanationScript: '"We reverse the singly linked list iteratively in-place using three pointers: prev, curr, and nextTemp. For each node, we stash its original next node, redirect curr.next backwards to prev, and advance prev and curr forward. When curr reaches null, prev is the new head of the reversed list. Runs in O(N) time and O(1) space."'
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    leetcodeNumber: 21,
    difficulty: 'Easy',
    patternId: 'two-pointers',
    patternName: 'Dummy Head Merging',
    category: 'Linked List',
    conceptId: 'linked-list',
    conceptName: 'Sentinel Dummy Head Two-Way List Splice',
    acceptanceRate: '64.2%',
    frequency: 'Top Placement (Amazon, Microsoft, Google, Meta)',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple'],
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    examples: [
      { input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]', output: '[1, 1, 2, 3, 4, 4]', explanation: 'Merged sorted sequence.' },
      { input: 'list1 = [], list2 = []', output: '[]', explanation: 'Empty lists.' }
    ],
    constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order.'],
    patternClues: ['Merging two sorted chains', 'Dummy sentinel node simplifies boundary edge cases'],
    bruteForce: { approach: 'Collect all values into an array, sort array, rebuild linked list.', timeComplexity: 'O((N+M) log(N+M))', spaceComplexity: 'O(N+M)', bottleneck: 'Does not exploit existing sorted order.' },
    optimizedApproach: { concept: 'Sentinel node with two pointers picking smaller element.', timeComplexity: 'O(N + M)', spaceComplexity: 'O(1)', keyIdea: 'dummy = new ListNode(-1), tail = dummy. While list1 != null && list2 != null, attach smaller node. Finally attach remaining list.' },
    hints: ['Create a dummy node to act as the anchor of the merged list.', 'Compare heads, attach the smaller one, and advance that list.'],
    pseudocode: `dummy = new ListNode(0)
curr = dummy
while l1 != null and l2 != null:
    if l1.val <= l2.val:
        curr.next = l1; l1 = l1.next
    else:
        curr.next = l2; l2 = l2.next
    curr = curr.next
curr.next = (l1 != null) ? l1 : l2
return dummy.next`,
    javaSolution: `public class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1);
        ListNode current = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }

        current.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,
    starterCode: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        return null;
    }
}`,
    testCases: [
      { input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]', expectedOutput: '[1, 1, 2, 3, 4, 4]' },
      { input: 'list1 = [], list2 = []', expectedOutput: '[]' }
    ],
    hiddenTestCases: [{ input: 'list1 = [], list2 = [0]', expectedOutput: '[0]' }],
    interviewExplanationScript: '"We use a dummy head node to avoid branching logic for the first node. At each step, we compare the current nodes of both lists and splice the smaller node onto our merged list. Once either list is exhausted, we append the entire remaining chain in O(1) time. This runs in O(N + M) time and O(1) auxiliary space."'
  },

  // --- CONCEPT: BINARY SEARCH ---
  {
    id: 'binary-search-core',
    title: 'Binary Search',
    leetcodeNumber: 704,
    difficulty: 'Easy',
    patternId: 'binary-search',
    patternName: 'Iterative Interval Halving',
    category: 'Binary Search',
    conceptId: 'binary-search',
    conceptName: 'Logarithmic Interval Bisection with Overflow Avoidance',
    acceptanceRate: '57.4%',
    frequency: 'Top Placement (Amazon, Google, Meta, Microsoft)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log N) runtime complexity.',
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1', explanation: '2 does not exist in nums.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
    patternClues: ['Sorted array and O(log N) required', 'Use mid = low + (high - low) / 2 to prevent integer overflow'],
    bruteForce: { approach: 'Linear scan from index 0 to n-1.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', bottleneck: 'Does not take advantage of sorted property.' },
    optimizedApproach: { concept: 'Divide and conquer search space halving.', timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', keyIdea: 'Compare target with nums[mid]. If equal return mid; if target < nums[mid] search left half (high = mid - 1); else search right half (low = mid + 1).' },
    hints: ['Calculate mid using low + (high - low) / 2.', 'Maintain low <= high invariant.'],
    pseudocode: `low = 0, high = nums.length - 1
while low <= high:
    mid = low + (high - low) / 2
    if nums[mid] == target: return mid
    else if nums[mid] < target: low = mid + 1
    else: high = mid - 1
return -1`,
    javaSolution: `public class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
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
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', expectedOutput: '4' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', expectedOutput: '-1' }
    ],
    hiddenTestCases: [{ input: 'nums = [5], target = 5', expectedOutput: '0' }],
    interviewExplanationScript: '"We maintain a search interval [low, high]. In each iteration, we examine the midpoint calculated as low + (high - low) / 2 to prevent 32-bit integer overflow. If nums[mid] matches target, we return mid immediately. Otherwise, because the array is sorted, we discard half the elements by updating low or high. Runs in strictly O(log N) time and O(1) space."'
  },
  {
    id: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    leetcodeNumber: 875,
    difficulty: 'Medium',
    patternId: 'binary-search',
    patternName: 'Binary Search on Monotonic Answer Range',
    category: 'Binary Search',
    conceptId: 'binary-search',
    conceptName: 'Monotonic Feasibility Function Bisection (Search on Answer)',
    acceptanceRate: '50.1%',
    frequency: 'Top Placement (Google, Amazon, Meta)',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Return the minimum integer k such that she can eat all the bananas within h hours.',
    examples: [
      { input: 'piles = [3, 6, 7, 11], h = 8', output: '4', explanation: 'At speed 4, Koko can eat all in 8 hours.' },
      { input: 'piles = [30, 11, 23, 4, 20], h = 5', output: '30', explanation: 'Must eat largest pile in 1 hour, so speed is 30.' },
      { input: 'piles = [30, 11, 23, 4, 20], h = 6', output: '23', explanation: 'Speed 23 allows finishing in 6 hours.' }
    ],
    constraints: ['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9', '1 <= piles[i] <= 10^9'],
    patternClues: ['Find minimum speed k satisfying a condition', 'Monotonic feasibility: if speed k is fast enough, any speed > k is also valid'],
    bruteForce: { approach: 'Linear scan k from 1 up to max(piles).', timeComplexity: 'O(N * max(piles))', spaceComplexity: 'O(1)', bottleneck: 'max(piles) can be 10^9, causing TLE.' },
    optimizedApproach: { concept: 'Binary search on speed k in range [1, max(piles)].', timeComplexity: 'O(N log(max(piles)))', spaceComplexity: 'O(1)', keyIdea: 'If Koko can finish at speed mid in <= h hours, try a slower speed (high = mid - 1). Otherwise, increase speed (low = mid + 1).' },
    hints: ['The range of possible speeds is between 1 and the maximum pile size.', 'Notice that as speed increases, total time needed monotonically decreases.'],
    pseudocode: `low = 1, high = max(piles), ans = high
while low <= high:
    mid = low + (high - low) / 2
    hours = 0
    for p in piles: hours += (p + mid - 1) / mid
    if hours <= h:
        ans = mid
        high = mid - 1
    else:
        low = mid + 1
return ans`,
    javaSolution: `public class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1;
        int high = 0;
        for (int pile : piles) {
            high = Math.max(high, pile);
        }

        int result = high;

        while (low <= high) {
            int midSpeed = low + (high - low) / 2;

            long totalHours = 0;
            for (int pile : piles) {
                // Integer division ceiling: ceil(pile / midSpeed)
                totalHours += (pile + midSpeed - 1) / midSpeed;
            }

            if (totalHours <= h) {
                result = midSpeed;
                high = midSpeed - 1; // Try to find a slower valid speed
            } else {
                low = midSpeed + 1;  // Speed is too slow, increase it
            }
        }

        return result;
    }
}`,
    starterCode: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        // Write your solution here
        return 0;
    }
}`,
    testCases: [
      { input: 'piles = [3, 6, 7, 11], h = 8', expectedOutput: '4' },
      { input: 'piles = [30, 11, 23, 4, 20], h = 5', expectedOutput: '30' }
    ],
    hiddenTestCases: [{ input: 'piles = [312884470], h = 968709470', expectedOutput: '1' }],
    interviewExplanationScript: '"This problem is a quintessential Binary Search on Answer. The feasibility of speed k is monotonic: if Koko can finish all bananas in h hours at speed k, she can definitely finish at any speed > k. Hence, we binary search over the range [1, max(piles)]. For each candidate speed, calculating hours takes O(N). The overall time complexity is O(N log(max(piles))) with O(1) space."'
  }
];
