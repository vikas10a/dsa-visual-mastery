import { StepState } from '../types';

export function generatePatternSteps(patternId: string, customInput?: any, customParam?: any): StepState[] {
  switch (patternId) {
    case 'two-pointers': {
      const nums = Array.isArray(customInput) && customInput.length > 0 && typeof customInput[0] === 'number'
        ? customInput
        : [1, 3, 5, 7, 9, 11];
      const target = typeof customParam === 'number' ? customParam : 12;
      return generateTwoPointersSteps(nums, target);
    }
    case 'sliding-window': {
      const nums = Array.isArray(customInput) && customInput.length > 0 && typeof customInput[0] === 'number'
        ? customInput
        : [2, 1, 5, 1, 3, 2, 4];
      const k = typeof customParam === 'number' ? customParam : 3;
      return generateSlidingWindowSteps(nums, k);
    }
    case 'binary-search': {
      const nums = Array.isArray(customInput) && customInput.length > 0 && typeof customInput[0] === 'number'
        ? customInput
        : [1, 3, 5, 7, 9, 11, 13];
      const target = typeof customParam === 'number' ? customParam : 9;
      return generateBinarySearchSteps(nums, target);
    }
    case 'frequency-counting': {
      const str = typeof customInput === 'string'
        ? customInput
        : Array.isArray(customInput)
          ? customInput.join('')
          : 'abacb';
      return generateFrequencyCountingSteps(str);
    }
    case 'matrix-traversal': {
      const matrix = Array.isArray(customInput) && customInput.length > 0 && Array.isArray(customInput[0])
        ? customInput
        : [
            [1, 2, 3, 4],
            [12, 13, 14, 5],
            [11, 16, 15, 6],
            [10, 9, 8, 7]
          ];
      return generateMatrixTraversalSteps(matrix);
    }
    case 'monotonic-stack': {
      const nums = Array.isArray(customInput) && customInput.length > 0 && typeof customInput[0] === 'number'
        ? customInput
        : [1, 3, 2, 4];
      return generateMonotonicStackSteps(nums);
    }
    case 'prefix-sum': {
      const nums = Array.isArray(customInput) && customInput.length > 0 && typeof customInput[0] === 'number'
        ? customInput
        : [1, 2, 3, 4];
      return generatePrefixSumSteps(nums);
    }
    case 'overlapping-intervals': {
      const intervals = Array.isArray(customInput) && customInput.length > 0 && Array.isArray(customInput[0])
        ? customInput
        : [[1, 4], [3, 6], [8, 10], [9, 12]];
      return generateIntervalsSteps(intervals);
    }
    case 'greedy': {
      const coins = Array.isArray(customInput) && customInput.length > 0 && typeof customInput[0] === 'number'
        ? customInput
        : [25, 10, 5, 1];
      const amount = typeof customParam === 'number' ? customParam : 15;
      return generateGreedySteps(coins, amount);
    }
    case 'top-k-elements': {
      const nums = Array.isArray(customInput) && customInput.length > 0 && typeof customInput[0] === 'number'
        ? customInput
        : [3, 2, 1, 5, 6, 4];
      const k = typeof customParam === 'number' ? customParam : 3;
      return generateTopKSteps(nums, k);
    }
    case 'backtracking': {
      const nums = Array.isArray(customInput) && customInput.length > 0 && typeof customInput[0] === 'number'
        ? customInput
        : [1, 2, 3];
      return generateBacktrackingSteps(nums);
    }
    case 'binary-tree-traversal':
      return generateTreeTraversalSteps();
    case 'depth-first-search':
      return generateGraphDFSSteps();
    case 'breadth-first-search':
      return generateGraphBFSSteps();
    case 'dynamic-programming': {
      const n = typeof customInput === 'number' ? customInput : (typeof customParam === 'number' ? customParam : 6);
      return generateDPSteps(n);
    }
    default:
      return generateTwoPointersSteps([1, 3, 5, 7, 9, 11], 12);
  }
}

// 1. Two Pointers
function generateTwoPointersSteps(nums: number[], target: number): StepState[] {
  const steps: StepState[] = [];
  let left = 0;
  let right = nums.length - 1;
  let step = 1;

  steps.push({
    stepNumber: step++,
    title: 'Initialize Left & Right Pointers',
    explanation: `Array has ${nums.length} elements. Place left pointer at start (index 0, value ${nums[0]}) and right pointer at end (index ${right}, value ${nums[right]}). Target is ${target}.`,
    beginnerNote: 'In a sorted array, the smallest element is at index 0 and largest is at the last index. These two boundaries bound all possible pair sums.',
    javaLineHighlight: [3, 4],
    variables: { left, right, target, 'nums[left]': nums[left], 'nums[right]': nums[right], currentSum: '-' },
    actionType: 'compare',
    arrayData: nums.map((v, i) => ({
      value: v,
      index: i,
      state: i === left ? 'pointer-left' : i === right ? 'pointer-right' : 'default'
    })),
    pointers: [
      { name: 'L', index: left, color: 'emerald' },
      { name: 'R', index: right, color: 'rose' }
    ],
    dryRunRow: { Step: 1, Left: left, Right: right, Sum: '-', Action: 'Initialized pointers' }
  });

  while (left < right) {
    const currentSum = nums[left] + nums[right];

    if (currentSum === target) {
      steps.push({
        stepNumber: step++,
        title: `Target Found! nums[${left}] + nums[${right}] == ${target}`,
        explanation: `Sum (${nums[left]} + ${nums[right]} = ${currentSum}) matches the target ${target}! Valid pair found at 0-indexed positions [${left}, ${right}].`,
        beginnerNote: 'Since the problem asks for any valid pair, we can immediately return these indices without scanning further.',
        javaLineHighlight: [9, 10],
        variables: { left, right, target, 'nums[left]': nums[left], 'nums[right]': nums[right], currentSum, status: 'MATCH FOUND' },
        actionType: 'match',
        arrayData: nums.map((v, i) => ({
          value: v,
          index: i,
          state: i === left || i === right ? 'match' : (i < left || i > right) ? 'eliminated' : 'default'
        })),
        pointers: [
          { name: 'L', index: left, color: 'emerald' },
          { name: 'R', index: right, color: 'rose' }
        ],
        dryRunRow: { Step: step - 1, Left: left, Right: right, Sum: currentSum, Action: 'FOUND TARGET' }
      });
      return steps;
    } else if (currentSum < target) {
      steps.push({
        stepNumber: step++,
        title: `Sum (${currentSum}) < Target (${target}) -> Advance Left Pointer`,
        explanation: `Current sum ${nums[left]} + ${nums[right]} = ${currentSum} is strictly less than target ${target}. Since array is sorted, pairing nums[left] with any other element to the left of 'right' would only give smaller sums! Therefore, nums[${left}] can never be part of a valid pair. Move left pointer: left++.`,
        beginnerNote: 'Because nums[left] paired with the largest remaining element nums[right] is still too small, nums[left] is eliminated.',
        javaLineHighlight: [12, 13],
        variables: { left, right, target, 'nums[left]': nums[left], 'nums[right]': nums[right], currentSum, action: 'left++' },
        actionType: 'move',
        arrayData: nums.map((v, i) => ({
          value: v,
          index: i,
          state: i === left ? 'pointer-left' : i === right ? 'pointer-right' : i < left ? 'eliminated' : 'default'
        })),
        pointers: [
          { name: 'L', index: left, color: 'emerald' },
          { name: 'R', index: right, color: 'rose' }
        ],
        dryRunRow: { Step: step - 1, Left: left, Right: right, Sum: currentSum, Action: `Sum < ${target} -> left++` }
      });
      left++;
    } else {
      steps.push({
        stepNumber: step++,
        title: `Sum (${currentSum}) > Target (${target}) -> Decrement Right Pointer`,
        explanation: `Current sum ${nums[left]} + ${nums[right]} = ${currentSum} is strictly greater than target ${target}. Even paired with the smallest remaining element (nums[left]), nums[right] produces a sum that is too large. Therefore, nums[${right}] can never be part of a valid pair. Move right pointer: right--.`,
        beginnerNote: 'Because nums[right] paired with the smallest remaining candidate is still too big, nums[right] is safely eliminated.',
        javaLineHighlight: [15, 16],
        variables: { left, right, target, 'nums[left]': nums[left], 'nums[right]': nums[right], currentSum, action: 'right--' },
        actionType: 'move',
        arrayData: nums.map((v, i) => ({
          value: v,
          index: i,
          state: i === left ? 'pointer-left' : i === right ? 'pointer-right' : i > right ? 'eliminated' : 'default'
        })),
        pointers: [
          { name: 'L', index: left, color: 'emerald' },
          { name: 'R', index: right, color: 'rose' }
        ],
        dryRunRow: { Step: step - 1, Left: left, Right: right, Sum: currentSum, Action: `Sum > ${target} -> right--` }
      });
      right--;
    }
  }

  steps.push({
    stepNumber: step,
    title: 'Search Exhausted (No Pair Found)',
    explanation: `Pointers crossed (left=${left}, right=${right}). No two elements in the array sum to ${target}. Return [-1, -1].`,
    beginnerNote: 'Every possible candidate was systematically eliminated in O(N) steps without checking all N² combinations.',
    javaLineHighlight: [19],
    variables: { left, right, target, result: '[-1, -1]' },
    arrayData: nums.map((v, i) => ({ value: v, index: i, state: 'eliminated' })),
    dryRunRow: { Step: step, Left: left, Right: right, Sum: '-', Action: 'Finished: No match' }
  });

  return steps;
}

