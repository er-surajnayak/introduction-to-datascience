'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  Help,
  DataStructured,
  Clean,
  SearchLocate,
  Analytics,
  ChartLineSmooth,
  DecisionTree,
  ChatBot,
  CheckmarkOutline,
  Restart,
  Repeat,
} from '@carbon/icons-react';

interface StageInfo {
  step: number;
  name: string;
  question: string;
  description: string;
  tools: string[];
  loopBackExample?: string;
}

export function LifecycleExplorer() {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [iterationScenario, setIterationScenario] = useState<string | null>(null);

  const stages: StageInfo[] = [
    {
      step: 1,
      name: 'ASK',
      question: 'What is the actual problem we are trying to solve?',
      description: 'Framing vague business challenges into concrete mathematical or statistical formulations. Defining success metrics (e.g. reducing churn by 5%, minimizing RMSE).',
      tools: ['Product Docs', 'Domain Interviews', 'Metric Formulation'],
      loopBackExample: 'Stakeholders realize initial problem was framed too narrowly; re-defining scope after exploratory phase.',
    },
    {
      step: 2,
      name: 'COLLECT',
      question: 'What data is needed and where does it live?',
      description: 'Ingesting raw logs, relational database tables, third-party REST APIs, IoT sensor telemetry, and web feeds into storage.',
      tools: ['SQL', 'REST APIs', 'Requests', 'BeautifulSoup', 'Kafka'],
      loopBackExample: 'Analysis reveals missing demographic features; returning to data engineering to query historical archives.',
    },
    {
      step: 3,
      name: 'CLEAN',
      question: 'How do we fix noisy, missing, and corrupted records?',
      description: 'Imputing null values, removing duplicate customer IDs, fixing date formats, and treating erroneous sensor readings (-999.0).',
      tools: ['Pandas', 'NumPy', 'Regular Expressions'],
      loopBackExample: 'Model errors trace back to inconsistent category encodings; returning to re-standardize string values.',
    },
    {
      step: 4,
      name: 'EXPLORE',
      question: 'What distributions, anomalies, and patterns exist?',
      description: 'Calculating descriptive statistics (mean, median, standard deviation), detecting skewness, and generating correlation matrices.',
      tools: ['Pandas', 'NumPy', 'Summary Statistics'],
      loopBackExample: 'Correlation heatmap shows severe multicollinearity between two features; pruning redundant columns.',
    },
    {
      step: 5,
      name: 'ANALYZE',
      question: 'Are observed patterns statistically significant or just random luck?',
      description: 'Conducting formal hypothesis tests (t-tests, z-tests, ANOVA), calculating p-values and confidence intervals to validate signals.',
      tools: ['SciPy', 'Statsmodels', 'Hypothesis Tests'],
      loopBackExample: 'A/B test p-value > 0.05 indicates observed lift is statistically insignificant; designing a larger sample test.',
    },
    {
      step: 6,
      name: 'VISUALIZE',
      question: 'How can we visually communicate relationships and distributions?',
      description: 'Building histograms, boxplots for outlier detection, pairplots, and scatter charts with trendlines for human interpretation.',
      tools: ['Matplotlib', 'Seaborn', 'Plotly'],
      loopBackExample: 'Scatter plot reveals a bimodal distribution; prompting a split of the dataset into two distinct customer segments.',
    },
    {
      step: 7,
      name: 'MODEL',
      question: 'Can we build a mathematical algorithm to predict future outcomes?',
      description: 'Feature scaling, splitting data into train/test sets, fitting linear regression or classification algorithms, and tuning hyperparameters.',
      tools: ['Scikit-Learn', 'Linear Regression', 'Cost Functions'],
      loopBackExample: 'High test error (overfitting) necessitates returning to feature engineering to reduce model complexity.',
    },
    {
      step: 8,
      name: 'COMMUNICATE',
      question: 'How do we translate technical equations into business value?',
      description: 'Presenting actionable insights to stakeholders, product managers, and non-technical decision-makers with clear tradeoffs.',
      tools: ['Jupyter Notebooks', 'Dashboards', 'Executive Summaries'],
      loopBackExample: 'Leadership requests financial feasibility estimates before sign-off; adding cost-benefit simulation.',
    },
    {
      step: 9,
      name: 'DECIDE',
      question: 'What concrete action or automated policy is deployed?',
      description: 'Deploying the model to production microservices or executing strategic business interventions based on empirical evidence.',
      tools: ['FastAPI', 'Production Monitoring', 'A/B Testing'],
      loopBackExample: 'Post-deployment monitoring detects statistical data drift after 3 months; triggering automated model retraining.',
    },
  ];

  const current = stages[selectedStep - 1];

  const simulateLoop = (fromStep: number, toStep: number, reason: string) => {
    setSelectedStep(toStep);
    setIterationScenario(`Iterative Loop: While at Stage ${fromStep} (${stages[fromStep - 1].name}), ${reason} → Loop back to Stage ${toStep} (${stages[toStep - 1].name})!`);
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2.5rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Experience 2
          </span>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            The 9-Stage Iterative Data Science Lifecycle
          </h3>
        </div>
        <Tag type="purple" size="md">Iterative Loop Visualizer</Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Data Science is <strong>not a one-way conveyor belt</strong>. It is a highly iterative scientific feedback loop where discoveries in later stages frequently send you back to refine earlier steps.
      </p>

      {/* 9 Stages Horizontal / Grid Stepper */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))',
          gap: '6px',
          marginBottom: '1.5rem',
        }}
      >
        {stages.map((s) => {
          const isSelected = selectedStep === s.step;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => {
                setSelectedStep(s.step);
                setIterationScenario(null);
              }}
              style={{
                padding: '10px 4px',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
                border: isSelected ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.6875rem', color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-muted)' }}>
                0{s.step}
              </span>
              <span>{s.name}</span>
            </button>
          );
        })}
      </div>

      {/* Iteration Banner if active */}
      {iterationScenario && (
        <div
          style={{
            padding: '10px 14px',
            background: 'rgba(138, 63, 252, 0.12)',
            border: '1px solid var(--ds-purple)',
            borderRadius: '4px',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.875rem',
            color: 'var(--ds-purple)',
          }}
        >
          <Repeat size={16} />
          <span>{iterationScenario}</span>
        </div>
      )}

      {/* Stage Detail Card */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Stage {current.step}: {current.name}
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', fontStyle: 'italic' }}>
            &ldquo;{current.question}&rdquo;
          </span>
        </div>

        <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--ds-text-secondary)', marginBottom: '1.25rem' }}>
          {current.description}
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Essential Tools & Artifacts
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {current.tools.map((t) => (
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

        <div
          style={{
            padding: '10px 12px',
            background: 'var(--cds-layer-01)',
            borderLeft: '3px solid var(--ds-purple)',
            borderRadius: '0 3px 3px 0',
            fontSize: '0.8125rem',
            color: 'var(--ds-text-secondary)',
          }}
        >
          <strong style={{ color: 'var(--ds-purple)' }}>Realistic Iteration Trigger:</strong>{' '}
          {current.loopBackExample}
        </div>
      </div>

      {/* Simulated Iteration Triggers */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Test Real-World Feedback Loops:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            type="button"
            onClick={() => simulateLoop(4, 3, 'Found 25% missing values during exploration')}
            style={{
              padding: '6px 12px',
              background: 'var(--cds-layer-02)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '3px',
              color: 'var(--ds-text-secondary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            ⚡ Explore (04) → Clean (03)
          </button>
          <button
            type="button"
            onClick={() => simulateLoop(7, 2, 'Model test accuracy low; need more sensor features')}
            style={{
              padding: '6px 12px',
              background: 'var(--cds-layer-02)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '3px',
              color: 'var(--ds-text-secondary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            ⚡ Model (07) → Collect (02)
          </button>
          <button
            type="button"
            onClick={() => simulateLoop(8, 4, 'Executive asked why outlier subgroup behaves strangely')}
            style={{
              padding: '6px 12px',
              background: 'var(--cds-layer-02)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '3px',
              color: 'var(--ds-text-secondary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            ⚡ Communicate (08) → Explore (04)
          </button>
        </div>
      </div>
    </div>
  );
}
