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
    question: '1. What is the resource endpoint in this request?',
    options: ['https://api.meteo.org', '/weather', '?city=Bengaluru', 'GET'],
    correctIndex: 1,
    hint: 'The endpoint is the specific URL path following the domain.',
    explanation: 'The endpoint is `/weather`—the specific doorway exposing weather resources.',
  },
  {
    id: 2,
    question: '2. What HTTP method is being executed?',
    options: ['POST', 'DELETE', 'GET', 'UPDATE'],
    correctIndex: 2,
    hint: 'This method is used to retrieve data without modifying server state.',
    explanation: 'GET is the standard retrieval method used to fetch data safely.',
  },
  {
    id: 3,
    question: '3. What is the query parameter in the request URL?',
    options: ['/weather', 'city=Bengaluru', 'Content-Type', '200 OK'],
    correctIndex: 1,
    hint: 'Look for the key=value pair following the question mark `?`.',
    explanation: '`city=Bengaluru` is the query parameter specifying which city to query.',
  },
  {
    id: 4,
    question: '4. What is the current temperature value extracted from the payload?',
    options: ['28', '68', '25', 'Cloudy'],
    correctIndex: 2,
    hint: 'Inspect the line: "temperature": 25.',
    explanation: 'The value corresponding to the "temperature" key is 25.',
  },
  {
    id: 5,
    question: '5. What is the data type of the temperature value in JSON?',
    options: ['string', 'number', 'boolean', 'array'],
    correctIndex: 1,
    hint: 'Notice there are no quotes around 25.',
    explanation: 'Without quotes, 25 is recognized as a numeric literal (number/float/int).',
  },
  {
    id: 6,
    question: '6. Which of the following is a JSON key in this response?',
    options: ['"Cloudy"', '25', '"humidity"', '68'],
    correctIndex: 2,
    hint: 'A key appears on the left side of the colon in a key-value pair.',
    explanation: '"humidity" is a key whose paired value is 68.',
  },
  {
    id: 7,
    question: '7. Which of the following is an extracted JSON value?',
    options: ['"city"', '"temperature"', '"condition"', '"Cloudy"'],
    correctIndex: 3,
    hint: 'A value appears on the right side of the colon.',
    explanation: '"Cloudy" is the value paired with the "condition" key.',
  },
  {
    id: 8,
    question: '8. What format is this response body delivered in?',
    options: ['HTML Document', 'JSON (JavaScript Object Notation)', 'Raw CSV', 'Binary Bytecode'],
    correctIndex: 1,
    hint: 'Look for curly braces and key-value mapping.',
    explanation: 'This structured format with key-value pairs in curly braces is JSON.',
  },
  {
    id: 9,
    question: '9. If the server returned an HTTP 404 status code, what would that mean?',
    options: [
      'The requested endpoint or city resource was not found on the server.',
      'The client exceeded the rate limit of requests.',
      'The database successfully committed a new transaction.',
      'The client forgot to install requests in Python.',
    ],
    correctIndex: 0,
    hint: '404 indicates a client error pointing to a non-existent URL or resource.',
    explanation: '404 Not Found indicates that the specified endpoint URL does not exist.',
  },
  {
    id: 10,
    question: '10. If this sensor reading arrived continuously every second, what is that called?',
    options: ['A static CSV dump', 'A data stream', 'A batch SQL backup', 'A compiler error'],
    correctIndex: 1,
    hint: 'Think of an infinite, ongoing sequence of events over time.',
    explanation: 'A continuous, unbounded sequence of data items arriving over time is a data stream.',
  },
];

