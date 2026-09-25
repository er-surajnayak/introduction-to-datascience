'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Trophy, CheckmarkFilled, CloseFilled, Help, ArrowRight, Restart } from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';

interface ChallengeTask {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const challengeTasks: ChallengeTask[] = [
  {
    id: 1,
    question: 'Given the student dataset with 6 rows and 4 columns (Name, City, Marks, Attendance), what is the exact output of df.shape?',
    options: [
      '(6, 4)',
      '(4, 6)',
      '24',
      '[6, 4, 0]',
    ],
    correctIndex: 0,
    hint: 'df.shape returns a tuple formatted as (number_of_rows, number_of_columns).',
    explanation: 'df.shape returns the tuple (6, 4), indicating 6 observation rows across 4 feature columns.',
  },
  {
    id: 2,
    question: 'Which Pandas attribute returns the collection of column header strings?',
    options: [
      'df.columns',
      'df.headers()',
      'df.keys_all()',
      'df.column_names()',
    ],
    correctIndex: 0,
    hint: 'It is a property (not a function call) returning an Index object.',
    explanation: 'df.columns is the Index attribute containing all column label names.',
  },
  {
    id: 3,
    question: 'How do you extract a 2D subset DataFrame containing only the "Name" and "Marks" columns?',
    options: [
      'df[["Name", "Marks"]]',
      'df["Name", "Marks"]',
      'df.select("Name", "Marks")',
      'df.get_columns("Name", "Marks")',
    ],
    correctIndex: 0,
    hint: 'Double brackets [[...]] pass a Python list of column names to produce a DataFrame.',
    explanation: 'Passing a list of column names inside outer brackets (df[["Name", "Marks"]]) yields a 2D DataFrame slice.',
  },
  {
    id: 4,
    question: 'Which code constructs a Boolean filter to select students with Marks > 80?',
    options: [
      'df[df["Marks"] > 80]',
      'df.filter(Marks > 80)',
      'df.where("Marks" > 80)',
      'df["Marks" > 80]',
    ],
    correctIndex: 0,
    hint: 'df["Marks"] > 80 creates a Boolean mask, and wrapping it in df[...] extracts the matching rows.',
    explanation: 'df[df["Marks"] > 80] generates a Boolean Series mask and subsets the DataFrame.',
  },
  {
    id: 5,
    question: 'What is the correct Pandas syntax to filter students who have Marks > 80 AND Attendance > 85%?',
    options: [
      'df[(df["Marks"] > 80) & (df["Attendance"] > 85)]',
      'df[df["Marks"] > 80 and df["Attendance"] > 85]',
      'df[df["Marks"] > 80 && df["Attendance"] > 85]',
      'df.query_all(Marks > 80, Attendance > 85)',
    ],
    correctIndex: 0,
    hint: 'Remember: use bitwise & for elementwise logical AND, with explicit parentheses surrounding each clause.',
    explanation: 'Pandas requires bitwise & combined with parentheses around each condition to ensure correct operator precedence.',
  },
  {
    id: 6,
    question: 'How do you create a new Boolean column "Passed" that is True when Marks >= 75 and False otherwise?',
    options: [
      'df["Passed"] = df["Marks"] >= 75',
      'df.add_column("Passed", condition="Marks >= 75")',
      'df["Passed"] = True if df["Marks"] >= 75 else False',
      'df.create_bool("Passed", 75)',
    ],
    correctIndex: 0,
    hint: 'Vectorized Boolean comparison assigns the resulting Boolean Series directly to a new column name.',
    explanation: 'df["Passed"] = df["Marks"] >= 75 vectorizes the comparison and broadcasts the Boolean Series into the DataFrame.',
  },
  {
    id: 7,
    question: 'Which command sorts the students DataFrame by Marks from highest score down to lowest score?',
    options: [
      'df.sort_values("Marks", ascending=False)',
      'df.sort_values("Marks", ascending=True)',
      'df.order_by("Marks", desc=True)',
      'df.sort_desc("Marks")',
    ],
    correctIndex: 0,
    hint: 'Use sort_values with ascending=False for descending order.',
    explanation: 'df.sort_values("Marks", ascending=False) sorts records in descending order.',
  },
  {
    id: 8,
    question: 'Which method calculates the average Marks across all student rows in the DataFrame?',
    options: [
      'df["Marks"].mean()',
      'df["Marks"].average()',
      'df.calculate_mean("Marks")',
      'df["Marks"].sum() / "all"',
    ],
    correctIndex: 0,
    hint: 'The standard Pandas Series aggregation method for arithmetic average is .mean().',
    explanation: 'df["Marks"].mean() computes the numerical average across the Series.',
  },
  {
    id: 9,
    question: 'Given the cities ["Mumbai", "Pune", "Mumbai", "Nashik", "Pune", "Mumbai"], what does df["City"].value_counts() return?',
    options: [
      'A Series with counts: Mumbai: 3, Pune: 2, Nashik: 1',
      'The number 3',
      'An alphabetical list of city names',
      'A Boolean Series',
    ],
    correctIndex: 0,
    hint: 'value_counts() outputs the frequency count for every unique category.',
    explanation: 'value_counts() returns a frequency distribution Series mapping each unique level to its occurrence count.',
  },
  {
    id: 10,
    question: 'How do you calculate the average Marks for each city cohort separately?',
    options: [
      'df.groupby("City")["Marks"].mean()',
      'df.aggregate_by("City", mean="Marks")',
      'df.split("City").mean("Marks")',
      'df["City"].mean_by("Marks")',
    ],
    correctIndex: 0,
    hint: 'Use the Split-Apply-Combine pattern: df.groupby(cohort_column)[target_column].aggregation().',
    explanation: 'df.groupby("City")["Marks"].mean() partitions records by City, calculates the mean Marks per partition, and combines the summary.',
  },
  {
    id: 11,
    question: 'When retrieving the value at row label 0 and column "Marks", which statement uses label-based indexing?',
    options: [
      'df.loc[0, "Marks"]',
      'df.iloc[0, "Marks"]',
      'df.cell[0, "Marks"]',
      'df.find(0, "Marks")',
    ],
    correctIndex: 0,
    hint: 'loc uses labels; iloc strictly requires integer positional offsets.',
    explanation: 'df.loc[0, "Marks"] accesses elements via index and column labels.',
  },
  {
    id: 12,
    question: 'What is required for pd.merge(students, marks, on="StudentID", how="inner") to succeed?',
    options: [
      'Both DataFrames must contain a matching key column named "StudentID" with compatible identifiers.',
      'Both DataFrames must have identical column names throughout.',
      'Both DataFrames must be the exact same size.',
      'All values must be positive integers.',
    ],
    correctIndex: 0,
    hint: 'Relational equijoins match rows based on a shared key identifier column.',
    explanation: 'pd.merge requires a common key column (like StudentID) to match records between two relational tables.',
  },
  {
    id: 13,
    question: 'How do NumPy and Pandas collaborate in real-world data science workflows?',
    options: [
      'Pandas handles heterogeneous tabular data ingestion, filtering, grouping, and cleaning, while NumPy provides the underlying C-speed memory buffers for vectorized numerical calculations and machine learning matrices.',
      'They are competitors and cannot be imported in the same Python script.',
      'NumPy is only for HTML web scraping, while Pandas is for linear algebra.',
      'Pandas replaces NumPy entirely in modern Python.',
    ],
    correctIndex: 0,
    hint: 'Pandas wraps NumPy arrays with labels and indices, creating a unified data ecosystem.',
    explanation: 'Pandas provides tabular convenience and labels on top of NumPy\'s contiguous C-speed array computation engine.',
  },
];

export function DataOperationsChallenge() {
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
      completeTopic('module-2', 'numpy-and-pandas-operations');
      completeTopic('module-2', 'm2-t7');
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
            Capstone Challenge 2.7
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Analyze the Class: Comprehensive NumPy &amp; Pandas Audit
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
                {currentTaskIndex < challengeTasks.length - 1 ? 'Next Question' : 'Complete Module 2!'}
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
                {isCorrect ? '✓ Correct Execution!' : '✕ Incorrect Operation'}
              </div>
              {currentTask.explanation}
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <Trophy size={48} style={{ color: 'var(--ds-amber)', margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
            Module 2 Complete! Score: {score} / {challengeTasks.length}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
            You have mastered the full data engineering stack of Module 2! You know how to ingest streams, scrape web pages, diagnose data types, impute missing values, treat outliers, standardize messy representations, and manipulate datasets with vectorized NumPy &amp; Pandas operations.
          </p>

          <Button renderIcon={Restart} onClick={handleRestart}>
            Retake Challenge
          </Button>
        </div>
      )}
    </div>
  );
}
