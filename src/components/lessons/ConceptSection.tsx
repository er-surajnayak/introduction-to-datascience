'use client';

import React from 'react';
import { Tag } from '@carbon/react';
import { DataStructured, ArrowRight, CheckmarkOutline } from '@carbon/icons-react';
import { LessonContent } from '@/types/lesson';

// Helper to format inline code (backticks) and bold text
function formatInlineText(text: string): React.ReactNode {
  // Split by backticks for inline code
  const parts = text.split(/`([^`]+)`/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <code
          key={i}
          style={{
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.85em',
            padding: '2px 6px',
            borderRadius: '3px',
            background: 'var(--cds-layer-03, rgba(255,255,255,0.08))',
            color: 'var(--ds-cyan, #1192e8)',
            border: '1px solid var(--ds-border-subtle, rgba(255,255,255,0.1))',
          }}
        >
          {part}
        </code>
      );
    }

    // Check for bold within plain parts
    if (part.includes('**')) {
      const boldParts = part.split(/\*\*([^*]+)\*\*/g);
      return boldParts.map((bPart, bIdx) =>
        bIdx % 2 === 1 ? (
          <strong key={`${i}-${bIdx}`} style={{ color: 'var(--ds-text-primary)' }}>
            {bPart}
          </strong>
        ) : (
          bPart
        )
      );
    }

    return part;
  });
}

export function ConceptSection({
  coreConcept,
  technicalExplanation,
}: {
  coreConcept: LessonContent['coreConcept'];
  technicalExplanation: LessonContent['technicalExplanation'];
}) {
  // Parse deepDive into structured blocks
  const blocks = (technicalExplanation.deepDive || '').split('\n\n').filter((b) => b.trim().length > 0);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
          <DataStructured size={22} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            {technicalExplanation.title}
          </h3>
        </div>

        {/* Structured Deep Dive Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
          {blocks.map((block, bIdx) => {
            const trimmed = block.trim();

            // 1. Check if the block is a sequence / pipeline (contains arrows like →)
            if (trimmed.includes('→') && !trimmed.startsWith('•') && trimmed.split('→').length >= 4) {
              const steps = trimmed.split('→').map((s) => s.trim());
              return (
                <div
                  key={bIdx}
                  style={{
                    padding: '1.25rem',
                    background: 'var(--cds-layer-01)',
                    border: '1px solid var(--ds-cyan)',
                    borderRadius: '4px',
                    margin: '0.5rem 0',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--ds-font-mono)',
                      color: 'var(--ds-cyan)',
                      textTransform: 'uppercase',
                      marginBottom: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Data Ingestion Pipeline Sequence
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    {steps.map((step, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <div
                          style={{
                            padding: '0.4rem 0.75rem',
                            background: sIdx === steps.length - 1 ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
                            border: sIdx === steps.length - 1 ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                            borderRadius: '3px',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--ds-font-mono)',
                            fontWeight: 600,
                            color: sIdx === steps.length - 1 ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {step}
                        </div>
                        {sIdx < steps.length - 1 && (
                          <ArrowRight size={14} style={{ color: 'var(--ds-cyan)', flexShrink: 0 }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            }

            // 2. Check if the block is a numbered item like "1. The HTTP Request: ..."
            const numberedMatch = trimmed.match(/^(\d+)\.\s+([^:]+):([\s\S]*)$/);
            if (numberedMatch) {
              const num = numberedMatch[1];
              const title = numberedMatch[2];
              const rest = numberedMatch[3];

              // Check if rest contains bullet points like "• 200 OK: ..."
              const subLines = rest.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
              const hasBullets = subLines.some((l) => l.startsWith('•'));

              return (
                <div
                  key={bIdx}
                  style={{
                    padding: '1.25rem',
                    background: 'var(--cds-layer-01)',
                    border: '1px solid var(--ds-border-subtle)',
                    borderLeft: '4px solid var(--ds-cyan)',
                    borderRadius: '0 4px 4px 0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--ds-font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--ds-cyan)',
                        background: 'var(--ds-cyan-dim)',
                        padding: '2px 6px',
                        borderRadius: '2px',
                      }}
                    >
                      {num.padStart(2, '0')}
                    </span>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--ds-text-primary)',
                      }}
                    >
                      {title}
                    </h4>
                  </div>

                  {hasBullets ? (
                    <div>
                      {/* Text before bullets */}
                      {subLines
                        .filter((l) => !l.startsWith('•'))
                        .map((line, lIdx) => (
                          <p
                            key={lIdx}
                            style={{
                              fontSize: '0.875rem',
                              lineHeight: 1.55,
                              color: 'var(--ds-text-secondary)',
                              margin: '0 0 0.75rem 0',
                            }}
                          >
                            {formatInlineText(line)}
                          </p>
                        ))}

                      {/* Bullet items styled with tags */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                          gap: '8px',
                          marginTop: '0.5rem',
                        }}
                      >
                        {subLines
                          .filter((l) => l.startsWith('•'))
                          .map((bullet, bulletIdx) => {
                            const clean = bullet.replace(/^•\s*/, '');
                            const colonIdx = clean.indexOf(':');
                            const codePrefix = colonIdx !== -1 ? clean.substring(0, colonIdx) : clean;
                            const desc = colonIdx !== -1 ? clean.substring(colonIdx + 1) : '';

                            return (
                              <div
                                key={bulletIdx}
                                style={{
                                  padding: '0.625rem 0.875rem',
                                  background: 'var(--cds-layer-02)',
                                  borderRadius: '3px',
                                  border: '1px solid var(--ds-border-subtle)',
                                  fontSize: '0.8125rem',
                                  lineHeight: 1.45,
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: 'var(--ds-font-mono)',
                                    fontWeight: 700,
                                    color: codePrefix.includes('200')
                                      ? 'var(--ds-emerald)'
                                      : codePrefix.includes('429')
                                      ? 'var(--ds-purple)'
                                      : codePrefix.includes('500')
                                      ? '#fa4d56'
                                      : 'var(--ds-cyan)',
                                  }}
                                >
                                  {codePrefix}:
                                </span>{' '}
                                <span style={{ color: 'var(--ds-text-secondary)' }}>
                                  {formatInlineText(desc)}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <p
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.55,
                        color: 'var(--ds-text-secondary)',
                        margin: 0,
                      }}
                    >
                      {formatInlineText(rest.trim())}
                    </p>
                  )}
                </div>
              );
            }

            // 3. Regular paragraph
            return (
              <p
                key={bIdx}
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: 'var(--ds-text-secondary)',
                  margin: 0,
                }}
              >
                {formatInlineText(trimmed)}
              </p>
            );
          })}
        </div>

        {/* Key Architectural Takeaways Checklist */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              fontWeight: 600,
            }}
          >
            Key Architectural Takeaways
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {technicalExplanation.bulletPoints.map((bp, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '0.875rem',
                  color: 'var(--ds-text-secondary)',
                  lineHeight: 1.45,
                }}
              >
                <CheckmarkOutline size={16} style={{ color: 'var(--ds-emerald)', flexShrink: 0, marginTop: '2px' }} />
                <span>{formatInlineText(bp)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
