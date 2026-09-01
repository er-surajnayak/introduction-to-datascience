'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Code,
  CheckmarkOutline,
  CloseOutline,
  Restart,
  ArrowRight,
  Idea,
} from '@carbon/icons-react';

interface DetectiveItem {
  id: number;
  valueDisplay: string;
  correctType: 'int' | 'float' | 'str' | 'bool';
  correctTypeName: string;
  explanation: string;
  dataScienceRelevance: string;
}

const detectiveItems: DetectiveItem[] = [
  {
    id: 1,
    valueDisplay: '42',
    correctType: 'int',
    correctTypeName: 'int (Integer)',
    explanation: '42 is a discrete whole number without decimal points or quotation marks.',
    dataScienceRelevance: 'Used for discrete counts (e.g. number of website visits, customer age in years, array indices).',
  },
  {
    id: 2,
    valueDisplay: '"42"',
    correctType: 'str',
    correctTypeName: 'str (String Text)',
    explanation: 'Enclosed in quotation marks ("42"), so Python treats it as raw text characters \'4\' and \'2\', NOT a number.',
    dataScienceRelevance: 'CSV files often import numeric columns as strings if headers or missing values ("NA") are present. You must cast with int() before doing math.',
  },
  {
    id: 3,
    valueDisplay: '3.14159',
    correctType: 'float',
    correctTypeName: 'float (Floating-Point Decimal)',
    explanation: 'Contains a decimal point representing a continuous mathematical value with fractional precision.',
    dataScienceRelevance: 'Model weights, probabilities (0.87), loss values, and percentages are stored as floats.',
  },
  {
    id: 4,
    valueDisplay: 'True',
    correctType: 'bool',
    correctTypeName: 'bool (Boolean Truth Value)',
    explanation: 'Capitalized keyword True represents the binary Boolean truth state.',
    dataScienceRelevance: 'Used for Boolean indexing masks in Pandas: df[df["age"] > 18] filters rows where the condition evaluates to True.',
  },
  {
    id: 5,
    valueDisplay: '"True"',
    correctType: 'str',
    correctTypeName: 'str (String Text)',
    explanation: 'Because it is wrapped in quotes, it is 4 Unicode text characters ("T-r-u-e"), NOT a Boolean condition!',
    dataScienceRelevance: 'In Python, bool("False") is True because non-empty strings are truthy! Comparing string "True" with boolean True returns False.',
  },
  {
    id: 6,
    valueDisplay: '"8.75"',
    correctType: 'str',
    correctTypeName: 'str (String Text)',
    explanation: 'Even though it looks like a decimal number to humans, quotes turn it into text.',
    dataScienceRelevance: 'Attempting to calculate "8.75" * 2 will output "8.758.75" (string duplication) instead of 17.5. Always check types!',
  },
  {
    id: 7,
    valueDisplay: '0',
    correctType: 'int',
    correctTypeName: 'int (Integer)',
    explanation: 'Zero is an integer representing a whole quantity or baseline count.',
    dataScienceRelevance: 'In binary classification, 0 typically represents the negative class (e.g. No Churn, Not Fraud).',
  },
  {
    id: 8,
    valueDisplay: 'False',
    correctType: 'bool',
    correctTypeName: 'bool (Boolean False State)',
    explanation: 'The capitalized keyword False represents the binary Boolean false state.',
    dataScienceRelevance: 'Under the hood in numerical math, Python treats False as 0 and True as 1. So [True, False, True].sum() equals 2.',
  },
];

const typeOptions = [
  { id: 'int', label: 'int', desc: 'Whole number' },
  { id: 'float', label: 'float', desc: 'Decimal number' },
  { id: 'str', label: 'str', desc: 'Text string' },
  { id: 'bool', label: 'bool', desc: 'Boolean (True/False)' },
];

