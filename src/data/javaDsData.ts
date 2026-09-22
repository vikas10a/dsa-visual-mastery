import { JavaDataStructureInfo } from '../types';

export const JAVA_DATA_STRUCTURES: JavaDataStructureInfo[] = [
  {
    name: 'ArrayDeque (Preferred Stack & Queue)',
    javaPackage: 'java.util.ArrayDeque',
    interfaceOrClass: 'Class implementing Deque<E>, Queue<E>',
    what: 'A resizable-array implementation of the Deque interface with no capacity restrictions, faster than Stack and LinkedList.',
    why: 'Legacy java.util.Stack extends Vector and synchronizes on every call (adding thread overhead). LinkedList has higher cache misses and 24-byte pointer overhead per node. ArrayDeque is contiguous and cache-friendly.',
    whenToUse: 'Whenever you need a LIFO Stack or a FIFO Queue in coding interviews.',
    syntax: `// As a Stack:
Deque<Integer> stack = new ArrayDeque<>();
stack.push(10);
int top = stack.pop();
int peek = stack.peek();

// As a Queue:
Queue<Integer> queue = new ArrayDeque<>();
queue.offer(10);
int front = queue.poll();`,
    importantMethods: [
      { method: 'push(e)', desc: 'Pushes element onto stack (head of deque)', time: 'Amortized O(1)' },
      { method: 'pop()', desc: 'Removes and returns top of stack (throws exception if empty)', time: 'O(1)' },
      { method: 'peek()', desc: 'Returns top of stack without removing (returns null if empty)', time: 'O(1)' },
      { method: 'offer(e)', desc: 'Inserts into queue tail (returns false if full)', time: 'Amortized O(1)' },
      { method: 'poll()', desc: 'Retrieves and removes queue head (returns null if empty)', time: 'O(1)' },
      { method: 'isEmpty()', desc: 'Checks if deque has no elements', time: 'O(1)' }
    ],
    codeExample: `Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);
stack.push(2);
while (!stack.isEmpty()) {
    System.out.println(stack.pop()); // 2, then 1
}`,
    timeComplexity: [
      { operation: 'Push / Offer', complexity: 'Amortized O(1)' },
      { operation: 'Pop / Poll', complexity: 'O(1)' },
      { operation: 'Peek', complexity: 'O(1)' },
      { operation: 'Search / Contains', complexity: 'O(N)' }
    ],
    spaceComplexity: 'O(N)',
    interviewUse: 'The de-facto standard in FAANG / top-tier Java interviews for BFS queues, DFS stacks, and monotonic stacks.',
    commonMistakes: [
      'ArrayDeque does NOT permit null elements (throws NullPointerException)',
      'Accidentally calling addFirst/addLast in inconsistent orders when using as stack'
    ],
    underTheHood: 'Circular array buffer that doubles in size when full, maintaining head and tail pointer indices.'
  },
  {
    name: 'HashMap',
    javaPackage: 'java.util.HashMap',
    interfaceOrClass: 'Class implementing Map<K, V>',
    what: 'Hash table based implementation of the Map interface providing constant-time performance for basic operations.',
    why: 'Allows mapping unique keys to arbitrary values, enabling fast lookups, frequency counting, and two-sum complements.',
    whenToUse: 'Frequency counting, grouping by key, complement lookups, memoization in DP, graph adjacency lists.',
    syntax: `Map<String, Integer> map = new HashMap<>();
map.put("key", 1);
int val = map.getOrDefault("key", 0);
boolean hasKey = map.containsKey("key");`,
    importantMethods: [
      { method: 'put(key, value)', desc: 'Associates specified value with specified key', time: 'Average O(1), Worst O(N)' },
      { method: 'getOrDefault(key, defaultVal)', desc: 'Returns value if key exists, else defaultVal', time: 'Average O(1)' },
      { method: 'containsKey(key)', desc: 'Returns true if map contains a mapping for key', time: 'Average O(1)' },
      { method: 'putIfAbsent(key, value)', desc: 'Puts value only if key is not already mapped', time: 'Average O(1)' },
      { method: 'keySet() / values() / entrySet()', desc: 'Collection views of keys, values, or entries', time: 'O(N)' }
    ],
    codeExample: `// Frequency count example:
Map<Character, Integer> freq = new HashMap<>();
for (char c : s.toCharArray()) {
    freq.put(c, freq.getOrDefault(c, 0) + 1);
}`,
    timeComplexity: [
      { operation: 'get() / put()', complexity: 'Average O(1), Worst O(log N) in Java 8+ with red-black trees' },
      { operation: 'containsKey()', complexity: 'Average O(1)' },
      { operation: 'remove()', complexity: 'Average O(1)' },
      { operation: 'Iteration', complexity: 'O(N + Capacity)' }
    ],
    spaceComplexity: 'O(N)',
    interviewUse: 'Used in 40%+ of all interview coding questions. Critical for caching and frequency tracking.',
    commonMistakes: [
      'Unboxing null into a primitive int: map.get(x) returns null if missing, leading to NullPointerException! Always use getOrDefault.',
      'Modifying keys while they are inside the HashMap (corrupts hash code)',
      'Forgetting to override both equals() and hashCode() when using custom classes as keys'
    ],
    underTheHood: 'Array of Node<K,V> buckets. In Java 8+, buckets with >8 collisions transform from LinkedList into Red-Black Tree (TreeNode), bounding worst-case collision lookup to O(log N).'
  },
  {
    name: 'PriorityQueue (Binary Heap)',
    javaPackage: 'java.util.PriorityQueue',
    interfaceOrClass: 'Class implementing Queue<E>',
    what: 'An unbounded priority queue based on a binary heap. Elements are ordered according to their natural ordering (Min-Heap by default) or by a Comparator.',
    why: 'Provides O(1) access to the minimum (or maximum) element and O(log N) insertion/extraction, perfect for Top K and Dijkstra.',
    whenToUse: 'Top K largest/smallest elements, Dijkstra shortest path, Prim MST, Median from data stream (Two Heaps), Merge K sorted lists.',
    syntax: `// Default Min-Heap:
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// Max-Heap:
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

// Custom Comparator (e.g. by frequency):
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));`,
    importantMethods: [
      { method: 'offer(e)', desc: 'Inserts element and sifts up into binary heap', time: 'O(log N)' },
      { method: 'poll()', desc: 'Retrieves and removes the root of the heap (min or max)', time: 'O(log N)' },
      { method: 'peek()', desc: 'Retrieves without removing the root', time: 'O(1)' },
      { method: 'size()', desc: 'Returns number of elements in heap', time: 'O(1)' }
    ],
    codeExample: `PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(1);
minHeap.offer(3);
System.out.println(minHeap.poll()); // Prints 1`,
    timeComplexity: [
      { operation: 'Peek (Root)', complexity: 'O(1)' },
      { operation: 'Offer / Add', complexity: 'O(log N)' },
      { operation: 'Poll / Remove Min', complexity: 'O(log N)' },
      { operation: 'Remove arbitrary element', complexity: 'O(N)' }
    ],
    spaceComplexity: 'O(N)',
    interviewUse: 'Essential for K-th element questions, greedy scheduling, and greedy graph algorithms.',
    commonMistakes: [
      'Iterating through PriorityQueue with for-each loop and expecting sorted order. (It only guarantees root is min; to print in sorted order you MUST poll() repeatedly!)',
      'Using (a, b) -> a - b which can overflow on 32-bit signed integers. Use Integer.compare(a, b).'
    ],
    underTheHood: 'Stored as a flat array Object[] where children of index i are at 2*i + 1 and 2*i + 2, and parent is at (i - 1) / 2.'
  },
  {
    name: 'ArrayList',
    javaPackage: 'java.util.ArrayList',
    interfaceOrClass: 'Class implementing List<E>',
    what: 'Resizable-array implementation of the List interface, offering fast random index access.',
    why: 'Unlike fixed Java primitive arrays (int[]), ArrayList dynamically expands its capacity by 50% (newCapacity = oldCapacity + (oldCapacity >> 1)) when filled.',
    whenToUse: 'General sequential storage, building result lists, dynamic buffers where random access by index is frequent.',
    syntax: `List<Integer> list = new ArrayList<>();
list.add(5);
int item = list.get(0);
list.remove(list.size() - 1); // Fast O(1) remove from tail`,
    importantMethods: [
      { method: 'add(e)', desc: 'Appends element to end of list', time: 'Amortized O(1)' },
      { method: 'get(index)', desc: 'Returns element at index', time: 'O(1)' },
      { method: 'set(index, element)', desc: 'Replaces element at index', time: 'O(1)' },
      { method: 'remove(index)', desc: 'Removes element at index (requires shifting remainder)', time: 'O(N)' }
    ],
    codeExample: `List<Integer> list = new ArrayList<>();
list.add(10);
list.add(20);
System.out.println(list.get(1)); // 20`,
    timeComplexity: [
      { operation: 'Get / Set by index', complexity: 'O(1)' },
      { operation: 'Add to end', complexity: 'Amortized O(1)' },
      { operation: 'Insert / Remove at index i', complexity: 'O(N)' },
      { operation: 'Contains / IndexOf', complexity: 'O(N)' }
    ],
    spaceComplexity: 'O(N)',
    interviewUse: 'Default linear list in almost every question.',
    commonMistakes: [
      'Removing from beginning (list.remove(0)) inside a loop -> quadratic O(N²) disaster! Use Deque or LinkedList if removing from head is needed.',
      'Calling list.remove(1) when expecting to remove the integer 1 (ambiguity between remove(int index) and remove(Object o))'
    ],
    underTheHood: 'Backing array Object[]. Resizes when full with System.arraycopy.'
  },
  {
    name: 'StringBuilder',
    javaPackage: 'java.lang.StringBuilder',
    interfaceOrClass: 'Class',
    what: 'A mutable sequence of characters. Unlike Java String (which is immutable and creates a new object on every + concatenation), StringBuilder modifies its buffer in-place.',
    why: 'Repeated String concatenation with \'+\' inside a loop of size N takes O(N²) time due to copying on every iteration. StringBuilder does it in O(N) linear time.',
    whenToUse: 'Constructing strings character by character, reversing strings, building paths in backtracking or tree traversals.',
    syntax: `StringBuilder sb = new StringBuilder();
sb.append("a");
sb.append(123);
sb.reverse();
String result = sb.toString();`,
    importantMethods: [
      { method: 'append(x)', desc: 'Appends string representation of x to end of buffer', time: 'Amortized O(1)' },
      { method: 'deleteCharAt(index)', desc: 'Deletes character at index (used in backtracking)', time: 'O(1) if at tail, O(N) inside' },
      { method: 'reverse()', desc: 'Reverses the sequence of characters in-place', time: 'O(N)' },
      { method: 'setLength(newLength)', desc: 'Truncates or clears the buffer (sb.setLength(0) clears)', time: 'O(1)' }
    ],
    codeExample: `StringBuilder sb = new StringBuilder();
for (int i = 0; i < 5; i++) {
    sb.append(i).append(",");
}
System.out.println(sb.toString()); // "0,1,2,3,4,"`,
    timeComplexity: [
      { operation: 'Append to end', complexity: 'Amortized O(1)' },
      { operation: 'Reverse', complexity: 'O(N)' },
      { operation: 'ToString', complexity: 'O(N)' },
      { operation: 'Delete last char (sb.deleteCharAt(sb.length() - 1))', complexity: 'O(1)' }
    ],
    spaceComplexity: 'O(N)',
    interviewUse: 'String building, palindrome checks, path serialization.',
    commonMistakes: [
      'Using String + in a loop (O(N²) quadratic time penalty)',
      'Using StringBuffer instead of StringBuilder (StringBuffer is synchronized and slower)'
    ],
    underTheHood: 'Char array char[] that doubles in size when capacity is exceeded.'
  }
];
