import { QuestionBankItem, ModuleQuestionBank } from './module1';

export const module2QuestionBank: ModuleQuestionBank = {
  moduleId: 'module-2',
  moduleNumber: 2,
  title: 'Data Collection and Preprocessing',
  unitName: 'Unit 2 — Data Collection and Preprocessing',
  partAQuestions: [
    // A. Data Collection & Data Sources
    {
      id: 'm2-qa-1',
      questionNumber: 1,
      part: 'A',
      marks: 3,
      question: 'What is Data Collection? Why is it important?',
      topicTag: 'Data Collection & Sources',
      modelAnswer: {
        shortSummary: 'Data Collection is the systematic process of gathering observations, measurements, and records from various internal and external sources for analytical processing.',
        keyPoints: [
          'Definition: Systematic acquisition of raw data from databases, APIs, web streams, sensors, or surveys.',
          'Importance: High-quality data collection guarantees statistical validity, prevents garbage-in garbage-out (GIGO), and forms the empirical foundation for machine learning models.',
        ],
      },
    },
    {
      id: 'm2-qa-2',
      questionNumber: 2,
      part: 'A',
      marks: 3,
      question: 'Define data collection. State any two major sources of data.',
      topicTag: 'Data Collection & Sources',
      modelAnswer: {
        keyPoints: [
          'Definition: The process of measuring, retrieving, and recording variables of interest in an established systematic fashion.',
          'Two Major Sources: 1. Primary Sources (original first-hand data like IoT sensor readings, user surveys); 2. Secondary Sources (pre-existing data like government census archives, Kaggle repositories, third-party REST APIs).',
        ],
      },
    },
    {
      id: 'm2-qa-3',
      questionNumber: 3,
      part: 'A',
      marks: 3,
      question: 'What is Data? Give two examples.',
      topicTag: 'Data Basics',
      modelAnswer: {
        keyPoints: [
          'Definition: Raw, unorganized facts, figures, symbols, or observations that have not yet been processed to reveal meaningful context.',
          'Examples: 1. Temperature reading "37.5°C" from a weather sensor; 2. E-commerce transaction record `{"order_id": 1042, "amount": 2499.00}`.',
        ],
      },
    },
    {
      id: 'm2-qa-4',
      questionNumber: 4,
      part: 'A',
      marks: 3,
      question: 'Differentiate primary data and secondary data with one example each.',
      topicTag: 'Data Sources',
      modelAnswer: {
        keyPoints: [
          'Primary Data: First-hand data collected directly by the researcher specifically for the current project (e.g. Conducted customer feedback surveys).',
          'Secondary Data: Pre-existing data collected by someone else for another primary purpose that is reused for current analysis (e.g. World Bank GDP open dataset).',
        ],
      },
    },
    {
      id: 'm2-qa-5',
      questionNumber: 5,
      part: 'A',
      marks: 3,
      question: 'Differentiate structured, semi-structured and unstructured data.',
      topicTag: 'Data Formats',
      modelAnswer: {
        keyPoints: [
          'Structured Data: Highly organized in fixed rows and columns with strict relational schema (e.g. SQL tables, CSV files).',
          'Semi-Structured Data: Does not conform to rigid tabular schema but contains self-describing organizational tags or keys (e.g. JSON, XML, YAML).',
          'Unstructured Data: Lacks predefined conceptual schema or tabular model (e.g. raw audio files, video streams, free-form text reviews, PDF scans).',
        ],
      },
    },
    {
      id: 'm2-qa-6',
      questionNumber: 6,
      part: 'A',
      marks: 3,
      question: 'What is internal data and external data?',
      topicTag: 'Data Sources',
      modelAnswer: {
        keyPoints: [
          'Internal Data: Information generated inside an organization\'s proprietary boundaries (e.g. employee payroll, ERP logs, customer order history).',
          'External Data: Information procured outside the organizational boundary (e.g. social media sentiment, competitor pricing APIs, macroeconomic indices).',
        ],
      },
    },
    {
      id: 'm2-qa-7',
      questionNumber: 7,
      part: 'A',
      marks: 3,
      question: 'List any five characteristics of good data.',
      topicTag: 'Data Quality',
      modelAnswer: {
        keyPoints: [
          '1. Accuracy: Reflects real-world truth without measurement errors.',
          '2. Completeness: Free of missing values and missing cohort records.',
          '3. Consistency: Uniform formats, naming conventions, and synchronized units across tables.',
          '4. Timeliness: Current, fresh, and relevant to the analytical decision window.',
          '5. Validity: Conforms to expected data types, ranges, and business constraints.',
        ],
      },
    },
    {
      id: 'm2-qa-8',
      questionNumber: 8,
      part: 'A',
      marks: 3,
      question: 'Define data accuracy and data completeness.',
      topicTag: 'Data Quality',
      modelAnswer: {
        keyPoints: [
          'Data Accuracy: The degree to which recorded data values conform to correct, verifiable ground-truth measurements without noise or distortion.',
          'Data Completeness: The proportion of expected data values that are actually present without nulls, missing rows, or truncated fields.',
        ],
      },
    },
    {
      id: 'm2-qa-9',
      questionNumber: 9,
      part: 'A',
      marks: 3,
      question: 'Mention any three characteristics of good data.',
      topicTag: 'Data Quality',
      modelAnswer: {
        keyPoints: [
          '1. Accuracy (unbiased, exact measurements).',
          '2. Consistency (standardized casing, encoding, and units).',
          '3. Relevance (directly aligned with the formulated business question).',
        ],
      },
    },
    {
      id: 'm2-qa-10',
      questionNumber: 10,
      part: 'A',
      marks: 3,
      question: 'Mention any three problems that can occur during data collection.',
      topicTag: 'Collection Traps',
      modelAnswer: {
        keyPoints: [
          '1. Selection / Sampling Bias: Collecting data from non-representative populations (e.g. mobile-only surveys missing elderly demographics).',
          '2. Sensor & Network Transmission Failures: Intermittent packet dropouts causing null bursts or incomplete telemetry logs.',
          '3. Measurement / Entry Errors: Typos, ambiguous survey questions, and scale mismatches (e.g. mixing kg and lbs).',
        ],
      },
    },
    {
      id: 'm2-qa-11',
      questionNumber: 11,
      part: 'A',
      marks: 3,
      question: 'What are duplicate records? Why should they be removed?',
      topicTag: 'Data Cleaning',
      modelAnswer: {
        keyPoints: [
          'Definition: Identical rows or records sharing the same primary identifier entered multiple times due to retry bugs or merger of disparate feeds.',
          'Why Remove: Duplicates artificially inflate summary metrics (sum, count), distort statistical distributions, and bias ML model training toward repeated samples.',
        ],
      },
    },
    {
      id: 'm2-qa-12',
      questionNumber: 12,
      part: 'A',
      marks: 3,
      question: 'Explain the difference between internal and external data with suitable examples.',
      topicTag: 'Data Sources',
      modelAnswer: {
        keyPoints: [
          'Internal Data: Generated natively within organizational operations (e.g. HDFC Bank customer account transactions, ATM withdrawal timestamps).',
          'External Data: Procured from third parties outside the company (e.g. Reserve Bank of India repo rate updates, Google Maps traffic data).',
        ],
      },
    },
    {
      id: 'm2-qa-13',
      questionNumber: 13,
      part: 'A',
      marks: 3,
      question: 'List any two methods of data collection.',
      topicTag: 'Collection Methods',
      modelAnswer: {
        keyPoints: [
          '1. Automated Web Scraping & REST APIs (programmatic retrieval of live structured web resources).',
          '2. Direct Digital Surveys & Questionnaires (structured user-submitted field responses).',
        ],
      },
    },
    {
      id: 'm2-qa-14',
      questionNumber: 14,
      part: 'A',
      marks: 3,
      question: 'What are open public datasets? Give any three examples.',
      topicTag: 'Open Data',
      modelAnswer: {
        keyPoints: [
          'Definition: Freely accessible data repositories made available by governments, universities, and research institutions for public research without licensing restrictions.',
          'Three Examples: 1. data.gov.in (Government of India open datasets); 2. Kaggle Datasets Repository; 3. UCI Machine Learning Repository.',
        ],
      },
    },

    // B. APIs and Web Scraping
    {
      id: 'm2-qa-15',
      questionNumber: 15,
      part: 'A',
      marks: 3,
      question: 'What is an API? Define the terms endpoint and request.',
      topicTag: 'APIs & Streams',
      modelAnswer: {
        keyPoints: [
          'API (Application Programming Interface): A standardized protocol that enables two disparate software applications to communicate and exchange data.',
          'Endpoint: The specific uniform resource locator (URL) exposed by a server where resources or services can be accessed (e.g. `https://api.weather.com/v1/forecast`).',
          'Request: A message sent by a client to an API endpoint containing an HTTP method (GET, POST), headers, and optional parameters.',
        ],
      },
    },
    {
      id: 'm2-qa-16',
      questionNumber: 16,
      part: 'A',
      marks: 3,
      question: 'State any three HTTP status codes along with their meanings.',
      topicTag: 'HTTP Status Codes',
      modelAnswer: {
        keyPoints: [
          '`200 OK`: Request succeeded, and requested payload returned successfully.',
          '`404 Not Found`: The requested URL/endpoint does not exist on the server.',
          '`500 Internal Server Error`: Server encountered an unhandled exception while processing the request.',
        ],
      },
    },
    {
      id: 'm2-qa-17',
      questionNumber: 17,
      part: 'A',
      marks: 3,
      question: 'What is web scraping? Name the two Python libraries commonly used for it.',
      topicTag: 'Web Scraping',
      modelAnswer: {
        keyPoints: [
          'Definition: The automated programmatic extraction of unstructured and semi-structured text/tables from HTML DOM webpages.',
          'Two Libraries: 1. `requests` (to fetch raw HTML responses); 2. `BeautifulSoup` (from `bs4` to parse and navigate the DOM tree).',
        ],
      },
    },
    {
      id: 'm2-qa-18',
      questionNumber: 18,
      part: 'A',
      marks: 3,
      question: 'Differentiate APIs and web scraping as data-collection methods.',
      topicTag: 'APIs vs Scraping',
      modelAnswer: {
        keyPoints: [
          'APIs: Official, structured, stable data pipelines providing clean JSON/XML directly with authenticated rate limits and documentation.',
          'Web Scraping: Extracts raw HTML designed for human viewing; fragile because layout/CSS class changes break parsers; subject to `robots.txt` legal constraints.',
        ],
      },
    },

    // C. Missing Values and Outliers
    {
      id: 'm2-qa-19',
      questionNumber: 19,
      part: 'A',
      marks: 3,
      question: 'What are missing values?',
      topicTag: 'Missing Data',
      modelAnswer: {
        keyPoints: [
          'Definition: Data entries that are absent, null (`NaN`), or unrecorded for a given observation in a dataset.',
          'Representations in Python: `np.nan`, `None`, `<NA>`, or custom strings like `"N/A"`, `"-999"`, `"missing"`.',
        ],
      },
    },
    {
      id: 'm2-qa-20',
      questionNumber: 20,
      part: 'A',
      marks: 3,
      question: 'What is a missing value? Explain why “missing” does not automatically mean “zero”.',
      topicTag: 'Missing Data vs Zero',
      modelAnswer: {
        keyPoints: [
          'Missing Value: Represents lack of information / unknown measurement.',
          'Why Missing != Zero: A student missing an exam has unknown aptitude (could be 100); replacing it with 0 wrongly records verified complete failure and heavily deflates the class average.',
        ],
      },
    },
    {
      id: 'm2-qa-21',
      questionNumber: 21,
      part: 'A',
      marks: 3,
      question: 'Define missing values. Mention two methods for identifying missing values.',
      topicTag: 'Missing Data Detection',
      modelAnswer: {
        keyPoints: [
          'Definition: Cells where no observed data is recorded.',
          'Two Pandas Detection Methods: 1. `df.isna().sum()` (counts nulls per column); 2. `df.info()` (displays non-null counts against total row count).',
        ],
      },
    },
    {
      id: 'm2-qa-22',
      questionNumber: 22,
      part: 'A',
      marks: 3,
      question: 'What is an outlier?',
      topicTag: 'Outliers',
      modelAnswer: {
        keyPoints: [
          'Definition: An extreme data point that deviates significantly from the overall statistical distribution of the remaining observations in a dataset.',
          'Example: In a classroom where ages range between 18 and 22, an entry of `85` is an outlier.',
        ],
      },
    },
    {
      id: 'm2-qa-23',
      questionNumber: 23,
      part: 'A',
      marks: 3,
      question: 'Define an outlier. State two possible reasons an outlier may occur in a dataset.',
      topicTag: 'Outliers Origin',
      modelAnswer: {
        keyPoints: [
          'Definition: An observation located an abnormal distance from other sample points.',
          'Two Reasons: 1. Measurement / Data Entry Error (e.g. typing extra zero: 500000 instead of 50000); 2. Genuine Rare Event (e.g. legitimate high-net-worth VIP transaction or sudden cyberattack spike).',
        ],
      },
    },
    {
      id: 'm2-qa-24',
      questionNumber: 24,
      part: 'A',
      marks: 3,
      question: 'What is IQR?',
      topicTag: 'IQR Outliers',
      modelAnswer: {
        keyPoints: [
          'IQR (Interquartile Range): A robust statistical measure of statistical dispersion representing the spread of the middle 50% of sorted data.',
          'Formula: $\\text{IQR} = Q_3 - Q_1$ (Third Quartile minus First Quartile).',
        ],
      },
    },
    {
      id: 'm2-qa-25',
      questionNumber: 25,
      part: 'A',
      marks: 3,
      question: 'Define IQR. Write the formula for IQR.',
      topicTag: 'IQR Outliers',
      modelAnswer: {
        keyPoints: [
          'Definition: The distance between the 75th percentile ($Q_3$) and the 25th percentile ($Q_1$).',
          'Formula: $\\text{IQR} = Q_3 - Q_1$.',
        ],
      },
    },
    {
      id: 'm2-qa-26',
      questionNumber: 26,
      part: 'A',
      marks: 3,
      question: 'What are the lower and upper bounds used for detecting outliers using IQR?',
      topicTag: 'IQR Fences',
      modelAnswer: {
        keyPoints: [
          'Lower Outlier Fence: $\\text{Lower Bound} = Q_1 - 1.5 \\times \\text{IQR}$',
          'Upper Outlier Fence: $\\text{Upper Bound} = Q_3 + 1.5 \\times \\text{IQR}$',
          'Values falling below the lower bound or above the upper bound are flagged as statistical outliers.',
        ],
      },
    },

    // D. NumPy
    {
      id: 'm2-qa-27',
      questionNumber: 27,
      part: 'A',
      marks: 3,
      question: 'What is NumPy?',
      topicTag: 'NumPy Basics',
      modelAnswer: {
        keyPoints: [
          'NumPy (Numerical Python): The core Python library for numerical computing providing multidimensional homogeneous array objects (`ndarray`) and vectorized mathematical operations.',
        ],
      },
    },
    {
      id: 'm2-qa-28',
      questionNumber: 28,
      part: 'A',
      marks: 3,
      question: 'What is NumPy? Mention any two advantages of NumPy arrays.',
      topicTag: 'NumPy Advantages',
      modelAnswer: {
        keyPoints: [
          'Definition: Python library for high-speed linear algebra, matrix computations, and N-dimensional array processing.',
          'Two Advantages: 1. Contiguous memory allocation yields 10x-50x faster execution than Python lists; 2. Vectorized syntax eliminates manual `for` loops.',
        ],
      },
    },
    {
      id: 'm2-qa-29',
      questionNumber: 29,
      part: 'A',
      marks: 3,
      question: 'What is the difference between a Python list and a NumPy array?',
      topicTag: 'NumPy vs List',
      modelAnswer: {
        keyPoints: [
          'Homogeneity: NumPy arrays require all elements to have the exact same data type; Python lists support mixed data types.',
          'Memory Layout: NumPy arrays are stored in contiguous C-style memory blocks; lists store arrays of object pointers.',
          'Vectorized Math: `arr * 2` multiplies every element by 2; `list * 2` duplicates the list elements.',
        ],
      },
    },
    {
      id: 'm2-qa-30',
      questionNumber: 30,
      part: 'A',
      marks: 3,
      question: 'What is array indexing in NumPy?',
      topicTag: 'NumPy Indexing',
      modelAnswer: {
        keyPoints: [
          'Definition: Accessing specific elements in a NumPy array using zero-based integer index offsets (e.g. `arr[0]` for 1D or `matrix[1, 2]` for 2D row 1, col 2).',
        ],
      },
    },
    {
      id: 'm2-qa-31',
      questionNumber: 31,
      part: 'A',
      marks: 3,
      question: 'What is array slicing? Give an example.',
      topicTag: 'NumPy Slicing',
      modelAnswer: {
        keyPoints: [
          'Definition: Extracting a subset of elements from an array using `[start:stop:step]` slice notation without copying underlying memory.',
        ],
        codeSnippet: `import numpy as np
arr = np.array([10, 20, 30, 40, 50, 60])
slice_arr = arr[1:4]  # Extracts index 1, 2, 3
print(slice_arr)     # Output: [20 30 40]`,
      },
    },
    {
      id: 'm2-qa-32',
      questionNumber: 32,
      part: 'A',
      marks: 3,
      question: 'What is Boolean indexing in NumPy?',
      topicTag: 'Boolean Indexing',
      modelAnswer: {
        keyPoints: [
          'Definition: Using a Boolean condition on an array to construct a mask of True/False values, and using that mask to filter matching elements.',
        ],
        codeSnippet: `import numpy as np
marks = np.array([75, 82, 90, 65, 88])
mask = marks >= 80
print(marks[mask])  # Output: [82 90 88]`,
      },
    },
    {
      id: 'm2-qa-33',
      questionNumber: 33,
      part: 'A',
      marks: 3,
      question: 'List any three aggregation functions available in NumPy.',
      topicTag: 'NumPy Aggregation',
      modelAnswer: {
        keyPoints: [
          '1. `np.mean(arr)` (computes arithmetic mean).',
          '2. `np.sum(arr)` (computes sum of elements).',
          '3. `np.std(arr)` (computes standard deviation).',
        ],
      },
    },
    {
      id: 'm2-qa-34',
      questionNumber: 34,
      part: 'A',
      marks: 3,
      question: 'What is broadcasting in NumPy?',
      topicTag: 'NumPy Broadcasting',
      modelAnswer: {
        keyPoints: [
          'Definition: NumPy\'s ability to perform arithmetic operations on arrays of different but compatible shapes by conceptually stretching the smaller array along trailing dimensions without actual memory duplication.',
        ],
      },
    },
    {
      id: 'm2-qa-35',
      questionNumber: 35,
      part: 'A',
      marks: 3,
      question: 'What is the purpose of np.array() and np.arange()?',
      topicTag: 'NumPy Creators',
      modelAnswer: {
        keyPoints: [
          '`np.array()`: Converts an existing Python sequence (list, tuple) into a contiguous NumPy ndarray.',
          '`np.arange(start, stop, step)`: Generates evenly spaced numerical values within a given half-open interval `[start, stop)` similar to Python range.',
        ],
      },
    },
    {
      id: 'm2-qa-36',
      questionNumber: 36,
      part: 'A',
      marks: 3,
      question: 'What is the purpose of NumPy\'s reshape() function? State the rule it must satisfy.',
      topicTag: 'NumPy Reshape',
      modelAnswer: {
        keyPoints: [
          'Purpose: Gives a new shape to an array without altering its underlying memory data elements.',
          'Rule: The total number of elements in the new shape must exactly equal the total number of elements in the original array ($N_{\\text{original}} = \\text{rows} \\times \\text{cols}$).',
        ],
      },
    },

    // E. Pandas
    {
      id: 'm2-qa-37',
      questionNumber: 37,
      part: 'A',
      marks: 3,
      question: 'What is Pandas?',
      topicTag: 'Pandas Basics',
      modelAnswer: {
        keyPoints: [
          'Pandas: An open-source Python library providing high-performance, easy-to-use data structures (Series and DataFrame) for structured and tabular data manipulation and analysis.',
        ],
      },
    },
    {
      id: 'm2-qa-38',
      questionNumber: 38,
      part: 'A',
      marks: 3,
      question: 'What is a Pandas DataFrame?',
      topicTag: 'DataFrame Concept',
      modelAnswer: {
        keyPoints: [
          'Definition: A two-dimensional, size-mutable, tabular data structure with labeled axes (rows and columns), composed of aligned 1D Series objects.',
        ],
      },
    },
    {
      id: 'm2-qa-39',
      questionNumber: 39,
      part: 'A',
      marks: 3,
      question: 'Differentiate between a Pandas Series and DataFrame.',
      topicTag: 'Series vs DataFrame',
      modelAnswer: {
        keyPoints: [
          'Pandas Series: A one-dimensional labeled array capable of holding data of any uniform type (single column).',
          'Pandas DataFrame: A two-dimensional labeled table containing multiple aligned Series sharing a common row index.',
        ],
      },
    },
    {
      id: 'm2-qa-40',
      questionNumber: 40,
      part: 'A',
      marks: 3,
      question: 'Write the syntax to read a CSV file using Pandas.',
      topicTag: 'Pandas I/O',
      modelAnswer: {
        keyPoints: [
          'Syntax: `pd.read_csv("filepath_or_url.csv")` parses tabular comma-delimited text into a 2D DataFrame.',
        ],
        codeSnippet: `import pandas as pd
df = pd.read_csv("dataset.csv")`,
      },
    },
    {
      id: 'm2-qa-41',
      questionNumber: 41,
      part: 'A',
      marks: 3,
      question: 'What is the purpose of head() in Pandas?',
      topicTag: 'Pandas Inspection',
      modelAnswer: {
        keyPoints: [
          'Purpose: Returns the first $n$ rows of a DataFrame (default is 5) to quickly verify structure, headers, and sample values after loading.',
        ],
      },
    },
    {
      id: 'm2-qa-42',
      questionNumber: 42,
      part: 'A',
      marks: 3,
      question: 'Why should df.info() be used instead of print(df.info())? Explain briefly.',
      topicTag: 'Pandas Inspection',
      modelAnswer: {
        keyPoints: [
          '`df.info()` prints its summary output directly to stdout during internal execution and returns `None`.',
          'Calling `print(df.info())` prints the summary and then prints an unwanted trailing `None` string on the console.',
        ],
      },
    },
    {
      id: 'm2-qa-43',
      questionNumber: 43,
      part: 'A',
      marks: 3,
      question: 'What is the purpose of info() in Pandas?',
      topicTag: 'Pandas Inspection',
      modelAnswer: {
        keyPoints: [
          'Purpose: Prints a concise technical summary of a DataFrame including index range, total columns, non-null counts per column, column data types (`dtypes`), and total memory usage.',
        ],
      },
    },
    {
      id: 'm2-qa-44',
      questionNumber: 44,
      part: 'A',
      marks: 3,
      question: 'How can a single column be selected from a DataFrame?',
      topicTag: 'Column Selection',
      modelAnswer: {
        codeSnippet: `# Returns a 1D Pandas Series
marks_series = df["Marks"]`,
      },
    },
    {
      id: 'm2-qa-45',
      questionNumber: 45,
      part: 'A',
      marks: 3,
      question: 'What is conditional filtering in Pandas?',
      topicTag: 'Conditional Filtering',
      modelAnswer: {
        keyPoints: [
          'Definition: Subsetting DataFrame rows that satisfy specific logical criteria using Boolean masks (e.g. `df[df["Age"] >= 18]`).',
        ],
      },
    },
    {
      id: 'm2-qa-46',
      questionNumber: 46,
      part: 'A',
      marks: 3,
      question: 'What is the difference between loc and iloc in Pandas?',
      topicTag: 'loc vs iloc',
      modelAnswer: {
        keyPoints: [
          '`df.loc[...]`: Label-based indexing using row index names and column header strings.',
          '`df.iloc[...]`: Integer position-based indexing using 0-based numerical row and column offsets.',
        ],
      },
    },
    {
      id: 'm2-qa-47',
      questionNumber: 47,
      part: 'A',
      marks: 3,
      question: 'Differentiate loc and iloc in Pandas with one example each.',
      topicTag: 'loc vs iloc',
      modelAnswer: {
        codeSnippet: `# Label-based
val1 = df.loc[0, "Marks"]  # Row label 0, Column 'Marks'

# Position-based
val2 = df.iloc[0, 2]       # Row offset 0, Column offset 2`,
      },
    },
    {
      id: 'm2-qa-48',
      questionNumber: 48,
      part: 'A',
      marks: 3,
      question: 'What is groupby() in Pandas?',
      topicTag: 'GroupBy',
      modelAnswer: {
        keyPoints: [
          'Definition: Implements the Split-Apply-Combine workflow to group DataFrame records by categorical cohorts and compute aggregated statistics per group.',
        ],
      },
    },
    {
      id: 'm2-qa-49',
      questionNumber: 49,
      part: 'A',
      marks: 3,
      question: 'Mention any three aggregation functions used with groupby().',
      topicTag: 'GroupBy Aggregation',
      modelAnswer: {
        keyPoints: [
          '1. `.mean()` (computes cohort average).',
          '2. `.sum()` (computes cohort total).',
          '3. `.count()` (computes non-null count per cohort).',
        ],
      },
    },
    {
      id: 'm2-qa-50',
      questionNumber: 50,
      part: 'A',
      marks: 3,
      question: 'What is the purpose of the merge() function?',
      topicTag: 'Merge',
      modelAnswer: {
        keyPoints: [
          'Purpose: Performs relational database-style joins (inner, left, right, outer) to combine two DataFrames based on matching values in shared key columns.',
        ],
      },
    },
    {
      id: 'm2-qa-51',
      questionNumber: 51,
      part: 'A',
      marks: 3,
      question: 'Differentiate merge() and concat() in Pandas.',
      topicTag: 'Merge vs Concat',
      modelAnswer: {
        keyPoints: [
          '`pd.merge()`: Joins tables horizontally based on matching key values in common identifier columns (relational join).',
          '`pd.concat()`: Stacks DataFrames vertically along rows (`axis=0`) or pastes them horizontally (`axis=1`) along an index.',
        ],
      },
    },
    {
      id: 'm2-qa-52',
      questionNumber: 52,
      part: 'A',
      marks: 3,
      question: 'Name the four common types of joins in Pandas.',
      topicTag: 'Joins',
      modelAnswer: {
        keyPoints: ['1. Inner Join', '2. Left Join (Left Outer)', '3. Right Join (Right Outer)', '4. Outer Join (Full Outer)'],
      },
    },
    {
      id: 'm2-qa-53',
      questionNumber: 53,
      part: 'A',
      marks: 3,
      question: 'What is an inner join?',
      topicTag: 'Inner Join',
      modelAnswer: {
        keyPoints: [
          'Definition: Returns only those rows where matching key values exist in both the left and right DataFrames (drops non-matching records).',
        ],
      },
    },
    {
      id: 'm2-qa-54',
      questionNumber: 54,
      part: 'A',
      marks: 3,
      question: 'What is a left join?',
      topicTag: 'Left Join',
      modelAnswer: {
        keyPoints: [
          'Definition: Retains all rows from the left DataFrame and merges matching records from the right DataFrame; unmapped right attributes are populated with `NaN`.',
        ],
      },
    },
    {
      id: 'm2-qa-55',
      questionNumber: 55,
      part: 'A',
      marks: 3,
      question: 'What is an outer join?',
      topicTag: 'Outer Join',
      modelAnswer: {
        keyPoints: [
          'Definition: Retains all rows from both left and right DataFrames, inserting `NaN` wherever keys do not match in either table.',
        ],
      },
    },
    {
      id: 'm2-qa-56',
      questionNumber: 56,
      part: 'A',
      marks: 3,
      question: 'What is a pivot table?',
      topicTag: 'Pivot Table',
      modelAnswer: {
        keyPoints: [
          'Definition: A multi-dimensional summarized DataFrame created with `df.pivot_table()` that aggregates data across specified row and column categorical dimensions.',
        ],
      },
    },
    {
      id: 'm2-qa-57',
      questionNumber: 57,
      part: 'A',
      marks: 3,
      question: 'What is the purpose of apply() in Pandas?',
      topicTag: 'Apply Function',
      modelAnswer: {
        keyPoints: [
          'Purpose: Applies a custom function or lambda expression across all elements of a Series or across rows/columns of a DataFrame.',
        ],
      },
    },
    {
      id: 'm2-qa-58',
      questionNumber: 58,
      part: 'A',
      marks: 3,
      question: 'What is categorical data formatting?',
      topicTag: 'Formatting',
      modelAnswer: {
        keyPoints: [
          'Definition: Standardizing inconsistent categorical text representations (e.g. mapping `"M"`, `"male"`, `"MALE"` to unified `"Male"`) using dictionary maps.',
        ],
      },
    },
    {
      id: 'm2-qa-59',
      questionNumber: 59,
      part: 'A',
      marks: 3,
      question: 'Why is standardizing text important during data preprocessing?',
      topicTag: 'Text Standardization',
      modelAnswer: {
        keyPoints: [
          'Prevents Fragmented Categories: Trimming whitespace and unifying case prevents strings like `" Mumbai "` and `"mumbai"` from being treated as separate cities during grouping and value counts.',
        ],
      },
    },
    {
      id: 'm2-qa-60',
      questionNumber: 60,
      part: 'A',
      marks: 3,
      question: 'Why is data preprocessing important before analysis?',
      topicTag: 'Preprocessing Importance',
      modelAnswer: {
        keyPoints: [
          'Guarantees Data Integrity: Resolves missing values, removes outliers, cleans formatting, and ensures analytical types are correct before modeling.',
        ],
      },
    },
  ],

  partBQuestions: [
    // A. Data Collection
    {
      id: 'm2-qb-1',
      questionNumber: 1,
      part: 'B',
      marks: 5,
      question: 'Explain different sources of data.',
      topicTag: 'Data Sources',
      modelAnswer: {
        keyPoints: [
          '1. Primary Sources: First-hand data collected for specific study (sensors, user questionnaires, lab experiments).',
          '2. Secondary Sources: Pre-existing external data (census repositories, published financial reports, open datasets).',
          '3. Internal Sources: Generated within corporate ERP/CRM systems and database transaction logs.',
          '4. External Sources: Sourced from web scrapers, third-party REST APIs, and market data feeds.',
        ],
      },
    },
    {
      id: 'm2-qb-2',
      questionNumber: 2,
      part: 'B',
      marks: 5,
      question: 'Explain different methods of data collection.',
      topicTag: 'Collection Methods',
      modelAnswer: {
        keyPoints: [
          '1. REST APIs: Programmatic, authorized JSON endpoints providing streaming and batch data.',
          '2. Web Scraping: Automated HTML parsing of unstructured web pages using BeautifulSoup/Selenium.',
          '3. Database Queries: Direct SQL extraction from relational databases and data warehouses.',
          '4. IoT Sensor Streaming: Hardware telemetry streams over MQTT/Kafka protocols.',
          '5. Manual Entry & Digital Surveys: Structured online questionnaires and forms.',
        ],
      },
    },
    {
      id: 'm2-qb-3',
      questionNumber: 3,
      part: 'B',
      marks: 5,
      question: 'Explain the problems encountered during data collection.',
      topicTag: 'Collection Traps',
      modelAnswer: {
        keyPoints: [
          '1. Sampling Bias: Non-representative sampling leading to skewed conclusions.',
          '2. Network Ingestion Failures: API rate limiting, packet dropouts, and connection timeouts.',
          '3. Format & Schema Inconsistencies: Merging incompatible JSON, CSV, and SQL datatypes.',
          '4. Missing & Corrupted Data: Unfilled survey fields and sensor hardware dropouts.',
          '5. Privacy & Governance Violations: Mishandling PII data under regulatory acts.',
        ],
      },
    },
    {
      id: 'm2-qb-4',
      questionNumber: 4,
      part: 'B',
      marks: 5,
      question: 'Explain the difference between primary and secondary data with suitable examples.',
      topicTag: 'Primary vs Secondary',
      modelAnswer: {
        keyPoints: [
          'Primary Data: Original first-hand data collected directly for current research. Highly relevant and controlled, but expensive and time-consuming (e.g. Clinical trial patient telemetry).',
          'Secondary Data: Pre-existing data collected by third parties for other objectives. Fast and cost-effective, but may suffer from unknown lineage or mismatching definitions (e.g. World Health Organization epidemic archives).',
        ],
      },
    },
    {
      id: 'm2-qb-5',
      questionNumber: 5,
      part: 'B',
      marks: 5,
      question: 'Explain the different types of data: structured, semi-structured and unstructured.',
      topicTag: 'Data Structures',
      modelAnswer: {
        keyPoints: [
          '1. Structured Data: Rigid tabular schema with defined data types (e.g. SQL relational tables, CSV files).',
          '2. Semi-Structured Data: Self-describing data with organizational tags/keys but flexible schema (e.g. JSON API payloads, XML logs).',
          '3. Unstructured Data: No predefined conceptual data model or schema (e.g. video files, audio streams, customer email text).',
        ],
      },
    },

    // B. APIs and Web Scraping
    {
      id: 'm2-qb-6',
      questionNumber: 6,
      part: 'B',
      marks: 5,
      question: 'Explain the API request–response cycle with the help of a labelled flow diagram.',
      topicTag: 'API Lifecycle',
      modelAnswer: {
        diagramOrSteps: [
          '1. Client (Python App) constructs HTTP Request (Method: GET/POST, URL Endpoint, Headers: Auth Token, Query Params).',
          '2. Request travels across internet to API Server.',
          '3. Server authenticates client, queries internal database, and processes request.',
          '4. Server returns HTTP Response (Status Code: 200/404, Headers: Content-Type, Body: JSON Payload).',
          '5. Client parses JSON payload into Pandas DataFrame.',
        ],
        keyPoints: [
          'Client ➔ [HTTP Request (GET /weather)] ➔ API Server',
          'API Server ➔ [HTTP Response (200 OK + JSON)] ➔ Client',
        ],
      },
    },
    {
      id: 'm2-qb-7',
      questionNumber: 7,
      part: 'B',
      marks: 5,
      question: 'Write Python code to send a GET request to an API, check the status code, and load a successful JSON response into a Pandas DataFrame.',
      topicTag: 'API to DataFrame Code',
      modelAnswer: {
        codeSnippet: `import requests
import pandas as pd

url = "https://api.example.com/v1/students"
response = requests.get(url, timeout=10)

if response.status_code == 200:
    data = response.json()
    df = pd.DataFrame(data)
    print("DataFrame successfully created:")
    print(df.head())
else:
    print(f"Failed to fetch data. HTTP Status: {response.status_code}")`,
      },
    },
    {
      id: 'm2-qb-8',
      questionNumber: 8,
      part: 'B',
      marks: 5,
      question: 'Explain the difference between APIs and web scraping as data-collection methods.',
      topicTag: 'APIs vs Web Scraping',
      modelAnswer: {
        keyPoints: [
          'Protocol: APIs use authorized programmatic endpoints; Web Scraping parses presentation HTML.',
          'Data Cleanliness: APIs return structured JSON/XML directly; Scraping requires cleaning HTML tags and CSS wrappers.',
          'Stability: APIs are versioned and stable; Scrapers break whenever website design or class names change.',
          'Legal & Governance: APIs provide explicit usage terms and rate limits; Scraping must respect `robots.txt` and copyright constraints.',
        ],
      },
    },
    {
      id: 'm2-qb-9',
      questionNumber: 9,
      part: 'B',
      marks: 5,
      question: 'Write Python code that fetches API data into a DataFrame and scrapes <h2> headings from a webpage.',
      topicTag: 'API + Scraping Code',
      modelAnswer: {
        codeSnippet: `import requests
from bs4 import BeautifulSoup
import pandas as pd

# 1. Fetch API data into DataFrame
api_url = "https://jsonplaceholder.typicode.com/users"
api_res = requests.get(api_url)
df_users = pd.DataFrame(api_res.json()) if api_res.status_code == 200 else pd.DataFrame()

# 2. Scrape <h2> headings from webpage
web_url = "https://example.com"
web_res = requests.get(web_url)
soup = BeautifulSoup(web_res.text, "html.parser")
headings = [h2.get_text(strip=True) for h2 in soup.find_all("h2")]

print("Scraped Headings:", headings)`,
      },
    },

    // C. Missing Values & Outliers
    {
      id: 'm2-qb-10',
      questionNumber: 10,
      part: 'B',
      marks: 5,
      question: 'Explain missing-value handling techniques in Pandas.',
      topicTag: 'Missing Data Techniques',
      modelAnswer: {
        keyPoints: [
          '1. Deletion (`df.dropna()`): Drops rows or columns containing nulls; suitable when missingness is under 3%.',
          '2. Mean/Median Imputation: `df["Marks"].fillna(df["Marks"].median(), inplace=True)` for numerical features.',
          '3. Mode Imputation: `df["City"].fillna(df["City"].mode()[0], inplace=True)` for categorical features.',
          '4. Sequential Imputation: `.ffill()` (forward fill) and `.bfill()` (backward fill) for time series data.',
        ],
      },
    },
    {
      id: 'm2-qb-11',
      questionNumber: 11,
      part: 'B',
      marks: 5,
      question: 'Explain the IQR method for detecting outliers.',
      topicTag: 'IQR Outlier Detection',
      modelAnswer: {
        keyPoints: [
          '1. Sort the data and calculate First Quartile ($Q_1$, 25th percentile) and Third Quartile ($Q_3$, 75th percentile).',
          '2. Compute Interquartile Range: $\\text{IQR} = Q_3 - Q_1$.',
          '3. Compute Tukey Fences: $\\text{Lower Fence} = Q_1 - 1.5 \\times \\text{IQR}$; $\\text{Upper Fence} = Q_3 + 1.5 \\times \\text{IQR}$.',
          '4. Flag any observation $x < \\text{Lower Fence}$ or $x > \\text{Upper Fence}$ as an outlier.',
        ],
      },
    },
    {
      id: 'm2-qb-12',
      questionNumber: 12,
      part: 'B',
      marks: 5,
      question: 'Explain the IQR method for outlier detection. State the formula and write the corresponding Pandas code.',
      topicTag: 'IQR Detection Code',
      modelAnswer: {
        codeSnippet: `import pandas as pd

def detect_outliers_iqr(df, column):
    q1 = df[column].quantile(0.25)
    q3 = df[column].quantile(0.75)
    iqr = q3 - q1
    lower_fence = q1 - 1.5 * iqr
    upper_fence = q3 + 1.5 * iqr
    outliers = df[(df[column] < lower_fence) | (df[column] > upper_fence)]
    return outliers, lower_fence, upper_fence`,
      },
    },
    {
      id: 'm2-qb-13',
      questionNumber: 13,
      part: 'B',
      marks: 5,
      question: 'Explain mean imputation versus median imputation, and describe a scenario where each would be the preferred choice.',
      topicTag: 'Mean vs Median Imputation',
      modelAnswer: {
        keyPoints: [
          'Mean Imputation: Replaces nulls with arithmetic mean. Preferred when data is symmetrically normally distributed without significant outliers (e.g. standardized test scores).',
          'Median Imputation: Replaces nulls with 50th percentile middle value. Preferred when data is highly skewed or contains extreme outliers (e.g. household income or house prices), because median is robust to extreme values.',
        ],
      },
    },
    {
      id: 'm2-qb-14',
      questionNumber: 14,
      part: 'B',
      marks: 5,
      question: 'Explain the IQR method and Z-score method with formulas.',
      topicTag: 'IQR vs Z-Score',
      modelAnswer: {
        keyPoints: [
          'IQR Method: Non-parametric; uses medians and quartiles. $\\text{IQR} = Q_3 - Q_1$; Bounds: $[Q_1 - 1.5 \\times \\text{IQR}, Q_3 + 1.5 \\times \\text{IQR}]$. Robust against skewed distributions.',
          'Z-Score Method: Parametric; assumes normal distribution. $Z = \\frac{x - \\mu}{\\sigma}$. Flagged as outlier if $|Z| > 3$. Vulnerable to masking since extreme outliers inflate $\\mu$ and $\\sigma$.',
        ],
      },
    },
    {
      id: 'm2-qb-15',
      questionNumber: 15,
      part: 'B',
      marks: 5,
      question: 'Write complete Pandas code to detect outliers in a Salary column using IQR.',
      topicTag: 'Salary Outlier Code',
      modelAnswer: {
        codeSnippet: `import pandas as pd

df = pd.DataFrame({"Salary": [25000, 28000, 32000, 29000, 31000, 500000, 27000]})

Q1 = df["Salary"].quantile(0.25)
Q3 = df["Salary"].quantile(0.75)
IQR = Q3 - Q1

lower_limit = Q1 - 1.5 * IQR
upper_limit = Q3 + 1.5 * IQR

outliers = df[(df["Salary"] < lower_limit) | (df["Salary"] > upper_limit)]
print("Detected Outliers:\\n", outliers)`,
      },
    },
    {
      id: 'm2-qb-16',
      questionNumber: 16,
      part: 'B',
      marks: 5,
      question: 'Discuss the possible responses to a detected outlier.',
      topicTag: 'Outlier Treatment Protocols',
      modelAnswer: {
        keyPoints: [
          '1. Retain (Keep): If outlier is a verified genuine real-world event (e.g. VIP customer order or fraud signal).',
          '2. Trim / Drop: If outlier is a verified data entry typo or sensor breakdown (e.g. Age = 250).',
          '3. Cap / Winsorize: Clamp values to 1st percentile (lower) and 99th percentile (upper) to preserve sample size.',
          '4. Mathematical Transformation: Apply $\\log(x)$ or square root to compress heavy right-skewed tails.',
        ],
      },
    },

    // D. Data Formatting & Preprocessing
    {
      id: 'm2-qb-17',
      questionNumber: 17,
      part: 'B',
      marks: 5,
      question: 'Explain any five common data-formatting problems with one example of each.',
      topicTag: 'Formatting Problems',
      modelAnswer: {
        keyPoints: [
          '1. Whitespace Traps: `" Mumbai "` (leading/trailing spaces).',
          '2. Inconsistent Casing: `"mumbai"` vs `"MUMBAI"` vs `"Mumbai"`.',
          '3. Numeric Text Strings: `"85"` stored as `str` instead of `int64`.',
          '4. Currency Symbols & Commas: `"₹50,000"` preventing math calculation.',
          '5. Heterogeneous Date Formats: Mixing `"01/08/2026"`, `"2026-08-01"`, and `"Aug 1, 2026"`.',
        ],
      },
    },
    {
      id: 'm2-qb-18',
      questionNumber: 18,
      part: 'B',
      marks: 5,
      question: 'Explain data formatting/standardization and why it matters.',
      topicTag: 'Formatting Importance',
      modelAnswer: {
        keyPoints: [
          'Definition: Standardizing diverse data representations into unified computational formats.',
          'Why It Matters: Prevents categorical splintering in `value_counts()`, enables mathematical calculations on numeric columns, unlocks `.dt` chronological sorting on dates, and makes datasets analysis-ready.',
        ],
      },
    },
    {
      id: 'm2-qb-19',
      questionNumber: 19,
      part: 'B',
      marks: 5,
      question: 'Write Python/Pandas code to clean spaces, case, comma-separated numbers, and mixed dates.',
      topicTag: 'Data Cleaning Code',
      modelAnswer: {
        codeSnippet: `import pandas as pd

df = pd.DataFrame({
    "city": [" Mumbai ", "pune", "MUMBAI"],
    "price": ["₹50,000", "₹30,000", "75000"],
    "date": ["01/08/2026", "2026-08-01", "Aug 1, 2026"]
})

# 1. Clean spaces and casing
df["city"] = df["city"].str.strip().str.title()

# 2. Clean currency & comma-separated numbers
df["price"] = df["price"].str.replace("[₹,]", "", regex=True).astype(float)

# 3. Parse mixed dates
df["date"] = pd.to_datetime(df["date"])
print(df)`,
      },
    },
    {
      id: 'm2-qb-20',
      questionNumber: 20,
      part: 'B',
      marks: 5,
      question: 'Explain why numeric-as-text columns cause problems.',
      topicTag: 'Numeric as Text Trap',
      modelAnswer: {
        keyPoints: [
          '1. Lexicographic Sorting Bugs: String sorting orders `"100"` before `"85"` because character `"1"` < `"8"`.',
          '2. Arithmetic Operation Failures: Mathematical functions like `.sum()` and `.mean()` fail or perform string concatenation (`"85" + "10" = "8510"`).',
          '3. Comparison Distortions: Filtering `df["Marks"] > "80"` compares ASCII character codes rather than numeric magnitude.',
        ],
      },
    },
    {
      id: 'm2-qb-21',
      questionNumber: 21,
      part: 'B',
      marks: 5,
      question: 'Discuss when dropping missing values is preferable to imputing, and explain the risk of each approach.',
      topicTag: 'Drop vs Impute',
      modelAnswer: {
        keyPoints: [
          'When Dropping is Preferable: When missingness percentage is negligible (< 3%), missingness is purely MCAR, or an entire feature has > 70% missing values.',
          'Risks of Dropping: Severe sample loss, destruction of statistical power, and introduction of sampling bias if data is MNAR.',
          'Risks of Imputing: Artificially reduces feature variance, distorts correlations with other variables, and introduces synthetic bias.',
        ],
      },
    },

    // E. NumPy
    {
      id: 'm2-qb-22',
      questionNumber: 22,
      part: 'B',
      marks: 5,
      question: 'Explain NumPy array creation methods.',
      topicTag: 'NumPy Array Creation',
      modelAnswer: {
        keyPoints: [
          '1. From Sequence: `np.array([1, 2, 3])`',
          '2. Constant Arrays: `np.zeros((2, 3))` (all zeros), `np.ones((3, 3))` (all ones)',
          '3. Range Generators: `np.arange(0, 10, 2)` (step range), `np.linspace(0, 1, 5)` (evenly spaced)',
          '4. Random Generation: `np.random.rand(3, 3)` (uniform), `np.random.randn(3, 3)` (normal)',
        ],
      },
    },
    {
      id: 'm2-qb-23',
      questionNumber: 23,
      part: 'B',
      marks: 5,
      question: 'Explain NumPy indexing and slicing.',
      topicTag: 'NumPy Slicing',
      modelAnswer: {
        keyPoints: [
          '1. 1D Indexing: `arr[0]` (first element), `arr[-1]` (last element).',
          '2. 1D Slicing: `arr[1:4]` (elements from index 1 to 3).',
          '3. 2D Indexing: `matrix[row, col]` (e.g. `matrix[0, 1]`).',
          '4. 2D Slicing: `matrix[0:2, 1:3]` (sub-matrix of rows 0-1 and cols 1-2).',
        ],
      },
    },
    {
      id: 'm2-qb-24',
      questionNumber: 24,
      part: 'B',
      marks: 5,
      question: 'Explain NumPy aggregation functions.',
      topicTag: 'NumPy Aggregations',
      modelAnswer: {
        keyPoints: [
          '1. `np.sum(arr, axis=...)`: Sums elements.',
          '2. `np.mean(arr, axis=...)`: Calculates arithmetic average.',
          '3. `np.min(arr)` / `np.max(arr)`: Extracts minimum and maximum values.',
          '4. `np.std(arr)` / `np.var(arr)`: Computes standard deviation and variance.',
        ],
      },
    },
    {
      id: 'm2-qb-25',
      questionNumber: 25,
      part: 'B',
      marks: 5,
      question: 'Explain reshape(), flatten() and transpose in NumPy.',
      topicTag: 'NumPy Array Manipulation',
      modelAnswer: {
        keyPoints: [
          '`reshape(r, c)`: Changes dimensions to rows `r` and cols `c` without changing data elements.',
          '`flatten()`: Collapses multidimensional matrix into a flat 1D array (returns a copy).',
          '`transpose()` / `.T`: Permutes array dimensions, swapping rows and columns ($M_{i,j} \\to M_{j,i}$).',
        ],
      },
    },
    {
      id: 'm2-qb-26',
      questionNumber: 26,
      part: 'B',
      marks: 5,
      question: 'Explain axis=0 and axis=1 in NumPy using a 3 × 3 marks matrix as an example.',
      topicTag: 'NumPy Axis Concept',
      modelAnswer: {
        keyPoints: [
          '`axis=0` (Down rows / across vertical dimension): Computes one aggregate per column (e.g. average marks for each subject across all students). Output shape: `(3,)`.',
          '`axis=1` (Across columns / along horizontal dimension): Computes one aggregate per row (e.g. average marks for each student across all subjects). Output shape: `(3,)`.',
        ],
      },
    },
    {
      id: 'm2-qb-27',
      questionNumber: 27,
      part: 'B',
      marks: 5,
      question: 'Explain ndim, shape, size, and dtype with a 2 × 3 NumPy array example.',
      topicTag: 'NumPy Attributes',
      modelAnswer: {
        codeSnippet: `import numpy as np

arr = np.array([[10, 20, 30], [40, 50, 60]])

print("ndim: ", arr.ndim)   # Output: 2 (2 dimensions)
print("shape:", arr.shape)  # Output: (2, 3) -> 2 rows, 3 cols
print("size: ", arr.size)   # Output: 6 (total elements)
print("dtype:", arr.dtype)  # Output: int64 (data type of elements)`,
      },
    },
    {
      id: 'm2-qb-28',
      questionNumber: 28,
      part: 'B',
      marks: 5,
      question: 'Write NumPy code for reshape(), flatten(), and transpose.',
      topicTag: 'NumPy Transformation Code',
      modelAnswer: {
        codeSnippet: `import numpy as np

arr = np.arange(1, 7)  # [1, 2, 3, 4, 5, 6]

# 1. Reshape 1D to 2x3
reshaped = arr.reshape(2, 3)

# 2. Transpose 2x3 to 3x2
transposed = reshaped.T

# 3. Flatten back to 1D
flattened = transposed.flatten()

print("Reshaped:\\n", reshaped)
print("Transposed:\\n", transposed)
print("Flattened:", flattened)`,
      },
    },

    // F. Pandas
    {
      id: 'm2-qb-29',
      questionNumber: 29,
      part: 'B',
      marks: 5,
      question: 'Explain groupby() and aggregation in Pandas.',
      topicTag: 'Pandas GroupBy',
      modelAnswer: {
        keyPoints: [
          'Split: Segregates DataFrame into subsets based on distinct values of grouping key(s).',
          'Apply: Computes aggregate functions (`mean`, `sum`, `count`, `max`) independently on each subset.',
          'Combine: Assembles computed metrics into a structured summary DataFrame.',
        ],
      },
    },
    {
      id: 'm2-qb-30',
      questionNumber: 30,
      part: 'B',
      marks: 5,
      question: 'Explain groupby() combined with agg() using a sales-by-region example, including named aggregation output columns.',
      topicTag: 'Named Aggregation Code',
      modelAnswer: {
        codeSnippet: `import pandas as pd

df = pd.DataFrame({
    "Region": ["North", "South", "North", "South", "North"],
    "Sales": [50000, 70000, 60000, 80000, 55000]
})

# Named aggregation
summary = df.groupby("Region").agg(
    Total_Sales=("Sales", "sum"),
    Average_Sales=("Sales", "mean"),
    Order_Count=("Sales", "count")
)
print(summary)`,
      },
    },
    {
      id: 'm2-qb-31',
      questionNumber: 31,
      part: 'B',
      marks: 5,
      question: 'Differentiate inner, left, right and outer joins using a suitable example.',
      topicTag: 'Joins Comparison',
      modelAnswer: {
        keyPoints: [
          'Inner Join: Only keys present in BOTH tables are retained.',
          'Left Join: All keys from LEFT table retained; unmapped right columns filled with NaN.',
          'Right Join: All keys from RIGHT table retained; unmapped left columns filled with NaN.',
          'Outer Join: All keys from BOTH tables retained; non-matching fields filled with NaN.',
        ],
      },
    },
    {
      id: 'm2-qb-32',
      questionNumber: 32,
      part: 'B',
      marks: 5,
      question: 'Explain merge() and its different join types with a set-based example.',
      topicTag: 'Pandas Merge',
      modelAnswer: {
        keyPoints: [
          'Set A = {101, 102, 103} (Students), Set B = {101, 102, 104} (Marks)',
          'Inner Join ($A \\cap B$): {101, 102}',
          'Left Join ($A$): {101, 102, 103}',
          'Right Join ($B$): {101, 102, 104}',
          'Outer Join ($A \\cup B$): {101, 102, 103, 104}',
        ],
      },
    },
    {
      id: 'm2-qb-33',
      questionNumber: 33,
      part: 'B',
      marks: 5,
      question: 'Explain concat() and pivot_table() with suitable code.',
      topicTag: 'Concat and Pivot',
      modelAnswer: {
        codeSnippet: `import pandas as pd

df1 = pd.DataFrame({"A": [1, 2]})
df2 = pd.DataFrame({"A": [3, 4]})

# 1. Stacking vertically with concat
stacked = pd.concat([df1, df2], ignore_index=True)

# 2. Pivot table
sales = pd.DataFrame({
    "City": ["Mumbai", "Pune", "Mumbai", "Pune"],
    "Year": [2025, 2025, 2026, 2026],
    "Revenue": [100, 150, 120, 180]
})
pivot = sales.pivot_table(values="Revenue", index="City", columns="Year", aggfunc="sum")
print(pivot)`,
      },
    },
    {
      id: 'm2-qb-34',
      questionNumber: 34,
      part: 'B',
      marks: 5,
      question: 'Explain grouping, aggregation, merging, joins and pivot tables in Pandas.',
      topicTag: 'Pandas Operations Overview',
      modelAnswer: {
        keyPoints: [
          'Grouping & Aggregation: `df.groupby("Category")["Sales"].sum()` collapses rows into group summaries.',
          'Merging & Joins: `pd.merge(t1, t2, on="ID", how="left")` combines tables by key.',
          'Concatenation: `pd.concat([t1, t2], axis=0)` stacks batches.',
          'Pivot Table: `df.pivot_table()` reorganizes 2D dimensions into multidimensional matrix views.',
        ],
      },
    },
    {
      id: 'm2-qb-35',
      questionNumber: 35,
      part: 'B',
      marks: 5,
      question: 'Explain Pandas DataFrame operations for data analysis.',
      topicTag: 'DataFrame Operations',
      modelAnswer: {
        keyPoints: [
          '1. Inspection: `.head()`, `.shape`, `.info()`, `.describe()`',
          '2. Slicing: `df[cols]`, `.loc[]` (label), `.iloc[]` (pos)',
          '3. Filtering: `df[(df["A"] > 10) & (df["B"] == "X")]`',
          '4. Feature Engineering: `df["New"] = df["A"] * 2`, `np.where()`',
          '5. Sorting & Aggregation: `.sort_values()`, `.groupby().mean()`',
        ],
      },
    },
  ],

  partCQuestions: [
    {
      id: 'm2-qc-1',
      questionNumber: 1,
      part: 'C',
      marks: 14,
      question: 'Explain the complete Data Collection process and different Data Sources.',
      topicTag: 'Data Collection & Sources Comprehensive',
      modelAnswer: {
        shortSummary: 'Data Collection is the critical entry point of the Data Science lifecycle, defining how structured, semi-structured, and unstructured data are gathered from internal and external sources.',
        diagramOrSteps: [
          '1. Types of Data: Structured (SQL tables), Semi-Structured (JSON/XML APIs), Unstructured (Audio, Video, Free-text).',
          '2. Internal Data: Operational ERP, CRM, and server transaction logs generated inside organizational borders.',
          '3. External Data: Procured from web scraping, third-party REST APIs, financial markets, and government archives.',
          '4. Data Collection Methods: REST APIs, Web Scraping, Direct Surveys, IoT Sensor Streams, Open Datasets.',
          '5. Characteristics of Good Data: Accuracy, Completeness, Consistency, Timeliness, Validity, Uniqueness.',
          '6. Ingestion Problems: Sampling bias, schema drift, network timeouts, duplicate records, missing attributes.',
        ],
        keyPoints: [
          'Structured: High organization, relational integrity (PostgreSQL, CSV).',
          'Semi-Structured: Key-value self-describing pairs (REST JSON, MongoDB).',
          'Unstructured: 80% of enterprise data requiring NLP/Computer Vision processing.',
          'Case Example: Smart City traffic management combining internal toll logs (SQL), weather API feeds (JSON), and road camera feeds (unstructured).',
        ],
      },
    },
    {
      id: 'm2-qc-2',
      questionNumber: 2,
      part: 'C',
      marks: 14,
      question: 'Explain the complete data-collection-to-analysis roadmap. Compare APIs and web scraping as data-collection methods, and write Python code that fetches API data into a DataFrame and scrapes <h2> headings from a webpage.',
      topicTag: 'Collection Roadmap & Web Access',
      modelAnswer: {
        shortSummary: 'The roadmap from raw data acquisition to analysis connects automated ingestion (APIs/Scraping), cleaning, formatting, and DataFrame integration.',
        keyPoints: [
          'Part 1: Ingestion Roadmap: Ingestion (REST/HTML) ➔ Schema Validation ➔ Missing/Outlier Cleaning ➔ Normalization ➔ DataFrame Operations ➔ Analytical Modeling.',
          'Part 2: APIs vs Web Scraping Comparison:',
          '• APIs: Structured JSON, documented endpoints, stable versioning, authorized rate limits.',
          '• Web Scraping: Unstructured HTML, brittle DOM layout dependence, subject to `robots.txt` and anti-bot captchas.',
        ],
        codeSnippet: `import requests
from bs4 import BeautifulSoup
import pandas as pd

# Part 1: Fetch API Data into DataFrame
api_url = "https://jsonplaceholder.typicode.com/posts"
api_res = requests.get(api_url, timeout=10)
if api_res.status_code == 200:
    posts_df = pd.DataFrame(api_res.json())
    print("API DataFrame (Top 3):\\n", posts_df[["userId", "id", "title"]].head(3))

# Part 2: Scrape <h2> headings from a webpage
web_url = "https://example.com"
web_res = requests.get(web_url, timeout=10)
soup = BeautifulSoup(web_res.text, "html.parser")
h2_headings = [h2.get_text(strip=True) for h2 in soup.find_all("h2")]
print("\\nScraped Headings Count:", len(h2_headings))`,
      },
    },
    {
      id: 'm2-qc-3',
      questionNumber: 3,
      part: 'C',
      marks: 14,
      question: 'Explain missing values and their common representations. Write code demonstrating at least four missing-value handling strategies, and discuss when dropping is preferable to imputing.',
      topicTag: 'Missing Data Strategies',
      modelAnswer: {
        shortSummary: 'Missing data occurs when no observation value is stored. Handling requires understanding missingness mechanisms (MCAR, MAR, MNAR) and selecting robust remediation strategies.',
        keyPoints: [
          'Common Representations: `np.nan`, `None`, `<NA>`, `""` (empty string), `"-999"`, `"unknown"`.',
          'Drop vs Impute Tradeoff: Dropping preserves real distribution if missingness < 3% and MCAR; Imputation maintains sample size but risks distorting variance and feature correlations.',
        ],
        codeSnippet: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "Marks": [85, np.nan, 78, 92, np.nan, 65],
    "City": ["Mumbai", "Pune", np.nan, "Mumbai", "Pune", "Mumbai"],
    "Temp": [24.5, 25.0, np.nan, np.nan, 26.5, 27.0]
})

# Strategy 1: Complete-Case Analysis (Drop Rows)
df_dropped = df.dropna()

# Strategy 2: Mean / Median Imputation
df["Marks_Imputed"] = df["Marks"].fillna(df["Marks"].median())

# Strategy 3: Mode Imputation (Categorical)
df["City_Imputed"] = df["City"].fillna(df["City"].mode()[0])

# Strategy 4: Forward Fill (Time Series)
df["Temp_Imputed"] = df["Temp"].ffill()

print("Cleaned DataFrame:\\n", df)`,
      },
    },
    {
      id: 'm2-qc-4',
      questionNumber: 4,
      part: 'C',
      marks: 14,
      question: 'Explain missing values and outliers. Describe their detection and treatment using Pandas (isna, isnull, dropna, fillna, mean/median/categorical imputation, IQR outlier detection and treatment).',
      topicTag: 'Missing Values & Outliers Suite',
      modelAnswer: {
        shortSummary: 'Missing values and outliers represent the two primary data quality defects. Pandas provides a comprehensive toolkit for detection and treatment.',
        diagramOrSteps: [
          '1. Missing Detection: `df.isna().sum()`, `df.isnull().sum()`',
          '2. Missing Treatment: `df.dropna()` (deletion), `df.fillna(df.mean())` / `df.fillna(df.median())` (numeric), `df.fillna(df.mode()[0])` (categorical)',
          '3. Outlier Detection: IQR Rule: $Q_1 = \\text{quantile}(0.25)$, $Q_3 = \\text{quantile}(0.75)$, $\\text{IQR} = Q_3 - Q_1$, Bounds: $[Q_1 - 1.5\\times\\text{IQR}, Q_3 + 1.5\\times\\text{IQR}]$',
          '4. Outlier Treatment: Trimming (filtering valid bounds), Winsorization (clamping), Log scaling',
        ],
        codeSnippet: `import pandas as pd
import numpy as np

# Sample dirty dataset
df = pd.DataFrame({
    "Score": [75, np.nan, 82, 90, 500, 78, 85, np.nan], # 500 is outlier
    "Category": ["A", "B", np.nan, "A", "A", "B", "A", "B"]
})

# 1. Handle Missing Values
df["Score_Clean"] = df["Score"].fillna(df["Score"].median())
df["Category_Clean"] = df["Category"].fillna(df["Category"].mode()[0])

# 2. Detect & Treat Outliers via IQR
Q1 = df["Score_Clean"].quantile(0.25)
Q3 = df["Score_Clean"].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

# Cap (Winsorize) Outlier
df["Score_Final"] = df["Score_Clean"].clip(lower=lower, upper=upper)
print(df)`,
      },
    },
    {
      id: 'm2-qc-5',
      questionNumber: 5,
      part: 'C',
      marks: 14,
      question: 'Explain the IQR method and Z-score method with formulas. Write complete code to detect outliers in a Salary column using IQR, and discuss the possible responses to a detected outlier.',
      topicTag: 'Outlier Detection & Response',
      modelAnswer: {
        shortSummary: 'Outlier detection identifies observations departing significantly from the main distribution using non-parametric (IQR) or parametric (Z-score) statistical metrics.',
        keyPoints: [
          '1. IQR Method: Non-parametric; $\\text{IQR} = Q_3 - Q_1$; Fences: $Q_1 - 1.5\\times\\text{IQR}$ to $Q_3 + 1.5\\times\\text{IQR}$.',
          '2. Z-Score Method: Parametric; $Z = \\frac{x - \\mu}{\\sigma}$; Outliers flagged when $|Z| > 3$.',
          '3. Responses: Investigate origin ➔ Retain (if real breakthrough) ➔ Drop (if entry error) ➔ Winsorize (clamp bounds) ➔ Log transform.',
        ],
        codeSnippet: `import pandas as pd

df = pd.DataFrame({"Salary": [30000, 32000, 28000, 35000, 31000, 29000, 750000, 33000]})

# IQR Outlier Detection
Q1 = df["Salary"].quantile(0.25)
Q3 = df["Salary"].quantile(0.75)
IQR = Q3 - Q1
lower_fence = Q1 - 1.5 * IQR
upper_fence = Q3 + 1.5 * IQR

outliers = df[(df["Salary"] < lower_fence) | (df["Salary"] > upper_fence)]
print("Detected Salary Outliers:\\n", outliers)

# Treatment: Capping to upper fence
df["Salary_Capped"] = df["Salary"].clip(upper=upper_fence)
print("\\nCapped Salary Summary:\\n", df["Salary_Capped"].describe())`,
      },
    },
    {
      id: 'm2-qc-6',
      questionNumber: 6,
      part: 'C',
      marks: 14,
      question: 'Explain data formatting/standardization and why it matters. Write code to clean spaces, case, comma-numbers, and mixed dates, and explain why numeric-as-text columns cause problems.',
      topicTag: 'Formatting & Standardization Comprehensive',
      modelAnswer: {
        shortSummary: 'Data Formatting guarantees that structurally valid data is represented uniformly across text casing, whitespace, numerical data types, and ISO timestamps.',
        keyPoints: [
          'Why It Matters: Prevents categorical duplication in `value_counts()`, avoids silent alphabetical sorting bugs in numbers, and enables `.dt` time series accessors.',
          'Numeric-as-Text Problems: `"100"` sorts before `"85"` lexicographically; mathematical functions throw TypeErrors or concatenate strings.',
        ],
        codeSnippet: `import pandas as pd

df = pd.DataFrame({
    "City": [" Mumbai ", "mumbai", "MUMBAI", " Pune "],
    "Price": ["₹50,000", "₹75,000", "50000", "₹1,20,000"],
    "Order_Date": ["01/08/2026", "2026-08-01", "Aug 1, 2026", "01-Aug-2026"]
})

# 1. Clean whitespace and title case
df["City"] = df["City"].str.strip().str.title()

# 2. Clean currency symbols and commas -> float
df["Price"] = df["Price"].str.replace("[₹,]", "", regex=True).astype(float)

# 3. Standardize dates to datetime64
df["Order_Date"] = pd.to_datetime(df["Order_Date"])
df["Year"] = df["Order_Date"].dt.year
df["Month"] = df["Order_Date"].dt.month

print("Standardized DataFrame:\\n", df)`,
      },
    },
    {
      id: 'm2-qc-7',
      questionNumber: 7,
      part: 'C',
      marks: 14,
      question: 'Explain NumPy operations with suitable examples (Array creation, attributes, indexing, slicing, arithmetic, scalar operations, aggregation, Boolean indexing, reshape, flatten, transpose).',
      topicTag: 'NumPy Master Suite',
      modelAnswer: {
        shortSummary: 'NumPy is the foundational scientific library providing high-performance ndarray computing, memory introspection, dimensional transformations, and vectorized linear algebra.',
        codeSnippet: `import numpy as np

# 1. Creation & Attributes
arr = np.array([[10, 20, 30], [40, 50, 60]])
print(f"Shape: {arr.shape}, Dtype: {arr.dtype}, Size: {arr.size}, Ndim: {arr.ndim}")

# 2. Slicing & Indexing
sub = arr[0, 1:3]  # Row 0, cols 1-2 -> [20, 30]

# 3. Scalar & Arithmetic Operations
curved = arr + 5
doubled = arr * 2

# 4. Aggregations (Axis-wise)
col_mean = np.mean(arr, axis=0)  # [25., 35., 45.]
row_sum = np.sum(arr, axis=1)    # [60, 150]

# 5. Boolean Indexing
high_vals = arr[arr >= 40]       # [40, 50, 60]

# 6. Reshape, Flatten, Transpose
reshaped = arr.reshape(3, 2)
flat = arr.flatten()
trans = arr.T`,
      },
    },
    {
      id: 'm2-qc-8',
      questionNumber: 8,
      part: 'C',
      marks: 14,
      question: 'Explain ndim, shape, size, and dtype with a 2 × 3 example. Write code for reshape(), flatten(), and transpose, and perform an axis-wise sum on a 3 × 3 marks matrix.',
      topicTag: 'NumPy Matrix Architecture',
      modelAnswer: {
        shortSummary: 'NumPy ndarrays encapsulate dimensional geometry and metadata attributes that dictate vectorization and memory reduction behavior.',
        codeSnippet: `import numpy as np

# 2x3 Matrix Attributes
matrix_2x3 = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.int32)
print("ndim: ", matrix_2x3.ndim)   # 2
print("shape:", matrix_2x3.shape)  # (2, 3)
print("size: ", matrix_2x3.size)   # 6
print("dtype:", matrix_2x3.dtype)  # int32

# Reshape (3x2), Flatten (1D), Transpose (3x2)
print("Reshaped (3x2):\\n", matrix_2x3.reshape(3, 2))
print("Flattened (1D):\\n", matrix_2x3.flatten())
print("Transposed (3x2):\\n", matrix_2x3.T)

# 3x3 Marks Matrix Axis-Wise Reductions
marks_3x3 = np.array([
    [80, 85, 90],  # Student 0
    [70, 75, 80],  # Student 1
    [90, 95, 100]  # Student 2
])
print("Subject Sums (axis=0 - down columns):", np.sum(marks_3x3, axis=0)) # [240, 255, 270]
print("Student Sums (axis=1 - across rows): ", np.sum(marks_3x3, axis=1)) # [255, 225, 285]`,
      },
    },
    {
      id: 'm2-qc-9',
      questionNumber: 9,
      part: 'C',
      marks: 14,
      question: 'Explain Boolean indexing and why &, |, and ~ replace and/or. Filter a Pandas DataFrame using chained conditions and query(), and explain np.where() with a Pass/Fail example.',
      topicTag: 'Boolean Masking & np.where',
      modelAnswer: {
        shortSummary: 'Boolean filtering constructs elementwise True/False masks. Pandas requires bitwise operators (&, |, ~) with explicit parentheses because Python keywords (and/or) evaluate scalar truth values.',
        codeSnippet: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "Name": ["Rahul", "Priya", "Arjun", "Sneha"],
    "Marks": [85, 92, 65, 78],
    "Attendance": [90, 88, 72, 95],
    "City": ["Mumbai", "Pune", "Mumbai", "Pune"]
})

