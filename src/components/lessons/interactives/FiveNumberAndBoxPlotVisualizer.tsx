'use client';

import React, { useState } from 'react';
import { Tag } from '@carbon/react';

interface DatasetPreset {
  id: string;
  name: string;
  values: number[];
  unit: string;
  description: string;
}

const presets: DatasetPreset[] = [
  {
    id: 'symmetric',
    name: '1. Symmetric Bell-Shaped',
    values: [10, 12, 13, 15, 16, 18, 20, 22, 25, 30],
    unit: 'points',
    description: 'Evenly spaced distribution. Whiskers are symmetric, and median sits squarely in the middle of the box.',
  },
  {
    id: 'skewed',
    name: '2. Right-Skewed Salaries',
    values: [25, 28, 30, 32, 35, 38, 42, 48, 65, 180],
    unit: '₹ Lakh',
    description: 'Executive salary tail pulling the maximum far right. Notice the stretched upper whisker and high outlier point.',
  },
  {
    id: 'outliers',
    name: '3. Single Extreme Outlier',
    values: [10, 12, 13, 14, 15, 16, 17, 18, 20, 95],
    unit: 'marks',
    description: 'Tight middle cluster from 10 to 20, with value 95 sitting far beyond the 1.5×IQR upper fence.',
  },
];

