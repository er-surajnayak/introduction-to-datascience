'use client';

import React, { useState } from 'react';
import { Tag, Accordion, AccordionItem } from '@carbon/react';
import { CheckmarkFilled, ListChecked } from '@carbon/icons-react';

interface ChecklistItem {
  id: number;
  title: string;
  question: string;
  auditAction: string;
  practicalExample: string;
}

const checklistData: ChecklistItem[] = [
  {
    id: 1,
    title: '1. Check the Ingestion Data Source',
    question: 'Where did this anomalous number originate?',
    auditAction: 'Inspect upstream API endpoints, scraper logs, or database connectors to confirm data was not corrupted during transmission.',
    practicalExample: 'Example: An API returning JSON price strings like `"price": "1,500.00"` where commas were stripped incorrectly, turning ₹1,500 into ₹150,000.',
  },
  {
    id: 2,
    title: '2. Check Units, Currency & Scale Conversions',
    question: 'Are all observations measured in the same physical unit?',
    auditAction: 'Verify that kilograms and pounds, Celsius and Fahrenheit, or USD and INR were not merged into a single column without normalization.',
    practicalExample: 'Example: A hospital weight column containing both 70 (kg) and 154 (lbs) for two adults of identical physical size.',
  },
  {
    id: 3,
    title: '3. Check Human Data-Entry & Typographical Clerical Errors',
    question: 'Did a human operator mistype a decimal point or add an extra zero?',
    auditAction: 'Look for common numerical keying patterns: typing `1500` instead of `15.00`, or accidentally entering `100` instead of `10`.',
    practicalExample: 'Example: A student mark sheet recording 850 marks instead of 85.0 on a 100-mark mid-term exam.',
  },
  {
    id: 4,
    title: '4. Check Physical Measurement & Sensor Hardware Constraints',
    question: 'Is the observation physically possible in the natural world?',
    auditAction: 'Establish physical domain limits (e.g. human body temperature must reside between 34°C and 43°C; heart rate between 30 and 220 bpm).',
    practicalExample: 'Example: A weather station thermocouple in Mumbai reporting -150°C during an electrical brownout.',
  },
  {
    id: 5,
    title: '5. Cross-Examine Correlated Variables (Multivariate Check)',
    question: 'Does this observation contradict other columns in the same row?',
    auditAction: 'Run multi-feature relational arithmetic tests across dependent columns to catch impossible feature pairs.',
    practicalExample: 'Example: A patient with Height = 190 cm and Weight = 20 kg (impossible adult combination).',
  },
  {
    id: 6,
    title: '6. Contextualize Geography, Seasonality & External Events',
    question: 'Did a major real-world holiday, crisis, or event occur at this timestamp?',
    auditAction: 'Cross-reference anomalous transaction surges with external real-world calendars (Diwali, Black Friday, cricket World Cup final, natural disaster).',
    practicalExample: 'Example: An ecommerce platform experiencing a 50× revenue spike on midnight of Diwali eve.',
  },
  {
    id: 7,
    title: '7. Decide Empirical Validity: Error vs. Valid Extreme',
    question: 'Is this value a verified real-world phenomenon or a corrupted artifact?',
    auditAction: 'Classify into: [A] Provably Corrupted Data (Error) or [B] Legitimate Rare Event (Signal).',
    practicalExample: 'Example: An ultra-high-net-worth billionaire customer buying 1,000 units is a 100% legitimate B2B event.',
  },
  {
    id: 8,
    title: '8. Select the Context-Aware Remediation Strategy',
    question: 'Which of the 5 treatments (Keep, Correct, Remove, Cap, Transform) fits best?',
    auditAction: 'Choose treatment based on downstream machine learning sensitivity and whether the observation is valid or defective.',
    practicalExample: 'Example: Keep for random forest tree models, Cap (Winsorize) for linear regression gradient stability.',
  },
  {
    id: 9,
    title: '9. Validate Post-Cleaning Distributions & Data Provenance',
    question: 'Did our cleaning operation introduce unintended statistical side effects?',
    auditAction: 'Verify sample size loss percentage (keep &lt; 3-5%), check that distribution variance was not crushed, and document all changes in data dictionary.',
    practicalExample: 'Example: Asserting `df.shape[0]` retained 98.5% of rows and plotting before/after histograms.',
  },
];

export function OutlierInvestigationChecklist() {
  const [completedItems, setCompletedItems] = useState<number[]>([1, 2]);

  const toggleItem = (id: number) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter((i) => i !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
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
          <Tag type="green" size="md">
            Interactive Lab 2.5.10
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            The 9-Step Industry Investigation Protocol
          </span>
        </div>
        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)' }}>
          {completedItems.length} / 9 Audited
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Outlier Investigation Checklist: The Professional Audit
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Never delete or modify an outlier without walking through this structured 9-point forensic checklist.
        Click on each audit stage to reveal the forensic questions and real-world examples.
      </p>

      {/* Accordion List */}
      <Accordion>
        {checklistData.map((item) => {
          const isDone = completedItems.includes(item.id);
          return (
            <AccordionItem
              key={item.id}
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, color: isDone ? 'var(--ds-emerald)' : 'var(--ds-text-primary)' }}>
                    {item.title}
                  </span>
                  {isDone && <CheckmarkFilled size={14} style={{ color: 'var(--ds-emerald)' }} />}
                </div>
              }
            >
              <div style={{ padding: '0.5rem 0', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ds-text-secondary)' }}>
                <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px' }}>
                  Primary Question: &ldquo;{item.question}&rdquo;
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Audit Procedure:</strong> {item.auditAction}
                </div>
                <div style={{ padding: '8px 12px', background: 'var(--cds-layer-02)', borderRadius: '4px', borderLeft: '3px solid var(--ds-border-strong)', fontSize: '0.8125rem' }}>
                  {item.practicalExample}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <button
                    onClick={() => toggleItem(item.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '3px',
                      border: '1px solid var(--ds-border-subtle)',
                      background: isDone ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-core)',
                      color: isDone ? 'var(--ds-emerald)' : 'var(--ds-text-primary)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    {isDone ? '✓ Stage Marked as Audited' : 'Mark Stage as Audited'}
                  </button>
                </div>
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
