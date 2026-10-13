'use client';

import React, { useState } from 'react';
import { Button, Tag } from '@carbon/react';
import { View, Renew } from '@carbon/icons-react';
import { computeHistogramBins } from '@/lib/visualizationUtils';

const RAW_MARKS = [35, 42, 48, 50, 55, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 98];

export function DataVisualizationMystery() {
  const [visualized, setVisualized] = useState(false);
  const [activeBin, setActiveBin] = useState<number | null>(null);

  const bins = computeHistogramBins(RAW_MARKS, 5);
  const maxCount = Math.max(...bins.map((b) => b.count), 1);

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
          <Tag type="cyan" size="md">Section 3.3.1</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>The Visualization Mystery</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          20 Numbers &rarr; Instant Visual Cognition
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Can You Understand an Entire Class by Reading 20 Numbers?
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Below are 20 raw examination marks from a Data Science midterm. When presented as a plain array of digits, the human brain struggles to perceive the overall performance distribution simultaneously.
      </p>

      {/* Raw Data Grid */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          RAW DATASET: marks = [20 observations]
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {RAW_MARKS.map((m, idx) => {
            const inActiveBin =
              activeBin !== null &&
              m >= bins[activeBin].binStart &&
              (activeBin === bins.length - 1 ? m <= bins[activeBin].binEnd : m < bins[activeBin].binEnd);

            return (
              <span
                key={idx}
                style={{
                  padding: '4px 10px',
                  borderRadius: '3px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  background: inActiveBin ? 'var(--ds-blue)' : 'var(--ds-bg-surface)',
                  color: inActiveBin ? '#ffffff' : 'var(--ds-text-primary)',
                  border: '1px solid var(--ds-border-strong)',
                  transition: 'all 0.15s ease',
                }}
              >
                {m}
              </span>
            );
          })}
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Button
          kind="primary"
          renderIcon={visualized ? Renew : View}
          size="md"
          onClick={() => setVisualized(!visualized)}
          style={{ backgroundColor: '#0f62fe' }}
        >
          {visualized ? 'Hide Visualization' : 'Visualize Data & Reveal Structure'}
        </Button>
        <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
          Mean: <strong>69.8</strong> | Range: <strong>35 &ndash; 98</strong>
        </span>
      </div>

      {/* Interactive Visualization Reveal */}
      {visualized && (
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '12px' }}>
            Interactive Distribution Projection (Hover bins to highlight raw marks):
          </div>

          <svg
            viewBox="0 0 600 220"
            style={{ width: '100%', height: 'auto', maxHeight: '220px', overflow: 'visible' }}
            role="img"
            aria-label="Histogram of 20 student examination marks"
          >
            {/* Gridlines */}
            <line x1="60" y1="30" x2="560" y2="30" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />
            <line x1="60" y1="100" x2="560" y2="100" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />
            <line x1="60" y1="170" x2="560" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

            {/* Y Axis Labels */}
            <text x="50" y="35" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{maxCount}</text>
            <text x="50" y="105" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{Math.round(maxCount / 2)}</text>
            <text x="50" y="174" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">0</text>

            {/* Bins */}
            {bins.map((b, idx) => {
              const binWidth = (500 / bins.length) - 8;
              const x = 64 + idx * (binWidth + 8);
              const barHeight = (b.count / maxCount) * 130;
              const y = 170 - barHeight;
              const isHovered = activeBin === idx;

              return (
                <g
                  key={idx}
                  onMouseEnter={() => setActiveBin(idx)}
                  onMouseLeave={() => setActiveBin(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={x}
                    y={y}
                    width={binWidth}
                    height={barHeight}
                    fill={isHovered ? 'var(--ds-cyan)' : 'var(--ds-blue)'}
                    stroke="var(--ds-border-strong)"
                    rx="2"
                    style={{ transition: 'all 0.15s ease' }}
                  />
                  <text
                    x={x + binWidth / 2}
                    y={y - 6}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill={isHovered ? 'var(--ds-cyan)' : 'var(--ds-text-primary)'}
                  >
                    {b.count}
                  </text>
                  <text
                    x={x + binWidth / 2}
                    y="188"
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--ds-text-muted)"
                  >
                    {Math.round(b.binStart)}–{Math.round(b.binEnd)}
                  </text>
                </g>
              );
            })}
          </svg>

          <div
            style={{
              marginTop: '1.25rem',
              padding: '1rem',
              background: 'var(--ds-bg-surface)',
              borderRadius: '4px',
              borderLeft: '4px solid var(--ds-emerald)',
              fontSize: '0.875rem',
              color: 'var(--ds-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <strong>The Cognitive Transformation:</strong> Instead of scanning 20 numbers sequentially, your visual cortex immediately registers that the class is broadly dispersed between 35 and 98 with approximately uniform spread across intervals. <em>Summary statistics gave you the mean (69.8); the visualization gave you the full story.</em>
          </div>
        </div>
      )}
    </div>
  );
}
