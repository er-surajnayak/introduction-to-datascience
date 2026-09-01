'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button, NumberInput } from '@carbon/react';
import {
  FlowStream,
  ArrowRight,
  CheckmarkOutline,
} from '@carbon/icons-react';

export function FunctionPipelineVisualizer() {
  const [basePrice, setBasePrice] = useState<number>(1000);
  const [discountPct, setDiscountPct] = useState<number>(20);
  const [taxRate, setTaxRate] = useState<number>(0.18);

  // Computations
  const discounted = Math.round(basePrice * (1 - discountPct / 100) * 100) / 100;
  const withTax = Math.round(discounted * (1 + taxRate) * 100) / 100;
  const formatted = `₹${withTax.toFixed(2)}`;

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
            Interactive Experience 8
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Function Composition Pipeline
          </h3>
        </div>
        <Tag type="teal" size="md">
          Pipeline Flow
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        In Data Science, complex tasks are built by composing small, single-responsibility functions. Watch the data transform through each chained function stage below:
      </p>

      {/* Base Price Config */}
      <div style={{ maxWidth: '240px', marginBottom: '1.5rem' }}>
        <NumberInput
          id="pipeline-price"
          label="Initial Base Price (₹)"
          value={basePrice}
          step={50}
          min={100}
          max={10000}
          onChange={(_e, { value }) => setBasePrice(Number(value))}
        />
      </div>

      {/* 4-Stage Horizontal Pipeline Flow */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          marginBottom: '1.5rem',
        }}
      >
        {/* Stage 1: Input */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface-elevated)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>INPUT</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: '4px 0' }}>
            ₹{basePrice}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Raw input value</div>
        </div>

        {/* Stage 2: apply_discount */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface-elevated)', border: '1.5px solid var(--ds-cyan)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>1. apply_discount()</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)', margin: '4px 0' }}>
            ₹{discounted}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>-{discountPct}% discount applied</div>
        </div>

        {/* Stage 3: add_tax */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface-elevated)', border: '1.5px solid var(--ds-purple)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>2. add_tax()</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-purple)', margin: '4px 0' }}>
            ₹{withTax}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>+{(taxRate * 100).toFixed(0)}% GST tax added</div>
        </div>

        {/* Stage 4: format_currency */}
        <div style={{ padding: '1rem', background: 'var(--ds-bg-surface)', border: '2px solid var(--ds-emerald)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)' }}>3. format_currency()</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)', margin: '4px 0' }}>
            {formatted}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Formatted string output</div>
        </div>
      </div>

      {/* Composition One-Liner */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.8125rem',
          color: 'var(--ds-cyan)',
        }}
      >
        <span style={{ color: 'var(--ds-text-muted)' }}>COMPOSITION EXPRESSION: </span>
        <span>final_price = format_currency(add_tax(apply_discount({basePrice})))</span>
      </div>
    </div>
  );
}