// 2. Sliding Window
function generateSlidingWindowSteps(nums: number[], k: number): StepState[] {
  const steps: StepState[] = [];
  let step = 1;

  let currentSum = 0;
  for (let i = 0; i < Math.min(k, nums.length); i++) {
    currentSum += nums[i];
  }
  let maxSum = currentSum;

  steps.push({
    stepNumber: step++,
    title: `Initialize Initial Window of Size K=${k}`,
    explanation: `Compute the sum of the first ${k} elements nums[0..${k-1}]: ${nums.slice(0, k).join(' + ')} = ${currentSum}. Set maxSum = ${currentSum}.`,
    beginnerNote: 'Instead of recalculating the sum of k elements at every index (which takes O(N * K)), we maintain a rolling sum and update it in O(1).',
    javaLineHighlight: [6, 7, 8, 9, 11],
    variables: { k, currentSum, maxSum, windowStart: 0, windowEnd: k - 1 },
    actionType: 'compare',
    arrayData: nums.map((v, i) => ({
      value: v,
      index: i,
      state: i < k ? 'window' : 'default'
    })),
    window: { start: 0, end: k - 1, sum: currentSum, label: `Sum: ${currentSum}` },
    dryRunRow: { Step: 1, Window: `[0..${k-1}]`, Added: `nums[0..${k-1}]`, Removed: '-', CurrentSum: currentSum, MaxSum: maxSum }
  });

  for (let right = k; right < nums.length; right++) {
    const left = right - k;
    const leavingVal = nums[left];
    const enteringVal = nums[right];
    currentSum += enteringVal - leavingVal;
    maxSum = Math.max(maxSum, currentSum);

    steps.push({
      stepNumber: step++,
      title: `Slide Window Right -> [${left + 1}..${right}]`,
      explanation: `Element nums[${left}] (${leavingVal}) leaves window from left. Element nums[${right}] (${enteringVal}) enters window from right. New sum = ${currentSum}. Updated maxSum = ${maxSum}.`,
      beginnerNote: 'Notice the O(1) formula: currentSum = currentSum + enteringVal - leavingVal. No loop required to compute the new window sum!',
      javaLineHighlight: [15, 16],
      variables: { right, left: left + 1, leavingVal, enteringVal, currentSum, maxSum },
      actionType: 'move',
      arrayData: nums.map((v, i) => ({
        value: v,
        index: i,
        state: (i >= left + 1 && i <= right) ? 'window' : (i <= left) ? 'visited' : 'default'
      })),
      window: { start: left + 1, end: right, sum: currentSum, label: `Sum: ${currentSum}` },
      dryRunRow: { Step: step - 1, Window: `[${left + 1}..${right}]`, Added: `+${enteringVal}`, Removed: `-${leavingVal}`, CurrentSum: currentSum, MaxSum: maxSum }
    });
  }

  steps.push({
    stepNumber: step,
    title: `Sliding Window Complete -> Maximum Sum = ${maxSum}`,
    explanation: `All ${nums.length - k + 1} contiguous windows of size ${k} evaluated in single linear pass. Global maximum sum is ${maxSum}.`,
    beginnerNote: 'Time complexity is strictly O(N) because each element was added to the sum once and subtracted once.',
    javaLineHighlight: [19],
    variables: { result: maxSum, totalElements: nums.length },
    actionType: 'found',
    arrayData: nums.map((v, i) => ({ value: v, index: i, state: 'default' })),
    dryRunRow: { Step: step, Window: 'All windows checked', Added: '-', Removed: '-', CurrentSum: '-', MaxSum: maxSum }
  });

  return steps;
}

