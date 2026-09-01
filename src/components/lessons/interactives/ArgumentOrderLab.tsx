'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  ArrowsHorizontal,
  ArrowRight,
} from '@carbon/icons-react';

export function ArgumentOrderLab() {
  const [activeStyle, setActiveStyle] = useState<'positional' | 'keyword'>('positional');

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2.5rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      {/* Top Header */}
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
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
            }}
          >
            Interactive Experience 6
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Positional vs Keyword Argument Mapper
          </h3>
        </div>
        <Tag type="purple" size="md">
          Argument Mapping
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Positional arguments match parameters based on order (index 0, 1, 2). Keyword arguments explicitly name parameters, allowing arguments to be passed in any order:
      </p>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setActiveStyle('positional')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeStyle === 'positional' ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
            border: activeStyle === 'positional' ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: activeStyle === 'positional' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
            cursor: 'pointer',
          }}
        >
          1. Positional Matching (Order Dependent)
        </button>

        <button
          type="button"
          onClick={() => setActiveStyle('keyword')}
          style={{
            flex: 1,
            padding: '10px',
            background: activeStyle === 'keyword' ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface-elevated)',
            border: activeStyle === 'keyword' ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: activeStyle === 'keyword' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
            cursor: 'pointer',
          }}
        >
          2. Keyword Matching (Name Explicit)
        </button>
      </div>

      {/* Function Signature */}
      <div
        style={{
          padding: '1rem',
          background: 'var(--ds-bg-surface-elevated)',
          border: '1px solid var(--ds-border-subtle)',
          borderRadius: '4px',
          marginBottom: '1.25rem',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.9375rem',
        }}
      >
        <span style={{ color: 'var(--ds-text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>
          FUNCTION DEFINITION SIGNATURE:
        </span>
        <span style={{ color: 'var(--ds-purple)' }}>def </span>
        <span style={{ color: 'var(--ds-cyan)' }}>student_record</span>
        <span>(name, age, cgpa):</span>
      </div>

      {/* Interactive Parameter Slot Mapping Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        {/* Name Slot */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-strong)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>PARAMETER: name</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)', margin: '4px 0' }}>
            "Aisha"
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
            {activeStyle === 'positional' ? 'Matched from Argument index [0]' : 'Matched from keyword: name="Aisha"'}
          </div>
        </div>

        {/* Age Slot */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-strong)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>PARAMETER: age</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-teal)', margin: '4px 0' }}>
            20
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
            {activeStyle === 'positional' ? 'Matched from Argument index [1]' : 'Matched from keyword: age=20'}
          </div>
        </div>

        {/* CGPA Slot */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-strong)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>PARAMETER: cgpa</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)', margin: '4px 0' }}>
            8.7
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
            {activeStyle === 'positional' ? 'Matched from Argument index [2]' : 'Matched from keyword: cgpa=8.7'}
          </div>
        </div>
      </div>

      {/* Call Code Display */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderLeft: '4px solid var(--ds-cyan)',
          borderRadius: '0 4px 4px 0',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.875rem',
        }}
      >
        <span style={{ color: 'var(--ds-text-muted)' }}>CALL SYNTAX: </span>
        <strong style={{ color: 'var(--ds-text-primary)' }}>
          {activeStyle === 'positional'
            ? 'student_record("Aisha", 20, 8.7)'
            : 'student_record(cgpa=8.7, name="Aisha", age=20)'}
        </strong>
      </div>
    </div>
  );
}
