'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';

interface DatasetPreset {
  id: string;
  name: string;
  headers: string[];
  rawRows: string[][];
  cleanFn: (row: string[], options: TransformationOptions) => { row: string[]; changedCount: number; coercedNanCount: number };
}

interface TransformationOptions {
  trimSpaces: boolean;
  titleCase: boolean;
  coerceNumeric: boolean;
  parseDates: boolean;
  stripCurrency: boolean;
}

const presets: DatasetPreset[] = [
  {
    id: 'students',
    name: '1. Student Examination Records',
    headers: ['Name', 'City', 'Score (str)', 'Exam Date'],
    rawRows: [
      ['  Rahul ', '  mUMbAi ', '85', '01/08/2026'],
      ['Priya  ', 'pune  ', 'unknown', '2026-08-01'],
      [' Arjun', 'DELHI ', '92', 'Aug 1, 2026'],
      [' Sneha ', ' chennai ', '100', '01-Aug-26'],
    ],
    cleanFn: (row, opt) => {
      let changed = 0;
      let nanCount = 0;
      const res = [...row];

      // Name
      if (opt.trimSpaces && res[0] !== res[0].trim()) {
        res[0] = res[0].trim();
        changed++;
      }

      // City
      let city = res[1];
      if (opt.trimSpaces) city = city.trim();
      if (opt.titleCase) city = city.length > 0 ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() : '';
      if (city !== res[1]) {
        res[1] = city;
        changed++;
      }

      // Score
      if (opt.coerceNumeric) {
        if (isNaN(Number(res[2]))) {
          res[2] = 'NaN (float)';
          nanCount++;
          changed++;
        } else {
          res[2] = `${Number(res[2]).toFixed(1)} (float)`;
          changed++;
        }
      }

      // Date
      if (opt.parseDates) {
        res[3] = '2026-08-01 (datetime)';
        changed++;
      }

      return { row: res, changedCount: changed, coercedNanCount: nanCount };
    },
  },
  {
    id: 'ecommerce',
    name: '2. E-Commerce Orders',
    headers: ['Customer', 'Location', 'Price (Currency)', 'Ordered On'],
    rawRows: [
      ['Aman  ', ' BENGALURU ', '₹50,000', '15/09/2026'],
      [' Bina ', 'bengaluru', '₹75,500', '2026-09-15'],
      ['Chirag', '  bengaluru ', '120000', 'Sep 15, 2026'],
    ],
    cleanFn: (row, opt) => {
      let changed = 0;
      let nanCount = 0;
      const res = [...row];

      if (opt.trimSpaces && res[0] !== res[0].trim()) {
        res[0] = res[0].trim();
        changed++;
      }

      let loc = res[1];
      if (opt.trimSpaces) loc = loc.trim();
      if (opt.titleCase) loc = loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase();
      if (loc !== res[1]) {
        res[1] = loc;
        changed++;
      }

      if (opt.stripCurrency) {
        const num = parseFloat(res[2].replace(/[₹,]/g, ''));
        res[2] = `${num.toFixed(2)} (float)`;
        changed++;
      }

      if (opt.parseDates) {
        res[3] = '2026-09-15 (datetime)';
        changed++;
      }

      return { row: res, changedCount: changed, coercedNanCount: nanCount };
    },
  },
];

export function FormattingPlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('students');
  const [options, setOptions] = useState<TransformationOptions>({
    trimSpaces: false,
    titleCase: false,
    coerceNumeric: false,
    parseDates: false,
    stripCurrency: false,
  });

  const activePreset = presets.find((p) => p.id === selectedPresetId)!;

  // Process rows
  let totalChanged = 0;
  let totalNans = 0;
  const processedRows = activePreset.rawRows.map((raw) => {
    const { row, changedCount, coercedNanCount } = activePreset.cleanFn(raw, options);
    totalChanged += changedCount;
    totalNans += coercedNanCount;
    return row;
  });

  const toggleOption = (key: keyof TransformationOptions) => {
    setOptions({ ...options, [key]: !options[key] });
  };

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
            Interactive Lab 2.6.9
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Configurable Multi-Dataset Preprocessing Workbench
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag type="cyan" size="sm">Transformed: {totalChanged} values</Tag>
          {totalNans > 0 && <Tag type="red" size="sm">Coerced NaNs: {totalNans}</Tag>}
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Data Formatting Playground: Interactive Pipeline Builder
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Select a dataset and activate formatting operations to observe how each rule modifies the matrix in real-time.
      </p>

      {/* Dataset Preset Selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPresetId(p.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '4px',
              border: selectedPresetId === p.id ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: selectedPresetId === p.id ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
              color: selectedPresetId === p.id ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: selectedPresetId === p.id ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Toggle Operations Bar */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          ACTIVATE TRANSFORMATION RULES:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => toggleOption('trimSpaces')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: options.trimSpaces ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
              background: options.trimSpaces ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-core)',
              color: options.trimSpaces ? 'var(--ds-emerald)' : 'var(--ds-text-secondary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {options.trimSpaces ? '✓ Trim Spaces (.strip)' : '+ Trim Spaces'}
          </button>

          <button
            onClick={() => toggleOption('titleCase')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: options.titleCase ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
              background: options.titleCase ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-core)',
              color: options.titleCase ? 'var(--ds-emerald)' : 'var(--ds-text-secondary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {options.titleCase ? '✓ Title Case (.title)' : '+ Title Case'}
          </button>

          <button
            onClick={() => toggleOption('coerceNumeric')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: options.coerceNumeric ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: options.coerceNumeric ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
              color: options.coerceNumeric ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {options.coerceNumeric ? '✓ Coerce Numeric (pd.to_numeric)' : '+ Coerce Numeric'}
          </button>

          <button
            onClick={() => toggleOption('stripCurrency')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: options.stripCurrency ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: options.stripCurrency ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
              color: options.stripCurrency ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {options.stripCurrency ? '✓ Strip Currency' : '+ Strip Currency'}
          </button>

          <button
            onClick={() => toggleOption('parseDates')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: options.parseDates ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
              background: options.parseDates ? 'rgba(165, 110, 255, 0.15)' : 'var(--ds-bg-core)',
              color: options.parseDates ? 'var(--ds-purple)' : 'var(--ds-text-secondary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {options.parseDates ? '✓ Parse Dates (pd.to_datetime)' : '+ Parse Dates'}
          </button>
        </div>
      </div>

      {/* Live Table Output */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              {activePreset.headers.map((h, i) => (
                <th key={i} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedRows.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--ds-border-subtle)', background: 'var(--cds-layer-02)' }}>
                {r.map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      padding: '8px 12px',
                      color: cell.includes('NaN') ? '#da1e28' : cell.includes('datetime') ? 'var(--ds-purple)' : cell.includes('float') ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                      fontWeight: cell.includes('float') || cell.includes('datetime') || cell.includes('NaN') ? 600 : 400,
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
