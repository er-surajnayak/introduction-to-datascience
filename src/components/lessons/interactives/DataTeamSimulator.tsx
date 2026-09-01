'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  UserMultiple,
  CheckmarkOutline,
  CloseOutline,
  ArrowRight,
  Restart,
  Collaborate,
  Information,
} from '@carbon/icons-react';

interface Scenario {
  id: number;
  task: string;
  context: string;
  expectedRole: string;
  expectedRoleId: string;
  collaborators: string[];
  explanation: string;
  realWorldNote: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    task: 'Create an interactive executive dashboard visualizing monthly customer churn rates across 12 product categories.',
    context: 'The Chief Product Officer needs to see which product lines lost the most subscribers during the Q2 price change.',
    expectedRole: 'Data Analyst',
    expectedRoleId: 'da',
    collaborators: ['Business Analyst (defines KPIs)', 'Data Engineer (prepares clean warehouse tables)'],
    explanation:
      'Data Analysts specialize in descriptive analytics ("What happened?"), writing SQL queries against warehouse tables, and assembling visual dashboards for business leaders.',
    realWorldNote:
      'While a Data Scientist could build this, companies typically assign dashboard reporting to Analysts so Scientists can focus on statistical modeling and experimentation.',
  },
  {
    id: 2,
    task: 'Design a streaming ingestion pipeline that collects 10,000 sensor telemetry events per second from delivery vehicle GPS trackers without data loss.',
    context: 'The company is launching real-time driver tracking and needs low-latency data pipelines connected to Kafka and a cloud data lake.',
    expectedRole: 'Data Engineer',
    expectedRoleId: 'de',
    collaborators: ['ML Engineer (consumes stream for live ETA)', 'DevOps (provisions cluster servers)'],
    explanation:
      'Data Engineers build the foundational infrastructure and pipelines. They ensure high-throughput streams, schema consistency, and 99.99% data pipeline uptime.',
    realWorldNote:
      'Without Data Engineers building reliable roads, Analysts and Data Scientists would have no clean data to work with.',
  },
  {
    id: 3,
    task: 'Formulate hypotheses and train a machine learning model to predict which food delivery orders are at high risk of arriving late due to weather patterns.',
    context: 'Operations wants to estimate delay probabilities so customer support can proactively notify hungry customers with accurate buffer times.',
    expectedRole: 'Data Scientist',
    expectedRoleId: 'ds',
    collaborators: ['Data Analyst (analyzes historical weather delay stats)', 'ML Engineer (deploys model to live app)'],
    explanation:
      'Data Scientists focus on predictive modeling ("What will happen?"), feature engineering, mathematical algorithms, and statistical validation.',
    realWorldNote:
      'Data Scientists experiment with multiple algorithms (e.g. Logistic Regression, Random Forests, XGBoost) to find the model with optimal precision and recall.',
  },
  {
    id: 4,
    task: 'Package the trained delay prediction model into a containerized REST API microservice that handles 50,000 requests/minute with under 15ms latency.',
    context: 'The dispatch mobile app needs to call the model prediction endpoint on every customer checkout screen without slowing down the app.',
    expectedRole: 'ML Engineer',
    expectedRoleId: 'mle',
    collaborators: ['Data Scientist (provides model weights)', 'Backend Engineers (integrates API into mobile app gateway)'],
    explanation:
      'ML Engineers bridge the gap between experimental code and production engineering. They optimize inference speed, build APIs, manage Docker containers, and monitor for model drift.',
    realWorldNote:
      'A model running in a Jupyter Notebook is an experiment; an ML Engineer turns it into a bulletproof production product.',
  },
  {
    id: 5,
    task: 'Interview regional restaurant managers to define why order fulfillment is delayed, translating their operational complaints into measurable analytics requirements.',
    context: 'Restaurant partners complain that app estimates are inaccurate during dinner rushes, but haven\'t specified what data metrics are missing.',
    expectedRole: 'Business Analyst',
    expectedRoleId: 'ba',
    collaborators: ['Data Analyst (queries kitchen prep time logs)', 'Product Manager (approves roadmap changes)'],
    explanation:
      'Business Analysts bridge business stakeholders and analytical technical teams. They define problem statements, gather operational requirements, and translate them into measurable KPIs.',
    realWorldNote:
      'Business Analysts ensure the data team is solving the right problem before engineers write a single line of code.',
  },
];

