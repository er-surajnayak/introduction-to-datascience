'use client';

import React, { useState } from 'react';
import { Tag, Button, CodeSnippet } from '@carbon/react';
import { calculateBoxPlotStats } from '@/lib/visualizationUtils';

const DEFAULT_CLASS_A = [65, 70, 75, 80];
const DEFAULT_CLASS_B = [55, 60, 85, 95];

export function SeabornBoxPlotLab() {
  const [dataA] = useState<number[]>([...DEFAULT_CLASS_A]);
  const [dataB] = useState<number[]>([...DEFAULT_CLASS_B]);

  const statsA = calculateBoxPlotStats(dataA);
  const statsB = calculateBoxPlotStats(dataB);

  const minVal = 40;
  const maxVal = 100;
  const range = maxVal - minVal;

  const toY = (val: number) => 170 - ((val - minVal) / range) * 130;

  const pythonCode = `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Class": ["A", "A", "A", "A", "B", "B", "B", "B"],
    "Marks": [65, 70, 75, 80, 55, 60, 85, 95]
})

fig, ax = plt.subplots(figsize=(7, 4.5))

# Grouped Seaborn boxplot comparing distributions across cohorts
sns.boxplot(data=df, x="Class", y="Marks", palette=["#4589ff", "#a56eff"], ax=ax)

ax.set_title("Exam Mark Distributions: Class A vs Class B")
ax.set_xlabel("Section")
ax.set_ylabel("Marks")
ax.grid(True, linestyle="--", alpha=0.3)

plt.tight_layout()
plt.show()`;

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">Section 3.3.16</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Seaborn Box Plot</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
          Side-by-Side Distribution Comparison
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Class Comparison Lab: Evaluating Group Medians and Spread
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Placing box plots side-by-side using Seaborn allows instantaneous comparison of medians, variability (IQR), and skewness across multiple experimental cohorts.
      </p>

      {/* Grid: Stats Cards + Dual Box Plot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Summary Metrics */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '12px' }}>
            Cohort Comparison Metrics:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface)', borderRadius: '3px', borderLeft: '3px solid var(--ds-blue)' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>Class A (Consistent Cohort)</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
                Median: <strong>{statsA.median}</strong> | IQR: <strong>{statsA.iqr}</strong> | Spread: [{statsA.min}, {statsA.max}]
              </div>
            </div>

            <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface)', borderRadius: '3px', borderLeft: '3px solid var(--ds-purple)' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>Class B (High-Variance Cohort)</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
                Median: <strong>{statsB.median}</strong> | IQR: <strong>{statsB.iqr}</strong> | Spread: [{statsB.min}, {statsB.max}]
              </div>
            </div>
          </div>

          <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--ds-text-muted)', lineHeight: 1.4 }}>
            Notice that while Class A is tightly bunched around 72.5, Class B spans an extreme 40-mark range from 55 to 95.
          </div>
        </div>

        {/* Right: SVG Dual Box Plots */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 340 200" style={{ width: '100%', height: 'auto', maxHeight: '200px' }} role="img" aria-label="Side-by-side boxplots for Class A and B">
            {/* Axis */}
            <line x1="50" y1="30" x2="50" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
            <line x1="50" y1="170" x2="310" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
            <text x="42" y={toY(100) + 4} textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">100</text>
            <text x="42" y={toY(70) + 4} textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">70</text>
            <text x="42" y={toY(40) + 4} textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">40</text>

            {/* Class A Boxplot */}
            <g>
              <line x1="120" y1={toY(statsA.min)} x2="120" y2={toY(statsA.q1)} stroke="var(--ds-blue)" strokeWidth="1.5" />
              <line x1="120" y1={toY(statsA.q3)} x2="120" y2={toY(statsA.max)} stroke="var(--ds-blue)" strokeWidth="1.5" />
              <rect x="90" y={toY(statsA.q3)} width="60" height={Math.max(4, toY(statsA.q1) - toY(statsA.q3))} fill="var(--ds-blue)" opacity="0.7" rx="2" />
              <line x1="90" y1={toY(statsA.median)} x2="150" y2={toY(statsA.median)} stroke="#ffffff" strokeWidth="2.5" />
              <text x="120" y="186" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">Class A</text>
            </g>

            {/* Class B Boxplot */}
            <g>
              <line x1="240" y1={toY(statsB.min)} x2="240" y2={toY(statsB.q1)} stroke="var(--ds-purple)" strokeWidth="1.5" />
              <line x1="240" y1={toY(statsB.q3)} x2="240" y2={toY(statsB.max)} stroke="var(--ds-purple)" strokeWidth="1.5" />
              <rect x="210" y={toY(statsB.q3)} width="60" height={Math.max(4, toY(statsB.q1) - toY(statsB.q3))} fill="var(--ds-purple)" opacity="0.7" rx="2" />
              <line x1="210" y1={toY(statsB.median)} x2="270" y2={toY(statsB.median)} stroke="#ffffff" strokeWidth="2.5" />
              <text x="240" y="186" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">Class B</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Generated Code */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Matching Seaborn Python Script:
        </div>
        <CodeSnippet type="multi" feedback="Copied to clipboard">
          {pythonCode}
        </CodeSnippet>
      </div>
    </div>
  );
}
