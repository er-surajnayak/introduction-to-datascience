'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, TextInput } from '@carbon/react';
import {
  Document,
  CheckmarkFilled,
  Help,
  Information,
  Filter,
} from '@carbon/icons-react';

interface ColumnMetadata {
  name: string;
  businessMeaning: string;
  dsType: string;
  storageDtype: string;
  allowedValues: string;
  nullable: boolean;
  sampleValue: string;
  cleaningPrecaution: string;
}

const dictionaryRows: ColumnMetadata[] = [
  {
    name: 'student_id',
    businessMeaning: 'Unique institutional enrollment identifier',
    dsType: 'Identifier',
    storageDtype: 'int64 / string',
    allowedValues: 'Positive integer > 0 (Unique)',
    nullable: false,
    sampleValue: '1024',
    cleaningPrecaution: 'Check for duplicate IDs. Never compute mean or standard deviation on this column.',
  },
  {
    name: 'full_name',
    businessMeaning: 'Legal registered name of student',
    dsType: 'Text',
    storageDtype: 'string / object',
    allowedValues: 'Alphabetic characters & spaces',
    nullable: false,
    sampleValue: '"Priya Sharma"',
    cleaningPrecaution: 'Trim leading/trailing whitespace and normalize title casing (e.g. .str.strip().str.title()).',
  },
  {
    name: 'age',
    businessMeaning: 'Completed years of age at registration',
    dsType: 'Numerical (Discrete)',
    storageDtype: 'int64',
    allowedValues: '16 <= age <= 65',
    nullable: false,
    sampleValue: '21',
    cleaningPrecaution: 'Check for negative numbers or impossible outliers like age=210.',
  },
  {
    name: 'department',
    businessMeaning: 'Academic department of enrollment',
    dsType: 'Categorical (Nominal)',
    storageDtype: 'category / string',
    allowedValues: "['CSE', 'ECE', 'ME', 'CE', 'AI']",
    nullable: false,
    sampleValue: '"CSE"',
    cleaningPrecaution: 'Standardize abbreviations (e.g., "CompSci" -> "CSE") to avoid fragmented categories.',
  },
  {
    name: 'exam_marks',
    businessMeaning: 'Final semester examination score',
    dsType: 'Numerical (Discrete/Cont)',
    storageDtype: 'float32 / int32',
    allowedValues: '0.0 <= marks <= 100.0',
    nullable: true,
    sampleValue: '87.5',
    cleaningPrecaution: 'Null values indicate absent students; treat carefully in Topic 2.4 Missing Data Imputation.',
  },
  {
    name: 'exam_date',
    businessMeaning: 'Date when examination was administered',
    dsType: 'Datetime',
    storageDtype: 'datetime64[ns]',
    allowedValues: 'Valid calendar date in YYYY-MM-DD',
    nullable: false,
    sampleValue: '"2026-09-16"',
    cleaningPrecaution: 'Parse multiple conflicting date formats (e.g. DD/MM/YYYY vs MM/DD/YYYY) into ISO standard.',
  },
  {
    name: 'is_scholarship',
    businessMeaning: 'Merit scholarship recipient status',
    dsType: 'Boolean',
    storageDtype: 'bool',
    allowedValues: 'True / False (1 / 0)',
    nullable: false,
    sampleValue: 'True',
    cleaningPrecaution: 'Coerce text strings like "Y", "yes", "True", "1" into canonical Python booleans.',
  },
];

export function InteractiveDataDictionary() {
  const [selectedColumnName, setSelectedColumnName] = useState<string>('exam_marks');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRows = dictionaryRows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.businessMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.dsType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeColumn = dictionaryRows.find((r) => r.name === selectedColumnName) || dictionaryRows[0];

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
          <Tag type="cyan" size="md">
            Interactive 10
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Dataset Data Dictionary
          </span>
        </div>
        <div style={{ minWidth: '220px' }}>
          <TextInput
            id="data-dict-search"
            labelText=""
            placeholder="Search columns or types..."
            size="sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        The Blueprint of Data Semantics: The Data Dictionary
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        A <strong>Data Dictionary</strong> is the formal single source of truth documenting column names, business definitions, analytical types, permitted values, and nullability. Click any column row below to inspect its detailed specifications.
      </p>

      {/* Dictionary Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-surface-elevated)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '10px 12px', color: 'var(--ds-text-primary)' }}>Column Name</th>
              <th style={{ padding: '10px 12px', color: 'var(--ds-text-primary)' }}>Business Meaning</th>
              <th style={{ padding: '10px 12px', color: 'var(--ds-text-primary)' }}>Analytical DS Type</th>
              <th style={{ padding: '10px 12px', color: 'var(--ds-text-primary)' }}>Storage Dtype</th>
              <th style={{ padding: '10px 12px', color: 'var(--ds-text-primary)' }}>Nullable?</th>
              <th style={{ padding: '10px 12px', color: 'var(--ds-text-primary)' }}>Sample</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => {
              const isSelected = row.name === selectedColumnName;
              return (
                <tr
                  key={row.name}
                  onClick={() => setSelectedColumnName(row.name)}
                  style={{
                    background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontFamily: 'var(--ds-font-mono)', fontWeight: isSelected ? 600 : 400, color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)' }}>
                    {row.name}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--ds-text-secondary)' }}>
                    {row.businessMeaning}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <Tag type={row.dsType.includes('Numerical') ? 'purple' : row.dsType.includes('Categorical') ? 'teal' : row.dsType === 'Identifier' ? 'cool-gray' : 'cyan'} size="sm" style={{ margin: 0 }}>
                      {row.dsType}
                    </Tag>
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                    {row.storageDtype}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ color: row.nullable ? 'var(--ds-amber)' : 'var(--ds-emerald)', fontWeight: 600 }}>
                      {row.nullable ? 'Yes (Can be Null)' : 'No'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
                    {row.sampleValue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Column Detail Metadata */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeColumn.name}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Document size={18} style={{ color: 'var(--ds-cyan)' }} />
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  Column Specification: <code style={{ color: 'var(--ds-cyan)' }}>{activeColumn.name}</code>
                </span>
              </div>
              <Tag type="cyan" size="md">
                {activeColumn.dsType}
              </Tag>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', margin: '12px 0' }}>
              <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface)', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>Allowed Range / Domain</div>
                <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)', marginTop: '2px' }}>
                  {activeColumn.allowedValues}
                </div>
              </div>

              <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface)', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>Nullability Constraint</div>
                <div style={{ fontSize: '0.8125rem', color: activeColumn.nullable ? 'var(--ds-amber)' : 'var(--ds-emerald)', marginTop: '2px', fontWeight: 600 }}>
                  {activeColumn.nullable ? '⚠️ Nullable (Contains Missing Values)' : '✓ Strictly Not Null (Mandatory Field)'}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '10px 12px',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                borderLeft: '3px solid var(--ds-amber)',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <strong>Data Cleaning & Pipeline Precaution:</strong> {activeColumn.cleaningPrecaution}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
