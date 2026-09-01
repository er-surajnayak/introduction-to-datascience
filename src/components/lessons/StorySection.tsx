'use client';

import React from 'react';
import { Tag } from '@carbon/react';
import { Idea, Globe } from '@carbon/icons-react';
import { LessonContent } from '@/types/lesson';

export function StorySection({ hook }: { hook: LessonContent['hook'] }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        <Tag type="purple" size="md">
          The Intuition Hook
        </Tag>
        <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
          Real-World Mental Model
        </span>
      </div>

      <div
        className="ds-glass-panel"
        style={{
          padding: '1.75rem',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
        }}
      >
        <h2 style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 1rem 0' }}>
          {hook.title}
        </h2>

        <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--ds-text-secondary)', marginBottom: '1.5rem' }}>
          {hook.story}
        </p>

        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'var(--cds-layer-02)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <Idea size={20} style={{ color: 'var(--ds-amber)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'var(--ds-text-primary)', fontSize: '0.875rem' }}>The Core Analogy:</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              {hook.analogy}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: 'var(--ds-text-muted)', lineHeight: 1.45 }}>
          <Globe size={16} style={{ color: 'var(--ds-teal)', flexShrink: 0, marginTop: '2px' }} />
          <span>
            <strong style={{ color: 'var(--ds-text-primary)' }}>Industry Impact:</strong> {hook.realWorldImpact}
          </span>
        </div>
      </div>
    </section>
  );
}
