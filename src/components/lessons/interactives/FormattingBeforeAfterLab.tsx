'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { ArrowRight, Restart, CheckmarkFilled } from '@carbon/icons-react';

export function FormattingBeforeAfterLab() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      name: '0. Raw Ingestion',
      values: ['" Mumbai "', '"mumbai"', '"MUMBAI"', '" Mumbai"'],
      uniqueCount: 4,
      action: 'Raw data contains invisible spaces and mixed casing.',
    },
    {
      name: '1. .str.strip()',
      values: ['"Mumbai"', '"mumbai"', '"MUMBAI"', '"Mumbai"'],
      uniqueCount: 3,
      action: 'Removed all leading and trailing spaces. Reduced cardinality from 4 to 3.',
    },
    {
      name: '2. .str.title()',
      values: ['"Mumbai"', '"Mumbai"', '"Mumbai"', '"Mumbai"'],
      uniqueCount: 1,
      action: 'Capitalized first letter of each string. Collapsed all 4 records into 1 canonical class!',
    },
    {
      name: '3. Post-Validation',
      values: ['Mumbai', 'Mumbai', 'Mumbai', 'Mumbai'],
      uniqueCount: 1,
      action: 'Asserted df["city"].nunique() == 1. All 4 customer records now share identical location taxonomy.',
    },
  ];

  const active = steps[currentStep];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="green" size="md">
            Interactive Lab 2.6.8
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Split-Screen Transformation Stepper
          </span>
        </div>
        <Button
          kind="ghost"
          size="sm"
          renderIcon={Restart}
          onClick={() => setCurrentStep(0)}
        >
          Reset Pipeline
        </Button>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Before vs. After: Tracing Transformation Stage by Stage
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Step through the four transformation stages to observe how consecutive string operations collapse
        fragmented raw strings into a single canonical class.
      </p>

      {/* 4-Step Progress Indicator */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6px',
          marginBottom: '1.5rem',
        }}
      >
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx)}
            style={{
              padding: '8px 10px',
              borderRadius: '4px',
              border: currentStep === idx ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: currentStep === idx ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
              color: currentStep === idx ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              fontSize: '0.75rem',
              fontWeight: currentStep === idx ? 700 : 400,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Split-Screen Visual Comparison */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        {/* Left: Raw Initial State */}
        <div style={{ padding: '1.25rem', borderRadius: '4px', background: 'var(--ds-bg-core)', border: '1px solid var(--ds-border-subtle)' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-amber)', marginBottom: '8px' }}>
            RAW INGESTED STATE (Step 0)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {steps[0].values.map((v, i) => (
              <div key={i} style={{ padding: '6px 10px', background: 'var(--cds-layer-02)', borderRadius: '4px', fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
                Row {i + 1}: <span style={{ color: 'var(--ds-amber)' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
            Unique Categories Count: <strong style={{ color: 'var(--ds-amber)' }}>4 distinct classes</strong>
          </div>
        </div>

        {/* Right: Active Transformed State */}
        <div style={{ padding: '1.25rem', borderRadius: '4px', background: 'var(--ds-bg-core)', border: `2px solid ${currentStep === 3 ? 'var(--ds-emerald)' : 'var(--ds-cyan)'}` }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: currentStep === 3 ? 'var(--ds-emerald)' : 'var(--ds-cyan)', marginBottom: '8px' }}>
            TRANSFORMED STATE: {active.name.toUpperCase()}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {active.values.map((v, i) => (
              <div key={i} style={{ padding: '6px 10px', background: 'var(--cds-layer-02)', borderRadius: '4px', fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem' }}>
                Row {i + 1}: <span style={{ color: currentStep >= 2 ? 'var(--ds-emerald)' : 'var(--ds-cyan)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
            Unique Categories Count: <strong style={{ color: currentStep >= 2 ? 'var(--ds-emerald)' : 'var(--ds-cyan)' }}>{active.uniqueCount} class</strong>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
          {active.action}
        </span>
        {currentStep < 3 && (
          <Button
            size="sm"
            renderIcon={ArrowRight}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Advance to Next Stage
          </Button>
        )}
      </div>
    </div>
  );
}
