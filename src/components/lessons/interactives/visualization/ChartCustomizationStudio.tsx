'use client';

import React, { useState } from 'react';
import { Tag, TextInput, Select, SelectItem, Checkbox, Slider, Button, CodeSnippet } from '@carbon/react';
import { Renew } from '@carbon/icons-react';

export function ChartCustomizationStudio() {
  const [title, setTitle] = useState<string>('Sales Trend (Q1-Q2)');
  const [xLabel, setXLabel] = useState<string>('Day of Experiment');
  const [yLabel, setYLabel] = useState<string>('Sales Volume');
  const [color, setColor] = useState<string>('royalblue');
  const [marker, setMarker] = useState<string>('o');
  const [lineStyle, setLineStyle] = useState<string>('--');
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);

  const handleReset = () => {
    setTitle('Sales Trend (Q1-Q2)');
    setXLabel('Day of Experiment');
    setYLabel('Sales Volume');
    setColor('royalblue');
    setMarker('o');
    setLineStyle('--');
    setLineWidth(2);
    setShowGrid(true);
    setShowLegend(true);
  };

  const DAYS = [1, 2, 3, 4, 5];
  const SALES = [100, 120, 115, 140, 160];
  const maxSale = 180;

  const points = DAYS.map((d, idx) => {
    const x = 70 + idx * 60;
    const y = 160 - (SALES[idx] / maxSale) * 120;
    return { x, y, d, val: SALES[idx] };
  });

  const pathD = points.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

  const strokeDash =
    lineStyle === '--' ? '6 4' : lineStyle === '-.' ? '8 3 2 3' : lineStyle === ':' ? '2 3' : 'none';

  const pythonCode = `import matplotlib.pyplot as plt

days = [1, 2, 3, 4, 5]
sales = [100, 120, 115, 140, 160]

fig, ax = plt.subplots(figsize=(8, 4.5))

# Plot configured line with styling parameters
ax.plot(
    days,
    sales,
    color="${color}",
    marker="${marker}",
    linestyle="${lineStyle}",
    linewidth=${lineWidth},
    label="Sales"
)

# Custom titles, labels & decorators
ax.set_title("${title}", fontsize=14, fontweight="bold")
ax.set_xlabel("${xLabel}", fontsize=11)
ax.set_ylabel("${yLabel}", fontsize=11)${showGrid ? '\nax.grid(True, linestyle="--", alpha=0.4)' : ''}${showLegend ? '\nax.legend(loc="upper left")' : ''}

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
          <Tag type="cyan" size="md">Section 3.3.11</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Chart Customization Studio</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Titles &bull; Labels &bull; Colors &bull; Styles &bull; Legends
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Customization Studio: Fine-Tuning Visual Aesthetics
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Modify chart parameters to explore the rich styling API of Matplotlib. Every visual adjustment immediately reflects in the live preview and updates the generated Python code snippet.
      </p>

      {/* Studio Grid: Controls (Left) + Preview (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Styling Controls */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              Styling Parameters
            </span>
            <Button kind="ghost" size="sm" renderIcon={Renew} onClick={handleReset}>
              Reset
            </Button>
          </div>

          <TextInput
            id="cust-title"
            labelText="Chart Title"
            size="sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <TextInput
              id="cust-xlabel"
              labelText="X-Axis Label"
              size="sm"
              value={xLabel}
              onChange={(e) => setXLabel(e.target.value)}
            />
            <TextInput
              id="cust-ylabel"
              labelText="Y-Axis Label"
              size="sm"
              value={yLabel}
              onChange={(e) => setYLabel(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Select
              id="cust-color"
              labelText="Color Palette"
              size="sm"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <SelectItem value="royalblue" text="Royal Blue" />
              <SelectItem value="#005d5d" text="Teal / Emerald" />
              <SelectItem value="#8a3ffc" text="Purple" />
              <SelectItem value="#0072c3" text="Cyan" />
            </Select>

            <Select
              id="cust-marker"
              labelText="Marker Symbol"
              size="sm"
              value={marker}
              onChange={(e) => setMarker(e.target.value)}
            >
              <SelectItem value="o" text="Circle (o)" />
              <SelectItem value="s" text="Square (s)" />
              <SelectItem value="^" text="Triangle (^)" />
              <SelectItem value="none" text="None" />
            </Select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Select
              id="cust-linestyle"
              labelText="Line Style"
              size="sm"
              value={lineStyle}
              onChange={(e) => setLineStyle(e.target.value)}
            >
              <SelectItem value="-" text="Solid (-)" />
              <SelectItem value="--" text="Dashed (--)" />
              <SelectItem value="-." text="Dash-Dot (-.)" />
              <SelectItem value=":" text="Dotted (:)" />
            </Select>

            <div>
              <Slider
                id="cust-linewidth"
                labelText={`Line Width: ${lineWidth}px`}
                min={1}
                max={4}
                step={1}
                value={lineWidth}
                onChange={({ value }) => setLineWidth(Number(value))}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', paddingTop: '4px' }}>
            <Checkbox
              id="cust-grid-cb"
              labelText="Show Grid"
              checked={showGrid}
              onChange={(_, { checked }) => setShowGrid(checked)}
            />
            <Checkbox
              id="cust-legend-cb"
              labelText="Show Legend"
              checked={showLegend}
              onChange={(_, { checked }) => setShowLegend(checked)}
            />
          </div>
        </div>

        {/* Right: Real-Time Preview */}
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
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
            RENDERED PREVIEW (fig, ax)
          </div>

          <svg viewBox="0 0 380 230" style={{ width: '100%', height: 'auto', maxHeight: '230px' }} role="img" aria-label="Customized chart preview">
            {/* Title */}
            <text x="190" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="var(--ds-text-primary)">
              {title}
            </text>

            {/* Grid */}
            {showGrid && (
              <g stroke="var(--ds-border-subtle)" strokeDasharray="3 3">
                <line x1="60" y1="40" x2="350" y2="40" />
                <line x1="60" y1="80" x2="350" y2="80" />
                <line x1="60" y1="120" x2="350" y2="120" />
                <line x1="60" y1="160" x2="350" y2="160" />
              </g>
            )}

            {/* Axes */}
            <line x1="60" y1="30" x2="60" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
            <line x1="60" y1="160" x2="350" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

            {/* Labels */}
            <text x="205" y="196" textAnchor="middle" fontSize="11" fill="var(--ds-text-secondary)">
              {xLabel}
            </text>
            <text x="18" y="100" textAnchor="middle" fontSize="11" transform="rotate(-90 18 100)" fill="var(--ds-text-secondary)">
              {yLabel}
            </text>

            {/* Line Path */}
            <path d={pathD} fill="none" stroke={color} strokeWidth={lineWidth} strokeDasharray={strokeDash} />

            {/* Markers */}
            {points.map((p, idx) => (
              <g key={idx}>
                {marker === 'o' && <circle cx={p.x} cy={p.y} r="5" fill={color} stroke="#ffffff" strokeWidth="1.5" />}
                {marker === 's' && <rect x={p.x - 4} y={p.y - 4} width="8" height="8" fill={color} stroke="#ffffff" strokeWidth="1.5" />}
                {marker === '^' && (
                  <polygon points={`${p.x},${p.y - 5} ${p.x - 5},${p.y + 4} ${p.x + 5},${p.y + 4}`} fill={color} stroke="#ffffff" strokeWidth="1.5" />
                )}
                <text x={p.x} y="174" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">
                  {p.d}
                </text>
              </g>
            ))}

            {/* Legend (if enabled) */}
            {showLegend && (
              <g>
                <rect x="70" y="36" width="65" height="24" fill="var(--ds-bg-surface)" stroke="var(--ds-border-subtle)" rx="2" />
                <line x1="76" y1="48" x2="92" y2="48" stroke={color} strokeWidth={lineWidth} strokeDasharray={strokeDash} />
                <text x="96" y="52" fontSize="10" fill="var(--ds-text-primary)">Sales</text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Generated Code */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Generated Matplotlib Python Code:
        </div>
        <CodeSnippet type="multi" feedback="Copied to clipboard">
          {pythonCode}
        </CodeSnippet>
      </div>
    </div>
  );
}