// 3. Binary Search
function generateBinarySearchSteps(nums: number[], target: number): StepState[] {
  const steps: StepState[] = [];
  let low = 0;
  let high = nums.length - 1;
  let step = 1;

  steps.push({
    stepNumber: step++,
    title: 'Initialize Binary Search Bounds',
    explanation: `Array is sorted with ${nums.length} elements. Set low = 0 (value ${nums[0]}), high = ${high} (value ${nums[high]}). Searching for target ${target}.`,
    beginnerNote: 'In binary search, we maintain the invariant that if target exists, it must lie within the inclusive range [low, high].',
    javaLineHighlight: [2, 3],
    variables: { low, high, target, rangeSize: high - low + 1 },
    actionType: 'compare',
    arrayData: nums.map((v, i) => ({ value: v, index: i, state: 'default' })),
    pointers: [
      { name: 'low', index: low, color: 'emerald' },
      { name: 'high', index: high, color: 'rose' }
    ],
    dryRunRow: { Step: 1, Low: low, High: high, Mid: '-', 'nums[mid]': '-', Action: 'Set initial bounds' }
  });

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const midVal = nums[mid];

    if (midVal === target) {
      steps.push({
        stepNumber: step++,
        title: `Target Found! nums[${mid}] == ${target}`,
        explanation: `Middle index mid = ${mid} has value ${midVal}, which equals target ${target}! Returning index ${mid}.`,
        beginnerNote: 'The target was found in O(log N) iterations. Half the elements were discarded at each step.',
        javaLineHighlight: [9, 10],
        variables: { low, high, mid, 'nums[mid]': midVal, target, status: 'FOUND' },
        actionType: 'match',
        arrayData: nums.map((v, i) => ({
          value: v,
          index: i,
          state: i === mid ? 'match' : (i < low || i > high) ? 'eliminated' : 'default'
        })),
        pointers: [{ name: 'MID', index: mid, color: 'cyan' }],
        dryRunRow: { Step: step - 1, Low: low, High: high, Mid: mid, 'nums[mid]': midVal, Action: 'FOUND MATCH' }
      });
      return steps;
    } else if (midVal < target) {
      steps.push({
        stepNumber: step++,
        title: `nums[${mid}]=${midVal} < Target (${target}) -> Search Right Half`,
        explanation: `Middle value ${midVal} is strictly smaller than target ${target}. Because the array is sorted, every element at and to the left of index ${mid} is <= ${midVal} < ${target}. Eliminate left half [${low}..${mid}] by moving low = mid + 1 (${mid + 1}).`,
        beginnerNote: 'Notice how mid + (high - low)/2 avoids integer overflow compared to (low + high)/2.',
        javaLineHighlight: [12, 13],
        variables: { low, high, mid, 'nums[mid]': midVal, target, nextLow: mid + 1 },
        actionType: 'move',
        arrayData: nums.map((v, i) => ({
          value: v,
          index: i,
          state: i === mid ? 'pointer-mid' : i < mid ? 'eliminated' : (i >= low && i <= high) ? 'default' : 'eliminated'
        })),
        pointers: [
          { name: 'low', index: low, color: 'emerald' },
          { name: 'mid', index: mid, color: 'cyan' },
          { name: 'high', index: high, color: 'rose' }
        ],
        dryRunRow: { Step: step - 1, Low: low, High: high, Mid: mid, 'nums[mid]': midVal, Action: `nums[mid] < target -> low = ${mid + 1}` }
      });
      low = mid + 1;
    } else {
      steps.push({
        stepNumber: step++,
        title: `nums[${mid}]=${midVal} > Target (${target}) -> Search Left Half`,
        explanation: `Middle value ${midVal} is strictly greater than target ${target}. Because array is sorted, every element at and to the right of index ${mid} is >= ${midVal} > ${target}. Eliminate right half [${mid}..${high}] by moving high = mid - 1 (${mid - 1}).`,
        beginnerNote: 'We subtract 1 because nums[mid] has already been inspected and is not equal to target.',
        javaLineHighlight: [15, 16],
        variables: { low, high, mid, 'nums[mid]': midVal, target, nextHigh: mid - 1 },
        actionType: 'move',
        arrayData: nums.map((v, i) => ({
          value: v,
          index: i,
          state: i === mid ? 'pointer-mid' : i > mid ? 'eliminated' : (i >= low && i <= high) ? 'default' : 'eliminated'
        })),
        pointers: [
          { name: 'low', index: low, color: 'emerald' },
          { name: 'mid', index: mid, color: 'cyan' },
          { name: 'high', index: high, color: 'rose' }
        ],
        dryRunRow: { Step: step - 1, Low: low, High: high, Mid: mid, 'nums[mid]': midVal, Action: `nums[mid] > target -> high = ${mid - 1}` }
      });
      high = mid - 1;
    }
  }

  steps.push({
    stepNumber: step,
    title: `Target ${target} Not Found`,
    explanation: `Search bounds crossed (low > high). The target does not exist in the array. Return -1.`,
    beginnerNote: 'When low > high, the search window has collapsed to 0 elements, proving the target is not in the array.',
    javaLineHighlight: [19],
    variables: { low, high, target, result: -1 },
    arrayData: nums.map((v, i) => ({ value: v, index: i, state: 'eliminated' })),
    dryRunRow: { Step: step, Low: low, High: high, Mid: '-', 'nums[mid]': '-', Action: 'Exhausted: return -1' }
  });

  return steps;
}

// 4. Frequency Counting
function generateFrequencyCountingSteps(rawStr: any): StepState[] {
  const str = typeof rawStr === 'string'
    ? rawStr
    : Array.isArray(rawStr)
      ? rawStr.join('')
      : String(rawStr ?? 'abacb');
  const steps: StepState[] = [];
  const freq: Record<string, number> = {};
  let step = 1;

  steps.push({
    stepNumber: step++,
    title: 'Initialize Frequency Buckets',
    explanation: `String "${str}" has length ${str.length}. Initialize frequency table with 0 for all characters.`,
    beginnerNote: 'For lowercase English letters, an array int[] freq = new int[26] provides O(1) lookup with zero object allocation overhead.',
    javaLineHighlight: [4],
    variables: { string: str, uniqueKeys: 0 },
    hashMapData: [],
    dryRunRow: { Step: 1, Char: '-', Action: 'Initialized frequency array' }
  });

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    freq[ch] = (freq[ch] || 0) + 1;

    steps.push({
      stepNumber: step++,
      title: `Process Character '${ch}' at index ${i}`,
      explanation: `Read '${ch}'. Increment bucket count: freq['${ch}'] = ${freq[ch]}.`,
      beginnerNote: 'In Java: freq[s.charAt(i) - \'a\']++ directly converts character ASCII value to an array index between 0 and 25.',
      javaLineHighlight: [7],
      variables: { currentIndex: i, currentChar: ch, count: freq[ch] },
      actionType: 'insert',
      arrayData: str.split('').map((c, idx) => ({
        value: c,
        index: idx,
        state: idx === i ? 'active' : idx < i ? 'visited' : 'default'
      })),
      hashMapData: Object.entries(freq).map(([k, v]) => ({ key: k, value: v, active: k === ch })),
      dryRunRow: { Step: step - 1, Char: ch, Index: i, Count: freq[ch], Action: `Incremented bucket '${ch}'` }
    });
  }

  steps.push({
    stepNumber: step,
    title: 'Frequency Counting Complete',
    explanation: `Entire string processed in O(N) time. Frequency table now gives instantaneous O(1) query time for character counts.`,
    beginnerNote: 'This table can now instantly solve Anagrams, First Unique Character, or Palindrome permutation checks.',
    javaLineHighlight: [11],
    variables: { totalCharacters: str.length, distinctKeys: Object.keys(freq).length },
    hashMapData: Object.entries(freq).map(([k, v]) => ({ key: k, value: v })),
    dryRunRow: { Step: step, Char: 'All', Action: 'Counting complete' }
  });

  return steps;
}

