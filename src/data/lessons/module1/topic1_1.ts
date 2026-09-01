import { LessonContent } from '@/types/lesson';

export const topic1_1: LessonContent = {
  id: 'm1-t1',
  topicNumber: '1.1',
  slug: 'data-science-introduction',
  moduleId: 'module-1',
  title: 'Data Science: Introduction',
  subtitle: 'From Raw Telemetry to Predictive Decisions — What Data Science Is, Why It Exists & How to Think Like a Data Scientist',
  estimatedMinutes: 25,
  difficulty: 'Beginner',
  tags: ['Foundations', 'Data Lifecycle', 'Questions & Insights', 'Mental Models'],
  objectives: [
    'Define what data actually is and how raw recordings transform into actionable decisions (Data → Information → Insight → Decision).',
    'Deconstruct why Data Science is a multi-disciplinary team sport (Code + Math + Domain + Communication) rather than just "Python + ML".',
    'Trace the 9-stage iterative Data Science lifecycle (Ask → Collect → Clean → Explore → Analyze → Visualize → Model → Communicate → Decide).',
    'Distinguish between the 4 major analytical questions: Descriptive, Diagnostic, Predictive, and Prescriptive.',
    'Internalize the 7-question Data Scientist thinking protocol before writing code.',
    'Understand why Data Science is not magic and how better reasoning beats raw data volume.',
  ],
  hook: {
    title: 'You Have Data. Now What?',
    story:
      'Imagine your college collects records on 5,000 students: Name, Age, Attendance %, Study Hours, Assignments Completed, CGPA, and Placement Status. That is a massive table of numbers. But the data itself is NOT the answer. The college wants to know: "Which factors are strongly related to student performance?", "Can we proactively identify students who need academic support 3 months before exams?", and "What student profiles are most likely to receive tier-1 placement offers?" Turning raw recorded columns into solutions to those exact questions is where Data Science begins.',
    analogy:
      'Raw data is like crude petroleum extracted from the ground. You cannot pour crude oil directly into an airplane engine. It must be refined, distilled, transformed, and engineered into high-octane aviation fuel before it can power a flight.',
    realWorldImpact:
      'From predicting flight delays to personalized cancer therapies, detecting credit card fraud in 40 milliseconds, and recommending your next favorite song, Data Science converts passive digital records into predictive leverage.',
  },
  coreConcept: {
    headline: 'What Exactly is Data, and What is Data Science?',
    explanation:
      'Data is simply recorded information about something (numbers, text, timestamps, sensor readings, locations, transactions). When millions of records combine, we have a dataset. Data Science is the empirical discipline that combines programming, statistics, visualization, and domain knowledge to discover useful patterns, extract insights, and make decisions.',
    keyPillars: [
      {
        title: '1. Data (The Raw Material)',
        description: 'Numbers, categories, coordinates, and event streams collected from physical systems, databases, and users.',
      },
      {
        title: '2. Programming (The Tool)',
        description: 'Writing scalable Python, SQL, and NumPy code to clean, reshape, filter, and manipulate millions of rows efficiently.',
      },
      {
        title: '3. Statistics (The Reasoning)',
        description: 'Quantifying uncertainty, understanding distributions, calculating correlations, and validating hypothesis tests.',
      },
      {
        title: '4. Visualization (The Lens)',
        description: 'Revealing geometric and statistical patterns that are impossible to spot in raw tables of numbers.',
      },
      {
        title: '5. Domain Context (The Compass)',
        description: 'Understanding whether an observed correlation makes real-world physical and economic sense.',
      },
      {
        title: '6. Communication (The Value)',
        description: 'Translating technical loss functions and p-values into clear, actionable recommendations for stakeholders.',
      },
    ],
  },
  interactiveType: 'venn',
  technicalExplanation: {
    title: 'The Data Science Lifecycle is Iterative, Not a Straight Line',
    deepDive:
      'A dangerous beginner misconception is assuming Data Science proceeds in a rigid, one-way sequence. In reality, discoveries in later stages constantly trigger feedback loops back to earlier steps.',
    bulletPoints: [
      'Stage 1: ASK — Define the actual problem. What are we trying to find out?',
      'Stage 2: COLLECT — Ingest data from databases, APIs, sensors, and files.',
      'Stage 3: CLEAN — Handle missing records, detect corrupted data, remove duplicates.',
      'Stage 4: EXPLORE — Calculate distributions, find anomalies, check skewness.',
      'Stage 5: ANALYZE — Formulate hypotheses and test statistical significance.',
      'Stage 6: VISUALIZE — Plot relationships, heatmaps, and trend curves.',
      'Stage 7: MODEL — Train mathematical algorithms (e.g. Linear Regression) to predict future outcomes.',
      'Stage 8: COMMUNICATE — Explain insights to decision-makers with clear trade-offs.',
      'Stage 9: DECIDE — Deploy the model or implement policy interventions.',
      'Feedback Loops: Finding anomalies during Exploration sends you back to Clean. Low model accuracy sends you back to Collect more data.',
    ],
  },
  codeExamples: [
    {
      title: 'From Raw Data to Insight in Python (The College Placement Example)',
      description: 'See how a Data Scientist aggregates raw student attendance and study hours to uncover non-linear placement patterns.',
      language: 'python',
      code: `import numpy as np
import pandas as pd

# 1. RAW DATA: 5 Student records as a sample
raw_students = {
    'student_id': ['STU_01', 'STU_02', 'STU_03', 'STU_04', 'STU_05'],
    'attendance_pct': [88, 54, 92, 71, 48],
    'study_hrs_wk': [16, 4, 20, 8, 3],
    'cgpa': [8.92, 6.10, 9.15, 7.40, 5.85],
    'placed': [1, 0, 1, 1, 0]
}
df = pd.DataFrame(raw_students)

# 2. INFORMATION: Summary Statistics
print("=== INFORMATION: Summary Statistics ===")
print("Mean CGPA:", df['cgpa'].mean())
print("Placement Rate:", f"{df['placed'].mean():.1%}")

# 3. INSIGHT: Grouping by attendance threshold (>75%)
high_attendance = df[df['attendance_pct'] >= 75]
low_attendance = df[df['attendance_pct'] < 75]

print("\\n=== INSIGHT: High vs Low Attendance Placement Rate ===")
print(f"High Attendance Placement Rate: {high_attendance['placed'].mean():.1%}")
print(f"Low Attendance Placement Rate:  {low_attendance['placed'].mean():.1%}")

# 4. DECISION: Rule for automated academic support trigger
def academic_alert(attendance, study_hours):
    if attendance < 70 and study_hours < 8:
        return "ACTION: Assign Peer Mentor & Academic Support"
    return "ACTION: On Track"

df['recommendation'] = [
    academic_alert(att, hrs) 
    for att, hrs in zip(df['attendance_pct'], df['study_hrs_wk'])
]
print("\\n=== DECISION: Automated Policy Recommendations ===")
print(df[['student_id', 'attendance_pct', 'recommendation']])`,
      lineExplanations: [
        { line: 4, text: 'Raw observations loaded into a structured DataFrame matrix.' },
        { line: 15, text: 'Information extracted by calculating mathematical summary statistics.' },
        { line: 20, text: 'Insight revealed by segmenting data along predictive behavioral boundaries.' },
        { line: 27, text: 'Decision formalized into an automated institutional early-warning action policy.' },
      ],
      output: '=== INFORMATION: Summary Statistics ===\nMean CGPA: 7.484\nPlacement Rate: 60.0%\n\n=== INSIGHT: High vs Low Attendance Placement Rate ===\nHigh Attendance Placement Rate: 100.0%\nLow Attendance Placement Rate:  33.3%\n\n=== DECISION: Automated Policy Recommendations ===\n  student_id  attendance_pct                                 recommendation\n0     STU_01              88                               ACTION: On Track\n1     STU_02              54  ACTION: Assign Peer Mentor & Academic Support\n2     STU_03              92                               ACTION: On Track\n3     STU_04              71                               ACTION: On Track\n4     STU_05              48  ACTION: Assign Peer Mentor & Academic Support',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Believing that "More Data = Automatically Better Decisions" (The Magic Fallacy)',
      why: 'If data contains systematic measurement bias, missing values, or corrupted labels, increasing the volume of data only makes your algorithm more confidently wrong (Garbage In, Garbage Out).',
      correction: 'Focus on data quality, representative sampling, and thorough cleaning before chasing large volume.',
    },
    {
      mistake: 'Starting a project by asking "Which Python library / algorithm should I use?"',
      why: 'Choosing an algorithm before understanding the problem leads to over-engineered models that solve the wrong question.',
      correction: 'Always start with: "What is the actual problem, and what decision will be made with the answer?"',
    },
    {
      mistake: 'Assuming Data Science is just Machine Learning',
      why: 'In industry, 80% of high-value business decisions are driven by descriptive metrics, diagnostic root-cause analysis, and clean exploratory data analysis (EDA) without deep neural networks.',
      correction: 'Master data wrangling, distributions, and hypothesis testing first; treat ML as one specialized tool in your belt.',
    },
  ],
  thinkingStrategies: [
    {
      question: '1. What is the actual problem?',
      context: 'Receiving a project prompt or business request.',
      reasoning: 'Never start by writing code. Formulate whether the task is Descriptive (what happened), Diagnostic (why), Predictive (what will happen), or Prescriptive (what to do).',
      ruleOfThumb: 'Clarify the target decision before querying the database.',
    },
    {
      question: '2. Can we trust this data?',
      context: 'Receiving a newly collected raw dataset.',
      reasoning: 'Check for missing rows, duplicate IDs, sensor error sentinel codes (-999.0), and sampling bias.',
      ruleOfThumb: 'Assume all raw data is dirty until proven clean via systematic validation.',
    },
    {
      question: '3. How should we communicate the result?',
      context: 'Presenting findings to stakeholders and leadership.',
      reasoning: 'Non-technical stakeholders do not care about raw mathematical loss curves. They care about impact, cost reduction, accuracy trade-offs, and clear next steps.',
      ruleOfThumb: 'Translate mathematical coefficients into concrete real-world outcomes.',
    },
  ],
  quiz: [
    {
      id: 'q1-1-1',
      question: 'Which of the following correctly describes the progression from raw facts to actionable value in Data Science?',
      options: [
        'Decision → Information → Insight → Data',
        'Data → Information → Insight → Decision',
        'Model → Code → Data → Statistics',
        'Algorithm → Python → Plot → Presentation',
      ],
      correctIndex: 1,
      explanation: 'The fundamental data science value hierarchy is: Data (raw observations) → Information (summarized metrics) → Insight (understood pattern/relationship) → Decision (actionable policy/intervention).',
    },
    {
      id: 'q1-1-2',
      question: 'A food delivery app notices that deliveries take 25 minutes longer during rainstorms, and discovers through data analysis that 65% of the delay is due to kitchen bottlenecks rather than traffic. Which type of Data Science question was answered?',
      options: [
        'Descriptive Analytics ("What happened?")',
        'Diagnostic Analytics ("Why did it happen?")',
        'Predictive Analytics ("What might happen next?")',
        'Speculative Analytics ("What could we imagine?")',
      ],
      correctIndex: 1,
      explanation: 'Diagnostic analytics investigates root causes to answer "Why did it happen?" (discovering that kitchen prep delays, not road speed, caused the rain delay).',
    },
    {
      id: 'q1-1-3',
      question: 'Why is the Data Science lifecycle described as "iterative" rather than a linear one-way pipeline?',
      options: [
        'Because Python code must always run inside a while loop',
        'Because discoveries in later stages (e.g. exploration or modeling) frequently reveal data quality issues or new questions that require refining earlier steps',
        'Because computers cannot process data in a single pass',
        'Because every project requires exactly 10 iterations to be valid',
      ],
      correctIndex: 1,
      explanation: 'Data Science is empirical. Exploring data may reveal 25% missing records (looping back to Clean), or model errors may reveal that additional features are needed (looping back to Collect).',
    },
    {
      id: 'q1-1-4',
      question: 'When starting a new Data Science project, what is the FIRST question an engineer should ask?',
      options: [
        '"Which Python library should I import?"',
        '"Should I train a neural network or a random forest?"',
        '"What is the actual problem we are trying to solve?"',
        '"How fast is my GPU?"',
      ],
      correctIndex: 2,
      explanation: 'A Data Scientist always starts with problem formulation: understanding what question needs answering, defining the success criteria, and identifying what decision will be made with the result.',
    },
  ],
  summary: {
    takeaways: [
      '1. Data is recorded observations; Data Science is extracting actionable knowledge from data to make decisions.',
      '2. Value progression: Data (raw) → Information (summarized) → Insight (pattern) → Decision (action).',
      '3. Data Science is a multi-disciplinary team sport: Coding + Statistics + Domain Context + Communication.',
      '4. The 4 questions: Descriptive (What happened), Diagnostic (Why), Predictive (What next), Prescriptive (What to do).',
      '5. Data Science is iterative and starts with "What is the problem?", not "What code should I write?".',
    ],
    nextUpText: 'Topic 1.2: Roles and Tools in Data Science',
  },
  nextTopic: {
    slug: 'roles-and-tools-in-data-science',
    title: 'Roles and Tools in Data Science',
  },
};
