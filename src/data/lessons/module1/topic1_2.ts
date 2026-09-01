import { LessonContent } from '@/types/lesson';

export const topic1_2: LessonContent = {
  id: 'm1-t2',
  topicNumber: '1.2',
  slug: 'roles-and-tools-in-data-science',
  moduleId: 'module-1',
  title: 'Roles and Tools in Data Science',
  subtitle: 'The Engineering Ecosystem: Who Does What & The Tools Powering It',
  estimatedMinutes: 20,
  difficulty: 'Beginner',
  tags: ['Careers', 'Data Pipeline', 'Python vs R', 'Tool Matrix'],
  objectives: [
    'Distinguish between the 4 major industry roles: Data Engineer, Data Analyst, Data Scientist, and ML Engineer.',
    'Understand where each role operates along the ingestion-to-production pipeline.',
    'Map essential industry tools (SQL, Python, Pandas, NumPy, Scikit-Learn, Spark, Docker) to their primary use cases.',
    'Understand why Python has emerged as the global standard lingua franca for data science.',
  ],
  hook: {
    title: 'The Formula 1 Pit Crew Analogy',
    story:
      'Winning a Formula 1 race requires a telemetry engineer who streams 3,000 data points per second from the car (Data Engineer), a strategist who analyzes tire degradation trends from previous laps (Data Analyst), a simulation scientist who models aerodynamic resistance under changing rainfall probabilities (Data Scientist), and an automated gearbox engineer who deploys firmware that executes shifts in 2 milliseconds (ML Engineer).',
    analogy:
      'No single person builds modern data infrastructure alone. Just like a hospital has triage nurses, radiologists, diagnostic specialists, and surgeons, data teams operate as specialized units.',
    realWorldImpact:
      'Knowing role boundaries helps 2nd-year engineers choose relevant electives, build focused GitHub portfolios, and master the exact tools demanded by top tier companies.',
  },
  coreConcept: {
    headline: 'The 4 Specialized Data Disciplines',
    explanation:
      'The modern data lifecycle spans from infrastructure plumbing (data engineering) to historical reporting (analytics), statistical modeling (data science), and high-throughput production serving (machine learning engineering).',
    keyPillars: [
      {
        title: 'Data Engineer (The Plumber)',
        description: 'Designs ETL/ELT pipelines, distributed clusters (Spark, Kafka), schemas, and ensures 99.99% data pipeline uptime.',
      },
      {
        title: 'Data Analyst (The Storyteller)',
        description: 'Queries SQL warehouses, builds executive dashboards (Tableau, PowerBI), and answers: "What happened last quarter?"',
      },
      {
        title: 'Data Scientist (The Modeler)',
        description: 'Develops statistical tests, designs feature representations, trains models, and answers: "Why did it happen & what will happen next?"',
      },
      {
        title: 'Machine Learning Engineer (The Deployer)',
        description: 'Optimizes latency, packages models into Docker containers, monitors data drift, and scales inference to millions of users.',
      },
    ],
  },
  interactiveType: 'role-matrix',
  technicalExplanation: {
    title: 'The Modern Open-Source Python Toolchain',
    deepDive:
      'Python dominates data science because of its high-level readability combined with C/Fortran bindings under the hood. Libraries like NumPy and Pandas execute heavy linear algebra at native C speeds while offering an intuitive Python API.',
    bulletPoints: [
      'Layer 1: Computation & Vectors — NumPy (multidimensional arrays, vector SIMD instructions).',
      'Layer 2: Tabular Wrangling — Pandas (DataFrames, aggregations, time-series indexing).',
      'Layer 3: Visual Exploration — Matplotlib & Seaborn (statistical distributions, heatmaps).',
      'Layer 4: Modeling & Inference — Scikit-Learn (classical regression, decision trees, clustering).',
      'Layer 5: Querying & Storage — SQL (PostgreSQL, BigQuery, Snowflake) and Apache Spark.',
    ],
  },
  codeExamples: [
    {
      title: 'A Multi-Tool Mini Pipeline',
      description: 'See how SQL, Pandas, NumPy, and Scikit-Learn seamlessly hand off data in a standard pipeline.',
      language: 'python',
      code: `# 1. Ingestion (Data Engineering Layer - SQL Query)
# query = "SELECT age, monthly_spend, churned FROM user_analytics"

import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression

# 2. Tabular Wrangling (Data Analyst / Scientist Layer)
data = {
    'age': [22, 38, 45, 29, 61],
    'monthly_spend': [120.5, 450.0, 310.2, 85.0, 520.4],
    'churned': [0, 1, 0, 0, 1]
}
df = pd.DataFrame(data)

# 3. Vector Math Extraction (Data Science Layer)
X = df[['age', 'monthly_spend']].values  # NumPy 2D Array
y = df['churned'].values                 # NumPy 1D Vector

# 4. Model Training & Inference (ML Engineering Layer)
model = LogisticRegression()
model.fit(X, y)
new_user = np.array([[32, 280.0]])
prediction = model.predict_proba(new_user)
print(f"Churn probability: {prediction[0][1]:.2%}")`,
      lineExplanations: [
        { line: 15, text: 'Pandas DataFrame provides column-oriented structured tables.' },
        { line: 18, text: '.values extracts raw contiguous NumPy arrays for mathematical estimators.' },
        { line: 22, text: 'Scikit-Learn fits regression coefficients using fast underlying C matrix operations.' },
      ],
      output: 'Churn probability: 14.85%',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Learning 15 different libraries superficially rather than mastering NumPy and Pandas deeply',
      why: 'Advanced frameworks (PyTorch, TensorFlow, XGBoost, Scikit-Learn) all accept and return NumPy arrays and Pandas DataFrames. Weak fundamentals will block your understanding of tensors and multidimensional slicing.',
      correction: 'Focus on mastering array indexing, vector operations, reshaping, and Pandas grouping before jumping into deep neural networks.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'Which tool should I use: Pandas or SQL?',
      context: 'When preparing a dataset stored in a corporate warehouse.',
      reasoning: 'SQL is best for filtering, joining, and aggregating terabytes of data directly in the database engine before pulling it over the network. Pandas is best for deep mathematical transformations, custom feature engineering, and statistical modeling in Python memory.',
      ruleOfThumb: 'Filter & aggregate in SQL first; transform, model, and visualize in Pandas second.',
    },
  ],
  quiz: [
    {
      id: 'q1-2-1',
      question: 'Which role is primarily responsible for ensuring database pipelines are fault-tolerant, low-latency, and capable of ingesting streaming sensor feeds?',
      options: [
        'Data Analyst',
        'Data Engineer',
        'Business Intelligence Developer',
        'Data Journalist',
      ],
      correctIndex: 1,
      explanation: 'Data Engineers build the plumbing, Kafka pipelines, and distributed data lakes that provide clean, structured data for analysts and scientists.',
    },
    {
      id: 'q1-2-2',
      question: 'Why does NumPy execute array mathematics up to 50x faster than standard Python lists?',
      options: [
        'NumPy uses a completely different CPU than Python',
        'NumPy arrays are stored in contiguous memory blocks and executed via compiled C routines without Python pointer overhead',
        'NumPy compresses numbers into text strings',
        'NumPy skips floating point calculations',
      ],
      correctIndex: 1,
      explanation: 'Python lists store arrays of pointers to individual objects. NumPy stores contiguous homogeneous memory buffers, enabling SIMD vector registers and compiled C execution loops.',
    },
  ],
  summary: {
    takeaways: [
      'Data teams comprise 4 specialized roles: Data Engineer, Analyst, Scientist, and ML Engineer.',
      'The Python scientific stack forms a layered pyramid: NumPy at the core, Pandas for tabular data, Matplotlib/Seaborn for EDA, and Scikit-Learn for models.',
      'Rule of thumb: Aggregate big data in SQL, perform vector operations and modeling in Python.',
    ],
    nextUpText: 'Topic 1.3: Python Refresher: Variables & Memory',
  },
  prevTopic: {
    slug: 'data-science-introduction',
    title: 'Data Science: Introduction',
  },
  nextTopic: {
    slug: 'python-refresher-variables',
    title: 'Python Refresher: Variables',
  },
};
