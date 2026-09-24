'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { WarningAlt, CheckmarkFilled, Information, Restart } from '@carbon/icons-react';

export function ZScoreVsIqrExplorer() {
  const [includeExtremeOutlier, setIncludeExtremeOutlier] = useState<boolean>(true);

  // Clean class scores
  const cleanScores = [70, 72, 73, 75, 76, 78, 80];
  // Extreme dataset including 300
  const scores = includeExtremeOutlier ? [...cleanScores, 95, 300] : [...cleanScores, 95];

  // Statistical calculations
  const n = scores.length;
  const mean = scores.reduce((a, b) => a + b, 0) / n;
  const std = Math.sqrt(scores.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1));

  // Sorted for IQR
  const sorted = [...scores].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const iqr = q3 - q1;
  const upperFence = q3 + 1.5 * iqr;

  // Evaluate candidate point: score 95
  const testScore = 95;
  const zScore95 = (testScore - mean) / std;
  const isOutlierZ = Math.abs(zScore95) > 2.0;
  const isOutlierIqr = testScore > upperFence;

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Interactive Lab 2.5.5
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Z-Score vs. IQR Robustness & Masking Effect
          </span>
        </div>
        <Button
          kind="ghost"
          size="sm"
          renderIcon={Restart}
          onClick={() => setIncludeExtremeOutlier(!includeExtremeOutlier)}
        >
          {includeExtremeOutlier ? 'Remove Monster Outlier (300)' : 'Inject Monster Outlier (300)'}
        </Button>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        IQR vs. Z-Score: The Masking Effect
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Z-Score relies on the arithmetic <strong>mean (μ)</strong> and <strong>standard deviation (σ)</strong>.
        Because both metrics incorporate the magnitude of every point, a single gigantic outlier distorts them,
        artificially "masking" other genuine anomalies.
      </p>

      {/* Dataset State Bar */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
          CURRENT DATASET SAMPLES:
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {scores.map((s, idx) => (
            <span
              key={idx}
              style={{
                padding: '4px 10px',
                borderRadius: '3px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.875rem',
                fontWeight: s >= 95 ? 700 : 400,
                background: s === 300 ? 'rgba(218, 30, 40, 0.2)' : s === 95 ? 'rgba(255, 131, 43, 0.2)' : 'var(--ds-bg-core)',
                border: s === 300 ? '1px solid #da1e28' : s === 95 ? '1px solid var(--ds-amber)' : '1px solid var(--ds-border-subtle)',
                color: s === 300 ? '#da1e28' : s === 95 ? 'var(--ds-amber)' : 'var(--ds-text-primary)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Comparison Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Z-Score Panel */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '4px',
            background: 'var(--ds-bg-core)',
            borderTop: '4px solid var(--ds-purple)',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-purple)', marginBottom: '8px' }}>
            Parametric Z-Score Method (z = (x - μ)/σ)
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
            Mean (μ): <strong style={{ color: 'var(--ds-text-primary)' }}>{mean.toFixed(1)}</strong> | Std (σ): <strong style={{ color: 'var(--ds-text-primary)' }}>{std.toFixed(1)}</strong>
          </div>
          <div style={{ padding: '8px', background: 'var(--cds-layer-02)', borderRadius: '4px', fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', marginBottom: '8px' }}>
            z(95) = ({testScore} - {mean.toFixed(1)}) / {std.toFixed(1)} = <strong style={{ color: isOutlierZ ? 'var(--ds-amber)' : 'var(--ds-text-primary)' }}>{zScore95.toFixed(2)}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem' }}>
            <Tag type={isOutlierZ ? 'red' : 'warm-gray'} size="sm">
              {isOutlierZ ? 'Flagged Outlier (|z| > 2)' : 'Masked / Missed (|z| ≤ 2)'}
            </Tag>
          </div>
        </div>

        {/* IQR Panel */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '4px',
            background: 'var(--ds-bg-core)',
            borderTop: '4px solid var(--ds-cyan)',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '8px' }}>
            Non-Parametric IQR Method (Q3 + 1.5×IQR)
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
            Q1: <strong style={{ color: 'var(--ds-text-primary)' }}>{q1}</strong> | Q3: <strong style={{ color: 'var(--ds-text-primary)' }}>{q3}</strong> | IQR: <strong style={{ color: 'var(--ds-text-primary)' }}>{iqr}</strong>
          </div>
          <div style={{ padding: '8px', background: 'var(--cds-layer-02)', borderRadius: '4px', fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', marginBottom: '8px' }}>
            Upper Fence = {q3} + (1.5 × {iqr}) = <strong style={{ color: 'var(--ds-cyan)' }}>{upperFence.toFixed(1)}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem' }}>
            <Tag type={isOutlierIqr ? 'red' : 'green'} size="sm">
              {isOutlierIqr ? `Flagged Outlier (95 > ${upperFence.toFixed(1)})` : 'In-Distribution'}
            </Tag>
          </div>
        </div>
      </div>

      {/* Explanatory Takeaway */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          borderLeft: `4px solid ${includeExtremeOutlier ? 'var(--ds-amber)' : 'var(--ds-emerald)'}`,
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: 'var(--ds-text-secondary)',
        }}
      >
        {includeExtremeOutlier ? (
          <div>
            <strong style={{ color: 'var(--ds-text-primary)' }}>The Masking Effect in Action:</strong> When the monster outlier <strong>300</strong> was introduced,
            the standard deviation exploded to <strong>{std.toFixed(1)}</strong>. This inflated the denominator so much that the genuine outlier <strong>95</strong> only got a z-score of <strong>{zScore95.toFixed(2)}</strong> (below the standard 2.0/3.0 threshold), failing detection!
            Meanwhile, <strong>IQR successfully caught score 95</strong> because rank-ordered quartiles are immune to the magnitude of 300.
          </div>
        ) : (
          <div>
            <strong style={{ color: 'var(--ds-text-primary)' }}>Clean Distribution:</strong> Without the monster outlier, the standard deviation is small ({std.toFixed(1)}), and both Z-Score (z={zScore95.toFixed(2)}) and IQR flag score 95 as an outlier.
          </div>
        )}
      </div>
    </div>
  );
}
