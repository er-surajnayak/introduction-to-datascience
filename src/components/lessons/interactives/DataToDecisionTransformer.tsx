'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  DataStructured,
  Analytics,
  Idea,
  DecisionTree,
  ArrowRight,
} from '@carbon/icons-react';

type Stage = 'data' | 'info' | 'insight' | 'decision';
type DomainKey = 'college' | 'food' | 'hospital';

export function DataToDecisionTransformer() {
  const [stage, setStage] = useState<Stage>('data');
  const [domain, setDomain] = useState<DomainKey>('college');

  const domainData: Record<
    DomainKey,
    {
      name: string;
      raw: {
        title: string;
        records: string[][];
        headers: string[];
      };
      info: {
        title: string;
        summaryMetrics: { label: string; value: string }[];
        description: string;
      };
      insight: {
        title: string;
        pattern: string;
        keyFinding: string;
      };
      decision: {
        title: string;
        action: string;
        expectedOutcome: string;
      };
    }
  > = {
    college: {
      name: 'College Student Performance',
      raw: {
        title: '5,000 Student Records (Raw Data Matrix)',
        headers: ['Student ID', 'Attendance %', 'Study Hrs/Wk', 'Assignments', 'CGPA', 'Placement Status'],
        records: [
          ['STU_001', '88%', '16 hrs', '10/10', '8.92', 'Placed (₹14 LPA)'],
          ['STU_002', '54%', '4 hrs', '4/10', '6.10', 'Unplaced'],
          ['STU_003', '92%', '20 hrs', '9/10', '9.15', 'Placed (₹18 LPA)'],
          ['STU_004', '71%', '8 hrs', '7/10', '7.40', 'Placed (₹7 LPA)'],
          ['STU_005', '48%', '3 hrs', '3/10', '5.85', 'Unplaced'],
        ],
      },
      info: {
        title: 'Statistical Summaries (Information)',
        summaryMetrics: [
          { label: 'Mean CGPA', value: '7.48' },
          { label: 'Mean Attendance', value: '76.4%' },
          { label: 'Avg Study Hours', value: '11.2 hrs/wk' },
          { label: 'Overall Placement Rate', value: '68.5%' },
        ],
        description: 'Raw rows aggregated into central tendencies, distributions, and summary metrics across all 5,000 students.',
      },
      insight: {
        title: 'Hidden Correlation Uncovered (Insight)',
        pattern: 'Non-linear threshold: Students with Attendance ≥ 75% AND Study Hours ≥ 12 hrs/wk have a 92.4% placement rate, whereas students below both have only a 21.3% placement rate.',
        keyFinding: 'Assignment completion rate in Semester 4 is the single strongest early leading indicator of final CGPA (Correlation r = 0.81).',
      },
      decision: {
        title: 'Actionable Engineering Policy (Decision)',
        action: 'Launch an early-warning academic intervention at Week 4 of Semester 4. Provide mandatory 1-on-1 peer mentoring for students with attendance < 70% before mid-terms.',
        expectedOutcome: 'Projected to increase overall placement rate from 68.5% to 81.0% by catching struggling students 6 months earlier.',
      },
    },
    food: {
      name: 'Food Delivery Operations',
      raw: {
        title: '100,000 Food Order Records (Raw Telemetry)',
        headers: ['Order ID', 'Restaurant', 'Distance', 'Order Time', 'Weather', 'Actual Delivery Time'],
        records: [
          ['ORD_8192', 'Pizza Hut', '4.2 km', '8:42 PM', 'Rain', '46 mins'],
          ['ORD_8193', 'Biryani Zone', '1.8 km', '1:15 PM', 'Clear', '22 mins'],
          ['ORD_8194', 'Burger King', '6.1 km', '9:10 PM', 'Rain', '58 mins'],
          ['ORD_8195', 'Chai Point', '0.9 km', '5:30 PM', 'Clear', '14 mins'],
        ],
      },
      info: {
        title: 'Operational Metrics (Information)',
        summaryMetrics: [
          { label: 'Avg Delivery Time (Clear)', value: '24.2 mins' },
          { label: 'Avg Delivery Time (Rain)', value: '49.8 mins' },
          { label: 'Peak Order Hour', value: '8:30 PM' },
          { label: 'Late Delivery Rate', value: '14.2%' },
        ],
        description: 'Delivery logs aggregated by weather condition, traffic density, and kitchen prep time.',
      },
      insight: {
        title: 'Bottleneck Discovery (Insight)',
        pattern: 'Rain delays are not primarily caused by slower driver road speeds. 65% of the delay occurs because restaurants experience a 300% order surge and their kitchens become backlogged.',
        keyFinding: 'Kitchen preparation time doubles from 12 mins to 26 mins during sudden rainstorms.',
      },
      decision: {
        title: 'Dynamic Operational Strategy (Decision)',
        action: 'When meteorological radar predicts rain in a delivery zone, automatically throttle incoming order intake per kitchen and pre-assign delivery partners 10 minutes earlier.',
        expectedOutcome: 'Reduces rain delay complaints by 44% and protects restaurant ratings.',
      },
    },
    hospital: {
      name: 'Hospital Patient Readmissions',
      raw: {
        title: '20,000 Patient Discharge Records (Raw Vitals)',
        headers: ['Patient ID', 'Age', 'Diagnosis', 'Length of Stay', 'Follow-up Scheduled', '30-Day Readmission'],
        records: [
          ['PAT_104', '68', 'Heart Failure', '5 days', 'No', 'Readmitted (Day 12)'],
          ['PAT_105', '45', 'Appendicitis', '2 days', 'Yes', 'No Readmission'],
          ['PAT_106', '74', 'Pneumonia', '7 days', 'No', 'Readmitted (Day 19)'],
          ['PAT_107', '58', 'Diabetes T2', '3 days', 'Yes', 'No Readmission'],
        ],
      },
      info: {
        title: 'Clinical Summary (Information)',
        summaryMetrics: [
          { label: 'Overall Readmission Rate', value: '18.4%' },
          { label: 'Avg Age Readmitted', value: '71.2 yrs' },
          { label: 'Patients with Follow-up', value: '52%' },
        ],
        description: 'Electronic Health Record (EHR) telemetry summarized across age cohorts and post-discharge protocols.',
      },
      insight: {
        title: 'Clinical Risk Factor (Insight)',
        pattern: 'Patients over age 65 discharged without a scheduled phone check-in within 48 hours are 3.8x more likely to be readmitted due to medication confusion.',
        keyFinding: 'A single 5-minute pharmacist phone call within 48 hours cuts readmission rates in half.',
      },
      decision: {
        title: 'Clinical Care Protocol (Decision)',
        action: 'Deploy an automated discharge protocol: high-risk cardiac patients receive an automatic pharmacy medication review call within 36 hours of discharge.',
        expectedOutcome: 'Reduces emergency readmissions by 32%, saving patient lives and hospital bed capacity.',
      },
    },
  };

  const curr = domainData[domain];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2.5rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Experience 1
          </span>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            The Transformation: Data → Information → Insight → Decision
          </h3>
        </div>
        <Tag type="cyan" size="md">Core DI Notes Paradigm</Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Data Science is not about accumulating raw numbers—it is about the transformative journey from unorganized records to high-confidence real-world decisions.
      </p>

      {/* Domain Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', marginRight: '4px' }}>
          Select Scenario:
        </span>
        {(['college', 'food', 'hospital'] as DomainKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setDomain(key)}
            style={{
              padding: '6px 14px',
              background: domain === key ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
              border: domain === key ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              borderRadius: '3px',
              color: domain === key ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
              fontWeight: 500,
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            {domainData[key].name}
          </button>
        ))}
      </div>

      {/* 4-Stage Connected Interactive Stepper */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {[
          { key: 'data', label: '1. Raw Data', icon: <DataStructured size={18} /> },
          { key: 'info', label: '2. Information', icon: <Analytics size={18} /> },
          { key: 'insight', label: '3. Insight', icon: <Idea size={18} /> },
          { key: 'decision', label: '4. Decision', icon: <DecisionTree size={18} /> },
        ].map((item) => {
          const isActive = stage === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setStage(item.key as Stage)}
              style={{
                padding: '12px 8px',
                background: isActive ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
                border: isActive ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                color: isActive ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Stage Visual Transformation Container */}
      <div
        style={{
          padding: '1.75rem',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
          minHeight: '220px',
        }}
      >
        {/* STAGE 1: RAW DATA */}
        {stage === 'data' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <Tag type="cool-gray" size="md">
                Stage 1: Raw Data (Recorded Facts)
              </Tag>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
                {curr.raw.title}
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem' }}>
              Raw observations with zero processing. By itself, this table does not tell you why students succeed or who needs help.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  textAlign: 'left',
                }}
              >
                <thead>
                  <tr style={{ background: 'var(--cds-layer-01)', borderBottom: '1px solid var(--ds-border-subtle)' }}>
                    {curr.raw.headers.map((h, i) => (
                      <th key={i} style={{ padding: '8px 12px', color: 'var(--ds-cyan)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {curr.raw.records.map((r, rIdx) => (
                    <tr key={rIdx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                      {r.map((cell, cIdx) => (
                        <td key={cIdx} style={{ padding: '8px 12px', color: 'var(--ds-text-primary)' }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STAGE 2: INFORMATION */}
        {stage === 'info' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <Tag type="purple" size="md">
                Stage 2: Information (Structured & Summarized)
              </Tag>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
                {curr.info.title}
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem' }}>
              {curr.info.description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
              }}
            >
              {curr.info.summaryMetrics.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px',
                    background: 'var(--cds-layer-01)',
                    border: '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 3: INSIGHT */}
        {stage === 'insight' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <Tag type="teal" size="md">
                Stage 3: Insight (Understanding The Pattern)
              </Tag>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
                {curr.insight.title}
              </span>
            </div>

            <div
              style={{
                padding: '1.25rem',
                background: 'var(--cds-layer-01)',
                borderLeft: '4px solid var(--ds-teal)',
                borderRadius: '0 4px 4px 0',
                marginBottom: '1rem',
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-teal)', fontWeight: 600, marginBottom: '4px' }}>
                Statistical Relationship
              </div>
              <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
                {curr.insight.pattern}
              </p>
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ds-cyan)' }}>Key Driver:</strong> {curr.insight.keyFinding}
            </div>
          </div>
        )}

        {/* STAGE 4: DECISION */}
        {stage === 'decision' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <Tag type="green" size="md">
                Stage 4: Decision (Actionable Value)
              </Tag>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
                {curr.decision.title}
              </span>
            </div>

            <div
              style={{
                padding: '1.25rem',
                background: 'var(--ds-emerald-dim)',
                borderLeft: '4px solid var(--ds-emerald)',
                borderRadius: '0 4px 4px 0',
                marginBottom: '1rem',
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-emerald)', fontWeight: 600, marginBottom: '4px' }}>
                Concrete Strategic Intervention
              </div>
              <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--ds-text-primary)', lineHeight: 1.5, fontWeight: 500 }}>
                {curr.decision.action}
              </p>
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ds-emerald)' }}>Impact:</strong> {curr.decision.expectedOutcome}
            </div>
          </div>
        )}
      </div>

      {/* Step Navigation Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' }}>
        <Button
          kind="secondary"
          size="sm"
          onClick={() => {
            const stages: Stage[] = ['data', 'info', 'insight', 'decision'];
            const idx = stages.indexOf(stage);
            if (idx > 0) setStage(stages[idx - 1]);
          }}
          disabled={stage === 'data'}
        >
          Previous Stage
        </Button>
        <Button
          kind="primary"
          size="sm"
          renderIcon={ArrowRight}
          onClick={() => {
            const stages: Stage[] = ['data', 'info', 'insight', 'decision'];
            const idx = stages.indexOf(stage);
            if (idx < stages.length - 1) setStage(stages[idx + 1]);
          }}
          disabled={stage === 'decision'}
        >
          Next Stage
        </Button>
      </div>
    </div>
  );
}
