'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button, TextInput } from '@carbon/react';
import {
  Code,
  CheckmarkOutline,
  Information,
  Renew,
  PlayFilledAlt,
} from '@carbon/icons-react';

interface ParsedVariable {
  name: string;
  rawValue: string;
  formattedValue: string;
  type: 'int' | 'float' | 'str' | 'bool';
  typeLabel: string;
  badgeType: 'blue' | 'teal' | 'purple' | 'green';
  description: string;
}

// Controlled educational parser (NO eval, NO Function)
function parsePythonAssignment(codeStr: string): { success: true; variable: ParsedVariable } | { success: false; error: string } {
  const trimmed = codeStr.trim();
  if (!trimmed) {
    return { success: false, error: 'Please enter a variable assignment statement (e.g. age = 21)' };
  }

  const parts = trimmed.split('=');
  if (parts.length !== 2) {
    return { success: false, error: 'Statement must contain exactly one assignment operator "=" (e.g. name = "Aisha")' };
  }

  const rawName = parts[0].trim();
  const rawVal = parts[1].trim();

  // Validate identifier syntax
  const identifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
  if (!identifierRegex.test(rawName)) {
    return {
      success: false,
      error: `"${rawName}" is not a valid Python identifier. Names must start with a letter or underscore and contain no spaces.`,
    };
  }

  // Parse Booleans
  if (rawVal === 'True' || rawVal === 'False') {
    return {
      success: true,
      variable: {
        name: rawName,
        rawValue: rawVal,
        formattedValue: rawVal,
        type: 'bool',
        typeLabel: 'bool (Boolean State)',
        badgeType: 'green',
        description: `Stores binary truth value ${rawVal}. Used for flags, filter masks, and conditions.`,
      },
    };
  }

  // Parse Strings (quoted in single or double quotes)
  if (
    (rawVal.startsWith('"') && rawVal.endsWith('"') && rawVal.length >= 2) ||
    (rawVal.startsWith("'") && rawVal.endsWith("'") && rawVal.length >= 2)
  ) {
    const textContent = rawVal.slice(1, -1);
    return {
      success: true,
      variable: {
        name: rawName,
        rawValue: rawVal,
        formattedValue: `"${textContent}"`,
        type: 'str',
        typeLabel: 'str (Text String)',
        badgeType: 'purple',
        description: `Stores sequence of Unicode characters. Enclosed in quotes so Python treats it as text.`,
      },
    };
  }

  // Parse Integers (e.g. 21, -5, 100)
  if (/^-?\d+$/.test(rawVal)) {
    return {
      success: true,
      variable: {
        name: rawName,
        rawValue: rawVal,
        formattedValue: rawVal,
        type: 'int',
        typeLabel: 'int (Integer / Whole Number)',
        badgeType: 'blue',
        description: `Stores whole discrete numbers without decimal points. Used for counts, indexes, and ages.`,
      },
    };
  }

  // Parse Floats (e.g. 8.7, 3.1415, -0.5)
  if (/^-?\d+\.\d+$/.test(rawVal)) {
    return {
      success: true,
      variable: {
        name: rawName,
        rawValue: rawVal,
        formattedValue: rawVal,
        type: 'float',
        typeLabel: 'float (Floating-Point Decimal)',
        badgeType: 'teal',
        description: `Stores continuous real numbers with decimal precision. Used for CGPA, probabilities, and weights.`,
      },
    };
  }

  return {
    success: false,
    error: `Could not parse "${rawVal}". Try an integer (21), float (8.7), string ("Aisha"), or boolean (True/False).`,
  };
}

const presets = [
  { label: 'age = 20', code: 'age = 20' },
  { label: 'cgpa = 8.7', code: 'cgpa = 8.7' },
  { label: 'name = "Aisha"', code: 'name = "Aisha"' },
  { label: 'is_placed = False', code: 'is_placed = False' },
  { label: 'age = "20" (String)', code: 'age = "20"' },
  { label: 'score = 95.5', code: 'score = 95.5' },
];

export function VariableLab() {
  const [inputCode, setInputCode] = useState('age = 20');
  const [currentParsed, setCurrentParsed] = useState<ParsedVariable>({
    name: 'age',
    rawValue: '20',
    formattedValue: '20',
    type: 'int',
    typeLabel: 'int (Integer / Whole Number)',
    badgeType: 'blue',
    description: 'Stores whole discrete numbers without decimal points. Used for counts, indexes, and ages.',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleExecute = (codeToRun: string) => {
    const result = parsePythonAssignment(codeToRun);
    if (result.success) {
      setCurrentParsed(result.variable);
      setErrorMessage(null);
    } else {
      setErrorMessage(result.error);
    }
  };

  const handlePreset = (code: string) => {
    setInputCode(code);
    handleExecute(code);
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
            Interactive Experience 1
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Variable Lab: Live Name & Object Inspector
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Live Interpreter
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Type an assignment statement below or click a preset to see how Python evaluates the expression, binds the identifier name, and determines the object's data type.
      </p>

      {/* Preset Buttons */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '6px' }}>
          TRY PRESET ASSIGNMENTS:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handlePreset(p.code)}
              style={{
                padding: '4px 10px',
                background: 'var(--ds-bg-surface-elevated)',
                border: '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                fontSize: '0.75rem',
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-text-primary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Input Row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 280px' }}>
          <TextInput
            id="variable-lab-input"
            labelText="Python Assignment Statement"
            hideLabel
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleExecute(inputCode);
            }}
            placeholder="e.g. age = 21, cgpa = 8.7, name = 'Aisha'"
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.9375rem',
            }}
          />
        </div>
        <Button
          size="md"
          kind="primary"
          renderIcon={PlayFilledAlt}
          onClick={() => handleExecute(inputCode)}
        >
          Evaluate
        </Button>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div
          style={{
            padding: '10px 14px',
            background: 'rgba(218, 30, 40, 0.1)',
            border: '1px solid #da1e28',
            borderRadius: '4px',
            fontSize: '0.8125rem',
            color: '#da1e28',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Information size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Live Object Inspector Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentParsed.name}-${currentParsed.rawValue}-${currentParsed.type}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
              MEMORY STATE INSPECTION
            </div>
            <Tag type={currentParsed.badgeType} size="md">
              {currentParsed.typeLabel}
            </Tag>
          </div>

          {/* Visual Binding Arrow Display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'var(--ds-bg-surface)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Variable Name (Identifier) */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                VARIABLE NAME (LABEL)
              </div>
              <div
                style={{
                  padding: '8px 16px',
                  background: 'var(--ds-cyan-dim)',
                  border: '1.5px solid var(--ds-cyan)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--ds-cyan)',
                }}
              >
                {currentParsed.name}
              </div>
            </div>

            {/* Binding Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--ds-text-muted)' }}>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', textTransform: 'uppercase' }}>
                points to
              </span>
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>➔</span>
            </div>

            {/* Object in Memory */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                OBJECT VALUE IN HEAP MEMORY
              </div>
              <div
                style={{
                  padding: '8px 18px',
                  background: 'var(--ds-bg-surface-elevated)',
                  border: '1.5px solid var(--ds-border-strong)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--ds-text-primary)',
                }}
              >
                {currentParsed.formattedValue}
              </div>
            </div>
          </div>

          {/* Description Snippet */}
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
            <strong style={{ color: 'var(--ds-text-primary)' }}>Python Type Analysis:</strong>{' '}
            {currentParsed.description}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
