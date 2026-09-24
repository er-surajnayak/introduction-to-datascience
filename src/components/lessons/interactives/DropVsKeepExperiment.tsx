'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  TrashCan,
  WarningAlt,
  CheckmarkFilled,
  Help,
  Information,
  DataEnrichment,
} from '@carbon/icons-react';

interface DropScenario {
  id: string;
  name: string;
  totalRows: number;
  columnsCount: number;
  missingRowsCount: number;
  missingPct: number;
  explanation: string;
  isSafeToDrop: boolean;
}

const dropScenarios: DropScenario[] = [
  {
    id: 'minimal_mcar',
    name: 'Scenario A: Large Dataset, Minimal Dropouts (MCAR)',
    totalRows: 1000,
    columnsCount: 5,
    missingRowsCount: 20,
    missingPct: 2.0,
    explanation:
      'With 1,000 rows and only 20 missing cells (2%), executing dropna() leaves 980 full records. The statistical power and distribution are largely unharmed.',
    isSafeToDrop: true,
  },
  {
    id: 'heavy_missingness',
    name: 'Scenario B: Small Dataset, Heavy Missingness',
    totalRows: 100,
    columnsCount: 5,
    missingRowsCount: 60,
    missingPct: 60.0,
    explanation:
      'With 100 rows and 60 missing cells, dropna() discards 60% of your entire dataset! You are left with only 40 records, destroying statistical reliability.',
    isSafeToDrop: false,
  },
  {
    id: 'compounding_columns',
    name: 'Scenario C: Wide Table Compounding Effect (Listwise Deletion)',
    totalRows: 1000,
    columnsCount: 50,
    missingRowsCount: 636,
    missingPct: 63.6,
    explanation:
      'The Compounding Trap: Even if each of the 50 columns is missing only 2% of data, dropping any row with at least 1 NaN wipes out 636 rows (63.6% of your entire dataset)!',
    isSafeToDrop: false,
  },
];

export function DropVsKeepExperiment() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('minimal_mcar');
  const [isDropped, setIsDropped] = useState(false);

  const scenario = dropScenarios.find((s) => s.id === selectedScenarioId) || dropScenarios[0];
  const remainingRows = isDropped ? scenario.totalRows - scenario.missingRowsCount : scenario.totalRows;
  const retentionPct = ((remainingRows / scenario.totalRows) * 100).toFixed(1);

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
          <Tag type="magenta" size="md">
            Interactive 04
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Drop vs. Keep Experiment
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Sample Loss & Bias Simulator
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        The Danger of Blind Deletion: What Happens When You Run dropna()?
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Many beginners instinctively type <code>df.dropna()</code> to eliminate all NaNs. Simulate the three real-world scenarios below to see how listwise deletion can secretly destroy over 60% of your data.
      </p>

      {/* Scenario Selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {dropScenarios.map((sc) => {
          const isSelected = sc.id === selectedScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioId(sc.id);
                setIsDropped(false);
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              {sc.name.split(':')[0]}
            </button>
          );
        })}
      </div>

      {/* Simulator Display Card */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              {scenario.name}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
              Initial Dataset: {scenario.totalRows} Rows × {scenario.columnsCount} Columns ({scenario.missingPct}% Missingness)
            </div>
          </div>

          <Button
            size="md"
            kind={isDropped ? 'secondary' : 'danger'}
            renderIcon={isDropped ? DataEnrichment : TrashCan}
            onClick={() => setIsDropped(!isDropped)}
          >
            {isDropped ? 'Undo dropna() (Restore Raw Rows)' : 'Execute df.dropna()'}
          </Button>
        </div>

        {/* Data Retention Gauge */}
        <div style={{ margin: '1.25rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8125rem' }}>
            <span style={{ color: 'var(--ds-text-secondary)' }}>
              Rows Preserved: <strong>{remainingRows} / {scenario.totalRows}</strong> ({retentionPct}%)
            </span>
            <span style={{ color: isDropped ? (scenario.isSafeToDrop ? 'var(--ds-emerald)' : '#da1e28') : 'var(--ds-text-muted)', fontWeight: 600 }}>
              {isDropped ? (scenario.isSafeToDrop ? '✓ Safe Sample Retention' : '⚠️ Severe Data Loss!') : 'State: Raw Data'}
            </span>
          </div>

          <div
            style={{
              height: '12px',
              background: 'var(--ds-bg-core)',
              borderRadius: '6px',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <motion.div
              initial={false}
              animate={{ width: `${retentionPct}%` }}
              style={{
                background: scenario.isSafeToDrop ? 'var(--ds-emerald)' : '#da1e28',
                height: '100%',
              }}
            />
          </div>
        </div>

        <div
          style={{
            padding: '12px 14px',
            background: 'var(--ds-bg-surface)',
            borderRadius: '4px',
            borderLeft: `4px solid ${scenario.isSafeToDrop ? 'var(--ds-emerald)' : '#da1e28'}`,
            fontSize: '0.8125rem',
            color: 'var(--ds-text-secondary)',
            lineHeight: 1.5,
          }}
        >
          <strong>Impact Analysis:</strong> {scenario.explanation}
        </div>
      </div>
    </div>
  );
}
