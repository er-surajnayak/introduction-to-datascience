'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { View, CheckmarkFilled, Restart, WarningAlt, Information } from '@carbon/icons-react';

interface DetectiveRow {
  id: number;
  name: string;
  rawCity: string;
  cleanCity: string;
  rawGender: string;
  cleanGender: string;
  rawMarks: string;
  cleanMarks: number;
  rawDate: string;
  cleanDate: string;
  flaws: string[];
}

const rawDetectiveData: DetectiveRow[] = [
  {
    id: 1,
    name: 'Rahul',
    rawCity: ' Mumbai',
    cleanCity: 'Mumbai',
    rawGender: 'male',
    cleanGender: 'Male',
    rawMarks: '85',
    cleanMarks: 85,
    rawDate: '01/08/2026',
    cleanDate: '2026-08-01',
    flaws: ['Leading whitespace in city', 'Lowercase gender', 'Marks stored as string', 'DD/MM/YYYY date format'],
  },
  {
    id: 2,
    name: 'Priya',
    rawCity: 'mumbai ',
    cleanCity: 'Mumbai',
    rawGender: 'Female',
    cleanGender: 'Female',
    rawMarks: '92',
    cleanMarks: 92,
    rawDate: '2026-08-01',
    cleanDate: '2026-08-01',
    flaws: ['Trailing whitespace in city', 'Lowercase city letters', 'Marks stored as string', 'ISO YYYY-MM-DD date format'],
  },
  {
    id: 3,
    name: 'Arjun',
    rawCity: 'MUMBAI',
    cleanCity: 'Mumbai',
    rawGender: 'M',
    cleanGender: 'Male',
    rawMarks: '78',
    cleanMarks: 78,
    rawDate: 'Aug 1, 2026',
    cleanDate: '2026-08-01',
    flaws: ['All-caps city letters', 'Abbreviated "M" gender', 'Marks stored as string', 'Textual month date format'],
  },
  {
    id: 4,
    name: 'Sneha',
    rawCity: ' Mumbai ',
    cleanCity: 'Mumbai',
    rawGender: 'F',
    cleanGender: 'Female',
    rawMarks: '100',
    cleanMarks: 100,
    rawDate: '01-Aug-26',
    cleanDate: '2026-08-01',
    flaws: ['Leading and trailing whitespace in city', 'Abbreviated "F" gender', 'Marks stored as string', '2-digit year date format'],
  },
];

export function FormattingDetective() {
  const [inspected, setInspected] = useState<boolean>(false);
  const [standardized, setStandardized] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const activeRecord = rawDetectiveData.find((r) => r.id === selectedRow);

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Interactive Lab 2.6.1
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Data Detective: Inconsistent Representations
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="sm"
            kind={inspected ? 'secondary' : 'primary'}
            renderIcon={View}
            onClick={() => setInspected(!inspected)}
          >
            {inspected ? 'Hide Flaws' : '1. Inspect Representation Flaws'}
          </Button>
          <Button
            size="sm"
            kind={standardized ? 'tertiary' : 'primary'}
            renderIcon={standardized ? Restart : CheckmarkFilled}
            disabled={!inspected && !standardized}
            onClick={() => setStandardized(!standardized)}
          >
            {standardized ? 'Reset to Raw' : '2. Standardize All Columns'}
          </Button>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        The Formatting Detective: One Truth, Many Representations
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        All four rows describe students in <strong>Mumbai</strong> who took an exam on <strong>August 1, 2026</strong>.
        To human eyes, the meaning is clear. To Python and Pandas, these 4 rows contain 4 different cities, 4 different date strings, and string-typed marks.
      </p>

      {/* Interactive Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Student</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>City</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--ds-purple)' }}>Gender</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--ds-amber)' }}>Marks</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--ds-emerald)' }}>Exam Date</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--ds-text-muted)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rawDetectiveData.map((row) => {
              const isSelected = selectedRow === row.id;

              return (
                <tr
                  key={row.id}
                  onClick={() => setSelectedRow(row.id)}
                  style={{
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                    {row.name} {isSelected && '👈'}
                  </td>

                  {/* City Cell */}
                  <td style={{ padding: '10px 12px' }}>
                    {standardized ? (
                      <span style={{ color: 'var(--ds-emerald)', fontWeight: 600 }}>{row.cleanCity}</span>
                    ) : inspected ? (
                      <span style={{ background: 'rgba(255, 131, 43, 0.15)', padding: '2px 6px', borderRadius: '3px', border: '1px dashed var(--ds-amber)', color: 'var(--ds-amber)' }}>
                        &quot;{row.rawCity}&quot;
                      </span>
                    ) : (
                      <span>&quot;{row.rawCity}&quot;</span>
                    )}
                  </td>

                  {/* Gender Cell */}
                  <td style={{ padding: '10px 12px' }}>
                    {standardized ? (
                      <Tag type="purple" size="sm">{row.cleanGender}</Tag>
                    ) : inspected ? (
                      <Tag type="warm-gray" size="sm">&quot;{row.rawGender}&quot;</Tag>
                    ) : (
                      <span>&quot;{row.rawGender}&quot;</span>
                    )}
                  </td>

                  {/* Marks Cell */}
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    {standardized ? (
                      <span style={{ color: 'var(--ds-cyan)', fontWeight: 700 }}>{row.cleanMarks} (int)</span>
                    ) : inspected ? (
                      <span style={{ color: 'var(--ds-amber)' }}>&quot;{row.rawMarks}&quot; (str)</span>
                    ) : (
                      <span>&quot;{row.rawMarks}&quot;</span>
                    )}
                  </td>

                  {/* Date Cell */}
                  <td style={{ padding: '10px 12px' }}>
                    {standardized ? (
                      <span style={{ color: 'var(--ds-emerald)', fontFamily: 'var(--ds-font-mono)' }}>{row.cleanDate}</span>
                    ) : inspected ? (
                      <span style={{ color: 'var(--ds-amber)', fontStyle: 'italic' }}>&quot;{row.rawDate}&quot;</span>
                    ) : (
                      <span>&quot;{row.rawDate}&quot;</span>
                    )}
                  </td>

                  {/* Status Indicator */}
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <Tag type={standardized ? 'green' : inspected ? 'red' : 'cool-gray'} size="sm">
                      {standardized ? 'Standardized' : inspected ? '4 Inconsistencies' : 'Raw Data'}
                    </Tag>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Row Flaw Inspector */}
      {activeRecord && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '4px',
            background: 'var(--cds-layer-02)',
            borderLeft: `4px solid ${standardized ? 'var(--ds-emerald)' : 'var(--ds-amber)'}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
              Diagnostic Inspection: {activeRecord.name}&apos;s Record
            </span>
            <Tag type={standardized ? 'green' : 'red'} size="md">
              {standardized ? 'Cleaned & Standardized' : 'Representation Flaws Detected'}
            </Tag>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
            {!standardized ? (
              <div>
                <strong>Identified Formatting Traps:</strong>
                <ul style={{ margin: '6px 0 0 1.25rem', padding: 0 }}>
                  {activeRecord.flaws.map((flaw, idx) => (
                    <li key={idx} style={{ color: 'var(--ds-amber)' }}>{flaw}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ color: 'var(--ds-emerald)' }}>
                ✓ <strong>Standardization Applied:</strong> City trimmed & capitalized to <code>&quot;Mumbai&quot;</code>, Gender mapped to <code>&quot;{activeRecord.cleanGender}&quot;</code>, Marks parsed to integer <code>{activeRecord.cleanMarks}</code>, and Date parsed to ISO-8601 <code>{activeRecord.cleanDate}</code>.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
