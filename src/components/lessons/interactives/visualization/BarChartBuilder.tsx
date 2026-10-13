'use client';

import React, { useState } from 'react';
import { Button, Tag, Select, SelectItem, Checkbox, NumberInput, CodeSnippet } from '@carbon/react';
import { Renew } from '@carbon/icons-react';

interface CategoryVote {
  topic: string;
  votes: number;
}

const DEFAULT_VOTES: CategoryVote[] = [
  { topic: 'Python', votes: 40 },
  { topic: 'ML', votes: 35 },
  { topic: 'DSA', votes: 20 },
  { topic: 'Web', votes: 25 },
];

export function BarChartBuilder() {
  const [data, setData] = useState<CategoryVote[]>([...DEFAULT_VOTES]);
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [showValues, setShowValues] = useState<boolean>(true);

  const handleVoteChange = (idx: number, val: number) => {
    const updated = [...data];
    updated[idx].votes = Number.isFinite(val) ? Math.max(0, val) : 0;
    setData(updated);
  };

  const handleReset = () => {
    setData([...DEFAULT_VOTES.map((d) => ({ ...d }))]);
    setSortOrder('default');
    setOrientation('vertical');
    setShowValues(true);
  };

  // Sorting
  let displayData = [...data];
  if (sortOrder === 'asc') {
    displayData.sort((a, b) => a.votes - b.votes);
  } else if (sortOrder === 'desc') {
    displayData.sort((a, b) => b.votes - a.votes);
  }

  const maxVote = Math.max(...displayData.map((d) => d.votes), 50);

  // Generate Python snippet
  const pythonCode = `import matplotlib.pyplot as plt

topics = [${displayData.map((d) => `"${d.topic}"`).join(', ')}]
votes = [${displayData.map((d) => d.votes).join(', ')}]

fig, ax = plt.subplots(figsize=(7, 4))

# Zero-anchored ${orientation} bar chart
${
  orientation === 'vertical'
    ? 'ax.bar(topics, votes, color="royalblue", edgecolor="black")\nax.set_xlabel("Topic")\nax.set_ylabel("Votes")'
    : 'ax.barh(topics, votes, color="royalblue", edgecolor="black")\nax.set_xlabel("Votes")\nax.set_ylabel("Topic")'
}

ax.set_title("Student Programming Preferences")
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
          <Tag type="cyan" size="md">Section 3.3.6</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Bar Charts</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Comparing Discrete Categories & Zero-Baseline Integrity
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Bar Chart Builder: Sorting & Orientation
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Bar charts compare independent discrete categories. Standard magnitude bar charts must always be anchored at a zero-baseline so that rectangle length and area faithfully reflect numerical proportions.
      </p>

      {/* Controls Bar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div style={{ width: '150px' }}>
          <Select
            id="bar-sort-select"
            labelText="Sort Order"
            size="sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
          >
            <SelectItem value="default" text="Original Order" />
            <SelectItem value="desc" text="Descending (Highest)" />
            <SelectItem value="asc" text="Ascending (Lowest)" />
          </Select>
        </div>

        <div style={{ width: '150px' }}>
          <Select
            id="bar-orient-select"
            labelText="Orientation"
            size="sm"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as any)}
          >
            <SelectItem value="vertical" text="Vertical (ax.bar)" />
            <SelectItem value="horizontal" text="Horizontal (ax.barh)" />
          </Select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px' }}>
          <Checkbox
            id="show-bar-values-cb"
            labelText="Show Data Labels"
            checked={showValues}
            onChange={(_, { checked }) => setShowValues(checked)}
          />
          <Button kind="ghost" size="sm" renderIcon={Renew} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Grid: Editable Inputs + Chart Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Value Inputs */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '12px' }}>
            Category Vote Tallies
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
                  {item.topic}:
                </span>
                <div style={{ width: '120px' }}>
                  <NumberInput
                    id={`vote-input-${item.topic}`}
                    min={0}
                    max={100}
                    step={1}
                    value={item.votes}
                    size="sm"
                    hideLabel
                    label={item.topic}
                    onChange={(_, { value }) => handleVoteChange(idx, Number(value))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: SVG Bar Chart Preview */}
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
          <svg viewBox="0 0 380 200" style={{ width: '100%', height: 'auto', maxHeight: '200px' }} role="img" aria-label="Interactive bar chart">
            {orientation === 'vertical' ? (
              // Vertical Bars
              <g>
                <line x1="50" y1="160" x2="350" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
                <line x1="50" y1="30" x2="50" y2="160" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
                <text x="42" y="34" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">{maxVote}</text>
                <text x="42" y="164" textAnchor="end" fontSize="10" fill="var(--ds-text-muted)">0</text>

                {displayData.map((d, idx) => {
                  const barWidth = 46;
                  const x = 70 + idx * 70;
                  const barHeight = (d.votes / maxVote) * 120;
                  const y = 160 - barHeight;

                  return (
                    <g key={idx}>
                      <rect x={x} y={y} width={barWidth} height={barHeight} fill="var(--ds-blue)" stroke="var(--ds-border-strong)" rx="2" />
                      {showValues && (
                        <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ds-text-primary)">
                          {d.votes}
                        </text>
                      )}
                      <text x={x + barWidth / 2} y="176" textAnchor="middle" fontSize="11" fill="var(--ds-text-primary)">
                        {d.topic}
                      </text>
                    </g>
                  );
                })}
              </g>
            ) : (
              // Horizontal Bars
              <g>
                <line x1="70" y1="30" x2="70" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
                <line x1="70" y1="170" x2="360" y2="170" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
                <text x="70" y="184" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">0</text>
                <text x="350" y="184" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">{maxVote}</text>

                {displayData.map((d, idx) => {
                  const barHeight = 22;
                  const y = 40 + idx * 32;
                  const barWidth = (d.votes / maxVote) * 260;

                  return (
                    <g key={idx}>
                      <text x="64" y={y + 15} textAnchor="end" fontSize="11" fill="var(--ds-text-primary)">
                        {d.topic}
                      </text>
                      <rect x="72" y={y} width={barWidth} height={barHeight} fill="var(--ds-blue)" stroke="var(--ds-border-strong)" rx="2" />
                      {showValues && (
                        <text x={78 + barWidth} y={y + 15} fontSize="10" fontWeight="bold" fill="var(--ds-text-primary)">
                          {d.votes}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Generated Python Code Snippet */}
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
