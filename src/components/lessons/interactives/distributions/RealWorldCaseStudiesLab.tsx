'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  Events,
  CheckmarkFilled,
  CloseFilled,
  Information,
} from '@carbon/icons-react';

interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  scenario: string;
  datasetLabel: string;
  data: number[];
  color: string;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
  takeaway: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'caseA',
    badge: 'Case A',
    title: 'Exam Marks: Easy Exam vs. Hard Exam',
    scenario:
      'In a competitive coding midterm, an exceptionally easy test yields marks where 80% of students score 85–95, with a few struggling students trailing at 30, 45, and 60. Conversely, a brutally difficult test clusters students between 30–50, with two genius students scoring 90 and 95.',
    datasetLabel: 'Synthetic Easy Exam Marks (n=10): [30, 45, 60, 75, 85, 88, 90, 92, 94, 98]',
    data: [30, 45, 60, 75, 85, 88, 90, 92, 94, 98],
    color: 'var(--ds-purple)',
    question: 'What distribution shape characterizes the Easy Exam marks?',
    options: [
      'Left-skewed (negative skew), because most students scored high and a long tail trails to the left.',
      'Right-skewed (positive skew), because the numbers are positive integers.',
      'Perfect normal distribution with zero variance.',
    ],
    correctIdx: 0,
    explanation:
      'Correct! An easy exam bunches most students near the ceiling (85-98), with a sparse tail of lower scores extending to the left. This creates a classic Left-Skewed distribution.',
    takeaway: 'Easy tests create negative (left) skew; difficult tests create positive (right) skew.',
  },
  {
    id: 'caseB',
    badge: 'Case B',
    title: 'Tech Startup Salaries: The Executive Magnet',
    scenario:
      'A Series-B tech company employs 15 junior and mid-level software engineers earning between ₹18k and ₹35k per month. The founding CEO draws ₹250k per month. HR advertises: "Our average developer compensation is an incredible ₹48k/month!"',
    datasetLabel: 'Synthetic Monthly Salaries in ₹k (n=12): [18, 20, 22, 24, 25, 26, 28, 30, 32, 35, 40, 250]',
    data: [18, 20, 22, 24, 25, 26, 28, 30, 32, 35, 40, 250],
    color: 'var(--ds-blue)',
    question: 'Why does the average salary of ₹48k deceive prospective applicants?',
    options: [
      'Because Python made a floating-point rounding error.',
      'Because 11 out of 12 employees earn significantly less than ₹48k; the single ₹250k founder salary artificially inflates the arithmetic mean.',
      'Because the median is higher than the mean.',
    ],
    correctIdx: 1,
    explanation:
      'Correct! The median is ₹27k, accurately reflecting what engineers actually earn. The average is dragged up by the CEO’s extreme outlier.',
    takeaway: 'Never judge salary benchmarks by the mean alone; always demand the median and IQR.',
  },
  {
    id: 'caseC',
    badge: 'Case C',
    title: 'Food Delivery Times: The Long Latency Tail',
    scenario:
      'A food delivery app tracks delivery duration from order dispatch to doorstep. Under ordinary urban conditions, 92% of orders complete between 18 and 32 minutes. However, torrential rain and vehicle breakdowns cause a small percentage of orders to take 75, 95, or 120 minutes.',
    datasetLabel: 'Synthetic Delivery Latency in Minutes (n=12): [18, 20, 22, 24, 25, 26, 28, 30, 32, 75, 95, 120]',
    data: [18, 20, 22, 24, 25, 26, 28, 30, 32, 75, 95, 120],
    color: 'var(--ds-amber)',
    question: 'What does the long right tail of delivery times represent in service operations?',
    options: [
      'Severe sensor malfunctions that must be erased.',
      'Real-world operational delays (rain, accidents, kitchen bottlenecks) that degrade user trust.',
      'Proof that the delivery drivers are moving faster than sound.',
    ],
    correctIdx: 1,
    explanation:
      'Correct! Heavy right tails in operational queuing systems represent rare, severe disruptions that drive customer churn and SLA violations.',
    takeaway: 'In latency engineering, optimize for 95th and 99th percentiles rather than the average.',
  },
  {
    id: 'caseD',
    badge: 'Case D',
    title: 'Website Traffic: Baseline Operations vs. Viral Spikes',
    scenario:
      'A college tech fest website logs hourly server requests. During normal daytime hours, traffic steadily registers 400 to 600 hits per hour. At 8:00 PM, a celebrity judge tweets about the event, and traffic explodes to 12,000 requests in a single hour.',
    datasetLabel: 'Synthetic Hourly Traffic in Hundreds of Hits: [4, 4, 5, 5, 5, 6, 6, 6, 5, 5, 120]',
    data: [4, 4, 5, 5, 5, 6, 6, 6, 5, 5, 120],
    color: 'var(--ds-cyan)',
    question: 'How should cloud infrastructure engineers design server capacity?',
    options: [
      'Scale servers strictly to the mean traffic, guaranteeing a crash during viral spikes.',
      'Use distribution profiling to accommodate typical baselines while building autoscaling headroom for heavy-tailed spikes.',
      'Assume web traffic follows a uniform distribution.',
    ],
    correctIdx: 1,
    explanation:
      'Correct! Web traffic is heavily spiked. Autoscaling architectures are designed precisely because internet traffic exhibits severe heavy tails.',
    takeaway: 'System resilience requires preparing for tail risks, not just average loads.',
  },
];

