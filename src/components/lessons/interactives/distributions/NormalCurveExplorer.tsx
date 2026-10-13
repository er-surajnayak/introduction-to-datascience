'use client';

import React, { useState } from 'react';
import { Tag, Button, Slider } from '@carbon/react';
import {
  Analytics,
  Restart,
  Scale,
  CheckmarkFilled,
  Information,
} from '@carbon/icons-react';
import { calcNormalPdf } from '@/lib/distributionStats';

export function NormalCurveExplorer() {
  const [mean, setMean] = useState<number>(50);
  const [stdDev, setStdDev] = useState<number>(10);
  const [highlightLevel, setHighlightLevel] = useState<1 | 2 | 3 | 0>(1);

  // SVG dimensions
  const svgW = 600;
  const svgH = 220;
  const pad = { top: 25, right: 25, bottom: 40, left: 25 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  // Domain 0 to 100 on horizontal scale
  const minDomain = 0;
  const maxDomain = 100;
  const scaleX = (xVal: number) => pad.left + ((xVal - minDomain) / (maxDomain - minDomain)) * plotW;

  // Maximum density occurs at x = mu, where height = 1 / (std * sqrt(2*pi))
  // With minimum stdDev=5, max peak is ~0.08
  const maxScaleY = 0.085;
  const scaleY = (pdfVal: number) => pad.top + plotH - (pdfVal / maxScaleY) * plotH;

  // Generate curve path points (0 to 100 in 100 steps)
  const numSteps = 120;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= numSteps; i++) {
    const xVal = minDomain + (i / numSteps) * (maxDomain - minDomain);
    const yVal = calcNormalPdf(xVal, mean, stdDev);
    points.push({ x: scaleX(xVal), y: scaleY(yVal) });
  }

  const curveSvgPath = points
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(' ');

  // Generate shaded regions for ±1, ±2, ±3 SD
  const getShadedPath = (numSigma: number) => {
    const low = Math.max(minDomain, mean - numSigma * stdDev);
    const high = Math.min(maxDomain, mean + numSigma * stdDev);
    const segPoints: { x: number; y: number }[] = [];
    const segSteps = 50;
    for (let i = 0; i <= segSteps; i++) {
      const xVal = low + (i / segSteps) * (high - low);
      const yVal = calcNormalPdf(xVal, mean, stdDev);
      segPoints.push({ x: scaleX(xVal), y: scaleY(yVal) });
    }
    const pathD = segPoints
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
      .join(' ');
    return `${pathD} L ${scaleX(high).toFixed(1)} ${scaleY(0).toFixed(1)} L ${scaleX(low).toFixed(1)} ${scaleY(0).toFixed(1)} Z`;
  };

  const handleReset = () => {
    setMean(50);
    setStdDev(10);
    setHighlightLevel(1);
  };

  // Peak density height at mean
  const peakDensity = calcNormalPdf(mean, mean, stdDev);

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
            Section 3.2.12
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            The Normal (Gaussian) Distribution
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          68–95–99.7% Empirical Rule
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
        Normal Curve Explorer: Symmetry, Spread, and Area Conservation
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        The normal distribution is perfectly symmetric around its mean ($\mu$), with width governed by standard deviation ($\sigma$). Notice that <strong>as $\sigma$ widens, the peak height lowers</strong> to strictly preserve a total area of 1.0!
      </p>

      {/* Control Sliders Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          padding: '16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div>
          <Slider
            id="normal-mean-slider"
            labelText={`Mean (μ): ${mean} (Shifts curve left/right)`}
            min={25}
            max={75}
            step={1}
            value={mean}
            onChange={({ value }: { value: number }) => setMean(value)}
          />
        </div>

        <div>
          <Slider
            id="normal-sd-slider"
            labelText={`Standard Deviation (σ): ${stdDev} (Adjusts spread & peak)`}
            min={5}
            max={22}
            step={1}
            value={stdDev}
            onChange={({ value }: { value: number }) => setStdDev(value)}
          />
        </div>
      </div>

      {/* Empirical Rule Highlight Selector Pills */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          padding: '10px 14px',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)' }}>
            Highlight Sigma Band:
          </span>
          <Button
            size="sm"
            kind={highlightLevel === 1 ? 'primary' : 'secondary'}
            onClick={() => setHighlightLevel(1)}
          >
            &plusmn;1 SD (~68.3%)
          </Button>
          <Button
            size="sm"
            kind={highlightLevel === 2 ? 'primary' : 'secondary'}
            onClick={() => setHighlightLevel(2)}
          >
            &plusmn;2 SD (~95.4%)
          </Button>
          <Button
            size="sm"
            kind={highlightLevel === 3 ? 'primary' : 'secondary'}
            onClick={() => setHighlightLevel(3)}
          >
            &plusmn;3 SD (~99.7%)
          </Button>
          <Button
            size="sm"
            kind={highlightLevel === 0 ? 'primary' : 'ghost'}
            onClick={() => setHighlightLevel(0)}
          >
            Clear Shade
          </Button>
        </div>

        <Button size="sm" kind="ghost" renderIcon={Restart} onClick={handleReset}>
          Reset Curve
        </Button>
      </div>

      {/* SVG Normal Distribution Plot */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label={`Normal distribution curve with mean ${mean} and standard deviation ${stdDev}`}
        >
          {/* Baseline */}
          <line
            x1={pad.left}
            y1={scaleY(0)}
            x2={svgW - pad.right}
            y2={scaleY(0)}
            stroke="var(--ds-border-strong)"
            strokeWidth="1.5"
          />

          {/* Shaded Empirical Region */}
          {highlightLevel > 0 && (
            <path
              d={getShadedPath(highlightLevel)}
              fill={
                highlightLevel === 1
                  ? 'rgba(51, 177, 255, 0.25)'
                  : highlightLevel === 2
                  ? 'rgba(15, 98, 254, 0.25)'
                  : 'rgba(165, 110, 255, 0.25)'
              }
              stroke={
                highlightLevel === 1
                  ? 'var(--ds-cyan)'
                  : highlightLevel === 2
                  ? 'var(--ds-blue)'
                  : 'var(--ds-purple)'
              }
              strokeWidth="1"
            />
          )}

          {/* Main Bell Curve Contour */}
          <path
            d={curveSvgPath}
            fill="none"
            stroke="var(--ds-cyan)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Center Mean line (μ) */}
          <line
            x1={scaleX(mean)}
            y1={scaleY(peakDensity)}
            x2={scaleX(mean)}
            y2={scaleY(0)}
            stroke="#da1e28"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <text
            x={scaleX(mean)}
            y={scaleY(peakDensity) - 8}
            fill="#fa4d56"
            fontSize="10"
            fontFamily="var(--ds-font-mono)"
            fontWeight="700"
            textAnchor="middle"
          >
            μ = {mean} (Peak: {peakDensity.toFixed(4)})
          </text>

          {/* ±1 SD markers */}
          <line
            x1={scaleX(mean - stdDev)}
            y1={scaleY(calcNormalPdf(mean - stdDev, mean, stdDev))}
            x2={scaleX(mean - stdDev)}
            y2={scaleY(0)}
            stroke="var(--ds-cyan)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <line
            x1={scaleX(mean + stdDev)}
            y1={scaleY(calcNormalPdf(mean + stdDev, mean, stdDev))}
            x2={scaleX(mean + stdDev)}
            y2={scaleY(0)}
            stroke="var(--ds-cyan)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* X axis interval ticks */}
          {[0, 20, 40, 60, 80, 100].map((val) => (
            <text
              key={val}
              x={scaleX(val)}
              y={svgH - 12}
              fill="var(--ds-text-muted)"
              fontSize="9"
              fontFamily="var(--ds-font-mono)"
              textAnchor="middle"
            >
              {val}
            </text>
          ))}
        </svg>
      </div>

      {/* Mathematical Breakdown Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-cyan)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '4px' }}>
            &plusmn;1 SIGMA REGION [μ - σ, μ + σ]
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            [{mean - stdDev}, {mean + stdDev}] &rarr; ~68.27%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Roughly two-thirds of all observations fall here.
          </div>
        </div>

        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-blue)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-blue)', fontWeight: 600, marginBottom: '4px' }}>
            &plusmn;2 SIGMA REGION [μ - 2σ, μ + 2σ]
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            [{mean - 2 * stdDev}, {mean + 2 * stdDev}] &rarr; ~95.45%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Nineteen out of every twenty observations fall here.
          </div>
        </div>

        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-purple)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-purple)', fontWeight: 600, marginBottom: '4px' }}>
            &plusmn;3 SIGMA REGION [μ - 3σ, μ + 3σ]
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            [{mean - 3 * stdDev}, {mean + 3 * stdDev}] &rarr; ~99.73%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Virtually the entire population sits within 3 SDs.
          </div>
        </div>
      </div>

      {/* Cautionary Rule */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px', fontSize: '0.9375rem' }}>
          Important Caveat: The 68–95–99.7 Rule Is Not Automatic!
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          The 68–95–99.7 rule applies strictly to theoretical normal distributions (or approximately normal empirical data). It does <strong>not</strong> apply automatically to skewed, bounded, or bimodal datasets! For skewed salaries or exponential wait times, 90% or more of data might fall within just 1 standard deviation. Always check shape before applying the empirical rule.
        </p>
      </div>
    </div>
  );
}
