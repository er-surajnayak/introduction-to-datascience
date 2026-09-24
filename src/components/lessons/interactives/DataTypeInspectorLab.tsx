'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { CheckmarkFilled, WarningAlt, Information } from '@carbon/icons-react';

interface InspectorField {
  fieldName: string;
  sampleValue: string;
  detectedDtype: string;
  expectedAnalyticalType: string;
  requiredAction: string;
  status: 'needs_numeric' | 'needs_datetime' | 'needs_string_clean' | 'needs_bool_map' | 'ready';
}

const inspectorFields: InspectorField[] = [
  { fieldName: 'marks', sampleValue: '"85.5"', detectedDtype: 'object (str)', expectedAnalyticalType: 'Continuous Numerical', requiredAction: 'pd.to_numeric(df["marks"], errors="coerce")', status: 'needs_numeric' },
  { fieldName: 'age', sampleValue: '"21"', detectedDtype: 'object (str)', expectedAnalyticalType: 'Discrete Numerical', requiredAction: 'pd.to_numeric(df["age"], errors="coerce")', status: 'needs_numeric' },
  { fieldName: 'city', sampleValue: '" Mumbai "', detectedDtype: 'object (str)', expectedAnalyticalType: 'Nominal Categorical', requiredAction: 'df["city"].str.strip().str.title()', status: 'needs_string_clean' },
  { fieldName: 'date', sampleValue: '"01/08/2026"', detectedDtype: 'object (str)', expectedAnalyticalType: 'Datetime', requiredAction: 'pd.to_datetime(df["date"], dayfirst=True)', status: 'needs_datetime' },
  { fieldName: 'is_active', sampleValue: '"Yes"', detectedDtype: 'object (str)', expectedAnalyticalType: 'Boolean Flag', requiredAction: 'df["is_active"].map({"Yes": True, "No": False})', status: 'needs_bool_map' },
  { fieldName: 'pin_code', sampleValue: '"08001"', detectedDtype: 'object (str)', expectedAnalyticalType: 'Categorical Identifier', requiredAction: 'Keep as object (preserve leading zeros!)', status: 'ready' },
];

export function DataTypeInspectorLab() {
  const [selectedField, setSelectedField] = useState<string>('marks');

  const active = inspectorFields.find((f) => f.fieldName === selectedField)!;

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
          <Tag type="cyan" size="md">
            Interactive Lab 2.6.7
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Storage Dtype vs. Analytical Semantics
          </span>
        </div>
        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Field: {active.fieldName}
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Data Type Inspector: Representation vs. Analytical Meaning
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        In raw CSV files, almost every column is ingested as an unformatted <code>object</code> (string).
        Click each column below to evaluate what conversion is required to unlock its true analytical meaning.
      </p>

      {/* Interactive Inspector Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Column Name</th>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-amber)' }}>Sample Raw Value</th>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-muted)' }}>Detected Storage Dtype</th>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>Expected DS Semantics</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-text-primary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {inspectorFields.map((field) => {
              const isSelected = selectedField === field.fieldName;
              return (
                <tr
                  key={field.fieldName}
                  onClick={() => setSelectedField(field.fieldName)}
                  style={{
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                    {field.fieldName} {isSelected && '👈'}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--ds-amber)' }}>{field.sampleValue}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--ds-text-muted)' }}>{field.detectedDtype}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--ds-cyan)' }}>{field.expectedAnalyticalType}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <Tag type={field.status === 'ready' ? 'green' : 'red'} size="sm">
                      {field.status === 'ready' ? '✓ Ready (Keep str)' : '⚠ Needs Formatting'}
                    </Tag>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Action Code Recommendation Card */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          borderLeft: `4px solid ${active.status === 'ready' ? 'var(--ds-emerald)' : 'var(--ds-cyan)'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            Prescribed Formatting Operation for: <code>{active.fieldName}</code>
          </span>
          <Tag type={active.status === 'ready' ? 'green' : 'purple'} size="md">
            {active.status === 'ready' ? 'Semantic Match' : 'Type Conversion Required'}
          </Tag>
        </div>

        <div style={{ padding: '8px 12px', background: 'var(--ds-bg-core)', borderRadius: '4px', fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem', color: 'var(--ds-cyan)', marginBottom: '8px' }}>
          <code>{active.requiredAction}</code>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, margin: 0 }}>
          {active.status === 'ready'
            ? 'Even though PIN code consists of numbers, it is an identifier. Never convert identifiers with leading zeros into integers!'
            : 'Converting this column to its true semantic type enables mathematical aggregations, datetime sorting, or clean categorical grouping.'}
        </p>
      </div>
    </div>
  );
}
