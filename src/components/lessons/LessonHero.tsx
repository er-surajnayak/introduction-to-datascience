'use client';

import React from 'react';
import { Tag } from '@carbon/react';
import { Time, CheckmarkFilled, Bullhorn } from '@carbon/icons-react';
import { LessonContent } from '@/types/lesson';

export function LessonHero({ lesson }: { lesson: LessonContent }) {
  const difficultyTag = {
    Beginner: 'teal',
    Intermediate: 'purple',
    Advanced: 'magenta',
  }[lesson.difficulty] as 'teal' | 'purple' | 'magenta';

  return (
    <div
      style={{
        padding: '2.5rem 0 2rem 0',
        borderBottom: '1px solid var(--ds-border-subtle)',
        marginBottom: '2.5rem',
      }}
    >
      {/* Top Meta Tags */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span
          style={{
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--ds-cyan)',
            background: 'var(--ds-cyan-dim)',
            padding: '4px 8px',
            borderRadius: '2px',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          TOPIC {lesson.topicNumber}
        </span>
        <Tag type={difficultyTag} size="md">
          {lesson.difficulty}
        </Tag>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
          <Time size={14} /> ~{lesson.estimatedMinutes} mins
        </span>
      </div>

      {/* Title & Subtitle */}
      <h1
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 700,
          color: 'var(--ds-text-primary)',
          margin: '0 0 0.75rem 0',
          lineHeight: 1.15,
        }}
      >
        {lesson.title}
      </h1>

      <p
        style={{
          fontSize: '1.125rem',
          color: 'var(--ds-cyan)',
          fontWeight: 500,
          lineHeight: 1.5,
          margin: '0 0 2rem 0',
        }}
      >
        {lesson.subtitle}
      </p>

      {/* Learning Objectives Box */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          background: 'var(--cds-layer-01)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', textTransform: 'uppercase', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '0.75rem' }}>
          Key Learning Objectives
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {lesson.objectives.map((obj, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.45 }}>
              <CheckmarkFilled size={16} style={{ color: 'var(--ds-cyan)', flexShrink: 0, marginTop: '2px' }} />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
