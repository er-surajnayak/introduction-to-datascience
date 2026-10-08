'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Button } from '@carbon/react';
import { ArrowRight, DataCategorical, Analytics, ChartLine } from '@carbon/icons-react';

export function TransitionToDistributionsLab() {
  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Section 33 & 34
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Topic Summary & Bridge to 3.2
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Describe &rarr; Compare &rarr; Interpret
        </span>
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Topic Summary: The Statistical Landscape
      </h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
        <em>&ldquo;Statistics don&apos;t tell the whole story. They give us clues.&rdquo;</em> Here is your master diagnostic architecture for summarizing any numerical feature:
      </p>

      {/* Visual Architectural Hierarchy */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ padding: '16px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-blue)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-blue)', fontSize: '0.9375rem', marginBottom: '8px' }}>
            1. CENTER
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
            <li><strong>Mean:</strong> Center of mass</li>
            <li><strong>Median:</strong> Middle rank (robust)</li>
            <li><strong>Mode:</strong> Peak frequency</li>
          </ul>
        </div>

        <div style={{ padding: '16px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-amber)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-amber)', fontSize: '0.9375rem', marginBottom: '8px' }}>
            2. SPREAD
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
            <li><strong>Range:</strong> Max - Min</li>
            <li><strong>Variance:</strong> Squared spread</li>
            <li><strong>Std. Dev:</strong> Spread in original units</li>
          </ul>
        </div>

        <div style={{ padding: '16px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-purple)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-purple)', fontSize: '0.9375rem', marginBottom: '8px' }}>
            3. POSITION
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
            <li><strong>Percentiles:</strong> Relative rank</li>
            <li><strong>Quartiles:</strong> Q1, Q2, Q3</li>
            <li><strong>IQR:</strong> Middle 50% span</li>
          </ul>
        </div>

        <div style={{ padding: '16px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-teal)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-teal)', fontSize: '0.9375rem', marginBottom: '8px' }}>
            4. EXTREMES
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
            <li><strong>Minimum:</strong> Lowest value</li>
            <li><strong>Maximum:</strong> Highest value</li>
            <li><strong>Tukey Fences:</strong> Q1/Q3 ± 1.5×IQR</li>
          </ul>
        </div>
      </div>

      {/* The Mystery Bridge to 3.2 */}
      <div
        style={{
          padding: '1.75rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <ChartLine size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            The Mystery: When Identical Statistics Lie About Shape
          </h4>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          We just summarized datasets into numbers. But numbers alone cannot tell us the <strong>shape</strong> of the data. Consider two different distributions below. Both have an identical mean (x̄ = 50) and identical standard deviation (s = 15), yet their physical geometries tell completely opposite stories:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Shape A: Unimodal Bell Curve */}
          <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '8px' }}>
              Dataset A: Single Bell Peak (Unimodal)
            </div>
            <pre style={{ margin: 0, fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', lineHeight: 1.2 }}>
{`       ●●●●
     ●●●●●●●●
    ●●●●●●●●●●
   ────────────
     Center = 50`}
            </pre>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginTop: '6px' }}>
              Symmetric normal distribution around 50.
            </div>
          </div>

          {/* Shape B: Bimodal Two Peaks */}
          <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-purple)', fontWeight: 600, marginBottom: '8px' }}>
              Dataset B: Two Twin Peaks (Bimodal)
            </div>
            <pre style={{ margin: 0, fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)', lineHeight: 1.2 }}>
{`    ●●●      ●●●
   ●●●●●    ●●●●●
  ●●●●●●●  ●●●●●●●
  ────────────────
     Center = 50`}
            </pre>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginTop: '6px' }}>
              Two sub-populations merged! Almost no one actually sits at 50!
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', fontWeight: 500, marginBottom: '1.5rem' }}>
          <em>&ldquo;What if the shape of the data itself contains information?&rdquo;</em>
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/modules/module-3" passHref legacyBehavior>
            <Button kind="primary" renderIcon={ArrowRight} size="md">
              Proceed to Topic 3.2: Distributions &amp; Skewness
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
