'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Table,
  Help,
  Information,
  CheckmarkFilled,
  WarningAlt,
} from '@carbon/icons-react';

interface MatrixRow {
  id: string;
  source: string;
  domainExample: string;
  likelyDataTypes: string[];
  sampleFields: {
    name: string;
    sample: string;
    dsType: string;
    warningNote?: string;
  }[];
  sourceCaveat: string;
}

const matrixData: MatrixRow[] = [
  {
    id: 'api',
    source: 'REST API',
    domainExample: 'Weather Forecast & Telemetry',
    likelyDataTypes: ['Numerical', 'Datetime', 'Categorical'],
    sampleFields: [
      { name: 'timestamp', sample: '2026-09-24T14:30:00Z', dsType: 'Datetime' },
      { name: 'temperature', sample: '28.2', dsType: 'Numerical (Continuous)' },
      { name: 'city_code', sample: 'IXG', dsType: 'Identifier / Nominal' },
    ],
    sourceCaveat: 'APIs usually deliver clean semi-structured JSON, but numbers may arrive as string-encoded floats if improperly serialized.',
  },
  {
    id: 'website',
    source: 'Web Scraping (HTML)',
    domainExample: 'E-commerce Product Catalog',
    likelyDataTypes: ['Text', 'Numerical (formatted)', 'Categorical'],
    sampleFields: [
      { name: 'product_title', sample: '"Wireless Earbuds"', dsType: 'Text / Nominal' },
      { name: 'price_string', sample: '"₹2,499.00"', dsType: 'Formatted Text -> Numerical', warningNote: 'Must clean "₹" and "," before math!' },
      { name: 'rating_stars', sample: '4.5', dsType: 'Numerical / Ordinal' },
    ],
    sourceCaveat: 'HTML strings often mix currency glyphs, commas, and whitespace, requiring regex normalization in Python.',
  },
  {
    id: 'csv',
    source: 'CSV Spreadsheets',
    domainExample: 'University Examination Marks',
    likelyDataTypes: ['Numerical', 'Categorical', 'Identifier'],
    sampleFields: [
      { name: 'student_id', sample: '1024', dsType: 'Identifier', warningNote: 'Do not calculate mean(student_id)!' },
      { name: 'marks', sample: '87', dsType: 'Numerical (Discrete)' },
      { name: 'grade_tier', sample: '"A"', dsType: 'Categorical (Ordinal)' },
    ],
    sourceCaveat: 'CSV files do not store data type metadata. Pandas infers types automatically, which may misclassify IDs as integers.',
  },
  {
    id: 'survey',
    source: 'Surveys & Polls',
    domainExample: 'Customer Satisfaction Review',
    likelyDataTypes: ['Categorical (Ordinal/Nominal)', 'Text'],
    sampleFields: [
      { name: 'satisfaction', sample: '"Very Good"', dsType: 'Categorical (Ordinal)' },
      { name: 'user_comment', sample: '"Fast UI, great support"', dsType: 'Unstructured Text' },
      { name: 'recommend_flag', sample: 'True', dsType: 'Boolean' },
    ],
    sourceCaveat: 'Surveys frequently suffer from skipped questions (missing values) and self-selection response bias.',
  },
  {
    id: 'sensor',
    source: 'IoT Sensor Stream',
    domainExample: 'Factory Thermal Vibration Monitor',
    likelyDataTypes: ['Numerical (Continuous)', 'Datetime', 'Identifier'],
    sampleFields: [
      { name: 'reading_time', sample: '2026-09-24 14:32:00.124', dsType: 'High-Precision Datetime' },
      { name: 'vibration_hz', sample: '58.42', dsType: 'Numerical (Continuous)' },
      { name: 'device_id', sample: '"DEV-PROBE-99"', dsType: 'Identifier (Hardware Label)' },
    ],
    sourceCaveat: 'High-frequency telemetry produces massive timestamped continuous time-series requiring sliding-window aggregation.',
  },
  {
    id: 'database',
    source: 'SQL Relational DB',
    domainExample: 'Banking POS Transactions',
    likelyDataTypes: ['Numerical', 'Categorical', 'Datetime', 'Identifier'],
    sampleFields: [
      { name: 'transaction_id', sample: '984729104', dsType: 'Identifier (Primary Key)' },
      { name: 'amount_inr', sample: '1240.00', dsType: 'Numerical (Continuous)' },
      { name: 'payment_mode', sample: '"UPI"', dsType: 'Categorical (Nominal)' },
      { name: 'is_settled', sample: 'True', dsType: 'Boolean' },
    ],
    sourceCaveat: 'Database tables maintain strict relational schemas with primary and foreign keys linking entities together.',
  },
  {
    id: 'image',
    source: 'Vision Capture',
    domainExample: 'Medical X-Ray & MRI Scans',
    likelyDataTypes: ['Unstructured Image Tensor'],
    sampleFields: [
      { name: 'pixel_matrix', sample: '1024 x 1024 x 1 (Grayscale)', dsType: 'Unstructured Image' },
      { name: 'patient_id', sample: '"PAT-8472"', dsType: 'Identifier' },
    ],
    sourceCaveat: 'Images require convolutional tensor extraction to generate tabular numerical feature representations.',
  },
  {
    id: 'audio',
    source: 'Acoustic Feed',
    domainExample: 'Call Center Voice Recording',
    likelyDataTypes: ['Unstructured Audio Waveform'],
    sampleFields: [
      { name: 'audio_waveform', sample: '44.1 kHz PCM Waveform', dsType: 'Unstructured Audio' },
      { name: 'call_duration_s', sample: '184.5', dsType: 'Numerical (Continuous)' },
    ],
    sourceCaveat: 'Audio files must be transcribed to text (Speech-to-Text) or converted to spectrogram tensors for analysis.',
  },
];

