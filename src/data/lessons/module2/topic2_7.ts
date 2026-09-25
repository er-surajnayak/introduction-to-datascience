import { LessonContent } from '@/types/lesson';

export const topic2_7: LessonContent = {
  id: 'm2-t7',
  topicNumber: '2.7',
  slug: 'numpy-and-pandas-operations',
  moduleId: 'module-2',
  title: 'NumPy and Pandas Operations',
  subtitle: 'Manipulating, Filtering, Grouping, Aggregating, and Merging Structured Analytical Data',
  estimatedMinutes: 50,
  difficulty: 'Intermediate',
  tags: [
    'NumPy',
    'Pandas',
    'ndarray',
    'Series',
    'DataFrame',
    'Vectorization',
    'Axis (0 & 1)',
    'Reshape',
    'Inspection (head/info/describe)',
    'loc vs iloc',
    'Boolean Masks',
    'Multi-Condition Filtering',
    'Sorting',
    'Feature Engineering',
    'np.where()',
    'apply()',
    'GroupBy (Split-Apply-Combine)',
    'value_counts() / nunique()',
    'pd.merge()',
    'pd.concat()',
    'Data Pipelines',
  ],
  objectives: [
    'Understand the distinct roles of NumPy (fast multidimensional numerical computing) and Pandas (labeled 2D tabular manipulation).',
    'Perform element-by-element vectorized arithmetic on NumPy ndarrays without writing manual Python loops.',
    'Master the concept of axis in 2D arrays: axis=0 operates down rows (per column), and axis=1 operates across columns (per row).',
    'Inspect Pandas DataFrames using .head(), .tail(), .shape, .columns, .dtypes, .info(), and .describe().',
    'Differentiate between label-based indexing (.loc) and integer position-based indexing (.iloc).',
    'Construct single and compound Boolean masks using bitwise operators (&, |, ~) with explicit parentheses.',
    'Sort DataFrames by single and multiple columns in ascending or descending order.',
    'Engineer new computed and conditional columns using direct arithmetic and np.where() logic.',
    'Understand the split-apply-combine mental model behind df.groupby() and perform multi-metric aggregations.',
    'Differentiate between .value_counts() (frequency distribution), .unique() (distinct elements), and .nunique() (distinct count).',
    'Combine relational tables using key-matching joins (pd.merge()) versus axis stacking (pd.concat()).',
    'Bridge Pandas Series and NumPy arrays using .to_numpy() for specialized numerical routines.',
    'Construct end-to-end data processing pipelines transitioning raw data into actionable insights for Module 3 (EDA).',
  ],
  hook: {
    title: 'From Clean Cells to Live Analytical Intelligence',
    story:
      'Imagine you run the academic analytics division for an engineering university with 5,000 enrolled students. In Topics 2.1 to 2.3, you gathered data from portal APIs and database tables. In Topics 2.4 to 2.6, you imputed missing marks, investigated outlier attendance records, and standardized student names and date formats. Your dataset is pristine and error-free—but right now, it is just a static grid of text and numbers. The Dean walks in and asks: "Which departments in Mumbai have an average exam score above 85 among students with at least 80% attendance, and how does that compare to Pune?" Without high-performance manipulation tools, you would be writing hundreds of nested loops and dictionary accumulators. With NumPy and Pandas, you answer that complex question in two lines of clean, expressive code.',
    analogy:
      'Think of clean raw data like freshly quarried, perfectly cut granite stones. Having clean stones is essential, but they are not yet a bridge or a temple. NumPy and Pandas are the precision cranes, laser-guided cutters, and architectural scaffolding that allow you to assemble, shape, slice, and join those stones into a magnificent analytical structure.',
    realWorldImpact:
      'High-frequency trading firms, weather forecasting centers, and recommendation systems at Netflix and Spotify process billions of rows every hour. They rely on vectorized array memory and Pandas relational operations to filter anomalies, compute moving aggregates, and merge customer behavior streams in real time.',
  },
  coreConcept: {
    headline: 'The Data Transformation Life Cycle: Inspect ➔ Select ➔ Filter ➔ Transform ➔ Group ➔ Aggregate ➔ Combine ➔ Insight',
    explanation:
      'Data analysis is not a random collection of syntax tricks; it is a structured, disciplined pipeline. We begin by inspecting shape and data types, slice relevant subsets, filter observations with Boolean logic, transform features, group records into analytical cohorts, compute summary statistics, and merge auxiliary datasets to uncover hidden truth.',
    keyPillars: [
      {
        title: '1. Vectorized Numerical Computing (NumPy)',
        description:
          'Homogeneous contiguous memory buffers allowing instant C-speed arithmetic (e.g. marks + 5) across millions of elements simultaneously without Python loop overhead.',
      },
      {
        title: '2. Tabular Indexing & Filtering (Pandas)',
        description:
          'Two-dimensional labeled DataFrames providing dual access routes: label-based indexing (.loc) and positional indexing (.iloc), combined with declarative Boolean filtering.',
      },
      {
        title: '3. Split-Apply-Combine (GroupBy)',
        description:
          'Breaking datasets into logical categories (e.g. City, Department), computing localized statistics (mean, sum, count), and reassembling them into aggregated summaries.',
      },
      {
        title: '4. Relational Data Merging & Pipelines',
        description:
          'Fusing disparate tables using shared primary/foreign keys (pd.merge) or stacking batches (pd.concat) to produce analysis-ready datasets for Exploratory Data Analysis.',
      },
    ],
  },
  interactiveType: 'operations-lab',
  technicalExplanation: {
    title: 'Under the Hood: Vectorization, Dimensional Axes, and Relational Relays',
    deepDive:
      'NumPy arrays (ndarrays) store elements of a single data type in contiguous memory blocks (strided memory buffers). When an operation like `arr * 2` is invoked, NumPy delegates computation directly to precompiled C/Fortran SIMD (Single Instruction, Multiple Data) CPU vector registers. Pandas builds directly on top of NumPy arrays by attaching row Index objects and column labels. A Pandas DataFrame is essentially an aligned dictionary of 1D Pandas Series, where each Series wraps a 1D NumPy array or ExtensionArray. \n\nUnderstanding `axis` is foundational for 2D operations: `axis=0` operates along the row dimension (collapsing rows to yield one aggregate per column), while `axis=1` operates along the column dimension (collapsing columns to yield one aggregate per row). In relational operations, `pd.merge()` implements relational algebra equijoins using hash tables on key columns with $O(N + M)$ average time complexity, while `pd.concat()` performs array reallocation along the requested axis.',
    bulletPoints: [
      'NumPy ndarray: Homogeneous data type, fixed dimensions, contiguous memory allocation, vectorized broadcasting.',
      'Pandas Series: 1D labeled array wrapping a NumPy array; possesses index labels and dtype.',
      'Pandas DataFrame: 2D table composed of aligned Series columns sharing a common row Index.',
      'Axis Convention: axis=0 aggregates down rows (returns 1 value per column); axis=1 aggregates across columns (returns 1 value per row).',
      'Boolean Masking: Evaluating df[condition] creates a boolean Series; indexing df[mask] filters out all rows where mask == False.',
      'Bitwise Logic: Use & (AND), | (OR), and ~ (NOT) with explicit parentheses around each comparison clause.',
      'Indexing Rules: df.loc[row_label, col_label] searches by label names; df.iloc[row_idx, col_idx] searches by zero-based integer offsets.',
      'GroupBy Lifecycle: 1. Split (partition by unique keys) ➔ 2. Apply (calculate metric like .mean()) ➔ 3. Combine (rebuild compact DataFrame).',
      'Merge vs Concat: Merge joins tables horizontally on matching key values; Concat stacks DataFrames vertically or horizontally along an axis.',
    ],
    equations: [
      '\\text{Vectorized Addition: } \\vec{Y} = \\vec{X} + c \\implies Y_i = X_i + c \\quad \\forall i \\in [0, N-1]',
      '\\text{Column Mean (axis=0): } \\mu_j = \\frac{1}{R} \\sum_{i=1}^{R} X_{i,j}',
      '\\text{Row Mean (axis=1): } \\mu_i = \\frac{1}{C} \\sum_{j=1}^{C} X_{i,j}',
      '\\text{Boolean Filter: } \\mathcal{D}_{\\text{filtered}} = \\{ r_i \\in \\mathcal{D} \\mid \\text{cond}(r_i) = \\text{True} \\}',
      '\\text{GroupBy Aggregation: } \\bar{x}_k = \\frac{1}{|G_k|} \\sum_{i \\in G_k} x_i \\quad \\text{where } G_k = \\{i \\mid \\text{key}(i) = k\\}',
    ],
  },
  codeExamples: [
    {
      title: 'NumPy Vectorization, Slicing & Axis Aggregations',
      description: 'Demonstrating array creation, vectorized math, 2D reshaping, and row vs column axis reductions.',
      language: 'python',
      code: `import numpy as np

# 1. Create 1D array of student marks
marks = np.array([78, 85, 92, 67, 74])
print("Original Marks:", marks)

# 2. Vectorized arithmetic (applied elementwise at C-speed)
curved_marks = marks + 5
print("Curved Marks (+5):", curved_marks)

# 3. Aggregation metrics
print(f"Mean: {np.mean(curved_marks):.2f}, Max: {np.max(curved_marks)}, Std: {np.std(curved_marks):.2f}")

# 4. 2D Array: 3 students across 3 subjects
scores_2d = np.array([
    [80, 85, 90],  # Student 0 (Math, Physics, Chem)
    [70, 75, 80],  # Student 1
    [90, 95, 100]  # Student 2
])

# axis=0: down rows -> subject averages (per column)
subject_means = np.mean(scores_2d, axis=0)
print("Subject Averages (axis=0):", subject_means)

# axis=1: across columns -> student averages (per row)
student_means = np.mean(scores_2d, axis=1)
print("Student Averages (axis=1):", student_means)`,
      lineExplanations: [
        { line: 4, text: 'Instantiates a 1D contiguous NumPy ndarray with int64 data type.' },
        { line: 8, text: 'Vectorized addition: broadcasts scalar 5 to all 5 elements simultaneously.' },
        { line: 12, text: 'Computes statistical summaries across all elements in the flattened array.' },
        { line: 15, text: 'Creates a 2D matrix with shape (3, 3) representing 3 students and 3 subjects.' },
        { line: 22, text: 'axis=0 collapses the vertical row dimension to output 3 column means.' },
        { line: 26, text: 'axis=1 collapses the horizontal column dimension to output 3 student means.' },
      ],
      output: `Original Marks: [78 85 92 67 74]
Curved Marks (+5): [83 90 97 72 79]
Mean: 84.20, Max: 97, Std: 9.04
Subject Averages (axis=0): [80. 85. 90.]
Student Averages (axis=1): [85. 75. 95.]`,
    },
    {
      title: 'Pandas Inspection, Slicing (loc/iloc) & Boolean Filtering',
      description: 'Loading structured tabular records, inspecting metadata, and extracting rows with Boolean masks.',
      language: 'python',
      code: `import pandas as pd
import numpy as np

# Create sample student DataFrame
df = pd.DataFrame({
    "Name": ["Rahul", "Priya", "Arjun", "Sneha", "Kabir", "Meera"],
    "City": ["Mumbai", "Pune", "Mumbai", "Nashik", "Pune", "Mumbai"],
    "Marks": [85, 91, 76, 95, 68, 88],
    "Attendance": [92, 88, 75, 96, 81, 90]
})

# 1. Dataset Inspection
print("Shape:", df.shape)
print("Columns:", df.columns.tolist())

# 2. Selecting Columns
names_marks = df[["Name", "Marks"]]

# 3. Label vs Position Indexing
print("loc[0, 'Name']:", df.loc[0, "Name"])   # Label 'Rahul'
print("iloc[0, 1]:", df.iloc[0, 1])           # Position 1 -> City 'Mumbai'

# 4. Multi-Condition Boolean Filtering
# Filter: Marks >= 85 AND Attendance > 85
high_achievers = df[(df["Marks"] >= 85) & (df["Attendance"] > 85)]
print("\\n--- High Achievers ---")
print(high_achievers[["Name", "City", "Marks", "Attendance"]])

# 5. Conditional Feature Engineering
df["Passed"] = np.where(df["Marks"] >= 75, "Distinction", "Regular")
print("\\n--- Added Categorical Column ---")
print(df[["Name", "Marks", "Passed"]])`,
      lineExplanations: [
        { line: 5, text: 'Instantiates a 2D DataFrame with 6 rows and 4 typed Series columns.' },
        { line: 13, text: 'Inspects dimensions (6, 4) and column headers.' },
        { line: 17, text: 'Subsets multiple columns by passing a Python list of column names.' },
        { line: 20, text: 'df.loc uses row index labels and column names.' },
        { line: 21, text: 'df.iloc uses zero-based numerical row and column offsets.' },
        { line: 25, text: 'Compound Boolean filter using bitwise & with required parentheses.' },
        { line: 30, text: 'np.where vectorizes if-else condition to create a new analytical column.' },
      ],
      output: `Shape: (6, 4)
Columns: ['Name', 'City', 'Marks', 'Attendance']
loc[0, 'Name']: Rahul
iloc[0, 1]: Mumbai

--- High Achievers ---
    Name    City  Marks  Attendance
0  Rahul  Mumbai     85          92
1  Priya    Pune     91          88
3  Sneha  Nashik     95          96
5  Meera  Mumbai     88          90

--- Added Categorical Column ---
    Name  Marks       Passed
0  Rahul     85  Distinction
1  Priya     91  Distinction
2  Arjun     76  Distinction
3  Sneha     95  Distinction
4  Kabir     68      Regular
5  Meera     88  Distinction`,
    },
    {
      title: 'GroupBy Cohorts, Multi-Metric Aggregation & Table Merges',
      description: 'Partitioning DataFrames by categorical cohorts, computing summary metrics, and joining relational tables.',
      language: 'python',
      code: `import pandas as pd

students = pd.DataFrame({
    "StudentID": [101, 102, 103, 104],
    "Name": ["Rahul", "Priya", "Arjun", "Sneha"],
    "City": ["Mumbai", "Pune", "Mumbai", "Pune"],
    "Score": [85, 92, 78, 96]
})

courses = pd.DataFrame({
    "StudentID": [101, 102, 103, 105],
    "Department": ["Computer Science", "Data Science", "Computer Science", "Electrical"]
})

# 1. Frequency Distribution & Unique Values
print("City Counts:\\n", students["City"].value_counts())
print("Unique Cities:", students["City"].unique(), "| Total:", students["City"].nunique())

# 2. GroupBy Aggregations: Split -> Apply -> Combine
city_summary = students.groupby("City")["Score"].agg(["mean", "count", "max"])
print("\\n--- City Score Summary ---\\n", city_summary)

# 3. Relational Table Merge (Inner Join on StudentID)
merged_df = pd.merge(students, courses, on="StudentID", how="inner")
print("\\n--- Merged Enrolment Matrix ---\\n", merged_df[["StudentID", "Name", "Department", "City", "Score"]])`,
      lineExplanations: [
        { line: 3, text: 'Defines the primary student roster with demographic and score fields.' },
        { line: 10, text: 'Defines the secondary course registration table sharing primary key StudentID.' },
        { line: 17, text: 'Computes frequency counts of each categorical level in the City column.' },
        { line: 21, text: 'Groups rows by City, isolates Score, and computes mean, count, and max simultaneously.' },
        { line: 25, text: 'Performs relational inner equijoin on common key StudentID.' },
      ],
      output: `City Counts:
 Mumbai    2
Pune      2
Name: City, dtype: int64
Unique Cities: ['Mumbai' 'Pune'] | Total: 2

--- City Score Summary ---
          mean  count  max
City                     
Mumbai  81.50      2   85
Pune    94.00      2   96

--- Merged Enrolment Matrix ---
    StudentID   Name        Department    City  Score
0        101  Rahul  Computer Science  Mumbai     85
1        102  Priya      Data Science    Pune     92
2        103  Arjun  Computer Science  Mumbai     78`,
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming Pandas is just an Excel replacement inside Python.',
      why: 'Excel is a visual spreadsheet designed for manual desktop entry. Pandas is a programmable, scalable data manipulation engine capable of automating multi-table pipelines across millions of records.',
      correction: 'Treat Pandas as a code-first data pipeline library that interfaces directly with NumPy, SciPy, Scikit-Learn, and SQL databases.',
      wrongCode: '# Manually clicking formulas or looping with: for row in df: ...',
      correctCode: 'df["Total"] = df["Marks"] * df["Weight"]  # Vectorized calculation',
    },
    {
      mistake: 'Using Python and / or keywords instead of & / | in Boolean filters.',
      why: 'Python and/or evaluate the truth value of an entire object at once (causing a ValueError in Pandas). Pandas requires bitwise & (AND) and | (OR) to evaluate row-by-row comparisons.',
      correction: 'Always use & and | with explicit parentheses surrounding each individual condition.',
      wrongCode: 'df[df["Marks"] > 80 and df["City"] == "Mumbai"]  # ValueError: truth value of a Series is ambiguous',
      correctCode: 'df[(df["Marks"] > 80) & (df["City"] == "Mumbai")]  # Correct elementwise bitwise filtering',
    },
    {
      mistake: 'Confusing loc (label-based) and iloc (integer position-based).',
      why: 'df.loc uses custom index labels and column names. df.iloc strictly uses 0-based integer positions regardless of index names.',
      correction: 'Remember: loc = Location by Label; iloc = Integer Location by Position.',
      wrongCode: 'df.iloc[0, "Marks"]  # TypeError: cannot do positional indexing with non-integer keys',
      correctCode: 'df.loc[0, "Marks"]   # Or df.iloc[0, 2] if Marks is column index 2',
    },
    {
      mistake: 'Believing that filtering a DataFrame permanently deletes excluded rows.',
      why: 'In Pandas, df[df["Marks"] > 80] generates a filtered view/copy. The original DataFrame df remains completely intact unless explicitly reassigned or filtered in place.',
      correction: 'Store filtered results in a new variable or explicitly reassign: high_scores = df[df["Marks"] > 80].',
      wrongCode: 'df[df["Marks"] > 80]\nprint(len(df))  # Expecting smaller length, but df was not modified!',
      correctCode: 'filtered_df = df[df["Marks"] > 80]\nprint(len(filtered_df))',
    },
    {
      mistake: 'Misunderstanding axis: thinking axis=0 means "operate across rows horizontally".',
      why: 'axis=0 specifies the direction of the operation along rows (down the vertical column), resulting in one aggregate per column. axis=1 moves along columns (across the row), resulting in one aggregate per row.',
      correction: 'Mnemonic: axis=0 acts DOWN columns (collapsing rows); axis=1 acts ACROSS rows (collapsing columns).',
      wrongCode: 'df.mean(axis=1)  # Expecting column averages, but getting row-wise averages per student!',
      correctCode: 'df.mean(axis=0)  # Correct: computes average for each column',
    },
    {
      mistake: 'Assuming merge and concat perform the same operation.',
      why: 'pd.merge() is a relational join based on matching key columns (like SQL JOIN). pd.concat() simply stacks dataframes vertically (stacking rows) or horizontally (pasting columns) by index.',
      correction: 'Use pd.merge() when combining tables via shared identifiers (e.g. StudentID). Use pd.concat() when appending batches of identical schema.',
      wrongCode: 'pd.concat([students, marks])  # Stacks them into a sparse DataFrame full of NaNs',
      correctCode: 'pd.merge(students, marks, on="StudentID", how="inner")',
    },
    {
      mistake: 'Thinking every Pandas column must be manually converted to a NumPy array for computation.',
      why: 'Pandas Series already provide built-in vectorization and statistical methods (.mean(), .sum(), .std(), .max()) with full handling of labels and NaNs.',
      correction: 'Use native Pandas methods directly. Only convert with .to_numpy() when passing feature matrices into specialized numerical libraries or Scikit-Learn.',
      wrongCode: 'mean_val = np.mean(df["Marks"].to_numpy())  # Unnecessary conversion',
      correctCode: 'mean_val = df["Marks"].mean()             # Idiomatic Pandas',
    },
  ],
  thinkingStrategies: [
    {
      question: 'Should I use NumPy or Pandas for my current data engineering task?',
      context: 'Deciding on data representation for an analytics pipeline.',
      reasoning:
        'If your dataset is homogeneous (e.g. a pure numeric image tensor, audio signal, or coordinate grid) requiring matrix linear algebra, use NumPy ndarrays. If your dataset contains heterogeneous data types (strings, dates, floats, categories, missing values) with column headers and metadata, use a Pandas DataFrame.',
      ruleOfThumb: 'Heterogeneous tabular records with names/dates ➔ Pandas. Pure numerical matrices & tensor math ➔ NumPy.',
    },
    {
      question: 'How should I design a multi-step data query to avoid bloated or unreadable code?',
      context: 'Chaining filters, sorting, feature engineering, and aggregations.',
      reasoning:
        'Follow the Data Pipeline Mental Model: Step 1 Inspect ➔ Step 2 Filter rows ➔ Step 3 Select or create columns ➔ Step 4 Group and aggregate. Assign clear intermediate variable names or use method chaining with readable formatting.',
      ruleOfThumb: 'Filter early to reduce row count, engineer necessary columns second, group and summarize last.',
    },
    {
      question: 'When should I choose between .loc and .iloc for slicing records?',
      context: 'Selecting specific subsets of rows and features.',
      reasoning:
        'Use .loc when your filtering criteria depend on domain business labels (e.g. column names like "Marks", "City" or semantic index names). Use .iloc when you need to slice by physical position (e.g. taking the top 10 rows, or splitting the first 80% of rows for training).',
      ruleOfThumb: 'By column/index name ➔ df.loc. By zero-based integer index/offset ➔ df.iloc.',
    },
    {
      question: 'How do I decide between inner, left, and outer join when merging relational tables?',
      context: 'Combining customer demographics with transaction logs.',
      reasoning:
        'An inner join keeps only records that exist in both tables (drops unmatched keys). A left join preserves all primary table rows, filling missing secondary attributes with NaN. An outer join retains all keys from both datasets.',
      ruleOfThumb: 'Preserve full primary cohort ➔ how="left". Only analyze complete overlaps ➔ how="inner".',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'Which library is primarily designed for fast multidimensional numerical array computing in Python?',
      options: ['Pandas', 'NumPy', 'Flask', 'Django'],
      correctIndex: 1,
      explanation:
        'NumPy is the foundational Python library for numerical computing, providing the homogeneous ndarray data structure and vectorized math routines.',
    },
    {
      id: 'q2',
      question: 'What does the vectorized expression marks + 5 do in NumPy when marks = np.array([78, 85, 92])?',
      options: [
        'Appends the number 5 to the end of the array.',
        'Throws a TypeError because you cannot add a number to an array.',
        'Adds 5 to each individual element, returning [83, 90, 97].',
        'Multiplies the array length by 5.',
      ],
      correctIndex: 2,
      explanation:
        'NumPy vectorization applies the scalar addition (+ 5) element-by-element across the entire array at precompiled C-speed.',
    },
    {
      id: 'q3',
      question: 'In a 2D NumPy array with shape (3, 4), what does np.mean(arr, axis=0) compute?',
      options: [
        'The overall single mean of all 12 elements.',
        'The mean of each column by collapsing rows vertically (output shape: (4,)).',
        'The mean of each row by collapsing columns horizontally (output shape: (3,)).',
        'The diagonal matrix mean.',
      ],
      correctIndex: 1,
      explanation:
        'axis=0 operates down the rows, computing an average for each of the 4 columns.',
    },
    {
      id: 'q4',
      question: 'What is the relationship between a Pandas DataFrame and a Pandas Series?',
      options: [
        'They are completely unrelated data structures.',
        'A DataFrame is a 2D labeled tabular container where each individual column is a 1D Pandas Series sharing a common row index.',
        'A Series is a collection of DataFrames.',
        'A DataFrame can only contain numbers, while a Series can only contain strings.',
      ],
      correctIndex: 1,
      explanation:
        'A DataFrame is a 2D labeled structure composed of aligned 1D Series columns sharing the same row Index.',
    },
    {
      id: 'q5',
      question: 'What is the key difference between df.loc and df.iloc in Pandas?',
      options: [
        'df.loc is faster than df.iloc.',
        'df.loc selects data using index and column labels; df.iloc strictly uses 0-based integer positional offsets.',
        'df.loc is for numbers; df.iloc is for text.',
        'df.loc works only in Jupyter Notebooks.',
      ],
      correctIndex: 1,
      explanation:
        'df.loc is label-based (e.g. df.loc[0, "City"]), whereas df.iloc is integer position-based (e.g. df.iloc[0, 1]).',
    },
    {
      id: 'q6',
      question: 'What is the correct syntax to filter rows in a DataFrame where Marks > 80 and City == "Mumbai"?',
      options: [
        'df[df["Marks"] > 80 and df["City"] == "Mumbai"]',
        'df[(df["Marks"] > 80) & (df["City"] == "Mumbai")]',
        'df[df["Marks"] > 80 && df["City"] == "Mumbai"]',
        'df.filter(Marks > 80, City == "Mumbai")',
      ],
      correctIndex: 1,
      explanation:
        'Pandas requires bitwise & for elementwise logical AND, with explicit parentheses surrounding each comparison expression.',
    },
    {
      id: 'q7',
      question: 'What does df.groupby("City")["Marks"].mean() do conceptually?',
      options: [
        'Deletes all cities except the one with the highest mark.',
        'Splits the data into cohorts by City, computes the mean Marks for each cohort, and combines the results into a summarized Series.',
        'Sorts the entire dataset by City name alphabetically.',
        'Counts the number of letters in each city name.',
      ],
      correctIndex: 1,
      explanation:
        'This represents the classic Split-Apply-Combine pattern: rows are grouped by City, the mean of Marks is computed per group, and the results are combined.',
    },
    {
      id: 'q8',
      question: 'What is the difference between df["City"].value_counts() and df["City"].nunique()?',
      options: [
        'value_counts() returns the frequency count for each distinct category; nunique() returns a single integer representing the count of unique categories.',
        'They return the exact same output.',
        'nunique() returns a list of city names.',
        'value_counts() only works on numeric columns.',
      ],
      correctIndex: 0,
      explanation:
        'value_counts() outputs the occurrence count for every category (e.g. Mumbai: 3, Pune: 2), while nunique() returns the scalar count of distinct categories (e.g. 2).',
    },
    {
      id: 'q9',
      question: 'What is the fundamental difference between pd.merge() and pd.concat()?',
      options: [
        'pd.merge() combines tables by matching values in shared key columns (relational join); pd.concat() stacks dataframes along a specified axis.',
        'pd.merge() is only for numbers; pd.concat() is only for strings.',
        'pd.concat() joins tables using SQL syntax, while pd.merge() does not.',
        'There is no difference.',
      ],
      correctIndex: 0,
      explanation:
        'pd.merge() performs relational joins based on matching key columns; pd.concat() stacks datasets vertically or horizontally along an axis.',
    },
    {
      id: 'q10',
      question: 'Now that we have mastered data collection (2.1-2.2), typing & sources (2.3), missing values (2.4), outliers (2.5), formatting (2.6), and operations (2.7), what comes next in Module 3?',
      options: [
        'Module 3 — Exploratory Data Analysis (EDA): distributions, correlations, statistical hypothesis testing, and discovering data insights.',
        'Hardware manufacturing and chip design.',
        'Writing raw assembly compilers.',
        'Building static HTML marketing pages.',
      ],
      correctIndex: 0,
      explanation:
        'Module 3 transitions from data preparation and mechanics into Exploratory Data Analysis (EDA)—uncovering distributions, relationships, correlations, and statistical truths.',
    },
  ],
  summary: {
    takeaways: [
      'NumPy provides homogeneous ndarrays optimized for C-speed vectorized numerical arithmetic without manual loops.',
      'In 2D arrays, axis=0 operates down columns (across rows), and axis=1 operates across rows (across columns).',
      'A Pandas DataFrame is a 2D labeled tabular container composed of aligned 1D Series columns sharing an Index.',
      'Inspect datasets using .head(), .tail(), .shape, .columns, .dtypes, .info(), and .describe() before transforming.',
      'Index with precision: use .loc for label-based queries and .iloc for positional integer offsets.',
      'Filter with Boolean masks using bitwise operators (&, |, ~) wrapped in mandatory parentheses.',
      'Engineer new features with direct arithmetic, apply(), and vectorized conditional branching via np.where().',
      'Leverage df.groupby() to execute Split-Apply-Combine workflows and calculate multi-metric cohort statistics.',
      'Differentiate frequency distributions (.value_counts()), distinct element arrays (.unique()), and distinct counts (.nunique()).',
      'Combine tables with pd.merge() (key-based relational joins) versus pd.concat() (axis-based dataset stacking).',
      'The complete data engineering foundation (Modules 2.1 to 2.7) prepares you to dive into Module 3: Exploratory Data Analysis.',
    ],
    nextUpText: 'Module 3: Exploratory Data Analysis (EDA) — Uncovering statistical distributions, correlations, hypothesis testing, and graphical insights.',
  },
  prevTopic: {
    slug: 'data-formatting-and-normalization',
    title: '2.6 Data Formatting & Normalization',
  },
  nextTopic: {
    slug: 'descriptive-statistics',
    title: '3.1 Descriptive Statistics',
  },
};
