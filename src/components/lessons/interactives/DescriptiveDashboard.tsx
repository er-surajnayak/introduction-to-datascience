'use client';

import React, { useState, useMemo } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  Dashboard,
  Restart,
  Information,
  Add,
  TrashCan,
  ChevronDown,
  ChevronUp,
} from '@carbon/icons-react';
import { computeAllStatistics } from '@/lib/statistics';

const INITIAL_DATASET = [72, 81, 65, 92, 78, 88, 54, 88, 78, 95];

interface StatCardDef {
  key: string;
  name: string;
  category: 'center' | 'spread' | 'position' | 'extremes';
  value: string | number;
  unit?: string;
  badge?: string;
  description: string;
  engineeringInterpretation: string;
}

export function DescriptiveDashboard() {
  const [dataPoints, setDataPoints] = useState<number[]>(INITIAL_DATASET);
  const [newValInput, setNewValInput] = useState<string>('');
  const [expandedCardKey, setExpandedCardKey] = useState<string | null>('mean');

  // Compute all statistics deterministically from current dataset state
  const stats = useMemo(() => {
    return computeAllStatistics(dataPoints);
  }, [dataPoints]);

  const addPoint = () => {
    const parsed = Number(newValInput);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 150) {
      setDataPoints((prev) => [...prev, parsed]);
      setNewValInput('');
    }
  };

  const removePoint = (idx: number) => {
    if (dataPoints.length > 2) {
      setDataPoints((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const resetData = () => {
    setDataPoints(INITIAL_DATASET);
  };

  const statCards: StatCardDef[] = [
    {
      key: 'count',
      name: 'Count (n)',
      category: 'extremes',
      value: stats.count,
      description: 'Total number of valid observations.',
      engineeringInterpretation: 'Determines sample size and degrees of freedom (n - 1) for sample variance.',
    },
    {
      key: 'mean',
      name: 'Arithmetic Mean (x̄)',
      category: 'center',
      value: stats.mean.toFixed(1),
      description: 'Sum of all observations divided by count: Σxᵢ / n.',
      engineeringInterpretation: 'The physical balancing point where positive and negative deviations strictly sum to 0.',
    },
    {
      key: 'median',
      name: 'Median (Q2 / 50th %)',
      category: 'center',
      value: stats.median.toFixed(1),
      description: 'The middle value after ordering the dataset.',
      engineeringInterpretation: 'Resistant to extreme outliers. Separates the upper 50% from the lower 50%.',
    },
    {
      key: 'mode',
      name: 'Mode',
      category: 'center',
      value: stats.mode.length > 0 ? stats.mode.join(', ') : 'None',
      badge: stats.mode.length > 1 ? 'Bimodal' : undefined,
      description: 'The most frequently occurring observation(s).',
      engineeringInterpretation: `Values ${stats.mode.join(' and ')} appear twice each, indicating bimodal clustering.`,
    },
    {
      key: 'min',
      name: 'Minimum',
      category: 'extremes',
      value: stats.min,
      description: 'The lowest observed score.',
      engineeringInterpretation: 'The baseline boundary mark in the cohort.',
    },
    {
      key: 'max',
      name: 'Maximum',
      category: 'extremes',
      value: stats.max,
      description: 'The highest observed score.',
      engineeringInterpretation: 'The ceiling mark in the cohort.',
    },
    {
      key: 'range',
      name: 'Range',
      category: 'spread',
      value: stats.range,
      description: 'Maximum minus Minimum.',
      engineeringInterpretation: 'Total span of the distribution. Highly sensitive to extreme boundary values.',
    },
    {
      key: 'sampleVariance',
      name: 'Sample Variance (s²)',
      category: 'spread',
      value: stats.sampleVariance.toFixed(1),
      unit: 'marks²',
      description: 'Mean of squared deviations divided by (n - 1).',
      engineeringInterpretation: 'Measures dispersion in squared units; Bessel’s correction prevents sample underestimation.',
    },
    {
      key: 'sampleStdDev',
      name: 'Sample Std. Dev. (s)',
      category: 'spread',
      value: stats.sampleStdDev.toFixed(1),
      unit: 'marks',
      description: 'Square root of sample variance: √(s²).',
      engineeringInterpretation: 'Typical scale of variation around the mean in original score marks.',
    },
    {
      key: 'popStdDev',
      name: 'Population Std. Dev. (σ)',
      category: 'spread',
      value: stats.populationStdDev.toFixed(1),
      unit: 'marks',
      description: 'Square root of population variance dividing by N.',
      engineeringInterpretation: 'Use only if this 10-student group is the entire universe of interest.',
    },
    {
      key: 'q1',
      name: 'First Quartile (Q1)',
      category: 'position',
      value: stats.q1.toFixed(1),
      description: '25th percentile of sorted observations.',
      engineeringInterpretation: 'Approximately 25% of students scored at or below this value.',
    },
    {
      key: 'q3',
      name: 'Third Quartile (Q3)',
      category: 'position',
      value: stats.q3.toFixed(1),
      description: '75th percentile of sorted observations.',
      engineeringInterpretation: 'Approximately 75% of students scored at or below this value.',
    },
    {
      key: 'iqr',
      name: 'Interquartile Range (IQR)',
      category: 'spread',
      value: stats.iqr.toFixed(1),
      description: 'Distance between Q3 and Q1: Q3 - Q1.',
      engineeringInterpretation: 'The spread of the middle 50% of students. Powers the 1.5×IQR outlier detection rule.',
    },
  ];

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
            Section 24
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Comprehensive Statistics Engine
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          100% Programmatic Calculations
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
          The Descriptive Statistics Dashboard
        </h3>
        <Button size="sm" kind="ghost" renderIcon={Restart} onClick={resetData}>
          Reset Dataset
        </Button>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Benchmark Cohort: <code>[72, 81, 65, 92, 78, 88, 54, 88, 78, 95]</code>. Every single value is dynamically computed in real-time. Click any card to expand the <strong>&ldquo;What Does This Mean?&rdquo;</strong> diagnostic engineering breakdown.
      </p>

      {/* Interactive Dataset Chips & Quick Adder */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Active Dataset ({dataPoints.length} values) &bull; Sorted: [{stats.sorted.join(', ')}]
          </span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <input
              type="number"
              placeholder="Add mark..."
              value={newValInput}
              onChange={(e) => setNewValInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPoint()}
              style={{
                width: '100px',
                padding: '4px 8px',
                fontSize: '0.75rem',
                fontFamily: 'var(--ds-font-mono)',
                background: 'var(--ds-bg-core)',
                border: '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                borderRadius: '3px',
              }}
            />
            <Button size="sm" kind="primary" renderIcon={Add} hasIconOnly iconDescription="Add point" onClick={addPoint} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {dataPoints.map((val, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px',
                background: 'var(--ds-bg-core)',
                border: '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 600,
              }}
            >
              <span>{val}</span>
              {dataPoints.length > 2 && (
                <button
                  onClick={() => removePoint(idx)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--ds-text-muted)',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Remove point"
                >
                  <TrashCan size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Statistical Indicator Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '12px',
          marginBottom: '1.5rem',
        }}
      >
        {statCards.map((card) => {
          const isExpanded = expandedCardKey === card.key;
          const borderColors = {
            center: 'var(--ds-blue)',
            spread: 'var(--ds-amber)',
            position: 'var(--ds-purple)',
            extremes: 'var(--ds-teal)',
          };

          return (
            <div
              key={card.key}
              onClick={() => setExpandedCardKey(isExpanded ? null : card.key)}
              style={{
                padding: '14px',
                background: isExpanded ? 'var(--ds-bg-surface-elevated)' : 'var(--ds-bg-core)',
                border: isExpanded ? `1px solid ${borderColors[card.category]}` : '1px solid var(--ds-border-subtle)',
                borderTop: `3px solid ${borderColors[card.category]}`,
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>{card.name}</span>
                {card.badge && <Tag type="teal" size="sm">{card.badge}</Tag>}
              </div>

              <div style={{ fontSize: '1.65rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
                {card.value} {card.unit && <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', fontWeight: 400 }}>{card.unit}</span>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.6875rem', color: 'var(--ds-cyan)', marginTop: '6px' }}>
                <span>What does this mean?</span>
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>

              {isExpanded && (
                <div
                  style={{
                    marginTop: '10px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--ds-border-subtle)',
                    fontSize: '0.75rem',
                    color: 'var(--ds-text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  <p style={{ margin: '0 0 6px 0' }}>{card.description}</p>
                  <p style={{ margin: 0, color: 'var(--ds-cyan)', fontWeight: 500 }}>
                    <strong>Interpretation:</strong> {card.engineeringInterpretation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