// 5. Matrix Traversal (Spiral)
function generateMatrixTraversalSteps(matrix: number[][]): StepState[] {
  const steps: StepState[] = [];
  let step = 1;
  const m = matrix.length;
  const n = matrix[0].length;
  let top = 0, bottom = m - 1, left = 0, right = n - 1;
  const visited: [number, number][] = [];
  const result: number[] = [];

  steps.push({
    stepNumber: step++,
    title: 'Initialize 4 Boundaries',
    explanation: `Grid size ${m}x${n}. Boundaries: top=0, bottom=${bottom}, left=0, right=${right}.`,
    beginnerNote: 'Spiral traversal peels the matrix layer-by-layer like an onion by shrinking the four boundary lines.',
    javaLineHighlight: [4, 5],
    variables: { top, bottom, left, right, elementsRemaining: m * n },
    matrixData: { grid: matrix, visitedCells: [] },
    dryRunRow: { Step: 1, Boundary: `T=${top}, B=${bottom}, L=${left}, R=${right}`, Action: 'Boundaries set' }
  });

  while (top <= bottom && left <= right) {
    // Top Row: Left to Right
    for (let c = left; c <= right; c++) {
      visited.push([top, c]);
      result.push(matrix[top][c]);
    }
    steps.push({
      stepNumber: step++,
      title: `Traverse Top Row Left->Right [Row ${top}]`,
      explanation: `Read row ${top} from column ${left} to ${right}: values [${matrix[top].slice(left, right + 1).join(', ')}]. Increment top: top = ${top + 1}.`,
      beginnerNote: 'Once the top row is read, we increment top++ so it is never visited again.',
      javaLineHighlight: [9, 10, 11, 12],
      variables: { top: top + 1, bottom, left, right, collectedCount: result.length },
      matrixData: { grid: matrix, currentRow: top, visitedCells: [...visited] },
      dryRunRow: { Step: step - 1, Boundary: `Row ${top} L->R`, Action: `Collected ${right - left + 1} items; top++` }
    });
    top++;

    // Right Column: Top to Bottom
    for (let r = top; r <= bottom; r++) {
      visited.push([r, right]);
      result.push(matrix[r][right]);
    }
    steps.push({
      stepNumber: step++,
      title: `Traverse Right Column Top->Bottom [Col ${right}]`,
      explanation: `Read column ${right} from row ${top} to ${bottom}. Decrement right: right = ${right - 1}.`,
      beginnerNote: 'The rightmost column is exhausted, so we decrement right boundary inwards.',
      javaLineHighlight: [15, 16, 17, 18],
      variables: { top, bottom, left, right: right - 1, collectedCount: result.length },
      matrixData: { grid: matrix, currentCol: right, visitedCells: [...visited] },
      dryRunRow: { Step: step - 1, Boundary: `Col ${right} T->B`, Action: `Collected ${bottom - top + 1} items; right--` }
    });
    right--;

    // Bottom Row: Right to Left
    if (top <= bottom) {
      for (let c = right; c >= left; c--) {
        visited.push([bottom, c]);
        result.push(matrix[bottom][c]);
      }
      steps.push({
        stepNumber: step++,
        title: `Traverse Bottom Row Right->Left [Row ${bottom}]`,
        explanation: `Read row ${bottom} from column ${right} down to ${left}. Decrement bottom: bottom = ${bottom - 1}.`,
        beginnerNote: 'Always check (top <= bottom) before reading backwards to avoid double-processing single-row matrices.',
        javaLineHighlight: [21, 22, 23, 24, 25],
        variables: { top, bottom: bottom - 1, left, right, collectedCount: result.length },
        matrixData: { grid: matrix, currentRow: bottom, visitedCells: [...visited] },
        dryRunRow: { Step: step - 1, Boundary: `Row ${bottom} R->L`, Action: `Collected items; bottom--` }
      });
      bottom--;
    }

    // Left Column: Bottom to Top
    if (left <= right) {
      for (let r = bottom; r >= top; r--) {
        visited.push([r, left]);
        result.push(matrix[r][left]);
      }
      steps.push({
        stepNumber: step++,
        title: `Traverse Left Column Bottom->Top [Col ${left}]`,
        explanation: `Read column ${left} from row ${bottom} up to ${top}. Increment left: left = ${left + 1}.`,
        beginnerNote: 'One full perimeter layer is complete! The algorithm repeats inward for inner layers.',
        javaLineHighlight: [28, 29, 30, 31, 32],
        variables: { top, bottom, left: left + 1, right, collectedCount: result.length },
        matrixData: { grid: matrix, currentCol: left, visitedCells: [...visited] },
        dryRunRow: { Step: step - 1, Boundary: `Col ${left} B->T`, Action: `Collected items; left++` }
      });
      left++;
    }
  }

  steps.push({
    stepNumber: step,
    title: 'Spiral Traversal Complete',
    explanation: `All ${m * n} elements gathered in spiral order: [${result.join(', ')}].`,
    beginnerNote: 'Every cell visited exactly once -> O(M * N) time with O(1) extra boundary tracking space.',
    javaLineHighlight: [35],
    variables: { totalItems: result.length },
    matrixData: { grid: matrix, visitedCells: [...visited] },
    dryRunRow: { Step: step, Boundary: 'Done', Action: 'Full spiral complete' }
  });

  return steps;
}

// 6. Monotonic Stack
function generateMonotonicStackSteps(nums: number[]): StepState[] {
  const steps: StepState[] = [];
  let step = 1;
  const n = nums.length;
  const result: number[] = new Array(n).fill(-1);
  const stack: number[] = []; // Stores INDICES

  steps.push({
    stepNumber: step++,
    title: 'Initialize Monotonic Stack & Result Array',
    explanation: `Result array filled with -1. Initialize empty Deque<Integer> stack to store unresolved indices.`,
    beginnerNote: 'Always store indices on the stack, not values. Storing indices allows you to both look up the value and write to the output array directly.',
    javaLineHighlight: [3, 4, 7],
    variables: { 'result[]': JSON.stringify(result), 'stack.size()': 0 },
    actionType: 'compare',
    arrayData: nums.map((v, i) => ({ value: v, index: i, state: 'default' })),
    stackData: [],
    dryRunRow: { Step: 1, CurrentNum: '-', Stack: '[]', Result: JSON.stringify(result), Action: 'Initialized stack' }
  });

  for (let i = 0; i < n; i++) {
    const curVal = nums[i];

    // Check stack tops
    while (stack.length > 0 && curVal > nums[stack[stack.length - 1]]) {
      const poppedIdx = stack.pop()!;
      result[poppedIdx] = curVal;

      steps.push({
        stepNumber: step++,
        title: `Pop index ${poppedIdx} (val=${nums[poppedIdx]}) -> Next Greater is ${curVal}`,
        explanation: `Current element nums[${i}] (${curVal}) is greater than nums[stack.peek()] (${nums[poppedIdx]}). Pop index ${poppedIdx} and set result[${poppedIdx}] = ${curVal}!`,
        beginnerNote: 'This is the key insight: when an incoming value is larger than the top of the stack, it acts as the immediate "next greater" for that top item.',
        javaLineHighlight: [11, 12, 13],
        variables: { currentIdx: i, curVal, poppedIdx, 'resolvedResult[]': JSON.stringify(result) },
        actionType: 'pop',
        arrayData: nums.map((v, idx) => ({
          value: v,
          index: idx,
          state: idx === i ? 'active' : idx === poppedIdx ? 'match' : stack.includes(idx) ? 'pointer-left' : 'default'
        })),
        stackData: stack.map(idx => `${nums[idx]} (idx ${idx})`),
        dryRunRow: { Step: step - 1, CurrentNum: curVal, Stack: `[${stack.join(', ')}]`, Result: JSON.stringify(result), Action: `Popped ${poppedIdx}, next greater=${curVal}` }
      });
    }

    stack.push(i);
    steps.push({
      stepNumber: step++,
      title: `Push index ${i} (val=${curVal}) onto Stack`,
      explanation: `Current index ${i} with value ${curVal} is pushed onto the stack waiting for its next greater element in subsequent iterations.`,
      beginnerNote: 'Notice the monotonic decreasing property: elements remaining inside the stack are in strictly descending order.',
      javaLineHighlight: [16],
      variables: { currentIdx: i, curVal, 'stackTop': i },
      actionType: 'push',
      arrayData: nums.map((v, idx) => ({
        value: v,
        index: idx,
        state: idx === i ? 'active' : stack.includes(idx) ? 'pointer-left' : 'default'
      })),
      stackData: stack.map(idx => `${nums[idx]} (idx ${idx})`),
      dryRunRow: { Step: step - 1, CurrentNum: curVal, Stack: `[${stack.join(', ')}]`, Result: JSON.stringify(result), Action: `Pushed index ${i}` }
    });
  }

  steps.push({
    stepNumber: step,
    title: 'Monotonic Stack Traversal Complete',
    explanation: `Any indices remaining in the stack have no greater element to their right, so they retain their initial value of -1. Final result: [${result.join(', ')}].`,
    beginnerNote: 'Total complexity is O(N) because every element was pushed exactly once and popped at most once.',
    javaLineHighlight: [19],
    variables: { finalResult: JSON.stringify(result) },
    actionType: 'found',
    arrayData: nums.map((v, i) => ({ value: v, index: i, state: 'default' })),
    stackData: stack.map(idx => `${nums[idx]} (idx ${idx})`),
    dryRunRow: { Step: step, CurrentNum: '-', Stack: `[${stack.join(', ')}]`, Result: JSON.stringify(result), Action: 'Complete' }
  });

  return steps;
}

