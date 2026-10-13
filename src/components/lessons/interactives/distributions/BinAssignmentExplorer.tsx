'use client';

import React, { useState } from 'react';
import { Tag, Button, TextInput } from '@carbon/react';
import {
  Add,
  Events,
  CheckmarkFilled,
  Restart,
  Information,
} from '@carbon/icons-react';

interface GroupedInterval {
  id: string;
  label: string;
  low: number;
  high: number;
  isMaxBin?: boolean;
  baseCount: number;
  color: string;
}

const INTERVALS: GroupedInterval[] = [
  { id: 'b1', label: '0 – 19', low: 0, high: 20, baseCount: 2, color: 'var(--ds-cyan)' },
  { id: 'b2', label: '20 – 39', low: 20, high: 40, baseCount: 5, color: 'var(--ds-blue)' },
  { id: 'b3', label: '40 – 59', low: 40, high: 60, baseCount: 12, color: 'var(--ds-purple)' },
  { id: 'b4', label: '60 – 79', low: 60, high: 80, baseCount: 23, color: 'var(--ds-teal)' },
  { id: 'b5', label: '80 – 100', low: 80, high: 100, isMaxBin: true, baseCount: 18, color: 'var(--ds-emerald)' },
];

export function BinAssignmentExplorer() {
  const [testScore, setTestScore] = useState<string>('60');
  const [testedValue, setTestedValue] = useState<number | null>(60);
  const [customAdded, setCustomAdded] = useState<number[]>([]);

  const getAssignedBin = (val: number): GroupedInterval | null => {
    if (val < 0 || val > 100 || isNaN(val)) return null;
    for (let i = 0; i < INTERVALS.length; i++) {
      const b = INTERVALS[i];
      if (b.isMaxBin) {
        if (val >= b.low && val <= b.high) return b;
      } else {
        if (val >= b.low && val < b.high) return b;
      }
    }
    return null;
  };

  const handleTestScore = () => {
    const parsed = parseFloat(testScore.trim());
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      setTestedValue(parsed);
      setCustomAdded((prev) => [...prev, parsed]);
    }
  };

  const handleReset = () => {
    setCustomAdded([]);
    setTestScore('60');
    setTestedValue(60);
  };

  const activeBin = testedValue !== null ? getAssignedBin(testedValue) : null;

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
      {/* Header Badge & Title */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Section 3.2.4
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Grouped Frequency Distribution
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Unambiguous Intervals: [Low, High)
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--ds-text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        Bin Assignment Explorer: Grouping Continuous Observations
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        When a university has 1,000 students, counting every single distinct mark creates a giant, unreadable table. Grouping observations into <strong>class intervals (bins)</strong> reveals overall structure. Test a score below to watch how mathematical boundary rules guarantee it lands in <em>exactly one bin</em> without ambiguity.
      </p>

      {/* Test Input Controller */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexGrow: 1, maxWidth: '320px' }}>
          <TextInput
            id="bin-test-input"
            labelText=""
            hideLabel
            placeholder="Score (0 to 100)"
            value={testScore}
            onChange={(e) => setTestScore(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTestScore();
            }}
            size="sm"
          />
          <Button size="sm" renderIcon={Add} onClick={handleTestScore}>
            Assign to Bin
          </Button>
        </div>

        <Button size="sm" kind="secondary" renderIcon={Restart} onClick={handleReset}>
          Reset Added Scores
        </Button>
      </div>

      {/* Boundary Rule Focus Box */}
      {testedValue !== null && activeBin && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '1.5rem',
            background: 'var(--cds-layer-02)',
            borderRadius: '4px',
            borderLeft: `4px solid ${activeBin.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)' }}>
            Score <strong>{testedValue}</strong> is assigned to bin <strong>{activeBin.label}</strong> because{' '}
            <span style={{ fontFamily: 'var(--ds-font-mono)', color: activeBin.color }}>
              {activeBin.isMaxBin
                ? `${activeBin.low} ≤ ${testedValue} ≤ ${activeBin.high}`
                : `${activeBin.low} ≤ ${testedValue} < ${activeBin.high}`}
            </span>
            .
          </div>
          <Tag type="green" size="sm">
            Assigned!
          </Tag>
        </div>
      )}

      {/* Interactive Bin Buckets Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '12px',
          marginBottom: '1.5rem',
        }}
      >
        {INTERVALS.map((bin) => {
          const isTargeted = activeBin?.id === bin.id;
          const additionalCount = customAdded.filter((v) => {
            const assigned = getAssignedBin(v);
            return assigned?.id === bin.id;
          }).length;
          const currentTotal = bin.baseCount + additionalCount;

          return (
            <div
              key={bin.id}
              style={{
                padding: '16px',
                background: isTargeted ? 'var(--ds-bg-surface-elevated)' : 'var(--ds-bg-core)',
                borderRadius: '4px',
                border: isTargeted ? `2px solid ${bin.color}` : '1px solid var(--ds-border-strong)',
                boxShadow: isTargeted ? `0 0 16px ${bin.color}33` : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--ds-font-mono)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: bin.color,
                  }}
                >
                  {bin.label}
                </span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>
                  w = 20
                </span>
              </div>

              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
                {currentTotal}
                <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', fontWeight: 400, marginLeft: '4px' }}>
                  students
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
                Convention: {bin.isMaxBin ? `[${bin.low}, ${bin.high}]` : `[${bin.low}, ${bin.high})`}
              </div>

              {/* Progress fill */}
              <div
                style={{
                  height: '8px',
                  background: 'var(--cds-layer-02)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, (currentTotal / 30) * 100)}%`,
                    background: bin.color,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory Callout */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px', fontSize: '0.9375rem' }}>
          Boundary Ambiguity: What happens to border scores like 60?
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          Without a mathematical boundary rule, a student scoring exactly <strong>60 marks</strong> could be double-counted in both 40–60 and 60–80. In data science, standard binning uses the <strong>left-closed, right-open convention [a, b)</strong>. This means 60 belongs strictly to the interval <strong>[60, 80)</strong>, ensuring that every observation is counted exactly once and the sum of frequencies equals the total cohort size!
        </p>
      </div>
    </div>
  );
}
