'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Code, CheckmarkFilled, WarningAlt, Information } from '@carbon/icons-react';

interface ElementItem {
  id: number;
  val: number | null;
}

export function CountAndMissingnessLab() {
  const [items, setItems] = useState<ElementItem[]>([
    { id: 1, val: 70 },
    { id: 2, val: 80 },
    { id: 3, val: null }, // NaN
    { id: 4, val: 85 },
    { id: 5, val: 75 },
    { id: 6, val: null }, // NaN
  ]);

  const totalLength = items.length;
  const nonNullCount = items.filter((it) => it.val !== null).length;
  const missingCount = totalLength - nonNullCount;

  const toggleMissing = (id: number) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          return { ...it, val: it.val === null ? 82 : null };
        }
        return it;
      })
    );
  };

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
          <Tag type="teal" size="md">
            Section 04
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            The Count Statistic
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          len(df) vs. df[&quot;Marks&quot;].count()
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Count: How Many Observations Do We Actually Have?
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        The simplest descriptive statistic answers: &ldquo;How many observations exist?&rdquo; However, in Data Science, there is a crucial trap connected directly to <strong>Module 2.4 (Missing Data)</strong>: Python&apos;s <code>len()</code> counts all rows, but Pandas <code>count()</code> strictly excludes missing values (<code>NaN</code>).
      </p>

      {/* Interactive Array Inspector */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Series: df[&apos;Marks&apos;] (Click any cell to toggle NaN)
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
            Simulating dirty ingested column
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {items.map((it) => {
            const isNull = it.val === null;
            return (
              <button
                key={it.id}
                onClick={() => toggleMissing(it.id)}
                style={{
                  flex: 1,
                  minWidth: '80px',
                  padding: '12px 8px',
                  borderRadius: '4px',
                  background: isNull ? 'rgba(218, 30, 40, 0.15)' : 'var(--ds-bg-core)',
                  border: isNull ? '2px dashed #da1e28' : '1px solid var(--ds-border-strong)',
                  color: isNull ? '#da1e28' : 'var(--ds-text-primary)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                }}
                title="Click to toggle between integer score and NaN"
              >
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                  Index {it.id - 1}
                </div>
                <div style={{ fontSize: '1.25rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>
                  {isNull ? 'NaN' : it.val}
                </div>
                <div style={{ fontSize: '0.625rem', marginTop: '4px', color: isNull ? '#da1e28' : 'var(--ds-cyan)' }}>
                  {isNull ? 'Missing' : 'Valid'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Comparison Outputs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '12px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              <code>len(df[&apos;Marks&apos;])</code>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)' }}>
              {totalLength}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
              Counts total memory slots (including NaN).
            </div>
          </div>

          <div
            style={{
              padding: '12px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              borderTop: '3px solid var(--ds-cyan)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', marginBottom: '4px' }}>
              <code>df[&apos;Marks&apos;].count()</code>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
              {nonNullCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
              Counts <strong>valid non-null</strong> observations only!
            </div>
          </div>

          <div
            style={{
              padding: '12px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              borderTop: '3px solid #da1e28',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#da1e28', marginBottom: '4px' }}>
              <code>df[&apos;Marks&apos;].isna().sum()</code>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: '#da1e28' }}>
              {missingCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
              Missing entries needing imputation (Topic 2.4).
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-teal)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Bridge to Module 2.4:</strong> When calculating downstream statistics (like the Mean), dividing by <code>len()</code> instead of <code>count()</code> would dilute the numerator if missing values were encoded as 0. Always verify non-null count before summarizing.
      </div>
    </div>
  );
}