// 7. Prefix Sum
function generatePrefixSumSteps(nums: number[]): StepState[] {
  const steps: StepState[] = [];
  let step = 1;
  const n = nums.length;
  const prefix: number[] = new Array(n + 1).fill(0);

  steps.push({
    stepNumber: step++,
    title: 'Initialize 1-Indexed Prefix Array',
    explanation: `Prefix sum array allocated with size ${n + 1}. prefix[0] = 0 (base case representing sum of 0 elements).`,
    beginnerNote: 'Using size N+1 with prefix[0]=0 avoids cumbersome if (left == 0) checks when querying range sums.',
    javaLineHighlight: [4],
    variables: { 'prefix[0]': 0 },
    arrayData: prefix.map((v, i) => ({ value: v, index: i, state: i === 0 ? 'active' : 'default' })),
    dryRunRow: { Step: 1, Index: 0, PrefixVal: 0, Action: 'prefix[0] = 0' }
  });

  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
    steps.push({
      stepNumber: step++,
      title: `Compute prefix[${i + 1}] = prefix[${i}] + nums[${i}]`,
      explanation: `Add nums[${i}] (${nums[i]}) to previous cumulative sum (${prefix[i]}). prefix[${i + 1}] = ${prefix[i + 1]}.`,
      beginnerNote: 'Now prefix[i+1] caches the exact sum of all elements from nums[0] to nums[i].',
      javaLineHighlight: [6],
      variables: { i, 'nums[i]': nums[i], 'prefix[i]': prefix[i], 'prefix[i+1]': prefix[i + 1] },
      actionType: 'insert',
      arrayData: prefix.map((v, idx) => ({
        value: v,
        index: idx,
        state: idx === i + 1 ? 'match' : idx <= i ? 'visited' : 'default'
      })),
      dryRunRow: { Step: step - 1, Index: i + 1, PrefixVal: prefix[i + 1], Action: `${prefix[i]} + ${nums[i]} = ${prefix[i + 1]}` }
    });
  }

  // Example Query: Query sum of nums[1..2] (3 + 5 = 8)
  const qL = 1;
  const qR = Math.min(2, n - 1);
  const rangeSum = prefix[qR + 1] - prefix[qL];
  steps.push({
    stepNumber: step,
    title: `O(1) Range Query Demonstration: Sum of [${qL}..${qR}]`,
    explanation: `Query range [${qL}..${qR}]: prefix[${qR + 1}] - prefix[${qL}] = ${prefix[qR + 1]} - ${prefix[qL]} = ${rangeSum} in constant O(1) time!`,
    beginnerNote: 'Instead of looping through range elements, any range sum query takes exactly 1 subtraction.',
    javaLineHighlight: [11],
    variables: { queryLeft: qL, queryRight: qR, result: rangeSum },
    actionType: 'found',
    arrayData: prefix.map((v, idx) => ({
      value: v,
      index: idx,
      state: idx === qR + 1 || idx === qL ? 'pointer-mid' : 'default'
    })),
    dryRunRow: { Step: step, Index: `[${qL}..${qR}]`, PrefixVal: rangeSum, Action: `prefix[${qR + 1}] - prefix[${qL}] = ${rangeSum}` }
  });

  return steps;
}

// 8. Overlapping Intervals
function generateIntervalsSteps(intervals: [number, number][]): StepState[] {
  const steps: StepState[] = [];
  let step = 1;

  // Clone and sort
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);

  steps.push({
    stepNumber: step++,
    title: 'Sort Intervals Chronologically by Start Time',
    explanation: `Original intervals sorted by start time: [${sorted.map(iv => `[${iv[0]}, ${iv[1]}]`).join(', ')}].`,
    beginnerNote: 'Sorting ensures that if interval B overlaps with A, B must appear after A in the sorted sequence.',
    javaLineHighlight: [5],
    variables: { sortedCount: sorted.length },
    intervalsData: { intervals: sorted, activeIndices: [0] },
    dryRunRow: { Step: 1, Interval: 'All', Action: 'Sorted chronologically' }
  });

  const merged: [number, number][] = [[sorted[0][0], sorted[0][1]]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      const oldEnd = lastMerged[1];
      lastMerged[1] = Math.max(lastMerged[1], current[1]);

      steps.push({
        stepNumber: step++,
        title: `Overlap Detected! Merge [${current[0]}, ${current[1]}] with [${lastMerged[0]}, ${oldEnd}]`,
        explanation: `Next interval starts at ${current[0]}, which is <= previous end (${oldEnd}). Merge by updating end = max(${oldEnd}, ${current[1]}) -> ${lastMerged[1]}.`,
        beginnerNote: 'Because next.start <= current.end, the two intervals touch or overlap and become a single continuous span.',
        javaLineHighlight: [14, 15],
        variables: { currentStart: current[0], currentEnd: current[1], mergedSpan: `[${lastMerged[0]}, ${lastMerged[1]}]` },
        actionType: 'match',
        intervalsData: { intervals: sorted, activeIndices: [i], mergedIntervals: [...merged.map(m => [m[0], m[1]] as [number, number])] },
        dryRunRow: { Step: step - 1, Interval: `[${current[0]}, ${current[1]}]`, Action: `Overlapped: new end=${lastMerged[1]}` }
      });
    } else {
      merged.push([current[0], current[1]]);
      steps.push({
        stepNumber: step++,
        title: `No Overlap: Start New Interval [${current[0]}, ${current[1]}]`,
        explanation: `Next interval starts at ${current[0]}, which is > previous end (${lastMerged[1]}). Append as a distinct non-overlapping interval.`,
        beginnerNote: 'When there is a gap between intervals, the previous interval is sealed and a new one begins.',
        javaLineHighlight: [17, 18],
        variables: { currentStart: current[0], currentEnd: current[1], totalMerged: merged.length },
        actionType: 'insert',
        intervalsData: { intervals: sorted, activeIndices: [i], mergedIntervals: [...merged.map(m => [m[0], m[1]] as [number, number])] },
        dryRunRow: { Step: step - 1, Interval: `[${current[0]}, ${current[1]}]`, Action: 'No overlap: added to result' }
      });
    }
  }

  steps.push({
    stepNumber: step,
    title: 'Interval Merging Complete',
    explanation: `Result: ${merged.length} disjoint intervals: [${merged.map(m => `[${m[0]}, ${m[1]}]`).join(', ')}].`,
    beginnerNote: 'Time complexity: O(N log N) for sorting, plus linear O(N) sweep.',
    javaLineHighlight: [22],
    variables: { result: JSON.stringify(merged) },
    intervalsData: { intervals: sorted, mergedIntervals: merged },
    dryRunRow: { Step: step, Interval: 'Done', Action: 'Merge complete' }
  });

  return steps;
}

