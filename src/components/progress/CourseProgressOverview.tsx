'use client';

import React from 'react';
import { ProgressBar, Tag, Button } from '@carbon/react';
import {
  CheckmarkFilled,
  Time,
  Education,
  Restart,
  Locked,
  PlayFilledAlt,
} from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';

export function CourseProgressOverview() {
  const {
    completedCount,
    totalCount,
    overallProgress,
    activeModule,
    modules,
    completeModule,
    resetProgress,
  } = useCourseProgress();

  const activeProgress = activeModule ? activeModule.progress : 0;

  return (
    <section
      style={{
        padding: '3rem 0',
        background: 'var(--ds-bg-core)',
        borderBottom: '1px solid var(--ds-border-subtle)',
      }}
    >
      <div className="ds-container">
        <div
          className="ds-glass-panel"
          style={{
            padding: '2rem',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--ds-cyan)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                COURSE PROGRESSION
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                {completedCount} / {totalCount} Modules Completed
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag type={overallProgress === 100 ? 'green' : 'cyan'} size="md">
                {overallProgress}% Total Mastered
              </Tag>
              {completedCount > 0 && (
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={Restart}
                  hasIconOnly
                  iconDescription="Reset local course progress"
                  onClick={resetProgress}
                  tooltipAlignment="end"
                />
              )}
            </div>
          </div>

          {/* Primary Carbon Progress Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <ProgressBar
              value={overallProgress}
              max={100}
              label="Overall Course Completion"
              helperText={`${totalCount - completedCount} modules remaining in sequence`}
              size="big"
              status={overallProgress === 100 ? 'finished' : 'active'}
            />
          </div>

          {/* Current Focus Highlight Card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              padding: '1.25rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
            }}
          >
            {/* Current Active Module */}
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#8d8d8d', textTransform: 'uppercase', marginBottom: '6px' }}>
                CURRENT FOCUS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <PlayFilledAlt size={16} style={{ color: 'var(--ds-cyan)' }} />
                <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '1rem' }}>
                  Module {activeModule?.moduleNumber} — {activeModule?.title}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#c6c6c6' }}>
                {activeModule?.subtitle}
              </div>
            </div>

            {/* Estimated Time */}
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#8d8d8d', textTransform: 'uppercase', marginBottom: '6px' }}>
                ESTIMATED EFFORT
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Time size={16} style={{ color: 'var(--ds-teal)' }} />
                <span style={{ fontWeight: 500, color: '#ffffff' }}>
                  {activeModule?.estimatedHours} for current module
                </span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#8d8d8d', marginTop: '4px' }}>
                Includes interactive Python labs & visual diagnostics
              </div>
            </div>

            {/* Next Milestone */}
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#8d8d8d', textTransform: 'uppercase', marginBottom: '6px' }}>
                NEXT UNLOCK
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Locked size={16} style={{ color: '#8d8d8d' }} />
                <span style={{ fontWeight: 500, color: '#c6c6c6' }}>
                  {completedCount < totalCount - 1
                    ? `Module ${completedCount + 2}: ${modules[completedCount + 1]?.title}`
                    : 'Course Completed!'}
                </span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#8d8d8d', marginTop: '4px' }}>
                Unlocks automatically upon completing Module {completedCount + 1}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
