'use client';

import React, { useState } from 'react';
import { Button, Tag, NumberInput, CodeSnippet } from '@carbon/react';
import { Renew } from '@carbon/icons-react';

const DEFAULT_DAYS = [1, 2, 3, 4, 5];
const DEFAULT_TEMPS = [28, 30, 29, 32, 31];

export function MeetMatplotlibPlotBuilder() {
  const [temps, setTemps] = useState<number[]>([...DEFAULT_TEMPS]);

  const handleTempChange = (idx: number, val: number) => {
    const updated = [...temps];
    updated[idx] = Number.isFinite(val) ? val : 25;
    setTemps(updated);
  };

  const handleReset = () => {
    setTemps([...DEFAULT_TEMPS]);
  };

  const minTemp = Math.min(...temps, 20);
  const maxTemp = Math.max(...temps, 40);
  const range = maxTemp - minTemp || 1;

  // Generate Python snippet
  const pythonCode = `import matplotlib.pyplot as plt

days = [1, 2, 3, 4, 5]
temperature = [${temps.join(', ')}]

# Create plot
plt.figure(figsize=(7, 4))
plt.plot(days, temperature, marker="o", color="royalblue", linewidth=2)

# Set labels & title
plt.title("Daily Temperature Trend (°C)")
plt.xlabel("Day")
plt.ylabel("Temperature (°C)")
plt.grid(True, linestyle="--", alpha=0.5)

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
          <Tag type="cyan" size="md">Section 3.3.3</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Meet Matplotlib</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Editable Data &rarr; Live Plot & Code Sync
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Build Your First Plot: pyplot in Action
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Adjust the daily temperatures below. Observe how modifying a numerical observation simultaneously updates the rendered plot and the generated Python script.
      </p>

      {/* Grid: Inputs (Left) and Chart Preview (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Interactive Controls */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              Temperature Values (°C)
            </span>
            <Button kind="ghost" size="sm" renderIcon={Renew} onClick={handleReset}>
              Reset
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {DEFAULT_DAYS.map((day, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
                  Day {day}:
                </span>
                <div style={{ width: '130px' }}>
                  <NumberInput
                    id={`temp-input-${day}`}
                    min={10}
                    max={50}
                    step={1}
                    value={temps[idx]}
                    size="sm"
                    hideLabel
                    label={`Day ${day}`}
                    onChange={(_, { value }) => handleTempChange(idx, Number(value))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live SVG Chart */}
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
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
            LIVE PLOT PREVIEW
          </div>
          <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', maxHeight: '200px' }} role="img" aria-label="Line plot of daily temperatures">
            {/* Grid */}
            <line x1="50" y1="30" x2="330" y2="30" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />
            <line x1="50" y1="90" x2="330" y2="90" stroke="var(--ds-border-subtle)" strokeDasharray="3 3" />
            <line x1="50" y1="150" x2="330" y2="150" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

            {/* Y Labels */}
            <text x="42" y="34" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{maxTemp}°</text>
            <text x="42" y="94" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{Math.round((maxTemp + minTemp) / 2)}°</text>
            <text x="42" y="154" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{minTemp}°</text>

            {/* Line Path */}
            {(() => {
              const points = DEFAULT_DAYS.map((_, idx) => {
                const x = 70 + idx * 60;
                const y = 150 - ((temps[idx] - minTemp) / range) * 110;
                return { x, y };
              });
              const pathD = points.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

              return (
                <g>
                  <path d={pathD} fill="none" stroke="var(--ds-blue)" strokeWidth="2.5" />
                  {points.map((p, idx) => (
                    <g key={idx}>
                      <circle cx={p.x} cy={p.y} r="5" fill="var(--ds-cyan)" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ds-text-primary)">
                        {temps[idx]}°
                      </text>
                      <text x={p.x} y="170" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">
                        D{idx + 1}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Synchronized Python Code Snippet */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Synchronized Python Code (Matplotlib):
        </div>
        <CodeSnippet type="multi" feedback="Copied to clipboard">
          {pythonCode}
        </CodeSnippet>
      </div>
    </div>
  );
}
