'use client';

import React, { useState } from 'react';
import { Tag, Button, InlineNotification, ProgressBar } from '@carbon/react';
import { CheckmarkFilled, Trophy, ArrowRight, PlayFilledAlt } from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';

interface Mission {
  id: number;
  title: string;
  task: string;
  concept: string;
  validationCheck: string;
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'Mission 1: Individual Marks Bar Chart',
    task: 'Plot a clean discrete bar chart displaying exam marks for all 8 students.',
    concept: 'Discrete Categorical Comparison',
    validationCheck: 'Verified: 8 vertical bars with student names mapped to X and marks to Y.',
  },
  {
    id: 2,
    title: 'Mission 2: Marks Distribution Histogram',
    task: 'Partition marks into 4 continuous intervals to inspect cohort score spread.',
    concept: 'Continuous Numerical Binning',
    validationCheck: 'Verified: 4 contiguous touching bins spanning from 50 to 100.',
  },
  {
    id: 3,
    title: 'Mission 3: Study Hours vs Marks Scatter',
    task: 'Construct a bivariate scatter plot testing if higher study hours associate with marks.',
    concept: 'Bivariate Coordinate Mapping',
    validationCheck: 'Verified: 8 coordinate points exhibiting a clear positive slope.',
  },
  {
    id: 4,
    title: 'Mission 4: Section Cohort Boxplot',
    task: 'Generate side-by-side box plots comparing Class A vs Class B mark distributions.',
    concept: 'Seaborn Grouped Quartiles',
    validationCheck: 'Verified: Section A median (~83) noticeably higher than Section B (~68).',
  },
  {
    id: 5,
    title: 'Mission 5: Numerical Correlation Heatmap',
    task: 'Generate an annotated 3x3 correlation heatmap across StudyHours, Marks, and Attendance.',
    concept: 'Matrix Color Encodings',
    validationCheck: 'Verified: StudyHours & Marks show strong positive correlation (r > 0.9).',
  },
  {
    id: 6,
    title: 'Mission 6: Multi-Plot Dashboard Layout',
    task: 'Arrange the 4 primary visualizations into a unified 2x2 subplots figure.',
    concept: 'fig, axes = plt.subplots(2, 2)',
    validationCheck: 'Verified: 4 coordinated Axes arranged into a cohesive canvas.',
  },
  {
    id: 7,
    title: 'Mission 7: Visual Polish & Integrity',
    task: 'Verify that all titles, units, zero-baselines, and legends meet accessibility standards.',
    concept: 'Data Visualization Integrity',
    validationCheck: 'Verified: Zero-baselines preserved and units explicitly labeled.',
  },
  {
    id: 8,
    title: 'Mission 8: Triangulate Key Insights',
    task: 'State 3 supported findings linking study duration, attendance, and exam scores.',
    concept: 'Evidence-Based Storytelling',
    validationCheck: 'Verified: Clear, verified observations backed by numeric evidence.',
  },
  {
    id: 9,
    title: 'Mission 9: Acknowledge Analytical Limitations',
    task: 'Explain why these findings cannot be claimed as causal proof for the entire university.',
    concept: 'Confounding Caution & Scope',
    validationCheck: 'Verified: Small sample size (N=8) and lack of randomized control noted.',
  },
];

