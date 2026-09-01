import { LessonContent } from '@/types/lesson';

export const topic1_2: LessonContent = {
  id: 'm1-t2',
  topicNumber: '1.2',
  slug: 'roles-and-tools-in-data-science',
  moduleId: 'module-1',
  title: 'Roles and Tools in Data Science',
  subtitle: 'The Engineering Ecosystem: Who Does What & The Tools Powering It',
  estimatedMinutes: 25,
  difficulty: 'Beginner',
  tags: ['Careers', 'Data Pipeline', 'Tools Matrix', 'Collaboration'],
  objectives: [
    'Understand why Data Science work is divided across specialized roles in real engineering teams.',
    'Master the core responsibilities, primary questions, and tool stacks of Data Analysts, Data Scientists, Data Engineers, ML Engineers, and Business Analysts.',
    'Recognize that real-world roles often overlap and collaborate dynamically across the project lifecycle.',
    'Understand the exact problem each major Data Science tool (Python, NumPy, Pandas, SQL, Jupyter, Scikit-learn, etc.) was designed to solve.',
    'Trace how a single business initiative flows from business requirement to deployed machine learning product.',
  ],
  hook: {
    title: 'The Food-Delivery at Scale Problem',
    story:
      'Imagine a food-delivery platform processing 5,000,000 orders every day across 40 cities. Millions of GPS pings, restaurant menu updates, payment transactions, cancellation events, and driver telemetry streams are constantly flowing in.\n\nSomeone has to collect and store that data reliably without crashing. Someone has to clean it and investigate why orders dropped 12% in Bengaluru last week. Someone has to build a mathematical model to predict when delivery surges happen. And someone has to package that model into an ultra-low-latency API that driver apps can call in under 15 milliseconds.\n\nCould one single person do all of that alone? Theoretically, in a tiny startup, maybe. But at engineering scale, Data Science is a collaborative team sport.',
    analogy:
      'Think of a Formula 1 racing team: you have telemetry engineers capturing sensor data, pit strategists analyzing tire degradation trends, aerodynamic scientists simulating wind drag, and powertrain engineers deploying engine firmware. No single person wins the Grand Prix alone.',
    realWorldImpact:
      'Understanding these boundaries empowers 2nd-year engineers to pick the right electives, build high-impact GitHub projects, and know exactly what skills top tech companies hire for.',
  },
  coreConcept: {
    headline: 'The 5 Core Disciplines of Modern Data Teams',
    explanation:
      'Data Science is not a single job; it is a cross-functional workflow that translates business problems into data pipelines, analytical discoveries, statistical models, and reliable production software.',
    keyPillars: [
      {
        title: 'Data Analyst (The Investigative Storyteller)',
        description:
          'Asks: "What happened, and what is the data telling us?" Queries databases with SQL, cleans datasets in Pandas, builds executive BI dashboards, and identifies historical trends.',
      },
      {
        title: 'Data Scientist (The Modeler & Experimenter)',
        description:
          'Asks: "What patterns exist, and what will happen next?" Formulates hypotheses, conducts statistical experiments, engineers features, and builds predictive machine learning models.',
      },
      {
        title: 'Data Engineer (The Pipeline Architect)',
        description:
          'Asks: "How do we reliably collect, store, and move data at scale?" Builds the roads data travels on: ingestion pipelines, ETL/ELT workflows, data warehouses, and distributed databases.',
      },
      {
        title: 'ML Engineer (The Production Deployer)',
        description:
          'Asks: "How do we turn a trained model into a scalable, reliable product?" Packages models into containerized APIs, optimizes inference latency (<20ms), monitors data drift, and automates retraining.',
      },
      {
        title: 'Business Analyst (The Problem Translator)',
        description:
          'Asks: "What does the business actually need to achieve?" Gathers requirements, defines measurable KPIs, and bridges executive goals with technical analytical teams.',
      },
    ],
  },
  interactiveType: 'role-matrix',
  technicalExplanation: {
    title: 'The Modern Data Science Toolbox: Purpose Over Memorization',
    deepDive:
      'Every tool in Data Science was invented because existing solutions were either too slow, too rigid, or too painful for a specific computational task. Memorizing syntax without understanding why a tool exists is a common beginner trap.',
    bulletPoints: [
      'Python — The universal glue: Readable, expressive, and connected to blazingly fast underlying C/Fortran libraries.',
      'NumPy — Vectorized linear algebra: Replaces slow Python object pointer arrays with contiguous memory blocks for 50x faster math.',
      'Pandas — Tabular data manipulation: Provides SQL-like DataFrame indexing, slicing, aggregation, and missing value handling directly in Python memory.',
      'Jupyter Notebook — Interactive scientific notebook: Blends markdown notes, live code execution cells, and rich visual plots in a single sandbox.',
      'Matplotlib & Seaborn — Visual diagnostics: Matplotlib provides low-level chart control; Seaborn generates polished statistical distributions and correlation heatmaps.',
      'SQL — Relational database querying: Filters, joins, and aggregates gigabytes of structured records inside the database before exporting to Python.',
      'Scikit-Learn — Standard Machine Learning: High-level, consistent API for classical regression, classification, clustering, and feature preprocessing.',
      'Git & GitHub — Version control & team collaboration: Tracks iterative experimental changes, enables branch reviews, and prevents code loss.',
    ],
  },
  codeExamples: [
    {
      title: 'A Collaborative 4-Role Code Pipeline',
      description:
        'See how Data Engineering, Analytics, Data Science, and ML Engineering tools hand off data seamlessly in a Python pipeline.',
      language: 'python',
      code: `# ==========================================================
# 1. DATA ENGINEERING LAYER: SQL Ingestion & Schema Extraction
# ==========================================================
# In real life, Data Engineers build automated pipelines to pull:
# query = "SELECT order_id, prep_time_min, distance_km, rain_flag, delayed FROM deliveries"

import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression

# ==========================================================
# 2. DATA ANALYST LAYER: Tabular Inspection & KPI Aggregations
# ==========================================================
raw_orders = {
    'distance_km': [2.1, 5.8, 8.4, 1.5, 6.2, 9.1, 3.4, 7.0],
    'prep_time_min': [12, 25, 30, 10, 28, 35, 15, 26],
    'rain_flag': [0, 1, 1, 0, 1, 1, 0, 1],
    'delayed': [0, 1, 1, 0, 1, 1, 0, 1]
}
df = pd.DataFrame(raw_orders)

# Analyst finds: Rainy deliveries have 75% higher delay rate
print(f"Rain delay rate: {df[df['rain_flag'] == 1]['delayed'].mean():.0%}")

# ==========================================================
# 3. DATA SCIENCE LAYER: Feature Extraction & Model Fitting
# ==========================================================
# Extract contiguous NumPy matrices for high-speed mathematical estimators
X = df[['distance_km', 'prep_time_min', 'rain_flag']].values  # 2D Array
y = df['delayed'].values                                      # 1D Vector

model = LogisticRegression()
model.fit(X, y)

# ==========================================================
# 4. ML ENGINEERING LAYER: Production Inference API Handler
# ==========================================================
def predict_delay_risk(distance_km: float, prep_time_min: float, is_raining: bool) -> dict:
    """Production endpoint called by the delivery dispatch service in <5ms."""
    input_vector = np.array([[distance_km, prep_time_min, int(is_raining)]])
    delay_prob = model.predict_proba(input_vector)[0][1]
    
    return {
        'delay_probability': round(float(delay_prob), 3),
        'high_risk_alert': delay_prob > 0.65,
        'recommended_buffer_minutes': 15 if delay_prob > 0.65 else 0
    }

# Test new order coming from user mobile app
print("Production API output:", predict_delay_risk(6.5, 24, True))`,
      lineExplanations: [
        { line: 16, text: 'Pandas loads and cleans tabular data with descriptive summaries.' },
        { line: 26, text: '.values extracts raw contiguous NumPy memory blocks for linear algebra.' },
        { line: 30, text: 'Scikit-Learn trains optimal decision boundaries using gradient optimization.' },
        { line: 36, text: 'ML Engineering packages the trained model into a low-latency production function.' },
      ],
      output: 'Rain delay rate: 100%\nProduction API output: {\'delay_probability\': 0.942, \'high_risk_alert\': True, \'recommended_buffer_minutes\': 15}',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming a Data Scientist works alone and builds complex AI models all day',
      why: 'In reality, building models is only ~20% of the lifecycle. Understanding business context, collaborating with Data Engineers on pipelines, verifying data quality with Analysts, and documenting assumptions take the majority of time.',
      correction: 'Focus on communication, problem formulation, and data preprocessing just as much as learning machine learning algorithms.',
    },
    {
      mistake: 'Trying to learn 20 different libraries superficially before mastering NumPy and Pandas',
      why: 'Nearly every advanced Python framework (PyTorch, TensorFlow, Scikit-Learn, XGBoost, Statsmodels) accepts and returns NumPy arrays and Pandas DataFrames. Weak foundational muscle memory makes debugging tensors nearly impossible.',
      correction: 'Master array vectorization, Boolean indexing, groupby aggregations, and tabular joins before moving to advanced neural networks.',
    },
    {
      mistake: 'Assuming job titles mean the exact same thing at every company',
      why: 'A "Data Scientist" at an early-stage startup often builds the database, creates BI reports, trains models, and deploys APIs. At a large tech company (like IBM, Google, or Netflix), these responsibilities are strictly split across specialized teams.',
      correction: 'Read job descriptions and project requirements by skills needed rather than title alone.',
    },
    {
      mistake: 'Choosing tools before understanding the problem',
      why: 'Reaching for Deep Learning or Spark when a simple SQL query or 10-line Pandas script solves the business question adds immense unnecessary complexity and latency.',
      correction: 'Always follow the rule: Problem Formulation first → Data Verification second → Simple Baseline third → Complex Tool only if justified.',
    },
    {
      mistake: 'Treating Data Science as only Machine Learning',
      why: 'Descriptive analytics, data governance, metric definitions, and causal statistical inference frequently deliver higher ROI to executives than predictive models.',
      correction: 'Value every stage of the data lifecycle equally: high quality analysis saves companies millions without training a single model.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'When preparing a dataset, should I use SQL or Pandas?',
      context: 'You need to analyze 500 GB of customer logs stored in an enterprise cloud warehouse.',
      reasoning:
        'Transferring 500 GB over the network into your local Python RAM will crash your machine. SQL runs directly inside the distributed database cluster, allowing you to filter down to relevant rows and aggregate metrics before export.',
      ruleOfThumb: 'Filter, join, and aggregate massive data in SQL first; transform, model, and visualize the refined sample in Pandas second.',
    },
    {
      question: 'When should I involve an ML Engineer vs doing deployment myself?',
      context: 'Your predictive model works well in a Jupyter Notebook and now needs to serve real users.',
      reasoning:
        'Jupyter Notebooks are experimentation sandboxes, not production servers. When a model needs to handle thousands of concurrent API requests, maintain <20ms latency, monitor for data drift, and automatically failover, ML Engineering practices are essential.',
      ruleOfThumb: 'Data Science validates "Can we build a useful model?"; ML Engineering solves "Can this model run reliably for 1,000,000 users?"',
    },
  ],
  quiz: [
    {
      id: 'q1-2-1',
      question: 'A food delivery company experiences database crashes every Sunday evening due to 10x traffic spikes. Which role is primarily responsible for redesigning the ingestion pipeline and database infrastructure?',
      options: [
        'Data Analyst',
        'Data Engineer',
        'Business Analyst',
        'Statistician',
      ],
      correctIndex: 1,
      explanation: 'Data Engineers build the plumbing, database infrastructure, and streaming pipelines (Kafka, Spark, SQL warehouses) to guarantee high-throughput reliability.',
    },
    {
      id: 'q1-2-2',
      question: 'The VP of Marketing asks: "Why did our customer subscription renewals drop by 14% in Chennai last quarter?" Which role is most likely to investigate the historical data and build a dashboard report?',
      options: [
        'Data Analyst',
        'Machine Learning Engineer',
        'DevOps Engineer',
        'Database Administrator',
      ],
      correctIndex: 0,
      explanation: 'Data Analysts focus on descriptive analysis ("What happened?"), querying historical logs, visualizing cohorts, and presenting diagnostic business findings to stakeholders.',
    },
    {
      id: 'q1-2-3',
      question: 'Which tool was specifically designed to perform fast numerical matrix operations on contiguous memory buffers without Python pointer overhead?',
      options: [
        'Pandas',
        'NumPy',
        'Git',
        'Jupyter',
      ],
      correctIndex: 1,
      explanation: 'NumPy provides C-implemented multidimensional arrays and vectorized SIMD operations, eliminating slow Python pointer lookups and loops.',
    },
    {
      id: 'q1-2-4',
      question: 'A Data Scientist has trained a high-accuracy fraud detection model in a Jupyter Notebook. Who is primarily responsible for converting this model into a microservice API that processes credit card swipes in under 10 milliseconds?',
      options: [
        'Business Analyst',
        'Data Analyst',
        'ML Engineer',
        'UX Designer',
      ],
      correctIndex: 2,
      explanation: 'ML Engineers specialize in production model serving, latency optimization, Docker packaging, CI/CD pipelines, and real-time inference monitoring.',
    },
    {
      id: 'q1-2-5',
      question: 'Which statement about Data Science tools and roles is most accurate?',
      options: [
        'Every tool belongs exclusively to one specific role and cannot be shared.',
        'Data Scientists only work with Deep Learning and never clean datasets.',
        'Roles frequently overlap, and tools like Python and SQL are used across multiple disciplines.',
        'You must memorize every single library in Python before you can start learning Data Science.',
      ],
      correctIndex: 2,
      explanation: 'Real-world data teams collaborate continuously, and core languages like Python and SQL are shared across Analysts, Engineers, and Scientists.',
    },
    {
      id: 'q1-2-6',
      question: 'Why is Pandas preferred over raw Python lists and dictionaries when working with tabular datasets like CSVs?',
      options: [
        'Pandas is the only library that can generate 3D video animations.',
        'Pandas provides SQL-like DataFrames with intuitive row/column indexing, grouping, merging, and automatic handling of missing values.',
        'Pandas deletes all missing data automatically without warning.',
        'Pandas converts Python directly into Java bytecode.',
      ],
      correctIndex: 1,
      explanation: 'Pandas DataFrames provide powerful tabular data manipulation, label-based slicing, aggregations, and statistical summaries essential for data wrangling.',
    },
    {
      id: 'q1-2-7',
      question: 'What is the primary role of a Business Analyst in a data science project lifecycle?',
      options: [
        'Writing low-level CUDA kernels for GPU acceleration.',
        'Translating vague business objectives into concrete, measurable analytical questions and KPIs.',
        'Configuring Kubernetes clusters for model inference.',
        'Writing unit tests for NumPy linear algebra subroutines.',
      ],
      correctIndex: 1,
      explanation: 'Business Analysts connect business stakeholders with technical data teams by translating business goals into analytical specifications and KPIs.',
    },
    {
      id: 'q1-2-8',
      question: 'Which tool would you reach for first to track changes in your data science code, collaborate with teammates, and maintain experimental branches?',
      options: [
        'Scikit-Learn',
        'Git / GitHub',
        'Seaborn',
        'Statsmodels',
      ],
      correctIndex: 1,
      explanation: 'Git and GitHub provide distributed version control, change history tracking, and team collaboration workflows for code and experimental scripts.',
    },
    {
      id: 'q1-2-9',
      question: 'What does the principle "Tools come after the problem" mean in Data Science engineering practice?',
      options: [
        'You must buy all software tools before writing down any business goals.',
        'First deeply understand the problem, data sources, and constraints, then select the simplest tool that effectively solves it.',
        'Only use machine learning tools if no other software exists.',
        'Always use the newest, most complex library available regardless of dataset size.',
      ],
      correctIndex: 1,
      explanation: 'Selecting tools based on problem requirements prevents over-engineering and ensures data projects deliver fast, robust, and maintainable business value.',
    },
  ],
  summary: {
    takeaways: [
      'Data Science is a collaborative team sport: Analysts, Scientists, Data Engineers, ML Engineers, and Business Analysts contribute to different lifecycle stages.',
      'Roles are flexible and frequently overlap depending on company size and engineering maturity.',
      'Tools are problem-solvers, not memorization checklists: Choose tools based on the computational bottleneck (SQL for big warehouse queries, NumPy for vectors, Pandas for tables, Scikit-Learn for models).',
      'Production machine learning requires bridging modeling (Data Science) with scalable deployment and monitoring (ML Engineering).',
      'Always start with problem formulation: Tools and models come after understanding what the business needs.',
    ],
    nextUpText: 'Topic 1.3: Python Refresher: Variables & Memory Architecture',
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
