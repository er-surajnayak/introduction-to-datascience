'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  CheckmarkOutline,
  Warning,
  ErrorFilled,
  Time,
  Locked,
  Renew,
  Help,
} from '@carbon/icons-react';

interface StatusCodeScenario {
  code: number;
  label: string;
  category: 'Success (2xx)' | 'Client Error (4xx)' | 'Server Error (5xx)';
  tagType: 'green' | 'red' | 'purple' | 'magenta' | 'teal';
  request: string;
  responsePreview: string;
  mysteryQuestion: string;
  options: string[];
  correctOptionIndex: number;
  dataScientistFix: string;
}

const statusScenarios: StatusCodeScenario[] = [
  {
    code: 200,
    label: '200 OK',
    category: 'Success (2xx)',
    tagType: 'green',
    request: 'GET /v1/weather?city=Belagavi',
    responsePreview: '{\n  "status": "success",\n  "city": "Belagavi",\n  "temperature": 28.2\n}',
    mysteryQuestion: 'Your Python script receives this response. What is the correct next action?',
    options: [
      'Stop the script immediately and report a database crash.',
      'Parse the JSON with response.json() and extract data into your Python workflow.',
      'Regenerate your secret API key because 200 implies an expired token.',
    ],
    correctOptionIndex: 1,
    dataScientistFix: 'Code 200 confirms the server successfully processed your request and attached the requested data.',
  },
  {
    code: 404,
    label: '404 Not Found',
    category: 'Client Error (4xx)',
    tagType: 'magenta',
    request: 'GET /v1/weatherr?city=Belagavi',
    responsePreview: '{\n  "error": "Resource /v1/weatherr does not exist on this host."\n}',
    mysteryQuestion: 'You requested the URL above and received 404. What is the root cause?',
    options: [
      'The entire internet has disconnected.',
      'There is a typo in the endpoint path ("/weatherr" instead of "/weather") or the city identifier does not exist.',
      'The server ran out of disk space.',
    ],
    correctOptionIndex: 1,
    dataScientistFix: 'Check the endpoint spelling against the API documentation and verify that the resource identifier is valid.',
  },
  {
    code: 429,
    label: '429 Too Many Requests',
    category: 'Client Error (4xx)',
    tagType: 'purple',
    request: 'GET /v1/stocks?symbol=INFY (executed 500 times in 2 seconds)',
    responsePreview: '{\n  "error": "Rate limit exceeded. Maximum 60 requests per minute allowed."\n}',
    mysteryQuestion: 'Your automated scraping loop suddenly triggers 429 errors. What should you do?',
    options: [
      'Spam the server twice as fast to force a connection.',
      'Introduce a sleep pause (e.g. time.sleep(1)) or exponential backoff in your collection loop.',
      'Rewrite your Python code in C++.',
    ],
    correctOptionIndex: 1,
    dataScientistFix: 'Respect the API quota limits. Add `time.sleep()` pauses between iterations or request a higher tier API key.',
  },
  {
    code: 401,
    label: '401 Unauthorized',
    category: 'Client Error (4xx)',
    tagType: 'red',
    request: 'GET /v1/premium-telemetry (Header: Authorization missing)',
    responsePreview: '{\n  "error": "Authentication required. Invalid or missing API key."\n}',
    mysteryQuestion: 'Your code fails with 401 Unauthorized. What is missing?',
    options: [
      'You forgot to install NumPy on your machine.',
      'The endpoint requires an API key or token passed in the request headers.',
      'The city has been deleted from the database.',
    ],
    correctOptionIndex: 1,
    dataScientistFix: 'Acquire an authorized API key from the service provider and pass it securely in the request headers or params.',
  },
  {
    code: 400,
    label: '400 Bad Request',
    category: 'Client Error (4xx)',
    tagType: 'magenta',
    request: 'GET /v1/weather?latitude=INVALID_TEXT&longitude=abc',
    responsePreview: '{\n  "error": "Parameter validation failed: latitude must be a float between -90 and 90."\n}',
    mysteryQuestion: 'The server rejects your request with 400 Bad Request. Why?',
    options: [
      'The client passed invalid parameter formats or malformed syntax.',
      'The server hardware is physically overheated.',
      'The API has been permanently discontinued.',
    ],
    correctOptionIndex: 0,
    dataScientistFix: 'Verify the data types expected by the API documentation (e.g. passing numeric floats instead of text).',
  },
  {
    code: 500,
    label: '500 Internal Server Error',
    category: 'Server Error (5xx)',
    tagType: 'red',
    request: 'GET /v1/weather?city=Belagavi',
    responsePreview: '{\n  "error": "Internal Server Error: Database connection timeout."\n}',
    mysteryQuestion: 'Your well-formed request receives a 500 code. Whose responsibility is this?',
    options: [
      'It is your client code error—you must reformat your JSON variables.',
      'It is the remote server provider\'s issue—their backend crashed or lost database connectivity.',
      'It means your computer keyboard is unplugged.',
    ],
    correctOptionIndex: 1,
    dataScientistFix: 'Code 5xx indicates a remote server failure. Log the error, wait a few minutes, and retry with a fallback.',
  },
];