// 9. Greedy Coin Change
function generateGreedySteps(coins: number[], amount: number): StepState[] {
  const steps: StepState[] = [];
  let step = 1;
  let remaining = amount;
  const used: number[] = [];

  steps.push({
    stepNumber: step++,
    title: `Initialize Greedy Coin Selection (Target Amount: ${amount})`,
    explanation: `Available denominations (descending): [${coins.join(', ')}]. Goal: make ${amount} with minimum coin count.`,
    beginnerNote: 'Greedy always picks the largest denomination that fits within the remaining amount.',
    javaLineHighlight: [4],
    variables: { remaining, coinsUsedCount: 0 },
    dryRunRow: { Step: 1, Coin: '-', Remaining: remaining, Action: 'Started greedy selection' }
  });

  for (const coin of coins) {
    while (remaining >= coin) {
      remaining -= coin;
      used.push(coin);

      steps.push({
        stepNumber: step++,
        title: `Pick Largest Fitting Coin: ${coin}¢`,
        explanation: `Coin ${coin} fits into ${remaining + coin}. Deduct ${coin}. Remaining amount: ${remaining}.`,
        beginnerNote: 'For standard currency denominations, taking the largest coin leaves the minimum remaining deficit.',
        javaLineHighlight: [7, 8, 9],
        variables: { coinPicked: coin, remaining, totalCoinsUsed: used.length, usedList: JSON.stringify(used) },
        actionType: 'insert',
        arrayData: used.map((v, i) => ({ value: `${v}¢`, index: i, state: 'match' })),
        dryRunRow: { Step: step - 1, Coin: coin, Remaining: remaining, Action: `Took ${coin}¢ coin` }
      });
    }
  }

  steps.push({
    stepNumber: step,
    title: `Greedy Allocation Complete (Total Coins: ${used.length})`,
    explanation: `Amount ${amount} achieved with ${used.length} coins: [${used.join(', ')}].`,
    beginnerNote: 'Note: Greedy is optimal for canonical currencies (US quarters, dimes, nickels, pennies), but arbitrary coin systems require Dynamic Programming!',
    javaLineHighlight: [13],
    variables: { remainingAmount: remaining, totalCoins: used.length },
    arrayData: used.map((v, i) => ({ value: `${v}¢`, index: i, state: 'visited' })),
    dryRunRow: { Step: step, Coin: '-', Remaining: remaining, Action: `Done with ${used.length} coins` }
  });

  return steps;
}

// 10. Top K Elements (Min Heap)
function generateTopKSteps(nums: number[], k: number): StepState[] {
  const steps: StepState[] = [];
  let step = 1;
  const heap: number[] = [];

  steps.push({
    stepNumber: step++,
    title: `Initialize Min-Heap of bounded size K=${k}`,
    explanation: `Goal: Find ${k} largest elements in [${nums.join(', ')}]. Maintain a Min-Heap capped at size ${k}.`,
    beginnerNote: 'Why Min-Heap for K LARGEST? Because the root is the SMALLEST of the top K! If a new number is bigger than root, it belongs in the top K.',
    javaLineHighlight: [3],
    variables: { k, 'heap.size()': 0 },
    heapData: { array: [], isMinHeap: true },
    dryRunRow: { Step: 1, Num: '-', Heap: '[]', Action: 'Created Min-Heap PriorityQueue' }
  });

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    heap.push(num);
    heap.sort((a, b) => a - b); // Min heap simulation

    if (heap.length > k) {
      const evicted = heap.shift()!;
      steps.push({
        stepNumber: step++,
        title: `Offer ${num} -> Heap exceeds size ${k} -> Evict Root ${evicted}`,
        explanation: `Added ${num}. Heap size became ${k + 1}. Discard the minimum element (${evicted}) at root because it cannot be in the top ${k}.`,
        beginnerNote: 'In Java, heap.poll() removes the root in O(log K) time, keeping memory capped at K elements.',
        javaLineHighlight: [7, 10, 11],
        variables: { currentNum: num, evicted, 'heapRoot': heap[0], 'heap.size()': heap.length },
        actionType: 'pop',
        heapData: { array: [...heap], activeIndex: 0, isMinHeap: true },
        dryRunRow: { Step: step - 1, Num: num, Heap: `[${heap.join(', ')}]`, Action: `Added ${num}, polled ${evicted}` }
      });
    } else {
      steps.push({
        stepNumber: step++,
        title: `Offer ${num} to Min-Heap (Size ${heap.length}/${k})`,
        explanation: `Added ${num}. Heap currently contains: [${heap.join(', ')}]. Root is ${heap[0]}.`,
        beginnerNote: 'While heap size <= K, every incoming number is inserted.',
        javaLineHighlight: [7],
        variables: { currentNum: num, 'heap.size()': heap.length, 'minRoot': heap[0] },
        actionType: 'insert',
        heapData: { array: [...heap], activeIndex: heap.length - 1, isMinHeap: true },
        dryRunRow: { Step: step - 1, Num: num, Heap: `[${heap.join(', ')}]`, Action: `Added ${num}` }
      });
    }
  }

  steps.push({
    stepNumber: step,
    title: `Top ${k} Elements Found: Root (${heap[0]}) is the ${k}-th Largest!`,
    explanation: `Heap holds the top ${k} largest elements: [${heap.join(', ')}]. The root element ${heap[0]} is the ${k}-th largest in the entire array.`,
    beginnerNote: 'Overall time complexity is O(N log K), much faster than O(N log N) full array sort when K << N.',
    javaLineHighlight: [15],
    variables: { kthLargest: heap[0], topKElements: JSON.stringify(heap) },
    actionType: 'found',
    heapData: { array: [...heap], activeIndex: 0, isMinHeap: true },
    dryRunRow: { Step: step, Num: '-', Heap: `[${heap.join(', ')}]`, Action: `Root ${heap[0]} is Kth largest` }
  });

  return steps;
}

