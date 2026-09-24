'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';

export function OutlierPlayground() {
  const [xVal, setXVal] = useState<number>(35);

  const baseValues = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  const allValues = [...baseValues, xVal].sort((a, b) => a - b);
  const n = allValues.length; // 10

  // Calculations
  const mean = allValues.reduce((a, b) => a + b, 0) / n;
  const std = Math.sqrt(allValues.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1));

  // Median of 10 items is avg of 5th and 6th
  const median = (allValues[4] + allValues[5]) / 2;

  // Q1 is 2.5 rank -> (allValues[2] + allValues[3]) / 2 = (12+13)/2 = 12.5 (when x > 18)
  const q1 = 12.5;
  const q3 = (allValues[6] + allValues[7]) / 2; // (16+17)/2 = 16.5
  const iqr = q3 - q1; // 4.0
  const upperFence = q3 + 1.5 * iqr; // 16.5 + 6.0 = 22.5

  const isOutlier = xVal > upperFence;

  // Visual scaling (0% to 100%) for plot between 0 and 120
  const maxAxis = 120;
  const scale = (v: number) => Math.max(2, Math.min(98, (v / maxAxis) * 100));

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
          <Tag type="cyan" size="md">
            Interactive Lab 2.5.6
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Real-Time Mean vs. Median Sensitivity Lab
          </span>
        </div>
        <Tag type={isOutlier ? 'red' : 'green'} size="md">
          {isOutlier ? `X=${xVal} is an Outlier (>${upperFence.toFixed(1)})` : `X=${xVal} is In-Distribution`}
        </Tag>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Outlier Detection Playground: Moving Value X
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Drag the slider below to vary the 10th observation <strong>X</strong> from 18 to 120.
        Watch how the <strong>Mean (μ)</strong> is pulled aggressively towards extreme values while the <strong>Median</strong> remains rock-solid.
      </p>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <Button size="sm" kind={xVal === 19 ? 'primary' : 'tertiary'} onClick={() => setXVal(19)}>
          X = 19 (Normal Distribution)
        </Button>
        <Button size="sm" kind={xVal === 35 ? 'primary' : 'tertiary'} onClick={() => setXVal(35)}>
          X = 35 (Moderate Outlier)
        </Button>
        <Button size="sm" kind={xVal === 100 ? 'primary' : 'tertiary'} onClick={() => setXVal(100)}>
          X = 100 (Extreme Outlier)
        </Button>
      </div>

      {/* Interactive Slider */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            Value of 10th Observation (X):
          </span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: isOutlier ? 'var(--ds-amber)' : 'var(--ds-cyan)' }}>
            X = {xVal}
          </span>
        </div>
        <input
          type="range"
          min="18"
          max="120"
          value={xVal}
          onChange={(e) => setXVal(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--ds-cyan)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
          <span>18 (Peer Cluster)</span>
          <span>50 (Strong Outlier)</span>
          <span>120 (Extreme Outlier)</span>
        </div>
      </div>

      {/* Real-time Dynamic Metrics Comparison */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '10px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Arithmetic Mean (μ)</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-purple)', fontFamily: 'var(--ds-font-mono)' }}>
            {mean.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Heavily Distorted</div>
        </div>

        <div style={{ padding: '10px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Median (50th %)</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-emerald)', fontFamily: 'var(--ds-font-mono)' }}>
            {median.toFixed(1)}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-emerald)' }}>Anchored & Robust</div>
        </div>

        <div style={{ padding: '10px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Standard Dev (σ)</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)' }}>
            {std.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Variance Blowup</div>
        </div>

        <div style={{ padding: '10px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>Tukey Upper Fence</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>
            {upperFence.toFixed(1)}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Q3 + 1.5×IQR</div>
        </div>
      </div>

      {/* Number Line Visualizer */}
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
          DATA POINTS DISTRIBUTION & METRIC DRIFT
        </div>

        <div style={{ position: 'relative', height: '60px', margin: '0 10px' }}>
          {/* Upper Fence Indicator Line */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(upperFence)}%`,
              top: '0',
              bottom: '0',
              width: '2px',
              borderLeft: '2px dashed var(--ds-cyan)',
              zIndex: 1,
            }}
          >
            <span style={{ position: 'absolute', top: '-18px', left: '-20px', fontSize: '0.6875rem', color: 'var(--ds-cyan)', whiteSpace: 'nowrap' }}>
              Fence: {upperFence.toFixed(1)}
            </span>
          </div>

          {/* Regular Points (10-18) */}
          {baseValues.map((v, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${scale(v)}%`,
                top: '20px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--ds-text-primary)',
                transform: 'translateX(-50%)',
                opacity: 0.7,
              }}
              title={`Point: ${v}`}
            />
          ))}

          {/* Point X */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(xVal)}%`,
              top: '16px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: isOutlier ? 'var(--ds-amber)' : 'var(--ds-cyan)',
              border: '2px solid #fff',
              transform: 'translateX(-50%)',
              zIndex: 3,
              boxShadow: isOutlier ? '0 0 12px rgba(255, 131, 43, 0.8)' : 'none',
              transition: 'left 0.05s linear',
            }}
            title={`Dynamic X: ${xVal}`}
          />

          {/* Mean Flag Indicator */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(mean)}%`,
              top: '38px',
              width: '3px',
              height: '18px',
              background: 'var(--ds-purple)',
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}
          >
            <span style={{ position: 'absolute', bottom: '-16px', left: '-12px', fontSize: '0.6875rem', color: 'var(--ds-purple)', fontWeight: 600 }}>
              μ={mean.toFixed(1)}
            </span>
          </div>

          {/* Median Flag Indicator */}
          <div
            style={{
              position: 'absolute',
              left: `${scale(median)}%`,
              top: '0px',
              width: '3px',
              height: '18px',
              background: 'var(--ds-emerald)',
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}
          >
            <span style={{ position: 'absolute', top: '-14px', left: '-12px', fontSize: '0.6875rem', color: 'var(--ds-emerald)', fontWeight: 600 }}>
              Med={median.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Axis line */}
        <div style={{ marginTop: '1.75rem', borderTop: '1px solid var(--ds-border-strong)', paddingTop: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
          <span>120</span>
        </div>
      </div>
    </div>
  );
}
