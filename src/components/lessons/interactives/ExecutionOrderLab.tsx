'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  PlayFilledAlt,
  Restart,
  WarningAlt,
  CheckmarkOutline,
} from '@carbon/icons-react';

interface CellState {
  executionOrder?: number;
  output?: string;
  isError?: boolean;
}

export function ExecutionOrderLab() {
  const [globalStep, setGlobalStep] = useState<number>(1);
  const [kernelX, setKernelX] = useState<number | undefined>(undefined);
  const [cellStates, setCellStates] = useState<Record<string, CellState>>({
    A: {},
    B: {},
    C: {},
  });

  const handleRunCell = (cellId: 'A' | 'B' | 'C') => {
    const currentStep = globalStep;

    if (cellId === 'A') {
      setKernelX(10);
      setCellStates((prev) => ({
        ...prev,
        A: { executionOrder: currentStep, output: '# x initialized to 10 in Kernel RAM' },
      }));
    } else if (cellId === 'B') {
      if (kernelX === undefined) {
        setCellStates((prev) => ({
          ...prev,
          B: {
            executionOrder: currentStep,
            output: "NameError: name 'x' is not defined\n--> 1 x = x + 5",
            isError: true,
          },
        }));
      } else {
        const nextX = kernelX + 5;
        setKernelX(nextX);
        setCellStates((prev) => ({
          ...prev,
          B: {
            executionOrder: currentStep,
            output: `# x updated from ${kernelX} to ${nextX}`,
            isError: false,
          },
        }));
      }
    } else if (cellId === 'C') {
      if (kernelX === undefined) {
        setCellStates((prev) => ({
          ...prev,
          C: {
            executionOrder: currentStep,
            output: "NameError: name 'x' is not defined\n--> 1 result = x * 2",
            isError: true,
          },
        }));
      } else {
        const res = kernelX * 2;
        setCellStates((prev) => ({
          ...prev,
          C: {
            executionOrder: currentStep,
            output: `${res}`,
            isError: false,
          },
        }));
      }
    }

    setGlobalStep((s) => s + 1);
  };

  const handleReset = () => {
    setGlobalStep(1);
    setKernelX(undefined);
    setCellStates({ A: {}, B: {}, C: {} });
  };

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
            Interactive Experience 3
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Execution Order Lab: The Out-of-Order Trap
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button kind="ghost" size="sm" renderIcon={Restart} onClick={handleReset}>
            Restart Kernel
          </Button>
          <Tag type={kernelX !== undefined ? 'green' : 'cool-gray'} size="md">
            Kernel RAM: x = {kernelX !== undefined ? kernelX : 'undefined'}
          </Tag>
        </div>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Try running <strong>Cell C</strong> or <strong>Cell B</strong> before running <strong>Cell A</strong>. Notice that on-screen text does not exist in memory until its cell is executed by the Kernel:
      </p>

      {/* 3 Cells Vertical Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Cell A */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--ds-bg-surface)',
            border: '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-cyan)', fontWeight: 700 }}>
                In [{cellStates.A.executionOrder ?? ' '}]:
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Cell A (Initialization)</span>
            </div>
            <Button
              size="sm"
              kind="tertiary"
              renderIcon={PlayFilledAlt}
              onClick={() => handleRunCell('A')}
            >
              Run Cell A
            </Button>
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', padding: '8px 12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
            x = 10
          </div>
          {cellStates.A.output && (
            <div style={{ marginTop: '6px', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
              {cellStates.A.output}
            </div>
          )}
        </div>

        {/* Cell B */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--ds-bg-surface)',
            border: cellStates.B.isError ? '1.5px solid #da1e28' : '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-purple)', fontWeight: 700 }}>
                In [{cellStates.B.executionOrder ?? ' '}]:
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Cell B (Mutation)</span>
            </div>
            <Button
              size="sm"
              kind="tertiary"
              renderIcon={PlayFilledAlt}
              onClick={() => handleRunCell('B')}
            >
              Run Cell B
            </Button>
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', padding: '8px 12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
            x = x + 5
          </div>
          {cellStates.B.output && (
            <div
              style={{
                marginTop: '6px',
                fontSize: '0.75rem',
                fontFamily: 'var(--ds-font-mono)',
                color: cellStates.B.isError ? '#da1e28' : 'var(--ds-text-muted)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {cellStates.B.output}
            </div>
          )}
        </div>

        {/* Cell C */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--ds-bg-surface)',
            border: cellStates.C.isError ? '1.5px solid #da1e28' : '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-teal)', fontWeight: 700 }}>
                In [{cellStates.C.executionOrder ?? ' '}]:
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Cell C (Calculation & Display)</span>
            </div>
            <Button
              size="sm"
              kind="tertiary"
              renderIcon={PlayFilledAlt}
              onClick={() => handleRunCell('C')}
            >
              Run Cell C
            </Button>
          </div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.9375rem', padding: '8px 12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
            x * 2
          </div>
          {cellStates.C.output && (
            <div
              style={{
                marginTop: '6px',
                padding: '6px 10px',
                background: cellStates.C.isError ? 'rgba(218, 30, 40, 0.1)' : 'var(--ds-bg-surface-elevated)',
                borderRadius: '4px',
                fontSize: '0.8125rem',
                fontFamily: 'var(--ds-font-mono)',
                fontWeight: 700,
                color: cellStates.C.isError ? '#da1e28' : 'var(--ds-emerald)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {cellStates.C.isError ? cellStates.C.output : `Out [${cellStates.C.executionOrder}]: ${cellStates.C.output}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
