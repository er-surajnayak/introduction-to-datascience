'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { Restart, UserMultiple, Analytics } from '@carbon/icons-react';
import { calcMean, calcPopulationStdDev, calcSampleStdDev } from '@/lib/statistics';

// Fixed simulated population parameters
const POPULATION_SIZE = 10000;
const POPULATION_TRUE_MEAN = 74.5;
const POPULATION_TRUE_STD = 12.0;

// Grid representation: 200 dots representing the 10,000 students (1 dot = 50 students)
const POPULATION_DOTS_COUNT = 200;

export function PopulationVsSampleLab() {
  const [sampleSize, setSampleSize] = useState<number>(50);
  const [sampleIndices, setSampleIndices] = useState<number[]>([12, 45, 78, 110, 142, 175, 23, 89]);
  const [sampleDrawCount, setSampleDrawCount] = useState<number>(1);

  // Generate deterministic simulated values for sample
  const sampleValues = useMemo(() => {
    // Generate pseudo-random sample marks around true mean with slight natural sampling variation
    const baseSeed = sampleDrawCount * 17 + sampleSize;
    const values: number[] = [];
    for (let i = 0; i < sampleSize; i++) {
      // Box-Muller approx or deterministic pseudo-variation
      const jitter = Math.sin(baseSeed + i * 3.7) * POPULATION_TRUE_STD * 0.95 +
                     Math.cos(baseSeed + i * 1.3) * (POPULATION_TRUE_STD * 0.35);
      const val = Math.min(100, Math.max(35, Math.round(POPULATION_TRUE_MEAN + jitter)));
      values.push(val);
    }
    return values;
  }, [sampleSize, sampleDrawCount]);

  const sampleMean = calcMean(sampleValues);
  const sampleStd = calcSampleStdDev(sampleValues);

  const drawNewSample = (size: number) => {
    setSampleSize(size);
    setSampleDrawCount((prev) => prev + 1);

    // Pick visual dots to highlight
    const dotCountToSelect = Math.min(POPULATION_DOTS_COUNT, Math.max(5, Math.round((size / POPULATION_SIZE) * POPULATION_DOTS_COUNT * 20)));
    const picked = new Set<number>();
    while (picked.size < Math.min(dotCountToSelect, 60)) {
      picked.add(Math.floor(Math.random() * POPULATION_DOTS_COUNT));
    }
    setSampleIndices(Array.from(picked));
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
          <Tag type="purple" size="md">
            Section 03
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Core Distinction
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Greek (μ, σ) vs. Latin (x̄, s)
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Population vs. Sample: The Entire College vs. Your Test Group
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        If a college has <strong>10,000 students</strong>, collecting every single student&apos;s score constitutes the <strong>Population</strong>. If we randomly sample <strong>500 students</strong> to make inferences, that subset is our <strong>Sample</strong>. Notice how the mathematical notation strictly changes between the two.
      </p>

      {/* Comparison Grid Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Population Card */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            borderTop: '3px solid var(--ds-purple)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontWeight: 600, color: 'var(--ds-purple)', fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserMultiple size={16} /> POPULATION (Entire Universe)
            </span>
            <Tag type="purple" size="sm">Parameters</Tag>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: '0 0 12px 0' }}>
            Every individual in the cohort. True values are fixed parameters, denoted by Greek letters.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontFamily: 'var(--ds-font-mono)' }}>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Size (N)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>10,000</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Mean (μ)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-purple)' }}>{POPULATION_TRUE_MEAN.toFixed(1)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Std. Dev. (σ)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-purple)' }}>{POPULATION_TRUE_STD.toFixed(1)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Variance (σ²)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-purple)' }}>{(POPULATION_TRUE_STD ** 2).toFixed(1)}</div>
            </div>
          </div>
        </div>

        {/* Sample Card */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            borderTop: '3px solid var(--ds-cyan)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontWeight: 600, color: 'var(--ds-cyan)', fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Analytics size={16} /> SAMPLE (Observed Subset)
            </span>
            <Tag type="cyan" size="sm">Statistics</Tag>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: '0 0 12px 0' }}>
            Randomly selected subset. Values are sample statistics, denoted by Latin letters.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontFamily: 'var(--ds-font-mono)' }}>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Sample Size (n)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>{sampleSize}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Mean (x̄)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>{sampleMean.toFixed(1)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Std. Dev. (s)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>{sampleStd.toFixed(1)}</div>
            </div>
            <div style={{ padding: '8px', background: 'var(--ds-bg-core)', borderRadius: '3px' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Variance (s²)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>{(sampleStd ** 2).toFixed(1)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Dot Population Grid with Sample Highlighting */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Population Dot Map (200 Units = 10,000 Students) &bull; Cyan Dots = Sampled
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              kind={sampleSize === 20 ? 'primary' : 'secondary'}
              onClick={() => drawNewSample(20)}
            >
              Draw n = 20
            </Button>
            <Button
              size="sm"
              kind={sampleSize === 50 ? 'primary' : 'secondary'}
              onClick={() => drawNewSample(50)}
            >
              Draw n = 50
            </Button>
            <Button
              size="sm"
              kind={sampleSize === 200 ? 'primary' : 'secondary'}
              onClick={() => drawNewSample(200)}
            >
              Draw n = 200
            </Button>
            <Button
              size="sm"
              kind="ghost"
              renderIcon={Restart}
              onClick={() => drawNewSample(sampleSize)}
            >
              Re-Sample
            </Button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(12px, 1fr))',
            gap: '4px',
            padding: '10px',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          {Array.from({ length: POPULATION_DOTS_COUNT }).map((_, i) => {
            const isSampled = sampleIndices.includes(i);
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isSampled ? [1, 1.4, 1.2] : 1,
                  backgroundColor: isSampled ? '#33b1ff' : 'rgba(255, 255, 255, 0.15)',
                }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  margin: 'auto',
                }}
                title={isSampled ? `Sampled cohort unit ${i + 1}` : `Population member ${i + 1}`}
              />
            );
          })}
        </div>

        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
          <span>Population Mean μ = <strong>74.5</strong></span>
          <span>Current Sample Mean x̄ = <strong style={{ color: 'var(--ds-cyan)' }}>{sampleMean.toFixed(1)}</strong></span>
          <span>Sampling Error |x̄ - μ| = <strong>{Math.abs(sampleMean - POPULATION_TRUE_MEAN).toFixed(1)}</strong></span>
        </div>
      </div>

      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-purple)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Key Takeaway:</strong> We rarely possess the complete population in modern data engineering. We calculate sample statistics (<strong>x̄</strong>, <strong>s</strong>) to estimate the true underlying population parameters (<strong>μ</strong>, <strong>σ</strong>).
      </div>
    </div>
  );
}