const roles = [
  { id: 'ba', label: 'Business Analyst', color: 'var(--ds-purple)' },
  { id: 'de', label: 'Data Engineer', color: 'var(--ds-teal)' },
  { id: 'da', label: 'Data Analyst', color: 'var(--ds-cyan)' },
  { id: 'ds', label: 'Data Scientist', color: 'var(--ds-blue)' },
  { id: 'mle', label: 'ML Engineer', color: 'var(--ds-emerald)' },
];

export function DataTeamSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const current = scenarios[currentIndex];

  const handleSelectRole = (roleId: string) => {
    if (showResult) return;
    setSelectedRole(roleId);
    setShowResult(true);

    if (roleId === current.expectedRoleId) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedRole(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedRole(null);
    setShowResult(false);
    setScore(0);
    setIsCompleted(false);
  };

  const isCorrect = selectedRole === current?.expectedRoleId;

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
            Data Team Simulator: "Who Should Handle This?"
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Scenario Simulator
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
        Real-world tasks require matching the operational challenge to the specialist with the right toolset. Read the scenario below and select the primary responsible role.
      </p>

      {!isCompleted ? (
        <div>
          {/* Progress Pill Bar */}
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
            <span>SCENARIO {current.id} OF {scenarios.length}</span>
            <span>SCORE: {score} / {scenarios.length}</span>
          </div>

          {/* Scenario Card */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
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
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-cyan)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              <Information size={14} /> Mission Briefing
            </div>
            <h4
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--ds-text-primary)',
                margin: '0 0 0.5rem 0',
                lineHeight: 1.4,
              }}
            >
              {current.task}
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: 0, lineHeight: 1.5 }}>
              <strong>Business Context:</strong> {current.context}
            </p>
          </motion.div>

          {/* Role Selection Buttons */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--ds-text-primary)',
                marginBottom: '10px',
              }}
            >
              Select the Primary Responsible Specialist:
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '10px',
              }}
            >
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                const isTarget = current.expectedRoleId === r.id;

                let btnBorder = '1px solid var(--ds-border-subtle)';
                let btnBg = 'var(--ds-bg-surface)';
                let btnColor = 'var(--ds-text-primary)';

                if (showResult) {
                  if (isTarget) {
                    btnBorder = '2px solid var(--ds-emerald)';
                    btnBg = 'var(--ds-emerald-dim)';
                    btnColor = 'var(--ds-emerald)';
                  } else if (isSelected && !isCorrect) {
                    btnBorder = '2px solid #da1e28';
                    btnBg = 'rgba(218, 30, 40, 0.1)';
                    btnColor = '#da1e28';
                  }
                } else if (isSelected) {
                  btnBorder = '2px solid var(--ds-cyan)';
                  btnBg = 'var(--ds-cyan-dim)';
                }

                return (
                  <button
                    key={r.id}
                    type="button"
                    disabled={showResult}
                    onClick={() => handleSelectRole(r.id)}
                    style={{
                      padding: '12px 14px',
                      background: btnBg,
                      border: btnBorder,
                      borderRadius: '4px',
                      color: btnColor,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: showResult ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>{r.label}</span>
                    {showResult && isTarget && <CheckmarkOutline size={18} style={{ color: 'var(--ds-emerald)' }} />}
                    {showResult && isSelected && !isCorrect && <CloseOutline size={18} style={{ color: '#da1e28' }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Collaboration Reveal */}
          <AnimatePresence>
            {showResult && (
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
                      Correct: {current.expectedRole}
                    </Tag>
                  ) : (
                    <Tag type="red" size="md">
                      Expected: {current.expectedRole}
                    </Tag>
                  )}
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                  {current.explanation}
                </p>

                {/* Collaboration Notes */}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '4px' }}>
                    <Collaborate size={14} /> Who Collaborates on This?
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.4 }}>
                    {current.collaborators.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '6px', fontStyle: 'italic', color: 'var(--ds-text-muted)' }}>
                    💡 {current.realWorldNote}
                  </div>
                </div>

                {/* Next Button */}
                <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
                  <Button
                    size="md"
                    kind="primary"
                    renderIcon={ArrowRight}
                    onClick={handleNext}
                  >
                    {currentIndex < scenarios.length - 1 ? 'Next Scenario' : 'View Results'}
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
              background: 'var(--ds-cyan-dim)',
              color: 'var(--ds-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <UserMultiple size={28} />
          </div>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 0.5rem 0' }}>
            Simulator Complete: {score} / {scenarios.length} Correct
          </h4>
          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
            You now understand how business requests, data engineering pipelines, investigative analytics, predictive models, and production APIs fit together in real engineering teams.
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
            Retry Simulator
          </Button>
        </div>
      )}
    </div>
  );
}
