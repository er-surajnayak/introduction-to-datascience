'use client';

import React, { useState } from 'react';
import { Tag, Button, Select, SelectItem } from '@carbon/react';
import { CheckmarkFilled } from '@carbon/icons-react';

const OBSERVATIONS = [
  'Course registrations climbed significantly over the quarter',
  'Workshop attendance dropped severely in the final month',
  'Exam marks showed a strong positive association with study hours',
];

const EVIDENCES = [
  'revenue rose from ₹120k in Jan to ₹220k in May (+83.3%)',
  'registrations fell from 240 down to 90 participants (-62.5%)',
  'Pearson correlation r = 0.94 across all 8 sampled student records',
];

const LIMITATIONS = [
  'however, correlation does not establish causation without a controlled trial',
  'however, seasonality and advertising budget changes were not factored into this model',
  'however, the sample size (N = 8) is too small to generalize to the entire university',
];

export function DataStorytellingLab() {
  const [obsIdx, setObsIdx] = useState<number>(0);
  const [evIdx, setEvIdx] = useState<number>(0);
  const [limIdx, setLimIdx] = useState<number>(0);
  const [generated, setGenerated] = useState<boolean>(false);

  const finalNarrative = `"${OBSERVATIONS[obsIdx]}; specifically, ${EVIDENCES[evIdx]}; ${LIMITATIONS[limIdx]}."`;

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">Section 3.3.22</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Data Storytelling</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Observation + Evidence + Limitation = Credible Insight
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Data Storytelling: Constructing High-Impact Analytical Insights
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        A chart is only valuable if it answers an analytical question. Weak analysis merely states &ldquo;the line goes up&rdquo;; strong analysis couples a clear observation with precise numerical evidence and domain limitations.
      </p>

      {/* Builder Selectors */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
        <div>
          <Select
            id="obs-select"
            labelText="Pillar 1: Key Qualitative Observation"
            value={obsIdx}
            size="sm"
            onChange={(e) => {
              setObsIdx(Number(e.target.value));
              setGenerated(false);
            }}
          >
            {OBSERVATIONS.map((o, idx) => (
              <SelectItem key={idx} value={idx} text={o} />
            ))}
          </Select>
        </div>

        <div>
          <Select
            id="ev-select"
            labelText="Pillar 2: Supporting Quantitative Evidence (Numbers/Metrics)"
            value={evIdx}
            size="sm"
            onChange={(e) => {
              setEvIdx(Number(e.target.value));
              setGenerated(false);
            }}
          >
            {EVIDENCES.map((eText, idx) => (
              <SelectItem key={idx} value={idx} text={eText} />
            ))}
          </Select>
        </div>

        <div>
          <Select
            id="lim-select"
            labelText="Pillar 3: Analytical Limitation & Confounding Caution"
            value={limIdx}
            size="sm"
            onChange={(e) => {
              setLimIdx(Number(e.target.value));
              setGenerated(false);
            }}
          >
            {LIMITATIONS.map((l, idx) => (
              <SelectItem key={idx} value={idx} text={l} />
            ))}
          </Select>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <Button kind="primary" size="md" onClick={() => setGenerated(true)} renderIcon={CheckmarkFilled}>
          Generate Executive Insight Narrative
        </Button>
      </div>

      {/* Generated Insight Box */}
      {generated && (
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            borderLeft: '4px solid var(--ds-emerald)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '6px' }}>
            Executive-Ready Analytical Story:
          </div>
          <div style={{ fontSize: '1.0625rem', color: 'var(--ds-text-primary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '8px' }}>
            {finalNarrative}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Notice the structure: A non-technical stakeholder immediately grasps the headline pattern, validates the underlying math, and understands the boundaries of the conclusion.
          </div>
        </div>
      )}
    </div>
  );
}