export function TypeDetective() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const current = detectiveItems[currentIndex];

  const handleSelect = (typeId: string) => {
    if (showAnswer) return;
    setSelectedType(typeId);
    setShowAnswer(true);

    if (typeId === current.correctType) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < detectiveItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedType(null);
      setShowAnswer(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedType(null);
    setShowAnswer(false);
    setScore(0);
    setIsCompleted(false);
  };

  const isCorrect = selectedType === current?.correctType;

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
      {/* Top Header */}
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
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
            }}
          >
            Interactive Experience 2
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Type Detective: "What Type Does Python See?"
          </h3>
        </div>
        <Tag type="purple" size="md">
          Diagnostic Challenge
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Values that look identical to humans (like <code>42</code> vs <code>"42"</code>) are completely distinct objects to Python. Identify the exact data type below.
      </p>

      {!isCompleted ? (
        <div>
          {/* Progress Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-muted)',
              fontFamily: 'var(--ds-font-mono)',
            }}
          >
            <span>ITEM {current.id} OF {detectiveItems.length}</span>
            <span>SCORE: {score} / {detectiveItems.length}</span>
          </div>

          {/* Mystery Value Card */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--ds-bg-surface-elevated)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Inspect Value:
            </div>
            <div
              style={{
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--ds-cyan)',
                letterSpacing: '0.05em',
              }}
            >
              {current.valueDisplay}
            </div>
          </motion.div>

          {/* 4 Type Options */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '10px' }}>
              Choose the exact Python Type:
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
              }}
            >
              {typeOptions.map((t) => {
                const isSelected = selectedType === t.id;
                const isTarget = current.correctType === t.id;

                let border = '1px solid var(--ds-border-subtle)';
                let bg = 'var(--ds-bg-surface)';
                let color = 'var(--ds-text-primary)';

                if (showAnswer) {
                  if (isTarget) {
                    border = '2px solid var(--ds-emerald)';
                    bg = 'var(--ds-emerald-dim)';
                    color = 'var(--ds-emerald)';
                  } else if (isSelected && !isCorrect) {
                    border = '2px solid #da1e28';
                    bg = 'rgba(218, 30, 40, 0.1)';
                    color = '#da1e28';
                  }
                } else if (isSelected) {
                  border = '2px solid var(--ds-cyan)';
                  bg = 'var(--ds-cyan-dim)';
                }

                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={showAnswer}
                    onClick={() => handleSelect(t.id)}
                    style={{
                      padding: '12px 10px',
                      background: bg,
                      border,
                      borderRadius: '4px',
                      color,
                      fontWeight: 600,
                      cursor: showAnswer ? 'default' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{ fontSize: '1rem', fontFamily: 'var(--ds-font-mono)' }}>{t.label}</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Data Science Relevance */}
          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: isCorrect ? 'var(--ds-emerald-dim)' : 'rgba(255, 255, 255, 0.03)',
                  border: isCorrect ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-strong)',
                  borderRadius: '4px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {isCorrect ? (
                    <Tag type="green" size="md">
                      Correct: {current.correctTypeName}
                    </Tag>
                  ) : (
                    <Tag type="red" size="md">
                      Type: {current.correctTypeName}
                    </Tag>
                  )}
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                  {current.explanation}
                </p>

                <div
                  style={{
                    padding: '10px',
                    background: 'var(--ds-bg-surface)',
                    border: '1px dashed var(--ds-border-subtle)',
                    borderRadius: '3px',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-text-secondary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '4px' }}>
                    <Idea size={14} /> Why This Matters in Data Science
                  </div>
                  {current.dataScienceRelevance}
                </div>

                <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
                  <Button
                    size="md"
                    kind="primary"
                    renderIcon={ArrowRight}
                    onClick={handleNext}
                  >
                    {currentIndex < detectiveItems.length - 1 ? 'Next Value' : 'See Results'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Completed Card */
        <div
          style={{
            textAlign: 'center',
            padding: '2.5rem 1rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--ds-purple-dim)',
              color: 'var(--ds-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <Code size={28} />
          </div>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 0.5rem 0' }}>
            Detective Challenge Completed: {score} / {detectiveItems.length}
          </h4>
          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
            You can now spot the critical differences between numeric types, strings, and boolean states. This discernment is vital when parsing raw CSV columns and debugging data pipelines.
          </p>
          <Button
            size="md"
            kind="tertiary"
            renderIcon={Restart}
            onClick={handleRestart}
            style={{
              borderColor: 'var(--ds-border-strong)',
              color: 'var(--ds-text-primary)',
            }}
          >
            Replay Detective
          </Button>
        </div>
      )}
    </div>
  );
}