# 1. Chained Boolean Filter using bitwise &
high_performers = df[(df["Marks"] >= 80) & (df["Attendance"] > 85)]

# 2. Alternative using query()
query_result = df.query("Marks >= 80 and Attendance > 85")

# 3. np.where() Conditional Feature Creation
df["Status"] = np.where(df["Marks"] >= 75, "Pass", "Fail")
print(df[["Name", "Marks", "Attendance", "Status"]])`,
      },
    },
    {
      id: 'm2-qc-10',
      questionNumber: 10,
      part: 'C',
      marks: 14,
      question: 'Explain Pandas DataFrame operations for data analysis (Creating, selecting columns/rows with loc/iloc, filtering, multiple conditions, creating/calculated columns, sorting, renaming, query).',
      topicTag: 'DataFrame Master Suite',
      modelAnswer: {
        shortSummary: 'Pandas provides an expressive, high-performance API for creating, subsetting, transforming, and querying structured tabular datasets.',
        codeSnippet: `import pandas as pd

# 1. Create DataFrame
df = pd.DataFrame({
    "Name": ["Rahul", "Priya", "Arjun", "Sneha"],
    "Marks": [85, 91, 76, 95],
    "City": ["Mumbai", "Pune", "Mumbai", "Nashik"]
})

# 2. Selecting Columns & Rows
marks_col = df["Marks"]              # 1D Series
subset_df = df[["Name", "Marks"]]    # 2D DataFrame
row_label = df.loc[0, "Name"]        # 'Rahul' (.loc)
row_pos = df.iloc[0, 1]              # 85 (.iloc)

