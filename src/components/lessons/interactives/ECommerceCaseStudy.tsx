'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { CheckmarkFilled, WarningAlt, ArrowRight, Restart } from '@carbon/icons-react';

interface OrderRecord {
  orderId: string;
  customerType: string;
  item: string;
  qty: number;
  amount: number;
  payment: string;
}

const orderRecords: OrderRecord[] = [
  { orderId: 'A101', customerType: 'Retail (B2C)', item: 'Running Shoes', qty: 1, amount: 850, payment: 'UPI' },
  { orderId: 'A102', customerType: 'Retail (B2C)', item: 'Denim Jeans', qty: 1, amount: 920, payment: 'Credit Card' },
  { orderId: 'A103', customerType: 'Retail (B2C)', item: 'Casual T-Shirt', qty: 1, amount: 780, payment: 'Net Banking' },
  { orderId: 'A104', customerType: 'Retail (B2C)', item: 'Laptop Backpack', qty: 1, amount: 1100, payment: 'UPI' },
  { orderId: 'A105', customerType: 'Retail (B2C)', item: 'Cotton Jacket', qty: 1, amount: 870, payment: 'Credit Card' },
  { orderId: 'A106', customerType: 'Corporate (B2B)', item: 'Android Smartphones', qty: 50, amount: 95000, payment: 'Corporate GST Card' },
];

export function ECommerceCaseStudy() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [selectedDecision, setSelectedDecision] = useState<'delete' | 'cap' | 'segment' | null>(null);

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
            Interactive Lab 2.5.11
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Real-World E-Commerce Case Study
          </span>
        </div>
        <Button
          kind="ghost"
          size="sm"
          renderIcon={Restart}
          onClick={() => {
            setActiveStep(1);
            setSelectedDecision(null);
          }}
        >
          Restart Case Study
        </Button>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Case Study: The ₹95,000 Order in a ₹900 Basket Dataset
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        You are the Lead Preprocessing Engineer at an online retail platform. An automated cleaning pipeline
        flagged Order <strong>A106 (₹95,000)</strong> as an extreme statistical outlier (z = 4.8). Investigate the full multi-column record before taking action.
      </p>

      {/* Dataset Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Order ID</th>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Customer Segment</th>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Item Description</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-text-primary)' }}>Quantity</th>
              <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--ds-amber)' }}>Amount (₹)</th>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Payment Mode</th>
            </tr>
          </thead>
          <tbody>
            {orderRecords.map((r) => {
              const isTarget = r.orderId === 'A106';
              return (
                <tr
                  key={r.orderId}
                  style={{
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    background: isTarget ? 'rgba(255, 131, 43, 0.12)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: isTarget ? 'var(--ds-amber)' : 'var(--ds-text-primary)' }}>
                    {r.orderId} {isTarget && '⚡'}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <Tag type={r.customerType.includes('B2B') ? 'purple' : 'cool-gray'} size="sm">
                      {r.customerType}
                    </Tag>
                  </td>
                  <td style={{ padding: '10px 12px' }}>{r.item}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: r.qty > 1 ? 700 : 400 }}>
                    {r.qty}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: isTarget ? 700 : 500, color: isTarget ? 'var(--ds-amber)' : 'inherit' }}>
                    ₹{r.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '10px 12px' }}>{r.payment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Guided Investigation Steps */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        {activeStep === 1 && (
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '6px' }}>
              Step 1: Cross-Examine Correlated Columns
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Look closely at Order <strong>A106</strong>:
              <br />• <strong>Quantity:</strong> 50 units (not 1 unit).
              <br />• <strong>Item:</strong> Android Smartphones (₹1,900 unit cost).
              <br />• <strong>Payment Mode:</strong> Verified Corporate GST Card.
              <br />• <strong>Math Check:</strong> 50 units × ₹1,900 = ₹95,000 exact match!
            </p>
            <Button size="sm" renderIcon={ArrowRight} onClick={() => setActiveStep(2)}>
              Proceed to Decision Selection (Step 2)
            </Button>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '8px' }}>
              Step 2: Choose the Optimal Preprocessing Strategy
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              How should we treat Order A106 for downstream consumer sales modeling?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => {
                  setSelectedDecision('delete');
                  setActiveStep(3);
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: '1px solid var(--ds-border-subtle)',
                  background: 'var(--ds-bg-core)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--ds-text-primary)',
                  fontSize: '0.8125rem',
                }}
              >
                <strong>Option A: Delete Order A106.</strong> (Remove row because ₹95,000 distorts the mean).
              </button>

              <button
                onClick={() => {
                  setSelectedDecision('cap');
                  setActiveStep(3);
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: '1px solid var(--ds-border-subtle)',
                  background: 'var(--ds-bg-core)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--ds-text-primary)',
                  fontSize: '0.8125rem',
                }}
              >
                <strong>Option B: Winsorize / Cap to ₹1,100.</strong> (Force ₹95,000 down to the upper retail bound).
              </button>

              <button
                onClick={() => {
                  setSelectedDecision('segment');
                  setActiveStep(3);
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: '1px solid var(--ds-cyan)',
                  background: 'var(--ds-cyan-dim)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--ds-cyan)',
                  fontSize: '0.8125rem',
                }}
              >
                <strong>Option C: Keep & Segment by Customer Type.</strong> (Retain real revenue, split B2B and B2C models).
              </button>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Tag type={selectedDecision === 'segment' ? 'green' : 'red'} size="md">
                {selectedDecision === 'segment' ? 'Architecturally Optimal' : 'Sub-Optimal Choice'}
              </Tag>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
                Decision Debrief
              </span>
            </div>

            <div style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ds-text-secondary)', marginBottom: '1rem' }}>
              {selectedDecision === 'segment' && (
                <div>
                  <strong style={{ color: 'var(--ds-emerald)' }}>Excellent Data Science Thinking!</strong>
                  <br />
                  Order A106 is a 100% legitimate corporate bulk purchase. Deleting it throws away ₹95,000 in genuine B2B revenue and bankrupts your financial forecasts. Capping it to ₹1,100 creates fictitious data (50 smartphones for ₹1,100 is absurd).
                  <br />
                  <strong>The Correct Solution:</strong> Retain the record, but engineer a <code>customer_segment</code> categorical feature (or build two distinct sub-models: one for individual B2C consumers and one for corporate B2B clients).
                </div>
              )}
              {selectedDecision === 'delete' && (
                <div>
                  <strong style={{ color: '#da1e28' }}>Problematic:</strong> Deleting Order A106 throws away ₹95,000 in real company revenue and erases the entire B2B corporate customer segment from your platform.
                </div>
              )}
              {selectedDecision === 'cap' && (
                <div>
                  <strong style={{ color: '#da1e28' }}>Problematic:</strong> Capping ₹95,000 to ₹1,100 creates unphysical nonsense: it records that Tata Consultancy purchased 50 Android smartphones for a total of ₹1,100 (₹22 per phone).
                </div>
              )}
            </div>

            <Button
              size="sm"
              kind="secondary"
              onClick={() => {
                setActiveStep(2);
                setSelectedDecision(null);
              }}
            >
              Try Another Option
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
