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
import {
  calcMean,
  calcRange,
  calcPopulationStdDev,
  calcPopulationVariance,
  calcIQR,
} from '@/lib/distributionStats';

// Base symmetric dataset centered at 50
const BASE_DEVIATIONS = [-20, -10, -5, 0, 5, 10, 20];
const FIXED_CENTER = 50;

export function SpreadSimulator() {
  const [spreadMultiplier, setSpreadMultiplier] = useState<number>(1.0);

  // Generate dynamic values: mean stays strictly 50 by construction
  const dynamicValues = BASE_DEVIATIONS.map(
    (dev) => Math.round((FIXED_CENTER + dev * spreadMultiplier) * 10) / 10
  );

  const mean = calcMean(dynamicValues);
  const range = calcRange(dynamicValues);
  const popVariance = calcPopulationVariance(dynamicValues);
  const popStd = calcPopulationStdDev(dynamicValues);
  const iqr = calcIQR(dynamicValues);

  const handleReset = () => {
    setSpreadMultiplier(1.0);
  };

  const handleCompress = () => {
    setSpreadMultiplier(0.2); // Tight clustering: e.g. [46..54]
  };

  const handleExpand = () => {
    setSpreadMultiplier(2.2); // Extreme spread: e.g. [6..94]
  };

  // SVG coordinate scale: 0 to 100
  const svgW = 600;
  const svgH = 80;
  const scaleX = (val: number) => Math.min(svgW - 20, Math.max(20, (val / 100) * (svgW - 40) + 20));

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
            Section 3.2.9
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Spread and Concentration
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Fixed Mean (50) &bull; Dynamic Dispersion
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
        Spread Simulator: Same Center Does Not Imply Same Spread
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Watch what happens when you expand or compress observations around a fixed balance point. By mathematical construction, the <strong>mean remains locked at 50.0</strong>, while the spread metrics update dynamically:
      </p>

      {/* Preset Buttons Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="sm" kind="secondary" onClick={handleCompress}>
            Tightly Compressed (Low SD)
          </Button>
          <Button size="sm" kind="primary" onClick={handleReset}>
            Baseline Spread (1.0x)
          </Button>
          <Button size="sm" kind="secondary" onClick={handleExpand}>
            Widely Dispersed (High SD)
          </Button>
        </div>

        <Button size="sm" kind="ghost" renderIcon={Restart} onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Dispersion Multiplier Slider */}
      <div
        style={{
          padding: '16px',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
        }}
      >
        <Slider
          id="spread-factor-slider"
          labelText={`Dispersion Multiplier: ${spreadMultiplier.toFixed(2)}x`}
          min={0.1}
          max={2.3}
          step={0.1}
          value={spreadMultiplier}
          onChange={({ value }: { value: number }) => setSpreadMultiplier(value)}
        />
      </div>

      {/* Live SVG Dot Plot on 0 to 100 Scale */}
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
          <span style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            Observations: [{dynamicValues.join(', ')}]
          </span>
          <span style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 700 }}>
            Mean = {mean.toFixed(1)} (Locked)
          </span>
        </div>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label="Spread simulator dot plot"
        >
          {/* Base Axis line */}
          <line x1="20" y1="45" x2={svgW - 20} y2="45" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {/* Shaded spread band between min and max */}
          <rect
            x={scaleX(dynamicValues[0])}
            y="25"
            width={scaleX(dynamicValues[dynamicValues.length - 1]) - scaleX(dynamicValues[0])}
            height="40"
            fill="rgba(51, 177, 255, 0.12)"
            stroke="var(--ds-cyan)"
            strokeWidth="1"
            strokeDasharray="3 3"
            rx="2"
          />

          {/* Mean anchor marker (50) */}
          <line x1={scaleX(50)} y1="10" x2={scaleX(50)} y2="70" stroke="#da1e28" strokeWidth="2.5" />
          <text x={scaleX(50)} y="12" fill="#fa4d56" fontSize="10" fontFamily="var(--ds-font-mono)" fontWeight="700" textAnchor="middle">
            μ = 50.0
          </text>

          {/* Data points */}
          {dynamicValues.map((val, idx) => (
            <circle
              key={idx}
              cx={scaleX(val)}
              cy="45"
              r="7"
              fill="var(--ds-cyan)"
              stroke="#fff"
              strokeWidth="1.5"
            />
          ))}

          {/* Axis ticks */}
          <text x="20" y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">0</text>
          <text x={scaleX(25)} y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">25</text>
          <text x={scaleX(50)} y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">50</text>
          <text x={scaleX(75)} y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">75</text>
          <text x={svgW - 20} y="65" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">100</text>
        </svg>
      </div>

      {/* Spread Metrics Live Dashboard */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>MEAN (μ)</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fa4d56' }}>
            50.0 marks
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-emerald)', marginTop: '2px' }}>
            Locked at Center of Mass
          </div>
        </div>

        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>POPULATION SD (σ)</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>
            {popStd.toFixed(2)} marks
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>
            Scale of variation
          </div>
        </div>

        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>RANGE (MAX - MIN)</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--ds-purple)' }}>
            {range.toFixed(1)} marks
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>
            Distance between extremes
          </div>
        </div>

        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>POPULATION VARIANCE (σ²)</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
            {popVariance.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>
            Mean squared deviations
          </div>
        </div>
      </div>

      {/* Key Takeaway Callout */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px', fontSize: '0.9375rem' }}>
          Core Principle: Same Center Does Not Imply Same Spread!
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          No matter how far you stretch or compress the observations, the mean remains exactly <strong>50.0</strong> because the positive deviations (+Δ) exactly balance the negative deviations (-Δ). However, the standard deviation surges from under <strong>2.5 marks</strong> to over <strong>28.0 marks</strong>. This proves why reporting central tendency alone without dispersion is fatally incomplete!
        </p>
      </div>
    </div>
  );
}
