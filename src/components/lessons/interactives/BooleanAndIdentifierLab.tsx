'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { WarningAlt, CheckmarkFilled, Information } from '@carbon/icons-react';

export function BooleanAndIdentifierLab() {
  const [activeTab, setActiveTab] = useState<'boolean' | 'identifier'>('boolean');
  const [isBoolMapped, setIsBoolMapped] = useState<boolean>(false);
  const [convertedIdToInt, setConvertedIdToInt] = useState<boolean>(false);

  const rawBooleans = ['Yes', 'yes', 'Y', 'True', 'TRUE', '1', 'No', 'no', 'N', 'False', '0'];

  const boolMap: Record<string, boolean> = {
    'Yes': true, 'yes': true, 'Y': true, 'True': true, 'TRUE': true, '1': true,
    'No': false, 'no': false, 'N': false, 'False': false, '0': false,
  };

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
          <Tag type="green" size="md">
            Interactive Lab 2.6.6
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Booleans & Preserving Critical Zeros
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('boolean')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: activeTab === 'boolean' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activeTab === 'boolean' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: activeTab === 'boolean' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            1. Boolean Standardization
          </button>
          <button
            onClick={() => setActiveTab('identifier')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: activeTab === 'identifier' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activeTab === 'identifier' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: activeTab === 'identifier' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            2. Formatting vs. Meaning (&quot;00123&quot;)
          </button>
        </div>
      </div>

      {activeTab === 'boolean' ? (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Boolean Standardization: Harmonizing Binary Indicators
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Surveys and systems record yes/no responses as <code>&quot;Y&quot;</code>, <code>&quot;Yes&quot;</code>, <code>&quot;1&quot;</code>, or <code>&quot;True&quot;</code>.
            Dictionary mapping translates these diverse text tokens into true Python boolean types (<code>True</code> and <code>False</code>).
          </p>

          <div style={{ marginBottom: '1.25rem' }}>
            <Button
              size="sm"
              kind={isBoolMapped ? 'tertiary' : 'primary'}
              onClick={() => setIsBoolMapped(!isBoolMapped)}
            >
              {isBoolMapped ? 'View Raw Text Tokens' : 'Apply Boolean Dictionary Mapping'}
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {rawBooleans.map((tok, idx) => {
              const isTrue = boolMap[tok];
              return (
                <span
                  key={idx}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    background: isBoolMapped ? (isTrue ? 'rgba(36, 161, 72, 0.15)' : 'rgba(218, 30, 40, 0.15)') : 'var(--ds-bg-core)',
                    border: isBoolMapped ? (isTrue ? '1px solid var(--ds-emerald)' : '1px solid #da1e28') : '1px solid var(--ds-border-subtle)',
                    color: isBoolMapped ? (isTrue ? 'var(--ds-emerald)' : '#da1e28') : 'var(--ds-text-primary)',
                  }}
                >
                  &quot;{tok}&quot; {isBoolMapped && `➔ ${isTrue ? 'True (bool)' : 'False (bool)'}`}
                </span>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Formatting vs. Meaning: The Leading Zero Trap
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Suppose you encounter the string <strong>&quot;00123&quot;</strong> in a column. Should you convert it to integer <strong>123</strong>?
            The answer depends entirely on whether the column represents an arithmetic quantity or a categorical identifier!
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
            <Button
              size="sm"
              kind={convertedIdToInt ? 'danger' : 'primary'}
              onClick={() => setConvertedIdToInt(!convertedIdToInt)}
            >
              {convertedIdToInt ? 'Revert to String Type' : 'Execute int("00123") Conversion'}
            </Button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            {/* Scenario A: Student ID */}
            <div style={{ padding: '1.25rem', borderRadius: '4px', background: 'var(--ds-bg-core)', border: convertedIdToInt ? '2px solid #da1e28' : '1px solid var(--ds-border-subtle)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '6px' }}>
                Scenario A: Student ID Column
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: convertedIdToInt ? '#da1e28' : 'var(--ds-text-primary)', marginBottom: '6px' }}>
                {convertedIdToInt ? '123 (int)' : '"00123" (str)'}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
                {convertedIdToInt ? (
                  <span style={{ color: '#da1e28' }}>
                    ❌ <strong>Information Loss:</strong> The leading &quot;00&quot; designated the 2000s branch cohort. Converting to integer permanently destroyed the department code.
                  </span>
                ) : (
                  <span style={{ color: 'var(--ds-emerald)' }}>
                    ✓ <strong>Safe:</strong> Keeping as string preserves character length and department prefix metadata.
                  </span>
                )}
              </p>
            </div>

            {/* Scenario B: Product Count */}
            <div style={{ padding: '1.25rem', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-purple)', marginBottom: '6px' }}>
                Scenario B: Warehouse Item Stock Count
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)', marginBottom: '6px' }}>
                {convertedIdToInt ? '123 (int)' : '"00123" (str)'}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
                {convertedIdToInt ? (
                  <span style={{ color: 'var(--ds-emerald)' }}>
                    ✓ <strong>Safe & Necessary:</strong> Stock count is an arithmetic quantity. Converting to integer allows mathematical sum and average calculations.
                  </span>
                ) : (
                  <span style={{ color: 'var(--ds-amber)' }}>
                    ⚠️ Needs conversion: As a string, you cannot calculate total inventory sum.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
