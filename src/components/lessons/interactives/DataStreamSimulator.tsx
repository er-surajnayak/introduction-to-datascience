'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Play,
  Pause,
  Restart,
  MeterAlt,
  ArrowUp,
  ArrowDown,
  Calculator,
  Time,
} from '@carbon/icons-react';

const simulatedFeed = [
  28.1, 28.3, 28.5, 28.2, 28.7, 28.9, 29.1, 28.8, 28.6, 28.4,
  28.2, 28.0, 27.9, 28.2, 28.6, 29.0, 29.4, 29.2, 28.8, 28.5,
];

export function DataStreamSimulator() {
  const [streamIndex, setStreamIndex] = useState<number>(5);
  const [buffer, setBuffer] = useState<number[]>([28.1, 28.3, 28.5, 28.2, 28.7]);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [intervalMs, setIntervalMs] = useState<number>(1500);

  // Interval timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setStreamIndex((prevIdx) => {
        const nextVal = simulatedFeed[prevIdx % simulatedFeed.length];
        setBuffer((prevBuffer) => {
          const updated = [...prevBuffer, nextVal];
          // Keep sliding window of latest 8 readings to represent limited memory
          return updated.slice(-8);
        });
        return prevIdx + 1;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, intervalMs]);

  const handleToggle = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStreamIndex(5);
    setBuffer([28.1, 28.3, 28.5, 28.2, 28.7]);
  };

  // Metrics
  const currentValue = buffer[buffer.length - 1] ?? 28.0;
  const runningAverage = buffer.length > 0 ? buffer.reduce((a, b) => a + b, 0) / buffer.length : 0;
  const minValue = buffer.length > 0 ? Math.min(...buffer) : 0;
  const maxValue = buffer.length > 0 ? Math.max(...buffer) : 0;

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
            Live Data Stream Simulator: Sliding Window Aggregations
          </h3>
        </div>
        <Tag type={isRunning ? 'green' : 'gray'} size="md">
          {isRunning ? '● Stream Live' : '❚❚ Paused'}
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        A meteorological IoT sensor continuously transmits readings every 1.5 seconds. Because an infinite stream cannot fit in RAM forever, modern data pipelines ingest data through a <strong>sliding window buffer</strong>, computing real-time summary statistics on the fly:
      </p>

      {/* KPI Metrics Dashboard Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '1.5rem',
        }}
      >
        {/* Current Reading */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-cyan)',
            borderLeft: '4px solid var(--ds-cyan)',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Current Reading
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            {currentValue.toFixed(1)}°C
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Latest arrival</span>
        </div>

        {/* Window Average */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
            borderLeft: '4px solid var(--ds-purple)',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)', textTransform: 'uppercase' }}>
            Window Average
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            {runningAverage.toFixed(2)}°C
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Mean (last {buffer.length} events)</span>
        </div>

        {/* Min Value */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
            borderLeft: '4px solid var(--ds-emerald)',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', textTransform: 'uppercase' }}>
            Window Min
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            {minValue.toFixed(1)}°C
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Lowest in window</span>
        </div>

        {/* Max Value */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
            borderLeft: '4px solid #ff832b',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: '#ff832b', textTransform: 'uppercase' }}>
            Window Max
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)', margin: '4px 0' }}>
            {maxValue.toFixed(1)}°C
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Peak in window</span>
        </div>
      </div>

      {/* Live Sliding Window Buffer Graphic */}
      <div
        style={{
          background: 'var(--cds-layer-01)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Sliding Memory Buffer (FIFO: First In, First Out)
          </span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
            Events Ingested: {streamIndex}
          </span>
        </div>

        {/* Event Cells */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
          }}
        >
          <AnimatePresence initial={false}>
            {buffer.map((val, idx) => {
              const isLatest = idx === buffer.length - 1;
              return (
                <motion.div
                  key={`${idx}-${val}-${streamIndex}`}
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: '0.875rem 1rem',
                    background: isLatest ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
                    border: isLatest ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '1rem',
                    fontWeight: isLatest ? 700 : 500,
                    color: isLatest ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                    minWidth: '70px',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div>{val.toFixed(1)}°</div>
                  <div style={{ fontSize: '0.625rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
                    {isLatest ? 'Latest' : `t-${buffer.length - 1 - idx}`}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            kind={isRunning ? 'secondary' : 'primary'}
            size="sm"
            renderIcon={isRunning ? Pause : Play}
            onClick={handleToggle}
          >
            {isRunning ? 'Pause Stream' : 'Resume Stream'}
          </Button>
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Restart}
            onClick={handleReset}
          >
            Reset Buffer
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Interval:</span>
          {[
            { label: 'Fast (0.8s)', val: 800 },
            { label: 'Normal (1.5s)', val: 1500 },
            { label: 'Slow (3s)', val: 3000 },
          ].map((spd) => (
            <button
              key={spd.val}
              type="button"
              onClick={() => setIntervalMs(spd.val)}
              style={{
                background: intervalMs === spd.val ? 'var(--ds-cyan-dim)' : 'transparent',
                border: intervalMs === spd.val ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                color: intervalMs === spd.val ? 'var(--ds-cyan)' : 'var(--ds-text-muted)',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {spd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
