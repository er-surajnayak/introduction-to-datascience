'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  CheckmarkOutline,
  CloseOutline,
  Restart,
  ArrowRight,
  Idea,
} from '@carbon/icons-react';

interface NamingItem {
  id: number;
  identifier: string;
  isValid: boolean;
  statusLabel: string;
  ruleExplanation: string;
  styleRecommendation: string;
}

const namingItems: NamingItem[] = [
  {
    id: 1,
    identifier: 'student_name',
    isValid: true,
    statusLabel: 'VALID (PEP 8 Standard)',
    ruleExplanation: 'Begins with a letter, contains only lowercase letters and underscores. This is the gold standard PEP 8 snake_case convention.',
    styleRecommendation: 'Recommended for all general data science variables, column renames, and function arguments.',
  },
  {
    id: 2,
    identifier: '2students',
    isValid: false,
    statusLabel: 'SYNTAX ERROR (Starts with Digit)',
    ruleExplanation: 'Python identifiers can NEVER start with a number (0-9). The parser expects a numeric literal and fails.',
    styleRecommendation: 'Fix: Use student_2, second_student, or two_students.',
  },
  {
    id: 3,
    identifier: 'student-name',
    isValid: false,
    statusLabel: 'SYNTAX ERROR (Contains Hyphen)',
    ruleExplanation: 'Hyphens ("-") are reserved as the arithmetic subtraction operator in Python (student minus name).',
    styleRecommendation: 'Fix: Replace the hyphen with an underscore: student_name.',
  },
  {
    id: 4,
    identifier: 'class',
    isValid: false,
    statusLabel: 'SYNTAX ERROR (Reserved Keyword)',
    ruleExplanation: '"class" is a protected Python keyword used to define object-oriented classes. You cannot use keywords as variable names.',
    styleRecommendation: 'Fix: Use class_name, student_class, or course_class.',
  },
  {
    id: 5,
    identifier: 'student name',
    isValid: false,
    statusLabel: 'SYNTAX ERROR (Contains Space)',
    ruleExplanation: 'Spaces are token delimiters in Python. "student name" is interpreted as two separate adjacent identifiers.',
    styleRecommendation: 'Fix: Join words using underscores: student_name.',
  },
  {
    id: 6,
    identifier: '_is_active',
    isValid: true,
    statusLabel: 'VALID (Internal Flag)',
    ruleExplanation: 'Identifiers can safely start with an underscore "_". In Python, a leading underscore conventionally indicates an internal/private flag.',
    styleRecommendation: 'Acceptable for temporary internal pipeline masks or non-public module attributes.',
  },
  {
    id: 7,
    identifier: 'is_placed?',
    isValid: false,
    statusLabel: 'SYNTAX ERROR (Illegal Character)',
    ruleExplanation: 'Punctuation characters like "?", "!", "@", "#", "$" are illegal in Python variable names (unlike languages like Ruby).',
    styleRecommendation: 'Fix: Use is_placed or placement_flag.',
  },
  {
    id: 8,
    identifier: 'CGPA',
    isValid: true,
    statusLabel: 'VALID SYNTAX (All-Caps)',
    ruleExplanation: 'Technically valid Python syntax, but PEP 8 convention reserves ALL_CAPS for constant configurations (e.g. MAX_ITERATIONS = 1000).',
    styleRecommendation: 'For regular changing variables, use lowercase: cgpa.',
  },
];

export function NamingChecker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuessValid, setUserGuessValid] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const current = namingItems[currentIndex];

  const handleGuess = (guess: boolean) => {
    if (showFeedback) return;
    setUserGuessValid(guess);
    setShowFeedback(true);

    if (guess === current.isValid) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < namingItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserGuessValid(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserGuessValid(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  const isCorrect = userGuessValid === current?.isValid;

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
            Interactive Experience 5
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Python Identifier & Naming Rules Checker
          </h3>
        </div>
        <Tag type="purple" size="md">
          Syntax Rules
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Python has strict lexical rules for identifiers, plus PEP 8 community style guidelines. Inspect the variable name below and classify it as <strong>VALID</strong> or <strong>INVALID</strong>:
      </p>

      {!isFinished ? (
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
            <span>IDENTIFIER {current.id} OF {namingItems.length}</span>
            <span>ACCURACY: {score} / {namingItems.length}</span>
          </div>

          {/* Identifier Display Card */}
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
              Candidate Identifier:
            </div>
            <div
              style={{
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--ds-cyan)',
              }}
            >
              {current.identifier}
            </div>
          </motion.div>

          {/* Valid / Invalid Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <button
              type="button"
              disabled={showFeedback}
              onClick={() => handleGuess(true)}
              style={{
                flex: '1 1 180px',
                maxWidth: '220px',
                padding: '14px 20px',
                background: showFeedback && current.isValid ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface)',
                border: showFeedback && current.isValid ? '2px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                color: showFeedback && current.isValid ? 'var(--ds-emerald)' : 'var(--ds-text-primary)',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: showFeedback ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease',
              }}
            >
              <CheckmarkOutline size={18} />
              <span>Valid Syntax</span>
            </button>

            <button
              type="button"
              disabled={showFeedback}
              onClick={() => handleGuess(false)}
              style={{
                flex: '1 1 180px',
                maxWidth: '220px',
                padding: '14px 20px',
                background: showFeedback && !current.isValid ? 'rgba(218, 30, 40, 0.1)' : 'var(--ds-bg-surface)',
                border: showFeedback && !current.isValid ? '2px solid #da1e28' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                color: showFeedback && !current.isValid ? '#da1e28' : 'var(--ds-text-primary)',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: showFeedback ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease',
              }}
            >
              <CloseOutline size={18} />
              <span>Invalid Syntax</span>
            </button>
          </div>

          {/* Feedback Card */}
          <AnimatePresence>
            {showFeedback && (
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
                  <Tag type={current.isValid ? 'green' : 'red'} size="md">
                    {current.statusLabel}
                  </Tag>
                  {isCorrect ? (
                    <span style={{ fontSize: '0.8125rem', color: 'var(--ds-emerald)', fontWeight: 600 }}>
                      ✓ Your classification was correct!
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.8125rem', color: '#da1e28', fontWeight: 600 }}>
                      ✗ Incorrect classification
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                  {current.ruleExplanation}
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
                    <Idea size={14} /> PEP 8 Style Guide Advice
                  </div>
                  {current.styleRecommendation}
                </div>

                <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
                  <Button
                    size="md"
                    kind="primary"
                    renderIcon={ArrowRight}
                    onClick={handleNext}
                  >
                    {currentIndex < namingItems.length - 1 ? 'Next Identifier' : 'Finish Challenge'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Completion State */
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
              background: 'var(--ds-cyan-dim)',
              color: 'var(--ds-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <CheckmarkOutline size={28} />
          </div>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 0.5rem 0' }}>
            Naming Rules Mastered: {score} / {namingItems.length}
          </h4>
          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
            You know how to write clean, PEP 8 compliant variable names that avoid parser collisions and keep data pipelines readable.
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
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
