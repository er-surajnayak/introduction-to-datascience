'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  CheckmarkFilled,
  ErrorFilled,
  Help,
  Trophy,
  ArrowRight,
  Restart,
  CheckmarkOutline,
} from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';

interface ChallengeQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const challengeQuestions: ChallengeQuestion[] = [
  {
    id: 1,
    question: '1. Which column in this dataset functions as a unique entity Identifier?',
    options: ['city', 'customer_id', 'membership', 'rating'],
    correctIndex: 1,
    hint: 'Look for the column that distinguishes individual accounts rather than measuring a quantity.',
    explanation: '`customer_id` is a unique key/identifier used to index individual customer records.',
  },
  {
    id: 2,
    question: '2. Which of the following columns are Numerical variables in this dataset?',
    options: ['city and membership', 'age and rating', 'review and purchase_time', 'customer_id and age'],
    correctIndex: 1,
    hint: 'Identify columns representing quantities or measurable numerical scores.',
    explanation: '`age` (discrete count of years) and `rating` (continuous evaluation score) are true numerical variables.',
  },
  {
    id: 3,
    question: '3. Which column is an Ordinal categorical variable possessing a meaningful rank order?',
    options: ['city', 'customer_id', 'membership', 'review'],
    correctIndex: 2,
    hint: 'Look for loyalty tiers where one level is higher than another.',
    explanation: '`membership` is Ordinal because subscription tiers have a natural ranking: Gold > Silver > Bronze.',
  },
  {
    id: 4,
    question: '4. Which categorical variable is strictly Nominal with no intrinsic ranking?',
    options: ['membership', 'city', 'age', 'rating'],
    correctIndex: 1,
    hint: 'Compare geographical locations: is one metro city mathematically "greater" than another?',
    explanation: '`city` is Nominal because metro locations (Pune, Mumbai) are unordered group categories.',
  },
  {
    id: 5,
    question: '5. Which column represents Unstructured Text data?',
    options: ['purchase_time', 'review', 'membership', 'city'],
    correctIndex: 1,
    hint: 'Look for free-form human language strings containing feedback words.',
    explanation: '`review` contains free-form human feedback text ("Fast!", "Great") that requires NLP parsing.',
  },
  {
    id: 6,
    question: '6. Which column provides the temporal coordinate for Time-Series and Trend Analysis?',
    options: ['age', 'purchase_time', 'customer_id', 'rating'],
    correctIndex: 1,
    hint: 'Look for the timestamp recording when the transaction occurred.',
    explanation: '`purchase_time` is a Datetime coordinate representing the exact timestamp of checkout.',
  },
  {
    id: 7,
    question: '7. In this dataset, how should `rating` (e.g. 4.5, 3.0, 5.0) be treated for average satisfaction calculations?',
    options: [
      'As a numerical measurement score where mean and variance are valid.',
      'As an unstructured audio waveform.',
      'As a unique database foreign key that cannot be averaged.',
      'As an unmodifiable boolean flag.',
    ],
    correctIndex: 0,
    hint: 'Can you compute the average customer rating of a restaurant?',
    explanation: '`rating` represents a numerical feedback score on a 1.0 to 5.0 scale where computing averages (e.g. 4.17 stars) is standard practice.',
  },
  {
    id: 8,
    question: '8. Why is computing `df["customer_id"].mean()` a critical statistical error?',
    options: [
      'Because customer IDs are floating point decimals.',
      'Because customer_id is an identifier, not a magnitude; averaging IDs creates a meaningless fictional number.',
      'Because Python crashes if you calculate the mean of numbers below 1,000.',
      'Because customer IDs must always be multiplied, never averaged.',
    ],
    correctIndex: 1,
    hint: 'What real-world entity does "Customer 102.0" represent?',
    explanation: 'An identifier distinguishes entities; it does not measure a quantity. Averaging customer IDs produces statistical nonsense.',
  },
  {
    id: 9,
    question: '9. Which type of data source most likely generated this entire multi-column record?',
    options: [
      'An e-commerce / food delivery transactional database & order checkout stream',
      'An analog thermometer sensor probe in a greenhouse',
      'A random Wikipedia web page article',
      'An audio microphone recording',
    ],
    correctIndex: 0,
    hint: 'Consider the combination of customer IDs, ratings, memberships, and purchase timestamps.',
    explanation: 'This tabular schema is characteristic of an e-commerce transactional database capturing order transactions.',
  },
  {
    id: 10,
    question: '10. If this dataset contains null/empty values in the `rating` or `review` columns, what is our immediate next analytical task?',
    options: [
      'Delete the entire database table and cancel the project.',
      'Proceed to Topic 2.4 (Missing Data Imputation) to diagnose and impute missing values.',
      'Convert all numbers into random strings.',
      'Assume all missing ratings were 5.0 stars without investigation.',
    ],
    correctIndex: 1,
    hint: 'What is the next topic in the Module 2 collection & preprocessing pipeline?',
    explanation: 'Once data types and semantics are diagnosed, handling missing values is the mandatory next step in Topic 2.4 Missing Data Imputation.',
  },
];

