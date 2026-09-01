'use client';

import React, { useState } from 'react';
import { Tag, Slider } from '@carbon/react';
import { Function as FunctionIcon, ArrowRight } from '@carbon/icons-react';

type TransformMode = 'minmax' | 'zscore' | 'linear';

export function FunctionTransformer() {
  const [mode, setMode] = useState<TransformMode>('minmax');
  const [slope, setSlope] = useState(2);
  const [intercept, setIntercept] = useState(5);

  const rawData = [10, 25, 40, 65, 90];

  const calculateOutput = (): number[] => {
    if (mode === 'minmax') {
      const min = Math.min(...rawData);
      const max = Math.max(...rawData);
      return rawData.map((x) => Number(((x - min) / (max - min)).toFixed(3)));
    }
    if (mode === 'zscore') {
      const mean = rawData.reduce((a, b) => a + b, 0) / rawData.length;
      const variance = rawData.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / rawData.length;
      const std = Math.sqrt(variance);
      return rawData.map((x) => Number(((x - mean) / std).toFixed(3)));
    }
    return rawData.map((x) => x * slope + intercept);
  };

  const outputData = calculateOutput();

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Lab 1.5
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            Pure Function Input-Output Transformation Pipeline
          </h3>
        </div>
        <Tag type="purple" size="md">Function Transformer</Tag>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        See how pure transformation functions accept input vectors, apply isolated deterministic mathematical formulas, and return transformed output tensors without side-effects.
      </p>

      {/* Function Selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setMode('minmax')}
          style={{
            padding: '8px 16px',
            background: mode === 'minmax' ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
            border: mode === 'minmax' ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: mode === 'minmax' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          Min-Max Normalization (0 to 1)
        </button>

        <button
          type="button"
          onClick={() => setMode('zscore')}
          style={{
            padding: '8px 16px',
            background: mode === 'zscore' ? 'rgba(138, 63, 252, 0.12)' : 'var(--cds-layer-02)',
            border: mode === 'zscore' ? '1.5px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: mode === 'zscore' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          Standard Z-Score Scaler (μ=0, σ=1)
        </button>

        <button
          type="button"
          onClick={() => setMode('linear')}
          style={{
            padding: '8px 16px',
            background: mode === 'linear' ? 'rgba(0, 157, 154, 0.12)' : 'var(--cds-layer-02)',
            border: mode === 'linear' ? '1.5px solid var(--ds-teal)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: mode === 'linear' ? 'var(--ds-teal)' : 'var(--ds-text-primary)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          Custom Linear Model f(x) = ax + b
        </button>
      </div>

      {mode === 'linear' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <Slider
            id="slope-slider"
            labelText={`Slope (a): ${slope}`}
            min={-5}
            max={5}
            step={1}
            value={slope}
            onChange={({ value }) => setSlope(value)}
          />
          <Slider
            id="intercept-slider"
            labelText={`Intercept (b): ${intercept}`}
            min={-10}
            max={20}
            step={1}
            value={intercept}
            onChange={({ value }) => setIntercept(value)}
          />
        </div>
      )}

      {/* 3-Stage Pipeline Display */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {/* Stage 1: Input */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--cds-layer-02)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
            INPUT VECTOR (X)
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', color: 'var(--ds-text-primary)' }}>
            [{rawData.join(', ')}]
          </div>
        </div>

        {/* Stage 2: Transformer Box */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--cds-layer-01)',
            border: '1.5px solid var(--ds-cyan)',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '4px' }}>
            TRANSFORMATION FUNCTION
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            {mode === 'minmax' && 'f(x) = (x - 10) / (90 - 10)'}
            {mode === 'zscore' && 'f(x) = (x - μ) / σ'}
            {mode === 'linear' && `f(x) = ${slope} * x + ${intercept}`}
          </div>
        </div>

        {/* Stage 3: Output */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--cds-layer-02)',
            border: '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', marginBottom: '4px' }}>
            OUTPUT TENSOR f(X)
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', color: 'var(--ds-cyan)' }}>
            [{outputData.join(', ')}]
          </div>
        </div>
      </div>
    </div>
  );
}
