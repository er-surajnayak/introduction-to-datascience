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

interface DetectiveQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const detectiveQuestions: DetectiveQuestion[] = [
  {
    id: 1,
    question: '1. What is the extracted movie title from the snippet?',
    options: ['"Details"', '"8.7"', '"Interstellar"', '"movie"'],
    correctIndex: 2,
    hint: 'Look between the opening <h2> and closing </h2> tags.',
    explanation: '"Interstellar" is the text value contained inside the <h2> heading element.',
  },
  {
    id: 2,
    question: '2. What HTML element tag contains the movie title?',
    options: ['<div>', '<h2>', '<span>', '<a>'],
    correctIndex: 1,
    hint: 'Inspect the tag name wrapping "Interstellar".',
    explanation: '`<h2>` (Heading Level 2) is the element wrapping the title.',
  },
  {
    id: 3,
    question: '3. What class attribute is assigned to the title heading?',
    options: ['"movie"', '"title"', '"rating"', '"link"'],
    correctIndex: 1,
    hint: 'Inspect `class="title"`.',
    explanation: 'The class assigned directly to the <h2> heading is `title`.',
  },
  {
    id: 4,
    question: '4. Which CSS selector can accurately target this movie title?',
    options: ['.movie', '.title', '#title', 'a.title'],
    correctIndex: 1,
    hint: 'Class selectors start with a dot (`.`).',
    explanation: '`.title` (or `h2.title`) targets elements with class `title`.',
  },
  {
    id: 5,
    question: '5. What is the numerical rating value in the snippet?',
    options: ['8.7', '10.0', '2014', '9.2'],
    correctIndex: 0,
    hint: 'Look between the <span class="rating"> tags.',
    explanation: '`8.7` is the text value inside `<span class="rating">8.7</span>`.',
  },
  {
    id: 6,
    question: '6. Which HTML attribute contains the movie details destination URL?',
    options: ['src', 'href', 'class', 'alt'],
    correctIndex: 1,
    hint: 'Anchor links (<a>) store destination web paths in this attribute.',
    explanation: '`href` (Hypertext Reference) is the standard attribute on anchor tags storing link URLs.',
  },
  {
    id: 7,
    question: '7. Which Python library is standard for parsing this HTML into a searchable tree?',
    options: ['NumPy', 'BeautifulSoup (bs4)', 'Matplotlib', 'PyTorch'],
    correctIndex: 1,
    hint: 'Imported via `from bs4 import BeautifulSoup`.',
    explanation: 'BeautifulSoup (`bs4`) is Python\'s premier library for parsing and navigating HTML and XML trees.',
  },
  {
    id: 8,
    question: '8. Which BeautifulSoup method returns the single first matching element?',
    options: ['soup.find()', 'soup.find_all()', 'soup.get_all()', 'soup.first()'],
    correctIndex: 0,
    hint: 'This method stops searching after the first match.',
    explanation: '`soup.find()` returns the single first matching element node (or None).',
  },
  {
    id: 9,
    question: '9. Which BeautifulSoup method returns a collection of all matching elements?',
    options: ['soup.select_one()', 'soup.find()', 'soup.find_all()', 'soup.collect()'],
    correctIndex: 2,
    hint: 'This method returns a list-like ResultSet of all matches.',
    explanation: '`soup.find_all()` scans the entire document tree and returns all matching elements.',
  },
  {
    id: 10,
    question: '10. If this movie data is loaded dynamically later by JavaScript, will parsing only the initial HTML response necessarily find it?',
    options: [
      'Yes, BeautifulSoup always executes JavaScript in the browser automatically.',
      'Not necessarily, because requests.get() only fetches the initial HTML shell before JavaScript runs.',
      'Yes, all dynamic data is permanently stored in the HTML header.',
      'Yes, CSS selectors bypass client-side JavaScript restrictions.',
    ],
    correctIndex: 1,
    hint: 'Consider how client-side JavaScript renders data after initial HTML arrives.',
    explanation:
      'Not necessarily. If data is populated asynchronously by client-side JavaScript, a simple HTTP GET request receives only the initial empty markup shell.',
  },
];

