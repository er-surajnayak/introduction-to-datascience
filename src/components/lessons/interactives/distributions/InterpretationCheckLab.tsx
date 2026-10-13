'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  Events,
  CheckmarkFilled,
  CloseFilled,
  ArrowRight,
  Restart,
  Help,
} from '@carbon/icons-react';

interface ScenarioQuestion {
  id: number;
  question: string;
  context: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const SCENARIO_QUESTIONS: ScenarioQuestion[] = [
  {
    id: 1,
    question: 'Most salaries are between ₹20k and ₹40k, but a few exceed ₹1 lakh. Which shape is most likely?',
    context: 'Recognizing tail direction in economic compensation distributions.',
    options: ['Approximately uniform', 'Right-skewed (positive skew)', 'Left-skewed (negative skew)', 'Perfect symmetric'],
    correctIdx: 1,
    explanation:
      'Correct! The bulk of employees cluster between ₹20k and ₹40k, while the rare high earners stretch the tail toward the right. This produces a classic Right-Skewed distribution.',
  },
  {
    id: 2,
    question: 'A test score histogram exhibits two distinct, prominent peaks. What should you investigate first?',
    context: 'Diagnostic protocol when encountering bimodal distributions.',
    options: [
      'Assume the software has a rendering bug and delete the smaller peak.',
      'Investigate possible mixed sub-groups or different data-generating processes (e.g. beginner vs advanced students).',
      'Force the data into a single normal distribution equation.',
      'Immediately conclude the standard deviation must be negative.',
    ],
    correctIdx: 1,
    explanation:
      'Correct! Two distinct peaks indicate multimodality. The first hypothesis to test is whether two distinct cohorts (e.g., experienced vs novice coders) were accidentally merged.',
  },
  {
    id: 3,
    question: 'Increasing or decreasing the number of histogram bins can change what?',
    context: 'Understanding bin sensitivity and visual representation.',
    options: [
      'The raw numerical values stored in the original dataset.',
      'The visible visual representation of the distribution across intervals.',
      'The true population mean of the universe.',
      'The file size of the Python script.',
    ],
    correctIdx: 1,
    explanation:
      'Correct! Changing the bin count changes how intervals are partitioned for display, which alters the visible shape without touching the underlying raw observations.',
  },
  {
    id: 4,
    question: 'Two manufacturing batches have equal means of 10.0 cm, but Batch A has SD = 0.1 cm while Batch B has SD = 2.5 cm. What differs?',
    context: 'Distinguishing central tendency from dispersion.',
    options: [
      'Nothing differs; their quality is identical because both averages are 10.0 cm.',
      'Their variability / consistency: Batch A is precision-machined, whereas Batch B has wide defects.',
      'Batch B has fewer widgets than Batch A.',
      'Batch A is left-skewed.',
    ],
    correctIdx: 1,
    explanation:
      'Correct! Identical centers with radically different standard deviations indicate vastly different consistency. Batch A is tightly controlled, while Batch B has wide erratic fluctuations.',
  },
];

export function InterpretationCheckLab() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showFinished, setShowFinished] = useState<boolean>(false);

  const q = SCENARIO_QUESTIONS[currentIdx];
  const hasAnsweredCurrent = selectedAnswers[q.id] !== undefined;

  const handleSelect = (optIdx: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
  };

  const handleNext = () => {
    if (currentIdx < SCENARIO_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowFinished(false);
  };

  const correctCount = SCENARIO_QUESTIONS.filter(
    (item) => selectedAnswers[item.id] === item.correctIdx
  ).length;

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
          <Tag type="purple" size="md">
            Section 3.2.20
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Distribution Interpretation Check
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Question {currentIdx + 1} of {SCENARIO_QUESTIONS.length}
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
        Quick Interpretation Check: Reading Patterns Without Formulas
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Test your intuitive visual interpretation across 4 scenario-based questions:
      </p>

      {!showFinished ? (
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-cyan)', marginBottom: '4px', fontFamily: 'var(--ds-font-mono)' }}>
            SCENARIO {q.id}: {q.context}
          </div>
          <h4 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
            {q.question}
          </h4>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
            {q.options.map((opt, optIdx) => {
              const selected = selectedAnswers[q.id];
              const isSelected = selected === optIdx;
              const isCorrect = optIdx === q.correctIdx;

              let border = '1px solid var(--ds-border-subtle)';
              let bg = 'var(--cds-layer-02)';
              let color = 'var(--ds-text-primary)';

              if (hasAnsweredCurrent) {
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
                  onClick={() => handleSelect(optIdx)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '4px',
                    background: bg,
                    border,
                    color,
                    fontSize: '0.875rem',
                    cursor: hasAnsweredCurrent ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation upon answering */}
          {hasAnsweredCurrent && (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '4px',
                background: selectedAnswers[q.id] === q.correctIdx ? 'var(--ds-emerald-dim)' : 'rgba(218, 30, 40, 0.1)',
                borderLeft: selectedAnswers[q.id] === q.correctIdx ? '3px solid var(--ds-emerald)' : '3px solid #da1e28',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-primary)',
                lineHeight: 1.5,
                marginBottom: '1.25rem',
              }}
            >
              {q.explanation}
            </div>
          )}

          {/* Navigation Button */}
          {hasAnsweredCurrent && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="sm" renderIcon={ArrowRight} onClick={handleNext}>
                {currentIdx < SCENARIO_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Results'}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Interpretation Check Complete!
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)', marginBottom: '1.5rem' }}>
            Score: {correctCount} / {SCENARIO_QUESTIONS.length} Scenarios Mastered
          </div>
          <Button size="sm" kind="secondary" renderIcon={Restart} onClick={handleReset}>
            Retry Scenarios
          </Button>
        </div>
      )}
    </div>
  );
}
