'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button, InlineNotification } from '@carbon/react';
import {
  Trophy,
  CheckmarkFilled,
  Idea,
  Analytics,
  ArrowRight,
} from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';

const classMarks = [78, 85, 92, 67, 74, 88, 95, 61, 83, 79];

export function Module1FinalChallenge() {
  const { completeTopic } = useCourseProgress();
  const [revealedSteps, setRevealedSteps] = useState<number[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [customThinking, setCustomThinking] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const mean = (classMarks.reduce((a, b) => a + b, 0) / classMarks.length).toFixed(1);
  const max = Math.max(...classMarks);
  const min = Math.min(...classMarks);
  const std = (
    Math.sqrt(
      classMarks.reduce((acc, val) => acc + Math.pow(val - Number(mean), 2), 0) / classMarks.length
    )
  ).toFixed(2);
  const aboveAvgCount = classMarks.filter((s) => s > Number(mean)).length;

  const challengeMetrics = [
    { id: 1, label: '1. Number of Students', code: 'marks.size or len(marks)', result: `${classMarks.length} students` },
    { id: 2, label: '2. Average (Mean) Marks', code: 'np.mean(marks)', result: `${mean}` },
    { id: 3, label: '3. Highest Mark', code: 'np.max(marks)', result: `${max}` },
    { id: 4, label: '4. Lowest Mark', code: 'np.min(marks)', result: `${min}` },
    { id: 5, label: '5. Standard Deviation', code: 'np.std(marks)', result: `${std}` },
    { id: 6, label: '6. Students Above Average', code: 'np.sum(marks > np.mean(marks))', result: `${aboveAvgCount} students` },
  ];

  const toggleStep = (id: number) => {
    if (revealedSteps.includes(id)) {
      setRevealedSteps(revealedSteps.filter((s) => s !== id));
    } else {
      setRevealedSteps([...revealedSteps, id]);
    }
  };

  const handleRevealAll = () => {
    setRevealedSteps([1, 2, 3, 4, 5, 6]);
  };

  const handleFinishModule = () => {
    completeTopic('module-1', 'm1-t7');
    setIsCompleted(true);
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2.5rem',
        borderRadius: '4px',
        margin: '3rem 0',
        border: '2px solid var(--ds-cyan)',
        background: 'linear-gradient(180deg, var(--ds-bg-surface-elevated) 0%, var(--ds-bg-surface) 100%)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            🎯 Module 1 Capstone Challenge
          </span>
          <h3
            style={{
              fontSize: '1.625rem',
              fontWeight: 700,
              color: 'var(--ds-text-primary)',
              margin: '4px 0 0 0',
            }}
          >
            Analyze a Class Dataset
          </h3>
        </div>
        <Tag type="cyan" size="lg">
          Final Module Challenge
        </Tag>
      </div>

      <p style={{ fontSize: '1rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Given the numerical scores of 10 students:
      </p>

      {/* Dataset Array Representation */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '1rem',
          color: 'var(--ds-cyan)',
          marginBottom: '2rem',
        }}
      >
        <span style={{ color: 'var(--ds-purple)' }}>marks </span>
        <span style={{ color: 'var(--ds-text-muted)' }}>= </span>
        <span>np.array([</span>
        <br />
        <span style={{ color: 'var(--ds-emerald)', paddingLeft: '1.5rem' }}>
          78, 85, 92, 67, 74, 88, 95, 61, 83, 79
        </span>
        <br />
        <span>])</span>
      </div>

      {/* 6 Metrics Grid */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            Statistical Investigations (Click to Compute)
          </h4>
          <Button size="sm" kind="ghost" onClick={handleRevealAll}>
            Compute All Metrics
          </Button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px',
          }}
        >
          {challengeMetrics.map((item) => {
            const isRevealed = revealedSteps.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleStep(item.id)}
                style={{
                  padding: '1.25rem',
                  background: isRevealed ? 'var(--ds-bg-surface-elevated)' : 'var(--ds-bg-surface)',
                  border: isRevealed ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                    {item.label}
                  </span>
                  {isRevealed && <CheckmarkFilled size={16} style={{ color: 'var(--ds-emerald)' }} />}
                </div>

                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '8px' }}>
                  {item.code}
                </div>

                {isRevealed ? (
                  <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
                    {item.result}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', fontStyle: 'italic' }}>
                    Click to compute in NumPy →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* The Crucial Data Scientist Thinking Transition */}
      <div
        style={{
          marginTop: '2.5rem',
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1.5px solid var(--ds-purple)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Idea size={20} style={{ color: 'var(--ds-purple)' }} />
          <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: 0 }}>
            The Data Scientist Question: Shifting from Coding to Thinking
          </h4>
        </div>

        <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          Anyone can run <code>np.mean()</code>. A true Data Scientist asks questions that uncover the <em>context</em> behind the data. If you were a Data Scientist analyzing this class, which question would you ask next?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
          {[
            {
              id: 1,
              title: 'Distribution Shape & Outliers',
              desc: 'Is the score distribution bimodal (two separate clusters of struggling vs excelling students) or normally distributed around 80?',
            },
            {
              id: 2,
              title: 'Causal Correlations',
              desc: 'Does student attendance or homework completion rate correlate with scores below 70?',
            },
            {
              id: 3,
              title: 'Assessment Reliability',
              desc: 'Were specific exam questions unfairly difficult, dragging down the lowest score to 61?',
            },
          ].map((q) => {
            const isSelected = selectedQuestion === q.id;
            return (
              <div
                key={q.id}
                onClick={() => setSelectedQuestion(q.id)}
                style={{
                  padding: '1rem',
                  background: isSelected ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface-elevated)',
                  border: isSelected ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: isSelected ? 'var(--ds-purple)' : 'var(--ds-text-primary)' }}>
                  {q.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '4px' }}>
                  {q.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Module 1 Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size="lg"
            renderIcon={Trophy}
            onClick={handleFinishModule}
            style={{
              background: isCompleted ? 'var(--ds-emerald)' : 'var(--ds-cyan)',
              color: '#000',
              fontWeight: 700,
            }}
          >
            {isCompleted ? 'Module 1 Complete! 🎉' : 'Complete Topic 1.7 & Finish Module 1'}
          </Button>
        </div>

        {isCompleted && (
          <div style={{ marginTop: '1.5rem' }}>
            <InlineNotification
              kind="success"
              title="Module 1: Introduction to Data Science Completed!"
              subtitle="You have mastered Python fundamentals, Variables, Control Structures, Functions, Jupyter Notebooks, and NumPy vectorization. Module 2: Data Collection & Preprocessing is now unlocked!"
              hideCloseButton
            />
          </div>
        )}
      </div>
    </div>
  );
}
