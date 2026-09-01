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
  ArrowRight,
} from '@carbon/icons-react';
import { learningPipelineSteps } from '@/data/courseData';

const iconMap: Record<string, React.ReactNode> = {
  DATA: <DataEnrichment size={28} />,
  CLEAN: <Clean size={28} />,
  EXPLORE: <SearchLocate size={28} />,
  UNDERSTAND: <Time size={28} />,
  PREDICT: <ChartLineSmooth size={28} />,
};

const colorMap: Record<string, { accent: string; bg: string; border: string }> = {
  DATA: { accent: '#00d2ff', bg: 'rgba(0, 210, 255, 0.08)', border: 'rgba(0, 210, 255, 0.3)' },
  CLEAN: { accent: '#009d9a', bg: 'rgba(0, 157, 154, 0.08)', border: 'rgba(0, 157, 154, 0.3)' },
  EXPLORE: { accent: '#0f62fe', bg: 'rgba(15, 98, 254, 0.08)', border: 'rgba(15, 98, 254, 0.3)' },
  UNDERSTAND: { accent: '#8a3ffc', bg: 'rgba(138, 63, 252, 0.08)', border: 'rgba(138, 63, 252, 0.3)' },
  PREDICT: { accent: '#198038', bg: 'rgba(25, 128, 56, 0.08)', border: 'rgba(25, 128, 56, 0.3)' },
};

export function DataPipelineJourney() {
  return (
    <section
      id="journey"
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(180deg, var(--ds-bg-core) 0%, #12151d 100%)',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            position: 'relative',
          }}
        >
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
                  border: `1px solid ${colors.border}`,
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
                        padding: '2px 6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--ds-border-subtle)',
                        borderRadius: '2px',
                        color: '#e0e0e0',
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
