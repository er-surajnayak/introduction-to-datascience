'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, InlineNotification } from '@carbon/react';
import {
  
  Grid,
  WarningAlt,
  CheckmarkOutline,
} from '@carbon/icons-react';

const original6 = [1, 2, 3, 4, 5, 6];

export function ReshapeLab() {
  const [targetShape, setTargetShape] = useState<string>('2,3');

  const shapeOptions = [
    { label: 'reshape(2, 3)', rows: 2, cols: 3, valid: true },
    { label: 'reshape(3, 2)', rows: 3, cols: 2, valid: true },
    { label: 'reshape(1, 6)', rows: 1, cols: 6, valid: true },
    { label: 'reshape(6, 1)', rows: 6, cols: 1, valid: true },
    { label: 'reshape(4, 2)', rows: 4, cols: 2, valid: false },
  ];

  const currentOption = shapeOptions.find((o) => `${o.rows},${o.cols}` === targetShape) || shapeOptions[0];

  // Generate grid if valid
  let gridMatrix: number[][] = [];
  if (currentOption.valid) {
    for (let r = 0; r < currentOption.rows; r++) {
      const rowSlice = original6.slice(r * currentOption.cols, (r + 1) * currentOption.cols);
      gridMatrix.push(rowSlice);
    }
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
            Interactive Experience 6
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Reshape & Structure Workbench
          </h3>
        </div>
        <Tag type="teal" size="md">
          Array Morphing
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        <code>arr.reshape(rows, cols)</code> restructures an array into a new grid without moving or copying elements. However, <code>rows * cols</code> must strictly equal <code>arr.size</code>:
      </p>

      {/* Target Shape Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {shapeOptions.map((opt) => {
          const isSelected = `${opt.rows},${opt.cols}` === targetShape;
          return (
            <button
              key={`${opt.rows},${opt.cols}`}
              type="button"
              onClick={() => setTargetShape(`${opt.rows},${opt.cols}`)}
              style={{
                padding: '8px 14px',
                background: isSelected
                  ? opt.valid
                    ? 'var(--ds-cyan-dim)'
                    : 'var(--ds-crimson-dim)'
                  : 'var(--ds-bg-surface-elevated)',
                border: isSelected
                  ? opt.valid
                    ? '2px solid var(--ds-cyan)'
                    : '2px solid var(--ds-crimson)'
                  : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 700 : 400,
                color: isSelected
                  ? opt.valid
                    ? 'var(--ds-cyan)'
                    : 'var(--ds-crimson)'
                  : 'var(--ds-text-primary)',
                cursor: 'pointer',
              }}
            >
              {opt.label} {!opt.valid && '⚠️ (Invalid)'}
            </button>
          );
        })}
      </div>

      {/* Result Display */}
      {currentOption.valid ? (
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--ds-bg-surface)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '10px' }}>
            RESHAPED GRID STRUCTURE ({currentOption.rows} rows × {currentOption.cols} cols):
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {gridMatrix.map((row, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', gap: '8px' }}>
                {row.map((val, cIdx) => (
                  <div
                    key={cIdx}
                    style={{
                      padding: '10px 20px',
                      background: 'var(--ds-bg-surface-elevated)',
                      border: '1.5px solid var(--ds-cyan)',
                      borderRadius: '4px',
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--ds-cyan)',
                      minWidth: '60px',
                      textAlign: 'center',
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: '1.25rem' }}>
          <InlineNotification
            kind="error"
            title="ValueError: cannot reshape array of size 6 into shape (4,2)"
            subtitle="The total number of elements must remain conserved. 4 * 2 = 8 elements required, but original array size is 6."
            hideCloseButton
          />
        </div>
      )}

      {/* Code Signature */}
      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.875rem',
          color: currentOption.valid ? 'var(--ds-emerald)' : 'var(--ds-crimson)',
        }}
      >
        <span style={{ color: 'var(--ds-text-muted)' }}>STATUS: </span>
        <span>
          {currentOption.valid
            ? `Successfully reshaped 6 elements into shape (${currentOption.rows}, ${currentOption.cols})`
            : `Failed: rows * cols (${currentOption.rows} * ${currentOption.cols} = ${currentOption.rows * currentOption.cols}) != 6`}
        </span>
      </div>
    </div>
  );
}
