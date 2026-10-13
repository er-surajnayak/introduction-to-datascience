'use client';

import React from 'react';
import { Tag } from '@carbon/react';
import { ChartLine, ChartBar, ChartScatter, Dashboard } from '@carbon/icons-react';

export function VisualizationTopicSummary() {
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
          <Tag type="cyan" size="md">Section 3.3.28</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Topic Summary</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          The Architecture of Visual Insight
        </span>
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Data Visualization: Architectural Summary
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
        Here is the integrated conceptual map of everything mastered in Topic 3.3: from object-oriented Matplotlib canvas anatomy to statistical Seaborn distributions and honest data storytelling.
      </p>

      {/* Visual Learning Tree */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.8125rem',
          lineHeight: 1.6,
          color: 'var(--ds-text-primary)',
          overflowX: 'auto',
          marginBottom: '2rem',
        }}
      >
        <div style={{ color: 'var(--ds-cyan)', fontWeight: 700 }}>DATA VISUALIZATION IN EXPLORATORY DATA ANALYSIS</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;+-- <strong style={{ color: 'var(--ds-blue)' }}>MATPLOTLIB (Canvas & Customization Architecture)</strong></div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Line Charts (Sequential trends over ordered intervals)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Bar Charts (Independent category comparison, zero-baseline)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Histograms (Continuous numeric intervals, touching bins)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Scatter Plots (Bivariate coordinate mapping; r &ne; causation)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Box Plots (5-number summaries & 1.5 &times; IQR whiskers)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Pie Charts (Composition &lt; 5 slices; avoid for comparisons)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Subplots (fig, axes = plt.subplots(r, c) layout grids)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;+-- <strong style={{ color: 'var(--ds-purple)' }}>SEABORN (Statistical Semantics & DataFrame Integration)</strong></div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Count Plot (Automated frequency tallies by level)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Histplot & KDE (Continuous Gaussian density curves)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Grouped Box Plots (Side-by-side distribution comparisons)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Violin Plots (Density contour silhouettes & bimodal lobes)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Scatter with Hue (Multidimensional color + shape encodings)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Correlation Heatmaps (Annotated matrix color grids)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;+-- <strong style={{ color: 'var(--ds-emerald)' }}>DATA INTEGRITY & STORYTELLING</strong></div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Honest Baselines (Never truncate magnitude bars)</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- Triple-Pillar Insight (Observation + Evidence + Limitation)</div>
      </div>

      {/* Final Axiom Banner */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontStyle: 'italic', marginBottom: '6px' }}>
          &ldquo;Data visualization is not just plotting numbers. It is making patterns, distributions, and relationships immediately understandable.&rdquo;
        </div>
      </div>
    </div>
  );
}
