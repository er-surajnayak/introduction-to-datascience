'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';

export function StringStandardizationLab() {
  const [inputText, setInputText] = useState<string>('  mUMbAi  ');

  // Transformations
  const stripped = inputText.trim();
  const lower = stripped.toLowerCase();
  const upper = stripped.toUpperCase();
  const title = stripped.length > 0 ? stripped.charAt(0).toUpperCase() + stripped.slice(1).toLowerCase() : '';

  const rawLength = inputText.length;
  const strippedLength = stripped.length;
  const spacesRemoved = rawLength - strippedLength;

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
            Interactive Lab 2.6.2
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            String Hygiene: strip() & Casing Methods
          </span>
        </div>
        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Spaces Trimmed: {spacesRemoved}
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        String Standardization: The Whitespace & Casing Pipeline
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Invisible spaces and inconsistent letter casing break string equality tests in Python.
        Type any messy string into the box below to trace how standard Pandas string methods transform it.
      </p>

      {/* Preset Quick-Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {['  mUMbAi  ', 'bengaluru  ', '  pUnE ', '  cHEnNaI  '].map((preset, idx) => (
          <Button
            key={idx}
            size="sm"
            kind={inputText === preset ? 'primary' : 'tertiary'}
            onClick={() => setInputText(preset)}
          >
            &quot;{preset}&quot;
          </Button>
        ))}
      </div>

      {/* Interactive Input Box */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-cyan)', display: 'block', marginBottom: '6px' }}>
          Test Raw String Input:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type messy string with spaces..."
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            background: 'var(--ds-bg-core)',
            color: 'var(--ds-text-primary)',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '1rem',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginTop: '6px' }}>
          <span>Raw Character Length: <strong>{rawLength} chars</strong></span>
          <span>Trimmed Character Length: <strong>{strippedLength} chars</strong></span>
        </div>
      </div>

      {/* Step-by-Step Transformation Pipeline */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px',
          marginBottom: '1rem',
        }}
      >
        {/* Step 1: Strip */}
        <div style={{ padding: '12px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>1. .str.strip()</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            &quot;{stripped}&quot;
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
            Removes leading/trailing spaces.
          </div>
        </div>

        {/* Step 2: Title Case */}
        <div style={{ padding: '12px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-emerald)' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-emerald)' }}>2. .str.title() (Standard)</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            &quot;{title}&quot;
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
            Capitalizes first letter of every word.
          </div>
        </div>

        {/* Step 3: Lowercase */}
        <div style={{ padding: '12px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>3. .str.lower()</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-purple)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            &quot;{lower}&quot;
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
            Uniform lowercase for NLP / search.
          </div>
        </div>

        {/* Step 4: Uppercase */}
        <div style={{ padding: '12px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)' }}>4. .str.upper()</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            &quot;{upper}&quot;
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
            Uniform uppercase for ISO / codes.
          </div>
        </div>
      </div>
    </div>
  );
}
