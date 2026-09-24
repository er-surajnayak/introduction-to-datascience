import { LessonContent } from '@/types/lesson';

export const topic2_4: LessonContent = {
  id: 'm2-t4',
  topicNumber: '2.4',
  slug: 'missing-data-imputation',
  moduleId: 'module-2',
  title: 'Missing Data Imputation',
  subtitle: 'Diagnosing Why Values Disappear: Detection, Missingness Mechanisms (MCAR, MAR, MNAR), Drop vs Fill, Imputation Strategies & Post-Treatment Validation',
  estimatedMinutes: 35,
  difficulty: 'Intermediate',
  tags: [
    'Missing Data',
    'Imputation',
    'NaN',
    'isna() / notna()',
    'dropna()',
    'fillna()',
    'MCAR / MAR / MNAR',
    'Mean / Median / Mode',
    'Forward & Backward Fill',
    'Data Cleaning Validation',
  ],
  objectives: [
    'Explain what missing data is and recognize common representations (NaN, None, NULL, blanks, sentinel values).',
    'Understand why missing does NOT mean zero and recognize the catastrophic mathematical errors caused by conflating the two.',
    'Identify real-world causes of missingness: human entry omissions, sensor dropouts, skipped survey items, unapplicable fields, and privacy refusals.',
    'Develop an intuitive conceptual understanding of missingness mechanisms: MCAR (Completely at Random), MAR (At Random), and MNAR (Not at Random).',
    'Detect missing values programmatically in Pandas using df.isna(), df.notna(), and compute column-level counts with df.isna().sum().',
    'Calculate and interpret missing-value percentages using df.isna().mean() * 100 to evaluate the severity of data loss.',
    'Evaluate the 4 core response strategies: Drop, Fill (Impute), Keep (Indicator), and Investigate.',
    'Understand the mechanics and severe risks of dropping data via df.dropna() (sample shrinkage, selection bias).',
    'Apply Mean Imputation for symmetric numerical features and evaluate how it reduces sample variance.',
    'Apply Median Imputation for skewed numerical features containing extreme values or outliers.',
    'Apply Mode Imputation for categorical features and recognize the risk of inflating the majority class.',
    'Apply Forward Fill (ffill) and Backward Fill (bfill) for time-ordered chronological series and sensor streams.',
    'Evaluate column-level missingness thresholds without relying on rigid, arbitrary percentage cutoffs.',
    'Recognize that missingness can itself be highly informative (e.g. unfiled insurance claims, undisclosed high incomes).',
    'Distinguish between observed (empirically measured) values and imputed (statistically estimated) values.',
    'Perform rigorous post-imputation validation checks on distributions, bounds, null counts, and row integrity.',
    'Formulate contextual reasoning for missing data treatments rather than blindly executing generic library functions.',
    'Prepare for downstream Outlier Detection & Treatment in Topic 2.5.',
  ],
  hook: {
    title: 'Priya\'s Exam Score is NaN. Did She Score 0/100?',
    story:
      'Imagine you are the Lead Data Scientist for a university examination board. You ingest a raw tabular dataset containing 5,000 student records. In the row for Priya, the Marks column displays "NaN". If an automated cleaning script blindly replaces all missing values with 0, Priya\'s Grade Point Average plummets from 9.2 to 2.1, triggering academic probation and cancelling her scholarship. But what if Priya didn\'t fail the exam? What if she was hospitalized and approved for a makeup test next week? What if her answer sheet was still being digitized in the scanner room? In Topic 2.3, you learned that every column possesses distinct semantic meaning. Now we confront the reality of the physical world: raw data is almost never complete. Before changing, deleting, or filling a single missing cell, you must understand WHY it is missing and what that absence represents.',
    analogy:
      'Think of a dataset like a patient\'s medical chart in an intensive care hospital. If the chart has a blank box next to "Penicillin Allergy", a doctor cannot assume the patient has zero allergies and administer penicillin—doing so could be fatal. The blank box means the allergy status is UNKNOWN. Conversely, if a heart rate monitor momentarily disconnects for 2 seconds, the missing heart rate was not 0 bpm (cardiac arrest); it was a temporary sensor transmission dropout. Missing does not mean zero, nor does it mean bad. Missing data is simply a question mark that demands investigative reasoning.',
    realWorldImpact:
      'In clinical drug trials, dropping all patients who missed a follow-up appointment (listwise deletion) can create deadly survival bias, causing toxic drugs to appear deceptively safe. In algorithmic lending, filling missing income fields with the median income can result in millions of dollars in predatory loan defaults. Proper missing data diagnosis and imputation is a core ethical and technical requirement for production machine learning.',
  },
  coreConcept: {
    headline: 'The Missing Data Diagnostic Framework: From Detection to Validated Imputation',
    explanation:
      'Missing data is not merely a syntactic nuisance to be deleted with dropna(). It is an empirical artifact reflecting how data was collected, who provided it, and what operational failures occurred. Professional data science follows a disciplined 6-stage lifecycle.',
    keyPillars: [
      {
        title: '1. Detect & Quantify',
        description:
          'Locate missing values across the matrix using df.isna() and calculate column-level counts and percentages (df.isna().mean() * 100) to gauge the severity of data loss.',
      },
      {
        title: '2. Understand Missingness Mechanisms',
        description:
          'Diagnose whether values went missing randomly (MCAR), conditionally based on observed traits (MAR), or systematically due to the missing value itself (MNAR).',
      },
      {
        title: '3. Contextual Strategy Selection',
        description:
          'Choose between Dropping (when missingness is minimal and MCAR), Imputing (Mean for symmetric math, Median for skewed/outlier data, Mode for categories, ffill for time series), or Keeping as an indicator.',
      },
      {
        title: '4. Post-Treatment Validation',
        description:
          'Verify that no NaN values remain, row counts match expectations, distributions have not been warped unnaturally, and no impossible values (e.g. negative age) were created.',
      },
    ],
  },
  interactiveType: 'imputation-lab',
  technicalExplanation: {
    title: 'The Theory and Practice of Missing Data Treatment in Data Science',
    deepDive:
      'The foundational mental model of missing data treatment follows an unbroken diagnostic workflow:\n\nRAW DATASET → DETECT (isna) → MEASURE (% missing) → DIAGNOSE MECHANISM (MCAR/MAR/MNAR) → SELECT STRATEGY (Drop/Impute/Keep) → APPLY TREATMENT → VALIDATE → CLEAN DATASET\n\n1. What is Missing Data?\nMissing data occurs when an expected observation is unavailable, unrecorded, or corrupted. In computing environments, missing values are serialized as `NaN` (Not a Number in IEEE floating-point standard), `None` (Python object), `NULL` (SQL databases), or custom sentinel codes like `-999` or `"N/A"`. Crucially, missingness indicates *unavailability*, not numerical zero.\n\n2. Why Does Data Go Missing?\n• Mechanical / Sensor Failure: Hardware loss, power blips, network packet drops.\n• Human / Operational Omissions: Survey respondents skipping questions, clerk typing errors.\n• Domain Non-Applicability: A "Number of Pregnancies" column is legitimately not applicable for male patients.\n• Privacy & Sensitive Refusal: High-earning individuals refusing to declare tax income on public surveys.\n• Data Pipeline Merges: Left-joining two relational tables where non-matching foreign keys generate NULL columns.\n\n3. Missingness Mechanisms (Rubin\'s Taxonomy):\n• MCAR (Missing Completely At Random): The probability of missingness is completely independent of both observed variables and unobserved values. Example: A postal worker accidentally drops and destroys 5 random survey envelopes. Dropping MCAR data causes loss of sample size, but does NOT introduce systematic statistical bias.\n• MAR (Missing At Random): The probability of missingness depends systematically on other *observed* variables, but not on the missing value itself. Example: In a student survey, 1st-year students are less likely to report their high school GPA than 4th-year students, but within 1st-year students, missingness is random. MAR can be handled safely using multivariate or conditional imputation.\n• MNAR (Missing Not At Random): The probability of missingness depends directly on the unobserved missing value itself. Example: Students with failing marks (>90% failure) intentionally skip submitting their grade reports. Imputing MNAR with simple mean/median severely biases the dataset and conceals the true failure rate.\n\n4. Detection & Measurement in Pandas:\n• `df.isna()` / `df.isnull()`: Returns a boolean DataFrame where `True` indicates a missing cell.\n• `df.notna()`: Returns the logical inversion (`True` where data is present).\n• `df.isna().sum()`: Sums boolean `True` (treated as 1) column-wise, returning the exact count of missing values per column.\n• `df.isna().mean() * 100`: Calculates the missingness percentage per column.\n\n5. Treatment Strategies: Drop vs. Impute:\n• Dropping Rows (`df.dropna()`): Removes any row containing at least one NaN. Safe ONLY when missingness is tiny (< 3-5%) and MCAR. In high-dimensional datasets with 50 columns each missing 2%, dropna() can delete over 60% of all rows!\n• Dropping Columns (`df.dropna(axis=1)`): Removes entire features. Justified when a column is missing >70-90% of its data AND is not vital to the core analytical question.\n• Mean Imputation (`df[col].fillna(df[col].mean())`): Replaces missing values with the arithmetic mean of observed values. Best for symmetric, bell-shaped numerical distributions without outliers. Warning: artificially reduces variance and standard error.\n• Median Imputation (`df[col].fillna(df[col].median())`): Replaces missing values with the 50th percentile. Highly recommended when the column is skewed or contains extreme outliers.\n• Mode Imputation (`df[col].fillna(df[col].mode()[0])`): Replaces missing values with the most frequent category. Standard for nominal/ordinal categorical features.\n• Forward / Backward Fill (`df[col].ffill()`, `df[col].bfill()`): Propagates the last valid observation forward or next valid observation backward. Highly effective for time-series, financial ticker tapes, and IoT sensor streams.\n\n6. Observed vs. Imputed Values & Post-Validation:\nImputed values are *synthetic statistical estimates*, not ground-truth physical measurements. Every imputation introduces mathematical assumptions. After cleaning, data scientists must always run post-validation audits: verify `df.isna().sum().sum() == 0`, check that minimum and maximum bounds were respected, and confirm that category ratios were not distorted.',
    bulletPoints: [
      'Missing data indicates unavailability or unrecorded state—it is mathematically distinct from zero.',
      'Representations vary across platforms: `NaN` in NumPy/Pandas, `None` in Python, `NULL` in SQL, empty blanks in CSVs.',
      'Rubin\'s Mechanisms: MCAR (independent of all data), MAR (depends on observed data), MNAR (depends on the missing value itself).',
      'Pandas detection: `df.isna().sum()` counts missing values per column; `df.isna().mean() * 100` computes missing percentages.',
      'Dropping rows (`dropna()`) risks severe sample reduction and survivorship bias; dropping columns (`dropna(axis=1)`) is for non-critical empty features.',
      'Mean Imputation suits symmetric numerical distributions; Median Imputation protects against extreme outliers and skewness.',
      'Mode Imputation fills categorical gaps with the most frequent class; Forward Fill (`ffill()`) propagates previous timestamps in time series.',
      'Missingness can be informative: an unrecorded feature may indicate non-applicability, non-occurrence, or privacy refusal.',
      'Imputed values are estimated, not observed; always validate row counts, ranges, and distribution variance after cleaning.',
      'Proper missing data treatment prepares clean, uncorrupted feature matrices for Outlier Detection in Topic 2.5.',
    ],
  },
  codeExamples: [
    {
      title: '1. Detecting, Counting & Measuring Missingness in Pandas',
      description: 'The standard exploratory diagnostic workflow to locate missing cells and compute column missingness percentages.',
      language: 'python',
      code: `import pandas as pd
import numpy as np

# Sample dirty real-world student dataset
df = pd.DataFrame({
    "student_id": [101, 102, 103, 104, 105],
    "name": ["Rahul", "Priya", "Aman", "Sneha", "Ravi"],
    "age": [21, 22, np.nan, 20, 21],
    "marks": [85.0, np.nan, 76.0, 91.0, np.nan],
    "department": ["CSE", "ECE", "CSE", np.nan, "CSE"],
    "attendance": [92, 88, 81, np.nan, 79]
})

print("--- Boolean Missingness Matrix (isna) ---")
print(df.isna())

print("\n--- Missing Value Counts per Column ---")
missing_counts = df.isna().sum()
print(missing_counts)

print("\n--- Missing Percentage per Column (%) ---")
missing_pct = df.isna().mean() * 100
print(missing_pct.round(1))`,
      lineExplanations: [
        { line: 5, text: 'np.nan represents missing numerical or object values in Pandas DataFrames.' },
        { line: 15, text: 'df.isna() returns a matrix of True/False flags for every cell.' },
        { line: 19, text: 'df.isna().sum() sums True (1) and False (0) column-wise to give exact counts.' },
        { line: 23, text: 'df.isna().mean() * 100 calculates the percentage of missing values per column.' },
      ],
      output: `--- Boolean Missingness Matrix (isna) ---
   student_id   name    age  marks  department  attendance
0       False  False  False  False       False       False
1       False  False  False   True       False       False
2       False  False   True  False       False       False
3       False  False  False  False        True        True
4       False  False  False   True       False       False

--- Missing Value Counts per Column ---
student_id    0
name          0
age           1
marks         2
department    1
attendance    1
dtype: int64

--- Missing Percentage per Column (%) ---
student_id     0.0
name           0.0
age           20.0
marks         40.0
department    20.0
attendance    20.0
dtype: float64`,
    },
    {
      title: '2. Applying Contextual Imputation Strategies (Mean, Median, Mode & ffill)',
      description: 'Implementing specific statistical imputation strategies based on feature data types and distributions.',
      language: 'python',
      code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "marks": [80.0, 90.0, np.nan, 70.0, 60.0],          # Symmetric numerical -> Mean
    "salary": [25000, 28000, np.nan, 30000, 450000],    # Skewed with outlier -> Median
    "city": ["Pune", "Mumbai", "Pune", np.nan, "Delhi"], # Categorical -> Mode
    "temp": [28.0, np.nan, 29.0, np.nan, 30.5]          # Time-ordered series -> ffill
})

# 1. Mean Imputation for symmetric marks (Mean = 75.0)
df["marks_imputed"] = df["marks"].fillna(df["marks"].mean())

# 2. Median Imputation for salary with extreme outlier (Median = 29000, Mean would be 133250!)
df["salary_imputed"] = df["salary"].fillna(df["salary"].median())

# 3. Mode Imputation for categorical city (Mode = 'Pune')
df["city_imputed"] = df["city"].fillna(df["city"].mode()[0])

# 4. Forward Fill for time-ordered temperature
df["temp_imputed"] = df["temp"].ffill()

print("--- Imputed Dataset Overview ---")
print(df[["marks_imputed", "salary_imputed", "city_imputed", "temp_imputed"]])`,
      lineExplanations: [
        { line: 12, text: 'fillna(df["marks"].mean()) replaces NaN with 75.0 (the arithmetic mean of observed values).' },
        { line: 15, text: 'fillna(df["salary"].median()) replaces NaN with 29000.0, avoiding the severe skew of 450,000.' },
        { line: 18, text: 'df["city"].mode()[0] extracts the most common string ("Pune") to fill categorical gaps.' },
        { line: 21, text: 'df["temp"].ffill() propagates the last known valid temperature forward in time.' },
      ],
      output: `--- Imputed Dataset Overview ---
   marks_imputed  salary_imputed city_imputed  temp_imputed
0           80.0         25000.0         Pune          28.0
1           90.0         28000.0       Mumbai          28.0
2           75.0         29000.0         Pune          29.0
3           70.0         30000.0         Pune          29.0
4           60.0        450000.0        Delhi          30.5`,
    },
    {
      title: '3. Rigorous Post-Imputation Validation Audits',
      description: 'Programmatically verifying that the cleaned dataset contains zero remaining nulls and adheres to valid business rules.',
      language: 'python',
      code: `import pandas as pd

# Assume clean_df is our imputed dataframe
# 1. Check total remaining nulls across the entire DataFrame
remaining_nulls = clean_df.isna().sum().sum()
assert remaining_nulls == 0, f"Error: {remaining_nulls} missing values remain!"

# 2. Verify row and column count integrity
original_rows = 5
assert len(clean_df) == original_rows, "Error: Unexpected row count drop!"

# 3. Sanity check: Ensure marks are within valid 0.0 to 100.0 boundary
assert clean_df["marks_imputed"].between(0, 100).all(), "Error: Impossible mark values generated!"

print("✓ Validation Succeeded: 0 remaining nulls, full row retention, and valid domain boundaries.")`,
      lineExplanations: [
        { line: 5, text: 'df.isna().sum().sum() sums all missing flags across the entire matrix into a single scalar.' },
        { line: 6, text: 'assert verifies programmatically that missingness has been 100% resolved.' },
        { line: 13, text: '.between(0, 100).all() confirms that no imputed value fell outside realistic physical boundaries.' },
      ],
      output: `✓ Validation Succeeded: 0 remaining nulls, full row retention, and valid domain boundaries.`,
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming NaN means zero.',
      why: 'Students often fill missing columns with 0 without realizing that 0 is an active, known numerical measurement (e.g. 0 marks means failed, 0°C means freezing, 0 income means destitute).',
      correction: 'Differentiate unknown availability (NaN) from a true zero quantity. Only fill with 0 if zero is the verified ground truth.',
      wrongCode: `# Blindly setting missing exam scores to 0
df["marks"] = df["marks"].fillna(0)`,
      correctCode: `# Impute with statistical central tendency or investigate why missing
df["marks"] = df["marks"].fillna(df["marks"].mean())`,
    },
    {
      mistake: 'Blindly deleting every row containing a missing value using df.dropna().',
      why: 'In wide tables with 30+ columns, even a tiny 2% missing rate across columns can cause dropna() to discard 50% or more of the entire dataset, severely reducing sample size and introducing survival bias.',
      correction: 'Check missingness rates first. Use dropna() only when missingness is trivial (<3%) and MCAR; otherwise use statistical imputation.',
      wrongCode: `# Deleting 60% of data silently
clean_df = df.dropna()`,
      correctCode: `# Check missing counts and impute column-by-column
print(df.isna().sum())
df["age"] = df["age"].fillna(df["age"].median())`,
    },
    {
      mistake: 'Using Mean Imputation on skewed data with extreme outliers.',
      why: 'A single massive outlier (e.g. CEO salary of $10,000,000 in a worker dataset) inflates the mean, causing missing entry-level salaries to be filled with wildly unrealistic numbers.',
      correction: 'Inspect the distribution first. Use Median Imputation for skewed distributions or datasets containing extreme outliers.',
      wrongCode: `df["salary"].fillna(df["salary"].mean()) # Skewed by outliers!`,
      correctCode: `df["salary"].fillna(df["salary"].median()) # Robust to outliers`,
    },
    {
      mistake: 'Believing Median is universally superior to Mean in every scenario.',
      why: 'Students overcorrect and never use the mean, forgetting that for symmetric, normally distributed scientific measurements, the mean is the most statistically efficient estimator.',
      correction: 'Use Mean for symmetric, un-skewed distributions; use Median when outliers or heavy skew are present.',
    },
    {
      mistake: 'Over-applying Mode Imputation on categorical variables with high cardinality.',
      why: 'Filling thousands of missing city or customer category values with the mode can drastically over-represent the majority category and destroy natural subgroup variance.',
      correction: 'Consider creating an explicit "Unknown" or "Missing" category for categorical columns with substantial missingness.',
      wrongCode: `df["feedback_category"].fillna(df["feedback_category"].mode()[0])`,
      correctCode: `df["feedback_category"].fillna("Unknown")`,
    },
    {
      mistake: 'Using Forward Fill (ffill) on unordered tabular records.',
      why: 'Forward fill copies the previous row\'s value. In an unordered student or customer spreadsheet, Student B\'s age has zero physical relationship with Student A\'s age.',
      correction: 'Use ffill/bfill ONLY when the dataset is strictly ordered by time or sequential process steps (e.g. sensor telemetry, daily stock prices).',
    },
    {
      mistake: 'Assuming that having zero NaNs means the dataset is automatically clean.',
      why: 'Imputation creates synthetic numbers. If you impute an age column with 21.4 or negative values, the dataset is complete in memory but corrupted in meaning.',
      correction: 'Always run validation sanity checks: verify ranges, distributions, and domain constraints post-imputation.',
    },
    {
      mistake: 'Treating imputed values as real, observed measurements.',
      why: 'Analysts forget which cells were originally missing, making bold scientific claims based on numbers generated by their own imputation algorithm.',
      correction: 'Maintain an indicator column (e.g. `is_imputed = True`) or preserve raw datasets to track provenance.',
    },
    {
      mistake: 'Assuming missingness is always random noise.',
      why: 'Missingness is frequently informative (e.g. patients who drop out of clinical trials due to severe drug side effects). Treating MNAR as random noise masks critical phenomena.',
      correction: 'Investigate the missingness mechanism before choosing whether to drop, impute, or create a missingness flag.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'Is this missing cell an unknown quantity, a non-applicable condition, or a true zero?',
      context: 'When discovering NaN in an unfamiliar dataset column.',
      reasoning: 'Ask what the physical phenomenon represents. If a user left "Secondary Phone Number" blank, it is non-applicable. If "Exam Score" is blank, it is unknown. If "Cart Discount" is blank, it may be a true 0.0.',
      ruleOfThumb: 'Never assume NaN equals zero without verifying the business logic of the column.',
    },
    {
      question: 'Is the data distribution symmetric or heavily skewed by extreme values?',
      context: 'When choosing between Mean and Median imputation for a numerical feature.',
      reasoning: 'Calculate the mean and median. If mean is significantly different from median (e.g. mean=130k vs median=30k), the data has extreme outliers. In that case, median is vastly safer.',
      ruleOfThumb: 'Symmetric data without outliers -> Mean; Skewed data or outliers present -> Median.',
    },
    {
      question: 'Is this dataset sequentially ordered in time or a collection of independent entities?',
      context: 'When considering Forward Fill (ffill) or Backward Fill (bfill).',
      reasoning: 'If rows represent consecutive minutes from a weather sensor, the previous reading is physically predictive. If rows represent independent survey respondents, previous rows are irrelevant.',
      ruleOfThumb: 'Use ffill/bfill for time-series streams; use central tendency (mean/median/mode) for independent tabular records.',
    },
    {
      question: 'What happens to the distribution variance after I impute this column?',
      context: 'When evaluating the statistical side-effects of single-value imputation.',
      reasoning: 'Filling 30% of a column with the exact same mean value bunches 30% of observations onto a single vertical spike, artificially deflating variance.',
      ruleOfThumb: 'If missingness exceeds 20-30%, single-value imputation may severely distort distribution shape; consider indicator flags or advanced models.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'Why is it dangerous to automatically replace missing values with 0 in an `exam_marks` column?',
      options: [
        'Because Python cannot store 0 in a float column.',
        'Because 0 is an active score indicating failure, whereas NaN represents an unknown/unrecorded observation.',
        'Because 0 automatically deletes the entire student row from memory.',
        'Because zero is converted to boolean False in SQL.',
      ],
      correctIndex: 1,
      explanation:
        'Missing (NaN) means the score is unknown or unrecorded. Replacing it with 0 falsely asserts that the student took the exam and scored zero, distorting their true academic standing.',
    },
    {
      id: 'q2',
      question: 'Which Pandas command calculates the percentage of missing values in each column of a DataFrame `df`?',
      options: [
        'df.isna().count() / 100',
        'df.isna().mean() * 100',
        'df.dropna().sum() * 100',
        'df.fillna(100).mean()',
      ],
      correctIndex: 1,
      explanation:
        'df.isna() returns booleans (1 for True/missing, 0 for False/present). Calling .mean() computes (sum of 1s) / (total rows), and multiplying by 100 yields the exact percentage.',
    },
    {
      id: 'q3',
      question: 'A weather IoT station logs ambient temperatures every 60 seconds. At 10:01 AM, a transmission glitch causes a missing reading between 28.2°C (10:00 AM) and 28.4°C (10:02 AM). Which strategy is most appropriate?',
      options: [
        'Delete the entire weather station record from the database.',
        'Forward Fill (ffill) to propagate the 28.2°C reading to 10:01 AM.',
        'Fill with Mode ("Sunny").',
        'Fill with 0.0°C (freezing point).',
      ],
      correctIndex: 1,
      explanation:
        'For high-frequency time-ordered continuous physical telemetry, Forward Fill (ffill) or linear interpolation is ideal because physical temperature changes smoothly over minutes.',
    },
    {
      id: 'q4',
      question: 'You have a dataset of 1,000 employees. Salaries are: [20k, 22k, 25k, 24k, NaN, 10,000,000 (CEO)]. Why is Median Imputation strongly preferred over Mean Imputation here?',
      options: [
        'Because Median is faster to compute on GPUs.',
        'Because the CEO\'s $10M salary heavily skews the mean upwards ($2M+), while the median (~$24k) reflects typical worker compensation.',
        'Because Mean Imputation can only be applied to integer columns.',
        'Because Pandas does not support .mean() on employee tables.',
      ],
      correctIndex: 1,
      explanation:
        'The mean is extremely sensitive to extreme outliers, which would artificially inflate missing salaries to millions. The median is robust and represents typical central tendency.',
    },
    {
      id: 'q5',
      question: 'What is the primary risk of using `df.dropna()` on a dataset with 40 columns where each column has 3% missing data?',
      options: [
        'It will convert all numbers into strings.',
        'It can discard over 50% of all rows through compounding deletions (listwise deletion), destroying sample size.',
        'It causes a memory leak in Pandas.',
        'It forces all categorical features into binary codes.',
      ],
      correctIndex: 1,
      explanation:
        'When missingness is spread across multiple columns, dropping any row with at least one NaN compounds across columns, potentially wiping out a majority of the dataset.',
    },
    {
      id: 'q6',
      question: 'What characterizes data that is "Missing Not At Random" (MNAR)?',
      options: [
        'Missingness is completely unrelated to any variable in the study.',
        'Missingness depends directly on the unobserved value itself (e.g. individuals with high debt refusing to report debt).',
        'Missingness was caused by a random hardware sensor failure.',
        'Missingness only occurs on weekends.',
      ],
      correctIndex: 1,
      explanation:
        'In MNAR, the reason data is missing is directly tied to the value of the missing variable itself, creating systematic non-ignorable bias.',
    },
    {
      id: 'q7',
      question: 'Which strategy is standard for imputing missing values in an unordered categorical column like `city` (e.g. ["Pune", "Mumbai", "Pune", NaN, "Delhi"])?',
      options: [
        'Mean Imputation',
        'Mode Imputation (filling with "Pune")',
        'Linear Regression Spline',
        'Forward Fill without sorting',
      ],
      correctIndex: 1,
      explanation:
        'For categorical features, Mode Imputation replaces missing entries with the most frequently observed category (here, "Pune").',
    },
    {
      id: 'q8',
      question: 'Why is it important to distinguish between "Observed" and "Imputed" values in downstream analysis?',
      options: [
        'Because imputed values are synthetic statistical estimates, not ground-truth empirical measurements.',
        'Because Python automatically deletes imputed values after 24 hours.',
        'Because observed values must always be multiplied by 2.',
        'Because Scikit-Learn cannot train models on numbers with decimal points.',
      ],
      correctIndex: 0,
      explanation:
        'Imputed values are artificially generated estimates based on statistical assumptions. Tracking them prevents overconfidence in synthetic data points.',
    },
    {
      id: 'q9',
      question: 'After applying imputation to a dataset, what is the mandatory next step before training machine learning models?',
      options: [
        'Immediately deploy the model to production servers.',
        'Post-imputation validation (verifying 0 nulls remain, checking value bounds, and inspecting distribution variance).',
        'Convert all column headers to uppercase.',
        'Delete all numeric columns.',
      ],
      correctIndex: 1,
      explanation:
        'Validation is mandatory to ensure all NaNs were resolved, no impossible values were created, and the distribution was not heavily distorted.',
    },
    {
      id: 'q10',
      question: 'Now that we know how to diagnose and impute missing values, what is the next data cleaning anomaly we must learn to detect in Topic 2.5?',
      options: [
        'Outliers Detection & Treatment — values that are present but suspiciously extreme or erroneous.',
        'Writing raw assembly code for CPUs.',
        'Web scraping HTML tables from scratch.',
        'Creating SQL databases in SQLite.',
      ],
      correctIndex: 0,
      explanation:
        'Once missing values are resolved, the immediate next data cleaning challenge is detecting values that are present but extreme or corrupted (Topic 2.5 Outliers Detection & Treatment).',
    },
  ],
  summary: {
    takeaways: [
      'Missing data indicates unrecorded or unavailable information—it is never identical to numerical zero.',
      'Representations include `NaN`, `None`, `NULL`, blanks, and sentinel markers like `-999`.',
      'Rubin\'s Mechanisms classify missingness into MCAR (random), MAR (conditionally random), and MNAR (systematic / self-dependent).',
      'Pandas tools: `df.isna().sum()` counts missing values; `df.isna().mean() * 100` computes missingness percentages.',
      'Dropping data (`dropna()`) risks severe sample reduction and survivorship bias; use it with extreme caution.',
      'Imputation tools: Mean for symmetric data, Median for skewed/outlier-heavy data, Mode for categorical features, ffill/bfill for time series.',
      'Missingness can be informative: absence of data may signal non-applicability or user behavior.',
      'Imputed values are synthetic estimates: always run post-treatment validation audits to ensure data integrity.',
      'Mastering missing data treatment directly prepares us for handling extreme values in Topic 2.5 Outliers.',
    ],
    nextUpText: '2.5 Outliers Detection & Treatment — Diagnosing values that are present but suspiciously extreme using Z-scores, IQR, and visual boxplots.',
  },
  prevTopic: {
    slug: 'data-types-and-sources',
    title: '2.3 Data Types and Sources',
  },
  nextTopic: {
    slug: 'outliers-detection-and-treatment',
    title: '2.5 Outliers Detection & Treatment',
  },
};
