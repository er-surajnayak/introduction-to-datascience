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
} from '@carbon/icons-react';

interface ChallengeQ {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const challengeQuestions: ChallengeQ[] = [
  {
    id: 1,
    question: '1. How many missing values (NaN) exist in the `Marks` column across the 5 students?',
    options: ['0 missing', '1 missing', '2 missing (Students C and E)', '4 missing'],
    correctIndex: 2,
    hint: 'Inspect the Marks column for Student C and Student E.',
    explanation: 'Students C and E have NaN in the Marks column, giving a total of 2 missing values (40% missingness).',
  },
  {
    id: 2,
    question: '2. What is the missingness percentage in the `Attendance` column?',
    options: ['10%', '20% (1 out of 5 rows)', '40%', '0%'],
    correctIndex: 1,
    hint: 'Calculate (1 missing value / 5 total rows) * 100.',
    explanation: 'Student E is missing Attendance: 1 / 5 = 0.20, which is exactly 20.0%.',
  },
  {
    id: 3,
    question: '3. If you run `df.dropna()` on this 5-student dataset, how many student rows will remain?',
    options: ['4 rows', '3 rows', 'Only 1 row (Student A)', '0 rows'],
    correctIndex: 2,
    hint: 'Check how many rows have ZERO missing values across all columns.',
    explanation: 'Only Student A has complete data across all columns. dropna() deletes Students B, C, D, and E (80% catastrophic data loss!).',
  },
  {
    id: 4,
    question: '4. Which imputation strategy is most appropriate for the categorical `Department` column (Missing for Student D)?',
    options: [
      'Mean Imputation (adding text strings)',
      'Mode Imputation (filling with "CSE", the most frequent branch)',
      'Multiply by 10',
      'Fill with 0',
    ],
    correctIndex: 1,
    hint: 'Categories do not have mathematical averages; look for the most common label.',
    explanation: 'Mode Imputation (`df["Department"].mode()[0]`) fills missing categorical cells with the most common class ("CSE").',
  },
  {
    id: 5,
    question: '5. What is the arithmetic mean of the observed `Marks` values (Student A: 85, B: 78, D: 91)?',
    options: ['84.67', '78.0', '91.0', '80.0'],
    correctIndex: 0,
    hint: '(85 + 78 + 91) / 3 = 254 / 3.',
    explanation: 'The observed marks are 85, 78, and 91. The mean is 254 / 3 = 84.67.',
  },
  {
    id: 6,
    question: '6. What is the median of the observed `Age` values (20, 21, 22, 20)?',
    options: ['20.5', '21.0', '20.0', '22.0'],
    correctIndex: 0,
    hint: 'Sort the numbers: [20, 20, 21, 22]. The median is the average of the two middle values (20 + 21) / 2.',
    explanation: 'Sorted observed ages: [20, 20, 21, 22]. The 50th percentile midpoint is (20 + 21) / 2 = 20.5.',
  },
  {
    id: 7,
    question: '7. Why is `df["Age"].ffill()` completely invalid for imputing Student B\'s age in this table?',
    options: [
      'Because ffill() only works on floating point numbers.',
      'Because the rows are unordered student entities; Student A\'s age has no chronological connection to Student B.',
      'Because Python crashes if ffill is called on integer columns.',
      'Because Student B is in the CSE department.',
    ],
    correctIndex: 1,
    hint: 'Does alphabetical or arbitrary spreadsheet row order imply physical time continuity?',
    explanation: 'Forward fill is only valid for sequential time series. In independent student records, row order is arbitrary.',
  },
  {
    id: 8,
    question: '8. Student E is missing BOTH Marks and Attendance. What missingness mechanism is most likely?',
    options: [
      'Pure hardware sensor failure',
      'MAR / MNAR (Student E dropped out or was on extended medical leave)',
      'MCAR (completely independent coin toss)',
      'Floating point overflow',
    ],
    correctIndex: 1,
    hint: 'Notice how multiple academic fields are simultaneously absent for the same student.',
    explanation: 'Simultaneous missingness across related academic variables indicates an underlying non-random event (e.g. dropout or illness).',
  },
  {
    id: 9,
    question: '9. Which Python expression verifies programmatically that zero NaNs remain in the DataFrame?',
    options: [
      'assert df.isna().sum().sum() == 0',
      'assert df.count() == 100',
      'assert df.dropna() == True',
      'assert df.shape[0] == 0',
    ],
    correctIndex: 0,
    hint: 'df.isna().sum().sum() aggregates all column null counts into a single total.',
    explanation: '`df.isna().sum().sum() == 0` confirms that all missing cells across all columns have been completely resolved.',
  },
  {
    id: 10,
    question: '10. Now that missing values are cleaned, what is the next data anomaly we must learn to detect in Topic 2.5?',
    options: [
      'Outliers — values that are present but suspiciously extreme or anomalous.',
      'Compiling C++ code for GPUs.',
      'Re-installing Pandas in Jupyter.',
      'Deleting the operating system.',
    ],
    correctIndex: 0,
    hint: 'What is the title of Topic 2.5?',
    explanation: 'Once missing values are resolved, Topic 2.5 teaches how to detect values that are present but extreme or corrupted (Outliers Detection & Treatment).',
  },
];

export function MissingDataChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = challengeQuestions[currentIndex];
  const userSelection = selectedAnswers[currentQ.id];
  const isAnswered = userSelection !== undefined;
  const isCorrect = userSelection === currentQ.correctIndex;

