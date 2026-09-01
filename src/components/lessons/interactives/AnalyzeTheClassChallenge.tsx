'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Chemistry,
  PlayFilledAlt,
  Restart,
  CheckmarkOutline,
  TableSplit,
  Code,
} from '@carbon/icons-react';

const rawScores = [78, 45, 91, 32, 67, 88, 39, 95];

export function AnalyzeTheClassChallenge() {
  const [filterThreshold, setFilterThreshold] = useState<number>(40);
  const [includeDistinction, setIncludeDistinction] = useState<boolean>(true);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);
  const [showNumpyBridge, setShowNumpyBridge] = useState<boolean>(false);

  // Computed results based on simulation
  const passedScores = rawScores.filter((s) => s >= filterThreshold);
  const distinctionScores = rawScores.filter((s) => s >= 80);
  const skippedScores = rawScores.filter((s) => s < filterThreshold);

  const handleRun = () => {
    setIsSimulated(true);
  };

  const handleReset = () => {
    setIsSimulated(false);
    setShowNumpyBridge(false);
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
            Topic 1.4 Mini Challenge
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Mini Challenge: "Analyze the Class" Data Pipeline
          </h3>
        </div>
        <Tag type="purple" size="md">
          Pipeline Challenge
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        You are given an uncleaned class score dataset <code>[78, 45, 91, 32, 67, 88, 39, 95]</code>. Use control structures to filter passing grades, calculate distinctions, and observe the bridge to NumPy vectorization:
      </p>

      {/* Raw Data Cards */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          RAW DATASET: <code>marks = [78, 45, 91, 32, 67, 88, 39, 95]</code>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {rawScores.map((s, idx) => {
            const isFailing = s < 40;
            const isDistinction = s >= 80;

            let border = '1px solid var(--ds-border-subtle)';
            let color = 'var(--ds-text-primary)';
            if (isSimulated) {
              if (isFailing) {
                border = '1.5px solid #da1e28';
                color = '#da1e28';
              } else if (isDistinction) {
                border = '1.5px solid var(--ds-purple)';
                color = 'var(--ds-purple)';
              } else {
                border = '1.5px solid var(--ds-teal)';
                color = 'var(--ds-teal)';
              }
            }

            return (
              <div
                key={idx}
                style={{
                  padding: '8px 12px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border,
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', fontWeight: 700, color }}>
                  {s}
                </div>
                {isSimulated && (
                  <div style={{ fontSize: '0.625rem', fontFamily: 'var(--ds-font-mono)', color, marginTop: '2px' }}>
                    {isFailing ? 'SKIP' : isDistinction ? 'DISTINCTION' : 'PASS'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {!isSimulated ? (
          <Button
            size="md"
            kind="primary"
            renderIcon={PlayFilledAlt}
            onClick={handleRun}
          >
            Execute Control Flow Pipeline
          </Button>
        ) : (
          <>
            <Button
              size="md"
              kind="tertiary"
              renderIcon={TableSplit}
              onClick={() => setShowNumpyBridge(true)}
              style={{ borderColor: 'var(--ds-border-strong)', color: 'var(--ds-text-primary)' }}
            >
              View 1-Line NumPy Vectorized Equivalent
            </Button>

            <Button
              size="md"
              kind="ghost"
              renderIcon={Restart}
              onClick={handleReset}
            >
              Reset Challenge
            </Button>
          </>
        )}
      </div>

      {/* Simulated Pipeline Results */}
      <AnimatePresence>
        {isSimulated && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              padding: '1.5rem',
              background: 'var(--ds-bg-surface-elevated)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                PIPELINE EXECUTION METRICS
              </div>
              <Tag type="green" size="md">
                6 / 8 Passed (75.0%)
              </Tag>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ padding: '12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-teal)', fontWeight: 600 }}>Passing Scores (&gt;= 40)</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: '4px 0' }}>
                  {passedScores.length} students
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                  [{passedScores.join(', ')}]
                </div>
              </div>

              <div style={{ padding: '12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-purple)', fontWeight: 600 }}>Distinctions (&gt;= 80)</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: '4px 0' }}>
                  {distinctionScores.length} students
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                  [{distinctionScores.join(', ')}]
                </div>
              </div>

              <div style={{ padding: '12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: '#da1e28', fontWeight: 600 }}>Skipped via 'continue' (&lt; 40)</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: '4px 0' }}>
                  {skippedScores.length} students
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                  [{skippedScores.join(', ')}]
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NumPy Vectorized Bridge Reveal */}
      <AnimatePresence>
        {showNumpyBridge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              padding: '1.5rem',
              background: 'var(--ds-cyan-dim)',
              border: '1.5px solid var(--ds-cyan)',
              borderRadius: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Code size={20} style={{ color: 'var(--ds-cyan)' }} />
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-cyan)', margin: 0 }}>
                Data Science Evolution: 1-Line NumPy Vectorization
              </h4>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.5, marginBottom: '10px' }}>
              Instead of manually writing a 10-line Python loop with <code>if</code>, <code>continue</code>, and counters, NumPy uses <strong>Boolean vector indexing</strong> to filter 10,000,000 items in C-level machine code:
            </p>

            <pre
              style={{
                margin: 0,
                padding: '10px 14px',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-primary)',
                lineHeight: 1.5,
              }}
            >
{`import numpy as np

marks_arr = np.array([78, 45, 91, 32, 67, 88, 39, 95])

# 1-Line Vector Filter (No manual loop!):
passed = marks_arr[marks_arr >= 40]         # array([78, 45, 91, 67, 88, 95])
distinction_count = (marks_arr >= 80).sum() # 3`}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
