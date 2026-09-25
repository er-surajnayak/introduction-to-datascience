'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Table, Code } from '@carbon/icons-react';

const SAMPLE_DF = [
  { Name: 'Rahul', Marks: 85, City: 'Mumbai', Attendance: 92 },
  { Name: 'Priya', Marks: 91, City: 'Pune', Attendance: 88 },
  { Name: 'Arjun', Marks: 76, City: 'Mumbai', Attendance: 75 },
  { Name: 'Sneha', Marks: 95, City: 'Nashik', Attendance: 96 },
  { Name: 'Kabir', Marks: 68, City: 'Pune', Attendance: 81 },
  { Name: 'Meera', Marks: 88, City: 'Mumbai', Attendance: 90 },
];

type InspectionOp = 'head' | 'tail' | 'shape' | 'columns' | 'dtypes' | 'info' | 'describe';

export function PandasSeriesVsDataframeLab() {
  const [activeMethod, setActiveMethod] = useState<InspectionOp>('head');
  const [highlightedCol, setHighlightedCol] = useState<string | null>(null);

  const renderInspectionOutput = () => {
    switch (activeMethod) {
      case 'head':
        return (
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
              <strong>df.head(3)</strong> returns the first 3 rows of the DataFrame to inspect structure and sample data.
            </div>
            <pre style={{ background: 'var(--ds-bg-core)', padding: '10px', borderRadius: '4px', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', overflowX: 'auto' }}>
{`    Name  Marks    City  Attendance
0  Rahul     85  Mumbai          92
1  Priya     91    Pune          88
2  Arjun     76  Mumbai          75`}
            </pre>
          </div>
        );
      case 'tail':
        return (
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
              <strong>df.tail(2)</strong> inspects the last 2 records to verify truncation and terminal formatting.
            </div>
            <pre style={{ background: 'var(--ds-bg-core)', padding: '10px', borderRadius: '4px', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', overflowX: 'auto' }}>
{`    Name  Marks    City  Attendance
4  Kabir     68    Pune          81
5  Meera     88  Mumbai          90`}
            </pre>
          </div>
        );
      case 'shape':
        return (
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
              <strong>df.shape</strong> returns a tuple <code>(n_rows, n_columns)</code> describing matrix dimensions.
            </div>
            <div style={{ background: 'var(--ds-bg-core)', padding: '10px', borderRadius: '4px', fontSize: '1rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
              (6, 4) ➔ 6 Observations across 4 Feature Columns
            </div>
          </div>
        );
      case 'columns':
        return (
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
              <strong>df.columns</strong> returns the Index object containing all column header strings.
            </div>
            <div style={{ background: 'var(--ds-bg-core)', padding: '10px', borderRadius: '4px', fontSize: '0.875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
              Index([&apos;Name&apos;, &apos;Marks&apos;, &apos;City&apos;, &apos;Attendance&apos;], dtype=&apos;object&apos;)
            </div>
          </div>
        );
      case 'dtypes':
        return (
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
              <strong>df.dtypes</strong> reveals storage types for each column (crucial for catching numbers stored as text).
            </div>
            <pre style={{ background: 'var(--ds-bg-core)', padding: '10px', borderRadius: '4px', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', overflowX: 'auto' }}>
{`Name          object
Marks          int64
City          object
Attendance     int64
dtype: object`}
            </pre>
          </div>
        );
      case 'info':
        return (
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
              <strong>df.info()</strong> provides a concise technical summary: row count, non-null counts, and memory footprint.
            </div>
            <pre style={{ background: 'var(--ds-bg-core)', padding: '10px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', overflowX: 'auto' }}>
{`<class 'pandas.core.frame.DataFrame'>
RangeIndex: 6 entries, 0 to 5
Data columns (total 4 columns):
 #   Column      Non-Null Count  Dtype 
---  ------      --------------  ----- 
 0   Name        6 non-null      object
 1   Marks       6 non-null      int64 
 2   City        6 non-null      object
 3   Attendance  6 non-null      int64 
dtypes: int64(2), object(2)
memory usage: 320.0+ bytes`}
            </pre>
          </div>
        );
      case 'describe':
        return (
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
              <strong>df.describe()</strong> generates 8 key summary statistics for numerical features (5-number summary + count/mean/std).
            </div>
            <pre style={{ background: 'var(--ds-bg-core)', padding: '10px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', overflowX: 'auto' }}>
{`           Marks  Attendance
count   6.000000    6.000000
mean   83.833333   87.000000
std    10.048217    7.848567
min    68.000000   75.000000
25%    78.250000   82.750000
50%    86.500000   89.000000
75%    90.250000   91.500000
max    95.000000   96.000000`}
            </pre>
          </div>
        );
    }
  };

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
          <Table size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            Pandas DataFrame Anatomy & Inspection Dashboard
          </h3>
          <Tag type="cyan" size="sm">Series vs DataFrame</Tag>
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        A <strong>Pandas DataFrame</strong> is a 2D labeled tabular container composed of aligned 1D <strong>Series</strong> sharing a common row Index. Click any column header to isolate its Series representation, or use the inspection tools below.
      </p>

      {/* Visual DataFrame Table */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Interactive DataFrame Grid (Click column to view 1D Series)
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--cds-layer-02)', borderBottom: '2px solid var(--ds-border-subtle)' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-muted)', fontSize: '0.75rem' }}>Index</th>
              {['Name', 'Marks', 'City', 'Attendance'].map((col) => (
                <th
                  key={col}
                  onClick={() => setHighlightedCol(highlightedCol === col ? null : col)}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: highlightedCol === col ? 'var(--ds-cyan-dim)' : 'transparent',
                    color: highlightedCol === col ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                    borderBottom: highlightedCol === col ? '2px solid var(--ds-cyan)' : 'none',
                  }}
                >
                  {col} {highlightedCol === col && <Tag type="cyan" size="sm">Series</Tag>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DF.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', fontSize: '0.75rem' }}>
                  {idx}
                </td>
                <td style={{ padding: '8px 12px', background: highlightedCol === 'Name' ? 'rgba(15, 98, 254, 0.08)' : 'transparent', fontWeight: 500 }}>
                  {row.Name}
                </td>
                <td style={{ padding: '8px 12px', background: highlightedCol === 'Marks' ? 'rgba(15, 98, 254, 0.08)' : 'transparent', fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>
                  {row.Marks}
                </td>
                <td style={{ padding: '8px 12px', background: highlightedCol === 'City' ? 'rgba(15, 98, 254, 0.08)' : 'transparent' }}>
                  {row.City}
                </td>
                <td style={{ padding: '8px 12px', background: highlightedCol === 'Attendance' ? 'rgba(15, 98, 254, 0.08)' : 'transparent', fontFamily: 'var(--ds-font-mono)' }}>
                  {row.Attendance}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspection Dashboard Controls */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
          Inspection Dashboard: Click to Execute Method
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {(
            [
              { op: 'head', label: 'df.head()' },
              { op: 'tail', label: 'df.tail()' },
              { op: 'shape', label: 'df.shape' },
              { op: 'columns', label: 'df.columns' },
              { op: 'dtypes', label: 'df.dtypes' },
              { op: 'info', label: 'df.info()' },
              { op: 'describe', label: 'df.describe()' },
            ] as const
          ).map((item) => (
            <Button
              key={item.op}
              size="sm"
              kind={activeMethod === item.op ? 'primary' : 'tertiary'}
              onClick={() => setActiveMethod(item.op)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Inspection Result Console */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: 'var(--ds-cyan)', fontSize: '0.8125rem', fontWeight: 600 }}>
          <Code size={16} />
          <span>Execution Output for df.{activeMethod}</span>
        </div>
        {renderInspectionOutput()}
      </div>
    </div>
  );
}
