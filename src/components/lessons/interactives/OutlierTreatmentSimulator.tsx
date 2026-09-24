'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';

type TreatmentStrategy = 'keep' | 'correct' | 'remove' | 'cap' | 'transform';

export function OutlierTreatmentSimulator() {
  const [strategy, setStrategy] = useState<TreatmentStrategy>('keep');

  const originalData = [10, 11, 12, 13, 14, 100];

  let cleanedData: (number | string)[] = [];
  let sampleSize = 6;
  let meanDisplay = '26.67';
  let medianDisplay = '12.5';
  let stdDisplay = '35.95';
  let strategyDescription = '';
  let engineeringVerdict = '';

  switch (strategy) {
    case 'keep':
      cleanedData = [10, 11, 12, 13, 14, 100];
      sampleSize = 6;
      meanDisplay = '26.67';
      medianDisplay = '12.5';
      stdDisplay = '35.95';
      strategyDescription = 'Retain all observations in their original raw state. No data point is modified or discarded.';
      engineeringVerdict = 'Recommended when 100 is a verified genuine phenomenon (e.g. super-buyer, fraud spike, rare event). Use robust models (Tree-based / Median regression).';
      break;

    case 'correct':
      cleanedData = [10, 11, 12, 13, 14, 15];
      sampleSize = 6;
      meanDisplay = '12.50';
      medianDisplay = '12.5';
      stdDisplay = '1.87';
      strategyDescription = 'Replace the corrupted value (100) with the verified ground-truth measurement (15) obtained from source logs.';
      engineeringVerdict = 'Optimal whenever a clerical typographical typo (e.g. extra zero added) is confirmed by data source audits.';
      break;

    case 'remove':
      cleanedData = [10, 11, 12, 13, 14];
      sampleSize = 5;
      meanDisplay = '12.00';
      medianDisplay = '12.0';
      stdDisplay = '1.58';
      strategyDescription = 'Discard the record containing 100 entirely via listwise deletion.';
      engineeringVerdict = 'Acceptable ONLY when record 100 is provably invalid or from an out-of-scope population. Warning: Drops sample size from 6 to 5 (16.7% data loss).';
      break;

    case 'cap':
      cleanedData = [10, 11, 12, 13, 14, 18];
      sampleSize = 6;
      meanDisplay = '13.00';
      medianDisplay = '12.5';
      stdDisplay = '2.83';
      strategyDescription = 'Winsorization: Clip the extreme value 100 to the 95th percentile / upper fence threshold (18).';
      engineeringVerdict = 'Standard for linear regression and neural networks. Preserves sample size (N=6) while preventing 100 from dominating loss function gradients.';
      break;

    case 'transform':
      // natural log
      cleanedData = [2.30, 2.40, 2.48, 2.56, 2.64, 4.61];
      sampleSize = 6;
      meanDisplay = '2.83';
      medianDisplay = '2.52';
      stdDisplay = '0.88';
      strategyDescription = 'Apply non-linear monotonic transformation: y = ln(x). Compresses extreme exponential magnitudes.';
      engineeringVerdict = 'Ideal for exponential power-law distributions (wealth, city populations, website clicks). Converts multiplicative relationships to additive linear patterns.';
      break;
  }

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
          <Tag type="green" size="md">
            Interactive Lab 2.5.7
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            The 5 Core Treatment Strategies
          </span>
        </div>
        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Active Strategy: {strategy.toUpperCase()}
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Outlier Treatment Simulator: Beyond Blind Deletion
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Original raw dataset: <code style={{ fontFamily: 'var(--ds-font-mono)' }}>[10, 11, 12, 13, 14, 100]</code>.
        Select a remediation strategy below to inspect the mathematical and structural consequences of your decision.
      </p>

      {/* Strategy Switcher Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Button
          size="sm"
          kind={strategy === 'keep' ? 'primary' : 'tertiary'}
          onClick={() => setStrategy('keep')}
        >
          1. Keep (Preserve)
        </Button>
        <Button
          size="sm"
          kind={strategy === 'correct' ? 'primary' : 'tertiary'}
          onClick={() => setStrategy('correct')}
        >
          2. Correct (Fix Typo)
        </Button>
        <Button
          size="sm"
          kind={strategy === 'remove' ? 'primary' : 'tertiary'}
          onClick={() => setStrategy('remove')}
        >
          3. Remove (Filter Row)
        </Button>
        <Button
          size="sm"
          kind={strategy === 'cap' ? 'primary' : 'tertiary'}
          onClick={() => setStrategy('cap')}
        >
          4. Cap (Winsorize)
        </Button>
        <Button
          size="sm"
          kind={strategy === 'transform' ? 'primary' : 'tertiary'}
          onClick={() => setStrategy('transform')}
        >
          5. Transform (Log)
        </Button>
      </div>

      {/* Before & After Dataset Comparison Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Feature State</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-text-muted)' }}>Row 1</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-text-muted)' }}>Row 2</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-text-muted)' }}>Row 3</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-text-muted)' }}>Row 4</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-text-muted)' }}>Row 5</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-amber)' }}>Row 6 (Target)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)', background: 'var(--cds-layer-02)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--ds-text-muted)' }}>Raw Original</td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>10</td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>11</td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>12</td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>13</td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>14</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--ds-amber)', fontWeight: 700 }}>100</td>
            </tr>
            <tr style={{ background: 'var(--ds-bg-core)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--ds-cyan)' }}>Post-Treatment</td>
              {cleanedData.map((val, i) => (
                <td
                  key={i}
                  style={{
                    padding: '10px 12px',
                    textAlign: 'center',
                    fontWeight: i === cleanedData.length - 1 ? 700 : 400,
                    color: i === cleanedData.length - 1 ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                  }}
                >
                  {val}
                </td>
              ))}
              {strategy === 'remove' && (
                <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--ds-text-muted)', fontStyle: 'italic' }}>
                  [Deleted]
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Statistics Output Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ padding: '10px', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Sample Size (N)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)' }}>{sampleSize}</div>
        </div>
        <div style={{ padding: '10px', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Mean (μ)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>{meanDisplay}</div>
        </div>
        <div style={{ padding: '10px', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Median</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)' }}>{medianDisplay}</div>
        </div>
        <div style={{ padding: '10px', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Std Dev (σ)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>{stdDisplay}</div>
        </div>
      </div>

      {/* Engineering Decision Feedback Card */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
          Strategy Description:
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>
          {strategyDescription}
        </p>
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
          <strong>When to Use:</strong> {engineeringVerdict}
        </div>
      </div>
    </div>
  );
}