  const handleSelect = (idx: number) => {
    if (isCompleted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleNext = () => {
    if (currentIndex < challengeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag type="red" size="md">
              Capstone Challenge
            </Tag>
            <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
              Missing Data Mastery Challenge
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
          🧹 The Missing Data Challenge: Clean the Student Roster
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Inspect the 5-row challenge table below. Answer all 10 diagnostic questions to master missingness mechanisms, imputation math, and post-validation checks before proceeding to <strong>Topic 2.5 Outliers</strong>.
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
            TABLE: student_records_dirty.csv
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
            <thead>
              <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>Student</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>Age</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>Marks</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>Department</th>
                <th style={{ padding: '8px', color: 'var(--ds-text-primary)' }}>Attendance</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', color: 'var(--ds-cyan)' }}>A</td>
                <td style={{ padding: '8px' }}>20</td>
                <td style={{ padding: '8px' }}>85</td>
                <td style={{ padding: '8px' }}>CSE</td>
                <td style={{ padding: '8px' }}>92</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', color: 'var(--ds-cyan)' }}>B</td>
                <td style={{ padding: '8px', color: '#da1e28' }}>NaN</td>
                <td style={{ padding: '8px' }}>78</td>
                <td style={{ padding: '8px' }}>CSE</td>
                <td style={{ padding: '8px' }}>88</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', color: 'var(--ds-cyan)' }}>C</td>
                <td style={{ padding: '8px' }}>21</td>
                <td style={{ padding: '8px', color: '#da1e28' }}>NaN</td>
                <td style={{ padding: '8px' }}>ECE</td>
                <td style={{ padding: '8px' }}>91</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', color: 'var(--ds-cyan)' }}>D</td>
                <td style={{ padding: '8px' }}>22</td>
                <td style={{ padding: '8px' }}>91</td>
                <td style={{ padding: '8px', color: '#da1e28' }}>NaN</td>
                <td style={{ padding: '8px' }}>95</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px', color: 'var(--ds-cyan)' }}>E</td>
                <td style={{ padding: '8px' }}>20</td>
                <td style={{ padding: '8px', color: '#da1e28' }}>NaN</td>
                <td style={{ padding: '8px' }}>CSE</td>
                <td style={{ padding: '8px', color: '#da1e28' }}>NaN</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Question Stepper */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {challengeQuestions.map((q, idx) => {
            const isAnsweredQ = selectedAnswers[q.id] !== undefined;
            const isCorrectQ = selectedAnswers[q.id] === q.correctIndex;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
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
                Question {currentIndex + 1} of {challengeQuestions.length}
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
                    onClick={() => handleSelect(optIdx)}
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
              <Button size="md" kind="secondary" disabled={currentIndex === 0} onClick={handlePrev}>
                Previous
              </Button>
              <Button size="md" kind="primary" renderIcon={ArrowRight} disabled={!isAnswered} onClick={handleNext}>
                {currentIndex === challengeQuestions.length - 1 ? 'Finish Challenge' : 'Next Question'}
              </Button>
            </div>
          </div>
        ) : (
          /* Completion Summary */
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '1rem 0' }}>
            <Trophy size={48} style={{ color: 'var(--ds-emerald)', margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
              Challenge Completed! Score: {totalScore} / {challengeQuestions.length}
            </h4>
            <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              {totalScore >= 8
                ? 'Mastery Proven! You possess rigorous intuition for missingness mechanisms (MCAR/MAR/MNAR), dropna compounding risks, and statistical imputation validation.'
                : 'Good effort! Review the questions above to solidify why dropna() causes extreme data loss and why mean vs median depends on outliers.'}
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
                Next Cleaning Stage Transition
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.6 }}>
                <strong>&quot;Missing values aren&apos;t the only strange things hiding in a dataset. Sometimes a value is present — but suspiciously different from the rest.&quot;</strong>
                <br />
                Now that all missing cells are diagnosed and imputed, we proceed to <strong>Topic 2.5 Outliers Detection & Treatment</strong> to detect extreme values and corrupted spikes using Z-scores, IQR, and visual boxplots.
              </div>
            </div>

            <Button kind="primary" renderIcon={Restart} onClick={handleReset}>
              Retake Challenge
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