export function DataTypeSourceMatrix() {
  const [selectedRowId, setSelectedRowId] = useState<string>('sensor');
  const activeRow = matrixData.find((r) => r.id === selectedRowId) || matrixData[0];

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
          <Tag type="blue" size="md">
            Interactive 08
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Data Type / Source Matrix
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
          Origin → Expected Types
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Mapping Data Sources to Their Likely Data Types
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Different data sources typically generate specific combinations of data types. Click any row in the matrix below to inspect its schema fields, data types, and critical engineering caveats.
      </p>

      {/* Interactive Matrix Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.8125rem',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ background: 'var(--ds-bg-surface-elevated)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '10px 14px', color: 'var(--ds-text-primary)', fontWeight: 600 }}>Source</th>
              <th style={{ padding: '10px 14px', color: 'var(--ds-text-primary)', fontWeight: 600 }}>Domain Example</th>
              <th style={{ padding: '10px 14px', color: 'var(--ds-text-primary)', fontWeight: 600 }}>Likely Data Types</th>
              <th style={{ padding: '10px 14px', color: 'var(--ds-text-primary)', fontWeight: 600, textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {matrixData.map((row) => {
              const isSelected = row.id === selectedRowId;
              return (
                <tr
                  key={row.id}
                  onClick={() => setSelectedRowId(row.id)}
                  style={{
                    background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <td style={{ padding: '10px 14px', fontWeight: isSelected ? 600 : 400, color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)' }}>
                    {row.source}
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--ds-text-secondary)' }}>
                    {row.domainExample}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {row.likelyDataTypes.map((t, idx) => (
                        <Tag key={idx} type="cool-gray" size="sm" style={{ margin: 0 }}>
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                    <span style={{ color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                      {isSelected ? '● Active' : 'Inspect'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Row Detail Inspector Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRow.id}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                  Source Schema Breakdown: {activeRow.source}
                </span>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  {activeRow.domainExample}
                </div>
              </div>
            </div>

            {/* Field Breakdown Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px', marginBottom: '12px' }}>
              {activeRow.sampleFields.map((field, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px',
                    background: 'var(--ds-bg-surface)',
                    borderRadius: '4px',
                    border: '1px solid var(--ds-border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', fontWeight: 600 }}>{field.name}</code>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>{field.dsType}</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)' }}>
                    Sample: {field.sample}
                  </div>
                  {field.warningNote && (
                    <div style={{ fontSize: '0.6875rem', color: 'var(--ds-amber)', marginTop: '4px', fontWeight: 500 }}>
                      ⚠️ {field.warningNote}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '8px 12px',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                borderLeft: '3px solid var(--ds-cyan)',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <strong>Data Engineering Caveat:</strong> {activeRow.sourceCaveat}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
