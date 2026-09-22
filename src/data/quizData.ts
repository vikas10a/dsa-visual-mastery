import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Pattern Recognition Quizzes
  {
    id: 'pq-1',
    category: 'pattern',
    question: 'You are given a sorted integer array. You need to find two distinct numbers that add up to a target value. Which pattern provides the optimal O(N) time and O(1) space solution?',
    options: [
      'Sliding Window',
      'Two Pointers (opposite ends)',
      'Binary Search on Answer',
      'Monotonic Stack'
    ],
    correctIndex: 1,
    explanation: 'Since the array is sorted, placing two pointers at the left and right extremities allows you to eliminate values based on whether the current sum is less than or greater than the target in O(N) time with O(1) space.',
    clueOrTip: 'Clue: Sorted array + pair sum search = Two Pointers.'
  },
  {
    id: 'pq-2',
    category: 'pattern',
    question: 'You are given an array of daily temperatures. For each day, you need to find how many days you must wait until a warmer temperature appears. What is the optimal approach?',
    options: [
      'Binary Search',
      'Monotonic Stack',
      'Prefix Sum',
      'Two Pointers'
    ],
    correctIndex: 1,
    explanation: 'This is the classic Next Greater Element problem. A monotonic decreasing stack storing indices allows resolving the warmer day for each previous colder day in amortized O(N) time.',
    clueOrTip: 'Clue: "Next greater element" or "distance to next higher value" = Monotonic Stack.'
  },
  {
    id: 'pq-3',
    category: 'pattern',
    question: 'You are given a string s. You need to find the length of the longest contiguous substring that contains at most 2 distinct characters. Which pattern is optimal?',
    options: [
      'Sliding Window with Frequency Map',
      'Two Pointers from both ends',
      'Dynamic Programming 2D',
      'Monotonic Deque'
    ],
    correctIndex: 0,
    explanation: 'Contiguous substring condition + at most K distinct characters is the hallmark of a variable-size Sliding Window. The right pointer expands the window while the left pointer shrinks it whenever distinct characters exceed 2.',
    clueOrTip: 'Clue: Contiguous substring + "at most K distinct" = Variable-size Sliding Window.'
  },
  {
    id: 'pq-4',
    category: 'pattern',
    question: 'You need to find the K-th largest element in a continuous data stream of incoming integers. Which data structure & pattern should you use?',
    options: [
      'Max-Heap of size N',
      'Min-Heap of bounded size K',
      'Sorted ArrayList with binary insertion',
      'Monotonic Stack'
    ],
    correctIndex: 1,
    explanation: 'Maintaining a Min-Heap capped at size K keeps the K largest numbers seen so far, with the smallest of those top K elements right at the root in O(1) peek time. Insertion takes O(log K).',
    clueOrTip: 'Clue: Top K largest elements in a stream = Min-Heap of size K.'
  },
  {
    id: 'pq-5',
    category: 'pattern',
    question: 'Given an array of intervals [start, end], you need to merge all overlapping intervals into non-overlapping ones. What is the essential first step?',
    options: [
      'Insert all intervals into a Min-Heap by end time',
      'Sort the intervals chronologically by their start time',
      'Use two pointers to compare every pair',
      'Build a prefix sum array'
    ],
    correctIndex: 1,
    explanation: 'Sorting intervals by their start time ensures that any interval that could possibly overlap with interval i must appear directly after i, turning an O(N²) check into a single O(N) pass.',
    clueOrTip: 'Clue: Overlapping intervals almost always begin by sorting by start time.'
  },

  // Complexity Quizzes
  {
    id: 'cq-1',
    category: 'complexity',
    question: 'What is the time complexity of the following Java method?\n\nint count = 0;\nfor (int i = 1; i <= n; i *= 2) {\n    count++;\n}',
    options: [
      'O(N)',
      'O(log N)',
      'O(N log N)',
      'O(1)'
    ],
    correctIndex: 1,
    explanation: 'The loop variable doubles each step (1, 2, 4, 8, ... 2^k <= N). Taking log2 of both sides gives k = log2(N) iterations.',
    clueOrTip: 'Multiplying or dividing loop variables by a constant factor runs in logarithmic O(log N) time.'
  },
  {
    id: 'cq-2',
    category: 'complexity',
    question: 'What is the amortized time complexity of the push and pop operations on an ArrayDeque in Java?',
    options: [
      'O(N)',
      'O(log N)',
      'O(1)',
      'O(√N)'
    ],
    correctIndex: 2,
    explanation: 'ArrayDeque operates as a circular ring buffer with head and tail index offsets. Pushing and popping take strictly O(1) time, with rare resize doubling amortizing to O(1).',
    clueOrTip: 'ArrayDeque push/pop operations do not require shifting elements, unlike ArrayList.remove(0).'
  },
  {
    id: 'cq-3',
    category: 'complexity',
    question: 'What is the time complexity of building a heap from an unsorted array of N elements using bottom-up heapify (heapify / PriorityQueue(Collection))?',
    options: [
      'O(N log N)',
      'O(N)',
      'O(N²)',
      'O(log N)'
    ],
    correctIndex: 1,
    explanation: 'Although inserting N elements one-by-one into an initially empty heap takes O(N log N), building a heap in-place bottom-up (Floyd\'s algorithm) mathematically converges to O(N).',
    clueOrTip: 'Bottom-up heapify on an array takes linear O(N) time because most nodes are near the bottom and sift down at most 1 or 2 levels.'
  },

  // Java Collections Quizzes
  {
    id: 'jq-1',
    category: 'javads',
    question: 'Why should you prefer Deque<Integer> stack = new ArrayDeque<>() over java.util.Stack in modern Java?',
    options: [
      'ArrayDeque has synchronized methods for multi-threading',
      'Stack extends Vector, making all methods synchronized with unnecessary locking overhead',
      'Stack does not support push() and pop()',
      'ArrayDeque uses less heap than primitive arrays'
    ],
    correctIndex: 1,
    explanation: 'java.util.Stack is a legacy class from Java 1.0 that inherits from Vector. Every method is synchronized, causing performance degradation in single-threaded environments. ArrayDeque is unsynchronized and cache-efficient.',
    clueOrTip: 'Official Java API documentation explicitly recommends ArrayDeque over Stack for LIFO operations.'
  },
  {
    id: 'jq-2',
    category: 'javads',
    question: 'In Java, what happens if you write:\nint count = map.get("missing_key");\nwhere "missing_key" does not exist in the Map<String, Integer>?',
    options: [
      'count is set to 0',
      'It throws a NoSuchElementException',
      'It throws a NullPointerException during auto-unboxing',
      'The code fails to compile'
    ],
    correctIndex: 2,
    explanation: 'map.get() returns null for missing keys. Java attempts to auto-unbox the returned java.lang.Integer object into the primitive int count, invoking .intValue() on null, which throws NullPointerException. Always use map.getOrDefault("missing_key", 0).',
    clueOrTip: 'Auto-unboxing null to primitive int throws NullPointerException! Use map.getOrDefault().'
  }
];
