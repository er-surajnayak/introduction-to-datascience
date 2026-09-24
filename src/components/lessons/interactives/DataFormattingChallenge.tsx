'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Trophy, CheckmarkFilled, CloseFilled, Help, ArrowRight, Restart, Clean } from '@carbon/icons-react';
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
    question: 'In the raw dataset data = {"name": ["Rahul", "Priya", "Arjun", "Sneha"], "city": [" Mumbai", "mumbai ", "MUMBAI", " Mumbai "]}, how many unique cities would Pandas count before cleaning?',
    options: [
      '1 unique city ("Mumbai")',
      '3 unique cities (" Mumbai", "mumbai ", "MUMBAI")',
      '4 unique cities (every string is distinct due to casing and leading/trailing whitespace)',
      '0 unique cities (causes a compile error)',
    ],
    correctIndex: 2,
    hint: 'Notice that " Mumbai" has a leading space, "mumbai " has a trailing space, "MUMBAI" is uppercase, and " Mumbai " has spaces on both ends.',
    explanation: 'Because string equality is exact and case/whitespace-sensitive, Pandas sees 3 or 4 distinct string objects instead of 1 conceptual city entity.',
  },
  {
    id: 2,
    question: 'Which Pandas transformation chain will cleanly transform [" Mumbai", "mumbai ", "MUMBAI", " Mumbai "] into unified ["Mumbai", "Mumbai", "Mumbai", "Mumbai"]?',
    options: [
      'df["city"].str.strip().str.title()',
      'df["city"].to_numeric()',
      'df["city"].str.replace(" ", "")',
      'df["city"].dropna()',
    ],
    correctIndex: 0,
    hint: 'First remove surrounding whitespace with strip(), then convert casing to standard title case.',
    explanation: '.str.strip() removes all leading and trailing whitespace padding, and .str.title() standardizes casing so only the initial character is capitalized.',
  },
  {
    id: 3,
    question: 'For gender = ["M", "Female", "male", "F"], what is the safest and most transparent way to map values to standard ["Male", "Female"]?',
    options: [
      'Use an explicit dictionary map: df["gender"].map({"M": "Male", "male": "Male", "F": "Female", "Female": "Female"})',
      'Use df["gender"].str.upper() and leave single letters alone',
      'Delete all rows where length < 4',
      'Replace all letters starting with M with True',
    ],
    correctIndex: 0,
    hint: 'Explicit dictionary mapping provides deterministic transformation and ensures unmapped categories become visible NaN values.',
    explanation: 'An explicit semantic dictionary mapping (df.map({...})) is auditable, deterministic, and preserves domain intent without ambiguous regexes.',
  },
  {
    id: 4,
    question: 'Marks are stored as ["85", "92", "78", "100"]. Why can you NOT safely compute the mean or filter with marks > 80 directly?',
    options: [
      'Because they are stored as strings (object dtype), where "100" < "85" in alphabetical lexicographic comparison and math operations fail.',
      'Because Python integers cannot exceed 50.',
      'Because Pandas does not support numbers inside lists.',
      'Because marks must always be negative.',
    ],
    correctIndex: 0,
    hint: 'In string comparisons, "100" comes before "85" alphabetically because "1" < "8".',
    explanation: 'Numeric text comparison is alphabetical: "100" is lexicographically smaller than "85". Converting via pd.to_numeric() is essential for mathematical truth.',
  },
  {
    id: 5,
    question: 'If marks contains an unexpected invalid entry ["85", "92", "absent", "78"], what does pd.to_numeric(df["marks"], errors="coerce") do?',
    options: [
      'Converts "absent" to NaN (missing value) while parsing the valid strings into float64 numbers.',
      'Crashes the program with a ValueError.',
      'Replaces "absent" with 0 automatically.',
      'Deletes the entire column.',
    ],
    correctIndex: 0,
    hint: 'errors="coerce" turns non-parseable values into NaN, linking formatting directly to missing data handling (Topic 2.4).',
    explanation: 'errors="coerce" gracefully converts unparseable strings into NaN so data scientists can audit and impute them rather than crashing the pipeline.',
  },
  {
    id: 6,
    question: 'When parsing date strings ["01/08/2026", "2026-08-01", "Aug 1, 2026", "01-Aug-26"], what major advantage does pd.to_datetime() provide?',
    options: [
      'It converts them into unified datetime64 objects, enabling chronological sorting, date filtering, and .dt accessors (.year, .month, .day).',
      'It deletes all dates before year 2020.',
      'It turns dates into random numbers.',
      'It forces all dates into Unix epoch seconds.',
    ],
    correctIndex: 0,
    hint: 'Datetime conversion turns raw text into structured timestamps with calendar intelligence.',
    explanation: 'pd.to_datetime() standardizes heterogeneous strings into ISO timestamps, unlocks date math (elapsed days), and enables time series analysis in Module 4.',
  },
  {
    id: 7,
    question: 'Why should a student ID "00123" NOT be converted blindly to numeric integer 123?',
    options: [
      'Because student IDs are categorical alphanumeric identifiers where leading zeros are meaningful semantic codes, not numerical quantities.',
      'Because Python cannot store 3-digit numbers.',
      'Because 123 is an illegal number in Pandas.',
      'Because integer 123 takes more memory than string "00123".',
    ],
    correctIndex: 0,
    hint: 'Ask: Does computing the mean of student IDs make sense? If not, it is an identifier, not a quantity.',
    explanation: 'Identifiers, postal codes, and phone numbers must preserve leading zeros and formatting because they represent codes rather than mathematical quantities.',
  },
  {
    id: 8,
    question: 'How should monetary transaction amounts like "₹50,000" be structured for production data science pipelines?',
    options: [
      'Store as pure numeric float/int (50000) for analytical computation; apply "₹" currency symbols only in reports and UI presentation layers.',
      'Keep "₹50,000" as text in the analytical database.',
      'Convert all currency to US dollars before saving.',
      'Delete the price column completely.',
    ],
    correctIndex: 0,
    hint: 'Separate analytical storage (pure numbers) from presentation formatting (currency symbols and commas).',
    explanation: 'Always decouple analytical storage (numbers for aggregation and machine learning) from presentation formatting (UI and visual reporting).',
  },
  {
    id: 9,
    question: 'You encounter the ambiguous date string "01/02/2026" in a client CSV. What is the correct data science protocol?',
    options: [
      'Inspect column documentation, sample dates with day > 12, or consult the originating source before setting dayfirst=True or format="%d/%m/%Y".',
      'Assume it is always MM/DD/YYYY because US format is universal.',
      'Assume it is always DD/MM/YYYY because UK/India format is universal.',
      'Delete the row to avoid dealing with ambiguity.',
    ],
    correctIndex: 0,
    hint: 'Never guess ambiguous formats; inspect anchor dates (e.g. 25/02/2026) or source metadata.',
    explanation: 'Date ambiguity (Feb 1 vs Jan 2) must be resolved via source metadata, anchor records (dates > 12), or explicit client consultation.',
  },
  {
    id: 10,
    question: 'What is the fundamental difference between Data Formatting and Min-Max Normalization?',
    options: [
      'Formatting unifies representations (casing, datetime, whitespace) for consistency; Min-Max scaling is numerical transformation that maps values into [0, 1] for ML algorithms.',
      'They are identical operations with different names.',
      'Min-Max normalization is for strings, while formatting is for numbers.',
      'Formatting is only used in SQL, while normalization is only used in Excel.',
    ],
    correctIndex: 0,
    hint: 'Review the dual meanings: representation standardization vs mathematical feature scaling.',
    explanation: 'Formatting ensures consistent string/type representation so queries work correctly; Min-Max scaling is mathematical feature scaling for machine learning algorithms.',
  },
];