// 11. Backtracking (Subsets)
function generateBacktrackingSteps(nums: number[]): StepState[] {
  const steps: StepState[] = [];
  let step = 1;
  const path: number[] = [];
  const result: number[][] = [];

  steps.push({
    stepNumber: step++,
    title: 'Start Backtracking: Root of Decision Tree',
    explanation: `Input set: [${nums.join(', ')}]. Start with empty path []. Add [] to result subsets.`,
    beginnerNote: 'The core Backtracking rhythm is: Choose -> Explore -> Undo. At each node, current path is a valid subset.',
    javaLineHighlight: [3, 8],
    variables: { path: '[]', resultCount: 1 },
    arrayData: path.map((v, i) => ({ value: v, index: i })),
    dryRunRow: { Step: 1, Path: '[]', Action: 'Added empty subset []' }
  });
  result.push([]);

  function backtrack(start: number) {
    for (let i = start; i < nums.length; i++) {
      // 1. CHOOSE
      path.push(nums[i]);
      result.push([...path]);
      steps.push({
        stepNumber: step++,
        title: `CHOOSE: Add ${nums[i]} to Path -> [${path.join(', ')}]`,
        explanation: `Branching decision: include nums[${i}] (${nums[i]}). Current subset [${path.join(', ')}] recorded.`,
        beginnerNote: 'In Java, always save a copy: result.add(new ArrayList<>(path)). Otherwise, future modifications will mutate past saved states!',
        javaLineHighlight: [13, 8],
        variables: { currentNum: nums[i], path: `[${path.join(', ')}]`, totalSubsets: result.length },
        actionType: 'insert',
        arrayData: path.map((v, idx) => ({ value: v, index: idx, state: idx === path.length - 1 ? 'match' : 'visited' })),
        dryRunRow: { Step: step - 1, Path: `[${path.join(', ')}]`, Action: `CHOOSE ${nums[i]}` }
      });

      // 2. EXPLORE
      backtrack(i + 1);

      // 3. UNDO
      const removed = path.pop();
      steps.push({
        stepNumber: step++,
        title: `UNDO (Backtrack): Remove ${removed} -> Path restored to [${path.join(', ')}]`,
        explanation: `Backtracking from branch. Pop ${removed} from path to restore previous state for next sibling branch.`,
        beginnerNote: 'This is the "Undo" step: path.remove(path.size() - 1) resets the state so the next iteration starts clean.',
        javaLineHighlight: [17],
        variables: { backtrackedElement: removed ?? null, path: `[${path.join(', ')}]` },
        actionType: 'pop',
        arrayData: path.map((v, idx) => ({ value: v, index: idx, state: 'default' })),
        dryRunRow: { Step: step - 1, Path: `[${path.join(', ')}]`, Action: `UNDO ${removed}` }
      });
    }
  }

  backtrack(0);

  steps.push({
    stepNumber: step,
    title: `Backtracking Complete: All 2^${nums.length} = ${result.length} Subsets Generated`,
    explanation: `Full decision tree traversed. Result contains all ${result.length} subsets.`,
    beginnerNote: 'Every element had 2 choices (include or exclude), yielding exactly 2^N subsets in O(N * 2^N) time.',
    javaLineHighlight: [4],
    variables: { totalSubsets: result.length },
    actionType: 'found',
    dryRunRow: { Step: step, Path: 'Done', Action: `Generated all ${result.length} subsets` }
  });

  return steps;
}

// 12. Binary Tree Traversal
function generateTreeTraversalSteps(): StepState[] {
  const steps: StepState[] = [];
  const treeNodes = [
    { id: 4, value: 4, left: 2, right: 6, state: 'default' as const },
    { id: 2, value: 2, left: 1, right: 3, state: 'default' as const },
    { id: 6, value: 6, left: 5, right: 7, state: 'default' as const },
    { id: 1, value: 1, state: 'default' as const },
    { id: 3, value: 3, state: 'default' as const },
    { id: 5, value: 5, state: 'default' as const },
    { id: 7, value: 7, state: 'default' as const }
  ];

  const levels = [[4], [2, 6], [1, 3, 5, 7]];
  let step = 1;
  const visited: number[] = [];

  steps.push({
    stepNumber: step++,
    title: 'Initialize Binary Tree Level Order BFS Queue',
    explanation: 'Enqueue root node (4). Queue holds nodes for the upcoming level.',
    beginnerNote: 'Level-order traversal uses a FIFO queue. At each level, freeze int levelSize = queue.size() to process exactly one tier at a time.',
    javaLineHighlight: [5, 6],
    variables: { queue: '[4]', level: 0 },
    treeData: { nodes: treeNodes.map(n => ({ ...n })), rootId: 4 },
    queueData: [4],
    dryRunRow: { Step: 1, Node: 4, Queue: '[4]', Output: '[]', Action: 'Enqueued root 4' }
  });

  levels.forEach((levelNodes, lvlIdx) => {
    levelNodes.forEach((nodeVal) => {
      visited.push(nodeVal);
      steps.push({
        stepNumber: step++,
        title: `Level ${lvlIdx + 1}: Dequeue Node (${nodeVal})`,
        explanation: `Poll node ${nodeVal} from queue. Record to level output. Enqueue child nodes if present.`,
        beginnerNote: 'Dequeuing left child then right child ensures natural left-to-right visual order.',
        javaLineHighlight: [13, 14, 16, 17],
        variables: { currentNode: nodeVal, currentLevel: lvlIdx + 1, visitedSoFar: JSON.stringify(visited) },
        actionType: 'visit',
        treeData: {
          nodes: treeNodes.map(n => ({
            ...n,
            state: n.value === nodeVal ? 'current' : visited.includes(n.value) ? 'visited' : 'default'
          })),
          rootId: 4
        },
        queueData: visited.length < 7 ? [2, 6, 1, 3, 5, 7].filter(x => !visited.includes(x)).slice(0, 3) : [],
        dryRunRow: { Step: step - 1, Node: nodeVal, Queue: '...', Output: `[${visited.join(', ')}]`, Action: `Visited ${nodeVal}` }
      });
    });
  });

  return steps;
}

// 13. Graph DFS
function generateGraphDFSSteps(): StepState[] {
  const steps: StepState[] = [];
  const nodes = [
    { id: 'A', label: 'A', x: 80, y: 150, state: 'unvisited' as const },
    { id: 'B', label: 'B', x: 190, y: 80, state: 'unvisited' as const },
    { id: 'C', label: 'C', x: 300, y: 150, state: 'unvisited' as const },
    { id: 'D', label: 'D', x: 130, y: 260, state: 'unvisited' as const },
    { id: 'E', label: 'E', x: 250, y: 260, state: 'unvisited' as const }
  ];
  const edges = [
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'A', to: 'D' },
    { from: 'D', to: 'E' },
    { from: 'B', to: 'E' }
  ];

  const dfsOrder = ['A', 'B', 'C', 'E', 'D'];
  const visited: string[] = [];
  let step = 1;

  steps.push({
    stepNumber: step++,
    title: 'Initialize Graph DFS from Source Node A',
    explanation: 'Begin depth-first search from node A. Mark A as visited and push to call stack.',
    beginnerNote: 'DFS plunges as deep as possible along each branch before backtracking.',
    javaLineHighlight: [2, 3],
    variables: { currentNode: 'A', visited: '[]' },
    graphData: { nodes: nodes.map(n => ({ ...n })), edges, visitedOrder: [] },
    dryRunRow: { Step: 1, Node: 'A', Stack: '[A]', Action: 'Started DFS at A' }
  });

  dfsOrder.forEach((nodeId) => {
    visited.push(nodeId);
    steps.push({
      stepNumber: step++,
      title: `Visit Node ${nodeId} via DFS (Go Deep)`,
      explanation: `Exploring neighbor ${nodeId}. Mark visited[${nodeId}] = true. Recurse deeper.`,
      beginnerNote: 'Marking visited immediately prevents endless cycling in cyclic graphs.',
      javaLineHighlight: [3, 8],
      variables: { currentNode: nodeId, visited: `[${visited.join(', ')}]` },
      actionType: 'visit',
      graphData: {
        nodes: nodes.map(n => ({
          ...n,
          state: n.id === nodeId ? 'current' : visited.includes(n.id) ? 'visited' : 'unvisited'
        })),
        edges,
        visitedOrder: [...visited]
      },
      dryRunRow: { Step: step - 1, Node: nodeId, Stack: `[${visited.join(' -> ')}]`, Action: `Visited ${nodeId}` }
    });
  });

  return steps;
}

