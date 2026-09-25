'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Network_3, CheckmarkFilled, ChartClusterBar, Information } from '@carbon/icons-react';

interface StudentRecord {
  name: string;
  city: string;
  marks: number;
}

const ROSTER: StudentRecord[] = [
  { name: 'Rahul', city: 'Mumbai', marks: 85 },
  { name: 'Priya', city: 'Pune', marks: 91 },
  { name: 'Arjun', city: 'Mumbai', marks: 76 },
  { name: 'Sneha', city: 'Pune', marks: 95 },
  { name: 'Kabir', city: 'Pune', marks: 68 },
  { name: 'Meera', city: 'Mumbai', marks: 88 },
];

type AggMetric = 'mean' | 'sum' | 'min' | 'max' | 'count';

export function GroupByVisualizerLab() {
  const [activeMetric, setActiveMetric] = useState<AggMetric>('mean');
  const [showDifferentiator, setShowDifferentiator] = useState(false);

  // Group records by city
  const mumbaiGroup = ROSTER.filter((r) => r.city === 'Mumbai');
  const puneGroup = ROSTER.filter((r) => r.city === 'Pune');

  const computeMetric = (students: StudentRecord[], metric: AggMetric) => {
    const marks = students.map((s) => s.marks);
    const sum = marks.reduce((a, b) => a + b, 0);
    const mean = +(sum / marks.length).toFixed(2);
    if (metric === 'sum') return sum;
    if (metric === 'mean') return mean;
    if (metric === 'min') return Math.min(...marks);
    if (metric === 'max') return Math.max(...marks);
    if (metric === 'count') return marks.length;
    return mean;
  };

  const mumbaiVal = computeMetric(mumbaiGroup, activeMetric);
  const puneVal = computeMetric(puneGroup, activeMetric);

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
          <Network_3 size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            GroupBy: The Split ➔ Apply ➔ Combine Paradigm
          </h3>
          <Tag type="cyan" size="sm">df.groupby()</Tag>
        </div>
        <Button
          size="sm"
          kind="ghost"
          onClick={() => setShowDifferentiator(!showDifferentiator)}
        >
          {showDifferentiator ? 'Hide value_counts / nunique' : 'Show value_counts vs unique vs nunique'}
        </Button>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        <code>df.groupby()</code> partitions rows into categorical subsets (<strong>Split</strong>), applies a calculation like <code>.mean()</code> to each subset (<strong>Apply</strong>), and stitches the summary back into a DataFrame (<strong>Combine</strong>).
      </p>

      {/* Aggregation Function Selector */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)' }}>
          Choose Aggregation Metric:
        </span>
        {(['mean', 'sum', 'min', 'max', 'count'] as const).map((m) => (
          <Button
            key={m}
            size="sm"
            kind={activeMetric === m ? 'primary' : 'tertiary'}
            onClick={() => setActiveMetric(m)}
          >
            .{m}()
          </Button>
        ))}
      </div>

      {/* 3-Stage Visual Pipeline */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Stage 1: Split */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '4px',
            background: 'var(--ds-bg-core)',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
            1. Split (Partition by City)
          </div>

          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
              📍 Group: Mumbai (3 records)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {mumbaiGroup.map((s) => (
                <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--cds-layer-02)', borderRadius: '3px', fontSize: '0.75rem' }}>
                  <span>{s.name}</span>
                  <span style={{ fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>{s.marks} pts</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
              📍 Group: Pune (3 records)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {puneGroup.map((s) => (
                <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--cds-layer-02)', borderRadius: '3px', fontSize: '0.75rem' }}>
                  <span>{s.name}</span>
                  <span style={{ fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>{s.marks} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage 2: Apply */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '4px',
            background: 'var(--ds-bg-core)',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-purple)', textTransform: 'uppercase', marginBottom: '8px' }}>
            2. Apply (Compute .{activeMetric}())
          </div>

          <div style={{ padding: '10px', background: 'var(--cds-layer-02)', borderRadius: '4px', marginBottom: '10px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Mumbai Calculation:</div>
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)' }}>
              {activeMetric === 'mean' && '(85 + 76 + 88) / 3 = 83.00'}
              {activeMetric === 'sum' && '85 + 76 + 88 = 249'}
              {activeMetric === 'min' && 'min(85, 76, 88) = 76'}
              {activeMetric === 'max' && 'max(85, 76, 88) = 88'}
              {activeMetric === 'count' && 'count([85, 76, 88]) = 3'}
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)', marginTop: '4px' }}>
              ➔ {mumbaiVal}
            </div>
          </div>

          <div style={{ padding: '10px', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Pune Calculation:</div>
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)' }}>
              {activeMetric === 'mean' && '(91 + 95 + 68) / 3 = 84.67'}
              {activeMetric === 'sum' && '91 + 95 + 68 = 254'}
              {activeMetric === 'min' && 'min(91, 95, 68) = 68'}
              {activeMetric === 'max' && 'max(91, 95, 68) = 95'}
              {activeMetric === 'count' && 'count([91, 95, 68]) = 3'}
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-purple)', marginTop: '4px' }}>
              ➔ {puneVal}
            </div>
          </div>
        </div>

        {/* Stage 3: Combine */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '4px',
            background: 'rgba(36, 161, 72, 0.08)',
            border: '1px solid var(--ds-emerald)',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-emerald)', textTransform: 'uppercase', marginBottom: '8px' }}>
            3. Combine (Final Summary)
          </div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
            <code>df.groupby(&quot;City&quot;)[&quot;Marks&quot;].{activeMetric}()</code>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--ds-bg-core)' }}>
                <th style={{ padding: '6px 10px', textAlign: 'left', fontWeight: 600 }}>City (Index)</th>
                <th style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 600, color: 'var(--ds-emerald)' }}>Marks ({activeMetric})</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '6px 10px', fontWeight: 600 }}>Mumbai</td>
                <td style={{ padding: '6px 10px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>{mumbaiVal}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', fontWeight: 600 }}>Pune</td>
                <td style={{ padding: '6px 10px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>{puneVal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Value Counts vs Unique vs Nunique Comparison Card */}
      {showDifferentiator && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '4px',
            background: 'var(--cds-layer-02)',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Critical Distinction: value_counts() vs unique() vs nunique()
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px',
              fontSize: '0.8125rem',
            }}
          >
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '4px' }}>
              <strong style={{ color: 'var(--ds-cyan)', display: 'block' }}>df[&quot;City&quot;].value_counts()</strong>
              <div style={{ color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                Returns frequency Series: <code>Mumbai: 3, Pune: 3</code>
              </div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '4px' }}>
              <strong style={{ color: 'var(--ds-purple)', display: 'block' }}>df[&quot;City&quot;].unique()</strong>
              <div style={{ color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                Returns ndarray of distinct categories: <code>[&apos;Mumbai&apos;, &apos;Pune&apos;]</code>
              </div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '4px' }}>
              <strong style={{ color: 'var(--ds-emerald)', display: 'block' }}>df[&quot;City&quot;].nunique()</strong>
              <div style={{ color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                Returns scalar integer count: <code>2</code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
