'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { CheckmarkFilled, WarningAlt, Information, ChevronRight } from '@carbon/icons-react';

const STUDENTS_DATA = [
  { student: 'A', mark: 72 },
  { student: 'B', mark: 81 },
  { student: 'C', mark: 65 },
  { student: 'D', mark: 92 },
  { student: 'E', mark: 78 },
  { student: 'F', mark: 88 },
  { student: 'G', mark: 54 },
  { student: 'H', mark: 88 },
  { student: 'I', mark: 78 },
  { student: 'J', mark: 95 },
];

export function StudentMarksCaseStudyLab() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  const tasks = [
    {
      step: 1,
      title: 'Task 1: Calculate the Mean',
      prompt: 'Compute the arithmetic average mark across all 10 students.',
      expected: '79.1',
      unit: 'marks',
      explanation: 'Sum = 72+81+65+92+78+88+54+88+78+95 = 791. Dividing by 10 gives 79.1.',
    },
    {
      step: 2,
      title: 'Task 2: Calculate the Median',
      prompt: 'Sort the scores [54, 65, 72, 78, 78, 81, 88, 88, 92, 95] and find the middle value.',
      expected: '79.5',
      unit: 'marks',
      explanation: 'With n=10 (even), average the 5th and 6th elements: (78 + 81) / 2 = 79.5.',
    },
    {
      step: 3,
      title: 'Task 3: Identify the Mode',
      prompt: 'Which score(s) appear most frequently?',
      expected: '78, 88',
      unit: 'marks',
      explanation: 'Both 78 and 88 appear twice each. The distribution is bimodal.',
    },
    {
      step: 4,
      title: 'Task 4: Calculate the Range',
      prompt: 'Range = Maximum - Minimum.',
      expected: '41',
      unit: 'marks',
      explanation: 'Maximum (95) - Minimum (54) = 41 marks.',
    },
    {
      step: 5,
      title: 'Task 5: Sample Standard Deviation',
      prompt: 'Compute sample standard deviation s (rounded to 1 decimal place).',
      expected: '12.3',
      unit: 'marks',
      explanation: 'Sample variance s² = 152.1 / (10 - 1) = 152.1. √152.1 ≈ 12.33 marks.',
    },
    {
      step: 6,
      title: 'Task 6 & 7: Quartiles (Q1 & Q3)',
      prompt: 'What are the 25th percentile (Q1) and 75th percentile (Q3)?',
      expected: '73.5, 88.0',
      unit: 'marks',
      explanation: 'Q1 (25th %) = 73.5; Q3 (75th %) = 88.0 using standard linear interpolation.',
    },
    {
      step: 7,
      title: 'Task 8: Interquartile Range (IQR)',
      prompt: 'IQR = Q3 - Q1.',
      expected: '14.5',
      unit: 'marks',
      explanation: 'IQR = 88.0 - 73.5 = 14.5 marks (spread of middle 50%).',
    },
    {
      step: 8,
      title: 'Task 9: Is 95 an Outlier?',
      prompt: 'Compute Tukey upper fence: Q3 + 1.5 × IQR.',
      expected: 'No',
      unit: '',
      explanation: 'Upper Fence = 88.0 + 1.5 × 14.5 = 109.75. Since 95 < 109.75, it is a legitimate high mark, not a statistical outlier!',
    },
    {
      step: 9,
      title: 'Task 10: Which Center Would You Report?',
      prompt: 'Mean (79.1) vs. Median (79.5). Which would you report to the dean?',
      expected: 'Either / Mean',
      unit: '',
      explanation: 'Since Mean (79.1) and Median (79.5) are nearly identical (gap of only 0.4), the distribution is approximately symmetric. Reporting either is valid; Mean is conventional when symmetry holds.',
    },
    {
      step: 10,
      title: 'Task 11: What Additional Information Would You Want?',
      prompt: 'What domain context should you investigate before drawing conclusions?',
      expected: 'Context',
      unit: '',
      explanation: 'You should inspect: Was the exam out of 100? What was the historical passing rate? Were questions uniformly weighted? Numbers summarize data, but domain context guides decisions.',
    },
  ];

  const currentTask = tasks[currentStep - 1];

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
          <Tag type="purple" size="md">
            Section 28
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Real-World Case Study 1
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Guided 11-Step Investigation
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Case Study 1: Engineering Student Examination Audit
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Step into the shoes of the department head. You have 10 student scores from Midterm II. Walk through the 11-step diagnostic workflow:
      </p>

      {/* Raw Data Table */}
      <div
        style={{
          padding: '1rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Midterm Examination Scores (n = 10)
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {STUDENTS_DATA.map((row) => (
            <div
              key={row.student}
              style={{
                padding: '6px 12px',
                background: 'var(--ds-bg-core)',
                borderRadius: '3px',
                border: '1px solid var(--ds-border-subtle)',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Student {row.student}</div>
              <strong style={{ fontSize: '1rem', color: 'var(--ds-text-primary)' }}>{row.mark}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Active Guided Step */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          borderLeft: '4px solid var(--ds-purple)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-purple)' }}>
            {currentTask.title} (Step {currentStep} of {tasks.length})
          </span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
            Target: {currentTask.expected} {currentTask.unit}
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', marginBottom: '1rem' }}>
          {currentTask.prompt}
        </p>

        {revealedSolutions[currentStep] ? (
          <div
            style={{
              padding: '10px 14px',
              background: 'var(--ds-emerald-dim)',
              borderRadius: '4px',
              border: '1px solid var(--ds-emerald)',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-primary)',
              lineHeight: 1.5,
              marginBottom: '1rem',
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--ds-emerald)', marginBottom: '4px' }}>
              Verified Solution: {currentTask.expected} {currentTask.unit}
            </div>
            {currentTask.explanation}
          </div>
        ) : (
          <div style={{ marginBottom: '1rem' }}>
            <Button
              size="sm"
              kind="tertiary"
              onClick={() => setRevealedSolutions((prev) => ({ ...prev, [currentStep]: true }))}
            >
              Reveal Guided Solution
            </Button>
          </div>
        )}

        {/* Step Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--ds-border-subtle)' }}>
          <Button
            size="sm"
            kind="ghost"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          >
            Previous Task
          </Button>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
            Task {currentStep} of {tasks.length}
          </div>
          <Button
            size="sm"
            kind="primary"
            renderIcon={ChevronRight}
            disabled={currentStep === tasks.length}
            onClick={() => setCurrentStep((prev) => Math.min(tasks.length, prev + 1))}
          >
            Next Task
          </Button>
        </div>
      </div>
    </div>
  );
}
