'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Chemistry,
  ArrowRight,
  Idea,
} from '@carbon/icons-react';

type LogicalOp = 'and' | 'or' | 'not-a' | 'not-b';

export function BooleanPlayground() {
  const [condA, setCondA] = useState<boolean>(true);
  const [condB, setCondB] = useState<boolean>(false);
  const [activeOp, setActiveOp] = useState<LogicalOp>('and');

  let result = false;
  let expressionText = '';
  let explanation = '';

  switch (activeOp) {
    case 'and':
      result = condA && condB;
      expressionText = `${condA} and ${condB}`;
      explanation =
        condA && condB
          ? 'Both conditions are True, so the compound AND statement evaluates to True.'
          : !condA
          ? 'Short-circuit triggered: Condition A is False, so Python immediately evaluates the expression to False without checking Condition B.'
          : 'Condition A is True, but Condition B is False. AND requires both to be True, so result is False.';
      break;
    case 'or':
      result = condA || condB;
      expressionText = `${condA} or ${condB}`;
      explanation = condA
        ? 'Short-circuit triggered: Condition A is True, so Python immediately evaluates the expression to True without checking Condition B.'
        : condB
        ? 'Condition A is False, but Condition B is True. OR requires at least one True, so result is True.'
        : 'Both conditions are False, so the compound OR statement evaluates to False.';
      break;
    case 'not-a':
      result = !condA;
      expressionText = `not ${condA}`;
      explanation = `NOT reverses truth value: not ${condA} becomes ${!condA}.`;
      break;
    case 'not-b':
      result = !condB;
      expressionText = `not ${condB}`;
      explanation = `NOT reverses truth value: not ${condB} becomes ${!condB}.`;
      break;
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
            Interactive Experience 3
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Boolean Logic & Short-Circuit Playground
          </h3>
        </div>
        <Tag type="teal" size="md">
          Logic Matrix
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Compound conditionals combine multiple Boolean checks using <code>and</code>, <code>or</code>, and <code>not</code>. Toggle the conditions below:
      </p>

      {/* Input Toggle Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '1.5rem',
        }}
      >
        {/* Condition A */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
            CONDITION A (e.g. attendance &gt;= 75)
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => setCondA(true)}
              style={{
                flex: 1,
                padding: '6px 12px',
                background: condA ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface)',
                border: condA ? '1.5px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                color: condA ? 'var(--ds-emerald)' : 'var(--ds-text-muted)',
                fontWeight: condA ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              True
            </button>
            <button
              type="button"
              onClick={() => setCondA(false)}
              style={{
                flex: 1,
                padding: '6px 12px',
                background: !condA ? 'rgba(218, 30, 40, 0.1)' : 'var(--ds-bg-surface)',
                border: !condA ? '1.5px solid #da1e28' : '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                color: !condA ? '#da1e28' : 'var(--ds-text-muted)',
                fontWeight: !condA ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              False
            </button>
          </div>
        </div>

        {/* Condition B */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
            CONDITION B (e.g. fees_paid == True)
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => setCondB(true)}
              style={{
                flex: 1,
                padding: '6px 12px',
                background: condB ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface)',
                border: condB ? '1.5px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                color: condB ? 'var(--ds-emerald)' : 'var(--ds-text-muted)',
                fontWeight: condB ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              True
            </button>
            <button
              type="button"
              onClick={() => setCondB(false)}
              style={{
                flex: 1,
                padding: '6px 12px',
                background: !condB ? 'rgba(218, 30, 40, 0.1)' : 'var(--ds-bg-surface)',
                border: !condB ? '1.5px solid #da1e28' : '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                color: !condB ? '#da1e28' : 'var(--ds-text-muted)',
                fontWeight: !condB ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              False
            </button>
          </div>
        </div>
      </div>

      {/* Operator Buttons */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
          CHOOSE LOGICAL OPERATOR:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { id: 'and', label: 'and (Requires Both)' },
            { id: 'or', label: 'or (Requires At Least One)' },
            { id: 'not-a', label: 'not A (Invert A)' },
            { id: 'not-b', label: 'not B (Invert B)' },
          ].map((op) => {
            const isSelected = activeOp === op.id;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => setActiveOp(op.id as LogicalOp)}
                style={{
                  padding: '8px 14px',
                  background: isSelected ? 'var(--ds-teal-dim)' : 'var(--ds-bg-surface)',
                  border: isSelected ? '1.5px solid var(--ds-teal)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '3px',
                  color: isSelected ? 'var(--ds-teal)' : 'var(--ds-text-primary)',
                  fontWeight: isSelected ? 700 : 400,
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--ds-font-mono)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {op.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Result Window */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          border: '1px solid var(--ds-border-subtle)',
          borderRadius: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            EVALUATION: <code>{expressionText}</code>
          </div>
          <Tag type={result ? 'green' : 'red'} size="md">
            Final Truth Value: {String(result)}
          </Tag>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: '0 0 10px 0', lineHeight: 1.5 }}>
          {explanation}
        </p>

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
          <strong style={{ color: 'var(--ds-teal)' }}>Data Engineering Tip:</strong> In Pandas and NumPy, use bitwise symbols <code>&amp;</code> (AND), <code>|</code> (OR), and <code>~</code> (NOT) instead of English words when filtering vectorized arrays: <code>df[(df['age'] &gt; 18) &amp; (df['cgpa'] &gt; 8.0)]</code>.
        </div>
      </div>
    </div>
  );
}
