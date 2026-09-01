'use client';

import React, { useState } from 'react';
import { Tag, Button, ProgressBar } from '@carbon/react';
import { PlayFilledAlt, Restart, CheckmarkOutline } from '@carbon/icons-react';

export function ExecutionFlowSimulator() {
  const sensorData = [12.5, -999.0, 18.2, 45.0, -999.0, 22.1];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cleanedData, setCleanedData] = useState<number[]>([]);
  const [skippedCount, setSkippedCount] = useState(0);

  const stepForward = () => {
    if (currentIndex >= sensorData.length) return;
    const val = sensorData[currentIndex];
    if (val === -999.0) {
      setSkippedCount((s) => s + 1);
    } else {
      setCleanedData((arr) => [...arr, val]);
    }
    setCurrentIndex((i) => i + 1);
  };

  const reset = () => {
    setCurrentIndex(0);
    setCleanedData([]);
    setSkippedCount(0);
  };

  const isDone = currentIndex >= sensorData.length;
  const currentVal = !isDone ? sensorData[currentIndex] : null;

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
            Interactive Lab 1.4
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            Execution Flow & Loop Filter Stepper
          </h3>
        </div>
        <Tag type="teal" size="md">Loop Step Visualizer</Tag>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Step through a Python filtering loop in slow motion to see how conditional checks filter out sensor errors (`-999.0`) in real time.
      </p>

      {/* Input Stream Blocks */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
          RAW SENSOR STREAM (Total: {sensorData.length})
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {sensorData.map((val, idx) => {
            const isEvaluated = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isAnomaly = val === -999.0;
            return (
              <div
                key={idx}
                style={{
                  padding: '8px 14px',
                  background: isCurrent
                    ? 'var(--ds-cyan-dim)'
                    : isEvaluated
                    ? 'var(--cds-layer-02)'
                    : 'var(--cds-layer-01)',
                  border: isCurrent
                    ? '2px solid var(--ds-cyan)'
                    : isEvaluated
                    ? isAnomaly
                      ? '1px dashed #da1e28'
                      : '1px solid var(--ds-emerald)'
                    : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  color: isAnomaly ? '#fa4d56' : 'var(--ds-text-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span>{val}</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginTop: '2px' }}>
                  idx [{idx}]
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Evaluation */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            Status:{' '}
            {isDone ? (
              <span style={{ color: 'var(--ds-emerald)' }}>Execution Finished!</span>
            ) : (
              <span>
                Evaluating index <strong>{currentIndex}</strong> (Value ={' '}
                <strong style={{ color: currentVal === -999.0 ? '#fa4d56' : 'var(--ds-cyan)' }}>
                  {currentVal}
                </strong>
                )
              </span>
            )}
          </span>
          <Tag type={isDone ? 'green' : 'cyan'} size="sm">
            {isDone ? 'Completed' : `Step ${currentIndex + 1} of ${sensorData.length}`}
          </Tag>
        </div>

        <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
          {!isDone ? (
            currentVal === -999.0 ? (
              <span style={{ color: '#fa4d56' }}>
                Condition `val == -999.0` is <strong>True</strong> → Triggering `continue` (Skipping error reading).
              </span>
            ) : (
              <span style={{ color: 'var(--ds-emerald)' }}>
                Condition `val == -999.0` is <strong>False</strong> → Appending {currentVal} to `clean_readings`.
              </span>
            )
          ) : (
            <span>All elements processed. Clean array produced.</span>
          )}
        </div>
      </div>

      {/* Clean Output Accumulator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Cleaned Output List (`clean_readings`)
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', color: 'var(--ds-cyan)' }}>
            [{cleanedData.join(', ')}]
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Skipped Anomalies
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', color: '#fa4d56' }}>
            {skippedCount} items
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <Button kind="secondary" size="sm" renderIcon={Restart} onClick={reset}>
          Reset Stepper
        </Button>
        <Button
          kind="primary"
          size="sm"
          renderIcon={PlayFilledAlt}
          onClick={stepForward}
          disabled={isDone}
        >
          {isDone ? 'Complete' : 'Step Next Element'}
        </Button>
      </div>
    </div>
  );
}
