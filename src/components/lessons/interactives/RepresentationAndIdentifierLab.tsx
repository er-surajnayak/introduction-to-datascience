'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  WarningAlt,
  CheckmarkFilled,
  Calculator,
  Help,
  Information,
} from '@carbon/icons-react';

export function RepresentationAndIdentifierLab() {
  const [activeTab, setActiveTab] = useState<'representation' | 'identifier'>('representation');
  const [concatDemoVal, setConcatDemoVal] = useState<'number' | 'string'>('string');
  const [avgTriggered, setAvgTriggered] = useState(false);

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
          <Tag type="red" size="md">
            Interactive 09
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Representation & Semantic Meaning Lab
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('representation')}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '2px',
              border: activeTab === 'representation' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activeTab === 'representation' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: activeTab === 'representation' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              cursor: 'pointer',
            }}
          >
            1. Same Data, Different Format
          </button>
          <button
            onClick={() => setActiveTab('identifier')}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '2px',
              border: activeTab === 'identifier' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activeTab === 'identifier' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: activeTab === 'identifier' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              cursor: 'pointer',
            }}
          >
            2. Identifier vs Measurement
          </button>
        </div>
      </div>

      {activeTab === 'representation' ? (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Same Data, Radically Different Computational Behavior
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            A value like <strong>21</strong> can exist as an integer (<code>21</code>), a string (<code>&quot;21&quot;</code>), or a float (<code>21.0</code>). In code, their behavior diverges completely. Toggle below to witness the difference.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '14px',
              marginBottom: '1.5rem',
            }}
          >
            {/* Box A: Arithmetic vs Concatenation */}
            <div
              style={{
                padding: '1.25rem',
                background: 'var(--ds-bg-surface-elevated)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
                Python <code>+</code> Operator Behavior
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <button
                  onClick={() => setConcatDemoVal('string')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    borderRadius: '4px',
                    border: concatDemoVal === 'string' ? '2px solid #da1e28' : '1px solid var(--ds-border-strong)',
                    background: concatDemoVal === 'string' ? 'rgba(218, 30, 40, 0.15)' : 'var(--ds-bg-surface)',
                    color: concatDemoVal === 'string' ? '#da1e28' : 'var(--ds-text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  String: &quot;21&quot; + &quot;5&quot;
                </button>
                <button
                  onClick={() => setConcatDemoVal('number')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    borderRadius: '4px',
                    border: concatDemoVal === 'number' ? '2px solid var(--ds-emerald)' : '1px solid var(--ds-border-strong)',
                    background: concatDemoVal === 'number' ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface)',
                    color: concatDemoVal === 'number' ? 'var(--ds-emerald)' : 'var(--ds-text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  Integer: 21 + 5
                </button>
              </div>

              <div
                style={{
                  padding: '12px',
                  background: 'var(--ds-bg-core)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  color: concatDemoVal === 'string' ? '#da1e28' : 'var(--ds-emerald)',
                }}
              >
                {concatDemoVal === 'string' ? (
                  <>
                    &quot;21&quot; + &quot;5&quot; ➔ <strong>&quot;215&quot; (Silent Text Concatenation Bug!)</strong>
                  </>
                ) : (
                  <>
                    21 + 5 ➔ <strong>26 (Mathematical Summation)</strong>
                  </>
                )}
              </div>
            </div>

            {/* Box B: Scraped String vs Clean Number */}
            <div
              style={{
                padding: '1.25rem',
                background: 'var(--ds-bg-surface-elevated)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
                Scraped Formatting Artifacts
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '8px' }}>
                Web scrapes often deliver: <code style={{ color: 'var(--ds-cyan)' }}>&quot;₹45,000&quot;</code>
              </div>
              <div
                style={{
                  padding: '10px 12px',
                  background: 'var(--ds-bg-core)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--ds-text-muted)',
                  lineHeight: 1.5,
                }}
              >
                # Python Error if unconverted:
                <br />
                <span style={{ color: '#da1e28' }}>&quot;₹45,000&quot; * 0.90 ➔ TypeError: can&apos;t multiply sequence</span>
                <br />
                <span style={{ color: 'var(--ds-emerald)' }}>float(&quot;₹45,000&quot;.replace(&apos;₹&apos;,&apos;&apos;).replace(&apos;,&apos;,&apos;&apos;)) ➔ 45000.0</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Identifier vs Measurement: The Deadly Averaging Trap
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Suppose a dataset contains <code>student_id = 101</code> and <code>marks = 101</code>. Both are encoded as positive integers. But taking statistics on identifiers produces meaningless nonsense!
          </p>

          <div
            style={{
              padding: '1.25rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
                    <th style={{ padding: '8px 12px', color: 'var(--ds-text-primary)' }}>Student Name</th>
                    <th style={{ padding: '8px 12px', color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>student_id (Identifier)</th>
                    <th style={{ padding: '8px 12px', color: 'var(--ds-emerald)', fontFamily: 'var(--ds-font-mono)' }}>marks (Measurement)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                    <td style={{ padding: '8px 12px' }}>Aarav</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>101</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>85</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                    <td style={{ padding: '8px 12px' }}>Priya</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>102</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>92</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                    <td style={{ padding: '8px 12px' }}>Rohan</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>103</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>78</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Button size="sm" kind="primary" renderIcon={Calculator} onClick={() => setAvgTriggered(true)}>
              Calculate Mean of Both Columns
            </Button>

            {avgTriggered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '12px',
                }}
              >
                <div style={{ padding: '10px 12px', background: 'rgba(218, 30, 40, 0.1)', border: '1px solid #da1e28', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#da1e28' }}>
                    df[&apos;student_id&apos;].mean() = 102.0
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-primary)', marginTop: '4px' }}>
                    ❌ <strong>Meaningless Garbage!</strong> Student 102.0 does not exist. An identifier is a discrete label; averaging IDs has zero statistical validity.
                  </div>
                </div>

                <div style={{ padding: '10px 12px', background: 'var(--ds-emerald-dim)', border: '1px solid var(--ds-emerald)', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-emerald)' }}>
                    df[&apos;marks&apos;].mean() = 85.0
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-primary)', marginTop: '4px' }}>
                    ✓ <strong>Valid Descriptive Statistic!</strong> 85.0 represents the true average academic performance of the cohort.
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      <div
        style={{
          padding: '1rem 1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderLeft: '4px solid var(--ds-amber)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <WarningAlt size={18} style={{ color: 'var(--ds-amber)', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
          <strong>Core Rule:</strong> The semantic meaning of a column dictates valid mathematics, not its low-level storage data type. Always verify if a numeric column is an identifier before computing descriptive statistics.
        </div>
      </div>
    </div>
  );
}
