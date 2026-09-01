'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Code,
  CheckmarkOutline,
  CloseOutline,
  Restart,
  ArrowRight,
  Idea,
} from '@carbon/icons-react';

interface ToolTask {
  id: number;
  prompt: string;
  category: string;
  correctToolId: string;
  correctToolName: string;
  explanation: string;
  whyNotOthers: string;
}

const toolTasks: ToolTask[] = [
  {
    id: 1,
    prompt: 'You need to execute matrix multiplication and vector operations on 10,000,000 numbers in under 5 milliseconds.',
    category: 'Numerical Linear Algebra',
    correctToolId: 'numpy',
    correctToolName: 'NumPy',
    explanation:
      'NumPy stores numbers in contiguous memory blocks and executes operations via compiled C/Fortran SIMD vector instructions, avoiding Python pointer lookup overhead.',
    whyNotOthers:
      'Pandas is built on top of NumPy but has DataFrame indexing overhead. Standard Python lists are too slow because they store pointer arrays to separate heap objects.',
  },
  {
    id: 2,
    prompt: 'You have a 200 MB CSV file containing dirty customer transaction tables with missing values, string dates, and invalid age entries.',
    category: 'Tabular Data Wrangling',
    correctToolId: 'pandas',
    correctToolName: 'Pandas',
    explanation:
      'Pandas DataFrames provide high-level methods like .dropna(), .fillna(), .groupby(), .merge(), and .to_datetime() specifically engineered for tabular data inspection and wrangling.',
    whyNotOthers:
      'NumPy requires homogeneous numeric types and lacks label-based column indexing. SQL requires loading data into a database server first.',
  },
  {
    id: 3,
    prompt: 'You want to query only high-value orders placed in Mumbai during Diwali directly from the company\'s 500 GB cloud warehouse without crashing your laptop.',
    category: 'Warehouse Data Extraction',
    correctToolId: 'sql',
    correctToolName: 'SQL',
    explanation:
      'SQL executes query filters and aggregations (WHERE city = \'Mumbai\' AND amount > 5000) directly inside the distributed database engine, sending only the tiny result set back to your computer.',
    whyNotOthers:
      'Downloading 500 GB into Python RAM will immediately trigger an Out-of-Memory (OOM) crash.',
  },
  {
    id: 4,
    prompt: 'You want to write a laboratory notebook where code cells, markdown formulas, and live statistical plots sit together in an interactive sandbox.',
    category: 'Exploratory Prototyping',
    correctToolId: 'jupyter',
    correctToolName: 'Jupyter Notebook',
    explanation:
      'Jupyter allows step-by-step interactive execution. You can keep heavy datasets in Python memory while tweaking chart formatting cells independently.',
    whyNotOthers:
      'Standard .py scripts must re-run from top-to-bottom every single time, reloading large datasets on every run.',
  },
  {
    id: 5,
    prompt: 'You want to train a Logistic Regression classifier to predict customer churn, evaluate precision/recall metrics, and split data into train/test sets.',
    category: 'Machine Learning',
    correctToolId: 'sklearn',
    correctToolName: 'Scikit-Learn',
    explanation:
      'Scikit-Learn provides a clean, unified Python API (.fit(), .predict(), .score(), train_test_split) for classical machine learning and feature preprocessing.',
    whyNotOthers:
      'Pandas and NumPy provide the data matrices, but Scikit-Learn contains the mathematical loss optimization and validation algorithms.',
  },
  {
    id: 6,
    prompt: 'You and three other engineers are collaborating on a data project. You need to create experimental branches, track code commits, and avoid overwriting each other\'s files.',
    category: 'Version Control',
    correctToolId: 'git',
    correctToolName: 'Git / GitHub',
    explanation:
      'Git tracks incremental code changes in snapshots, while GitHub provides remote repository hosting, branch merging, pull requests, and peer code reviews.',
    whyNotOthers:
      'Copying files like model_v1_final_final2.py leads to lost code, broken pipelines, and zero reproducibility.',
  },
];

const availableTools = [
  { id: 'numpy', name: 'NumPy', badge: 'Vectors & Arrays' },
  { id: 'pandas', name: 'Pandas', badge: 'DataFrames' },
  { id: 'sql', name: 'SQL', badge: 'Databases' },
  { id: 'jupyter', name: 'Jupyter', badge: 'Interactive REPL' },
  { id: 'matplotlib', name: 'Matplotlib', badge: 'Core Plots' },
  { id: 'seaborn', name: 'Seaborn', badge: 'Statistical Charts' },
  { id: 'sklearn', name: 'Scikit-Learn', badge: 'Machine Learning' },
  { id: 'git', name: 'Git / GitHub', badge: 'Version Control' },
];

