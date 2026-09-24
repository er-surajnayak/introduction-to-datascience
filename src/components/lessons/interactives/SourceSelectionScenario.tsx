'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  CheckmarkFilled,
  ErrorFilled,
  Help,
  ArrowRight,
  DataBase,
  Education,
  Restaurant,
  Restart,
} from '@carbon/icons-react';

interface ScenarioQuestion {
  id: number;
  domain: string;
  icon: React.ComponentType<any>;
  title: string;
  problemStatement: string;
  options: {
    letter: string;
    sourceName: string;
    description: string;
    isPrimaryBest: boolean;
    isComplementaryBest?: boolean;
    feedback: string;
  }[];
  multiSourceTakeaway: string;
}

const scenarios: ScenarioQuestion[] = [
  {
    id: 1,
    domain: 'Education Analytics',
    icon: Education,
    title: 'Case 1: Building a College Attendance Analytics System',
    problemStatement:
      'The Dean of Engineering wants an automated diagnostic system to monitor lecture attendance rates, identify chronic absenteeism, and generate automated alerts for students at risk of falling below the 75% examination threshold.',
    options: [
      {
        letter: 'A',
        sourceName: 'Student Self-Reported Survey',
        description: 'Distribute a weekly Google Form asking students: "How many classes did you attend this week?"',
        isPrimaryBest: false,
        feedback:
          'Incorrect as a primary source. Self-reported attendance suffers from extreme recall bias and dishonesty (students rarely admit skipping lectures).',
      },
      {
        letter: 'B',
        sourceName: 'College RFID / Biometric Attendance Database',
        description: 'Direct SQL query against the campus biometric scanner and classroom RFID sensor logs.',
        isPrimaryBest: true,
        feedback:
          'Optimal Primary Source! The institutional attendance database provides objective, verified, high-frequency timestamped records directly capturing the physical phenomenon.',
      },
      {
        letter: 'C',
        sourceName: 'Random Social Media Comments',
        description: 'Scrape tweets and Instagram comments with the campus hashtag.',
        isPrimaryBest: false,
        feedback:
          'Irrelevant. Social media noise cannot provide reliable individual attendance records for compliance tracking.',
      },
      {
        letter: 'D',
        sourceName: 'City Meteorological Weather API',
        description: 'Fetch historical daily rainfall and temperature records for the campus locality.',
        isPrimaryBest: false,
        isComplementaryBest: true,
        feedback:
          'Not a primary attendance source, BUT it is a brilliant complementary secondary source! Correlating attendance drops with severe monsoon rain days reveals whether absenteeism is weather-driven.',
      },
    ],
    multiSourceTakeaway:
      'Multi-Source Synergy: The Attendance Database (Primary Source) provides the ground-truth outcome, while the Weather API (Secondary Complementary Source) provides external contextual features explaining sudden attendance anomalies.',
  },
  {
    id: 2,
    domain: 'Hospitality & Operations',
    icon: Restaurant,
    title: 'Case 2: Campus Cafeteria Sentiment & Queue Optimization',
    problemStatement:
      'Students are complaining about long lunch queues and declining food satisfaction in the central campus cafeteria. The management committee wants to identify root causes and optimize meal prep schedules.',
    options: [
      {
        letter: 'A',
        sourceName: 'Structured Student Satisfaction Survey',
        description: 'Administer a 5-point Likert scale survey on meal taste, pricing, portion size, and perceived wait times.',
        isPrimaryBest: true,
        feedback:
          'Optimal for Qualitative Sentiment! Directly measures how students perceive food quality and service satisfaction.',
      },
      {
        letter: 'B',
        sourceName: 'Local Weather API',
        description: 'Retrieve real-time ambient heat and rain forecasts.',
        isPrimaryBest: false,
        feedback:
          'Only a minor environmental context; does not measure student sentiment or kitchen bottleneck causes.',
      },
      {
        letter: 'C',
        sourceName: 'Cafeteria POS Cash Register Transaction Stream',
        description: 'Live transactional log of order timestamps, dish item IDs, billing durations, and payment methods.',
        isPrimaryBest: false,
        isComplementaryBest: true,
        feedback:
          'Exceptional Complementary Source! Combining transaction timestamps with surveys reveals the exact minutes when queue spikes occur (e.g., 1:05 PM rush vs 1:35 PM lull).',
      },
      {
        letter: 'D',
        sourceName: 'Random YouTube Cooking Video Comments',
        description: 'Scrape comments from viral Indian street food recipe channels.',
        isPrimaryBest: false,
        feedback:
          'Completely ungrounded and irrelevant to the specific operational reality of your campus kitchen.',
      },
    ],
    multiSourceTakeaway:
      'Multi-Source Synergy: Surveys (Primary Qualitative Data) capture human frustration and taste ratings, while POS Transaction Logs (Primary Quantitative Telemetry) capture exact physical queue throughput and peak-hour timestamps.',
  },
];