# 3. Creating Calculated Columns & Renaming
df["Bonus"] = df["Marks"] + 5
df.rename(columns={"City": "Location"}, inplace=True)

# 4. Multi-Condition Filter & Sort
filtered = df[(df["Marks"] > 80) & (df["Location"] != "Nashik")]
sorted_df = df.sort_values("Marks", ascending=False)

# 5. query()
queried = df.query("Marks > 80")`,
      },
    },
    {
      id: 'm2-qc-11',
      questionNumber: 11,
      part: 'C',
      marks: 14,
      question: 'Explain grouping, aggregation, merging, joins and pivot tables in Pandas (groupby, agg, named aggregation, merge, inner/left/right/outer, concat, pivot_table).',
      topicTag: 'Grouping Merging & Pivoting Suite',
      modelAnswer: {
        shortSummary: 'Relational data manipulation in Pandas empowers analysts to combine tables, summarize cohorts, and pivot dimensional summaries.',
        codeSnippet: `import pandas as pd

students = pd.DataFrame({
    "ID": [1, 2, 3],
    "Name": ["Rahul", "Priya", "Arjun"],
    "City": ["Mumbai", "Pune", "Mumbai"]
})

scores = pd.DataFrame({
    "ID": [1, 2, 4],
    "Subject": ["Math", "Math", "Science"],
    "Marks": [85, 92, 78]
})

