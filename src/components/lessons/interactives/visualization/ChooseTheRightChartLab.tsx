'use client';

import React, { useState } from 'react';
import { Tag, Button, InlineNotification } from '@carbon/react';

interface Scenario {
  id: number;
  question: string;
  options: string[];
  correct: string;
  reason: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    question: 'Tracking quarterly company revenue across the past 5 consecutive years.',
    options: ['Line Chart', 'Scatter Plot', 'Pie Chart', 'Violin Plot'],
    correct: 'Line Chart',
    reason: 'Line charts are the gold standard for continuous sequential observations over time.',
  },
  {
    id: 2,
    question: 'Counting how many enrolled engineering students reside in each Indian home state.',
    options: ['Histogram', 'Count Plot / Bar Chart', 'Line Chart', 'KDE Plot'],
    correct: 'Count Plot / Bar Chart',
    reason: 'Home state is an unordered discrete categorical variable; a count plot or bar chart compares counts cleanly.',
  },
  {
    id: 3,
    question: 'Analyzing the shape, skewness, and score concentration of 500 final exam scores.',
    options: ['Histogram', 'Line Chart', 'Pie Chart', 'Heatmap'],
    correct: 'Histogram',
    reason: 'Histograms partition continuous numeric variables into contiguous intervals to reveal distribution geometry.',
  },
  {
    id: 4,
    question: 'Investigating whether weekly study hours are linearly related to student exam marks.',
    options: ['Scatter Plot', 'Pie Chart', 'Count Plot', 'Bar Chart'],
    correct: 'Scatter Plot',
    reason: 'Scatter plots project bivariate numerical pairs onto Cartesian coordinates (X, Y) to explore associations.',
  },
  {
    id: 5,
    question: 'Comparing the median, spread (IQR), and extreme outliers of salary offers across 4 engineering branches.',
    options: ['Grouped Box Plot', 'Line Chart', 'Pie Chart', 'Histogram'],
    correct: 'Grouped Box Plot',
    reason: 'Side-by-side box plots provide instant comparison of medians, quartiles, and outliers across cohorts.',
  },
  {
    id: 6,
    question: 'Estimating a smooth, continuous probability density curve for delivery times.',
    options: ['KDE Plot', 'Pie Chart', 'Bar Chart', 'Count Plot'],
    correct: 'KDE Plot',
    reason: 'Kernel Density Estimation fits smooth bell curves to approximate an underlying continuous probability density.',
  },
  {
    id: 7,
    question: 'Scanning pairwise linear correlation values across 12 numerical census metrics.',
    options: ['Correlation Heatmap', 'Pie Chart', 'Line Chart', 'Box Plot'],
    correct: 'Correlation Heatmap',
    reason: 'A heatmap projects the 12×12 correlation matrix onto an annotated color grid for rapid visual diagnosis.',
  },
  {
    id: 8,
    question: 'Visualizing the market share of the top 3 cloud computing providers out of 100% total cloud spend.',
    options: ['Pie Chart / Donut Chart', 'Scatter Plot', 'Histogram', 'Violin Plot'],
    correct: 'Pie Chart / Donut Chart',
    reason: 'With only 3 categories summing to 100% of a defined whole, a pie/donut chart communicates proportional share.',
  },
];

export function ChooseTheRightChartLab() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

  const scenario = SCENARIOS[currentIdx];

  const handleNext = () => {
    setSelectedOpt(null);
    setCurrentIdx((prev) => (prev + 1) % SCENARIOS.length);
  };

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
          <Tag type="cyan" size="md">Section 3.3.20</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Chart Selection Matrix</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Scenario {currentIdx + 1} of {SCENARIOS.length}
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Choose the Right Chart: The Decision-Making Laboratory
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        A chart is only effective if its visual geometry matches your data types and analytical question. Review the analytical scenario below and select the most appropriate plot.
      </p>

      {/* Scenario Card */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-blue)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '6px' }}>
          Analytical Task:
        </div>
        <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
          &ldquo;{scenario.question}&rdquo;
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1.5rem' }}>
        {scenario.options.map((opt) => {
          const isSelected = selectedOpt === opt;
          return (
            <Button
              key={opt}
              kind={isSelected ? 'primary' : 'ghost'}
              size="md"
              onClick={() => setSelectedOpt(opt)}
              style={{ justifyContent: 'center' }}
            >
              {opt}
            </Button>
          );
        })}
      </div>

      {/* Feedback & Progression */}
      {selectedOpt && (
        <div style={{ marginBottom: '1rem' }}>
          <InlineNotification
            kind={selectedOpt === scenario.correct ? 'success' : 'warning'}
            title={selectedOpt === scenario.correct ? 'Excellent Choice!' : 'Not the Best Fit'}
            subtitle={
              selectedOpt === scenario.correct
                ? scenario.reason
                : `While ${selectedOpt} is a valid chart, ${scenario.correct} is much more effective here because: ${scenario.reason}`
            }
            hideCloseButton
          />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button kind="secondary" size="sm" onClick={handleNext}>
          Next Scenario ({currentIdx + 1}/{SCENARIOS.length}) &rarr;
        </Button>
      </div>
    </div>
  );
}