export function WebDetectiveChallenge() {
  const { completeTopic } = useCourseProgress();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === detectiveQuestions.length;

  const correctCount = detectiveQuestions.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length;

  const handleSubmit = () => {
    setShowResults(true);
    if (correctCount >= 8) {
      completeTopic('module-2', 'm2-t2');
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2.25rem',
        borderRadius: '4px',
        margin: '3rem 0',
        border: '1px solid var(--ds-border-strong)',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
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
            Topic 2.2 Capstone Challenge
          </span>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            🕵️ The Web Detective: Full HTML Forensics Lab
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Forensic Inspection Lab
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Put all Topic 2.2 concepts to work! Examine the real-world HTML markup snippet below and answer the 10 diagnostic forensic questions to prove your web scraping literacy:
      </p>

      {/* Target Evidence Box: Real HTML Snippet */}
      <div
        style={{
          background: 'var(--cds-layer-01)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            padding: '0.75rem 1rem',
            background: 'var(--cds-layer-02)',
            borderBottom: '1px solid var(--ds-border-subtle)',
            fontSize: '0.8125rem',
            fontFamily: 'var(--ds-font-mono)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: 'var(--ds-text-muted)' }}>EVIDENCE FILE #202: HTML TARGET MARKUP</span>
          <span style={{ color: 'var(--ds-cyan)', fontWeight: 600 }}>SOURCE: /movies/catalog.html</span>
        </div>

        <div style={{ padding: '1.25rem' }}>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              background: 'var(--cds-field-01)',
              borderRadius: '4px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: 'var(--ds-emerald)',
              overflowX: 'auto',
            }}
          >
            <code>{`<div class="movie">
    <h2 class="title">Interstellar</h2>
    <span class="rating">8.7</span>
    <a href="/movies/interstellar">Details</a>
</div>`}</code>
          </pre>
        </div>
      </div>

      {/* Questions Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        {detectiveQuestions.map((q) => {
          const selectedOpt = answers[q.id];
          const isAnswered = selectedOpt !== undefined;
          const isCorrect = selectedOpt === q.correctIndex;

          return (
            <div
              key={q.id}
              style={{
                background: 'var(--cds-layer-01)',
                padding: '1.25rem',
                borderRadius: '4px',
                border: showResults
                  ? isCorrect
                    ? '1px solid var(--ds-emerald)'
                    : '1px solid #ff8389'
                  : '1px solid var(--ds-border-subtle)',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.875rem' }}>
                {q.question}
              </div>

              {/* Options */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '8px',
                  marginBottom: showResults ? '0.75rem' : '0',
                }}
              >
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOpt === optIdx;
                  let btnBg = 'var(--cds-layer-02)';
                  let border = '1px solid var(--ds-border-subtle)';
                  let textColor = 'var(--ds-text-primary)';

                  if (isThisSelected) {
                    btnBg = 'var(--ds-cyan-dim)';
                    border = '1px solid var(--ds-cyan)';
                    textColor = 'var(--ds-cyan)';
                  }

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      btnBg = 'rgba(39, 201, 63, 0.15)';
                      border = '1px solid var(--ds-emerald)';
                      textColor = 'var(--ds-emerald)';
                    } else if (isThisSelected && !isCorrect) {
                      btnBg = 'rgba(255, 95, 86, 0.15)';
                      border = '1px solid #ff8389';
                      textColor = '#ff8389';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={showResults}
                      style={{
                        background: btnBg,
                        border: border,
                        color: textColor,
                        padding: '0.625rem 0.875rem',
                        borderRadius: '4px',
                        cursor: showResults ? 'default' : 'pointer',
                        textAlign: 'left',
                        fontSize: '0.8125rem',
                        fontFamily: 'var(--ds-font-mono)',
                        transition: 'all 0.1s ease',
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {showResults && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    background: isCorrect ? 'rgba(39, 201, 63, 0.08)' : 'rgba(255, 95, 86, 0.08)',
                    borderRadius: '4px',
                    fontSize: '0.8125rem',
                    color: isCorrect ? 'var(--ds-emerald)' : '#ff8389',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                  }}
                >
                  {isCorrect ? <CheckmarkFilled size={14} /> : <ErrorFilled size={14} />}
                  <span>{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--ds-border-subtle)',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <span style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)' }}>
            Progress: <strong>{answeredCount} / {detectiveQuestions.length}</strong> Answered
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {showResults ? (
            <Button kind="secondary" renderIcon={Restart} onClick={handleReset}>
              Try Again
            </Button>
          ) : (
            <Button
              kind="primary"
              renderIcon={ArrowRight}
              disabled={!isComplete}
              onClick={handleSubmit}
            >
              Submit Forensic Assessment
            </Button>
          )}
        </div>
      </div>

      {/* Results Banner */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            borderRadius: '4px',
            background:
              correctCount >= 8 ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-01)',
            border:
              correctCount >= 8
                ? '2px solid var(--ds-emerald)'
                : '1px solid var(--ds-border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: correctCount >= 8 ? 'var(--ds-emerald)' : '#ff8389',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trophy size={24} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--ds-text-primary)' }}>
                {correctCount >= 8
                  ? '🎉 Topic 2.2 Mastery Verified!'
                  : 'Keep Practicing Forensic Inspection'}
              </h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--ds-text-secondary)' }}>
                You scored {correctCount} out of {detectiveQuestions.length} (
                {Math.round((correctCount / detectiveQuestions.length) * 100)}%).
                {correctCount >= 8
                  ? ' Module 2 Topic 2.2 is now marked completed!'
                  : ' You need at least 8/10 to mark the topic complete.'}
              </p>
            </div>
          </div>

          <Tag type={correctCount >= 8 ? 'green' : 'red'} size="md">
            {correctCount >= 8 ? 'PASS & UNLOCKED' : 'NEEDS REVIEW'}
          </Tag>
        </motion.div>
      )}
    </div>
  );
}
