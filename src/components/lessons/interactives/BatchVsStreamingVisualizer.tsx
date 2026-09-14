'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Calendar,
  MeterAlt,
  DataBase,
  Analytics,
  Flow,
  Time,
  CheckmarkFilled,
} from '@carbon/icons-react';

export function BatchVsStreamingVisualizer() {
  const [mode, setMode] = useState<'batch' | 'streaming'>('batch');

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
            Interactive Experience 5
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Batch Processing vs. Data Streams Visualizer
          </h3>
        </div>
        <Tag type={mode === 'batch' ? 'blue' : 'purple'} size="md">
          {mode === 'batch' ? 'Bounded / Scheduled' : 'Continuous / Real-Time'}
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        In Data Science, data does not always arrive in a tidy, static file. Toggle between <strong>Batch</strong> and <strong>Streaming</strong> to watch how information flows through each architecture:
      </p>

      {/* Mode Switch Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
        <button
          type="button"
          onClick={() => setMode('batch')}
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '4px',
            border: mode === 'batch' ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
            background: mode === 'batch' ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-01)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Calendar size={20} style={{ color: mode === 'batch' ? 'var(--ds-cyan)' : 'var(--ds-text-muted)' }} />
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              Batch Processing
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: 0 }}>
            Accumulate → Store → Run scheduled analysis (e.g. Daily Reports)
          </p>
        </button>

        <button
          type="button"
          onClick={() => setMode('streaming')}
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '4px',
            border: mode === 'streaming' ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
            background: mode === 'streaming' ? 'rgba(165, 110, 255, 0.12)' : 'var(--cds-layer-01)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <MeterAlt size={20} style={{ color: mode === 'streaming' ? 'var(--ds-purple)' : 'var(--ds-text-muted)' }} />
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              Real-Time Streaming
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: 0 }}>
            Event → Process → Event → Process (e.g. Live Sensor Telemetry)
          </p>
        </button>
      </div>

      {/* Animated Pipeline Stage Visualization */}
      <AnimatePresence mode="wait">
        {mode === 'batch' ? (
          <motion.div
            key="batch-pipeline"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--cds-layer-01)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              padding: '1.75rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Batch Flow: Discrete, Scheduled Chunks (T = 24 Hours)
            </div>

            {/* 3 Step Visual Pipeline */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  padding: '1.25rem',
                  background: 'var(--cds-layer-02)',
                  borderRadius: '4px',
                  textAlign: 'center',
                  borderTop: '3px solid var(--ds-cyan)',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ds-cyan-dim)', color: 'var(--ds-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                  <Calendar size={20} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ds-text-primary)' }}>1. COLLECT</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
                  Wait for transactions to accumulate throughout the day
                </div>
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  background: 'var(--cds-layer-02)',
                  borderRadius: '4px',
                  textAlign: 'center',
                  borderTop: '3px solid var(--ds-cyan)',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ds-cyan-dim)', color: 'var(--ds-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                  <DataBase size={20} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ds-text-primary)' }}>2. STORE</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
                  Save records to warehouse or data lake (CSV, Parquet, SQL)
                </div>
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  background: 'var(--cds-layer-02)',
                  borderRadius: '4px',
                  textAlign: 'center',
                  borderTop: '3px solid var(--ds-emerald)',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(66, 190, 101, 0.15)', color: 'var(--ds-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                  <Analytics size={20} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ds-text-primary)' }}>3. ANALYZE</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
                  Run nightly notebook, compute KPIs, and email executive summary
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', background: 'var(--cds-layer-02)', padding: '0.875rem 1rem', borderRadius: '4px', borderLeft: '3px solid var(--ds-cyan)' }}>
              <strong>Classic Example:</strong> A bank aggregates all credit card payments settled today, updates customer accounts at midnight, and generates a daily fraud report.
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="streaming-pipeline"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--cds-layer-01)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              padding: '1.75rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Streaming Flow: Unbounded, Continuous Event Sequence (Δt = Milliseconds)
            </div>

            {/* Continuous Pulse Loop */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '1.5rem',
              }}
            >
              {['Reading #1 (28.1°)', 'Compute Mean', 'Reading #2 (28.3°)', 'Compute Mean', 'Reading #3 (28.5°)'].map(
                (item, idx) => {
                  const isEvent = idx % 2 === 0;
                  return (
                    <motion.div
                      key={idx}
                      animate={isEvent ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '4px',
                        background: isEvent ? 'rgba(165, 110, 255, 0.15)' : 'var(--cds-layer-02)',
                        border: isEvent ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: isEvent ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
                      }}
                    >
                      {item}
                    </motion.div>
                  );
                }
              )}
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', background: 'var(--cds-layer-02)', padding: '0.875rem 1rem', borderRadius: '4px', borderLeft: '3px solid var(--ds-purple)' }}>
              <strong>Classic Example:</strong> An intensive care unit (ICU) heart rate monitor alerts doctors within 200 milliseconds if a patient&apos;s pulse drops dangerously. You cannot wait for a midnight batch report!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Matrix Table */}
      <div
        style={{
          background: 'var(--cds-layer-01)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ background: 'var(--cds-layer-02)', borderBottom: '1px solid var(--ds-border-subtle)' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--ds-text-secondary)', fontWeight: 600 }}>Dimension</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--ds-cyan)', fontWeight: 600 }}>Batch Processing</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--ds-purple)', fontWeight: 600 }}>Streaming Data</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Data Scope</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Bounded (fixed historical snapshot)</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Unbounded (infinite ongoing sequence)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Decision Latency</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Hours to Days</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Milliseconds to Seconds</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Processing Unit</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Large datasets or file partitions</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Individual events or sliding windows</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Typical Tools</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Pandas, SQL queries, Cron jobs</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Kafka, WebSockets, sliding-window buffers</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