# 1. Relational Merge (Inner, Left, Outer)
inner_merged = pd.merge(students, scores, on="ID", how="inner")
left_merged = pd.merge(students, scores, on="ID", how="left")

# 2. GroupBy & Named Aggregation
sales = pd.DataFrame({
    "Dept": ["CS", "IT", "CS", "IT"],
    "Salary": [80000, 90000, 85000, 95000]
})
summary = sales.groupby("Dept").agg(
    Avg_Salary=("Salary", "mean"),
    Staff_Count=("Salary", "count")
)

# 3. Pivot Table
pivot = scores.pivot_table(values="Marks", index="ID", columns="Subject", fill_value=0)`,
      },
    },
    {
      id: 'm2-qc-12',
      questionNumber: 12,
      part: 'C',
      marks: 14,
      question: 'Explain a complete Data Preprocessing workflow using Pandas (Load, inspect, check missing, handle missing, remove duplicates, standardize text/categories, convert numbers/dates, detect outliers, filter/transform, groupby/aggregate, validate).',
      topicTag: 'Complete End-to-End Preprocessing Pipeline',
      modelAnswer: {
        shortSummary: 'A complete real-world preprocessing pipeline cleanses, validates, and engineers raw data into an analysis-ready matrix ready for exploratory data analysis or machine learning.',
        diagramOrSteps: [
          'Step 1: Ingest & Inspect: `pd.read_csv()`, `.info()`, `.head()`, `.shape`',
          'Step 2: Deduplication: `df.drop_duplicates(subset=["StudentID"], inplace=True)`',
          'Step 3: Missing Values: `.isna().sum()`, median imputation on numericals, mode on categories',
          'Step 4: Text Standardization: `.str.strip().str.title()` on names and cities',
          'Step 5: Type Coercion: `pd.to_numeric(errors="coerce")`, `pd.to_datetime()` on timestamps',
          'Step 6: Outlier Treatment: IQR detection and Winsorization clipping on price/salary',
          'Step 7: Feature Engineering: `np.where()` for category assignment',
          'Step 8: GroupBy & Aggregation: `.groupby("City")["Marks"].mean()`',
          'Step 9: Final Validation Audit: Confirm zero nulls, correct dtypes, and expected category cardinalities',
        ],
        codeSnippet: `import pandas as pd
