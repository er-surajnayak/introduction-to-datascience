'use client';

import React, { useState } from 'react';
import { Tag, Button, CodeSnippet } from '@carbon/react';
import { Renew, Add, Subtract } from '@carbon/icons-react';
import { calculateBoxPlotStats } from '@/lib/visualizationUtils';

const DEFAULT_MARKS = [45, 50, 55, 60, 65, 70, 75, 80, 95];

export function BoxPlotInspector() {
  const [data, setData] = useState<number[]>([...DEFAULT_MARKS]);

  const handleAddOutlier = () => {
    if (!data.includes(140)) {
      setData([...data, 140].sort((a, b) => a - b));
    }
  };

  const handleRemoveOutlier = () => {
    setData(data.filter((v) => v !== 140));
  };

  const handleReset = () => {
    setData([...DEFAULT_MARKS]);
  };

  const stats = calculateBoxPlotStats(data);
  const minVal = 30;
  const maxVal = Math.max(...data, 150);
  const range = maxVal - minVal || 1;

  const toY = (val: number) => 170 - ((val - minVal) / range) * 130;

  const pythonCode = `import matplotlib.pyplot as plt

marks = [${data.join(', ')}]

fig, ax = plt.subplots(figsize=(6, 4.5))

# Generate Tukey Boxplot
ax.boxplot(marks, patch_artist=True, boxprops=dict(facecolor="lightblue", color="royalblue"))

ax.set_title("Box Plot of Student Marks")
ax.set_ylabel("Marks")
ax.grid(True, linestyle="--", alpha=0.4)

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
          <Tag type="cyan" size="md">Section 3.3.9</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Box Plots</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Five-Number Summary & 1.5 &times; IQR Whiskers
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Box Plot Inspector: Visualizing Medians & Anomalies
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        A box plot encapsulates the five-number summary: minimum, Q1, median, Q3, and maximum. Whiskers extend to the furthest observations within 1.5 &times; IQR; data points beyond are rendered as individual outliers.
      </p>

      {/* Action Toolbar */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <Button
          kind="secondary"
          size="sm"
          renderIcon={data.includes(140) ? Subtract : Add}
          onClick={data.includes(140) ? handleRemoveOutlier : handleAddOutlier}
        >
          {data.includes(140) ? 'Remove Outlier (140)' : 'Inject Outlier Score (140)'}
        </Button>
        <Button kind="ghost" size="sm" renderIcon={Renew} onClick={handleReset}>
          Reset Dataset
        </Button>
      </div>

      {/* Grid: 5-Number Summary Cards + Box Plot Visualization */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Statistics Grid */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '12px' }}>
            Calculated Five-Number Summary:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Q1 (25th %):</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>{stats.q1.toFixed(1)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Median (Q2):</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>{stats.median.toFixed(1)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Q3 (75th %):</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>{stats.q3.toFixed(1)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>IQR (Q3 - Q1):</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>{stats.iqr.toFixed(1)}</div>
            </div>
          </div>

          <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--ds-text-secondary)', lineHeight: 1.4 }}>
            Whisker bounds: [{stats.lowerWhisker}, {stats.upperWhisker}] | Outliers detected: <strong>{stats.outliers.length}</strong>
          </div>
        </div>

        {/* SVG Box Plot Canvas */}
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
          <svg viewBox="0 0 300 200" style={{ width: '100%', height: 'auto', maxHeight: '200px' }} role="img" aria-label="Tukey box plot">
            {/* Axis */}
            <line x1="60" y1="30" x2="60" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
            <text x="52" y={toY(maxVal) + 4} textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{maxVal}</text>
            <text x="52" y={toY(minVal) + 4} textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{minVal}</text>

            {/* Whiskers */}
            <line x1="150" y1={toY(stats.lowerWhisker)} x2="150" y2={toY(stats.q1)} stroke="var(--ds-border-strong)" strokeWidth="1.5" />
            <line x1="150" y1={toY(stats.q3)} x2="150" y2={toY(stats.upperWhisker)} stroke="var(--ds-border-strong)" strokeWidth="1.5" />

            {/* Whisker Caps */}
            <line x1="130" y1={toY(stats.lowerWhisker)} x2="170" y2={toY(stats.lowerWhisker)} stroke="var(--ds-border-strong)" strokeWidth="1.5" />
            <line x1="130" y1={toY(stats.upperWhisker)} x2="170" y2={toY(stats.upperWhisker)} stroke="var(--ds-border-strong)" strokeWidth="1.5" />

            {/* IQR Box */}
            <rect
              x="110"
              y={toY(stats.q3)}
              width="80"
              height={Math.max(4, toY(stats.q1) - toY(stats.q3))}
              fill="var(--ds-blue)"
              stroke="var(--ds-cyan)"
              strokeWidth="2"
              rx="2"
            />

            {/* Median Line */}
            <line x1="110" y1={toY(stats.median)} x2="190" y2={toY(stats.median)} stroke="#ffffff" strokeWidth="2.5" />

            {/* Outlier Points */}
            {stats.outliers.map((out, idx) => (
              <circle key={idx} cx="150" cy={toY(out)} r="5" fill="var(--ds-purple)" stroke="#ffffff" strokeWidth="1.5" />
            ))}

            <text x="200" y={toY(stats.median) + 4} fontSize="10" fill="var(--ds-cyan)" fontWeight="bold">
              Median: {stats.median.toFixed(1)}
            </text>
          </svg>
        </div>
      </div>

      {/* Generated Code Snippet */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Generated Matplotlib Python Code:
        </div>
        <CodeSnippet type="multi" feedback="Copied to clipboard">
          {pythonCode}
        </CodeSnippet>
      </div>
    </div>
  );
}
