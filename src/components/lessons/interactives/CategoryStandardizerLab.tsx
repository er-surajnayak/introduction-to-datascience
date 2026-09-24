'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { CheckmarkFilled, Restart, WarningAlt } from '@carbon/icons-react';

export function CategoryStandardizerLab() {
  const [isMapped, setIsMapped] = useState<boolean>(false);

  const rawValues = ['Male', 'male', 'M', 'MALE', 'Female', 'female', 'F', 'FEMALE'];

  const mapping: Record<string, string> = {
    'Male': 'Male',
    'male': 'Male',
    'M': 'Male',
    'MALE': 'Male',
    'Female': 'Female',
    'female': 'Female',
    'F': 'Female',
    'FEMALE': 'Female',
  };

  const cleanValues = rawValues.map((v) => mapping[v]);

  // Compute counts
  const rawCounts: Record<string, number> = {};
  rawValues.forEach((v) => {
    rawCounts[v] = (rawCounts[v] || 0) + 1;
  });

  const cleanCounts: Record<string, number> = {};
  cleanValues.forEach((v) => {
    cleanCounts[v] = (cleanCounts[v] || 0) + 1;
  });

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
            Interactive Lab 2.6.3
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Categorical Mapping & Cardinality Consolidation
          </span>
        </div>
        <Button
          size="sm"
          kind={isMapped ? 'tertiary' : 'primary'}
          renderIcon={isMapped ? Restart : CheckmarkFilled}
          onClick={() => setIsMapped(!isMapped)}
        >
          {isMapped ? 'View Raw Categories' : 'Apply Dictionary Mapping (df.map)'}
        </Button>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Standardizing Categories: Merging Fragmented Cardinality
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        In raw datasets, synonyms, acronyms, and erratic capitalization create artificial categorical categories.
        Applying an explicit mapping dictionary collapses 8 fragmented strings into 2 canonical categories.
      </p>

      {/* Raw Tokens Visualization */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          RAW DATASET COLUMN: [8 RECORDS]
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {rawValues.map((val, idx) => (
            <span
              key={idx}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                background: isMapped ? (val.startsWith('M') || val.startsWith('m') ? 'rgba(15, 98, 254, 0.15)' : 'rgba(165, 110, 255, 0.15)') : 'var(--ds-bg-core)',
                border: isMapped ? (val.startsWith('M') || val.startsWith('m') ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-purple)') : '1px solid var(--ds-border-subtle)',
                color: isMapped ? (val.startsWith('M') || val.startsWith('m') ? 'var(--ds-cyan)' : 'var(--ds-purple)') : 'var(--ds-text-primary)',
              }}
            >
              &quot;{val}&quot; {isMapped && `➔ ${mapping[val]}`}
            </span>
          ))}
        </div>
      </div>

      {/* Frequency Distribution Comparison */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Before: Raw Frequency */}
        <div style={{ padding: '1.25rem', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-amber)', marginBottom: '8px' }}>
            df[&quot;gender&quot;].value_counts() [Before Mapping: 8 Classes]
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {Object.entries(rawCounts).map(([cat, count]) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)' }}>
                <span style={{ color: 'var(--ds-text-secondary)' }}>&quot;{cat}&quot;</span>
                <span style={{ color: 'var(--ds-amber)', fontWeight: 600 }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* After: Cleaned Frequency */}
        <div style={{ padding: '1.25rem', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-emerald)' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-emerald)', marginBottom: '8px' }}>
            df[&quot;gender_clean&quot;].value_counts() [After Mapping: 2 Classes]
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <div style={{ padding: '8px 12px', background: 'var(--cds-layer-02)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--ds-cyan)', fontSize: '0.875rem' }}>Male</span>
              <Tag type="cyan" size="md">4 Records (50%)</Tag>
            </div>
            <div style={{ padding: '8px 12px', background: 'var(--cds-layer-02)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--ds-purple)', fontSize: '0.875rem' }}>Female</span>
              <Tag type="purple" size="md">4 Records (50%)</Tag>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Warning */}
      <div
        style={{
          padding: '0.875rem 1rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          borderLeft: '4px solid var(--ds-amber)',
          fontSize: '0.8125rem',
          lineHeight: 1.5,
          color: 'var(--ds-text-secondary)',
        }}
      >
        <strong>Engineering Caveat:</strong> Never map <code>&quot;M&quot;</code> to <code>&quot;Male&quot;</code> without checking the data dictionary!
        In a medical study, <code>&quot;M&quot;</code> could mean <em>Married</em>; in apparel retail, <code>&quot;M&quot;</code> means <em>Medium Size</em>; in logistics, <code>&quot;M&quot;</code> means <em>Monday</em>.
      </div>
    </div>
  );
}
