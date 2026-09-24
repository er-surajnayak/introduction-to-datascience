'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Information, WarningAlt, CheckmarkFilled } from '@carbon/icons-react';

export function DateParsingAndAmbiguityLab() {
  const [localeConvention, setLocaleConvention] = useState<'UK_IN' | 'US' | 'ISO'>('UK_IN');

  const ambiguousDate = '01/02/2026';

  let interpretedDate = '';
  let day = 1;
  let month = 2;
  let monthName = 'February';
  let year = 2026;
  let formatString = '';

  if (localeConvention === 'UK_IN') {
    interpretedDate = '2026-02-01 (1st February 2026)';
    day = 1;
    month = 2;
    monthName = 'February';
    formatString = '%d/%m/%Y (Day first)';
  } else if (localeConvention === 'US') {
    interpretedDate = '2026-01-02 (2nd January 2026)';
    day = 2;
    month = 1;
    monthName = 'January';
    formatString = '%m/%d/%Y (Month first)';
  } else {
    interpretedDate = '2026-01-02 (ISO Standard assumes YYYY-MM-DD)';
    day = 2;
    month = 1;
    monthName = 'January';
    formatString = '%Y-%m-%d';
  }

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
            Interactive Lab 2.5.5
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            pd.to_datetime() & The Date Ambiguity Trap
          </span>
        </div>
        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          datetime64[ns] Engine
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Datetime Parsing: The Date Ambiguity Trap
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        What real-world date does <strong>&quot;{ambiguousDate}&quot;</strong> represent?
        Depending on the originating country and software locale, this exact string could mean two completely different months!
      </p>

      {/* Locale Convention Switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Button
          size="sm"
          kind={localeConvention === 'UK_IN' ? 'primary' : 'tertiary'}
          onClick={() => setLocaleConvention('UK_IN')}
        >
          India / UK / Europe (DD/MM/YYYY)
        </Button>
        <Button
          size="sm"
          kind={localeConvention === 'US' ? 'primary' : 'tertiary'}
          onClick={() => setLocaleConvention('US')}
        >
          United States (MM/DD/YYYY)
        </Button>
        <Button
          size="sm"
          kind={localeConvention === 'ISO' ? 'primary' : 'tertiary'}
          onClick={() => setLocaleConvention('ISO')}
        >
          ISO-8601 Standard (YYYY-MM-DD)
        </Button>
      </div>

      {/* Date Interpretation Output Card */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          borderLeft: '4px solid var(--ds-purple)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            Parsed Result: {interpretedDate}
          </span>
          <Tag type="purple" size="md">Format: {formatString}</Tag>
        </div>

        {/* .dt Accessor Component Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '8px',
            marginTop: '1rem',
          }}
        >
          <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '4px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>.dt.year</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>{year}</div>
          </div>
          <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '4px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>.dt.month</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-purple)', fontFamily: 'var(--ds-font-mono)' }}>{month}</div>
          </div>
          <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '4px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>.dt.month_name()</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)', fontFamily: 'var(--ds-font-mono)' }}>{monthName}</div>
          </div>
          <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '4px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>.dt.day</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-amber)', fontFamily: 'var(--ds-font-mono)' }}>{day}</div>
          </div>
        </div>
      </div>

      {/* Detective Tip */}
      <div
        style={{
          padding: '0.875rem 1rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          borderLeft: '4px solid var(--ds-cyan)',
          fontSize: '0.8125rem',
          lineHeight: 1.5,
          color: 'var(--ds-text-secondary)',
        }}
      >
        <strong>Forensic Tip:</strong> How do data scientists solve date ambiguity?
        Scan other records in the same file! If you find any row with <code>&quot;25/02/2026&quot;</code>, since months cannot be 25, the dataset is provably <strong>Day-first (DD/MM/YYYY)</strong>.
        In Pandas, always pass <code>dayfirst=True</code> or an explicit <code>format=&quot;%d/%m/%Y&quot;</code> to eliminate guesswork.
      </div>
    </div>
  );
}
