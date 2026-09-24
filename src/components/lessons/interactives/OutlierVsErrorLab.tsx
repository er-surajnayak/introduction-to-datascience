'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { CheckmarkFilled, WarningAlt, ArrowRight, Restart } from '@carbon/icons-react';

interface Scenario {
  id: string;
  title: string;
  domain: string;
  dataPoints: string[];
  anomalousValue: string;
  typicalRange: string;
  physicalLimit: string;
  investigationOutcome: 'error' | 'valid_signal' | 'b2b_bulk';
  diagnosis: string;
  correctAction: 'correct' | 'keep' | 'investigate';
  actionExplanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 'temp',
    title: '1. Urban Temperature Sensor (Mumbai)',
    domain: 'IoT Sensor Telemetry',
    dataPoints: ['27°C', '28°C', '29°C', '28°C', '30°C', '-150°C'],
    anomalousValue: '-150°C',
    typicalRange: '26°C to 34°C',
    physicalLimit: 'Lowest recorded temp on Earth is -89.2°C (Antarctica). -150°C is physically impossible.',
    investigationOutcome: 'error',
    diagnosis: 'Hardware Failure / Sentinel Bug: The digital thermocouple experienced a voltage short, transmitting standard fallback code -150 to indicate sensor malfunction.',
    correctAction: 'correct',
    actionExplanation: 'Correct or convert to NaN: This is an empirical impossibility. Treat as a missing sensor dropout, NOT a real meteorological event.',
  },
  {
    id: 'real_estate',
    title: '2. Apartment Sales (Bandra West, Mumbai)',
    domain: 'Real Estate Valuation',
    dataPoints: ['₹50 Lakh', '₹55 Lakh', '₹52 Lakh', '₹58 Lakh', '₹3.5 Crore'],
    anomalousValue: '₹3.5 Crore',
    typicalRange: '₹45 Lakh to ₹65 Lakh (1BHK / 2BHK)',
    physicalLimit: 'Luxury duplexes and penthouses in Bandra regularly sell between ₹3 Cr and ₹20 Cr.',
    investigationOutcome: 'valid_signal',
    diagnosis: 'Genuine Luxury Property: Cross-referencing property registry shows unit #402 is a 4,500 sq ft sea-facing penthouse in a luxury tower.',
    correctAction: 'keep',
    actionExplanation: 'Keep / Segment: The value is 100% genuine. Deleting it blinds your model to high-end real estate. Consider segmenting by property tier.',
  },
  {
    id: 'ecommerce',
    title: '3. E-Commerce Retail Basket Size',
    domain: 'Online Shopping Portal',
    dataPoints: ['₹450', '₹600', '₹520', '₹490', '₹580', '₹4,50,000'],
    anomalousValue: '₹4,50,000',
    typicalRange: '₹300 to ₹1,200',
    physicalLimit: 'B2B corporate clients purchasing corporate festival gifts in bulk.',
    investigationOutcome: 'b2b_bulk',
    diagnosis: 'Corporate Bulk Purchase: The buyer is a verified IT company ordering 500 smartwatches for Diwali employee rewards.',
    correctAction: 'keep',
    actionExplanation: 'Keep & Flag B2B: Retain transaction, but tag with a `is_corporate_bulk=True` feature flag so retail basket models are not skewed.',
  },
];

