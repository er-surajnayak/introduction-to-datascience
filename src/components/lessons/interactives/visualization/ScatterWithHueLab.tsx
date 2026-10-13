'use client';

import React, { useState } from 'react';
import { Tag, Checkbox, CodeSnippet } from '@carbon/react';

interface StudentRecord {
  name: string;
  hours: number;
  marks: number;
  cls: 'A' | 'B';
}

const STUDENTS: StudentRecord[] = [
  { name: 'Rahul', hours: 3, marks: 65, cls: 'A' },
  { name: 'Priya', hours: 5, marks: 82, cls: 'A' },
  { name: 'Arjun', hours: 2, marks: 55, cls: 'B' },
  { name: 'Sneha', hours: 6, marks: 92, cls: 'A' },
  { name: 'Kabir', hours: 4, marks: 74, cls: 'B' },
  { name: 'Meera', hours: 7, marks: 95, cls: 'A' },
  { name: 'Riya', hours: 5, marks: 85, cls: 'A' },
  { name: 'Aman', hours: 3, marks: 62, cls: 'B' },
];

export function ScatterWithHueLab() {
  const [useHue, setUseHue] = useState<boolean>(true);
  const [useStyle, setUseStyle] = useState<boolean>(true);
  const [activeStudent, setActiveStudent] = useState<string | null>(null);

  const minX = 1;
  const maxX = 8;
  const minY = 40;
  const maxY = 100;

  const pythonCode = `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Student": ["Rahul", "Priya", "Arjun", "Sneha", "Kabir", "Meera", "Riya", "Aman"],
    "StudyHours": [3, 5, 2, 6, 4, 7, 5, 3],
    "Marks": [65, 82, 55, 92, 74, 95, 85, 62],
    "Class": ["A", "A", "B", "A", "B", "A", "B", "B"]
})

fig, ax = plt.subplots(figsize=(7, 4.5))

# Scatter plot with semantic hue and marker style encodings
sns.scatterplot(
    data=df,
    x="StudyHours",
    y="Marks"${useHue ? ',\n    hue="Class"' : ''}${useStyle ? ',\n    style="Class"' : ''},
    s=90,
    palette=["#4589ff", "#a56eff"],
    ax=ax
)

ax.set_title("Study Hours vs Exam Marks by Section")
ax.grid(True, linestyle="--", alpha=0.3)

plt.tight_layout()
plt.show()`;

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
          <Tag type="purple" size="md">Section 3.3.18</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Scatter Plot with Hue</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
          Multidimensional Encoding: X + Y + Hue + Style
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Visual Encoding Lab: Adding Categorical Dimensions via Hue
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        In Seaborn, passing <code>hue=&quot;Class&quot;</code> encodes section cohorts using color palettes. Adding <code>style=&quot;Class&quot;</code> assigns distinct marker symbols (circles vs squares), ensuring the chart remains fully accessible to colorblind viewers.
      </p>

      {/* Toggles */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Checkbox
          id="toggle-hue-cb"
          labelText="Enable Color Encoding (hue='Class')"
          checked={useHue}
          onChange={(_, { checked }) => setUseHue(checked)}
        />
        <Checkbox
          id="toggle-style-cb"
          labelText="Enable Shape Encoding (style='Class' for Accessibility)"
          checked={useStyle}
          onChange={(_, { checked }) => setUseStyle(checked)}
        />
      </div>

      {/* SVG Canvas */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <svg viewBox="0 0 440 210" style={{ width: '100%', height: 'auto', maxHeight: '210px' }} role="img" aria-label="Scatter plot with hue encoding">
          {/* Gridlines */}
          <line x1="60" y1="40" x2="360" y2="40" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />
          <line x1="60" y1="100" x2="360" y2="100" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />
          <line x1="60" y1="160" x2="360" y2="160" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />

          {/* Axes */}
          <line x1="60" y1="20" x2="60" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <line x1="60" y1="160" x2="360" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <text x="50" y="34" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">100</text>
          <text x="50" y="164" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">40</text>
          <text x="210" y="195" textAnchor="middle" fontSize="11" fill="var(--ds-text-secondary)">Study Hours &rarr;</text>
          <text x="18" y="90" textAnchor="middle" fontSize="11" transform="rotate(-90 18 90)" fill="var(--ds-text-secondary)">Marks &rarr;</text>

          {/* Points */}
          {STUDENTS.map((s, idx) => {
            const cx = 60 + ((s.hours - minX) / (maxX - minX)) * 280;
            const cy = 160 - ((s.marks - minY) / (maxY - minY)) * 120;
            const pointColor = useHue
              ? s.cls === 'A'
                ? 'var(--ds-blue)'
                : 'var(--ds-purple)'
              : 'var(--ds-blue)';
            const isSquare = useStyle && s.cls === 'B';
            const isHovered = activeStudent === s.name;

            return (
              <g
                key={idx}
                onMouseEnter={() => setActiveStudent(s.name)}
                onMouseLeave={() => setActiveStudent(null)}
                style={{ cursor: 'pointer' }}
              >
                {isSquare ? (
                  <rect
                    x={cx - (isHovered ? 7 : 5)}
                    y={cy - (isHovered ? 7 : 5)}
                    width={isHovered ? 14 : 10}
                    height={isHovered ? 14 : 10}
                    fill={pointColor}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ) : (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 8 : 6}
                    fill={pointColor}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                )}

                {isHovered && (
                  <g>
                    <rect x={cx - 40} y={cy - 24} width="80" height="18" fill="var(--ds-bg-surface)" stroke="var(--ds-border-strong)" rx="2" />
                    <text x={cx} y={cy - 12} textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ds-text-primary)">
                      {s.name} (Class {s.cls})
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Legend */}
          {useHue && (
            <g transform="translate(370, 50)">
              <text x="0" y="0" fontSize="10" fontWeight="bold" fill="var(--ds-text-primary)">Class</text>
              <g transform="translate(0, 12)">
                <circle cx="6" cy="6" r="5" fill="var(--ds-blue)" />
                <text x="16" y="10" fontSize="10" fill="var(--ds-text-primary)">Section A</text>
              </g>
              <g transform="translate(0, 32)">
                {useStyle ? (
                  <rect x="2" y="2" width="8" height="8" fill="var(--ds-purple)" />
                ) : (
                  <circle cx="6" cy="6" r="5" fill="var(--ds-purple)" />
                )}
                <text x="16" y="10" fontSize="10" fill="var(--ds-text-primary)">Section B</text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Code Snippet */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Matching Seaborn Python Script:
        </div>
        <CodeSnippet type="multi" feedback="Copied to clipboard">
          {pythonCode}
        </CodeSnippet>
      </div>
    </div>
  );
}
