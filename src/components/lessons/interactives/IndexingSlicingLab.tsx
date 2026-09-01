'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, NumberInput } from '@carbon/react';
import {
  Cut,
  ArrowRight,
  Select_01,
} from '@carbon/icons-react';

const source1D = [10, 20, 30, 40, 50, 60];

export function IndexingSlicingLab() {
  const [labMode, setLabMode] = useState<'index' | 'slice'>('slice');
  const [selectedIndex, setSelectedIndex] = useState<number>(2);
  const [sliceStart, setSliceStart] = useState<number>(1);
  const [sliceStop, setSliceStop] = useState<number>(4);

  const slicedResult = source1D.slice(sliceStart, sliceStop);

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
            Interactive Experience 3
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Indexing & Slicing Explorer
          </h3>
        </div>
        <Tag type="teal" size="md">
          Array Extraction
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        NumPy utilizes zero-based indexing to extract individual elements and slicing <code>arr[start:stop]</code> (where <code>start</code> is included and <code>stop</code> is excluded) to extract subsets:
      </p>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setLabMode('slice')}
          style={{
            flex: 1,
            padding: '10px',
            background: labMode === 'slice' ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
            border: labMode === 'slice' ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: labMode === 'slice' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
            cursor: 'pointer',
          }}
        >
          1. Slicing Range: arr[start:stop]
        </button>

        <button
          type="button"
          onClick={() => setLabMode('index')}
          style={{
            flex: 1,
            padding: '10px',
            background: labMode === 'index' ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface-elevated)',
            border: labMode === 'index' ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: labMode === 'index' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
            cursor: 'pointer',
          }}
        >
          2. Single Indexing: arr[index]
        </button>
      </div>

      {/* Interactive Controls */}
      {labMode === 'slice' ? (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: '140px' }}>
            <NumberInput
              id="slice-start"
              label="start index (included)"
              value={sliceStart}
              min={0}
              max={source1D.length - 1}
              step={1}
              onChange={(_e, { value }) => setSliceStart(Number(value))}
            />
          </div>
          <div style={{ width: '140px' }}>
            <NumberInput
              id="slice-stop"
              label="stop index (excluded)"
              value={sliceStop}
              min={sliceStart + 1}
              max={source1D.length}
              step={1}
              onChange={(_e, { value }) => setSliceStop(Number(value))}
            />
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '160px', marginBottom: '1.5rem' }}>
          <NumberInput
            id="index-selector"
            label="Selected Index"
            value={selectedIndex}
            min={0}
            max={source1D.length - 1}
            step={1}
            onChange={(_e, { value }) => setSelectedIndex(Number(value))}
          />
        </div>
      )}

      {/* Visual Array Highlighting Strip */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          ORIGINAL ARRAY: numbers = np.array([10, 20, 30, 40, 50, 60])
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {source1D.map((val, idx) => {
            const isSelectedInIndex = labMode === 'index' && idx === selectedIndex;
            const isSelectedInSlice = labMode === 'slice' && idx >= sliceStart && idx < sliceStop;
            const isHighlight = isSelectedInIndex || isSelectedInSlice;

            return (
              <div
                key={idx}
                onClick={() => {
                  if (labMode === 'index') setSelectedIndex(idx);
                }}
                style={{
                  padding: '12px 18px',
                  background: isHighlight ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                  border: isHighlight ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  textAlign: 'center',
                  cursor: labMode === 'index' ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: isHighlight ? 'var(--ds-cyan)' : 'var(--ds-text-muted)' }}>
                  [{idx}]
                </div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: isHighlight ? 'var(--ds-cyan)' : 'var(--ds-text-primary)' }}>
                  {val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Extraction Result Code Display */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderLeft: '4px solid var(--ds-emerald)',
          borderRadius: '0 4px 4px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem' }}>
          <span style={{ color: 'var(--ds-text-muted)' }}>SYNTAX: </span>
          <strong style={{ color: 'var(--ds-text-primary)' }}>
            {labMode === 'slice'
              ? `numbers[${sliceStart}:${sliceStop}]`
              : `numbers[${selectedIndex}]`}
          </strong>
        </div>

        <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
          RESULT: {labMode === 'slice' ? `array([${slicedResult.join(', ')}])` : source1D[selectedIndex]}
        </div>
      </div>
    </div>
  );
}
