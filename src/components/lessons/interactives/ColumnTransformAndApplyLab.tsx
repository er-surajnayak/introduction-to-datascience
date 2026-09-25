'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Function as FunctionIcon, Add, TrashCan, Branch, Reset } from '@carbon/icons-react';

interface StudentRecord {
  name: string;
  marks: number;
  bonus?: number;
  passed?: boolean;
  grade?: string;
  upperName?: string;
}

const BASE_DATA: StudentRecord[] = [
  { name: 'Rahul', marks: 85 },
  { name: 'Priya', marks: 91 },
  { name: 'Arjun', marks: 74 },
  { name: 'Sneha', marks: 95 },
  { name: 'Kabir', marks: 68 },
];

export function ColumnTransformAndApplyLab() {
  const [hasBonus, setHasBonus] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [hasNpWhereGrade, setHasNpWhereGrade] = useState(false);
  const [hasUpperName, setHasUpperName] = useState(false);
  const [droppedRowIndices, setDroppedRowIndices] = useState<number[]>([]);

  const handleReset = () => {
    setHasBonus(false);
    setHasPassed(false);
    setHasNpWhereGrade(false);
    setHasUpperName(false);
    setDroppedRowIndices([]);
  };

  const processedData = BASE_DATA.map((row) => {
    const item: StudentRecord = { ...row };
    if (hasBonus) item.bonus = row.marks + 5;
    if (hasPassed) item.passed = row.marks >= 75;
    if (hasNpWhereGrade) item.grade = row.marks >= 80 ? 'Distinction' : 'Standard';
    if (hasUpperName) item.upperName = row.name.toUpperCase();
    return item;
  }).filter((_, idx) => !droppedRowIndices.includes(idx));

  const toggleDropRow = (idx: number) => {
    if (droppedRowIndices.includes(idx)) {
      setDroppedRowIndices(droppedRowIndices.filter((i) => i !== idx));
    } else {
      setDroppedRowIndices([...droppedRowIndices, idx]);
    }
  };

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
          <FunctionIcon size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            Feature Engineering, np.where() & Column/Row Dropping
          </h3>
          <Tag type="purple" size="sm">Transformation &amp; Drop</Tag>
        </div>
        <Button kind="ghost" size="sm" renderIcon={Reset} onClick={handleReset}>
          Reset Pipeline
        </Button>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Data science often requires engineering new analytical attributes or trimming columns and rows. Use the interactive triggers below to watch new columns generate or rows drop with live Python syntax.
      </p>

      {/* Feature Engineering Triggers */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <Button
          size="sm"
          kind={hasBonus ? 'primary' : 'tertiary'}
          renderIcon={Add}
          onClick={() => setHasBonus(!hasBonus)}
        >
          {hasBonus ? '✓ df["Bonus"] = df["Marks"] + 5' : '+ Add df["Bonus"] (+5)'}
        </Button>
        <Button
          size="sm"
          kind={hasPassed ? 'primary' : 'tertiary'}
          renderIcon={Branch}
          onClick={() => setHasPassed(!hasPassed)}
        >
          {hasPassed ? '✓ df["Passed"] = df["Marks"] >= 75' : '+ Add df["Passed"] (>= 75)'}
        </Button>
        <Button
          size="sm"
          kind={hasNpWhereGrade ? 'primary' : 'tertiary'}
          renderIcon={Branch}
          onClick={() => setHasNpWhereGrade(!hasNpWhereGrade)}
        >
          {hasNpWhereGrade ? '✓ np.where(Marks >= 80, "Distinction", "Standard")' : '+ Add np.where() Grade'}
        </Button>
        <Button
          size="sm"
          kind={hasUpperName ? 'primary' : 'tertiary'}
          onClick={() => setHasUpperName(!hasUpperName)}
        >
          {hasUpperName ? '✓ df["Name"].str.upper()' : '+ Add .str.upper()'}
        </Button>
      </div>

      {/* Decision Tree Visual for np.where */}
      {hasNpWhereGrade && (
        <div
          style={{
            padding: '1rem',
            borderRadius: '4px',
            background: 'rgba(138, 63, 252, 0.08)',
            borderLeft: '4px solid var(--ds-purple)',
            marginBottom: '1.25rem',
            fontSize: '0.8125rem',
            fontFamily: 'var(--ds-font-mono)',
          }}
        >
          <strong style={{ color: 'var(--ds-purple)', display: 'block', marginBottom: '4px' }}>
            np.where(condition, value_if_true, value_if_false) Decision Flow:
          </strong>
          <div>
            Marks &gt;= 80 ➔ [YES ➔ &quot;Distinction&quot;] | [NO ➔ &quot;Standard&quot;]
          </div>
        </div>
      )}

      {/* Interactive Table with Row Drop actions */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1rem',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
            Transformed DataFrame (Showing {processedData.length} of {BASE_DATA.length} rows)
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Click [✕ Drop] to simulate df.drop(index, axis=0)</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--cds-layer-02)' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-muted)', fontSize: '0.75rem' }}>Index</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
              {hasUpperName && <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>UpperName (.str)</th>}
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Marks</th>
              {hasBonus && <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-emerald)' }}>Bonus (+5)</th>}
              {hasPassed && <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>Passed (bool)</th>}
              {hasNpWhereGrade && <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-purple)' }}>Grade (np.where)</th>}
              <th style={{ padding: '8px 12px', textAlign: 'center', color: '#da1e28' }}>Drop Row</th>
            </tr>
          </thead>
          <tbody>
            {BASE_DATA.map((row, idx) => {
              const isDropped = droppedRowIndices.includes(idx);
              return (
                <tr
                  key={row.name}
                  style={{
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    opacity: isDropped ? 0.35 : 1,
                    background: isDropped ? 'rgba(218, 30, 40, 0.05)' : 'transparent',
                    textDecoration: isDropped ? 'line-through' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>{idx}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.name}</td>
                  {hasUpperName && <td style={{ padding: '8px 12px', color: 'var(--ds-cyan)' }}>{row.name.toUpperCase()}</td>}
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>{row.marks}</td>
                  {hasBonus && <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', fontWeight: 700 }}>{row.marks + 5}</td>}
                  {hasPassed && <td style={{ padding: '8px 12px', fontWeight: 600 }}>{String(row.marks >= 75)}</td>}
                  {hasNpWhereGrade && <td style={{ padding: '8px 12px', color: 'var(--ds-purple)', fontWeight: 600 }}>{row.marks >= 80 ? 'Distinction' : 'Standard'}</td>}
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                    <Button
                      size="sm"
                      kind="ghost"
                      renderIcon={TrashCan}
                      onClick={() => toggleDropRow(idx)}
                      style={{ color: '#da1e28', padding: '4px' }}
                    >
                      {isDropped ? 'Restore' : 'Drop'}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Axis Reminder Box */}
      <div
        style={{
          padding: '0.875rem 1rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: 'var(--ds-text-primary)' }}>df.drop Axis Convention:</strong>{' '}
        <code>df.drop(index=[...], axis=0)</code> drops rows vertically; <code>df.drop(columns=[&quot;Bonus&quot;], axis=1)</code> drops feature columns horizontally.
      </div>
    </div>
  );
}
