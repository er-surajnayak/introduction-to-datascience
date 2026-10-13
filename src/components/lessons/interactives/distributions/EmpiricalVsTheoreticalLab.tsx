'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  DataCategorical,
  Analytics,
  Compare,
  CheckmarkFilled,
  Information,
} from '@carbon/icons-react';
import {
  calcHistogramBins,
  calcMean,
  calcSampleStdDev,
  generateNormalCurvePoints,
} from '@/lib/distributionStats';

// Sample empirical dataset with natural real-world bumps (n=40)
const OBSERVED_EXAM_SCORES = [
  45, 48, 50, 52, 53, 55, 57, 58, 60, 61,
  62, 63, 63, 64, 65, 65, 66, 67, 68, 68,
  69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
  79, 80, 82, 84, 85, 87, 88, 90, 92, 95,
];

export function EmpiricalVsTheoreticalLab() {
  const [viewMode, setViewMode] = useState<'both' | 'empirical' | 'theoretical'>('both');

  const mean = calcMean(OBSERVED_EXAM_SCORES);
  const std = calcSampleStdDev(OBSERVED_EXAM_SCORES);

  const hist = calcHistogramBins(OBSERVED_EXAM_SCORES, 8);
  const curvePoints = generateNormalCurvePoints(mean, std, 60, 3.2);

  const maxDensity = Math.max(...hist.bins.map((b) => b.density), 0.035);

  const svgW = 580;
  const svgH = 200;
  const pad = { top: 20, right: 20, bottom: 35, left: 45 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;
  const barW = plotW / Math.max(1, hist.bins.length);

  // SVG coordinate transformation
  const minX = hist.minVal;
  const maxX = hist.maxVal;
  const mapX = (xVal: number) => pad.left + ((xVal - minX) / (maxX - minX)) * plotW;
  const mapY = (yVal: number) => pad.top + plotH - (yVal / maxDensity) * plotH;

  const curveSvgPath = curvePoints
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${mapX(pt.x)} ${mapY(pt.y)}`)
    .join(' ');

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
            Section 3.2.11
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Empirical vs. Theoretical Distributions
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Observed Data &ne; Mathematical Model
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
        Observed Evidence vs. Mathematical Idealization
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        An <strong>empirical distribution</strong> reflects actual observations collected from the world, containing natural bumps and sample noise. A <strong>theoretical distribution</strong> is a smooth mathematical abstraction. Toggle the views below to see how a model approximates reality:
      </p>

      {/* Control Switcher Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <Button
          size="sm"
          kind={viewMode === 'both' ? 'primary' : 'secondary'}
          renderIcon={Compare}
          onClick={() => setViewMode('both')}
        >
          Overlay Both (Model vs Reality)
        </Button>
        <Button
          size="sm"
          kind={viewMode === 'empirical' ? 'primary' : 'secondary'}
          renderIcon={DataCategorical}
          onClick={() => setViewMode('empirical')}
        >
          Empirical Data Only (Sample Bins)
        </Button>
        <Button
          size="sm"
          kind={viewMode === 'theoretical' ? 'primary' : 'secondary'}
          renderIcon={Analytics}
          onClick={() => setViewMode('theoretical')}
        >
          Theoretical Model Only (Gaussian Curve)
        </Button>
      </div>

      {/* SVG Canvas Comparison */}
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
          <span style={{ color: 'var(--ds-text-secondary)', fontWeight: 600 }}>
            {viewMode === 'both'
              ? 'Empirical Density Bins (Blue) + Fitted Gaussian Model (Cyan Line)'
              : viewMode === 'empirical'
              ? 'Raw Sample Histogram (n=40 observations)'
              : `Fitted Theoretical Curve: N(μ=${mean.toFixed(1)}, σ=${std.toFixed(1)})`}
          </span>
          <span style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
            Mean = {mean.toFixed(1)} | SD = {std.toFixed(1)}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label="Empirical vs theoretical distribution plot"
        >
          {/* Baseline axis */}
          <line x1={pad.left} y1={pad.top + plotH} x2={svgW - pad.right} y2={pad.top + plotH} stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {/* Empirical Histogram Bins */}
          {(viewMode === 'both' || viewMode === 'empirical') &&
            hist.bins.map((bin, idx) => {
              const x = pad.left + idx * barW;
              const h = (bin.density / maxDensity) * plotH;
              const y = pad.top + plotH - h;
              return (
                <rect
                  key={idx}
                  x={x}
                  y={y}
                  width={Math.max(1, barW - 1)}
                  height={h}
                  fill="var(--ds-blue)"
                  opacity="0.65"
                  stroke="var(--ds-cyan)"
                  strokeWidth="1"
                />
              );
            })}

          {/* Theoretical Smooth Curve */}
          {(viewMode === 'both' || viewMode === 'theoretical') && (
            <path
              d={curveSvgPath}
              fill="none"
              stroke="var(--ds-cyan)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {/* Mean Center line */}
          <line
            x1={mapX(mean)}
            y1={pad.top}
            x2={mapX(mean)}
            y2={pad.top + plotH}
            stroke="#da1e28"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x={mapX(mean)}
            y={pad.top - 4}
            fill="#fa4d56"
            fontSize="9"
            fontFamily="var(--ds-font-mono)"
            textAnchor="middle"
          >
            μ={mean.toFixed(1)}
          </text>

          {/* X axis interval labels */}
          <text x={pad.left} y={svgH - 8} fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">
            {Math.round(minX)}
          </text>
          <text x={mapX(mean)} y={svgH - 8} fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">
            {Math.round(mean)}
          </text>
          <text x={svgW - pad.right} y={svgH - 8} fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">
            {Math.round(maxX)}
          </text>
        </svg>
      </div>

      {/* Conceptual Contrast Dossier */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-blue)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-blue)', marginBottom: '4px', fontSize: '0.875rem' }}>
            EMPIRICAL DISTRIBUTION (OBSERVED REALITY)
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
            <li>Generated from real-world data collection and sensor measurements.</li>
            <li>Contains random sampling noise, gaps, and imperfect asymmetry.</li>
            <li>Sum of relative frequencies = 1.0 across observed sample.</li>
          </ul>
        </div>

        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-cyan)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px', fontSize: '0.875rem' }}>
            THEORETICAL DISTRIBUTION (MATHEMATICAL MODEL)
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
            <li>Governed by an exact analytical formula (e.g., Gaussian density).</li>
            <li>Infinitely smooth; completely free of sampling noise.</li>
            <li>Used to make probabilistic inferences and compute p-values.</li>
          </ul>
        </div>
      </div>

      {/* Warning Alert */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px', fontSize: '0.9375rem' }}>
          Philosophical Warning: "All Models Are Wrong, But Some Are Useful"
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          Famous statistician George Box noted that no empirical dataset on Earth perfectly matches a theoretical normal curve down to infinite precision. The theoretical curve is a <em>useful mathematical approximation</em>, not an exact description of the physical universe. Always respect empirical evidence first.
        </p>
      </div>
    </div>
  );
}
