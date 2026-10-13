'use client';

import React from 'react';
import { Tag } from '@carbon/react';
import {
  CheckmarkFilled,
  Analytics,
  DataCategorical,
  Scale,
} from '@carbon/icons-react';

const EIGHT_TAKEAWAYS = [
  'A distribution shows how values are arranged and how frequently they occur across their domain.',
  'Frequency and relative frequency quantify occurrences: relative frequency sums strictly to 1.0 (100%).',
  'Histograms reveal continuous numerical distributions across intervals; adjacent bars touch because the metric domain is continuous.',
  'Symmetry and skewness describe overall geometric shape: skewness describes the elongated tail, not the peak.',
  'Modality describes the number of prominent peaks: bimodal peaks prompt sub-group hypotheses rather than automatic proof.',
  'Spread measures dispersion: same center does NOT imply same spread (Class A SD=2.9 vs Class B SD=25.5).',
  'Extreme values strongly pull the Mean; the Median remains resistant and robust in skewed datasets.',
  'Binning choices alter visual patterns without changing raw observations, so careful interactive inspection is essential.',
];

export function DistributionsTopicSummary() {
  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
      }}
    >
      {/* Header Badge & Title */}
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
          <Tag type="green" size="md">
            Section 3.2.21
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Topic Synthesis
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Master Concept Architecture
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--ds-text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        Topic Summary: The Architecture of Distributions
      </h3>

      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.75rem',
          lineHeight: 1.6,
        }}
      >
        Here is your complete mental model connecting frequencies, shapes, dispersions, and interpretations:
      </p>

      {/* Visual Hierarchy Architecture Tree Card */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '2rem',
        }}
      >
        <pre
          style={{
            margin: 0,
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.8125rem',
            color: 'var(--ds-cyan)',
            lineHeight: 1.5,
            overflowX: 'auto',
          }}
        >
{`                   DISTRIBUTIONS
                         |
        +----------------+----------------+
        |                |                |
     FREQUENCY         SHAPE            SPREAD
        |                |                |
     Counts           Symmetric         Range
     Relative         Right skew        Variance
     Cumulative       Left skew         Std. Dev.
                      Uniform           IQR
                      Unimodal
                      Bimodal
                      Multimodal
                         |
                      OUTLIERS
                         |
                   INTERPRETATION
                         |
                       INSIGHT`}
        </pre>
      </div>

      {/* 8 Core Takeaways Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '1rem' }}>
          Eight Core Takeaways for Data Scientists
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {EIGHT_TAKEAWAYS.map((text, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 14px',
                background: 'var(--ds-bg-surface-elevated)',
                borderRadius: '4px',
                fontSize: '0.875rem',
                color: 'var(--ds-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <CheckmarkFilled size={16} style={{ color: 'var(--ds-emerald)', flexShrink: 0, marginTop: '2px' }} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Student-Facing Golden Quote Callout */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-cyan-dim)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          textAlign: 'center',
        }}
      >
        <blockquote
          style={{
            margin: 0,
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--ds-text-primary)',
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}
        >
          &ldquo;The average tells you where the center is. The distribution helps you understand what happens around that center.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
