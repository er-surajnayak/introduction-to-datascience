'use client';

import React, { useState } from 'react';
import { Button, Tag, Checkbox, Select, SelectItem, InlineNotification } from '@carbon/react';
import { Renew } from '@carbon/icons-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const DEFAULT_SALES = [120, 150, 140, 190, 220];
const DEFAULT_EXPENSES = [90, 110, 105, 120, 130];

export function LineChartTrendExplorer() {
  const [sales, setSales] = useState<number[]>([...DEFAULT_SALES]);
  const [showExpenses, setShowExpenses] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [marker, setMarker] = useState<string>('o');
  const [trendAnswer, setTrendAnswer] = useState<string | null>(null);

  const handleReset = () => {
    setSales([...DEFAULT_SALES]);
    setShowExpenses(false);
    setShowGrid(true);
    setMarker('o');
    setTrendAnswer(null);
  };

  const allVals = showExpenses ? [...sales, ...DEFAULT_EXPENSES] : sales;
  const maxVal = Math.max(...allVals, 250);
  const minVal = 0;

  const getPoints = (series: number[]) => {
    return series.map((val, idx) => {
      const x = 70 + idx * 75;
      const y = 170 - (val / maxVal) * 130;
      return { x, y, val };
    });
  };

  const salesPoints = getPoints(sales);
  const expensePoints = getPoints(DEFAULT_EXPENSES);

  const salesPath = salesPoints.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  const expensePath = expensePoints.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

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
          <Tag type="cyan" size="md">Section 3.3.5</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Line Charts</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Sequential Trends & Multi-Series Analysis
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Trend Explorer: Tracking Changes Over Time
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Line charts connect sequential observations to visualize directional trajectory (growth, decline, or seasonality). Customize markers, toggle a second series, and observe how multiple lines reveal business margins.
      </p>

      {/* Control Toolbar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div style={{ width: '140px' }}>
          <Select
            id="marker-select"
            labelText="Marker Type"
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px' }}>
          <Checkbox
            id="toggle-grid-cb"
            labelText="Show Grid"
            checked={showGrid}
            onChange={(_, { checked }) => setShowGrid(checked)}
          />
          <Checkbox
            id="toggle-expenses-cb"
            labelText="Add Expenses Series"
            checked={showExpenses}
            onChange={(_, { checked }) => setShowExpenses(checked)}
          />
          <Button kind="ghost" size="sm" renderIcon={Renew} onClick={handleReset}>
            Reset
          </Button>
        </div>
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
        <svg viewBox="0 0 420 210" style={{ width: '100%', height: 'auto', maxHeight: '210px' }} role="img" aria-label="Monthly sales line chart">
          {/* Gridlines */}
          {showGrid && (
            <g stroke="var(--ds-border-subtle)" strokeDasharray="3 3">
              <line x1="50" y1="40" x2="390" y2="40" />
              <line x1="50" y1="83" x2="390" y2="83" />
              <line x1="50" y1="126" x2="390" y2="126" />
              <line x1="50" y1="170" x2="390" y2="170" />
            </g>
          )}

          {/* Axes */}
          <line x1="50" y1="30" x2="50" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          <line x1="50" y1="170" x2="390" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {/* Y Labels */}
          <text x="42" y="44" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">250</text>
          <text x="42" y="105" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">125</text>
          <text x="42" y="174" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">0</text>

          {/* Expenses Line (if enabled) */}
          {showExpenses && (
            <g>
              <path d={expensePath} fill="none" stroke="var(--ds-purple)" strokeWidth="2" strokeDasharray="4 2" />
              {expensePoints.map((p, idx) => (
                <circle key={idx} cx={p.x} cy={p.y} r="4" fill="var(--ds-purple)" />
              ))}
            </g>
          )}

          {/* Sales Line */}
          <path d={salesPath} fill="none" stroke="var(--ds-blue)" strokeWidth="2.5" />
          {salesPoints.map((p, idx) => (
            <g key={idx}>
              {marker === 'o' && <circle cx={p.x} cy={p.y} r="5" fill="var(--ds-cyan)" stroke="#ffffff" strokeWidth="1.5" />}
              {marker === 's' && <rect x={p.x - 4} y={p.y - 4} width="8" height="8" fill="var(--ds-cyan)" stroke="#ffffff" strokeWidth="1.5" />}
              {marker === '^' && (
                <polygon
                  points={`${p.x},${p.y - 5} ${p.x - 5},${p.y + 4} ${p.x + 5},${p.y + 4}`}
                  fill="var(--ds-cyan)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              )}
              <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ds-text-primary)">
                {p.val}
              </text>
              <text x={p.x} y="188" textAnchor="middle" fontSize="11" fill="var(--ds-text-muted)">
                {MONTHS[idx]}
              </text>
            </g>
          ))}

          {/* Legend */}
          <g>
            <rect x="270" y="38" width={showExpenses ? '110' : '65'} height="26" fill="var(--ds-bg-surface)" stroke="var(--ds-border-subtle)" rx="2" />
            <line x1="276" y1="51" x2="292" y2="51" stroke="var(--ds-blue)" strokeWidth="2" />
            <text x="296" y="55" fontSize="10" fill="var(--ds-text-primary)">Sales</text>
            {showExpenses && (
              <>
                <line x1="334" y1="51" x2="350" y2="51" stroke="var(--ds-purple)" strokeWidth="2" strokeDasharray="3 2" />
                <text x="354" y="55" fontSize="10" fill="var(--ds-text-primary)">Expenses</text>
              </>
            )}
          </g>
        </svg>
      </div>

      {/* Trend Interpretation Check */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
        }}
      >
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Trend Interpretation: In which single month did sales experience a temporary dip?
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {MONTHS.map((m) => (
            <Button
              key={m}
              kind={trendAnswer === m ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTrendAnswer(m)}
            >
              {m}
            </Button>
          ))}
        </div>

        {trendAnswer && (
          <InlineNotification
            kind={trendAnswer === 'Mar' ? 'success' : 'warning'}
            title={trendAnswer === 'Mar' ? 'Correct!' : 'Incorrect'}
            subtitle={
              trendAnswer === 'Mar'
                ? 'Sales rose from 120 in Jan to 150 in Feb, dropped to 140 in March, before resuming a strong climb to 190 and 220.'
                : `Inspect the line trajectory in ${trendAnswer}: notice that between Feb (150) and Mar (140), the line dips downward.`
            }
            hideCloseButton
          />
        )}
      </div>
    </div>
  );
}
