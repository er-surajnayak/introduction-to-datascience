'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button, InlineNotification } from '@carbon/react';
import {
  Search,
  Filter,
  CheckmarkFilled,
  Information,
  View,
  DataCategorical,
  Scale,
} from '@carbon/icons-react';
import { calcMean, calcMedian, calcMin, calcMax, calcSampleStdDev } from '@/lib/statistics';

// Benchmark 100 students dataset (synthesized realistic exam marks)
const RAW_STUDENT_MARKS = [
  72, 81, 65, 92, 78, 88, 54, 88, 78, 95,
  68, 74, 83, 79, 61, 87, 76, 82, 90, 71,
  58, 85, 77, 80, 69, 93, 75, 84, 62, 86,
  70, 79, 81, 66, 89, 73, 59, 91, 77, 83,
  74, 82, 68, 87, 76, 64, 85, 78, 94, 71,
  63, 80, 88, 72, 86, 75, 67, 90, 79, 84,
  55, 82, 78, 73, 89, 69, 81, 77, 92, 65,
  87, 74, 60, 83, 76, 85, 70, 96, 79, 68,
  84, 71, 66, 88, 77, 82, 57, 93, 75, 80,
  73, 86, 64, 89, 78, 81, 72, 97, 67, 85,
];

export function DataDetectiveHeroLab() {
  const [viewMode, setViewMode] = useState<'raw' | 'compressed'>('raw');
  const [highlightRange, setHighlightRange] = useState<'all' | 'fail' | 'firstClass' | 'distinction'>('all');

  const count = RAW_STUDENT_MARKS.length;
  const mean = calcMean(RAW_STUDENT_MARKS);
  const median = calcMedian(RAW_STUDENT_MARKS);
  const min = calcMin(RAW_STUDENT_MARKS);
  const max = calcMax(RAW_STUDENT_MARKS);
  const std = calcSampleStdDev(RAW_STUDENT_MARKS);

  const filterCondition = (score: number) => {
    if (highlightRange === 'fail') return score < 60;
    if (highlightRange === 'firstClass') return score >= 60 && score < 85;
    if (highlightRange === 'distinction') return score >= 85;
    return true;
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
          <Tag type="cyan" size="md">
            Section 01 & 02
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            The Data Detective Laboratory
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Compressing 100 Observations
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Can You Understand 100 Numbers by Just Looking at Them?
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Imagine an engineering professor dumps the final test marks of 100 students onto your desk. As raw numbers, it is nearly impossible for the human brain to detect trends or make decisions. Switch to the <strong>Detective Summary</strong> to see how 6 descriptive figures instantly decode the entire class.
      </p>

      {/* Control Switcher Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            size="sm"
            kind={viewMode === 'raw' ? 'primary' : 'secondary'}
            renderIcon={View}
            onClick={() => setViewMode('raw')}
          >
            Raw Data Matrix (100 Numbers)
          </Button>
          <Button
            size="sm"
            kind={viewMode === 'compressed' ? 'primary' : 'secondary'}
            renderIcon={Search}
            onClick={() => setViewMode('compressed')}
          >
            Detective Compressed Profile
          </Button>
        </div>

        {viewMode === 'raw' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Highlight:</span>
            <Button
              size="sm"
              kind={highlightRange === 'all' ? 'tertiary' : 'ghost'}
              onClick={() => setHighlightRange('all')}
            >
              All
            </Button>
            <Button
              size="sm"
              kind={highlightRange === 'distinction' ? 'tertiary' : 'ghost'}
              onClick={() => setHighlightRange('distinction')}
            >
              ≥ 85 (Distinction)
            </Button>
            <Button
              size="sm"
              kind={highlightRange === 'fail' ? 'tertiary' : 'ghost'}
              onClick={() => setHighlightRange('fail')}
            >
              &lt; 60 (At Risk)
            </Button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {viewMode === 'raw' ? (
          <motion.div
            key="raw-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                Unordered Raw Array [100 elements]
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
                Notice the cognitive overload: What is typical? How spread out?
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
                gap: '6px',
                padding: '1rem',
                background: 'var(--ds-bg-core)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
                maxHeight: '260px',
                overflowY: 'auto',
              }}
            >
              {RAW_STUDENT_MARKS.map((mark, idx) => {
                const isMatch = filterCondition(mark);
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 4px',
                      textAlign: 'center',
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      borderRadius: '3px',
                      background: isMatch
                        ? mark >= 85
                          ? 'var(--ds-emerald-dim)'
                          : mark < 60
                          ? 'rgba(218, 30, 40, 0.15)'
                          : 'var(--ds-bg-surface-elevated)'
                        : 'var(--ds-bg-surface)',
                      color: isMatch
                        ? mark >= 85
                          ? 'var(--ds-emerald)'
                          : mark < 60
                          ? '#da1e28'
                          : 'var(--ds-text-primary)'
                        : 'var(--ds-text-muted)',
                      border: isMatch
                        ? mark >= 85
                          ? '1px solid var(--ds-emerald)'
                          : mark < 60
                          ? '1px solid #da1e28'
                          : '1px solid var(--ds-border-strong)'
                        : '1px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                    title={`Student ${idx + 1}: ${mark} Marks`}
                  >
                    {mark}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="compressed-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                The Detective's 6-Metric Statistical Fingerprint
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  padding: '16px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  borderTop: '3px solid var(--ds-cyan)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>Count (N)</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
                  {count}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                  Total observations
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  borderTop: '3px solid var(--ds-blue)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>Mean (x̄)</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-blue)' }}>
                  {mean.toFixed(1)}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                  Arithmetic balancing point
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  borderTop: '3px solid var(--ds-purple)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>Median (Q2)</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
                  {median.toFixed(1)}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                  50th percentile rank
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  borderTop: '3px solid var(--ds-teal)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>Min / Max</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-teal)' }}>
                  {min} / {max}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                  Range: {max - min} marks
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  borderTop: '3px solid var(--ds-amber)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>Std. Dev. (s)</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-amber)' }}>
                  {std.toFixed(1)}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                  Typical spread in marks
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Detective Mental Model Strip */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderLeft: '4px solid var(--ds-cyan)',
          borderRadius: '0 4px 4px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <DataCategorical size={18} style={{ color: 'var(--ds-cyan)' }} />
          <span style={{ fontWeight: 600, color: 'var(--ds-text-primary)', fontSize: '0.9375rem' }}>
            What Does &ldquo;Descriptive&rdquo; Mean?
          </span>
        </div>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          Descriptive statistics answer 5 diagnostic questions:
          <strong> 1. How many observations?</strong> (Count: 100) &bull;
          <strong> 2. What is typical?</strong> (Mean: 77.2, Median: 78.0) &bull;
          <strong> 3. How spread out are they?</strong> (Std Dev: 10.1) &bull;
          <strong> 4. What are the extremes?</strong> (Min: 54, Max: 97) &bull;
          <strong> 5. Where do observations fall?</strong> (Percentiles).
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid var(--ds-border-subtle)',
            fontSize: '0.75rem',
            color: 'var(--ds-amber)',
          }}
        >
          <Information size={14} />
          <span>
            <strong>Vital Distinction:</strong> Description is NOT Causation. Descriptive statistics describe what has been observed in the dataset. They do not automatically explain why it happened or prove cause-and-effect.
          </span>
        </div>
      </div>
    </div>
  );
}
