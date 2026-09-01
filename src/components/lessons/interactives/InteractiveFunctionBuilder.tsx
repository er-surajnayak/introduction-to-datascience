'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, NumberInput } from '@carbon/react';
import {
  Tools,
  Code,
  ArrowRight,
} from '@carbon/icons-react';

interface FunctionRecipe {
  id: string;
  name: string;
  signature: string;
  codeLines: string[];
  param1Label: string;
  param1Default: number;
  param2Label?: string;
  param2Default?: number;
  compute: (p1: number, p2?: number) => number;
  unit?: string;
}

const recipes: FunctionRecipe[] = [
  {
    id: 'square',
    name: 'square(x)',
    signature: 'def square(x):',
    codeLines: ['def square(x):', '    return x * x'],
    param1Label: 'Input Value (x)',
    param1Default: 5,
    compute: (x) => x * x,
  },
  {
    id: 'c2f',
    name: 'celsius_to_fahr(c)',
    signature: 'def celsius_to_fahr(c):',
    codeLines: ['def celsius_to_fahr(c):', '    return (c * 9 / 5) + 32'],
    param1Label: 'Celsius Temperature (c)',
    param1Default: 100,
    compute: (c) => Math.round(((c * 9) / 5 + 32) * 100) / 100,
    unit: '°F',
  },
  {
    id: 'tax',
    name: 'calculate_tax(price, rate)',
    signature: 'def calculate_tax(price, rate=0.18):',
    codeLines: ['def calculate_tax(price, rate=0.18):', '    return price * (1 + rate)'],
    param1Label: 'Base Price (price)',
    param1Default: 500,
    param2Label: 'Tax Rate (rate)',
    param2Default: 0.18,
    compute: (p, r = 0.18) => Math.round(p * (1 + r) * 100) / 100,
    unit: '₹',
  },
  {
    id: 'discount',
    name: 'apply_discount(price, pct)',
    signature: 'def apply_discount(price, pct=20):',
    codeLines: ['def apply_discount(price, pct=20):', '    return price * (1 - pct / 100)'],
    param1Label: 'Original Price (price)',
    param1Default: 1000,
    param2Label: 'Discount Pct (pct)',
    param2Default: 20,
    compute: (p, pct = 20) => Math.round(p * (1 - pct / 100) * 100) / 100,
    unit: '₹',
  },
];

export function InteractiveFunctionBuilder() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('square');
  const [val1, setVal1] = useState<number>(5);
  const [val2, setVal2] = useState<number>(0.18);

  const activeRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];

  const handleSelectRecipe = (recipe: FunctionRecipe) => {
    setSelectedRecipeId(recipe.id);
    setVal1(recipe.param1Default);
    if (recipe.param2Default !== undefined) {
      setVal2(recipe.param2Default);
    }
  };

  const outputValue = activeRecipe.compute(val1, activeRecipe.param2Label ? val2 : undefined);

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
            Interactive Function Builder & Execution Workbench
          </h3>
        </div>
        <Tag type="teal" size="md">
          Function Workbench
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Choose a function recipe below, configure input argument numbers, and observe the live parameter binding and returned output:
      </p>

      {/* Recipe Selection Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {recipes.map((r) => {
          const isSelected = selectedRecipeId === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => handleSelectRecipe(r)}
              style={{
                padding: '8px 14px',
                background: isSelected ? 'var(--ds-teal-dim)' : 'var(--ds-bg-surface-elevated)',
                border: isSelected ? '2px solid var(--ds-teal)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? 'var(--ds-teal)' : 'var(--ds-text-primary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {r.name}
            </button>
          );
        })}
      </div>

      {/* 2-Column Code Definition vs Parameter Inputs & Result */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Code Definition Box */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
          }}
        >
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
            FUNCTION DEFINITION
          </div>
          {activeRecipe.codeLines.map((line, idx) => (
            <div key={idx} style={{ color: idx === 0 ? 'var(--ds-cyan)' : 'var(--ds-emerald)', fontWeight: 600, paddingLeft: idx === 1 ? '1.25rem' : '0' }}>
              {line}
            </div>
          ))}

          <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--ds-border-subtle)', paddingTop: '10px' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              INVOCATION CALL
            </div>
            <div style={{ color: 'var(--ds-purple)', fontWeight: 700 }}>
              result = {activeRecipe.name.split('(')[0]}({val1}
              {activeRecipe.param2Label ? `, ${val2}` : ''})
            </div>
          </div>
        </div>

        {/* Dynamic Parameter Sliders & Output Box */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface)',
            border: '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ marginBottom: '10px' }}>
              <NumberInput
                id="param-1"
                label={activeRecipe.param1Label}
                value={val1}
                step={activeRecipe.id === 'tax' ? 50 : 1}
                onChange={(_e, { value }) => setVal1(Number(value))}
              />
            </div>

            {activeRecipe.param2Label && (
              <div style={{ marginBottom: '10px' }}>
                <NumberInput
                  id="param-2"
                  label={activeRecipe.param2Label}
                  value={val2}
                  step={activeRecipe.id === 'tax' ? 0.01 : 5}
                  onChange={(_e, { value }) => setVal2(Number(value))}
                />
              </div>
            )}
          </div>

          {/* Computed Return Box */}
          <div
            style={{
              marginTop: '1rem',
              padding: '10px 14px',
              background: 'var(--ds-bg-surface-elevated)',
              border: '1.5px solid var(--ds-teal)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', fontFamily: 'var(--ds-font-mono)' }}>
              RETURNED VALUE:
            </span>
            <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-teal)' }}>
              {activeRecipe.unit ? `${activeRecipe.unit} ` : ''}
              {outputValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
