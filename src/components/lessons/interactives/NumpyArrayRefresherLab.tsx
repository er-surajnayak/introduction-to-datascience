'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Analytics, Reset } from '@carbon/icons-react';

const INITIAL_MARKS = [78, 85, 92, 67, 74];
const SECOND_MARKS = [5, 10, 3, 8, 6];

export function NumpyArrayRefresherLab() {
  const [activeOperation, setActiveOperation] = useState<'none' | 'add5' | 'sub5' | 'mul2' | 'div10' | 'array_add' | 'array_mul'>('none');
  const [array2Enabled, setArray2Enabled] = useState(false);

  const getComputedArray = () => {
    switch (activeOperation) {
      case 'add5':
        return INITIAL_MARKS.map((m) => m + 5);
      case 'sub5':
        return INITIAL_MARKS.map((m) => m - 5);
      case 'mul2':
        return INITIAL_MARKS.map((m) => m * 2);
      case 'div10':
        return INITIAL_MARKS.map((m) => +(m / 10).toFixed(1));
      case 'array_add':
        return INITIAL_MARKS.map((m, i) => m + SECOND_MARKS[i]);
      case 'array_mul':
        return INITIAL_MARKS.map((m, i) => m * SECOND_MARKS[i]);
      default:
        return INITIAL_MARKS;
    }
  };

  const computedValues = getComputedArray();

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Analytics size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            NumPy Array Anatomy & Vectorized Arithmetic
          </h3>
          <Tag type="teal" size="sm">np.ndarray</Tag>
        </div>
        <Button
          kind="ghost"
          size="sm"
          renderIcon={Reset}
          onClick={() => {
            setActiveOperation('none');
            setArray2Enabled(false);
          }}
        >
          Reset Array
        </Button>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        NumPy arrays are contiguous, homogeneous memory blocks. Unlike Python lists, operations are <strong>vectorized</strong>—applied to all elements simultaneously at C-speed without manual <code>for</code> loops.
      </p>

      {/* Array Metadata Badges */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <Tag type="cyan" size="md">dtype: int64</Tag>
        <Tag type="purple" size="md">shape: (5,)</Tag>
        <Tag type="warm-gray" size="md">ndim: 1 (1D Array)</Tag>
        <Tag type="green" size="md">size: 5 elements</Tag>
      </div>

      {/* Visual Array 1 Grid */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Array 1: marks = np.array([78, 85, 92, 67, 74])
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {INITIAL_MARKS.map((val, idx) => (
            <div
              key={idx}
              style={{
                flex: '1 1 80px',
                minWidth: '70px',
                textAlign: 'center',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-strong)',
                padding: '8px 4px',
              }}
            >
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', fontFamily: 'var(--ds-font-mono)', marginBottom: '4px' }}>
                Index [{idx}]
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Array 2 Grid (if element-wise active) */}
      {array2Enabled && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '4px',
            background: 'var(--ds-bg-core)',
            border: '1px solid var(--ds-border-subtle)',
            marginBottom: '1rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Array 2: bonus = np.array([5, 10, 3, 8, 6]) — Shape (5,) (Compatible)
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {SECOND_MARKS.map((val, idx) => (
              <div
                key={idx}
                style={{
                  flex: '1 1 80px',
                  minWidth: '70px',
                  textAlign: 'center',
                  background: 'rgba(15, 98, 254, 0.1)',
                  borderRadius: '4px',
                  border: '1px solid var(--ds-cyan)',
                  padding: '8px 4px',
                }}
              >
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', fontFamily: 'var(--ds-font-mono)', marginBottom: '4px' }}>
                  Index [{idx}]
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-purple)', fontFamily: 'var(--ds-font-mono)' }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Operation Selection Controls */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
          Select Vectorized Operation:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            size="sm"
            kind={activeOperation === 'add5' ? 'primary' : 'tertiary'}
            onClick={() => {
              setActiveOperation('add5');
              setArray2Enabled(false);
            }}
          >
            marks + 5 (Scalar Add)
          </Button>
          <Button
            size="sm"
            kind={activeOperation === 'sub5' ? 'primary' : 'tertiary'}
            onClick={() => {
              setActiveOperation('sub5');
              setArray2Enabled(false);
            }}
          >
            marks - 5 (Scalar Sub)
          </Button>
          <Button
            size="sm"
            kind={activeOperation === 'mul2' ? 'primary' : 'tertiary'}
            onClick={() => {
              setActiveOperation('mul2');
              setArray2Enabled(false);
            }}
          >
            marks * 2 (Scalar Mul)
          </Button>
          <Button
            size="sm"
            kind={activeOperation === 'div10' ? 'primary' : 'tertiary'}
            onClick={() => {
              setActiveOperation('div10');
              setArray2Enabled(false);
            }}
          >
            marks / 10 (Scalar Div)
          </Button>
          <Button
            size="sm"
            kind={activeOperation === 'array_add' ? 'primary' : 'tertiary'}
            onClick={() => {
              setActiveOperation('array_add');
              setArray2Enabled(true);
            }}
          >
            marks + bonus (Array + Array)
          </Button>
          <Button
            size="sm"
            kind={activeOperation === 'array_mul' ? 'primary' : 'tertiary'}
            onClick={() => {
              setActiveOperation('array_mul');
              setArray2Enabled(true);
            }}
          >
            marks * bonus (Array * Array)
          </Button>
        </div>
      </div>

      {/* Computed Result Output */}
      {activeOperation !== 'none' && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '4px',
            background: 'rgba(36, 161, 72, 0.1)',
            border: '1px solid var(--ds-emerald)',
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-emerald)' }}>
              ✓ Resulting Vectorized ndarray (C-Speed Execution):
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-secondary)' }}>
              Shape: (5,) | dtype: {activeOperation === 'div10' ? 'float64' : 'int64'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {computedValues.map((val, idx) => (
              <div
                key={idx}
                style={{
                  flex: '1 1 80px',
                  minWidth: '70px',
                  textAlign: 'center',
                  background: 'var(--ds-bg-core)',
                  borderRadius: '4px',
                  border: '2px solid var(--ds-emerald)',
                  padding: '8px 4px',
                }}
              >
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', fontFamily: 'var(--ds-font-mono)', marginBottom: '4px' }}>
                  Index [{idx}]
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-emerald)', fontFamily: 'var(--ds-font-mono)' }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
