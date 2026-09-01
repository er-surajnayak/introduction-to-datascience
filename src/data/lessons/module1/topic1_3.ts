import { LessonContent } from '@/types/lesson';

export const topic1_3: LessonContent = {
  id: 'm1-t3',
  topicNumber: '1.3',
  slug: 'python-refresher-variables',
  moduleId: 'module-1',
  title: 'Python Refresher: Variables',
  subtitle: 'Memory References, Dynamic Binding & Mutability in Data Pipelines',
  estimatedMinutes: 30,
  difficulty: 'Beginner',
  tags: ['Python', 'Memory Pointers', 'Mutability', 'Data Types'],
  objectives: [
    'Understand how Python variables function as reference tags rather than fixed memory buckets.',
    'Master the critical difference between value equality (`==`) and identity reference (`is`).',
    'Categorize Python types into Mutable (lists, dicts, arrays) vs Immutable (ints, floats, strings, tuples).',
    'Avoid insidious bug-traps when passing mutable datasets through preprocessing functions.',
  ],
  hook: {
    title: 'The Sticky Note on the Whiteboard Analogy',
    story:
      'In C or Java, a variable is like a labeled metal box. When you declare `int a = 5;`, the computer creates a 4-byte box and places 5 inside. If you do `int b = a;`, a second box is created with a copy of 5. In Python, variables are sticky notes! When you write `a = [1, 2, 3]`, Python creates a list object floating on the memory heap and slaps the sticky note `a` onto it. When you write `b = a`, you did not clone the list—you just slapped a second sticky note `b` onto the exact same physical list in memory!',
    analogy:
      'Imagine modifying a shared Google Doc versus emailing an attachment. In Python, assignment of mutable objects shares the same live Google Doc.',
    realWorldImpact:
      'In data science, accidental shared references can silently corrupt your training dataset during preprocessing, invalidating months of research.',
  },
  coreConcept: {
    headline: 'Python Variables Are Name Bindings (Pointers)',
    explanation:
      'Every variable in Python points to an object in heap memory. The object holds the type, reference count, and value. The variable name is simply an entry in the local namespace mapping to a memory address.',
    keyPillars: [
      {
        title: 'Identity vs Equality',
        description: '`a == b` checks if the contents are equal. `a is b` checks if they point to the identical memory address (`id(a) == id(b)`).',
      },
      {
        title: 'Immutable Types',
        description: 'Integers, Floats, Strings, Booleans, Tuples cannot be modified in place. Any "change" creates a brand new object in memory.',
      },
      {
        title: 'Mutable Types',
        description: 'Lists, Dictionaries, Sets, NumPy Arrays, and Pandas DataFrames can be modified in place, altering all names referencing them.',
      },
    ],
  },
  interactiveType: 'variable-memory',
  technicalExplanation: {
    title: 'Memory Overhead & The Python Object Model',
    deepDive:
      'In C, a 64-bit integer takes exactly 8 bytes of RAM. In CPython, a simple integer `x = 42` is a `PyObject` structure containing: 8 bytes for reference count (`ob_refcnt`), 8 bytes for type pointer (`ob_type`), and 8 bytes for integer digits (`ob_digit`) = 28 bytes! Understanding this explains why standard Python lists are memory-heavy and why NumPy is mandatory for data science.',
    bulletPoints: [
      'Every Python object has a unique integer ID retrieved with `id(obj)` representing its physical memory address.',
      'Small integers (-5 to 256) and short strings are interned by Python for performance.',
      'Pass-by-assignment: Python passes object references to functions, not copies.',
      'To make an independent clone of a dataset, explicitly use `.copy()` or `copy.deepcopy()`.',
    ],
  },
  codeExamples: [
    {
      title: 'The Dangerous Shared Reference Trap in Data Science',
      description: 'See why modifying a subset without copying modifies your entire original dataset.',
      language: 'python',
      code: `# --- TRAP: Aliasing (Shared Memory Reference) ---
raw_features = [10.5, 20.0, 30.5, 40.0]
normalized_features = raw_features  # ONLY COPIES THE STICKY NOTE!

# Modifying normalized_features modifies raw_features!
for i in range(len(normalized_features)):
    normalized_features[i] = normalized_features[i] / 10.0

print("Raw features:", raw_features)
# Output: [1.05, 2.0, 3.05, 4.0] -> YOUR RAW DATA IS DESTROYED!

# --- SOLUTION: Explicit Copy ---
clean_raw = [10.5, 20.0, 30.5, 40.0]
safe_normalized = clean_raw.copy()  # Allocates new memory buffer!
for i in range(len(safe_normalized)):
    safe_normalized[i] = safe_normalized[i] / 10.0

print("Preserved clean raw:", clean_raw)
print("Safely normalized:", safe_normalized)`,
      lineExplanations: [
        { line: 3, text: 'normalized_features references the exact same list address in RAM.' },
        { line: 7, text: 'In-place mutation mutates the underlying heap object.' },
        { line: 14, text: '.copy() allocates a fresh independent memory block.' },
      ],
      output: 'Preserved clean raw: [10.5, 20.0, 30.5, 40.0]\nSafely normalized: [1.05, 2.0, 3.05, 4.0]',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Using `is` instead of `==` for numerical comparisons',
      why: '`a == 1000` checks if mathematical value equals 1000. `a is 1000` checks if variable `a` points to the exact same memory address. In Python 3.8+, using `is` with literals raises a SyntaxWarning.',
      correction: 'Always use `==` for values, and reserve `is` exclusively for checking singletons like `if x is None:`.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'When writing a data transformation function, should I mutate inputs or return new objects?',
      context: 'Designing reusable feature engineering functions.',
      reasoning: 'In production data science pipelines, pure functions that do not produce side-effects (immutability principle) prevent catastrophic data leakage and make parallel execution trivial.',
      ruleOfThumb: 'Treat raw input datasets as read-only. Always return a fresh transformed DataFrame or NumPy array.',
    },
  ],
  quiz: [
    {
      id: 'q1-3-1',
      question: 'What will be printed by the following Python code?\n\nx = [10, 20]\ny = x\ny.append(30)\nprint(len(x))',
      options: ['2', '3', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'Since `y = x` copies the reference to the list, `y.append(30)` mutates the shared list in place. Therefore, `len(x)` is also 3.',
    },
    {
      id: 'q1-3-2',
      question: 'Which of the following Python data types is IMMUTABLE?',
      options: ['List `[1, 2, 3]`', 'Dictionary `{"a": 1}`', 'Tuple `(10, 20)`', 'Set `{1, 2, 3}`'],
      correctIndex: 2,
      explanation: 'Tuples, strings, integers, and floats are immutable in Python. Once allocated in memory, their contents cannot be altered.',
    },
  ],
  summary: {
    takeaways: [
      'Python variables are name tags referencing objects on the heap, not fixed storage boxes.',
      '`==` tests value equality; `is` tests memory address identity (`id(a) == id(b)`).',
      'Mutable types (lists, dicts, DataFrames) mutate in place; always use `.copy()` when branching data pipelines.',
    ],
    nextUpText: 'Topic 1.4: Control Structures & Execution Flow',
  },
  prevTopic: {
    slug: 'roles-and-tools-in-data-science',
    title: 'Roles and Tools in Data Science',
  },
  nextTopic: {
    slug: 'control-structures',
    title: 'Control Structures',
  },
};
