'use client';

import React, { useState } from 'react';
import { Button, Tag, InlineNotification } from '@carbon/react';
import { Table, ChartBar, CheckmarkFilled, MisuseOutline } from '@carbon/icons-react';

const EVENTS_DATA = [
  { event: 'AI Workshop', registrations: 120, color: 'var(--ds-blue)' },
  { event: 'Hackathon', registrations: 240, color: 'var(--ds-purple)' },
  { event: 'Python Bootcamp', registrations: 180, color: 'var(--ds-cyan)' },
  { event: 'Design Meetup', registrations: 90, color: 'var(--ds-emerald)' },
];

export function WhyVisualizationMattersLab() {
  const [viewMode, setViewMode] = useState<'table' | 'bar'>('table');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const maxVal = Math.max(...EVENTS_DATA.map((e) => e.registrations));

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
          <Tag type="cyan" size="md">Section 3.3.2</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Why Visualization Matters</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Table vs Visual Bar Encoding
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Table vs Bar Chart: Speed of Human Perception
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Compare campus event registration records presented in a tabular format versus an encoded bar chart. Notice how the visual representation removes the arithmetic scanning delay.
      </p>

      {/* View Toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <Button
          kind={viewMode === 'table' ? 'primary' : 'secondary'}
          size="sm"
          renderIcon={Table}
          onClick={() => setViewMode('table')}
        >
          View as Data Table
        </Button>
        <Button
          kind={viewMode === 'bar' ? 'primary' : 'secondary'}
          size="sm"
          renderIcon={ChartBar}
          onClick={() => setViewMode('bar')}
        >
          View as Bar Chart
        </Button>
      </div>

      {/* Render Area */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        {viewMode === 'table' ? (
          <div>
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '8px' }}>
              CAMPUS EVENTS REGISTRATION TABLE
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ds-border-strong)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', color: 'var(--ds-text-muted)' }}>Campus Event</th>
                  <th style={{ padding: '8px 12px', color: 'var(--ds-text-muted)' }}>Total Registrations</th>
                </tr>
              </thead>
              <tbody>
                {EVENTS_DATA.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                    <td style={{ padding: '8px 12px', color: 'var(--ds-text-primary)', fontWeight: 500 }}>{row.event}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)' }}>
                      {row.registrations}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '12px' }}>
              CAMPUS EVENTS REGISTRATION BAR CHART
            </div>
            <svg viewBox="0 0 500 180" style={{ width: '100%', height: 'auto', maxHeight: '180px' }} role="img" aria-label="Event registrations bar chart">
              <line x1="120" y1="20" x2="120" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
              {EVENTS_DATA.map((row, idx) => {
                const barWidth = (row.registrations / maxVal) * 320;
                const y = 30 + idx * 34;

                return (
                  <g key={idx}>
                    <text x="110" y={y + 16} textAnchor="end" fontSize="11" fill="var(--ds-text-primary)">
                      {row.event}
                    </text>
                    <rect
                      x="122"
                      y={y}
                      width={barWidth}
                      height="22"
                      fill={row.color}
                      rx="3"
                    />
                    <text x={130 + barWidth} y={y + 16} fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">
                      {row.registrations}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>

      {/* Interactive Comprehension Question */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
        }}
      >
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Quick Perception Check: Which event received the largest turnout?
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {EVENTS_DATA.map((e, idx) => (
            <Button
              key={idx}
              kind={selectedAnswer === e.event ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedAnswer(e.event)}
            >
              {e.event}
            </Button>
          ))}
        </div>

        {selectedAnswer && (
          <InlineNotification
            kind={selectedAnswer === 'Hackathon' ? 'success' : 'warning'}
            title={selectedAnswer === 'Hackathon' ? 'Correct!' : 'Incorrect'}
            subtitle={
              selectedAnswer === 'Hackathon'
                ? 'Hackathon received 240 registrations. Notice how in the bar chart, your eyes immediately identified the longest rectangle without performing any mental number comparisons.'
                : 'Inspect the values or switch to the bar chart: Hackathon has 240 registrations, higher than the others.'
            }
            hideCloseButton
          />
        )}
      </div>
    </div>
  );
}
