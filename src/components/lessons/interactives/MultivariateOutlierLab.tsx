'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { WarningAlt, CheckmarkFilled, Information } from '@carbon/icons-react';

interface CandidateRecord {
  id: number;
  name: string;
  age: number;
  salaryLakhs: number;
  experienceYears: number;
  isUnivariateAgeOutlier: boolean;
  isUnivariateSalaryOutlier: boolean;
  isMultivariateOutlier: boolean;
  multivariateReason: string;
}

const candidateData: CandidateRecord[] = [
  { id: 1, name: 'Ananya', age: 24, salaryLakhs: 12, experienceYears: 2, isUnivariateAgeOutlier: false, isUnivariateSalaryOutlier: false, isMultivariateOutlier: false, multivariateReason: 'Completely normal: 2 years experience at age 24.' },
  { id: 2, name: 'Vikram', age: 38, salaryLakhs: 45, experienceYears: 15, isUnivariateAgeOutlier: false, isUnivariateSalaryOutlier: false, isMultivariateOutlier: false, multivariateReason: 'Standard senior career progression: 15 yrs exp at age 38.' },
  { id: 3, name: 'Rohan', age: 19, salaryLakhs: 200, experienceYears: 1, isUnivariateAgeOutlier: false, isUnivariateSalaryOutlier: true, isMultivariateOutlier: true, multivariateReason: 'Univariate & Multivariate Outlier: ₹2 Crore salary at age 19. (Could be venture-backed startup founder).' },
  { id: 4, name: 'Kavita', age: 21, salaryLakhs: 14, experienceYears: 20, isUnivariateAgeOutlier: false, isUnivariateSalaryOutlier: false, isMultivariateOutlier: true, multivariateReason: 'Pure Multivariate Outlier: Age 21 is normal, 20 yrs exp is normal in isolation. But Age - Exp = 1 year old! Physically impossible clerical entry.' },
];

export function MultivariateOutlierLab() {
  const [selectedId, setSelectedId] = useState<number>(4);

  const activeRecord = candidateData.find((c) => c.id === selectedId)!;

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
            Interactive Lab 2.5.9
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Univariate vs. Multivariate Anomaly Detection
          </span>
        </div>
        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Cross-Feature Constraints
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Univariate vs. Multivariate Outliers: The Hidden Conflict
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        A univariate check only inspects one column at a time. A <strong>Multivariate Outlier</strong> is a record
        whose individual column values appear completely normal in isolation, but whose <strong>combination across features is impossible</strong>.
      </p>

      {/* Interactive Candidate Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--ds-text-primary)' }}>Candidate</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--ds-text-primary)' }}>Age</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--ds-text-primary)' }}>Salary (₹ Lakh)</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--ds-text-primary)' }}>Experience (Yrs)</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--ds-cyan)' }}>Univariate Check</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--ds-purple)' }}>Multivariate Status</th>
            </tr>
          </thead>
          <tbody>
            {candidateData.map((c) => {
              const isSelected = c.id === selectedId;
              return (
                <tr
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  style={{
                    borderBottom: '1px solid var(--ds-border-subtle)',
                    background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                    {c.name} {isSelected && '👈'}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>{c.age}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: c.salaryLakhs >= 100 ? 'var(--ds-amber)' : 'inherit', fontWeight: c.salaryLakhs >= 100 ? 700 : 400 }}>
                    ₹{c.salaryLakhs}L
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>{c.experienceYears} yrs</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <Tag type={c.isUnivariateSalaryOutlier ? 'red' : 'green'} size="sm">
                      {c.isUnivariateSalaryOutlier ? 'Outlier' : 'Normal'}
                    </Tag>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <Tag type={c.isMultivariateOutlier ? 'purple' : 'green'} size="sm">
                      {c.isMultivariateOutlier ? '⚡ Multivariate Anomaly' : 'Consistent'}
                    </Tag>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Forensic Card */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          borderLeft: `4px solid ${activeRecord.isMultivariateOutlier ? 'var(--ds-purple)' : 'var(--ds-emerald)'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
            Cross-Feature Forensic Analysis: {activeRecord.name} (Age: {activeRecord.age}, Exp: {activeRecord.experienceYears} yrs)
          </span>
          <Tag type={activeRecord.isMultivariateOutlier ? 'purple' : 'green'} size="md">
            {activeRecord.isMultivariateOutlier ? 'Multivariate Conflict Detected' : 'All Feature Constraints Valid'}
          </Tag>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '8px' }}>
          {activeRecord.multivariateReason}
        </p>

        {activeRecord.name === 'Kavita' && (
          <div style={{ padding: '8px 12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-strong)', fontSize: '0.8125rem', color: 'var(--ds-amber)' }}>
            <strong>Why Standard Code Missed This:</strong> <code>df['age'].quantile()</code> marked 21 as normal. <code>df['experience'].quantile()</code> marked 20 as normal.
            Only cross-column constraint arithmetic (<code>df['age'] - df['experience'] &lt; 18</code>) flagged this data entry error!
          </div>
        )}
      </div>
    </div>
  );
}
