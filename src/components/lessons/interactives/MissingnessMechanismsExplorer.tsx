'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Shuffle,
  Compare,
  WarningAlt,
  CheckmarkFilled,
  Help,
  Information,
} from '@carbon/icons-react';

interface MechanismData {
  id: 'MCAR' | 'MAR' | 'MNAR';
  title: string;
  subtitle: string;
  definition: string;
  realWorldScenario: string;
  biasRisk: string;
  recommendedTreatment: string;
  visualTag: string;
  accentColor: string;
}

const mechanisms: MechanismData[] = [
  {
    id: 'MCAR',
    title: 'MCAR — Missing Completely At Random',
    subtitle: 'Pure Randomness (Independent of All Variables)',
    definition:
      'The probability that a value is missing is completely independent of both observed variables and the unobserved value itself. Missingness is equivalent to a pure coin toss or random glitch.',
    realWorldScenario:
      'A delivery van encounters a severe road pothole, causing a paper survey box to fall out of the trunk and lose 10 random student feedback sheets. Missingness has zero correlation with student GPA, gender, or opinions.',
    biasRisk:
      'Low Statistical Bias: Dropping MCAR rows (df.dropna()) reduces the sample size and statistical power, but does NOT systematically distort averages or model weights.',
    recommendedTreatment:
      'Listwise deletion (dropna) is acceptable if data loss is <3-5%; otherwise simple Mean, Median, or Mode imputation preserves statistical properties without bias.',
    visualTag: 'Random Dropouts',
    accentColor: 'var(--ds-emerald)',
  },
  {
    id: 'MAR',
    title: 'MAR — Missing At Random',
    subtitle: 'Systematically Linked to OTHER Observed Features',
    definition:
      'The probability that a value is missing depends systematically on other observable features in the dataset, but not on the value of the missing variable itself.',
    realWorldScenario:
      'In an online university survey, engineering seniors (4th years) are far more likely to complete the "Internship Stipend" field than 1st-year freshmen. However, among all 1st-year students, missingness is completely random.',
    biasRisk:
      'Moderate Bias if Ignored: Deleting missing rows blindly will skew the sample heavily toward senior students and overestimate average student stipends.',
    recommendedTreatment:
      'Group-based or Conditional Imputation: Group by "Academic Year" and fill missing stipends using the median of that specific cohort (e.g. df.groupby("year")["stipend"].transform(lambda x: x.fillna(x.median()))).',
    visualTag: 'Conditional Dependency',
    accentColor: 'var(--ds-cyan)',
  },
  {
    id: 'MNAR',
    title: 'MNAR — Missing Not At Random',
    subtitle: 'Linked Directly to the UNSEEN Missing Value Itself',
    definition:
      'The probability that a value is missing depends directly on the unobserved value itself. The absence of data is inherently non-random and carries hidden information.',
    realWorldScenario:
      'In a campus academic wellness survey, students with failing marks (scores < 40/100) intentionally refuse to fill in the "Midterm Exam Score" field out of embarrassment or fear.',
    biasRisk:
      'Severe / Catastrophic Bias: If you delete missing rows or fill them with the class mean (82/100), you completely erase the failing population and falsely conclude that 100% of students are passing!',
    recommendedTreatment:
      'Domain Investigation: Preserve missingness or create an explicit binary indicator column (e.g. has_reported_score = False) to allow machine learning models to learn from the absence.',
    visualTag: 'Systematic Concealment',
    accentColor: '#da1e28',
  },
];

export function MissingnessMechanismsExplorer() {
  const [selectedMechanismId, setSelectedMechanismId] = useState<'MCAR' | 'MAR' | 'MNAR'>('MCAR');
  const current = mechanisms.find((m) => m.id === selectedMechanismId) || mechanisms[0];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Interactive 02
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Missingness Mechanisms Explorer
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Rubin&apos;s Missingness Taxonomy
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Why Did the Data Go Missing? MCAR vs. MAR vs. MNAR
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        In Data Science, <em>why</em> a value is missing dictates <em>how</em> you must treat it. Renowned statistician Donald Rubin classified missingness into three fundamental mechanisms. Select each mechanism below to explore its real-world mechanics.
      </p>

      {/* Mechanism Selector Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {mechanisms.map((m) => {
          const isSelected = m.id === selectedMechanismId;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMechanismId(m.id)}
              style={{
                padding: '0.875rem 1rem',
                borderRadius: '4px',
                border: isSelected ? `2px solid ${m.accentColor}` : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-bg-surface-elevated)' : 'transparent',
                color: isSelected ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: m.accentColor }}>
                  {m.id}
                </span>
                <Tag type="cool-gray" size="sm" style={{ margin: 0 }}>
                  {m.visualTag}
                </Tag>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
                {m.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{
              padding: '1.5rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              borderLeft: `4px solid ${current.accentColor}`,
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
              {current.title}
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
              {current.definition}
            </div>

            <div
              style={{
                padding: '12px 14px',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
                marginBottom: '1rem',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Real-World Empirical Scenario
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
                {current.realWorldScenario}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-amber)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-amber)', marginBottom: '4px' }}>
                  Risk of Bias & Distortion
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
                  {current.biasRisk}
                </div>
              </div>

              <div style={{ padding: '12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-emerald)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-emerald)', marginBottom: '4px' }}>
                  Recommended Data Strategy
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
                  {current.recommendedTreatment}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
