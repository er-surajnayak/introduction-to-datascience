'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Slider } from '@carbon/react';
import {
  DecisionTree,
  CheckmarkOutline,
  CloseOutline,
  ArrowRight,
} from '@carbon/icons-react';

interface BranchNode {
  id: string;
  conditionLabel: string;
  check: (score: number) => boolean;
  grade: string;
  gradeBadge: 'purple' | 'blue' | 'teal' | 'cool-gray';
  feedback: string;
}

const branches: BranchNode[] = [
  {
    id: 'b1',
    conditionLabel: 'if marks >= 90:',
    check: (s) => s >= 90,
    grade: 'A+ (Distinction)',
    gradeBadge: 'purple',
    feedback: 'First condition met (marks >= 90). Evaluated True immediately; remaining elif and else branches are skipped.',
  },
  {
    id: 'b2',
    conditionLabel: 'elif marks >= 80:',
    check: (s) => s >= 80,
    grade: 'A (Excellent)',
    gradeBadge: 'blue',
    feedback: 'Branch 1 was False (marks < 90). Branch 2 is True (marks >= 80). Grade A is assigned; remaining branches skipped.',
  },
  {
    id: 'b3',
    conditionLabel: 'elif marks >= 70:',
    check: (s) => s >= 70,
    grade: 'B (Good)',
    gradeBadge: 'teal',
    feedback: 'Branches 1 and 2 were False. Branch 3 is True (marks >= 70). Grade B assigned; else branch skipped.',
  },
  {
    id: 'b4',
    conditionLabel: 'else:',
    check: () => true, // Fallback catch-all
    grade: 'C (Pass / Satisfactory)',
    gradeBadge: 'cool-gray',
    feedback: 'All preceding if/elif conditions were False (marks < 70). The else fallback branch executes.',
  },
];

export function GradeDecisionTree() {
  const [score, setScore] = useState<number>(82);

  // Compute active branch
  let activeBranchIndex = 3;
  if (score >= 90) activeBranchIndex = 0;
  else if (score >= 80) activeBranchIndex = 1;
  else if (score >= 70) activeBranchIndex = 2;
  else activeBranchIndex = 3;

  const activeBranch = branches[activeBranchIndex];

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
            Grade Decision Playground (if / elif / else Tree)
          </h3>
        </div>
        <Tag type="purple" size="md">
          Decision Tree
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Python evaluates <code>if / elif / else</code> chains strictly from top to bottom. Drag the slider below to watch the decision tree test conditions in order and route execution:
      </p>

      {/* Interactive Score Slider */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            Adjust Student Marks:
          </span>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--ds-cyan)',
            }}
          >
            {score} / 100
          </span>
        </div>

        <Slider
          id="score-slider"
          labelText="Student Marks Slider"
          hideTextInput
          value={score}
          min={0}
          max={100}
          step={1}
          onChange={({ value }) => setScore(Number(value))}
        />
      </div>

      {/* Visual Sequential Decision Flow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
        {branches.map((branch, idx) => {
          const isSelected = idx === activeBranchIndex;
          const wasEvaluated = idx <= activeBranchIndex;
          const isSkipped = idx > activeBranchIndex;

          let statusTagType: 'green' | 'red' | 'cool-gray' = 'cool-gray';
          let statusText = 'Skipped (Unchecked)';

          if (isSelected) {
            statusTagType = 'green';
            statusText = 'True (Branch Executed)';
          } else if (wasEvaluated) {
            statusTagType = 'red';
            statusText = 'False (Jumped to next)';
          }

          return (
            <motion.div
              key={branch.id}
              animate={{
                scale: isSelected ? 1.01 : 1,
                opacity: isSkipped ? 0.45 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                padding: '12px 16px',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface)',
                border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
                  STEP 0{idx + 1}
                </span>
                <code
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                  }}
                >
                  {branch.conditionLabel}
                </code>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag type={statusTagType} size="sm">
                  {statusText}
                </Tag>
                {isSelected && (
                  <span
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--ds-cyan)',
                    }}
                  >
                    ➔ Result: {branch.grade}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Output Banner */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderLeft: '4px solid var(--ds-cyan)',
          borderRadius: '0 4px 4px 0',
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: 'var(--ds-text-primary)' }}>Execution Summary:</strong>{' '}
        {activeBranch.feedback}
      </div>
    </div>
  );
}
