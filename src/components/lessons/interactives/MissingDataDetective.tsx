'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Help,
  Information,
  CheckmarkFilled,
  WarningAlt,
  Table,
  Calculator,
} from '@carbon/icons-react';

interface StudentRow {
  id: number;
  name: string;
  age: number | null;
  marks: number | null;
  department: string | null;
  attendance: number | null;
}

const rawStudents: StudentRow[] = [
  { id: 101, name: 'Rahul', age: 21, marks: 85, department: 'CSE', attendance: 92 },
  { id: 102, name: 'Priya', age: 22, marks: null, department: 'ECE', attendance: 88 },
  { id: 103, name: 'Aman', age: null, marks: 76, department: 'CSE', attendance: 81 },
  { id: 104, name: 'Sneha', age: 20, marks: 91, department: null, attendance: null },
  { id: 105, name: 'Ravi', age: 21, marks: null, department: 'CSE', attendance: 79 },
];

export function MissingDataDetective() {
  const [viewMode, setViewMode] = useState<'values' | 'boolean_isna' | 'metrics'>('values');
  const [selectedCol, setSelectedCol] = useState<string | null>('marks');

  const columnStats = {
    age: { missingCount: 1, total: 5, pct: 20, dtype: 'Numerical' },
    marks: { missingCount: 2, total: 5, pct: 40, dtype: 'Numerical' },
    department: { missingCount: 1, total: 5, pct: 20, dtype: 'Categorical' },
    attendance: { missingCount: 1, total: 5, pct: 20, dtype: 'Numerical' },
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Interactive 03
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Missing Data Detective
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setViewMode('values')}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '2px',
              border: viewMode === 'values' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: viewMode === 'values' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: viewMode === 'values' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              cursor: 'pointer',
            }}
          >
            Raw Matrix View
          </button>
          <button
            onClick={() => setViewMode('boolean_isna')}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '2px',
              border: viewMode === 'boolean_isna' ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
              background: viewMode === 'boolean_isna' ? 'var(--ds-purple-dim)' : 'transparent',
              color: viewMode === 'boolean_isna' ? 'var(--ds-purple)' : 'var(--ds-text-secondary)',
              cursor: 'pointer',
            }}
          >
            df.isna() Boolean Map
          </button>
          <button
            onClick={() => setViewMode('metrics')}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '2px',
              border: viewMode === 'metrics' ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
              background: viewMode === 'metrics' ? 'var(--ds-emerald-dim)' : 'transparent',
              color: viewMode === 'metrics' ? 'var(--ds-emerald)' : 'var(--ds-text-secondary)',
              cursor: 'pointer',
            }}
          >
            Missingness Rates (%)
          </button>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Detecting & Quantifying Missing Values in Real Datasets
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Inspect the student cohort records below. Toggle views to see how Pandas translates raw nulls into boolean masks with <code>df.isna()</code> and computes column-level missingness rates with <code>df.isna().mean() * 100</code>.
      </p>

      {/* Interactive Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-surface-elevated)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '10px 12px', color: 'var(--ds-text-muted)' }}>#</th>
              <th style={{ padding: '10px 12px', color: 'var(--ds-text-primary)' }}>name</th>
              <th
                onClick={() => setSelectedCol('age')}
                style={{ padding: '10px 12px', color: selectedCol === 'age' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)', cursor: 'pointer', background: selectedCol === 'age' ? 'var(--ds-cyan-dim)' : 'transparent' }}
              >
                age
              </th>
              <th
                onClick={() => setSelectedCol('marks')}
                style={{ padding: '10px 12px', color: selectedCol === 'marks' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)', cursor: 'pointer', background: selectedCol === 'marks' ? 'var(--ds-cyan-dim)' : 'transparent' }}
              >
                marks
              </th>
              <th
                onClick={() => setSelectedCol('department')}
                style={{ padding: '10px 12px', color: selectedCol === 'department' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)', cursor: 'pointer', background: selectedCol === 'department' ? 'var(--ds-cyan-dim)' : 'transparent' }}
              >
                department
              </th>
              <th
                onClick={() => setSelectedCol('attendance')}
                style={{ padding: '10px 12px', color: selectedCol === 'attendance' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)', cursor: 'pointer', background: selectedCol === 'attendance' ? 'var(--ds-cyan-dim)' : 'transparent' }}
              >
                attendance
              </th>
            </tr>
          </thead>
          <tbody>
            {rawStudents.map((row, idx) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--ds-text-muted)' }}>{idx}</td>
                <td style={{ padding: '10px 12px', color: 'var(--ds-text-primary)' }}>{row.name}</td>

                {/* Age */}
                <td style={{ padding: '10px 12px', background: row.age === null ? 'rgba(218, 30, 40, 0.15)' : 'transparent', color: row.age === null ? '#da1e28' : 'var(--ds-text-primary)' }}>
                  {viewMode === 'boolean_isna' ? (row.age === null ? 'True' : 'False') : row.age === null ? 'NaN' : row.age}
                </td>

                {/* Marks */}
                <td style={{ padding: '10px 12px', background: row.marks === null ? 'rgba(218, 30, 40, 0.15)' : 'transparent', color: row.marks === null ? '#da1e28' : 'var(--ds-text-primary)' }}>
                  {viewMode === 'boolean_isna' ? (row.marks === null ? 'True' : 'False') : row.marks === null ? 'NaN' : row.marks}
                </td>

                {/* Department */}
                <td style={{ padding: '10px 12px', background: row.department === null ? 'rgba(218, 30, 40, 0.15)' : 'transparent', color: row.department === null ? '#da1e28' : 'var(--ds-text-primary)' }}>
                  {viewMode === 'boolean_isna' ? (row.department === null ? 'True' : 'False') : row.department === null ? 'NaN' : row.department}
                </td>

                {/* Attendance */}
                <td style={{ padding: '10px 12px', background: row.attendance === null ? 'rgba(218, 30, 40, 0.15)' : 'transparent', color: row.attendance === null ? '#da1e28' : 'var(--ds-text-primary)' }}>
                  {viewMode === 'boolean_isna' ? (row.attendance === null ? 'True' : 'False') : row.attendance === null ? 'NaN' : row.attendance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Column Missingness KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '1.25rem',
        }}
      >
        {Object.entries(columnStats).map(([colName, stat]) => {
          const isSelected = selectedCol === colName;
          return (
            <div
              key={colName}
              onClick={() => setSelectedCol(colName)}
              style={{
                padding: '12px',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  {colName}
                </span>
                <Tag type={stat.pct > 25 ? 'red' : 'cool-gray'} size="sm" style={{ margin: 0 }}>
                  {stat.pct}% Null
                </Tag>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
                Missing: {stat.missingCount} of {stat.total} rows
              </div>

              <div
                style={{
                  marginTop: '8px',
                  height: '4px',
                  background: 'var(--ds-bg-core)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ width: `${stat.pct}%`, height: '100%', background: stat.pct > 25 ? '#da1e28' : 'var(--ds-cyan)' }} />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Pandas Formula:</strong> <code>df.isna().sum()</code> counts the missing values because Python converts boolean <code>True</code> to <code>1</code> and <code>False</code> to <code>0</code>. Calling <code>df.isna().mean() * 100</code> immediately reveals the missingness proportion.
      </div>
    </div>
  );
}
