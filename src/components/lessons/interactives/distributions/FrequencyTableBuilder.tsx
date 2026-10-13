'use client';

import React, { useState } from 'react';
import { Tag, Button, TextInput } from '@carbon/react';
import {
  Add,
  TrashCan,
  Restart,
  DataTable as TableIcon,
  CheckmarkFilled,
  WarningAlt,
} from '@carbon/icons-react';
import { calcFrequencyTable, FrequencyRow } from '@/lib/distributionStats';

const INITIAL_DATASET = [60, 70, 70, 80, 80, 80, 90];

export function FrequencyTableBuilder() {
  const [values, setValues] = useState<number[]>(INITIAL_DATASET);
  const [newValueInput, setNewValueInput] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);

  const freqTable = calcFrequencyTable(values);
  const totalCount = values.length;

  const handleAddValue = () => {
    setInputError(null);
    const parsed = parseFloat(newValueInput.trim());
    if (isNaN(parsed) || !isFinite(parsed)) {
      setInputError('Please enter a valid finite number.');
      return;
    }
    setValues((prev) => [...prev, parsed]);
    setNewValueInput('');
  };

  const handleRemoveSingle = (index: number) => {
    setValues((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setValues(INITIAL_DATASET);
    setNewValueInput('');
    setInputError(null);
  };

  const handleClearAll = () => {
    setValues([]);
    setNewValueInput('');
    setInputError(null);
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
      {/* Header Badge & Title */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Section 3.2.3
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Frequency &amp; Relative Frequency
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Relative Frequency = Count / n
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--ds-text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        Frequency Table Builder
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        <strong>Frequency</strong> is the absolute count of times a value occurs. <strong>Relative frequency</strong> is the proportion of total observations belonging to that value. Add, modify, or remove data points below to see counts and proportions recalculate live:
      </p>

      {/* Input Bar & Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexGrow: 1, maxWidth: '340px' }}>
          <TextInput
            id="freq-val-input"
            labelText=""
            hideLabel
            placeholder="Enter a number (e.g. 80)"
            value={newValueInput}
            onChange={(e) => {
              setNewValueInput(e.target.value);
              setInputError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddValue();
            }}
            size="sm"
          />
          <Button size="sm" renderIcon={Add} onClick={handleAddValue}>
            Add
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="sm" kind="secondary" renderIcon={Restart} onClick={handleReset}>
            Reset Sample
          </Button>
          <Button size="sm" kind="danger--ghost" renderIcon={TrashCan} onClick={handleClearAll}>
            Clear All
          </Button>
        </div>
      </div>

      {inputError && (
        <div
          style={{
            padding: '8px 12px',
            marginBottom: '1rem',
            background: 'rgba(218, 30, 40, 0.1)',
            borderLeft: '3px solid #da1e28',
            color: '#fa4d56',
            fontSize: '0.8125rem',
          }}
        >
          {inputError}
        </div>
      )}

      {/* Raw Values Chips */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          Current Observations (Total n = {totalCount}):
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {values.length === 0 ? (
            <span style={{ fontSize: '0.875rem', color: 'var(--ds-text-muted)', fontStyle: 'italic' }}>
              Dataset is currently empty. Add numbers above to populate the frequency table.
            </span>
          ) : (
            values.map((val, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  background: 'var(--cds-layer-02)',
                  borderRadius: '16px',
                  border: '1px solid var(--ds-border-strong)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--ds-text-primary)',
                }}
              >
                <span>{val}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSingle(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--ds-text-muted)',
                    padding: 0,
                    lineHeight: 1,
                  }}
                  title="Remove this observation"
                >
                  &times;
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Frequency & Relative Frequency Table */}
      {values.length === 0 ? (
        <div
          style={{
            padding: '2.5rem',
            textAlign: 'center',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px dashed var(--ds-border-strong)',
            color: 'var(--ds-text-muted)',
            marginBottom: '1.5rem',
          }}
        >
          No observations. Add numbers to compute frequencies and relative percentages.
        </div>
      ) : (
        <div
          style={{
            overflowX: 'auto',
            marginBottom: '1.5rem',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
              textAlign: 'left',
              background: 'var(--ds-bg-core)',
            }}
          >
            <thead>
              <tr style={{ background: 'var(--ds-bg-surface-elevated)', borderBottom: '1px solid var(--ds-border-strong)' }}>
                <th style={{ padding: '12px 16px', color: 'var(--ds-text-primary)' }}>Value (x)</th>
                <th style={{ padding: '12px 16px', color: 'var(--ds-cyan)' }}>Frequency (f)</th>
                <th style={{ padding: '12px 16px', color: 'var(--ds-purple)' }}>Relative Freq (f / n)</th>
                <th style={{ padding: '12px 16px', color: 'var(--ds-emerald)' }}>Percentage (%)</th>
                <th style={{ padding: '12px 16px', color: 'var(--ds-text-secondary)', minWidth: '180px' }}>Visual Distribution</th>
              </tr>
            </thead>
            <tbody>
              {freqTable.map((row) => (
                <tr
                  key={row.value}
                  style={{
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                    {row.value}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 600 }}>
                    {row.frequency}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
                    {row.frequency}/{totalCount} ({row.relativeFrequency.toFixed(4)})
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', fontWeight: 600 }}>
                    {row.percentage}%
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          height: '14px',
                          width: `${row.percentage}%`,
                          minWidth: '4px',
                          background: 'linear-gradient(90deg, var(--ds-cyan), var(--ds-blue))',
                          borderRadius: '2px',
                        }}
                      />
                      <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>
                        {row.percentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--ds-bg-surface-elevated)', borderTop: '2px solid var(--ds-border-strong)', fontWeight: 700 }}>
                <td style={{ padding: '12px 16px', color: 'var(--ds-text-primary)' }}>TOTAL (Σ)</td>
                <td style={{ padding: '12px 16px', color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>
                  {totalCount}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--ds-purple)', fontFamily: 'var(--ds-font-mono)' }}>
                  1.0000
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--ds-emerald)', fontFamily: 'var(--ds-font-mono)' }}>
                  100.0%
                </td>
                <td style={{ padding: '12px 16px', fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
                  Sum of relative frequencies = 1.00
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Mathematical Breakdown Callout */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px', fontSize: '0.9375rem' }}>
          Mathematical Invariant
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          Notice that the sum of absolute frequencies <strong>Σ f_i strictly equals the total sample size n</strong> ({totalCount}), and the sum of relative frequencies <strong>Σ (f_i / n) strictly equals 1.0 (100%)</strong>. For 80 in the baseline sample: 3 out of 7 students scored 80, meaning <strong>3 / 7 ≈ 0.4286 (42.86%)</strong>.
        </p>
      </div>
    </div>
  );
}
