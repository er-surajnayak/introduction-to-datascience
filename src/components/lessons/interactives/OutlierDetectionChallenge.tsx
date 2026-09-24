'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Trophy, CheckmarkFilled, CloseFilled, Help, ArrowRight, Restart } from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';

interface ChallengeTask {
  id: number;
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const challengeTasks: ChallengeTask[] = [
  {
    id: 1,
    question: 'Given the raw student dataset: [18, 19, 20, 21, 20, 22, 19, 21, 23, 85], which value immediately stands out as mathematically suspicious?',
    options: ['Value 18', 'Value 21', 'Value 85', 'Value 20'],
    correctIndex: 2,
    hint: 'Look for the observation that is far isolated from the main peer cluster (18–23).',
    explanation: 'Value 85 is isolated by more than 60 units from all other peer values (18 to 23).',
  },
  {
    id: 2,
    question: 'Sort the 10 values: [18, 19, 19, 20, 20, 21, 21, 22, 23, 85]. What is the First Quartile (Q1 / 25th percentile)?',
    options: ['Q1 = 19.0', 'Q1 = 20.0', 'Q1 = 18.0', 'Q1 = 21.0'],
    correctIndex: 0,
    hint: 'In a 10-element sorted array, Q1 falls between index 2 and index 3 (value 19).',
    explanation: 'The 25th percentile of this sorted array is 19.0 (the boundary of the lowest 25% of records).',
  },
  {
    id: 3,
    question: 'In the sorted array [18, 19, 19, 20, 20, 21, 21, 22, 23, 85], what is the Third Quartile (Q3 / 75th percentile)?',
    options: ['Q3 = 20.5', 'Q3 = 22.0', 'Q3 = 85.0', 'Q3 = 21.0'],
    correctIndex: 1,
    hint: 'Q3 marks the 75th percentile rank in the upper half of sorted values.',
    explanation: 'The 75th percentile of this sorted distribution is 22.0.',
  },
  {
    id: 4,
    question: 'With Q1 = 19.0 and Q3 = 22.0, what is the Interquartile Range (IQR = Q3 - Q1)?',
    options: ['IQR = 4.0', 'IQR = 3.0', 'IQR = 41.0', 'IQR = 1.5'],
    correctIndex: 1,
    hint: 'IQR = Q3 - Q1 = 22.0 - 19.0.',
    explanation: 'IQR = 22.0 - 19.0 = 3.0. The middle 50% of students spans only 3 marks.',
  },
  {
    id: 5,
    question: 'Using the 1.5 × IQR rule (IQR = 3.0, step = 4.5), what is the Lower Outlier Fence (Q1 - 1.5 × IQR)?',
    options: ['Lower Fence = 14.5', 'Lower Fence = 16.0', 'Lower Fence = 0.0', 'Lower Fence = 12.5'],
    correctIndex: 0,
    hint: 'Lower Fence = 19.0 - (1.5 × 3.0) = 19.0 - 4.5.',
    explanation: 'Lower Fence = 19.0 - 4.5 = 14.5. Values below 14.5 are flagged as potential low outliers.',
  },
  {
    id: 6,
    question: 'What is the Upper Outlier Fence (Q3 + 1.5 × IQR) where Q3 = 22.0 and IQR = 3.0?',
    options: ['Upper Fence = 30.0', 'Upper Fence = 26.5', 'Upper Fence = 85.0', 'Upper Fence = 24.5'],
    correctIndex: 1,
    hint: 'Upper Fence = 22.0 + (1.5 × 3.0) = 22.0 + 4.5.',
    explanation: 'Upper Fence = 22.0 + 4.5 = 26.5. Values above 26.5 are flagged as potential high outliers.',
  },
  {
    id: 7,
    question: 'Does the observation 85 get mathematically flagged as an outlier by the 1.5 × IQR Tukey rule?',
    options: [
      'Yes, because 85 > Upper Fence (26.5).',
      'No, because 85 is less than 100.',
      'No, because student scores cannot be outliers.',
      'Yes, but only if standard deviation is zero.',
    ],
    correctIndex: 0,
    hint: 'Compare 85 against the Upper Fence of 26.5.',
    explanation: 'Yes! 85 is far above the upper threshold of 26.5 and is flagged as an extreme candidate for investigation.',
  },
  {
    id: 8,
    question: 'Consider a second dataset of retail transaction amounts: [₹500, ₹600, ₹550, ₹700, ₹650, ₹5,00,000]. Should ₹5,00,000 automatically be deleted?',
    options: [
      'Yes, any value above ₹1,000 is automatically a bug.',
      'No! Investigate domain context first; it could be a legitimate B2B corporate bulk purchase or a critical fraud signal.',
      'Yes, because deleting it makes the mean look much prettier.',
      'No, replace it with zero immediately.',
    ],
    correctIndex: 1,
    hint: 'Remember the core golden rule: An outlier is a signal to investigate, not an order to delete.',
    explanation: 'Never delete blindly! It could be a genuine corporate order or a fraudulent credit card breach.',
  },
  {
    id: 9,
    question: 'What additional metadata should you audit before deciding how to treat the ₹5,00,000 transaction?',
    options: [
      'Customer account history, purchased item quantity, payment method, and GST verification status.',
      'The font style used in the Python script.',
      'The operating system of the server.',
      'Only the number of columns in the CSV.',
    ],
    correctIndex: 0,
    hint: 'Look for domain-specific forensic features (quantity, buyer history, GST card).',
    explanation: 'Checking customer type, quantity ordered, and payment credentials verifies whether the transaction is valid B2B or stolen credit card fraud.',
  },
  {
    id: 10,
    question: 'Why is an outlier NOT automatically an error?',
    options: [
      'Because outliers only occur in synthetic mock datasets.',
      'Because extreme real-world events, elite performers, super-rich customers, and black-swan anomalies are genuine empirical facts.',
      'Because Python automatically converts all errors into NaNs.',
      'Because the 1.5 × IQR rule fixes all errors automatically.',
    ],
    correctIndex: 1,
    hint: 'Think about rare real-world phenomena like Olympic records, earthquakes, and luxury penthouses.',
    explanation: 'The physical universe contains genuine rare events and extremes. An anomaly is an empirical reality that must be understood in context.',
  },
];

export function OutlierDetectionChallenge() {
  const { completeTopic } = useCourseProgress();
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentTask = challengeTasks[currentTaskIndex];
  const selectedOption = selectedAnswers[currentTaskIndex];
  const isAnswered = selectedOption !== undefined;
  const isCorrect = isAnswered && selectedOption === currentTask.correctIndex;

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswers({ ...selectedAnswers, [currentTaskIndex]: index });
  };

