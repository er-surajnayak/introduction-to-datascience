'use client';

import React from 'react';
import { Tag } from '@carbon/react';
import { WarningAlt, CheckmarkOutline } from '@carbon/icons-react';
import { CommonMistake } from '@/types/lesson';

export function CommonMistakes({ mistakes }: { mistakes: CommonMistake[] }) {
  if (!mistakes || mistakes.length === 0) return null;

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
        <Tag type="red" size="md">
          Beginner Traps
        </Tag>
        <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
          Common Pitfalls & Fixes
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {mistakes.map((item, idx) => (
          <div
            key={idx}
            className="ds-glass-panel"
            style={{
              padding: '1.5rem',
              borderRadius: '4px',
              borderLeft: '4px solid #da1e28',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <WarningAlt size={18} style={{ color: '#fa4d56', flexShrink: 0 }} />
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
                {item.mistake}
              </h3>
            </div>

            <p style={{ fontSize: '0.875rem', lineHeight: 1.55, color: 'var(--ds-text-secondary)', margin: '0 0 1rem 0' }}>
              <strong>Why it fails:</strong> {item.why}
            </p>

            <div
              style={{
                padding: '0.875rem 1rem',
                background: 'var(--cds-layer-02)',
                border: '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '0.875rem',
                color: 'var(--ds-text-secondary)',
              }}
            >
              <CheckmarkOutline size={16} style={{ color: 'var(--ds-emerald)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--ds-emerald)' }}>The Fix:</strong> {item.correction}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
