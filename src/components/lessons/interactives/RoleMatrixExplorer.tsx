'use client';

import React, { useState } from 'react';
import { Tag } from '@carbon/react';
import { DataBase, Analytics, Chemistry, Development, Code } from '@carbon/icons-react';

type RoleKey = 'engineer' | 'analyst' | 'scientist' | 'ml';

export function RoleMatrixExplorer() {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('scientist');

  const roles: Record<
    RoleKey,
    {
      title: string;
      icon: React.ReactNode;
      tagType: 'teal' | 'purple' | 'cyan' | 'magenta';
      question: string;
      focus: string;
      tools: string[];
      sampleTask: string;
      codeSnippet: string;
    }
  > = {
    engineer: {
      title: 'Data Engineer',
      icon: <DataBase size={20} />,
      tagType: 'teal',
      question: 'How do we collect, transform, and store 10 TB/day with 99.99% reliability?',
      focus: 'Distributed infrastructure, ETL pipelines, schema design, latency optimization.',
      tools: ['SQL', 'Python', 'Apache Spark', 'Kafka', 'Docker', 'Airflow', 'Snowflake'],
      sampleTask: 'Building an automated pipeline that ingests credit card transaction streams and indexes them in a warehouse in under 500ms.',
      codeSnippet: `# Data Engineer Task (PySpark ETL stream)
df_stream = (spark.readStream
  .format("kafka")
  .option("kafka.bootstrap.servers", "broker:9092")
  .load()
  .writeStream
  .format("parquet")
  .start("/data/lake/transactions"))`,
    },
    analyst: {
      title: 'Data Analyst',
      icon: <Analytics size={20} />,
      tagType: 'purple',
      question: 'What happened last quarter, why did revenue dip, and which cohort is churning?',
      focus: 'Exploratory querying, descriptive statistics, dashboards, executive storytelling.',
      tools: ['SQL', 'Excel', 'Tableau', 'PowerBI', 'Pandas', 'Statsmodels'],
      sampleTask: 'Writing complex SQL window functions to analyze customer retention cohort drop-offs across 12 months.',
      codeSnippet: `-- Data Analyst Task (SQL Retention Cohort)
SELECT 
  cohort_month,
  COUNT(DISTINCT user_id) as total_users,
  ROUND(AVG(monthly_spend), 2) as avg_revenue
FROM user_transactions
GROUP BY cohort_month
ORDER BY cohort_month DESC;`,
    },
    scientist: {
      title: 'Data Scientist',
      icon: <Chemistry size={20} />,
      tagType: 'cyan',
      question: 'Why is this pattern emerging, and can we predict customer churn 30 days in advance?',
      focus: 'Feature engineering, hypothesis testing, statistical distributions, predictive modeling.',
      tools: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-Learn', 'Jupyter'],
      sampleTask: 'Testing statistical significance with ANOVA and training a Logistic Regression model with tuned regularizers to forecast customer churn probabilities.',
      codeSnippet: `# Data Scientist Task (Feature matrix & Logistic Regression)
from sklearn.linear_model import LogisticRegression
import numpy as np

X_train = np.array([[24, 150.0], [52, 490.5], [31, 80.0]])
y_train = np.array([0, 1, 0])
clf = LogisticRegression().fit(X_train, y_train)`,
    },
    ml: {
      title: 'Machine Learning Engineer',
      icon: <Development size={20} />,
      tagType: 'magenta',
      question: 'How do we serve this model to 100,000 requests/sec with sub-10ms latency?',
      focus: 'Model optimization (ONNX, TensorRT), API microservices, CI/CD pipelines, drift monitoring.',
      tools: ['Python', 'FastAPI', 'PyTorch', 'TensorFlow', 'ONNX', 'Kubernetes', 'MLflow'],
      sampleTask: 'Quantizing a model into ONNX format and deploying an asynchronous FastAPI container on Kubernetes with auto-scaling.',
      codeSnippet: `# ML Engineer Task (FastAPI Real-Time Model Server)
from fastapi import FastAPI
app = FastAPI()

@app.post("/predict")
async def infer(payload: UserFeatures):
    vec = np.array(payload.features).reshape(1, -1)
    prob = model.predict_proba(vec)[0][1]
    return {"churn_risk": float(prob)}`,
    },
  };

  const role = roles[selectedRole];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Lab 1.2
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            Industry Role Matrix & Toolchain Inspector
          </h3>
        </div>
        <Tag type="purple" size="md">Select a Career Track</Tag>
      </div>

      {/* Role Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {(['engineer', 'analyst', 'scientist', 'ml'] as RoleKey[]).map((key) => {
          const r = roles[key];
          const isSel = selectedRole === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedRole(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 14px',
                background: isSel ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
                border: isSel ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                color: isSel ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              {r.icon}
              <span>{r.title}</span>
            </button>
          );
        })}
      </div>

      {/* Role Profile Panel */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <Tag type={role.tagType} size="md">
            {role.title}
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', fontStyle: 'italic' }}>
            &ldquo;{role.question}&rdquo;
          </span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Core Responsibilities
          </div>
          <p style={{ margin: 0, color: 'var(--ds-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            {role.focus}
          </p>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Primary Toolchain
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {role.tools.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  background: 'var(--cds-layer-01)',
                  border: '1px solid var(--ds-border-subtle)',
                  borderRadius: '2px',
                  color: 'var(--ds-cyan)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Typical Daily Code Task
          </div>
          <div className="ds-code-window">
            <div className="ds-code-header">
              <span>{role.title} Code Sample</span>
              <span>Python / SQL</span>
            </div>
            <pre className="ds-code-content" style={{ margin: 0 }}>
              <code>{role.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
