'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  DataEnrichment,
  Clean,
  SearchLocate,
  Time,
  ChartLineSmooth,
} from '@carbon/icons-react';
import { learningPipelineSteps } from '@/data/courseData';

const iconMap: Record<string, React.ReactNode> = {
  DATA: <DataEnrichment size={26} />,
  CLEAN: <Clean size={26} />,
  EXPLORE: <SearchLocate size={26} />,
  UNDERSTAND: <Time size={26} />,
  PREDICT: <ChartLineSmooth size={26} />,
};

const colorMap: Record<string, { accent: string; bg: string; border: string }> = {
  DATA: { accent: 'var(--ds-cyan)', bg: 'var(--ds-cyan-dim)', border: 'var(--ds-cyan)' },
  CLEAN: { accent: 'var(--ds-teal)', bg: 'var(--ds-teal-dim)', border: 'var(--ds-teal)' },
  EXPLORE: { accent: 'var(--ds-blue)', bg: 'rgba(15, 98, 254, 0.1)', border: '#0f62fe' },
  UNDERSTAND: { accent: 'var(--ds-purple)', bg: 'var(--ds-purple-dim)', border: 'var(--ds-purple)' },
  PREDICT: { accent: 'var(--ds-emerald)', bg: 'var(--ds-emerald-dim)', border: 'var(--ds-emerald)' },
};

export function DataPipelineJourney() {
  return (
    <section
      id="journey"
      style={{
        padding: '5rem 0',
        background: 'var(--ds-bg-core)',
        borderBottom: '1px solid var(--ds-border-subtle)',
      }}
    >
      <div className="ds-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <Tag type="cyan" size="md" style={{ marginBottom: '1rem' }}>
            Data Science Lifecycle
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
            From Raw Data to Meaningful Insights
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.6,
              color: 'var(--ds-text-secondary)',
              margin: 0,
            }}
          >
            Learn how modern data scientists turn messy streams into high-confidence statistical predictions and engineering decisions.
          </p>
        </div>

        {/* Interactive Pipeline Stages Grid */}
        <div className="ds-responsive-journey-grid">
          {learningPipelineSteps.map((step, idx) => {
            const colors = colorMap[step.phase] || colorMap.DATA;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  background: 'var(--ds-bg-surface)',
                  border: '1px solid var(--ds-border-subtle)',
                  padding: '1.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'var(--ds-card-shadow)',
                }}
              >
                {/* Step Top Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.8125rem',
                      color: colors.accent,
                      fontWeight: 600,
                    }}
                  >
                    PHASE 0{step.step}
                  </div>
                  <div
                    style={{
                      color: colors.accent,
                      background: colors.bg,
                      padding: '8px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {iconMap[step.phase]}
                  </div>
                </div>

                {/* Phase Name & Label */}
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--ds-text-primary)',
                    margin: '0 0 0.25rem 0',
                  }}
                >
                  {step.phase}
                </h3>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: colors.accent,
                    fontWeight: 500,
                    marginBottom: '0.75rem',
                  }}
                >
                  {step.label}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--ds-text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '1.25rem',
                    flexGrow: 1,
                  }}
                >
                  {step.description}
                </p>

                {/* Tool Badges */}
                <div
                  style={{
                    borderTop: '1px solid var(--ds-border-subtle)',
                    paddingTop: '0.875rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}
                >
                  {step.tools.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--ds-font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        padding: '3px 8px',
                        background: 'var(--ds-bg-surface-elevated)',
                        border: '1px solid var(--ds-border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--ds-text-primary)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
