'use client';

import React, { useState } from 'react';
import { Tag } from '@carbon/react';

interface AnatomyPart {
  id: string;
  name: string;
  role: string;
  pythonCode: string;
  category: 'container' | 'coordinate' | 'annotation';
}

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'figure',
    name: 'Figure (Container)',
    role: 'The top-level canvas window or image file that holds all subplots, colorbars, and global legends.',
    pythonCode: 'fig = plt.figure(figsize=(8, 4.5))',
    category: 'container',
  },
  {
    id: 'axes',
    name: 'Axes (Plotting Region)',
    role: 'The actual coordinate bounding box inside the Figure where data points, lines, and bars are rendered.',
    pythonCode: 'fig, ax = plt.subplots()  # ax is the Axes object',
    category: 'container',
  },
  {
    id: 'title',
    name: 'Title (Annotation)',
    role: 'The text banner at the top of the Axes describing the core analytical question or topic.',
    pythonCode: 'ax.set_title("Daily Sales Trend", fontsize=14)',
    category: 'annotation',
  },
  {
    id: 'xaxis',
    name: 'X-Axis & Label',
    role: 'The horizontal coordinate direction defining the domain, tick intervals, and variable name.',
    pythonCode: 'ax.set_xlabel("Day of Month", fontsize=11)',
    category: 'coordinate',
  },
  {
    id: 'yaxis',
    name: 'Y-Axis & Label',
    role: 'The vertical coordinate direction defining the range, magnitude scale, and unit of measurement.',
    pythonCode: 'ax.set_ylabel("Revenue (₹ in Thousands)", fontsize=11)',
    category: 'coordinate',
  },
  {
    id: 'ticks',
    name: 'Ticks & Tick Labels',
    role: 'The numeric markers and tick marks placed along each axis to indicate discrete coordinate values.',
    pythonCode: 'ax.set_xticks([1, 2, 3, 4, 5])',
    category: 'coordinate',
  },
  {
    id: 'legend',
    name: 'Legend',
    role: 'The guide decoding visual attributes (colors, line styles, marker symbols) to specific series or cohorts.',
    pythonCode: 'ax.legend(loc="upper right")',
    category: 'annotation',
  },
  {
    id: 'grid',
    name: 'Gridlines',
    role: 'Subtle background reference lines helping viewers trace coordinate values across the plot.',
    pythonCode: 'ax.grid(True, linestyle="--", alpha=0.4)',
    category: 'coordinate',
  },
];

