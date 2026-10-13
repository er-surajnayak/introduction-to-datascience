'use client';

import React, { useState } from 'react';
import { Tag, Button, Slider } from '@carbon/react';
import {
  Events,
  Analytics,
  Restart,
  CheckmarkFilled,
  Information,
} from '@carbon/icons-react';
import {
  calcFrequencyTable,
  calcCumulativeAtThreshold,
} from '@/lib/distributionStats';

// Baseline dataset: 14 students
// 50: 2, 60: 3, 70: 4, 80: 3, 90: 2
const CUMULATIVE_SAMPLE = [
  50, 50,
  60, 60, 60,
  70, 70, 70, 70,
  80, 80, 80,
  90, 90,
];

export function CumulativeFrequencyExplorer() {
  const [threshold, setThreshold] = useState<number>(70);

  const freqTable = calcFrequencyTable(CUMULATIVE_SAMPLE);
  const totalCount = CUMULATIVE_SAMPLE.length; // 14
  const cumResult = calcCumulativeAtThreshold(CUMULATIVE_SAMPLE, threshold);

  const handleReset = () => {
    setThreshold(70);
  };

  // SVG step chart dimensions
  const svgW = 580;
  const svgH = 200;
  const pad = { top: 20, right: 30, bottom: 35, left: 45 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  // Domain 45 to 95 on horizontal axis
  const minX = 45;
  const maxX = 95;
  const scaleX = (xVal: number) => pad.left + ((xVal - minX) / (maxX - minX)) * plotW;
  const scaleY = (countVal: number) => pad.top + plotH - (countVal / totalCount) * plotH;

  // Build step chart path
  let stepPath = `M ${scaleX(minX)} ${scaleY(0)}`;
  let running = 0;
  freqTable.forEach((row) => {
    stepPath += ` L ${scaleX(row.value)} ${scaleY(running)}`;
    running = row.cumulativeFrequency;
    stepPath += ` L ${scaleX(row.value)} ${scaleY(running)}`;
  });
  stepPath += ` L ${scaleX(maxX)} ${scaleY(running)}`;

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
            Section 3.2.13
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Cumulative Frequency
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Counting At or Below Threshold X
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
        Cumulative Frequency Explorer: The Running Threshold Step Chart
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        <strong>Cumulative frequency</strong> answers questions like: <em>&ldquo;How many students scored 70 marks or less?&rdquo;</em> Adjust the cutoff threshold below to see the running count, percentage, and highlighted cohort update live:
      </p>

      {/* Threshold Controller Slider */}
      <div
        style={{
          padding: '16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            Cutoff Threshold (Marks &le; X)
          </span>
          <Button size="sm" kind="ghost" renderIcon={Restart} onClick={handleReset}>
            Reset to 70
          </Button>
        </div>

        <Slider
          id="cum-threshold-slider"
          labelText={`Selected Threshold: ${threshold} Marks`}
          min={45}
          max={95}
          step={5}
          value={threshold}
          onChange={({ value }: { value: number }) => setThreshold(value)}
        />
      </div>

      {/* SVG Step Curve Diagram */}
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
            Monotonically Non-Decreasing Step Curve (Ogive)
          </span>
          <span style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 700 }}>
            {cumResult.countAtOrBelow} of {totalCount} Students (&le; {threshold} Marks) = {cumResult.percentage}%
          </span>
        </div>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label="Cumulative frequency step chart"
        >
          {/* Horizontal grid lines for counts */}
          {[0, 2, 5, 9, 12, 14].map((cnt) => {
            const y = scaleY(cnt);
            return (
              <g key={cnt}>
                <line
                  x1={pad.left}
                  y1={y}
                  x2={svgW - pad.right}
                  y2={y}
                  stroke="var(--ds-border-subtle)"
                  strokeDasharray="3 3"
                />
                <text
                  x={pad.left - 6}
                  y={y + 4}
                  fill="var(--ds-text-muted)"
                  fontSize="10"
                  fontFamily="var(--ds-font-mono)"
                  textAnchor="end"
                >
                  {cnt}
                </text>
              </g>
            );
          })}

          {/* Shaded area up to threshold */}
          <rect
            x={scaleX(minX)}
            y={pad.top}
            width={Math.max(0, scaleX(threshold) - scaleX(minX))}
            height={plotH}
            fill="rgba(51, 177, 255, 0.08)"
          />

          {/* Threshold vertical line */}
          <line
            x1={scaleX(threshold)}
            y1={pad.top}
            x2={scaleX(threshold)}
            y2={pad.top + plotH}
            stroke="#da1e28"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <text
            x={scaleX(threshold)}
            y={pad.top - 6}
            fill="#fa4d56"
            fontSize="10"
            fontFamily="var(--ds-font-mono)"
            fontWeight="700"
            textAnchor="middle"
          >
            Threshold = {threshold}
          </text>

          {/* Step curve path */}
          <path
            d={stepPath}
            fill="none"
            stroke="var(--ds-cyan)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Step points */}
          {freqTable.map((row) => (
            <circle
              key={row.value}
              cx={scaleX(row.value)}
              cy={scaleY(row.cumulativeFrequency)}
              r="5"
              fill={row.value <= threshold ? 'var(--ds-cyan)' : 'var(--cds-layer-hover-01)'}
              stroke="#fff"
              strokeWidth="1.5"
            />
          ))}

          {/* X axis */}
          <line
            x1={pad.left}
            y1={pad.top + plotH}
            x2={svgW - pad.right}
            y2={pad.top + plotH}
            stroke="var(--ds-border-strong)"
            strokeWidth="1.5"
          />

          {/* X axis labels */}
          {[50, 60, 70, 80, 90].map((val) => (
            <text
              key={val}
              x={scaleX(val)}
              y={svgH - 8}
              fill="var(--ds-text-muted)"
              fontSize="10"
              fontFamily="var(--ds-font-mono)"
              textAnchor="middle"
            >
              {val}
            </text>
          ))}

          {/* Y Axis Title */}
          <text
            x={-svgH / 2}
            y={14}
            fill="var(--ds-text-secondary)"
            fontSize="9"
            fontWeight="600"
            textAnchor="middle"
            transform="rotate(-90)"
          >
            Cumulative Count
          </text>
        </svg>
      </div>

      {/* Cumulative Table Breakdown */}
      <div
        style={{
          overflowX: 'auto',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.8125rem',
            textAlign: 'left',
            background: 'var(--ds-bg-core)',
          }}
        >
          <thead>
            <tr style={{ background: 'var(--ds-bg-surface-elevated)', borderBottom: '1px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '10px 14px' }}>Marks Threshold</th>
              <th style={{ padding: '10px 14px' }}>Bin Frequency</th>
              <th style={{ padding: '10px 14px' }}>Cumulative Count</th>
              <th style={{ padding: '10px 14px' }}>Cumulative Percentage</th>
              <th style={{ padding: '10px 14px' }}>Threshold Status</th>
            </tr>
          </thead>
          <tbody>
            {freqTable.map((r) => {
              const isIncluded = r.value <= threshold;
              return (
                <tr
                  key={r.value}
                  style={{
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    background: isIncluded ? 'var(--ds-cyan-dim)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>
                    &le; {r.value} Marks
                  </td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)' }}>
                    +{r.frequency}
                  </td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-cyan)' }}>
                    {r.cumulativeFrequency} of 14
                  </td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>
                    {r.cumulativePercentage}%
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    {isIncluded ? (
                      <Tag type="green" size="sm">
                        &le; Threshold ({threshold})
                      </Tag>
                    ) : (
                      <Tag type="cool-gray" size="sm">
                        &gt; Threshold
                      </Tag>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Explanation Box */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px', fontSize: '0.9375rem' }}>
          Mathematical Guarantees of Cumulative Frequency
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          Cumulative frequency is <strong>monotonically non-decreasing</strong> because counts are always added, never subtracted. The final cumulative count at the maximum value <strong>strictly equals the total sample size n</strong> ({totalCount}), and the final percentage strictly reaches <strong>100%</strong>. This provides the exact mathematical foundation for percentiles, quartiles, and CDFs (Cumulative Distribution Functions).
        </p>
      </div>
    </div>
  );
}
