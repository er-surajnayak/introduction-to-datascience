import { LessonContent } from '@/types/lesson';

export const topic1_3: LessonContent = {
  id: 'm1-t3',
  topicNumber: '1.3',
  slug: 'python-refresher-variables',
  moduleId: 'module-1',
  title: 'Python Refresher: Variables',
  subtitle: 'Name Bindings, Dynamic Typing, and the Foundation of Data Science Arrays',
  estimatedMinutes: 25,
  difficulty: 'Beginner',
  tags: ['Python', 'Variables', 'Data Types', 'Type Conversion', 'Data Structures'],
  objectives: [
    'Understand that a Python variable is a reference name pointing to an object in memory, not a fixed physical box.',
    'Master the 4 fundamental primitive types: int, float, str, and bool.',
    'Understand dynamic typing and how Python variables can be reassigned to objects of different types.',
    'Perform multiple and chained variable assignments cleanly and readably.',
    'Inspect types with type() and perform safe type conversions with int(), float(), str(), and bool().',
    'Follow PEP 8 variable naming rules and distinguish valid syntax from readable engineering style.',
    'Trace how single Python variables scale into lists, NumPy arrays, and Pandas DataFrames in Data Science.',
  ],
  hook: {
    title: 'Python Isn\'t New. Let\'s Wake It Back Up.',
    story:
      'Imagine you are tracking a student\'s academic profile:\n\nName: Aisha\nAge: 20\nCGPA: 8.7\nPlaced Status: False\n\nThese are four distinct pieces of information—text, a whole count, a precision decimal, and a binary true/false state. Python needs a clear, expressive way to label and track each of these values in memory:\n\nname = "Aisha"\nage = 20\ncgpa = 8.7\nis_placed = False\n\nBefore we dive into machine learning models and multi-gigabyte datasets, we must master the atomic unit of all Python computation: the variable.',
    analogy:
      'Think of a variable as a labeled adhesive tag slapped onto a floating object in memory. If you change a student\'s age from 20 to 21, you simply peel the "age" tag and stick it onto the new number 21.',
    realWorldImpact:
      'In real-world data science, dirty data often arrives as strings (like "499.50" or "₹1200") instead of numeric floats. Understanding variable types and type casting prevents crashes and corrupted statistical models.',
  },
  coreConcept: {
    headline: 'Variables are Name Bindings That Refer to Objects',
    explanation:
      'In Python, creating a variable does not reserve a static, fixed-size memory slot. Instead, Python creates an object in memory and binds a variable name (an identifier) to that object.',
    keyPillars: [
      {
        title: 'Assignment (=) is Binding, Not Equality',
        description:
          'In mathematics, "=" asserts that left equals right. In Python, "=" evaluates the expression on the right-hand side first, creates or finds the resulting object, and binds the name on the left to it.',
      },
      {
        title: 'The 4 Core Primitive Types',
        description:
          'int (whole numbers like 20), float (decimals like 8.7), str (text enclosed in quotes like "Aisha"), and bool (logical states True or False).',
      },
      {
        title: 'Dynamic Typing',
        description:
          'Python is dynamically typed: you do not declare variable types beforehand (no "int age = 20;"). The type belongs to the object itself, and a name can refer to different types over time.',
      },
      {
        title: 'Type Checking & Conversion',
        description:
          'Inspect any object with type(var). Convert between compatible types using int(), float(), str(), or bool(). If conversion is impossible (e.g. int("hello")), Python raises a ValueError.',
      },
    ],
  },
  interactiveType: 'variable-memory',
  technicalExplanation: {
    title: 'From Single Variables to Multi-Dimensional Data Science',
    deepDive:
      'Every complex Data Science structure begins as ordinary Python variables. A single variable stores one scalar value. A list groups multiple variables. A NumPy array vectorizes them into contiguous C memory buffers. A Pandas DataFrame bundles those vectors into labeled columns.',
    bulletPoints: [
      'Scalar Variable: age = 20 (Single data point in memory).',
      'Python Collection: ages = [20, 21, 19, 22] (List of object pointers).',
      'NumPy Vector: np.array([20, 21, 19, 22]) (Homogeneous contiguous 64-bit integers for 50x faster linear algebra).',
      'Pandas DataFrame: df = pd.DataFrame({"name": ["Aisha", "Rahul"], "age": [20, 21]}) (Tabular dataset with column types).',
      'Naming Rule: Names contain letters, numbers, underscores; cannot start with a digit; cannot use keywords like class or def; and are case-sensitive (Age != age).',
    ],
  },
  codeExamples: [
    {
      title: 'Variable Creation, Type Checking, and Conversion',
      description:
        'Explore how Python assigns types, inspects them dynamically, and converts string data into numeric values.',
      language: 'python',
      code: `# ==========================================================
# 1. Variable Assignment & Core Types
# ==========================================================
student_name = "Aisha"       # str (string text)
student_age = 20             # int (whole number)
current_cgpa = 8.7           # float (decimal number)
is_placed = False            # bool (Boolean flag)

# ==========================================================
# 2. Type Inspection with type()
# ==========================================================
print(type(student_name))    # <class 'str'>
print(type(student_age))     # <class 'int'>
print(type(current_cgpa))    # <class 'float'>
print(type(is_placed))       # <class 'bool'>

# ==========================================================
# 3. Dynamic Reassignment
# ==========================================================
score = 75                   # score refers to int 75
print("Initial score:", score, type(score))

score = "Grade A"            # score now refers to str "Grade A"
print("Reassigned score:", score, type(score))

# ==========================================================
# 4. Multiple & Chained Assignment
# ==========================================================
city, state = "Bengaluru", "Karnataka"
x = y = z = 0                # All three names refer to integer 0

# ==========================================================
# 5. Type Conversion (Data Cleaning in Practice)
# ==========================================================
raw_price = "499.50"         # Received from CSV as text
clean_price = float(raw_price)
total_with_tax = clean_price * 1.18

print(f"Final calculated price: ₹{total_with_tax:.2f}")`,
      lineExplanations: [
        { line: 4, text: 'Variables are assigned without type prefixes; Python infers types automatically.' },
        { line: 11, text: 'type() returns the underlying class/type of the referenced object.' },
        { line: 18, text: 'A single variable name can refer to different object types across execution time.' },
        { line: 30, text: 'float("499.50") safely casts the text string into a mathematical floating-point number.' },
      ],
      output: '<class \'str\'>\n<class \'int\'>\n<class \'float\'>\n<class \'bool\'>\nInitial score: 75 <class \'int\'>\nReassigned score: Grade A <class \'str\'>\nFinal calculated price: ₹589.41',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Attempting to add text strings and numeric integers directly (e.g. age = "21"; age + 5)',
      why: 'In Python, the "+" operator performs mathematical addition for numbers, but concatenation for strings. Adding a string to an integer raises a TypeError: can only concatenate str (not "int") to str.',
      correction: 'Explicitly convert the string with int(age) before performing mathematical addition.',
    },
    {
      mistake: 'Assuming 90 and "90" are identical in Python',
      why: '90 is an integer stored in binary format for math; "90" is a string containing Unicode characters "9" and "0". Comparing 90 == "90" returns False without an error.',
      correction: 'Always verify data types when loading data from CSVs or APIs using type() or DataFrame.dtypes.',
    },
    {
      mistake: 'Using spaces or hyphens in variable names (e.g. student name = "Aisha" or student-name = "Aisha")',
      why: 'Python interprets spaces as separate tokens (causing a SyntaxError) and hyphens as the subtraction operator.',
      correction: 'Use PEP 8 standard snake_case with underscores: student_name = "Aisha".',
    },
    {
      mistake: 'Starting a variable name with a number (e.g. 2nd_student = "Rahul")',
      why: 'Python\'s lexical parser requires identifiers to begin with a letter (a-z, A-Z) or an underscore (_). Starting with a digit causes a SyntaxError: invalid decimal literal.',
      correction: 'Prefix with letters or words: second_student = "Rahul" or student_2 = "Rahul".',
    },
    {
      mistake: 'Using obscure, uninformative single-letter names (e.g. x = 100 instead of total_marks = 100)',
      why: 'While single-letter variables like "i" are fine for small loop counters, cryptic names in data science pipelines make debugging and peer review difficult.',
      correction: 'Choose descriptive, meaningful variable names that express the business context.',
    },
    {
      mistake: 'Confusing single equals (=) with double equals (==)',
      why: '"=" is the assignment operator that binds a name to an object. "==" is the equality comparison operator that tests if two values are equal and returns True or False.',
      correction: 'Use "=" to set values, and "==" to test conditions.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'When receiving raw input "85" from an API, what should you verify before computing?',
      context: 'Processing web form entries or CSV data feeds.',
      reasoning:
        'Raw form inputs always arrive as string text (`str`). Attempting math like `"85" / 2` will crash with a `TypeError`. You must inspect the type with `type()`, verify that the string represents valid digits, and explicitly convert it using `int("85")` or `float("85")`.',
      ruleOfThumb: 'Never assume raw data has the correct numeric type. Always inspect type and convert explicitly before mathematical computation.',
    },
    {
      question: 'How do you handle dirty formatted text like "₹499" or "95%" before type casting?',
      context: 'Data cleaning in real-world retail and financial datasets.',
      reasoning:
        'Calling `float("₹499")` directly causes a `ValueError: could not convert string to float`. You must first strip the currency symbol or percentage sign using string methods (`.replace("₹", "").strip()`) before converting to a float.',
      ruleOfThumb: 'Clean non-numeric formatting characters first; convert to numeric types second.',
    },
  ],
  quiz: [
    {
      id: 'q1-3-1',
      question: 'What is the data type of the variable `x = "25"` in Python?',
      options: [
        '`int`',
        '`str`',
        '`float`',
        '`bool`',
      ],
      correctIndex: 1,
      explanation: 'Any value enclosed in quotation marks (single or double) is stored as a string (`str`) in Python.',
    },
    {
      id: 'q1-3-2',
      question: 'What is the value and type of `score` after executing the following lines?\n\nscore = 75\nscore = "Passed"',
      options: [
        '`score` is 75 of type `int`',
        '`score` is "Passed" of type `str`',
        'Python throws a `TypeError` because types cannot change',
        '`score` stores both values simultaneously',
      ],
      correctIndex: 1,
      explanation: 'Python is dynamically typed. Reassigning `score = "Passed"` simply binds the name `score` to the new string object `"Passed"`.',
    },
    {
      id: 'q1-3-3',
      question: 'Which of the following is a valid, PEP 8 compliant Python variable name?',
      options: [
        '`2nd_student`',
        '`student-marks`',
        '`total_score`',
        '`class`',
      ],
      correctIndex: 2,
      explanation: '`total_score` uses valid letters and an underscore. `2nd_student` starts with a digit, `student-marks` uses a minus sign, and `class` is a reserved Python keyword.',
    },
    {
      id: 'q1-3-4',
      question: 'What does the function call `type(21.0)` return in Python?',
      options: [
        '`<class \'int\'>`',
        '`<class \'float\'>`',
        '`<class \'decimal\'>`',
        '`<class \'number\'>`',
      ],
      correctIndex: 1,
      explanation: 'Numbers containing a decimal point are represented as floating-point numbers (`<class \'float\'>`) in Python.',
    },
    {
      id: 'q1-3-5',
      question: 'What will happen when Python executes `int("hello")`?',
      options: [
        'It returns 0',
        'It converts the word into ASCII numbers',
        'It raises a `ValueError` because "hello" is not a valid integer literal',
        'It returns `None`',
      ],
      correctIndex: 2,
      explanation: '`int()` requires the string to contain characters that represent a valid integer (e.g. `"42"`). Attempting to convert non-numeric text raises a `ValueError`.',
    },
    {
      id: 'q1-3-6',
      question: 'What values will `a`, `b`, and `c` have after executing `a, b, c = 10, 20.5, "Data"`?',
      options: [
        '`a = 10`, `b = 20.5`, `c = "Data"`',
        '`a = "Data"`, `b = 20.5`, `c = 10`',
        'SyntaxError: multiple assignment requires brackets',
        '`a, b, c` all become `10`',
      ],
      correctIndex: 0,
      explanation: 'Python supports tuple unpacking in multiple assignment, binding the comma-separated names to corresponding values in sequence.',
    },
    {
      id: 'q1-3-7',
      question: 'What is the result of evaluating the expression `90 == "90"` in Python?',
      options: [
        '`True` because both represent ninety',
        '`False` because an `int` and a `str` are different object types',
        '`TypeError` because comparing numbers and strings is invalid',
        '`None`',
      ],
      correctIndex: 1,
      explanation: 'Python does not perform implicit type coercion during equality comparisons. An integer (`90`) is never equal to a string (`"90"`), returning `False`.',
    },
    {
      id: 'q1-3-8',
      question: 'Why are variable names like `Age` and `age` considered different in Python?',
      options: [
        'Python is case-insensitive, so they are the same',
        'Python is strictly case-sensitive, so `Age` and `age` are distinct identifiers',
        'Uppercase names are reserved for system hardware only',
        'Lowercase names can only hold integers',
      ],
      correctIndex: 1,
      explanation: 'Python is case-sensitive: `Age`, `age`, and `AGE` refer to three completely independent variables in memory.',
    },
    {
      id: 'q1-3-9',
      question: 'What does the assignment statement `x = y = z = 0` accomplish?',
      options: [
        'Creates an equality check that returns `True`',
        'Binds the names `x`, `y`, and `z` so they all refer to the integer object `0`',
        'Causes a SyntaxError',
        'Sets `x` to 0 and leaves `y` and `z` undefined',
      ],
      correctIndex: 1,
      explanation: 'Chained assignment binds multiple variable names to the same resulting object on the right-hand side.',
    },
    {
      id: 'q1-3-10',
      question: 'In Data Science, how does a single Python variable (e.g. `age = 20`) relate to a Pandas DataFrame column?',
      options: [
        'They are completely unrelated and cannot interact',
        'A single variable is a scalar value; grouping scalar values into vectors creates arrays, which form the columns of a DataFrame',
        'DataFrames only store text files, not Python variables',
        'A single variable cannot be converted into a column',
      ],
      correctIndex: 1,
      explanation: 'Individual variables represent scalar values. Grouping scalars creates collections/vectors, and aligning multiple vectors creates structured DataFrames.',
    },
  ],
  summary: {
    takeaways: [
      'A Python variable is a reference label bound to an object in memory, not a static physical container.',
      'Python has 4 fundamental primitive types: int (whole numbers), float (decimals), str (text), and bool (True/False).',
      'Python is dynamically typed: variable names can be reassigned to objects of different types over time.',
      'Assignment (=) binds a name to a value; equality (==) tests whether two values are equal.',
      'Follow PEP 8 snake_case naming conventions: meaningful identifiers prevent bugs and make code readable.',
      'Type checking (type()) and type conversion (int(), float(), str()) are foundational skills for real-world data cleaning.',
    ],
    nextUpText: 'Topic 1.4: Control Structures — If-Else Logic & Iteration',
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
