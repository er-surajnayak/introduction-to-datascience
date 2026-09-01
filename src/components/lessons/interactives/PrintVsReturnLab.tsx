'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Terminal,
  Calculation,
  ArrowRight,
  Idea,
} from '@carbon/icons-react';

export function PrintVsReturnLab() {
  const [activeMode, setActiveMode] = useState<'return' | 'print'>('return');

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
            Interactive Experience 3
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            print() vs return: Display vs Reusable Computation
          </h3>
        </div>
        <Tag type="purple" size="md">
          Core Mental Model
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        One of the biggest beginner traps is confusing <code>print()</code> (which only prints ink to the screen) with <code>return</code> (which passes data back for further calculations). Switch modes below to see what happens:
      </p>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setActiveMode('return')}
          style={{
            flex: 1,
            padding: '12px',
            background: activeMode === 'return' ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface-elevated)',
            border: activeMode === 'return' ? '2px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: activeMode === 'return' ? 'var(--ds-emerald)' : 'var(--ds-text-primary)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
          }}
        >
          <Calculation size={18} />
          <span>Mode: 'return' (Reusable Value)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('print')}
          style={{
            flex: 1,
            padding: '12px',
            background: activeMode === 'print' ? 'rgba(218, 30, 40, 0.15)' : 'var(--ds-bg-surface-elevated)',
            border: activeMode === 'print' ? '2px solid #da1e28' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: activeMode === 'print' ? '#da1e28' : 'var(--ds-text-primary)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
          }}
        >
          <Terminal size={18} />
          <span>Mode: 'print()' (Screen Display Only)</span>
        </button>
      </div>

      {/* 2-Column Code vs Memory & Pipeline Result */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        {/* Python Code Snippet */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
            PYTHON CODE
          </div>
          <div>def add(a, b):</div>
          <div style={{ paddingLeft: '1.25rem', color: activeMode === 'return' ? 'var(--ds-emerald)' : '#da1e28', fontWeight: 600 }}>
            {activeMode === 'return' ? 'return a + b' : 'print(a + b)'}
          </div>
          <div style={{ marginTop: '8px' }}>result = add(5, 3)</div>
          <div style={{ color: 'var(--ds-cyan)', fontWeight: 600 }}>double = result * 2</div>
        </div>

        {/* Execution & Memory Inspector */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface)',
            border: activeMode === 'return' ? '1.5px solid var(--ds-emerald)' : '1.5px solid #da1e28',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                VARIABLE STATE IN MEMORY
              </span>
              <Tag type={activeMode === 'return' ? 'green' : 'red'} size="sm">
                {activeMode === 'return' ? 'Success' : 'TypeError'}
              </Tag>
            </div>

            <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', marginBottom: '6px' }}>
              <code>result = </code>
              <strong style={{ color: activeMode === 'return' ? 'var(--ds-emerald)' : '#da1e28' }}>
                {activeMode === 'return' ? '8 (int)' : 'None (NoneType)'}
              </strong>
            </div>

            <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem' }}>
              <code>double = </code>
              <strong style={{ color: activeMode === 'return' ? 'var(--ds-cyan)' : '#da1e28' }}>
                {activeMode === 'return' ? '16 (int)' : 'TypeError: NoneType * int'}
              </strong>
            </div>
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '12px' }}>
            {activeMode === 'return'
              ? '✓ return passes value 8 back to the caller. result holds 8, allowing double = 8 * 2 = 16.'
              : '✗ print() only writes 8 to stdout and returns None. Multiplying None * 2 crashes with a TypeError.'}
          </div>
        </div>
      </div>
    </div>
  );
}
