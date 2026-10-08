'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Money, WarningAlt, Information, UserFollow } from '@carbon/icons-react';
import { calcMean, calcMedian } from '@/lib/statistics';

export function SalaryCaseStudyLab() {
  const [includeExecutive, setIncludeExecutive] = useState<boolean>(true);

  // 10 employees (9 engineers + 1 CEO)
  const baseSalaries = [20000, 22000, 24000, 25000, 26000, 28000, 30000, 35000, 40000];
  const fullSalaries = [...baseSalaries, 200000];

  const activeSalaries = includeExecutive ? fullSalaries : baseSalaries;
  const currentMean = calcMean(activeSalaries);
  const currentMedian = calcMedian(activeSalaries);

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
          <Tag type="cyan" size="md">
            Section 29
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Real-World Case Study 2
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          The Tech Startup Salary Dilemma
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Case Study 2: Startup Compensation & The ₹2,00,000 CEO Outlier
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        A startup publishes in a press release: <em>&ldquo;Our average employee salary is ₹45,000 per month!&rdquo;</em> An engineering applicant joins, only to discover that almost everyone on the engineering floor earns around ₹25,000. Did the company lie, or did the <strong>Mean</strong> conceal the truth?
      </p>

      {/* Interactive Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="sm"
            kind={includeExecutive ? 'primary' : 'secondary'}
            onClick={() => setIncludeExecutive(true)}
          >
            Include CEO (₹2,00,000)
          </Button>
          <Button
            size="sm"
            kind={!includeExecutive ? 'primary' : 'secondary'}
            onClick={() => setIncludeExecutive(false)}
          >
            Exclude CEO (9 Engineers Only)
          </Button>
        </div>

        <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
          Active Employees: {activeSalaries.length}
        </span>
      </div>

      {/* Salary Chips Grid */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '10px' }}>
          Monthly Salary Distribution (₹ INR)
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {activeSalaries.map((sal, idx) => {
            const isCEO = sal === 200000;
            return (
              <div
                key={idx}
                style={{
                  padding: '8px 12px',
                  background: isCEO ? 'rgba(218, 30, 40, 0.15)' : 'var(--ds-bg-core)',
                  border: isCEO ? '2px solid #da1e28' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isCEO ? '#da1e28' : 'var(--ds-text-primary)',
                }}
              >
                ₹{sal.toLocaleString()}
                {isCEO && (
                  <Tag type="red" size="sm" style={{ marginLeft: '6px' }}>
                    CEO Outlier
                  </Tag>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mean vs Median Comparison Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            borderTop: '3px solid var(--ds-blue)',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>Arithmetic Mean</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-blue)' }}>
            ₹{Math.round(currentMean).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
            {includeExecutive
              ? 'Distorted! Only 1 person out of 10 earns more than this "average" salary.'
              : 'Drops back down to ₹27,778 when the single executive compensation is excluded.'}
          </div>
        </div>

        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            borderTop: '3px solid var(--ds-purple)',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>Median (50th Percentile)</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
            ₹{Math.round(currentMedian).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-emerald)', marginTop: '6px', lineHeight: 1.4 }}>
            {includeExecutive
              ? 'Stable and representative! ₹27,000 reflects what typical engineering talent actually earns.'
              : 'Shifts smoothly from ₹27,000 to ₹26,000 (resistant to extreme leverage).'}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Detective Lesson:</strong> When analyzing heavily right-skewed economic data (wealth, compensation, real estate prices), reporting the <strong>Median</strong> provides an honest picture of the &ldquo;typical&rdquo; member. However, the <strong>Mean</strong> is still vital for the CFO because total payroll budget strictly equals n × x̄ (10 × ₹45,000 = ₹4,50,000). Different questions require different statistics!
      </div>
    </div>
  );
}
