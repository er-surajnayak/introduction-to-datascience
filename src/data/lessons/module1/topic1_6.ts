import { LessonContent } from '@/types/lesson';

export const topic1_6: LessonContent = {
  id: 'm1-t6',
  topicNumber: '1.6',
  slug: 'introduction-to-jupyter-notebook',
  moduleId: 'module-1',
  title: 'Introduction to Jupyter Notebook',
  subtitle: 'The Interactive Computing Paradigm: Kernels, Execution State & Magic Commands',
  estimatedMinutes: 25,
  difficulty: 'Beginner',
  tags: ['Jupyter', 'Notebooks', 'Kernel State', 'Magic Commands', 'REPL'],
  objectives: [
    'Understand the client-kernel client/server architecture powering Jupyter Notebooks.',
    'Deconstruct the JSON `.ipynb` format that stores code, rich HTML visual outputs, and Markdown.',
    'Identify the "Hidden State Trap": why out-of-order cell execution causes non-reproducible research.',
    'Leverage powerful IPython Magic Commands (`%timeit`, `%%time`, `%matplotlib inline`, `%who`).',
  ],
  hook: {
    title: 'The Scientist’s Computational Laboratory Notebook',
    story:
      'For 400 years, experimental scientists recorded observations in leather-bound laboratory notebooks: sketches, formulas, hypotheses, and recorded measurements side-by-side. Traditional Python scripts (`.py` files) execute top-to-bottom and wipe memory on termination. Jupyter (Julia, Python, R) merges code, live computation, mathematical LaTeX equations, interactive charts, and explanatory text into a single living document.',
    analogy:
      'A `.py` script is like a finished recorded movie. A Jupyter Notebook is a live rehearsal where you can pause time, inspect any actor, rewrite line 4, and re-run only that scene without restarting the play.',
    realWorldImpact:
      'Jupyter is the primary prototyping environment used at Google, Netflix, NASA, and top universities for exploratory data research and model experimentation.',
  },
  coreConcept: {
    headline: 'The Decoupled Kernel & Cell Execution Model',
    explanation:
      'Jupyter runs as a two-process architecture: a web browser user interface and a background Python computational engine called the Kernel. The browser sends code cells over ZeroMQ sockets to the Kernel, which evaluates them in persistent memory and sends back rich representations.',
    keyPillars: [
      {
        title: 'Persistent Kernel State',
        description: 'Variables defined in Cell 1 remain stored in the Kernel’s RAM when you run Cell 2, 3, or 10.',
      },
      {
        title: 'Cell Types (Code & Markdown)',
        description: 'Code cells execute Python and display outputs directly beneath; Markdown cells render formatted text, tables, and LaTeX math.',
      },
      {
        title: 'Execution Counter `In [N]`',
        description: 'The number `N` inside `In [N]` records the exact chronological sequence in which cells were run by the kernel.',
      },
    ],
  },
  interactiveType: 'jupyter-runner',
  technicalExplanation: {
    title: 'IPython Magic Commands & The Kernel Trap',
    deepDive:
      'IPython provides special macro commands prefixed with `%` (line magics, operating on a single line) and `%%` (cell magics, operating on the entire multi-line block). The most dangerous rookie mistake in Jupyter is executing cells out of order, creating invisible state that breaks when the notebook is run from scratch.',
    bulletPoints: [
      '`%timeit statement` runs a statement 100,000 times to compute statistically rigorous CPU benchmark averages.',
      '`%%time` measures the exact wall-clock and CPU execution time of an entire cell.',
      '`%who` or `%whos` lists all active variables currently held in the Kernel’s memory namespace.',
      'Golden Rule of Notebooks: Before submitting or committing, always test: `Kernel → Restart & Run All`.',
    ],
  },
  codeExamples: [
    {
      title: 'Benchmarking Vector Operations with %timeit Magic',
      description: 'See how Jupyter magic commands allow instantaneous performance benchmarking.',
      language: 'python',
      code: `# In [1]:
import numpy as np

# In [2]: Benchmark Python List vs NumPy Array
%timeit sum([i**2 for i in range(10000)])
# Output: 2.85 ms ± 45.2 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)

# In [3]: Vectorized NumPy Benchmark
arr = np.arange(10000)
%timeit np.sum(arr ** 2)
# Output: 9.42 µs ± 112 ns per loop (mean ± std. dev. of 7 runs, 100000 loops each)
# -> NumPy is 302x faster!

# In [4]: Inspect active memory
%whos`,
      lineExplanations: [
        { line: 5, text: '%timeit runs the list comprehension across multiple loops to calculate precise mean execution duration.' },
        { line: 10, text: 'NumPy vectorized power and sum executes in single-digit microseconds via SIMD instructions.' },
        { line: 15, text: '%whos outputs variable names, types, and RAM footprints currently in Kernel memory.' },
      ],
      output: 'np.sum(arr ** 2) -> 9.42 µs (302x speedup over pure Python list)',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Committing a notebook with out-of-order execution numbers (e.g. In [15], In [2], In [8])',
      why: 'When another engineer opens your notebook and runs it top-to-bottom, variables defined in lower cells will fail with `NameError` because you ran them in a different manual sequence.',
      correction: 'Always run `Restart Kernel and Run All Cells` before sharing or committing `.ipynb` files.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'When should I use a Jupyter Notebook vs a Python `.py` file?',
      context: 'Organizing a data science project repository.',
      reasoning: 'Use Jupyter Notebooks for exploratory data analysis (EDA), data visualization, reporting, and model experimentation. When code stabilizes into reusable functions and classes, refactor it into modular `.py` files inside a `src/` directory.',
      ruleOfThumb: 'Notebooks for exploration & stories; `.py` scripts for production pipelines & packages.',
    },
  ],
  quiz: [
    {
      id: 'q1-6-1',
      question: 'What does the number 7 indicate in the prompt `In [7]:` next to a Jupyter notebook cell?',
      options: [
        'It is the 7th line of code in the cell',
        'It is the 7th cell physically located from the top of the notebook',
        'It is the 7th cell executed by the active kernel session',
        'It took 7 milliseconds to execute',
      ],
      correctIndex: 2,
      explanation: 'The execution counter `In [N]` tracks the chronological order of execution. If you re-run the same cell, its counter will increment.',
    },
    {
      id: 'q1-6-2',
      question: 'Which IPython magic command measures the execution time of an entire multi-line code cell?',
      options: ['`%timeit`', '`%%time`', '`%benchmark`', '`%%profile`'],
      correctIndex: 1,
      explanation: 'Double percent `%%time` is a cell magic that measures the wall-clock and CPU time of the entire cell contents.',
    },
  ],
  summary: {
    takeaways: [
      'Jupyter decouples the browser frontend from a persistent background Python Kernel.',
      'Always test reproducibility with "Restart Kernel & Run All Cells".',
      'Use `%timeit` to benchmark algorithmic complexity and `%whos` to inspect active memory.',
    ],
    nextUpText: 'Topic 1.7: NumPy Basics & Vectorization',
  },
  prevTopic: {
    slug: 'functions-and-modularity',
    title: 'Functions & Modularity',
  },
  nextTopic: {
    slug: 'numpy-basics-and-vectorization',
    title: 'NumPy Basics & Vectorization',
  },
};
