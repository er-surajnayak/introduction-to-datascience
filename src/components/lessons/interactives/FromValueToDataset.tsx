'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  DataEnrichment,
  Grid,
  Row,
  TableSplit,
  ArrowRight,
} from '@carbon/icons-react';

interface BridgeStage {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  codeSnippet: string;
  memoryRepresentation: React.ReactNode;
  dataScienceRole: string;
  explanation: string;
}

const bridgeStages: BridgeStage[] = [
  {
    id: 1,
    title: 'Stage 1: Single Scalar Variable',
    subtitle: 'Atomic Value in Memory',
    icon: <DataEnrichment size={20} />,
    codeSnippet: 'age = 20\ncgpa = 8.7\nname = "Aisha"',
    memoryRepresentation: (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ padding: '8px 14px', background: 'var(--ds-bg-surface-elevated)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>name</div>
          <div style={{ fontSize: '1rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-cyan)' }}>"Aisha"</div>
        </div>
        <div style={{ padding: '8px 14px', background: 'var(--ds-bg-surface-elevated)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>age</div>
          <div style={{ fontSize: '1rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-teal)' }}>20</div>
        </div>
        <div style={{ padding: '8px 14px', background: 'var(--ds-bg-surface-elevated)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>cgpa</div>
          <div style={{ fontSize: '1rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-purple)' }}>8.7</div>
        </div>
      </div>
    ),
    dataScienceRole: 'Stores single constants, user input flags, hyperparameters (e.g. learning_rate = 0.01).',
    explanation: 'A single variable holds one atomic data point. It represents the foundational building block of all computation.',
  },
  {
    id: 2,
    title: 'Stage 2: Python List Collection',
    subtitle: '1D Array of Object Pointers',
    icon: <Row size={20} />,
    codeSnippet: 'ages = [20, 21, 19, 22, 20]\nnames = ["Aisha", "Rahul", "Sneha", "Vikram", "Pooja"]',
    memoryRepresentation: (
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {['"Aisha"', '"Rahul"', '"Sneha"', '"Vikram"', '"Pooja"'].map((name, i) => (
          <div
            key={i}
            style={{
              padding: '6px 10px',
              background: 'var(--ds-bg-surface-elevated)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '3px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--ds-cyan)',
            }}
          >
            <div style={{ fontSize: '0.625rem', color: 'var(--ds-text-muted)' }}>[{i}]</div>
            {name}
          </div>
        ))}
      </div>
    ),
    dataScienceRole: 'Holds dynamic sequence collections in standard Python scripts.',
    explanation: 'Python lists group multiple values, but store them as pointers to separate objects on the heap, which causes computational overhead.',
  },
  {
    id: 3,
    title: 'Stage 3: NumPy 1D Vector',
    subtitle: 'Contiguous C-Memory Buffer (SIMD Math)',
    icon: <Grid size={20} />,
    codeSnippet: 'import numpy as np\nages_vector = np.array([20, 21, 19, 22, 20], dtype=np.int64)\n# Multiply entire array in 1 CPU cycle:\nages_next_year = ages_vector + 1',
    memoryRepresentation: (
      <div style={{ display: 'inline-flex', border: '1.5px solid var(--ds-teal)', borderRadius: '4px', overflow: 'hidden' }}>
        {[20, 21, 19, 22, 20].map((num, i) => (
          <div
            key={i}
            style={{
              padding: '8px 12px',
              background: 'var(--ds-teal-dim)',
              borderRight: i < 4 ? '1px solid var(--ds-teal)' : 'none',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--ds-teal)',
            }}
          >
            {num}
          </div>
        ))}
      </div>
    ),
    dataScienceRole: 'The numerical backbone of machine learning (linear algebra, matrix multiplication, gradients).',
    explanation: 'NumPy eliminates Python pointer overhead by packing raw homogeneous 64-bit numbers into contiguous memory blocks for 50x faster execution.',
  },
  {
    id: 4,
    title: 'Stage 4: Pandas 2D DataFrame',
    subtitle: 'Multi-Column Tabular Matrix',
    icon: <TableSplit size={20} />,
    codeSnippet: 'import pandas as pd\ndf = pd.DataFrame({\n    "Name": ["Aisha", "Rahul", "Sneha"],\n    "Age": [20, 21, 19],\n    "CGPA": [8.7, 7.9, 9.2]\n})',
    memoryRepresentation: (
      <div style={{ maxWidth: '360px', margin: '0 auto', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--ds-bg-surface-elevated)', padding: '6px 10px', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, borderBottom: '1px solid var(--ds-border-subtle)' }}>
          <span>Name (str)</span>
          <span>Age (int)</span>
          <span>CGPA (float)</span>
        </div>
        {[
          { name: 'Aisha', age: 20, cgpa: 8.7 },
          { name: 'Rahul', age: 21, cgpa: 7.9 },
          { name: 'Sneha', age: 19, cgpa: 9.2 },
        ].map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '6px 10px', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', borderBottom: i < 2 ? '1px solid var(--ds-border-subtle)' : 'none', background: 'var(--ds-bg-surface)' }}>
            <span style={{ color: 'var(--ds-cyan)' }}>{row.name}</span>
            <span style={{ color: 'var(--ds-teal)' }}>{row.age}</span>
            <span style={{ color: 'var(--ds-purple)' }}>{row.cgpa}</span>
          </div>
        ))}
      </div>
    ),
    dataScienceRole: 'The industry standard format for tabular datasets, feature tables, and EDA.',
    explanation: 'Pandas combines labeled column vectors into a relational table with SQL-like joins, groupby aggregations, and missing value imputation.',
  },
];

export function FromValueToDataset() {
  const [activeStageId, setActiveStageId] = useState<number>(1);

  const current = bridgeStages.find((s) => s.id === activeStageId) || bridgeStages[0];

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
      {/* Top Header */}
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
            Interactive Experience 6
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            From Single Variable to Data Science Tables
          </h3>
        </div>
        <Tag type="teal" size="md">
          Evolutionary Bridge
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        See how atomic Python variables scale step-by-step into the high-performance multi-dimensional structures used in Data Science:
      </p>

      {/* 4 Stepper Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
          marginBottom: '1.75rem',
        }}
      >
        {bridgeStages.map((stage) => {
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStageId(stage.id)}
              style={{
                padding: '10px 8px',
                background: isActive ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                border: isActive ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                color: isActive ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ color: isActive ? 'var(--ds-cyan)' : 'var(--ds-text-muted)', marginBottom: '2px' }}>
                {stage.icon}
              </div>
              <div>{stage.title}</div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            padding: '1.5rem',
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h4 style={{ fontSize: '1.1875rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
                {current.title}
              </h4>
              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
                {current.subtitle}
              </div>
            </div>
            <Tag type="cyan" size="md">
              Stage 0{current.id} of 04
            </Tag>
          </div>

          {/* 2-Column Split: Code vs Visual Memory */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            {/* Code Snippet */}
            <div
              style={{
                padding: '1rem',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Python Code Definition
              </div>
              <pre
                style={{
                  margin: 0,
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--ds-text-primary)',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {current.codeSnippet}
              </pre>
            </div>

            {/* Visual Memory Representation */}
            <div
              style={{
                padding: '1rem',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-teal)', textTransform: 'uppercase', marginBottom: '10px' }}>
                Memory Organization Architecture
              </div>
              {current.memoryRepresentation}
            </div>
          </div>

          {/* Explanation */}
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
            {current.explanation}
          </p>

          {/* Data Science Role Callout */}
          <div
            style={{
              padding: '10px 14px',
              background: 'var(--ds-bg-surface)',
              borderLeft: '3px solid var(--ds-cyan)',
              borderRadius: '0 4px 4px 0',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
            }}
          >
            <strong style={{ color: 'var(--ds-text-primary)' }}>Role in Data Science:</strong>{' '}
            {current.dataScienceRole}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