export function HttpStatusDetective() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const currentScenario = statusScenarios[selectedIdx];

  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelectScenario = (idx: number) => {
    setSelectedIdx(idx);
    setSelectedChoice(null);
    setHasAnswered(false);
  };

  const handleChoice = (choiceIdx: number) => {
    setSelectedChoice(choiceIdx);
    setHasAnswered(true);
  };

  const isCorrect = selectedChoice === currentScenario.correctOptionIndex;

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
            Interactive Experience 4
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            HTTP Status Detective: Diagnosing Server Codes
          </h3>
        </div>
        <Tag type="teal" size="md">
          Diagnostic Lab
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Every HTTP response begins with a 3-digit status code. A Data Scientist must immediately recognize whether an issue is client-side (4xx), server-side (5xx), or a clean success (200). Click through the status codes to solve real-world debugging scenarios:
      </p>

      {/* Status Code Buttons Selector */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        {statusScenarios.map((sc, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={sc.code}
              type="button"
              onClick={() => handleSelectScenario(idx)}
              style={{
                padding: '0.625rem 1rem',
                borderRadius: '4px',
                border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-01)',
                color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.875rem',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {sc.label}
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScenario.code}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            padding: '1.5rem',
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)' }}>
                Status: {currentScenario.code}
              </span>
              <Tag type={currentScenario.tagType} size="sm">
                {currentScenario.category}
              </Tag>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
              Scenario {selectedIdx + 1} of {statusScenarios.length}
            </span>
          </div>

          {/* Request and Response Trace Box */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                padding: '0.875rem 1rem',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Outbound Request
              </div>
              <code style={{ fontSize: '0.8125rem', color: 'var(--ds-cyan)', wordBreak: 'break-all' }}>
                {currentScenario.request}
              </code>
            </div>

            <div
              style={{
                padding: '0.875rem 1rem',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Server Response Payload
              </div>
              <pre style={{ margin: 0, fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)', whiteSpace: 'pre-wrap' }}>
                {currentScenario.responsePreview}
              </pre>
            </div>
          </div>

          {/* Mystery Question */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              {currentScenario.mysteryQuestion}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {currentScenario.options.map((opt, oIdx) => {
                const isPicked = selectedChoice === oIdx;
                const isCorrectOption = oIdx === currentScenario.correctOptionIndex;

                let borderCol = 'var(--ds-border-subtle)';
                let bgCol = 'var(--cds-layer-02)';

                if (hasAnswered) {
                  if (isCorrectOption) {
                    borderCol = 'var(--ds-emerald)';
                    bgCol = 'rgba(66, 190, 101, 0.12)';
                  } else if (isPicked) {
                    borderCol = '#fa4d56';
                    bgCol = 'rgba(250, 77, 86, 0.12)';
                  }
                } else if (isPicked) {
                  borderCol = 'var(--ds-cyan)';
                  bgCol = 'var(--ds-cyan-dim)';
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleChoice(oIdx)}
                    style={{
                      padding: '0.875rem 1rem',
                      borderRadius: '4px',
                      border: `1px solid ${borderCol}`,
                      background: bgCol,
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: 'var(--ds-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{opt}</span>
                    {hasAnswered && isCorrectOption && (
                      <CheckmarkOutline size={18} style={{ color: 'var(--ds-emerald)', flexShrink: 0 }} />
                    )}
                    {hasAnswered && isPicked && !isCorrectOption && (
                      <ErrorFilled size={18} style={{ color: '#fa4d56', flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Takeaway */}
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '1rem',
                borderRadius: '4px',
                background: isCorrect ? 'var(--ds-emerald-dim, rgba(66, 190, 101, 0.15))' : 'rgba(250, 77, 86, 0.12)',
                borderLeft: `4px solid ${isCorrect ? 'var(--ds-emerald)' : '#fa4d56'}`,
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: isCorrect ? 'var(--ds-emerald)' : '#fa4d56', marginBottom: '2px' }}>
                {isCorrect ? 'Correct Diagnosis!' : 'Not Quite!'}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', margin: 0, lineHeight: 1.5 }}>
                {currentScenario.dataScientistFix}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
