'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { CenterCircle, Rotate } from '@carbon/icons-react';

const MATRIX_2D = [
  [80, 85, 90],  // Student 0: Math, Physics, Chem
  [70, 75, 80],  // Student 1
  [90, 95, 100], // Student 2
];

const STUDENT_NAMES = ['Student 0 (Rahul)', 'Student 1 (Priya)', 'Student 2 (Arjun)'];
const SUBJECT_NAMES = ['Math', 'Physics', 'Chemistry'];

export function NumpyAggregationAndAxisLab() {
  const [selectedAxis, setSelectedAxis] = useState<0 | 1 | 'all'>(0);
  const [selectedMetric, setSelectedMetric] = useState<'mean' | 'sum' | 'min' | 'max' | 'std'>('mean');
  const [reshapeMode, setReshapeMode] = useState<'1d' | '2x3' | '3x2'>('2x3');

  // Compute 2D reductions
  const computeAggregate = () => {
    const calc = (vals: number[]) => {
      const sum = vals.reduce((a, b) => a + b, 0);
      const mean = sum / vals.length;
      if (selectedMetric === 'sum') return sum;
      if (selectedMetric === 'mean') return +mean.toFixed(1);
      if (selectedMetric === 'min') return Math.min(...vals);
      if (selectedMetric === 'max') return Math.max(...vals);
      if (selectedMetric === 'std') {
        const variance = vals.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / vals.length;
        return +Math.sqrt(variance).toFixed(2);
      }
      return mean;
    };

    if (selectedAxis === 'all') {
      const allVals = MATRIX_2D.flat();
      return { type: 'scalar', values: [calc(allVals)] };
    }

    if (selectedAxis === 0) {
      // Down rows -> per column (subject)
      const col0 = [MATRIX_2D[0][0], MATRIX_2D[1][0], MATRIX_2D[2][0]];
      const col1 = [MATRIX_2D[0][1], MATRIX_2D[1][1], MATRIX_2D[2][1]];
      const col2 = [MATRIX_2D[0][2], MATRIX_2D[1][2], MATRIX_2D[2][2]];
      return { type: 'col', values: [calc(col0), calc(col1), calc(col2)] };
    } else {
      // Across cols -> per row (student)
      return {
        type: 'row',
        values: [calc(MATRIX_2D[0]), calc(MATRIX_2D[1]), calc(MATRIX_2D[2])],
      };
    }
  };

  const aggResult = computeAggregate();

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CenterCircle size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            2D Array Axis Explorer & Reshaping Visualizer
          </h3>
          <Tag type="purple" size="sm">axis=0 vs axis=1</Tag>
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        In 2D arrays, the <code>axis</code> parameter controls the direction of reduction. <strong>axis=0</strong> collapses down rows (yielding one aggregate per column), while <strong>axis=1</strong> collapses across columns (yielding one aggregate per row).
      </p>

      {/* Axis & Metric Selectors */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
            Choose Axis Direction:
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Button
              size="sm"
              kind={selectedAxis === 0 ? 'primary' : 'tertiary'}
              onClick={() => setSelectedAxis(0)}
            >
              axis=0 (Down Rows ➔ Per Column)
            </Button>
            <Button
              size="sm"
              kind={selectedAxis === 1 ? 'primary' : 'tertiary'}
              onClick={() => setSelectedAxis(1)}
            >
              axis=1 (Across Cols ➔ Per Row)
            </Button>
            <Button
              size="sm"
              kind={selectedAxis === 'all' ? 'primary' : 'tertiary'}
              onClick={() => setSelectedAxis('all')}
            >
              axis=None (Global Total)
            </Button>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
            Statistical Metric:
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['mean', 'sum', 'min', 'max', 'std'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMetric(m)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '4px',
                  border: selectedMetric === m ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                  background: selectedMetric === m ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
                  color: selectedMetric === m ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2D Matrix Table with Dynamic Axis Overlay */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
          2D Array: scores (3 Students × 3 Subjects) — Shape (3, 3)
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--cds-layer-02)' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-muted)', fontSize: '0.75rem' }}>Row \\ Col</th>
              {SUBJECT_NAMES.map((subj, cIdx) => (
                <th key={subj} style={{ padding: '8px 12px', color: selectedAxis === 0 ? 'var(--ds-cyan)' : 'var(--ds-text-primary)' }}>
                  Col [{cIdx}]: {subj}
                </th>
              ))}
              {selectedAxis === 1 && (
                <th style={{ padding: '8px 12px', background: 'rgba(15, 98, 254, 0.15)', color: 'var(--ds-cyan)' }}>
                  Result (np.{selectedMetric}, axis=1)
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {MATRIX_2D.map((row, rIdx) => (
              <tr key={rIdx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: selectedAxis === 1 ? 'var(--ds-cyan)' : 'var(--ds-text-primary)' }}>
                  Row [{rIdx}]: {STUDENT_NAMES[rIdx]}
                </td>
                {row.map((val, cIdx) => (
                  <td
                    key={cIdx}
                    style={{
                      padding: '10px 12px',
                      fontFamily: 'var(--ds-font-mono)',
                      fontWeight: 600,
                      background:
                        selectedAxis === 0
                          ? 'rgba(15, 98, 254, 0.05)'
                          : selectedAxis === 1
                          ? 'rgba(138, 63, 252, 0.05)'
                          : 'transparent',
                    }}
                  >
                    {val}
                  </td>
                ))}
                {selectedAxis === 1 && (
                  <td
                    style={{
                      padding: '10px 12px',
                      fontFamily: 'var(--ds-font-mono)',
                      fontWeight: 700,
                      color: 'var(--ds-emerald)',
                      background: 'rgba(36, 161, 72, 0.15)',
                    }}
                  >
                    {aggResult.values[rIdx]}
                  </td>
                )}
              </tr>
            ))}

            {/* Bottom Row for axis=0 Result */}
            {selectedAxis === 0 && (
              <tr style={{ background: 'rgba(36, 161, 72, 0.15)', borderTop: '2px solid var(--ds-emerald)' }}>
                <td style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--ds-emerald)' }}>
                  Result (np.{selectedMetric}, axis=0):
                </td>
                {aggResult.values.map((v, idx) => (
                  <td key={idx} style={{ padding: '10px 12px', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-emerald)' }}>
                    {v}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Code Explanation Snippet */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: 'rgba(15, 98, 254, 0.08)',
          borderLeft: '4px solid var(--ds-cyan)',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-primary)',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
        }}
      >
        <strong>Python Execution:</strong>
        {selectedAxis === 0 && (
          <div>
            <code>np.{selectedMetric}(scores, axis=0)</code> ➔ Output shape: <code>(3,)</code>. Computes the {selectedMetric} of each <strong>subject column</strong> across all 3 students.
          </div>
        )}
        {selectedAxis === 1 && (
          <div>
            <code>np.{selectedMetric}(scores, axis=1)</code> ➔ Output shape: <code>(3,)</code>. Computes the {selectedMetric} of each <strong>student row</strong> across all 3 subjects.
          </div>
        )}
        {selectedAxis === 'all' && (
          <div>
            <code>np.{selectedMetric}(scores)</code> ➔ Output scalar: <code>{aggResult.values[0]}</code>. Collapses all 9 elements into a single global {selectedMetric}.
          </div>
        )}
      </div>

      {/* Section 2: Reshape Visualizer */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Rotate size={16} style={{ color: 'var(--ds-purple)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              Array Reshaping: numbers = np.array([1, 2, 3, 4, 5, 6])
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setReshapeMode('1d')}
              style={{
                padding: '4px 8px',
                borderRadius: '3px',
                border: reshapeMode === '1d' ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: reshapeMode === '1d' ? 'var(--ds-bg-core)' : 'transparent',
                color: 'var(--ds-text-primary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Shape (6,) [1D]
            </button>
            <button
              onClick={() => setReshapeMode('2x3')}
              style={{
                padding: '4px 8px',
                borderRadius: '3px',
                border: reshapeMode === '2x3' ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: reshapeMode === '2x3' ? 'var(--ds-bg-core)' : 'transparent',
                color: 'var(--ds-text-primary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              .reshape(2, 3) [2D]
            </button>
            <button
              onClick={() => setReshapeMode('3x2')}
              style={{
                padding: '4px 8px',
                borderRadius: '3px',
                border: reshapeMode === '3x2' ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: reshapeMode === '3x2' ? 'var(--ds-bg-core)' : 'transparent',
                color: 'var(--ds-text-primary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              .reshape(3, 2) [2D]
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: '0 0 10px 0' }}>
          Reshaping modifies the dimension views while keeping the underlying 6 continuous memory elements identical.
        </p>

        {reshapeMode === '1d' && (
          <div style={{ display: 'flex', gap: '6px', fontFamily: 'var(--ds-font-mono)' }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} style={{ padding: '8px 14px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-purple)', fontWeight: 700, color: 'var(--ds-purple)' }}>
                {n}
              </div>
            ))}
          </div>
        )}

        {reshapeMode === '2x3' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--ds-font-mono)' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3].map((n) => (
                <div key={n} style={{ padding: '8px 14px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-purple)', fontWeight: 700, color: 'var(--ds-purple)' }}>
                  {n}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[4, 5, 6].map((n) => (
                <div key={n} style={{ padding: '8px 14px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-purple)', fontWeight: 700, color: 'var(--ds-purple)' }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        )}

        {reshapeMode === '3x2' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--ds-font-mono)' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2].map((n) => (
                <div key={n} style={{ padding: '8px 14px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-purple)', fontWeight: 700, color: 'var(--ds-purple)' }}>
                  {n}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[3, 4].map((n) => (
                <div key={n} style={{ padding: '8px 14px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-purple)', fontWeight: 700, color: 'var(--ds-purple)' }}>
                  {n}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[5, 6].map((n) => (
                <div key={n} style={{ padding: '8px 14px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-purple)', fontWeight: 700, color: 'var(--ds-purple)' }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
