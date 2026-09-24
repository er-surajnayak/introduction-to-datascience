'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { ShoppingCart, CheckmarkFilled, Warning, Play, Restart, TaskComplete } from '@carbon/icons-react';

interface RowRecord {
  customer: string;
  city: string;
  price: string | number;
  date: string;
  delivered: string | boolean;
}

const RAW_DATA: RowRecord[] = [
  { customer: 'Customer A', city: 'Mumbai ', price: '₹50,000', date: '01/08/26', delivered: 'Yes' },
  { customer: 'Customer B', city: 'mumbai', price: '50000', date: '2026-08-01', delivered: 'Y' },
  { customer: 'Customer C', city: ' MUMBAI', price: '₹75,000', date: 'Aug 1 2026', delivered: 'TRUE' },
  { customer: 'Customer D', city: 'Mumbai', price: '75000', date: '01-Aug-26', delivered: 'yes' },
];

export function MultiProblemEcommerceCaseStudy() {
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  // Steps:
  // 0: Raw Data (All problems present)
  // 1: Inspected (Problems highlighted)
  // 2: City Standardized (.str.strip().str.title())
  // 3: Price Cleaned (remove ₹ & commas -> numeric)
  // 4: Date Parsed (pd.to_datetime -> YYYY-MM-DD)
  // 5: Delivered Standardized (boolean mapping -> True)
  // 6: Final Validated (Analysis-Ready)

  const getProcessedData = (step: number): RowRecord[] => {
    return RAW_DATA.map((row) => {
      let city = row.city;
      let price: string | number = row.price;
      let date = row.date;
      let delivered: string | boolean = row.delivered;

      if (step >= 2) {
        city = city.trim();
        city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      }

      if (step >= 3) {
        const cleanStr = String(price).replace(/[₹,\s]/g, '');
        price = Number(cleanStr);
      }

      if (step >= 4) {
        date = '2026-08-01'; // Standardized ISO datetime representation
      }

      if (step >= 5) {
        delivered = true;
      }

      return {
        customer: row.customer,
        city,
        price,
        date,
        delivered,
      };
    });
  };

  const stepsList = [
    { label: 'Raw State', desc: '4 heterogeneous rows with 5 distinct formatting traps.' },
    { label: '1. Inspect', desc: 'Identify city casing/spaces, currency strings, mixed dates, and truthy booleans.' },
    { label: '2. Standardize City', desc: 'Apply df["City"].str.strip().str.title() to collapse 3 variants to "Mumbai".' },
    { label: '3. Clean Price', desc: 'Remove ₹ & commas, coerce to int64: sum/mean operations now succeed.' },
    { label: '4. Parse Dates', desc: 'Convert 4 mixed formats into unified pd.Timestamp ISO dates.' },
    { label: '5. Standardize Delivered', desc: 'Map {"Yes", "Y", "TRUE", "yes"} to boolean True.' },
    { label: '6. Validate Ready', desc: 'Check unique categories (1 city, 1 date, pure booleans, numeric sum).' },
  ];

  const currentData = getProcessedData(pipelineStep);

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
            Case Study: One E-Commerce Dataset with 5 Formatting Traps
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {pipelineStep > 0 && (
            <Button kind="ghost" size="sm" renderIcon={Restart} onClick={() => setPipelineStep(0)}>
              Reset Pipeline
            </Button>
          )}
          {pipelineStep < 6 && (
            <Button
              size="sm"
              renderIcon={Play}
              onClick={() => setPipelineStep((s) => s + 1)}
            >
              {pipelineStep === 0 ? 'Start Pipeline Execution' : 'Apply Next Transformation'}
            </Button>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Real-world transactional files rarely have just one mistake. In this 4-order sample, city names differ in case and spacing, prices mix string symbols with raw digits, dates use four formats, and delivered status mixes text and boolean codes.
      </p>

      {/* Step Stepper Indicator */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '6px',
          marginBottom: '1.5rem',
        }}
      >
        {stepsList.map((step, idx) => {
          const isCurrent = pipelineStep === idx;
          const isDone = pipelineStep > idx;
          return (
            <button
              key={step.label}
              onClick={() => setPipelineStep(idx)}
              style={{
                padding: '8px 10px',
                borderRadius: '4px',
                border: isCurrent
                  ? '1px solid var(--ds-cyan)'
                  : isDone
                  ? '1px solid var(--ds-emerald)'
                  : '1px solid var(--ds-border-subtle)',
                background: isCurrent
                  ? 'var(--ds-cyan-dim)'
                  : isDone
                  ? 'rgba(36, 161, 72, 0.1)'
                  : 'var(--ds-bg-core)',
                color: isCurrent
                  ? 'var(--ds-cyan)'
                  : isDone
                  ? 'var(--ds-emerald)'
                  : 'var(--ds-text-muted)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div>{step.label}</div>
              {isDone && <CheckmarkFilled size={12} style={{ marginTop: '2px' }} />}
            </button>
          );
        })}
      </div>

      {/* Current Step Description Banner */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '4px',
          background: pipelineStep === 6 ? 'rgba(36, 161, 72, 0.15)' : 'var(--cds-layer-02)',
          borderLeft: `4px solid ${pipelineStep === 6 ? 'var(--ds-emerald)' : 'var(--ds-cyan)'}`,
          marginBottom: '1.25rem',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-primary)',
        }}
      >
        <strong>Current Stage:</strong> {stepsList[pipelineStep].desc}
      </div>

      {/* Interactive Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--cds-layer-02)', borderBottom: '2px solid var(--ds-border-subtle)' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Customer</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                City {pipelineStep >= 2 ? <Tag type="green" size="sm">Standardized</Tag> : pipelineStep === 1 ? <Tag type="red" size="sm">Casing/Spaces</Tag> : null}
              </th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                Price {pipelineStep >= 3 ? <Tag type="green" size="sm">Numeric (int64)</Tag> : pipelineStep === 1 ? <Tag type="red" size="sm">Mixed Currency</Tag> : null}
              </th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                Order Date {pipelineStep >= 4 ? <Tag type="green" size="sm">datetime64</Tag> : pipelineStep === 1 ? <Tag type="red" size="sm">4 Formats</Tag> : null}
              </th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                Delivered {pipelineStep >= 5 ? <Tag type="green" size="sm">bool</Tag> : pipelineStep === 1 ? <Tag type="red" size="sm">Mixed Truthy</Tag> : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => {
              const rawRow = RAW_DATA[idx];
              const isCityFixed = pipelineStep >= 2;
              const isPriceFixed = pipelineStep >= 3;
              const isDateFixed = pipelineStep >= 4;
              const isDeliveredFixed = pipelineStep >= 5;

              return (
                <tr
                  key={row.customer}
                  style={{
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    background: idx % 2 === 0 ? 'var(--ds-bg-core)' : 'var(--ds-bg-surface)',
                  }}
                >
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ds-text-primary)' }}>{row.customer}</td>
                  
                  {/* City */}
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)' }}>
                    <span style={{ color: isCityFixed ? 'var(--ds-emerald)' : pipelineStep === 1 ? '#da1e28' : 'var(--ds-text-secondary)' }}>
                      &quot;{row.city}&quot;
                    </span>
                    {pipelineStep === 1 && <span style={{ fontSize: '0.75rem', color: '#da1e28', display: 'block' }}>Raw: &quot;{rawRow.city}&quot;</span>}
                  </td>

                  {/* Price */}
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)' }}>
                    <span style={{ color: isPriceFixed ? 'var(--ds-emerald)' : pipelineStep === 1 ? '#da1e28' : 'var(--ds-text-secondary)', fontWeight: isPriceFixed ? 700 : 400 }}>
                      {typeof row.price === 'number' ? row.price.toLocaleString() : row.price}
                    </span>
                    {pipelineStep === 1 && <span style={{ fontSize: '0.75rem', color: '#da1e28', display: 'block' }}>type: str</span>}
                  </td>

                  {/* Date */}
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)' }}>
                    <span style={{ color: isDateFixed ? 'var(--ds-emerald)' : pipelineStep === 1 ? '#da1e28' : 'var(--ds-text-secondary)' }}>
                      {row.date}
                    </span>
                  </td>

                  {/* Delivered */}
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)' }}>
                    <span style={{ color: isDeliveredFixed ? 'var(--ds-emerald)' : pipelineStep === 1 ? '#da1e28' : 'var(--ds-text-secondary)', fontWeight: 600 }}>
                      {String(row.delivered)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Transformation Code & Validation Summary */}
      {pipelineStep === 6 && (
        <div
          style={{
            padding: '1rem',
            background: 'rgba(36, 161, 72, 0.1)',
            border: '1px solid var(--ds-emerald)',
            borderRadius: '4px',
            fontSize: '0.875rem',
            color: 'var(--ds-text-primary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ds-emerald)', fontWeight: 600, marginBottom: '6px' }}>
            <TaskComplete size={18} />
            <span>Dataset is 100% Analysis-Ready!</span>
          </div>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
            Validation check results: <code>df[&apos;Price&apos;].sum() = 250,000</code>, <code>df[&apos;City&apos;].nunique() = 1</code>, <code>df[&apos;Order Date&apos;].dt.month.unique() = [8]</code>, <code>df[&apos;Delivered&apos;].all() = True</code>.
          </p>
        </div>
      )}
    </div>
  );
}
