import { LessonContent } from '@/types/lesson';

export const topic2_5: LessonContent = {
  id: 'm2-t5',
  topicNumber: '2.5',
  slug: 'outliers-detection-and-treatment',
  moduleId: 'module-2',
  title: 'Outliers Detection & Treatment',
  subtitle: 'Diagnosing Anomalous Observations: Five-Number Summary, IQR Rule, Z-Scores, Univariate vs Multivariate, and Contextual Treatment (Keep, Correct, Remove, Cap, Transform)',
  estimatedMinutes: 35,
  difficulty: 'Intermediate',
  tags: [
    'Outliers',
    'Data Cleaning',
    'Five-Number Summary',
    'Quartiles',
    'IQR (Interquartile Range)',
    '1.5 × IQR Rule',
    'Z-Score',
    'Box Plots',
    'Mean vs Median',
    'Winsorization / Capping',
    'Multivariate Outliers',
    'Contextual Treatment',
  ],
  objectives: [
    'Explain what an outlier is and understand that an outlier is NOT automatically a data-entry error.',
    'Explain why outliers matter in Data Science: their impact on the mean, variance, regression models, and visualizations.',
    'Recognize potential outliers visually using scatter plots, histograms, and box plots.',
    'Compute and interpret the Five-Number Summary: Minimum, Q1 (25th percentile), Median (50th percentile), Q3 (75th percentile), and Maximum.',
    'Calculate the Interquartile Range (IQR = Q3 - Q1) and explain how it represents the spread of the middle 50% of the data.',
    'Apply the 1.5 × IQR rule to compute Lower Fences (Q1 - 1.5 × IQR) and Upper Fences (Q3 + 1.5 × IQR) to flag potential outliers.',
    'Implement IQR outlier detection programmatically using Pandas quantile() methods.',
    'Understand the conceptual intuition of the Z-Score (z = (x - μ) / σ) and compare its properties and assumptions with the IQR method.',
    'Explain why the mean and standard deviation are sensitive to extreme values while the median and IQR remain robust.',
    'Distinguish between univariate outliers (unusual on a single dimension) and multivariate outliers (unusual combinations across dimensions).',
    'Understand why context is the decisive factor in determining whether an unusual value is a corrupted error or a critical breakthrough signal.',
    'Master the 5 core outlier treatment strategies: Keep (preserve valid events), Correct (fix verified errors), Remove (filter invalid records), Cap/Winsorize (clip extreme bounds), and Transform (log/power).',
    'Apply the 9-step Outlier Investigation Checklist before modifying any dataset.',
    'Conduct post-treatment validation to ensure distributions, record counts, and data integrity remain sound.',
    'Prepare for downstream Data Formatting & Normalization in Topic 2.6.',
  ],
  hook: {
    title: 'The Exam Score of 3: Terrible Mistake or Tragic Reality?',
    story:
      'Imagine you are auditing final semester marks for 1,000 engineering students in Computer Science. Almost everyone scored between 72 and 81 marks. Suddenly, your terminal prints two anomalous numbers: Student 48 scored 95, and Student 82 scored 3. If an automated script rigidly flags anything outside the average and deletes it, both students are wiped from the database. But what if Student 48 is a competitive programming prodigy who legitimately aced every question? And what if Student 82 suffered an acute asthma attack 10 minutes into the exam and handed in an incomplete paper with 3 marks? In Topic 2.4, you learned how to handle missing data when a cell is empty. In this topic, we confront values that ARE present—but look wildly different from everything around them. An outlier is a signal to investigate, not an instruction to delete.',
    analogy:
      'Think of an outlier like a smoke detector blaring in a building. If the sensor went off because someone burned toast in the kitchen, the alarm is technically noise for the fire department. But if the detector went off because the electrical room is in flames, that extreme reading is the single most valuable data point in the entire city. Deleting the outlier without looking out the window is like pulling the batteries out of the smoke detector so you can sleep in peace while the building burns.',
    realWorldImpact:
      'In credit card fraud detection, 99.9% of transactions are mundane coffee purchases of ₹250. An anomalous purchase of ₹4,50,000 in jewelry at 3:00 AM in Dubai is an extreme outlier—and that outlier is the multi-million-dollar fraud alert banks spend billions trying to catch. In contrast, in astronomy, NASA sensors mistakenly discarded early atmospheric ozone depletion data because computer algorithms automatically classified extreme ozone holes as "impossible measurement errors". Ignoring or blindly deleting outliers can blind an entire scientific discipline.',
  },
  coreConcept: {
    headline: 'The Outlier Lifecycle: Detect, Measure, Investigate, Treat & Validate',
    explanation:
      'Outliers are not mathematical pests to be erased. They are empirical observations that reside far from the central tendency of the data. Professional data scientists diagnose whether an anomaly is a genuine real-world extreme, a measurement artifact, or a catastrophic data-entry mistake before choosing an evidence-based treatment.',
    keyPillars: [
      {
        title: '1. Spot & Measure (IQR & Z-Score)',
        description:
          'Use the Five-Number Summary, Box Plot visual fences (Q1 - 1.5×IQR, Q3 + 1.5×IQR), and standardized Z-scores to mathematically flag potential anomalies.',
      },
      {
        title: '2. Investigate Context & Mechanisms',
        description:
          'Audit the data source, units of measurement, physical constraints, and correlated variables to determine if the observation is a valid extreme or a corrupted error.',
      },
      {
        title: '3. Strategic Decision Framework',
        description:
          'Choose between Keeping (rare real events), Correcting (clerical fixes), Removing (provably invalid population entries), Capping/Winsorizing (extreme tails), or Transforming (log scale).',
      },
      {
        title: '4. Post-Treatment Epistemic Audit',
        description:
          'Always re-verify summary statistics, distribution shapes, sample size loss, and downstream machine learning model sensitivity after applying outlier treatments.',
      },
    ],
  },
  interactiveType: 'outlier-lab',
  technicalExplanation: {
    title: 'The Theory, Detection, and Strategic Treatment of Outliers in Data Science',
    deepDive:
      'The foundational mental model of outlier detection and treatment follows an unbroken diagnostic workflow:\n\nRAW DATASET → VISUAL INSPECTION → FIVE-NUMBER SUMMARY → IQR / Z-SCORE DETECTION → CONTEXTUAL INVESTIGATION (Error vs Signal) → TREATMENT (Keep/Correct/Remove/Cap/Transform) → POST-VALIDATION → CLEAN ANALYTICAL MATRIX\n\n1. What is an Outlier?\nAn outlier is an empirical observation that lies an abnormal distance from other values in a random sample from a population. Crucially, an outlier is NOT synonymous with an error. Outliers arise from six primary origins:\n• Natural Variation & Rare Real-World Events: Super-rich individuals in wealth studies, Olympic sprinters in 100m sprint times, or jackpot lottery winners.\n• Data-Entry / Typographical Clerical Errors: A human typing `1500` instead of `15.00` for body temperature, or adding an extra zero (`₹10,000` typed as `₹1,00,000`).\n• Measurement & Instrument Failures: A faulty thermocouple reporting `-999°C`, or a voltage spike causing a digital sensor to spike to its maximum hardware limit.\n• Unit & Conversion Mismatches: Mixing imperial and metric units (e.g. recording weight in pounds for one patient and kilograms for another without converting).\n• Multi-Population Contamination: Ingesting data from wholesale B2B corporate buyers and retail B2C shoppers into the same ecommerce basket table.\n• Malicious / Adversarial Injections: Credit card theft transactions, distributed denial of service (DDoS) packet floods, or fraudulent insurance claims.\n\n2. The Five-Number Summary & Quartiles:\nTo understand data spread without being misled by extreme values, statisticians use the Five-Number Summary:\n• Minimum: The lowest observed value that is not an outlier.\n• First Quartile (Q1 / 25th Percentile): The value below which 25% of the sorted observations fall.\n• Median (Q2 / 50th Percentile): The middle observation that splits the dataset in half.\n• Third Quartile (Q3 / 75th Percentile): The value below which 75% of the sorted observations fall.\n• Maximum: The highest observed value that is not an outlier.\n\n3. The Interquartile Range (IQR) & The 1.5 × IQR Rule:\nThe Interquartile Range measures the statistical spread of the middle 50% of the distribution:\n\nIQR = Q3 - Q1\n\nJohn Tukey formulated the famous Boxplot Fences rule to identify *potential* outliers:\n• Lower Fence = Q1 - (1.5 × IQR)\n• Upper Fence = Q3 + (1.5 × IQR)\n\nAny data point x < Lower Fence or x > Upper Fence is flagged as a *potential outlier*. Note the vital technical nuance: Tukey fences do not prove a value is incorrect; they merely establish a statistical threshold beyond which observations warrant human investigation.\n\n4. Z-Score (Standard Score) Detection:\nFor approximately symmetric, bell-shaped distributions, the Z-score measures how many standard deviations (σ) an observation (x) lies from the arithmetic mean (μ):\n\nz = (x - μ) / σ\n\nHeuristic Rules:\n• |z| > 2: Mildly unusual (~5% probability in standard normal distribution).\n• |z| > 3: Potential outlier (~0.27% probability in standard normal distribution).\n\nKey Limitation of Z-Score: Both μ (mean) and σ (standard deviation) are themselves non-robust statistics heavily distorted by the very outliers you are attempting to detect! An extreme value inflates μ and blows up σ, making other real outliers appear artificially closer to the mean (a statistical phenomenon known as *masking*). IQR, by contrast, relies on rank-ordered percentiles (Q1, Q3) which are immune to single extreme values.\n\n5. Univariate vs. Multivariate Outliers:\n• Univariate Outlier: An observation that is extreme on a single isolated variable (e.g. Salary = ₹10 Crore).\n• Multivariate Outlier: An observation whose individual features appear completely normal in isolation, but whose *combination* across multiple dimensions is astronomically improbable (e.g. Age = 19 [normal], Years of Work Experience = 25 [normal], but together in the same record: Age 19 with 25 years experience is physically impossible).\n\n6. Outlier Treatment Strategies:\n• Keep: Retain the observation unchanged. Mandatory when the value represents a verified, real-world extreme phenomenon (fraud, high-net-worth customers, rare weather events).\n• Correct: Replace the erroneous value with the verified true value (e.g. dividing a mistakenly entered `1500` cm height by 10 to obtain `150` cm).\n• Remove (Filter): Drop the row from analysis. Justifiable ONLY when the record represents a proven measurement defect or an observation outside the defined target population.\n• Cap / Winsorize: Clip extreme values to predefined lower and upper percentiles (e.g. replacing all values > 99th percentile with the 99th percentile value). This limits the distortive mathematical leverage of extreme values on linear models without discarding the record entirely.\n• Transform: Apply monotonic non-linear mathematical transformations (such as `np.log1p(x)` or Box-Cox) to compress long right-skewed tails into a bell-shaped distribution.\n\n7. Post-Treatment Validation:\nNever conclude outlier cleaning without checking:\n1. Did the sample size drop excessively?\n2. Did the distribution variance change reasonably?\n3. Were any genuine rare signals accidentally erased?\n4. Are minimum and maximum values now physically plausible?',
    bulletPoints: [
      'An outlier is an observation far from the central tendency—it is NOT automatically an error.',
      'Origins of outliers: natural variation, human typos, sensor dropouts, unit mismatches, multi-population mixtures, and fraud/malice.',
      'The Five-Number Summary (Min, Q1, Median, Q3, Max) provides a robust description of spread independent of extreme values.',
      'Interquartile Range: IQR = Q3 - Q1 represents the spread of the middle 50% of sorted observations.',
      'Tukey Fences: Lower Fence = Q1 - 1.5×IQR, Upper Fence = Q3 + 1.5×IQR flag potential outliers for human review.',
      'Z-Scores (z = (x - μ) / σ) measure standard deviation distance from the mean, but suffer from masking in skewed datasets.',
      'The mean is sensitive to extreme values; the median is resistant and robust up to a 50% breakdown point.',
      'Univariate outliers are extreme in one dimension; Multivariate outliers are impossible combinations across multiple features.',
      'The 5 Treatment Strategies: Keep (valid extremes), Correct (verified typos), Remove (defective records), Cap/Winsorize (clip extreme tails), and Transform (log scale).',
      'Always validate record counts, variance shifts, and model sensitivity after outlier remediation.',
    ],
    equations: [
      'IQR = Q_3 - Q_1',
      '\\text{Lower Fence} = Q_1 - 1.5 \\times \\text{IQR}',
      '\\text{Upper Fence} = Q_3 + 1.5 \\times \\text{IQR}',
      'z = \\frac{x - \\mu}{\\sigma}',
      'y = \\ln(1 + x)',
    ],
  },
  codeExamples: [
    {
      title: '1. Programmatic IQR Outlier Detection with Pandas',
      description: 'Calculate Q1, Q3, IQR, and filter potential outliers using boolean indexing.',
      language: 'python',
      code: `import pandas as pd
import numpy as np

# Sample dataset: Daily retail store sales in thousands (₹)
sales_data = pd.Series([12, 14, 15, 14, 16, 15, 13, 17, 14, 15, 16, 95, 2])

# Step 1: Calculate First (Q1) and Third (Q3) Quartiles
Q1 = sales_data.quantile(0.25)
Q3 = sales_data.quantile(0.75)

# Step 2: Compute Interquartile Range (IQR)
IQR = Q3 - Q1

# Step 3: Compute Tukey's Inner Fences
lower_fence = Q1 - 1.5 * IQR
upper_fence = Q3 + 1.5 * IQR

print(f"Five-Number Quartiles: Q1 = {Q1}, Q3 = {Q3}, IQR = {IQR}")
print(f"Outlier Fences: Lower = {lower_fence:.2f}, Upper = {upper_fence:.2f}")

# Step 4: Flag and extract potential outliers
outliers = sales_data[(sales_data < lower_fence) | (sales_data > upper_fence)]
print(f"\\nIdentified Potential Outliers:\\n{outliers}")`,
      lineExplanations: [
        { line: 8, text: 'quantile(0.25) calculates the 25th percentile (Q1) of the sorted values.' },
        { line: 9, text: 'quantile(0.75) calculates the 75th percentile (Q3) of the sorted values.' },
        { line: 12, text: 'IQR is the difference between Q3 and Q1, representing the middle 50% spread.' },
        { line: 15, text: 'Lower fence = Q1 - 1.5 * IQR. Values below this threshold are flagged.' },
        { line: 16, text: 'Upper fence = Q3 + 1.5 * IQR. Values above this threshold are flagged.' },
        { line: 22, text: 'Boolean OR (|) filters all records falling outside either boundary fence.' },
      ],
      output: `Five-Number Quartiles: Q1 = 14.0, Q3 = 16.0, IQR = 2.0
Outlier Fences: Lower = 11.00, Upper = 19.00

Identified Potential Outliers:
11    95
12     2
dtype: int64`,
    },
    {
      title: '2. Z-Score Outlier Detection Using SciPy & Pandas',
      description: 'Compute standardized Z-scores to identify observations beyond 3 standard deviations.',
      language: 'python',
      code: `import pandas as pd
import numpy as np
from scipy import stats

# Exam marks for a class of students
df = pd.DataFrame({
    "student_id": [101, 102, 103, 104, 105, 106, 107, 108],
    "marks": [72, 75, 78, 81, 79, 77, 74, 3]  # Notice 3 is severely low
})

# Step 1: Calculate Mean and Standard Deviation
mean_val = df["marks"].mean()
std_val = df["marks"].std()

# Step 2: Compute Z-Score for each observation: z = (x - mean) / std
df["z_score"] = (df["marks"] - mean_val) / std_val

# Step 3: Flag observations where absolute z-score > 2.0
df["is_outlier"] = df["z_score"].abs() > 2.0

print("--- Computed Z-Scores & Outlier Flags ---")
print(df[["student_id", "marks", "z_score", "is_outlier"]])`,
      lineExplanations: [
        { line: 12, text: 'Compute arithmetic mean (note: 3 drags the mean down from 76.5 to 67.3).' },
        { line: 13, text: 'Compute sample standard deviation (inflated heavily by the outlier).' },
        { line: 16, text: 'Calculate the standardized z-score measuring standard deviations from the mean.' },
        { line: 19, text: 'abs() > 2.0 checks both extreme upper and extreme lower tails.' },
      ],
      output: `--- Computed Z-Scores & Outlier Flags ---
   student_id  marks   z_score  is_outlier
0         101     72  0.177281       False
1         102     75  0.291757       False
2         103     78  0.406233       False
3         104     81  0.520709       False
4         105     79  0.444391       False
5         106     77  0.368074       False
6         107     74  0.253598       False
7         108      3 -2.462043        True`,
    },
    {
      title: '3. Outlier Treatment: Capping (Winsorization) & Log Transformation',
      description: 'Apply Winsorization with np.clip() and non-linear log transformation.',
      language: 'python',
      code: `import pandas as pd
import numpy as np

# Highly skewed customer transaction amounts (₹)
df = pd.DataFrame({
    "customer": ["A", "B", "C", "D", "E", "F", "G"],
    "amount": [450, 520, 480, 510, 600, 490, 85000]  # ₹85,000 is an extreme spike
})

# Treatment Strategy A: Winsorization (Capping at 5th and 95th Percentiles)
lower_pct = df["amount"].quantile(0.05)
upper_pct = df["amount"].quantile(0.95)

# np.clip replaces values < lower with lower, and values > upper with upper
df["amount_capped"] = df["amount"].clip(lower=lower_pct, upper=upper_pct)

# Treatment Strategy B: Log Transformation (Compresses exponential orders of magnitude)
df["amount_log"] = np.log1p(df["amount"])

print("--- Comparison of Original, Capped, and Log-Transformed Values ---")
print(df[["customer", "amount", "amount_capped", "amount_log"]].round(2))`,
      lineExplanations: [
        { line: 11, text: 'Calculate the 5th percentile lower boundary for clipping.' },
        { line: 12, text: 'Calculate the 95th percentile upper boundary for clipping.' },
        { line: 15, text: 'clip() replaces extreme tail values without deleting the records.' },
        { line: 18, text: 'np.log1p(x) computes log(1 + x), compressing ₹85,000 to 11.35.' },
      ],
      output: `--- Comparison of Original, Capped, and Log-Transformed Values ---
  customer   amount  amount_capped  amount_log
0        A   450.00         459.00        6.11
1        B   520.00         520.00        6.26
2        C   480.00         480.00        6.18
3        D   510.00         510.00        6.24
4        E   600.00         600.00        6.40
5        F   490.00         490.00        6.20
6        G 85000.00       59680.00       11.35`,
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming every outlier is "bad data" and immediately deleting it with drop().',
      why: 'In cybersecurity, healthcare, astronomy, and finance, outliers represent fraud alerts, rare diseases, supernova events, and high-net-worth customers. Deleting them destroys the primary analytical objective.',
      correction: 'Investigate the data-generating mechanism first. Keep valid real-world events, and only delete records that are provably corrupt or outside the study population.',
      wrongCode: 'df_cleaned = df[df["income"] < 1000000] # Blindly deletes all high-income users',
      correctCode: '# Audit if user is verified high-net-worth or fraudulent\nif is_valid_population(record):\n    pass # Keep record or use robust model\nelse:\n    df = df.drop(index)',
    },
    {
      mistake: 'Believing the 1.5 × IQR rule is a universal, infallible mathematical proof of error.',
      why: 'Tukey’s 1.5 × IQR rule is a heuristic designed to flag potential candidates for human review. In skewed or non-normal distributions, standard bounds flag 1-5% of perfectly valid data points as outliers.',
      correction: 'Treat 1.5 × IQR as an exploratory filter to prioritize data inspection, never as an automated executioner.',
    },
    {
      mistake: 'Using Z-Scores to detect outliers on heavily skewed or multi-modal datasets.',
      why: 'The Z-score formula assumes the underlying distribution is roughly symmetric and bell-shaped. Furthermore, extreme outliers distort the mean (μ) and blow up standard deviation (σ), causing "masking".',
      correction: 'Use rank-based methods like IQR and percentiles for skewed distributions. Reserve Z-scores for approximately normal, standardized features.',
    },
    {
      mistake: 'Assuming the median is 100% immune to outliers in every conceivable circumstance.',
      why: 'While the median is vastly more robust than the mean, if you introduce multiple extreme values that cross the 50th percentile rank, the median will shift.',
      correction: 'Understand that median is robust up to a 50% breakdown point, but always inspect the full Five-Number Summary.',
    },
    {
      mistake: 'Thinking outliers can only exist as extraordinarily huge numbers.',
      why: 'Outliers can be extraordinarily small (e.g. a student score of 3, a temperature of -40°C, or a transaction of ₹0.001).',
      correction: 'Always check both the lower fence (Q1 - 1.5×IQR) and upper fence (Q3 + 1.5×IQR).',
    },
    {
      mistake: 'Believing that Capping / Winsorization discovers the "true" underlying value.',
      why: 'Capping simply replaces extreme numbers with threshold percentiles to stabilize linear regression weights. It modifies the dataset and creates artificial clusters at the fences.',
      correction: 'Document that capped records are modified approximations, not ground-truth measurements.',
    },
    {
      mistake: 'Ignoring multivariate outliers because individual column values look normal in isolation.',
      why: 'A patient with Height = 190 cm (normal) and Weight = 25 kg (normal for a child) is physically impossible in the same adult record.',
      correction: 'Cross-examine correlated features and multidimensional relationships before declaring data clean.',
    },
    {
      mistake: 'Applying outlier treatments without validating pre- and post-cleaning statistical distributions.',
      why: 'Removing rows can inadvertently discard 20% of your training sample or drastically distort category ratios.',
      correction: 'Always run df.shape, df.describe(), and plot distributions before and after treatment.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'Is this unusual value a data-entry corruption or a legitimate extreme phenomenon?',
      context: 'You encounter a transaction of ₹5,00,000 in an ecommerce store where the average basket size is ₹600.',
      reasoning:
        'Check customer metadata: did a verified corporate enterprise buyer purchase 500 units in bulk for Diwali gifting? If yes, the value is 100% legitimate and represents a high-value B2B segment. If a guest user placed 20 orders in 3 seconds with stolen cards, it is fraud.',
      ruleOfThumb:
        'Never ask "Is this number big?" Ask "Could this number physically and legitimately occur in this domain?"',
    },
    {
      question: 'Should I use IQR or Z-Score to measure extremity?',
      context: 'You are preprocessing customer annual incomes, which are heavily right-skewed with a few billionaire outliers.',
      reasoning:
        'In right-skewed data, extreme billionaires inflate the mean and standard deviation, distorting Z-scores. IQR uses rank percentiles (Q1, Q3) which are unaffected by the magnitude of the billionaires.',
      ruleOfThumb:
        'Skewed or heavy-tailed distribution → Use IQR. Symmetric normal distribution → Z-score is acceptable.',
    },
    {
      question: 'When is Capping (Winsorization) superior to Row Deletion?',
      context: 'You have 5,000 patient records in a clinical study. 15 patients have unusually high blood pressure readings (210 mmHg) that would distort a linear regression model.',
      reasoning:
        'Deleting the 15 patients discards all their other medical biomarkers (cholesterol, age, genetic tests). Capping their blood pressure at the 99th percentile (e.g. 185 mmHg) preserves their records while preventing numerical explosion in gradient descent.',
      ruleOfThumb:
        'Valuable multi-feature record with extreme tail → Cap / Winsorize. Purely corrupted single measurement → Delete or correct.',
    },
    {
      question: 'How do I detect Multivariate Outliers that pass univariate checks?',
      context: 'A loan applicant dataset where Age = 20 (normal) and Years in Current Job = 15 (normal).',
      reasoning:
        'Individually, 20 is a valid age and 15 years in a job is valid. But 20 - 15 = 5 years old when starting the job. Cross-feature arithmetic rules catch multivariate impossibilities.',
      ruleOfThumb:
        'Formulate domain constraint rules: (Feature_A - Feature_B > Physical_Limit).',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'Which of the following statements best describes an outlier in Data Science?',
      options: [
        'An outlier is always a coding bug or human typographical error that must be erased.',
        'An outlier is an observation that lies unusually far from other values in the dataset and warrants investigation.',
        'An outlier is any value that equals zero or is missing in a Pandas DataFrame.',
        'An outlier is the exact mathematical mean of the middle 50% of sorted numbers.',
      ],
      correctIndex: 1,
      explanation:
        'An outlier is an observation unusually distant from the central distribution. It can be a genuine extreme event, an error, or a vital signal; it is NOT automatically bad data.',
    },
    {
      id: 'q2',
      question: 'Given a sorted dataset with Q1 = 30 and Q3 = 70, what is the Interquartile Range (IQR)?',
      options: [
        'IQR = 50',
        'IQR = 100',
        'IQR = 40',
        'IQR = 20',
      ],
      correctIndex: 2,
      explanation:
        'The Interquartile Range is calculated as IQR = Q3 - Q1 = 70 - 30 = 40.',
    },
    {
      id: 'q3',
      question: 'Using the 1.5 × IQR rule with Q1 = 30 and Q3 = 70 (IQR = 40), what are the Lower and Upper Outlier Fences?',
      options: [
        'Lower Fence = -30, Upper Fence = 130',
        'Lower Fence = 0, Upper Fence = 100',
        'Lower Fence = 10, Upper Fence = 90',
        'Lower Fence = -40, Upper Fence = 140',
      ],
      correctIndex: 0,
      explanation:
        'Lower Fence = Q1 - (1.5 × IQR) = 30 - (1.5 × 40) = 30 - 60 = -30. Upper Fence = Q3 + (1.5 × IQR) = 70 + (1.5 × 40) = 70 + 60 = 130.',
    },
    {
      id: 'q4',
      question: 'In a dataset of 5 values: [10, 11, 12, 13, 14], the mean is 12. If an outlier of 100 is added ([10, 11, 12, 13, 14, 100]), how do the Mean and Median respond?',
      options: [
        'Both the Mean and the Median jump to 50.',
        'The Mean jumps dramatically from 12 to 26.67, while the Median shifts only slightly from 12 to 12.5.',
        'The Median jumps to 100 while the Mean stays exactly at 12.',
        'Neither the Mean nor the Median changes at all.',
      ],
      correctIndex: 1,
      explanation:
        'The arithmetic mean incorporates the magnitude of every point and is heavily distorted (26.67). The median depends on rank order and shifts minimally (from 12 to (12+13)/2 = 12.5), demonstrating its robustness.',
    },
    {
      id: 'q5',
      question: 'What is a major mathematical weakness of using Z-Score (z = (x - μ) / σ) for outlier detection in skewed datasets?',
      options: [
        'Z-scores can only be computed for text strings, not numbers.',
        'Both the mean (μ) and standard deviation (σ) are inflated by the extreme outliers, masking their true abnormality.',
        'Z-scores always return zero regardless of the input data.',
        'Z-scores require the dataset to have exactly 100 rows.',
      ],
      correctIndex: 1,
      explanation:
        'Extreme outliers artificially pull the mean towards themselves and blow up standard deviation, causing other true outliers to have smaller z-scores than they deserve (masking effect).',
    },
    {
      id: 'q6',
      question: 'In credit card transaction processing, why should you NOT automatically delete an outlier purchase of ₹4,50,000?',
      options: [
        'Because deleting numbers in Python causes a computer memory leak.',
        'Because that single outlier transaction may be the exact credit card fraud event you are building a model to detect.',
        'Because the 1.5 × IQR rule strictly forbids deleting positive numbers.',
        'Because credit card transactions must always have a normal bell-shaped distribution.',
      ],
      correctIndex: 1,
      explanation:
        'In fraud and security domains, the extreme outliers are the primary target of interest. Deleting them eliminates the exact fraud patterns you need to detect.',
    },
    {
      id: 'q7',
      question: 'What is a "Multivariate Outlier"?',
      options: [
        'A value that is missing across multiple columns simultaneously.',
        'A record where individual variable values look normal in isolation, but their combination across features is highly improbable.',
        'A column that contains more than 50% categorical strings.',
        'An outlier that occurs in more than 10 different CSV files.',
      ],
      correctIndex: 1,
      explanation:
        'A multivariate outlier is an unusual combination of features (e.g. Age = 19 with 25 years of work experience), even though 19 is a normal age and 25 is a normal experience number.',
    },
    {
      id: 'q8',
      question: 'What does "Winsorization" (Capping) do to extreme outlier values in a dataset?',
      options: [
        'It converts all numbers into logarithms.',
        'It replaces extreme values beyond specific percentile bounds (e.g. 1st and 99th) with the threshold values themselves.',
        'It deletes the entire column from the DataFrame.',
        'It replaces all outliers with NaN.',
      ],
      correctIndex: 1,
      explanation:
        'Winsorization clips extreme values to designated percentiles (e.g. values > 99th percentile become the 99th percentile), preserving sample size while curbing extreme variance.',
    },
    {
      id: 'q9',
      question: 'Why is a temperature reading of 45°C considered a potential outlier in a Bengaluru winter dataset, but normal in a Rajasthan summer dataset?',
      options: [
        'Because Python uses different formulas for Bengaluru and Rajasthan.',
        'Because outlier detection is fundamentally contextual and depends entirely on the reference population and environment.',
        'Because Celsius temperature can only be measured using Z-scores.',
        'Because winter datasets cannot have numbers larger than 20.',
      ],
      correctIndex: 1,
      explanation:
        'Outlier status is not an intrinsic property of a number; it depends entirely on domain context, geography, seasonality, and population expectations.',
    },
    {
      id: 'q10',
      question: 'What is the correct sequence of the Outlier Mental Model before modifying data?',
      options: [
        'DELETE → COMPLAIN → GUESS → IGNORE',
        'DETECT → MEASURE → INVESTIGATE → UNDERSTAND → TREAT → VALIDATE',
        'CAP → DROP → REPEAT → PUBLISH',
        'Z-SCORE → ASSUME ERROR → ERASE → LOG',
      ],
      correctIndex: 1,
      explanation:
        'The disciplined data science mental model demands: Detect anomalous values, Measure their statistical extremity, Investigate domain mechanisms, Understand signal vs error, Treat thoughtfully, and Validate the final dataset.',
    },
  ],
  summary: {
    takeaways: [
      'An outlier is an observation unusually distant from other data points—it is NOT automatically a typographical or hardware error.',
      'Outliers arise from multiple mechanisms: natural extreme events, clerical data entry errors, measurement failures, unit mismatches, multi-population mixtures, and security threats.',
      'The Five-Number Summary (Min, Q1, Median, Q3, Max) and Box Plots provide a robust representation of distribution spread.',
      'The Interquartile Range (IQR = Q3 - Q1) measures the middle 50% spread; the 1.5 × IQR rule establishes Lower and Upper boundary fences for human review.',
      'Z-Scores (z = (x - μ) / σ) measure standardized distance, but suffer from the Masking Effect in skewed or extreme-tail distributions.',
      'The arithmetic mean is highly sensitive to extreme values, while the median remains robust and stable.',
      'Univariate outliers are extreme in a single column; Multivariate outliers are impossible combinations across multiple correlated features.',
      'The 5 Core Treatment Strategies: Keep (valid real events), Correct (verified typos), Remove (proven defects), Cap/Winsorize (clip extreme bounds), and Transform (log/power scales).',
      'Always validate post-treatment distributions, sample size loss, and model sensitivity before declaring preprocessing complete.',
      'Next up: Even valid and clean numbers can be serialized in conflicting formats and scales across data sources.',
    ],
    nextUpText: '2.6 Data Formatting & Normalization — Standardizing date formats, string encodings, categorical representations, Min-Max scaling, and Z-score standardization.',
  },
  prevTopic: {
    slug: 'missing-data-imputation',
    title: '2.4 Missing Data Imputation',
  },
  nextTopic: {
    slug: 'data-formatting-and-normalization',
    title: '2.6 Data Formatting & Normalization',
  },
};