  const handleCheck = () => {
    if (!isAnswered) return;
    setShowExplanation(true);
    if (selectedOption === currentTask.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setShowHint(false);
    if (currentTaskIndex < challengeTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setCompleted(true);
      completeTopic('module-2', 'outliers-detection-and-treatment');
      completeTopic('module-2', 'm2-t5');
    }
  };

  const handleRestart = () => {
    setCurrentTaskIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setShowHint(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem 1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Capstone Challenge 2.5
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Detective Mode: Complete Outlier Audit & Treatment
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
            Task {currentTaskIndex + 1} of {challengeTasks.length}
          </span>
          <Tag type="warm-gray" size="sm">Score: {score} / {challengeTasks.length}</Tag>
        </div>
      </div>

      {!completed ? (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            {currentTask.question}
          </h3>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '1.25rem 0' }}>
            {currentTask.options.map((opt, idx) => {
              const isOptionSelected = selectedOption === idx;
              let borderStyle = '1px solid var(--ds-border-subtle)';
              let bgStyle = 'var(--ds-bg-core)';
              let textColor = 'var(--ds-text-primary)';

              if (showExplanation) {
                if (idx === currentTask.correctIndex) {
                  borderStyle = '2px solid var(--ds-emerald)';
                  bgStyle = 'rgba(36, 161, 72, 0.15)';
                  textColor = 'var(--ds-emerald)';
                } else if (isOptionSelected) {
                  borderStyle = '2px solid #da1e28';
                  bgStyle = 'rgba(218, 30, 40, 0.15)';
                  textColor = '#da1e28';
                }
              } else if (isOptionSelected) {
                borderStyle = '2px solid var(--ds-cyan)';
                bgStyle = 'var(--ds-cyan-dim)';
                textColor = 'var(--ds-cyan)';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showExplanation}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '4px',
                    border: borderStyle,
                    background: bgStyle,
                    color: textColor,
                    textAlign: 'left',
                    cursor: showExplanation ? 'default' : 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{opt}</span>
                  {showExplanation && idx === currentTask.correctIndex && (
                    <CheckmarkFilled size={16} style={{ color: 'var(--ds-emerald)' }} />
                  )}
                  {showExplanation && isOptionSelected && idx !== currentTask.correctIndex && (
                    <CloseFilled size={16} style={{ color: '#da1e28' }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <Button
              kind="ghost"
              size="sm"
              renderIcon={Help}
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </Button>

            {!showExplanation ? (
              <Button
                size="sm"
                disabled={!isAnswered}
                onClick={handleCheck}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                size="sm"
                renderIcon={ArrowRight}
                onClick={handleNext}
              >
                {currentTaskIndex < challengeTasks.length - 1 ? 'Next Question' : 'Complete Challenge'}
              </Button>
            )}
          </div>

          {/* Hint Card */}
          {showHint && !showExplanation && (
            <div style={{ marginTop: '1rem', padding: '0.875rem', background: 'var(--cds-layer-02)', borderRadius: '4px', borderLeft: '3px solid var(--ds-amber)', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
              💡 <strong>Hint:</strong> {currentTask.hint}
            </div>
          )}

          {/* Explanation Card */}
          {showExplanation && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '1rem',
                borderRadius: '4px',
                background: 'var(--cds-layer-02)',
                borderLeft: `4px solid ${isCorrect ? 'var(--ds-emerald)' : '#da1e28'}`,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'var(--ds-text-secondary)',
              }}
            >
              <div style={{ fontWeight: 600, color: isCorrect ? 'var(--ds-emerald)' : '#da1e28', marginBottom: '4px' }}>
                {isCorrect ? '✓ Correct Analysis!' : '✕ Incorrect Reasoning'}
              </div>
              {currentTask.explanation}
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <Trophy size={48} style={{ color: 'var(--ds-amber)', margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Challenge Completed! Score: {score} / {challengeTasks.length}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', maxWidth: '540px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
            You have mastered the foundational mental model of Outlier Detection & Treatment.
            You know that mathematical detection does not determine treatment, that IQR is robust while Z-score has masking traps, and that domain context dictates whether an anomaly is a critical breakthrough or an entry bug.
          </p>

          <Button renderIcon={Restart} onClick={handleRestart}>
            Retake Challenge
          </Button>
        </div>
      )}
    </div>
  );
}
