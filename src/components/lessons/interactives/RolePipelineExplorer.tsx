'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Enterprise,
  DataEnrichment,
  DataBase,
  ChartCustom,
  Chemistry,
  CloudApp,
  DecisionTree,
  ArrowRight,
  User,
  Collaborate,
  Tools,
} from '@carbon/icons-react';

interface StageInfo {
  id: string;
  step: number;
  title: string;
  icon: React.ReactNode;
  primaryRole: string;
  primaryColor: string;
  supportingRoles: string[];
  whatHappens: string;
  typicalOutput: string;
  tools: string[];
  realExample: string;
}

const pipelineStages: StageInfo[] = [
  {
    id: 'problem',
    step: 1,
    title: 'Business Problem',
    icon: <Enterprise size={22} />,
    primaryRole: 'Business Analyst',
    primaryColor: 'var(--ds-purple)',
    supportingRoles: ['Product Manager', 'Domain Specialists', 'Executive Stakeholders'],
    whatHappens:
      'The team defines what real-world business challenge needs to be solved and converts high-level goals into measurable quantitative KPIs.',
    typicalOutput: 'Product Requirement Document (PRD), KPI Success Thresholds, Analytic Scope.',
    tools: ['Spreadsheets', 'Confluence', 'Miro', 'Jira', 'SQL'],
    realExample:
      'Example: Food-delivery leadership notices 18% of customers cancel orders during rainstorms and wants to reduce churn.',
  },
  {
    id: 'raw-data',
    step: 2,
    title: 'Raw Ingestion',
    icon: <DataEnrichment size={22} />,
    primaryRole: 'Data Engineer',
    primaryColor: 'var(--ds-teal)',
    supportingRoles: ['Backend Engineers', 'IoT Telemetry Teams', 'Database Admins'],
    whatHappens:
      'Captures continuous high-throughput streams from mobile apps, third-party weather APIs, restaurant POS devices, and payment gateways.',
    typicalOutput: 'Raw event streams, message broker topics, raw JSON storage in cloud data lakes.',
    tools: ['Kafka', 'REST APIs', 'AWS S3', 'HTTP Webhooks', 'Python'],
    realExample:
      'Example: Streaming 150,000 GPS coordinates per second from active delivery bikes directly into Kafka.',
  },
  {
    id: 'infrastructure',
    step: 3,
    title: 'Data Warehouse',
    icon: <DataBase size={22} />,
    primaryRole: 'Data Engineer',
    primaryColor: 'var(--ds-teal)',
    supportingRoles: ['Data Architect', 'Security & Compliance Officers'],
    whatHappens:
      'Extracts, transforms, and loads (ETL/ELT) raw unstructured logs into clean, partitioned relational tables with consistent data types and schemas.',
    typicalOutput: 'Structured analytics tables, deduplicated records, dimensional star schemas.',
    tools: ['SQL', 'PostgreSQL', 'Snowflake', 'BigQuery', 'Apache Spark', 'dbt'],
    realExample:
      'Example: Joining GPS coordinate logs with restaurant order receipts into a queryable orders_delivery_history table.',
  },
  {
    id: 'analysis',
    step: 4,
    title: 'Diagnostic Analysis',
    icon: <ChartCustom size={22} />,
    primaryRole: 'Data Analyst',
    primaryColor: 'var(--ds-cyan)',
    supportingRoles: ['Business Analyst', 'Data Scientist'],
    whatHappens:
      'Queries the structured warehouse to diagnose historical patterns, identify bottlenecks, compute cohort statistics, and publish dashboards.',
    typicalOutput: 'Executive BI dashboards, cohort breakdown reports, automated alert queries.',
    tools: ['SQL', 'Pandas', 'Tableau', 'PowerBI', 'Excel', 'Metabase'],
    realExample:
      'Example: Discovering that deliveries taking over 38 minutes experience a 4.2x surge in order cancellations.',
  },
  {
    id: 'model',
    step: 5,
    title: 'Modeling & Math',
    icon: <Chemistry size={22} />,
    primaryRole: 'Data Scientist',
    primaryColor: 'var(--ds-blue)',
    supportingRoles: ['Statistician', 'Machine Learning Researcher'],
    whatHappens:
      'Conducts exploratory feature engineering, tests statistical significance, trains mathematical models, and validates predictive accuracy on holdout test sets.',
    typicalOutput: 'Trained model artifacts (.pkl, .onnx), feature importance rankings, cross-validation metrics.',
    tools: ['Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'Jupyter', 'Seaborn'],
    realExample:
      'Example: Training a Gradient Boosted model that predicts delivery time with ±2.1 minute Mean Absolute Error.',
  },
  {
    id: 'production',
    step: 6,
    title: 'Production Serving',
    icon: <CloudApp size={22} />,
    primaryRole: 'ML Engineer',
    primaryColor: 'var(--ds-emerald)',
    supportingRoles: ['DevOps / SRE', 'Data Engineer', 'Backend Engineers'],
    whatHappens:
      'Wraps the trained model in a high-performance REST/gRPC microservice, deploys containers across servers, monitors latency, and tracks data drift.',
    typicalOutput: 'Containerized inference API endpoint with <15ms response time, CI/CD retraining pipeline.',
    tools: ['FastAPI', 'Docker', 'Kubernetes', 'MLflow', 'Git', 'Prometheus'],
    realExample:
      'Example: Deploying the delivery ETA prediction API into production handling 40,000 checkout queries per minute.',
  },
  {
    id: 'decision',
    step: 7,
    title: 'Business Decision',
    icon: <DecisionTree size={22} />,
    primaryRole: 'Business Leadership',
    primaryColor: 'var(--ds-purple)',
    supportingRoles: ['Business Analyst', 'Product Manager', 'Operations Teams'],
    whatHappens:
      'Automated dispatch algorithms and executive leaders use predictions to dynamically allocate drivers, set realistic customer ETAs, and prevent cancellations.',
    typicalOutput: 'Improved business KPIs, reduced customer churn, higher restaurant partner retention.',
    tools: ['Operations Dispatch Hub', 'Executive KPIs', 'A/B Testing Frameworks'],
    realExample:
      'Example: Proactive dynamic buffer times reduce rainy order cancellations by 44%, saving $1.2M annually.',
  },
];

export function RolePipelineExplorer() {
  const [activeStageId, setActiveStageId] = useState<string>('problem');

  const current = pipelineStages.find((s) => s.id === activeStageId) || pipelineStages[0];

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
            Interactive Experience 2
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Role Pipeline Explorer: The Collaborative Lifecycle
          </h3>
        </div>
        <Tag type="purple" size="md">
          7-Stage Workflow
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
        Click any stage below to inspect what occurs at that milestone, who leads the effort, which roles collaborate, and the primary tools used.
      </p>

      {/* 7-Stage Horizontal / Grid Stepper */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px',
          marginBottom: '2rem',
        }}
      >
        {pipelineStages.map((stage) => {
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStageId(stage.id)}
              style={{
                padding: '12px 8px',
                background: isActive ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                border: isActive ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                color: isActive ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              <div style={{ color: isActive ? 'var(--ds-cyan)' : 'var(--ds-text-muted)' }}>
                {stage.icon}
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                STAGE 0{stage.step}
              </span>
              <span style={{ fontSize: '0.8125rem', fontWeight: isActive ? 700 : 500, textAlign: 'center', lineHeight: 1.2 }}>
                {stage.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            padding: '1.75rem',
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--ds-border-subtle)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                STAGE 0{current.step} OF 07
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
                {current.title}
              </h4>
            </div>

            {/* Primary Role Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'var(--ds-bg-surface)',
                border: '1px solid var(--ds-border-subtle)',
                borderRadius: '999px',
              }}
            >
              <User size={16} style={{ color: current.primaryColor }} />
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Primary Lead:</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: current.primaryColor }}>
                {current.primaryRole}
              </span>
            </div>
          </div>

          {/* Description & Action */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
              What Happens in this Stage:
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.55, margin: 0 }}>
              {current.whatHappens}
            </p>
          </div>

          {/* 3-Column Meta Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            {/* Supporting Roles */}
            <div
              style={{
                padding: '1rem',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '6px' }}>
                <Collaborate size={14} /> Supporting Collaborators
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.4 }}>
                {current.supportingRoles.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Typical Deliverable */}
            <div
              style={{
                padding: '1rem',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--ds-teal)', fontWeight: 600, marginBottom: '6px' }}>
                <ArrowRight size={14} /> Tangible Deliverable
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: 0, lineHeight: 1.45 }}>
                {current.typicalOutput}
              </p>
            </div>

            {/* Tools Used */}
            <div
              style={{
                padding: '1rem',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--ds-purple)', fontWeight: 600, marginBottom: '6px' }}>
                <Tools size={14} /> Primary Tools
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {current.tools.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.6875rem',
                      padding: '2px 6px',
                      background: 'var(--ds-bg-surface-elevated)',
                      border: '1px solid var(--ds-border-subtle)',
                      borderRadius: '2px',
                      color: 'var(--ds-text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Real-World Case Snippet */}
          <div
            style={{
              padding: '10px 14px',
              background: 'var(--ds-bg-surface)',
              borderLeft: `3px solid ${current.primaryColor}`,
              borderRadius: '0 4px 4px 0',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
            }}
          >
            <strong style={{ color: 'var(--ds-text-primary)' }}>Real-World Application:</strong>{' '}
            {current.realExample}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