export function DataFormattingChallenge() {
  const { completeTopic } = useCourseProgress();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentTask = challengeTasks[currentTaskIndex];
  const selectedOption = selectedAnswers[currentTask.id];
  const isAnswered = selectedOption !== undefined;
  const isCorrect = isAnswered && selectedOption === currentTask.correctIndex;

  const handleSelect = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentTask.id]: optionIndex,
    }));
  };

  const handleCheck = () => {
    if (!isAnswered) return;
    setShowExplanation(true);
    if (selectedOption === currentTask.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setShowHint(false);
    if (currentTaskIndex < challengeTasks.length - 1) {
      setCurrentTaskIndex((i) => i + 1);
    } else {
      setCompleted(true);
      completeTopic('module-2', 'data-formatting-and-normalization');
      completeTopic('module-2', 'm2-t6');
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Capstone Challenge 2.6
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Data Formatting & Normalization Audit
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
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
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
                    <CheckmarkFilled size={16} style={{ color: 'var(--ds-emerald)', flexShrink: 0, marginLeft: '8px' }} />
                  )}
                  {showExplanation && isOptionSelected && idx !== currentTask.correctIndex && (
                    <CloseFilled size={16} style={{ color: '#da1e28', flexShrink: 0, marginLeft: '8px' }} />
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
          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', maxWidth: '560px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
            You have mastered Data Formatting and Normalization. You know how to strip whitespace, standardize casing, map categories, coerce numeric strings, parse ambiguous dates, preserve semantic identifiers, and differentiate representation formatting from Min-Max scaling.
          </p>

          <Button renderIcon={Restart} onClick={handleRestart}>
            Retake Challenge
          </Button>
        </div>
      )}
    </div>
  );
}