export function SourceSelectionScenario() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showComplementary, setShowComplementary] = useState(false);

  const scenario = scenarios[activeScenarioIndex];
  const selectedOption = scenario.options.find((o) => o.letter === selectedLetter);

  const handleNext = () => {
    if (activeScenarioIndex < scenarios.length - 1) {
      setActiveScenarioIndex((prev) => prev + 1);
      setSelectedLetter(null);
      setShowComplementary(false);
    }
  };

  const handlePrev = () => {
    if (activeScenarioIndex > 0) {
      setActiveScenarioIndex((prev) => prev - 1);
      setSelectedLetter(null);
      setShowComplementary(false);
    }
  };

  const handleReset = () => {
    setSelectedLetter(null);
    setShowComplementary(false);
  };

  const IconComp = scenario.icon;

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
          <Tag type="green" size="md">
            Interactive 07
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Source Selection Scenario Lab
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
            Scenario {activeScenarioIndex + 1} of {scenarios.length}
          </span>
          <Button kind="ghost" size="sm" renderIcon={Restart} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Which Data Source Would You Choose?
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Data Science is not about grabbing the first available CSV file. It is about aligning your data source directly with the empirical phenomenon you want to measure. Solve the scenario below.
      </p>

      {/* Problem Scenario Box */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <IconComp size={18} style={{ color: 'var(--ds-cyan)' }} />
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            {scenario.domain}
          </span>
        </div>
        <div style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '6px' }}>
          {scenario.title}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
          {scenario.problemStatement}
        </div>
      </div>

      {/* Options Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
          Question: Which candidate source is most directly relevant as your primary ground-truth data feed?
        </div>

        {scenario.options.map((opt) => {
          const isSelected = selectedLetter === opt.letter;
          return (
            <button
              key={opt.letter}
              onClick={() => {
                setSelectedLetter(opt.letter);
                setShowComplementary(false);
              }}
              style={{
                padding: '1rem',
                borderRadius: '4px',
                border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface)',
                color: 'var(--ds-text-primary)',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                transition: 'all 0.15s ease',
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isSelected ? 'var(--ds-cyan)' : 'var(--ds-bg-surface-elevated)',
                  color: isSelected ? '#161616' : 'var(--ds-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {opt.letter}
              </span>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '2px' }}>
                  {opt.sourceName}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
                  {opt.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Panel */}
      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              padding: '1.25rem',
              borderRadius: '4px',
              border: selectedOption.isPrimaryBest ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-amber)',
              background: selectedOption.isPrimaryBest ? 'var(--ds-emerald-dim)' : 'rgba(241, 194, 27, 0.1)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              {selectedOption.isPrimaryBest ? (
                <>
                  <CheckmarkFilled size={18} style={{ color: 'var(--ds-emerald)' }} />
                  <span style={{ fontWeight: 600, color: 'var(--ds-emerald)', fontSize: '0.9375rem' }}>
                    Correct Primary Source Selection!
                  </span>
                </>
              ) : (
                <>
                  <Help size={18} style={{ color: 'var(--ds-amber)' }} />
                  <span style={{ fontWeight: 600, color: 'var(--ds-amber)', fontSize: '0.9375rem' }}>
                    Suboptimal Primary Source
                  </span>
                </>
              )}
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
              {selectedOption.feedback}
            </div>

            {selectedOption.isPrimaryBest && (
              <div style={{ marginTop: '12px' }}>
                <Button size="sm" kind="tertiary" onClick={() => setShowComplementary(true)}>
                  Explore Multi-Source Synergy
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multi-Source Synergy Expansion */}
      <AnimatePresence>
        {showComplementary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              padding: '1.25rem',
              background: 'var(--ds-bg-surface-elevated)',
              border: '1px solid var(--ds-cyan)',
              borderRadius: '4px',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Advanced Engineering Insight
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.6 }}>
              {scenario.multiSourceTakeaway}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stepper Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button size="md" kind="secondary" disabled={activeScenarioIndex === 0} onClick={handlePrev}>
          Previous Scenario
        </Button>
        <Button size="md" kind="primary" renderIcon={ArrowRight} disabled={activeScenarioIndex === scenarios.length - 1} onClick={handleNext}>
          Next Scenario
        </Button>
      </div>
    </div>
  );
}
