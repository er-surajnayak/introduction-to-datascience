'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  DecisionTree,
  CheckmarkFilled,
  ArrowRight,
  Restart,
  Help,
  Information,
} from '@carbon/icons-react';

interface StrategyPreset {
  id: string;
  name: string;
  context: string;
  trajectory: string[];
  recommendedStrategy: string;
  codeSyntax: string;
  rationale: string;
}

const strategyPresets: StrategyPreset[] = [
  {
    id: 'exam_marks',
    name: 'Student Exam Marks',
    context: 'Numerical, roughly symmetric distribution, 3% missing rows in 2,000 students.',
    trajectory: ['Data Type? ➔ Numerical', 'Time Ordered? ➔ NO', 'Outliers Present? ➔ NO (Symmetric)', 'Recommended ➔ Mean Imputation'],
    recommendedStrategy: 'Mean Imputation',
    codeSyntax: `df["marks"] = df["marks"].fillna(df["marks"].mean())`,
    rationale: 'For symmetric numerical distributions with low missingness, the mean is the most statistically efficient estimator.',
  },
  {
    id: 'worker_salary',
    name: 'Employee Salaries',
    context: 'Numerical, heavily right-skewed with high executive compensation outliers, 6% missing.',
    trajectory: ['Data Type? ➔ Numerical', 'Time Ordered? ➔ NO', 'Outliers Present? ➔ YES (Heavy Skew)', 'Recommended ➔ Median Imputation'],
    recommendedStrategy: 'Median Imputation',
    codeSyntax: `df["salary"] = df["salary"].fillna(df["salary"].median())`,
    rationale: 'The median is resistant to extreme outliers and prevents unrealistic salary inflation.',
  },
  {
    id: 'delivery_city',
    name: 'Delivery Metro City',
    context: 'Categorical nominal feature, 4 metro choices, 2% missing.',
    trajectory: ['Data Type? ➔ Categorical', 'Cardinality? ➔ Low (4 Cities)', 'Missingness? ➔ Low (<5%)', 'Recommended ➔ Mode Imputation'],
    recommendedStrategy: 'Mode Imputation',
    codeSyntax: `df["city"] = df["city"].fillna(df["city"].mode()[0])`,
    rationale: 'Fills gaps with the most frequently observed geographic delivery hub.',
  },
  {
    id: 'iot_temp',
    name: 'Hourly Weather Sensor',
    context: 'Continuous temperature sensor stream logging every 60 seconds with occasional 1-minute dropouts.',
    trajectory: ['Data Type? ➔ Numerical', 'Time Ordered? ➔ YES (Chronological)', 'Continuity? ➔ High', 'Recommended ➔ Forward Fill (ffill)'],
    recommendedStrategy: 'Forward Fill (ffill)',
    codeSyntax: `df["temperature"] = df["temperature"].ffill()`,
    rationale: 'Propagates the most recent physical reading forward across short sensor transmission gaps.',
  },
  {
    id: 'fax_number',
    name: 'Secondary Fax Number',
    context: 'Legacy optional field in a modern customer CRM table, 96% missing values.',
    trajectory: ['Missingness Rate? ➔ Extreme (96%)', 'Business Critical? ➔ NO (Legacy)', 'Action ➔ Drop Column'],
    recommendedStrategy: 'Drop Column',
    codeSyntax: `df = df.drop(columns=["secondary_fax_number"])`,
    rationale: 'A feature missing 96% of its records provides negligible signal and wastes memory.',
  },
  {
    id: 'unfiled_claim',
    name: 'Insurance Claim Amount',
    context: 'Patients who never filed an insurance claim legitimately have no claim amount.',
    trajectory: ['Missingness Mechanism? ➔ MNAR / Informative', 'Meaning? ➔ Non-Occurrence', 'Action ➔ Add Indicator Flag'],
    recommendedStrategy: 'Missingness Indicator + Zero Fill',
    codeSyntax: `df["has_claimed"] = df["claim_amount"].notna()\ndf["claim_amount"] = df["claim_amount"].fillna(0.0)`,
    rationale: 'Captures the meaningful behavior (whether a claim was made) while setting the amount to zero.',
  },
];

export function ImputationStrategyDecisionTree() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('exam_marks');
  const activePreset = strategyPresets.find((p) => p.id === selectedPresetId) || strategyPresets[0];

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
          <Tag type="blue" size="md">
            Interactive 07
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Strategy Decision Tree
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Reasoning & Syntax Selector
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Interactive Imputation Decision Tree: Choosing the Right Strategy
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        There is no universal &quot;one size fits all&quot; missing value command. Select different feature scenarios below to watch the decision tree navigate data types, distributions, and domain context.
      </p>

      {/* Preset Selector Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {strategyPresets.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetId(preset.id)}
              style={{
                padding: '10px 12px',
                borderRadius: '4px',
                border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div>{preset.name}</div>
              <div style={{ fontSize: '0.6875rem', color: isSelected ? 'var(--ds-text-primary)' : 'var(--ds-text-muted)', marginTop: '2px' }}>
                {preset.recommendedStrategy}
              </div>
            </button>
          );
        })}
      </div>

      {/* Traversal Flow Card */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Diagnostic Traversal: {activePreset.name}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem' }}>
          <strong>Context:</strong> {activePreset.context}
        </div>

        {/* Step by step path */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
          {activePreset.trajectory.map((step, idx) => {
            const isLast = idx === activePreset.trajectory.length - 1;
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  background: isLast ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface)',
                  border: isLast ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: isLast ? 'var(--ds-emerald)' : 'var(--ds-cyan)',
                    color: '#161616',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: isLast ? 600 : 400, color: isLast ? 'var(--ds-emerald)' : 'var(--ds-text-primary)' }}>
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Code & Rationale Box */}
        <div
          style={{
            padding: '12px 14px',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
            marginBottom: '10px',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '4px' }}>
            Recommended Pandas Python Implementation
          </div>
          <pre
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--ds-emerald)',
              margin: 0,
              overflowX: 'auto',
            }}
          >
            {activePreset.codeSyntax}
          </pre>
        </div>

        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
          <strong>Pedagogical Rationale:</strong> {activePreset.rationale}
        </div>
      </div>
    </div>
  );
}