export function FigureAnatomyExplorer() {
  const [selectedPart, setSelectedPart] = useState<string>('figure');

  const current = ANATOMY_PARTS.find((p) => p.id === selectedPart) || ANATOMY_PARTS[0];

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
          <Tag type="cyan" size="md">Section 3.3.4</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Figure Anatomy</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Container &rarr; Coordinate Axes &rarr; Visual Elements
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Anatomy of a Matplotlib Figure: The Object Hierarchy
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Click any element below to inspect its role in the Matplotlib object-oriented hierarchy and view the exact Python method used to customize it.
      </p>

      {/* Selector Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {ANATOMY_PARTS.map((part) => (
          <button
            key={part.id}
            onClick={() => setSelectedPart(part.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '16px',
              border: selectedPart === part.id ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-strong)',
              background: selectedPart === part.id ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
              color: selectedPart === part.id ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {part.name}
          </button>
        ))}
      </div>

      {/* Visual Diagram with Highlights */}
      <div
        style={{
          position: 'relative',
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: selectedPart === 'figure' ? '2px dashed var(--ds-cyan)' : '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: selectedPart === 'figure' ? 'var(--ds-cyan)' : 'var(--ds-text-muted)' }}>
          Figure (Top-level canvas)
        </div>

        <svg viewBox="0 0 500 220" style={{ width: '100%', height: 'auto', maxHeight: '220px' }} role="img" aria-label="Interactive chart anatomy diagram">
          {/* Axes bounding box */}
          <rect
            x="70"
            y="40"
            width="380"
            height="130"
            fill="var(--ds-bg-surface)"
            stroke={selectedPart === 'axes' ? 'var(--ds-cyan)' : 'var(--ds-border-strong)'}
            strokeWidth={selectedPart === 'axes' ? 3 : 1}
            strokeDasharray={selectedPart === 'axes' ? '4 4' : 'none'}
          />

          {/* Gridlines */}
          <g opacity={selectedPart === 'grid' ? 1 : 0.4}>
            <line x1="70" y1="80" x2="450" y2="80" stroke={selectedPart === 'grid' ? 'var(--ds-cyan)' : 'var(--ds-border-subtle)'} strokeDasharray="3 3" strokeWidth={selectedPart === 'grid' ? 2 : 1} />
            <line x1="70" y1="120" x2="450" y2="120" stroke={selectedPart === 'grid' ? 'var(--ds-cyan)' : 'var(--ds-border-subtle)'} strokeDasharray="3 3" strokeWidth={selectedPart === 'grid' ? 2 : 1} />
            <line x1="165" y1="40" x2="165" y2="170" stroke={selectedPart === 'grid' ? 'var(--ds-cyan)' : 'var(--ds-border-subtle)'} strokeDasharray="3 3" strokeWidth={selectedPart === 'grid' ? 2 : 1} />
            <line x1="260" y1="40" x2="260" y2="170" stroke={selectedPart === 'grid' ? 'var(--ds-cyan)' : 'var(--ds-border-subtle)'} strokeDasharray="3 3" strokeWidth={selectedPart === 'grid' ? 2 : 1} />
            <line x1="355" y1="40" x2="355" y2="170" stroke={selectedPart === 'grid' ? 'var(--ds-cyan)' : 'var(--ds-border-subtle)'} strokeDasharray="3 3" strokeWidth={selectedPart === 'grid' ? 2 : 1} />
          </g>

          {/* Data Line */}
          <path d="M 100 140 L 190 90 L 280 110 L 370 60" fill="none" stroke="var(--ds-blue)" strokeWidth="2.5" />
          <circle cx="100" cy="140" r="4" fill="var(--ds-blue)" />
          <circle cx="190" cy="90" r="4" fill="var(--ds-blue)" />
          <circle cx="280" cy="110" r="4" fill="var(--ds-blue)" />
          <circle cx="370" cy="60" r="4" fill="var(--ds-blue)" />

          {/* Title */}
          <text
            x="260"
            y="26"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill={selectedPart === 'title' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)'}
            style={{ textDecoration: selectedPart === 'title' ? 'underline' : 'none' }}
          >
            Monthly Sales Trend
          </text>

          {/* X Axis & Label */}
          <line x1="70" y1="170" x2="450" y2="170" stroke={selectedPart === 'xaxis' ? 'var(--ds-cyan)' : 'var(--ds-border-strong)'} strokeWidth={selectedPart === 'xaxis' ? 3 : 1.5} />
          <text
            x="260"
            y="205"
            textAnchor="middle"
            fontSize="11"
            fontWeight={selectedPart === 'xaxis' ? 'bold' : 'normal'}
            fill={selectedPart === 'xaxis' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)'}
          >
            Day of Month (X-Axis)
          </text>

          {/* Y Axis & Label */}
          <line x1="70" y1="40" x2="70" y2="170" stroke={selectedPart === 'yaxis' ? 'var(--ds-cyan)' : 'var(--ds-border-strong)'} strokeWidth={selectedPart === 'yaxis' ? 3 : 1.5} />
          <text
            x="20"
            y="105"
            textAnchor="middle"
            fontSize="11"
            transform="rotate(-90 20 105)"
            fontWeight={selectedPart === 'yaxis' ? 'bold' : 'normal'}
            fill={selectedPart === 'yaxis' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)'}
          >
            Sales (Y-Axis)
          </text>

          {/* Ticks */}
          <g fill={selectedPart === 'ticks' ? 'var(--ds-cyan)' : 'var(--ds-text-muted)'} fontSize="10">
            <text x="60" y="174" textAnchor="end">0</text>
            <text x="60" y="124" textAnchor="end">50</text>
            <text x="60" y="84" textAnchor="end">100</text>
            <text x="100" y="185" textAnchor="middle">Day 1</text>
            <text x="190" y="185" textAnchor="middle">Day 2</text>
            <text x="280" y="185" textAnchor="middle">Day 3</text>
            <text x="370" y="185" textAnchor="middle">Day 4</text>
          </g>

          {/* Legend */}
          <g>
            <rect
              x="360"
              y="48"
              width="80"
              height="26"
              fill="var(--ds-bg-core)"
              stroke={selectedPart === 'legend' ? 'var(--ds-cyan)' : 'var(--ds-border-subtle)'}
              strokeWidth={selectedPart === 'legend' ? 2 : 1}
              rx="2"
            />
            <line x1="368" y1="61" x2="388" y2="61" stroke="var(--ds-blue)" strokeWidth="2" />
            <text x="394" y="65" fontSize="10" fill="var(--ds-text-primary)">Sales</text>
          </g>
        </svg>
      </div>

      {/* Detail Card */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
        }}
      >
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
          {current.name}
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>
          {current.role}
        </p>
        <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-cyan)', background: 'var(--ds-bg-surface)', padding: '6px 10px', borderRadius: '3px' }}>
          {current.pythonCode}
        </div>
      </div>
    </div>
  );
}
