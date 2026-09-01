'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, NumberInput } from '@carbon/react';
import {
  Code,
  Information,
  ArrowRight,
} from '@carbon/icons-react';

export function RangeBuilder() {
  const [start, setStart] = useState<number>(0);
  const [stop, setStop] = useState<number>(10);
  const [step, setStep] = useState<number>(2);

  // Generate range sequence
  const generatedList: number[] = [];
  if (step > 0 && start < stop) {
    for (let i = start; i < stop; i += step) {
      generatedList.push(i);
      if (generatedList.length > 50) break; // Safety cap
    }
  }

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
            range() Sequence Generator & Endpoint Inspector
          </h3>
        </div>
        <Tag type="teal" size="md">
          Sequence Generator
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        In Python, <code>range(start, stop, step)</code> generates a sequence of integers starting at <code>start</code>, stepping by <code>step</code>, and terminating strictly <strong>BEFORE</strong> reaching <code>stop</code>. Adjust parameters below:
      </p>

      {/* 3 Parameter Inputs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '1.5rem',
        }}
      >
        <NumberInput
          id="range-start"
          label="START (Inclusive)"
          value={start}
          min={0}
          max={50}
          step={1}
          onChange={(_e, { value }) => setStart(Number(value))}
        />
        <NumberInput
          id="range-stop"
          label="STOP (Excluded)"
          value={stop}
          min={1}
          max={50}
          step={1}
          onChange={(_e, { value }) => setStop(Number(value))}
        />
        <NumberInput
          id="range-step"
          label="STEP (Stride)"
          value={step}
          min={1}
          max={10}
          step={1}
          onChange={(_e, { value }) => setStep(Number(value))}
        />
      </div>

      {/* Code Signature Header */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          border: '1px solid var(--ds-border-subtle)',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>
            list(range({start}, {stop}, {step}))
          </div>
          <Tag type="cyan" size="sm">
            {generatedList.length} Elements Generated
          </Tag>
        </div>

        {/* Generated Sequence Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {generatedList.map((num, idx) => (
            <motion.div
              key={`${num}-${idx}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              style={{
                padding: '8px 14px',
                background: 'var(--ds-teal-dim)',
                border: '1.5px solid var(--ds-teal)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--ds-teal)',
              }}
            >
              {num}
            </motion.div>
          ))}
          {generatedList.length === 0 && (
            <span style={{ fontSize: '0.8125rem', color: '#da1e28', fontStyle: 'italic' }}>
              Empty sequence (start must be less than stop with positive step).
            </span>
          )}
        </div>
      </div>

      {/* Endpoint Alert */}
      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface)',
          borderLeft: '3px solid var(--ds-amber)',
          borderRadius: '0 4px 4px 0',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
        }}
      >
        <strong style={{ color: 'var(--ds-amber)' }}>Crucial Rule:</strong> The endpoint <code>{stop}</code> is <strong>NEVER included</strong> in the generated sequence! If you need the loop to include {stop}, set the stop boundary to <code>{stop + 1}</code>.
      </div>
    </div>
  );
}
