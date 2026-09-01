'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Grid,
  Row,
  Column,
  Information,
} from '@carbon/icons-react';

export function ArrayBuilder() {
  const [dimensionMode, setDimensionMode] = useState<'1D' | '2D'>('1D');

  // 1D Sample Data
  const [array1D, setArray1D] = useState<number[]>([10, 20, 30, 40]);

  // 2D Sample Data (2 rows x 3 cols)
  const array2D: number[][] = [
    [10, 20, 30],
    [40, 50, 60],
  ];

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
            Interactive Experience 1
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Array Builder: 1D Vectors & 2D Matrices
          </h3>
        </div>
        <Tag type="cyan" size="md">
          ndarray Anatomy
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        An <code>ndarray</code> (N-Dimensional Array) represents structured numerical data. Toggle between 1D vector and 2D matrix representations to inspect its core structural properties:
      </p>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setDimensionMode('1D')}
          style={{
            flex: 1,
            padding: '10px',
            background: dimensionMode === '1D' ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
            border: dimensionMode === '1D' ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: dimensionMode === '1D' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
            cursor: 'pointer',
          }}
        >
          1. One-Dimensional Vector (1D)
        </button>

        <button
          type="button"
          onClick={() => setDimensionMode('2D')}
          style={{
            flex: 1,
            padding: '10px',
            background: dimensionMode === '2D' ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface-elevated)',
            border: dimensionMode === '2D' ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: dimensionMode === '2D' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
            cursor: 'pointer',
          }}
        >
          2. Two-Dimensional Matrix (2D)
        </button>
      </div>

      {/* Visual Array Grid */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '12px' }}>
          MEMORY BUFFER REPRESENTATION:
        </div>

        {dimensionMode === '1D' ? (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {array1D.map((val, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 20px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1.5px solid var(--ds-cyan)',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                  index [{idx}]
                </div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginTop: '2px' }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {array2D.map((row, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)', width: '60px' }}>
                  Row {rIdx}:
                </span>
                {row.map((val, cIdx) => (
                  <div
                    key={cIdx}
                    style={{
                      padding: '10px 18px',
                      background: 'var(--ds-bg-surface-elevated)',
                      border: '1.5px solid var(--ds-purple)',
                      borderRadius: '4px',
                      textAlign: 'center',
                      minWidth: '70px',
                    }}
                  >
                    <div style={{ fontSize: '0.625rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                      [{rIdx}, {cIdx}]
                    </div>
                    <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4 Structural Property Inspector Tiles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>arr.shape</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginTop: '2px' }}>
            {dimensionMode === '1D' ? '(4,)' : '(2, 3)'}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>
            {dimensionMode === '1D' ? '4 elements vector' : '2 rows × 3 columns'}
          </div>
        </div>

        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-teal)' }}>arr.ndim</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginTop: '2px' }}>
            {dimensionMode === '1D' ? '1' : '2'}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>
            {dimensionMode === '1D' ? '1 axis (1-dimensional)' : '2 axes (2-dimensional)'}
          </div>
        </div>

        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>arr.size</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginTop: '2px' }}>
            {dimensionMode === '1D' ? '4' : '6'}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Total elements in array</div>
        </div>

        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)' }}>arr.dtype</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginTop: '2px' }}>
            int64
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>64-bit integer buffer</div>
        </div>
      </div>

      {/* Code Signature */}
      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.8125rem',
          color: 'var(--ds-cyan)',
        }}
      >
        <span style={{ color: 'var(--ds-text-muted)' }}>NUMPY CREATION SYNTAX: </span>
        <span>
          {dimensionMode === '1D'
            ? 'arr = np.array([10, 20, 30, 40])'
            : 'matrix = np.array([[10, 20, 30], [40, 50, 60]])'}
        </span>
      </div>
    </div>
  );
}
