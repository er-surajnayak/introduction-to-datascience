import { LessonContent } from '@/types/lesson';

export const topic1_4: LessonContent = {
  id: 'm1-t4',
  topicNumber: '1.4',
  slug: 'control-structures',
  moduleId: 'module-1',
  title: 'Control Structures',
  subtitle: 'Branching Decisions, Iterators, and the Foundation of Data Pipeline Logic',
  estimatedMinutes: 30,
  difficulty: 'Beginner',
  tags: ['Conditionals', 'Loops', 'Branching', 'Break & Continue', 'Control Flow'],
  objectives: [
    'Understand what control flow means and how programs decide what to execute, skip, repeat, or terminate.',
    'Master Boolean comparison operators (==, !=, >, <, >=, <=) and logical operators (and, or, not).',
    'Write conditional branching structures with if, if/else, and if/elif/else.',
    'Traverse datasets using for loops and generate numerical sequences with range(start, stop, step).',
    'Implement condition-driven while loops and avoid infinite loop traps.',
    'Control iteration execution with break (immediate exit) and continue (skip iteration).',
    'Understand why control structures are the foundation for data filtering, cleaning, and validation before NumPy vectorization.',
  ],
  hook: {
    title: 'The Attendance Gatekeeper',
    story:
      'Imagine you are designing an automated exam eligibility system for 5,000 engineering students:\n\nIf attendance is 75% or higher:\n-> "Eligible for Midterm Exam"\nOtherwise:\n-> "Attendance Shortage: Ineligible"\n\nWhen attendance is 82%:\n82 >= 75 -> True -> "Eligible"\n\nWhen attendance is 68%:\n68 >= 75 -> False -> "Not Eligible"\n\nPython code normally executes strictly from top to bottom. Control structures are the railway switches and traffic signals that allow your program to make intelligent decisions, skip irrelevant paths, and repeat actions millions of times.',
    analogy:
      'Think of control structures as GPS navigation: when the road is clear, you drive straight; when there is a detour (if condition), you turn; when circling a roundabout (loop), you repeat until your exit arrives (break).',
    realWorldImpact:
      'In real-world data science, control structures power automated data filtering, outlier detection, row-by-row data cleaning, and validation checks before datasets are loaded into machine learning algorithms.',
  },
  coreConcept: {
    headline: 'Steering the Computational Execution Journey',
    explanation:
      'Control flow refers to the order in which individual statements, instructions, or function calls are executed or evaluated in a Python program.',
    keyPillars: [
      {
        title: 'Decision Making (if / elif / else)',
        description:
          'Evaluates Boolean expressions sequentially from top to bottom. As soon as a branch condition evaluates to True, its indented block executes and all remaining elif/else branches are bypassed.',
      },
      {
        title: 'Iterative Traversal (for & while)',
        description:
          'for loops iterate through items in a sequence or generator (e.g. range()). while loops repeat a block of code as long as a Boolean condition remains True.',
      },
      {
        title: 'Loop Interruption (break & continue)',
        description:
          'break terminates the entire loop immediately. continue skips the rest of the current iteration and jumps directly to the next item.',
      },
      {
        title: 'Indentation Defines Block Scope',
        description:
          'Python uses 4-space indentation to determine which statements belong inside a conditional branch or loop body. Misaligned indentation causes an IndentationError.',
      },
    ],
  },
  interactiveType: 'execution-flow',
  technicalExplanation: {
    title: 'Short-Circuiting, Range Arithmetic & Data Science Bridges',
    deepDive:
      'Python evaluates compound logical expressions using short-circuit evaluation: in `A and B`, if A is False, B is never checked; in `A or B`, if A is True, B is skipped. Furthermore, range(start, stop, step) generates integers lazily in $O(1)$ memory without creating the whole list in RAM upfront.',
    bulletPoints: [
      'Comparison vs Assignment: "=" binds names to objects; "==" tests value equality.',
      'range(start, stop, step): Generates integers up to, but EXCLUDING, the stop value (e.g. range(0, 5) -> 0, 1, 2, 3, 4).',
      'Short-circuit logic: Saves CPU time and prevents crashes (e.g. `if total > 0 and (sum / total) > 0.5:` avoids division by zero).',
      'Bridge to Data Science: Row-by-row Python loops are flexible for complex logic; later, NumPy and Pandas vectorize these operations for 50x faster execution.',
    ],
  },
  codeExamples: [
    {
      title: 'Conditional Branching, Filtering & Loop Control in Practice',
      description:
        'Explore how if/elif/else, for loops, break, and continue work together to process student test records.',
      language: 'python',
      code: `# Raw exam marks dataset (with a dirty corrupted score -1)
student_marks = [78, 85, 32, 91, 64, -1, 88]

# ==========================================================
# 1. Decision Making: Categorizing a Single Score
# ==========================================================
score = 82
if score >= 90:
    grade = "A+"
elif score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
else:
    grade = "C"

print(f"Score {score} received Grade: {grade}")

# ==========================================================
# 2. Data Cleaning Loop with 'continue' and 'break'
# ==========================================================
passing_scores = []
passing_count = 0

for mark in student_marks:
    # Anomaly Sentinel: Stop pipeline if corrupted data (-1) appears
    if mark < 0:
        print(f"ALERT: Corrupted record {mark} encountered! Aborting loop.")
        break
    
    # Filter: Skip failing marks (< 40) using 'continue'
    if mark < 40:
        print(f"Skipping failing mark: {mark}")
        continue
    
    # Process valid passing student
    passing_scores.append(mark)
    passing_count += 1

print("Filtered passing scores:", passing_scores)
print(f"Total passing students: {passing_count}")`,
      lineExplanations: [
        { line: 8, text: 'if/elif/else tests conditions in order; 82 >= 80 triggers Grade A.' },
        { line: 25, text: 'break immediately terminates the loop when the corrupted score -1 is reached.' },
        { line: 30, text: 'continue skips the failing score (32) and jumps to the next score (91).' },
        { line: 35, text: 'Only valid passing scores (78, 85, 91, 64) are appended before the break.' },
      ],
      output: 'Score 82 received Grade: A\nSkipping failing mark: 32\nALERT: Corrupted record -1 encountered! Aborting loop.\nFiltered passing scores: [78, 85, 91, 64]\nTotal passing students: 4',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Using assignment "=" instead of equality comparison "==" in conditions (e.g. if marks = 75:)',
      why: '"=" is used to bind variable names to objects. In Python 3, using "=" inside an if condition raises a SyntaxError: invalid syntax.',
      correction: 'Use "==" to test equality: if marks == 75:.',
    },
    {
      mistake: 'Forgetting the mandatory trailing colon ":" after if, elif, else, for, or while headers',
      why: 'Python\'s parser requires a colon to denote the start of an indented block. Omitting it causes an immediate SyntaxError: expected \':\'.',
      correction: 'Always terminate control structure statements with a colon.',
    },
    {
      mistake: 'Assuming range(5) or range(1, 5) includes the stop number 5',
      why: 'Python ranges follow 0-indexed half-open intervals [start, stop). range(5) produces 0, 1, 2, 3, 4 (5 numbers total, stopping before 5).',
      correction: 'To include 5, set the stop boundary to 6: range(1, 6).',
    },
    {
      mistake: 'Creating an infinite while loop by forgetting to update the loop counter variable',
      why: 'If the condition `while count <= 5:` never becomes False because `count += 1` was omitted, the loop runs forever, freezing your program and consuming 100% CPU.',
      correction: 'Always ensure the loop body updates the condition variables toward the termination state.',
    },
    {
      mistake: 'Confusing break and continue',
      why: '"break" terminates the ENTIRE loop permanently, skipping all remaining iterations. "continue" only skips the CURRENT iteration and proceeds to the next item.',
      correction: 'Use break for emergency exits / early termination; use continue for row filtering.',
    },
    {
      mistake: 'Inconsistent indentation (mixing tabs and spaces or varying indent depths)',
      why: 'Python requires consistent 4-space indentation for blocks. Mixing tabs and spaces raises an IndentationError or TabError.',
      correction: 'Standardize on 4 spaces per indentation level.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'Should I use a "for" loop or a "while" loop for my data processing task?',
      context: 'Designing data ingestion, batch processing, or optimization routines.',
      reasoning:
        'Use `for` loops when you are iterating over a known collection (a list of records, rows in a CSV, range of indices). Use `while` loops when you must repeat an action until a dynamic condition is met (e.g. reading until an API stream closes, or iterating until gradient descent converges).',
      ruleOfThumb: 'Finite known data = for loop; dynamic convergence or stream listening = while loop.',
    },
    {
      question: 'When should I use if/elif/else vs separate independent if statements?',
      context: 'Evaluating mutually exclusive categories vs independent validation checks.',
      reasoning:
        'Use `if / elif / else` when the options are mutually exclusive (a score can only be one Grade: A, B, or C). Use independent `if` statements when multiple conditions can simultaneously apply (e.g. `if is_raining:` and `if is_weekend:`).',
      ruleOfThumb: 'Mutually exclusive paths = if/elif/else chain; independent concurrent checks = multiple separate if blocks.',
    },
  ],
  quiz: [
    {
      id: 'q1-4-1',
      question: 'What will be printed by the following Python code?\n\nx = 15\nif x > 20:\n    print("High")\nelif x > 10:\n    print("Medium")\nelse:\n    print("Low")',
      options: [
        '"High"',
        '"Medium"',
        '"Low"',
        'Nothing is printed',
      ],
      correctIndex: 1,
      explanation: 'Python evaluates from top to bottom. `x > 20` is False (15 > 20 is False). Next, `x > 10` is True (15 > 10 is True), so "Medium" is printed and the else branch is skipped.',
    },
    {
      id: 'q1-4-2',
      question: 'What sequence of integers is generated by `list(range(2, 8, 2))` in Python?',
      options: [
        '`[2, 4, 6, 8]`',
        '`[2, 4, 6]`',
        '`[2, 3, 4, 5, 6, 7, 8]`',
        '`[4, 6, 8]`',
      ],
      correctIndex: 1,
      explanation: '`range(start, stop, step)` starts at 2, steps by 2, and stops BEFORE 8. The numbers produced are 2, 4, and 6.',
    },
    {
      id: 'q1-4-3',
      question: 'What is the primary difference between the `break` and `continue` statements in Python loops?',
      options: [
        '`break` pauses execution for 5 seconds; `continue` resumes execution',
        '`break` terminates the entire loop immediately; `continue` skips only the rest of the current iteration',
        '`continue` terminates the entire loop; `break` restarts from index 0',
        'Both statements perform the exact same function',
      ],
      correctIndex: 1,
      explanation: '`break` exits the loop entirely. `continue` skips the remaining lines of the current iteration and jumps to the next item.',
    },
    {
      id: 'q1-4-4',
      question: 'What will be the final value of `count` after executing:\n\nmarks = [45, 82, 35, 91, 67]\ncount = 0\nfor mark in marks:\n    if mark >= 50:\n        count += 1',
      options: [
        '`2`',
        '`3`',
        '`4`',
        '`5`',
      ],
      correctIndex: 1,
      explanation: 'The loop checks each score: 45 (False), 82 (True -> count=1), 35 (False), 91 (True -> count=2), 67 (True -> count=3). The final count is 3.',
    },
    {
      id: 'q1-4-5',
      question: 'Why does the following loop run indefinitely (infinite loop)?\n\nx = 1\nwhile x <= 5:\n    print(x)',
      options: [
        'Because `x <= 5` is mathematically invalid',
        'Because `print(x)` causes a syntax error in while loops',
        'Because `x` is never incremented inside the loop, so `x <= 5` remains True forever',
        'Because while loops can only run 1 time',
      ],
      correctIndex: 2,
      explanation: 'Since `x` is initialized to 1 and never incremented (`x += 1`), the condition `1 <= 5` is always True, creating an infinite loop.',
    },
    {
      id: 'q1-4-6',
      question: 'How does Python determine which code block belongs inside an `if` statement or `for` loop?',
      options: [
        'Using curly braces `{ }` like in C and Java',
        'Using `begin` and `end` keywords',
        'Using consistent 4-space indentation following a colon `:`',
        'Using semicolons `;` at the end of each line',
      ],
      correctIndex: 2,
      explanation: 'Python uses whitespace indentation to define code blocks and scope, requiring no curly braces.',
    },
    {
      id: 'q1-4-7',
      question: 'What is the output of the logical expression `True and not False` in Python?',
      options: [
        '`True`',
        '`False`',
        '`None`',
        '`TypeError`',
      ],
      correctIndex: 0,
      explanation: '`not False` evaluates to `True`. Then `True and True` evaluates to `True`.',
    },
    {
      id: 'q1-4-8',
      question: 'What will happen when executing the following code?\n\nnumbers = [10, 20, 30, 40]\nfor num in numbers:\n    if num == 30:\n        break\n    print(num, end=" ")',
      options: [
        '`10 20 30 40`',
        '`10 20`',
        '`10 20 40`',
        '`30 40`',
      ],
      correctIndex: 1,
      explanation: '10 is printed, 20 is printed. When num reaches 30, `break` terminates the loop immediately, so 30 and 40 are never printed.',
    },
    {
      id: 'q1-4-9',
      question: 'What will happen when executing the following code?\n\nnumbers = [10, 20, 30, 40]\nfor num in numbers:\n    if num == 30:\n        continue\n    print(num, end=" ")',
      options: [
        '`10 20 30 40`',
        '`10 20`',
        '`10 20 40`',
        '`30 40`',
      ],
      correctIndex: 2,
      explanation: '10 is printed, 20 is printed. When num equals 30, `continue` skips the print statement. The loop continues to 40, which is printed. Output: `10 20 40`.',
    },
    {
      id: 'q1-4-10',
      question: 'How do Python control structures relate to Data Science libraries like NumPy and Pandas?',
      options: [
        'Data Science never uses conditions or loops under any circumstances',
        'Control structures define the algorithmic logic (filtering, routing, counting), which NumPy and Pandas later optimize using C-level vectorized operations',
        'NumPy replaces all Python code with HTML tables',
        'Pandas only runs inside while loops',
      ],
      correctIndex: 1,
      explanation: 'Understanding control structures provides the mental model for data filtering and transformations. Libraries like NumPy and Pandas execute this exact logic in compiled C for massive speedups.',
    },
  ],
  summary: {
    takeaways: [
      'Control flow allows programs to make decisions (if/elif/else), repeat actions (for/while), skip iterations (continue), and terminate early (break).',
      'Comparison operators (==, !=, >, <, >=, <=) evaluate to Boolean True or False.',
      'if/elif/else chains evaluate top-to-bottom and execute only the first matching branch.',
      'range(start, stop, step) generates integer sequences up to, but excluding, the stop boundary.',
      'Always ensure while loops have an updating state to prevent infinite loops.',
      'Control flow logic forms the mental foundation for data filtering and preprocessing before vectorization.',
    ],
    nextUpText: 'Topic 1.5: Functions & Modularity — Writing Reusable Code',
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
