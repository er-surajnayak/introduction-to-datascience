'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Information, ArrowRight } from '@carbon/icons-react';
import { calcFiveNumberSummary, cleanNumbers } from '@/lib/statistics';

export function PercentileAndQuartileRuler() {
  const sampleData = [45, 52, 58, 62, 65, 70, 72, 78, 82, 85, 90, 95];
  const summary = calcFiveNumberSummary(sampleData);

  const [activeSegment, setActiveSegment] = useState<'all' | 'q1' | 'iqr' | 'q3' | 'fiveNum'>('iqr');

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
          <Tag type="purple" size="md">
            Section 20, 21, 22 & 23
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Position, Quartiles & Five-Number Summary
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Middle 50% Spread &bull; Bridge to 3.3 Box Plots
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Position: Percentiles, Quartiles & The Five-Number Summary
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Where does a specific score rank relative to the cohort? A <strong>Percentile</strong> defines the threshold below which a given percentage of observations fall. <strong>Quartiles</strong> divide ordered data into four equal quarters, and the <strong>IQR (Q3 - Q1)</strong> captures the exact spread of the middle 50%.
      </p>

      {/* Segment Selector Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <Button
          size="sm"
          kind={activeSegment === 'iqr' ? 'primary' : 'secondary'}
          onClick={() => setActiveSegment('iqr')}
        >
          Middle 50% (IQR = Q3 - Q1)
        </Button>
        <Button
          size="sm"
          kind={activeSegment === 'fiveNum' ? 'primary' : 'secondary'}
          onClick={() => setActiveSegment('fiveNum')}
        >
          Five-Number Summary
        </Button>
        <Button
          size="sm"
          kind={activeSegment === 'all' ? 'primary' : 'secondary'}
          onClick={() => setActiveSegment('all')}
        >
          Percentile 4-Quarter Ruler
        </Button>
      </div>

      {/* Percentile Ruler Graphic */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          Sorted Ordered Cohort (n = 12): [45, 52, 58, 62, 65, 70, 72, 78, 82, 85, 90, 95]
        </div>

        {/* 4 Quarter Colored Ruler */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', height: '36px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--ds-border-strong)' }}>
            <div
              style={{
                flex: 1,
                background: 'rgba(51, 177, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '2px solid var(--ds-cyan)',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                color: 'var(--ds-cyan)',
              }}
            >
              Bottom 25%
            </div>
            <div
              style={{
                flex: 1,
                background: activeSegment === 'iqr' ? 'var(--ds-purple-dim)' : 'rgba(165, 110, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '2px solid var(--ds-purple)',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                fontWeight: activeSegment === 'iqr' ? 700 : 400,
                color: 'var(--ds-purple)',
              }}
            >
              Q1 to Median (25%)
            </div>
            <div
              style={{
                flex: 1,
                background: activeSegment === 'iqr' ? 'var(--ds-purple-dim)' : 'rgba(165, 110, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '2px solid var(--ds-cyan)',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                fontWeight: activeSegment === 'iqr' ? 700 : 400,
                color: 'var(--ds-purple)',
              }}
            >
              Median to Q3 (25%)
            </div>
            <div
              style={{
                flex: 1,
                background: 'rgba(51, 177, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                color: 'var(--ds-cyan)',
              }}
            >
              Top 25%
            </div>
          </div>

          {/* Tick Label Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
            <span>0% (Min: {summary.min})</span>
            <span style={{ color: 'var(--ds-cyan)' }}>25% (Q1: {summary.q1.toFixed(1)})</span>
            <span style={{ color: 'var(--ds-purple)', fontWeight: 700 }}>50% (Median: {summary.median.toFixed(1)})</span>
            <span style={{ color: 'var(--ds-cyan)' }}>75% (Q3: {summary.q3.toFixed(1)})</span>
            <span>100% (Max: {summary.max})</span>
          </div>
        </div>

        {/* Five-Number Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            fontFamily: 'var(--ds-font-mono)',
            textAlign: 'center',
          }}
        >
          <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Minimum</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>{summary.min}</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--ds-text-muted)', marginTop: '2px' }}>Lowest observation</div>
          </div>

          <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-cyan)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)' }}>Q1 (25th %)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>{summary.q1.toFixed(1)}</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--ds-text-muted)', marginTop: '2px' }}>Lower quartile</div>
          </div>

          <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-purple)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-purple)' }}>Median (Q2)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-purple)' }}>{summary.median.toFixed(1)}</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--ds-text-muted)', marginTop: '2px' }}>50th percentile</div>
          </div>

          <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-cyan)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)' }}>Q3 (75th %)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>{summary.q3.toFixed(1)}</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--ds-text-muted)', marginTop: '2px' }}>Upper quartile</div>
          </div>

          <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Maximum</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>{summary.max}</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--ds-text-muted)', marginTop: '2px' }}>Highest observation</div>
          </div>

          <div style={{ padding: '12px', background: 'var(--ds-purple-dim)', borderRadius: '4px', border: '1px solid var(--ds-purple)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-purple)', fontWeight: 700 }}>IQR (Q3 - Q1)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-purple)' }}>{summary.iqr.toFixed(1)}</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>Middle 50% Span</div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-purple)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Direct Link to Module 2.5:</strong> The IQR outlier rule you learned in Preprocessing relies on this exact foundation!
        Lower Fence = $Q1 - 1.5 \times IQR$ ({summary.lowerFence.toFixed(1)}) and Upper Fence = $Q3 + 1.5 \times IQR$ ({summary.upperFence.toFixed(1)}).
        In Module 3.3, this five-number summary will transform into a visual <strong>Box Plot</strong>.
      </div>
    </div>
  );
}
