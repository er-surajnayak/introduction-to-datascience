'use client';

import React from 'react';
import { Tag } from '@carbon/react';
import { Chemistry, Light } from '@carbon/icons-react';
import { ThinkingStrategy } from '@/types/lesson';

export function ThinkingApproach({ strategies }: { strategies: ThinkingStrategy[] }) {
  if (!strategies || strategies.length === 0) return null;

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
        <Tag type="warm-gray" size="md">
          Engineering Mindset
        </Tag>
        <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
          How to Think Like a Data Scientist
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {strategies.map((strat, idx) => (
          <div
            key={idx}
            className="ds-glass-panel"
            style={{
              padding: '1.75rem',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
            }}
          >
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 0.5rem 0' }}>
              &ldquo;{strat.question}&rdquo;
            </h3>

            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-cyan)', marginBottom: '0.875rem' }}>
              Scenario Context: {strat.context}
            </div>

            <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--ds-text-secondary)', margin: '0 0 1rem 0' }}>
              {strat.reasoning}
            </p>

            <div
              style={{
                padding: '0.75rem 1rem',
                background: 'var(--cds-layer-02)',
                borderLeft: '3px solid var(--ds-amber)',
                borderRadius: '0 3px 3px 0',
                fontSize: '0.875rem',
                color: 'var(--ds-text-primary)',
              }}
            >
              <strong style={{ color: 'var(--ds-amber)' }}>Rule of Thumb:</strong> {strat.ruleOfThumb}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
