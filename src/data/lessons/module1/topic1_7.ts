import { LessonContent } from '@/types/lesson';

export const topic1_7: LessonContent = {
  id: 'm1-t7',
  topicNumber: '1.7',
  slug: 'numpy-basics-and-vectorization',
  moduleId: 'module-1',
  title: 'NumPy Basics & Vectorization',
  subtitle: 'The Foundation of Numerical Computing: ndarrays, Vectorized Math, Broadcasting & Dimensional Reductions',
  estimatedMinutes: 35,
  difficulty: 'Beginner',
  tags: ['NumPy', 'ndarray', 'Vectorization', 'Broadcasting', 'Slicing', 'Axis', 'Reshape', 'Data Science'],
  objectives: [
    'Understand why NumPy exists and how ndarrays fundamentally differ from standard Python lists.',
    'Master the NumPy ndarray structure: inspecting shape, number of dimensions (ndim), size, and dtype.',
    'Create structured numerical arrays using np.array(), np.zeros(), np.ones(), np.arange(), and np.linspace().',
    'Navigate 1D and 2D arrays with zero-based indexing and multidimensional slicing syntax.',
    'Harness the power of vectorized operations and broadcasting to perform element-wise arithmetic without manual loops.',
    'Calculate essential statistical aggregations (mean, sum, std, min, max) and master directional axes (axis=0 vs axis=1).',
    'Reshape arrays while maintaining element consistency and understand why homogeneous dtypes enable rapid computing.',
    'Complete the Module 1 Capstone Challenge: "Analyze a Class" and transition to thinking like a Data Scientist.',
  ],
  hook: {
    title: 'Python Can Handle Numbers. What Happens When You Have 10 Million of Them?',
    story:
      'Imagine you are tracking daily temperature readings across 1,000 meteorological stations. If you want to increase every temperature by 2°C, calculate the national average, find the highest reading, and filter extreme heatwaves using a standard Python list, you have to write manual for-loops, create empty lists, and append elements one by one. In a Python list, every single number is an isolated Python object scattered across RAM. NumPy changes everything: it stores numbers in a continuous, uninterrupted block of memory and performs operations on the entire array in a single stroke.',
    analogy:
      'A Python list is like a box of assorted chocolates of different shapes and wrappers scattered across multiple rooms—to check them, you must walk to each room one by one. A NumPy array is a precision-machined tray of identical steel ball bearings sitting in tight, unbroken rows—you can tilt the tray and all of them move together instantaneously.',
    realWorldImpact:
      'NumPy is the bedrock foundation beneath the entire Data Science and AI universe—powering Pandas, Scikit-Learn, PyTorch, TensorFlow, SciPy, and OpenCV. Every image filter, audio spectrogram, financial risk model, and neural network tensor is computed on NumPy ndarrays.',
  },
  coreConcept: {
    headline: 'Structured Numerical Computing with the N-Dimensional Array (ndarray)',
    explanation:
      'NumPy (Numerical Python) is the core library for scientific computing in Python. Its fundamental building block is the ndarray (N-dimensional array)—a homogeneous, multidimensional grid of numbers. Because all elements share the exact same data type (dtype) and reside contiguously in memory, NumPy can execute mathematical computations directly in compiled C at lightning speed.',
    keyPillars: [
      {
        title: 'Homogeneous & Contiguous Memory Buffer',
        description:
          'Unlike Python lists which hold references to scattered objects, an ndarray stores raw numerical values right next to each other in RAM, maximizing CPU cache efficiency.',
      },
      {
        title: 'Array Structure: Shape, ndim, Size & dtype',
        description:
          'Every array has a shape (e.g. 3 rows by 4 columns), ndim (number of axes: 1D vector, 2D matrix), size (total elements), and dtype (element data type like int64 or float64).',
      },
      {
        title: 'Vectorization (Array-Level Computing)',
        description:
          'Expressing mathematical operations on entire arrays (e.g. arr + 5 or arr * 2) instead of manually writing Python loops. The operation executes across all elements simultaneously.',
      },
      {
        title: 'Directional Axis Reductions',
        description:
          'Aggregating multidimensional data along specific dimensions: axis=0 collapses down rows (column-wise statistics); axis=1 collapses across columns (row-wise statistics).',
      },
    ],
  },
  interactiveType: 'numpy-benchmark',
  technicalExplanation: {
    title: 'Vectorization, Broadcasting & Slicing Views Under the Hood',
    deepDive:
      'When you perform an operation like `marks + 5` in pure Python, the interpreter must inspect each object, check its type, look up the addition method, allocate a new integer, and append it. In NumPy, `marks + 5` is executed in a single vectorized C loop using SIMD (Single Instruction, Multiple Data) CPU instructions that transform multiple numbers in a single clock cycle.\n\nBroadcasting is NumPy’s rule set for applying arithmetic between arrays of different shapes without copying data into memory. When adding a scalar `5` to an array `[60, 70, 80]`, NumPy conceptually stretches the `5` across all 3 elements.\n\nAnother critical distinction: Slicing a NumPy array produces a VIEW into the original memory buffer, not an independent copy. Modifying a slice directly alters the original parent array unless you explicitly create an isolated copy using `.copy()`.',
    bulletPoints: [
      'Standard Import: Always import as `import numpy as np`.',
      'Array Creation: `np.array([1, 2, 3])`, `np.zeros(5)`, `np.ones((2, 3))`, `np.arange(0, 10, 2)`, `np.linspace(0, 1, 5)`.',
      '2D Indexing: `matrix[row_idx, col_idx]`. Example: `matrix[0, 2]` selects the element at row 0, column 2.',
      '2D Slicing: `matrix[row_start:row_end, col_start:col_end]`. Example: `matrix[0:2, 1:3]` extracts a 2x2 sub-matrix.',
      'Aggregations: `np.mean(arr)`, `np.sum(arr)`, `np.min(arr)`, `np.max(arr)`, `np.std(arr)`.',
      'Reshaping: `arr.reshape(rows, cols)` restructures the grid without altering the total number of elements (rows * cols must equal size).',
    ],
  },
  codeExamples: [
    {
      title: 'Python List vs NumPy Vectorization & Aggregation',
      description: 'Compare manual list processing with elegant, vectorized NumPy operations.',
      language: 'python',
      code: `import numpy as np

# 1. Plain Python List approach:
scores_list = [78, 85, 92, 67, 74]
curved_list = []
for s in scores_list:
    curved_list.append(s + 5)
print("Curved List (with loop):", curved_list)

# 2. NumPy Vectorized approach (no loops needed!):
scores_arr = np.array([78, 85, 92, 67, 74])
curved_arr = scores_arr + 5  # Vectorized addition
print("Curved Array (vectorized):", curved_arr)

# 3. Aggregations & Boolean Filtering:
print("Class Mean:", np.mean(curved_arr))       # 84.2
print("Highest Score:", np.max(curved_arr))     # 97
print("Lowest Score:", np.min(curved_arr))      # 72
print("Standard Deviation:", np.std(curved_arr)) # 8.86

# 4. Boolean Mask (Students >= 85):
top_performers = curved_arr[curved_arr >= 85]
print("Top Performers (>=85):", top_performers) # [90, 97]`,
      lineExplanations: [
        { line: 4, text: 'Traditional Python requires initializing an empty list and iterating through each element.' },
        { line: 11, text: 'NumPy vectorized addition applies + 5 directly at the array level in compiled C.' },
        { line: 15, text: 'np.mean, np.max, np.min, and np.std calculate summary statistics across the array.' },
        { line: 21, text: 'Boolean indexing curved_arr >= 85 filters elements matching the condition without an if statement.' },
      ],
      output: 'Curved List (with loop): [83, 90, 97, 72, 79]\nCurved Array (vectorized): [83 90 97 72 79]\nClass Mean: 84.2\nHighest Score: 97\nLowest Score: 72\nStandard Deviation: 8.86\nTop Performers (>=85): [90 97]',
    },
    {
      title: '2D Matrix Indexing, Slicing & Axis Operations',
      description: 'Examine tabular student records across multiple subjects using 2D arrays.',
      language: 'python',
      code: `import numpy as np

# Student records matrix: 3 students (rows) x 3 subjects (columns)
# Columns: [Math, Physics, Chemistry]
grades = np.array([
    [80, 90, 70],  # Student 0
    [60, 75, 85],  # Student 1
    [92, 88, 95]   # Student 2
])

print("Shape:", grades.shape)  # (3, 3) - 3 rows, 3 cols
print("Dimensions:", grades.ndim) # 2

# Access specific element: Student 0, Physics (Row 0, Col 1)
print("Student 0 Physics:", grades[0, 1])  # 90

# Slicing: Extract all students for Math and Physics (Rows 0-3, Cols 0-2)
print("Math & Physics Subgrid:\n", grades[:, 0:2])

# Directional Axis Reductions:
subject_averages = np.mean(grades, axis=0)  # Down rows -> [Math, Phys, Chem] means
student_averages = np.mean(grades, axis=1)  # Across cols -> [Student 0, 1, 2] means

print("Subject Averages (axis=0):", subject_averages)  # [77.33, 84.33, 83.33]
print("Student Averages (axis=1):", student_averages)  # [80.0, 73.33, 91.67]`,
      lineExplanations: [
        { line: 4, text: '2D matrix created with nested lists representing rows and columns.' },
        { line: 14, text: 'matrix[row, col] accesses elements with zero-based coordinates.' },
        { line: 17, text: 'Colon : on row dimension selects all rows; 0:2 on col dimension selects cols 0 and 1.' },
        { line: 20, text: 'axis=0 collapses rows down to compute column averages (subject means).' },
        { line: 21, text: 'axis=1 collapses columns across to compute row averages (student means).' },
      ],
      output: 'Shape: (3, 3)\nDimensions: 2\nStudent 0 Physics: 90\nMath & Physics Subgrid:\n [[80 90]\n [60 75]\n [92 88]]\nSubject Averages (axis=0): [77.33333333 84.33333333 83.33333333]\nStudent Averages (axis=1): [80.         73.33333333 91.66666667]',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming NumPy arrays are just Python lists with a different name',
      why: 'Python lists are heterogeneous collections of pointers. NumPy ndarrays are contiguous homogeneous memory buffers designed specifically for high-speed mathematical operations.',
      correction: 'Use Python lists for general-purpose programming and mixed collections; use NumPy ndarrays for numerical tables, vectors, matrices, and scientific computing.',
    },
    {
      mistake: 'Thinking that indexing in NumPy starts at 1',
      why: 'Just like Python, NumPy uses zero-based indexing. The first element is always at index 0, and the second is at index 1.',
      correction: 'To access the first element, use arr[0]. For the last element, use arr[-1].',
    },
    {
      mistake: 'Assuming that reshape() can change the total number of elements',
      why: 'Reshape reorganizes the grid layout, but it cannot create or destroy elements. An array with 6 elements can become (2, 3) or (3, 2), but attempting (4, 2) fails because 4 * 2 = 8 != 6.',
      correction: 'Ensure rows * columns equals array.size before calling .reshape().',
    },
    {
      mistake: 'Misinterpreting axis=0 as "always rows"',
      why: 'The axis parameter specifies the dimension along which the operation collapses. In a 2D array, axis=0 collapses down the rows, yielding one summary value per column (e.g. subject means). axis=1 collapses across columns, yielding one value per row.',
      correction: 'Remember: axis=0 operates vertically down columns; axis=1 operates horizontally across rows.',
    },
    {
      mistake: 'Forgetting that NumPy slices are VIEWS, not isolated copies',
      why: 'If you create sub = arr[0:3] and modify sub[0] = 999, the original parent array arr[0] is also modified to 999!',
      correction: 'If you want an independent copy that does not affect the original array, explicitly call .copy(): sub = arr[0:3].copy().',
    },
    {
      mistake: 'Writing Python for-loops to perform math on each element of an ndarray',
      why: 'Iterating over an ndarray with for x in arr destroys performance by dropping back into the slow Python interpreter loop on every step.',
      correction: 'Always write vectorized expressions directly: arr = arr * 2 or arr += 10.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'How do I decide between using axis=0 and axis=1 when summarizing a dataset?',
      context: 'Computing statistics across tabular data (e.g. students as rows, subjects as columns).',
      reasoning:
        'Ask yourself what unit you want the result for: If you want one average per subject (columns), you need to collapse down all students (rows), so use axis=0. If you want one average per student (rows), you need to collapse across all subjects (columns), so use axis=1.',
      ruleOfThumb: 'axis=0 = collapse rows (vertical summary); axis=1 = collapse columns (horizontal summary).',
    },
    {
      question: 'How does NumPy connect to the rest of the Data Science workflow?',
      context: 'Understanding the progression from Python basics to machine learning.',
      reasoning:
        'Python Variables -> Python Lists -> NumPy Arrays -> Vectorized Math -> Pandas DataFrames -> Matplotlib Visualizations -> Scikit-Learn Models. NumPy is the mathematical computational engine that powers every analytical tool above it.',
      ruleOfThumb: 'NumPy gives us the arrays; Pandas gives us the labels and tables; Matplotlib gives us the charts.',
    },
  ],
  quiz: [
    {
      id: 'q1-7-1',
      question: 'Why is a NumPy ndarray significantly faster for numerical computing than a standard Python list?',
      options: [
        'NumPy arrays store elements as text strings',
        'NumPy arrays store homogeneous numbers in contiguous RAM buffers and use compiled C vector instructions',
        'NumPy arrays delete all variables after 10 milliseconds',
        'NumPy runs on a separate remote server',
      ],
      correctIndex: 1,
      explanation:
        'Because all elements share the same dtype and sit contiguously in memory, operations execute at the hardware level using CPU SIMD vectorization without Python interpreter overhead.',
    },
    {
      id: 'q1-7-2',
      question: 'Given an array `arr = np.array([[1, 2, 3], [4, 5, 6]])`, what is `arr.shape`?',
      options: ['`(6,)`', '`(3, 2)`', '`(2, 3)`', '`2`'],
      correctIndex: 2,
      explanation:
        'The array has 2 rows and 3 columns, so its shape is the tuple (2, 3).',
    },
    {
      id: 'q1-7-3',
      question: 'What is the result of the vectorized operation `np.array([10, 20, 30]) + 5`?',
      options: [
        '`[15, 25, 35]`',
        '`[10, 20, 30, 5]`',
        '`15`',
        'Raises a TypeError because an array cannot be added to a scalar',
      ],
      correctIndex: 0,
      explanation:
        'NumPy broadcasts the scalar 5 and adds it element-by-element to every number in the array, producing array([15, 25, 35]).',
    },
    {
      id: 'q1-7-4',
      question: 'In a 2D matrix `matrix`, what does the slicing expression `matrix[:, 0]` extract?',
      options: [
        'The first row across all columns',
        'The first column across all rows',
        'The top-left single cell',
        'The diagonal elements',
      ],
      correctIndex: 1,
      explanation:
        'The colon `:` specifies all rows, and `0` specifies column index 0, returning the entire first column as a 1D vector.',
    },
    {
      id: 'q1-7-5',
      question: 'Can an array with 12 elements be reshaped into a shape of `(3, 4)`?',
      options: [
        'Yes, because 3 * 4 = 12, matching the total number of elements',
        'No, arrays can only be reshaped into square dimensions',
        'Yes, but only if all elements are negative',
        'No, reshape only works on 1D arrays',
      ],
      correctIndex: 0,
      explanation:
        'Reshaping is valid whenever the product of the new dimensions equals the total number of elements in the array (3 * 4 = 12).',
    },
    {
      id: 'q1-7-6',
      question: 'In a 2D array where rows represent students and columns represent subjects, what does `np.mean(grades, axis=0)` calculate?',
      options: [
        'The overall average of the entire matrix',
        'The average score for each subject (calculated down the rows of each column)',
        'The average score for each student (calculated across columns)',
        'The highest mark in the class',
      ],
      correctIndex: 1,
      explanation:
        'axis=0 collapses down the rows, computing the mean for each individual column (subject averages).',
    },
    {
      id: 'q1-7-7',
      question: 'What happens if you modify a sliced section of a NumPy array created with `sub = arr[0:2]`?',
      options: [
        'Only `sub` is modified; `arr` remains untouched',
        'Both `sub` and the original `arr` are modified because slices are memory views',
        'NumPy raises a ReadOnlyError',
        'The entire array is deleted',
      ],
      correctIndex: 1,
      explanation:
        'NumPy slices are views referencing the original memory buffer. To modify a slice safely without mutating the parent array, use `arr[0:2].copy()`.',
    },
    {
      id: 'q1-7-8',
      question: 'Which NumPy function generates 5 evenly spaced numbers between 0 and 1 inclusive?',
      options: [
        '`np.arange(0, 1, 5)`',
        '`np.linspace(0, 1, 5)`',
        '`np.zeros(5)`',
        '`np.space(0, 1, 5)`',
      ],
      correctIndex: 1,
      explanation:
        '`np.linspace(start, stop, num)` generates `num` evenly spaced points across the interval [start, stop], returning `[0.0, 0.25, 0.5, 0.75, 1.0]`.',
    },
    {
      id: 'q1-7-9',
      question: 'Given `scores = np.array([55, 80, 92, 40, 75])`, what does `scores[scores >= 75]` produce?',
      options: [
        '`[True, False, True]`',
        '`[80, 92, 75]`',
        '`3`',
        '`[55, 40]`',
      ],
      correctIndex: 1,
      explanation:
        'Boolean masking filters and returns only the elements where the condition `scores >= 75` evaluates to True, which are [80, 92, 75].',
    },
    {
      id: 'q1-7-10',
      question: 'What is the role of `dtype` in a NumPy array?',
      options: [
        'It determines the name of the variable in the Kernel',
        'It specifies the data type of the homogeneous elements stored in the memory buffer (e.g. int64, float64)',
        'It counts how many times the array was printed',
        'It measures the execution duration in seconds',
      ],
      correctIndex: 1,
      explanation:
        '`dtype` defines the uniform memory representation for every number in the array, enabling predictable byte offsets and maximum computational throughput.',
    },
  ],
  summary: {
    takeaways: [
      'NumPy `ndarray` is the cornerstone of scientific computing, storing homogeneous data in contiguous memory for high-speed SIMD math.',
      'Vectorization replaces manual Python loops with fast, array-level arithmetic.',
      'Broadcasting enables seamless operations between scalars and arrays of compatible shapes.',
      'Slices in NumPy are memory views; always use `.copy()` when you need isolated mutation.',
      'Master directional axis: axis=0 collapses rows (column statistics); axis=1 collapses columns (row statistics).',
      'Reshape reorganizes array dimensions while strictly conserving the total element count.',
      'Congratulations! You have completed Module 1 and built the computational foundation for Data Collection, Preprocessing & EDA!',
    ],
    nextUpText: 'Module 1 Complete! Module 2: Data Collection & Preprocessing Unlocked',
  },
  prevTopic: {
    slug: 'introduction-to-jupyter-notebook',
    title: 'Introduction to Jupyter Notebook',
  },
};
