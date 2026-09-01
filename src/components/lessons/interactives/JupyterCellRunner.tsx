'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { PlayFilledAlt, Restart, Code } from '@carbon/icons-react';

interface NotebookCell {
  id: number;
  type: 'code' | 'markdown';
  code: string;
  output?: string;
  executionCount?: number;
  status: 'idle' | 'running' | 'done';
}

export function JupyterCellRunner() {
  const [executionGlobal, setExecutionGlobal] = useState(1);
  const [cells, setCells] = useState<NotebookCell[]>([
    {
      id: 1,
      type: 'code',
      code: `import numpy as np\n# Define raw sensor data matrix\nreadings = np.array([14.2, 19.5, 23.8, 28.1])\nprint("Dataset shape:", readings.shape)\nprint("Mean temperature:", np.mean(readings))`,
      output: 'Dataset shape: (4,)\nMean temperature: 21.4',
      executionCount: 1,
      status: 'done',
    },
    {
      id: 2,
      type: 'code',
      code: `%timeit np.sum(readings ** 2)`,
      output: '640 ns ± 12.3 ns per loop (mean ± std. dev. of 7 runs, 1,000,000 loops each)',
      status: 'idle',
    },
  ]);

  const runCell = (cellId: number) => {
    setCells((prev) =>
      prev.map((c) => {
        if (c.id === cellId) {
          return {
            ...c,
            status: 'done',
            executionCount: executionGlobal,
          };
        }
        return c;
      })
    );
    setExecutionGlobal((g) => g + 1);
  };

  const restartKernel = () => {
    setExecutionGlobal(1);
    setCells((prev) =>
      prev.map((c) => ({
        ...c,
        status: 'idle',
        executionCount: undefined,
      }))
    );
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Lab 1.6
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            Interactive Jupyter Notebook & Kernel State Simulator
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button kind="ghost" size="sm" renderIcon={Restart} onClick={restartKernel}>
            Restart Kernel
          </Button>
          <Tag type="cyan" size="md">Kernel: Python 3.12 (Idle)</Tag>
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Test cell execution order. Notice how the execution counter `In [N]` increments chronologically with each cell you trigger.
      </p>

      {/* Notebook Cells Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {cells.map((cell) => (
          <div
            key={cell.id}
            style={{
              border: '1px solid var(--ds-border-strong)',
              borderRadius: '4px',
              background: 'var(--cds-layer-01)',
              overflow: 'hidden',
            }}
          >
            {/* Cell Code Area */}
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              {/* In [N] Gutter */}
              <div
                style={{
                  width: '90px',
                  padding: '10px 8px',
                  background: 'var(--cds-layer-02)',
                  borderRight: '1px solid var(--ds-border-subtle)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.75rem',
                  color: cell.executionCount ? 'var(--ds-cyan)' : 'var(--ds-text-muted)',
                  textAlign: 'right',
                  userSelect: 'none',
                }}
              >
                In [{cell.executionCount || ' '}]:
              </div>

              {/* Code Editor Body */}
              <div style={{ flexGrow: 1, padding: '10px 14px', fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  <code>{cell.code}</code>
                </pre>
              </div>

              {/* Run Trigger */}
              <div style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                <Button
                  kind="ghost"
                  size="sm"
                  hasIconOnly
                  renderIcon={PlayFilledAlt}
                  iconDescription="Run cell"
                  onClick={() => runCell(cell.id)}
                />
              </div>
            </div>

            {/* Cell Output Area */}
            {cell.status === 'done' && cell.output && (
              <div
                style={{
                  display: 'flex',
                  borderTop: '1px solid var(--ds-border-subtle)',
                  background: 'var(--cds-layer-02)',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    padding: '8px',
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '0.75rem',
                    color: '#fa4d56',
                    textAlign: 'right',
                    userSelect: 'none',
                  }}
                >
                  Out [{cell.executionCount}]:
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    padding: '8px 14px',
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--ds-text-primary)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {cell.output}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
