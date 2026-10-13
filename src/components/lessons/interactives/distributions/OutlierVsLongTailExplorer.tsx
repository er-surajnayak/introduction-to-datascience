'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  WarningAlt,
  DataCategorical,
  CheckmarkFilled,
  CloseFilled,
  Help,
  Information,
} from '@carbon/icons-react';

const ISOLATED_OUTLIER_DATA = [10, 11, 12, 13, 14, 15, 16, 100];
const LONG_TAIL_DATA = [10, 12, 15, 18, 22, 28, 36, 48, 65, 90];

export function OutlierVsLongTailExplorer() {
  const [activeMode, setActiveMode] = useState<'outlier' | 'longtail'>('outlier');
  const [deleteAnswer, setDeleteAnswer] = useState<boolean | null>(null);

  const isOutlier = activeMode === 'outlier';
  const data = isOutlier ? ISOLATED_OUTLIER_DATA : LONG_TAIL_DATA;

  // Scale 0 to 110
  const maxVal = 110;
  const svgW = 580;
  const svgH = 80;
  const scaleX = (val: number) => 25 + (val / maxVal) * (svgW - 50);

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
          <Tag type="cyan" size="md">
            Section 3.2.10
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Outliers vs. Long Tails
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Point Anomaly vs Distribution Geometry
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--ds-text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        Outliers and Long Tails Are Not Interchangeable Concepts
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        An <strong>outlier</strong> is an individual observation that sits isolated from the crowd under a chosen detection rule. A <strong>long tail</strong> describes the overarching geometrical decay of an entire distribution. Compare the two patterns below:
      </p>

      {/* Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <Button
          size="sm"
          kind={isOutlier ? 'primary' : 'secondary'}
          renderIcon={WarningAlt}
          onClick={() => setActiveMode('outlier')}
        >
          Pattern 1: Isolated Outlier [10..16, 100]
        </Button>
        <Button
          size="sm"
          kind={!isOutlier ? 'primary' : 'secondary'}
          renderIcon={DataCategorical}
          onClick={() => setActiveMode('longtail')}
        >
          Pattern 2: Continuous Long Tail [10..90]
        </Button>
      </div>

      {/* Plotted Dot Diagram */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8125rem' }}>
          <span style={{ fontWeight: 600, color: isOutlier ? 'var(--ds-amber)' : 'var(--ds-blue)' }}>
            {isOutlier ? 'Isolated Anomaly (Notice the 84-point empty gap)' : 'Continuous Asymptotic Decay (Progressively sparser spacing)'}
          </span>
          <span style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
            Dataset: [{data.join(', ')}]
          </span>
        </div>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label={isOutlier ? 'Isolated outlier plot' : 'Long tail plot'}
        >
          {/* Axis */}
          <line x1="20" y1="45" x2={svgW - 20} y2="45" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {/* Void indicator for outlier */}
          {isOutlier && (
            <g>
              <rect
                x={scaleX(16)}
                y="30"
                width={scaleX(100) - scaleX(16)}
                height="30"
                fill="rgba(241, 194, 27, 0.1)"
                stroke="var(--ds-amber)"
                strokeDasharray="4 2"
                strokeWidth="1"
                rx="2"
              />
              <text
                x={(scaleX(16) + scaleX(100)) / 2}
                y="48"
                fill="var(--ds-amber)"
                fontSize="10"
                fontFamily="var(--ds-font-mono)"
                fontWeight="700"
                textAnchor="middle"
              >
                Empty Gap / Void (Δ = 84)
              </text>
            </g>
          )}

          {/* Long tail contour curve */}
          {!isOutlier && (
            <path
              d={`M ${scaleX(10)} 15 Q ${scaleX(25)} 25 ${scaleX(45)} 38 T ${scaleX(90)} 45`}
              fill="none"
              stroke="var(--ds-blue)"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          )}

          {/* Dots */}
          {data.map((val, idx) => {
            const isExtreme = val >= 90;
            return (
              <circle
                key={idx}
                cx={scaleX(val)}
                cy="45"
                r={isExtreme ? 8 : 6}
                fill={isExtreme ? 'var(--ds-amber)' : 'var(--ds-cyan)'}
                stroke="#fff"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Scale labels */}
          <text x="25" y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">0</text>
          <text x={scaleX(25)} y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">25</text>
          <text x={scaleX(50)} y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">50</text>
          <text x={scaleX(75)} y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">75</text>
          <text x={scaleX(100)} y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">100</text>
        </svg>
      </div>

      {/* Comparison Dossier Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-amber)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-amber)', marginBottom: '4px', fontSize: '0.875rem' }}>
            AN ISOLATED OUTLIER
          </div>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
            A single observation separated from the cluster by a wide, empty gulf. May arise from human typing error (e.g. typing 100 instead of 10) OR a genuine extraordinary event.
          </p>
        </div>

        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-blue)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-blue)', marginBottom: '4px', fontSize: '0.875rem' }}>
            AN INHERENT LONG TAIL
          </div>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
            A continuous, geometric tapering where observations gradually thin out into extreme territory. Found in wealth, city populations, server latency, and earthquake magnitudes.
          </p>
        </div>
      </div>

      {/* Critical Student Investigation Check */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
          Investigation Check: Should every extreme observation automatically be deleted?
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button
            size="sm"
            kind={deleteAnswer === false ? 'primary' : 'secondary'}
            onClick={() => setDeleteAnswer(false)}
          >
            No! Never automatically delete
          </Button>
          <Button
            size="sm"
            kind={deleteAnswer === true ? 'primary' : 'secondary'}
            onClick={() => setDeleteAnswer(true)}
          >
            Yes, always delete to make data normal
          </Button>
        </div>

        {deleteAnswer !== null && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '4px',
              background: deleteAnswer === false ? 'var(--ds-emerald-dim)' : 'rgba(218, 30, 40, 0.1)',
              borderLeft: deleteAnswer === false ? '4px solid var(--ds-emerald)' : '4px solid #da1e28',
              fontSize: '0.875rem',
              color: 'var(--ds-text-primary)',
            }}
          >
            {deleteAnswer === false ? (
              <div>
                <strong>Correct!</strong> Extreme values often represent genuine real-world phenomena (e.g. unicorn startup exits, major earthquake shocks, record sales). Deleting genuine data creates false, dangerous confidence. Only eliminate verified measurement or data-entry errors!
              </div>
            ) : (
              <div>
                <strong>Danger!</strong> Forcing data to look normal by trimming extreme values destroys vital signal. If a bank deletes extreme fraud transactions, its fraud detection models will fail completely in production!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
