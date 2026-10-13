'use client';

import React, { useState } from 'react';
import { Tag, Button, CodeSnippet } from '@carbon/react';
import { Renew } from '@carbon/icons-react';

const DEFAULT_CITIES = ['Mumbai', 'Pune', 'Mumbai', 'Nashik', 'Pune', 'Mumbai'];

export function SeabornCountPlotLab() {
  const [cityList, setCityList] = useState<string[]>([...DEFAULT_CITIES]);

  const addCity = (city: string) => {
    setCityList([...cityList, city]);
  };

  const handleReset = () => {
    setCityList([...DEFAULT_CITIES]);
  };

  // Compute frequencies
  const counts: Record<string, number> = {};
  cityList.forEach((c) => {
    counts[c] = (counts[c] || 0) + 1;
  });

  const uniqueCities = Object.keys(counts);
  const maxCount = Math.max(...Object.values(counts), 1);

  const pythonCode = `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "City": [${cityList.map((c) => `"${c}"`).join(', ')}]
})

fig, ax = plt.subplots(figsize=(7, 4))

# Seaborn countplot automatically computes and renders category frequencies
sns.countplot(data=df, x="City", palette="Blues_d", ax=ax)

ax.set_title("Student Count by Origin City")
ax.set_xlabel("City")
ax.set_ylabel("Student Count")

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
          <Tag type="purple" size="md">Section 3.3.14</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Seaborn Count Plot</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
          sns.countplot() vs sns.barplot()
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Category Counter: Automated Frequency Tallies
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        <code>sns.countplot()</code> counts the number of occurrences of each categorical variable level automatically. In contrast, <code>sns.barplot()</code> calculates a central tendency metric (such as mean revenue) across categories.
      </p>

      {/* Add City Buttons */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
          Inject Student from:
        </span>
        {['Mumbai', 'Pune', 'Nashik', 'Nagpur'].map((c) => (
          <Button key={c} kind="secondary" size="sm" onClick={() => addCity(c)}>
            + {c}
          </Button>
        ))}
        <Button kind="ghost" size="sm" renderIcon={Renew} onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Grid: Observation Pills + SVG Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Observations */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Current Student City Series (N = {cityList.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {cityList.map((c, idx) => (
              <span
                key={idx}
                style={{
                  padding: '3px 8px',
                  borderRadius: '3px',
                  background: 'var(--ds-bg-surface)',
                  color: 'var(--ds-text-primary)',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--ds-font-mono)',
                  border: '1px solid var(--ds-border-subtle)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Right: SVG Count Plot Preview */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 340 180" style={{ width: '100%', height: 'auto', maxHeight: '180px' }} role="img" aria-label="Seaborn count plot preview">
            <line x1="50" y1="140" x2="310" y2="140" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
            <line x1="50" y1="20" x2="50" y2="140" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
            <text x="42" y="24" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{maxCount}</text>
            <text x="42" y="144" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">0</text>

            {uniqueCities.map((city, idx) => {
              const totalBars = uniqueCities.length;
              const barWidth = 44;
              const x = 65 + idx * ((240 / totalBars) || 60);
              const barHeight = (counts[city] / maxCount) * 110;
              const y = 140 - barHeight;

              return (
                <g key={idx}>
                  <rect x={x} y={y} width={barWidth} height={barHeight} fill="var(--ds-purple)" rx="2" />
                  <text x={x + barWidth / 2} y={y - 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ds-text-primary)">
                    {counts[city]}
                  </text>
                  <text x={x + barWidth / 2} y="156" textAnchor="middle" fontSize="11" fill="var(--ds-text-primary)">
                    {city}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
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
