'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Renew,
  ArrowRight,
  Restart,
  Information,
  CheckmarkOutline,
  CloseOutline,
} from '@carbon/icons-react';

export function WhileLoopVisualizer() {
  const [count, setCount] = useState<number>(1);
  const [logs, setLogs] = useState<string[]>(['Iteration 1: count = 1 <= 5 (True) -> print(1) -> count becomes 2']);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const limit = 5;

  const handleStep = () => {
    if (count < limit) {
      const nextCount = count + 1;
      setCount(nextCount);
      setLogs((prev) => [
        ...prev,
        `Iteration ${nextCount}: count = ${nextCount} <= 5 (True) -> print(${nextCount}) -> count becomes ${nextCount + 1}`,
      ]);
    } else {
      setIsFinished(true);
      setLogs((prev) => [
        ...prev,
        `Termination Check: count = 6 <= 5 (False) -> While loop condition failed! Loop exits cleanly.`,
      ]);
    }
  };

  const handleReset = () => {
    setCount(1);
    setIsFinished(false);
    setLogs(['Iteration 1: count = 1 <= 5 (True) -> print(1) -> count becomes 2']);
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
            Interactive Experience 6
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            While Loop Simulator: Condition Checking & State Update
          </h3>
        </div>
        <Tag type="purple" size="md">
          Convergence Tracker
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        A <code>while</code> loop repeatedly executes as long as its condition remains <code>True</code>. Step through to watch how updating <code>count += 1</code> guides the loop toward termination:
      </p>

      {/* Code vs Live State Tracker */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Python Code Block */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
          }}
        >
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
            WHILE LOOP CODE
          </div>
          <div style={{ color: 'var(--ds-text-muted)', marginBottom: '2px' }}>count = 1</div>
          <div
            style={{
              padding: '4px 8px',
              background: !isFinished ? 'var(--ds-cyan-dim)' : 'transparent',
              borderLeft: !isFinished ? '3px solid var(--ds-cyan)' : '3px solid transparent',
              color: !isFinished ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
              fontWeight: !isFinished ? 600 : 400,
            }}
          >
            while count &lt;= 5:
          </div>
          <div style={{ color: 'var(--ds-text-primary)', paddingLeft: '1.25rem', margin: '2px 0' }}>
            print(count)
          </div>
          <div
            style={{
              padding: '4px 8px',
              paddingLeft: '1.25rem',
              background: 'var(--ds-bg-surface)',
              borderLeft: '3px solid var(--ds-teal)',
              color: 'var(--ds-teal)',
            }}
          >
            count += 1 <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}># Crucial update step!</span>
          </div>
        </div>

        {/* Live Variable Counter Box */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface)',
            border: '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            CURRENT VARIABLE STATE
          </div>
          <div
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '2.25rem',
              fontWeight: 700,
              color: isFinished ? 'var(--ds-text-muted)' : 'var(--ds-cyan)',
              marginBottom: '6px',
            }}
          >
            count = {isFinished ? 6 : count}
          </div>
          <Tag type={!isFinished ? 'green' : 'red'} size="md">
            Condition ({isFinished ? 6 : count} &lt;= 5): {!isFinished ? 'True' : 'False'}
          </Tag>
        </div>
      </div>

      {/* Execution Step Logs */}
      <div
        style={{
          padding: '1rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.75rem',
          marginBottom: '1.25rem',
          maxHeight: '130px',
          overflowY: 'auto',
        }}
      >
        <div style={{ color: 'var(--ds-text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
          EXECUTION HISTORY
        </div>
        {logs.map((log, i) => (
          <div key={i} style={{ color: i === logs.length - 1 ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)', marginBottom: '3px' }}>
            &gt; {log}
          </div>
        ))}
      </div>

      {/* Control Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button
          size="md"
          kind="primary"
          renderIcon={ArrowRight}
          disabled={isFinished}
          onClick={handleStep}
        >
          {isFinished ? 'Loop Exited' : `Step Next Iteration (count=${count})`}
        </Button>

        <Button
          size="md"
          kind="ghost"
          renderIcon={Restart}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
