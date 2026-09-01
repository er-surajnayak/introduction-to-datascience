'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Chemistry,
  PlayFilledAlt,
  Restart,
  CheckmarkOutline,
  Document,
  Code,
} from '@carbon/icons-react';

const challengeDataset = [78, 85, 92, 67, 74, 88, 95, 61, 83, 79];

export function NotebookDesignChallenge() {
  const [isAssembled, setIsAssembled] = useState<boolean>(false);

  const avg = Math.round((challengeDataset.reduce((a, b) => a + b, 0) / challengeDataset.length) * 10) / 10;
  const highest = Math.max(...challengeDataset);
  const lowest = Math.min(...challengeDataset);
  const aboveAvgCount = challengeDataset.filter((m) => m >= avg).length;

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
            Topic 1.6 Mini Challenge
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Mini Challenge: "Design Your First Data Science Notebook"
          </h3>
        </div>
        <Tag type="purple" size="md">
          Notebook Architecture
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        You are tasked with analyzing a class exam dataset: <code>marks = [78, 85, 92, 67, 74, 88, 95, 61, 83, 79]</code>. Instead of dumping loose code into a script, we construct a structured 6-cell analytical notebook:
      </p>

      {/* Dataset Preview */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
          RAW DATASET (10 STUDENTS):
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {challengeDataset.map((s, idx) => (
            <div
              key={idx}
              style={{
                padding: '4px 10px',
                background: 'var(--ds-bg-surface-elevated)',
                border: '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.875rem',
                color: 'var(--ds-text-primary)',
                fontWeight: 600,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* 6 Blueprint Stages */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '10px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-purple)', fontSize: '0.8125rem', fontWeight: 600 }}>
            <Document size={14} />
            <span>Cell 1: Markdown</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Problem statement & analysis objective
          </div>
        </div>

        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-cyan)', fontSize: '0.8125rem', fontWeight: 600 }}>
            <Code size={14} />
            <span>Cell 2: Code</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Define list & check dataset length
          </div>
        </div>

        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-cyan)', fontSize: '0.8125rem', fontWeight: 600 }}>
            <Code size={14} />
            <span>Cell 3: Code</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Calculate mean, highest, and lowest scores
          </div>
        </div>

        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-cyan)', fontSize: '0.8125rem', fontWeight: 600 }}>
            <Code size={14} />
            <span>Cell 4: Code</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Filter students scoring above average
          </div>
        </div>

        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-teal)', fontSize: '0.8125rem', fontWeight: 600 }}>
            <Code size={14} />
            <span>Cell 5: Visualization</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Render distribution bar plot inline
          </div>
        </div>

        <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-purple)', fontSize: '0.8125rem', fontWeight: 600 }}>
            <Document size={14} />
            <span>Cell 6: Markdown</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
            Document key findings & strategic advice
          </div>
        </div>
      </div>

      {/* Assembly Trigger */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        {!isAssembled ? (
          <Button
            size="md"
            kind="primary"
            renderIcon={PlayFilledAlt}
            onClick={() => setIsAssembled(true)}
          >
            Assemble & Execute Notebook Blueprint
          </Button>
        ) : (
          <Button
            size="md"
            kind="ghost"
            renderIcon={Restart}
            onClick={() => setIsAssembled(false)}
          >
            Reset Challenge
          </Button>
        )}
      </div>

      {/* Simulated Executed Blueprint */}
      <AnimatePresence>
        {isAssembled && (
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
                COMPLETE NOTEBOOK EXECUTION OUTPUT
              </div>
              <Tag type="green" size="md">
                Notebook Validated Top-to-Bottom
              </Tag>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)' }}>Total Records</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                  10
                </div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)' }}>Class Average</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                  {avg}%
                </div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-teal)' }}>Score Range</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                  {lowest}% - {highest}%
                </div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-emerald)' }}>Above Average</div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
                  {aboveAvgCount} / 10 (60%)
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ds-text-primary)' }}>🧠 Data Scientist Thinking Question:</strong> <em>"What other question would you ask about this dataset?"</em>
              <div style={{ marginTop: '4px', color: 'var(--ds-cyan)' }}>
                A Data Scientist would ask: "What is the standard deviation (spread)? Are the low scores concentrated in one particular topic or lab? Does attendance correlate with the 90%+ scores?"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
