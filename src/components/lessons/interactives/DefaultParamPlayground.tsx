'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Settings,
  ArrowRight,
  Idea,
} from '@carbon/icons-react';

const greetingOptions = [
  { id: 'default', label: '[Omit Argument - Use Default]', value: null },
  { id: 'welcome', label: '"Welcome"', value: 'Welcome' },
  { id: 'morning', label: '"Good morning"', value: 'Good morning' },
  { id: 'namaste', label: '"Namaste"', value: 'Namaste' },
];

export function DefaultParamPlayground() {
  const [selectedGreetingId, setSelectedGreetingId] = useState<string>('default');

  const selectedOpt = greetingOptions.find((g) => g.id === selectedGreetingId) || greetingOptions[0];
  const isDefaultUsed = selectedOpt.value === null;
  const effectiveGreeting = isDefaultUsed ? 'Hello' : selectedOpt.value;

  const callSignature = isDefaultUsed
    ? 'greet("Aisha")'
    : `greet("Aisha", "${selectedOpt.value}")`;

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
            Interactive Experience 5
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Default Parameter Fallback Playground
          </h3>
        </div>
        <Tag type="blue" size="md">
          Parameter Fallback
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Default parameters allow functions to define fallback values when a caller omits optional arguments. Select an argument configuration below:
      </p>

      {/* Function Header Code */}
      <div
        style={{
          padding: '1rem 1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          border: '1px solid var(--ds-border-subtle)',
          borderRadius: '4px',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.9375rem',
          marginBottom: '1.5rem',
        }}
      >
        <span style={{ color: 'var(--ds-purple)' }}>def </span>
        <span style={{ color: 'var(--ds-cyan)' }}>greet</span>
        <span>(name, </span>
        <span style={{ color: 'var(--ds-teal)', fontWeight: 700 }}>greeting="Hello"</span>
        <span>):</span>
        <div style={{ paddingLeft: '1.25rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
          return f"&#123;greeting&#125;, &#123;name&#125;!"
        </div>
      </div>

      {/* Greeting Option Selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          CHOOSE SECOND ARGUMENT:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {greetingOptions.map((opt) => {
            const isSelected = selectedGreetingId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedGreetingId(opt.id)}
                style={{
                  padding: '8px 14px',
                  background: isSelected ? 'var(--ds-blue-dim)' : 'var(--ds-bg-surface)',
                  border: isSelected ? '1.5px solid #4589f5' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: isSelected ? 700 : 400,
                  color: isSelected ? '#4589f5' : 'var(--ds-text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Invocation & Return Result */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            CALL: <code>{callSignature}</code>
          </div>
          <Tag type={isDefaultUsed ? 'cyan' : 'teal'} size="sm">
            {isDefaultUsed ? 'Default Fallback Activated' : 'Custom Override Supplied'}
          </Tag>
        </div>

        <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
            RETURNED STRING:
          </span>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
            "{effectiveGreeting}, Aisha!"
          </div>
        </div>

        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
          {isDefaultUsed
            ? 'Because only 1 argument was passed, Python automatically populated greeting with its default "Hello".'
            : `The caller explicitly provided "${selectedOpt.value}", overriding the default "Hello".`}
        </div>
      </div>
    </div>
  );
}
