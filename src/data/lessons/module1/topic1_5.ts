import { LessonContent } from '@/types/lesson';

export const topic1_5: LessonContent = {
  id: 'm1-t5',
  topicNumber: '1.5',
  slug: 'functions-and-modularity',
  moduleId: 'module-1',
  title: 'Functions & Modularity',
  subtitle: 'Packaging Reusable Computational Units & Engineering Modular Pipelines',
  estimatedMinutes: 30,
  difficulty: 'Beginner',
  tags: ['Functions', 'Modularity', 'Return Values', 'Parameters', 'Scope', 'Clean Code'],
  objectives: [
    'Understand why functions exist and how they eliminate repetitive, copy-pasted code.',
    'Master the anatomy of Python functions: definition (def), naming, parameter lists, colons, and indentation.',
    'Differentiate clearly between Parameters (placeholders in definitions) and Arguments (actual incoming values).',
    'Understand the fundamental difference between print() (terminal display) and return (passing computed values to callers).',
    'Write functions with multiple parameters, default parameter fallbacks, and keyword arguments.',
    'Understand local variable scope and namespace isolation inside function execution blocks.',
    'Compose multiple functions into automated data processing pipelines.',
    'Apply modular architecture principles to organize complex Data Science workflows into clean, testable units.',
  ],
  hook: {
    title: 'The College Canteen Recipe',
    story:
      'Imagine the head chef at a college canteen has a standard recipe for making masala dosa.\n\nEvery time a student orders a dosa, the cashier doesn\'t recite the 15-step batter fermentation and griddle temperature instructions from scratch. The recipe is defined ONCE in the kitchen. The cashier simply says: "Make 1 Masala Dosa, extra spicy."\n\nIn software engineering, a function works the exact same way:\n1. Define the logic once.\n2. Give it a meaningful name (e.g. calculate_average).\n3. Pass inputs (arguments).\n4. Return the computed result.\n\nWithout functions, you would copy-paste 15 lines of statistical formulas for every single student or dataset column, multiplying bugs across your codebase.',
    analogy:
      'A function is like a self-contained coffee machine: you insert coffee beans and water (inputs/arguments), it executes an internal brewing process (function body), and it pours a fresh cup of espresso (return value).',
    realWorldImpact:
      'In production Data Science and Machine Learning, modular functions form the backbone of ETL (Extract, Transform, Load) pipelines, feature engineering transformers, and automated cross-validation loops.',
  },
  coreConcept: {
    headline: 'Packaging Reusable Computational Units',
    explanation:
      'A function is an isolated, reusable block of code designed to perform a specific task. It can accept inputs (parameters), execute operations, and return a result to the caller.',
    keyPillars: [
      {
        title: 'Definition vs Call',
        description:
          'Defining a function (`def greet(name):`) registers the recipe with Python. It does nothing until it is explicitly called (`greet("Aisha")`).',
      },
      {
        title: 'Parameters vs Arguments',
        description:
          'Parameters are the variable placeholders listed in the function definition. Arguments are the concrete values passed into those slots during a call.',
      },
      {
        title: 'Return Value vs print()',
        description:
          'print() only outputs characters to the terminal screen and yields `None`. return sends the actual computational value back so other functions or variables can continue using it.',
      },
      {
        title: 'Modularity & Scope',
        description:
          'Variables created inside a function belong to its local scope and disappear when the function finishes, preventing accidental variable corruption across your program.',
      },
    ],
  },
  interactiveType: 'function-transformer',
  technicalExplanation: {
    title: 'Function Execution Flow, Scope & Modularity in Data Science',
    deepDive:
      'When Python invokes a function, it pushes a new Stack Frame containing the function\'s local variables. When the function reaches a `return` statement, the frame is popped and control resumes at the call site. Splitting large 500-line monolithic scripts into clean 10-line single-responsibility functions allows automated unit testing and easy vectorization.',
    bulletPoints: [
      'Positional vs Keyword Arguments: `calc(500, 3)` relies on order; `calc(quantity=3, price=500)` specifies parameter names explicitly.',
      'Default Parameters: `def greet(name, greeting="Hello"):` uses "Hello" automatically if no second argument is supplied.',
      'Local vs Global Scope: Variables assigned inside a function cannot be accessed from outside without an explicit return.',
      'Composition: Functions can pass their outputs directly as inputs to other functions: `final = add_tax(apply_discount(price))`.',
    ],
  },
  codeExamples: [
    {
      title: 'Building Reusable Statistical & Data Preprocessing Functions',
      description:
        'Explore how modular functions clean dirty input data, calculate metrics, and return structured results.',
      language: 'python',
      code: `# Raw unnormalized exam marks
student_scores = [78, 85, 92, 64, 88]

# ==========================================================
# 1. Modular Statistical Functions
# ==========================================================
def calculate_mean(values):
    """Calculates arithmetic mean of a numeric list."""
    if not values:
        return 0.0
    return sum(values) / len(values)

def calculate_grade(average):
    """Assigns academic grade based on average score."""
    if average >= 90:
        return "A+"
    elif average >= 80:
        return "A"
    elif average >= 70:
        return "B"
    else:
        return "C"

# ==========================================================
# 2. Composing Functions in a Data Pipeline
# ==========================================================
def summarize_student(name, scores, curve_bonus=2.0):
    """Preprocesses scores, applies bonus, and generates report."""
    # Apply optional curve bonus (default parameter)
    curved_scores = [s + curve_bonus for s in scores]
    
    # Compose reusable helper functions
    avg_score = calculate_mean(curved_scores)
    grade = calculate_grade(avg_score)
    
    return {
        "student": name,
        "raw_avg": round(calculate_mean(scores), 2),
        "curved_avg": round(avg_score, 2),
        "grade": grade
    }

# Execute function with positional and keyword arguments:
report = summarize_student("Aisha", student_scores, curve_bonus=3.0)
print(f"Student: {report['student']}")
print(f"Raw Avg: {report['raw_avg']} | Curved Avg: {report['curved_avg']}")
print(f"Final Grade: {report['grade']}")`,
      lineExplanations: [
        { line: 7, text: 'calculate_mean accepts any list of numbers and returns a numeric float.' },
        { line: 14, text: 'calculate_grade takes the mean and returns an academic string.' },
        { line: 26, text: 'curve_bonus has a default value of 2.0 if omitted by caller.' },
        { line: 31, text: 'summarize_student composes both helper functions into a modular dictionary output.' },
      ],
      output: 'Student: Aisha\nRaw Avg: 81.4 | Curved Avg: 84.4\nFinal Grade: A',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Defining a function but forgetting to call it (e.g. defining def greet(): print("Hello") and wondering why nothing happens)',
      why: '`def` only saves the instructions in memory. The body never executes until you explicitly call `greet()`.',
      correction: 'Always add a call statement: `greet()`.',
    },
    {
      mistake: 'Forgetting parentheses when calling a function (e.g. writing greet instead of greet())',
      why: 'Writing `greet` without parentheses refers to the function object itself rather than executing its code.',
      correction: 'Always append parentheses `()` to invoke the function: `greet()`.',
    },
    {
      mistake: 'Using print() inside a function when return is required',
      why: '`print()` outputs characters to the terminal and returns `None`. If you try `total = add(5, 3) * 2`, Python throws a `TypeError: unsupported operand type for *: NoneType and int`.',
      correction: 'Use `return a + b` so calling code can store and reuse the computed output.',
    },
    {
      mistake: 'Attempting to access a local variable outside its function',
      why: 'Variables initialized inside a function exist only during the function\'s execution frame (local scope).',
      correction: 'Return the variable from the function: `return score`, and assign it outside: `my_score = calculate()`.',
    },
    {
      mistake: 'Confusing Parameters and Arguments',
      why: 'Parameters are the variable names in the `def` line (`def add(x, y):`). Arguments are the concrete values passed during the call (`add(10, 20)`).',
      correction: 'Remember: Parameter = empty slot; Argument = value filling the slot.',
    },
    {
      mistake: 'Creating monolithic "do_everything()" functions with too many responsibilities',
      why: 'A 100-line function that downloads data, cleans rows, calculates math, and generates plots is hard to debug and impossible to test.',
      correction: 'Break monolithic tasks into small, single-responsibility functions (e.g. `load_data()`, `clean_data()`, `calculate_stats()`).',
    },
  ],
  thinkingStrategies: [
    {
      question: 'How do I decide whether a piece of code should become a function?',
      context: 'Structuring data analysis scripts and machine learning pipelines.',
      reasoning:
        'Ask yourself: 1) Am I repeating this logic in multiple places? 2) Does this transformation have a clear mathematical or logical responsibility? 3) Would giving it a descriptive name make the code more readable? If yes, wrap it into a function.',
      ruleOfThumb: 'If logic repeats > 1 time or exceeds 15 lines of isolated computation, extract it into a function.',
    },
    {
      question: 'Should a function use print() or return?',
      context: 'Designing data processing utilities and calculation helpers.',
      reasoning:
        'Calculation, transformation, and data cleaning functions should ALWAYS use `return`. CLI scripts or terminal logging utilities may use `print()`.',
      ruleOfThumb: 'Math & data transformations = return; terminal notifications = print().',
    },
  ],
  quiz: [
    {
      id: 'q1-5-1',
      question: 'What is the key difference between a function parameter and an argument in Python?',
      options: [
        'Parameters are used only in math; arguments are used only with text',
        'A parameter is the named variable in the function definition; an argument is the actual value passed during the function call',
        'Arguments are defined with def; parameters are defined with return',
        'There is no difference; the two words mean the exact same thing',
      ],
      correctIndex: 1,
      explanation: 'In `def greet(name):`, `name` is the parameter (placeholder). In `greet("Aisha")`, `"Aisha"` is the argument (actual data).',
    },
    {
      id: 'q1-5-2',
      question: 'What will happen when executing the following code?\n\ndef add(a, b):\n    print(a + b)\n\nresult = add(5, 3)\nprint(result * 2)',
      options: [
        '`16` is printed',
        '`8` is printed, then a `TypeError` occurs because `result` is `None`',
        '`8` is printed, followed by `16`',
        'Python refuses to compile the code',
      ],
      correctIndex: 1,
      explanation: 'The function `add` uses `print()` instead of `return`, so it implicitly returns `None`. Multiplying `None * 2` raises a TypeError: unsupported operand type for *: NoneType and int.',
    },
    {
      id: 'q1-5-3',
      question: 'What is the output of calling `greet("Rahul")` given:\n\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"',
      options: [
        '`"Hello, Rahul!"`',
        '`"None, Rahul!"`',
        '`TypeError: missing required argument: greeting`',
        '`"greeting, Rahul!"`',
      ],
      correctIndex: 0,
      explanation: 'Since no second argument was provided, Python falls back to the default parameter value `greeting="Hello"`, producing `"Hello, Rahul!"`.',
    },
    {
      id: 'q1-5-4',
      question: 'Given the function `def student(name, age, cgpa):`, which of the following is a valid keyword argument call?',
      options: [
        '`student("Aisha", 20, 8.7)`',
        '`student(cgpa=8.7, age=20, name="Aisha")`',
        '`student(8.7, "Aisha", 20)`',
        '`student[name="Aisha", age=20]`',
      ],
      correctIndex: 1,
      explanation: 'Keyword arguments explicitly name parameters (`name="Aisha", age=20, cgpa=8.7`), allowing them to be passed in any order.',
    },
    {
      id: 'q1-5-5',
      question: 'What will be printed by the following code?\n\nx = 50\n\ndef modify():\n    x = 90\n    return x\n\nmodify()\nprint(x)',
      options: [
        '`90`',
        '`50`',
        '`None`',
        '`NameError: x is ambiguous`',
      ],
      correctIndex: 1,
      explanation: 'The variable `x = 90` inside `modify()` is in the local scope of the function. It does not overwrite the global variable `x = 50` outside.',
    },
    {
      id: 'q1-5-6',
      question: 'What is function composition in Python?',
      options: [
        'Writing functions with 500 lines of code',
        'Passing the return value of one function directly as the input argument to another function',
        'Writing functions inside comments',
        'Renaming Python built-in keywords',
      ],
      correctIndex: 1,
      explanation: 'Function composition combines modular functions, such as `final_price = add_tax(apply_discount(raw_price))`.',
    },
    {
      id: 'q1-5-7',
      question: 'Why is modularity an essential principle when building Data Science pipelines?',
      options: [
        'Because data scientists are required to use at least 100 files',
        'Breaking complex workflows into small, focused functions makes code easier to test, debug, maintain, and reuse across datasets',
        'Monolithic single-line scripts are faster than modular code',
        'Modularity is only used in web development, not data science',
      ],
      correctIndex: 1,
      explanation: 'Modularity divides complex workflows (data loading, cleaning, normalization, modeling) into distinct, testable units with single responsibilities.',
    },
    {
      id: 'q1-5-8',
      question: 'What happens if a Python function does NOT include a `return` statement?',
      options: [
        'Python crashes with a SyntaxError',
        'The function returns `0` by default',
        'The function implicitly returns `None`',
        'The function returns the last evaluated expression automatically',
      ],
      correctIndex: 2,
      explanation: 'In Python, functions without an explicit `return` statement return the special value `None` by default.',
    },
    {
      id: 'q1-5-9',
      question: 'Which of the following function names best follows Python PEP 8 naming conventions?',
      options: [
        '`CalculateMeanValue`',
        '`calculate_mean_value`',
        '`CALCULATEMEAN`',
        '`calc_mean_Val`',
      ],
      correctIndex: 1,
      explanation: 'PEP 8 specifies `snake_case` (all lowercase with words separated by underscores) for function names in Python.',
    },
    {
      id: 'q1-5-10',
      question: 'How do custom Python functions relate to libraries like Pandas and Scikit-Learn?',
      options: [
        'Pandas replaces all Python functions with SQL',
        'Custom functions can be applied across entire dataset columns using methods like `df["column"].apply(my_function)`',
        'Scikit-Learn prohibits user-defined functions',
        'Data Science libraries never interact with Python functions',
      ],
      correctIndex: 1,
      explanation: 'Custom functions are central to Data Science libraries; for example, Pandas `.apply(custom_func)` executes your function across millions of rows.',
    },
  ],
  summary: {
    takeaways: [
      'Functions package logic into named, reusable units (Define Once, Call Many Times).',
      'Parameters are variable placeholders in the definition; arguments are the concrete values passed during the call.',
      'Always use return (not print) for data calculations so values can be reused by other functions or stored in variables.',
      'Default parameters provide fallbacks; keyword arguments allow passing inputs in any order.',
      'Local scope keeps variables isolated inside functions, preventing global state corruption.',
      'Modularity breaks monolithic data pipelines into clean, testable, and maintainable operations.',
    ],
    nextUpText: 'Topic 1.6: Introduction to Jupyter Notebook — Interactive Data Computing',
  },
  prevTopic: {
    slug: 'control-structures',
    title: 'Control Structures',
  },
  nextTopic: {
    slug: 'introduction-to-jupyter-notebook',
    title: 'Introduction to Jupyter Notebook',
  },
};
