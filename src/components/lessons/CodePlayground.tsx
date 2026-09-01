'use client';

import React, { useState } from 'react';
import { Button, Tag } from '@carbon/react';
import { Copy, Checkmark, Code } from '@carbon/icons-react';
import { CodeExample } from '@/types/lesson';

export function CodePlayground({ examples }: { examples: CodeExample[] }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
        <Tag type="teal" size="md">
          Python Implementation
        </Tag>
        <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
          Hands-On Code Lab
        </span>
      </div>

      {examples.map((example, idx) => (
        <div key={idx} style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 0.5rem 0' }}>
            {example.title}
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
            {example.description}
          </p>

          {/* Code Window Container */}
          <div className="ds-code-window" style={{ marginBottom: '1rem' }}>
            <div className="ds-code-header">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Code size={16} /> {example.language.toUpperCase()}
              </span>
              <Button
                kind="ghost"
                size="sm"
                hasIconOnly
                renderIcon={copiedIdx === idx ? Checkmark : Copy}
                iconDescription={copiedIdx === idx ? 'Copied to clipboard' : 'Copy code'}
                onClick={() => handleCopy(example.code, idx)}
              />
            </div>

            <pre className="ds-code-content" style={{ margin: 0, padding: '1.25rem' }}>
              <code>{example.code}</code>
            </pre>

            {example.output && (
              <div
                style={{
                  borderTop: '1px solid var(--ds-border-subtle)',
                  padding: '0.875rem 1.25rem',
                  background: 'var(--cds-layer-02)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--ds-cyan)',
                }}
              >
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                  Execution Output
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{example.output}</div>
              </div>
            )}
          </div>

          {/* Line by Line Deep Dive */}
          {example.lineExplanations.length > 0 && (
            <div
              style={{
                padding: '1rem 1.25rem',
                background: 'var(--cds-layer-02)',
                border: '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Line-by-Line Code Breakdown
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {example.lineExplanations.map((expl, i) => (
                  <li key={i} style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.45 }}>
                    <strong style={{ color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)', marginRight: '6px' }}>
                      Line {expl.line}:
                    </strong>
                    {expl.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
