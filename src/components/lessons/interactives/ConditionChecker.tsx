'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  CheckmarkOutline,
  CloseOutline,
  ArrowRight,
  Code,
} from '@carbon/icons-react';

interface ConditionOption {
  id: string;
  expression: string;
  evaluate: (marks: number) => boolean;
  explanation: (marks: number) => string;
}

const conditionOptions: ConditionOption[] = [
  {
    id: 'c1',
    expression: 'marks >= 75',
    evaluate: (m) => m >= 75,
    explanation: (m) =>
      m >= 75
        ? `${m} is greater than or equal to 75 -> True. The if-block executes.`
        : `${m} is less than 75 -> False. The if-block is skipped.`,
  },
  {
    id: 'c2',
    expression: 'marks < 40',
    evaluate: (m) => m < 40,
    explanation: (m) =>
      m < 40
        ? `${m} is strictly less than 40 -> True. Failing condition triggered.`
        : `${m} is 40 or higher -> False. Passing threshold satisfied.`,
  },
  {
    id: 'c3',
    expression: 'marks == 82',
    evaluate: (m) => m === 82,
    explanation: (m) =>
      m === 82
        ? `${m} is equal to 82 -> True. Exact match found.`
        : `${m} is not equal to 82 -> False. Condition fails.`,
  },
  {
    id: 'c4',
    expression: 'marks != 50',
    evaluate: (m) => m !== 50,
    explanation: (m) =>
      m !== 50
        ? `${m} is not equal to 50 -> True.`
        : `${m} is equal to 50 -> False.`,
  },
];

const presetMarks = [85, 75, 62, 38, 50, 92];

export function ConditionChecker() {
  const [currentMarks, setCurrentMarks] = useState<number>(82);
  const [selectedConditionId, setSelectedConditionId] = useState<string>('c1');

  const selectedCondition =
    conditionOptions.find((c) => c.id === selectedConditionId) || conditionOptions[0];

  const isTrue = selectedCondition.evaluate(currentMarks);

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
            Interactive Experience 1
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Condition Checker & Boolean Evaluator
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Logic Tester
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Before Python can execute an <code>if</code> statement, it evaluates the comparison expression to a Boolean (<code>True</code> or <code>False</code>). Change the variable value or pick a condition below:
      </p>

      {/* Preset Value Selector */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
          CHANGE VARIABLE VALUE (<code>marks</code>):
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {presetMarks.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setCurrentMarks(val)}
              style={{
                padding: '6px 14px',
                background: currentMarks === val ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                border: currentMarks === val ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                fontSize: '0.8125rem',
                fontFamily: 'var(--ds-font-mono)',
                color: currentMarks === val ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontWeight: currentMarks === val ? 700 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              marks = {val}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
          CHOOSE COMPARISON EXPRESSION:
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '8px',
          }}
        >
          {conditionOptions.map((cond) => {
            const isSelected = selectedConditionId === cond.id;
            return (
              <button
                key={cond.id}
                type="button"
                onClick={() => setSelectedConditionId(cond.id)}
                style={{
                  padding: '10px 12px',
                  background: isSelected ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface)',
                  border: isSelected ? '1.5px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  color: isSelected ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                {cond.expression}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Evaluation Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentMarks}-${selectedConditionId}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'var(--ds-bg-surface-elevated)',
            border: isTrue ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            padding: '1.5rem',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem', color: 'var(--ds-text-primary)' }}>
              EVALUATING: <code>{currentMarks} {selectedCondition.expression.replace('marks', '').trim()}</code>
            </div>
            <Tag type={isTrue ? 'green' : 'red'} size="md">
              Result: {isTrue ? 'True' : 'False'}
            </Tag>
          </div>

          {/* Visual Execution Result Box */}
          <div
            style={{
              padding: '1.25rem',
              background: 'var(--ds-bg-surface)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                PROGRAM DECISION FLOW
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600, color: isTrue ? 'var(--ds-emerald)' : 'var(--ds-amber)' }}>
                {isTrue ? '✓ EXECUTE IF-BLOCK' : '↷ SKIP IF-BLOCK (OR EXECUTE ELSE)'}
              </div>
            </div>

            <div
              style={{
                padding: '6px 14px',
                background: isTrue ? 'var(--ds-emerald-dim)' : 'rgba(255, 255, 255, 0.05)',
                border: isTrue ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                fontSize: '0.8125rem',
                fontFamily: 'var(--ds-font-mono)',
                color: isTrue ? 'var(--ds-emerald)' : 'var(--ds-text-muted)',
              }}
            >
              {isTrue ? 'Indented Block Runs' : 'Indented Block Bypassed'}
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: 0, lineHeight: 1.5 }}>
            {selectedCondition.explanation(currentMarks)}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
