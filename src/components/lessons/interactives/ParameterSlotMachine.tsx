'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  ArrowRight,
  Code,
  User,
} from '@carbon/icons-react';

const studentArguments = ['Aisha', 'Rahul', 'Priya', 'Suraj'];

export function ParameterSlotMachine() {
  const [selectedArg, setSelectedArg] = useState<string>('Aisha');

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
            Interactive Experience 2
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Parameter Slot & Argument Flow
          </h3>
        </div>
        <Tag type="teal" size="md">
          Argument Injection
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        A <strong>Parameter</strong> is the placeholder slot in the function definition. An <strong>Argument</strong> is the actual value passed in during the function call. Select an argument below to watch the data flow:
      </p>

      {/* Select Incoming Argument */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          SELECT INCOMING ARGUMENT:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {studentArguments.map((name) => {
            const isSelected = selectedArg === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedArg(name)}
                style={{
                  padding: '8px 16px',
                  background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                  border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 700 : 400,
                  color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                "{name}"
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Stage Visual Pipeline */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Step 1: Caller */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
            STEP 1: FUNCTION CALL
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>
            greet(<span style={{ color: 'var(--ds-amber)' }}>"{selectedArg}"</span>)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '6px' }}>
            Argument: <code>"{selectedArg}"</code> is dispatched to the function.
          </div>
        </div>

        {/* Step 2: Slot Binding */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1.5px solid var(--ds-teal)',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
            STEP 2: PARAMETER BINDING
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--ds-teal)' }}>
            name = <span style={{ color: 'var(--ds-amber)' }}>"{selectedArg}"</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '6px' }}>
            Parameter slot <code>name</code> receives the incoming argument.
          </div>
        </div>

        {/* Step 3: Execution Output */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface)',
            border: '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
            STEP 3: EXECUTION OUTPUT
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
            Hello, {selectedArg}!
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '6px' }}>
            Body executes with <code>name</code> bound to <code>"{selectedArg}"</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
