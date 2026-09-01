'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Code,
  ArrowRight,
  Restart,
  CheckmarkOutline,
} from '@carbon/icons-react';

interface TraceRow {
  iteration: number;
  mark: number;
  condition: string;
  isMet: boolean;
  action: string;
  countAfter: number;
}

const traceSteps: TraceRow[] = [
  {
    iteration: 1,
    mark: 45,
    condition: '45 >= 50',
    isMet: false,
    action: 'Condition is False -> Skip count increment',
    countAfter: 0,
  },
  {
    iteration: 2,
    mark: 82,
    condition: '82 >= 50',
    isMet: true,
    action: 'Condition is True -> count += 1 (count becomes 1)',
    countAfter: 1,
  },
  {
    iteration: 3,
    mark: 35,
    condition: '35 >= 50',
    isMet: false,
    action: 'Condition is False -> Skip count increment',
    countAfter: 1,
  },
  {
    iteration: 4,
    mark: 91,
    condition: '91 >= 50',
    isMet: true,
    action: 'Condition is True -> count += 1 (count becomes 2)',
    countAfter: 2,
  },
  {
    iteration: 5,
    mark: 67,
    condition: '67 >= 50',
    isMet: true,
    action: 'Condition is True -> count += 1 (count becomes 3)',
    countAfter: 3,
  },
];

export function DryRunSimulator() {
  const [revealedSteps, setRevealedSteps] = useState<number>(1);

  const isComplete = revealedSteps >= traceSteps.length;

  const handleStep = () => {
    if (revealedSteps < traceSteps.length) {
      setRevealedSteps((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setRevealedSteps(1);
  };

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
            Interactive Experience 8
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            "Think Before You Run": Interactive Trace Table
          </h3>
        </div>
        <Tag type="teal" size="md">
          Dry Run Engine
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Tracing code manually (a "dry run") is how top engineers debug logic and verify accumulator variables. Step through the execution table below:
      </p>

      {/* Code Snippet Box */}
      <div
        style={{
          padding: '1rem 1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-primary)',
          marginBottom: '1.5rem',
          lineHeight: 1.5,
        }}
      >
        <div>marks = [45, 82, 35, 91, 67]</div>
        <div>count = 0</div>
        <div style={{ color: 'var(--ds-cyan)', fontWeight: 600 }}>for mark in marks:</div>
        <div style={{ paddingLeft: '1rem', color: 'var(--ds-teal)' }}>if mark &gt;= 50:</div>
        <div style={{ paddingLeft: '2rem' }}>count += 1</div>
      </div>

      {/* Interactive Trace Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-surface)', borderBottom: '1px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-muted)' }}>Iter</th>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>mark</th>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-teal)' }}>mark &gt;= 50</th>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Action Taken</th>
              <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--ds-emerald)' }}>count after</th>
            </tr>
          </thead>
          <tbody>
            {traceSteps.slice(0, revealedSteps).map((row, idx) => (
              <motion.tr
                key={row.iteration}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: idx === revealedSteps - 1 ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                  borderBottom: '1px solid var(--ds-border-subtle)',
                }}
              >
                <td style={{ padding: '10px 12px', color: 'var(--ds-text-muted)' }}>0{row.iteration}</td>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--ds-cyan)' }}>{row.mark}</td>
                <td style={{ padding: '10px 12px' }}>
                  <Tag type={row.isMet ? 'green' : 'red'} size="sm">
                    {row.condition} ({row.isMet ? 'True' : 'False'})
                  </Tag>
                </td>
                <td style={{ padding: '10px 12px', color: 'var(--ds-text-secondary)' }}>{row.action}</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: 'var(--ds-emerald)', fontSize: '1rem' }}>
                  {row.countAfter}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          {isComplete ? (
            <span style={{ fontWeight: 600, color: 'var(--ds-emerald)', fontSize: '0.875rem' }}>
              ✓ Final Result: count = 3 students scored &gt;= 50.
            </span>
          ) : (
            <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', fontFamily: 'var(--ds-font-mono)' }}>
              Step {revealedSteps} of {traceSteps.length} evaluated
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="md"
            kind="primary"
            renderIcon={ArrowRight}
            disabled={isComplete}
            onClick={handleStep}
          >
            {isComplete ? 'Trace Complete' : `Evaluate Iteration 0${revealedSteps + 1}`}
          </Button>

          <Button
            size="md"
            kind="ghost"
            renderIcon={Restart}
            onClick={handleReset}
          >
            Restart Trace
          </Button>
        </div>
      </div>
    </div>
  );
}
