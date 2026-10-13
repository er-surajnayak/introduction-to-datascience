'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Button } from '@carbon/react';
import {
  ArrowRight,
  ChartLine,
  Code,
  DataCategorical,
} from '@carbon/icons-react';

export function TransitionToVisualizationLab() {
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
      {/* Header Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Section 3.2.22
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Transition to Next Topic
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Distributions &rarr; Visual Storytelling
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--ds-text-primary)',
          marginBottom: '0.75rem',
        }}
      >
        What If You Could Create and Customize These Visualizations Yourself Using Python?
      </h3>

      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
        }}
      >
        You now understand how distributions behave. You can recognize skewness, identify twin peaks, inspect spread, and understand how histograms partition continuous observations.
      </p>

      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}
      >
        <em>&ldquo;So far, we&apos;ve mostly explored visualizations built for you. What if you could write clean Python code to generate publication-quality statistical plots on demand?&rdquo;</em>
      </p>

      {/* Next Up Preview Box */}
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
          3.3 — Data Visualization Using Matplotlib and Seaborn
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
          Master chart selection rules, customize axes and palettes, build heatmaps, box plots, pair plots, and communicate statistical evidence visually.
        </p>
      </div>

      {/* Next Topic Navigation Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/modules/module-3/data-visualization-and-chart-selection" passHref legacyBehavior>
          <Button kind="primary" renderIcon={ArrowRight} size="lg" style={{ backgroundColor: '#0f62fe' }}>
            Proceed to Topic 3.3: Data Visualization
          </Button>
        </Link>
      </div>
    </div>
  );
}
