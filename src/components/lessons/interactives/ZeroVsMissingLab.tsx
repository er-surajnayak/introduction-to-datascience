'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  WarningAlt,
  CheckmarkFilled,
  Help,
  Information,
  Calculator,
} from '@carbon/icons-react';

interface ScenarioItem {
  id: string;
  domain: string;
  variableName: string;
  zeroMeaning: string;
  nanMeaning: string;
  zeroAvgImpact: string;
  nanAvgImpact: string;
  catastrophicError: string;
}

const scenarios: ScenarioItem[] = [
  {
    id: 'marks',
    domain: 'Academic Evaluation',
    variableName: 'Student Exam Marks (out of 100)',
    zeroMeaning: 'The student sat for the exam and scored exactly 0 points (Complete Failure).',
    nanMeaning: 'The mark is unrecorded, missing, pending grading, or student was absent with medical leave.',
    zeroAvgImpact: '[85, 90, 0] ➔ Mean = 58.3 (Drastic collapse in class average)',
    nanAvgImpact: '[85, 90, NaN] ➔ Mean = 87.5 (Reflects true average of students who wrote the exam)',
    catastrophicError:
      'Replacing NaN with 0 falsely punishes absent/hospitalized students with failing grades and distorts performance statistics.',
  },
  {
    id: 'temp',
    domain: 'IoT Meteorological Station',
    variableName: 'Ambient Temperature (°C)',
    zeroMeaning: 'The physical temperature reached 0.0°C (Freezing point of water).',
    nanMeaning: 'Sensor hardware momentarily disconnected or lost WiFi packet transmission.',
    zeroAvgImpact: '[28°C, 30°C, 0°C] ➔ Mean = 19.3°C (False arctic freeze alert!)',
    nanAvgImpact: '[28°C, 30°C, NaN] ➔ Mean = 29.0°C (Accurate tropical climate average)',
    catastrophicError:
      'Filling sensor dropouts with 0 triggers false freeze alerts in tropical weather systems and ruins climate regression models.',
  },
  {
    id: 'balance',
    domain: 'Banking & Financial Core',
    variableName: 'Savings Account Balance (₹)',
    zeroMeaning: 'The account is entirely empty with ₹0.00 funds available.',
    nanMeaning: 'The banking microservice timed out while querying the database shard.',
    zeroAvgImpact: 'Treats the account as insolvent and charges non-maintenance penalty fees.',
    nanAvgImpact: 'Flags a temporary communication retry without touching customer funds.',
    catastrophicError:
      'Conflating network database timeouts with zero balance leads to unlawful overdraft penalties and customer lawsuits.',
  },
  {
    id: 'income',
    domain: 'Credit Card Risk Modeling',
    variableName: 'Annual Applicant Income (₹)',
    zeroMeaning: 'Applicant has ₹0 income (Unemployed / Destitute).',
    nanMeaning: 'Applicant chose not to disclose their salary on an optional privacy field.',
    zeroAvgImpact: 'Instantly rejects the credit card application with high credit risk score.',
    nanAvgImpact: 'Routes application to secondary verification or imputes with occupation median.',
    catastrophicError:
      'High-net-worth individuals frequently skip optional income fields; filling with 0 rejects prime wealthy customers.',
  },
];

export function ZeroVsMissingLab() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('marks');
  const [activeTab, setActiveTab] = useState<'comparison' | 'math'>('comparison');

  const currentScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

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
          <Tag type="red" size="md">
            Interactive 01
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Missing Does NOT Mean Zero
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Semantic Distinction Lab
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Zero vs. NaN: The Fundamental Difference Between Known & Unknown
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        <strong>0</strong> is an active, known empirical measurement. <strong>NaN</strong> indicates that the value is missing, unknown, or unrecorded. Conflating the two is one of the most destructive errors in data engineering. Explore real-world domains below.
      </p>

      {/* Scenario Selector Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {scenarios.map((sc) => {
          const isSelected = sc.id === selectedScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                {sc.domain}
              </div>
              <div style={{ marginTop: '2px', fontWeight: isSelected ? 600 : 500, color: isSelected ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)' }}>
                {sc.variableName.split('(')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Comparison Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScenario.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '14px',
              marginBottom: '1.25rem',
            }}
          >
            {/* Value = 0 Box */}
            <div
              style={{
                padding: '1.25rem',
                background: 'var(--ds-bg-surface-elevated)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
                borderTop: '4px solid var(--ds-purple)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  Case A: Recorded as 0
                </span>
                <Tag type="purple" size="sm">
                  Known Measurement
                </Tag>
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '10px', lineHeight: 1.5 }}>
                {currentScenario.zeroMeaning}
              </div>

              <div
                style={{
                  padding: '8px 10px',
                  background: 'var(--ds-bg-core)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--ds-purple)',
                }}
              >
                {currentScenario.zeroAvgImpact}
              </div>
            </div>

            {/* Value = NaN Box */}
            <div
              style={{
                padding: '1.25rem',
                background: 'var(--ds-bg-surface-elevated)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
                borderTop: '4px solid var(--ds-cyan)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  Case B: Recorded as NaN
                </span>
                <Tag type="cyan" size="sm">
                  Missing / Unknown
                </Tag>
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '10px', lineHeight: 1.5 }}>
                {currentScenario.nanMeaning}
              </div>

              <div
                style={{
                  padding: '8px 10px',
                  background: 'var(--ds-bg-core)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--ds-cyan)',
                }}
              >
                {currentScenario.nanAvgImpact}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'rgba(218, 30, 40, 0.1)',
              border: '1px solid #da1e28',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <WarningAlt size={18} style={{ color: '#da1e28', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
              <strong>The Catastrophic Blind-Fill Bug:</strong> {currentScenario.catastrophicError}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
