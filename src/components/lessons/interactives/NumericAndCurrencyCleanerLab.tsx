'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { CheckmarkFilled, WarningAlt, Information } from '@carbon/icons-react';

export function NumericAndCurrencyCleanerLab() {
  const [activeTab, setActiveTab] = useState<'numeric' | 'currency'>('numeric');
  const [useCoerce, setUseCoerce] = useState<boolean>(true);
  const [cleanedCurrency, setCleanedCurrency] = useState<boolean>(false);

  const rawNumericData = ['85', '92', 'unknown', '78', 'N/A', '100'];
  const rawCurrencyData = ['₹50,000', '₹75,000', '₹1,20,000', '50000', '₹45,500'];

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
          <Tag type="cyan" size="md">
            Interactive Lab 2.6.4
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Numeric Coercion & Currency Stripping
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('numeric')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: activeTab === 'numeric' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activeTab === 'numeric' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: activeTab === 'numeric' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            1. Numeric Strings & errors=&quot;coerce&quot;
          </button>
          <button
            onClick={() => setActiveTab('currency')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: activeTab === 'currency' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activeTab === 'currency' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: activeTab === 'currency' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            2. Currency Stripping & Storage vs Display
          </button>
        </div>
      </div>

      {activeTab === 'numeric' ? (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Converting Numeric Text: Safe Coercion to NaN
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            When a numerical column contains stray text labels like <code>&quot;unknown&quot;</code> or <code>&quot;N/A&quot;</code>,
            direct conversion crashes. Passing <code>errors=&quot;coerce&quot;</code> safely turns non-convertible entries into <strong>NaN</strong>,
            connecting formatting directly back to <strong>Topic 2.4 Missing Data</strong>.
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
            <Button
              size="sm"
              kind={useCoerce ? 'primary' : 'tertiary'}
              onClick={() => setUseCoerce(true)}
            >
              errors=&quot;coerce&quot; (Safe NaN Conversion)
            </Button>
            <Button
              size="sm"
              kind={!useCoerce ? 'danger' : 'tertiary'}
              onClick={() => setUseCoerce(false)}
            >
              errors=&quot;raise&quot; (Default: Script Crash)
            </Button>
          </div>

          {/* Coercion Table */}
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
              <thead>
                <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Row Index</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-amber)' }}>Raw String (object)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-cyan)' }}>pd.to_numeric() Result</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-text-muted)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {rawNumericData.map((val, idx) => {
                  const isText = isNaN(Number(val));
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--ds-border-subtle)', background: 'var(--cds-layer-02)' }}>
                      <td style={{ padding: '8px 12px', color: 'var(--ds-text-muted)' }}>[{idx}]</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', color: isText ? 'var(--ds-amber)' : 'inherit', fontWeight: isText ? 700 : 400 }}>
                        &quot;{val}&quot;
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                        {!useCoerce && isText ? (
                          <span style={{ color: '#da1e28', fontWeight: 700 }}>❌ ValueError Exception!</span>
                        ) : isText ? (
                          <span style={{ color: '#da1e28', fontWeight: 700 }}>NaN (float64)</span>
                        ) : (
                          <span style={{ color: 'var(--ds-emerald)', fontWeight: 700 }}>{Number(val).toFixed(1)} (float64)</span>
                        )}
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                        <Tag type={!useCoerce && isText ? 'red' : isText ? 'warm-gray' : 'green'} size="sm">
                          {!useCoerce && isText ? 'Pipeline Crash' : isText ? 'Coerced to NaN' : 'Converted'}
                        </Tag>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Currency Cleaning: Stored Numbers vs. Display Presentation
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Never store currency symbols (<code>&quot;₹&quot;</code>) or thousands commas directly in analytical data tables.
            Strip them to raw floats (<code>50000.0</code>) for calculation, and apply currency formatting only during UI display.
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
            <Button
              size="sm"
              kind={cleanedCurrency ? 'primary' : 'tertiary'}
              onClick={() => setCleanedCurrency(!cleanedCurrency)}
            >
              {cleanedCurrency ? 'View Raw Currency Strings' : 'Strip Symbols & Convert to float64'}
            </Button>
          </div>

          {/* Currency Table */}
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
              <thead>
                <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Raw String</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-cyan)' }}>Analytical Stored Value</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-emerald)' }}>Presentation Display Layer</th>
                </tr>
              </thead>
              <tbody>
                {rawCurrencyData.map((val, idx) => {
                  const numericVal = parseFloat(val.replace(/[₹,]/g, ''));
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--ds-border-subtle)', background: 'var(--cds-layer-02)' }}>
                      <td style={{ padding: '8px 12px', color: 'var(--ds-amber)' }}>&quot;{val}&quot;</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600, color: 'var(--ds-cyan)' }}>
                        {cleanedCurrency ? `${numericVal.toFixed(2)} (float64)` : 'Unconverted string'}
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--ds-emerald)', fontWeight: 600 }}>
                        ₹{numericVal.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
