'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { WarningAlt, Scale, DirectionStraight, CheckmarkFilled } from '@carbon/icons-react';
import { calcMean, calcMedian } from '@/lib/statistics';

export function OutlierTrapAndDecisionLab() {
  const [sliderVal, setSliderVal] = useState<number>(300);
  const baseArray = [10, 20, 20, 30];

  const currentDataset = [...baseArray, sliderVal];
  const currentMean = calcMean(currentDataset);
  const currentMedian = calcMedian(currentDataset);
  const gap = Math.abs(currentMean - currentMedian);

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
          <Tag type="red" size="md">
            Section 11, 12 & 13
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            The Outlier Trap & Center Decision Guide
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Bridge to Module 2.5 Outliers
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        The Outlier Trap: Dragging the Center of Gravity
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        In <strong>Module 2.5</strong>, we learned that extreme values contaminate datasets. Here you see their mathematical consequence: because the Mean incorporates every single number, an extreme value drags the Mean far away into the tail. The Median, by contrast, holds its ground.
      </p>

      {/* Interactive Drag Slider Playground */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Cohort: [10, 20, 20, 30, {sliderVal}]
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Button size="sm" kind={sliderVal === 30 ? 'primary' : 'secondary'} onClick={() => setSliderVal(30)}>
              Normal (30)
            </Button>
            <Button size="sm" kind={sliderVal === 300 ? 'primary' : 'secondary'} onClick={() => setSliderVal(300)}>
              Outlier (300)
            </Button>
            <Button size="sm" kind={sliderVal === 500 ? 'primary' : 'secondary'} onClick={() => setSliderVal(500)}>
              Extreme (500)
            </Button>
          </div>
        </div>

        {/* Observation Array Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {baseArray.map((v, i) => (
            <div
              key={i}
              style={{
                padding: '8px 16px',
                background: 'var(--ds-bg-core)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              {v}
            </div>
          ))}
          <motion.div
            animate={{ scale: sliderVal > 100 ? [1, 1.1, 1] : 1 }}
            style={{
              padding: '8px 16px',
              background: sliderVal > 50 ? 'rgba(218, 30, 40, 0.2)' : 'var(--ds-bg-core)',
              borderRadius: '4px',
              border: sliderVal > 50 ? '2px solid #da1e28' : '1px solid var(--ds-border-subtle)',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '1.125rem',
              fontWeight: 700,
              color: sliderVal > 50 ? '#da1e28' : 'var(--ds-text-primary)',
            }}
          >
            {sliderVal} {sliderVal > 50 && <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', verticalAlign: 'middle' }}>OUTLIER</span>}
          </motion.div>
        </div>

        {/* The Slider Control */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
            <span style={{ color: 'var(--ds-text-secondary)' }}>Drag the 5th Observation Value (from 30 to 500):</span>
            <strong style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>{sliderVal}</strong>
          </div>
          <input
            type="range"
            min={30}
            max={500}
            step={5}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#da1e28' }}
          />
        </div>

        {/* Live Gauges: Mean vs Median vs Gap */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '14px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              borderTop: '3px solid var(--ds-blue)',
            }}
          >
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Arithmetic Mean</div>
            <motion.div
              key={currentMean}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-blue)' }}
            >
              {currentMean.toFixed(1)}
            </motion.div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
              {sliderVal > 50 ? 'Heavily contaminated by outlier!' : 'Normal baseline'}
            </div>
          </div>

          <div
            style={{
              padding: '14px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              borderTop: '3px solid var(--ds-purple)',
            }}
          >
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Median (50th Percentile)</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
              {currentMedian.toFixed(1)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-emerald)', marginTop: '4px' }}>
              Completely unchanged at 20.0!
            </div>
          </div>

          <div
            style={{
              padding: '14px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              borderTop: '3px solid #da1e28',
            }}
          >
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Distortion Gap |Mean - Median|</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: '#da1e28' }}>
              {gap.toFixed(1)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
              Measure of distribution skewness
            </div>
          </div>
        </div>
      </div>

      {/* Decision Guide Grid */}
      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
          When Should I Use Which Center? A Practicing Engineer&apos;s Decision Guide
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
          <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-blue)' }}>
            <div style={{ fontWeight: 600, color: 'var(--ds-blue)', fontSize: '0.875rem', marginBottom: '4px' }}>
              Use Arithmetic Mean
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              Appropriate for <strong>approximately symmetric</strong> distributions without extreme outliers (e.g., student heights, standardized tests, sensor noise).
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-purple)' }}>
            <div style={{ fontWeight: 600, color: 'var(--ds-purple)', fontSize: '0.875rem', marginBottom: '4px' }}>
              Use Median
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              Appropriate for <strong>strongly skewed</strong> data or cohorts with <strong>extreme values</strong> (e.g., salaries, house prices, web request latency).
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', borderLeft: '3px solid var(--ds-emerald)' }}>
            <div style={{ fontWeight: 600, color: 'var(--ds-emerald)', fontSize: '0.875rem', marginBottom: '4px' }}>
              Use Mode
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              Mandatory for <strong>categorical variables</strong> (e.g., top purchased product, preferred payment gateway) or finding the peak density in multimodal curves.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
