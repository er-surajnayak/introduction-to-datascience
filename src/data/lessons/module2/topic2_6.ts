import { LessonContent } from '@/types/lesson';

export const topic2_6: LessonContent = {
  id: 'm2-t6',
  topicNumber: '2.6',
  slug: 'data-formatting-and-normalization',
  moduleId: 'module-2',
  title: 'Data Formatting & Normalization',
  subtitle: 'Standardizing Inconsistent Representations: String Trimming & Casing, Categorical Mappings, Numeric Text Coercion, Currency Stripping, Datetime Parsing, and Min-Max Feature Scaling',
  estimatedMinutes: 30,
  difficulty: 'Intermediate',
  tags: [
    'Data Formatting',
    'Normalization',
    'String Standardization',
    'str.strip() / str.title()',
    'Category Mapping',
    'to_numeric() / coerce',
    'Currency Cleaning',
    'to_datetime()',
    'Date Ambiguity',
    'Boolean Standardization',
    'Min-Max Normalization',
    'Validation Audits',
  ],
  objectives: [
    'Understand that data can be completely valid in real life yet represented inconsistently across records.',
    'Differentiate between Data Cleaning (error removal), Data Formatting (consistency), and Normalization (scale transformation).',
    'Diagnose and fix whitespace traps (leading, trailing, inner double spaces) using .str.strip().',
    'Standardize string capitalization using .str.lower(), .str.upper(), and .str.title().',
    'Implement explicit categorical mappings using dictionary mapping to consolidate duplicate representations (e.g. "M", "male", "MALE" → "Male").',
    'Identify numeric values stored as text strings and safely convert them using pd.to_numeric(..., errors="coerce").',
    'Understand how converting corrupted numeric strings can intentionally create NaNs, connecting back to Topic 2.4 Missing Data.',
    'Clean currency strings by stripping currency symbols (₹, $, €) and thousands commas while distinguishing stored analytical values from UI display formats.',
    'Parse heterogeneous date formats into unified datetime objects using pd.to_datetime() and extract temporal components via .dt accessors.',
    'Recognize and resolve the Date Ambiguity Trap (e.g. 01/02/2026: Feb 1 vs Jan 2) by checking source locale and metadata.',
    'Standardize boolean values across diverse representations (Yes/No, Y/N, 1/0, True/False).',
    'Distinguish between formatting changes that improve analysis vs destructive changes that erase critical information (e.g. preserving leading zeros in Student ID "00123").',
    'Understand the conceptual purpose of Min-Max Normalization (x\' = (x - xmin) / (xmax - xmin)) to bound features between 0 and 1.',
    'Apply the 7-step Data Formatting Pipeline: Inspect ➔ Identify ➔ Standardize ➔ Transform ➔ Coerce ➔ Validate ➔ Ready.',
    'Perform post-formatting validation audits (checking dtypes, unique values, value_counts, null counts).',
    'Prepare for downstream NumPy and Pandas Operations in Topic 2.7.',
  ],
  hook: {
    title: 'The Same City, Four Different Languages for Pandas',
    story:
      'Imagine you are analyzing customer orders for an ecommerce brand in India. In the City column, you see four entries: " Mumbai", "mumbai ", "MUMBAI", and " Mumbai ". To any human being, these four rows obviously refer to the exact same metropolis of Mumbai. But when you run df["city"].value_counts() in Python, Pandas reports that your company has four completely distinct cities with one customer each! Your marketing charts splinter into tiny meaningless fragments, your delivery logistics routing fails, and your regional revenue aggregates are broken. In Topic 2.4, you fixed missing data. In Topic 2.5, you investigated extreme outliers. Now we confront the third great data quality challenge: data that is 100% present and valid—but serialized in chaotic, conflicting representations.',
    analogy:
      'Think of data formatting like an international postal sorting facility. If three letters arrive addressed as "Bombay, IND", "Mumbai, Maharashtra, 400001", and "BOM, India", a human postal worker knows they all go to the same hub. But high-speed automated robotic sorting conveyor belts require an exact, standardized postal code format. If the format deviates by a single space or abbreviation, the automated machine shunts the parcel into the rejection bin. Data formatting creates that uniform conveyor belt for analytical algorithms.',
    realWorldImpact:
      'In airline ticket reservation systems, mixing date formats (DD/MM/YYYY vs MM/DD/YYYY) caused transatlantic passengers to arrive on the wrong month, costing millions in hotel vouchers. In banking, storing account numbers with stripped leading zeros caused wire transfers to route to incorrect accounts. Consistent, validated formatting is the bedrock of trustworthy automated software.',
  },
  coreConcept: {
    headline: 'The Formatting & Normalization Life Cycle: Inspect First, Standardize Second, Validate Third',
    explanation:
      'Formatting is the disciplined process of converting diverse, messy textual representations into uniform, computationally sound data types. It bridges the gap between how humans record data and how analytical algorithms compute mathematical answers.',
    keyPillars: [
      {
        title: '1. Text & Whitespace Hygiene',
        description:
          'Eliminate leading/trailing whitespace with .str.strip() and harmonize letter casing (.str.lower(), .str.title()) to prevent splintered categorical classes.',
      },
      {
        title: '2. Categorical & Boolean Mapping',
        description:
          'Apply explicit domain dictionaries (df[col].map({...})) to merge synonyms, acronyms, and binary indicators into canonical vocabulary.',
      },
      {
        title: '3. Type Coercion & Datetime Parsing',
        description:
          'Convert numeric text and currency strings using pd.to_numeric(errors="coerce"), and parse temporal strings into unified pd.to_datetime objects.',
      },
      {
        title: '4. Scale Normalization & Validation',
        description:
          'Apply Min-Max scaling to bound continuous features into [0, 1] intervals, and rigorously validate dtypes and unique value counts post-cleaning.',
      },
    ],
  },
  interactiveType: 'formatting-lab',
  technicalExplanation: {
    title: 'The Principles, Mechanics, and Validation of Data Formatting and Scaling',
    deepDive:
      'The foundational mental model of data formatting follows an unbroken diagnostic workflow:\n\nRAW DATA → INSPECT UNIQUE VALUES & DTYPES → IDENTIFY REPRESENTATION MISMATCHES → DEFINE CANONICAL STANDARD → EXECUTE CONTROLLED TRANSFORMATION → COERCE & ISOLATE INVALID ENTRIES → POST-TRANSFORMATION VALIDATION → ANALYSIS-READY DATA\n\n1. What is Data Formatting vs Data Cleaning vs Normalization?\n• Data Cleaning: The overarching process of repairing data defects (handling missing values, auditing outliers, eliminating duplicate rows, and fixing corruptions).\n• Data Formatting: Standardizing the visual representation and storage type of data so identical concepts share identical tokens (e.g. `"mumbai"` → `"Mumbai"`, `"₹50,000"` → `50000.0`, `"01/08/2026"` → `2026-08-01`).\n• Normalization: Transforming the mathematical scale of numeric variables (e.g. Min-Max scaling into $[0, 1]$ range) or normalizing relational database schemas.\n\n2. String & Whitespace Formatting Mechanics:\nIn raw datasets, invisible whitespace characters (`" "`, `\\t`, `\\n`) and erratic capitalization create artificial categorical cardinality.\n• `df[col].str.strip()`: Strips leading and trailing whitespace. Crucial because `" Mumbai"` != `"Mumbai"`.\n• `df[col].str.lower()`: Lowercases all characters (ideal for NLP text processing and case-insensitive matching).\n• `df[col].str.upper()`: Uppercases all characters (standard for ISO codes, country codes, PAN/passport identifiers).\n• `df[col].str.title()`: Capitalizes the first letter of each word (standard for person names, city names, and nominal categories).\n\n3. Explicit Categorical Mapping:\nWhen strings contain acronyms and abbreviations (e.g. `"M"`, `"Male"`, `"MALE"`, `"F"`, `"Female"`), string functions alone are insufficient. Data scientists define an explicit dictionary mapping:\n\n`mapping = {"M": "Male", "Male": "Male", "male": "Male", "F": "Female", "Female": "Female"}`\n`df["gender"] = df["gender"].map(mapping)`\n\n4. Numeric Values Stored as Text Strings:\nA common data ingestion bug occurs when numerical columns are parsed as `object` (string) dtype because of stray characters, currency symbols, or sentinel labels like `"unknown"`.\n• Direct coercion: `pd.to_numeric(df["marks"])`.\n• Safe coercion: `pd.to_numeric(df["marks"], errors="coerce")`. If a row contains `"unknown"`, it is converted safely to `np.nan` rather than crashing the entire script. This explicitly links formatting to Topic 2.4 Missing Data Imputation!\n\n5. Currency Formatting & Stored vs Display Values:\nFinancial amounts often arrive with currency symbols and thousands commas (`"₹1,50,000"` or `"$1,500.00"`).\n• Preprocessing Pipeline: Strip symbols → Remove commas (`.str.replace(",", "")`) → Convert to numeric `float64`.\n• Crucial Rule: Always store raw numbers in analytical matrices (`150000.0`). Currency symbols belong strictly in the UI display presentation layer.\n\n6. Datetime Parsing & The Date Ambiguity Trap:\nDates formatted as text strings (`"01/08/2026"`, `"2026-08-01"`, `"Aug 1, 2026"`) cannot be sorted chronologically or filtered by month.\n• Unified Parsing: `df["date"] = pd.to_datetime(df["date"], format="mixed")`.\n• Component Access: `df["date"].dt.year`, `df["date"].dt.month`, `df["date"].dt.day_name()`.\n• The Ambiguity Trap: `"01/02/2026"` can mean February 1st in the UK/India (DD/MM/YYYY) or January 2nd in the USA (MM/DD/YYYY). Always inspect the data source metadata or supply an explicit `dayfirst=True` / `format="%d/%m/%Y"` parameter.\n\n7. Formatting vs Meaning (Preserving Critical Zeros):\nDo not blindly convert all strings to numbers! An employee badge or Student ID `"00123"` has leading zeros that denote department codes. Converting `"00123"` to integer `123` permanently destroys leading metadata. Keep identifiers as strings (`object` / `string` dtype).\n\n8. Introduction to Min-Max Feature Normalization:\nWhen features operate on drastically different numeric scales (e.g. Age: $18 - 60$, Salary: $₹20,000 - ₹2,00,000$), unscaled features can distort distance-based algorithms like k-Nearest Neighbors and Gradient Descent.\n\n$$x\' = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}$$\n\nMin-Max scaling maps any arbitrary continuous range linearly into $[0, 1]$, where $x_{\\min}$ maps to $0.0$ and $x_{\\max}$ maps to $1.0$.\n\n9. Post-Transformation Validation Audits:\nNever conclude formatting without asserting:\n1. `df[col].dtype` matches expected analytical semantics (`float64`, `datetime64[ns]`, `category`).\n2. `df[col].unique()` contains no duplicate synonym variations.\n3. Count of coerced `NaN`s is documented and checked against data quality thresholds.',
    bulletPoints: [
      'Data formatting ensures consistent representation across records; it does not change the underlying physical truth.',
      'Whitespace traps: leading/trailing spaces make identical strings evaluate as unequal in Python.',
      'String casing tools: `.str.strip()`, `.str.lower()`, `.str.upper()`, and `.str.title()` standardize text.',
      'Explicit dictionary mapping (`df[col].map({...})`) cleanly merges abbreviations and synonym categories.',
      'Numeric text conversion: `pd.to_numeric(..., errors="coerce")` safely turns invalid strings into `NaN`.',
      'Currency hygiene: Store bare numbers (`50000`) for computation; format with symbols (`₹50,000`) only at display time.',
      'Datetime conversion: `pd.to_datetime()` unifies string dates and unlocks `.dt` temporal extraction methods.',
      'Date Ambiguity: Always verify DD/MM/YYYY vs MM/DD/YYYY before parsing to avoid shifting dates by months.',
      'Formatting vs Meaning: Never strip leading zeros from categorical identifiers (e.g. PIN codes, Student IDs `"00123"`).',
      'Min-Max Normalization: $x\' = (x - x_{\\min}) / (x_{\\max} - x_{\\min})$ scales numerical features into $[0, 1]$ range.',
      'Always validate post-formatting dtypes, unique value sets, and category frequencies.',
    ],
    equations: [
      'x\' = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}',
      '\\text{Upper Fence} = Q_3 + 1.5 \\times \\text{IQR}',
      'z = \\frac{x - \\mu}{\\sigma}',
    ],
  },
  codeExamples: [
    {
      title: '1. Standardizing Strings, Whitespace & Categories in Pandas',
      description: 'Clean whitespace, standardize casing, and apply dictionary mapping to consolidate categorical columns.',
      language: 'python',
      code: `import pandas as pd

# Raw messy customer dataframe
df = pd.DataFrame({
    "customer": ["Rahul", "Priya", "Arjun", "Sneha"],
    "city": [" Mumbai", "mumbai ", "MUMBAI", " Mumbai "],
    "gender": ["M", "Female", "male", "F"]
})

print("--- Before Formatting ---")
print(df["city"].value_counts())

# Step 1: Strip whitespace and apply Title Case to city names
df["city_clean"] = df["city"].str.strip().str.title()

# Step 2: Explicit dictionary mapping for gender categories
gender_map = {
    "M": "Male", "male": "Male", "Male": "Male", "MALE": "Male",
    "F": "Female", "female": "Female", "Female": "Female", "FEMALE": "Female"
}
df["gender_clean"] = df["gender"].map(gender_map)

print("\\n--- After Formatting ---")
print(df[["customer", "city_clean", "gender_clean"]])
print("\\nClean City Value Counts:")
print(df["city_clean"].value_counts())`,
      lineExplanations: [
        { line: 12, text: 'Raw city value counts shows 4 distinct classes because of spaces and casing.' },
        { line: 15, text: 'Chaining .str.strip() and .str.title() trims spaces and capitalizes only the first letter.' },
        { line: 18, text: 'Explicit dictionary maps all male/female acronyms and cases to canonical labels.' },
        { line: 22, text: 'map() replaces all matching keys with their canonical standardized target values.' },
        { line: 26, text: 'Clean city counts confirms all 4 records correctly merged into a single "Mumbai" class.' },
      ],
      output: `--- Before Formatting ---
 Mumbai     1
mumbai      1
MUMBAI      1
 Mumbai     1
Name: city, dtype: int64

--- After Formatting ---
  customer city_clean gender_clean
0    Rahul     Mumbai         Male
1    Priya     Mumbai       Female
2    Arjun     Mumbai         Male
3    Sneha     Mumbai       Female

Clean City Value Counts:
Mumbai    4
Name: city_clean, dtype: int64`,
    },
    {
      title: '2. Converting Numeric Strings, Currency & Parsing Dates',
      description: 'Clean currency symbols, safely coerce invalid numeric text, and parse heterogeneous dates into datetime objects.',
      language: 'python',
      code: `import pandas as pd
import numpy as np

# Raw ecommerce transaction records
df = pd.DataFrame({
    "order_id": ["00101", "00102", "00103", "00104"],
    "price_raw": ["₹50,000", "₹75,000", "120000", "₹45,500"],
    "marks_raw": ["85", "92", "corrupt_entry", "78"],
    "order_date": ["01/08/2026", "2026-08-01", "Aug 1, 2026", "01-Aug-26"]
})

# 1. Clean Currency: remove '₹' and commas, then convert to float
df["price_numeric"] = (
    df["price_raw"]
    .str.replace("₹", "", regex=False)
    .str.replace(",", "", regex=False)
    .astype(float)
)

# 2. Coerce Numeric Text: 'corrupt_entry' safely becomes NaN
df["marks_numeric"] = pd.to_numeric(df["marks_raw"], errors="coerce")

# 3. Parse Dates into unified datetime64[ns]
df["date_parsed"] = pd.to_datetime(df["order_date"], format="mixed")
df["order_year"] = df["date_parsed"].dt.year
df["order_month_name"] = df["date_parsed"].dt.month_name()

print("--- Cleaned Typed Dataframe ---")
print(df[["order_id", "price_numeric", "marks_numeric", "date_parsed", "order_month_name"]])
print("\\nData Types:")
print(df[["price_numeric", "marks_numeric", "date_parsed"]].dtypes)`,
      lineExplanations: [
        { line: 12, text: 'String replace removes currency symbols and commas before converting to float.' },
        { line: 19, text: 'pd.to_numeric with errors="coerce" safely turns "corrupt_entry" into NaN.' },
        { line: 22, text: 'pd.to_datetime with format="mixed" unifies diverse date strings into standard timestamps.' },
        { line: 24, text: '.dt accessor extracts month name ("August") from the parsed timestamp.' },
      ],
      output: `--- Cleaned Typed Dataframe ---
  order_id  price_numeric  marks_numeric date_parsed order_month_name
0    00101        50000.0           85.0  2026-01-08          January
1    00102        75000.0           92.0  2026-08-01           August
2    00103       120000.0            NaN  2026-08-01           August
3    00104        45500.0           78.0  2026-08-01           August

Data Types:
price_numeric           float64
marks_numeric           float64
date_parsed      datetime64[ns]
dtype: object`,
    },
    {
      title: '3. Min-Max Normalization (Feature Scaling in Pandas)',
      description: 'Compute Min-Max scaling manually and compare original scales with [0, 1] normalized scales.',
      language: 'python',
      code: `import pandas as pd

# Employee dataset with features on wildly different scales
df = pd.DataFrame({
    "employee": ["Aman", "Bina", "Chirag", "Divya", "Esha"],
    "age": [22, 28, 35, 42, 58],               # Range: 22 to 58
    "salary": [25000, 45000, 75000, 110000, 190000] # Range: 25k to 190k
})

# Function for Min-Max Scaling: x' = (x - x_min) / (x_max - x_min)
def min_max_scale(series):
    return (series - series.min()) / (series.max() - series.min())

# Apply scaling to numerical features
df["age_norm"] = min_max_scale(df["age"])
df["salary_norm"] = min_max_scale(df["salary"])

print("--- Original vs Min-Max Normalized Values ---")
print(df[["employee", "age", "age_norm", "salary", "salary_norm"]].round(3))`,
      lineExplanations: [
        { line: 12, text: 'Defines formula (x - min) / (max - min) to rescale any column to [0, 1].' },
        { line: 16, text: 'Calculates normalized age: 22 maps to 0.0, 58 maps to 1.0.' },
        { line: 17, text: 'Calculates normalized salary: 25k maps to 0.0, 190k maps to 1.0.' },
      ],
      output: `--- Original vs Min-Max Normalized Values ---
  employee  age  age_norm  salary  salary_norm
0     Aman   22     0.000   25000        0.000
1     Bina   28     0.167   45000        0.121
2   Chirag   35     0.361   75000        0.303
3    Divya   42     0.556  110000        0.515
4     Esha   58     1.000  190000        1.000`,
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming every "M" in a dataset always means "Male".',
      why: 'Depending on the domain, "M" could represent "Married", "Medium" t-shirt size, "Monday", or "Master\'s Degree".',
      correction: 'Always check column headers, domain context, and the dataset data dictionary before applying categorical dictionary mappings.',
      wrongCode: 'df["status"] = df["status"].map({"M": "Male"}) # Blindly assuming M is gender',
      correctCode: '# Verify column metadata: marital_status vs gender\nif col == "marital_status":\n    df[col] = df[col].map({"M": "Married", "S": "Single"})\nelif col == "gender":\n    df[col] = df[col].map({"M": "Male", "F": "Female"})',
    },
    {
      mistake: 'Stripping leading zeros from categorical identifiers like Student IDs, PIN codes, or Account numbers.',
      why: 'Converting Student ID `"00123"` into integer `123` destroys leading zeros that encode branch or admission year codes. Identifiers are categorical strings, not arithmetic counts.',
      correction: 'Retain string dtype for all identification codes. Only convert columns to numeric when arithmetic operations (sum, mean, comparison) make semantic sense.',
    },
    {
      mistake: 'Treating dates as ordinary string objects rather than datetime64 objects.',
      why: 'String dates sort alphabetically rather than chronologically (e.g. string `"31/01/2026"` sorts after `"01/02/2026"`). You also cannot compute date differences or extract years/months.',
      correction: 'Always parse string dates with pd.to_datetime() into proper datetime64[ns] types.',
    },
    {
      mistake: 'Using pd.to_numeric() without handling invalid non-numeric text values.',
      why: 'If a column contains a stray `"unknown"` or `"N/A"` string, pd.to_numeric() throws a ValueError and crashes the pipeline.',
      correction: 'Use pd.to_numeric(df[col], errors="coerce") to turn invalid non-convertible strings into NaN, and document the coerced nulls.',
    },
    {
      mistake: 'Confusing visual display formatting with stored analytical values in datasets.',
      why: 'Storing `"₹50,000"` directly in your dataframe prevents numerical calculations, aggregations, and ML model training.',
      correction: 'Store pure numeric values (`50000.0`) in the database/dataframe and format with currency symbols only in reports or UI components.',
    },
    {
      mistake: 'Assuming "Normalization" only ever refers to Min-Max numeric scaling.',
      why: 'Normalization is an overloaded term: it refers to text formatting normalization, database schema normalization (1NF, 2NF, 3NF), and statistical feature scaling.',
      correction: 'Clarify the exact context: format normalization vs numerical scaling vs relational database normalization.',
    },
    {
      mistake: 'Applying transformations without validating post-cleaning unique values and dtypes.',
      why: 'A typo in a mapping dictionary can turn half of your categories into unmapped NaNs silently.',
      correction: 'Always run df[col].value_counts(), df[col].unique(), and df.dtypes after every formatting operation.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'Should this column be stored as a string or a numeric type?',
      context: 'You encounter a column called `pin_code` containing values like `"08001"` and `"560001"`.',
      reasoning:
        'Ask: "Will I ever calculate the average PIN code or add two PIN codes together?" No. Calculating mean PIN code is meaningless. Furthermore, converting `"08001"` to an integer turns it into `8001`, destroying the valid 5-digit postal code.',
      ruleOfThumb:
        'If arithmetic makes sense → Numeric. If leading zeros matter or it is an identifier → String.',
    },
    {
      question: 'How do I avoid the Date Ambiguity Trap in mixed international feeds?',
      context: 'A CSV contains dates like `03/04/2026`. Is it March 4th or April 3rd?',
      reasoning:
        'Inspect other rows in the same dataset. If you find a row with `25/04/2026`, then month cannot be 25, proving the format is definitely DD/MM/YYYY. If all days are ≤ 12, check source locale metadata.',
      ruleOfThumb:
        'Scan for dates with day > 12 to deduce the locale, or explicitly pass `dayfirst=True` / `format` string.',
    },
    {
      question: 'When should I use Min-Max Normalization vs leaving features in original units?',
      context: 'You are preparing a dataset containing Age (20–60) and Annual Income (₹3,00,000–₹50,00,000) for exploratory visualization vs machine learning.',
      reasoning:
        'For business reporting, keep original units (years, rupees) so stakeholders can understand numbers. For distance-based algorithms (k-NN, PCA, Gradient Descent), normalize into $[0, 1]$ so huge income numbers do not overpower age.',
      ruleOfThumb:
        'Human interpretation → Original units. Distance algorithms / Neural networks → Min-Max Normalized.',
    },
    {
      question: 'How do I detect silent data destruction during categorical mapping?',
      context: 'You mapped gender using `df["gender"].map({"Male": "M", "Female": "F"})`.',
      reasoning:
        'If the raw data contained a rogue value `"Other"` or `"unknown"` that wasn\'t in your dictionary keys, `.map()` quietly replaces it with `NaN`.',
      ruleOfThumb:
        'Always verify `df[col].isna().sum()` before and after `.map()` to ensure unmapped categories were not silently erased.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'In Python, what is the data type of the value `"85"`?',
      options: [
        'int (integer)',
        'float (floating point number)',
        'str (string / text object)',
        'bool (boolean)',
      ],
      correctIndex: 2,
      explanation:
        'Any value enclosed in quotation marks is parsed as a string (`str` / `object` dtype in Pandas), even if its characters represent digits.',
    },
    {
      id: 'q2',
      question: 'Which Pandas string operation removes leading and trailing whitespace from a column?',
      options: [
        'df["city"].str.lower()',
        'df["city"].str.strip()',
        'df["city"].str.replace()',
        'df["city"].str.split()',
      ],
      correctIndex: 1,
      explanation:
        '.str.strip() removes all leading and trailing whitespace characters (spaces, tabs, newlines) from string columns.',
    },
    {
      id: 'q3',
      question: 'When executing `pd.to_numeric(df["marks"], errors="coerce")`, what happens to a row containing the string `"absent"`?',
      options: [
        'The script crashes immediately with a ValueError.',
        'The string `"absent"` is converted to numerical zero (0).',
        'The string `"absent"` is safely converted to `NaN` (Not a Number).',
        'The string is left unchanged as `"absent"`.',
      ],
      correctIndex: 2,
      explanation:
        'Setting `errors="coerce"` instructs Pandas to convert any non-convertible text string into `NaN` rather than raising a fatal error.',
    },
    {
      id: 'q4',
      question: 'Why should you NOT convert a Student ID column containing `"00123"` into integer `123`?',
      options: [
        'Because integers cannot be stored in CSV files.',
        'Because leading zeros often encode departmental or regional metadata, and converting to integer permanently destroys those zeros.',
        'Because Pandas does not support numbers smaller than 1,000.',
        'Because integers use more RAM than text strings.',
      ],
      correctIndex: 1,
      explanation:
        'Identifiers (IDs, PIN codes, barcodes) rely on exact character sequence length. Converting to integer strips leading zeros and corrupts identification codes.',
    },
    {
      id: 'q5',
      question: 'What is the "Date Ambiguity Trap" when parsing the string `"01/02/2026"` without explicit format specifications?',
      options: [
        'The year 2026 is in the future, so computers reject it.',
        'The date could represent February 1st (DD/MM) in the UK/India or January 2nd (MM/DD) in the USA.',
        'Dates with slashes are automatically converted to fractions.',
        'Datetime objects cannot store the number 2.',
      ],
      correctIndex: 1,
      explanation:
        'Without locale context or format strings, dates where both day and month are ≤ 12 are ambiguous between DD/MM/YYYY and MM/DD/YYYY.',
    },
    {
      id: 'q6',
      question: 'Using the Min-Max Normalization formula: x\' = (x - xmin) / (xmax - xmin), what is the normalized value of x = 40 when xmin = 20 and xmax = 60?',
      options: [
        'x\' = 0.25',
        'x\' = 0.50',
        'x\' = 0.75',
        'x\' = 1.00',
      ],
      correctIndex: 1,
      explanation:
        'x\' = (40 - 20) / (60 - 20) = 20 / 40 = 0.50. It lies exactly halfway between the minimum and maximum.',
    },
    {
      id: 'q7',
      question: 'What is the correct way to handle currency values like `"₹50,000"` in an analytical pipeline?',
      options: [
        'Keep the string `"₹50,000"` directly in the dataframe for training regression models.',
        'Strip the `"₹"` symbol and commas, convert to numerical `50000.0` for computation, and format with symbols only during UI presentation.',
        'Replace all currency amounts with the word "Rupees".',
        'Convert all currency amounts to negative integers.',
      ],
      correctIndex: 1,
      explanation:
        'Store bare numerical floats (`50000.0`) for mathematical operations, and add currency symbols only at the presentation/reporting layer.',
    },
    {
      id: 'q8',
      question: 'Why should you inspect unique values (`df[col].unique()`) before and after applying a dictionary mapping with `.map()`?',
      options: [
        'Because `.map()` runs faster if you inspect it first.',
        'To ensure unmapped categories in the raw data were not silently converted into unexpected `NaN` values.',
        'Because Pandas requires `.unique()` to be called before every function.',
        'To verify that the dataset contains exactly 100 rows.',
      ],
      correctIndex: 1,
      explanation:
        'Any raw category not listed in the `.map()` dictionary keys is quietly converted to `NaN`. Pre- and post-inspection catches unmapped categories.',
    },
    {
      id: 'q9',
      question: 'What is the difference between Data Cleaning and Data Formatting?',
      options: [
        'Data Cleaning is for numbers; Data Formatting is only for images.',
        'Data Cleaning fixes defects (missing, outliers, errors); Data Formatting standardizes representations and storage types into consistency.',
        'Data Formatting is done only in Microsoft Excel; Data Cleaning is done in Python.',
        'There is zero difference; they are exact identical synonyms.',
      ],
      correctIndex: 1,
      explanation:
        'Cleaning removes errors and handles missing/outlier points. Formatting unifies representations (e.g. casing, dates, string types) into standard consistent structures.',
    },
    {
      id: 'q10',
      question: 'Now that we have handled missing data (2.4), outliers (2.5), and standardized formats (2.6), what is the next step in Topic 2.7?',
      options: [
        'Deploying neural networks on AWS.',
        'NumPy & Pandas Operations — manipulating, filtering, grouping, merging, and aggregating clean feature matrices.',
        'Writing raw assembly code for hardware drivers.',
        'Scraping websites from scratch again.',
      ],
      correctIndex: 1,
      explanation:
        'With a clean, standardized dataset, Topic 2.7 teaches high-performance tabular operations: slicing, boolean filtering, group-by aggregations, and dataframe merges.',
    },
  ],
  summary: {
    takeaways: [
      'Data can be empirically valid yet represented inconsistently across rows, breaking grouping and calculations.',
      'Data Formatting standardizes representations; Data Cleaning fixes defects; Normalization scales numerical ranges.',
      'Use `.str.strip()` to eliminate leading/trailing whitespace and `.str.title()` / `.str.lower()` to unify capitalization.',
      'Apply explicit dictionary mappings (`df[col].map({...})`) to merge categorical synonyms, abbreviations, and boolean flags.',
      'Numeric text should be coerced safely with `pd.to_numeric(errors="coerce")`, isolating non-convertible entries as `NaN`.',
      'Currency symbols belong in the presentation layer; store pure numeric floats (`50000.0`) in analytical tables.',
      'Parse date strings into `datetime64[ns]` with `pd.to_datetime()` to enable chronological sorting and `.dt` component access.',
      'Beware the Date Ambiguity Trap: always check locale conventions (DD/MM vs MM/DD) when both day and month are ≤ 12.',
      'Preserve leading zeros for categorical identifiers (e.g. Student ID `"00123"`); never convert them into integers.',
      'Min-Max Normalization ($x\' = (x - x_{\\min}) / (x_{\\max} - x_{\\min})$) linearly rescales continuous features into $[0, 1]$.',
      'Always validate post-formatting dtypes, unique value sets, and null counts before moving to data operations.',
    ],
    nextUpText: '2.7 NumPy & Pandas Operations — Advanced slicing, boolean filtering, group-by aggregations, pivoting, and dataframe merging on clean data matrices.',
  },
  prevTopic: {
    slug: 'outliers-detection-and-treatment',
    title: '2.5 Outliers Detection & Treatment',
  },
  nextTopic: {
    slug: 'numpy-and-pandas-operations',
    title: '2.7 NumPy and Pandas Operations',
  },
};