import numpy as np

# Load & Inspect
df = pd.DataFrame({
    "ID": [101, 102, 102, 103, 104],
    "Name": [" Rahul ", "Priya", "Priya", "Arjun", "Sneha"],
    "City": ["mumbai", "PUNE", "PUNE", "mumbai", "Nashik"],
    "Marks": ["85", "92", "92", "invalid", "95"],
    "Date": ["01/08/2026", "2026-08-01", "2026-08-01", "Aug 1, 2026", "01-Aug-2026"]
})

# 1. Deduplication
df = df.drop_duplicates()

# 2. Text standardization
df["Name"] = df["Name"].str.strip()
df["City"] = df["City"].str.strip().str.title()

# 3. Numeric conversion with NaN coercion & median imputation
df["Marks"] = pd.to_numeric(df["Marks"], errors="coerce")
df["Marks"] = df["Marks"].fillna(df["Marks"].median())

# 4. Datetime standardization
df["Date"] = pd.to_datetime(df["Date"])

# 5. Outlier Guard & Validation
df["Passed"] = np.where(df["Marks"] >= 75, "Pass", "Fail")

print("Analysis-Ready DataFrame:\\n", df)
print("\\nValidation Check (Null Count):\\n", df.isna().sum())`,
      },
    },
  ],
};
