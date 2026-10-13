import { LessonContent } from '@/types/lesson';

export const topic3_2: LessonContent = {
  id: 'm3-t2',
  topicNumber: '3.2',
  slug: 'distributions',
  moduleId: 'module-3',
  title: 'Distributions',
  subtitle:
    'The Architecture of Data: Frequency, Grouping, Histograms, Shape, Modality, Skewness, and Normal Intuition',
  estimatedMinutes: 35,
  difficulty: 'Intermediate',
  tags: [
    'Distributions',
    'Exploratory Data Analysis',
    'Frequency Table',
    'Relative Frequency',
    'Grouped Data',
    'Histograms',
    'Bin Width & Boundaries',
    'Distribution Shapes',
    'Skewness',
    'Modality',
    'Unimodal vs Bimodal',
    'Spread & Concentration',
    'Outliers vs Long Tails',
    'Empirical vs Theoretical',
    'Normal Distribution',
    '68-95-99.7 Rule',
    'Cumulative Frequency',
    'NumPy & Pandas',
    'Matplotlib Preview',
  ],
  objectives: [
    'Explain the central EDA axiom: "Statistics summarize the numbers. Distributions reveal how the numbers behave."',
    'Differentiate why datasets with identical means and standard deviations can exhibit radically divergent patterns.',
    'Deconstruct the 4 foundational pillars of any distribution: Center, Spread, Shape, and Unusual Observations.',
    'Construct and interpret Frequency and Relative Frequency tables for discrete and continuous observations.',
    'Explain class intervals, bin boundaries, bin widths, and why continuous grouping requires unambiguous interval conventions.',
    'Distinguish between Histograms (continuous numerical intervals, adjacent touching bins) and Bar Charts (discrete categorical bins).',
    'Demonstrate how altering histogram bin widths changes visual interpretation without altering underlying raw observations.',
    'Identify and categorize core distribution shapes: Symmetric, Right-Skewed, Left-Skewed, Uniform, Unimodal, Bimodal, and Multimodal.',
    'Quantify and interpret Skewness as directional tail asymmetry, explaining why mean > median is a tendency rather than an absolute rule.',
    'Analyze Peaks and Modality to formulate data-generating hypotheses (e.g., investigating mixed cohorts without assuming proof of two populations).',
    'Contrast an isolated outlier from an inherently long-tailed distribution, establishing that extreme observations should not be blindly deleted.',
    'Distinguish between Empirical Distributions (observed sample data) and Theoretical Distributions (mathematical probability models).',
    'Develop rigorous intuition for the Normal Distribution: symmetry, mean-median-mode coincidence, unit area, and the 68–95–99.7 rule.',
    'Compute and interpret Cumulative Frequency and ogive step curves to answer threshold queries ("How many fall at or below X?").',
    'Write runnable Python (NumPy, Pandas, Matplotlib) scripts to compute frequencies and generate production histograms.',
    'Solve real-world diagnostic case studies across exams, tech salaries, food delivery latency, and web traffic spikes.',
    'Complete the Campus Placement Mystery capstone challenge by auditing claims made by an institution.',
    'Prepare for Topic 3.3: Data Visualization using Matplotlib & Seaborn.',
  ],
  hook: {
    title: 'The Mystery of Two Classrooms: Same Average, Completely Different Realities',
    story:
      'Imagine two engineering sections, Class A and Class B, take the exact same Midterm Examination in Data Science. The department head proudly announces: "Both classrooms performed at an identical average of 50.0 marks!" Hearing this, parents and administrators assume the two sections performed identically. But when you inspect the raw score sheets, a startling revelation emerges. In Class A, students scored [45, 47, 49, 50, 50, 51, 53, 55]—every single student hovered tightly between 45 and 55. In Class B, students scored [10, 20, 30, 40, 60, 70, 80, 90]—half the class failed miserably while the other half scored near perfection. Both classes share a mean of 50.0, but their educational realities are worlds apart. Summary statistics told you where the center was; the distribution revealed how the numbers actually behaved.',
    analogy:
      'Imagine a scout reporting that the average depth of a river is 3 feet. A traveler who cannot swim steps into the water and drowns, because the river is 6 inches deep across 95% of its width, but contains a sudden 25-foot trench in the middle. The average was mathematically accurate (3 feet), but the distribution of depth was life-critical. In data science, relying solely on an average without inspecting the distribution is like wading into an uncharted river based on its mean depth.',
    realWorldImpact:
      'In tech infrastructure, a cloud engineering team tracks server response latency. If the average response time is reported as 120 ms, everything seems healthy. However, plotting the distribution reveals a severe right skew: 98% of queries finish in 25 ms, while 2% encounter a database lock and take 4,800 ms (nearly 5 seconds). The average concealed the fact that 20,000 customers every hour were experiencing intolerable frozen screens. Distributions reveal what averages hide.',
  },
  coreConcept: {
    headline: 'Statistics Summarize the Numbers. Distributions Reveal How the Numbers Behave.',
    explanation:
      'A distribution describes how values of a variable are spread across possible ranges and how frequently those values occur. Rather than compressing thousands of observations into a single number, a distribution provides the complete anatomical blueprint of the dataset across four diagnostic dimensions: Center, Spread, Shape, and Unusual Values.',
    keyPillars: [
      {
        title: '1. Center',
        description:
          'Where do observations tend to cluster or balance? Quantified by the Mean (center of gravity), Median (middle rank), and Mode (highest local frequency).',
      },
      {
        title: '2. Spread',
        description:
          'How widely scattered are the observations around that center? Measured by Range, Interquartile Range (IQR), Variance, and Standard Deviation.',
      },
      {
        title: '3. Shape',
        description:
          'What geometric pattern do the observations trace? Characterized by Symmetry vs Skewness (tail direction) and Modality (number of prominent peaks).',
      },
      {
        title: '4. Unusual Values',
        description:
          'Are there isolated outliers or long asymptotic tails? Critical for identifying measurement artifacts, rare events, or distinct underlying processes.',
      },
    ],
  },
  interactiveType: 'distribution-lab',
  technicalExplanation: {
    title: 'Mathematical Rigor, Binning Mechanics, Shape Diagnostics, and Theoretical Density',
    deepDive:
      '1. What Is a Distribution?\n' +
      'A distribution maps every possible value (or interval of values) of a random variable to its corresponding count or probability of occurrence.\n\n' +
      '2. Frequency & Relative Frequency:\n' +
      '• Frequency (f_i): The absolute count of times a specific value x_i occurs in sample S = {x_1, x_2, ..., x_n}.\n' +
      '• Relative Frequency (rf_i = f_i / n): The empirical proportion of observations belonging to value x_i, where 0 ≤ rf_i ≤ 1 and Σ rf_i = 1.0 (100%).\n' +
      'Example: In S = [60, 70, 70, 80, 80, 80, 90], n = 7.\n' +
      'Value 80 appears 3 times. Frequency = 3. Relative Frequency = 3/7 ≈ 0.4286 (42.86%).\n\n' +
      '3. Grouped Frequency Distributions & Binning:\n' +
      'When working with large continuous datasets, listing distinct values produces a sparse, noisy table. We partition the domain [min, max] into k contiguous class intervals or bins: [b_0, b_1), [b_1, b_2), ..., [b_{k-1}, b_k].\n' +
      '• Bin Width w = (max - min) / k for uniform bins.\n' +
      '• Boundary Rule: A single documented convention must be applied (typically left-closed, right-open [a, b), with the final bin [a, b] inclusive of the maximum value) so that every observation belongs to exactly one bin.\n\n' +
      '4. Histograms vs. Bar Charts:\n' +
      '• Histogram: Represents the frequency distribution of a continuous numerical variable. The horizontal axis represents ordered numeric intervals; adjacent rectangles touch because the numerical space is continuous.\n' +
      '• Bar Chart: Compares discrete, unordered categorical groups (e.g., Department, City). Bars have deliberate spaces between them because categories do not form a continuous metric continuum.\n' +
      '• Frequency vs Density: For equal bin widths, bar height directly represents frequency. For unequal bin widths, bar height must represent frequency density = (Relative Frequency / Bin Width), ensuring that rectangle area represents probability.\n\n' +
      '5. Distribution Shapes & Modality:\n' +
      '• Symmetric: Balanced evenly on both sides of the center. Mean ≈ Median ≈ Mode.\n' +
      '• Right-Skewed (Positive Skew): Bulk of observations are low, with a prolonged right tail stretching toward extreme high values. Tail pulls the Mean > Median.\n' +
      '• Left-Skewed (Negative Skew): Bulk of observations are high, with an extended left tail stretching toward extreme low values. Tail pulls the Mean < Median.\n' +
      '• Uniform: Approximately equal frequency across all intervals. Flat profile.\n' +
      '• Modality: Unimodal (one dominant peak), Bimodal (two distinct prominent peaks), Multimodal (multiple peaks). Two peaks suggest a hypothesis of two mixed sub-populations, but do not prove it.\n\n' +
      '6. Quantifying Skewness:\n' +
      '• Directional Rule: Skewness describes where the tail stretches, not where the peak sits.\n' +
      '• Fisher-Pearson Standardized Moment Coefficient:\n' +
      '  G_1 = [n / ((n - 1)(n - 2))] × Σ [(x_i - x̄) / s]³\n' +
      '  - G_1 > 0: Right-skewed (positive)\n' +
      '  - G_1 < 0: Left-skewed (negative)\n' +
      '  - G_1 ≈ 0: Near-zero skewness (approx. symmetric)\n\n' +
      '7. Outliers vs. Long Tails:\n' +
      '• An Outlier is an individual observation that appears atypical under a diagnostic rule (e.g., Tukey 1.5×IQR fence).\n' +
      '• A Long Tail is an inherent structural property of the distribution where extreme values naturally occur with decreasing, non-zero probability (e.g., Power law, Pareto, Exponential).\n' +
      '• Outlier detection does not equate to automatic deletion; genuine extreme phenomena (e.g., unicorn startup valuation, earthquake intensity) must be modeled, not erased.\n\n' +
      '8. Empirical vs. Theoretical Distributions:\n' +
      '• Empirical Distribution: Constructed strictly from observed, sampled real-world data points.\n' +
      '• Theoretical Distribution: A clean mathematical probability model defined by an analytical equation with fixed parameters (e.g., Normal Distribution N(μ, σ²)).\n\n' +
      '9. The Normal Distribution (Gaussian Curve):\n' +
      'Probability Density Function: f(x) = [1 / (σ√(2π))] × exp[-0.5 × ((x - μ) / σ)²]\n' +
      '• Perfect symmetry around μ.\n' +
      '• Mean = Median = Mode at x = μ.\n' +
      '• Total area under the density curve is strictly 1.0.\n' +
      '• The 68–95–99.7 Empirical Rule:\n' +
      '  - Approx. 68.27% of observations fall within μ ± 1σ.\n' +
      '  - Approx. 95.45% of observations fall within μ ± 2σ.\n' +
      '  - Approx. 99.73% of observations fall within μ ± 3σ.\n\n' +
      '10. Cumulative Frequency:\n' +
      'Counts the total number of observations at or below a specified threshold X: F(X) = Σ_{x_i ≤ X} f_i.\n' +
      'Forms a monotonically non-decreasing ogive/step curve, terminating strictly at sample size n.',
    bulletPoints: [
      'Statistics summarize the numbers; distributions reveal how those numbers are arranged.',
      'A distribution is fully characterized by 4 dimensions: Center, Spread, Shape, and Unusual Values.',
      'Frequency is the raw count; Relative Frequency is the proportion (f_i / n), summing to 1.0.',
      'Histograms plot continuous numerical intervals with touching bars; Bar Charts compare separate categories with gaps.',
      'Changing histogram bin width alters visible visual patterns without changing underlying raw data.',
      'Right-skewed (positive) distributions have longer tails to the right; the Mean is typically pulled above the Median.',
      'Left-skewed (negative) distributions have longer tails to the left; the Mean is typically pulled below the Median.',
      'A bimodal histogram exhibits two prominent peaks; this generates a hypothesis of sub-groups, not automatic proof.',
      'Same center does NOT imply same spread: Class A [45..55] and Class B [10..90] both have Mean = 50.',
      'An outlier is an individual unusual data point; a long tail is an overarching distribution property.',
      'Empirical distributions stem from observed samples; theoretical distributions are mathematical probability models.',
      'The Normal Distribution is symmetric with mean=median=mode; area is 1; 68–95–99.7% fall within 1, 2, and 3 SDs.',
      'Cumulative frequency counts observations at or below threshold X, producing a non-decreasing step curve ending at n.',
    ],
    equations: [
      'Relative Frequency: rf_i = f_i / n',
      'Normal Density: f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left(-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2\\right)',
      'Fisher-Pearson Skewness: G_1 = \\frac{n}{(n-1)(n-2)} \\sum_{i=1}^n \\left(\\frac{x_i - \\bar{x}}{s}\\right)^3',
      'Cumulative Frequency: F(X) = \\sum_{x_i \\le X} f_i',
      'Bin Width: w = \\frac{\\max(x) - \\min(x)}{k}',
    ],
  },
  codeExamples: [
    {
      title: 'Exploring Distributions with NumPy, Pandas, and Matplotlib',
      description:
        'Compute central metrics, calculate frequency tables with Pandas value_counts(), and render a histogram with Matplotlib.',
      language: 'python',
      code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# 1. Raw synthetic exam marks (10 students)
marks = np.array([45, 50, 55, 60, 60, 65, 70, 75, 80, 95])

# 2. Compute summary statistics
mean_val = np.mean(marks)
median_val = np.median(marks)
pop_sd = np.std(marks)          # Population SD (ddof=0)
sample_sd = np.std(marks, ddof=1) # Sample SD (ddof=1)

print(f"Count: {len(marks)}")
print(f"Mean: {mean_val:.2f}")
print(f"Median: {median_val:.2f}")
print(f"Population SD: {pop_sd:.2f}")
print(f"Sample SD: {sample_sd:.2f}")

# 3. Frequency & Relative Frequency Table using Pandas
s = pd.Series(marks)
freq_table = pd.DataFrame({
    'Frequency': s.value_counts().sort_index(),
    'Relative_Freq': (s.value_counts(normalize=True).sort_index()),
    'Cum_Freq': s.value_counts().sort_index().cumsum()
})
print("\\nFrequency Distribution Table:")
print(freq_table)

# 4. Generate Histogram using Matplotlib
plt.figure(figsize=(8, 4.5))
counts, bins, patches = plt.hist(
    marks,
    bins=5,
    edgecolor="black",
    color="#0f62fe",
    alpha=0.75
)

# Overlay Mean and Median markers
plt.axvline(mean_val, color="#da1e28", linestyle="--", linewidth=2, label=f"Mean ({mean_val:.1f})")
plt.axvline(median_val, color="#24a148", linestyle="-", linewidth=2, label=f"Median ({median_val:.1f})")

plt.xlabel("Exam Marks")
plt.ylabel("Number of Students (Frequency)")
plt.title("Distribution of Student Marks (5 Bins)")
plt.legend()
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.show()`,
      lineExplanations: [
        { line: 5, text: 'Create a 1D NumPy array of 10 student test marks.' },
        { line: 8, text: 'Compute arithmetic mean: sum(marks) / 10 = 65.5.' },
        { line: 9, text: 'Compute median: average of 5th and 6th elements (60 + 65) / 2 = 62.5.' },
        { line: 10, text: 'np.std(marks) calculates population standard deviation using N in denominator.' },
        { line: 11, text: 'Passing ddof=1 applies Bessel’s correction (n - 1) for sample standard deviation.' },
        { line: 20, text: 'pd.Series.value_counts() computes discrete frequency counts sorted by score.' },
        { line: 21, text: 'Setting normalize=True yields relative frequencies summing to 1.0.' },
        { line: 22, text: '.cumsum() produces running cumulative frequencies ending at 10.' },
        { line: 27, text: 'plt.hist partitions the data into 5 equal-width intervals [45..55), [55..65), etc.' },
        { line: 36, text: 'axvline overlays vertical reference lines for Mean and Median to evaluate skewness visually.' },
      ],
      output: `Count: 10
Mean: 65.50
Median: 62.50
Population SD: 14.22
Sample SD: 14.99

Frequency Distribution Table:
    Frequency  Relative_Freq  Cum_Freq
45          1            0.1         1
50          1            0.1         2
55          1            0.1         3
60          2            0.2         5
65          1            0.1         6
70          1            0.1         7
75          1            0.1         8
80          1            0.1         9
95          1            0.1        10`,
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming every symmetric distribution is a Normal (Gaussian) distribution.',
      why: 'Symmetry merely means both sides of the center mirror each other. A Uniform distribution, a Bimodal double-dome, or a Laplace tent are all perfectly symmetric, but none of them are Normal bell curves.',
      correction:
        'Verify bell-shape, asymptotic tails, and the 68-95-99.7 rule before asserting normality. Never equate symmetry with normality.',
    },
    {
      mistake: 'Believing every real-world dataset must follow a normal distribution.',
      why: 'Countless foundational phenomena are inherently non-normal: wealth and incomes are Pareto/right-skewed, wait times are Exponential, dice rolls are Uniform, and machine failures follow Weibull.',
      correction:
        'Always plot the empirical distribution first. Do not force normal assumptions onto skewed or bounded processes.',
    },
    {
      mistake: 'Confusing a Histogram with a Bar Chart.',
      why: 'A bar chart displays discrete, separate categories with spaces between bars. A histogram displays continuous numerical intervals where adjacent bars touch.',
      correction:
        'Use histograms for continuous numerical variables (marks, latency, weights). Use bar charts for categorical groupings (departments, operating systems).',
    },
    {
      mistake: 'Assuming that positive skew means "most values are high".',
      why: 'Positive skewness describes where the elongated tail points—to the positive (right) side. The bulk of observations actually bunch together at low values.',
      correction:
        'Remember: Skewness names the tail, not the peak! Right-skewed = long right tail, most data on the left.',
    },
    {
      mistake: 'Assuming two peaks in a histogram prove the existence of exactly two populations.',
      why: 'Random sampling noise, inappropriate bin widths, or non-linear measurement scales can create artifactual twin peaks. Even if real, it is a hypothesis requiring independent verification.',
      correction:
        'Treat bimodal peaks as an invitation to investigate sub-groups (e.g., color-code by section or department). Do not claim proof from a histogram alone.',
    },
    {
      mistake: 'Believing that changing the number of histogram bins alters the underlying data.',
      why: 'Binning is purely a visual rendering choice. The original observations in memory remain 100% identical regardless of whether you choose 3 bins or 30 bins.',
      correction:
        'Experiment with multiple bin counts (Sturges’ rule, Freedman-Diaconis) to ensure visual patterns are robust and not binning artifacts.',
    },
    {
      mistake: 'Believing that every extreme outlier must be deleted from the dataset.',
      why: 'Outliers frequently represent genuine, high-value real-world events (e.g., a billion-dollar startup acquisition, a flash crash, a record storm). Deleting them creates false confidence.',
      correction:
        'Distinguish data-entry errors (e.g., age = 999) from genuine extreme events. Never delete genuine observations without rigorous business justification.',
    },
    {
      mistake: 'Assuming Mean and Median must be exactly identical in an approximately symmetric sample.',
      why: 'Real-world empirical data contains natural sampling fluctuations. A sample mean of 50.2 and median of 50.0 is thoroughly consistent with symmetry.',
      correction:
        'Expect minor empirical differences in sample estimates. Exact mathematical equality holds only for idealized theoretical models.',
    },
    {
      mistake: 'Confusing a long tail with measurement error.',
      why: 'Processes governed by multiplicative growth or queuing dynamics (e.g., website load times, hospital recovery stays) naturally generate asymptotic long tails.',
      correction:
        'Recognize heavy-tailed phenomena. Model them with log-transforms or Pareto models rather than misdiagnosing them as sensor defects.',
    },
    {
      mistake: 'Assuming that identical means imply identical distributions.',
      why: 'Class A [45..55] and Class B [10..90] both have Mean = 50, but Class A is tight and predictable while Class B has huge polarization.',
      correction:
        'Always report Center alongside Spread and Shape. An average by itself tells you nothing about consistency.',
    },
    {
      mistake: 'Treating a histogram as proof of cause and effect (causation).',
      why: 'Histograms describe empirical frequencies. They display what happened, but cannot explain why it happened or what variable caused the distribution.',
      correction:
        'Maintain the scientific distinction: distributions provide exploratory evidence, not causal mechanisms.',
    },
    {
      mistake: 'Using unequal bin widths without frequency density scaling.',
      why: 'If bin widths vary but rectangle heights still show raw frequencies, wider bins appear visually exaggerated because the human eye perceives area as magnitude.',
      correction:
        'When bin widths vary, plot Density (Frequency / Width) on the vertical axis so that rectangle area remains strictly proportional to frequency.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'How do I choose the best measure of center for a distribution?',
      context: 'You are analyzing salary benchmarks, server latency, or student exam marks.',
      reasoning:
        'First plot the histogram. If the distribution is roughly symmetric without long tails, use the Mean (it utilizes every data point). If the distribution is skewed or has extreme upper outliers, use the Median (it resists extreme distortion). If the data is categorical or multi-modal, inspect the Mode.',
      ruleOfThumb: 'Symmetric → Mean. Skewed or Outliers → Median. Discrete peaks → Mode.',
    },
    {
      question: 'How do I distinguish an outlier from a heavy-tailed distribution?',
      context: 'A few observations sit far to the right of the bulk of the data.',
      reasoning:
        'Look at the spacing between points. If there is a massive empty void followed by an isolated single point (e.g., 10, 11, 12, 13, 14, 100), it behaves as an isolated outlier. If there is a smooth, continuous taper of progressively rarer values (e.g., 10, 12, 15, 20, 28, 42, 65, 105), it is a long tail.',
      ruleOfThumb: 'Isolated gap → Outlier candidate. Smooth continuous decay → Heavy tail.',
    },
    {
      question: 'How many bins should I use when building a histogram?',
      context: 'Too few bins hides detail (undersmoothing); too many bins creates noisy spikes (oversmoothing).',
      reasoning:
        'Start with Sturges’ rule: k = 1 + log2(n). For n=100, k ≈ 8 bins. For n=1000, k ≈ 11 bins. Then interactively vary the bin count between 5 and 15 to ensure peaks and skewness remain consistent.',
      ruleOfThumb: 'Use Sturges’ rule as a baseline, then verify that key features persist across neighboring bin widths.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'What does a statistical distribution fundamentally describe?',
      options: [
        'Only the arithmetic average of a collection of numbers.',
        'How values of a variable are arranged across possible ranges and how frequently they occur.',
        'The proof of cause and effect between two unrelated variables.',
        'The method by which software packages store floating-point numbers in memory.',
      ],
      correctIndex: 1,
      explanation:
        'A distribution provides the complete map of how observations are spread across intervals and their associated frequencies or probabilities.',
    },
    {
      id: 'q2',
      question: 'In the dataset [60, 70, 70, 80, 80, 80, 90], what is the frequency of 80?',
      options: ['1', '2', '3', '7'],
      correctIndex: 2,
      explanation:
        'Frequency is the raw count of occurrences. The number 80 appears exactly 3 times in the dataset.',
    },
    {
      id: 'q3',
      question: 'In the dataset [60, 70, 70, 80, 80, 80, 90], what is the relative frequency of 80?',
      options: ['3 / 7 (approx. 42.86%)', '3 / 80 (approx. 3.75%)', '80 / 7 (approx. 11.43)', '3 / 4 (75%)'],
      correctIndex: 0,
      explanation:
        'Relative frequency = Frequency / Total Count = 3 / 7 ≈ 0.4286 (42.86%).',
    },
    {
      id: 'q4',
      question: 'Which tail is elongated in a positively skewed (right-skewed) distribution?',
      options: [
        'The left tail toward smaller values.',
        'The right tail toward larger values.',
        'Both tails are completely identical.',
        'A positively skewed distribution has no tails.',
      ],
      correctIndex: 1,
      explanation:
        'Skewness is named after the direction of the elongated tail. Positive skew has a long tail stretching to the right (larger values).',
    },
    {
      id: 'q5',
      question: 'How does a histogram differ structurally from a categorical bar chart?',
      options: [
        'Histograms use round circles while bar charts use rectangles.',
        'Histograms group continuous numerical intervals with touching bars; bar charts compare discrete categories with spaces.',
        'Histograms can only be drawn using Python, while bar charts must be drawn in Excel.',
        'There is no structural difference; the two names are interchangeable synonyms.',
      ],
      correctIndex: 1,
      explanation:
        'Histograms plot continuous numerical intervals where adjacent bars touch. Bar charts compare discrete separate categories with gaps between bars.',
    },
    {
      id: 'q6',
      question: 'What does a "bimodal" distribution indicate?',
      options: [
        'The dataset contains exactly two numbers in total.',
        'The distribution exhibits two prominent, distinct peaks or local maxima.',
        'The mean is strictly twice the size of the median.',
        'The dataset has a standard deviation of 2.0.',
      ],
      correctIndex: 1,
      explanation:
        'Bimodal means the distribution has two prominent peaks, which often suggests the mixture of two sub-groups.',
    },
    {
      id: 'q7',
      question: 'What does Standard Deviation measure in a distribution?',
      options: [
        'The exact middle observation in the sorted dataset.',
        'The typical dispersion or spread of observations around the mean in original measurement units.',
        'The percentage of observations that were recorded with sensor errors.',
        'The difference between the maximum observation and zero.',
      ],
      correctIndex: 1,
      explanation:
        'Standard deviation measures the characteristic scale of variation around the center, expressed in the original unit of measurement.',
    },
    {
      id: 'q8',
      question: 'Does altering the number of histogram bins change the raw data points in memory?',
      options: [
        'Yes, it permanently deletes observations that fall outside the new bins.',
        'No, binning is purely a visual rendering choice; the raw data points remain completely unchanged.',
        'Yes, but only if the bin count is an odd number.',
        'Yes, it rounds every raw number to the bin center.',
      ],
      correctIndex: 1,
      explanation:
        'Binning only groups data for display. The underlying raw observations are never altered by changing the histogram bin count.',
    },
    {
      id: 'q9',
      question: 'Is every symmetric distribution a Normal (Gaussian) distribution?',
      options: [
        'Yes, symmetry is the only requirement for normality.',
        'No, a distribution can be symmetric without being normal (e.g., Uniform, Bimodal, or Laplace).',
        'Yes, provided its sample size is greater than 30.',
        'Yes, as long as the mean is greater than zero.',
      ],
      correctIndex: 1,
      explanation:
        'Symmetry simply means both sides mirror each other. A Uniform distribution or a twin-peak bimodal curve are symmetric, but neither is Normal.',
    },
    {
      id: 'q10',
      question: 'What does Cumulative Frequency represent for a given value threshold X?',
      options: [
        'The difference between the highest value and threshold X.',
        'The total count of observations that fall at or below threshold X.',
        'The sum of all values divided by threshold X.',
        'The product of the mean and threshold X.',
      ],
      correctIndex: 1,
      explanation:
        'Cumulative frequency counts how many observations fall at or below threshold X, forming a non-decreasing step curve.',
    },
    {
      id: 'q11',
      question: 'According to the 68–95–99.7 Empirical Rule, approximately what proportion of a Normal distribution falls within ±2 standard deviations of the mean?',
      options: ['50.0%', '68.3%', '95.4%', '99.7%'],
      correctIndex: 2,
      explanation:
        'In an idealized normal distribution, approximately 68% falls within ±1 SD, 95% falls within ±2 SDs, and 99.7% falls within ±3 SDs.',
    },
    {
      id: 'q12',
      question: 'Do two peaks in an empirical histogram automatically prove the existence of two distinct sub-populations?',
      options: [
        'Yes, two peaks are definitive mathematical proof of two populations.',
        'No, two peaks formulate a plausible hypothesis, but random sampling noise or binning artifacts could also create twin peaks.',
        'Yes, but only if both peaks have exactly the same height.',
        'No, because histograms can never show more than one peak.',
      ],
      correctIndex: 1,
      explanation:
        'Twin peaks suggest a hypothesis of mixed sub-groups, but do not constitute definitive proof without independent demographic or domain validation.',
    },
  ],
  summary: {
    takeaways: [
      'A distribution shows how values are arranged and how frequently they occur across their range.',
      'A distribution is diagnosed across 4 pillars: Center, Spread, Shape, and Unusual Values.',
      'Frequency is the raw count; Relative Frequency is the proportion (f_i / n), summing to 1.0 (100%).',
      'Histograms plot continuous numerical intervals with touching bars; Bar Charts compare separate categories.',
      'Changing histogram bin width alters visible patterns without changing the raw data points.',
      'Symmetry, Skewness (right or left tail), and Modality (unimodal, bimodal) define the distribution geometry.',
      'Same center does NOT imply same spread: identical means can conceal radically different consistency.',
      'An outlier is an individual anomalous observation; a long tail is an overarching structural property.',
      'Empirical distributions reflect observed samples; theoretical distributions are idealized mathematical models.',
      'The Normal Distribution is bell-shaped and symmetric with unit area; follows the 68–95–99.7 empirical rule.',
      'Cumulative frequency counts observations at or below threshold X, producing an ogive curve ending at n.',
      '"The average tells you where the center is. The distribution reveals what happens around that center."',
    ],
    nextUpText: '3.3 Data Visualization Using Matplotlib & Seaborn — Create, customize, and communicate distribution plots programmatically.',
  },
  prevTopic: {
    slug: 'descriptive-statistics',
    title: '3.1 Descriptive Statistics',
  },
  nextTopic: {
    slug: 'data-visualization-and-chart-selection',
    title: '3.3 Data Visualization & Chart Selection',
  },
};
