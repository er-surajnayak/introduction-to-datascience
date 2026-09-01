'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Layers,
  ArrowRight,
  Restart,
  CheckmarkOutline,
} from '@carbon/icons-react';

interface VariableEntry {
  name: string;
  type: string;
  value: string;
  size: string;
}

const executionSteps = [
  {
    stepIndex: 1,
    code: 'x = 10',
    description: 'Allocated integer variable x in RAM.',
    addedVar: { name: 'x', type: 'int', value: '10', size: '28 bytes' },
  },
  {
    stepIndex: 2,
    code: 'name = "Aisha"',
    description: 'Allocated string variable name in RAM.',
    addedVar: { name: 'name', type: 'str', value: '"Aisha"', size: '54 bytes' },
  },
  {
    stepIndex: 3,
    code: 'marks = [80, 90, 70]',
    description: 'Allocated list object containing 3 numeric elements in RAM.',
    addedVar: { name: 'marks', type: 'list', value: '[80, 90, 70]', size: '3 elements (88 bytes)' },
  },
  {
    stepIndex: 4,
    code: 'average = sum(marks) / len(marks)',
    description: 'Computed float average from marks and stored in RAM.',
    addedVar: { name: 'average', type: 'float', value: '80.0', size: '24 bytes' },
  },
];

export function KernelStateVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const activeVariables: VariableEntry[] = executionSteps
    .slice(0, currentStep)
    .map((s) => s.addedVar);

  const handleNextStep = () => {
    if (currentStep < executionSteps.length) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleResetKernel = () => {
    setCurrentStep(0);
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
            Interactive Experience 4
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Kernel State & Memory Namespace Inspector
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button kind="ghost" size="sm" renderIcon={Restart} onClick={handleResetKernel}>
            Restart Kernel (Wipe RAM)
          </Button>
          <Tag type={activeVariables.length > 0 ? 'teal' : 'cool-gray'} size="md">
            Active Variables: {activeVariables.length}
          </Tag>
        </div>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        As you execute cells, the background Kernel maintains a persistent symbol table in memory. Step through the execution sequence below:
      </p>

      {/* Control Step Actions */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Button
          size="md"
          kind="primary"
          renderIcon={ArrowRight}
          disabled={currentStep >= executionSteps.length}
          onClick={handleNextStep}
        >
          {currentStep === 0
            ? 'Execute Step 1 (x = 10)'
            : currentStep < executionSteps.length
            ? `Execute Step ${currentStep + 1} (${executionSteps[currentStep].code})`
            : 'All Steps Executed'}
        </Button>
      </div>

      {/* 2-Column: Current Code vs Kernel RAM Table */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* Left: Current Executed Step */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', marginBottom: '8px' }}>
            LAST EXECUTED CELL
          </div>
          {currentStep > 0 ? (
            <div>
              <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', color: 'var(--ds-text-primary)', marginBottom: '6px' }}>
                In [{currentStep}]: {executionSteps[currentStep - 1].code}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: 0 }}>
                {executionSteps[currentStep - 1].description}
              </p>
            </div>
          ) : (
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', fontStyle: 'italic' }}>
              Kernel is in fresh state. No cells have been executed yet.
            </div>
          )}
        </div>

        {/* Right: Active Kernel Symbol Table */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface)',
            border: '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
              %whos (ACTIVE KERNEL SYMBOL TABLE)
            </span>
            <Tag type={activeVariables.length > 0 ? 'green' : 'cool-gray'} size="sm">
              {activeVariables.length > 0 ? 'Memory Allocated' : 'Empty'}
            </Tag>
          </div>

          {activeVariables.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeVariables.map((v, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 12px',
                    background: 'var(--ds-bg-surface-elevated)',
                    border: '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <strong style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontSize: '0.9375rem' }}>
                      {v.name}
                    </strong>
                    <Tag type="purple" size="sm">{v.type}</Tag>
                  </div>
                  <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem', color: 'var(--ds-emerald)' }}>
                    {v.value}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '1.5rem 0', textAlign: 'center', color: 'var(--ds-text-muted)', fontSize: '0.8125rem' }}>
              No variables stored. Click "Execute Step" to allocate memory.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