// 14. Graph BFS
function generateGraphBFSSteps(): StepState[] {
  const steps: StepState[] = [];
  const nodes = [
    { id: 'A', label: 'A', x: 80, y: 150, state: 'unvisited' as const },
    { id: 'B', label: 'B', x: 190, y: 80, state: 'unvisited' as const },
    { id: 'C', label: 'C', x: 300, y: 150, state: 'unvisited' as const },
    { id: 'D', label: 'D', x: 130, y: 260, state: 'unvisited' as const },
    { id: 'E', label: 'E', x: 250, y: 260, state: 'unvisited' as const }
  ];
  const edges = [
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'A', to: 'D' },
    { from: 'D', to: 'E' },
    { from: 'B', to: 'E' }
  ];

  // BFS from A: Dist 0: A; Dist 1: B, D; Dist 2: C, E
  const bfsOrder = ['A', 'B', 'D', 'C', 'E'];
  const visited: string[] = [];
  let step = 1;

  steps.push({
    stepNumber: step++,
    title: 'Initialize BFS Queue with Source Node A',
    explanation: 'Enqueue node A with distance 0. Mark visited[A] = true immediately upon enqueuing.',
    beginnerNote: 'CRITICAL RULE: Always mark a node visited WHEN YOU ENQUEUE IT, never when you dequeue it. Otherwise multiple neighbors will re-enqueue the same node!',
    javaLineHighlight: [6, 7],
    variables: { queue: '[A]', visited: '[A]' },
    graphData: { nodes: nodes.map(n => ({ ...n })), edges, activeQueueOrStack: ['A'] },
    dryRunRow: { Step: 1, Dequeued: '-', Queue: '[A]', Action: 'Enqueued start node A' }
  });

  bfsOrder.forEach((nodeId) => {
    visited.push(nodeId);
    steps.push({
      stepNumber: step++,
      title: `Dequeue Node ${nodeId} & Expand Neighbors Level-by-Level`,
      explanation: `Dequeue node ${nodeId}. Check all incident unvisited edges and enqueue adjacent nodes.`,
      beginnerNote: 'Because edges have uniform weight of 1, the first time a node is dequeued is guaranteed to be along its shortest path.',
      javaLineHighlight: [10, 11, 15, 16],
      variables: { dequeuedNode: nodeId, visitedNodes: `[${visited.join(', ')}]` },
      actionType: 'visit',
      graphData: {
        nodes: nodes.map(n => ({
          ...n,
          state: n.id === nodeId ? 'current' : visited.includes(n.id) ? 'visited' : 'unvisited'
        })),
        edges,
        visitedOrder: [...visited]
      },
      dryRunRow: { Step: step - 1, Dequeued: nodeId, Queue: '...', Action: `Processed level node ${nodeId}` }
    });
  });

  return steps;
}

// 15. Dynamic Programming (Fibonacci / Grid)
function generateDPSteps(n: number = 6): StepState[] {
  const steps: StepState[] = [];
  const dp: (number | null)[] = new Array(n + 1).fill(null);
  let step = 1;

  steps.push({
    stepNumber: step++,
    title: `Initialize DP Table of Size ${n + 1}`,
    explanation: `Problem: Compute Fib(${n}). Create array int[] dp = new int[${n + 1}]. State definition: dp[i] = i-th Fibonacci number.`,
    beginnerNote: 'Bottom-up DP builds solutions from smallest subproblems up to the target answer, saving every result in a table.',
    javaLineHighlight: [4],
    variables: { n, 'dp.length': n + 1 },
    dpTable: {
      headersX: Array.from({ length: n + 1 }, (_, i) => i),
      headersY: ['dp[i]'],
      cells: [dp],
      formula: 'dp[i] = dp[i-1] + dp[i-2]'
    },
    dryRunRow: { Step: 1, i: '-', 'dp[i]': '-', Action: 'Table allocated' }
  });

  // Base cases
  dp[0] = 0;
  dp[1] = 1;
  steps.push({
    stepNumber: step++,
    title: 'Initialize Base Cases: dp[0] = 0, dp[1] = 1',
    explanation: 'Fibonacci base cases: 0th value is 0, 1st value is 1. These seed the recurrence transition.',
    beginnerNote: 'Every DP problem requires well-defined base cases where the recurrence terminates.',
    javaLineHighlight: [6, 7],
    variables: { 'dp[0]': 0, 'dp[1]': 1 },
    actionType: 'insert',
    dpTable: {
      headersX: Array.from({ length: n + 1 }, (_, i) => i),
      headersY: ['dp[i]'],
      cells: [[...dp]],
      activeCell: [0, 1]
    },
    dryRunRow: { Step: 2, i: '0, 1', 'dp[i]': '0, 1', Action: 'Base cases seeded' }
  });

  // Tabulation
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] as number) + (dp[i - 2] as number);

    steps.push({
      stepNumber: step++,
      title: `Compute dp[${i}] = dp[${i - 1}] (${dp[i - 1]}) + dp[${i - 2}] (${dp[i - 2]}) = ${dp[i]}`,
      explanation: `State transition applied: dp[${i}] looks up previous two table cells directly in O(1) time. Value is ${dp[i]}.`,
      beginnerNote: 'Notice how we never recompute fib(2) or fib(3) multiple times. It is looked up instantly from the table.',
      javaLineHighlight: [11],
      variables: { i, 'dp[i-1]': dp[i - 1], 'dp[i-2]': dp[i - 2], 'dp[i]': dp[i] },
      actionType: 'insert',
      dpTable: {
        headersX: Array.from({ length: n + 1 }, (_, k) => k),
        headersY: ['dp[i]'],
        cells: [[...dp]],
        activeCell: [0, i],
        dependentCells: [[0, i - 1], [0, i - 2]],
        formula: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i]}`
      },
      dryRunRow: { Step: step - 1, i, 'dp[i]': dp[i]!, Action: `dp[${i-1}] + dp[${i-2}] = ${dp[i]}` }
    });
  }

  steps.push({
    stepNumber: step,
    title: `Dynamic Programming Complete: Fib(${n}) = ${dp[n]}`,
    explanation: `Final answer retrieved from target cell dp[${n}] = ${dp[n]} in O(N) total time.`,
    beginnerNote: 'Bonus insight: Since dp[i] only depends on the previous two values, space can be further optimized from O(N) to O(1) using just two variables (prev1, prev2)!',
    javaLineHighlight: [14],
    variables: { result: dp[n], timeComplexity: 'O(N)', spaceComplexity: 'O(N) -> O(1)' },
    actionType: 'found',
    dpTable: {
      headersX: Array.from({ length: n + 1 }, (_, k) => k),
      headersY: ['dp[i]'],
      cells: [[...dp]],
      activeCell: [0, n]
    },
    dryRunRow: { Step: step, i: n, 'dp[i]': dp[n]!, Action: `Retrieved final answer ${dp[n]}` }
  });

  return steps;
}
