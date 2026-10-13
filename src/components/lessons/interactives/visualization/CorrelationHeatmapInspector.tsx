'use client';

import React, { useState } from 'react';
import { Tag, CodeSnippet } from '@carbon/react';
import { computeCorrelationMatrix } from '@/lib/visualizationUtils';

const COLUMNS = [
  { name: 'StudyHours', values: [3, 5, 2, 6, 4, 7, 5, 3] },
  { name: 'Marks', values: [65, 82, 55, 92, 74, 95, 85, 62] },
  { name: 'Attendance', values: [78, 88, 70, 96, 84, 92, 90, 75] },
];

export function CorrelationHeatmapInspector() {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number }>({ row: 0, col: 1 });

  const { names, matrix } = computeCorrelationMatrix(COLUMNS);

  const getCellColor = (val: number) => {
    // Diverging colormap simulation from -1 (blue) through 0 (white) to +1 (red/coral)
    if (val >= 0) {
      const alpha = Math.min(1, Math.max(0.1, val));
      return `rgba(218, 30, 40, ${alpha * 0.85})`; // Carbon red
    } else {
      const alpha = Math.min(1, Math.max(0.1, Math.abs(val)));
      return `rgba(15, 98, 254, ${alpha * 0.85})`; // Carbon blue
    }
  };

  const currentVal = matrix[selectedCell.row][selectedCell.col];
  const rowName = names[selectedCell.row];
  const colName = names[selectedCell.col];

  const pythonCode = `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "StudyHours": [3, 5, 2, 6, 4, 7, 5, 3],
    "Marks": [65, 82, 55, 92, 74, 95, 85, 62],
    "Attendance": [78, 88, 70, 96, 84, 92, 90, 75]
})

# Compute Pearson correlation matrix
corr = df.corr(numeric_only=True)

fig, ax = plt.subplots(figsize=(6, 5))

# Render annotated diverging correlation heatmap
sns.heatmap(
    corr,
    annot=True,
    cmap="coolwarm",
    vmin=-1,
    vmax=1,
    fmt=".2f",
    linewidths=1.0,
    cbar_kws={"label": "Pearson Correlation (r)"},
    ax=ax
)

ax.set_title("Correlation Heatmap: Student Metrics")
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
          <Tag type="purple" size="md">Section 3.3.19</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Correlation Heatmaps</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
          Matrix Geometry &bull; Diverging Scales &bull; Multicollinearity
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Heatmap Inspector: Scanning Multivariable Relationships
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        A correlation heatmap maps a symmetric matrix of Pearson coefficients onto an annotated color grid. Click any cell to inspect the pairwise co-movement between variables.
      </p>

      {/* Grid: Heatmap Grid + Cell Detail */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Heatmap Grid */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '12px' }}>
            Interactive 3&times;3 Correlation Matrix
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(3, 1fr)', gap: '4px' }}>
            <div />
            {names.map((n, idx) => (
              <div key={idx} style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', textAlign: 'center', color: 'var(--ds-cyan)', padding: '4px' }}>
                {n}
              </div>
            ))}

            {names.map((rowName, rIdx) => (
              <React.Fragment key={rIdx}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', display: 'flex', alignItems: 'center', color: 'var(--ds-cyan)', paddingRight: '4px' }}>
                  {rowName}
                </div>
                {matrix[rIdx].map((val, cIdx) => {
                  const isSelected = selectedCell.row === rIdx && selectedCell.col === cIdx;
                  return (
                    <button
                      key={cIdx}
                      onClick={() => setSelectedCell({ row: rIdx, col: cIdx })}
                      style={{
                        height: '52px',
                        background: getCellColor(val),
                        border: isSelected ? '2px solid #ffffff' : '1px solid var(--ds-border-subtle)',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--ds-font-mono)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {val.toFixed(2)}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Selected Cell Inspection Card */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            borderLeft: '4px solid var(--ds-purple)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Selected Relationship:
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            {rowName} &harr; {colName}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: currentVal > 0.7 ? 'var(--ds-emerald)' : 'var(--ds-cyan)', marginBottom: '8px' }}>
            r = {currentVal.toFixed(2)}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, margin: 0 }}>
            {rowName === colName
              ? 'Self-correlation is always exactly 1.0 (perfect diagonal identity).'
              : currentVal > 0.8
              ? `Strong positive linear association: higher ${rowName} is consistently paired with higher ${colName}.`
              : `Moderate co-movement between ${rowName} and ${colName}.`}
          </p>
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
