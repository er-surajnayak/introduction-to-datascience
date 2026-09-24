'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  DecisionTree,
  CheckmarkFilled,
  ArrowRight,
  Restart,
  Help,
  Information,
} from '@carbon/icons-react';

interface PresetItem {
  id: string;
  name: string;
  sample: string;
  path: string[];
  finalClassification: string;
  explanation: string;
}

const presetItems: PresetItem[] = [
  {
    id: 'siblings',
    name: 'Number of Siblings',
    sample: '2',
    path: ['Quantity? -> YES', 'Count or Measurement? -> Count', 'Numerical (Discrete)'],
    finalClassification: 'Numerical ➔ Discrete',
    explanation: 'Represents a countable whole integer count of people.',
  },
  {
    id: 'temperature',
    name: 'Sensor Temperature',
    sample: '28.63 °C',
    path: ['Quantity? -> YES', 'Count or Measurement? -> Continuous Measurement', 'Numerical (Continuous)'],
    finalClassification: 'Numerical ➔ Continuous',
    explanation: 'Continuous physical thermodynamic measurement taking infinite fractional values.',
  },
  {
    id: 'city',
    name: 'Metro City',
    sample: '"Bengaluru"',
    path: ['Quantity? -> NO', 'Category / Group? -> YES', 'Meaningful Order? -> NO (Unordered)', 'Categorical (Nominal)'],
    finalClassification: 'Categorical ➔ Nominal',
    explanation: 'Unordered geographical category with no inherent mathematical ranking.',
  },
  {
    id: 'feedback',
    name: 'Feedback Rating',
    sample: '"Excellent"',
    path: ['Quantity? -> NO', 'Category / Group? -> YES', 'Meaningful Order? -> YES (Ranked)', 'Categorical (Ordinal)'],
    finalClassification: 'Categorical ➔ Ordinal',
    explanation: 'Ordered category: Excellent > Very Good > Good > Fair > Poor.',
  },
  {
    id: 'is_active',
    name: 'Is Enrolled Flag',
    sample: 'True',
    path: ['Quantity? -> NO', 'Category / Group? -> NO', 'True / False Binary? -> YES', 'Boolean'],
    finalClassification: 'Boolean (Binary Indicator)',
    explanation: 'Binary logical flag with exactly two possible states (True / False).',
  },
  {
    id: 'review',
    name: 'Customer Review',
    sample: '"Fast delivery!"',
    path: ['Quantity? -> NO', 'Category / Group? -> NO', 'True / False Binary? -> NO', 'Free-form Language? -> YES', 'Text'],
    finalClassification: 'Unstructured Text',
    explanation: 'High-dimensional natural human language string requiring NLP vectorization.',
  },
  {
    id: 'timestamp',
    name: 'Order Timestamp',
    sample: '"2026-09-24 14:32"',
    path: ['Quantity? -> NO', 'Category / Group? -> NO', 'True / False Binary? -> NO', 'Free-form Language? -> NO', 'Temporal Date/Time? -> YES', 'Datetime'],
    finalClassification: 'Datetime Coordinate',
    explanation: 'Temporal timestamp enabling time-series decomposition and chronological sequencing.',
  },
];

export function DataTypeDecisionTree() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('siblings');
  const activePreset = presetItems.find((p) => p.id === selectedPresetId) || presetItems[0];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Interactive 11
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Data Type Decision Tree
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
          Interactive Classification Flow
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Visual Decision Tree: How to Classify Any Data Point
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        When encountering an unfamiliar variable in a dataset, systematically trace its properties down the classification hierarchy. Select a sample variable below to watch the decision tree highlight its classification trajectory.
      </p>

      {/* Preset Selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {presetItems.map((item) => {
          const isSelected = item.id === selectedPresetId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedPresetId(item.id)}
              style={{
                padding: '8px 10px',
                borderRadius: '4px',
                border: isSelected ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface-elevated)',
                color: isSelected ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
                fontSize: '0.75rem',
                fontWeight: isSelected ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div>{item.name}</div>
              <code style={{ fontSize: '0.6875rem', color: isSelected ? 'var(--ds-text-primary)' : 'var(--ds-text-muted)' }}>
                {item.sample}
              </code>
            </button>
          );
        })}
      </div>

      {/* Tree Traversal Visualizer */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Active Traversal Path: {activePreset.name} (Sample: {activePreset.sample})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '1rem 0' }}>
          {activePreset.path.map((step, idx) => {
            const isFinal = idx === activePreset.path.length - 1;
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  background: isFinal ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface)',
                  border: isFinal ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: isFinal ? 'var(--ds-emerald)' : 'var(--ds-cyan)',
                    color: '#161616',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </span>

                <span style={{ fontSize: '0.8125rem', fontWeight: isFinal ? 600 : 400, color: isFinal ? 'var(--ds-emerald)' : 'var(--ds-text-primary)' }}>
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div
          style={{
            padding: '10px 14px',
            background: 'var(--ds-bg-surface)',
            borderRadius: '4px',
            borderLeft: '4px solid var(--ds-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
              Final Analytical Verdict
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              {activePreset.finalClassification}
            </div>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', maxWidth: '400px' }}>
            {activePreset.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}
