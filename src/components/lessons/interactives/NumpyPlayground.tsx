'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Code,
  Flash,
  SettingsAdjust,
  Calculator,
  Reset,
} from '@carbon/icons-react';

const defaultScores = [72, 85, 91, 64, 78, 88];

export function NumpyPlayground() {
  const [activeAction, setActiveAction] = useState<
    'original' | 'curve' | 'scale' | 'filter' | 'stats' | 'matrix'
  >('original');

  let outputDisplay = '';
  let generatedCode = '';
  let explanation = '';

  if (activeAction === 'original') {
    outputDisplay = `array([${defaultScores.join(', ')}])`;
    generatedCode = `import numpy as np\nscores = np.array([${defaultScores.join(', ')}])\nprint(scores)`;
    explanation = 'Initialized 1D ndarray with 6 student exam scores.';
  } else if (activeAction === 'curve') {
    const curved = defaultScores.map((s) => s + 5);
    outputDisplay = `array([${curved.join(', ')}])`;
    generatedCode = `curved_scores = scores + 5  # Vectorized +5 bonus\nprint(curved_scores)`;
    explanation = 'Broadcasting added 5 bonus marks to every score in one vectorized step.';
  } else if (activeAction === 'scale') {
    const scaled = defaultScores.map((s) => Math.round(s * 1.1));
    outputDisplay = `array([${scaled.join(', ')}])`;
    generatedCode = `scaled_scores = np.round(scores * 1.1)\nprint(scaled_scores)`;
    explanation = 'Applied a 10% curve scaling across all elements simultaneously.';
  } else if (activeAction === 'filter') {
    const filtered = defaultScores.filter((s) => s >= 80);
    outputDisplay = `array([${filtered.join(', ')}])`;
    generatedCode = `top_scores = scores[scores >= 80]  # Boolean mask\nprint(top_scores)`;
    explanation = 'Filtered elements where score >= 80 using boolean array masking.';
  } else if (activeAction === 'stats') {
    const sum = defaultScores.reduce((a, b) => a + b, 0);
    const mean = (sum / defaultScores.length).toFixed(1);
    const min = Math.min(...defaultScores);
    const max = Math.max(...defaultScores);
    outputDisplay = `Mean: ${mean} | Sum: ${sum} | Min: ${min} | Max: ${max}`;
    generatedCode = `print("Mean:", np.mean(scores))\nprint("Sum:", np.sum(scores))\nprint("Min:", np.min(scores))\nprint("Max:", np.max(scores))`;
    explanation = 'Calculatord essential statistical summaries using compiled C aggregators.';
  } else if (activeAction === 'matrix') {
    outputDisplay = `array([[72, 85, 91],\n       [64, 78, 88]])`;
    generatedCode = `matrix_2d = scores.reshape(2, 3)\nprint(matrix_2d)`;
    explanation = 'Reshaped 1D vector of length 6 into a 2x3 student-subject matrix.';
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
            Interactive Experience 7
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Consolidated NumPy Playground
          </h3>
        </div>
        <Tag type="blue" size="md">
          Interactive Workbench
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Test different NumPy operations on <code>scores = np.array([72, 85, 91, 64, 78, 88])</code> and inspect the generated Python code and live output:
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'original', label: '1. Original Array' },
          { id: 'curve', label: '2. Add Curve (+5)' },
          { id: 'scale', label: '3. Scale (* 1.1)' },
          { id: 'filter', label: '4. Filter (>=80)' },
          { id: 'stats', label: '5. Aggregations (mean/min/max)' },
          { id: 'matrix', label: '6. Reshape to (2, 3)' },
        ].map((btn) => {
          const isSelected = activeAction === btn.id;
          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => setActiveAction(btn.id as any)}
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
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* 2-Column Code + Output Display */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
          marginBottom: '1.25rem',
        }}
      >
        {/* Python Code Snippet */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '8px' }}>
            EXECUTED PYTHON CODE:
          </div>
          <pre
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              color: 'var(--ds-text-primary)',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {generatedCode}
          </pre>
        </div>

        {/* Live Output */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1.5px solid var(--ds-emerald)',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', marginBottom: '8px' }}>
            NUMPY TERMINAL OUTPUT:
          </div>
          <pre
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: 'var(--ds-emerald)',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {outputDisplay}
          </pre>
        </div>
      </div>

      {/* Explanation Banner */}
      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <strong>Pedagogical Insight:</strong> {explanation}
      </div>
    </div>
  );
}
