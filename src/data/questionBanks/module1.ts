export interface QuestionBankItem {
  id: string;
  questionNumber: number;
  part: 'A' | 'B';
  marks: number;
  question: string;
  topicTag: string;
  modelAnswer: {
    shortSummary?: string;
    keyPoints: string[];
    detailedExplanation?: string;
    codeSnippet?: string;
    diagramOrSteps?: string[];
  };
}

export interface ModuleQuestionBank {
  moduleId: string;
  moduleNumber: number;
  title: string;
  unitName: string;
  partAQuestions: QuestionBankItem[];
  partBQuestions: QuestionBankItem[];
}

export const module1QuestionBank: ModuleQuestionBank = {
  moduleId: 'module-1',
  moduleNumber: 1,
  title: 'Introduction to Data Science & Computational Foundations',
  unitName: 'Unit 1 — Introduction to Data Science',
  partAQuestions: [
    {
      id: 'm1-qa-1',
      questionNumber: 1,
      part: 'A',
      marks: 3,
      question: 'What is Data Science? Explain its importance.',
      topicTag: 'Data Science Fundamentals',
      modelAnswer: {
        shortSummary: 'Data Science is an interdisciplinary field combining Domain Expertise, Mathematics/Statistics, and Computer Science to extract actionable insights from structured and unstructured data.',
        keyPoints: [
          'Definition: Interdisciplinary domain at the intersection of Domain Knowledge, Math/Stats, and Computer Science (Drew Conway Venn diagram).',
          'Core Purpose: Transforming raw data into Information ➔ Insights ➔ Automated Business Decisions.',
          'Importance: Enables predictive maintenance, fraud prevention, recommendation systems, personalized medicine, and evidence-based decision-making across global industries.',
        ],
      },
    },
    {
      id: 'm1-qa-2',
      questionNumber: 2,
      part: 'A',
      marks: 3,
      question: 'Mention any three roles in Data Science and their responsibilities.',
      topicTag: 'Roles & Responsibilities',
      modelAnswer: {
        keyPoints: [
          'Data Analyst: Cleans data, performs exploratory data analysis (EDA), identifies historical trends, and builds executive BI dashboards (SQL, Tableau, Power BI).',
          'Data Engineer: Architects resilient data ingestion pipelines, maintains ETL workflows, database clusters, and data lakes (Spark, Airflow, Kafka, SQL).',
          'Data Scientist / ML Engineer: Formulates statistical hypotheses, trains machine learning models, tunes hyperparameters, and deploys predictive APIs into production (Python, Scikit-Learn, PyTorch).',
        ],
      },
    },
    {
      id: 'm1-qa-3',
      questionNumber: 3,
      part: 'A',
      marks: 3,
      question: 'Mention any three commonly used tools in Data Science.',
      topicTag: 'Tools & Ecosystem',
      modelAnswer: {
        keyPoints: [
          'Python: The premier programming language for data manipulation, scientific computing, and machine learning (Pandas, NumPy, Scikit-Learn).',
          'Jupyter Notebook: An interactive computational environment allowing seamless interleaving of live code, visualizations, and explanatory Markdown narrative.',
          'SQL (Structured Query Language): The industry standard for querying, filtering, joining, and aggregating relational database tables at scale.',
        ],
      },
    },
    {
      id: 'm1-qa-4',
      questionNumber: 4,
      part: 'A',
      marks: 3,
      question: 'Why is Python widely used in Data Science?',
      topicTag: 'Python Ecosystem',
      modelAnswer: {
        keyPoints: [
          'Rich Specialized Ecosystem: Comprehensive, mature libraries for numerical math (NumPy), tabular wrangling (Pandas), visualization (Matplotlib, Seaborn), and ML (Scikit-Learn, PyTorch).',
          'Readable & Expressive Syntax: Clean, English-like syntax drastically reduces development overhead, allowing researchers to focus on data algorithms rather than boilerplate syntax.',
          'Broad Industry & Community Support: Massive global developer community, extensive documentation, pre-trained models, and seamless integration with web backends and cloud services.',
        ],
      },
    },
    {
      id: 'm1-qa-5',
      questionNumber: 5,
      part: 'A',
      marks: 3,
      question: 'What are control structures in Python? Mention their types.',
      topicTag: 'Python Control Flow',
      modelAnswer: {
        shortSummary: 'Control structures determine the sequential, conditional, or repetitive execution flow of statements based on evaluated Boolean logic.',
        keyPoints: [
          'Sequential Control: Default top-to-bottom line execution.',
          'Conditional / Selection Control: Branching execution based on conditions using `if`, `elif`, and `else`.',
          'Iterative / Repetition Control: Repeating blocks of code using loops (`for` and `while`), managed by control keywords like `break`, `continue`, and `pass`.',
        ],
      },
    },
    {
      id: 'm1-qa-6',
      questionNumber: 6,
      part: 'A',
      marks: 3,
      question: 'Differentiate between `for` and `while` loops in Python.',
      topicTag: 'Loops & Iteration',
      modelAnswer: {
        keyPoints: [
          'for loop (Definite Iteration): Iterates over a predetermined sequence (list, tuple, range, or string). The number of iterations is known or bounded in advance.',
          'while loop (Indefinite / Conditional Iteration): Continues executing as long as a Boolean test condition remains True. Iterations terminate when condition becomes False.',
          'Example: `for x in range(5):` executes exactly 5 times; `while balance > 0:` runs until balance is depleted.',
        ],
      },
    },
    {
      id: 'm1-qa-7',
      questionNumber: 7,
      part: 'A',
      marks: 3,
      question: 'What is a function in Python? State its advantages.',
      topicTag: 'Functions & Modularity',
      modelAnswer: {
        shortSummary: 'A function is a reusable, named block of code defined using the `def` keyword that executes specific tasks upon invocation.',
        keyPoints: [
          'Code Reusability (DRY Principle): Write once, invoke multiple times across pipelines without duplicating logic.',
          'Modularity & Abstraction: Decomposes complex data workflows into isolated, manageable, testable components.',
          'Maintainability & Scope Isolation: Encapsulates local variables within local namespace, avoiding accidental global state pollution.',
        ],
      },
    },
    {
      id: 'm1-qa-8',
      questionNumber: 8,
      part: 'A',
      marks: 3,
      question: 'What is Jupyter Notebook? Mention its advantages.',
      topicTag: 'Jupyter Ecosystem',
      modelAnswer: {
        shortSummary: 'Jupyter Notebook is a web-based interactive development environment allowing researchers to create documents containing live executable code, equations, visualizations, and narrative text.',
        keyPoints: [
          'Interactive Execution: Execute code in isolated cells and view output tables/plots immediately below.',
          'Reproducible Research: Combines documentation (Markdown/LaTeX), data transformations, and charts in a single sharable `.ipynb` file.',
          'Rapid Prototyping: Facilitates iterative data exploration and visualization without rerunning entire end-to-end scripts.',
        ],
      },
    },
    {
      id: 'm1-qa-9',
      questionNumber: 9,
      part: 'A',
      marks: 3,
      question: 'What are the basic features of Jupyter Notebook?',
      topicTag: 'Jupyter Ecosystem',
      modelAnswer: {
        keyPoints: [
          'Cell-Based Architecture: Supports distinct Code cells (executable Python/R) and Markdown cells (formatted documentation and LaTeX equations).',
          'Kernel Management: Decoupled computational engine with controls to Run, Interrupt, and Restart kernel state.',
          'Inline Visualizations & Magic Commands: Direct rendering of Matplotlib/Seaborn plots and convenient `%timeit`, `%matplotlib inline`, and `!` shell commands.',
        ],
      },
    },
    {
      id: 'm1-qa-10',
      questionNumber: 10,
      part: 'A',
      marks: 3,
      question: 'What is NumPy? Why is it used in Data Science?',
      topicTag: 'NumPy Fundamentals',
      modelAnswer: {
        shortSummary: 'NumPy (Numerical Python) is the foundational Python library for scientific computing, providing high-performance multidimensional array objects (ndarray) and vectorized mathematical routines.',
        keyPoints: [
          'Fast C-Speed Operations: Contiguous memory storage and vectorized operations written in precompiled C eliminate Python loop overhead.',
          'Vectorization & Broadcasting: Executes elementwise operations on arrays of matching or broadcastable shapes without manual loops.',
          'Core Foundation: Serves as the mathematical backbone for Pandas, Scikit-Learn, SciPy, and PyTorch.',
        ],
      },
    },
    {
      id: 'm1-qa-11',
      questionNumber: 11,
      part: 'A',
      marks: 3,
      question: 'What is a NumPy array? How is it different from a Python list?',
      topicTag: 'NumPy vs Lists',
      modelAnswer: {
        keyPoints: [
          'Data Homogeneity: NumPy arrays contain elements of a single uniform data type (e.g. all `int64`), whereas Python lists can hold heterogeneous types.',
          'Memory Layout: NumPy stores data in contiguous memory blocks; Python lists store references/pointers to disparate memory locations.',
          'Vectorized Mathematics: Arithmetic on NumPy arrays (`arr * 2`) operates elementwise; on Python lists (`list * 2`), it duplicates the sequence.',
        ],
      },
    },
    {
      id: 'm1-qa-12',
      questionNumber: 12,
      part: 'A',
      marks: 3,
      question: 'How do you create a NumPy array? Give an example.',
      topicTag: 'NumPy Array Creation',
      modelAnswer: {
        keyPoints: [
          'Arrays are instantiated using `np.array()` from Python sequences, or built-in creators like `np.zeros()`, `np.ones()`, `np.arange()`, and `np.linspace()`.',
        ],
        codeSnippet: `import numpy as np

# 1. From Python list
arr = np.array([10, 20, 30, 40, 50])

# 2. Built-in generator
grid = np.arange(1, 10).reshape(3, 3)
print(arr)
# Output: [10 20 30 40 50]`,
      },
    },
    {
      id: 'm1-qa-13',
      questionNumber: 13,
      part: 'A',
      marks: 3,
      question: 'What is the difference between one-dimensional and two-dimensional NumPy arrays?',
      topicTag: 'Array Dimensions',
      modelAnswer: {
        keyPoints: [
          'One-Dimensional (1D) Array: A single rank-1 vector of elements with shape `(n,)` (e.g. `[10, 20, 30]`).',
          'Two-Dimensional (2D) Array: A rank-2 matrix of rows and columns with shape `(m, n)` (e.g. `[[1, 2], [3, 4]]`).',
          'Axis Access: 1D array has only `axis=0`; 2D array supports `axis=0` (down columns/across rows) and `axis=1` (across columns/along rows).',
        ],
      },
    },
    {
      id: 'm1-qa-14',
      questionNumber: 14,
      part: 'A',
      marks: 3,
      question: 'Mention any three important NumPy functions used in Data Science.',
      topicTag: 'NumPy Functions',
      modelAnswer: {
        keyPoints: [
          '`np.mean(arr, axis=...)`: Calculates the arithmetic average across all elements or along a specified axis.',
          '`np.sum(arr, axis=...)`: Sums elements across array dimensions.',
          '`np.where(condition, x, y)`: Applies vectorized conditional logic to create new feature values based on truth checks.',
        ],
      },
    },
    {
      id: 'm1-qa-15',
      questionNumber: 15,
      part: 'A',
      marks: 3,
      question: 'What is the role of NumPy in Data Science projects?',
      topicTag: 'NumPy in Data Science',
      modelAnswer: {
        keyPoints: [
          'Linear Algebra & Matrix Math: Computes dot products, matrix inverses, eigenvalues, and coordinate transformations.',
          'Memory Efficiency: Compact contiguous array buffers enable in-memory processing of gigabyte-scale numerical features.',
          'Interoperability Buffer: Acts as the universal memory tensor exchange format between data loaders, Pandas, and ML algorithms.',
        ],
      },
    },
    {
      id: 'm1-qa-16',
      questionNumber: 16,
      part: 'A',
      marks: 3,
      question: 'Why is problem formulation considered the first and most critical step in a Data Science project?',
      topicTag: 'Lifecycle & Problem Formulation',
      modelAnswer: {
        keyPoints: [
          'Translates Vague Goals: Converts ambiguous business objectives (e.g. "reduce churn") into measurable mathematical targets (e.g. "binary classification with recall >= 0.85").',
          'Prevents Wasted Resources: Solves the right business problem before investing weeks in data ingestion, annotation, and model training.',
          'Defines Success Criteria: Establishes clear baseline benchmarks and deployment constraints before writing code.',
        ],
      },
    },
    {
      id: 'm1-qa-17',
      questionNumber: 17,
      part: 'A',
      marks: 3,
      question: 'Mention any three reasons why most real-world datasets require preprocessing before analysis.',
      topicTag: 'Data Preprocessing Needs',
      modelAnswer: {
        keyPoints: [
          'Missing & Incomplete Data: Sensor dropouts, survey non-responses, and ETL ingestion breaks introduce NaNs that crash algorithms.',
          'Noise & Measurement Outliers: Data entry typos (e.g. Age = 250) and transmission errors distort statistical summaries like mean and variance.',
          'Inconsistent Formatting & Encoding: Mixed date conventions (DD/MM vs MM/DD), mixed casing, and string numbers prevent proper grouping and mathematical operations.',
        ],
      },
    },
    {
      id: 'm1-qa-18',
      questionNumber: 18,
      part: 'A',
      marks: 3,
      question: 'How does version control help teams collaborate effectively in Data Science projects?',
      topicTag: 'Collaboration & Git',
      modelAnswer: {
        keyPoints: [
          'Code & Pipeline Tracking: Git maintains an immutable history of pipeline changes, preventing destructive overwrites.',
          'Branching & Experimentation: Allows multiple engineers to test independent features, models, and transformations simultaneously without polluting production code.',
          'Reproducibility & Rollbacks: Enables instant reversion to known working model scripts in the event of pipeline regression.',
        ],
      },
    },
    {
      id: 'm1-qa-19',
      questionNumber: 19,
      part: 'A',
      marks: 3,
      question: 'Why is Python widely adopted in industry for Data Science applications?',
      topicTag: 'Industry Adoption',
      modelAnswer: {
        keyPoints: [
          'Full-Stack Unification: Connects exploratory data analysis, data engineering pipelines, ML model training, and production REST API deployment in a single language.',
          'Interoperable Libraries: Seamless handoff between Pandas (wrangling), Scikit-Learn (modeling), and FastAPI/Flask (microservices).',
          'Fast Time-to-Market: Rapid prototyping and low cognitive syntax load reduce corporate development cycles.',
        ],
      },
    },
    {
      id: 'm1-qa-20',
      questionNumber: 20,
      part: 'A',
      marks: 3,
      question: 'What challenges arise when integrating data from APIs, databases, and flat files?',
      topicTag: 'Data Ingestion Challenges',
      modelAnswer: {
        keyPoints: [
          'Schema Mismatches & Type Conflicts: Nested JSON from REST APIs, relational SQL schemas, and unstructured CSV strings require harmonization.',
          'Rate Limiting & Network Latency: API throughput quotas, pagination, and network connection timeouts during streaming ingestion.',
          'Identifier Inconsistencies: Non-standardized foreign keys (e.g. `cust_id` vs `customer_id` vs UUIDs) make table joins error-prone.',
        ],
      },
    },
    {
      id: 'm1-qa-21',
      questionNumber: 21,
      part: 'A',
      marks: 3,
      question: 'Why is data validation essential before running analytics or machine learning models?',
      topicTag: 'Data Validation',
      modelAnswer: {
        keyPoints: [
          'GIGO Principle: Garbage In, Garbage Out—flawed data guarantees mathematically unsound predictions and misleading analytics.',
          'Detects Schema & Data Drift: Identifies unexpected null surges, changed column names, or distribution shifts before models fail in production.',
          'Ensures Regulatory & Audit Compliance: Guarantees data conforms to domain boundary rules (e.g. positive prices, valid dates).',
        ],
      },
    },
    {
      id: 'm1-qa-22',
      questionNumber: 22,
      part: 'A',
      marks: 3,
      question: 'How does improper handling of missing values affect model performance?',
      topicTag: 'Missing Values Impact',
      modelAnswer: {
        keyPoints: [
          'Crash Failures: Most standard ML algorithms (e.g. Linear Regression, SVM) throw exceptions when encountering NaN values.',
          'Statistical Bias: Blindly deleting rows with missing data (complete-case analysis) distorts distributions when missingness is MNAR or MAR.',
          'Variance Distortion: Indiscriminate mean imputation artificially shrinks feature variance and deflates standard errors.',
        ],
      },
    },
    {
      id: 'm1-qa-23',
      questionNumber: 23,
      part: 'A',
      marks: 3,
      question: 'Why is Exploratory Data Analysis (EDA) important before building predictive models?',
      topicTag: 'EDA Importance',
      modelAnswer: {
        keyPoints: [
          'Reveals Underlying Distributions: Uncovers skewness, bimodality, and non-normal behavior requiring transformation (e.g. log scaling).',
          'Detects Multicollinearity: Identifies redundant, highly correlated features that inflate model variance.',
          'Guides Feature Selection: Discovers non-linear relationships and interactions between predictor variables and targets.',
        ],
      },
    },
    {
      id: 'm1-qa-24',
      questionNumber: 24,
      part: 'A',
      marks: 3,
      question: 'How can EDA help identify potential business risks early in a project?',
      topicTag: 'EDA & Business Risks',
      modelAnswer: {
        keyPoints: [
          'Target Imbalance Discovery: Identifies severe class imbalances (e.g. 99.9% non-fraud vs 0.1% fraud) where naive models appear accurate but fail completely in practice.',
          'Data Leakage Detection: Flags features containing future information (e.g. `cancellation_date` present in churn training set).',
          'Cohort Gaps: Spots underrepresented demographic segments that could cause biased or unfair algorithmic decisions.',
        ],
      },
    },
    {
      id: 'm1-qa-25',
      questionNumber: 25,
      part: 'A',
      marks: 3,
      question: 'What are anomalies in data, and why should they be investigated during EDA?',
      topicTag: 'Anomaly Investigation',
      modelAnswer: {
        keyPoints: [
          'Definition: Observations that deviate substantially from the general distribution of the dataset.',
          'Dual Nature: An anomaly can represent a critical data entry/sensor error OR a high-value real-world breakthrough (e.g. credit card fraud, cyber intrusion).',
          'Action: Must be audited with domain context before deciding whether to trim, cap (Winsorize), or isolate into an anomaly detection model.',
        ],
      },
    },
    {
      id: 'm1-qa-26',
      questionNumber: 26,
      part: 'A',
      marks: 3,
      question: 'Give two industry use cases where time series analysis is crucial.',
      topicTag: 'Time Series Applications',
      modelAnswer: {
        keyPoints: [
          'E-Commerce & Retail Demand Forecasting: Predicting weekly inventory replenishment needs to prevent stockouts and reduce warehouse holding costs.',
          'Energy Grid Load Management: Forecasting hourly megawatt consumption based on temperature and historical seasonal trends to balance electrical power generation.',
        ],
      },
    },
    {
      id: 'm1-qa-27',
      questionNumber: 27,
      part: 'A',
      marks: 3,
      question: 'Why do most real-world time series datasets exhibit seasonality?',
      topicTag: 'Time Series Seasonality',
      modelAnswer: {
        keyPoints: [
          'Human Behavioral Cycles: Weekly work/weekend rhythms, holiday shopping surges (Diwali, Black Friday), and morning/evening commute spikes.',
          'Environmental & Calendar Factors: Four-season agricultural cycles, heating/cooling energy demands, and quarterly corporate fiscal tax reporting.',
        ],
      },
    },
    {
      id: 'm1-qa-28',
      questionNumber: 28,
      part: 'A',
      marks: 3,
      question: 'How does cross-validation improve model reliability compared to a single train-test split?',
      topicTag: 'Cross-Validation',
      modelAnswer: {
        keyPoints: [
          'Mitigates Sampling Variance: A single train-test split can produce misleadingly high or low scores depending on lucky/unlucky data partitioning.',
          'Full Data Utilization: K-Fold CV tests the model across K distinct validation folds, ensuring every sample serves in both training and testing.',
          'Robust Generalization Estimate: Yields a mean score and standard deviation ($\mu \pm \sigma$) reflecting true real-world stability.',
        ],
      },
    },
    {
      id: 'm1-qa-29',
      questionNumber: 29,
      part: 'A',
      marks: 3,
      question: 'Why is model generalization more important than training accuracy in industry projects?',
      topicTag: 'Generalization vs Overfitting',
      modelAnswer: {
        keyPoints: [
          'Avoids Overfitting: High training accuracy often reflects memorization of training noise rather than true underlying patterns.',
          'Real-World Value: Deployed models only encounter previously unseen live inference data; generalization dictates actual business ROI.',
          'Graceful Degeneracy: Generalizable models withstand minor distribution shifts without catastrophic prediction failures.',
        ],
      },
    },
    {
      id: 'm1-qa-30',
      questionNumber: 30,
      part: 'A',
      marks: 3,
      question: 'How does poor data quality propagate into incorrect business insights?',
      topicTag: 'Data Quality Cascades',
      modelAnswer: {
        keyPoints: [
          'Distorted Aggregates: Duplicate rows and unstandardized categories (e.g. "Mumbai" vs " mumbai") splinter metrics, misrepresenting market share.',
          'False Correlation: Unhandled outliers distort covariance and regression coefficients, leading leaders to fund flawed initiatives.',
          'Misallocated Capital: Flawed customer churn models misdirect millions in marketing subsidies to the wrong user segments.',
        ],
      },
    },
    {
      id: 'm1-qa-31',
      questionNumber: 31,
      part: 'A',
      marks: 3,
      question: 'What is the purpose of automated monitoring in deployed ML systems?',
      topicTag: 'MLOps & Monitoring',
      modelAnswer: {
        keyPoints: [
          'Detects Data & Concept Drift: Alerts engineers when input feature distributions or real-world consumer relationships shift over time.',
          'Monitors Performance Degradation: Tracks live latency, memory usage, error rates, and prediction accuracy drops in production.',
          'Triggers Automated Retraining: Initiates continuous training pipelines when model performance breaches acceptable baseline thresholds.',
        ],
      },
    },
    {
      id: 'm1-qa-32',
      questionNumber: 32,
      part: 'A',
      marks: 3,
      question: 'Why is documentation critical throughout the Data Science lifecycle?',
      topicTag: 'Documentation & Ethics',
      modelAnswer: {
        keyPoints: [
          'Reproducibility: Explains data lineage, imputation assumptions, and hyperparameter choices so teammates can verify and replicate findings.',
          'Knowledge Transfer & Maintainability: Enables seamless onboarding and maintenance when team members transition.',
          'Regulatory Compliance: Provides auditable evidence for model fairness, data privacy, and ethical decision boundaries (e.g. GDPR, Basel III).',
        ],
      },
    },
    {
      id: 'm1-qa-33',
      questionNumber: 33,
      part: 'A',
      marks: 3,
      question: 'How does collaboration between Data Scientists and Data Engineers improve outcomes?',
      topicTag: 'Team Collaboration',
      modelAnswer: {
        keyPoints: [
          'Scalable Productionization: Data Engineers build robust ETL data pipelines, while Data Scientists design predictive algorithms.',
          'Prevents Pipeline Drift: Ensures training data pipelines match low-latency production inference streams exactly, avoiding training-serving skew.',
          'Faster Deployment Cycles: Bridges research experimentation and automated CI/CD deployment architectures.',
        ],
      },
    },
    {
      id: 'm1-qa-34',
      questionNumber: 34,
      part: 'A',
      marks: 3,
      question: 'Write a Python program to find the largest of three numbers.',
      topicTag: 'Python Programming',
      modelAnswer: {
        keyPoints: ['Uses conditional branching (`if-elif-else`) to compare three numeric variables.'],
        codeSnippet: `def find_largest(a, b, c):
    if a >= b and a >= c:
        return a
    elif b >= a and b >= c:
        return b
    else:
        return c

# Example Execution:
x, y, z = 45, 89, 23
print(f"Largest number: {find_largest(x, y, z)}")
# Output: Largest number: 89`,
      },
    },
    {
      id: 'm1-qa-35',
      questionNumber: 35,
      part: 'A',
      marks: 3,
      question: 'Write a Python program to calculate the factorial of a given number using a loop.',
      topicTag: 'Python Programming',
      modelAnswer: {
        keyPoints: ['Initializes factorial accumulator to 1 and iterates from 1 to n.'],
        codeSnippet: `def calculate_factorial(n):
    if n < 0:
        return "Factorial undefined for negative numbers"
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

num = 5
print(f"Factorial of {num}: {calculate_factorial(num)}")
# Output: Factorial of 5: 120`,
      },
    },
    {
      id: 'm1-qa-36',
      questionNumber: 36,
      part: 'A',
      marks: 3,
      question: 'Write a Python program to check whether a given number is prime or not.',
      topicTag: 'Python Programming',
      modelAnswer: {
        keyPoints: ['Checks divisibility up to $\\sqrt{n}$ for numbers greater than 1.'],
        codeSnippet: `def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

num = 29
print(f"Is {num} prime? {is_prime(num)}")
# Output: Is 29 prime? True`,
      },
    },
    {
      id: 'm1-qa-37',
      questionNumber: 37,
      part: 'A',
      marks: 3,
      question: 'Write a Python function to calculate the average of three numbers.',
      topicTag: 'Python Programming',
      modelAnswer: {
        keyPoints: ['Defines a function accepting 3 arguments and returns $(a + b + c) / 3$.'],
        codeSnippet: `def compute_average(a, b, c):
    return (a + b + c) / 3.0

avg = compute_average(85, 90, 95)
print(f"Calculated Average: {avg:.2f}")
# Output: Calculated Average: 90.00`,
      },
    },
    {
      id: 'm1-qa-38',
      questionNumber: 38,
      part: 'A',
      marks: 3,
      question: 'Write a NumPy program to create an array and find its sum, mean, maximum, and minimum values.',
      topicTag: 'NumPy Programming',
      modelAnswer: {
        keyPoints: ['Uses `np.array()`, `np.sum()`, `np.mean()`, `np.max()`, and `np.min()`.'],
        codeSnippet: `import numpy as np

data = np.array([24, 67, 89, 12, 45, 99, 53])

print("Array:", data)
print("Sum:    ", np.sum(data))
print("Mean:   ", np.mean(data))
print("Maximum:", np.max(data))
print("Minimum:", np.min(data))`,
      },
    },
    {
      id: 'm1-qa-39',
      questionNumber: 39,
      part: 'A',
      marks: 3,
      question: 'Write a NumPy program to create a 2D array and display its shape, number of dimensions, and size.',
      topicTag: 'NumPy Programming',
      modelAnswer: {
        keyPoints: ['Inspects `.shape`, `.ndim`, and `.size` attributes on a 2D matrix.'],
        codeSnippet: `import numpy as np

matrix = np.array([
    [10, 20, 30],
    [40, 50, 60]
])

print("Matrix:\\n", matrix)
print("Shape (rows, cols):", matrix.shape)  # Output: (2, 3)
print("Dimensions (ndim):  ", matrix.ndim)   # Output: 2
print("Total Elements (size):", matrix.size) # Output: 6`,
      },
    },
    {
      id: 'm1-qa-40',
      questionNumber: 40,
      part: 'A',
      marks: 3,
      question: 'Write a Python program to print the multiplication table of a given number.',
      topicTag: 'Python Programming',
      modelAnswer: {
        keyPoints: ['Iterates `for i in range(1, 11)` and prints formatted product strings.'],
        codeSnippet: `def print_multiplication_table(n):
    print(f"--- Multiplication Table for {n} ---")
    for i in range(1, 11):
        print(f"{n} x {i:2d} = {n * i}")

print_multiplication_table(7)`,
      },
    },
  ],
  partBQuestions: [
    {
      id: 'm1-qb-1',
      questionNumber: 1,
      part: 'B',
      marks: 14,
      question: 'Explain the complete Data Science lifecycle with an industry-oriented example.',
      topicTag: 'End-to-End Lifecycle',
      modelAnswer: {
        shortSummary: 'The Data Science Lifecycle is an iterative 9-stage engineering framework that translates an organizational business objective into a validated, deployed machine learning system.',
        diagramOrSteps: [
          '1. Problem Formulation & Business Understanding: Define quantifiable KPIs (e.g. churn rate reduction by 15%).',
          '2. Data Collection & Acquisition: Ingest logs, transactional SQL databases, REST APIs, and event streams.',
          '3. Data Preprocessing & Cleaning: Handle missing values, outliers, corrupted datatypes, and formatting.',
          '4. Exploratory Data Analysis (EDA): Compute descriptive statistics, plot distributions, correlation heatmaps.',
          '5. Feature Engineering & Selection: Construct domain features (e.g. tenure ratio, log transforms, one-hot encoding).',
          '6. Model Building & Training: Train candidate algorithms (Logistic Regression, Random Forest, XGBoost).',
          '7. Evaluation & Validation: Cross-validation, ROC-AUC, Precision-Recall curves, confusion matrices.',
          '8. Deployment & Serving: Containerize with Docker, serve via FastAPI microservices on cloud clusters.',
          '9. Monitoring, Maintenance & Feedback Loop: Track live data drift, latency, and automated retraining.',
        ],
        keyPoints: [
          'Industry Case Study Example: E-Commerce Churn Prediction at Flipkart/Amazon.',
          'Business Goal: Predict customer churn 30 days in advance to trigger targeted retention coupons.',
          'Data Sources: Transaction history (PostgreSQL), clickstream events (Kafka), and customer support tickets (REST API).',
          'Metrics: Prioritize Recall over Precision because missing a churning customer costs significantly more than sending a coupon to a loyal user.',
        ],
      },
    },
    {
      id: 'm1-qb-2',
      questionNumber: 2,
      part: 'B',
      marks: 14,
      question: 'Discuss challenges in data collection from multiple heterogeneous sources.',
      topicTag: 'Data Ingestion & Integration',
      modelAnswer: {
        shortSummary: 'Integrating disparate data streams across relational databases, web APIs, legacy flat files, and real-time IoT queues presents major structural, velocity, and semantic challenges.',
        keyPoints: [
          '1. Structural & Format Heterogeneity: Merging tabular relational tables (SQL), hierarchical nested documents (JSON/XML from APIs), and unstructured textual logs.',
          '2. Velocity & Ingestion Latency Discrepancies: Coordinating batch periodic updates (nightly data warehouse dumps) with sub-second real-time streaming pipelines (Apache Kafka).',
          '3. Schema Drift & API Deprecations: Upstream REST API endpoints modifying response keys or data types without notice, breaking downstream parsers.',
          '4. Entity Resolution & Key Ambiguity: Merging duplicate customer records lacking unified universal IDs (e.g. matching phone numbers vs emails vs account numbers).',
          '5. Data Governance, Privacy & Security: Complying with regulatory frameworks (GDPR, HIPAA, DPDP Act) across encrypted endpoints and tokenized storage.',
        ],
      },
    },
    {
      id: 'm1-qb-3',
      questionNumber: 3,
      part: 'B',
      marks: 14,
      question: 'Explain preprocessing techniques for handling missing values and outliers.',
      topicTag: 'Data Preprocessing Techniques',
      modelAnswer: {
        shortSummary: 'Preprocessing establishes data integrity by mathematically addressing absent values (Missing Data) and extreme anomalous observations (Outliers) before model ingestion.',
        keyPoints: [
          'Part 1: Missing Data Imputation Strategies:',
          '• Missingness Mechanisms: MCAR (Missing Completely at Random), MAR (Missing at Random), MNAR (Missing Not at Random).',
          '• Complete-Case Analysis (Deletion): `df.dropna()`—only valid when missingness is under 3–5% and MCAR.',
          '• Central Tendency Imputation: Mean (symmetric normal data) vs Median (skewed data with outliers) vs Mode (categorical classes).',
          '• Advanced Imputation: KNN Imputer (distance-weighted neighbors) and Iterative Multivariate Imputation (MICE).',
          'Part 2: Outlier Detection & Treatment Techniques:',
          '• Statistical Detection: Tukey\'s 1.5 × IQR Rule (Boxplot bounds: $Q1 - 1.5 \\times IQR$ to $Q3 + 1.5 \\times IQR$) and Z-Score Rule ($|Z| > 3$).',
          '• Treatment Protocols: Trimming (dropping verified entry errors), Winsorization / Capping (clamping to 1st/99th percentiles), and Log Transformation.',
        ],
      },
    },
    {
      id: 'm1-qb-4',
      questionNumber: 4,
      part: 'B',
      marks: 14,
      question: 'Perform EDA steps required before building a predictive model.',
      topicTag: 'Exploratory Data Analysis',
      modelAnswer: {
        shortSummary: 'Exploratory Data Analysis (EDA) is the disciplined process of performing initial investigations on data to discover patterns, spot anomalies, test hypotheses, and verify assumptions.',
        diagramOrSteps: [
          'Step 1: Structural & Type Inspection: Check `.info()`, `.shape`, `.dtypes`, null value counts, and unique value cardinalities.',
          'Step 2: Univariate Analysis: Plot histograms and KDEs for numerical features (skewness check); plot frequency bar charts for categorical features.',
          'Step 3: Bivariate & Multivariate Analysis: Scatter plots, correlation matrices (Pearson/Spearman heatmap), and pairplots to identify feature relationships.',
          'Step 4: Target Variable Diagnostics: Audit class balance in classification or target distribution normality in regression.',
          'Step 5: Interaction & Feature Importance Discovery: GroupBy aggregations and box plots across categorical cohorts.',
          'Step 6: Data Transformation Decision: Log transforms for right-skewed revenue data, one-hot encoding for nominal categories, and robust scaling.',
        ],
        keyPoints: [
          'Deliverable: A clean, documented statistical blueprint informing model architecture selection and feature engineering pipelines.',
        ],
      },
    },
    {
      id: 'm1-qb-5',
      questionNumber: 5,
      part: 'B',
      marks: 14,
      question: 'Analyze reasons for failure of Data Science projects.',
      topicTag: 'Project Failure Analysis',
      modelAnswer: {
        shortSummary: 'Over 80% of corporate data science initiatives fail to reach production due to a combination of organizational misalignment, flawed data foundations, and lack of MLOps deployment engineering.',
        keyPoints: [
          '1. Flawed Problem Formulation: Solving a technical novelty rather than a high-impact business problem with clear ROI metrics.',
          '2. Data Quality & Label Scarcity: Insufficient training volume, severe target label noise, or irremediable sampling bias.',
          '3. Data Leakage & Overfitting: Model achieves 99% accuracy in Jupyter Notebook by accidentally learning future features, then fails in production.',
          '4. The "Proof of Concept (PoC) Trap": Developing unscalable prototype code in isolation without integrating into enterprise software architecture.',
          '5. Lack of Data Engineering & MLOps Infrastructure: Inability to deploy low-latency pipelines, monitor data drift, or manage automated model retraining.',
          '6. Cultural & Change Management Barriers: End-users and business stakeholders distrusting "black-box" model outputs due to lack of explainability (XAI).',
        ],
      },
    },
    {
      id: 'm1-qb-6',
      questionNumber: 6,
      part: 'B',
      marks: 14,
      question: 'Discuss the importance of cross-validation in model evaluation.',
      topicTag: 'Model Evaluation & Validation',
      modelAnswer: {
        shortSummary: 'Cross-Validation (CV) is a statistical resampling technique used to evaluate machine learning models on limited data samples, providing an unbiased estimate of out-of-sample generalization error.',
        keyPoints: [
          '1. Limitations of Simple Train-Test Split: A single 80/20 split is vulnerable to high variance; lucky/unlucky data splits create misleading metrics.',
          '2. K-Fold Cross-Validation Mechanism: Partitions dataset into K equal folds; trains on K-1 folds and validates on the remaining fold, repeating K times.',
          '3. Stratified K-Fold for Imbalanced Data: Preserves the exact target class percentage across all folds (critical for fraud/medical diagnosis).',
          '4. Hyperparameter Optimization (GridSearchCV): Combines CV loops to tune hyperparameters without contaminating final test sets.',
          '5. Time Series Split (Rolling-Origin): Enforces temporal ordering ($t_1, t_2, \\dots, t_k$) preventing future information from leaking into past training folds.',
        ],
      },
    },
    {
      id: 'm1-qb-7',
      questionNumber: 7,
      part: 'B',
      marks: 14,
      question: 'Explain deployment challenges of ML models in production.',
      topicTag: 'Production Deployment & MLOps',
      modelAnswer: {
        shortSummary: 'Transitioning a machine learning model from a research notebook to a live, low-latency, resilient production service requires solving critical engineering and operational hurdles.',
        keyPoints: [
          '1. Training-Serving Skew: Preprocessing and feature engineering logic written in Python notebooks differing from high-speed production streaming logic (e.g. Java/Go).',
          '2. Latency & Throughput SLA Constraints: Heavy deep learning or ensemble models exceeding millisecond response windows during high-concurrency peak traffic.',
          '3. Data Drift & Concept Drift: Real-world customer behaviors or macroeconomic conditions changing, causing model degradation over time.',
          '4. Automated Monitoring & Alerting: Tracking statistical distribution shifts, endpoint uptime, memory leaks, and prediction confidence intervals in real time.',
          '5. CI/CD & Model Governance: Managing model artifact versioning (MLflow, DVC), canary deployments, A/B testing, and rollback protocols.',
        ],
      },
    },
  ],
};
