'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { PlayFilledAlt, Restart, Information } from '@carbon/icons-react';

type MemoryScenario = 'aliasing' | 'immutable' | 'copy';

export function VariableMemoryInspector() {
  const [scenario, setScenario] = useState<MemoryScenario>('aliasing');
  const [step, setStep] = useState<number>(0);

  const reset = (scen: MemoryScenario) => {
    setScenario(scen);
    setStep(0);
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Lab 1.3
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            CPython Memory Heap & Variable Reference Simulator
          </h3>
        </div>
        <Tag type="teal" size="md">Live Pointer Inspector</Tag>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Watch how Python variables bind to memory addresses (`id`) on the heap instead of acting as fixed storage boxes.
      </p>

      {/* Scenario Selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        <button
          type="button"
          onClick={() => reset('aliasing')}
          style={{
            padding: '10px',
            background: scenario === 'aliasing' ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
            border: scenario === 'aliasing' ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: scenario === 'aliasing' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          1. Mutable Aliasing Trap (`b = a`)
        </button>

        <button
          type="button"
          onClick={() => reset('immutable')}
          style={{
            padding: '10px',
            background: scenario === 'immutable' ? 'rgba(138, 63, 252, 0.12)' : 'var(--cds-layer-02)',
            border: scenario === 'immutable' ? '1.5px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: scenario === 'immutable' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          2. Immutable Int Rebinding (`x += 1`)
        </button>

        <button
          type="button"
          onClick={() => reset('copy')}
          style={{
            padding: '10px',
            background: scenario === 'copy' ? 'rgba(25, 128, 56, 0.12)' : 'var(--cds-layer-02)',
            border: scenario === 'copy' ? '1.5px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: scenario === 'copy' ? 'var(--ds-emerald)' : 'var(--ds-text-primary)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          3. Safe Clone with `.copy()`
        </button>
      </div>

      {/* Code & Memory Dual Display */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Left: Code Flow */}
        <div className="ds-code-window">
          <div className="ds-code-header">
            <span>Code Execution</span>
            <span>Python 3.12</span>
          </div>
          <div className="ds-code-content" style={{ minHeight: '140px' }}>
            {scenario === 'aliasing' && (
              <div>
                <div style={{ color: step >= 0 ? 'var(--ds-cyan)' : 'inherit', fontWeight: step === 0 ? 700 : 400 }}>
                  Line 1: a = [10, 20, 30] {step === 0 && '◄ CURRENT'}
                </div>
                <div style={{ color: step >= 1 ? 'var(--ds-cyan)' : 'inherit', fontWeight: step === 1 ? 700 : 400 }}>
                  Line 2: b = a  # Shared reference {step === 1 && '◄ CURRENT'}
                </div>
                <div style={{ color: step >= 2 ? 'var(--ds-cyan)' : 'inherit', fontWeight: step === 2 ? 700 : 400 }}>
                  Line 3: b.append(99)  # In-place mutation {step === 2 && '◄ CURRENT'}
                </div>
              </div>
            )}

            {scenario === 'immutable' && (
              <div>
                <div style={{ color: step >= 0 ? 'var(--ds-purple)' : 'inherit', fontWeight: step === 0 ? 700 : 400 }}>
                  Line 1: x = 42 {step === 0 && '◄ CURRENT'}
                </div>
                <div style={{ color: step >= 1 ? 'var(--ds-purple)' : 'inherit', fontWeight: step === 1 ? 700 : 400 }}>
                  Line 2: y = x  # Points to 42 {step === 1 && '◄ CURRENT'}
                </div>
                <div style={{ color: step >= 2 ? 'var(--ds-purple)' : 'inherit', fontWeight: step === 2 ? 700 : 400 }}>
                  Line 3: x = x + 1  # Allocates NEW integer! {step === 2 && '◄ CURRENT'}
                </div>
              </div>
            )}

            {scenario === 'copy' && (
              <div>
                <div style={{ color: step >= 0 ? 'var(--ds-emerald)' : 'inherit', fontWeight: step === 0 ? 700 : 400 }}>
                  Line 1: raw = [10, 20, 30] {step === 0 && '◄ CURRENT'}
                </div>
                <div style={{ color: step >= 1 ? 'var(--ds-emerald)' : 'inherit', fontWeight: step === 1 ? 700 : 400 }}>
                  Line 2: safe = raw.copy()  # New allocation! {step === 1 && '◄ CURRENT'}
                </div>
                <div style={{ color: step >= 2 ? 'var(--ds-emerald)' : 'inherit', fontWeight: step === 2 ? 700 : 400 }}>
                  Line 3: safe.append(99)  # raw is unaffected {step === 2 && '◄ CURRENT'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Simulated RAM Heap */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--cds-layer-02)',
            border: '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
            HEAP MEMORY (RAM)
          </div>

          {scenario === 'aliasing' && (
            <div>
              <div
                style={{
                  padding: '12px',
                  background: 'var(--cds-layer-01)',
                  border: '1.5px solid var(--ds-cyan)',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
                  Memory Address: 0x7FA340 (id = 8364864)
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  Type: `list` → Value: {step < 2 ? '[10, 20, 30]' : '[10, 20, 30, 99]'}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                  Referencing Name Tags:{' '}
                  <strong style={{ color: 'var(--ds-cyan)' }}>
                    {step === 0 ? 'a' : 'a, b (SHARED!)'}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {scenario === 'immutable' && (
            <div>
              <div
                style={{
                  padding: '10px',
                  background: 'var(--cds-layer-01)',
                  border: '1px solid var(--ds-purple)',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
                  Address: 0x1004 (Value: 42)
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
                  Referencing: {step < 2 ? (step === 0 ? 'x' : 'x, y') : 'y only'}
                </div>
              </div>

              {step === 2 && (
                <div
                  style={{
                    padding: '10px',
                    background: 'var(--cds-layer-01)',
                    border: '1.5px solid var(--ds-cyan)',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
                    Address: 0x1008 (NEW ALLOCATION: 43)
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
                    Referencing: <strong>x</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {scenario === 'copy' && (
            <div>
              <div
                style={{
                  padding: '10px',
                  background: 'var(--cds-layer-01)',
                  border: '1px solid var(--ds-border-strong)',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                  Address: 0x7FA100 (raw)
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)' }}>
                  Value: <strong>[10, 20, 30]</strong> (Clean & Preserved)
                </div>
              </div>

              {step >= 1 && (
                <div
                  style={{
                    padding: '10px',
                    background: 'var(--cds-layer-01)',
                    border: '1.5px solid var(--ds-emerald)',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)' }}>
                    Address: 0x7FA990 (safe clone)
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)' }}>
                    Value: <strong>{step < 2 ? '[10, 20, 30]' : '[10, 20, 30, 99]'}</strong>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stepper Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
          Step {step + 1} of 3
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            kind="secondary"
            size="sm"
            renderIcon={Restart}
            onClick={() => setStep(0)}
            disabled={step === 0}
          >
            Reset
          </Button>

          <Button
            kind="primary"
            size="sm"
            renderIcon={PlayFilledAlt}
            onClick={() => setStep((s) => Math.min(2, s + 1))}
            disabled={step === 2}
          >
            Step Forward
          </Button>
        </div>
      </div>
    </div>
  );
}
