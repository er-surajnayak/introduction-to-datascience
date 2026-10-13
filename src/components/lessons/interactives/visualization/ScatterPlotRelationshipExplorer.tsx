'use client';

import React, { useState } from 'react';
import { Tag, Button, InlineNotification, CodeSnippet } from '@carbon/react';
import { Renew } from '@carbon/icons-react';
import { computeCorrelation } from '@/lib/visualizationUtils';

interface ScatterPoint {
  x: number;
  y: number;
  label: string;
}

const PRESETS = {
  positive: {
    title: 'Strong Positive: Study Hours vs Exam Marks',
    xName: 'Study Hours',
    yName: 'Marks',
    points: [
      { x: 1, y: 42, label: 'Student 1' },
      { x: 2, y: 50, label: 'Student 2' },
      { x: 3, y: 55, label: 'Student 3' },
      { x: 4, y: 65, label: 'Student 4' },
      { x: 5, y: 70, label: 'Student 5' },
      { x: 6, y: 82, label: 'Student 6' },
      { x: 7, y: 86, label: 'Student 7' },
      { x: 8, y: 95, label: 'Student 8' },
    ],
  },
  negative: {
    title: 'Strong Negative: Late Night Gaming vs Sleep Duration',
    xName: 'Gaming Hours',
    yName: 'Sleep (Hours)',
    points: [
      { x: 1, y: 8.5, label: 'Person 1' },
      { x: 2, y: 8.0, label: 'Person 2' },
      { x: 3, y: 7.2, label: 'Person 3' },
      { x: 4, y: 6.5, label: 'Person 4' },
      { x: 5, y: 5.8, label: 'Person 5' },
      { x: 6, y: 5.0, label: 'Person 6' },
      { x: 7, y: 4.2, label: 'Person 7' },
      { x: 8, y: 3.5, label: 'Person 8' },
    ],
  },
  none: {
    title: 'No Obvious Association: Shoe Size vs Exam Marks',
    xName: 'Shoe Size',
    yName: 'Marks',
    points: [
      { x: 6, y: 85, label: 'Student 1' },
      { x: 7, y: 52, label: 'Student 2' },
      { x: 8, y: 92, label: 'Student 3' },
      { x: 9, y: 64, label: 'Student 4' },
      { x: 10, y: 78, label: 'Student 5' },
      { x: 7.5, y: 88, label: 'Student 6' },
      { x: 8.5, y: 45, label: 'Student 7' },
      { x: 9.5, y: 70, label: 'Student 8' },
    ],
  },
};

export function ScatterPlotRelationshipExplorer() {
  const [currentPreset, setCurrentPreset] = useState<'positive' | 'negative' | 'none'>('positive');
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const preset = PRESETS[currentPreset];
  const points = preset.points;

  const xVals = points.map((p) => p.x);
  const yVals = points.map((p) => p.y);
  const correlationR = computeCorrelation(xVals, yVals);

  const minX = Math.min(...xVals);
  const maxX = Math.max(...xVals);
  const minY = Math.min(...yVals);
  const maxY = Math.max(...yVals);

  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const pythonCode = `import matplotlib.pyplot as plt

x = [${xVals.join(', ')}]  # ${preset.xName}
y = [${yVals.join(', ')}]  # ${preset.yName}

fig, ax = plt.subplots(figsize=(7, 4.5))

# Scatter plot exploring numerical relationship
ax.scatter(x, y, color="royalblue", s=80, alpha=0.85, edgecolor="white", linewidth=1.5)

ax.set_title("${preset.title}")
ax.set_xlabel("${preset.xName}")
ax.set_ylabel("${preset.yName}")
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
          <Tag type="cyan" size="md">Section 3.3.8</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Scatter Plots</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Bivariate Relationships & Correlation != Causation
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Relationship Explorer: Exploring Two Numerical Variables
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Scatter plots map observations as Cartesian coordinates (X, Y) to explore statistical associations. Select different relationship presets to observe slope directions and cluster patterns.
      </p>

      {/* Presets Toolbar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <Button
          kind={currentPreset === 'positive' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => {
            setCurrentPreset('positive');
            setActivePoint(null);
          }}
        >
          Positive Association
        </Button>
        <Button
          kind={currentPreset === 'negative' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => {
            setCurrentPreset('negative');
            setActivePoint(null);
          }}
        >
          Negative Association
        </Button>
        <Button
          kind={currentPreset === 'none' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => {
            setCurrentPreset('none');
            setActivePoint(null);
          }}
        >
          No Association
        </Button>
      </div>

      {/* SVG Scatter Plot Display */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            {preset.title}
          </span>
          <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
            Sample Correlation r &asymp; <strong>{correlationR}</strong>
          </span>
        </div>

        <svg viewBox="0 0 460 220" style={{ width: '100%', height: 'auto', maxHeight: '220px' }} role="img" aria-label="Scatter plot">
          {/* Gridlines */}
          <line x1="60" y1="40" x2="420" y2="40" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />
          <line x1="60" y1="100" x2="420" y2="100" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />
          <line x1="60" y1="160" x2="420" y2="160" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />

          {/* Axes */}
          <line x1="60" y1="30" x2="60" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <line x1="60" y1="170" x2="420" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {/* Axis Labels */}
          <text x="50" y="34" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{maxY}</text>
          <text x="50" y="174" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{minY}</text>
          <text x="240" y="200" textAnchor="middle" fontSize="11" fill="var(--ds-text-secondary)">{preset.xName} &rarr;</text>
          <text x="20" y="100" textAnchor="middle" fontSize="11" transform="rotate(-90 20 100)" fill="var(--ds-text-secondary)">{preset.yName} &rarr;</text>

          {/* Plotted Scatter Points */}
          {points.map((p, idx) => {
            const cx = 80 + ((p.x - minX) / rangeX) * 320;
            const cy = 160 - ((p.y - minY) / rangeY) * 120;
            const isHovered = activePoint === idx;

            return (
              <g
                key={idx}
                onMouseEnter={() => setActivePoint(idx)}
                onMouseLeave={() => setActivePoint(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 8 : 6}
                  fill={isHovered ? 'var(--ds-cyan)' : 'var(--ds-blue)'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  style={{ transition: 'all 0.15s ease' }}
                />
                {isHovered && (
                  <g>
                    <rect x={cx - 35} y={cy - 24} width="70" height="18" fill="var(--ds-bg-surface)" stroke="var(--ds-border-strong)" rx="2" />
                    <text x={cx} y={cy - 12} textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ds-text-primary)">
                      ({p.x}, {p.y})
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Correlation vs Causation Reminder */}
      <div style={{ marginBottom: '1.5rem' }}>
        <InlineNotification
          kind="info"
          title="Important Analytical Rule: Correlation != Causation"
          subtitle="Even a perfect diagonal alignment (r = 1.0) merely confirms that two metrics co-vary statistically. A scatter plot cannot prove that X physically causes Y. Confounding variables or reverse causality must always be investigated."
          hideCloseButton
        />
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
