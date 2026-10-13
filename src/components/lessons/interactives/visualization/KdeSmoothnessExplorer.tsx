'use client';

import React, { useState } from 'react';
import { Tag, Slider, Checkbox, InlineNotification, CodeSnippet } from '@carbon/react';
import { computeHistogramBins, computeKdeDensity } from '@/lib/visualizationUtils';

const MARKS = [45, 48, 52, 55, 60, 62, 65, 70, 72, 75, 78, 82, 88, 92];

export function KdeSmoothnessExplorer() {
  const [bandwidth, setBandwidth] = useState<number>(1.0);
  const [showHist, setShowHist] = useState<boolean>(true);
  const [showKde, setShowKde] = useState<boolean>(true);

  const bins = computeHistogramBins(MARKS, 6);
  const kdePoints = computeKdeDensity(MARKS, 50, bandwidth);

  const maxDensity = Math.max(...kdePoints.map((p) => p.density), 0.05);
  const maxBinDensity = Math.max(...bins.map((b) => b.frequencyDensity), 0.05);
  const overallMax = Math.max(maxDensity, maxBinDensity);

  const minX = 35;
  const maxX = 105;
  const rangeX = maxX - minX;

  const kdePath = kdePoints.reduce((acc, p, idx) => {
    const x = 60 + ((p.x - minX) / rangeX) * 380;
    const y = 160 - (p.density / overallMax) * 120;
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const pythonCode = `import seaborn as sns
import matplotlib.pyplot as plt

marks = [45, 48, 52, 55, 60, 62, 65, 70, 72, 75, 78, 82, 88, 92]

fig, ax = plt.subplots(figsize=(8, 4.5))

# Seaborn histogram with continuous Kernel Density Estimation (KDE)
sns.histplot(
    marks,
    bins=6,
    kde=${showKde ? 'True' : 'False'},
    stat="density",
    color="royalblue",
    edgecolor="black",
    kde_kws={"bw_adjust": ${bandwidth.toFixed(1)}},
    ax=ax
)

ax.set_title("Distribution of Marks (KDE Bandwidth = ${bandwidth.toFixed(1)})")
ax.set_xlabel("Marks")
ax.set_ylabel("Probability Density")

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
          <Tag type="purple" size="md">Section 3.3.15</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Histplot & KDE</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
          Continuous Density Estimation & Bandwidth Sensitivity
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        KDE Smoothness Explorer: Kernel Density Estimation in Seaborn
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        A Kernel Density Estimate (KDE) fits smooth Gaussian bell curves at each observation to approximate a continuous probability density. Adjust the bandwidth parameter to observe how smoothing affects shape perception.
      </p>

      {/* Controls Grid */}
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
            id="kde-bandwidth-slider"
            labelText={`KDE Bandwidth (bw_adjust): ${bandwidth.toFixed(1)}`}
            min={0.3}
            max={2.0}
            step={0.1}
            value={bandwidth}
            onChange={({ value }) => setBandwidth(Number(value))}
          />
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <Checkbox
              id="show-hist-density-cb"
              labelText="Show Histogram"
              checked={showHist}
              onChange={(_, { checked }) => setShowHist(checked)}
            />
            <Checkbox
              id="show-kde-curve-cb"
              labelText="Show KDE Curve"
              checked={showKde}
              onChange={(_, { checked }) => setShowKde(checked)}
            />
          </div>
        </div>

        {/* Bandwidth Interpretation Box */}
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
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
            Bandwidth Diagnosis:
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.4 }}>
            {bandwidth < 0.6 ? (
              <span style={{ color: 'var(--ds-amber)' }}>
                <strong>Under-smoothed (Overfitting):</strong> Low bandwidth produces noisy peaks around individual data points.
              </span>
            ) : bandwidth > 1.5 ? (
              <span style={{ color: 'var(--ds-purple)' }}>
                <strong>Over-smoothed (Information Loss):</strong> High bandwidth blurs real sub-group clusters into a single generic hump.
              </span>
            ) : (
              <span style={{ color: 'var(--ds-emerald)' }}>
                <strong>Balanced Bandwidth:</strong> Captures the underlying continuous distribution without artificial oscillations.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <svg viewBox="0 0 500 200" style={{ width: '100%', height: 'auto', maxHeight: '200px' }} role="img" aria-label="Histogram with KDE curve overlay">
          <line x1="60" y1="160" x2="450" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <line x1="60" y1="30" x2="60" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <text x="52" y="34" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{overallMax.toFixed(3)}</text>
          <text x="52" y="164" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">0</text>

          {/* Histogram Density Rectangles */}
          {showHist &&
            bins.map((b, idx) => {
              const totalW = 380;
              const barW = totalW / bins.length;
              const x = 65 + idx * barW;
              const barH = (b.frequencyDensity / overallMax) * 120;
              const y = 160 - barH;

              return (
                <rect
                  key={idx}
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  fill="var(--ds-blue)"
                  opacity="0.35"
                  stroke="var(--ds-blue)"
                  strokeWidth="1"
                />
              );
            })}

          {/* Smooth Continuous KDE Curve */}
          {showKde && (
            <path
              d={kdePath}
              fill="none"
              stroke="var(--ds-purple)"
              strokeWidth="3"
            />
          )}

          {/* Axis Markings */}
          <text x="60" y="178" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">35</text>
          <text x="250" y="178" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">70</text>
          <text x="440" y="178" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">105</text>
        </svg>
      </div>

      {/* Caution Box */}
      <div style={{ marginBottom: '1.5rem' }}>
        <InlineNotification
          kind="warning"
          title="Analytical Caution with KDE"
          subtitle="KDE curves can spill past natural physical boundaries (e.g. estimating negative prices or exam marks > 100%). Never interpret the vertical height as raw participant counts: it is continuous probability density."
          hideCloseButton
        />
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
