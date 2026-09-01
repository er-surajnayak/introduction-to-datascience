'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  DirectionStraight,
  ArrowDown,
  ArrowRight,
} from '@carbon/icons-react';

const studentGrades = [
  [80, 90, 70],
  [60, 75, 85],
  [92, 88, 95],
];

export function AxisVisualizer() {
  const [selectedAxis, setSelectedAxis] = useState<0 | 1>(0);

  // axis=0: column averages [Math, Physics, Chem]
  const colMeans = [
    ((80 + 60 + 92) / 3).toFixed(1),
    ((90 + 75 + 88) / 3).toFixed(1),
    ((70 + 85 + 95) / 3).toFixed(1),
  ];

  // axis=1: row averages [Student 0, 1, 2]
  const rowMeans = [
    ((80 + 90 + 70) / 3).toFixed(1),
    ((60 + 75 + 85) / 3).toFixed(1),
    ((92 + 88 + 95) / 3).toFixed(1),
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
            Interactive Experience 5
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Understanding NumPy Axis: 0 vs 1
          </h3>
        </div>
        <Tag type="purple" size="md">
          Dimensional Reductions
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        In multidimensional arrays, the <code>axis</code> parameter tells NumPy which dimension to collapse. Toggle between <code>axis=0</code> and <code>axis=1</code> to visualize the directional reduction:
      </p>

      {/* Axis Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setSelectedAxis(0)}
          style={{
            flex: 1,
            padding: '10px',
            background: selectedAxis === 0 ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
            border: selectedAxis === 0 ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: selectedAxis === 0 ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
            cursor: 'pointer',
          }}
        >
          axis = 0 (Collapse Rows ↓ Column-wise Subject Means)
        </button>

        <button
          type="button"
          onClick={() => setSelectedAxis(1)}
          style={{
            flex: 1,
            padding: '10px',
            background: selectedAxis === 1 ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface-elevated)',
            border: selectedAxis === 1 ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: selectedAxis === 1 ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
            cursor: 'pointer',
          }}
        >
          axis = 1 (Collapse Columns → Row-wise Student Means)
        </button>
      </div>

      {/* 2D Matrix Table with Directional Flow */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '100px 90px 90px 90px 110px', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>STUDENTS</div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textAlign: 'center' }}>Math (Col 0)</div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textAlign: 'center' }}>Physics (Col 1)</div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textAlign: 'center' }}>Chem (Col 2)</div>
          {selectedAxis === 1 && (
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)', textAlign: 'center' }}>
              Student Mean
            </div>
          )}
        </div>

        {studentGrades.map((row, rIdx) => (
          <div
            key={rIdx}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 90px 90px 90px 110px',
              gap: '8px',
              alignItems: 'center',
              marginBottom: '6px',
            }}
          >
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-secondary)' }}>
              Student {rIdx}
            </div>
            {row.map((score, cIdx) => (
              <div
                key={cIdx}
                style={{
                  padding: '8px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: selectedAxis === 0 ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--ds-text-primary)',
                }}
              >
                {score}
              </div>
            ))}

            {selectedAxis === 1 && (
              <div
                style={{
                  padding: '8px',
                  background: 'var(--ds-purple-dim)',
                  border: '1.5px solid var(--ds-purple)',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--ds-purple)',
                }}
              >
                {rowMeans[rIdx]}
              </div>
            )}
          </div>
        ))}

        {/* axis=0 Summary Row at bottom */}
        {selectedAxis === 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 90px 90px 90px 110px',
              gap: '8px',
              alignItems: 'center',
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: '1.5px dashed var(--ds-cyan)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 700 }}>
              Subject Means:
            </div>
            {colMeans.map((meanVal, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px',
                  background: 'var(--ds-cyan-dim)',
                  border: '1.5px solid var(--ds-cyan)',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--ds-cyan)',
                }}
              >
                {meanVal}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Code Signature */}
      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.875rem',
          color: selectedAxis === 0 ? 'var(--ds-cyan)' : 'var(--ds-purple)',
        }}
      >
        <span style={{ color: 'var(--ds-text-muted)' }}>CALL: </span>
        <span>
          {selectedAxis === 0
            ? 'np.mean(grades, axis=0)  # Output: array([77.3, 84.3, 83.3])'
            : 'np.mean(grades, axis=1)  # Output: array([80.0, 73.3, 91.7])'}
        </span>
      </div>
    </div>
  );
}