export function ToolMatcher() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const currentTask = toolTasks[taskIndex];

  const handleSelectTool = (toolId: string) => {
    if (showAnswer) return;
    setSelectedTool(toolId);
    setShowAnswer(true);

    if (toolId === currentTask.correctToolId) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (taskIndex < toolTasks.length - 1) {
      setTaskIndex((prev) => prev + 1);
      setSelectedTool(null);
      setShowAnswer(false);
    } else {
      setIsDone(true);
    }
  };

  const handleRestart = () => {
    setTaskIndex(0);
    setSelectedTool(null);
    setShowAnswer(false);
    setScore(0);
    setIsDone(false);
  };

  const isCorrect = selectedTool === currentTask?.correctToolId;

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
            Tool Matcher: "Which Tool Would You Reach For?"
          </h3>
        </div>
        <Tag type="teal" size="md">
          Problem-To-Tool Matcher
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
        Tools exist to solve specific technical bottlenecks. Read the computational requirement and pick the most appropriate tool from the toolbox.
      </p>

      {!isDone ? (
        <div>
          {/* Progress Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-muted)',
              fontFamily: 'var(--ds-font-mono)',
            }}
          >
            <span>TASK {currentTask.id} OF {toolTasks.length}</span>
            <span>ACCURACY: {score} / {toolTasks.length}</span>
          </div>

          {/* Task Card */}
          <motion.div
            key={currentTask.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'var(--ds-bg-surface-elevated)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <Tag type="purple" size="sm" style={{ marginBottom: '8px' }}>
              {currentTask.category}
            </Tag>
            <h4
              style={{
                fontSize: '1.1875rem',
                fontWeight: 600,
                color: 'var(--ds-text-primary)',
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              "{currentTask.prompt}"
            </h4>
          </motion.div>

          {/* Tool Options Grid */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--ds-text-primary)',
                marginBottom: '10px',
              }}
            >
              Select Tool from the Python Ecosystem:
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '10px',
              }}
            >
              {availableTools.map((t) => {
                const isSelected = selectedTool === t.id;
                const isTarget = currentTask.correctToolId === t.id;

                let border = '1px solid var(--ds-border-subtle)';
                let bg = 'var(--ds-bg-surface)';
                let color = 'var(--ds-text-primary)';

                if (showAnswer) {
                  if (isTarget) {
                    border = '2px solid var(--ds-emerald)';
                    bg = 'var(--ds-emerald-dim)';
                    color = 'var(--ds-emerald)';
                  } else if (isSelected && !isCorrect) {
                    border = '2px solid #da1e28';
                    bg = 'rgba(218, 30, 40, 0.1)';
                    color = '#da1e28';
                  }
                } else if (isSelected) {
                  border = '2px solid var(--ds-cyan)';
                  bg = 'var(--ds-cyan-dim)';
                }

                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={showAnswer}
                    onClick={() => handleSelectTool(t.id)}
                    style={{
                      padding: '12px 10px',
                      background: bg,
                      border,
                      borderRadius: '4px',
                      color,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: showAnswer ? 'default' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>{t.name}</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', fontFamily: 'var(--ds-font-mono)' }}>
                      {t.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Deep Dive Reveal */}
          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: isCorrect ? 'var(--ds-emerald-dim)' : 'rgba(255, 255, 255, 0.03)',
                  border: isCorrect ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-strong)',
                  borderRadius: '4px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {isCorrect ? (
                    <Tag type="green" size="md">
                      Correct: {currentTask.correctToolName}
                    </Tag>
                  ) : (
                    <Tag type="red" size="md">
                      Best Choice: {currentTask.correctToolName}
                    </Tag>
                  )}
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                  {currentTask.explanation}
                </p>

                <div
                  style={{
                    padding: '10px',
                    background: 'var(--ds-bg-surface)',
                    border: '1px dashed var(--ds-border-subtle)',
                    borderRadius: '3px',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-text-secondary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-amber)', fontWeight: 600, marginBottom: '4px' }}>
                    <Idea size={14} /> Architectural Rationale
                  </div>
                  {currentTask.whyNotOthers}
                </div>

                <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
                  <Button
                    size="md"
                    kind="primary"
                    renderIcon={ArrowRight}
                    onClick={handleNext}
                  >
                    {taskIndex < toolTasks.length - 1 ? 'Next Challenge' : 'Finish Matcher'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Completion State */
        <div
          style={{
            textAlign: 'center',
            padding: '2.5rem 1rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--ds-teal-dim)',
              color: 'var(--ds-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <Code size={28} />
          </div>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 0.5rem 0' }}>
            Toolbox Mastery: {score} / {toolTasks.length} Solved
          </h4>
          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
            You understand the exact purpose behind NumPy, Pandas, SQL, Scikit-Learn, and Git. Tools are not badges to collect; they are tailored wrenches for specific computational problems.
          </p>
          <Button
            size="md"
            kind="tertiary"
            renderIcon={Restart}
            onClick={handleRestart}
            style={{
              borderColor: 'var(--ds-border-strong)',
              color: 'var(--ds-text-primary)',
            }}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
