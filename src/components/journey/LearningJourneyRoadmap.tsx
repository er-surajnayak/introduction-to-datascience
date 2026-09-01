'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  CheckmarkOutline,
  Locked,
  PlayFilledAlt,
  ArrowRight,
} from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';

export function LearningJourneyRoadmap() {
  const { modules } = useCourseProgress();

  const roadmapSteps = [
    {
      num: '01',
      title: 'Introduction',
      subtitle: 'Computational Mindset & Python Tooling',
      moduleId: 'module-1',
    },
    {
      num: '02',
      title: 'Collect & Prepare',
      subtitle: 'APIs, Scraping & Data Imputation',
      moduleId: 'module-2',
    },
    {
      num: '03',
      title: 'Explore',
      subtitle: 'Distributions, Correlation & Hypothesis Testing',
      moduleId: 'module-3',
    },
    {
      num: '04',
      title: 'Understand Time',
      subtitle: 'Trends, Seasonality & Moving Averages',
      moduleId: 'module-4',
    },
    {
      num: '05',
      title: 'Build Models',
      subtitle: 'Linear Regression & Scikit-Learn Pipelines',
      moduleId: 'module-5',
    },
  ];

  return (
    <section
      style={{
        padding: '5rem 0',
        background: 'var(--ds-bg-core)',
        borderBottom: '1px solid var(--ds-border-subtle)',
      }}
    >
      <div className="ds-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <Tag type="teal" size="md" style={{ marginBottom: '1rem' }}>
            Structured Progression
          </Tag>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '0 0 1rem 0',
              lineHeight: 1.2,
            }}
          >
            Your Learning Journey
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Every module builds directly upon the mathematical intuition and code developed in the previous step.
          </p>
        </div>

        {/* Horizontal/Vertical Connected Flow Roadmap */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            position: 'relative',
          }}
        >
          {roadmapSteps.map((step, idx) => {
            const mod = modules.find((m) => m.id === step.moduleId);
            const isAvailable = mod?.status === 'available' || mod?.status === 'in-progress';
            const isCompleted = mod?.status === 'completed';
            const isLocked = mod?.status === 'locked';

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                style={{
                  background: isAvailable
                    ? 'var(--ds-cyan-dim)'
                    : isCompleted
                    ? 'var(--ds-emerald-dim)'
                    : 'var(--ds-bg-surface)',
                  border: isAvailable
                    ? '1.5px solid var(--ds-cyan)'
                    : isCompleted
                    ? '1px solid var(--ds-emerald)'
                    : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  opacity: isLocked ? 0.75 : 1,
                  boxShadow: isAvailable ? 'var(--ds-card-shadow)' : 'none',
                }}
              >
                {/* Step Index & Status Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: isAvailable
                        ? 'var(--ds-cyan)'
                        : isCompleted
                        ? 'var(--ds-emerald)'
                        : 'var(--ds-text-muted)',
                    }}
                  >
                    {step.num}
                  </span>

                  <div>
                    {isCompleted ? (
                      <CheckmarkOutline size={18} style={{ color: 'var(--ds-emerald)' }} />
                    ) : isAvailable ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--ds-cyan)',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--ds-font-mono)',
                          fontWeight: 600,
                        }}
                      >
                        <PlayFilledAlt size={12} /> ACTIVE
                      </span>
                    ) : (
                      <Locked size={16} style={{ color: 'var(--ds-text-muted)' }} />
                    )}
                  </div>
                </div>

                {/* Step Title */}
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: isLocked ? 'var(--ds-text-muted)' : 'var(--ds-text-primary)',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  {step.title}
                </h3>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: isLocked ? 'var(--ds-text-muted)' : 'var(--ds-text-secondary)',
                    lineHeight: 1.45,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {step.subtitle}
                </p>

                {/* Step Bottom Connection Indicator */}
                {idx < roadmapSteps.length - 1 && (
                  <div
                    style={{
                      marginTop: '1rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px dashed var(--ds-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '4px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--ds-font-mono)',
                      color: isAvailable ? 'var(--ds-cyan)' : 'var(--ds-text-muted)',
                    }}
                  >
                    <span>NEXT STEP</span>
                    <ArrowRight size={12} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
