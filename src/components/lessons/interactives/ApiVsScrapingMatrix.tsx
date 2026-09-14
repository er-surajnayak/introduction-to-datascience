'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  CheckmarkOutline,
  CloseOutline,
  CloudMonitoring,
  Code,
  ArrowRight,
  Information,
} from '@carbon/icons-react';

interface DecisionScenario {
  id: number;
  prompt: string;
  context: string;
  recommended: 'API' | 'Scraping';
  rationale: string;
}

const scenarios: DecisionScenario[] = [
  {
    id: 1,
    prompt: 'You need hourly temperature readings from 100 cities worldwide.',
    context: 'The OpenWeather service provides an official free-tier developer plan with documented endpoints and JSON outputs.',
    recommended: 'API',
    rationale: 'An official API guarantees structured, machine-readable JSON data with guaranteed uptime and a clear usage contract.',
  },
  {
    id: 2,
    prompt: 'You are researching the history of vintage computer hardware from an enthusiast blog created in 2004.',
    context: 'The website has no developer portal, no REST endpoints, and only raw HTML blog posts.',
    recommended: 'Scraping',
    rationale: 'When no programmatic API exists, parsing raw HTML with ethical web scraping is the only way to extract structured text.',
  },
  {
    id: 3,
    prompt: 'You are analyzing financial market indices for an automated algorithmic trading model.',
    context: 'The stock exchange requires millisecond precision and provides a FIX/REST WebSocket feed with developer tokens.',
    recommended: 'API',
    rationale: 'Financial algorithms cannot risk website layout changes breaking their regex or CSS selectors. A contract-backed API is mandatory.',
  },
  {
    id: 4,
    prompt: 'You want to collect consumer sentiment on product reviews from 15 independent retail blogs that lack developer portals.',
    context: 'None of the retail sites offer APIs, but their public product review pages are accessible over HTTP.',
    recommended: 'Scraping',
    rationale: 'Scraping is necessary when data is publicly visible on web pages but no official programmatic gateway is provided.',
  },
];

export function ApiVsScrapingMatrix() {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<'API' | 'Scraping' | null>(null);

  const scenario = scenarios[selectedScenarioIdx];

  const handleSelectScenario = (idx: number) => {
    setSelectedScenarioIdx(idx);
    setUserChoice(null);
  };

  const isAnswered = userChoice !== null;
  const isCorrect = userChoice === scenario.recommended;

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
      {/* Header */}
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
            Interactive Experience 7
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            API vs. Web Scraping: Strategic Decision Matrix
          </h3>
        </div>
        <Tag type="teal" size="md">
          Architectural Strategy
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Before writing data ingestion code, a Data Scientist must decide: <em>Can I use an official API, or must I scrape the web?</em> Test your decision instincts across 4 real-world data collection challenges:
      </p>

      {/* Scenario Selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => handleSelectScenario(idx)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              border: selectedScenarioIdx === idx ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: selectedScenarioIdx === idx ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-01)',
              color: selectedScenarioIdx === idx ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: 600,
              transition: 'all 0.15s ease',
            }}
          >
            Scenario 0{sc.id}
          </button>
        ))}
      </div>

      {/* Active Challenge Box */}
      <div
        style={{
          background: 'var(--cds-layer-01)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
          {scenario.prompt}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>
          {scenario.context}
        </p>

        {/* Choice Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <Button
            kind={userChoice === 'API' ? 'primary' : 'secondary'}
            size="md"
            renderIcon={CloudMonitoring}
            onClick={() => setUserChoice('API')}
            disabled={isAnswered}
          >
            Prefer Official API
          </Button>
          <Button
            kind={userChoice === 'Scraping' ? 'primary' : 'secondary'}
            size="md"
            renderIcon={Code}
            onClick={() => setUserChoice('Scraping')}
            disabled={isAnswered}
          >
            Use Web Scraping
          </Button>
        </div>

        {/* Feedback Rationale */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '1rem',
              borderRadius: '4px',
              background: isCorrect ? 'var(--ds-emerald-dim, rgba(66, 190, 101, 0.15))' : 'rgba(250, 77, 86, 0.12)',
              borderLeft: `4px solid ${isCorrect ? 'var(--ds-emerald)' : '#fa4d56'}`,
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: isCorrect ? 'var(--ds-emerald)' : '#fa4d56', marginBottom: '4px' }}>
              {isCorrect ? 'Correct Decision!' : `Recommended Choice: ${scenario.recommended}`}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', margin: 0, lineHeight: 1.5 }}>
              {scenario.rationale}
            </p>
          </motion.div>
        )}
      </div>

      {/* Strategic Summary Table */}
      <div
        style={{
          background: 'var(--cds-layer-01)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ background: 'var(--cds-layer-02)', borderBottom: '1px solid var(--ds-border-subtle)' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--ds-text-secondary)', fontWeight: 600 }}>Feature</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--ds-cyan)', fontWeight: 600 }}>REST API</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#ff832b', fontWeight: 600 }}>Web Scraping (Topic 2.2)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Data Format</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Clean, structured JSON or XML</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Unstructured HTML tags and text</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Fragility</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Stable (versioned contracts like /v1/)</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Fragile (breaks on HTML/CSS redesigns)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Intent & Legal</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Explicitly engineered for programmatic queries</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-text-secondary)' }}>Governed by robots.txt and website terms</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Golden Rule</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--ds-cyan)', fontWeight: 600 }}>Always use an API when one is available</td>
              <td style={{ padding: '0.75rem 1rem', color: '#ff832b', fontWeight: 600 }}>Use when data has no programmatic API</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