export function FiveNumberAndBoxPlotVisualizer() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('outliers');

  const activePreset = presets.find((p) => p.id === selectedPresetId)!;
  const sorted = [...activePreset.values].sort((a, b) => a - b);
  const n = sorted.length;

  // Compute 5-number summary
  const min = sorted[0];
  const max = sorted[n - 1];

  const getPercentile = (arr: number[], p: number) => {
    const index = (arr.length - 1) * p;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    return arr[lower] * (1 - weight) + arr[upper] * weight;
  };

  const q1 = getPercentile(sorted, 0.25);
  const median = getPercentile(sorted, 0.5);
  const q3 = getPercentile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  // Identify outliers
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);
  const nonOutliers = sorted.filter((v) => v >= lowerFence && v <= upperFence);
  const whiskerMin = nonOutliers.length > 0 ? nonOutliers[0] : min;
  const whiskerMax = nonOutliers.length > 0 ? nonOutliers[nonOutliers.length - 1] : max;

  // Coordinate scaling (0% to 100%)
  const plotMin = Math.min(min, lowerFence, 0);
  const plotMax = Math.max(max, upperFence) * 1.05;
  const scale = (val: number) => {
    return Math.max(2, Math.min(98, ((val - plotMin) / (plotMax - plotMin)) * 100));
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="green" size="md">
            Interactive Lab 2.5.3
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Five-Number Summary & Box Plot Engine
          </span>
        </div>
        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          IQR = Q3 - Q1 = {iqr.toFixed(1)}
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        The Five-Number Summary & Box Plot Anatomy
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        The Five-Number Summary condenses any numerical distribution into 5 robust landmarks.
        The box plot visualizes this summary while placing Tukey fences to isolate potential outliers.
      </p>

      {/* Preset Selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {presets.map((p) => {
          const isSelected = p.id === selectedPresetId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPresetId(p.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '4px',
                border: isSelected ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
                color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Five-Number Summary Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '10px', borderRadius: '4px', background: 'var(--cds-layer-02)', border: '1px solid var(--ds-border-subtle)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Minimum</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)' }}>{min}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>0th Percentile</div>
        </div>

        <div style={{ padding: '10px', borderRadius: '4px', background: 'var(--cds-layer-02)', border: '1px solid var(--ds-cyan)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-cyan)' }}>Q1 (25th %)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>{q1.toFixed(1)}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Box Start</div>
        </div>

        <div style={{ padding: '10px', borderRadius: '4px', background: 'var(--cds-layer-02)', border: '1px solid var(--ds-emerald)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-emerald)' }}>Median (50th %)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-emerald)', fontFamily: 'var(--ds-font-mono)' }}>{median.toFixed(1)}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Center Line</div>
        </div>

        <div style={{ padding: '10px', borderRadius: '4px', background: 'var(--cds-layer-02)', border: '1px solid var(--ds-cyan)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-cyan)' }}>Q3 (75th %)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>{q3.toFixed(1)}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Box End</div>
        </div>

        <div style={{ padding: '10px', borderRadius: '4px', background: 'var(--cds-layer-02)', border: '1px solid var(--ds-border-subtle)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Maximum</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)' }}>{max}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>100th Percentile</div>
        </div>
      </div>

      {/* Interactive Box Plot Rendering Canvas */}
      <div
        style={{
          padding: '2rem 1.5rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
          BOX PLOT VISUALIZATION WITH TUKEY FENCES
        </div>

        {/* The Graphic Box Plot */}
        <div style={{ position: 'relative', height: '90px', margin: '0 20px' }}>
          {/* Middle 50% Box (Q1 to Q3) */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(q1)}%`,
              width: `${Math.max(4, scale(q3) - scale(q1))}%`,
              top: '15px',
              height: '60px',
              background: 'rgba(15, 98, 254, 0.18)',
              border: '2px solid var(--ds-cyan)',
              borderRadius: '2px',
              zIndex: 2,
            }}
          />

          {/* Median Bar inside Box */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(median)}%`,
              top: '10px',
              height: '70px',
              width: '4px',
              background: 'var(--ds-emerald)',
              zIndex: 3,
            }}
          />

          {/* Whisker Line (whiskerMin to Q1) */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(whiskerMin)}%`,
              width: `${scale(q1) - scale(whiskerMin)}%`,
              top: '44px',
              height: '2px',
              background: 'var(--ds-text-secondary)',
              zIndex: 1,
            }}
          />

          {/* Whisker Line (Q3 to whiskerMax) */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(q3)}%`,
              width: `${scale(whiskerMax) - scale(q3)}%`,
              top: '44px',
              height: '2px',
              background: 'var(--ds-text-secondary)',
              zIndex: 1,
            }}
          />

          {/* Whisker End Cap Min */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(whiskerMin)}%`,
              top: '30px',
              height: '30px',
              width: '2px',
              background: 'var(--ds-text-secondary)',
            }}
          />

          {/* Whisker End Cap Max */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(whiskerMax)}%`,
              top: '30px',
              height: '30px',
              width: '2px',
              background: 'var(--ds-text-secondary)',
            }}
          />

          {/* Outlier Dots */}
          {outliers.map((outVal, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${scale(outVal)}%`,
                top: '36px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'var(--ds-amber)',
                border: '2px solid #fff',
                transform: 'translateX(-50%)',
                zIndex: 4,
                boxShadow: '0 0 10px rgba(255, 131, 43, 0.6)',
              }}
              title={`Outlier: ${outVal}`}
            />
          ))}
        </div>

        {/* Number Line Axis */}
        <div style={{ position: 'relative', marginTop: '1rem', borderTop: '1px solid var(--ds-border-strong)', paddingTop: '6px', margin: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
            <span>{plotMin.toFixed(0)}</span>
            <span>Q1: {q1.toFixed(1)}</span>
            <span style={{ color: 'var(--ds-emerald)', fontWeight: 600 }}>Median: {median.toFixed(1)}</span>
            <span>Q3: {q3.toFixed(1)}</span>
            <span>{plotMax.toFixed(0)}</span>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
        <strong>Statistical Insight:</strong> {activePreset.description}
        {outliers.length > 0 ? (
          <span style={{ color: 'var(--ds-amber)', display: 'block', marginTop: '4px' }}>
            ⚡ Detected <strong>{outliers.length}</strong> potential outlier point(s): {outliers.join(', ')} ({activePreset.unit}).
          </span>
        ) : (
          <span style={{ color: 'var(--ds-emerald)', display: 'block', marginTop: '4px' }}>
            ✓ No observations exceed the 1.5 × IQR boundary fences in this dataset.
          </span>
        )}
      </div>
    </div>
  );
}
