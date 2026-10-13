'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Button } from '@carbon/react';
import { ArrowRight, ChartScatter } from '@carbon/icons-react';

export function TransitionToCorrelationLab() {
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">Section 3.3.28</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Transition to Next Topic</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Visualization &rarr; Mathematical Correlation
        </span>
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        We Can Now See the Relationship. But How Do We Measure Its Mathematical Strength?
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        You can now select the right chart, configure Matplotlib canvas subplots, map multidimensional categories using Seaborn hue encodings, and diagnose distributions with KDE and box plots.
      </p>

      {/* Bridge Box */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-blue)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '4px' }}>
          NEXT TOPIC IN MODULE 3:
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          3.4 — Correlation & Multicollinearity
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
          Move from qualitative scatter plot trends to rigorous mathematical coefficients: Pearson&apos;s r, Spearman&apos;s rank &rho;, Kendall&apos;s &tau;, covariance matrices, and detecting harmful multicollinearity in feature sets.
        </p>
      </div>

      {/* Navigation Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/modules/module-3/correlation-and-multicollinearity" passHref legacyBehavior>
          <Button kind="primary" renderIcon={ArrowRight} size="lg" style={{ backgroundColor: '#0f62fe' }}>
            Proceed to Topic 3.4: Correlation
          </Button>
        </Link>
      </div>
    </div>
  );
}
