'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { ShoppingCart, ArrowRight, Restart } from '@carbon/icons-react';

const ECOMMERCE_DATA = [
  { order: 101, city: 'Mumbai', category: 'Laptop', price: 60000, qty: 1 },
  { order: 102, city: 'Pune', category: 'Phone', price: 30000, qty: 2 },
  { order: 103, city: 'Mumbai', category: 'Phone', price: 25000, qty: 1 },
  { order: 104, city: 'Nashik', category: 'Laptop', price: 55000, qty: 1 },
  { order: 105, city: 'Pune', category: 'Laptop', price: 70000, qty: 1 },
];

const TASKS = [
  {
    title: '1. Feature Creation (Total Value)',
    instruction: 'Create computed column: df["Total"] = df["Price"] * df["Quantity"]',
    code: 'df["Total"] = df["Price"] * df["Quantity"]',
    explanation: 'Vectorized multiplication scales each order row by unit quantity instantly.',
  },
  {
    title: '2. Filter High-Value Orders',
    instruction: 'Filter transactions with Price >= ₹50,000',
    code: 'high_val = df[df["Price"] >= 50000]',
    explanation: 'Extracts the 3 premium laptop orders (₹60,000, ₹55,000, ₹70,000).',
  },
  {
    title: '3. Sort by Price Descending',
    instruction: 'Sort entire catalogue from highest price to lowest price',
    code: 'df.sort_values("Price", ascending=False)',
    explanation: 'Order 105 (Pune Laptop ₹70,000) moves to row 0.',
  },
  {
    title: '4. Count Orders by City',
    instruction: 'Calculate order volume distribution per geography',
    code: 'df["City"].value_counts()',
    explanation: 'Mumbai: 2, Pune: 2, Nashik: 1.',
  },
  {
    title: '5. Average Price per City',
    instruction: 'Group by City and compute average order price',
    code: 'df.groupby("City")["Price"].mean()',
    explanation: 'Mumbai: ₹42,500, Pune: ₹50,000, Nashik: ₹55,000.',
  },
  {
    title: '6. Total Quantity per Category',
    instruction: 'Group by Category and sum units sold',
    code: 'df.groupby("Category")["Quantity"].sum()',
    explanation: 'Laptops: 3 units (1+1+1), Phones: 3 units (2+1).',
  },
];

export function EcommerceCaseStudyLab() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingCart size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            E-Commerce Operations Case Study: 6-Stage Analytical Pipeline
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button
            size="sm"
            kind="ghost"
            renderIcon={Restart}
            onClick={() => setCurrentStep(0)}
          >
            Reset
          </Button>
          {currentStep < TASKS.length - 1 ? (
            <Button
              size="sm"
              renderIcon={ArrowRight}
              onClick={() => setCurrentStep((s) => s + 1)}
            >
              Next Step ({currentStep + 1}/{TASKS.length})
            </Button>
          ) : (
            <Tag type="green" size="md">Case Study Complete</Tag>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Step through a realistic retail transaction log. Each button triggers an authentic Pandas operation showing the underlying code and resulting analytical insight.
      </p>

      {/* Stepper Buttons */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {TASKS.map((t, idx) => {
          const isCurrent = currentStep === idx;
          const isDone = currentStep > idx;
          return (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              style={{
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: isCurrent
                  ? '1px solid var(--ds-cyan)'
                  : isDone
                  ? '1px solid var(--ds-emerald)'
                  : '1px solid var(--ds-border-subtle)',
                background: isCurrent
                  ? 'var(--ds-cyan-dim)'
                  : isDone
                  ? 'rgba(36, 161, 72, 0.15)'
                  : 'var(--ds-bg-core)',
                color: isCurrent
                  ? 'var(--ds-cyan)'
                  : isDone
                  ? 'var(--ds-emerald)'
                  : 'var(--ds-text-muted)',
              }}
            >
              Step {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Current Task Code & Explanation Banner */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          borderLeft: '4px solid var(--ds-cyan)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
          {TASKS[currentStep].title}
        </div>
        <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-cyan)', marginBottom: '4px' }}>
          <code>{TASKS[currentStep].code}</code>
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
          {TASKS[currentStep].explanation}
        </div>
      </div>

      {/* Rendered Step Table */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-subtle)',
          overflowX: 'auto',
        }}
      >
        {/* Step 4: Value Counts View */}
        {currentStep === 3 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--cds-layer-02)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>City</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Order Count (value_counts)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Mumbai</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>2</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Pune</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>2</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Nashik</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>1</td>
              </tr>
            </tbody>
          </table>
        ) : currentStep === 4 ? (
          /* Step 5: Average Price Groupby */
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--cds-layer-02)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>City (Cohort)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--ds-cyan)' }}>Mean Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Mumbai</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>₹42,500</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Pune</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>₹50,000</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Nashik</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>₹55,000</td>
              </tr>
            </tbody>
          </table>
        ) : currentStep === 5 ? (
          /* Step 6: Total Qty Groupby Category */
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--cds-layer-02)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--ds-emerald)' }}>Total Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Laptop</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>3 units (1+1+1)</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Phone</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>3 units (2+1)</td>
              </tr>
            </tbody>
          </table>
        ) : (
          /* Standard Table with Step Transformations */
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--cds-layer-02)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Order</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>City</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Quantity</th>
                {currentStep >= 0 && <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-emerald)' }}>Total (₹)</th>}
              </tr>
            </thead>
            <tbody>
              {(currentStep === 1
                ? ECOMMERCE_DATA.filter((r) => r.price >= 50000)
                : currentStep === 2
                ? [...ECOMMERCE_DATA].sort((a, b) => b.price - a.price)
                : ECOMMERCE_DATA
              ).map((row) => (
                <tr key={row.order} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>{row.order}</td>
                  <td style={{ padding: '8px 12px' }}>{row.city}</td>
                  <td style={{ padding: '8px 12px' }}>{row.category}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>₹{row.price.toLocaleString()}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>{row.qty}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', fontWeight: 700 }}>
                    ₹{(row.price * row.qty).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
