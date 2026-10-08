'use client';

import React from 'react';
import { Tag } from '@carbon/react';
import { Information, Scale } from '@carbon/icons-react';
import { calcMean, calcSampleVariance, calcSampleStdDev } from '@/lib/statistics';

export function StandardDeviationComparisonLab() {
  const datasetA = [48, 49, 50, 51, 52];
  const datasetB = [10, 30, 50, 70, 90];

  const meanA = calcMean(datasetA);
  const varA = calcSampleVariance(datasetA);
  const stdA = calcSampleStdDev(datasetA);

  const meanB = calcMean(datasetB);
  const varB = calcSampleVariance(datasetB);
  const stdB = calcSampleStdDev(datasetB);

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
          <Tag type="cyan" size="md">
            Section 18 & 19
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Standard Deviation Comparison
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          s = √s² &bull; Returning to Original Units
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Standard Deviation: Returning to the Original Unit Scale
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        If exam marks are measured in <strong>marks</strong>, variance is measured in <strong>marks²</strong>. Taking the square root restores the metric to the original unit. Standard deviation tells us the typical scale of variation around the mean.
      </p>

      {/* Side-by-Side Dot Plot Visualizers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Dataset A */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
            borderTop: '3px solid var(--ds-emerald)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 600, color: 'var(--ds-emerald)', fontSize: '0.9375rem' }}>
              Dataset A: [48, 49, 50, 51, 52]
            </span>
            <Tag type="green" size="sm">Small SD (Consistent)</Tag>
          </div>

          {/* Number line plot [0 to 100] */}
          <div
            style={{
              position: 'relative',
              height: '90px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              padding: '10px 15px',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '12px',
            }}
          >
            {/* Axis line */}
            <div style={{ position: 'absolute', top: '48px', left: '15px', right: '15px', height: '2px', background: 'var(--ds-border-strong)' }} />

            {/* Shaded +/- 1 SD band */}
            <div
              style={{
                position: 'absolute',
                top: '25px',
                left: `${meanA - stdA}%`,
                width: `${stdA * 2}%`,
                height: '46px',
                background: 'var(--ds-emerald-dim)',
                border: '1px dashed var(--ds-emerald)',
                borderRadius: '3px',
              }}
              title={`±1 SD Band: [${(meanA - stdA).toFixed(1)} to ${(meanA + stdA).toFixed(1)}]`}
            />

            {/* Mean marker line */}
            <div
              style={{
                position: 'absolute',
                top: '15px',
                left: `${meanA}%`,
                width: '2px',
                height: '60px',
                background: 'var(--ds-cyan)',
                zIndex: 2,
              }}
            />

            {/* Observation dots */}
            {datasetA.map((val, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '41px',
                  left: `${val}%`,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--ds-emerald)',
                  border: '2px solid #fff',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                }}
                title={`Value: ${val}`}
              />
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontFamily: 'var(--ds-font-mono)', textAlign: 'center' }}>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Mean (x̄)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>{meanA.toFixed(1)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Variance (s²)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-secondary)' }}>{varA.toFixed(2)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-emerald)' }}>Std Dev (s)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>{stdA.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Dataset B */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
            borderTop: '3px solid #da1e28',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 600, color: '#da1e28', fontSize: '0.9375rem' }}>
              Dataset B: [10, 30, 50, 70, 90]
            </span>
            <Tag type="red" size="sm">Large SD (Volatile)</Tag>
          </div>

          {/* Number line plot [0 to 100] */}
          <div
            style={{
              position: 'relative',
              height: '90px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              padding: '10px 15px',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '12px',
            }}
          >
            {/* Axis line */}
            <div style={{ position: 'absolute', top: '48px', left: '15px', right: '15px', height: '2px', background: 'var(--ds-border-strong)' }} />

            {/* Shaded +/- 1 SD band */}
            <div
              style={{
                position: 'absolute',
                top: '25px',
                left: `${Math.max(2, meanB - stdB)}%`,
                width: `${stdB * 2}%`,
                height: '46px',
                background: 'rgba(218, 30, 40, 0.15)',
                border: '1px dashed #da1e28',
                borderRadius: '3px',
              }}
              title={`±1 SD Band: [${(meanB - stdB).toFixed(1)} to ${(meanB + stdB).toFixed(1)}]`}
            />

            {/* Mean marker line */}
            <div
              style={{
                position: 'absolute',
                top: '15px',
                left: `${meanB}%`,
                width: '2px',
                height: '60px',
                background: 'var(--ds-cyan)',
                zIndex: 2,
              }}
            />

            {/* Observation dots */}
            {datasetB.map((val, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '41px',
                  left: `${val}%`,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#da1e28',
                  border: '2px solid #fff',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                }}
                title={`Value: ${val}`}
              />
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontFamily: 'var(--ds-font-mono)', textAlign: 'center' }}>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Mean (x̄)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>{meanB.toFixed(1)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Variance (s²)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-secondary)' }}>{varB.toFixed(2)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: '#da1e28' }}>Std Dev (s)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#da1e28' }}>{stdB.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Careful Mental Model:</strong> Do NOT say: <em>&ldquo;Every observation is exactly 1 SD away from the mean.&rdquo;</em> That is incorrect. Instead: <strong>A larger standard deviation means observations are generally scattered across a wider perimeter around the center.</strong>
      </div>
    </div>
  );
}
