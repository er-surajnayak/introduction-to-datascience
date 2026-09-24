'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  CheckmarkFilled,
  ErrorFilled,
  Help,
  Restart,
  Information,
} from '@carbon/icons-react';

interface VariableItem {
  id: number;
  name: string;
  exampleValue: string;
  correctType: 'Discrete' | 'Continuous';
  shortReason: string;
  detailedExplanation: string;
  hasNuance?: boolean;
  nuanceExplanation?: string;
}

const variables: VariableItem[] = [
  {
    id: 1,
    name: 'Number of Siblings',
    exampleValue: '2 siblings',
    correctType: 'Discrete',
    shortReason: 'Countable in whole, indivisible numbers.',
    detailedExplanation:
      'You cannot have 2.37 siblings. Siblings are counted in whole integers (0, 1, 2, 3...) with distinct, isolated jumps between values.',
  },
  {
    id: 2,
    name: 'Human Height',
    exampleValue: '172.54 cm',
    correctType: 'Continuous',
    shortReason: 'Measured along a continuous scale.',
    detailedExplanation:
      'Height is a physical measurement along a continuous continuum. Between 172 cm and 173 cm, an infinite number of fractional heights (172.541 cm) exist, limited only by the precision of your measuring tool.',
  },
  {
    id: 3,
    name: 'Number of Cars in a Parking Lot',
    exampleValue: '48 cars',
    correctType: 'Discrete',
    shortReason: 'Count of distinct physical vehicles.',
    detailedExplanation:
      'Vehicles are discrete physical objects. The total can only be integer counts like 47, 48, or 49. There is no such thing as 48.6 cars.',
  },
  {
    id: 4,
    name: 'Ambient Temperature',
    exampleValue: '28.63 °C',
    correctType: 'Continuous',
    shortReason: 'Continuous thermodynamic measurement.',
    detailedExplanation:
      'Temperature does not jump in discrete integer steps. It continuously glides through every intermediate decimal value (28.631°C, 28.632°C).',
  },
  {
    id: 5,
    name: 'Weight of a Package',
    exampleValue: '4.385 kg',
    correctType: 'Continuous',
    shortReason: 'Mass measured on a continuous interval.',
    detailedExplanation:
      'Mass is a continuous physical quantity that can take any fractional value depending on the sensitivity of the weighing scale.',
  },
  {
    id: 6,
    name: 'Exam Marks (out of 100)',
    exampleValue: '87 / 100',
    correctType: 'Discrete',
    shortReason: 'Typically recorded as discrete whole integer points.',
    detailedExplanation:
      'In most university grading databases, marks are awarded as discrete integers (87, 88). However, notice the conceptual nuance below!',
    hasNuance: true,
    nuanceExplanation:
      'Dataset Nuance: While the conceptual capability or knowledge of a student is a continuous spectrum, the specific recorded dataset may store marks as discrete whole numbers. How a variable is defined and recorded in a specific database determines how you process it.',
  },
  {
    id: 7,
    name: 'Daily Server API Requests',
    exampleValue: '124,590 requests',
    correctType: 'Discrete',
    shortReason: 'Count of network packet events.',
    detailedExplanation:
      'Each HTTP request is an individual countable event that either arrived or did not arrive.',
  },
  {
    id: 8,
    name: 'Food Delivery Travel Duration',
    exampleValue: '24.75 minutes',
    correctType: 'Continuous',
    shortReason: 'Time is an infinitely divisible continuous dimension.',
    detailedExplanation:
      'Time flows continuously. Even if an app displays "25 mins", the actual duration could be 24 minutes, 45 seconds, and 320 milliseconds.',
  },
];

export function DiscreteVsContinuousLab() {
  const [answers, setAnswers] = useState<Record<number, 'Discrete' | 'Continuous'>>({});
  const [showNuance, setShowNuance] = useState<Record<number, boolean>>({});

  const handleSelect = (id: number, type: 'Discrete' | 'Continuous') => {
    setAnswers((prev) => ({ ...prev, [id]: type }));
  };

  const resetAll = () => {
    setAnswers({});
    setShowNuance({});
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(
    ([id, userChoice]) => variables.find((v) => v.id === Number(id))?.correctType === userChoice
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
          <Tag type="purple" size="md">
            Interactive 02
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Discrete vs Continuous Lab
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
            Classified: {answeredCount} / {variables.length} ({correctCount} Correct)
          </span>
          {answeredCount > 0 && (
            <Button kind="ghost" size="sm" renderIcon={Restart} onClick={resetAll}>
              Reset
            </Button>
          )}
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Countable vs Measurable: Classify the Numerical Variables
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        <strong>Discrete</strong> variables represent countable values with distinct jumps (e.g. 1, 2, 3). <strong>Continuous</strong> variables represent physical measurements that can take any fractional value along an interval. Test your intuition on the 8 real-world variables below.
      </p>

      {/* Grid of Variable Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '14px',
          marginBottom: '1.5rem',
        }}
      >
        {variables.map((item) => {
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
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginTop: '2px' }}>
                    Sample: {item.exampleValue}
                  </div>
                </div>

                {isAnswered && (
                  <div>
                    {isCorrect ? (
                      <Tag type="green" size="sm">
                        Correct
                      </Tag>
                    ) : (
                      <Tag type="red" size="sm">
                        Review
                      </Tag>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button
                  onClick={() => handleSelect(item.id, 'Discrete')}
                  style={{
                    flex: 1,
                    padding: '6px 12px',
                    fontSize: '0.8125rem',
                    borderRadius: '4px',
                    fontWeight: userChoice === 'Discrete' ? 600 : 400,
                    border: userChoice === 'Discrete'
                      ? '2px solid var(--ds-cyan)'
                      : '1px solid var(--ds-border-strong)',
                    background: userChoice === 'Discrete' ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface)',
                    color: userChoice === 'Discrete' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Discrete (Count)
                </button>

                <button
                  onClick={() => handleSelect(item.id, 'Continuous')}
                  style={{
                    flex: 1,
                    padding: '6px 12px',
                    fontSize: '0.8125rem',
                    borderRadius: '4px',
                    fontWeight: userChoice === 'Continuous' ? 600 : 400,
                    border: userChoice === 'Continuous'
                      ? '2px solid var(--ds-purple)'
                      : '1px solid var(--ds-border-strong)',
                    background: userChoice === 'Continuous' ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface)',
                    color: userChoice === 'Continuous' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Continuous (Measure)
                </button>
              </div>

              {/* Feedback Drawer */}
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
                        marginTop: '8px',
                        padding: '8px 10px',
                        background: 'var(--ds-bg-surface)',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        color: 'var(--ds-text-secondary)',
                        lineHeight: 1.5,
                        borderLeft: `3px solid ${isCorrect ? 'var(--ds-emerald)' : '#da1e28'}`,
                      }}
                    >
                      <div>
                        <strong>{item.correctType}:</strong> {item.detailedExplanation}
                      </div>

                      {item.hasNuance && item.nuanceExplanation && (
                        <div
                          style={{
                            marginTop: '6px',
                            paddingTop: '6px',
                            borderTop: '1px dashed var(--ds-border-subtle)',
                            color: 'var(--ds-amber)',
                          }}
                        >
                          <strong>Measurement Nuance:</strong> {item.nuanceExplanation}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div
        style={{
          padding: '1rem 1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <Information size={18} style={{ color: 'var(--ds-cyan)', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
          <strong>Critical Technical Rule:</strong> Classification depends on how a variable is measured and recorded in your dataset. Do not treat every recorded numerical value as universally discrete or continuous without inspecting the data dictionary.
        </div>
      </div>
    </div>
  );
}