export function ApiDetectiveChallenge() {
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
      completeTopic('module-2', 'm2-t1');
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
            Topic 2.1 Capstone Challenge
          </span>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            The API Detective: Full Payload Forensics
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Capstone Inspection Lab
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Put all Topic 2.1 concepts to work! Examine the real-world HTTP transaction below and answer the 10 diagnostic questions to demonstrate your API literacy:
      </p>

      {/* Target Evidence Box: Request + JSON Payload */}
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
          <span style={{ color: 'var(--ds-text-muted)' }}>EVIDENCE FILE #201: NETWORK INSPECTOR</span>
          <span style={{ color: 'var(--ds-emerald)', fontWeight: 600 }}>STATUS: 200 OK</span>
        </div>

        <div style={{ padding: '1.25rem' }}>
          <div style={{ marginBottom: '1rem', fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--ds-text-muted)' }}>REQUEST: </span>
            <span style={{ color: 'var(--ds-emerald)', fontWeight: 700 }}>GET </span>
            <span style={{ color: 'var(--ds-cyan)' }}>/weather?city=Bengaluru</span>
          </div>

          <pre
            style={{
              margin: 0,
              padding: '1rem',
              background: 'var(--cds-field-01)',
              borderRadius: '4px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: 'var(--ds-text-primary)',
              overflowX: 'auto',
            }}
          >
            <code>{`{
  "city": "Bengaluru",
  "temperature": 25,
  "humidity": 68,
  "condition": "Cloudy"
}`}</code>
          </pre>
        </div>
      </div>

      {/* 10 Questions Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        {detectiveQuestions.map((q) => {
          const userSelection = answers[q.id];
          const hasSelected = userSelection !== undefined;
          const isCorrect = userSelection === q.correctIndex;

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
                    : '1px solid #fa4d56'
                  : '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.875rem' }}>
                {q.question}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '8px',
                }}
              >
                {q.options.map((opt, oIdx) => {
                  const isPicked = userSelection === oIdx;
                  let btnBg = 'var(--cds-layer-02)';
                  let border = '1px solid var(--ds-border-subtle)';
                  let color = 'var(--ds-text-primary)';

                  if (showResults) {
                    if (oIdx === q.correctIndex) {
                      btnBg = 'rgba(66, 190, 101, 0.15)';
                      border = '1px solid var(--ds-emerald)';
                      color = 'var(--ds-emerald)';
                    } else if (isPicked) {
                      btnBg = 'rgba(250, 77, 86, 0.15)';
                      border = '1px solid #fa4d56';
                      color = '#fa4d56';
                    }
                  } else if (isPicked) {
                    btnBg = 'var(--ds-cyan-dim)';
                    border = '1px solid var(--ds-cyan)';
                    color = 'var(--ds-cyan)';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      style={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: '4px',
                        border,
                        background: btnBg,
                        color,
                        textAlign: 'left',
                        cursor: showResults ? 'default' : 'pointer',
                        fontSize: '0.8125rem',
                        fontWeight: isPicked ? 600 : 400,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: isCorrect ? 'var(--ds-emerald)' : 'var(--ds-text-secondary)' }}>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Actions & Score Banner */}
      {!showResults ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-muted)' }}>
            Questions Answered: <span style={{ color: 'var(--ds-cyan)', fontWeight: 600 }}>{answeredCount}</span> of {detectiveQuestions.length}
          </div>
          <Button
            kind="primary"
            size="md"
            disabled={!isComplete}
            renderIcon={CheckmarkFilled}
            onClick={handleSubmit}
          >
            Submit Detective Diagnosis
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '1.5rem',
            borderRadius: '4px',
            background: correctCount >= 8 ? 'var(--ds-emerald-dim, rgba(66, 190, 101, 0.15))' : 'var(--cds-layer-02)',
            border: `1px solid ${correctCount >= 8 ? 'var(--ds-emerald)' : 'var(--ds-border-strong)'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Trophy size={32} style={{ color: correctCount >= 8 ? 'var(--ds-emerald)' : 'var(--ds-cyan)' }} />
            <div>
              <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                {correctCount >= 8 ? 'Master Detective Status Achieved!' : 'Good Effort, Detective!'}
              </h4>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.875rem', color: 'var(--ds-text-secondary)' }}>
                You correctly diagnosed {correctCount} of {detectiveQuestions.length} questions.
              </p>
            </div>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
            <strong>The Core Mental Journey:</strong>
            <br />
            <code>QUESTION → API REQUEST → API SERVER → JSON RESPONSE → PYTHON DICT → DATASET → ANALYSIS</code>
          </div>

          <div>
            <Button kind="secondary" size="sm" renderIcon={Restart} onClick={handleReset}>
              Retest Knowledge
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
