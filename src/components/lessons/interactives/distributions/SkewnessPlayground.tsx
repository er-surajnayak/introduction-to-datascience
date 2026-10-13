'use client';

import React, { useState } from 'react';
import { Tag, Button, Slider } from '@carbon/react';
import {
  Scale,
  Analytics,
  Restart,
  WarningAlt,
  CheckmarkFilled,
  Information,
} from '@carbon/icons-react';
import {
  calcMean,
  calcMedian,
  calcSampleStdDev,
  calcSkewness,
  cleanNumbers,
} from '@/lib/distributionStats';

const INITIAL_SALARIES = [20, 22, 24, 25, 26, 28, 30, 35, 40, 200];

export function SkewnessPlayground() {
  const [minSalary, setMinSalary] = useState<number>(20);
  const [maxSalary, setMaxSalary] = useState<number>(200);
  const [middleOffset, setMiddleOffset] = useState<number>(0);

  // Construct dynamic dataset based on controls
  const salaries = [
    minSalary,
    22 + middleOffset * 0.2,
    24 + middleOffset * 0.4,
    25 + middleOffset * 0.5,
    26 + middleOffset * 0.6,
    28 + middleOffset * 0.8,
    30 + middleOffset,
    35 + middleOffset * 1.2,
    40 + middleOffset * 1.5,
    maxSalary,
  ];

  const mean = calcMean(salaries);
  const median = calcMedian(salaries);
  const std = calcSampleStdDev(salaries);
  const skewObj = calcSkewness(salaries);

  const handleReset = () => {
    setMinSalary(20);
    setMaxSalary(200);
    setMiddleOffset(0);
  };

  const handleSetSymmetric = () => {
    setMinSalary(20);
    setMaxSalary(40);
    setMiddleOffset(0);
  };

  const handleSetLeftSkewed = () => {
    setMinSalary(5);
    setMaxSalary(40);
    setMiddleOffset(10);
  };

  // SVG coordinate mapping (scale 0 to 250 ₹k)
  const maxScale = 250;
  const svgW = 600;
  const svgH = 100;
  const scaleX = (val: number) => Math.min(svgW - 20, Math.max(20, (val / maxScale) * (svgW - 40) + 20));

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
            Section 3.2.7
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Asymmetry Diagnostics
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Skewness Playground
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
        Skewness Playground: How Extreme Values Drag the Average
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Using monthly starting salaries in ₹ thousands: <code>[20, 22, 24, 25, 26, 28, 30, 35, 40, 200]</code>. Adjust the lowest and highest salaries below to watch the mean get pulled while the median resists:
      </p>

      {/* Preset Scenarios Buttons */}
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
          <Button size="sm" kind="primary" onClick={handleReset}>
            Baseline: Right-Skewed (Max=200)
          </Button>
          <Button size="sm" kind="secondary" onClick={handleSetSymmetric}>
            Preset: Symmetric (Max=40)
          </Button>
          <Button size="sm" kind="secondary" onClick={handleSetLeftSkewed}>
            Preset: Left-Skewed (Min=5)
          </Button>
        </div>

        <Button size="sm" kind="ghost" renderIcon={Restart} onClick={handleReset}>
          Reset Playground
        </Button>
      </div>

      {/* Sliders Controller */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem',
          padding: '16px',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
        }}
      >
        <div>
          <Slider
            id="skew-min-slider"
            labelText={`Lowest Salary: ₹${minSalary}k / month`}
            min={2}
            max={25}
            step={1}
            value={minSalary}
            onChange={({ value }: { value: number }) => setMinSalary(value)}
          />
        </div>

        <div>
          <Slider
            id="skew-max-slider"
            labelText={`Highest Salary (CEO / Star): ₹${maxSalary}k / month`}
            min={35}
            max={250}
            step={5}
            value={maxSalary}
            onChange={({ value }: { value: number }) => setMaxSalary(value)}
          />
        </div>
      </div>

      {/* Live Distribution Dot Plot with Mean and Median Overlay */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            Live Salary Observations (Dot Plot on ₹0 to ₹250k Scale)
          </span>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)' }}>
            <span style={{ color: '#da1e28', fontWeight: 700 }}>Mean: ₹{mean.toFixed(1)}k</span>
            <span style={{ color: 'var(--ds-emerald)', fontWeight: 700 }}>Median: ₹{median.toFixed(1)}k</span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label="Salary distribution dot plot"
        >
          {/* Base Axis line */}
          <line x1="20" y1="70" x2={svgW - 20} y2="70" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {/* Median line (Green, resistant) */}
          <line
            x1={scaleX(median)}
            y1="15"
            x2={scaleX(median)}
            y2="75"
            stroke="var(--ds-emerald)"
            strokeWidth="3"
            strokeDasharray="4 2"
          />
          <text
            x={scaleX(median)}
            y="12"
            fill="var(--ds-emerald)"
            fontSize="10"
            fontFamily="var(--ds-font-mono)"
            fontWeight="700"
            textAnchor="middle"
          >
            Median ({median.toFixed(1)})
          </text>

          {/* Mean line (Red, sensitive) */}
          <line
            x1={scaleX(mean)}
            y1="25"
            x2={scaleX(mean)}
            y2="75"
            stroke="#da1e28"
            strokeWidth="3"
          />
          <text
            x={scaleX(mean)}
            y="22"
            fill="#fa4d56"
            fontSize="10"
            fontFamily="var(--ds-font-mono)"
            fontWeight="700"
            textAnchor="middle"
          >
            Mean ({mean.toFixed(1)})
          </text>

          {/* Data points */}
          {salaries.map((val, idx) => (
            <circle
              key={idx}
              cx={scaleX(val)}
              cy="70"
              r="7"
              fill={val >= 100 ? 'var(--ds-amber)' : 'var(--ds-cyan)'}
              stroke="#fff"
              strokeWidth="1.5"
            />
          ))}

          {/* Axis labels */}
          <text x="20" y="88" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">₹0k</text>
          <text x={scaleX(50)} y="88" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">₹50k</text>
          <text x={scaleX(100)} y="88" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">₹100k</text>
          <text x={scaleX(150)} y="88" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">₹150k</text>
          <text x={scaleX(200)} y="88" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">₹200k</text>
          <text x={svgW - 20} y="88" fill="var(--ds-text-muted)" fontSize="9" textAnchor="middle">₹250k</text>
        </svg>
      </div>

      {/* Skewness Diagnostic Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>SKEWNESS COEFFICIENT (G1)</span>
          <div
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color:
                skewObj.direction === 'right-skewed'
                  ? 'var(--ds-blue)'
                  : skewObj.direction === 'left-skewed'
                  ? 'var(--ds-purple)'
                  : 'var(--ds-cyan)',
            }}
          >
            {skewObj.skewness > 0 ? `+${skewObj.skewness}` : skewObj.skewness}
          </div>
          <Tag
            type={
              skewObj.direction === 'right-skewed'
                ? 'blue'
                : skewObj.direction === 'left-skewed'
                ? 'purple'
                : 'cyan'
            }
            size="sm"
            style={{ marginTop: '4px' }}
          >
            {skewObj.direction.toUpperCase()}
          </Tag>
        </div>

        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>MEAN VS MEDIAN SPREAD</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fa4d56' }}>
            Δ = ₹{(mean - median).toFixed(2)}k
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            {mean > median ? 'Mean is pulled HIGHER by tail' : mean < median ? 'Mean is pulled LOWER by tail' : 'Mean and Median align'}
          </div>
        </div>

        <div style={{ padding: '14px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>SAMPLE SD</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            s = ₹{std.toFixed(2)}k
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Dispersion around sample mean
          </div>
        </div>
      </div>

      {/* Educational Explanation Box */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px', fontSize: '0.9375rem' }}>
          Crucial Rule: Mean &gt; Median is a Tendency, Not a Universal Law!
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          In right-skewed distributions with long upper tails, the Mean is typically pulled above the Median because extreme high values contribute heavily to the numerator sum. However, statisticians emphasize that <strong>Mean &gt; Median is a common empirical rule-of-thumb, not an absolute mathematical definition</strong> of skewness. Skewness is formally defined by the third standardized moment (asymmetry of probability mass around the center).
        </p>
      </div>
    </div>
  );
}
