'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Chemistry,
  ArrowRight,
  Information,
  CheckmarkOutline,
  CloseOutline,
} from '@carbon/icons-react';

interface ConversionTrial {
  id: number;
  label: string;
  sourceValue: string;
  sourceType: string;
  targetType: 'int' | 'float' | 'str' | 'bool';
  code: string;
  resultValue: string;
  resultType: string;
  isSuccess: boolean;
  explanation: string;
  dataCleaningTip: string;
}

const conversionTrials: ConversionTrial[] = [
  {
    id: 1,
    label: 'String to Integer',
    sourceValue: '"21"',
    sourceType: 'str',
    targetType: 'int',
    code: 'age = int("21")',
    resultValue: '21',
    resultType: 'int',
    isSuccess: true,
    explanation: 'Python parses the string characters "2" and "1" into a base-10 binary integer 21.',
    dataCleaningTip: 'Standard procedure when loading survey age responses or integer product IDs from text files.',
  },
  {
    id: 2,
    label: 'String to Float',
    sourceValue: '"499.50"',
    sourceType: 'str',
    targetType: 'float',
    code: 'price = float("499.50")',
    resultValue: '499.5',
    resultType: 'float',
    isSuccess: true,
    explanation: 'Python parses decimal notation into IEEE 754 64-bit floating point precision.',
    dataCleaningTip: 'Essential when cleaning eCommerce pricing or sensor telemetry arriving as text strings.',
  },
  {
    id: 3,
    label: 'Number to String',
    sourceValue: '95',
    sourceType: 'int',
    targetType: 'str',
    code: 'score_text = str(95)',
    resultValue: '"95"',
    resultType: 'str',
    isSuccess: true,
    explanation: 'Python wraps the number in quotation marks, converting it to Unicode string text.',
    dataCleaningTip: 'Used when constructing file paths (e.g. f"dataset_part_{batch_id}.csv") or UI display messages.',
  },
  {
    id: 4,
    label: 'Invalid Text to Int (Failure)',
    sourceValue: '"hello"',
    sourceType: 'str',
    targetType: 'int',
    code: 'val = int("hello")',
    resultValue: 'ValueError: invalid literal for int() with base 10: \'hello\'',
    resultType: 'Error',
    isSuccess: false,
    explanation: 'Alphabetic characters cannot be parsed as numeric digits. Python immediately halts with a ValueError.',
    dataCleaningTip: 'In Pandas, use pd.to_numeric(series, errors=\'coerce\') to safely convert dirty strings to NaN instead of crashing.',
  },
  {
    id: 5,
    label: 'Decimal String directly to Int (Trap!)',
    sourceValue: '"32.8"',
    sourceType: 'str',
    targetType: 'int',
    code: 'val = int("32.8")',
    resultValue: 'ValueError: invalid literal for int() with base 10: \'32.8\'',
    resultType: 'Error',
    isSuccess: false,
    explanation: 'int() expects only integer digits in the string. Because of the decimal point ".", it fails!',
    dataCleaningTip: 'To convert decimal text to an integer, cast to float first: int(float("32.8")) -> 32.',
  },
  {
    id: 6,
    label: 'Integer to Boolean',
    sourceValue: '1',
    sourceType: 'int',
    targetType: 'bool',
    code: 'is_active = bool(1)',
    resultValue: 'True',
    resultType: 'bool',
    isSuccess: true,
    explanation: 'In Python, 0 is False and any non-zero number (1, -5, 42) evaluates to True.',
    dataCleaningTip: 'Useful when converting binary database flags (0 or 1) into clean Python Boolean filter masks.',
  },
];

export function ConversionLab() {
  const [selectedId, setSelectedId] = useState<number>(1);

  const current = conversionTrials.find((t) => t.id === selectedId) || conversionTrials[0];

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
            Interactive Experience 4
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Type Conversion Workbench: Safe Casting vs ValueError Traps
          </h3>
        </div>
        <Tag type="teal" size="md">
          Type Casting Lab
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Data rarely arrives in the exact format we need. Click each casting scenario below to test how Python transforms values and identify common conversion pitfalls:
      </p>

      {/* Trial Buttons Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '8px',
          marginBottom: '1.75rem',
        }}
      >
        {conversionTrials.map((trial) => {
          const isActive = trial.id === selectedId;
          return (
            <button
              key={trial.id}
              type="button"
              onClick={() => setSelectedId(trial.id)}
              style={{
                padding: '10px 8px',
                background: isActive ? 'var(--ds-teal-dim)' : 'var(--ds-bg-surface-elevated)',
                border: isActive ? '1.5px solid var(--ds-teal)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                color: isActive ? 'var(--ds-teal)' : 'var(--ds-text-primary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '2px' }}>
                {trial.isSuccess ? (
                  <CheckmarkOutline size={14} style={{ color: 'var(--ds-emerald)' }} />
                ) : (
                  <CloseOutline size={14} style={{ color: '#da1e28' }} />
                )}
                <span>{trial.label}</span>
              </div>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                {trial.sourceValue} ➔ {trial.targetType}()
              </div>
            </button>
          );
        })}
      </div>

      {/* Transformation Visualizer Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'var(--ds-bg-surface-elevated)',
            border: current.isSuccess ? '1px solid var(--ds-border-subtle)' : '1px solid rgba(218, 30, 40, 0.4)',
            borderRadius: '4px',
            padding: '1.5rem',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              PYTHON STATEMENT: <code>{current.code}</code>
            </div>
            <Tag type={current.isSuccess ? 'green' : 'red'} size="md">
              {current.isSuccess ? 'Valid Conversion' : 'Runtime Exception'}
            </Tag>
          </div>

          {/* 3-Stage Transformation Pipeline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              padding: '1.5rem',
              background: 'var(--ds-bg-surface)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Input Value */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                INPUT ({current.sourceType})
              </div>
              <div
                style={{
                  padding: '8px 16px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--ds-text-primary)',
                }}
              >
                {current.sourceValue}
              </div>
            </div>

            {/* Casting Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--ds-teal)' }}>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', textTransform: 'uppercase' }}>
                {current.targetType}()
              </span>
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>➔</span>
            </div>

            {/* Output Result */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                RESULT ({current.resultType})
              </div>
              <div
                style={{
                  padding: '8px 18px',
                  background: current.isSuccess ? 'var(--ds-emerald-dim)' : 'rgba(218, 30, 40, 0.1)',
                  border: current.isSuccess ? '1.5px solid var(--ds-emerald)' : '1.5px solid #da1e28',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: current.isSuccess ? '1.125rem' : '0.8125rem',
                  fontWeight: 700,
                  color: current.isSuccess ? 'var(--ds-emerald)' : '#da1e28',
                  maxWidth: '320px',
                  wordBreak: 'break-word',
                }}
              >
                {current.resultValue}
              </div>
            </div>
          </div>

          {/* Explanation */}
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
            {current.explanation}
          </p>

          {/* Data Science Tip */}
          <div
            style={{
              padding: '10px 14px',
              background: 'var(--ds-bg-surface)',
              borderLeft: '3px solid var(--ds-teal)',
              borderRadius: '0 4px 4px 0',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
            }}
          >
            <strong style={{ color: 'var(--ds-teal)' }}>Data Engineering Tip:</strong>{' '}
            {current.dataCleaningTip}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
