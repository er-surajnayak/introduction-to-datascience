'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { CheckmarkFilled, WarningAlt } from '@carbon/icons-react';

interface DomainCase {
  id: string;
  title: string;
  badge: string;
  dataStream: string[];
  outlierValue: string;
  scenarioDescription: string;
  isNoise: boolean;
  explanation: string;
  engineeringAction: string;
}

const domainCases: DomainCase[] = [
  {
    id: 'fraud',
    title: '1. Financial Credit Card Security',
    badge: 'Fraud Detection',
    dataStream: ['₹500', '₹700', '₹450', '₹600', '₹4,50,000'],
    outlierValue: '₹4,50,000',
    scenarioDescription: 'A user with a 5-year history of ₹500 grocery transactions suddenly incurs a ₹4,50,000 charge at a luxury boutique in Dubai at 3:15 AM.',
    isNoise: false,
    explanation: 'PRIMARY SIGNAL: In fraud detection, the outlier IS the entire point of the business! If you delete this transaction as "noise", your anomaly detection pipeline becomes completely blind to theft.',
    engineeringAction: 'Action: Tag as `is_fraud_candidate=1`, trigger instant SMS verification, and freeze card pending authentication.',
  },
  {
    id: 'network',
    title: '2. Cloud Server Infrastructure',
    badge: 'Cybersecurity / DevOps',
    dataStream: ['100 req/s', '110 req/s', '105 req/s', '98 req/s', '10,000 req/s'],
    outlierValue: '10,000 req/s',
    scenarioDescription: 'An API gateway receiving an average of 100 requests/sec suddenly experiences a massive spike to 10,000 req/sec over a 4-second interval.',
    isNoise: false,
    explanation: 'CRITICAL EVENT SIGNAL: This spike represents an active Distributed Denial of Service (DDoS) attack or an unprecedented viral product launch. It is the most important operational telemetry point.',
    engineeringAction: 'Action: Trigger autoscaling web server replicas, activate Cloudflare bot mitigation rate-limiting, and alert on-call DevOps engineers.',
  },
  {
    id: 'marks',
    title: '3. University Exam Scores',
    badge: 'Academic Analytics',
    dataStream: ['72', '75', '78', '79', '3'],
    outlierValue: '3',
    scenarioDescription: 'In a 100-mark final exam where the peer average is 76.5, Student #108 scored exactly 3 marks.',
    isNoise: false,
    explanation: 'INVESTIGATIVE SIGNAL: Score 3 could be an acute medical emergency during the exam, an unsubmitted second answer booklet, or a clerical digitization error.',
    engineeringAction: 'Action: Flag for academic committee manual audit. Do NOT replace with 0 or class average without investigating the proctor logs.',
  },
];

export function SignalVsNoiseScenarios() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('fraud');
  const [revealed, setRevealed] = useState<boolean>(true);

  const activeCase = domainCases.find((c) => c.id === selectedCaseId)!;

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
          <Tag type="purple" size="md">
            Interactive Lab 2.5.8
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Domain Context: The Outlier as the Primary Signal
          </span>
        </div>
        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Signal vs Noise
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Outlier or Important Signal? The Real-World Telemetry
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        In beginner tutorials, outliers are often depicted as nuisances to be deleted. In industry,
        anomalies are frequently the <strong>most valuable, million-dollar events in your company</strong>.
      </p>

      {/* Case Switcher Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {domainCases.map((c) => {
          const isSelected = c.id === selectedCaseId;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '4px',
                border: isSelected ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'rgba(165, 110, 255, 0.15)' : 'var(--ds-bg-core)',
                color: isSelected ? 'var(--ds-purple)' : 'var(--ds-text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {c.title}
            </button>
          );
        })}
      </div>

      {/* Case Card */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag type="cyan" size="md">{activeCase.badge}</Tag>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              Data Stream Inspection
            </span>
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-amber)', fontFamily: 'var(--ds-font-mono)' }}>
            Target Outlier: {activeCase.outlierValue}
          </span>
        </div>

        {/* Data points visual stream */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {activeCase.dataStream.map((item, idx) => {
            const isTarget = item === activeCase.outlierValue;
            return (
              <span
                key={idx}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  fontWeight: isTarget ? 700 : 400,
                  background: isTarget ? 'rgba(255, 131, 43, 0.15)' : 'var(--ds-bg-core)',
                  border: isTarget ? '2px solid var(--ds-amber)' : '1px solid var(--ds-border-subtle)',
                  color: isTarget ? 'var(--ds-amber)' : 'var(--ds-text-primary)',
                }}
              >
                {item}
                {isTarget && <span style={{ fontSize: '0.6875rem', marginLeft: '6px' }}>⚡ ANOMALY</span>}
              </span>
            );
          })}
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
          {activeCase.scenarioDescription}
        </p>

        {/* Pedagogical Verdict */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '4px',
            background: 'var(--ds-bg-core)',
            borderLeft: '4px solid var(--ds-purple)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'var(--ds-text-primary)',
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--ds-purple)', marginBottom: '4px' }}>
            Data Science Verdict:
          </div>
          <div>{activeCase.explanation}</div>
          <div style={{ marginTop: '8px', color: 'var(--ds-emerald)', fontWeight: 500 }}>
            {activeCase.engineeringAction}
          </div>
        </div>
      </div>
    </div>
  );
}
