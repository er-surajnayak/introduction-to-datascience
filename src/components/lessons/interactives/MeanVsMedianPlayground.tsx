'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Calculator,
  CheckmarkFilled,
  WarningAlt,
  Help,
  Information,
  Restart,
  ArrowRight,
} from '@carbon/icons-react';

export function MeanVsMedianPlayground() {
  const [imputationChoice, setImputationChoice] = useState<'none' | 'mean' | 'median'>('none');

  const observedValues = [10, 12, 11, 13, 100];
  const meanVal = 29.2;
  const medianVal = 12.0;

  const displayList = [
    { label: 'Item 1', val: 10, isObserved: true },
    { label: 'Item 2', val: 12, isObserved: true },
    { label: 'Item 3', val: 11, isObserved: true },
    { label: 'Item 4', val: 13, isObserved: true },
    { label: 'Item 5', val: 100, isObserved: true, isOutlier: true },
    {
      label: 'Item 6 (Missing)',
      val: imputationChoice === 'mean' ? meanVal : imputationChoice === 'median' ? medianVal : null,
      isObserved: false,
    },
  ];

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
            Interactive 05
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Mean vs. Median Playground
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Outlier Resistance & Robustness
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Why the Mean Breaks on Outliers: Interactive Imputation Lab
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Suppose a server cluster reports latency metrics: <code>[10ms, 12ms, 11ms, 13ms, 100ms (spike), NaN]</code>. The single extreme value (<code>100ms</code>) heavily pulls the arithmetic mean up to <code>29.2ms</code>, while the median remains stable at <code>12.0ms</code>. Compare the two replacements below.
      </p>

      {/* Dataset Strip Visualizer */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '12px' }}>
          Numerical Array: latency_ms
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {displayList.map((item, idx) => {
            const isFilled = item.val !== null && !item.isObserved;
            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  minWidth: '100px',
                  padding: '12px 10px',
                  background: isFilled
                    ? imputationChoice === 'median'
                      ? 'var(--ds-emerald-dim)'
                      : 'rgba(218, 30, 40, 0.15)'
                    : item.isOutlier
                    ? 'rgba(241, 194, 27, 0.15)'
                    : 'var(--ds-bg-surface)',
                  border: isFilled
                    ? imputationChoice === 'median'
                      ? '2px solid var(--ds-emerald)'
                      : '2px solid #da1e28'
                    : item.isOutlier
                    ? '1px solid var(--ds-amber)'
                    : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: '1.125rem',
                    fontFamily: 'var(--ds-font-mono)',
                    fontWeight: 700,
                    color: item.val === null ? 'var(--ds-text-muted)' : isFilled ? (imputationChoice === 'median' ? 'var(--ds-emerald)' : '#da1e28') : item.isOutlier ? 'var(--ds-amber)' : 'var(--ds-text-primary)',
                  }}
                >
                  {item.val === null ? 'NaN' : `${item.val}`}
                </div>
                {item.isOutlier && (
                  <Tag type="warm-gray" size="sm" style={{ margin: '4px 0 0 0' }}>
                    Outlier
                  </Tag>
                )}
                {isFilled && (
                  <Tag type={imputationChoice === 'median' ? 'green' : 'red'} size="sm" style={{ margin: '4px 0 0 0' }}>
                    Imputed
                  </Tag>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            size="md"
            kind={imputationChoice === 'mean' ? 'danger' : 'secondary'}
            onClick={() => setImputationChoice('mean')}
          >
            Fill with Mean (29.2)
          </Button>

          <Button
            size="md"
            kind={imputationChoice === 'median' ? 'primary' : 'secondary'}
            onClick={() => setImputationChoice('median')}
          >
            Fill with Median (12.0)
          </Button>

          {imputationChoice !== 'none' && (
            <Button size="md" kind="ghost" renderIcon={Restart} onClick={() => setImputationChoice('none')}>
              Reset to NaN
            </Button>
          )}
        </div>
      </div>

      {/* Dynamic Feedback Card */}
      <AnimatePresence>
        {imputationChoice !== 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              padding: '1.25rem',
              borderRadius: '4px',
              border: imputationChoice === 'median' ? '1px solid var(--ds-emerald)' : '1px solid #da1e28',
              background: imputationChoice === 'median' ? 'var(--ds-emerald-dim)' : 'rgba(218, 30, 40, 0.1)',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              {imputationChoice === 'median' ? (
                <>
                  <CheckmarkFilled size={18} style={{ color: 'var(--ds-emerald)' }} />
                  <span style={{ fontWeight: 600, color: 'var(--ds-emerald)', fontSize: '0.9375rem' }}>
                    Median Imputation (12.0ms): Robust to Extreme Values!
                  </span>
                </>
              ) : (
                <>
                  <WarningAlt size={18} style={{ color: '#da1e28' }} />
                  <span style={{ fontWeight: 600, color: '#da1e28', fontSize: '0.9375rem' }}>
                    Mean Imputation (29.2ms): Distorted by the 100ms Outlier!
                  </span>
                </>
              )}
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', lineHeight: 1.6 }}>
              {imputationChoice === 'median' ? (
                <span>
                  12.0ms sits directly at the center of the normal latency cluster (10, 11, 12, 13). The single anomalous spike of 100ms had <strong>zero corrupting influence</strong> on the imputed value.
                </span>
              ) : (
                <span>
                  Notice how 29.2ms is <strong>more than double</strong> almost every typical server response (10-13ms)! Because the arithmetic mean adds all numbers together, the single 100ms outlier dragged the imputed estimate into an unrealistic territory.
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          padding: '10px 14px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Bridge to Topic 2.5:</strong> This phenomenon is why Outliers (extreme anomalous points) are a major focus in Data Science. Always check for skewness and outliers before defaulting to mean imputation.
      </div>
    </div>
  );
}
