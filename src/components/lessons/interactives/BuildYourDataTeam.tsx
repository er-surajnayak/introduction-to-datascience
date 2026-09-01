'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Chemistry,
  CheckmarkOutline,
  CloseOutline,
  Restart,
  ArrowRight,
  User,
  Collaborate,
} from '@carbon/icons-react';

interface ProjectMilestone {
  id: number;
  title: string;
  description: string;
  correctRoleId: string;
  correctRoleName: string;
  recommendedTools: string[];
  rationale: string;
}

const milestones: ProjectMilestone[] = [
  {
    id: 1,
    title: 'Milestone 1: Define Recommendation KPIs',
    description:
      'Align with product managers and executives to define what "successful recommendations" mean (e.g. increase daily watch time by 15%, reduce subscriber churn).',
    correctRoleId: 'ba',
    correctRoleName: 'Business Analyst',
    recommendedTools: ['Spreadsheets', 'Confluence', 'BI Dashboards'],
    rationale:
      'The Business Analyst sets up the business requirements and measurable evaluation metrics before engineering begins.',
  },
  {
    id: 2,
    title: 'Milestone 2: Ingest 100M Daily Streaming Logs',
    description:
      'Build a fault-tolerant pipeline to capture clicks, video pause events, playback duration, and search keywords from 5,000,000 active app users without packet loss.',
    correctRoleId: 'de',
    correctRoleName: 'Data Engineer',
    recommendedTools: ['Kafka', 'Apache Spark', 'SQL', 'Cloud Lakehouse'],
    rationale:
      'The Data Engineer builds reliable ingestion pipelines and cleans raw telemetry into structured tables for analysis.',
  },
  {
    id: 3,
    title: 'Milestone 3: Analyze User Engagement Cohorts',
    description:
      'Inspect historical viewing patterns to discover which genres are trending, average watch times by city, and which user segments churn after 30 days.',
    correctRoleId: 'da',
    correctRoleName: 'Data Analyst',
    recommendedTools: ['SQL', 'Pandas', 'Tableau', 'Seaborn'],
    rationale:
      'The Data Analyst explores past behaviors and identifies key user segments and historical trends for the modelers.',
  },
  {
    id: 4,
    title: 'Milestone 4: Train Collaborative Filtering Algorithms',
    description:
      'Design feature matrices, test matrix factorization algorithms, train machine learning recommendation models, and evaluate offline precision@k.',
    correctRoleId: 'ds',
    correctRoleName: 'Data Scientist',
    recommendedTools: ['Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'Jupyter'],
    rationale:
      'The Data Scientist tests statistical hypotheses, experiments with algorithms, and trains optimal predictive weights.',
  },
  {
    id: 5,
    title: 'Milestone 5: Deploy Real-Time 15ms Recommendation Microservice',
    description:
      'Package the trained model into a high-throughput microservice container, deploy to Kubernetes clusters, and monitor for live latency spikes.',
    correctRoleId: 'mle',
    correctRoleName: 'ML Engineer',
    recommendedTools: ['FastAPI', 'Docker', 'Kubernetes', 'MLflow', 'Git'],
    rationale:
      'The ML Engineer makes the model accessible to millions of real mobile app users with ultra-low response latency.',
  },
];

const availableRoles = [
  { id: 'ba', name: 'Business Analyst', color: 'var(--ds-purple)' },
  { id: 'de', name: 'Data Engineer', color: 'var(--ds-teal)' },
  { id: 'da', name: 'Data Analyst', color: 'var(--ds-cyan)' },
  { id: 'ds', name: 'Data Scientist', color: 'var(--ds-blue)' },
  { id: 'mle', name: 'ML Engineer', color: 'var(--ds-emerald)' },
];

export function BuildYourDataTeam() {
  const [userAssignments, setUserAssignments] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAssign = (milestoneId: number, roleId: string) => {
    if (isSubmitted) return;
    setUserAssignments((prev) => ({
      ...prev,
      [milestoneId]: roleId,
    }));
  };

  const handleReset = () => {
    setUserAssignments({});
    setIsSubmitted(false);
  };

  const allAssigned = milestones.every((m) => userAssignments[m.id]);
  const correctCount = milestones.filter((m) => userAssignments[m.id] === m.correctRoleId).length;

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
            Interactive Experience 5: Mini Challenge
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Build Your Data Team: Personalized Streaming Startup
          </h3>
        </div>
        <Tag type="purple" size="md">
          Team Architect Challenge
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
        A streaming startup wants to build a personalized content recommendation engine from scratch. Assign the right specialist to each project milestone:
      </p>

      {/* Milestones List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {milestones.map((m) => {
          const assignedRoleId = userAssignments[m.id];
          const isCorrect = isSubmitted && assignedRoleId === m.correctRoleId;
          const isWrong = isSubmitted && assignedRoleId !== m.correctRoleId;

          return (
            <div
              key={m.id}
              style={{
                background: 'var(--ds-bg-surface-elevated)',
                border: isSubmitted
                  ? isCorrect
                    ? '1.5px solid var(--ds-emerald)'
                    : '1.5px solid #da1e28'
                  : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
                  {m.title}
                </h4>
                {isSubmitted && (
                  <div>
                    {isCorrect ? (
                      <Tag type="green" size="sm">Correct Lead: {m.correctRoleName}</Tag>
                    ) : (
                      <Tag type="red" size="sm">Best Lead: {m.correctRoleName}</Tag>
                    )}
                  </div>
                )}
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: '0 0 1rem 0', lineHeight: 1.45 }}>
                {m.description}
              </p>

              {/* Role Selection Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginRight: '4px' }}>
                  Assign Lead:
                </span>
                {availableRoles.map((r) => {
                  const isSelected = assignedRoleId === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleAssign(m.id, r.id)}
                      style={{
                        padding: '5px 12px',
                        background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface)',
                        border: isSelected ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                        borderRadius: '3px',
                        color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                        fontWeight: isSelected ? 700 : 400,
                        fontSize: '0.75rem',
                        cursor: isSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {r.name}
                    </button>
                  );
                })}
              </div>

              {/* Submitted Explanation Reveal */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    background: 'var(--ds-bg-surface)',
                    borderLeft: `3px solid ${isCorrect ? 'var(--ds-emerald)' : 'var(--ds-purple)'}`,
                    borderRadius: '0 3px 3px 0',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-text-secondary)',
                  }}
                >
                  <strong style={{ color: 'var(--ds-text-primary)' }}>Why {m.correctRoleName}:</strong> {m.rationale}
                  <div style={{ marginTop: '4px', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
                    Recommended Tools: {m.recommendedTools.join(' • ')}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Submit / Results Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          {isSubmitted ? (
            <span style={{ fontWeight: 600, color: 'var(--ds-text-primary)', fontSize: '0.9375rem' }}>
              Team Architecture Score: {correctCount} / {milestones.length} Milestones Correctly Assigned
            </span>
          ) : (
            <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', fontFamily: 'var(--ds-font-mono)' }}>
              {Object.keys(userAssignments).length} of {milestones.length} milestones assigned
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {isSubmitted ? (
            <Button
              size="md"
              kind="tertiary"
              renderIcon={Restart}
              onClick={handleReset}
              style={{ borderColor: 'var(--ds-border-strong)', color: 'var(--ds-text-primary)' }}
            >
              Reassign Team
            </Button>
          ) : (
            <Button
              size="md"
              kind="primary"
              disabled={!allAssigned}
              renderIcon={CheckmarkOutline}
              onClick={() => setIsSubmitted(true)}
            >
              Verify Team Structure
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
