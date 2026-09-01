import { LessonContent } from '@/types/lesson';

export const topic1_6: LessonContent = {
  id: 'm1-t6',
  topicNumber: '1.6',
  slug: 'introduction-to-jupyter-notebook',
  moduleId: 'module-1',
  title: 'Introduction to Jupyter Notebook',
  subtitle: 'Interactive Computing, Computational Kernels, Markdown & Reproducible Data Science',
  estimatedMinutes: 25,
  difficulty: 'Beginner',
  tags: ['Jupyter', 'Notebooks', 'Kernel State', 'Markdown', 'Reproducibility', 'Data Science Workflow'],
  objectives: [
    'Understand what a Jupyter Notebook is and why Data Scientists choose it over standard scripts.',
    'Master the two fundamental cell types: Code cells for execution and Markdown cells for documentation.',
    'Understand the interactive execution model: how the browser UI communicates with the background computational Kernel.',
    'Dismantle the "Hidden State Trap": why cell execution order matters and how out-of-order execution breaks notebooks.',
    'Learn how variables persist across cells in Kernel memory and how "Restart Kernel & Run All" ensures reproducibility.',
    'Design clean, structured Data Science notebooks that tell an end-to-end analytical story from question to insight.',
  ],
  hook: {
    title: 'Imagine Your Python Code Had a Laboratory Notebook',
    story:
      'For centuries, experimental scientists kept physical lab notebooks. On the left page, they wrote their hypothesis and experimental setup; on the right page, they recorded sensor measurements, sketched graphs, and documented their conclusions. Traditional software programming was isolated from this: you wrote Python code in one file, ran it in a dark terminal, and copied numbers into a spreadsheet to make a chart. Jupyter (Julia, Python, R) changes this forever by uniting executable code, live mathematical outputs, interactive charts, and rich narrative prose into a single living computational document.',
    analogy:
      'A traditional Python script (.py file) is like a pre-recorded movie: you press play and it runs straight through from start to finish. A Jupyter Notebook is like an interactive chemistry lab bench: you can mix chemicals in beaker 1, inspect the temperature in beaker 2, pause time, tweak the formula, and re-run only that specific step without restarting the whole experiment.',
    realWorldImpact:
      'From analyzing petabytes of genomic data at NASA and CERN to building recommendation algorithms at Netflix and Spotify, Jupyter Notebooks are the undisputed standard environment for exploratory data science, machine learning research, and analytical storytelling.',
  },
  coreConcept: {
    headline: 'Where Code, Explanation, Visuals & Insight Live Together',
    explanation:
      'A Jupyter Notebook is not just a code editor—it is an interactive computing environment. A notebook document (.ipynb file) consists of an ordered sequence of cells. Code cells send instructions to an underlying computational process called the Kernel, which evaluates the code, remembers created variables in RAM, and sends rich outputs (tables, numbers, charts, error logs) directly back to display underneath the cell.',
    keyPillars: [
      {
        title: 'The Notebook Interface vs The Kernel Engine',
        description:
          'The Notebook is the visual document in your browser where you write text and code. The Kernel is the background Python process that actually executes the code and stores your variables in memory.',
      },
      {
        title: 'Two Essential Cell Types: Code & Markdown',
        description:
          'Code cells execute live Python statements and produce immediate results. Markdown cells render formatted text, headings, bullet lists, mathematical equations, and analytical observations.',
      },
      {
        title: 'Chronological Execution Counter: In [N]',
        description:
          'The prompt In [N] records the exact chronological sequence in which cells were sent to the Kernel. In [1] ran first, In [2] second, and so on—regardless of where the cells are physically placed on the screen.',
      },
      {
        title: 'Persistent Kernel Memory Namespace',
        description:
          'Variables created in Cell 1 stay alive in the Kernel memory. Any cell you execute later can access, modify, or compute with those same variables.',
      },
    ],
  },
  interactiveType: 'jupyter-runner',
  technicalExplanation: {
    title: 'The Decoupled Architecture & The Execution Order Dilemma',
    deepDive:
      'Understanding how Jupyter works under the hood makes you immune to the common traps that confuse beginners. The notebook operates as a client-server system. When you press Shift + Enter inside a code cell, the browser packages your text and sends it via WebSockets to the Kernel process. The Kernel compiles the Python bytecode, updates its internal symbol table (global namespace), and sends back output streams (stdout, stderr, display data).\n\nBecause you can click and run cells in any arbitrary order, the visual order of cells on your screen can differ completely from the chronological order inside the Kernel memory. If you define a variable in Cell 3, run it, and then go up to Cell 1 and run code that uses that variable, it will work in your current session—but when a colleague opens your notebook and runs top-to-bottom, Cell 1 will crash with a NameError! That is why the golden rule of notebook engineering is "Restart Kernel and Run All".',
    bulletPoints: [
      'The Kernel maintains state: Variables, imported libraries, and defined functions stay loaded until you restart the Kernel.',
      'Execution counter In [ ]: Empty brackets mean the cell has never been run; In [*] means the cell is currently computing; In [5] means it was the 5th execution.',
      'Markdown supports formatting: # Header 1, ## Header 2, **bold**, *italic*, `code`, and bulleted lists for clean narrative explanations.',
      'Last expression auto-display: In a Jupyter code cell, the result of the final line is automatically printed without needing an explicit print() call.',
      'Restarting clears everything: Restarting the Kernel is like wiping a whiteboard clean—all variable names and imported modules vanish from RAM.',
    ],
  },
  codeExamples: [
    {
      title: 'A Clean 4-Cell Data Science Notebook Pipeline',
      description: 'See how Markdown and Code cells intertwine to build an end-to-end analytical report.',
      language: 'python',
      code: `# Cell 1 [Markdown]:
# # 📊 Student Examination Performance Analysis
# In this notebook, we calculate summary statistics and performance benchmarks for DS-201 students.

# Cell 2 [Code] - In [1]:
marks = [78, 85, 92, 67, 74, 88, 95, 61, 83, 79]
total_students = len(marks)
print(f"Loaded records for {total_students} students.")

# Cell 3 [Code] - In [2]:
average_score = sum(marks) / total_students
highest_score = max(marks)
lowest_score = min(marks)

# Auto-displaying summary tuple (last expression in cell):
(average_score, highest_score, lowest_score)
# Output: (78.2, 95, 61)

# Cell 4 [Markdown]:
# ## 💡 Key Observations
# - The class average stands at **78.2%**, indicating strong overall comprehension.
# - The score spread ranges from a low of **61%** to a peak of **95%**.`,
      lineExplanations: [
        { line: 1, text: 'Markdown cell establishing the title and objective before any code is run.' },
        { line: 6, text: 'Cell In [1] defines the dataset and stores marks in persistent Kernel memory.' },
        { line: 11, text: 'Cell In [2] reuses marks from Cell 1 to calculate mean, maximum, and minimum scores.' },
        { line: 17, text: 'In Jupyter, the last evaluated expression is automatically rendered in the output box.' },
        { line: 20, text: 'Markdown cell closing the analysis with structured insights and recommendations.' },
      ],
      output: 'Loaded records for 10 students.\n(78.2, 95, 61)',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Running cells out of order and trusting invisible memory state',
      why: 'If you execute Cell 3, then Cell 1, then Cell 2, the Kernel state reflects your clicking sequence, not the page order. When someone else opens the notebook and runs top-to-bottom, it fails with NameError or produces incorrect results.',
      correction: 'Always design notebooks to run strictly from top to bottom. Before finishing, select "Kernel → Restart & Run All" to prove reproducibility.',
    },
    {
      mistake: 'Forgetting that deleting a cell does NOT delete its variable from Kernel RAM',
      why: 'If you define x = 50 in a cell, run it, and then delete the cell from your notebook, the variable x STILL lives inside the Kernel memory. You might write code that relies on x without realizing the cell that created it is gone.',
      correction: 'Restart the Kernel whenever you delete or heavily reorganize code cells.',
    },
    {
      mistake: 'Using code cells for long narrative explanations (or Markdown cells for code)',
      why: 'Writing long paragraphs in code cells requires prefixing every line with # comments, which looks messy and unrendered. Putting code in Markdown cells prevents it from executing.',
      correction: 'Use Markdown cells (M shortcut) for rich headers, paragraphs, and lists. Use Code cells (Y shortcut) exclusively for runnable Python logic.',
    },
    {
      mistake: 'Running the same accumulator cell multiple times (e.g. total += 10)',
      why: 'If a cell contains total = total + 10 and you press Shift + Enter 4 times, total increases by 40 because the cell runs against existing Kernel state every time.',
      correction: 'Make cells idempotent where possible (assigning fresh calculations rather than mutating state repeatedly).',
    },
    {
      mistake: 'Leaving messy scratchpad cells scattered across a project notebook',
      why: 'Experimental cells left midway through a notebook confuse reviewers and clutter the analytical story.',
      correction: 'Clean up temporary exploratory cells before sharing. Keep notebooks structured: Question → Data → Code → Chart → Insight.',
    },
    {
      mistake: 'Not distinguishing between In [ ] (not run), In [*] (busy), and In [N] (completed)',
      why: 'Attempting to run downstream cells while an upstream cell is still In [*] (processing) can lead to race conditions or unexpected outputs.',
      correction: 'Look at the left margin: wait for In [*] to become a numbered In [N] before interpreting downstream results.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'When should I use a Jupyter Notebook vs a standalone Python (.py) script?',
      context: 'Choosing the right tool for a Data Science task.',
      reasoning:
        'Use Jupyter Notebooks for exploratory data analysis (EDA), data cleaning, hypothesis testing, plotting graphs, and sharing presentations with stakeholders. When logic stabilizes into production-ready pipelines or reusable libraries, refactor it into clean .py module files.',
      ruleOfThumb: 'Notebooks for exploration & storytelling; .py files for automated production pipelines.',
    },
    {
      question: 'How should I structure a professional Data Science notebook?',
      context: 'Organizing an end-to-end data investigation.',
      reasoning:
        'A great notebook follows the 8-stage storytelling flow: 1. Objective Header (Markdown) → 2. Imports & Configuration → 3. Load & Inspect Raw Data → 4. Data Cleaning → 5. Exploratory Computations → 6. Visualizations → 7. Statistical Findings → 8. Business Decision / Conclusion.',
      ruleOfThumb: 'Every code block should have a purpose, and every output should have an observation.',
    },
  ],
  quiz: [
    {
      id: 'q1-6-1',
      question: 'What is the primary role of the computational Kernel in Jupyter?',
      options: [
        'It formats Markdown text into HTML',
        'It is the background engine that executes Python code and maintains variable memory',
        'It is the browser user interface where cells are typed',
        'It automatically exports the notebook to PDF',
      ],
      correctIndex: 1,
      explanation:
        'The Kernel is the backend process (e.g. ipykernel) that evaluates code cells, allocates memory, stores variables, and returns computed results.',
    },
    {
      id: 'q1-6-2',
      question: 'What does the prompt In [*] signify next to a code cell?',
      options: [
        'The cell contains a syntax error',
        'The cell is currently executing in the Kernel',
        'The cell has been permanently deleted',
        'The cell is a Markdown cell',
      ],
      correctIndex: 1,
      explanation:
        'An asterisk In [*] indicates that the Kernel is actively computing the code in that cell.',
    },
    {
      id: 'q1-6-3',
      question: 'What happens when you select "Restart Kernel"?',
      options: [
        'All your code and text cells are deleted from the file',
        'The Kernel memory is wiped clean, removing all active variables and imports from RAM',
        'The notebook is automatically converted into a .py script',
        'The browser tab closes permanently',
      ],
      correctIndex: 1,
      explanation:
        'Restarting the Kernel resets the computational state to empty, exactly like wiping a laboratory whiteboard clean. Your code on screen remains intact.',
    },
    {
      id: 'q1-6-4',
      question: 'Why might a notebook cell crash with a NameError even if the variable is visibly defined in a cell above it?',
      options: [
        'Jupyter does not support variable sharing between cells',
        'The cell above was never actually executed in the current Kernel session',
        'Markdown cells disable code variables',
        'Variable names cannot exceed 4 characters in Jupyter',
      ],
      correctIndex: 1,
      explanation:
        'Code on the screen does not exist in memory until its cell is executed. If you open a notebook and jump straight to Cell 2 without running Cell 1, the variable does not exist in the Kernel.',
    },
    {
      id: 'q1-6-5',
      question: 'Which cell type is designed for narrative explanations, formatted headings, and bullet points?',
      options: ['Raw NBConvert Cell', 'Code Cell', 'Markdown Cell', 'Kernel Cell'],
      correctIndex: 2,
      explanation:
        'Markdown cells render rich text, headers (#), bold (**), math equations, tables, and notes.',
    },
    {
      id: 'q1-6-6',
      question: 'What does the execution counter In [7] tell you about a cell?',
      options: [
        'It is the 7th cell from the top of the document',
        'It took 7 seconds to finish computing',
        'It was the 7th cell execution performed by the active Kernel',
        'It contains 7 lines of Python code',
      ],
      correctIndex: 2,
      explanation:
        'The execution counter tracks chronological order. If you run the same cell 3 times, its counter increments on every run.',
    },
    {
      id: 'q1-6-7',
      question: 'Why is "Restart Kernel & Run All" considered the gold standard before submitting or sharing a notebook?',
      options: [
        'It compresses the file size of the notebook',
        'It verifies that the notebook executes reproducibly from top to bottom without hidden state dependencies',
        'It converts all Markdown cells into Python code',
        'It encrypts the notebook with a password',
      ],
      correctIndex: 1,
      explanation:
        '"Restart & Run All" ensures that another student, colleague, or automated grading system can run your entire notebook from start to finish without errors.',
    },
    {
      id: 'q1-6-8',
      question: 'If you delete a cell containing `x = 100` that was already executed, what is the value of `x` in the Kernel?',
      options: [
        '`None`',
        '`x` is immediately deleted from memory',
        '`100` remains stored in Kernel memory until the Kernel is restarted',
        'An error is raised immediately',
      ],
      correctIndex: 2,
      explanation:
        'Deleting a cell in the UI does NOT alter the Kernel RAM. The variable remains alive until the Kernel is restarted or overwritten.',
    },
    {
      id: 'q1-6-9',
      question: 'In Jupyter, what happens to the value of the last line of a code cell if it is an expression like `average_score`?',
      options: [
        'It is discarded silently unless you wrap it in print()',
        'It is automatically displayed in the cell output area',
        'It raises a SyntaxError',
        'It causes the Kernel to halt',
      ],
      correctIndex: 1,
      explanation:
        'Jupyter automatically renders the value of the last evaluated expression directly into the output block below the cell.',
    },
    {
      id: 'q1-6-10',
      question: 'Which sequence reflects the standard Data Science notebook workflow?',
      options: [
        'Deploy Model → Delete Data → Document → Restart',
        'Define Question → Load Data → Clean & Explore → Visualize → Document Insight',
        'Write Charts → Write Code → Guess Question → Run All',
        'Restart Kernel → Close Tab → Write Script → Format',
      ],
      correctIndex: 1,
      explanation:
        'Professional data science notebooks progress logically: Question → Data Ingestion → Cleaning & EDA → Visualizations → Business Insights.',
    },
  ],
  summary: {
    takeaways: [
      'Jupyter combines code, output, mathematical visualization, and narrative text in one interactive workspace.',
      'Code cells execute Python; Markdown cells document the analytical story.',
      'The background Kernel evaluates code and stores persistent variable state in RAM.',
      'Notebook execution order depends on your click sequence, not visual screen placement.',
      'Always verify reproducibility with "Kernel → Restart & Run All" before sharing.',
      'Jupyter is the essential foundation for upcoming NumPy and Pandas data analysis!',
    ],
    nextUpText: 'Topic 1.7: NumPy Basics & Vectorization (Fast Numerical Computation)',
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
