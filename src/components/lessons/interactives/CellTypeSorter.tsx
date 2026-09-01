'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Code,
  Document,
  CheckmarkOutline,
  CloseOutline,
  Restart,
} from '@carbon/icons-react';

interface Snippet {
  id: number;
  content: string;
  type: 'code' | 'markdown';
  explanation: string;
}

const snippetList: Snippet[] = [
  {
    id: 1,
    content: 'marks = [78, 85, 92, 67, 74]',
    type: 'code',
    explanation: 'Python assignment statement defining a list in Kernel memory.',
  },
  {
    id: 2,
    content: '## 📊 1. Student Marks Overview\nIn this section, we analyze the DS-201 midterm scores.',
    type: 'markdown',
    explanation: 'Markdown heading (##) and explanatory text for narrative documentation.',
  },
  {
    id: 3,
    content: 'print(f"Average Class Score: {sum(marks)/len(marks):.1f}")',
    type: 'code',
    explanation: 'Python print() function executing an f-string computation.',
  },
  {
    id: 4,
    content: '- **High Performers:** Scores >= 85\n- **Average:** Scores between 60 and 84\n- **Needs Support:** Scores < 60',
    type: 'markdown',
    explanation: 'Markdown bulleted list with bold (**text**) formatting.',
  },
  {
    id: 5,
    content: 'filtered_scores = [m for m in marks if m >= 75]',
    type: 'code',
    explanation: 'Python list comprehension filtering numerical values.',
  },
  {
    id: 6,
    content: '> ⚠️ **Key Finding:** 80% of students scored above the passing threshold.',
    type: 'markdown',
    explanation: 'Markdown blockquote (>) formatting a highlighted analytical note.',
  },
];

export function CellTypeSorter() {
  const [answers, setAnswers] = useState<Record<number, 'code' | 'markdown'>>({});

  const handleSelect = (snippetId: number, selectedType: 'code' | 'markdown') => {
    setAnswers((prev) => ({
      ...prev,
      [snippetId]: selectedType,
    }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = snippetList.filter((s) => answers[s.id] === s.type).length;

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
            Interactive Experience 1
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Cell Type Sorter: Code vs Markdown
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type={correctCount === snippetList.length ? 'green' : 'blue'} size="md">
            Score: {correctCount} / {snippetList.length}
          </Tag>
          {answeredCount > 0 && (
            <Button kind="ghost" size="sm" renderIcon={Restart} onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        A Jupyter notebook is composed of <strong>Code cells</strong> (which run Python and store memory) and <strong>Markdown cells</strong> (which format documentation). Classify each snippet below:
      </p>

      {/* Snippet Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {snippetList.map((snippet) => {
          const userAnswer = answers[snippet.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === snippet.type;

          return (
            <div
              key={snippet.id}
              style={{
                padding: '1.25rem',
                background: 'var(--ds-bg-surface)',
                border: isAnswered
                  ? isCorrect
                    ? '1.5px solid var(--ds-emerald)'
                    : '1.5px solid #da1e28'
                  : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                    SNIPPET #{snippet.id}
                  </span>
                  {isAnswered && (
                    <Tag type={isCorrect ? 'green' : 'red'} size="sm">
                      {isCorrect ? 'Correct' : 'Try Again'}
                    </Tag>
                  )}
                </div>

                <div
                  style={{
                    padding: '10px 12px',
                    background: 'var(--ds-bg-surface-elevated)',
                    borderRadius: '4px',
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-text-primary)',
                    whiteSpace: 'pre-wrap',
                    marginBottom: '1rem',
                    lineHeight: 1.4,
                  }}
                >
                  {snippet.content}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: isAnswered ? '8px' : '0' }}>
                  <button
                    type="button"
                    onClick={() => handleSelect(snippet.id, 'code')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      background: userAnswer === 'code' ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                      border: userAnswer === 'code' ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                      borderRadius: '4px',
                      color: userAnswer === 'code' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Code size={14} />
                    <span>Code Cell</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelect(snippet.id, 'markdown')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      background: userAnswer === 'markdown' ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface-elevated)',
                      border: userAnswer === 'markdown' ? '1.5px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                      borderRadius: '4px',
                      color: userAnswer === 'markdown' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Document size={14} />
                    <span>Markdown Cell</span>
                  </button>
                </div>

                {isAnswered && (
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--ds-text-secondary)',
                      lineHeight: 1.4,
                      marginTop: '6px',
                    }}
                  >
                    {snippet.explanation}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
