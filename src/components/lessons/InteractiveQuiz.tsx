'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { CheckmarkFilled, CloseFilled, Restart, Events } from '@carbon/icons-react';
import { QuizQuestion } from '@/types/lesson';

export function InteractiveQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (selectedOptions[questionId] !== undefined) return; // Prevent changing after answer
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleReset = () => {
    setSelectedOptions({});
  };

  if (!questions || questions.length === 0) return null;

  const answeredCount = Object.keys(selectedOptions).length;
  const correctCount = questions.filter(
    (q) => selectedOptions[q.id] === q.correctIndex
  ).length;

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Concept Check
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Self-Assessment Questions ({questions.length})
          </span>
        </div>

        {answeredCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-cyan)' }}>
              Score: {correctCount}/{questions.length}
            </span>
            <Button kind="ghost" size="sm" renderIcon={Restart} onClick={handleReset}>
              Retry
            </Button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {questions.map((q, qIdx) => {
          const selected = selectedOptions[q.id];
          const hasAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="ds-glass-panel"
              style={{
                padding: '1.75rem',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-strong)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '1rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-cyan)',
                    padding: '2px 6px',
                    background: 'var(--ds-cyan-dim)',
                    borderRadius: '2px',
                  }}
                >
                  Q{qIdx + 1}
                </span>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0, lineHeight: 1.4 }}>
                  {q.question}
                </h3>
              </div>

              {/* Options Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
                {q.options.map((opt, optIdx) => {
                  let borderColor = 'var(--ds-border-subtle)';
                  let bg = 'var(--cds-layer-02)';
                  let textColor = 'var(--ds-text-primary)';

                  if (hasAnswered) {
                    if (optIdx === q.correctIndex) {
                      borderColor = 'var(--ds-emerald)';
                      bg = 'var(--ds-emerald-dim)';
                      textColor = 'var(--ds-emerald)';
                    } else if (optIdx === selected) {
                      borderColor = '#da1e28';
                      bg = 'rgba(218, 30, 40, 0.12)';
                      textColor = '#fa4d56';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={hasAnswered}
                      style={{
                        padding: '12px 16px',
                        background: bg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: textColor,
                        textAlign: 'left',
                        fontSize: '0.9375rem',
                        cursor: hasAnswered ? 'default' : 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{opt}</span>
                      {hasAnswered && optIdx === q.correctIndex && (
                        <CheckmarkFilled size={18} style={{ color: 'var(--ds-emerald)', flexShrink: 0 }} />
                      )}
                      {hasAnswered && optIdx === selected && optIdx !== q.correctIndex && (
                        <CloseFilled size={18} style={{ color: '#fa4d56', flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {hasAnswered && (
                <div
                  style={{
                    padding: '0.875rem 1rem',
                    background: isCorrect ? 'var(--ds-emerald-dim)' : 'rgba(255, 255, 255, 0.04)',
                    borderLeft: `3px solid ${isCorrect ? 'var(--ds-emerald)' : 'var(--ds-cyan)'}`,
                    borderRadius: '0 3px 3px 0',
                    fontSize: '0.875rem',
                    color: 'var(--ds-text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  <strong style={{ color: isCorrect ? 'var(--ds-emerald)' : 'var(--ds-cyan)' }}>
                    {isCorrect ? 'Correct! ' : 'Explanation: '}
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
