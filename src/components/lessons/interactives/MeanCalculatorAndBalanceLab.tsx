'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { Scale, Calculator, Restart, Information } from '@carbon/icons-react';
import { calcMean, calcDeviations } from '@/lib/statistics';

export function MeanCalculatorAndBalanceLab() {
  const [activeTab, setActiveTab] = useState<'calc' | 'balance'>('calc');

  // Calculator inputs
  const [val1, setVal1] = useState<number>(70);
  const [val2, setVal2] = useState<number>(80);
  const [val3, setVal3] = useState<number>(90);

  // Seesaw balance values
  const [balancePoints, setBalancePoints] = useState<number[]>([60, 80, 100]);

  // Calculations for calculator tab
  const calcValues = [val1, val2, val3];
  const calcSum = val1 + val2 + val3;
  const calcMeanVal = calcSum / 3;

  // Calculations for balance tab
  const balanceMean = calcMean(balancePoints);
  const deviations = calcDeviations(balancePoints);
  const deviationSum = deviations.reduce((acc, d) => acc + d.deviation, 0);

  const updateBalancePoint = (idx: number, newVal: number) => {
    setBalancePoints((prev) => {
      const copy = [...prev];
      copy[idx] = Math.min(120, Math.max(20, newVal));
      return copy;
    });
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
          <Tag type="blue" size="md">
            Section 05, 06 & 07
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Central Tendency & The Mean
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Sum / Count &bull; Fulcrum Balancing Point
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Central Tendency: The Arithmetic Mean as a Physical Balance Point
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Central tendency answers: <em>&ldquo;What is a typical or central value of this dataset?&rdquo;</em> The three core pillars are the <strong>Mean</strong>, <strong>Median</strong>, and <strong>Mode</strong>. Rather than memorizing the arithmetic formula x̄ = Σxᵢ / n, explore the physical intuition: <strong>the mean is the exact fulcrum balance point where all positive and negative deviations cancel to zero.</strong>
      </p>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <Button
          size="sm"
          kind={activeTab === 'calc' ? 'primary' : 'secondary'}
          renderIcon={Calculator}
          onClick={() => setActiveTab('calc')}
        >
          1. Dynamic Mean Calculator (70, 80, 90)
        </Button>
        <Button
          size="sm"
          kind={activeTab === 'balance' ? 'primary' : 'secondary'}
          renderIcon={Scale}
          onClick={() => setActiveTab('balance')}
        >
          2. Physical Seesaw Balance Beam
        </Button>
      </div>

      {activeTab === 'calc' ? (
        /* Tab 1: Dynamic Mean Calculator */
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Live Arithmetic Average: Enter or Adjust Any Value
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
                Value 1 (x₁)
              </label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(Number(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'var(--ds-bg-core)',
                  border: '1px solid var(--ds-border-strong)',
                  borderRadius: '3px',
                  color: 'var(--ds-text-primary)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
                Value 2 (x₂)
              </label>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(Number(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'var(--ds-bg-core)',
                  border: '1px solid var(--ds-border-strong)',
                  borderRadius: '3px',
                  color: 'var(--ds-text-primary)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
                Value 3 (x₃)
              </label>
              <input
                type="number"
                value={val3}
                onChange={(e) => setVal3(Number(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'var(--ds-bg-core)',
                  border: '1px solid var(--ds-border-strong)',
                  borderRadius: '3px',
                  color: 'var(--ds-text-primary)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                }}
              />
            </div>
          </div>

          {/* Dynamic Calculation Breakdown */}
          <div
            style={{
              padding: '1rem',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '1rem',
              fontFamily: 'var(--ds-font-mono)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>Sum (Σx)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                {val1} + {val2} + {val3} = <span style={{ color: 'var(--ds-cyan)' }}>{calcSum}</span>
              </div>
            </div>

            <div style={{ fontSize: '1.5rem', color: 'var(--ds-text-muted)' }}>÷</div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>Count (n)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>3</div>
            </div>

            <div style={{ fontSize: '1.5rem', color: 'var(--ds-text-muted)' }}>=</div>

            <div style={{ textAlign: 'center', padding: '6px 14px', background: 'var(--ds-blue)', borderRadius: '4px', color: '#fff' }}>
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', opacity: 0.85 }}>Mean (x̄)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{calcMeanVal.toFixed(2)}</div>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Mean as a Physical Balance Point */
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
              The Fulcrum Principle: Balance Beam on [60, 80, 100]
            </span>
            <Button
              size="sm"
              kind="ghost"
              renderIcon={Restart}
              onClick={() => setBalancePoints([60, 80, 100])}
            >
              Reset Points
            </Button>
          </div>

          {/* Interactive Sliders for the 3 points */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {balancePoints.map((pt, idx) => (
              <div key={idx} style={{ padding: '10px', background: 'var(--ds-bg-core)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--ds-text-muted)' }}>Observation Point {idx + 1}</span>
                  <strong style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>{pt}</strong>
                </div>
                <input
                  type="range"
                  min={20}
                  max={120}
                  value={pt}
                  onChange={(e) => updateBalancePoint(idx, Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--ds-cyan)' }}
                />
              </div>
            ))}
          </div>

          {/* Visual Number Line Balance Beam */}
          <div
            style={{
              position: 'relative',
              height: '140px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              padding: '20px 30px',
              border: '1px solid var(--ds-border-strong)',
              marginBottom: '1.5rem',
              overflow: 'hidden',
            }}
          >
            {/* The Beam */}
            <div
              style={{
                position: 'absolute',
                top: '70px',
                left: '40px',
                right: '40px',
                height: '6px',
                background: 'var(--ds-border-strong)',
                borderRadius: '3px',
              }}
            />

            {/* Fulcrum (Mean) */}
            <div
              style={{
                position: 'absolute',
                top: '55px',
                left: `${Math.max(6, Math.min(94, ((balanceMean - 20) / (120 - 20)) * 100))}%`,
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 2,
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-blue)' }}>
                Mean: {balanceMean.toFixed(1)}
              </div>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderBottom: '18px solid var(--ds-blue)',
                  margin: '4px auto 0 auto',
                }}
              />
              <span style={{ fontSize: '0.625rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                Fulcrum
              </span>
            </div>

            {/* Weights / Observations */}
            {deviations.map((dev, i) => {
              const leftPct = Math.max(4, Math.min(96, ((dev.val - 20) / (120 - 20)) * 100));
              const isNegative = dev.deviation < 0;
              const isZero = Math.abs(dev.deviation) < 0.01;

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '25px',
                    left: `${leftPct}%`,
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isZero
                        ? 'var(--ds-purple)'
                        : isNegative
                        ? 'rgba(218, 30, 40, 0.85)'
                        : 'var(--ds-emerald)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--ds-font-mono)',
                      fontWeight: 700,
                      margin: '0 auto',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    }}
                  >
                    {dev.val}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--ds-font-mono)',
                      fontWeight: 600,
                      color: isZero
                        ? 'var(--ds-purple)'
                        : isNegative
                        ? '#da1e28'
                        : 'var(--ds-emerald)',
                      marginTop: '2px',
                    }}
                  >
                    {dev.deviation > 0 ? `+${dev.deviation.toFixed(1)}` : dev.deviation.toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deviation Sum Zero Proof */}
          <div
            style={{
              padding: '12px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.8125rem',
            }}
          >
            <div>
              <span style={{ color: 'var(--ds-text-muted)' }}>Signed Deviations (xᵢ - x̄): </span>
              {deviations.map((d, i) => (
                <span key={i} style={{ color: d.deviation < 0 ? '#da1e28' : d.deviation > 0 ? 'var(--ds-emerald)' : 'var(--ds-text-primary)' }}>
                  {d.deviation > 0 ? `(+${d.deviation.toFixed(1)})` : `(${d.deviation.toFixed(1)})`}
                  {i < deviations.length - 1 ? ' + ' : ''}
                </span>
              ))}
            </div>

            <div style={{ fontWeight: 700, color: 'var(--ds-cyan)' }}>
              Sum of Deviations = {Math.abs(deviationSum) < 0.001 ? '0.00' : deviationSum.toFixed(2)} ✓
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: '1.25rem',
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-blue)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Mathematical Truth:</strong> The definition of the mean ensures that the positive moments on the right of the fulcrum exactly equal the negative moments on the left. This property will be foundational when we derive Variance in Section 16!
      </div>
    </div>
  );
}
