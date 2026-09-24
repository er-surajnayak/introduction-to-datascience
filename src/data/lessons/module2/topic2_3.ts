import { LessonContent } from '@/types/lesson';

export const topic2_3: LessonContent = {
  id: 'm2-t3',
  topicNumber: '2.3',
  slug: 'data-types-and-sources',
  moduleId: 'module-2',
  title: 'Data Types & Sources',
  subtitle: 'Understanding What We Collected: Programming vs Statistical Types, Discrete vs Continuous, Nominal vs Ordinal, Structures, Reliability & Data Dictionaries',
  estimatedMinutes: 35,
  difficulty: 'Beginner',
  tags: [
    'Data Types',
    'Data Sources',
    'Discrete vs Continuous',
    'Nominal vs Ordinal',
    'Primary vs Secondary',
    'Structured Data',
    'Semi-Structured',
    'Unstructured',
    'Data Quality',
    'Data Dictionary',
    'Identifiers vs Measurements',
  ],
  objectives: [
    'Explain what a data type means and why knowing data semantics must precede cleaning and modeling.',
    'Distinguish programming data types (int, float, str, bool) from broader Data Science analytical categories (Numerical, Categorical, Boolean, Text, Datetime).',
    'Identify numerical data and understand how it quantifies magnitude, count, or continuous physical phenomena.',
    'Distinguish between discrete (countable) and continuous (infinitely divisible interval) numerical data, recognizing dataset measurement constraints.',
    'Identify categorical data as group memberships or labels and differentiate nominal (unordered) from ordinal (ordered) categories.',
    'Recognize that ordinal categories possess sequence but lack uniform, measurable mathematical distance.',
    'Identify boolean data as binary logical indicators and evaluate its importance in conditional filtering and masks.',
    'Explain text data as high-dimensional, unstructured language carrying rich analytical potential for NLP and feature extraction.',
    'Recognize datetime data as temporal timestamps and understand its crucial role in time-series ordering and trend analysis.',
    'Define data sources and distinguish between primary data (first-hand custom collection) and secondary data (repurposed external archives).',
    'Categorize real-world data sources into Online feeds (APIs, Web Scrapes), Physical captures (Sensors, Surveys, Experiments), and Internal Systems (Databases, Logs).',
    'Differentiate between structured tabular data, semi-structured key-value trees (JSON, XML), and unstructured media (text, images, audio).',
    'Understand that numeric storage formats (e.g. integer encoding) do not automatically make a column a numerical measurement.',
    'Distinguish unique identifiers (keys/labels) from true measurements to avoid erroneous arithmetic operations like averaging IDs.',
    'Evaluate source reliability, sampling bias, collection methodology, freshness, completeness, and documentation before trusting external data.',
    'Construct and interpret a Data Dictionary to establish shared semantic definitions for every feature in a dataset.',
    'Choose optimal, complementary data sources based on the specific analytical or business question being asked.',
    'Synthesize multi-column real-world datasets across heterogeneous data types into a coherent analytical plan.',
    'Establish the foundational prerequisite knowledge needed for downstream Missing Data Imputation (Topic 2.4).',
  ],
  hook: {
    title: 'We Collected Data. Now, What Did We Actually Ingest?',
    story:
      'In Topic 2.1, you configured REST APIs to stream live JSON payloads across the network. In Topic 2.2, you scraped raw HTML tables from the web using BeautifulSoup. Millions of bytes landed in your computer. But if you stare at a raw spreadsheet or JSON file containing numbers like 101, strings like "Gold", timestamps like "2026-09-16 14:30", and text reviews like "Fast delivery!", a critical question emerges: What do these values actually mean? Is 101 a student\'s test score, a room number, or a database primary key? Can you calculate the average of room numbers? What happens if your code treats a ZIP code as an integer and subtracts them? Before you can clean dirty rows, impute missing numbers, or train machine learning algorithms, you must master the fundamental mental model: Data is not just code memory—it is a representation of the real world.',
    analogy:
      'Think of collected data like ingredients delivered to a master chef\'s kitchen. Some ingredients are liquids (measured in milliliters), some are countable solids (3 eggs), some are flavor categories (sweet, savory, spicy), and some are expiration dates stamped on the crate. You cannot treat eggs like milk, nor can you measure garlic with a thermometer. If a chef pours salt into a bowl assuming it is powdered sugar simply because both are white crystals, the entire dish is ruined. Similarly, if a data scientist calculates the statistical mean of customer phone numbers or treats survey ratings like continuous physics measurements, all downstream analysis produces meaningless gibberish.',
    realWorldImpact:
      'In 1999, the $125 million NASA Mars Climate Orbiter disintegrated in the Martian atmosphere because one engineering team produced acceleration data in Imperial units (pound-force seconds) while the trajectory software expected Metric units (Newton-seconds). In healthcare analytics, treating patient ICD-10 diagnostic codes (like 401.9) as floating-point numbers rather than categorical identifiers causes catastrophic data corruption. Understanding data types and sources is the bedrock of reliable engineering.',
  },
  coreConcept: {
    headline: 'The Unbroken Diagnostic Chain: From Real-World Origin to Preprocessing Readiness',
    explanation:
      'A dataset is not merely an array of bytes in RAM. It is a structured artifact born from a specific physical or digital source, carrying semantic meaning, adhering to analytical data types, and possessing variable levels of quality and structure. Mastery in Data Science requires systematically diagnosing every column across seven progressive stages.',
    keyPillars: [
      {
        title: '1. Source & Meaning Over Storage Format',
        description:
          'How a variable is stored in computer memory (e.g., int64 or string) is only the technical surface. What matters analytically is what the variable represents: an identifier, a physical quantity, an ordered rating, or a timestamp.',
      },
      {
        title: '2. Numerical vs Categorical Taxonomy',
        description:
          'Numerical data quantifies (discrete counts or continuous measurements). Categorical data groups (nominal labels without order, or ordinal labels with structured rank).',
      },
      {
        title: '3. Data Hierarchy & Structure Degrees',
        description:
          'Data exists along a structural spectrum: Structured (rigid tabular schemas), Semi-Structured (flexible hierarchical JSON/XML trees), and Unstructured (free text, imagery, audio feeds).',
      },
      {
        title: '4. The Data Dictionary & Quality Filter',
        description:
          'Before cleaning or computing statistics, every analytical workflow requires a Data Dictionary documenting column definitions, types, permitted ranges, and source provenance.',
      },
    ],
  },
  interactiveType: 'datatype-lab',
  technicalExplanation: {
    title: 'The Taxonomy of Data: Types, Structures, Sources & Diagnostic Principles',
    deepDive:
      'The foundational mental model of modern data collection follows an unbroken diagnostic chain:\n\nDATA SOURCE → PHYSICAL / DIGITAL PHENOMENON → MEANING → DATA SCIENCE TYPE → STRUCTURAL SCHEMA → DATA QUALITY → PREPROCESSING (CLEANING) → MODELING\n\n1. What is a Data Type?\nA data type describes what kind of value a piece of data represents, what mathematical and logical operations are valid for it, and how it should be interpreted analytically. In Python, types like `int`, `float`, `str`, and `bool` dictate memory allocation and language operators. In Data Science, we look beyond the binary storage format to classify data by its statistical role: Numerical (Discrete & Continuous), Categorical (Nominal & Ordinal), Boolean, Text, and Datetime.\n\n2. Programming Types vs Data Science Types:\nA programming type answers: "How is this stored in memory and what code methods apply?" A Data Science type answers: "What does this represent in reality and what statistical math makes sense?"\n• Example 1: `user_id = 90210`. In Python: `int`. In Data Science: `Categorical Identifier`. Calculating `user_id.mean()` is mathematical nonsense.\n• Example 2: `feedback = "Excellent"`. In Python: `str`. In Data Science: `Ordinal Categorical`. "Excellent" > "Good" > "Poor", but `"Excellent" - "Good"` has no numerical distance.\n• Example 3: `status = True`. In Python: `bool`. In Data Science: `Binary Categorical Indicator`.\n\n3. Numerical Data: Discrete vs. Continuous:\nNumerical data represents measurable or countable quantities where arithmetic operations (addition, averaging, variance) are meaningful.\n• Discrete Numerical Data: Values that result from counting distinct, indivisible units. They take separate, isolated points on the number line (typically whole integers). Examples: Number of students in a class (42, not 42.7), number of website clicks, daily hospital admissions.\n• Continuous Numerical Data: Values that result from measuring physical phenomena along a continuous continuum. Between any two values, an infinite number of intermediate fractional values theoretically exist, limited only by measurement precision. Examples: Temperature (28.63°C), human height (172.5 cm), transaction latency (4.21 ms).\n• Nuance Note: How a variable is recorded in a dataset can differ from its underlying physical nature. For example, exam marks out of 100 might be recorded as discrete whole numbers (85, 86) in a database, even though knowledge and performance are conceptually continuous.\n\n4. Categorical Data: Nominal vs. Ordinal:\nCategorical data describes qualities, characteristics, or group memberships.\n• Nominal Data: Categories with no inherent, natural, or mathematical order. Any rearrangement of categories is equally valid. Examples: City (Mumbai, Delhi, Bengaluru), Blood Group (A+, B-, O+), Academic Department (CSE, ECE, ME). Arithmetic like "Delhi > Mumbai" is meaningless.\n• Ordinal Data: Categories that possess a clear, meaningful natural rank or sequence, but the distance between consecutive levels is not quantitatively uniform or mathematically defined. Examples: Customer satisfaction (Poor, Fair, Good, Excellent), Education Level (High School, Bachelor\'s, Master\'s, PhD), T-shirt size (S, M, L, XL). While we know Excellent > Good, we cannot say the improvement from Fair to Good equals the improvement from Good to Excellent.\n\n5. Boolean, Text, and Datetime:\n• Boolean Data: Binary flags holding exactly two logical states: `True` or `False` (or 1/0, Yes/No). Used for filtering masks, churn indicators, and event occurrences.\n• Text Data: Free-form human language strings (reviews, descriptions, tweets, logs). While stored as strings, text contains rich semantic syntax requiring tokenization, TF-IDF vectorization, or embedding models for machine learning.\n• Datetime Data: Temporal coordinates (dates, times, timestamps: e.g. `2026-09-16 14:32:00 UTC`). Datetime enables time-series decomposition, lag calculations, trend analysis, and event sequencing.\n\n6. Data Sources: Primary vs. Secondary:\n• Primary Data: First-hand data collected directly by the researcher or organization for a specific, bespoke purpose. Examples: Custom customer surveys, dedicated laboratory sensor experiments, A/B test telemetry. High control over methodology and accuracy, but expensive and time-consuming.\n• Secondary Data: Pre-existing data collected by an external party for another purpose and repurposed for your analysis. Examples: Government census archives (data.gov), published academic benchmarks, third-party industry reports, historical scraped feeds. Fast and cost-effective, but requires rigorous verification of methodology and freshness.\n\n7. Data Structures: Structured, Semi-Structured & Unstructured:\n• Structured Data: Highly organized data conforming to a rigid tabular schema with fixed columns, standardized data types, and row-column relational models (SQL tables, CSV spreadsheets).\n• Semi-Structured Data: Data with organizational hierarchy and self-describing tags or key-value pairs, but without a fixed rigid tabular schema (JSON objects, XML documents, NoSQL collections).\n• Unstructured Data: Data that does not conform to a predefined data model or row-column grid (images, video streams, audio recordings, raw PDF documents). Unstructured does NOT mean "no information"—it means specialized algorithms (e.g. computer vision, NLP) are needed to extract structured feature matrices.\n\n8. The Data Dictionary:\nA data dictionary is a centralized, formal documentation repository that defines the metadata for every column in a dataset: Column Name, Business Meaning, Analytical Data Type, Storage Format, Permitted Value Ranges, Nullability, and Sample Values. Building a data dictionary is the first mandatory task in professional Data Science before performing any data cleaning.',
    bulletPoints: [
      'Data semantics matter more than storage format: a column of numbers can represent an identifier, an ordinal rank, a discrete count, or a continuous measurement.',
      'Programming types (`int`, `float`, `str`) specify code memory; Data Science types (`Numerical`, `Categorical`, `Datetime`) define statistical interpretation.',
      'Discrete data comes from counting (whole units); Continuous data comes from measurement (infinitely divisible intervals).',
      'Nominal categories have no order (City, Gender); Ordinal categories have meaningful sequence without uniform metric distance (Poor, Fair, Good).',
      'Identifiers (e.g. `customer_id`, `pin_code`) must never be subjected to arithmetic operations like averages or standard deviations.',
      'Primary data is collected first-hand for your specific objective; Secondary data is repurposed from third-party sources.',
      'Data structures span a spectrum: Structured (tabular CSV/SQL), Semi-Structured (JSON/XML), and Unstructured (text, audio, images).',
      'Never blindly trust public or scraped data: always evaluate source credibility, sampling bias, completeness, freshness, and documentation.',
      'A Data Dictionary explicitly documents column names, descriptions, analytical types, constraints, and valid ranges before data cleaning begins.',
      'Understanding what data represents is the essential prerequisite before handling missing values in Topic 2.4.',
    ],
  },
  codeExamples: [
    {
      title: '1. Diagnosing Python Types vs Data Science Semantics',
      description: 'Demonstrating how identical Python storage types represent completely different analytical categories.',
      language: 'python',
      code: `import pandas as pd

# Creating a raw student record dataframe
df = pd.DataFrame({
    "student_id": [101, 102, 103],          # int64 in Python -> Identifier in DS
    "age": [20, 21, 22],                    # int64 in Python -> Discrete Numerical in DS
    "cgpa": [8.45, 9.12, 7.80],             # float64 in Python -> Continuous Numerical in DS
    "grade": ["B", "A", "C"],               # object in Python -> Ordinal Categorical in DS
    "department": ["CSE", "ECE", "ME"],     # object in Python -> Nominal Categorical in DS
    "is_enrolled": [True, True, False],     # bool in Python -> Boolean Flag in DS
    "registered_on": ["2026-08-01", "2026-08-02", "2026-08-03"] # str -> Datetime in DS
})

print("--- Python Internal Dtypes ---")
print(df.dtypes)

# Proper conversion to analytical Data Science types in Pandas
df["registered_on"] = pd.to_datetime(df["registered_on"])
df["grade"] = pd.Categorical(df["grade"], categories=["C", "B", "A"], ordered=True)
df["department"] = df["department"].astype("category")

print("\n--- Summary Statistics (Notice how IDs shouldn't be averaged!) ---")
print(df[["age", "cgpa"]].describe())`,
      lineExplanations: [
        { line: 5, text: 'student_id is stored as int64, but represents a unique identifier, not a measurable quantity.' },
        { line: 6, text: 'age is a discrete numerical variable representing integer counts of completed years.' },
        { line: 7, text: 'cgpa is a continuous numerical measurement rounded to two decimal places.' },
        { line: 8, text: 'grade represents an ordered categorical rating where A > B > C.' },
        { line: 9, text: 'department is a nominal categorical variable with no natural mathematical sequence.' },
        { line: 18, text: 'pd.to_datetime() transforms raw text strings into true temporal datetime objects.' },
        { line: 19, text: 'pd.Categorical with ordered=True explicitly encodes ordinal sequence for statistical models.' },
      ],
      output: `--- Python Internal Dtypes ---
student_id        int64
age               int64
cgpa            float64
grade            object
department       object
is_enrolled        bool
registered_on    object
dtype: object

--- Summary Statistics (Notice how IDs shouldn't be averaged!) ---
             age      cgpa
count   3.000000  3.000000
mean   21.000000  8.456667
std     1.000000  0.660328
min    20.000000  7.800000
50%    21.000000  8.450000
max    22.000000  9.120000`,
    },
    {
      title: '2. The Danger of String vs Numeric Representation',
      description: 'Why data formatting and type coercion errors cause silent computational bugs.',
      language: 'python',
      code: `# Raw input from an uncleaned web scrape or user form
val_num = 21
val_str = "21"
price_str = "₹45,000"

# Demonstration of string concatenation vs arithmetic addition
print(f"Numeric Addition: {val_num} + 5 = {val_num + 5}")
print(f"String Concatenation: '{val_str}' + '5' = '{val_str + '5'}' (BUG!)")

# Cleaning formatted currency strings into numerical floats
clean_price = float(price_str.replace("₹", "").replace(",", ""))
print(f"\nOriginal: {price_str} -> Clean Numerical: {clean_price} (Type: {type(clean_price).__name__})")
print(f"Discounted 10%: ₹{clean_price * 0.90:,.2f}")`,
      lineExplanations: [
        { line: 7, text: 'Mathematical addition on numeric integers produces 26.' },
        { line: 8, text: 'String addition concatenates text characters to produce "215"—a dangerous silent bug!' },
        { line: 11, text: 'String parsing strips currency symbols and commas before converting to a float.' },
        { line: 13, text: 'Once converted to a true numerical type, arithmetic calculations function properly.' },
      ],
      output: `Numeric Addition: 21 + 5 = 26
String Concatenation: '21' + '5' = '215' (BUG!)

Original: ₹45,000 -> Clean Numerical: 45000.0 (Type: float)
Discounted 10%: ₹40,500.00`,
    },
    {
      title: '3. Building and Documenting a Formal Data Dictionary',
      description: 'Programmatically constructing a metadata dictionary dataframe to document dataset semantics.',
      language: 'python',
      code: `import pandas as pd

# Define the formal Data Dictionary schema
data_dictionary = pd.DataFrame([
    {
        "Column": "order_id",
        "Business_Meaning": "Unique identifier for each placed transaction",
        "DS_Type": "Identifier",
        "Storage_Type": "int64",
        "Allowed_Range": "Positive integer > 0",
        "Nullable": False,
        "Example": 10482
    },
    {
        "Column": "city",
        "Business_Meaning": "Metro city where order was delivered",
        "DS_Type": "Categorical (Nominal)",
        "Storage_Type": "string / category",
        "Allowed_Range": "['Pune', 'Mumbai', 'Bengaluru', 'Delhi']",
        "Nullable": False,
        "Example": "Pune"
    },
    {
        "Column": "order_amount",
        "Business_Meaning": "Final invoice total charged in INR",
        "DS_Type": "Numerical (Continuous)",
        "Storage_Type": "float64",
        "Allowed_Range": ">= 0.00",
        "Nullable": False,
        "Example": 450.50
    },
    {
        "Column": "rating",
        "Business_Meaning": "Customer satisfaction score on 1 to 5 scale",
        "DS_Type": "Numerical / Ordinal",
        "Storage_Type": "float32",
        "Allowed_Range": "1.0 to 5.0",
        "Nullable": True,
        "Example": 4.5
    },
    {
        "Column": "order_time",
        "Business_Meaning": "UTC timestamp when order was confirmed",
        "DS_Type": "Datetime",
        "Storage_Type": "datetime64[ns]",
        "Allowed_Range": "Valid historical timestamp",
        "Nullable": False,
        "Example": "2026-09-15 14:32:00"
    }
])

print("--- Dataset Metadata Dictionary ---")
print(data_dictionary[["Column", "DS_Type", "Storage_Type", "Example"]])`,
      lineExplanations: [
        { line: 4, text: 'Defines order_id as an Identifier, preventing downstream math operations.' },
        { line: 13, text: 'Documents city as a Nominal Category with a finite set of allowed values.' },
        { line: 22, text: 'Explicitly specifies order_amount as Continuous Numerical in INR.' },
        { line: 31, text: 'Notes that rating is nullable (can contain missing values when users skip reviews).' },
        { line: 40, text: 'Specifies order_time as a temporal datetime coordinate with timestamp validation.' },
      ],
      output: `--- Dataset Metadata Dictionary ---
         Column                  DS_Type        Storage_Type              Example
0      order_id               Identifier               int64                10482
1          city     Categorical (Nominal)  string / category                 Pune
2  order_amount   Numerical (Continuous)             float64                450.5
3        rating      Numerical / Ordinal             float32                  4.5
4    order_time                 Datetime      datetime64[ns]  2026-09-15 14:32:00`,
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming every number in a dataset is a numerical measurement.',
      why: 'Values like student IDs, ZIP codes, phone numbers, and flight numbers are encoded as numbers in CSV files, leading beginners to compute averages or standard deviations on them.',
      correction: 'Check what the number represents. If adding two values or calculating their mean is conceptually meaningless, classify the column as an Identifier or Categorical code.',
      wrongCode: `# student_id = [101, 102, 103, 104]
avg_id = df['student_id'].mean() # Result 102.5 is meaningless!`,
      correctCode: `# Keep identifiers as discrete labels or string keys
df['student_id'] = df['student_id'].astype(str)`,
    },
    {
      mistake: 'Treating all categorical data as simple text strings.',
      why: 'Categorical variables can be stored as numbers (e.g. 1 for Low, 2 for Medium, 3 for High) or text, but failing to specify whether they are Nominal or Ordinal causes machine learning algorithms to misinterpret their structure.',
      correction: 'Distinguish between unordered categories (Nominal) and ranked levels (Ordinal), and encode them explicitly using Pandas Categorical types.',
      wrongCode: `# Treating satisfaction ratings as plain un-ordered strings
df['satisfaction'] = ['Low', 'High', 'Medium']`,
      correctCode: `# Explicitly encode the natural rank order
df['satisfaction'] = pd.Categorical(
    df['satisfaction'],
    categories=['Low', 'Medium', 'High'],
    ordered=True
)`,
    },
    {
      mistake: 'Assuming ordinal categories have equal numerical spacing.',
      why: 'Because ratings like Poor (1), Fair (2), Good (3), and Excellent (4) are numbered 1 to 4, beginners assume the difference between Poor and Fair is identical to the difference between Good and Excellent.',
      correction: 'Remember that ordinal data gives order, not metric distance. Do not perform standard interval arithmetic without validating whether an interval scale is justified.',
    },
    {
      mistake: 'Believing "unstructured data" means the file contains zero information or structure.',
      why: 'Students confuse "lacks a predefined row-column tabular schema" with "total chaos or unusable noise".',
      correction: 'Unstructured data (like video, images, or audio) possesses deep internal physical structure (pixel matrices, waveforms), but requires specialized feature extraction models to convert into tabular representations.',
    },
    {
      mistake: 'Assuming all public or government datasets are inherently 100% reliable.',
      why: 'Open data can still suffer from severe sampling bias, outdated records, missing values, inconsistent collection protocols, and lack of metadata documentation.',
      correction: 'Always audit source credibility, collection methodology, date of publication, sample size, and missing rate before drawing conclusions.',
    },
    {
      mistake: 'Believing primary data is always superior to secondary data in all scenarios.',
      why: 'While primary data gives direct control over measurement design, it is frequently constrained by small sample sizes, high cost, and lengthy collection times compared to robust national secondary repositories.',
      correction: 'Choose primary data when your question is novel and specific; leverage high-quality secondary data when comprehensive historical scale is required.',
    },
    {
      mistake: 'Confusing string representations of numbers with actual numeric data.',
      why: 'Values scraped from web pages often retain currency symbols, commas, or whitespace (e.g. "₹1,250.00"), which Python stores as `object`/`string`.',
      correction: 'Clean and strip formatting artifacts using string functions before converting with `float()` or `pd.to_numeric()`.',
      wrongCode: `total = "₹1,250" + "₹500" # Yields "₹1,250₹500"`,
      correctCode: `total = float("₹1,250".replace("₹","").replace(",","")) + 500 # Yields 1750.0`,
    },
    {
      mistake: 'Skipping the creation of a Data Dictionary before beginning data cleaning.',
      why: 'Without a data dictionary, team members make conflicting assumptions about column definitions, units of measurement, and missing value indicators.',
      correction: 'Always document column names, business definitions, analytical data types, permitted values, and nullability upfront.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'Is this value a measurement, a count, a category, or an identifier?',
      context: 'When inspecting a new column in an unfamiliar CSV or JSON response.',
      reasoning: 'Ask: "If I add 5 to this value or take the average of two rows, does the result represent a sensible real-world quantity?" If yes, it is Numerical. If it describes which group something belongs to, it is Categorical. If it merely distinguishes entities, it is an Identifier.',
      ruleOfThumb: 'If averaging the column produces a meaningful number, it is a measurement; if averaging produces nonsense, it is an identifier or categorical code.',
    },
    {
      question: 'Is this numerical variable countable or measurable along a continuous continuum?',
      context: 'When determining whether a numerical column is Discrete or Continuous.',
      reasoning: 'Countable items (orders, children, bugs) jump by discrete integers. Measured physical quantities (weight, time, voltage) can take any fractional value within an interval.',
      ruleOfThumb: 'Can this value realistically take a fractional midpoint like 3.14159? If yes, Continuous; if it only steps in whole increments, Discrete.',
    },
    {
      question: 'Does the sequence of these categories have a natural, undeniable ranking?',
      context: 'When classifying categorical features into Nominal vs. Ordinal.',
      reasoning: 'Compare two category values. Is one universally higher, larger, or better than the other in a defined sequence? (e.g. Master\'s > Bachelor\'s). If yes, Ordinal. If neither is higher (e.g. Mumbai vs. Delhi), Nominal.',
      ruleOfThumb: 'If "Option A > Option B" is universally meaningful, it is Ordinal; if the order is arbitrary, it is Nominal.',
    },
    {
      question: 'Where did this data originate, and what biases could the source have introduced?',
      context: 'When evaluating whether a dataset is suitable for training a model or making decisions.',
      reasoning: 'A survey of college students on social media represents young internet users, not the general population. Sensor data in summer does not represent winter temperatures.',
      ruleOfThumb: 'Data is only as good as its collection process: always trace the path from physical reality to digital storage.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'Which of the following best explains why `customer_id = 94820` should NOT be treated as a numerical measurement in Data Science?',
      options: [
        'Because Python does not support arithmetic on integers larger than 10,000.',
        'Because customer_id is a unique label/identifier whose mathematical average has no real-world meaning.',
        'Because customer_id cannot be stored in a Pandas DataFrame.',
        'Because identifiers are automatically converted to float32 by modern databases.',
      ],
      correctIndex: 1,
      explanation:
        'Although stored as an integer, customer_id is an Identifier. Mathematical operations like taking the mean of customer IDs produce meaningless numbers.',
    },
    {
      id: 'q2',
      question: 'Which pair of variables correctly identifies one Discrete and one Continuous numerical variable?',
      options: [
        'Number of hospital beds (Discrete) and Patient temperature in °C (Continuous)',
        'Human height in cm (Discrete) and Number of website visits (Continuous)',
        'City name (Discrete) and Customer satisfaction rating (Continuous)',
        'Exam date (Discrete) and Bank account balance (Continuous)',
      ],
      correctIndex: 0,
      explanation:
        'Hospital beds are counted in whole integers (Discrete), while patient temperature can take any fractional degree on a continuous scale (Continuous).',
    },
    {
      id: 'q3',
      question: 'What is the fundamental difference between Nominal and Ordinal categorical data?',
      options: [
        'Nominal data can only be stored as integers, while Ordinal data must be stored as text.',
        'Ordinal categories have a meaningful natural rank/order, whereas Nominal categories have no intrinsic order.',
        'Nominal categories have exact numerical distances between them, while Ordinal categories do not.',
        'Ordinal data is always continuous, while Nominal data is discrete.',
      ],
      correctIndex: 1,
      explanation:
        'Ordinal data possesses a natural rank (e.g. Poor, Fair, Good, Excellent), whereas Nominal data represents unordered labels (e.g. Mumbai, Delhi, Bengaluru).',
    },
    {
      id: 'q4',
      question: 'A data science team gathers customer feedback reviews: "The delivery arrived in 15 minutes, food was hot and delicious!". How should this data be classified structurally?',
      options: [
        'Structured tabular data',
        'Semi-structured JSON schema',
        'Unstructured text data',
        'Relational foreign key',
      ],
      correctIndex: 2,
      explanation:
        'Free-form customer reviews are Unstructured Text. They convey rich linguistic meaning but do not conform to a predefined row-column tabular grid.',
    },
    {
      id: 'q5',
      question: 'In Python, what is the output of executing `"21" + "5"` versus `21 + 5`?',
      options: [
        '"215" (string concatenation) versus 26 (arithmetic addition)',
        '26 versus 26 (Python automatically converts strings to numbers)',
        'TypeError versus 26',
        '"26" versus 26',
      ],
      correctIndex: 0,
      explanation:
        'When values are strings, the `+` operator concatenates them into `"215"`. When values are numeric integers, `+` performs arithmetic addition yielding `26`.',
    },
    {
      id: 'q6',
      question: 'Which of the following is an example of Secondary Data collection?',
      options: [
        'Conducting direct in-person interviews with 50 students on campus.',
        'Installing temperature sensors in your college laboratory to log heat readings.',
        'Downloading a historical census dataset published by the national government portal.',
        'Running a custom A/B test on your personal e-commerce website.',
      ],
      correctIndex: 2,
      explanation:
        'Downloading a pre-existing dataset collected by a government agency is Secondary Data because it was gathered by someone else and repurposed for your study.',
    },
    {
      id: 'q7',
      question: 'What is the primary purpose of creating a formal Data Dictionary before starting data analysis?',
      options: [
        'To speed up CPU clock cycles during matrix vectorization.',
        'To document column names, business meanings, analytical data types, permitted ranges, and nullability for unambiguous interpretation.',
        'To automatically delete all rows that contain string characters.',
        'To convert all unstructured images into SQL databases.',
      ],
      correctIndex: 1,
      explanation:
        'A Data Dictionary acts as the single source of truth documenting what every variable represents, its valid ranges, and its statistical type.',
    },
    {
      id: 'q8',
      question: 'Why does "unstructured data" NOT mean "data with no information"?',
      options: [
        'Because unstructured data always contains hidden CSV tables inside it.',
        'Because unstructured media (audio, text, video) contains rich information, but lacks a predefined rigid tabular schema.',
        'Because all unstructured files are converted to integers by the operating system.',
        'Because unstructured data is only used in quantum computers.',
      ],
      correctIndex: 1,
      explanation:
        'Unstructured data (such as photos, speech, and medical notes) is packed with valuable information, but does not fit into standard rows and columns without specialized extraction.',
    },
    {
      id: 'q9',
      question: 'You want to study why college cafeteria lines are long at 1:00 PM. Which source combination provides the most comprehensive insight?',
      options: [
        'Only reading online YouTube comments about cooking recipes.',
        'Combining cafeteria POS transaction logs (timestamps/order volumes) with student satisfaction surveys (opinions on peak-hour delays).',
        'Relying solely on a global satellite weather map.',
        'Guessing based on your personal cafeteria visits last semester.',
      ],
      correctIndex: 1,
      explanation:
        'Combining internal system transaction logs (quantitative objective telemetry) with student surveys (qualitative primary feedback) delivers multi-dimensional insights.',
    },
    {
      id: 'q10',
      question: 'Now that we know what each column in our dataset represents, what is the immediate next logical challenge in the data preparation lifecycle?',
      options: [
        'Immediately train a deep neural network on uncleaned data.',
        'Diagnose and treat Missing Data (Topic 2.4) where values were lost, omitted, or unrecorded during collection.',
        'Delete all categorical columns from the dataset.',
        'Rename every column to numbers 1 through 10.',
      ],
      correctIndex: 1,
      explanation:
        'Once column meanings and data types are diagnosed, the immediate next step is handling missing, corrupted, or null values (Topic 2.4 Missing Data Imputation).',
    },
  ],
  summary: {
    takeaways: [
      'Data semantics dictate analytical operations: storage types (`int`, `str`) represent low-level memory, while Data Science types define statistical validity.',
      'Numerical data divides into Discrete (countable integers) and Continuous (measurable physical intervals).',
      'Categorical data divides into Nominal (unordered labels) and Ordinal (ranked sequence without uniform metric distance).',
      'Identifiers (`order_id`, `pin_code`) must be protected from arithmetic operations such as averages or standard deviations.',
      'Data sources encompass Online feeds, Physical sensors/surveys, and Internal enterprise databases, spanning Primary and Secondary collection.',
      'Data structures exist along a continuum: Structured (tables), Semi-Structured (JSON/XML), and Unstructured (text, audio, images).',
      'A formal Data Dictionary is the mandatory blueprint documenting column meanings, types, constraints, and valid ranges before cleaning.',
      'Understanding what data represents prepares us directly for diagnosing and imputing missing values in Topic 2.4.',
    ],
    nextUpText: '2.4 Missing Data Imputation — Diagnosing why values go missing (MCAR, MAR, MNAR) and implementing robust statistical imputation strategies.',
  },
  prevTopic: {
    slug: 'web-scraping-and-parsing',
    title: '2.2 Web Scraping & Parsing',
  },
  nextTopic: {
    slug: 'missing-data-imputation',
    title: '2.4 Missing Data Imputation',
  },
};
