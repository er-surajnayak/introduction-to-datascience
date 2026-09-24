'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  View,
  CheckmarkFilled,
  WarningAlt,
  Help,
  Information,
  Calculator,
} from '@carbon/icons-react';

export function ObservedVsImputedVisualizer() {
  const [showImputed, setShowImputed] = useState(true);

  const records = [
    { id: 1, label: 'Patient A', rawVal: 10, imputedVal: 10, isObserved: true },
    { id: 2, label: 'Patient B', rawVal: 20, imputedVal: 20, isObserved: true },
    { id: 3, label: 'Patient C', rawVal: 30, imputedVal: 30, isObserved: true },
    { id: 4, label: 'Patient D', rawVal: null, imputedVal: 25, isObserved: false },
    { id: 5, label: 'Patient E', rawVal: 40, imputedVal: 40, isObserved: true },
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
          <Tag type="green" size="md">
            Interactive 08
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Observed vs. Imputed Visualizer
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="sm"
            kind={!showImputed ? 'primary' : 'secondary'}
            onClick={() => setShowImputed(false)}
          >
            Show Raw Observed (with NaNs)
          </Button>
          <Button
            size="sm"
            kind={showImputed ? 'primary' : 'secondary'}
            onClick={() => setShowImputed(true)}
          >
            Show Imputed Dataset
          </Button>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Observed Reality vs. Synthetic Estimates: Imputation Changes the Data
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Once a dataset is imputed, all cells are filled with numbers and look complete. However, <strong>imputed values are statistical estimates, not empirical ground truths</strong>. Toggle below to visually track the provenance of each data point.
      </p>

      {/* Visual Table */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
            <thead>
              <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
                <th style={{ padding: '10px 14px', color: 'var(--ds-text-primary)' }}>Subject</th>
                <th style={{ padding: '10px 14px', color: 'var(--ds-cyan)' }}>Value (Recovery Days)</th>
                <th style={{ padding: '10px 14px', color: 'var(--ds-text-primary)' }}>Epistemic Status</th>
                <th style={{ padding: '10px 14px', color: 'var(--ds-text-primary)' }}>Provenance Description</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => {
                const currentVal = showImputed ? r.imputedVal : r.rawVal;
                return (
                  <tr
                    key={r.id}
                    style={{
                      borderBottom: '1px solid var(--ds-border-subtle)',
                      background: showImputed && !r.isObserved ? 'rgba(241, 194, 27, 0.12)' : 'transparent',
                    }}
                  >
                    <td style={{ padding: '10px 14px', color: 'var(--ds-text-primary)' }}>{r.label}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: currentVal === null ? '#da1e28' : !r.isObserved ? 'var(--ds-amber)' : 'var(--ds-text-primary)' }}>
                      {currentVal === null ? 'NaN' : `${currentVal} days`}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      {r.isObserved ? (
                        <Tag type="green" size="sm">
                          [✓] OBSERVED
                        </Tag>
                      ) : showImputed ? (
                        <Tag type="warm-gray" size="sm">
                          [★] IMPUTED (ESTIMATE)
                        </Tag>
                      ) : (
                        <Tag type="red" size="sm">
                          [✕] MISSING (NaN)
                        </Tag>
                      )}
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: '0.75rem', color: 'var(--ds-text-secondary)', fontFamily: 'var(--ds-font-sans)' }}>
                      {r.isObserved
                        ? 'Direct physical clinical observation measured in hospital.'
                        : showImputed
                        ? 'Synthetically calculated mean of observed values ((10+20+30+40)/4 = 25).'
                        : 'Unrecorded / dropped out of follow-up.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Statistical Variance Impact */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '10px 12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-cyan)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '2px' }}>
              Original Observed Variance (n=4)
            </div>
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)' }}>
              Var = 166.7 (Std = 12.91 days)
            </div>
          </div>

          <div style={{ padding: '10px 12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-amber)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-amber)', marginBottom: '2px' }}>
              Post-Imputation Variance (n=5)
            </div>
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)' }}>
              Var = 125.0 (Std = 11.18 days) ➔ <strong>Artificially Deflated!</strong>
            </div>
          </div>
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
        <strong>The Variance Reduction Trap:</strong> Mean imputation always pulls variance and standard deviation downward because inserting the exact mean value adds zero distance from the mean. Be aware of this side effect when evaluating statistical hypothesis tests.
      </div>
    </div>
  );
}
