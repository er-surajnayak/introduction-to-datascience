import { LessonContent } from '@/types/lesson';

export const topic1_7: LessonContent = {
  id: 'm1-t7',
  topicNumber: '1.7',
  slug: 'numpy-basics-and-vectorization',
  moduleId: 'module-1',
  title: 'NumPy Basics & Vectorization',
  subtitle: 'The Engine of Scientific Computing: N-Dimensional Arrays, Memory Contiguity & SIMD Math',
  estimatedMinutes: 45,
  difficulty: 'Beginner',
  tags: ['NumPy', 'ndarray', 'Vectorization', 'Broadcasting', 'Slicing', 'Linear Algebra'],
  objectives: [
    'Deconstruct the internal memory architecture of the `np.ndarray` (data buffer, shape, strides, dtype).',
    'Understand why contiguous memory layouts enable modern CPU SIMD (Single Instruction Multiple Data) vectorization.',
    'Master multidimensional indexing and slicing syntax across 1D vectors and 2D matrices.',
    'Apply NumPy Broadcasting rules to perform arithmetic across arrays of different dimensions without copying data.',
  ],
  hook: {
    title: 'The Supermarket Checkout Conveyor Belt',
    story:
      'Imagine 1,000 customers at a supermarket. A standard Python loop is like one cashier manually scanning each item, asking for price checks, looking up barcodes, and bagging items one-by-one. A NumPy vectorized operation is like an automated 16-lane industrial scanner where 16 items pass through laser sensors simultaneously on a single clock cycle (SIMD). Operations that take 3 seconds in Python finish in 8 milliseconds in NumPy.',
    analogy:
      'Python lists are like a box of assorted chocolates of varying sizes scattered across different rooms. A NumPy array is a precisely machined tray of identical steel ball bearings sitting in contiguous rows in a single metal box.',
    realWorldImpact:
      'NumPy is the bedrock foundation beneath Pandas, Scikit-Learn, PyTorch, TensorFlow, SciPy, and OpenCV. Every image filter, audio spectrogram, and neural network tensor is built on NumPy ndarrays.',
  },
  coreConcept: {
    headline: 'The N-Dimensional Array (ndarray) Architecture',
    explanation:
      'An `ndarray` is a fast, flexible container for large datasets in Python. Unlike Python lists which store pointers to heterogeneous objects, an ndarray stores a contiguous block of homogeneous memory of a single data type (`dtype`).',
    keyPillars: [
      {
        title: 'Homogeneous Dtype',
        description: 'Every element occupies the exact same number of bytes (e.g. `np.float64` = 8 bytes), allowing direct memory offset computation: `Address = Base + (index * byte_size)`.',
      },
      {
        title: 'Strides & Reshaping',
        description: 'Shape and strides define how a 1D contiguous memory chunk is viewed as a 2D matrix or 3D tensor without moving a single byte.',
      },
      {
        title: 'Vectorization (No Python Loops)',
        description: 'Mathematical operations (+, -, *, dot product) are delegated directly to compiled C/Fortran SIMD vector instructions.',
      },
    ],
  },
  interactiveType: 'numpy-benchmark',
  technicalExplanation: {
    title: 'Broadcasting Rules & Slicing Views',
    deepDive:
      'Broadcasting allows arithmetic between arrays of different shapes. NumPy compares dimensions element-wise from right to left (trailing dimensions first). Two dimensions are compatible if: (1) they are equal, or (2) one of them is 1. If a dimension is 1, NumPy stretches it conceptually without duplicating memory.',
    bulletPoints: [
      'Array Creation: `np.zeros((3, 3))`, `np.ones((2, 4))`, `np.arange(0, 10, 2)`, `np.linspace(0, 1, 5)`.',
      '2D Slicing: `matrix[row_start:row_end, col_start:col_end]`. Example: `matrix[0:2, 1:3]` extracts top-right 2x2 subgrid.',
      'Slices are VIEWS, not copies: Modifying a slice of a NumPy array modifies the original parent array in place!',
      'To make an independent copy, explicitly call `.copy()`: `sub_matrix = matrix[0:2, :].copy()`.',
    ],
  },
  codeExamples: [
    {
      title: 'NumPy Vectorization, Matrix Slicing & Broadcasting in Action',
      description: 'See the power of vector math, 2D matrix slicing, and broadcasting rules.',
      language: 'python',
      code: `import numpy as np

# 1. Create a 2D Matrix (3 rows x 4 columns)
matrix = np.array([
    [10, 20, 30, 40],
    [50, 60, 70, 80],
    [90, 100, 110, 120]
], dtype=np.float64)

print("Matrix shape:", matrix.shape)  # (3, 4)
print("Data type:", matrix.dtype)      # float64

# 2. 2D Slicing (Rows 0 to 2, Columns 1 to 3)
sub_grid = matrix[0:2, 1:3]
print("Sub-grid (Rows 0-1, Cols 1-2):\n", sub_grid)
# [[20., 30.],
#  [60., 70.]]

# 3. Broadcasting (Add 1D vector of length 4 to each of the 3 rows)
row_adjustment = np.array([1.0, 2.0, 3.0, 4.0])  # Shape (4,)
adjusted_matrix = matrix + row_adjustment          # Automatically broadcasts to (3, 4)
print("Broadcasted adjusted matrix:\n", adjusted_matrix)

# 4. Vectorized Mathematical Reduction
col_means = np.mean(matrix, axis=0)  # Mean down columns (dim 0)
row_sums = np.sum(matrix, axis=1)   # Sum across rows (dim 1)
print("Column Means:", col_means)
print("Row Sums:", row_sums)`,
      lineExplanations: [
        { line: 4, text: 'Contiguous 2D array allocated in row-major (C-order) contiguous memory.' },
        { line: 12, text: '2D slice uses comma separator: row slice on left, column slice on right.' },
        { line: 18, text: 'Broadcasting stretches the (4,) vector across all 3 rows with zero memory duplication.' },
        { line: 22, text: 'axis=0 collapses rows to compute column-wise statistics in single C call.' },
      ],
      output: 'Matrix shape: (3, 4)\nSub-grid (Rows 0-1, Cols 1-2):\n [[20. 30.]\n [60. 70.]]\nColumn Means: [50. 60. 70. 80.]\nRow Sums: [100. 260. 420.]',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Writing `for i in range(len(arr)): arr[i] = arr[i] * 2` on NumPy arrays',
      why: 'Iterating over a NumPy array with a Python loop negates all performance benefits by dropping back into the slow Python bytecode interpreter on every iteration.',
      correction: 'Use vectorized operations directly: `arr = arr * 2` or `arr *= 2`.',
    },
    {
      mistake: 'Forgetting that NumPy slicing returns a VIEW instead of a copy',
      why: 'If you write `sub = arr[0:5]` and then `sub[0] = 999`, the original array `arr[0]` is also modified to 999!',
      correction: 'If you want an isolated array, always use `.copy()`: `sub = arr[0:5].copy()`.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'How do I choose the correct `axis` parameter when aggregating (e.g. `np.mean(arr, axis=?)`)?',
      context: 'Computing summary statistics on 2D matrices and tabular datasets.',
      reasoning: 'Think of `axis` as the dimension that will be collapsed. In a 2D matrix (rows, columns), `axis=0` collapses the rows (leaving one result per column). `axis=1` collapses the columns (leaving one result per row).',
      ruleOfThumb: 'axis=0 = collapse rows (vertical summary); axis=1 = collapse columns (horizontal summary).',
    },
  ],
  quiz: [
    {
      id: 'q1-7-1',
      question: 'Given a 2D NumPy array `arr = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])`, what does `arr[:, 1]` return?',
      options: [
        'The second row: `[40, 50, 60]`',
        'The second column: `[20, 50, 80]`',
        'The first row: `[10, 20, 30]`',
        'A single number: `50`',
      ],
      correctIndex: 1,
      explanation: 'The colon `:` selects all rows, while `1` selects column index 1 (the second column), returning the vector `[20, 50, 80]`.',
    },
    {
      id: 'q1-7-2',
      question: 'Can an array of shape `(4, 3)` be added to an array of shape `(3,)` using NumPy broadcasting?',
      options: [
        'Yes, because the trailing dimension 3 matches',
        'No, the shapes must be strictly identical',
        'Yes, but only if both arrays contain integers',
        'No, it raises a ShapeMismatchError',
      ],
      correctIndex: 0,
      explanation: 'NumPy broadcasting matches trailing dimensions right-to-left. The trailing dimension of both is 3, so the (3,) array is broadcast across the 4 rows.',
    },
  ],
  summary: {
    takeaways: [
      'NumPy `ndarray` stores homogeneous data in contiguous memory buffers for blazing SIMD math.',
      'Always vectorize operations instead of writing manual Python `for` loops.',
      'Slices are views into the original memory; use `.copy()` when isolating data.',
      'Broadcasting aligns and stretches compatible dimensions without duplicating memory.',
    ],
    nextUpText: 'Module 1 Complete! Module 2: Data Collection & Preprocessing Unlocked',
  },
  prevTopic: {
    slug: 'introduction-to-jupyter-notebook',
    title: 'Introduction to Jupyter Notebook',
  },
};
