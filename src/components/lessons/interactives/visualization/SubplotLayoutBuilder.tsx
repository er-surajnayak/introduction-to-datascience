'use client';

import React, { useState } from 'react';
import { Tag, Button, CodeSnippet } from '@carbon/react';

type LayoutType = '1x1' | '1x2' | '2x1' | '2x2';

export function SubplotLayoutBuilder() {
  const [layout, setLayout] = useState<LayoutType>('1x2');

  const pythonCode =
    layout === '1x1'
      ? `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4.5))

ax.plot([1, 2, 3, 4, 5], [120, 150, 140, 190, 220], color="royalblue", marker="o")
ax.set_title("Single Plot Canvas")
ax.grid(True, linestyle="--", alpha=0.3)

plt.tight_layout()
plt.show()`
      : layout === '1x2'
      ? `import matplotlib.pyplot as plt

# 1 row, 2 columns of subplots -> axes is a 1D array of 2 elements
fig, axes = plt.subplots(1, 2, figsize=(11, 4))

# Left plot: Revenue trend
axes[0].plot(["Jan", "Feb", "Mar", "Apr", "May"], [120, 150, 140, 190, 220], color="royalblue", marker="o")
axes[0].set_title("Revenue (₹k)")
axes[0].grid(True, alpha=0.3)

# Right plot: Order volume
axes[1].bar(["Jan", "Feb", "Mar", "Apr", "May"], [80, 95, 90, 110, 145], color="#005d5d")
axes[1].set_title("Orders Received")

plt.tight_layout()
plt.show()`
      : layout === '2x1'
      ? `import matplotlib.pyplot as plt

# 2 rows, 1 column of subplots (vertically stacked)
fig, axes = plt.subplots(2, 1, figsize=(8, 7), sharex=True)

axes[0].plot(["Jan", "Feb", "Mar", "Apr", "May"], [120, 150, 140, 190, 220], color="royalblue")
axes[0].set_title("Revenue Growth")

axes[1].bar(["Jan", "Feb", "Mar", "Apr", "May"], [20, 24, 22, 28, 35], color="#8a3ffc")
axes[1].set_title("Ad Spend (₹k)")

plt.tight_layout()
plt.show()`
      : `import matplotlib.pyplot as plt

# 2 rows, 2 columns -> axes is a 2D array: axes[row, col]
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

# Top-left: Trend line
axes[0, 0].plot([1, 2, 3, 4], [10, 20, 15, 25], color="royalblue")
axes[0, 0].set_title("Sales Trend")

# Top-right: Category bars
axes[0, 1].bar(["A", "B", "C"], [40, 30, 25], color="#005d5d")
axes[0, 1].set_title("Category Share")

# Bottom-left: Histogram
axes[1, 0].hist([45, 55, 60, 65, 70, 75, 80], bins=4, color="royalblue")
axes[1, 0].set_title("Distribution")

# Bottom-right: Scatter plot
axes[1, 1].scatter([2, 4, 5, 7], [50, 65, 75, 90], color="#8a3ffc")
axes[1, 1].set_title("Correlation")

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
          <Tag type="cyan" size="md">Section 3.3.12</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Subplots</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Grid Architecture & Multi-Panel Dashboards
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Subplot Layout Builder: Organizing Multi-Chart Canvases
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        In data science dashboards, multiple complementary charts reside inside a single Figure. Switch between grid architectures below to see how Matplotlib organizes Axes arrays.
      </p>

      {/* Layout Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {(['1x1', '1x2', '2x1', '2x2'] as LayoutType[]).map((type) => (
          <Button
            key={type}
            kind={layout === type ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setLayout(type)}
          >
            {type === '1x1'
              ? '1 × 1 (Single Plot)'
              : type === '1x2'
              ? '1 × 2 (Side-by-Side)'
              : type === '2x1'
              ? '2 × 1 (Stacked Rows)'
              : '2 × 2 (4-Panel Grid)'}
          </Button>
        ))}
      </div>

      {/* Visual Canvas Representation */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '8px' }}>
          FIGURE CANVAS GRID PREVIEW
        </div>

        {layout === '1x1' && (
          <div style={{ padding: '2.5rem', background: 'var(--ds-bg-surface)', border: '1px dashed var(--ds-border-strong)', textAlign: 'center', borderRadius: '4px' }}>
            <span style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>ax (Single Axes)</span>
          </div>
        )}

        {layout === '1x2' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '2rem', background: 'var(--ds-bg-surface)', border: '1px dashed var(--ds-blue)', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>axes[0]</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Revenue Line Chart</div>
            </div>
            <div style={{ padding: '2rem', background: 'var(--ds-bg-surface)', border: '1px dashed var(--ds-emerald)', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>axes[1]</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Orders Bar Chart</div>
            </div>
          </div>
        )}

        {layout === '2x1' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface)', border: '1px dashed var(--ds-blue)', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>axes[0] (Top Plot)</div>
            </div>
            <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface)', border: '1px dashed var(--ds-purple)', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>axes[1] (Bottom Plot)</div>
            </div>
          </div>
        )}

        {layout === '2x2' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface)', border: '1px dashed var(--ds-blue)', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>axes[0, 0]</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Line Chart</div>
            </div>
            <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface)', border: '1px dashed var(--ds-emerald)', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>axes[0, 1]</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Bar Chart</div>
            </div>
            <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface)', border: '1px dashed var(--ds-cyan)', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>axes[1, 0]</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Histogram</div>
            </div>
            <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface)', border: '1px dashed var(--ds-purple)', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>axes[1, 1]</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Scatter Plot</div>
            </div>
          </div>
        )}
      </div>

      {/* Code Snippet */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
          Matching Python Matplotlib Subplots Script:
        </div>
        <CodeSnippet type="multi" feedback="Copied to clipboard">
          {pythonCode}
        </CodeSnippet>
      </div>
    </div>
  );
}
