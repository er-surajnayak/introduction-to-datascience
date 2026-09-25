'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Filter, CheckmarkFilled, CloseFilled, ArrowsVertical, Information } from '@carbon/icons-react';

const RAW_STUDENTS = [
  { id: 0, name: 'Rahul', marks: 85, city: 'Mumbai', attendance: 92 },
  { id: 1, name: 'Priya', marks: 91, city: 'Pune', attendance: 88 },
  { id: 2, name: 'Arjun', marks: 76, city: 'Mumbai', attendance: 75 },
  { id: 3, name: 'Sneha', marks: 95, city: 'Nashik', attendance: 96 },
  { id: 4, name: 'Kabir', marks: 68, city: 'Pune', attendance: 81 },
  { id: 5, name: 'Meera', marks: 88, city: 'Mumbai', attendance: 90 },
];

type FilterMode = 'all' | 'marks80' | 'and_condition' | 'or_condition' | 'not_mumbai';

export function BooleanMaskAndFilteringLab() {
  const [filterMode, setFilterMode] = useState<FilterMode>('marks80');
  const [sortField, setSortField] = useState<'none' | 'marks_asc' | 'marks_desc' | 'att_desc'>('none');

  const evaluateCondition = (row: typeof RAW_STUDENTS[0]): boolean => {
    switch (filterMode) {
      case 'marks80':
        return row.marks > 80;
      case 'and_condition':
        return row.marks > 80 && row.attendance > 85;
      case 'or_condition':
        return row.city === 'Mumbai' || row.marks > 90;
      case 'not_mumbai':
        return row.city !== 'Mumbai';
      case 'all':
      default:
        return true;
    }
  };

  const getSyntaxString = () => {
    switch (filterMode) {
      case 'marks80':
        return 'df["Marks"] > 80';
      case 'and_condition':
        return '(df["Marks"] > 80) & (df["Attendance"] > 85)';
      case 'or_condition':
        return '(df["City"] == "Mumbai") | (df["Marks"] > 90)';
      case 'not_mumbai':
        return '~(df["City"] == "Mumbai")';
      case 'all':
        return 'df (No filter applied)';
    }
  };

  // Get boolean evaluations for each row
  const maskArray = RAW_STUDENTS.map((r) => evaluateCondition(r));

  // Filter and Sort data
  let filteredData = RAW_STUDENTS.filter((_, idx) => maskArray[idx]);

  if (sortField === 'marks_asc') {
    filteredData = [...filteredData].sort((a, b) => a.marks - b.marks);
  } else if (sortField === 'marks_desc') {
    filteredData = [...filteredData].sort((a, b) => b.marks - a.marks);
  } else if (sortField === 'att_desc') {
    filteredData = [...filteredData].sort((a, b) => b.attendance - a.attendance);
  }

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
          <Filter size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            Boolean Masking, Logical Operators (&, |, ~) & Sorting
          </h3>
          <Tag type="green" size="sm">df[mask]</Tag>
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        In Pandas, filtering evaluates conditions element-by-element to construct a <strong>Boolean Mask</strong> (a Series of <code>True</code> / <code>False</code> values). Passing <code>df[mask]</code> selects only the rows where the mask is <code>True</code>.
      </p>

      {/* Filter Presets */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
          Select Boolean Filter Expression:
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <Button
            size="sm"
            kind={filterMode === 'marks80' ? 'primary' : 'tertiary'}
            onClick={() => setFilterMode('marks80')}
          >
            Marks &gt; 80 (Single)
          </Button>
          <Button
            size="sm"
            kind={filterMode === 'and_condition' ? 'primary' : 'tertiary'}
            onClick={() => setFilterMode('and_condition')}
          >
            Marks &gt; 80 &amp; Attendance &gt; 85 (AND)
          </Button>
          <Button
            size="sm"
            kind={filterMode === 'or_condition' ? 'primary' : 'tertiary'}
            onClick={() => setFilterMode('or_condition')}
          >
            City == &quot;Mumbai&quot; | Marks &gt; 90 (OR)
          </Button>
          <Button
            size="sm"
            kind={filterMode === 'not_mumbai' ? 'primary' : 'tertiary'}
            onClick={() => setFilterMode('not_mumbai')}
          >
            ~(City == &quot;Mumbai&quot;) (NOT)
          </Button>
          <Button
            size="sm"
            kind={filterMode === 'all' ? 'primary' : 'tertiary'}
            onClick={() => setFilterMode('all')}
          >
            Show All Rows
          </Button>
        </div>
      </div>

      {/* Boolean Mask Inspector Grid */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
            Step 1: Generated Boolean Mask ➔ <code>mask = {getSyntaxString()}</code>
          </div>
          <Tag type={maskArray.filter(Boolean).length === RAW_STUDENTS.length ? 'warm-gray' : 'cyan'} size="sm">
            {maskArray.filter(Boolean).length} / {RAW_STUDENTS.length} Rows Retained (True)
          </Tag>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--cds-layer-02)' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-muted)', fontSize: '0.75rem' }}>Row</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Marks</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>City</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Attendance</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', background: 'rgba(15, 98, 254, 0.1)', color: 'var(--ds-cyan)' }}>
                Evaluated Mask [True / False]
              </th>
            </tr>
          </thead>
          <tbody>
            {RAW_STUDENTS.map((row, idx) => {
              const isKept = maskArray[idx];
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    background: isKept ? 'rgba(36, 161, 72, 0.08)' : 'rgba(218, 30, 40, 0.04)',
                    opacity: isKept ? 1 : 0.45,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>{idx}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>{row.marks}</td>
                  <td style={{ padding: '8px 12px' }}>{row.city}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>{row.attendance}%</td>
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                    {isKept ? (
                      <Tag type="green" size="sm" renderIcon={CheckmarkFilled}>True (Kept)</Tag>
                    ) : (
                      <Tag type="red" size="sm" renderIcon={CloseFilled}>False (Filtered Out)</Tag>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Step 2: Filtered & Sorted Output */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-emerald)' }}>
            Step 2: Resulting Filtered DataFrame ➔ <code>df[{getSyntaxString()}]</code>
          </div>

          {/* Sort Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowsVertical size={16} style={{ color: 'var(--ds-text-muted)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Sort by:</span>
            <button
              onClick={() => setSortField('none')}
              style={{
                padding: '4px 8px',
                borderRadius: '3px',
                border: sortField === 'none' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: sortField === 'none' ? 'var(--ds-bg-core)' : 'transparent',
                color: 'var(--ds-text-primary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Default
            </button>
            <button
              onClick={() => setSortField('marks_desc')}
              style={{
                padding: '4px 8px',
                borderRadius: '3px',
                border: sortField === 'marks_desc' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: sortField === 'marks_desc' ? 'var(--ds-bg-core)' : 'transparent',
                color: 'var(--ds-text-primary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Marks ↓ (Desc)
            </button>
            <button
              onClick={() => setSortField('att_desc')}
              style={{
                padding: '4px 8px',
                borderRadius: '3px',
                border: sortField === 'att_desc' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: sortField === 'att_desc' ? 'var(--ds-bg-core)' : 'transparent',
                color: 'var(--ds-text-primary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Attendance ↓ (Desc)
            </button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-core)' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Marks</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>City</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.name}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 700 }}>{row.marks}</td>
                <td style={{ padding: '8px 12px' }}>{row.city}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>{row.attendance}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
