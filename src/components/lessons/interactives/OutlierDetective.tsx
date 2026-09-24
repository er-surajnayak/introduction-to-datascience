'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { WarningAlt, CheckmarkFilled, Information, View, Restart } from '@carbon/icons-react';

interface ScoreItem {
  id: number;
  value: number;
  isOutlier: boolean;
  type: 'normal' | 'high_outlier' | 'low_outlier';
  explanation: string;
}

const initialScores: ScoreItem[] = [
  { id: 1, value: 72, isOutlier: false, type: 'normal', explanation: 'Within the expected peer cluster (72–81 marks).' },
  { id: 2, value: 75, isOutlier: false, type: 'normal', explanation: 'Typical score near the class median.' },
  { id: 3, value: 78, isOutlier: false, type: 'normal', explanation: 'Standard solid engineering performance.' },
  { id: 4, value: 81, isOutlier: false, type: 'normal', explanation: 'Upper end of standard cluster.' },
  { id: 5, value: 79, isOutlier: false, type: 'normal', explanation: 'Typical score near the class median.' },
  { id: 6, value: 77, isOutlier: false, type: 'normal', explanation: 'Typical score near the class median.' },
  { id: 7, value: 74, isOutlier: false, type: 'normal', explanation: 'Within standard peer range.' },
  { id: 8, value: 76, isOutlier: false, type: 'normal', explanation: 'Standard solid engineering performance.' },
  { id: 9, value: 95, isOutlier: true, type: 'high_outlier', explanation: 'High Outlier (+19 above mean): Student 9 is a state competitive programming champion who aced all bonus sections. Valid extreme!' },
  { id: 10, value: 3, isOutlier: true, type: 'low_outlier', explanation: 'Low Outlier (-73 below mean): Student 10 suffered a medical emergency 10 min into the exam and left early. Real event, not a typo!' },
];

export function OutlierDetective() {
  const [selectedId, setSelectedId] = useState<number | null>(10);
  const [revealedAll, setRevealedAll] = useState(false);

  const selectedItem = initialScores.find((s) => s.id === selectedId);

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Interactive Lab 2.5.1
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Visual Anomaly Spotter
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            kind="ghost"
            size="sm"
            renderIcon={revealedAll ? Restart : View}
            onClick={() => setRevealedAll(!revealedAll)}
          >
            {revealedAll ? 'Hide Diagnostics' : 'Inspect All Values'}
          </Button>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Outlier Detective: Spotting Anomalous Observations
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Look at the 10 student exam scores below. Most values cluster tightly between <strong>72 and 81</strong>.
        Click on individual cells to investigate their statistical behavior and real-world origin.
      </p>

      {/* Grid of Scores */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(64px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {initialScores.map((item) => {
          const isSelected = selectedId === item.id;
          const isOutlier = item.isOutlier;

          let borderColor = 'var(--ds-border-subtle)';
          let bg = 'var(--ds-bg-core)';
          let textColor = 'var(--ds-text-primary)';

          if (isSelected) {
            borderColor = 'var(--ds-cyan)';
            bg = 'var(--ds-cyan-dim)';
          } else if (revealedAll && isOutlier) {
            borderColor = item.type === 'high_outlier' ? 'var(--ds-purple)' : 'var(--ds-amber)';
            bg = item.type === 'high_outlier' ? 'rgba(165, 110, 255, 0.12)' : 'rgba(255, 131, 43, 0.12)';
          }

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              style={{
                padding: '12px 6px',
                borderRadius: '4px',
                border: `2px solid ${borderColor}`,
                background: bg,
                color: textColor,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                S#{item.id}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)' }}>
                {item.value}
              </div>
              {item.isOutlier && (revealedAll || isSelected) && (
                <div style={{ marginTop: '4px' }}>
                  <Tag type={item.type === 'high_outlier' ? 'purple' : 'warm-gray'} size="sm">
                    {item.type === 'high_outlier' ? 'High' : 'Low'}
                  </Tag>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Diagnostic Inspector Card */}
      {selectedItem && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '4px',
            background: 'var(--cds-layer-02)',
            borderLeft: `4px solid ${
              selectedItem.isOutlier ? (selectedItem.type === 'high_outlier' ? 'var(--ds-purple)' : 'var(--ds-amber)') : 'var(--ds-emerald)'
            }`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                Student #{selectedItem.id} — Score: {selectedItem.value} Marks
              </span>
              <Tag type={selectedItem.isOutlier ? 'red' : 'green'} size="md">
                {selectedItem.isOutlier ? 'Potential Outlier' : 'In-Distribution Normal'}
              </Tag>
            </div>
            <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
              Class Mean: 70.6 | Median: 76.5
            </span>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            {selectedItem.explanation}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              color: selectedItem.isOutlier ? 'var(--ds-amber)' : 'var(--ds-emerald)',
              fontWeight: 500,
            }}
          >
            {selectedItem.isOutlier ? (
              <>
                <WarningAlt size={16} />
                <span>Pedagogical Lesson: Do NOT delete this record! It represents a real human event.</span>
              </>
            ) : (
              <>
                <CheckmarkFilled size={16} />
                <span>Standard point inside typical range (72–81). No investigation required.</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
