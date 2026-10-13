'use client';

import React, { useState } from 'react';
import { Tag, Button, CodeSnippet } from '@carbon/react';

export function ViolinPlotExplorer() {
  const [viewType, setViewType] = useState<'violin' | 'box'>('violin');

  const pythonCode = `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Cohort": ["Standard", "Standard", "Standard", "Mixed", "Mixed", "Mixed", "Mixed"],
    "Score": [60, 65, 70, 40, 42, 85, 90]
})

fig, ax = plt.subplots(figsize=(7, 4.5))

# ${viewType === 'violin' ? 'Seaborn violinplot reveals density contours and twin peaks' : 'Seaborn boxplot shows quartiles and medians'}
${
  viewType === 'violin'
    ? 'sns.violinplot(data=df, x="Cohort", y="Score", palette="muted", inner="quartile", ax=ax)'
    : 'sns.boxplot(data=df, x="Cohort", y="Score", palette="muted", ax=ax)'
}

ax.set_title("Distribution Shape Comparison (${viewType.toUpperCase()})")
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
          <Tag type="purple" size="md">Section 3.3.17</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Violin Plots</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
          Mirrored Density Curves & Multi-Peak Detection
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Box vs Violin: Unmasking Hidden Bimodal Distributions
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        While a box plot only depicts five summary statistics, a violin plot adds a symmetric Kernel Density Estimation curve on both sides. This immediately reveals twin peaks (bimodality) that box plots conceal.
      </p>

      {/* Switcher Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <Button
          kind={viewType === 'violin' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setViewType('violin')}
        >
          View as Violin Plot
        </Button>
        <Button
          kind={viewType === 'box' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setViewType('box')}
        >
          View as Box Plot
        </Button>
      </div>

      {/* SVG Canvas Area */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <svg viewBox="0 0 400 200" style={{ width: '100%', height: 'auto', maxHeight: '200px' }} role="img" aria-label="Violin plot vs box plot comparison">
          {/* Axes */}
          <line x1="60" y1="20" x2="60" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <line x1="60" y1="160" x2="360" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <text x="50" y="30" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">100</text>
          <text x="50" y="95" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">65</text>
          <text x="50" y="164" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">30</text>

          {viewType === 'violin' ? (
            // Violin Representations
            <g>
              {/* Cohort 1: Unimodal standard */}
              <g transform="translate(130, 0)">
                <path
                  d="M 0 40 C 25 60, 30 90, 0 150 C -30 90, -25 60, 0 40 Z"
                  fill="var(--ds-blue)"
                  opacity="0.6"
                  stroke="var(--ds-blue)"
                  strokeWidth="1.5"
                />
                <line x1="0" y1="75" x2="0" y2="115" stroke="#ffffff" strokeWidth="4" />
                <circle cx="0" cy="95" r="3" fill="#ffffff" />
                <text x="0" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">
                  Standard (Unimodal)
                </text>
              </g>

              {/* Cohort 2: Bimodal twin peaks */}
              <g transform="translate(270, 0)">
                <path
                  d="M 0 35 C 32 50, 8 90, 30 130 C 15 155, 0 160, 0 160 C 0 160, -15 155, -30 130 C -8 90, -32 50, 0 35 Z"
                  fill="var(--ds-purple)"
                  opacity="0.6"
                  stroke="var(--ds-purple)"
                  strokeWidth="1.5"
                />
                <line x1="0" y1="65" x2="0" y2="135" stroke="#ffffff" strokeWidth="4" />
                <circle cx="0" cy="100" r="3" fill="#ffffff" />
                <text x="0" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">
                  Mixed (Bimodal!)
                </text>
              </g>
            </g>
          ) : (
            // Box Plot Representations
            <g>
              {/* Cohort 1 Box */}
              <g transform="translate(130, 0)">
                <line x1="0" y1="45" x2="0" y2="75" stroke="var(--ds-blue)" strokeWidth="1.5" />
                <line x1="0" y1="115" x2="0" y2="145" stroke="var(--ds-blue)" strokeWidth="1.5" />
                <rect x="-25" y="75" width="50" height="40" fill="var(--ds-blue)" opacity="0.7" rx="2" />
                <line x1="-25" y1="95" x2="25" y2="95" stroke="#ffffff" strokeWidth="2.5" />
                <text x="0" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">
                  Standard
                </text>
              </g>

              {/* Cohort 2 Box */}
              <g transform="translate(270, 0)">
                <line x1="0" y1="40" x2="0" y2="70" stroke="var(--ds-purple)" strokeWidth="1.5" />
                <line x1="0" y1="130" x2="0" y2="155" stroke="var(--ds-purple)" strokeWidth="1.5" />
                <rect x="-25" y="70" width="50" height="60" fill="var(--ds-purple)" opacity="0.7" rx="2" />
                <line x1="-25" y1="100" x2="25" y2="100" stroke="#ffffff" strokeWidth="2.5" />
                <text x="0" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">
                  Mixed
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Discovery Card */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
          marginBottom: '1.5rem',
        }}
      >
        <strong>What the Box Plot Missed:</strong> Switch to the Box Plot view: the &ldquo;Mixed&rdquo; cohort looks like an ordinary wide box. But switch back to the Violin Plot: two prominent lobes immediately emerge (one cluster scoring ~40, another scoring ~88). The violin plot unmasks the underlying sub-groups!
      </div>

      {/* Code Snippet */}
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
