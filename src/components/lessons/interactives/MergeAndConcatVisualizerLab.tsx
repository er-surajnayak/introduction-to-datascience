'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { JoinInner, Layers, ConnectionSignal, Information, CheckmarkFilled } from '@carbon/icons-react';

const STUDENTS_TABLE = [
  { id: 101, name: 'Rahul' },
  { id: 102, name: 'Priya' },
  { id: 103, name: 'Arjun' },
];

const MARKS_TABLE = [
  { id: 101, score: 85, dept: 'CompSci' },
  { id: 102, score: 92, dept: 'DataSci' },
  { id: 104, score: 78, dept: 'Electrical' },
];

type JoinType = 'inner' | 'left' | 'outer';
type ViewMode = 'merge' | 'concat' | 'numpy_bridge';

export function MergeAndConcatVisualizerLab() {
  const [viewMode, setViewMode] = useState<ViewMode>('merge');
  const [joinType, setJoinType] = useState<JoinType>('inner');

  // Compute merged rows
  const getMergedData = () => {
    if (joinType === 'inner') {
      return [
        { id: 101, name: 'Rahul', score: 85, dept: 'CompSci' },
        { id: 102, name: 'Priya', score: 92, dept: 'DataSci' },
      ];
    }
    if (joinType === 'left') {
      return [
        { id: 101, name: 'Rahul', score: 85, dept: 'CompSci' },
        { id: 102, name: 'Priya', score: 92, dept: 'DataSci' },
        { id: 103, name: 'Arjun', score: 'NaN', dept: 'NaN' },
      ];
    }
    // outer
    return [
      { id: 101, name: 'Rahul', score: 85, dept: 'CompSci' },
      { id: 102, name: 'Priya', score: 92, dept: 'DataSci' },
      { id: 103, name: 'Arjun', score: 'NaN', dept: 'NaN' },
      { id: 104, name: 'NaN', score: 78, dept: 'Electrical' },
    ];
  };

  const mergedRows = getMergedData();

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
          <JoinInner size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            Combining Tables: Relational Merge vs Stacking Concat
          </h3>
          <Tag type="teal" size="sm">pd.merge() vs pd.concat()</Tag>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button
            size="sm"
            kind={viewMode === 'merge' ? 'primary' : 'tertiary'}
            renderIcon={JoinInner}
            onClick={() => setViewMode('merge')}
          >
            pd.merge()
          </Button>
          <Button
            size="sm"
            kind={viewMode === 'concat' ? 'primary' : 'tertiary'}
            renderIcon={Layers}
            onClick={() => setViewMode('concat')}
          >
            pd.concat()
          </Button>
          <Button
            size="sm"
            kind={viewMode === 'numpy_bridge' ? 'primary' : 'tertiary'}
            renderIcon={ConnectionSignal}
            onClick={() => setViewMode('numpy_bridge')}
          >
            NumPy Bridge (.to_numpy())
          </Button>
        </div>
      </div>

      {/* View 1: Merge Visualizer */}
      {viewMode === 'merge' && (
        <div>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
            <code>pd.merge()</code> joins two tables horizontally based on matching key values in a shared column (e.g. <code>on=&quot;StudentID&quot;</code>).
          </p>

          {/* Join Type Selector */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)' }}>
              Join Strategy (how=):
            </span>
            {(['inner', 'left', 'outer'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setJoinType(type)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: joinType === type ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                  background: joinType === type ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
                  color: joinType === type ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                how=&quot;{type}&quot;
              </button>
            ))}
          </div>

          {/* Dual Source Tables */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            {/* Table 1: Students */}
            <div style={{ padding: '1rem', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Table 1: students (Roster)
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ background: 'var(--cds-layer-02)' }}>
                    <th style={{ padding: '6px', textAlign: 'left' }}>StudentID 🔑</th>
                    <th style={{ padding: '6px', textAlign: 'left' }}>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {STUDENTS_TABLE.map((s) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                      <td style={{ padding: '6px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600, color: 'var(--ds-cyan)' }}>{s.id}</td>
                      <td style={{ padding: '6px' }}>{s.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table 2: Marks */}
            <div style={{ padding: '1rem', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-purple)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Table 2: marks (Grades)
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ background: 'var(--cds-layer-02)' }}>
                    <th style={{ padding: '6px', textAlign: 'left' }}>StudentID 🔑</th>
                    <th style={{ padding: '6px', textAlign: 'left' }}>Score</th>
                    <th style={{ padding: '6px', textAlign: 'left' }}>Dept</th>
                  </tr>
                </thead>
                <tbody>
                  {MARKS_TABLE.map((m) => (
                    <tr key={m.id} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                      <td style={{ padding: '6px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600, color: 'var(--ds-purple)' }}>{m.id}</td>
                      <td style={{ padding: '6px' }}>{m.score}</td>
                      <td style={{ padding: '6px' }}>{m.dept}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resulting Merged Output */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '4px',
              background: 'rgba(36, 161, 72, 0.08)',
              border: '1px solid var(--ds-emerald)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-emerald)' }}>
                Result: pd.merge(students, marks, on=&quot;StudentID&quot;, how=&quot;{joinType}&quot;)
              </span>
              <Tag type="green" size="sm">{mergedRows.length} Rows Generated</Tag>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--ds-bg-core)' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>StudentID</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Score</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Dept</th>
                </tr>
              </thead>
              <tbody>
                {mergedRows.map((r, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>{r.id}</td>
                    <td style={{ padding: '8px 12px', color: r.name === 'NaN' ? '#da1e28' : 'inherit' }}>{r.name}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', color: r.score === 'NaN' ? '#da1e28' : 'inherit' }}>{r.score}</td>
                    <td style={{ padding: '8px 12px', color: r.dept === 'NaN' ? '#da1e28' : 'inherit' }}>{r.dept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: Concat Visualizer */}
      {viewMode === 'concat' && (
        <div>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
            <code>pd.concat()</code> stacks datasets vertically (<code>axis=0</code>, appending rows from multiple batches) or horizontally (<code>axis=1</code>, aligning by row index).
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ padding: '1rem', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '6px' }}>
                Batch 1: Semester 1 Records (Rows 0–2)
              </div>
              <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
                [Rahul: 85, Priya: 91, Arjun: 76]
              </div>
            </div>

            <div style={{ padding: '1rem', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-purple)', marginBottom: '6px' }}>
                Batch 2: Semester 2 Records (Rows 3–5)
              </div>
              <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
                [Sneha: 95, Kabir: 68, Meera: 88]
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              borderRadius: '4px',
              background: 'rgba(138, 63, 252, 0.08)',
              borderLeft: '4px solid var(--ds-purple)',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.8125rem',
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--ds-purple)', marginBottom: '4px' }}>
              pd.concat([batch1, batch2], axis=0, ignore_index=True)
            </div>
            <div>Result: Vertically stacked unified DataFrame containing all 6 rows (0 to 5).</div>
          </div>
        </div>
      )}

      {/* View 3: NumPy + Pandas Bridge */}
      {viewMode === 'numpy_bridge' && (
        <div>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
            Every Pandas Series wraps a NumPy ndarray under the hood. You can extract the underlying numerical buffer using <code>.to_numpy()</code> to interface directly with Scipy or Scikit-Learn.
          </p>

          <div
            style={{
              padding: '1.25rem',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
            }}
          >
            <div style={{ color: 'var(--ds-text-muted)' }}># 1. Pandas Series with Index labels</div>
            <div>series_marks = df[&quot;Marks&quot;]</div>
            <div style={{ color: 'var(--ds-text-muted)', marginTop: '8px' }}># 2. Extract homogeneous NumPy ndarray buffer</div>
            <div style={{ color: 'var(--ds-cyan)' }}>numpy_marks = df[&quot;Marks&quot;].to_numpy()</div>
            <div style={{ color: 'var(--ds-emerald)', marginTop: '4px' }}>
              ➔ array([85, 91, 76, 95, 68, 88], dtype=int64)
            </div>
            <div style={{ color: 'var(--ds-text-muted)', marginTop: '8px' }}># 3. High-performance numerical routines</div>
            <div>np.mean(numpy_marks) ➔ <strong>83.83</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}
