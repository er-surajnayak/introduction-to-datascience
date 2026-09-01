'use client';

import React, { useState } from 'react';
import { Tag, ProgressBar } from '@carbon/react';
import { CheckmarkFilled, Idea, WarningAlt } from '@carbon/icons-react';

interface ChecklistItem {
  id: number;
  question: string;
  rookieMistake: string;
  dataScientistHabit: string;
  actionPrompt: string;
}

export function ThinkingChecklist() {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const checklist: ChecklistItem[] = [
    {
      id: 1,
      question: '1. What is the actual problem we are trying to solve?',
      rookieMistake: 'Immediately opening VS Code, importing Scikit-Learn, and asking "Which ML algorithm should I train?"',
      dataScientistHabit: 'Formulating the business question first: "Are we trying to classify fraud, forecast energy demand, or segment users?"',
      actionPrompt: 'Define your primary success metric (e.g. F1-score for fraud, RMSE for housing price).',
    },
    {
      id: 2,
      question: '2. What data do we need to solve this problem?',
      rookieMistake: 'Grabbing whatever random CSV file is already in the downloads folder.',
      dataScientistHabit: 'Carefully mapping target variables (what to predict) and predictor features (signals that contain predictive power).',
      actionPrompt: 'List all potential input features and confirm if the target label is available.',
    },
    {
      id: 3,
      question: '3. Where can we get this data and in what format?',
      rookieMistake: 'Assuming clean tabular data will be handed to you on a silver platter.',
      dataScientistHabit: 'Connecting to SQL warehouses, writing web scrapers, querying REST endpoints, or extracting sensor logs.',
      actionPrompt: 'Verify data extraction pipelines, access credentials, and update frequency.',
    },
    {
      id: 4,
      question: '4. Can we actually trust this data (Quality & Bias Check)?',
      rookieMistake: 'Blindly trusting raw datasets without checking for corrupt sensors, missing rows, or sampling bias.',
      dataScientistHabit: 'Checking for missing values, duplicated IDs, sensor error codes (-999.0), and non-representative sample bias.',
      actionPrompt: 'Perform automated schema validation and missingness audit before modeling.',
    },
    {
      id: 5,
      question: '5. What patterns, distributions, and anomalies exist?',
      rookieMistake: 'Treating the dataset as a black box and jumping straight to deep neural networks.',
      dataScientistHabit: 'Plotting histograms, detecting outliers, calculating covariance, and looking for multi-collinearity.',
      actionPrompt: 'Conduct Exploratory Data Analysis (EDA) with Seaborn boxplots and pairplots.',
    },
    {
      id: 6,
      question: '6. How can we rigorously test our assumptions?',
      rookieMistake: 'Declaring victory after seeing high training accuracy on the same data the model was trained on.',
      dataScientistHabit: 'Using strict train/test splits, cross-validation, hypothesis tests (p-values), and checking for data leakage.',
      actionPrompt: 'Evaluate test set performance and verify statistical significance.',
    },
    {
      id: 7,
      question: '7. How should we communicate the result to decision-makers?',
      rookieMistake: 'Dumping a confusion matrix and raw loss curve onto non-technical stakeholders.',
      dataScientistHabit: 'Translating mathematical metrics into business impact: "This model saves ₹1.2 Crore annually with 92% precision."',
      actionPrompt: 'Present clear trade-offs, confidence bounds, and concrete next steps.',
    },
  ];

  const toggleCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const progressPercent = Math.round((checkedIds.length / checklist.length) * 100);

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Experience 5
          </span>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            The 7-Question &ldquo;Think Like a Data Scientist&rdquo; Protocol
          </h3>
        </div>
        <Tag type={progressPercent === 100 ? 'green' : 'cyan'} size="md">
          {checkedIds.length} of {checklist.length} Protocols Internalized
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Before writing a single line of Python, an experienced data scientist internalizes these 7 critical thinking habits. Click each protocol to review and check off:
      </p>

      {/* Progress Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <ProgressBar
          value={progressPercent}
          max={100}
          size="small"
          label={`Methodology Readiness (${progressPercent}%)`}
          status={progressPercent === 100 ? 'finished' : 'active'}
        />
      </div>

      {/* 7 Questions Interactive List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {checklist.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              style={{
                padding: '1.25rem',
                background: isChecked ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
                border: isChecked ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: isChecked ? 'var(--ds-cyan)' : 'var(--cds-layer-01)',
                      border: '1px solid var(--ds-border-strong)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isChecked ? '#000000' : 'var(--ds-text-muted)',
                      flexShrink: 0,
                    }}
                  >
                    {isChecked ? <CheckmarkFilled size={16} /> : item.id}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
                    {item.question}
                  </h4>
                </div>
                <Tag type={isChecked ? 'cyan' : 'cool-gray'} size="sm">
                  {isChecked ? 'Mastered' : 'Click to Internalize'}
                </Tag>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginTop: '0.5rem' }}>
                <div
                  style={{
                    padding: '8px 10px',
                    background: 'var(--cds-layer-01)',
                    borderLeft: '3px solid #da1e28',
                    borderRadius: '0 3px 3px 0',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-text-secondary)',
                  }}
                >
                  <strong style={{ color: '#fa4d56' }}>Rookie Trap:</strong> {item.rookieMistake}
                </div>

                <div
                  style={{
                    padding: '8px 10px',
                    background: 'var(--cds-layer-01)',
                    borderLeft: '3px solid var(--ds-emerald)',
                    borderRadius: '0 3px 3px 0',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-text-secondary)',
                  }}
                >
                  <strong style={{ color: 'var(--ds-emerald)' }}>Pro Habit:</strong> {item.dataScientistHabit}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
