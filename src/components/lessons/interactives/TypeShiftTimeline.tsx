'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Renew,
  ArrowRight,
  Information,
} from '@carbon/icons-react';

interface TimelineStep {
  step: number;
  code: string;
  variableName: string;
  objectValue: string;
  type: string;
  typeBadge: 'blue' | 'purple' | 'teal' | 'green';
  explanation: string;
}

const steps: TimelineStep[] = [
  {
    step: 1,
    code: 'x = 10',
    variableName: 'x',
    objectValue: '10',
    type: 'int (Integer)',
    typeBadge: 'blue',
    explanation: 'Python creates an integer object 10 on the heap and binds the label "x" to it.',
  },
  {
    step: 2,
    code: 'x = "10"',
    variableName: 'x',
    objectValue: '"10"',
    type: 'str (String Text)',
    typeBadge: 'purple',
    explanation: 'Reassignment occurs: "x" is unbound from 10 and now points to a brand new string object "10".',
  },
  {
    step: 3,
    code: 'x = 10.5',
    variableName: 'x',
    objectValue: '10.5',
    type: 'float (Decimal)',
    typeBadge: 'teal',
    explanation: 'The same name "x" now points to a float object 10.5 with decimal precision.',
  },
  {
    step: 4,
    code: 'x = True',
    variableName: 'x',
    objectValue: 'True',
    type: 'bool (Boolean)',
    typeBadge: 'green',
    explanation: '"x" now refers to the boolean truth object True. Python allows this flexibility without compilation errors.',
  },
];

export function TypeShiftTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const current = steps[activeStepIndex];

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
            Interactive Experience 3
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Dynamic Typing: The Type Shift Timeline
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Object Rebinding
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        In statically-typed languages (like C or Java), a variable declared as <code>int x</code> can never hold a string. In Python, types belong to <strong>objects</strong>, not variable names. Step through the timeline below to watch the name <code>x</code> shift references:
      </p>

      {/* Stepper Timeline Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '8px',
          marginBottom: '1.75rem',
        }}
      >
        {steps.map((s, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              style={{
                padding: '10px 8px',
                background: isActive ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                border: isActive ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                color: isActive ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                STEP 0{s.step}
              </div>
              <div style={{ fontSize: '0.875rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>
                {s.code}
              </div>
            </button>
          );
        })}
      </div>

      {/* Animated Rebinding Visualizer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            padding: '1.5rem',
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
              CURRENT PYTHON EXECUTION: <code>{current.code}</code>
            </span>
            <Tag type={current.typeBadge} size="md">
              {current.type}
            </Tag>
          </div>

          {/* Visual Pointer Diagram */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'var(--ds-bg-surface)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Variable Name */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                IDENTIFIER NAME
              </div>
              <div
                style={{
                  padding: '8px 20px',
                  background: 'var(--ds-cyan-dim)',
                  border: '1.5px solid var(--ds-cyan)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--ds-cyan)',
                }}
              >
                {current.variableName}
              </div>
            </div>

            {/* Dynamic Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--ds-cyan)' }}>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', textTransform: 'uppercase' }}>
                now binds to
              </span>
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>➔</span>
            </div>

            {/* Object In Memory */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                LIVE HEAP OBJECT
              </div>
              <div
                style={{
                  padding: '8px 22px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1.5px solid var(--ds-border-strong)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--ds-text-primary)',
                }}
              >
                {current.objectValue}
              </div>
            </div>
          </div>

          {/* Explanation Banner */}
          <div
            style={{
              padding: '10px 14px',
              background: 'var(--ds-bg-surface)',
              borderLeft: '3px solid var(--ds-cyan)',
              borderRadius: '0 4px 4px 0',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
              lineHeight: 1.45,
            }}
          >
            <strong style={{ color: 'var(--ds-text-primary)' }}>Why This Works:</strong>{' '}
            {current.explanation}
          </div>

          {/* Stepper Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
            <Button
              size="sm"
              kind="ghost"
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            >
              Previous Step
            </Button>
            <Button
              size="sm"
              kind="primary"
              disabled={activeStepIndex === steps.length - 1}
              renderIcon={ArrowRight}
              onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            >
              Next Step
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
