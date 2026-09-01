'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  WarningAlt,
  CheckmarkOutline,
  Restart,
  PlayFilledAlt,
  CloseOutline,
} from '@carbon/icons-react';

export function ReproducibilityLab() {
  const [userGuess, setUserGuess] = useState<'yes' | 'no' | null>(null);
  const [isFixedAndTested, setIsFixedAndTested] = useState<boolean>(false);

  const handleGuess = (guess: 'yes' | 'no') => {
    setUserGuess(guess);
  };

  const handleRunAllFix = () => {
    setIsFixedAndTested(true);
  };

  const handleReset = () => {
    setUserGuess(null);
    setIsFixedAndTested(false);
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
      {/* Header */}
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
            The Reproducibility Check: Inspecting Execution Scrambles
          </h3>
        </div>
        <Tag type="purple" size="md">
          Reproducibility
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Look closely at the execution counters <code>In [N]</code> on the student notebook below. Will this notebook work if another teammate runs it from top to bottom on a clean Kernel?
      </p>

      {/* Scrambled Notebook Display */}
      <div
        style={{
          background: 'var(--ds-bg-surface)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {/* Cell 1: Uses df before loading */}
        <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', fontWeight: 700 }}>
              In [4]: # Ran 4th!
            </span>
            <Tag type="cool-gray" size="sm">Top of page</Tag>
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem' }}>
            print(f"Total students: &#123;len(marks)&#125;")
          </div>
        </div>

        {/* Cell 2: Defines marks */}
        <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-purple)', fontWeight: 700 }}>
              In [1]: # Ran 1st!
            </span>
            <Tag type="cool-gray" size="sm">Middle of page</Tag>
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem' }}>
            marks = [78, 85, 92, 67, 74]
          </div>
        </div>

        {/* Cell 3: Computes average */}
        <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-teal)', fontWeight: 700 }}>
              In [2]: # Ran 2nd!
            </span>
            <Tag type="cool-gray" size="sm">Bottom of page</Tag>
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem' }}>
            average = sum(marks) / len(marks)
          </div>
        </div>
      </div>

      {/* Interactive Question */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Will this notebook execute top-to-bottom on a clean Kernel?
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => handleGuess('yes')}
            style={{
              flex: 1,
              padding: '10px',
              background: userGuess === 'yes' ? 'rgba(218, 30, 40, 0.15)' : 'var(--ds-bg-surface-elevated)',
              border: userGuess === 'yes' ? '2px solid #da1e28' : '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: userGuess === 'yes' ? '#da1e28' : 'var(--ds-text-primary)',
              cursor: 'pointer',
            }}
          >
            YES — It will run fine
          </button>

          <button
            type="button"
            onClick={() => handleGuess('no')}
            style={{
              flex: 1,
              padding: '10px',
              background: userGuess === 'no' ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface-elevated)',
              border: userGuess === 'no' ? '2px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: userGuess === 'no' ? 'var(--ds-emerald)' : 'var(--ds-text-primary)',
              cursor: 'pointer',
            }}
          >
            NO — It will crash with NameError
          </button>
        </div>
      </div>

      {/* Feedback & Action */}
      <AnimatePresence>
        {userGuess && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            style={{
              padding: '1.25rem',
              background: userGuess === 'no' ? 'var(--ds-bg-surface-elevated)' : 'rgba(218, 30, 40, 0.1)',
              border: userGuess === 'no' ? '1.5px solid var(--ds-emerald)' : '1.5px solid #da1e28',
              borderRadius: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              {userGuess === 'no' ? (
                <>
                  <CheckmarkOutline size={18} style={{ color: 'var(--ds-emerald)' }} />
                  <strong style={{ color: 'var(--ds-emerald)', fontSize: '0.9375rem' }}>
                    Correct! The notebook is broken for new readers.
                  </strong>
                </>
              ) : (
                <>
                  <CloseOutline size={18} style={{ color: '#da1e28' }} />
                  <strong style={{ color: '#da1e28', fontSize: '0.9375rem' }}>
                    Incorrect. Look at the top cell (In [4]).
                  </strong>
                </>
              )}
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              When executed top-to-bottom on a fresh Kernel, Cell 1 tries to access <code>marks</code> before Cell 2 has even defined it! In the author's browser, it worked only because they manually clicked Cell 2 first (In [1]) before jumping back up to Cell 1 (In [4]).
            </p>

            {!isFixedAndTested ? (
              <Button
                size="sm"
                kind="primary"
                renderIcon={PlayFilledAlt}
                onClick={handleRunAllFix}
              >
                Apply Best Practice: Reorder & "Restart Kernel + Run All"
              </Button>
            ) : (
              <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-emerald)', borderRadius: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', fontWeight: 700 }}>
                  ✓ TOP-TO-BOTTOM SEQUENTIAL EXECUTION VERIFIED:
                </span>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-text-primary)', marginTop: '4px' }}>
                  In [1]: marks = [78, 85, 92, 67, 74]<br />
                  In [2]: print(f"Total students: &#123;len(marks)&#125;")<br />
                  In [3]: average = sum(marks) / len(marks) (79.2)
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