export function RealWorldCaseStudiesLab() {
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const current = CASES[activeCaseIdx];
  const currentAnswer = selectedAnswers[current.id];

  const handleSelectAnswer = (optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [current.id]: optIdx }));
  };

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
      {/* Header Badge & Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Section 3.2.16
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Real-World Diagnostic Case Studies
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Exams &bull; Salaries &bull; Latency &bull; Spikes
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--ds-text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        Real-World Case Studies: How Distributions Drive Industry Decisions
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Examine how distributions manifest in education, corporate compensation, logistics, and web infrastructure. All sample datasets are synthetic educational benchmarks:
      </p>

      {/* Case Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        {CASES.map((c, idx) => {
          const isActive = idx === activeCaseIdx;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCaseIdx(idx)}
              style={{
                padding: '8px 14px',
                borderRadius: '4px',
                background: isActive ? 'var(--ds-bg-surface-elevated)' : 'var(--cds-layer-02)',
                border: isActive ? `2px solid ${c.color}` : '1px solid var(--ds-border-subtle)',
                color: isActive ? c.color : 'var(--ds-text-primary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {c.badge}: {c.title.split(':')[0]}
            </button>
          );
        })}
      </div>

      {/* Case Dossier */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Tag type="blue" size="sm">
            {current.badge}
          </Tag>
          <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            {current.title}
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
          {current.scenario}
        </p>

        <div
          style={{
            padding: '10px 12px',
            background: 'var(--cds-layer-02)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.75rem',
            color: 'var(--ds-cyan)',
            marginBottom: '1.25rem',
          }}
        >
          {current.datasetLabel}
        </div>

        {/* Diagnostic Question */}
        <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px', fontSize: '0.9375rem' }}>
          Investigation Question: {current.question}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
          {current.options.map((opt, optIdx) => {
            const isSelected = currentAnswer === optIdx;
            const hasAnswered = currentAnswer !== undefined;
            const isCorrect = optIdx === current.correctIdx;

            let border = '1px solid var(--ds-border-subtle)';
            let bg = 'var(--cds-layer-02)';
            let color = 'var(--ds-text-primary)';

            if (hasAnswered) {
              if (isCorrect) {
                border = '2px solid var(--ds-emerald)';
                bg = 'var(--ds-emerald-dim)';
                color = 'var(--ds-emerald)';
              } else if (isSelected) {
                border = '2px solid #da1e28';
                bg = 'rgba(218, 30, 40, 0.1)';
                color = '#fa4d56';
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectAnswer(optIdx)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '4px',
                  background: bg,
                  border,
                  color,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {currentAnswer !== undefined && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '4px',
              background: currentAnswer === current.correctIdx ? 'var(--ds-emerald-dim)' : 'rgba(218, 30, 40, 0.1)',
              borderLeft: currentAnswer === current.correctIdx ? '3px solid var(--ds-emerald)' : '3px solid #da1e28',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-primary)',
              lineHeight: 1.5,
              marginBottom: '1rem',
            }}
          >
            {current.explanation}
          </div>
        )}

        <div
          style={{
            padding: '10px 12px',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            borderLeft: `3px solid ${current.color}`,
            fontSize: '0.8125rem',
            color: 'var(--ds-text-secondary)',
          }}
        >
          <strong style={{ color: current.color }}>Key Engineering Takeaway:</strong> {current.takeaway}
        </div>
      </div>
    </div>
  );
}