export function OutlierVsErrorLab() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('temp');
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [userDecision, setUserDecision] = useState<string | null>(null);

  const currentScenario = scenarios.find((s) => s.id === activeScenarioId)!;

  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    setActiveStep(1);
    setUserDecision(null);
  };

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
          <Tag type="cyan" size="md">
            Interactive Lab 2.5.2
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Mental Model: Detect ➔ Investigate ➔ Decide
          </span>
        </div>
        <Button
          kind="ghost"
          size="sm"
          renderIcon={Restart}
          onClick={() => {
            setActiveStep(1);
            setUserDecision(null);
          }}
        >
          Reset Workflow
        </Button>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Outlier vs. Error: Context-Driven Investigation
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Never equate mathematical extremity with data corruption. Step through these three realistic scenarios
        to experience how domain context transforms the appropriate engineering decision.
      </p>

      {/* Scenario Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {scenarios.map((sc) => {
          const isSelected = sc.id === activeScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(sc.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '4px',
                border: isSelected ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
                color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {sc.title}
            </button>
          );
        })}
      </div>

      {/* 3-Step Guided Investigation Stepper */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {[
          { step: 1, label: '1. Spot Anomaly' },
          { step: 2, label: '2. Audit Context' },
          { step: 3, label: '3. Formulate Action' },
        ].map((s) => (
          <div
            key={s.step}
            style={{
              padding: '10px 12px',
              borderRadius: '4px',
              background: activeStep >= s.step ? 'var(--cds-layer-02)' : 'var(--ds-bg-core)',
              borderTop: `3px solid ${activeStep === s.step ? 'var(--ds-cyan)' : activeStep > s.step ? 'var(--ds-emerald)' : 'var(--ds-border-subtle)'}`,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: activeStep === s.step ? 600 : 400,
                color: activeStep === s.step ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        {activeStep === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Tag type="purple" size="md">{currentScenario.domain}</Tag>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Raw Ingested Records</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {currentScenario.dataPoints.map((dp, idx) => {
                const isOutlier = dp === currentScenario.anomalousValue;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '4px',
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '1rem',
                      fontWeight: isOutlier ? 700 : 500,
                      background: isOutlier ? 'rgba(255, 131, 43, 0.15)' : 'var(--ds-bg-core)',
                      border: isOutlier ? '2px solid var(--ds-amber)' : '1px solid var(--ds-border-subtle)',
                      color: isOutlier ? 'var(--ds-amber)' : 'var(--ds-text-primary)',
                    }}
                  >
                    {dp}
                    {isOutlier && <span style={{ fontSize: '0.6875rem', marginLeft: '6px' }}>⚡ Outlier</span>}
                  </div>
                );
              })}
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Typical cluster range: <strong>{currentScenario.typicalRange}</strong>. Value <strong>{currentScenario.anomalousValue}</strong> deviates wildly.
            </p>

            <Button
              size="sm"
              renderIcon={ArrowRight}
              onClick={() => setActiveStep(2)}
            >
              Proceed to Domain Audit (Step 2)
            </Button>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Tag type="cyan" size="md">Physical & Domain Constraints</Tag>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Cross-Feature Forensic Investigation</span>
            </div>

            <div
              style={{
                padding: '1rem',
                borderRadius: '4px',
                background: 'var(--ds-bg-core)',
                borderLeft: '4px solid var(--ds-cyan)',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: 'var(--ds-text-primary)',
                lineHeight: 1.6,
              }}
            >
              <div><strong>Domain Feasibility:</strong> {currentScenario.physicalLimit}</div>
              <div style={{ marginTop: '8px' }}><strong>Investigator Findings:</strong> {currentScenario.diagnosis}</div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                Based on this audit, what should you do with {currentScenario.anomalousValue}?
              </span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                <Button
                  size="sm"
                  kind={userDecision === 'keep' ? 'primary' : 'tertiary'}
                  onClick={() => {
                    setUserDecision('keep');
                    setActiveStep(3);
                  }}
                >
                  Keep Observation
                </Button>
                <Button
                  size="sm"
                  kind={userDecision === 'correct' ? 'primary' : 'tertiary'}
                  onClick={() => {
                    setUserDecision('correct');
                    setActiveStep(3);
                  }}
                >
                  Correct / Convert to NaN
                </Button>
                <Button
                  size="sm"
                  kind={userDecision === 'delete' ? 'primary' : 'tertiary'}
                  onClick={() => {
                    setUserDecision('delete');
                    setActiveStep(3);
                  }}
                >
                  Delete Row Blindly
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Tag type={userDecision === currentScenario.correctAction ? 'green' : 'red'} size="md">
                {userDecision === currentScenario.correctAction ? 'Optimal Decision' : 'Sub-Optimal Decision'}
              </Tag>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Architectural Decision Rationale</span>
            </div>

            <div
              style={{
                padding: '1rem',
                borderRadius: '4px',
                background: 'var(--ds-bg-core)',
                borderLeft: `4px solid ${userDecision === currentScenario.correctAction ? 'var(--ds-emerald)' : 'var(--ds-amber)'}`,
                marginBottom: '1rem',
                lineHeight: 1.6,
                fontSize: '0.875rem',
                color: 'var(--ds-text-secondary)',
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
                Recommended Engineering Strategy:
              </div>
              {currentScenario.actionExplanation}
            </div>

            <Button
              size="sm"
              kind="secondary"
              onClick={() => {
                setActiveStep(1);
                setUserDecision(null);
              }}
            >
              Re-Investigate This Scenario
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
