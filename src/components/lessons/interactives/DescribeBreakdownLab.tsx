'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Code, Analytics, DataStructured, Information } from '@carbon/icons-react';

interface DescribeRow {
  name: string;
  val: string;
  group: 'count' | 'center' | 'spread' | 'extremes';
  meaning: string;
  calcVsInterpret: string;
}

export function DescribeBreakdownLab() {
  const [activeGroup, setActiveGroup] = useState<'all' | 'center' | 'spread' | 'extremes'>('all');
  const [selectedRow, setSelectedRow] = useState<string>('mean');

  const describeRows: DescribeRow[] = [
    {
      name: 'count',
      val: '10.000000',
      group: 'count',
      meaning: 'Number of non-null observations in the Series.',
      calcVsInterpret: 'Calculation is simple counting; interpretation confirms data completeness without missing values.',
    },
    {
      name: 'mean',
      val: '79.100000',
      group: 'center',
      meaning: 'Arithmetic balance point: sum of marks divided by 10.',
      calcVsInterpret: 'Calculation sums all items; interpretation requires checking if extreme values distorted it.',
    },
    {
      name: 'std',
      val: '12.332883',
      group: 'spread',
      meaning: 'Sample standard deviation using (n - 1) degrees of freedom.',
      calcVsInterpret: 'Calculation takes square root of sample variance; interpretation gauges how widely scores scatter around 79.1.',
    },
    {
      name: 'min',
      val: '54.000000',
      group: 'extremes',
      meaning: 'The lowest recorded mark in the exam cohort.',
      calcVsInterpret: 'Identifies the lower floor; interpretation checks whether 54 is a legitimate failing score or a typo.',
    },
    {
      name: '25%',
      val: '73.500000',
      group: 'spread',
      meaning: 'First Quartile (Q1). 25% of students scored at or below 73.5.',
      calcVsInterpret: 'Linear interpolation percentile; interpretation defines the boundary of the lower quartile.',
    },
    {
      name: '50%',
      val: '79.500000',
      group: 'center',
      meaning: 'Second Quartile (Q2) / Median. Exactly half scored below 79.5.',
      calcVsInterpret: 'Middle ranked value; comparing 79.5 with Mean 79.1 reveals near-perfect symmetry!',
    },
    {
      name: '75%',
      val: '88.000000',
      group: 'spread',
      meaning: 'Third Quartile (Q3). 75% of students scored at or below 88.0.',
      calcVsInterpret: 'Defines top quarter entry; together with Q1 computes IQR = 88.0 - 73.5 = 14.5.',
    },
    {
      name: 'max',
      val: '95.000000',
      group: 'extremes',
      meaning: 'The highest recorded mark in the cohort.',
      calcVsInterpret: 'Identifies the upper ceiling; 95 is within the Tukey upper fence (73.5 + 1.5×14.5 = 95.25).',
    },
  ];

  const activeRowData = describeRows.find((r) => r.name === selectedRow) || describeRows[1];

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
          <Tag type="blue" size="md">
            Section 25 & 26
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            NumPy, Pandas & The describe() Diagnostic Scan
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Calculating vs. Interpreting
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Deconstructing Pandas .describe(): Center, Spread & Extremes
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Any novice can type <code>df.describe()</code>. A professional data engineer <strong>interprets</strong> the output by grouping it into three structural zones: <strong>Center</strong> (mean, 50%), <strong>Spread</strong> (std, 25%, 75%), and <strong>Extremes</strong> (min, max).
      </p>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <Button
          size="sm"
          kind={activeGroup === 'all' ? 'primary' : 'secondary'}
          onClick={() => setActiveGroup('all')}
        >
          View All Rows (8)
        </Button>
        <Button
          size="sm"
          kind={activeGroup === 'center' ? 'primary' : 'secondary'}
          onClick={() => setActiveGroup('center')}
        >
          1. CENTER Zone (mean, 50%)
        </Button>
        <Button
          size="sm"
          kind={activeGroup === 'spread' ? 'primary' : 'secondary'}
          onClick={() => setActiveGroup('spread')}
        >
          2. SPREAD Zone (std, 25%, 75%)
        </Button>
        <Button
          size="sm"
          kind={activeGroup === 'extremes' ? 'primary' : 'secondary'}
          onClick={() => setActiveGroup('extremes')}
        >
          3. EXTREMES Zone (min, max)
        </Button>
      </div>

      {/* 2-Column Inspector: Interactive Table + Diagnostic Explainer */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Table View */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            fontFamily: 'var(--ds-font-mono)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '10px' }}>
            df[&apos;Marks&apos;].describe() &bull; Click any row
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <tbody>
              {describeRows.map((row) => {
                const isSelected = selectedRow === row.name;
                const isHighlighted = activeGroup === 'all' || activeGroup === row.group;
                const groupColor =
                  row.group === 'center'
                    ? 'var(--ds-blue)'
                    : row.group === 'spread'
                    ? 'var(--ds-amber)'
                    : row.group === 'extremes'
                    ? 'var(--ds-teal)'
                    : 'var(--ds-text-muted)';

                return (
                  <tr
                    key={row.name}
                    onClick={() => setSelectedRow(row.name)}
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--ds-border-subtle)',
                      background: isSelected ? 'var(--ds-bg-surface-elevated)' : 'transparent',
                      opacity: isHighlighted ? 1 : 0.35,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <td
                      style={{
                        padding: '8px 12px',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                        borderLeft: isSelected ? '3px solid var(--ds-cyan)' : '3px solid transparent',
                      }}
                    >
                      {row.name}
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--ds-text-primary)' }}>
                      {row.val}
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                      <span
                        style={{
                          fontSize: '0.625rem',
                          textTransform: 'uppercase',
                          padding: '2px 6px',
                          borderRadius: '2px',
                          background: 'var(--ds-bg-surface)',
                          color: groupColor,
                          border: `1px solid ${groupColor}`,
                        }}
                      >
                        {row.group}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Row Explainer */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>
                .{activeRowData.name} = {activeRowData.val}
              </span>
              <Tag type="cyan" size="sm">
                {activeRowData.group.toUpperCase()} ZONE
              </Tag>
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.5, marginBottom: '1rem' }}>
              {activeRowData.meaning}
            </div>

            <div
              style={{
                padding: '10px 12px',
                background: 'var(--ds-bg-core)',
                borderRadius: '4px',
                borderLeft: '3px solid var(--ds-purple)',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--ds-purple)', marginBottom: '4px' }}>
                Calculating vs. Interpreting:
              </div>
              {activeRowData.calcVsInterpret}
            </div>
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '10px', borderTop: '1px solid var(--ds-border-subtle)', fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
            💡 <strong>10-Second Detective Scan:</strong> Compare Mean (79.1) with 50% (79.5). The gap is only 0.4 marks, proving the exam score distribution is extraordinarily balanced without heavy skew!
          </div>
        </div>
      </div>
    </div>
  );
}
