'use client';

import React from 'react';
import { Tag } from '@carbon/react';
import { DataStructured, Information, CheckmarkOutline } from '@carbon/icons-react';
import { LessonContent } from '@/types/lesson';

export function ConceptSection({
  coreConcept,
  technicalExplanation,
}: {
  coreConcept: LessonContent['coreConcept'];
  technicalExplanation: LessonContent['technicalExplanation'];
}) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      {/* Core Concept Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <Tag type="cyan" size="md" style={{ marginBottom: '0.75rem' }}>
          Core Concept
        </Tag>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 0.75rem 0' }}>
          {coreConcept.headline}
        </h2>
        <p style={{ fontSize: '1.0625rem', lineHeight: 1.6, color: 'var(--ds-text-secondary)', margin: 0 }}>
          {coreConcept.explanation}
        </p>
      </div>

      {/* Key Pillars Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {coreConcept.keyPillars.map((pillar, idx) => (
          <div
            key={idx}
            style={{
              padding: '1.5rem',
              background: 'var(--cds-layer-01)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--ds-cyan)',
                  padding: '2px 6px',
                  background: 'var(--ds-cyan-dim)',
                  borderRadius: '2px',
                }}
              >
                0{idx + 1}
              </span>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
                {pillar.title}
              </h3>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--ds-text-secondary)', margin: 0, flexGrow: 1 }}>
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* Technical Deep Dive Panel */}
      <div
        style={{
          padding: '1.75rem',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
          <DataStructured size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            {technicalExplanation.title}
          </h3>
        </div>

        <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--ds-text-secondary)', marginBottom: '1.25rem' }}>
          {technicalExplanation.deepDive}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {technicalExplanation.bulletPoints.map((bp, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.45 }}>
              <span style={{ color: 'var(--ds-cyan)', fontWeight: 700 }}>•</span>
              <span>{bp}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
