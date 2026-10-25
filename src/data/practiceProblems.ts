export type PracticeCategory =
  | 'syntax'
  | 'output_prediction'
  | 'fill_in_code'
  | 'mcq'
  | 'algorithms'
  | 'debugging'
  | 'refactoring'
  | 'testing'
  | 'data_structures'
  | 'sql'
  | 'frontend'
  | 'backend_api'
  | 'oop'
  | 'async'
  | 'software_engineering'
  | 'ai_data'
  | 'devops'
  | 'defensive_security';

export type PracticeDifficulty =
  | 'Absolute Beginner'
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Challenge Mode';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description: string;
  isHidden?: boolean;
}

export interface PracticeProblem {
  id: string;
  slug: string;
  title: string;
  category: PracticeCategory;
  language: string;
  difficulty: PracticeDifficulty;
  prerequisites: string[];
  learningObjective: string;
  description: string;
  inputSpecification: string;
  outputSpecification: string;
  constraints: string[];
  starterCode: string;
  sampleInput?: string;
  sampleOutput?: string;
  visibleTests: TestCase[];
  hiddenTests?: TestCase[];
  hints: string[];
  explanation: string;
  referenceSolution: string;
  tags: string[];
  estimatedMinutes: number;
}

export const practiceCategoriesMeta: Array<{
  id: PracticeCategory;
  name: string;
  description: string;
  iconName: string;
  count: number;
}> = [
  { id: 'syntax', name: '1. Syntax Practice', description: 'Variables, loops, data types, print statements & basic language grammar', iconName: 'Terminal', count: 12 },
  { id: 'output_prediction', name: '2. Output Prediction', description: 'Trace execution flow and predict output of tricky code blocks', iconName: 'Eye', count: 8 },
  { id: 'fill_in_code', name: '3. Fill-in-the-Code', description: 'Complete missing expressions, helper functions, and logic blocks', iconName: 'Edit3', count: 10 },
  { id: 'mcq', name: '4. Multiple-Choice Questions', description: 'Core computer science, algorithmic tradeoffs, and language quirks', iconName: 'HelpCircle', count: 15 },
  { id: 'algorithms', name: '5. Algorithm Implementation', description: 'Two-pointer, sliding window, binary search, recursion & sorting', iconName: 'Cpu', count: 14 },
  { id: 'debugging', name: '6. Debugging Challenges', description: 'Fix off-by-one errors, null dereferences, and async race conditions', iconName: 'Bug', count: 12 },
  { id: 'refactoring', name: '7. Code Repair & Refactoring', description: 'Eliminate code smells, simplify conditionals, and improve readability', iconName: 'Sparkles', count: 8 },
  { id: 'testing', name: '8. Test-Writing Exercises', description: 'Write unit tests, edge-case assertions, and boundary checks', iconName: 'CheckCircle2', count: 8 },
  { id: 'data_structures', name: '9. Data Structures', description: 'Hash maps, stacks, queues, linked lists, and binary search trees', iconName: 'Layers', count: 10 },
  { id: 'sql', name: '10. SQL & Database Exercises', description: 'JOINs, aggregates, GROUP BY, subqueries, and table constraints', iconName: 'Database', count: 10 },
  { id: 'frontend', name: '11. Frontend Challenges', description: 'HTML layout, CSS Flexbox/Grid, form validation, and DOM rendering', iconName: 'Layout', count: 8 },
  { id: 'backend_api', name: '12. Backend & API Challenges', description: 'HTTP verbs, status codes, JSON validation, and REST routing', iconName: 'Server', count: 8 },
  { id: 'oop', name: '13. Object-Oriented Programming', description: 'Classes, encapsulation, inheritance, polymorphism & interfaces', iconName: 'Box', count: 8 },
  { id: 'async', name: '14. Asynchronous Programming', description: 'Promises, async/await, event loop, and concurrent tasks', iconName: 'Clock', count: 8 },
  { id: 'software_engineering', name: '15. Software Engineering', description: 'Git branch workflows, code reviews, stack trace analysis & logs', iconName: 'GitBranch', count: 8 },
  { id: 'ai_data', name: '16. AI & Data Programming', description: 'Data preprocessing, model prompt schemas, and API response parsing', iconName: 'Bot', count: 8 },
  { id: 'devops', name: '17. DevOps & Deployment', description: 'Environment variables, Dockerfiles, package configs, and health checks', iconName: 'Cloud', count: 6 },
  { id: 'defensive_security', name: '18. Defensive Security', description: 'Input sanitization, SQL injection defense, and password hashing', iconName: 'Shield', count: 8 }
];

