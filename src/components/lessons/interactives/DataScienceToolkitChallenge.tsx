'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Chemistry,
  PlayFilledAlt,
  Restart,
  CheckmarkOutline,
  Code,
} from '@carbon/icons-react';

const datasetMarks = [78, 85, 62, 91, 74, 88];

export function DataScienceToolkitChallenge() {
  const [isExecuted, setIsExecuted] = useState<boolean>(false);

  // Computations
  const avg = Math.round((datasetMarks.reduce((a, b) => a + b, 0) / datasetMarks.length) * 100) / 100;
  const highest = Math.max(...datasetMarks);
  const passingCount = datasetMarks.filter((m) => m >= 40).length;
  const gradeCategory = avg >= 80 ? 'Distinction (A)' : avg >= 70 ? 'Merit (B+)' : 'Pass (C)';

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
            Topic 1.5 Mini Challenge
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Mini Challenge: "Build a Tiny Data Science Toolkit"
          </h3>
        </div>
        <Tag type="purple" size="md">
          Modular Toolkit
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        You have a list of exam scores <code>[78, 85, 62, 91, 74, 88]</code>. Instead of writing a monolithic script, we build 4 clean, single-responsibility functions that work together:
      </p>

      {/* Dataset Preview */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
          INPUT DATASET: <code>marks = [78, 85, 62, 91, 74, 88]</code>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {datasetMarks.map((s, idx) => (
            <div
              key={idx}
              style={{
                padding: '6px 12px',
                background: 'var(--ds-bg-surface-elevated)',
                border: '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.9375rem',
                color: 'var(--ds-text-primary)',
                fontWeight: 600,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* 4 Modular Function Recipes Preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '10px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-cyan)', fontWeight: 600 }}>
            1. calculate_average(data)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>
            Returns <code>sum(data) / len(data)</code>
          </div>
        </div>

        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-teal)', fontWeight: 600 }}>
            2. find_highest(data)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>
            Returns maximum score in list
          </div>
        </div>

        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-purple)', fontWeight: 600 }}>
            3. count_passed(data, threshold)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>
            Counts scores &gt;= 40
          </div>
        </div>

        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-emerald)', fontWeight: 600 }}>
            4. classify_average(avg)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>
            Categorizes performance rating
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        {!isExecuted ? (
          <Button
            size="md"
            kind="primary"
            renderIcon={PlayFilledAlt}
            onClick={() => setIsExecuted(true)}
          >
            Execute Modular Toolkit Pipeline
          </Button>
        ) : (
          <Button
            size="md"
            kind="ghost"
            renderIcon={Restart}
            onClick={() => setIsExecuted(false)}
          >
            Reset Challenge
          </Button>
        )}
      </div>

      {/* Live Generated Summary Report */}
      <AnimatePresence>
        {isExecuted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              padding: '1.5rem',
              background: 'var(--ds-bg-surface-elevated)',
              border: '1.5px solid var(--ds-emerald)',
              borderRadius: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', textTransform: 'uppercase' }}>
                AUTOMATED REPORT DICTIONARY
              </div>
              <Tag type="green" size="md">
                Toolkit Execution Complete
              </Tag>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)' }}>Class Average</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                  {avg}%
                </div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-teal)' }}>Highest Score</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                  {highest}%
                </div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-purple)' }}>Passing Students</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                  {passingCount} / 6
                </div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-emerald)' }}>Performance Category</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
                  {gradeCategory}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ds-text-primary)' }}>Engineering Takeaway:</strong> Notice how each function handled exactly one calculation. If the grading rule changes tomorrow, we only modify <code>classify_average()</code> without touching any other calculation!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
