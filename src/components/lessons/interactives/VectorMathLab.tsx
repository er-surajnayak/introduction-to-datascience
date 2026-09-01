'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, NumberInput } from '@carbon/react';
import {
  Calculator,
  ArrowRight,
  ArrowsHorizontal,
} from '@carbon/icons-react';

const baseScores = [60, 70, 80, 90];

export function VectorMathLab() {
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/' | '>'>('+');
  const [scalar, setScalar] = useState<number>(5);

  const calculateResult = () => {
    return baseScores.map((s) => {
      if (operator === '+') return s + scalar;
      if (operator === '-') return s - scalar;
      if (operator === '*') return s * scalar;
      if (operator === '/') return Number((s / scalar).toFixed(1));
      if (operator === '>') return s > scalar ? 'True' : 'False';
      return s;
    });
  };

  const results = calculateResult();

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2.5rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      {/* Header */}
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
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
            }}
          >
            Interactive Experience 4
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Vectorized Math & Broadcasting Visualizer
          </h3>
        </div>
        <Tag type="cyan" size="md">
          SIMD Parallel Math
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        In NumPy, arithmetic is applied at the <strong>array level</strong> across all elements simultaneously without writing Python <code>for</code> loops. Choose an operator and scalar value:
      </p>

      {/* Operator Switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[
          { op: '+', label: 'Addition (+)' },
          { op: '-', label: 'Subtraction (-)' },
          { op: '*', label: 'Multiplication (*)' },
          { op: '/', label: 'Division (/)' },
          { op: '>', label: 'Comparison (>)' },
        ].map((item) => {
          const isSelected = operator === item.op;
          return (
            <button
              key={item.op}
              type="button"
              onClick={() => setOperator(item.op as any)}
              style={{
                padding: '8px 14px',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                border: isSelected ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 700 : 400,
                color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Scalar Config */}
      <div style={{ maxWidth: '180px', marginBottom: '1.5rem' }}>
        <NumberInput
          id="scalar-value"
          label="Scalar Operand Value"
          value={scalar}
          min={1}
          max={100}
          step={1}
          onChange={(_e, { value }) => setScalar(Number(value))}
        />
      </div>

      {/* 3-Stage Vectorized Flow */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        {/* Stage 1: Input Array */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
            INPUT NDARRAY
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            [{baseScores.join(', ')}]
          </div>
        </div>

        {/* Stage 2: Broadcasted Scalar */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface-elevated)', border: '1.5px solid var(--ds-cyan)', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '4px' }}>
            BROADCASTED {operator} {scalar}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
            Scalar applied to all 4 elements
          </div>
        </div>

        {/* Stage 3: Computed Result Array */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface)', border: '2px solid var(--ds-emerald)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', marginBottom: '6px' }}>
            VECTORIZED RESULT
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
            [{results.join(', ')}]
          </div>
        </div>
      </div>

      {/* Code One-Liner */}
      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.875rem',
          color: 'var(--ds-cyan)',
        }}
      >
        <span style={{ color: 'var(--ds-text-muted)' }}>EXPRESSION: </span>
        <span>result = scores {operator} {scalar}</span>
      </div>
    </div>
  );
}