export function StudentEdaDashboardChallenge() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [challengeComplete, setChallengeComplete] = useState<boolean>(false);

  const { completeTopic } = useCourseProgress();

  const handleCompleteCurrentMission = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }

    if (activeStep < MISSIONS.length) {
      setActiveStep(activeStep + 1);
    } else {
      setChallengeComplete(true);
      completeTopic('module-3', 'data-visualization');
      completeTopic('module-3', 'm3-t3');
    }
  };

  const progressPercent = Math.round((completedSteps.length / MISSIONS.length) * 100);

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="magenta" size="md">Section 3.3.26</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Capstone Challenge</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Student Performance EDA Dashboard (9 Missions)
        </span>
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Final Challenge: Build a Complete Student EDA Dashboard
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        You have been appointed lead Data Science Analyst for an engineering university. Construct and validate a full 4-panel exploratory visualization dashboard to diagnose midterm academic performance.
      </p>

      {/* Progress Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
          <span style={{ color: 'var(--ds-text-muted)' }}>Missions Completed:</span>
          <span style={{ fontWeight: 600, color: 'var(--ds-cyan)' }}>
            {completedSteps.length} of {MISSIONS.length} ({progressPercent}%)
          </span>
        </div>
        <ProgressBar value={progressPercent} max={100} size="small" hideLabel label="Challenge Progress" />
      </div>

      {/* Mission Selector Tabs */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '1.5rem' }}>
        {MISSIONS.map((m) => {
          const isDone = completedSteps.includes(m.id);
          const isCurrent = activeStep === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveStep(m.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '3px',
                border: isCurrent ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: isCurrent ? 'var(--ds-cyan-dim)' : isDone ? 'var(--ds-bg-surface)' : 'var(--ds-bg-core)',
                color: isDone ? 'var(--ds-emerald)' : isCurrent ? 'var(--ds-cyan)' : 'var(--ds-text-muted)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {isDone && <CheckmarkFilled size={12} />}
              M{m.id}
            </button>
          );
        })}
      </div>

      {/* Active Mission Card */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '4px' }}>
          {MISSIONS[activeStep - 1].concept}
        </div>
        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          {MISSIONS[activeStep - 1].title}
        </div>
        <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
          {MISSIONS[activeStep - 1].task}
        </p>

        <div style={{ padding: '8px 12px', background: 'var(--ds-bg-surface)', borderRadius: '3px', fontSize: '0.8125rem', color: 'var(--ds-emerald)', marginBottom: '1rem' }}>
          &check; {MISSIONS[activeStep - 1].validationCheck}
        </div>

        <Button kind="primary" size="sm" onClick={handleCompleteCurrentMission} renderIcon={ArrowRight}>
          Validate Mission {activeStep} & Continue
        </Button>
      </div>

      {/* Challenge Unlocked Dashboard Preview */}
      {challengeComplete && (
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '2px solid var(--ds-emerald)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Trophy size={20} style={{ color: 'var(--ds-amber)' }} />
            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
              Capstone Completed: Master EDA Dashboard Assembled!
            </span>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            You have successfully created individual charts, arranged a 2x2 subplot dashboard, added accessible styling, and formulated an honest data storytelling report.
          </p>

          {/* 2x2 Dashboard Graphic */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-blue)' }}>1. Marks per Student</div>
              <svg viewBox="0 0 160 60" style={{ width: '100%', height: 'auto' }}>
                <rect x="20" y="20" width="12" height="40" fill="var(--ds-blue)" />
                <rect x="50" y="10" width="12" height="50" fill="var(--ds-blue)" />
                <rect x="80" y="30" width="12" height="30" fill="var(--ds-blue)" />
                <rect x="110" y="5" width="12" height="55" fill="var(--ds-blue)" />
              </svg>
            </div>

            <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-emerald)' }}>2. Marks Histogram</div>
              <svg viewBox="0 0 160 60" style={{ width: '100%', height: 'auto' }}>
                <rect x="30" y="25" width="25" height="35" fill="var(--ds-emerald)" />
                <rect x="55" y="15" width="25" height="45" fill="var(--ds-emerald)" />
                <rect x="80" y="10" width="25" height="50" fill="var(--ds-emerald)" />
                <rect x="105" y="20" width="25" height="40" fill="var(--ds-emerald)" />
              </svg>
            </div>

            <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)' }}>3. Study Hours vs Marks</div>
              <svg viewBox="0 0 160 60" style={{ width: '100%', height: 'auto' }}>
                <circle cx="30" cy="45" r="4" fill="var(--ds-cyan)" />
                <circle cx="60" cy="35" r="4" fill="var(--ds-cyan)" />
                <circle cx="90" cy="22" r="4" fill="var(--ds-cyan)" />
                <circle cx="120" cy="12" r="4" fill="var(--ds-cyan)" />
              </svg>
            </div>

            <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-purple)' }}>4. Section Boxplots</div>
              <svg viewBox="0 0 160 60" style={{ width: '100%', height: 'auto' }}>
                <rect x="40" y="15" width="20" height="30" fill="var(--ds-blue)" opacity="0.7" />
                <rect x="90" y="25" width="20" height="25" fill="var(--ds-purple)" opacity="0.7" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
