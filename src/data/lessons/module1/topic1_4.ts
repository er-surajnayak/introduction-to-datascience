import { LessonContent } from '@/types/lesson';

export const topic1_4: LessonContent = {
  id: 'm1-t4',
  topicNumber: '1.4',
  slug: 'control-structures',
  moduleId: 'module-1',
  title: 'Control Structures',
  subtitle: 'Branching Logic, Iterators, Comprehensions & Algorithmic Complexity',
  estimatedMinutes: 35,
  difficulty: 'Beginner',
  tags: ['Conditionals', 'Loops', 'Comprehensions', 'Complexity'],
  objectives: [
    'Master boolean short-circuit evaluation and conditional branching (`if`, `elif`, `else`).',
    'Write clean, idiomatic Python loops using `enumerate()`, `zip()`, and `range()`.',
    'Harness List Comprehensions for readable, C-optimized data filtering and transformations.',
    'Understand time complexity implications: why nested Python loops bottleneck data pipelines and when to vectorize.',
  ],
  hook: {
    title: 'The Airport Security Baggage Scanner',
    story:
      'Imagine an airport security scanner inspecting 10,000 bags per hour. A conditional check `if bag_weight > 23kg` routes heavy luggage to a penalty fee line. An iteration loop checks every item inside the bag. If a prohibited item is detected, a `break` immediately halts the conveyor belt. Writing efficient control structures is how we automate high-throughput data pipelines without stalling the CPU.',
    analogy:
      'Control flow is the railway switches and traffic signals of your program. Without signals, trains collide; with optimized switches, millions of passengers travel smoothly.',
    realWorldImpact:
      'In feature engineering, replacing clunky multi-line loop mutations with vectorized list comprehensions can speed up dataset generation by 30-50x.',
  },
  coreConcept: {
    headline: 'Steering the Computational Execution Flow',
    explanation:
      'Control structures dictate the order in which individual statements are evaluated based on runtime conditions, truthiness, and collection traversal.',
    keyPillars: [
      {
        title: 'Branching (Conditionals)',
        description: '`if / elif / else` execute exclusive code blocks based on truth values. Python short-circuits `and` / `or` for speed.',
      },
      {
        title: 'Iteration (For & While)',
        description: '`for item in iterable:` traverses sequences cleanly without fragile manual index counters.',
      },
      {
        title: 'Comprehensions (Pythonic Transformation)',
        description: '`[f(x) for x in data if condition]` combines filtering and mapping into a concise, C-optimized bytecode expression.',
      },
    ],
  },
  interactiveType: 'execution-flow',
  technicalExplanation: {
    title: 'Short-Circuiting, Truthiness & Time Complexity',
    deepDive:
      'Python evaluates boolean expressions left-to-right. In `A and B`, if A is False, Python never evaluates B. In `A or B`, if A is True, B is skipped. Furthermore, nested loops create $O(n^2)$ time complexity. On a 100,000-row dataset, $O(n^2)$ requires 10,000,000,000 operations, freezing your machine.',
    bulletPoints: [
      'Falsy values in Python: `0`, `0.0`, `""`, `[]`, `{}`, `None`, and `False`. Everything else is Truthy.',
      '`enumerate(iterable)` returns index and item pairs cleanly: `for idx, val in enumerate(sensor_data):`.',
      '`zip(list_a, list_b)` traverses multiple parallel sequences simultaneously.',
      'Always prefer vectorization or linear $O(n)$ comprehensions over quadratic $O(n^2)$ nested loops.',
    ],
  },
  codeExamples: [
    {
      title: 'Pythonic Loop Techniques for Data Scientists',
      description: 'Contrast rookie index-based loops with professional idiomatic comprehensions.',
      language: 'python',
      code: `# Raw sensor temperature readings in Fahrenheit
f_temps = [68.0, 72.5, 95.0, 104.2, 32.0, -10.0]

# --- 1. Traditional Rookie Loop (Slow & Verbose) ---
c_temps_loop = []
for temp in f_temps:
    if temp >= 32.0:  # Ignore sub-zero anomalous readings
        celsius = (temp - 32.0) * (5.0 / 9.0)
        c_temps_loop.append(round(celsius, 2))

# --- 2. Professional List Comprehension (Fast, Clean, C-bytecode) ---
c_temps = [round((t - 32.0) * (5.0 / 9.0), 2) for t in f_temps if t >= 32.0]

# --- 3. Parallel Traversal with zip() ---
timestamps = ["08:00", "09:00", "10:00", "11:00", "12:00"]
for time, temp in zip(timestamps, c_temps):
    print(f"[{time}] Validated Reading: {temp}°C")`,
      lineExplanations: [
        { line: 12, text: 'List comprehension handles mapping and filtering in a single readable line.' },
        { line: 16, text: 'zip() pairs corresponding elements without error-prone array indexing.' },
      ],
      output: '[08:00] Validated Reading: 20.0°C\n[09:00] Validated Reading: 22.5°C\n[10:00] Validated Reading: 35.0°C\n[11:00] Validated Reading: 40.11°C\n[12:00] Validated Reading: 0.0°C',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Modifying a list while actively iterating over it',
      why: '`for item in my_list: if item < 0: my_list.remove(item)` alters the list length dynamically, causing Python’s internal iterator index to skip elements.',
      correction: 'Use a list comprehension to build a filtered list, or iterate over a shallow copy: `for item in my_list.copy():`.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'Should I write a while loop or a for loop?',
      context: 'Designing data ingestion and streaming batch processors.',
      reasoning: 'Use `for` loops when iterating over known collections, fixed ranges, or files. Use `while` loops only when waiting for an external event or condition (e.g. streaming API polling, convergence threshold in optimization algorithms).',
      ruleOfThumb: 'Finite known data = for loop; dynamic convergence or stream listening = while loop.',
    },
  ],
  quiz: [
    {
      id: 'q1-4-1',
      question: 'What is the value of `result` after executing:\n\n`result = [x * 2 for x in [1, 2, 3, 4] if x % 2 == 0]`?',
      options: ['[2, 4, 6, 8]', '[4, 8]', '[2, 6]', '[4, 16]'],
      correctIndex: 1,
      explanation: 'The filter `if x % 2 == 0` keeps only even numbers (`2` and `4`). The map `x * 2` doubles them to produce `[4, 8]`.',
    },
    {
      id: 'q1-4-2',
      question: 'Which built-in Python function allows you to loop through a list and receive both the index and the value simultaneously?',
      options: ['`range()`', '`enumerate()`', '`zip()`', '`map()`'],
      correctIndex: 1,
      explanation: '`enumerate(iterable)` yields `(index, item)` tuples, eliminating the need for manual counter variables.',
    },
  ],
  summary: {
    takeaways: [
      'Use `if / elif / else` with short-circuit evaluation for clear conditional routing.',
      'Prefer `for item in iterable:` and `enumerate()` over manual C-style indexing.',
      'List comprehensions offer faster execution and cleaner code for mapping and filtering.',
    ],
    nextUpText: 'Topic 1.5: Functions & Modularity',
  },
  prevTopic: {
    slug: 'python-refresher-variables',
    title: 'Python Refresher: Variables',
  },
  nextTopic: {
    slug: 'functions-and-modularity',
    title: 'Functions & Modularity',
  },
};
