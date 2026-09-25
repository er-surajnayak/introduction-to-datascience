'use client';

import React, { useState } from 'react';
import { Tag, Checkbox, Button } from '@carbon/react';
import { Grid, Select_01, Information } from '@carbon/icons-react';

const DATA_ROWS = [
  { idLabel: 'r0', name: 'Rahul', marks: 85, city: 'Mumbai', attendance: 92 },
  { idLabel: 'r1', name: 'Priya', marks: 91, city: 'Pune', attendance: 88 },
  { idLabel: 'r2', name: 'Arjun', marks: 76, city: 'Mumbai', attendance: 75 },
  { idLabel: 'r3', name: 'Sneha', marks: 95, city: 'Nashik', attendance: 96 },
];

const COLUMNS = ['name', 'marks', 'city', 'attendance'] as const;
type ColKey = typeof COLUMNS[number];

export function PandasIndexingLocIlocLab() {
  // Column Selection state
  const [selectedCols, setSelectedCols] = useState<Record<ColKey, boolean>>({
    name: true,
    marks: true,
    city: false,
    attendance: false,
  });

  // Cell Indexing (loc vs iloc) state
  const [selectedCell, setSelectedCell] = useState<{ rowIdx: number; colIdx: number }>({
    rowIdx: 1,
    colIdx: 1, // Priya, Marks 91
  });

  const activeColList = COLUMNS.filter((c) => selectedCols[c]);

  const toggleCol = (col: ColKey) => {
    setSelectedCols((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  const currentRow = DATA_ROWS[selectedCell.rowIdx];
  const currentColKey = COLUMNS[selectedCell.colIdx];
  const currentVal = currentRow[currentColKey];

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
          <Select_01 size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            Column Selection & Indexing (.loc vs .iloc)
          </h3>
          <Tag type="purple" size="sm">loc[label] vs iloc[position]</Tag>
        </div>
      </div>

      {/* Part 1: Interactive Column Selection */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
          1. Column Selection Explorer
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '10px' }}>
          Selecting 1 column with <code>df[&quot;Marks&quot;]</code> returns a 1D <strong>Series</strong>. Selecting multiple columns with a list <code>df[[&quot;Name&quot;, &quot;Marks&quot;]]</code> returns a 2D <strong>DataFrame</strong>.
        </p>

        {/* Column Checkboxes */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {COLUMNS.map((col) => (
            <Checkbox
              key={col}
              id={`col-chk-${col}`}
              labelText={col.charAt(0).toUpperCase() + col.slice(1)}
              checked={selectedCols[col]}
              onChange={() => toggleCol(col)}
            />
          ))}
        </div>

        {/* Render Selected Columns Table */}
        {activeColList.length > 0 ? (
          <div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
              Generated Syntax: <code>{activeColList.length === 1 ? `df["${activeColList[0]}"]` : `df[${JSON.stringify(activeColList)}]`}</code>
              <Tag type={activeColList.length === 1 ? 'cyan' : 'green'} size="sm" style={{ marginLeft: '8px' }}>
                {activeColList.length === 1 ? '1D Series' : '2D DataFrame'}
              </Tag>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: 'var(--cds-layer-02)' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', color: 'var(--ds-text-muted)' }}>Index</th>
                  {activeColList.map((col) => (
                    <th key={col} style={{ padding: '6px 10px', textAlign: 'left', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DATA_ROWS.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                    <td style={{ padding: '6px 10px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>{idx}</td>
                    {activeColList.map((col) => (
                      <td key={col} style={{ padding: '6px 10px' }}>
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ color: 'var(--ds-text-muted)', fontSize: '0.8125rem' }}>Select at least one column above.</div>
        )}
      </div>

      {/* Part 2: loc vs iloc Interactive Grid */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-purple)', textTransform: 'uppercase', marginBottom: '8px' }}>
          2. Row & Cell Selection: loc (Labels) vs iloc (Positions)
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '12px' }}>
          Click any cell in the grid below to inspect how <code>.loc</code> accesses it by label names versus how <code>.iloc</code> accesses it by numerical position offsets.
        </p>

        {/* Clickable Matrix Grid */}
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--ds-bg-core)' }}>
                <th style={{ padding: '8px 12px', color: 'var(--ds-text-muted)', fontSize: '0.75rem' }}>
                  Index Label / [Pos]
                </th>
                {COLUMNS.map((col, cIdx) => (
                  <th key={col} style={{ padding: '8px 12px', color: selectedCell.colIdx === cIdx ? 'var(--ds-cyan)' : 'var(--ds-text-primary)' }}>
                    &quot;{col}&quot; <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>[pos {cIdx}]</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DATA_ROWS.map((row, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600, color: selectedCell.rowIdx === rIdx ? 'var(--ds-cyan)' : 'var(--ds-text-muted)' }}>
                    &quot;{row.idLabel}&quot; <span style={{ fontSize: '0.6875rem' }}>[pos {rIdx}]</span>
                  </td>
                  {COLUMNS.map((col, cIdx) => {
                    const isSelected = selectedCell.rowIdx === rIdx && selectedCell.colIdx === cIdx;
                    return (
                      <td
                        key={col}
                        onClick={() => setSelectedCell({ rowIdx: rIdx, colIdx: cIdx })}
                        style={{
                          padding: '10px 12px',
                          cursor: 'pointer',
                          background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
                          border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid transparent',
                          fontWeight: isSelected ? 700 : 400,
                          color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {row[col]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Direct loc vs iloc Comparator Box */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
            padding: '1rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
              .loc (Label-Based Access)
            </div>
            <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem', color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
              df.loc[&quot;{currentRow.idLabel}&quot;, &quot;{currentColKey}&quot;]
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
              Value: <strong>{currentVal}</strong> (using custom index label &apos;{currentRow.idLabel}&apos; and column name &apos;{currentColKey}&apos;)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-purple)', textTransform: 'uppercase', marginBottom: '4px' }}>
              .iloc (Positional-Based Access)
            </div>
            <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem', color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
              df.iloc[{selectedCell.rowIdx}, {selectedCell.colIdx}]
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
              Value: <strong>{currentVal}</strong> (using 0-based integer row offset {selectedCell.rowIdx} and column offset {selectedCell.colIdx})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
