import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Pattern Recognition',
    question: 'What pattern is optimal when a problem mentions a "contiguous subarray/substring" and asks for max/min length or target condition?',
    answer: 'Sliding Window',
    keyClue: 'Contiguous segment + variable or fixed size window constraint.',
    javaTip: 'int left = 0; for (int right = 0; right < n; right++) { while (invalid) left++; }',
    intervalDays: 1
  },
  {
    id: 'fc-2',
    category: 'Pattern Recognition',
    question: 'How do you identify a Monotonic Stack problem in a coding interview?',
    answer: 'When asked for the Next/Previous Greater/Smaller element, or distance to next higher/lower value (e.g., Daily Temperatures, Histogram).',
    keyClue: 'Look for phrases like "find the next element larger than current" in O(N) time.',
    javaTip: 'Store indices in Deque<Integer> stack = new ArrayDeque<>() to track both values and calculate index distance.',
    intervalDays: 3
  },
  {
    id: 'fc-3',
    category: 'Pattern Recognition',
    question: 'To find the K largest elements in an array, should you use a Min-Heap or a Max-Heap?',
    answer: 'A Min-Heap of size K!',
    keyClue: 'Why? The root is the SMALLEST of the top K elements. If a new number is bigger than the root, it replaces the root. Keeps space capped at O(K) and time at O(N log K).',
    javaTip: 'PriorityQueue<Integer> minHeap = new PriorityQueue<>(); if (minHeap.size() > k) minHeap.poll();',
    intervalDays: 3
  },
  {
    id: 'fc-4',
    category: 'Java Traps',
    question: 'Why does writing (a, b) -> a - b in a Java PriorityQueue comparator create a dangerous bug?',
    answer: 'Integer subtraction can overflow when subtracting large positive and negative numbers (e.g. Integer.MIN_VALUE - 1), corrupting the ordering!',
    keyClue: 'Never use subtraction for comparison in Java.',
    javaTip: 'Always use: Integer.compare(a, b) or (a, b) -> Integer.compare(a[0], b[0])',
    intervalDays: 7
  },
  {
    id: 'fc-5',
    category: 'Graph & BFS',
    question: 'What is the number one bug that causes memory explosion in Breadth-First Search (BFS)?',
    answer: 'Marking a node as visited when it is DEQUEUED instead of when it is ENQUEUED.',
    keyClue: 'If you wait to mark visited on dequeue, multiple neighbors will re-enqueue the same node hundreds of times.',
    javaTip: 'visited[neighbor] = true; queue.offer(neighbor); (Both together!)',
    intervalDays: 7
  },
  {
    id: 'fc-6',
    category: 'Dynamic Programming',
    question: 'What are the 3 essential components of a Dynamic Programming formulation?',
    answer: '1. State Definition (what dp[i] represents)\n2. Recurrence Relation (how dp[i] transitions from smaller subproblems)\n3. Base Cases (initial terminating boundary values)',
    keyClue: 'Never write DP code before writing the mathematical transition on paper.',
    javaTip: 'Always check if target==0 or input length==0 before allocating DP arrays.',
    intervalDays: 14
  }
];
