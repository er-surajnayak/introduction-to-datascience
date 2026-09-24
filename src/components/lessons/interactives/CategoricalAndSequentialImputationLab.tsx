'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Time,
  ArrowsVertical,
  CheckmarkFilled,
  WarningAlt,
  Help,
  Information,
  Restart,
} from '@carbon/icons-react';

export function CategoricalAndSequentialImputationLab() {
  const [activeTab, setActiveTab] = useState<'mode' | 'ffill_bfill'>('mode');
  const [modeApplied, setModeApplied] = useState(false);
  const [seqMode, setSeqMode] = useState<'raw' | 'ffill' | 'bfill'>('raw');

  // Mode Data
  const rawCities = ['Pune', 'Mumbai', 'Pune', null, 'Delhi'];

  // Time-Series Data
  const rawTimeSeries = [
    { time: '10:00 AM', raw: 28.0 },
    { time: '10:01 AM', raw: null },
    { time: '10:02 AM', raw: 29.0 },
    { time: '10:03 AM', raw: null },
    { time: '10:04 AM', raw: 30.5 },
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
          <Tag type="teal" size="md">
            Interactive 06
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Categorical & Time-Series Imputation Lab
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('mode')}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '2px',
              border: activeTab === 'mode' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activeTab === 'mode' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: activeTab === 'mode' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              cursor: 'pointer',
            }}
          >
            1. Mode (Categorical)
          </button>
          <button
            onClick={() => setActiveTab('ffill_bfill')}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '2px',
              border: activeTab === 'ffill_bfill' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activeTab === 'ffill_bfill' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: activeTab === 'ffill_bfill' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              cursor: 'pointer',
            }}
          >
            2. Forward & Backward Fill (Time Series)
          </button>
        </div>
      </div>

      {activeTab === 'mode' ? (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Mode Imputation: Replacing Missing Categorical Labels
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            For non-numerical categorical columns (e.g. city names, departments), mathematical averages do not exist. We replace missing values with the <strong>Mode</strong> (the most frequently observed category).
          </p>

          <div
            style={{
              padding: '1.25rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Categorical Array: delivery_city
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {rawCities.map((c, i) => {
                const isImputed = c === null && modeApplied;
                return (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px',
                      background: isImputed
                        ? 'var(--ds-emerald-dim)'
                        : c === null
                        ? 'rgba(218, 30, 40, 0.15)'
                        : 'var(--ds-bg-surface)',
                      border: isImputed
                        ? '2px solid var(--ds-emerald)'
                        : c === null
                        ? '1px solid #da1e28'
                        : '1px solid var(--ds-border-subtle)',
                      borderRadius: '4px',
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: isImputed
                        ? 'var(--ds-emerald)'
                        : c === null
                        ? '#da1e28'
                        : 'var(--ds-text-primary)',
                    }}
                  >
                    {isImputed ? 'Pune (Mode)' : c === null ? 'NaN' : c}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                size="md"
                kind="primary"
                onClick={() => setModeApplied(true)}
                disabled={modeApplied}
              >
                Apply Mode Imputation: df[&apos;city&apos;].fillna(mode)
              </Button>
              {modeApplied && (
                <Button size="md" kind="ghost" renderIcon={Restart} onClick={() => setModeApplied(false)}>
                  Reset
                </Button>
              )}
            </div>
          </div>

          <div
            style={{
              padding: '10px 14px',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              borderLeft: '4px solid var(--ds-amber)',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <strong>Engineering Warning:</strong> Mode imputation increases the dominance of the most common category (e.g. making Pune even more frequent). If a category has high missingness (&gt;20%), consider creating an explicit <code>&quot;Unknown&quot;</code> category instead.
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Forward Fill (ffill) & Backward Fill (bfill) for Time Series
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            In sequentially ordered feeds (such as IoT weather telemetry or stock ticks), time creates continuity. <strong>ffill()</strong> carries the last known reading forward; <strong>bfill()</strong> propagates the next known reading backward.
          </p>

          <div
            style={{
              padding: '1.25rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSeqMode('raw')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  border: seqMode === 'raw' ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                  background: seqMode === 'raw' ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface)',
                  color: seqMode === 'raw' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                  cursor: 'pointer',
                }}
              >
                Raw Sensor Data (NaNs)
              </button>
              <button
                onClick={() => setSeqMode('ffill')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  border: seqMode === 'ffill' ? '2px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
                  background: seqMode === 'ffill' ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface)',
                  color: seqMode === 'ffill' ? 'var(--ds-emerald)' : 'var(--ds-text-primary)',
                  cursor: 'pointer',
                }}
              >
                df.ffill() (Forward Fill)
              </button>
              <button
                onClick={() => setSeqMode('bfill')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  border: seqMode === 'bfill' ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                  background: seqMode === 'bfill' ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface)',
                  color: seqMode === 'bfill' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
                  cursor: 'pointer',
                }}
              >
                df.bfill() (Backward Fill)
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
                <thead>
                  <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
                    <th style={{ padding: '8px 12px', color: 'var(--ds-text-primary)' }}>Timestamp</th>
                    <th style={{ padding: '8px 12px', color: 'var(--ds-cyan)' }}>Observed Temperature (°C)</th>
                    <th style={{ padding: '8px 12px', color: 'var(--ds-emerald)' }}>Resolved State</th>
                  </tr>
                </thead>
                <tbody>
                  {rawTimeSeries.map((row, idx) => {
                    let resolvedVal: number | string = row.raw !== null ? `${row.raw}°C` : 'NaN';
                    let isPropagated = false;

                    if (seqMode === 'ffill') {
                      if (idx === 1) {
                        resolvedVal = '28.0°C (from 10:00)';
                        isPropagated = true;
                      }
                      if (idx === 3) {
                        resolvedVal = '29.0°C (from 10:02)';
                        isPropagated = true;
                      }
                    } else if (seqMode === 'bfill') {
                      if (idx === 1) {
                        resolvedVal = '29.0°C (from 10:02)';
                        isPropagated = true;
                      }
                      if (idx === 3) {
                        resolvedVal = '30.5°C (from 10:04)';
                        isPropagated = true;
                      }
                    }

                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                        <td style={{ padding: '8px 12px', color: 'var(--ds-text-secondary)' }}>{row.time}</td>
                        <td style={{ padding: '8px 12px', color: row.raw === null ? '#da1e28' : 'var(--ds-text-primary)' }}>
                          {row.raw === null ? 'NaN' : `${row.raw}°C`}
                        </td>
                        <td style={{ padding: '8px 12px', color: isPropagated ? (seqMode === 'ffill' ? 'var(--ds-emerald)' : 'var(--ds-purple)') : 'var(--ds-text-primary)', fontWeight: isPropagated ? 600 : 400 }}>
                          {resolvedVal}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

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
            <strong>Time-Series Rule:</strong> Use forward or backward fill <em>only</em> when observations have strict chronological continuity. Using ffill on unordered tabular customer records is completely invalid because row order in a spreadsheet is arbitrary.
          </div>
        </div>
      )}
    </div>
  );
}
