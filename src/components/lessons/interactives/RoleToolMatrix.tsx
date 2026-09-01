'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  UserMultiple,
  Tools,
  Collaborate,
  Network_3,
} from '@carbon/icons-react';

interface RoleProfile {
  id: string;
  name: string;
  badgeColor: string;
  focusQuestion: string;
  coreTools: string[];
  secondaryTools: string[];
  dailyWorkflow: string;
  keyMetric: string;
}

const roleProfiles: RoleProfile[] = [
  {
    id: 'da',
    name: 'Data Analyst',
    badgeColor: 'var(--ds-cyan)',
    focusQuestion: 'What happened, and what trends is the data showing?',
    coreTools: ['SQL', 'Pandas', 'Tableau / PowerBI', 'Excel', 'Matplotlib'],
    secondaryTools: ['Python', 'Seaborn', 'Jupyter', 'Git'],
    dailyWorkflow:
      'Writing SQL queries to extract cohort records, transforming tabular data with Pandas, generating executive BI dashboards, and identifying operational bottlenecks.',
    keyMetric: 'Dashboard latency, query accuracy, stakeholder decision velocity.',
  },
  {
    id: 'ds',
    name: 'Data Scientist',
    badgeColor: 'var(--ds-blue)',
    focusQuestion: 'What deeper patterns exist, and what will happen next?',
    coreTools: ['Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'Jupyter', 'Seaborn'],
    secondaryTools: ['SQL', 'Git', 'Statsmodels', 'Matplotlib'],
    dailyWorkflow:
      'Formulating hypotheses, designing feature representations, conducting statistical significance tests, fitting machine learning algorithms, and tuning hyperparameters.',
    keyMetric: 'Model AUC-ROC, precision/recall, cross-validation stability, business lift.',
  },
  {
    id: 'de',
    name: 'Data Engineer',
    badgeColor: 'var(--ds-teal)',
    focusQuestion: 'How do we reliably collect, store, and move data at scale?',
    coreTools: ['SQL', 'Python', 'PostgreSQL / Snowflake', 'Apache Spark', 'Kafka'],
    secondaryTools: ['Docker', 'Airflow', 'AWS S3', 'Git'],
    dailyWorkflow:
      'Architecting streaming ingestion pipelines, optimizing distributed database queries, designing dimensional schemas (star/snowflake), and guaranteeing 99.99% data pipeline uptime.',
    keyMetric: 'Pipeline latency, data freshness, ingestion throughput, uptime SLA.',
  },
  {
    id: 'mle',
    name: 'ML Engineer',
    badgeColor: 'var(--ds-emerald)',
    focusQuestion: 'How do we turn a trained model into a reliable production product?',
    coreTools: ['Python', 'FastAPI / Flask', 'Docker', 'Kubernetes', 'MLflow', 'Git'],
    secondaryTools: ['NumPy', 'Scikit-Learn', 'PyTorch / ONNX', 'SQL'],
    dailyWorkflow:
      'Optimizing model inference latency (<15ms), building containerized microservice APIs, setting up automated CI/CD retraining pipelines, and monitoring feature drift.',
    keyMetric: 'p99 API latency, request throughput (RPS), drift detection time, container health.',
  },
  {
    id: 'ba',
    name: 'Business Analyst',
    badgeColor: 'var(--ds-purple)',
    focusQuestion: 'What does the business actually need to achieve and improve?',
    coreTools: ['Excel / Spreadsheets', 'SQL', 'Tableau / BI', 'Jira / Confluence'],
    secondaryTools: ['Python', 'Miro', 'PowerBI'],
    dailyWorkflow:
      'Interviewing operational leaders, defining measurable KPI metrics, translating vague business problems into structured technical specifications, and auditing impact.',
    keyMetric: 'Requirement clarity, project ROI, KPI alignment, stakeholder satisfaction.',
  },
  {
    id: 'stat',
    name: 'Statistician',
    badgeColor: 'var(--ds-amber)',
    focusQuestion: 'Is this result statistically significant or pure random noise?',
    coreTools: ['Python / R', 'Statsmodels', 'NumPy', 'Jupyter', 'Seaborn'],
    secondaryTools: ['Pandas', 'SQL', 'Scipy'],
    dailyWorkflow:
      'Designing randomized controlled A/B test experiments, calculating sample size power, quantifying uncertainty intervals, and validating causal relationships.',
    keyMetric: 'p-values, statistical power, confidence interval calibration, bias reduction.',
  },
];

const allToolTokens = [
  'Python',
  'NumPy',
  'Pandas',
  'SQL',
  'Jupyter',
  'Scikit-Learn',
  'Matplotlib',
  'Seaborn',
  'Git',
  'Docker',
  'FastAPI / Flask',
  'Tableau / PowerBI',
  'Kafka',
  'Apache Spark',
  'PostgreSQL / Snowflake',
  'Excel / Spreadsheets',
  'Statsmodels',
];

export function RoleToolMatrix() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('ds');
  const [selectedToolFilter, setSelectedToolFilter] = useState<string | null>(null);

  const activeRole = roleProfiles.find((r) => r.id === selectedRoleId) || roleProfiles[0];

  const rolesUsingSelectedTool = selectedToolFilter
    ? roleProfiles.filter(
        (r) =>
          r.coreTools.some((t) => t.toLowerCase().includes(selectedToolFilter.toLowerCase())) ||
          r.secondaryTools.some((t) => t.toLowerCase().includes(selectedToolFilter.toLowerCase()))
      )
    : [];

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
            Interactive Experience 4
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Role + Tool Connection Map
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Ecosystem Matrix
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
        Roles and tools are not isolated silos. Select a <strong>Role</strong> to view their primary toolstack, or click a <strong>Tool</strong> below to see which specialists rely on it.
      </p>

      {/* Role Picker Buttons */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Select Specialist Discipline:
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '8px',
          }}
        >
          {roleProfiles.map((r) => {
            const isSelected = selectedRoleId === r.id && !selectedToolFilter;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setSelectedRoleId(r.id);
                  setSelectedToolFilter(null);
                }}
                style={{
                  padding: '10px 8px',
                  background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                  border: isSelected ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                {r.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Tool Filter Bar */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--ds-text-muted)', fontFamily: 'var(--ds-font-mono)', marginBottom: '8px' }}>
          <Network_3 size={14} /> OR CLICK A SHARED TOOL TO SEE CROSS-ROLE OVERLAP:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {allToolTokens.map((tool) => {
            const isToolActive = selectedToolFilter === tool;
            return (
              <button
                key={tool}
                type="button"
                onClick={() => {
                  if (selectedToolFilter === tool) {
                    setSelectedToolFilter(null);
                  } else {
                    setSelectedToolFilter(tool);
                  }
                }}
                style={{
                  padding: '4px 10px',
                  background: isToolActive ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface)',
                  border: isToolActive ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '2px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: isToolActive ? 'var(--ds-purple)' : 'var(--ds-text-secondary)',
                  cursor: 'pointer',
                  fontWeight: isToolActive ? 700 : 400,
                }}
              >
                {tool}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Detail Window */}
      <AnimatePresence mode="wait">
        {selectedToolFilter ? (
          /* Tool Overlap Inspection Mode */
          <motion.div
            key={`tool-${selectedToolFilter}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--ds-bg-surface-elevated)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tools size={18} style={{ color: 'var(--ds-purple)' }} />
                <h4 style={{ fontSize: '1.1875rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
                  Tool Overlap Analysis: {selectedToolFilter}
                </h4>
              </div>
              <Tag type="purple" size="sm">
                Shared by {rolesUsingSelectedTool.length} Roles
              </Tag>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
              {selectedToolFilter} is utilized across multiple engineering disciplines. Notice how each role uses it to solve a distinct problem:
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '10px',
              }}
            >
              {rolesUsingSelectedTool.map((r) => {
                const isCore = r.coreTools.some((t) => t.toLowerCase().includes(selectedToolFilter.toLowerCase()));
                return (
                  <div
                    key={r.id}
                    style={{
                      padding: '12px',
                      background: 'var(--ds-bg-surface)',
                      border: '1px solid var(--ds-border-subtle)',
                      borderRadius: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600, color: r.badgeColor, fontSize: '0.875rem' }}>
                        {r.name}
                      </span>
                      <Tag type={isCore ? 'cyan' : 'cool-gray'} size="sm">
                        {isCore ? 'Core Tool' : 'Secondary'}
                      </Tag>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.4 }}>
                      {r.dailyWorkflow}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Role Profile View Mode */
          <motion.div
            key={`role-${activeRole.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--ds-bg-surface-elevated)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              padding: '1.5rem',
            }}
          >
            {/* Title & Question */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: activeRole.badgeColor, margin: '0 0 2px 0' }}>
                  {activeRole.name}
                </h4>
                <div style={{ fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--ds-text-primary)' }}>
                  "{activeRole.focusQuestion}"
                </div>
              </div>
              <Tag type="cyan" size="md">
                Discipline Profile
              </Tag>
            </div>

            {/* Daily Workflow */}
            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              <strong>Daily Engineering Focus:</strong> {activeRole.dailyWorkflow}
            </p>

            {/* Tools Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ padding: '12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Primary Core Stack
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeRole.coreTools.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--ds-font-mono)',
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        background: 'var(--ds-cyan-dim)',
                        border: '1px solid var(--ds-cyan)',
                        borderRadius: '2px',
                        color: 'var(--ds-cyan)',
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Supporting & Collaboration Tools
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeRole.secondaryTools.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--ds-font-mono)',
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        background: 'var(--ds-bg-surface-elevated)',
                        border: '1px solid var(--ds-border-subtle)',
                        borderRadius: '2px',
                        color: 'var(--ds-text-secondary)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Quality Metric */}
            <div
              style={{
                padding: '8px 12px',
                background: 'var(--ds-bg-surface)',
                borderLeft: `3px solid ${activeRole.badgeColor}`,
                borderRadius: '0 3px 3px 0',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-secondary)',
              }}
            >
              <strong>Primary Success Benchmark:</strong> {activeRole.keyMetric}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
