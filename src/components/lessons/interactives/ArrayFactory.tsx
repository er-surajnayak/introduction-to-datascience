'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button, NumberInput } from '@carbon/react';
import {
  Chemistry,
  SettingsAdjust,
  Code,
} from '@carbon/icons-react';

type FactoryMethod = 'custom' | 'zeros' | 'ones' | 'arange' | 'linspace';

export function ArrayFactory() {
  const [method, setMethod] = useState<FactoryMethod>('arange');
  const [arangeStart, setArangeStart] = useState<number>(0);
  const [arangeStop, setArangeStop] = useState<number>(10);
  const [arangeStep, setArangeStep] = useState<number>(2);

  const [zerosCount, setZerosCount] = useState<number>(5);
  const [onesRows, setOnesRows] = useState<number>(2);
  const [onesCols, setOnesCols] = useState<number>(3);

  // Compute results
  let codeSnippet = '';
  let resultElements: (number | string)[] = [];
  let is2D = false;
  let resultMatrix: number[][] = [];

  if (method === 'custom') {
    codeSnippet = 'np.array([15, 28, 42, 63, 89])';
    resultElements = [15, 28, 42, 63, 89];
  } else if (method === 'zeros') {
    codeSnippet = `np.zeros(${zerosCount})`;
    resultElements = Array(zerosCount).fill('0.0');
  } else if (method === 'ones') {
    codeSnippet = `np.ones((${onesRows}, ${onesCols}))`;
    is2D = true;
    resultMatrix = Array.from({ length: onesRows }, () => Array(onesCols).fill(1.0));
  } else if (method === 'arange') {
    codeSnippet = `np.arange(${arangeStart}, ${arangeStop}, ${arangeStep})`;
    const generated: number[] = [];
    for (let i = arangeStart; i < arangeStop; i += arangeStep) {
      generated.push(i);
    }
    resultElements = generated;
  } else if (method === 'linspace') {
    codeSnippet = 'np.linspace(0, 1, 5)';
    resultElements = [0.0, 0.25, 0.5, 0.75, 1.0];
  }

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
            Interactive Experience 2
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Array Creation Factory
          </h3>
        </div>
        <Tag type="blue" size="md">
          Array Initializers
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        NumPy provides specialized initializers to quickly allocate memory arrays. Select an initializer below to configure its parameters:
      </p>

      {/* Initializer Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'arange', label: 'np.arange()' },
          { id: 'zeros', label: 'np.zeros()' },
          { id: 'ones', label: 'np.ones()' },
          { id: 'linspace', label: 'np.linspace()' },
          { id: 'custom', label: 'np.array()' },
        ].map((btn) => {
          const isSelected = method === btn.id;
          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => setMethod(btn.id as FactoryMethod)}
              style={{
                padding: '8px 14px',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                border: isSelected ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 700 : 400,
                color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Parameter Controls if arange or zeros or ones */}
      {method === 'arange' && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: '120px' }}>
            <NumberInput
              id="arange-start"
              label="start"
              value={arangeStart}
              min={0}
              max={10}
              step={1}
              onChange={(_e, { value }) => setArangeStart(Number(value))}
            />
          </div>
          <div style={{ width: '120px' }}>
            <NumberInput
              id="arange-stop"
              label="stop"
              value={arangeStop}
              min={2}
              max={20}
              step={1}
              onChange={(_e, { value }) => setArangeStop(Number(value))}
            />
          </div>
          <div style={{ width: '120px' }}>
            <NumberInput
              id="arange-step"
              label="step"
              value={arangeStep}
              min={1}
              max={5}
              step={1}
              onChange={(_e, { value }) => setArangeStep(Number(value))}
            />
          </div>
        </div>
      )}

      {method === 'zeros' && (
        <div style={{ maxWidth: '160px', marginBottom: '1.5rem' }}>
          <NumberInput
            id="zeros-count"
            label="Length (count)"
            value={zerosCount}
            min={1}
            max={8}
            step={1}
            onChange={(_e, { value }) => setZerosCount(Number(value))}
          />
        </div>
      )}

      {/* Code Display */}
      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderLeft: '4px solid var(--ds-cyan)',
          borderRadius: '0 4px 4px 0',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.9375rem',
          color: 'var(--ds-text-primary)',
          marginBottom: '1.5rem',
        }}
      >
        <span style={{ color: 'var(--ds-purple)' }}>import </span>
        <span>numpy </span>
        <span style={{ color: 'var(--ds-purple)' }}>as </span>
        <span>np</span>
        <br />
        <span style={{ color: 'var(--ds-cyan)' }}>arr = {codeSnippet}</span>
      </div>

      {/* Live Generated Array Display */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          RESULTING NDARRAY OUTPUT:
        </div>

        {!is2D ? (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {resultElements.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px 16px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--ds-emerald)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {resultMatrix.map((row, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', gap: '8px' }}>
                {row.map((val, cIdx) => (
                  <div
                    key={cIdx}
                    style={{
                      padding: '8px 14px',
                      background: 'var(--ds-bg-surface-elevated)',
                      border: '1px solid var(--ds-border-subtle)',
                      borderRadius: '4px',
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--ds-emerald)',
                    }}
                  >
                    {val.toFixed(1)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
