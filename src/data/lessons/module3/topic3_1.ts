import { LessonContent } from '@/types/lesson';

export const topic3_1: LessonContent = {
  id: 'm3-t1',
  topicNumber: '3.1',
  slug: 'descriptive-statistics',
  moduleId: 'module-3',
  title: 'Descriptive Statistics',
  subtitle: 'The Data Detective: Center, Spread, Position, Five-Number Summary, and Interpreting Numerical Profiles',
  estimatedMinutes: 30,
  difficulty: 'Intermediate',
  tags: [
    'Descriptive Statistics',
    'Exploratory Data Analysis',
    'Population vs Sample',
    'Mean',
    'Median',
    'Mode',
    'Range',
    'Variance',
    'Standard Deviation',
    'Percentiles',
    'Quartiles',
    'IQR',
    'Five-Number Summary',
    'describe()',
    'NumPy',
    'Pandas',
  ],
  objectives: [
    'Explain why descriptive statistics compress raw observations into meaningful actionable signals.',
    'Differentiate between Population (entire cohort, μ, σ) and Sample (observed subset, x̄, s).',
    'Compute and interpret the three pillars of Central Tendency: Mean, Median, and Mode.',
    'Understand the Mean as a physical balancing point where positive and negative deviations sum to zero.',
    'Explain how extreme values (outliers) drag the Mean while the Median remains resistant.',
    'Determine when to report the Mean vs Median based on distribution symmetry and skewness.',
    'Explain why central tendency alone is insufficient: two datasets can share identical means with radically different spreads.',
    'Derive Variance step-by-step from raw deviations and explain why deviations are squared to prevent cancellation.',
    'Interpret Standard Deviation as the typical scale of variation in original measurement units.',
    'Distinguish between Population Variance (N) and Sample Variance (n - 1 degrees of freedom).',
    'Compute Percentiles and Quartiles (Q1 = 25th, Q2 = Median = 50th, Q3 = 75th).',
    'Calculate the Interquartile Range (IQR = Q3 - Q1) and explain its connection to the middle 50% spread and Tukey outlier fences.',
    'Formulate the Five-Number Summary (Min, Q1, Median, Q3, Max) as the foundation for exploratory data profiling.',
    'Utilize NumPy (np.mean, np.median, np.std) and Pandas (df.describe()) for rapid programmatic summaries.',
    'Deconstruct the output of df.describe() into Center, Spread, and Extremes.',
    'Rigorously differentiate Description from Causation: summary numbers describe what is, not why it happened.',
    'Prepare for Module 3.2: Distributions & Skewness.',
  ],
  hook: {
    title: 'Can You Understand 100 Numbers by Staring at Them?',
    story:
      'Imagine your professor drops a raw text file containing the final exam marks of 100 engineering students: 72, 81, 65, 92, 78, 88, 54, 88, 78, 95, 42, 89, 73, 67, ... If you stare at all 100 numbers, your brain quickly hits cognitive overload. You cannot tell whether the exam was fair, whether most students passed with flying colors, or whether the scores were widely scattered. Now imagine a data detective steps in and replaces the wall of 100 raw numbers with just six figures: Count = 100, Mean = 74.8, Median = 76.0, Minimum = 35.0, Maximum = 98.0, and Standard Deviation = 11.4. In less than three seconds, the entire class becomes crystal clear. Descriptive statistics compress dozens or millions of raw observations into a compact, interpretable profile.',
    analogy:
      'Think of descriptive statistics like a high-resolution satellite snapshot of a city. The raw data is every individual brick, streetlamp, and person on the sidewalk. You cannot navigate a continent by reading every brick. The summary statistics—Center, Spread, and Position—give you the city elevation, traffic density, and boundary perimeter so you can understand the territory before making decisions.',
    realWorldImpact:
      'In tech hiring, recruiters glance at salary benchmarks. If an HR report says the average software engineer salary at a startup is ₹45 Lakhs, an applicant might feel underpaid at ₹25 Lakhs. But when you inspect the median, you discover it is ₹26 Lakhs—the average was artificially inflated by a ₹2 Crore payout to the co-founder. In medicine, clinical trials track blood pressure before and after a drug; without tracking standard deviation alongside the mean, doctors would miss whether a drug stabilizes all patients or causes dangerous spikes in a vulnerable sub-group.',
  },
  coreConcept: {
    headline: 'The Core EDA Mental Model: Center + Spread + Position',
    explanation:
      'Descriptive statistics summarize empirical observations. Rather than memorizing formulas, engineers categorize every numerical summary into three fundamental diagnostic dimensions: Where is the typical value (Center)? How scattered are the values (Spread)? And where does a specific observation rank relative to the rest (Position)? Crucially, descriptive statistics summarize what has been observed—they never establish causation.',
    keyPillars: [
      {
        title: '1. Center (Central Tendency)',
        description:
          'Where is the typical observation? Measured by Mean (arithmetic average, balancing point), Median (50th percentile rank), and Mode (most frequent value).',
      },
      {
        title: '2. Spread (Dispersion & Variability)',
        description:
          'How diverse are the observations? Measured by Range (Max - Min), Variance (mean squared deviation), and Standard Deviation (spread in original units).',
      },
      {
        title: '3. Position (Relative Rank & Fences)',
        description:
          'Where do values fall within the sorted cohort? Measured by Percentiles, Quartiles (Q1, Q2, Q3), and the Interquartile Range (IQR = Q3 - Q1, the middle 50%).',
      },
      {
        title: '4. Description ≠ Causation',
        description:
          'Descriptive statistics describe the dataset we have. They quantify patterns, but they never prove why those patterns exist or what caused them.',
      },
    ],
  },
  interactiveType: 'descriptive-stats-lab',
  technicalExplanation: {
    title: 'Mathematical Foundations, Degrees of Freedom, and Robust Statistics',
    deepDive:
      'The transition from raw data manipulation (Module 2) to exploratory data analysis (Module 3) requires mastering statistical summarization:\n\nRAW OBSERVATIONS → DESCRIPTIVE SUMMARY (Center + Spread + Position) → INTERPRETATION & COMPARISON → HYPOTHESIS FORMATION\n\n1. Population vs. Sample:\n• Population: The complete universe of items under study (e.g., all 10,000 students enrolled in the university). Parameters describing a population are denoted with Greek letters: Population Mean = μ, Population Standard Deviation = σ, Population Size = N.\n• Sample: A representative subset drawn from the population (e.g., 500 randomly sampled students). Statistics computed from a sample are denoted with Latin letters: Sample Mean = x̄, Sample Standard Deviation = s, Sample Size = n.\n\n2. Central Tendency:\n• Arithmetic Mean (x̄ = Σx_i / n): The sum of observations divided by sample count. It represents the physical "center of mass" or balance point: the sum of deviations (x_i - x̄) strictly equals zero.\n• Median (Q2 / 50th percentile): The middle value after ordering the dataset. For odd n, it is the element at position (n + 1)/2. For even n, it is the arithmetic average of the two central values at n/2 and (n/2) + 1. The median is resistant (breakdown point = 50%), making it robust to extreme outliers.\n• Mode: The most frequently occurring observation. Useful for both numerical and categorical data (e.g., most common delivery city = "Mumbai"). A dataset may have no mode, be unimodal, bimodal, or multimodal.\n\n3. The Outlier Trap & When to Choose Mean vs. Median:\nWhen data is approximately symmetric (bell-shaped), the Mean and Median align closely, and the Mean is mathematically preferred because it leverages every data point. However, when data is heavily skewed or contains extreme outliers (e.g., wealth, server latency spikes, house prices), extreme observations drag the Mean away from the bulk of the data, while the Median remains rooted in the center. Always report the Median when distributions are skewed.\n\n4. Spread and Dispersion:\n• Range: Max - Min. Simple, but heavily distorted by a single extreme observation.\n• Variance:\n  - Population Variance: σ² = Σ(x_i - μ)² / N\n  - Sample Variance: s² = Σ(x_i - x̄)² / (n - 1)\n  Why square deviations? Deviations (x_i - x̄) have positive and negative signs that cancel to zero if simply summed. Squaring eliminates negative signs and penalizes larger deviations quadratically.\n  Why divide by (n - 1) for samples? Known as Bessel\'s Correction. In a sample, deviations are measured from the sample mean x̄ rather than the true population mean μ. Because x̄ is calculated from the sample itself, the deviations are artificially tighter around x̄ than they would be around μ. Dividing by (n - 1) corrects for this downward bias, producing an unbiased estimator of population variance.\n• Standard Deviation (s = √s²): Variance has squared measurement units (e.g., marks² or ₹²). Taking the square root restores the metric to the original measurement scale (marks or ₹), expressing the typical dispersion around the center.\n\n5. Position: Percentiles, Quartiles, and IQR:\n• Percentiles: The p-th percentile is the threshold below which approximately p% of the observations fall.\n• Quartiles divide ordered data into 4 equal quarters:\n  - Q1 (25th percentile): Lower quarter.\n  - Q2 (50th percentile): Median.\n  - Q3 (75th percentile): Upper quarter.\n• Interquartile Range (IQR = Q3 - Q1): The spread of the middle 50% of the dataset. Unlike the standard deviation, the IQR is immune to extreme values in either tail. This is why John Tukey used 1.5 × IQR in Topic 2.5 to establish outer outlier fences.\n\n6. The Five-Number Summary:\n[Minimum, Q1, Median, Q3, Maximum]. This five-value tuple provides a comprehensive, outlier-resistant profile of any numerical distribution and forms the exact architectural skeleton of the Box Plot.\n\n7. Pandas describe() Architecture:\nPandas `.describe()` summarizes numerical Series with count, mean, std (sample std with ddof=1), min, 25%, 50%, 75%, and max. An expert data scientist mentally partitions this output into Center (mean, 50%), Spread (std, 25%, 75%, IQR), and Extremes (min, max).',
    bulletPoints: [
      'Descriptive statistics summarize observed data—they do NOT prove causation or explain underlying mechanisms.',
      'Population metrics use Greek letters (μ, σ, N); Sample metrics use Latin letters (x̄, s, n).',
      'The Mean is the physical balancing point where the sum of signed deviations strictly equals 0.',
      'The Mean is sensitive to extreme values; the Median is resistant and robust up to a 50% contamination rate.',
      'Use the Mean for approximately symmetric data; use the Median for skewed or outlier-heavy distributions.',
      'Identical means can have vastly different spreads: average is never sufficient without a dispersion metric.',
      'Deviations are squared to prevent positive and negative values from canceling each other out.',
      'Sample variance divides by (n - 1) to eliminate downward bias (Bessel’s correction).',
      'Standard deviation is the square root of variance, returning the metric to the original unit scale.',
      'Quartiles partition sorted data into quarters: Q1 (25%), Q2 (Median, 50%), Q3 (75%).',
      'IQR = Q3 - Q1 measures the spread of the middle 50% and powers the Tukey outlier detection rule.',
      'The Five-Number Summary [Min, Q1, Median, Q3, Max] provides a robust statistical profile.',
      'Pandas describe() groups into Center (mean, 50%), Spread (std, 25%, 75%), and Extremes (min, max).',
    ],
    equations: [
      '\\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i',
      '\\sum_{i=1}^{n} (x_i - \\bar{x}) = 0',
      '\\sigma^2 = \\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2',
      's^2 = \\frac{1}{n - 1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2',
      's = \\sqrt{s^2} = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}',
      '\\text{IQR} = Q_3 - Q_1',
      '\\text{Five-Number Summary} = [\\text{Min}, Q_1, \\text{Median}, Q_3, \\text{Max}]',
    ],
  },
  codeExamples: [
    {
      title: '1. NumPy Vectorized Descriptive Statistics',
      description: 'Compute mean, median, min, max, variance, and standard deviation with NumPy.',
      language: 'python',
      code: `import numpy as np

# Student examination marks out of 100
marks = np.array([72, 81, 65, 92, 78, 88, 54, 88, 78, 95])

# Center metrics
mean_val = np.mean(marks)          # 79.1
median_val = np.median(marks)      # 79.5

# Spread metrics
min_val = np.min(marks)            # 54.0
max_val = np.max(marks)            # 95.0
range_val = np.ptp(marks)          # 41.0 (peak-to-peak)
pop_std = np.std(marks)            # 11.70 (ddof=0, population)
sample_std = np.std(marks, ddof=1) # 12.33 (ddof=1, sample)

# Percentiles and Quartiles
q1 = np.percentile(marks, 25)      # 73.5
q3 = np.percentile(marks, 75)      # 88.0
iqr = q3 - q1                      # 14.5

print(f"Mean: {mean_val:.1f} | Median: {median_val:.1f}")
print(f"Sample SD: {sample_std:.2f} | IQR: {iqr:.1f}")`,
      lineExplanations: [
        { line: 4, text: 'Create a 1D NumPy array representing examination marks.' },
        { line: 7, text: 'np.mean() calculates the arithmetic average across the array.' },
        { line: 8, text: 'np.median() sorts the array internally and computes the central value.' },
        { line: 13, text: 'np.std() defaults to ddof=0 (population standard deviation).' },
        { line: 14, text: 'Pass ddof=1 to compute sample standard deviation with (n - 1) in the denominator.' },
        { line: 17, text: 'np.percentile() computes the 25th percentile using linear interpolation.' },
        { line: 19, text: 'IQR = Q3 - Q1 represents the dispersion of the central 50%.' },
      ],
      output: `Mean: 79.1 | Median: 79.5\nSample SD: 12.33 | IQR: 14.5`,
    },
    {
      title: '2. Pandas Series Statistical Profile & describe()',
      description: 'Using Pandas to compute column statistics and deconstructing describe().',
      language: 'python',
      code: `import pandas as pd

# Creating a DataFrame of student exam performance
df = pd.DataFrame({
    'Student': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    'Marks': [72, 81, 65, 92, 78, 88, 54, 88, 78, 95]
})

# Individual Pandas statistics (Note: Pandas uses ddof=1 by default!)
count_obs = df['Marks'].count()  # Excludes missing NaN values!
mean_val = df['Marks'].mean()    # 79.1
median_val = df['Marks'].median()# 79.5
mode_val = df['Marks'].mode().tolist() # [78, 88] (Bimodal!)
sample_std = df['Marks'].std()   # 12.33 (sample SD)

# Full descriptive summary
summary = df['Marks'].describe()
print(summary)`,
      lineExplanations: [
        { line: 4, text: 'Define a 10-row DataFrame with student marks.' },
        { line: 10, text: 'df.count() returns the number of non-null observations.' },
        { line: 13, text: 'df.mode() returns a Series of most frequent values; can be multimodal.' },
        { line: 14, text: 'df.std() in Pandas defaults to ddof=1 (sample standard deviation), unlike NumPy!' },
        { line: 17, text: 'describe() outputs count, mean, std, min, 25%, 50%, 75%, and max.' },
      ],
      output: `count    10.000000\nmean     79.100000\nstd      12.332883\nmin      54.000000\n25%      73.500000\n50%      79.500000\n75%      88.000000\nmax      95.000000\nName: Marks, dtype: float64`,
    },
    {
      title: '3. Five-Number Summary and IQR Outlier Fences',
      description: 'Computing Tukey fences programmatically to inspect potential extremes.',
      language: 'python',
      code: `import pandas as pd

scores = pd.Series([45, 50, 52, 55, 58, 60, 61, 65, 70, 95])

# Five-Number Summary
min_val = scores.min()
q1 = scores.quantile(0.25)
median_val = scores.median()
q3 = scores.quantile(0.75)
max_val = scores.max()
iqr = q3 - q1

# Tukey Fences (From Topic 2.5)
lower_fence = q1 - 1.5 * iqr  # 52.75 - 1.5 * 11.25 = 35.875
upper_fence = q3 + 1.5 * iqr  # 64.00 + 1.5 * 11.25 = 80.875

# Flag potential outliers
potential_outliers = scores[(scores < lower_fence) | (scores > upper_fence)]
print("Five-Number Summary:", [min_val, q1, median_val, q3, max_val])
print(f"IQR: {iqr} | Fences: [{lower_fence}, {upper_fence}]")
print(f"Potential Outliers: {potential_outliers.values.tolist()}")`,
      lineExplanations: [
        { line: 3, text: 'Sample test score distribution with a potential high outlier (95).' },
        { line: 7, text: 'quantile(0.25) returns Q1; quantile(0.75) returns Q3.' },
        { line: 10, text: 'IQR = Q3 - Q1 represents the span of the middle 50%.' },
        { line: 13, text: 'Compute Tukey lower fence (Q1 - 1.5×IQR).' },
        { line: 14, text: 'Compute Tukey upper fence (Q3 + 1.5×IQR).' },
        { line: 17, text: 'Score 95 exceeds the upper fence (80.875) and warrants investigation.' },
      ],
      output: `Five-Number Summary: [45, 52.75, 59.0, 64.0, 95]\nIQR: 11.25 | Fences: [35.875, 80.875]\nPotential Outliers: [95]`,
    },
  ],
  commonMistakes: [
    {
      mistake: '“The Mean is always the best measure of central tendency.”',
      why: 'Students assume the arithmetic average is universally superior because it is the most familiar formula.',
      correction:
        'When data is skewed or contains extreme values (e.g., salaries, house prices, web traffic spikes), the mean is dragged into the tail. The median often provides a far more honest depiction of a "typical" observation.',
    },
    {
      mistake: '“The Median is always better than the Mean.”',
      why: 'Students over-correct after learning about outliers and assume the median should replace the mean everywhere.',
      correction:
        'The mean has critical mathematical properties: it is algebraically tractable, incorporates every single data point, and is required for hypothesis tests and linear regression. Context and distribution shape dictate which measure is best.',
    },
    {
      mistake: '“Standard deviation tells us the exact distance of every data point from the mean.”',
      why: 'Students confuse a statistical average with a deterministic rule.',
      correction:
        'Standard deviation is an aggregate summary of typical dispersion. Individual observations may sit right at the mean (0 distance) or 2.5 standard deviations away.',
    },
    {
      mistake: '“A large standard deviation means the dataset is bad or full of errors.”',
      why: 'Equating statistical dispersion with measurement error or low quality.',
      correction:
        'High standard deviation simply indicates substantial natural diversity (e.g., net worth across a country, rainfall across seasons). It reflects variability, not defectiveness.',
    },
    {
      mistake: '“Range tells us everything we need to know about spread.”',
      why: 'Assuming Range = Max - Min captures the entire spread of the cohort.',
      correction:
        'Range only considers the two extreme endpoints. Two datasets can have the exact same range of 80 (e.g., [10, 50, 50, 50, 90] vs [10, 20, 80, 85, 90]) while having radically different internal cluster densities and standard deviations.',
    },
    {
      mistake: '“Mode only works for numerical data.”',
      why: 'Thinking mode is restricted to integer counts.',
      correction:
        'Mode is the primary measure of central tendency for categorical variables (e.g., most common operating system, most popular product category, most frequent flight destination).',
    },
    {
      mistake: '“Q1 literally contains exactly 25% of all observations inside it.”',
      why: 'Misinterpreting a boundary value as a container.',
      correction:
        'Q1 is a boundary value below which approximately 25% of observations fall. It does not "contain" points, and depending on interpolation methods and sample sizes, exact percentages may vary slightly.',
    },
    {
      mistake: '“Descriptive statistics prove causation between variables.”',
      why: 'Assuming that because two summarized metrics align or a mean is high, one caused the other.',
      correction:
        'Descriptive statistics describe what has been observed in the data. They provide clues, but proving cause and effect requires controlled experiments, domain theory, or causal inference frameworks.',
    },
    {
      mistake: '“The Median never changes when an extreme outlier changes.”',
      why: 'Believing the median is completely impervious to any modification.',
      correction:
        'If an outlier changes from 300 to 3,000, the median does not change. But if data points shift across the central rank boundary, or if sample size changes, the median can and does shift. It has a 50% breakdown point, not infinite immunity.',
    },
    {
      mistake: '“Population and sample formulas are identical.”',
      why: 'Using N in sample variance or conflating Greek (μ, σ) and Latin (x̄, s) symbols.',
      correction:
        'Sample variance divides by (n - 1) rather than N (Bessel’s correction) to ensure the sample statistic is an unbiased estimator of the true population parameter.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'When should I report the Mean versus the Median?',
      context: 'Auditing a new metric column before presenting an executive summary.',
      reasoning:
        'Check distribution symmetry. Compute both mean and median. If |Mean - Median| / SD is small, data is approximately symmetric; report Mean for precision. If there is a massive gap (e.g. Mean = ₹45k, Median = ₹26k), data is skewed; report Median as the typical case and note the Mean to highlight the tail impact.',
      ruleOfThumb: 'Symmetric → Mean. Skewed or heavy tails → Median. Categorical → Mode.',
    },
    {
      question: 'How do I interpret two datasets with identical Means but different SDs?',
      context: 'Comparing battery lifetimes from two manufacturers, both claiming an average of 50 hours.',
      reasoning:
        'Averages alone deceive. Manufacturer A has SD = 1 hour (consistent, reliable, 48–52 hours). Manufacturer B has SD = 20 hours (erratic, risky, 10–90 hours). Spread reveals reliability.',
      ruleOfThumb: 'Never evaluate a center without pairing it with a measure of spread.',
    },
    {
      question: 'Is a high maximum score necessarily an error?',
      context: 'Observing a test score of 95 when class average is 59 and Q3 is 64.',
      reasoning:
        'Statistical flags (such as Tukey upper fences) do not equal data-entry errors. A student scoring 95 could be a subject prodigy. Always cross-examine student attendance, prior coursework, and submission logs before labeling it corrupted.',
      ruleOfThumb: 'Statistics flag potential anomalies; domain knowledge verifies truth.',
    },
    {
      question: 'How should I deconstruct Pandas describe() output in 10 seconds?',
      context: 'Running df.describe() on an unfamiliar 100,000-row tabular dataset.',
      reasoning:
        'Scan in 3 phases: 1. Center: Compare mean vs 50% (median) for skew. 2. Spread: Compare std with mean, and compute IQR (75% - 25%). 3. Extremes: Compare min and max with Q1 and Q3 to spot potential outliers.',
      ruleOfThumb: 'Center → Spread → Extremes: the 3-step diagnostic scan.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'What does the arithmetic mean represent conceptually?',
      options: [
        'The value that occurs most frequently in the sample.',
        'The middle observation after sorting the dataset in ascending order.',
        'The physical balance point of the data where the sum of deviations equals zero.',
        'The difference between the maximum and minimum observations.',
      ],
      correctIndex: 2,
      explanation:
        'The arithmetic mean represents the center of mass or balancing point. Summing (x_i - mean) across all observations strictly equals zero.',
    },
    {
      id: 'q2',
      question: 'Why must we sort a dataset in ascending or descending order before calculating the median?',
      options: [
        'Because Python throws an error if an array is unsorted.',
        'Because the median is a rank-order statistic that represents the middle physical position of sorted values.',
        'Because sorting removes all missing values automatically.',
        'Because sorting changes the mean into the median.',
      ],
      correctIndex: 1,
      explanation:
        'The median is a positional/rank statistic. Without sorting, the value at position n/2 has no relationship to the central magnitude of the distribution.',
    },
    {
      id: 'q3',
      question: 'Which measure of central tendency is generally more robust (resistant) when a single extreme outlier is introduced?',
      options: [
        'The Arithmetic Mean.',
        'The Median.',
        'The Range.',
        'The Standard Deviation.',
      ],
      correctIndex: 1,
      explanation:
        'The median is resistant to extreme values because changing a number in the upper tail does not alter which sorted value sits in the exact middle.',
    },
    {
      id: 'q4',
      question: 'What does the standard deviation communicate to a data scientist?',
      options: [
        'The exact distance that every observation sits from the minimum.',
        'The typical scale of variation or dispersion of observations around the mean in original units.',
        'The probability that the dataset contains missing values.',
        'The difference between the 75th percentile and 25th percentile.',
      ],
      correctIndex: 1,
      explanation:
        'Standard deviation measures the typical scale of dispersion around the mean, measured in the original unit of the data.',
    },
    {
      id: 'q5',
      question: 'What does the Interquartile Range (IQR = Q3 - Q1) measure?',
      options: [
        'The total range between the absolute maximum and minimum.',
        'The spread of the middle 50% of sorted observations.',
        'The sum of the top 25% and bottom 25% observations.',
        'The average distance of all points from the median.',
      ],
      correctIndex: 1,
      explanation:
        'IQR is the distance between the 75th percentile (Q3) and 25th percentile (Q1), capturing the exact spread of the middle 50% of the cohort.',
    },
    {
      id: 'q6',
      question: 'What is another name for the Second Quartile (Q2)?',
      options: [
        'The Mean.',
        'The Mode.',
        'The Median (50th percentile).',
        'The Standard Error.',
      ],
      correctIndex: 2,
      explanation:
        'Q2 represents the 50th percentile, which splits the ordered dataset exactly in half—the definition of the Median.',
    },
    {
      id: 'q7',
      question: 'What is the key distinction between a Population and a Sample in statistics?',
      options: [
        'A population uses Latin letters (x̄, s) while a sample uses Greek letters (μ, σ).',
        'A population is the entire cohort under study (parameter μ); a sample is a subset drawn to learn about the cohort (statistic x̄).',
        'A population has fewer than 100 rows, while a sample has more than 100 rows.',
        'A population contains missing values, but a sample never does.',
      ],
      correctIndex: 1,
      explanation:
        'A population encompasses every entity of interest (parameter μ, σ). A sample is an observed subset used to infer properties of that population (statistic x̄, s).',
    },
    {
      id: 'q8',
      question: 'If two classes have an identical mean exam score of 50, but Class A has SD = 1.4 while Class B has SD = 28.3, what does this imply?',
      options: [
        'Both classes performed identically and have indistinguishable score patterns.',
        'Class A had very consistent scores clustered near 50, while Class B had wide dispersion with both very high and very low scores.',
        'Class A must have had missing data.',
        'Class B has an incorrect average calculation.',
      ],
      correctIndex: 1,
      explanation:
        'Identical means with vastly different standard deviations show that Class A was tightly clustered and consistent, whereas Class B was widely scattered.',
    },
    {
      id: 'q9',
      question: 'Why is the Median preferred over the Mean when reporting typical tech salaries in a company with 100 junior engineers and 1 billionaire founder?',
      options: [
        'Because the founder’s massive salary pulls the arithmetic mean far higher than what almost any employee actually earns.',
        'Because Python cannot calculate the mean for numbers larger than ₹1 Crore.',
        'Because the median is always equal to zero for salaries.',
        'Because the company will pay less tax if they report the median.',
      ],
      correctIndex: 0,
      explanation:
        'Heavily right-skewed salary distributions have high averages driven by executive outliers. The median reflects what a typical employee actually receives.',
    },
    {
      id: 'q10',
      question: 'Do descriptive statistics alone prove cause and effect (causation)?',
      options: [
        'Yes, any time the standard deviation is less than 5.',
        'Yes, because Pandas describe() is mathematically validated.',
        'No, descriptive statistics summarize observed data patterns, but never establish why the relationship occurred or prove causation.',
        'Yes, provided we calculate both the mean and the median.',
      ],
      correctIndex: 2,
      explanation:
        'Descriptive statistics quantify and summarize observed distributions. Establishing causation requires controlled experiments, counterfactuals, or causal modeling.',
    },
  ],
  summary: {
    takeaways: [
      'Descriptive statistics compress thousands of observations into an interpretable profile: Center, Spread, and Position.',
      'Central Tendency answers "Where is the typical value?": Mean (balancing point), Median (middle rank), and Mode (highest frequency).',
      'The Mean is sensitive to extreme values; the Median is resistant and robust in skewed distributions.',
      'Spread answers "How dispersed are the values?": Range (extremes), Variance (squared deviations), and Standard Deviation (spread in original units).',
      'Sample variance divides by (n - 1) to eliminate downward bias (Bessel’s correction).',
      'Position answers "Where does a value rank?": Percentiles, Quartiles (Q1, Q2, Q3), and IQR (middle 50% span).',
      'The Five-Number Summary [Min, Q1, Median, Q3, Max] provides a robust statistical portrait.',
      'Pandas df.describe() can be rapidly diagnosed by scanning Center (mean, 50%), Spread (std, IQR), and Extremes (min, max).',
      'Descriptive statistics describe what has been observed—they never prove cause and effect.',
      'Next up: Numbers alone do not show the shape of data. What if two datasets share the same mean and SD, but have radically different distribution shapes?',
    ],
    nextUpText: '3.2 Distributions & Skewness — Uncovering bell curves, bimodal peaks, right/left skew, and probability density functions.',
  },
  prevTopic: {
    slug: 'numpy-and-pandas-operations',
    title: '2.7 NumPy & Pandas Operations',
  },
  nextTopic: {
    slug: 'distributions-and-skewness',
    title: '3.2 Distributions & Skewness',
  },
};
