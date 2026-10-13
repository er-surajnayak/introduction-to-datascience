'use client';

import React, { useState } from 'react';
import { Tag, Button, CodeSnippet } from '@carbon/react';

export function MeetSeabornComparisonLab() {
  const [selectedLib, setSelectedLib] = useState<'both' | 'matplotlib' | 'seaborn'>('both');

  const mplCode = `# Matplotlib: Manual grouping & multi-step iteration
import matplotlib.pyplot as plt

classes = ["A", "B"]
marks_a = [65, 70, 75, 80]
marks_b = [55, 60, 85, 95]

fig, ax = plt.subplots(figsize=(6, 4))
ax.boxplot([marks_a, marks_b], labels=classes)
ax.set_title("Marks by Class (Manual Loops)")
plt.show()`;

  const snsCode = `# Seaborn: Native Pandas DataFrame semantic mapping
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Class": ["A", "A", "A", "A", "B", "B", "B", "B"],
    "Marks": [65, 70, 75, 80, 55, 60, 85, 95]
})

fig, ax = plt.subplots(figsize=(6, 4))
sns.boxplot(data=df, x="Class", y="Marks", palette="Set2", ax=ax)
ax.set_title("Marks by Class (Direct DataFrame Mapping)")
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
          <Tag type="purple" size="md">Section 3.3.13</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Meet Seaborn</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
          Matplotlib Low-Level Power &bull; Seaborn Statistical Convenience
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Matplotlib vs Seaborn: A Collaborative Partnership
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Seaborn is not a competitor that replaces Matplotlib; it is a statistical abstraction layer built directly on top of it. Seaborn handles automated data grouping, statistical aggregation, and color mappings, while Matplotlib provides figure geometry and fine-grained canvas controls.
      </p>

      {/* Selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <Button
          kind={selectedLib === 'both' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedLib('both')}
        >
          Side-by-Side Comparison
        </Button>
        <Button
          kind={selectedLib === 'matplotlib' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedLib('matplotlib')}
        >
          Matplotlib Focus
        </Button>
        <Button
          kind={selectedLib === 'seaborn' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedLib('seaborn')}
        >
          Seaborn Focus
        </Button>
      </div>

      {/* Code Blocks */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedLib === 'both' ? '1fr 1fr' : '1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        {(selectedLib === 'both' || selectedLib === 'matplotlib') && (
          <div style={{ padding: '1rem', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-strong)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-blue)', marginBottom: '6px' }}>
              Matplotlib (Manual Array Preparation)
            </div>
            <CodeSnippet type="multi">{mplCode}</CodeSnippet>
          </div>
        )}

        {(selectedLib === 'both' || selectedLib === 'seaborn') && (
          <div style={{ padding: '1rem', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-strong)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-purple)', marginBottom: '6px' }}>
              Seaborn (Native DataFrame Mapping)
            </div>
            <CodeSnippet type="multi">{snsCode}</CodeSnippet>
          </div>
        )}
      </div>

      {/* Architectural Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '12px',
        }}
      >
        <div style={{ padding: '1rem', background: 'var(--ds-bg-core)', borderRadius: '4px', borderLeft: '3px solid var(--ds-blue)' }}>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
            When to Use Matplotlib:
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.4 }}>
            Subplot canvas management, non-standard chart layouts, custom geometric annotations, and low-level line drawing.
          </div>
        </div>

        <div style={{ padding: '1rem', background: 'var(--ds-bg-core)', borderRadius: '4px', borderLeft: '3px solid var(--ds-purple)' }}>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
            When to Use Seaborn:
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.4 }}>
            Tidy DataFrames, statistical distribution curves (KDE, violin), grouping by category with <code>hue</code>, and correlation heatmaps.
          </div>
        </div>
      </div>
    </div>
  );
}
