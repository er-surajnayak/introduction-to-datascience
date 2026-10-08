'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { ArrowsHorizontal, WarningAlt, Information } from '@carbon/icons-react';
import { calcMean, calcRange, calcSampleStdDev } from '@/lib/statistics';

export function SpreadAndRangeLab() {
  const [minVal, setMinVal] = useState<number>(40);
  const [maxVal, setMaxVal] = useState<number>(80);

  // Datasets for Section 15
  const datasetA = [48, 49, 50, 51, 52];
  const datasetB = [10, 30, 50, 70, 90];

  const meanA = calcMean(datasetA);
  const meanB = calcMean(datasetB);
  const rangeA = calcRange(datasetA);
  const rangeB = calcRange(datasetB);
  const stdA = calcSampleStdDev(datasetA);
  const stdB = calcSampleStdDev(datasetB);

  const currentRange = Math.max(0, maxVal - minVal);

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
          <Tag type="teal" size="md">
            Section 14 & 15
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Spread & Dispersion: Range
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Why Average Isn&apos;t Enough
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Range: From Center to Spread & Why Average Isn&apos;t Enough
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Knowing the center of data is only half the story. <strong>Spread</strong> describes how widely distributed the observations are around that center. The simplest measure of spread is the <strong>Range</strong> ($Range = Max - Min$).
      </p>

      {/* Part 1: Interactive Range Slider */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '12px' }}>
          Interactive Range Explorer: Range = Maximum ({maxVal}) - Minimum ({minVal}) = {currentRange}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--ds-text-muted)' }}>Minimum Value</span>
              <strong style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-teal)' }}>{minVal}</strong>
            </div>
            <input
              type="range"
              min={10}
              max={maxVal - 5}
              value={minVal}
              onChange={(e) => setMinVal(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--ds-teal)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--ds-text-muted)' }}>Maximum Value</span>
              <strong style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-blue)' }}>{maxVal}</strong>
            </div>
            <input
              type="range"
              min={minVal + 5}
              max={100}
              value={maxVal}
              onChange={(e) => setMaxVal(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--ds-blue)' }}
            />
          </div>
        </div>

        {/* Visual Ruler for Range */}
        <div
          style={{
            position: 'relative',
            height: '70px',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            padding: '15px 20px',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          {/* Base Axis */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '20px',
              right: '20px',
              height: '2px',
              background: 'var(--ds-border-strong)',
            }}
          />

          {/* Range Highlight Bar */}
          <div
            style={{
              position: 'absolute',
              top: '36px',
              left: `${Math.max(2, minVal)}%`,
              width: `${Math.max(2, currentRange)}%`,
              height: '10px',
              background: 'var(--ds-cyan)',
              opacity: 0.65,
              borderRadius: '2px',
            }}
          />

          {/* Min Point */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: `${minVal}%`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-teal)' }}>
              MIN: {minVal}
            </div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--ds-teal)', margin: '2px auto' }} />
          </div>

          {/* Max Point */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: `${maxVal}%`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-blue)' }}>
              MAX: {maxVal}
            </div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--ds-blue)', margin: '2px auto' }} />
          </div>
        </div>
      </div>

      {/* Part 2: Section 15 — Why Average Isn't Enough (Dataset A vs Dataset B) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
          <WarningAlt size={18} style={{ color: 'var(--ds-amber)' }} />
          <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            Why Average Isn&apos;t Enough: The Tale of Two Batches
          </h4>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          Consider two engineering sections sitting an assessment. Both achieve an identical mean score of <strong>50</strong>. Are their performances identical? Inspect their distributions:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
          {/* Section A */}
          <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderTop: '3px solid var(--ds-emerald)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: 'var(--ds-emerald)', fontSize: '0.875rem' }}>Class A: [48, 49, 50, 51, 52]</span>
              <Tag type="green" size="sm">Tightly Clustered</Tag>
            </div>

            {/* Dot plot representation */}
            <div style={{ position: 'relative', height: '50px', background: 'var(--ds-bg-core)', borderRadius: '4px', padding: '10px', marginBottom: '10px' }}>
              <div style={{ position: 'absolute', top: '25px', left: '10px', right: '10px', height: '2px', background: 'var(--ds-border-subtle)' }} />
              {datasetA.map((val, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: `${val}%`,
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'var(--ds-emerald)',
                    border: '1px solid #fff',
                    transform: 'translateX(-50%)',
                  }}
                  title={`Score: ${val}`}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
              <span>Mean: <strong style={{ color: 'var(--ds-text-primary)' }}>{meanA}</strong></span>
              <span>Range: <strong style={{ color: 'var(--ds-text-primary)' }}>{rangeA}</strong></span>
              <span>SD: <strong style={{ color: 'var(--ds-emerald)' }}>{stdA.toFixed(1)}</strong></span>
            </div>
          </div>

          {/* Section B */}
          <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderTop: '3px solid #da1e28' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#da1e28', fontSize: '0.875rem' }}>Class B: [10, 30, 50, 70, 90]</span>
              <Tag type="red" size="sm">Widely Dispersed</Tag>
            </div>

            {/* Dot plot representation */}
            <div style={{ position: 'relative', height: '50px', background: 'var(--ds-bg-core)', borderRadius: '4px', padding: '10px', marginBottom: '10px' }}>
              <div style={{ position: 'absolute', top: '25px', left: '10px', right: '10px', height: '2px', background: 'var(--ds-border-subtle)' }} />
              {datasetB.map((val, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: `${val}%`,
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: '#da1e28',
                    border: '1px solid #fff',
                    transform: 'translateX(-50%)',
                  }}
                  title={`Score: ${val}`}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
              <span>Mean: <strong style={{ color: 'var(--ds-text-primary)' }}>{meanB}</strong></span>
              <span>Range: <strong style={{ color: 'var(--ds-text-primary)' }}>{rangeB}</strong></span>
              <span>SD: <strong style={{ color: '#da1e28' }}>{stdB.toFixed(1)}</strong></span>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '10px 14px',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            borderLeft: '4px solid var(--ds-amber)',
            fontSize: '0.8125rem',
            color: 'var(--ds-text-secondary)',
            lineHeight: 1.5,
          }}
        >
          <strong>The Missing Information:</strong> If you were only told the mean score was 50, you would treat both classes identically. But Class A had almost everyone scoring around 50, whereas Class B had high failure rates (10, 30) paired with top marks (70, 90). <em>Average alone hides risk and variability!</em>
        </div>
      </div>
    </div>
  );
}
