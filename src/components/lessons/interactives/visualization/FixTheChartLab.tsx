'use client';

import React, { useState } from 'react';
import { Tag, Button, InlineNotification } from '@carbon/react';
import { MisuseOutline, CheckmarkFilled } from '@carbon/icons-react';

export function FixTheChartLab() {
  const [isFixed, setIsFixed] = useState<boolean>(false);

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
          <Tag type="cyan" size="md">Section 3.3.21</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Misleading Charts Clinic</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: isFixed ? 'var(--ds-emerald)' : 'var(--ds-amber)' }}>
          {isFixed ? 'Baseline Restored to 0' : 'Truncated Y-Axis Active'}
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Fix the Chart: Exposing the Truncated Baseline Trick
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        A misleading marketing chart truncates the Y-axis baseline to 95% instead of 0%, making a tiny 1% difference between Product A (98%) and Product B (99%) look like a massive 4&times; visual difference. Toggle the button to fix the chart.
      </p>

      {/* Toggle Button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Button
          kind={isFixed ? 'primary' : 'danger'}
          size="md"
          renderIcon={isFixed ? CheckmarkFilled : MisuseOutline}
          onClick={() => setIsFixed(!isFixed)}
        >
          {isFixed ? 'Revert to Misleading Truncated Chart' : 'Fix the Chart (Anchor Baseline at Zero)'}
        </Button>
      </div>

      {/* SVG Canvas Area */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: isFixed ? '2px solid var(--ds-emerald)' : '2px dashed var(--ds-amber)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: isFixed ? 'var(--ds-emerald)' : 'var(--ds-amber)', marginBottom: '8px' }}>
          {isFixed
            ? 'HONEST REPRESENTATION (Y-Axis: 0% to 100%)'
            : 'DECEPTIVE TRUNCATED CHART (Y-Axis starts at 95%)'}
        </div>

        <svg viewBox="0 0 420 200" style={{ width: '100%', height: 'auto', maxHeight: '200px' }} role="img" aria-label="Comparison between misleading and honest bar chart">
          <line x1="70" y1="20" x2="70" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <line x1="70" y1="160" x2="380" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {isFixed ? (
            // Honest 0-100 baseline
            <g>
              <text x="62" y="34" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">100%</text>
              <text x="62" y="97" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">50%</text>
              <text x="62" y="164" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">0%</text>

              {/* Product A: 98% -> 127px height */}
              <rect x="120" y="32" width="70" height="128" fill="var(--ds-blue)" rx="2" />
              <text x="155" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">98%</text>
              <text x="155" y="178" textAnchor="middle" fontSize="11" fill="var(--ds-text-primary)">Product A</text>

              {/* Product B: 99% -> 129px height */}
              <rect x="250" y="30" width="70" height="130" fill="var(--ds-emerald)" rx="2" />
              <text x="285" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">99%</text>
              <text x="285" y="178" textAnchor="middle" fontSize="11" fill="var(--ds-text-primary)">Product B</text>
            </g>
          ) : (
            // Deceptive 95-100 baseline
            <g>
              <text x="62" y="34" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">100%</text>
              <text x="62" y="97" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">97.5%</text>
              <text x="62" y="164" textAnchor="end" fontSize="10" fill="var(--ds-amber)" fontWeight="bold">95% (Truncated!)</text>

              {/* Product A: 98% -> (98 - 95)/5 = 3/5 = 60% of height = 78px */}
              <rect x="120" y="82" width="70" height="78" fill="var(--ds-blue)" rx="2" />
              <text x="155" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">98%</text>
              <text x="155" y="178" textAnchor="middle" fontSize="11" fill="var(--ds-text-primary)">Product A</text>

              {/* Product B: 99% -> (99 - 95)/5 = 4/5 = 80% of height = 104px */}
              <rect x="250" y="56" width="70" height="104" fill="var(--ds-amber)" rx="2" />
              <text x="285" y="48" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">99%</text>
              <text x="285" y="178" textAnchor="middle" fontSize="11" fill="var(--ds-text-primary)">Product B</text>
            </g>
          )}
        </svg>
      </div>

      {/* Analytical Insight */}
      <InlineNotification
        kind={isFixed ? 'success' : 'error'}
        title={isFixed ? 'Integrity Restored' : 'Deception in Action'}
        subtitle={
          isFixed
            ? 'When the baseline starts honestly at 0%, viewers immediately see that Product A and Product B perform at virtually identical excellence (>98%).'
            : 'Starting the Y-axis at 95% makes Product B appear more than 33% taller than Product A, despite a negligible difference of just 1 percentage point.'
        }
        hideCloseButton
      />
    </div>
  );
}
