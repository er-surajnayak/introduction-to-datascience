'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Calculator, CheckmarkFilled, WarningAlt } from '@carbon/icons-react';

export function IqrRuleVisualizer() {
  const [q1, setQ1] = useState<number>(20);
  const [q3, setQ3] = useState<number>(40);
  const [testValue, setTestValue] = useState<number>(85);

  // Calculations
  const validQ3 = Math.max(q1 + 1, q3);
  const iqr = validQ3 - q1;
  const stepFactor = 1.5 * iqr;
  const lowerFence = q1 - stepFactor;
  const upperFence = validQ3 + stepFactor;

  const isLowOutlier = testValue < lowerFence;
  const isHighOutlier = testValue > upperFence;
  const isOutlier = isLowOutlier || isHighOutlier;

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Interactive Lab 2.5.4
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            1.5 × IQR Tukey Fence Calculator
          </span>
        </div>
        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Fences: [{lowerFence.toFixed(1)}, {upperFence.toFixed(1)}]
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Step-by-Step IQR Outlier Rule Visualizer
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Adjust the First Quartile (Q1) and Third Quartile (Q3) below. Observe how the 1.5 × IQR multiplier
        creates mathematical fences to test any arbitrary data point.
      </p>

      {/* Input Controls Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '1rem', background: 'var(--cds-layer-02)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <label style={{ fontSize: '0.8125rem', color: 'var(--ds-cyan)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
            First Quartile (Q1 / 25th %): {q1}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={q1}
            onChange={(e) => setQ1(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--ds-cyan)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        <div style={{ padding: '1rem', background: 'var(--cds-layer-02)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <label style={{ fontSize: '0.8125rem', color: 'var(--ds-cyan)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
            Third Quartile (Q3 / 75th %): {validQ3}
          </label>
          <input
            type="range"
            min={q1 + 1}
            max="150"
            value={validQ3}
            onChange={(e) => setQ3(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--ds-cyan)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
            <span>{q1 + 1}</span>
            <span>75</span>
            <span>150</span>
          </div>
        </div>

        <div style={{ padding: '1rem', background: 'var(--cds-layer-02)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
          <label style={{ fontSize: '0.8125rem', color: 'var(--ds-amber)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
            Test Observation (x): {testValue}
          </label>
          <input
            type="range"
            min="-50"
            max="150"
            value={testValue}
            onChange={(e) => setTestValue(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--ds-amber)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
            <span>-50</span>
            <span>50</span>
            <span>150</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Derivation Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '10px 14px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>Step 1: Interquartile Range</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            IQR = Q3 - Q1
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', fontFamily: 'var(--ds-font-mono)' }}>
            {validQ3} - {q1} = <strong>{iqr}</strong>
          </div>
        </div>

        <div style={{ padding: '10px 14px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>Step 2: Buffer Multiplier</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            1.5 × IQR
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', fontFamily: 'var(--ds-font-mono)' }}>
            1.5 × {iqr} = <strong>{stepFactor.toFixed(1)}</strong>
          </div>
        </div>

        <div style={{ padding: '10px 14px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>Step 3: Lower Fence</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ds-purple)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            Q1 - (1.5 × IQR)
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', fontFamily: 'var(--ds-font-mono)' }}>
            {q1} - {stepFactor.toFixed(1)} = <strong>{lowerFence.toFixed(1)}</strong>
          </div>
        </div>

        <div style={{ padding: '10px 14px', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>Step 4: Upper Fence</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ds-purple)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            Q3 + (1.5 × IQR)
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', fontFamily: 'var(--ds-font-mono)' }}>
            {validQ3} + {stepFactor.toFixed(1)} = <strong>{upperFence.toFixed(1)}</strong>
          </div>
        </div>
      </div>

      {/* Observation Test Result Card */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: isOutlier ? 'rgba(255, 131, 43, 0.12)' : 'rgba(36, 161, 72, 0.12)',
          borderLeft: `4px solid ${isOutlier ? 'var(--ds-amber)' : 'var(--ds-emerald)'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
              Evaluating x = {testValue}
            </span>
            <Tag type={isOutlier ? 'red' : 'green'} size="md">
              {isOutlier ? (isHighOutlier ? 'High Outlier Flagged' : 'Low Outlier Flagged') : 'In-Distribution Normal'}
            </Tag>
          </div>
          <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)' }}>
            Safe Zone: [{lowerFence.toFixed(1)}, {upperFence.toFixed(1)}]
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, margin: 0 }}>
          {isHighOutlier && `Value ${testValue} > Upper Fence (${upperFence.toFixed(1)}). It sits in the extreme upper tail.`}
          {isLowOutlier && `Value ${testValue} < Lower Fence (${lowerFence.toFixed(1)}). It sits in the extreme lower tail.`}
          {!isOutlier && `Value ${testValue} resides safely between Lower Fence (${lowerFence.toFixed(1)}) and Upper Fence (${upperFence.toFixed(1)}).`}
        </p>
      </div>
    </div>
  );
}