export const practiceProblemsCatalog: PracticeProblem[] = [
  // 1. SYNTAX
  {
    id: 'prob-syntax-01',
    slug: 'python-print-formatted-string',
    title: 'Formatted Greeting String',
    category: 'syntax',
    language: 'python',
    difficulty: 'Absolute Beginner',
    prerequisites: ['Variables', 'Strings'],
    learningObjective: 'Master f-string interpolation and variable output formatting in Python.',
    description: 'Write a Python function `greet_student(name, course)` that returns a formatted string: `"Welcome to SkillNova, {name}! You are mastering {course}."`.',
    inputSpecification: 'Two string arguments: name (e.g. "Alex") and course (e.g. "Python").',
    outputSpecification: 'Return the exact formatted greeting string.',
    constraints: ['1 <= len(name) <= 50', '1 <= len(course) <= 50'],
    starterCode: `def greet_student(name: str, course: str) -> str:
    # Your code here
    pass
`,
    sampleInput: 'greet_student("Pavan", "AI Systems")',
    sampleOutput: '"Welcome to SkillNova, Pavan! You are mastering AI Systems."',
    visibleTests: [
      { id: 't1', input: 'greet_student("Pavan", "AI Systems")', expectedOutput: 'Welcome to SkillNova, Pavan! You are mastering AI Systems.', description: 'Basic greeting with standard name' },
      { id: 't2', input: 'greet_student("Sara", "TypeScript")', expectedOutput: 'Welcome to SkillNova, Sara! You are mastering TypeScript.', description: 'Alternative learner name' }
    ],
    hiddenTests: [
      { id: 'h1', input: 'greet_student("Ada Lovelace", "Computer Science")', expectedOutput: 'Welcome to SkillNova, Ada Lovelace! You are mastering Computer Science.', description: 'Multi-word strings', isHidden: true }
    ],
    hints: [
      'Use Python 3.6+ f-strings: f"Welcome to SkillNova, {name}! You are mastering {course}."',
      'Make sure punctuation and spacing match the requested format exactly.'
    ],
    explanation: 'f-strings in Python provide a clean, readable syntax for embedding expressions inside string literals using `{variable}` syntax.',
    referenceSolution: `def greet_student(name: str, course: str) -> str:
    return f"Welcome to SkillNova, {name}! You are mastering {course}."
`,
    tags: ['python', 'strings', 'f-string', 'basics'],
    estimatedMinutes: 5
  },

  // 2. OUTPUT PREDICTION
  {
    id: 'prob-pred-01',
    slug: 'js-event-loop-microtask-prediction',
    title: 'Event Loop Microtask Execution Order',
    category: 'output_prediction',
    language: 'javascript',
    difficulty: 'Intermediate',
    prerequisites: ['Promises', 'setTimeout', 'Call Stack'],
    learningObjective: 'Understand the prioritization between synchronous code, microtasks (Promise), and macrotasks (setTimeout).',
    description: `Predict the exact console output sequence of the following program:
\`\`\`javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
\`\`\`
Return an array of strings representing each line printed in order.`,
    inputSpecification: 'None (Self-contained program execution trace).',
    outputSpecification: 'Array of strings: ["1", "4", "3", "2"].',
    constraints: ['Must output valid sequence array'],
    starterCode: `function predictExecutionOrder(): string[] {
    // Return array of strings matching execution order
    return [];
}
`,
    visibleTests: [
      { id: 't1', input: 'predictExecutionOrder()', expectedOutput: '["1","4","3","2"]', description: 'Execution order of sync vs microtask vs macrotask' }
    ],
    hints: [
      'Synchronous statements run first from top to bottom ("1" then "4").',
      'The microtask queue (Promise.then) runs immediately after the current call stack clears, before macrotasks.',
      'The macrotask queue (setTimeout) executes on the next tick of the event loop.'
    ],
    explanation: 'The JavaScript runtime processes synchronous scripts first. Once the call stack is empty, it exhausts the entire microtask queue before picking the next macrotask from the timer queue.',
    referenceSolution: `function predictExecutionOrder(): string[] {
    return ["1", "4", "3", "2"];
}
`,
    tags: ['javascript', 'event-loop', 'promises', 'async'],
    estimatedMinutes: 8
  },

  // 3. FILL IN CODE
  {
    id: 'prob-fill-01',
    slug: 'python-list-comprehension-filter',
    title: 'Even Squares Filter & Map',
    category: 'fill_in_code',
    language: 'python',
    difficulty: 'Beginner',
    prerequisites: ['Lists', 'Modulo Operator'],
    learningObjective: 'Use Python list comprehension to filter even integers and square them concisely.',
    description: 'Complete the function `even_squares(numbers)` so that it returns a new list containing the squares of all even numbers in the input list.',
    inputSpecification: 'List of integers (e.g. [1, 2, 3, 4, 5, 6]).',
    outputSpecification: 'List of squared even integers (e.g. [4, 16, 36]).',
    constraints: ['0 <= len(numbers) <= 1000', '-100 <= numbers[i] <= 100'],
    starterCode: `def even_squares(numbers: list[int]) -> list[int]:
    # Fill in the list comprehension:
    return [__ for x in numbers if __]
`,
    visibleTests: [
      { id: 't1', input: 'even_squares([1, 2, 3, 4, 5, 6])', expectedOutput: '[4, 16, 36]', description: 'Filter and square even numbers' },
      { id: 't2', input: 'even_squares([1, 3, 5])', expectedOutput: '[]', description: 'List with only odd numbers' }
    ],
    hiddenTests: [
      { id: 'h1', input: 'even_squares([0, -2, 4])', expectedOutput: '[0, 4, 16]', description: 'Handles zero and negative even integers', isHidden: true }
    ],
    hints: [
      'To square a number in Python, use `x**2` or `x * x`.',
      'An integer is even if `x % 2 == 0`.'
    ],
    explanation: 'List comprehension syntax `[x**2 for x in numbers if x % 2 == 0]` provides an idiomatic and high-performance way to filter and transform lists in Python.',
    referenceSolution: `def even_squares(numbers: list[int]) -> list[int]:
    return [x**2 for x in numbers if x % 2 == 0]
`,
    tags: ['python', 'comprehensions', 'lists', 'math'],
    estimatedMinutes: 5
  },

  // 4. ALGORITHMS: TWO POINTERS
  {
    id: 'prob-algo-01',
    slug: 'two-sum-sorted-array',
    title: 'Two Sum in Sorted Array (Two Pointers)',
    category: 'algorithms',
    language: 'python',
    difficulty: 'Beginner',
    prerequisites: ['Arrays', 'While Loops'],
    learningObjective: 'Implement the two-pointer technique to find two elements summing to a target in O(n) time and O(1) space.',
    description: 'Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return the indices of the two numbers as a 1-indexed pair `[index1, index2]`.',
    inputSpecification: 'List of sorted integers `numbers` and integer `target`.',
    outputSpecification: 'List of two 1-based integer indices `[index1, index2]`.',
    constraints: ['2 <= len(numbers) <= 10^4', 'numbers is sorted in non-decreasing order', 'Exactly one valid solution exists'],
    starterCode: `def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    left = 0
    right = len(numbers) - 1
    # Implement two pointers:
    while left < right:
        pass
    return []
`,
    visibleTests: [
      { id: 't1', input: 'two_sum_sorted([2, 7, 11, 15], 9)', expectedOutput: '[1, 2]', description: 'Standard sorted array target 9' },
      { id: 't2', input: 'two_sum_sorted([2, 3, 4], 6)', expectedOutput: '[1, 3]', description: 'Target with outer elements' }
    ],
    hiddenTests: [
      { id: 'h1', input: 'two_sum_sorted([-1, 0], -1)', expectedOutput: '[1, 2]', description: 'Negative numbers in array', isHidden: true }
    ],
    hints: [
      'Compare `numbers[left] + numbers[right]` against `target`.',
      'If the sum is too large, decrement `right` to reduce the sum.',
      'If the sum is too small, increment `left` to increase the sum.'
    ],
    explanation: 'Because the array is already sorted, moving the right pointer inward guarantees a smaller sum, and moving the left pointer guarantees a larger sum. This avoids the O(n^2) nested loop.',
    referenceSolution: `def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []
`,
    tags: ['algorithms', 'two-pointers', 'arrays', 'binary-search'],
    estimatedMinutes: 10
  },

  // 5. DEBUGGING
  {
    id: 'prob-debug-01',
    slug: 'fix-off-by-one-binary-search',
    title: 'Fix Off-By-One Bug in Binary Search',
    category: 'debugging',
    language: 'javascript',
    difficulty: 'Intermediate',
    prerequisites: ['Binary Search', 'Conditionals'],
    learningObjective: 'Identify and repair off-by-one boundary bugs in binary search algorithms.',
    description: `The following binary search implementation has a critical off-by-one bug that causes it to miss elements or enter infinite loops.
Find and fix the bug so it correctly returns the 0-based index of \`target\`, or \`-1\` if not found.`,
    inputSpecification: 'Sorted array `nums` and integer `target`.',
    outputSpecification: 'Integer index or -1.',
    constraints: ['1 <= nums.length <= 10^4', 'nums sorted in ascending order'],
    starterCode: `function binarySearch(nums, target) {
    let low = 0;
    let high = nums.length; // BUG: Notice high boundary and while condition

    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            low = mid; // BUG
        } else {
            high = mid; // BUG
        }
    }
    return -1;
}
`,
    visibleTests: [
      { id: 't1', input: 'binarySearch([-1, 0, 3, 5, 9, 12], 9)', expectedOutput: '4', description: 'Find existing element in sorted list' },
      { id: 't2', input: 'binarySearch([-1, 0, 3, 5, 9, 12], 2)', expectedOutput: '-1', description: 'Return -1 when element does not exist' }
    ],
    hiddenTests: [
      { id: 'h1', input: 'binarySearch([5], 5)', expectedOutput: '0', description: 'Single element match', isHidden: true },
      { id: 'h2', input: 'binarySearch([2, 5], 5)', expectedOutput: '1', description: 'Rightmost element lookup', isHidden: true }
    ],
    hints: [
      'Standard inclusive binary search uses `high = nums.length - 1` and `while (low <= high)`.',
      'When `nums[mid] < target`, the target cannot be at `mid`, so update `low = mid + 1`.',
      'When `nums[mid] > target`, update `high = mid - 1`.'
    ],
    explanation: 'Updating pointers to `mid + 1` and `mid - 1` prevents infinite loops when `low` and `high` are adjacent, and guarantees that the search interval strictly shrinks each iteration.',
    referenceSolution: `function binarySearch(nums, target) {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}
`,
    tags: ['debugging', 'binary-search', 'algorithms'],
    estimatedMinutes: 12
  },

  // 6. SQL & DATABASES
  {
    id: 'prob-sql-01',
    slug: 'sql-top-spending-students',
    title: 'Top Course Enrollees with SQL Aggregation',
    category: 'sql',
    language: 'sql',
    difficulty: 'Beginner',
    prerequisites: ['SELECT', 'GROUP BY', 'HAVING', 'JOIN'],
    learningObjective: 'Write a query that groups enrollee records, calculates counts, and filters with HAVING.',
    description: `Given tables \`students (id, name, email)\` and \`enrollments (id, student_id, course_title, completed)\`:
Write a SQL query that retrieves each student's \`name\` and the total number of completed courses as \`completed_courses\`, for all students who have completed at least 2 courses.
Order the result by \`completed_courses\` in descending order.`,
    inputSpecification: 'Relational SQLite tables: students and enrollments.',
    outputSpecification: 'Columns: name, completed_courses.',
    constraints: ['Filter only completed = 1 or true', 'Only students with >= 2 completed courses'],
    starterCode: `-- Write your SQL query below:
SELECT s.name, COUNT(e.id) AS completed_courses
FROM students s
JOIN enrollments e ON s.id = e.student_id
-- Add your WHERE, GROUP BY, HAVING, and ORDER BY clauses:
`,
    visibleTests: [
      {
        id: 't1',
        input: 'SELECT s.name, COUNT(e.id) AS completed_courses FROM students s JOIN enrollments e ON s.id = e.student_id WHERE e.completed = 1 GROUP BY s.id, s.name HAVING COUNT(e.id) >= 2 ORDER BY completed_courses DESC',
        expectedOutput: '[{"name":"Pavan Manikanta","completed_courses":3},{"name":"Sara Chen","completed_courses":2}]',
        description: 'Verify aggregation and threshold filtering'
      }
    ],
    hints: [
      'Use `WHERE e.completed = 1` or `WHERE e.completed = true` to count only completed enrollments.',
      'Use `HAVING COUNT(e.id) >= 2` to filter grouped records (HAVING filters groups, WHERE filters rows).',
      'End with `ORDER BY completed_courses DESC`.'
    ],
    explanation: '`GROUP BY s.id, s.name` aggregates rows per student. The `HAVING` clause then filters aggregated results where `COUNT(e.id) >= 2`, which cannot be done in a WHERE clause.',
    referenceSolution: `SELECT s.name, COUNT(e.id) AS completed_courses
FROM students s
JOIN enrollments e ON s.id = e.student_id
WHERE e.completed = 1
GROUP BY s.id, s.name
HAVING COUNT(e.id) >= 2
ORDER BY completed_courses DESC;
`,
    tags: ['sql', 'aggregation', 'group-by', 'databases'],
    estimatedMinutes: 10
  },

  // 7. DEFENSIVE SECURITY
  {
    id: 'prob-sec-01',
    slug: 'defensive-sanitize-user-input',
    title: 'HTML & Script Sanitization for Defensive Security',
    category: 'defensive_security',
    language: 'typescript',
    difficulty: 'Intermediate',
    prerequisites: ['Regex', 'XSS Fundamentals', 'Security Principles'],
    learningObjective: 'Sanitize untrusted user-submitted text by escaping HTML entities to prevent Cross-Site Scripting (XSS).',
    description: 'Implement a function `sanitizeHtml(rawInput: string): string` that escapes dangerous characters (`&`, `<`, `>`, `"`, and `\'`) into safe HTML entities (`&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#x27;`).',
    inputSpecification: 'A raw string potentially containing unescaped HTML/script tags.',
    outputSpecification: 'A sanitized string with entities safely escaped.',
    constraints: ['0 <= rawInput.length <= 5000'],
    starterCode: `export function sanitizeHtml(rawInput: string): string {
    // Escape &, <, >, ", and '
    return rawInput;
}
`,
    visibleTests: [
      { id: 't1', input: 'sanitizeHtml("<script>alert(1)</script>")', expectedOutput: '&lt;script&gt;alert(1)&lt;/script&gt;', description: 'Sanitize script tags' },
      { id: 't2', input: 'sanitizeHtml("Hello & \\"Welcome\\"")', expectedOutput: 'Hello &amp; &quot;Welcome&quot;', description: 'Escape ampersand and quotes' }
    ],
    hiddenTests: [
      { id: 'h1', input: 'sanitizeHtml("<img src=x onerror=\\"stealCookies()\\">")', expectedOutput: '&lt;img src=x onerror=&quot;stealCookies()&quot;&gt;', description: 'Image onerror payload', isHidden: true }
    ],
    hints: [
      'Escape `&` FIRST so you do not double-escape entities created later!',
      'Use a dictionary mapping each special character to its safe entity counterpart: `{ "&": "&amp;", "<": "&lt;", ">": "&gt;", \'"\': "&quot;", "\'": "&#x27;" }`.'
    ],
    explanation: 'By replacing HTML delimiters with character entities, browsers render them as literal text instead of executing them as executable scripts or DOM nodes, eliminating reflected and stored XSS vectors.',
    referenceSolution: `export function sanitizeHtml(rawInput: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
    };
    return rawInput.replace(/[&<>"']/g, match => map[match]);
}
`,
    tags: ['security', 'xss', 'sanitization', 'typescript'],
    estimatedMinutes: 8
  },

  // 8. ASYNC PROGRAMMING
  {
    id: 'prob-async-01',
    slug: 'async-retry-with-backoff',
    title: 'Retry Async Operation with Exponential Backoff',
    category: 'async',
    language: 'typescript',
    difficulty: 'Advanced',
    prerequisites: ['Promises', 'Recursion / Loops', 'setTimeout'],
    learningObjective: 'Implement a resilient API fetch wrapper that retries failing requests with exponential delays.',
    description: `Implement an asynchronous helper \`retryAsync<T>(fn: () => Promise<T>, maxRetries: number, initialDelayMs: number): Promise<T>\`.
If \`fn()\` fails (rejects), wait for the delay before retrying. On each subsequent retry, double the delay.
If all retries fail, reject with the last caught error.`,
    inputSpecification: 'Async task function, max retry count, and initial delay.',
    outputSpecification: 'Resolved value of type T, or rejected error.',
    constraints: ['maxRetries >= 1', 'initialDelayMs >= 0'],
    starterCode: `export async function retryAsync<T>(
    fn: () => Promise<T>,
    maxRetries: number,
    initialDelayMs: number
): Promise<T> {
    // Implement exponential backoff retry:
    return fn();
}
`,
    visibleTests: [
      { id: 't1', input: 'retryAsync(() => Promise.resolve("Success"), 3, 10)', expectedOutput: '"Success"', description: 'Immediate success without retries' }
    ],
    hints: [
      'Use a `try...catch` block inside a loop from `0` to `maxRetries`.',
      'In the catch block, calculate `delay = initialDelayMs * Math.pow(2, attempt)`.',
      'Use `await new Promise(r => setTimeout(r, delay))` to wait before the next attempt.'
    ],
    explanation: 'Exponential backoff prevents swarming failing services (thundering herd problem) while giving transient network glitches or rate limits time to recover.',
    referenceSolution: `export async function retryAsync<T>(
    fn: () => Promise<T>,
    maxRetries: number,
    initialDelayMs: number
): Promise<T> {
    let lastError: any;
    let delay = initialDelayMs;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            if (attempt === maxRetries) break;
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
        }
    }
    throw lastError;
}
`,
    tags: ['async', 'typescript', 'promises', 'networking'],
    estimatedMinutes: 15
  }
];

export const practiceProblems = practiceProblemsCatalog;

export const practiceCategories = practiceCategoriesMeta.map(c => ({
  id: c.id,
  label: c.name,
  description: c.description
}));

export type DifficultyTier = 'beginner' | 'easy' | 'medium' | 'hard' | 'advanced' | string;


