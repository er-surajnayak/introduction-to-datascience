'use client';

import React, { useState } from 'react';
import { Tag, Button, CodeSnippet } from '@carbon/react';
import {
  Code,
  PlayFilledAlt,
  Catalog,
  ArrowRight,
  CheckmarkFilled,
  Information,
} from '@carbon/icons-react';

interface CodeStep {
  id: string;
  stage: string;
  title: string;
  code: string;
  output: string;
  explanation: string;
}

const PYTHON_STEPS: CodeStep[] = [
  {
    id: 'step1',
    stage: '1. DATA INGESTION',
    title: 'Loading Raw Observations with NumPy',
    code: `import numpy as np

# 10 student exam marks
marks = np.array([45, 50, 55, 60, 60, 65, 70, 75, 80, 95])
print("Observations count:", len(marks))`,
    output: `Observations count: 10`,
    explanation:
      'We initialize an immutable 1D NumPy ndarray. Contiguous memory storage enables vectorization without Python loop overhead.',
  },
  {
    id: 'step2',
    stage: '2. NUMERICAL PROFILING',
    title: 'Computing Center & Dispersion in Python',
    code: `mean_score = np.mean(marks)
median_score = np.median(marks)
pop_sd = np.std(marks)           # N in denominator
sample_sd = np.std(marks, ddof=1) # n-1 (Bessel's correction)

print(f"Mean: {mean_score:.2f}")
print(f"Median: {median_score:.2f}")
print(f"Population SD: {pop_sd:.2f}")
print(f"Sample SD: {sample_sd:.2f}")`,
    output: `Mean: 65.50
Median: 62.50
Population SD: 14.22
Sample SD: 14.99`,
    explanation:
      'np.std() defaults to population standard deviation (ddof=0). Passing ddof=1 enables Bessel’s correction for unbiased sample standard deviation.',
  },
  {
    id: 'step3',
    stage: '3. FREQUENCY TABLE',
    title: 'Tabulating Value Counts with Pandas',
    code: `import pandas as pd

series = pd.Series(marks)
counts = series.value_counts().sort_index()
rel_freq = series.value_counts(normalize=True).sort_index()
cum_freq = counts.cumsum()

freq_df = pd.DataFrame({
    'Frequency': counts,
    'Rel_Freq': rel_freq,
    'Cumulative': cum_freq
})
print(freq_df)`,
    output: `    Frequency  Rel_Freq  Cumulative
45          1       0.1           1
50          1       0.1           2
55          1       0.1           3
60          2       0.2           5
65          1       0.1           6
70          1       0.1           7
75          1       0.1           8
80          1       0.1           9
95          1       0.1          10`,
    explanation:
      'value_counts() produces raw counts; normalize=True divides each count by n to yield relative frequencies. cumsum() generates cumulative totals.',
  },
  {
    id: 'step4',
    stage: '4. HISTOGRAM PLOT',
    title: 'Visualizing Intervals with Matplotlib',
    code: `import matplotlib.pyplot as plt

plt.figure(figsize=(7, 4))
plt.hist(marks, bins=5, edgecolor="black", color="#0f62fe", alpha=0.8)

# Overlay Mean and Median references
plt.axvline(mean_score, color="#da1e28", linestyle="--", label=f"Mean ({mean_score:.1f})")
plt.axvline(median_score, color="#24a148", linestyle="-", label=f"Median ({median_score:.1f})")

plt.xlabel("Marks")
plt.ylabel("Frequency (Count)")
plt.title("Distribution of Student Exam Marks")
plt.legend()
plt.tight_layout()
plt.show()`,
    output: `<Figure size 700x400 with 1 Axes rendered successfully>`,
    explanation:
      'plt.hist() automatically computes bin boundaries [min, max], aggregates counts per interval, and renders contiguous vertical rectangles.',
  },
];

export function PythonDistributionWalkthrough() {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const current = PYTHON_STEPS[activeStepIdx];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
      }}
    >
      {/* Header Badge & Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Section 3.2.14
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            The Python Connection
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          NumPy &bull; Pandas &bull; Matplotlib
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--ds-text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        From Raw Numbers to Graphical Distributions in Python
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Connect your mathematical understanding directly to code. Walk through the four stages of the Python distribution analysis pipeline:
      </p>

      {/* Pipeline Architecture Diagram */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        {PYTHON_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIdx;
          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => setActiveStepIdx(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  background: isActive ? 'var(--ds-cyan-dim)' : 'transparent',
                  border: isActive ? '1px solid var(--ds-cyan)' : '1px solid transparent',
                  color: isActive ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.75rem',
                  fontFamily: 'var(--ds-font-mono)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{step.stage}</span>
              </button>
              {idx < PYTHON_STEPS.length - 1 && (
                <span style={{ color: 'var(--ds-text-muted)', fontSize: '0.75rem' }}>&rarr;</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Code Snippet and Output Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Code Editor Mock */}
        <div
          style={{
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '8px 12px',
              background: 'var(--cds-layer-02)',
              borderBottom: '1px solid var(--ds-border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--ds-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>{current.title}</span>
            <Tag type="blue" size="sm">
              Python 3.10
            </Tag>
          </div>
          <div style={{ padding: '12px' }}>
            <CodeSnippet type="multi" feedback="Copied to clipboard">
              {current.code}
            </CodeSnippet>
          </div>
        </div>

        {/* Terminal Execution Output */}
        <div
          style={{
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '8px 12px',
              background: 'var(--cds-layer-02)',
              borderBottom: '1px solid var(--ds-border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--ds-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Standard Output (stdout)</span>
            <Tag type="green" size="sm">
              Executed
            </Tag>
          </div>
          <div style={{ padding: '12px' }}>
            <pre
              style={{
                margin: 0,
                fontSize: '0.8125rem',
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-emerald)',
                background: 'var(--cds-layer-01)',
                padding: '12px',
                borderRadius: '3px',
                lineHeight: 1.5,
                overflowX: 'auto',
              }}
            >
              {current.output}
            </pre>
          </div>
        </div>
      </div>

      {/* Step Explanation Callout */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px', fontSize: '0.9375rem' }}>
          Engineering Walkthrough: {current.stage}
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          {current.explanation}
        </p>
      </div>
    </div>
  );
}
