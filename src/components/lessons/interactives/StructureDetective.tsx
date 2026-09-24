'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  CheckmarkFilled,
  ErrorFilled,
  Help,
  Restart,
  Table,
  Document,
  Image as ImageIcon,
} from '@carbon/icons-react';

interface StructureItem {
  id: number;
  title: string;
  displaySnippet: string;
  snippetType: 'table' | 'json' | 'text' | 'image-spec' | 'log';
  correctType: 'Structured' | 'Semi-Structured' | 'Unstructured';
  why: string;
  handlingTip: string;
}

const structureItems: StructureItem[] = [
  {
    id: 1,
    title: 'University Student Grade Sheet',
    snippetType: 'table',
    displaySnippet: `ID  | Name  | Age | Department | Marks
101 | Ravi  | 21  | CSE        | 87
102 | Priya | 22  | ECE        | 92
103 | Aarav | 20  | ME         | 78`,
    correctType: 'Structured',
    why: 'Conforms to a rigid tabular schema with predefined rows, columns, and standardized data types.',
    handlingTip: 'Can be immediately loaded into SQL databases or Pandas DataFrames via pd.read_csv().',
  },
  {
    id: 2,
    title: 'Weather Forecast REST API Response',
    snippetType: 'json',
    displaySnippet: `{
  "city": "Bengaluru",
  "temperature": 25.6,
  "station": { "id": "BLR-07", "elevation_m": 920 },
  "sensors": ["temp", "humidity", "pm25"]
}`,
    correctType: 'Semi-Structured',
    why: 'Contains self-describing key-value pairs and nested hierarchies, but lacks a fixed tabular grid.',
    handlingTip: 'Use json.loads() or pd.json_normalize() to flatten nested hierarchical keys into tabular columns.',
  },
  {
    id: 3,
    title: 'Customer Product Review',
    snippetType: 'text',
    displaySnippet: `"Honestly, I loved the headphones! The battery lasts over 30 hours, but the ear cushion gets slightly warm during long gaming sessions. Fast shipping though."`,
    correctType: 'Unstructured',
    why: 'Free-form natural human language. It lacks predefined row-column delimiters or explicit schema keys.',
    handlingTip: 'Requires Natural Language Processing (tokenization, sentiment analysis, TF-IDF vectorization) to extract structured features.',
  },
  {
    id: 4,
    title: 'Medical Diagnostic Chest X-Ray',
    snippetType: 'image-spec',
    displaySnippet: `Image Matrix: 1024 x 1024 pixels x 3 Color Channels (RGB)
Raw Content: 3,145,728 pixel intensity integers (0 to 255)
Context: Radiologist lung opacity screening scan`,
    correctType: 'Unstructured',
    why: 'Unstructured in tabular terms. Although pixel tensors have internal mathematical structure, there is no predefined business entity schema.',
    handlingTip: 'Processed using Convolutional Neural Networks (CNNs) or Vision Transformers (ViTs) to detect anomalies.',
  },
  {
    id: 5,
    title: 'Nginx Web Server Access Log',
    snippetType: 'log',
    displaySnippet: `192.168.1.42 - - [24/Sep/2026:14:32:10 +0530] "GET /api/v1/weather?city=Belagavi HTTP/1.1" 200 482 "https://meteo.org" "Python/3.11 requests"`,
    correctType: 'Semi-Structured',
    why: 'Follows a standardized log format pattern with delimiters, but stored as continuous text lines requiring regex parsing.',
    handlingTip: 'Parsed into structured rows using regular expressions or log ingestion pipelines like Logstash.',
  },
];

export function StructureDetective() {
  const [answers, setAnswers] = useState<Record<number, 'Structured' | 'Semi-Structured' | 'Unstructured'>>({});

  const handleSelect = (id: number, type: 'Structured' | 'Semi-Structured' | 'Unstructured') => {
    setAnswers((prev) => ({ ...prev, [id]: type }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(
    ([id, choice]) => structureItems.find((s) => s.id === Number(id))?.correctType === choice
  ).length;

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Interactive 06
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Structure Detective
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
            Score: {correctCount} / {structureItems.length} Correct
          </span>
          {answeredCount > 0 && (
            <Button kind="ghost" size="sm" renderIcon={Restart} onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Structured, Semi-Structured, or Unstructured?
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Classify each data artifact into its structural archetype. Remember: <em>"Unstructured" does not mean "no information"</em>—it means the data does not conform to a rigid, predefined row-column table.
      </p>

      {/* Artifact Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '1.5rem' }}>
        {structureItems.map((item) => {
          const userChoice = answers[item.id];
          const isAnswered = !!userChoice;
          const isCorrect = userChoice === item.correctType;

          return (
            <div
              key={item.id}
              style={{
                padding: '1.25rem',
                background: 'var(--ds-bg-surface-elevated)',
                borderRadius: '4px',
                border: isAnswered
                  ? isCorrect
                    ? '1px solid var(--ds-emerald)'
                    : '1px solid #da1e28'
                  : '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  Artifact #{item.id}: {item.title}
                </span>
                {isAnswered && (
                  <Tag type={isCorrect ? 'green' : 'red'} size="sm">
                    {isCorrect ? 'Correct Classification' : 'Discrepancy'}
                  </Tag>
                )}
              </div>

              {/* Code Snippet Box */}
              <pre
                style={{
                  padding: '10px 14px',
                  background: 'var(--ds-bg-core)',
                  borderRadius: '4px',
                  border: '1px solid var(--ds-border-subtle)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--ds-text-primary)',
                  overflowX: 'auto',
                  margin: '0 0 12px 0',
                  lineHeight: 1.4,
                }}
              >
                {item.displaySnippet}
              </pre>

              {/* Classification Options */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(['Structured', 'Semi-Structured', 'Unstructured'] as const).map((opt) => {
                  const isSelected = userChoice === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(item.id, opt)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '4px',
                        fontSize: '0.8125rem',
                        fontWeight: isSelected ? 600 : 400,
                        border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-strong)',
                        background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface)',
                        color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Drawer Feedback */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        marginTop: '10px',
                        padding: '10px 12px',
                        background: 'var(--ds-bg-surface)',
                        borderRadius: '4px',
                        fontSize: '0.8125rem',
                        color: 'var(--ds-text-secondary)',
                        lineHeight: 1.5,
                        borderLeft: `3px solid ${isCorrect ? 'var(--ds-emerald)' : '#da1e28'}`,
                      }}
                    >
                      <div>
                        <strong>{item.correctType}:</strong> {item.why}
                      </div>
                      <div style={{ marginTop: '4px', color: 'var(--ds-cyan)' }}>
                        💡 <em>Data Science Pipeline Tip:</em> {item.handlingTip}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
