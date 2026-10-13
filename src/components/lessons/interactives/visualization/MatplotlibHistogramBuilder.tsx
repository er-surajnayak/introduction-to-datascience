'use client';

import React, { useState } from 'react';
import { Tag, Slider, Checkbox, CodeSnippet } from '@carbon/react';
import { computeHistogramBins } from '@/lib/visualizationUtils';

const DEFAULT_MARKS = [45, 50, 55, 60, 60, 65, 70, 75, 80, 95];

export function MatplotlibHistogramBuilder() {
  const [numBins, setNumBins] = useState<number>(5);
  const [showDensity, setShowDensity] = useState<boolean>(false);

  const bins = computeHistogramBins(DEFAULT_MARKS, numBins);
  const maxMetric = showDensity
    ? Math.max(...bins.map((b) => b.frequencyDensity), 0.1)
    : Math.max(...bins.map((b) => b.count), 1);

  const pythonCode = `import matplotlib.pyplot as plt

marks = [45, 50, 55, 60, 60, 65, 70, 75, 80, 95]

fig, ax = plt.subplots(figsize=(7, 4))

# Generate histogram with ${numBins} contiguous bins
ax.hist(
    marks,
    bins=${numBins},
    density=${showDensity ? 'True' : 'False'},
    color="royalblue",
    edgecolor="black"
)

ax.set_title("Distribution of Student Marks (${numBins} Bins)")
ax.set_xlabel("Marks")
ax.set_ylabel("${showDensity ? 'Frequency Density' : 'Number of Students'}")
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
          <Tag type="cyan" size="md">Section 3.3.7</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Histograms</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Numerical Intervals & Bin Sensitivity
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Matplotlib Histogram: Seeing the Continuous Distribution
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Unlike bar charts that compare isolated labels, histograms partition continuous numerical values into touching intervals. Adjust the bin count slider to see how binning choices alter the visible shape without modifying the raw data.
      </p>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <Slider
            id="hist-bins-slider"
            labelText={`Number of Bins: ${numBins}`}
            min={3}
            max={10}
            step={1}
            value={numBins}
            onChange={({ value }) => setNumBins(Number(value))}
          />
          <div style={{ marginTop: '12px' }}>
            <Checkbox
              id="show-density-cb"
              labelText="Plot Frequency Density (Area = Frequency)"
              checked={showDensity}
              onChange={(_, { checked }) => setShowDensity(checked)}
            />
          </div>
        </div>

        {/* Observation Pill Box */}
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
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
            RAW EXAM SCORES (N = 10)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {DEFAULT_MARKS.map((m, idx) => (
              <span key={idx} style={{ padding: '3px 8px', borderRadius: '3px', background: 'var(--ds-bg-surface)', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', border: '1px solid var(--ds-border-subtle)' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Histogram Display */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <svg viewBox="0 0 500 210" style={{ width: '100%', height: 'auto', maxHeight: '210px' }} role="img" aria-label="Interactive histogram">
          <line x1="60" y1="160" x2="460" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <line x1="60" y1="30" x2="60" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {/* Y Axis Labels */}
          <text x="52" y="34" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">
            {showDensity ? maxMetric.toFixed(2) : maxMetric}
          </text>
          <text x="52" y="164" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">0</text>

          {/* Adjacent Touching Bins */}
          {bins.map((b, idx) => {
            const totalWidth = 380;
            const barWidth = totalWidth / bins.length;
            const x = 70 + idx * barWidth;
            const metricVal = showDensity ? b.frequencyDensity : b.count;
            const barHeight = (metricVal / maxMetric) * 120;
            const y = 160 - barHeight;

            return (
              <g key={idx}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="var(--ds-blue)"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ds-text-primary)">
                  {showDensity ? b.frequencyDensity.toFixed(2) : b.count}
                </text>
                <text x={x + barWidth / 2} y="176" textAnchor="middle" fontSize="9" fill="var(--ds-text-muted)">
                  {Math.round(b.binStart)}–{Math.round(b.binEnd)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Code Snippet */}
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
