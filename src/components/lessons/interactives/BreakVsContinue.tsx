'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  StopFilledAlt,
  SkipForwardFilled,
  Restart,
  ArrowRight,
  Idea,
} from '@carbon/icons-react';

const testDataset = [78, 32, 85, 91];

export function BreakVsContinue() {
  const [activeMode, setActiveMode] = useState<'break' | 'continue'>('break');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [printedValues, setPrintedValues] = useState<number[]>([78]);

  const currentVal = testDataset[stepIndex];

  const handleModeChange = (mode: 'break' | 'continue') => {
    setActiveMode(mode);
    setStepIndex(0);
    setPrintedValues([78]);
  };

  const handleStep = () => {
    if (activeMode === 'break') {
      if (stepIndex === 0) {
        // next is 32 -> triggers break!
        setStepIndex(1);
      }
    } else {
      // continue mode
      if (stepIndex < testDataset.length - 1) {
        const nextIdx = stepIndex + 1;
        setStepIndex(nextIdx);
        if (testDataset[nextIdx] >= 40) {
          setPrintedValues((prev) => [...prev, testDataset[nextIdx]]);
        }
      }
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setPrintedValues([78]);
  };

  const isBreakTerminated = activeMode === 'break' && stepIndex >= 1;
  const isContinueFinished = activeMode === 'continue' && stepIndex >= testDataset.length - 1;

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
            Interactive Experience 7
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Break vs Continue: Interruption vs Skipping
          </h3>
        </div>
        <Tag type="purple" size="md">
          Execution Control
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Both statements interrupt execution, but with very different scopes: <code>break</code> terminates the entire loop permanently, while <code>continue</code> skips only the current element. Switch modes below to compare:
      </p>

      {/* Mode Switcher Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => handleModeChange('break')}
          style={{
            flex: 1,
            padding: '12px',
            background: activeMode === 'break' ? 'rgba(218, 30, 40, 0.15)' : 'var(--ds-bg-surface-elevated)',
            border: activeMode === 'break' ? '2px solid #da1e28' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: activeMode === 'break' ? '#da1e28' : 'var(--ds-text-primary)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
          }}
        >
          <StopFilledAlt size={18} />
          <span>Mode: 'break' (Terminate Entire Loop)</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('continue')}
          style={{
            flex: 1,
            padding: '12px',
            background: activeMode === 'continue' ? 'var(--ds-teal-dim)' : 'var(--ds-bg-surface-elevated)',
            border: activeMode === 'continue' ? '2px solid var(--ds-teal)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: activeMode === 'continue' ? 'var(--ds-teal)' : 'var(--ds-text-primary)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
          }}
        >
          <SkipForwardFilled size={18} />
          <span>Mode: 'continue' (Skip Single Item)</span>
        </button>
      </div>

      {/* Dataset Sequence Row */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          DATASET: <code>[78, 32, 85, 91]</code> (Condition check: <code>if mark &lt; 40:</code>)
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {testDataset.map((val, idx) => {
            const isEvaluated = idx <= stepIndex;
            const isCulprit = val === 32;

            let badgeBg = 'var(--ds-bg-surface-elevated)';
            let badgeBorder = '1px solid var(--ds-border-subtle)';
            let statusText = 'Pending';
            let textColor = 'var(--ds-text-primary)';

            if (idx === 0) {
              badgeBg = 'var(--ds-emerald-dim)';
              badgeBorder = '1.5px solid var(--ds-emerald)';
              statusText = 'Printed';
              textColor = 'var(--ds-emerald)';
            } else if (idx === 1 && stepIndex >= 1) {
              if (activeMode === 'break') {
                badgeBg = 'rgba(218, 30, 40, 0.2)';
                badgeBorder = '2px solid #da1e28';
                statusText = 'BREAK! Loop Aborted';
                textColor = '#da1e28';
              } else {
                badgeBg = 'var(--ds-amber-dim)';
                badgeBorder = '1.5px solid var(--ds-amber)';
                statusText = 'CONTINUE (Skipped)';
                textColor = 'var(--ds-amber)';
              }
            } else if (idx > 1 && stepIndex >= idx) {
              badgeBg = 'var(--ds-emerald-dim)';
              badgeBorder = '1.5px solid var(--ds-emerald)';
              statusText = 'Printed';
              textColor = 'var(--ds-emerald)';
            } else if (idx > 1 && isBreakTerminated) {
              badgeBg = 'var(--ds-bg-surface)';
              badgeBorder = '1px dashed var(--ds-border-subtle)';
              statusText = 'NEVER REACHED';
              textColor = 'var(--ds-text-muted)';
            }

            return (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  background: badgeBg,
                  border: badgeBorder,
                  borderRadius: '4px',
                  textAlign: 'center',
                  minWidth: '100px',
                  opacity: idx > 1 && isBreakTerminated ? 0.4 : 1,
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                  [{idx}]
                </div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: textColor }}>
                  {val}
                </div>
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 600, color: textColor, marginTop: '4px' }}>
                  {statusText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resulting Printed Array */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
          FINAL PRINTED STDOUT
        </div>
        <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>
          [ {printedValues.join(', ')} ]
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '6px' }}>
          {activeMode === 'break'
            ? 'When score 32 (< 40) was reached, break permanently stopped the loop. Scores 85 and 91 were never examined.'
            : 'When score 32 (< 40) was reached, continue skipped printing 32 and jumped straight to scores 85 and 91.'}
        </div>
      </div>

      {/* Stepper Controls */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button
          size="md"
          kind="primary"
          renderIcon={ArrowRight}
          disabled={isBreakTerminated || isContinueFinished}
          onClick={handleStep}
        >
          {isBreakTerminated
            ? 'Loop Halted by break'
            : isContinueFinished
            ? 'Completed all items'
            : `Step to Next Item (${stepIndex + 1}/${testDataset.length})`}
        </Button>

        <Button
          size="md"
          kind="ghost"
          renderIcon={Restart}
          onClick={handleReset}
        >
          Reset Simulation
        </Button>
      </div>
    </div>
  );
}