export function DatasetDetectiveChallenge() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = challengeQuestions[currentQuestionIndex];
  const userSelection = selectedAnswers[currentQ.id];
  const isAnswered = userSelection !== undefined;
  const isCorrect = userSelection === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isCompleted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < challengeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowHint({});
    setIsCompleted(false);
  };

  const totalScore = Object.entries(selectedAnswers).filter(
    ([id, ansIdx]) => challengeQuestions.find((q) => q.id === Number(id))?.correctIndex === ansIdx
  ).length;

  return (
    <section
      style={{
        padding: '2.5rem 0',
        borderTop: '1px solid var(--ds-border-subtle)',
        marginTop: '2rem',
      }}
    >
      <div
        className="ds-glass-panel"
        style={{
          padding: '2rem',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag type="red" size="md">
              Capstone Challenge
            </Tag>
            <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
              Dataset Detective Mastery Challenge
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
              Score: {totalScore} / {challengeQuestions.length}
            </span>
            <Button kind="ghost" size="sm" renderIcon={Restart} onClick={handleReset}>
              Reset Challenge
            </Button>
          </div>
        </div>

        <h3 style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
          🔎 The Dataset Detective: Audit the Delivery Table
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Inspect the live dataset table below. Answer all 10 diagnostic questions to prove your mastery of data types, sources, identifiers, and structures before moving to <strong>Topic 2.4 Missing Data Imputation</strong>.
        </p>

        {/* Evidence Table */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            marginBottom: '1.5rem',
            overflowX: 'auto',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '6px' }}>
            TABLE: food_delivery_orders_raw.csv (3 Sample Rows)
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
            <thead>
              <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>customer_id</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>city</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>age</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>rating</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>membership</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>review</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>purchase_time</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', color: 'var(--ds-cyan)' }}>101</td>
                <td style={{ padding: '8px' }}>Pune</td>
                <td style={{ padding: '8px' }}>21</td>
                <td style={{ padding: '8px' }}>4.5</td>
                <td style={{ padding: '8px', color: 'var(--ds-amber)' }}>Gold</td>
                <td style={{ padding: '8px' }}>&quot;Fast!&quot;</td>
                <td style={{ padding: '8px', color: 'var(--ds-text-muted)' }}>2026-09-15 14:32</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', color: 'var(--ds-cyan)' }}>102</td>
                <td style={{ padding: '8px' }}>Mumbai</td>
                <td style={{ padding: '8px' }}>24</td>
                <td style={{ padding: '8px' }}>3.0</td>
                <td style={{ padding: '8px', color: 'var(--ds-text-muted)' }}>Silver</td>
                <td style={{ padding: '8px' }}>&quot;Okay&quot;</td>
                <td style={{ padding: '8px', color: 'var(--ds-text-muted)' }}>2026-09-15 15:01</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', color: 'var(--ds-cyan)' }}>103</td>
                <td style={{ padding: '8px' }}>Pune</td>
                <td style={{ padding: '8px' }}>20</td>
                <td style={{ padding: '8px' }}>5.0</td>
                <td style={{ padding: '8px', color: 'var(--ds-amber)' }}>Gold</td>
                <td style={{ padding: '8px' }}>&quot;Great&quot;</td>
                <td style={{ padding: '8px', color: 'var(--ds-text-muted)' }}>2026-09-15 15:22</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Progress Stepper Indicator */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {challengeQuestions.map((q, idx) => {
            const isAnsweredQ = selectedAnswers[q.id] !== undefined;
            const isCorrectQ = selectedAnswers[q.id] === q.correctIndex;
            const isCurrent = idx === currentQuestionIndex;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                style={{
                  flex: 1,
                  minWidth: '34px',
                  padding: '6px 2px',
                  borderRadius: '3px',
                  border: isCurrent
                    ? '2px solid var(--ds-cyan)'
                    : isAnsweredQ
                    ? isCorrectQ
                      ? '1px solid var(--ds-emerald)'
                      : '1px solid #da1e28'
                    : '1px solid var(--ds-border-subtle)',
                  background: isCurrent
                    ? 'var(--ds-cyan-dim)'
                    : isAnsweredQ
                    ? isCorrectQ
                      ? 'var(--ds-emerald-dim)'
                      : 'rgba(218, 30, 40, 0.15)'
                    : 'var(--ds-bg-surface-elevated)',
                  color: isCurrent
                    ? 'var(--ds-cyan)'
                    : isAnsweredQ
                    ? isCorrectQ
                      ? 'var(--ds-emerald)'
                      : '#da1e28'
                    : 'var(--ds-text-secondary)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--ds-font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                Q{q.id}
              </button>
            );
          })}
        </div>

        {!isCompleted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                Question {currentQuestionIndex + 1} of {challengeQuestions.length}
              </span>
              <button
                onClick={() => setShowHint((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ds-amber)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8125rem',
                }}
              >
                <Help size={16} />
                <span>{showHint[currentQ.id] ? 'Hide Detective Clue' : 'Need a Clue?'}</span>
              </button>
            </div>

            <h4 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              {currentQ.question}
            </h4>

            {/* Hint Drawer */}
            <AnimatePresence>
              {showHint[currentQ.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(241, 194, 27, 0.1)',
                    border: '1px solid var(--ds-amber)',
                    borderRadius: '4px',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-amber)',
                    marginBottom: '1rem',
                  }}
                >
                  💡 <strong>Detective Clue:</strong> {currentQ.hint}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userSelection === optIdx;
                let borderColor = 'var(--ds-border-subtle)';
                let bgColor = 'var(--ds-bg-surface)';
                let textColor = 'var(--ds-text-primary)';

                if (isAnswered) {
                  if (optIdx === currentQ.correctIndex) {
                    borderColor = 'var(--ds-emerald)';
                    bgColor = 'var(--ds-emerald-dim)';
                    textColor = 'var(--ds-emerald)';
                  } else if (isSelected) {
                    borderColor = '#da1e28';
                    bgColor = 'rgba(218, 30, 40, 0.15)';
                    textColor = '#da1e28';
                  }
                } else if (isSelected) {
                  borderColor = 'var(--ds-cyan)';
                  bgColor = 'var(--ds-cyan-dim)';
                  textColor = 'var(--ds-cyan)';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '4px',
                      border: `1px solid ${borderColor}`,
                      background: bgColor,
                      color: textColor,
                      fontSize: '0.875rem',
                      fontWeight: isSelected ? 600 : 400,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{opt}</span>
                    {isAnswered && optIdx === currentQ.correctIndex && (
                      <CheckmarkFilled size={18} style={{ color: 'var(--ds-emerald)' }} />
                    )}
                    {isAnswered && isSelected && optIdx !== currentQ.correctIndex && (
                      <ErrorFilled size={18} style={{ color: '#da1e28' }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    padding: '12px 14px',
                    background: isCorrect ? 'var(--ds-emerald-dim)' : 'rgba(218, 30, 40, 0.1)',
                    border: isCorrect ? '1px solid var(--ds-emerald)' : '1px solid #da1e28',
                    borderRadius: '4px',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-text-primary)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.5,
                  }}
                >
                  <strong>{isCorrect ? 'Correct Diagnostic!' : 'Incorrect Diagnostic:'}</strong> {currentQ.explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button size="md" kind="secondary" disabled={currentQuestionIndex === 0} onClick={handlePrev}>
                Previous
              </Button>
              <Button size="md" kind="primary" renderIcon={ArrowRight} disabled={!isAnswered} onClick={handleNext}>
                {currentQuestionIndex === challengeQuestions.length - 1 ? 'Finish Challenge' : 'Next Question'}
              </Button>
            </div>
          </div>
        ) : (
          /* Completion Summary & Transition */
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '1rem 0' }}>
            <Trophy size={48} style={{ color: 'var(--ds-emerald)', margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
              Challenge Completed! Score: {totalScore} / {challengeQuestions.length}
            </h4>
            <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              {totalScore >= 8
                ? 'Outstanding detective work! You possess a robust analytical mental model of data types, identifiers, sources, and structures.'
                : 'Good effort! Review the questions above to sharpen your understanding of identifiers vs measurements and nominal vs ordinal categories.'}
            </p>

            <div
              style={{
                padding: '1.25rem',
                background: 'var(--ds-cyan-dim)',
                border: '1px solid var(--ds-cyan)',
                borderRadius: '4px',
                maxWidth: '640px',
                margin: '0 auto 1.5rem auto',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Next Ingestion Stage Transition
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.6 }}>
                <strong>&quot;Now that we know what our data means, what happens when some of that data is missing?&quot;</strong>
                <br />
                Real-world web scrapes and IoT streams are filled with dropped rows, missing ratings, and empty fields. In <strong>Topic 2.4 Missing Data Imputation</strong>, you will learn how to detect, analyze mechanisms (MCAR, MAR, MNAR), and statistically treat missing values.
              </div>
            </div>

            <Button kind="primary" renderIcon={Restart} onClick={handleReset}>
              Retake Detective Challenge
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
