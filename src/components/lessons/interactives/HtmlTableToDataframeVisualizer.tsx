'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { Table, Code, ArrowRight, CheckmarkFilled, DataRefinery } from '@carbon/icons-react';

interface Stage {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

const stages: Stage[] = [
  {
    id: 'raw-html',
    stepNumber: 1,
    title: '1. Raw HTML Table Markup',
    description: 'HTML represents tabular data with <table>, <tr> (table rows), <th> (headers), and <td> (data cells).',
  },
  {
    id: 'parsed-rows',
    stepNumber: 2,
    title: '2. DOM Row & Cell Traversal',
    description: 'BeautifulSoup iterates through each <tr> row and extracts inner text from <th> headers and <td> cells.',
  },
  {
    id: 'python-dict',
    stepNumber: 3,
    title: '3. Structured Python Records',
    description: 'Extracted row items are packaged into a uniform list of dictionaries matching headers to cell values.',
  },
  {
    id: 'pandas-df',
    stepNumber: 4,
    title: '4. Pandas DataFrame (pd.read_html)',
    description: 'Pandas loads the table directly into a 2D matrix, enabling vector math, feature engineering, and modeling.',
  },
];

const rawTableHtml = `<table class="box-office">
  <thead>
    <tr>
      <th>Movie</th>
      <th>Year</th>
      <th>Budget ($M)</th>
      <th>Revenue ($M)</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Interstellar</td><td>2014</td><td>165</td><td>701.8</td></tr>
    <tr><td>Inception</td><td>2010</td><td>160</td><td>836.8</td></tr>
    <tr><td>Dune</td><td>2021</td><td>165</td><td>402.0</td></tr>
  </tbody>
</table>`;

const tableRows = [
  { movie: 'Interstellar', year: 2014, budget: 165, revenue: 701.8, profit: 536.8 },
  { movie: 'Inception', year: 2010, budget: 160, revenue: 836.8, profit: 676.8 },
  { movie: 'Dune', year: 2021, budget: 165, revenue: 402.0, profit: 237.0 },
];

export function HtmlTableToDataframeVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2.5rem 0',
        border: '1px solid var(--ds-border-strong)',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
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
            Tabular Data Transformation
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            HTML Table → Structured Records → Pandas DataFrame
          </h3>
        </div>
        <Tag type="cyan" size="md">
          DataFrame Pipeline
        </Tag>
      </div>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
          marginBottom: '1.5rem',
        }}
      >
        HTML tables are the most direct bridge between human web pages and Data Science datasets. Step through the stages to see how raw table markup transforms into an analytical DataFrame:
      </p>

      {/* Stepper Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {stages.map((stage) => {
          const isActive = currentStep === stage.stepNumber;
          return (
            <button
              key={stage.id}
              onClick={() => setCurrentStep(stage.stepNumber)}
              style={{
                background: isActive ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-01)',
                border: isActive
                  ? '2px solid var(--ds-cyan)'
                  : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                padding: '0.75rem 0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: isActive ? 'var(--ds-cyan)' : 'var(--ds-text-muted)',
                  fontWeight: 700,
                }}
              >
                STAGE 0{stage.stepNumber}
              </div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                }}
              >
                {stage.title.split('. ')[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Display Panel */}
      <div
        style={{
          background: 'var(--cds-layer-01)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          padding: '1.5rem',
        }}
      >
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 4px 0' }}>
            {stages[currentStep - 1].title}
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: 0 }}>
            {stages[currentStep - 1].description}
          </p>
        </div>

        {/* Dynamic Content based on Step */}
        {currentStep === 1 && (
          <div>
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                background: 'var(--cds-field-01)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.5,
                color: 'var(--ds-emerald)',
                overflowX: 'auto',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <code>{rawTableHtml}</code>
            </pre>
          </div>
        )}

        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                padding: '0.75rem 1rem',
                background: 'var(--ds-cyan-dim)',
                border: '1px solid var(--ds-cyan)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--ds-cyan)',
              }}
            >
              <strong>Headers Extracted: </strong> [&quot;Movie&quot;, &quot;Year&quot;, &quot;Budget ($M)&quot;, &quot;Revenue ($M)&quot;]
            </div>

            {tableRows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.625rem 1rem',
                  background: 'var(--cds-layer-02)',
                  borderRadius: '4px',
                  border: '1px solid var(--ds-border-subtle)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Row {idx + 1} &lt;tr&gt;:</span>
                <span style={{ color: 'var(--ds-emerald)' }}>
                  [{row.movie}, {row.year}, {row.budget}, {row.revenue}]
                </span>
              </div>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                background: 'var(--cds-field-01)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.55,
                color: 'var(--ds-text-primary)',
                overflowX: 'auto',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <code>{`# Python list of standardized observation dictionaries
dataset = [
    {"movie": "Interstellar", "year": 2014, "budget_m": 165, "revenue_m": 701.8},
    {"movie": "Inception",    "year": 2010, "budget_m": 160, "revenue_m": 836.8},
    {"movie": "Dune",         "year": 2021, "budget_m": 165, "revenue_m": 402.0}
]`}</code>
            </pre>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            {/* Visual DataFrame Table */}
            <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                }}
              >
                <thead>
                  <tr style={{ background: 'var(--cds-layer-02)', borderBottom: '2px solid var(--ds-border-strong)' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-muted)' }}>Index</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>Movie</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>Year</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>Budget ($M)</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>Revenue ($M)</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-emerald)' }}>Profit ($M) [Calculated]</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                      <td style={{ padding: '8px 12px', color: 'var(--ds-text-muted)' }}>{i}</td>
                      <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--ds-text-primary)' }}>{r.movie}</td>
                      <td style={{ padding: '8px 12px', color: 'var(--ds-text-secondary)' }}>{r.year}</td>
                      <td style={{ padding: '8px 12px', color: 'var(--ds-text-secondary)' }}>{r.budget}</td>
                      <td style={{ padding: '8px 12px', color: 'var(--ds-text-secondary)' }}>{r.revenue}</td>
                      <td style={{ padding: '8px 12px', color: 'var(--ds-emerald)', fontWeight: 600 }}>{r.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pandas 1-liner code */}
            <div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Automated 1-Liner with Pandas
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '0.75rem',
                  background: 'var(--cds-field-01)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--ds-text-primary)',
                  border: '1px solid var(--ds-border-subtle)',
                }}
              >
                <code>{`import pandas as pd\n# Automatically parses all <table> elements directly from URL or HTML string\ndfs = pd.read_html("https://example.com/box-office")\ndf = dfs[0]\ndf["Profit ($M)"] = df["Revenue ($M)"] - df["Budget ($M)"]`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--ds-border-subtle)',
          }}
        >
          <Button
            kind="ghost"
            size="sm"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((p) => p - 1)}
          >
            Previous Step
          </Button>
          <Button
            kind="primary"
            size="sm"
            renderIcon={ArrowRight}
            disabled={currentStep === stages.length}
            onClick={() => setCurrentStep((p) => p + 1)}
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}
