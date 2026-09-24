'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Restaurant,
  CheckmarkFilled,
  Help,
  Information,
  ArrowRight,
} from '@carbon/icons-react';

interface CaseColumn {
  name: string;
  sampleVals: string[];
  meaning: string;
  dsType: string;
  validOperations: string[];
  invalidOperations: string[];
  downstreamTechnique: string;
}

const foodDeliveryColumns: CaseColumn[] = [
  {
    name: 'customer_id',
    sampleVals: ['101', '102', '103'],
    meaning: 'Unique customer account identifier in user database',
    dsType: 'Identifier',
    validOperations: ['Uniqueness checks', 'Group-by aggregations', 'Relational joins'],
    invalidOperations: ['Mean / average', 'Standard deviation', 'Multiplication'],
    downstreamTechnique: 'Used as entity join key for customer lifetime value (LTV) cohorts.',
  },
  {
    name: 'city',
    sampleVals: ['Pune', 'Mumbai', 'Pune'],
    meaning: 'Delivery metro city',
    dsType: 'Categorical (Nominal)',
    validOperations: ['Frequency counts', 'Mode (most frequent)', 'One-Hot Encoding'],
    invalidOperations: ['Ordering (Pune > Mumbai)', 'Arithmetic addition'],
    downstreamTechnique: 'Geographic demand segmentation and city-level dispatch optimization.',
  },
  {
    name: 'age',
    sampleVals: ['21', '24', '20'],
    meaning: 'Customer age in completed years',
    dsType: 'Numerical (Discrete)',
    validOperations: ['Mean / median / mode', 'Standard deviation', 'Binning into age brackets'],
    invalidOperations: ['Treating as arbitrary unordered text'],
    downstreamTechnique: 'Demographic demographic clustering and age-targeted food recommendations.',
  },
  {
    name: 'rating',
    sampleVals: ['4.5', '3.0', '5.0'],
    meaning: 'Meal quality feedback rating on 1.0 to 5.0 scale',
    dsType: 'Numerical / Ordinal',
    validOperations: ['Weighted average', 'Median score', 'Threshold filtering (e.g. rating >= 4.0)'],
    invalidOperations: ['Treating as unique identifier'],
    downstreamTechnique: 'Restaurant recommendation ranking algorithms and driver bonus scoring.',
  },
  {
    name: 'membership',
    sampleVals: ['Gold', 'Silver', 'Gold'],
    meaning: 'Loyalty subscription tier (Bronze < Silver < Gold < Platinum)',
    dsType: 'Categorical (Ordinal)',
    validOperations: ['Rank sorting', 'Ordinal integer encoding (0, 1, 2, 3)', 'Tier upgrade analysis'],
    invalidOperations: ['Assuming distance between tiers is identical monetary value'],
    downstreamTechnique: 'Churn prediction modeling and tiered discount prioritization.',
  },
  {
    name: 'review',
    sampleVals: ['"Fast!"', '"Okay"', '"Great"'],
    meaning: 'Free-form customer comment left on order',
    dsType: 'Unstructured Text',
    validOperations: ['Tokenization', 'Sentiment polarity scoring', 'TF-IDF keyword extraction'],
    invalidOperations: ['Standard arithmetic mean', 'Treating as numerical coordinate'],
    downstreamTechnique: 'NLP sentiment classification to flag delivery complaints automatically.',
  },
  {
    name: 'purchase_time',
    sampleVals: ['2026-09-15 14:32', '2026-09-15 15:01', '2026-09-15 15:22'],
    meaning: 'UTC timestamp when checkout payment succeeded',
    dsType: 'Datetime',
    validOperations: ['Hour-of-day extraction', 'Delivery duration deltas', 'Time-series rolling average'],
    invalidOperations: ['Direct multiplication as raw string'],
    downstreamTechnique: 'Hourly peak order forecasting (lunch rush vs dinner rush) in Module 4.',
  },
];

export function FoodDeliveryCaseStudy() {
  const [activeColName, setActiveColName] = useState<string>('membership');
  const activeCol = foodDeliveryColumns.find((c) => c.name === activeColName) || foodDeliveryColumns[0];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="green" size="md">
            Interactive 12
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Real-World Case Study
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
          Food Delivery Analytics Pipeline
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Case Study: Food Delivery Dataset Architecture
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Inspect the 7-column real-world table below. Click any column header or row to inspect how each column possesses a unique meaning, data type, and downstream analytical technique.
      </p>

      {/* Dataset Grid */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-surface-elevated)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              {foodDeliveryColumns.map((col) => {
                const isSelected = col.name === activeColName;
                return (
                  <th
                    key={col.name}
                    onClick={() => setActiveColName(col.name)}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      fontFamily: 'var(--ds-font-mono)',
                      color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                      background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
                      borderBottom: isSelected ? '2px solid var(--ds-cyan)' : 'none',
                    }}
                  >
                    {col.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2].map((rowIdx) => (
              <tr key={rowIdx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                {foodDeliveryColumns.map((col) => {
                  const isSelected = col.name === activeColName;
                  return (
                    <td
                      key={col.name}
                      onClick={() => setActiveColName(col.name)}
                      style={{
                        padding: '10px 12px',
                        cursor: 'pointer',
                        fontFamily: 'var(--ds-font-mono)',
                        background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
                        color: isSelected ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                      }}
                    >
                      {col.sampleVals[rowIdx]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deep-Dive Column Inspection */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCol.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{
              padding: '1.25rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                  Column Analysis: {activeCol.name}
                </span>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  {activeCol.meaning}
                </div>
              </div>
              <Tag type="cyan" size="md">
                {activeCol.dsType}
              </Tag>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', margin: '12px 0' }}>
              {/* Valid Operations */}
              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-emerald)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-emerald)', marginBottom: '4px' }}>
                  Valid Mathematical & Statistical Operations
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {activeCol.validOperations.map((v, i) => (
                    <div key={i} style={{ fontSize: '0.75rem', color: 'var(--ds-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckmarkFilled size={12} style={{ color: 'var(--ds-emerald)' }} />
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invalid Operations */}
              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid #da1e28' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#da1e28', marginBottom: '4px' }}>
                  Invalid / Dangerous Operations
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {activeCol.invalidOperations.map((iv, i) => (
                    <div key={i} style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#da1e28', fontWeight: 700 }}>✕</span>
                      <span>{iv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '10px 12px',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                borderLeft: '3px solid var(--ds-cyan)',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <strong>Downstream Machine Learning & Analytics Role:</strong> {activeCol.downstreamTechnique}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
