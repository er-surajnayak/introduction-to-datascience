'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { Restart, Information } from '@carbon/icons-react';
import { calcMean, calcPopulationVariance, calcSampleVariance } from '@/lib/statistics';

export function VarianceStepVisualizer() {
  const [points, setPoints] = useState<number[]>([40, 50, 60]);
  const [isSampleMode, setIsSampleMode] = useState<boolean>(true);

  const mean = calcMean(points);
  const n = points.length;

  const deviations = points.map((p) => {
    const dev = p - mean;
    return {
      val: p,
      dev,
      sqDev: dev * dev,
    };
  });

  const sumSqDev = deviations.reduce((acc, d) => acc + d.sqDev, 0);
  const variance = isSampleMode ? sumSqDev / (n - 1) : sumSqDev / n;

  const updatePoint = (index: number, val: number) => {
    setPoints((prev) => {
      const copy = [...prev];
      copy[index] = Math.min(90, Math.max(10, val));
      return copy;
    });
  };

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="blue" size="md">
            Section 16 & 17
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Variance Step-by-Step Generator
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Value &rarr; Distance &rarr; Square &rarr; Average
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Variance: Why Deviations Must Be Squared
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        If we measure distance from the mean (xᵢ - x̄), positive and negative differences cancel out to zero. Squaring each distance eliminates negative signs, penalizes large gaps quadratically, and produces <strong>Variance</strong>.
      </p>

      {/* Control Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Formula Mode:</span>
          <Button
            size="sm"
            kind={isSampleMode ? 'primary' : 'secondary'}
            onClick={() => setIsSampleMode(true)}
          >
            Sample Variance s² [÷ (n - 1)]
          </Button>
          <Button
            size="sm"
            kind={!isSampleMode ? 'primary' : 'secondary'}
            onClick={() => setIsSampleMode(false)}
          >
            Population Variance σ² [÷ N]
          </Button>
        </div>

        <Button
          size="sm"
          kind="ghost"
          renderIcon={Restart}
          onClick={() => setPoints([40, 50, 60])}
        >
          Reset [40, 50, 60]
        </Button>
      </div>

      {/* Point Sliders */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {points.map((pt, idx) => (
          <div key={idx} style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--ds-text-muted)' }}>Observation Point {idx + 1}</span>
              <strong style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>{pt}</strong>
            </div>
            <input
              type="range"
              min={10}
              max={90}
              value={pt}
              onChange={(e) => updatePoint(idx, Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--ds-cyan)' }}
            />
          </div>
        ))}
      </div>

      {/* Step-by-Step Table Breakdown */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '10px' }}>
          Step-by-Step Variance Derivation Table (Mean x̄ = {mean.toFixed(1)})
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--ds-border-strong)', color: 'var(--ds-text-muted)' }}>
              <th style={{ padding: '8px' }}>Observation (xᵢ)</th>
              <th style={{ padding: '8px' }}>Mean (x̄)</th>
              <th style={{ padding: '8px' }}>Deviation (xᵢ - x̄)</th>
              <th style={{ padding: '8px' }}>Squared Deviation (xᵢ - x̄)²</th>
            </tr>
          </thead>
          <tbody>
            {deviations.map((d, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', fontWeight: 600, color: 'var(--ds-text-primary)' }}>{d.val}</td>
                <td style={{ padding: '8px', color: 'var(--ds-text-secondary)' }}>{mean.toFixed(1)}</td>
                <td style={{ padding: '8px', color: d.dev < 0 ? '#da1e28' : d.dev > 0 ? 'var(--ds-emerald)' : 'var(--ds-text-muted)' }}>
                  {d.dev > 0 ? `+${d.dev.toFixed(1)}` : d.dev.toFixed(1)}
                </td>
                <td style={{ padding: '8px', fontWeight: 700, color: 'var(--ds-cyan)' }}>
                  {d.sqDev.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr style={{ background: 'var(--ds-bg-core)', fontWeight: 700 }}>
              <td style={{ padding: '10px 8px' }} colSpan={2}>Sum Totals:</td>
              <td style={{ padding: '10px 8px', color: '#da1e28' }}>
                Σ = 0.00 (Cancels!)
              </td>
              <td style={{ padding: '10px 8px', color: 'var(--ds-cyan)' }}>
                Σ(xᵢ - x̄)² = {sumSqDev.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Final Variance Result Box */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontFamily: 'var(--ds-font-mono)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
            {isSampleMode ? 'Sample Variance Formula' : 'Population Variance Formula'}
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--ds-text-primary)' }}>
            {isSampleMode ? (
              <span>s² = Σ(xᵢ - x̄)² / (n - 1) = {sumSqDev.toFixed(1)} / ({n} - 1)</span>
            ) : (
              <span>σ² = Σ(xᵢ - μ)² / N = {sumSqDev.toFixed(1)} / {n}</span>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Computed Variance
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>
            {variance.toFixed(2)}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '1.25rem',
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-blue)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Why n - 1 (Bessel&apos;s Correction)?</strong> In a sample, we calculate deviations from the sample mean <em>x̄</em>, not the unknown true population mean <em>μ</em>. Since <em>x̄</em> is calculated from the sample points themselves, the points cluster artificially closer to <em>x̄</em>, underestimating true variance. Dividing by $n - 1$ fixes this downward bias.
      </div>
    </div>
  );
}
