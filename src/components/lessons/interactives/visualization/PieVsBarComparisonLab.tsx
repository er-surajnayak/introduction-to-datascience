'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { ChartPie, ChartBar } from '@carbon/icons-react';

const PREFERENCES = [
  { language: 'Python', count: 50, color: 'var(--ds-blue)' },
  { language: 'Java', count: 30, color: 'var(--ds-purple)' },
  { language: 'C++', count: 20, color: 'var(--ds-cyan)' },
];

export function PieVsBarComparisonLab() {
  const [viewType, setViewType] = useState<'pie' | 'bar'>('pie');

  const total = PREFERENCES.reduce((acc, p) => acc + p.count, 0);

  // Pie chart slice angle calculation
  let cumulativeAngle = -90; // Start at top
  const slices = PREFERENCES.map((p) => {
    const angle = (p.count / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 150 + 70 * Math.cos(startRad);
    const y1 = 100 + 70 * Math.sin(startRad);
    const x2 = 150 + 70 * Math.cos(endRad);
    const y2 = 100 + 70 * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;
    const pathD = `M 150 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const midRad = ((startAngle + endAngle) / 2 * Math.PI) / 180;
    const textX = 150 + 45 * Math.cos(midRad);
    const textY = 100 + 45 * Math.sin(midRad);

    return { ...p, pathD, percentage: ((p.count / total) * 100).toFixed(1), textX, textY };
  });

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
          <Tag type="cyan" size="md">Section 3.3.10</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Pie Charts</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Parts of a Whole vs Linear Perception
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Pie vs Bar Chart: Composition and Its Limitations
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Pie charts represent proportions of a single mutually exclusive total. However, cognitive psychology confirms that human vision struggles to evaluate radial slice angles and 2D areas compared to clean 1D bar lengths.
      </p>

      {/* Switcher Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <Button
          kind={viewType === 'pie' ? 'primary' : 'secondary'}
          size="sm"
          renderIcon={ChartPie}
          onClick={() => setViewType('pie')}
        >
          View as Pie Chart
        </Button>
        <Button
          kind={viewType === 'bar' ? 'primary' : 'secondary'}
          size="sm"
          renderIcon={ChartBar}
          onClick={() => setViewType('bar')}
        >
          View as Horizontal Bar Chart
        </Button>
      </div>

      {/* SVG Container */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        {viewType === 'pie' ? (
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: 'auto', maxHeight: '200px' }} role="img" aria-label="Pie chart of student programming preferences">
            {slices.map((slice, idx) => (
              <g key={idx}>
                <path d={slice.pathD} fill={slice.color} stroke="var(--ds-bg-core)" strokeWidth="2" />
                <text x={slice.textX} y={slice.textY} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
                  {slice.percentage}%
                </text>
              </g>
            ))}
            {/* Legend */}
            <g transform="translate(260, 60)">
              {PREFERENCES.map((p, idx) => (
                <g key={idx} transform={`translate(0, ${idx * 26})`}>
                  <rect width="14" height="14" fill={p.color} rx="2" />
                  <text x="22" y="12" fontSize="11" fill="var(--ds-text-primary)">
                    {p.language} ({p.count})
                  </text>
                </g>
              ))}
            </g>
          </svg>
        ) : (
          <svg viewBox="0 0 400 160" style={{ width: '100%', height: 'auto', maxHeight: '160px' }} role="img" aria-label="Horizontal bar chart alternative">
            <line x1="80" y1="20" x2="80" y2="130" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
            {PREFERENCES.map((p, idx) => {
              const y = 30 + idx * 34;
              const barWidth = (p.count / 50) * 230;

              return (
                <g key={idx}>
                  <text x="74" y={y + 16} textAnchor="end" fontSize="11" fill="var(--ds-text-primary)">
                    {p.language}
                  </text>
                  <rect x="82" y={y} width={barWidth} height="22" fill={p.color} rx="2" />
                  <text x={90 + barWidth} y={y + 16} fontSize="11" fontWeight="bold" fill="var(--ds-text-primary)">
                    {p.count} ({((p.count / total) * 100).toFixed(0)}%)
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Guidelines Box */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-purple)',
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>When to AVOID Pie Charts:</strong> Never use a pie chart if you have more than 4&ndash;5 categories, if the values do not sum to 100% of a defined whole, or when viewers need to make precise quantitative comparisons between slices of similar size. In all such cases, a sorted horizontal bar chart is vastly superior.
      </div>
    </div>
  );
}
