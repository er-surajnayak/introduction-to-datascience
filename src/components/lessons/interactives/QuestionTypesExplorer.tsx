'use client';

import React, { useState } from 'react';
import { Tag } from '@carbon/react';
import { Analytics, Chemistry, ChartLineSmooth, DecisionTree } from '@carbon/icons-react';

type QuestionType = 'descriptive' | 'diagnostic' | 'predictive' | 'prescriptive';
type DomainKey = 'ecommerce' | 'cricket' | 'healthcare' | 'college' | 'aviation';

export function QuestionTypesExplorer() {
  const [selectedType, setSelectedType] = useState<QuestionType>('descriptive');
  const [selectedDomain, setSelectedDomain] = useState<DomainKey>('college');

  const domainMatrix: Record<
    DomainKey,
    {
      name: string;
      descriptive: { q: string; ex: string; output: string };
      diagnostic: { q: string; ex: string; output: string };
      predictive: { q: string; ex: string; output: string };
      prescriptive: { q: string; ex: string; output: string };
    }
  > = {
    college: {
      name: 'College Campus Placements',
      descriptive: {
        q: 'What happened?',
        ex: '72% of final-year engineering students cleared campus placement offers this year.',
        output: 'Summary Table & Histogram of CGPA distributions.',
      },
      diagnostic: {
        q: 'Why did it happen?',
        ex: 'Because students who completed at least 3 DSA capstone projects had a 94% interview pass rate versus 31% for those with 0 projects.',
        output: 'Correlation matrix & ANOVA statistical test (p < 0.001).',
      },
      predictive: {
        q: 'What might happen next?',
        ex: 'Based on current 3rd-year project submissions, the upcoming batch is projected to achieve an 82% placement rate.',
        output: 'Linear Regression model & probability forecast.',
      },
      prescriptive: {
        q: 'What should we do?',
        ex: 'Make DSA hands-on capstone projects a mandatory credit in Semester 5 and allocate senior peer mentors for struggling students.',
        output: 'Automated curriculum policy & intervention schedule.',
      },
    },
    ecommerce: {
      name: 'E-Commerce Retail (Amazon / Flipkart)',
      descriptive: {
        q: 'What happened?',
        ex: 'Festival sale revenue increased by 24% compared to last year.',
        output: 'Revenue dashboards & daily order volume line charts.',
      },
      diagnostic: {
        q: 'Why did it happen?',
        ex: 'Because mobile app users in Tier-2 cities surged by 45% due to regional language search support.',
        output: 'Cohort breakdown & demographic segmentation.',
      },
      predictive: {
        q: 'What might happen next?',
        ex: 'Smartphone inventory in Bengaluru warehouses is forecasted to stock out in 3.5 days.',
        output: 'Time-series demand forecast with 95% confidence intervals.',
      },
      prescriptive: {
        q: 'What should we do?',
        ex: 'Automatically re-route 15,000 smartphone units from Hyderabad distribution centers and adjust dynamic pricing.',
        output: 'Automated warehouse replenishment trigger.',
      },
    },
    cricket: {
      name: 'Cricket Analytics (IPL & T20)',
      descriptive: {
        q: 'What happened?',
        ex: 'Team scored an average of 48 runs in the 6-over Powerplay across 14 matches.',
        output: 'Run-rate wagon wheels and pitch heatmaps.',
      },
      diagnostic: {
        q: 'Why did it happen?',
        ex: 'Because opening batsmen struggled against left-arm pace bowlers swinging the ball into the right-hander.',
        output: 'Ball-by-ball swing telemetry & wicket breakdown.',
      },
      predictive: {
        q: 'What might happen next?',
        ex: 'If the team loses 2 wickets in the first 4 overs, win probability drops to 22%.',
        output: 'Live Win Probability Estimator (DLS-style predictive model).',
      },
      prescriptive: {
        q: 'What should we do?',
        ex: 'Promote a left-handed pinch hitter to the opening slot when facing left-arm swing attacks.',
        output: 'Tactical batting order recommendation.',
      },
    },
    healthcare: {
      name: 'Hospital Patient Care',
      descriptive: {
        q: 'What happened?',
        ex: 'Emergency room waiting time averaged 42 minutes over the winter quarter.',
        output: 'Patient intake logs & triage queue statistics.',
      },
      diagnostic: {
        q: 'Why did it happen?',
        ex: 'Because peak respiratory virus admissions coincided with a shortage of nursing staff on weekend evenings.',
        output: 'Queue bottleneck analysis & staffing shift correlation.',
      },
      predictive: {
        q: 'What might happen next?',
        ex: 'Flu patient admissions are projected to double next week as temperatures drop below 10°C.',
        output: 'Epidemiological time-series infection forecast.',
      },
      prescriptive: {
        q: 'What should we do?',
        ex: 'Pre-schedule 6 additional triage nurses for Friday-Sunday shifts and reserve 20 extra oxygen beds.',
        output: 'Dynamic hospital staffing roster allocation.',
      },
    },
    aviation: {
      name: 'Aviation & Jet Engine Maintenance',
      descriptive: {
        q: 'What happened?',
        ex: 'Engine vibration on Flight 402 spiked to 1.8 mm/s during cruise altitude.',
        output: 'Telemetry logs from 400 flight hours.',
      },
      diagnostic: {
        q: 'Why did it happen?',
        ex: 'Because high-altitude dust particle ingestion caused micro-erosion on turbine blade #4.',
        output: 'Frequency spectrum FFT analysis & harmonic drift.',
      },
      predictive: {
        q: 'What might happen next?',
        ex: 'Turbine blade failure probability reaches 88% within the next 45 flight hours.',
        output: 'Remaining Useful Life (RUL) regression curve.',
      },
      prescriptive: {
        q: 'What should we do?',
        ex: 'Schedule aircraft for immediate ultrasonic blade inspection at the next scheduled layover in Frankfurt.',
        output: 'Automated predictive maintenance work order.',
      },
    },
  };

  const typeDetails: Record<
    QuestionType,
    { title: string; subtitle: string; icon: React.ReactNode; tagType: 'cool-gray' | 'purple' | 'cyan' | 'green' }
  > = {
    descriptive: {
      title: 'Descriptive Analytics',
      subtitle: 'What happened in the past?',
      icon: <Analytics size={20} />,
      tagType: 'cool-gray',
    },
    diagnostic: {
      title: 'Diagnostic Analytics',
      subtitle: 'Why did it happen?',
      icon: <Chemistry size={20} />,
      tagType: 'purple',
    },
    predictive: {
      title: 'Predictive Analytics',
      subtitle: 'What is likely to happen next?',
      icon: <ChartLineSmooth size={20} />,
      tagType: 'cyan',
    },
    prescriptive: {
      title: 'Prescriptive Analytics',
      subtitle: 'What is the optimal action to take?',
      icon: <DecisionTree size={20} />,
      tagType: 'green',
    },
  };

  const currentType = typeDetails[selectedType];
  const currentData = domainMatrix[selectedDomain][selectedType];

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Experience 3
          </span>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            The 4 Types of Data Science Questions
          </h3>
        </div>
        <Tag type="teal" size="md">Analytics Hierarchy</Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Data Science questions evolve from looking backward (Descriptive) to understanding root causes (Diagnostic), forecasting future trajectories (Predictive), and recommending optimal actions (Prescriptive).
      </p>

      {/* Domain Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', marginRight: '4px' }}>
          Select Domain:
        </span>
        {(['college', 'ecommerce', 'cricket', 'healthcare', 'aviation'] as DomainKey[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setSelectedDomain(d)}
            style={{
              padding: '6px 12px',
              background: selectedDomain === d ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
              border: selectedDomain === d ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              borderRadius: '3px',
              color: selectedDomain === d ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            {domainMatrix[d].name}
          </button>
        ))}
      </div>

      {/* 4 Type Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {(['descriptive', 'diagnostic', 'predictive', 'prescriptive'] as QuestionType[]).map((t) => {
          const item = typeDetails[t];
          const isSel = selectedType === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedType(t)}
              style={{
                padding: '12px 8px',
                background: isSel ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
                border: isSel ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: isSel ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontWeight: isSel ? 700 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              {item.icon}
              <span>{item.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Showcase Card */}
      <div
        style={{
          padding: '1.75rem',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <Tag type={currentType.tagType} size="md">
            {currentType.title}
          </Tag>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-cyan)' }}>
            Core Question: &ldquo;{currentData.q}&rdquo;
          </span>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Real-World Scenario Example ({domainMatrix[selectedDomain].name})
          </div>
          <p style={{ margin: 0, fontSize: '1rem', color: 'var(--ds-text-primary)', lineHeight: 1.5, fontWeight: 500 }}>
            {currentData.ex}
          </p>
        </div>

        <div
          style={{
            padding: '10px 14px',
            background: 'var(--cds-layer-01)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontSize: '0.8125rem',
            color: 'var(--ds-text-secondary)',
          }}
        >
          <strong style={{ color: 'var(--ds-cyan)' }}>Expected Analytical Output:</strong> {currentData.output}
        </div>
      </div>
    </div>
  );
}
