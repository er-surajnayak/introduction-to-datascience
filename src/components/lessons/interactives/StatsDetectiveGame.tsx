'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Search, CheckmarkFilled, CloseFilled, View, Restart } from '@carbon/icons-react';
import { computeAllStatistics } from '@/lib/statistics';

export function StatsDetectiveGame() {
  const datasetA = [48, 49, 50, 51, 52];
  const datasetB = [10, 30, 50, 70, 90];
  const datasetC = [10, 20, 20, 30, 300];

  const statsA = computeAllStatistics(datasetA);
  const statsB = computeAllStatistics(datasetB);
  const statsC = computeAllStatistics(datasetC);

  // Student predictions
  const [q1Answer, setQ1Answer] = useState<string | null>(null); // Which is most consistent? (A)
  const [q2Answer, setQ2Answer] = useState<string | null>(null); // Which has an extreme value? (C)
  const [q3Answer, setQ3Answer] = useState<string | null>(null); // Which has largest spread? (C or B, by range/SD C)
  const [q4Answer, setQ4Answer] = useState<string | null>(null); // Where is mean misleading? (C)

  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const resetGame = () => {
    setQ1Answer(null);
    setQ2Answer(null);
    setQ3Answer(null);
    setQ4Answer(null);
    setIsRevealed(false);
  };

  const allAnswered = q1Answer && q2Answer && q3Answer && q4Answer;

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
          <Tag type="green" size="md">
            Section 27
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Detective Challenge
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Predict Before Calculating
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        The Statistics Detective: Predict the Hidden Clues
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Inspect these three datasets with your naked eye. Make your predictions <em>before</em> running any calculations, then reveal the statistical fingerprint to verify your intuition.
      </p>

      {/* 3 Datasets Preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-emerald)', marginBottom: '6px' }}>Dataset A</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', color: 'var(--ds-text-primary)' }}>
            [48, 49, 50, 51, 52]
          </div>
        </div>

        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-blue)', marginBottom: '6px' }}>Dataset B</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', color: 'var(--ds-text-primary)' }}>
            [10, 30, 50, 70, 90]
          </div>
        </div>

        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontWeight: 600, color: '#da1e28', marginBottom: '6px' }}>Dataset C</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', color: 'var(--ds-text-primary)' }}>
            [10, 20, 20, 30, 300]
          </div>
        </div>
      </div>

      {/* 4 Prediction Questions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Q1 */}
        <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            1. Which dataset is the most consistent (tightest clustering)?
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['A', 'B', 'C'].map((opt) => (
              <Button
                key={opt}
                size="sm"
                kind={q1Answer === opt ? 'primary' : 'secondary'}
                disabled={isRevealed}
                onClick={() => setQ1Answer(opt)}
              >
                Dataset {opt}
              </Button>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            2. Which dataset has a blatant extreme value (outlier)?
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['A', 'B', 'C'].map((opt) => (
              <Button
                key={opt}
                size="sm"
                kind={q2Answer === opt ? 'primary' : 'secondary'}
                disabled={isRevealed}
                onClick={() => setQ2Answer(opt)}
              >
                Dataset {opt}
              </Button>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            3. Which dataset has the largest overall spread (range and SD)?
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['A', 'B', 'C'].map((opt) => (
              <Button
                key={opt}
                size="sm"
                kind={q3Answer === opt ? 'primary' : 'secondary'}
                disabled={isRevealed}
                onClick={() => setQ3Answer(opt)}
              >
                Dataset {opt}
              </Button>
            ))}
          </div>
        </div>

        {/* Q4 */}
        <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            4. In which dataset is the Mean most misleading?
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['A', 'B', 'C'].map((opt) => (
              <Button
                key={opt}
                size="sm"
                kind={q4Answer === opt ? 'primary' : 'secondary'}
                disabled={isRevealed}
                onClick={() => setQ4Answer(opt)}
              >
                Dataset {opt}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Reveal Action Bar */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Button
          size="md"
          kind="primary"
          renderIcon={View}
          disabled={!allAnswered || isRevealed}
          onClick={() => setIsRevealed(true)}
        >
          {isRevealed ? 'Statistics Revealed' : 'Reveal Statistical Fingerprints'}
        </Button>
        {isRevealed && (
          <Button size="md" kind="ghost" renderIcon={Restart} onClick={resetGame}>
            Reset Predictions
          </Button>
        )}
      </div>

      {/* Revealed Statistics Comparison Table */}
      {isRevealed && (
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
            overflowX: 'auto',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '12px' }}>
            Diagnostic Verification Matrix
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ds-border-strong)', color: 'var(--ds-text-muted)' }}>
                <th style={{ padding: '8px' }}>Metric</th>
                <th style={{ padding: '8px', color: 'var(--ds-emerald)' }}>Dataset A</th>
                <th style={{ padding: '8px', color: 'var(--ds-blue)' }}>Dataset B</th>
                <th style={{ padding: '8px', color: '#da1e28' }}>Dataset C</th>
                <th style={{ padding: '8px' }}>Detective Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', fontWeight: 600 }}>Mean</td>
                <td style={{ padding: '8px' }}>{statsA.mean.toFixed(1)}</td>
                <td style={{ padding: '8px' }}>{statsB.mean.toFixed(1)}</td>
                <td style={{ padding: '8px', color: '#da1e28', fontWeight: 700 }}>{statsC.mean.toFixed(1)}</td>
                <td style={{ padding: '8px', color: 'var(--ds-text-secondary)' }}>C is dragged to 76.0 by 300!</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', fontWeight: 600 }}>Median</td>
                <td style={{ padding: '8px' }}>{statsA.median.toFixed(1)}</td>
                <td style={{ padding: '8px' }}>{statsB.median.toFixed(1)}</td>
                <td style={{ padding: '8px', color: 'var(--ds-emerald)', fontWeight: 700 }}>{statsC.median.toFixed(1)}</td>
                <td style={{ padding: '8px', color: 'var(--ds-text-secondary)' }}>Median in C stays 20.0</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', fontWeight: 600 }}>Std Dev (s)</td>
                <td style={{ padding: '8px', color: 'var(--ds-emerald)', fontWeight: 700 }}>{statsA.sampleStdDev.toFixed(1)}</td>
                <td style={{ padding: '8px' }}>{statsB.sampleStdDev.toFixed(1)}</td>
                <td style={{ padding: '8px', color: '#da1e28', fontWeight: 700 }}>{statsC.sampleStdDev.toFixed(1)}</td>
                <td style={{ padding: '8px', color: 'var(--ds-text-secondary)' }}>A is tightest (1.6); C is volatile (125.4)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', fontWeight: 600 }}>Range</td>
                <td style={{ padding: '8px', color: 'var(--ds-emerald)' }}>{statsA.range}</td>
                <td style={{ padding: '8px' }}>{statsB.range}</td>
                <td style={{ padding: '8px', color: '#da1e28' }}>{statsC.range}</td>
                <td style={{ padding: '8px', color: 'var(--ds-text-secondary)' }}>C span is massive (290)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
