'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  PlayFilledAlt,
  Restart,
  Code,
  Document,
  PlayOutline,
} from '@carbon/icons-react';

interface SimulatedCell {
  id: number;
  type: 'code' | 'markdown';
  header?: string;
  source: string;
  output?: string;
  executionCounter?: number;
  status: 'idle' | 'running' | 'executed';
}

const initialNotebook: SimulatedCell[] = [
  {
    id: 1,
    type: 'markdown',
    source: '# 📊 DS-201: Student Performance Benchmark\nIn this notebook, we analyze the exam scores of 5 engineering students and calculate class averages.',
    status: 'executed',
  },
  {
    id: 2,
    type: 'code',
    source: 'marks = [78, 85, 91, 67, 88]\nprint(f"Dataset successfully loaded: {len(marks)} student records.")',
    output: 'Dataset successfully loaded: 5 student records.',
    status: 'idle',
  },
  {
    id: 3,
    type: 'code',
    source: 'class_avg = sum(marks) / len(marks)\nhighest_score = max(marks)\nlowest_score = min(marks)\n\n# Auto-display summary tuple:\n(class_avg, highest_score, lowest_score)',
    output: '(81.8, 91, 67)',
    status: 'idle',
  },
  {
    id: 4,
    type: 'code',
    source: 'above_avg = [m for m in marks if m >= class_avg]\nprint(f"Students above class average: {len(above_avg)} ({len(above_avg)/len(marks)*100:.0f}%)")',
    output: 'Students above class average: 3 (60%)',
    status: 'idle',
  },
  {
    id: 5,
    type: 'markdown',
    source: '## 💡 Key Analytical Observations\n- The class average is **81.8%** with a score spread of **24 points** (67% to 91%).\n- **60%** of students scored above the class average.',
    status: 'executed',
  },
];

export function JupyterSimulator() {
  const [cells, setCells] = useState<SimulatedCell[]>(initialNotebook);
  const [globalExecutionCount, setGlobalExecutionCount] = useState<number>(1);

  const handleRunCell = (cellId: number) => {
    const currentCount = globalExecutionCount;

    setCells((prev) =>
      prev.map((c) => {
        if (c.id === cellId && c.type === 'code') {
          return {
            ...c,
            status: 'executed',
            executionCounter: currentCount,
          };
        }
        return c;
      })
    );

    setGlobalExecutionCount((c) => c + 1);
  };

  const handleRunAll = () => {
    let count = globalExecutionCount;
    setCells((prev) =>
      prev.map((c) => {
        if (c.type === 'code') {
          const updated = {
            ...c,
            status: 'executed' as const,
            executionCounter: count,
          };
          count++;
          return updated;
        }
        return c;
      })
    );
    setGlobalExecutionCount(count);
  };

  const handleRestartKernel = () => {
    setGlobalExecutionCount(1);
    setCells((prev) =>
      prev.map((c) => {
        if (c.type === 'code') {
          return {
            ...c,
            status: 'idle' as const,
            executionCounter: undefined,
          };
        }
        return c;
      })
    );
  };

  const executedCodeCount = cells.filter((c) => c.type === 'code' && c.status === 'executed').length;
  const totalCodeCount = cells.filter((c) => c.type === 'code').length;

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2.5rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
            }}
          >
            Interactive Experience 5 — Primary Simulator
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Your First Data Science Notebook Simulator
          </h3>
        </div>
        <Tag type={executedCodeCount === totalCodeCount ? 'green' : 'blue'} size="md">
          Progress: {executedCodeCount} / {totalCodeCount} Code Cells Run
        </Tag>
      </div>

      {/* Toolbar Controls */}
      <div
        style={{
          padding: '8px 12px',
          background: 'var(--ds-bg-surface-elevated)',
          border: '1px solid var(--ds-border-subtle)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="sm"
            kind="primary"
            renderIcon={PlayFilledAlt}
            onClick={handleRunAll}
          >
            Run All Cells
          </Button>
          <Button
            size="sm"
            kind="ghost"
            renderIcon={Restart}
            onClick={handleRestartKernel}
          >
            Restart Kernel
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ds-emerald)' }} />
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-secondary)' }}>
            Kernel: Python 3.12 (Active)
          </span>
        </div>
      </div>

      {/* Notebook Document Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {cells.map((cell) => {
          if (cell.type === 'markdown') {
            return (
              <div
                key={cell.id}
                style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--ds-bg-surface)',
                  borderLeft: '4px solid var(--ds-purple)',
                  borderRadius: '0 4px 4px 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Document size={14} style={{ color: 'var(--ds-purple)' }} />
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)', textTransform: 'uppercase' }}>
                    Markdown Cell
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--ds-text-primary)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.5,
                  }}
                >
                  {cell.source}
                </div>
              </div>
            );
          }

          const isExecuted = cell.status === 'executed';

          return (
            <div
              key={cell.id}
              style={{
                border: isExecuted ? '1px solid var(--ds-border-strong)' : '1px dashed var(--ds-border-subtle)',
                borderRadius: '4px',
                background: 'var(--ds-bg-surface)',
                overflow: 'hidden',
              }}
            >
              {/* Code Input Header & Actions */}
              <div
                style={{
                  padding: '8px 12px',
                  background: 'var(--ds-bg-surface-elevated)',
                  borderBottom: '1px solid var(--ds-border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: isExecuted ? 'var(--ds-cyan)' : 'var(--ds-text-muted)',
                    }}
                  >
                    In [{cell.executionCounter ?? ' '}]:
                  </span>
                  <Tag type={isExecuted ? 'cyan' : 'cool-gray'} size="sm">
                    {isExecuted ? 'Executed' : 'Not Run'}
                  </Tag>
                </div>

                <Button
                  size="sm"
                  kind="ghost"
                  renderIcon={PlayFilledAlt}
                  onClick={() => handleRunCell(cell.id)}
                >
                  Run Cell
                </Button>
              </div>

              {/* Code Editor Body */}
              <div
                style={{
                  padding: '12px 16px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  color: 'var(--ds-text-primary)',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.45,
                }}
              >
                {cell.source}
              </div>

              {/* Output Container */}
              {isExecuted && cell.output && (
                <div
                  style={{
                    padding: '10px 16px',
                    background: 'var(--ds-bg-core)',
                    borderTop: '1px solid var(--ds-border-subtle)',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                    Out [{cell.executionCounter}]:
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--ds-emerald)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {cell.output}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
