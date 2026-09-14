'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Code,
  StringText,
  Help,
  Information,
  CheckmarkFilled,
  Terminal,
} from '@carbon/icons-react';

interface KeyMetadata {
  key: string;
  rawValue: any;
  jsonType: 'string' | 'number' | 'boolean' | 'object' | 'array';
  pythonType: string;
  explanation: string;
  pythonSyntax: string;
}

const jsonCatalog: Record<string, KeyMetadata> = {
  city: {
    key: 'city',
    rawValue: '"Belagavi"',
    jsonType: 'string',
    pythonType: 'str (String)',
    explanation: 'Text enclosed in double quotes. Maps directly to a Python string.',
    pythonSyntax: 'data["city"]',
  },
  temperature: {
    key: 'temperature',
    rawValue: 28.2,
    jsonType: 'number',
    pythonType: 'float (Floating-Point Number)',
    explanation: 'Numeric measurement without quotes. Can be used immediately in mathematical calculations or NumPy operations.',
    pythonSyntax: 'data["temperature"]',
  },
  humidity: {
    key: 'humidity',
    rawValue: 72,
    jsonType: 'number',
    pythonType: 'int (Integer)',
    explanation: 'Whole number representing relative atmospheric humidity percentage.',
    pythonSyntax: 'data["humidity"]',
  },
  condition: {
    key: 'condition',
    rawValue: '"Cloudy"',
    jsonType: 'string',
    pythonType: 'str (String)',
    explanation: 'Categorical weather description.',
    pythonSyntax: 'data["condition"]',
  },
  is_raining: {
    key: 'is_raining',
    rawValue: false,
    jsonType: 'boolean',
    pythonType: 'bool (Boolean: False)',
    explanation: 'JSON lowercase `false` automatically becomes capitalized `False` in Python.',
    pythonSyntax: 'data["is_raining"]',
  },
  coordinates: {
    key: 'coordinates',
    rawValue: '{ "lat": 15.85, "lon": 74.50 }',
    jsonType: 'object',
    pythonType: 'dict (Nested Dictionary)',
    explanation: 'Nested JSON object with curly braces becomes a nested Python dictionary.',
    pythonSyntax: 'data["coordinates"]["lat"]',
  },
};

export function JsonExplorer() {
  const [selectedKey, setSelectedKey] = useState<string>('temperature');
  const activeMeta = jsonCatalog[selectedKey];

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
            JSON Explorer: Keys, Values & Python Type Bridge
          </h3>
        </div>
        <Tag type="purple" size="md">
          Data Structure Inspector
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Click any <strong>key</strong> inside the JSON response below to inspect its data type, value, and the exact Python dictionary code required to extract it into your script.
      </p>

      {/* 2-Column Inspector Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Clickable JSON Viewer */}
        <div
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '0.625rem 1rem',
              background: 'var(--cds-layer-02)',
              borderBottom: '1px solid var(--ds-border-subtle)',
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>payload.json</span>
            <span style={{ color: 'var(--ds-cyan)' }}>Click keys to inspect ▾</span>
          </div>

          <div
            style={{
              padding: '1.25rem',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              lineHeight: 2,
              background: 'var(--cds-field-01)',
            }}
          >
            <div style={{ color: 'var(--ds-text-muted)' }}>{'{'}</div>

            {Object.keys(jsonCatalog).map((k) => {
              const item = jsonCatalog[k];
              const isSelected = selectedKey === k;

              return (
                <div
                  key={k}
                  style={{
                    paddingLeft: '1.5rem',
                    background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
                    borderLeft: isSelected ? '3px solid var(--ds-cyan)' : '3px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    borderRadius: '0 4px 4px 0',
                  }}
                  onClick={() => setSelectedKey(k)}
                >
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.875rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'var(--ds-cyan)' : '#78a9ff',
                      textDecoration: isSelected ? 'underline' : 'none',
                    }}
                  >
                    &quot;{k}&quot;
                  </button>
                  <span style={{ color: 'var(--ds-text-muted)', margin: '0 6px' }}>:</span>
                  <span
                    style={{
                      color:
                        item.jsonType === 'number'
                          ? '#42be65'
                          : item.jsonType === 'boolean'
                          ? '#ff7eb6'
                          : item.jsonType === 'string'
                          ? '#fa4d56'
                          : 'var(--ds-text-primary)',
                    }}
                  >
                    {String(item.rawValue)}
                  </span>
                  <span style={{ color: 'var(--ds-text-muted)' }}>,</span>
                </div>
              );
            })}

            <div style={{ color: 'var(--ds-text-muted)' }}>{'}'}</div>
          </div>
        </div>

        {/* Right Column: Key Details & Python Bridge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMeta.key}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'var(--cds-layer-01)',
              border: '1px solid var(--ds-border-strong)',
              borderRadius: '4px',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                Key Inspector
              </span>
              <Tag
                type={
                  activeMeta.jsonType === 'number'
                    ? 'green'
                    : activeMeta.jsonType === 'boolean'
                    ? 'magenta'
                    : activeMeta.jsonType === 'string'
                    ? 'red'
                    : 'purple'
                }
                size="sm"
              >
                JSON: {activeMeta.jsonType}
              </Tag>
            </div>

            {/* Key and Value Row */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
                Selected Key
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>
                &quot;{activeMeta.key}&quot;
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
                Extracted Value
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)' }}>
                {String(activeMeta.rawValue)}
              </div>
            </div>

            {/* Python Data Type */}
            <div
              style={{
                padding: '0.875rem 1rem',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                marginBottom: '1.25rem',
                borderLeft: '3px solid var(--ds-purple)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-purple)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
                Python Representation (Module 1 Connection)
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                {activeMeta.pythonType}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                {activeMeta.explanation}
              </p>
            </div>

            {/* Python Extraction Code */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                How to Access in Python
              </div>
              <div
                style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--cds-field-01)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  color: 'var(--ds-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid var(--ds-border-subtle)',
                }}
              >
                <span>{activeMeta.pythonSyntax}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--ds-emerald)' }}>→ {String(activeMeta.rawValue)}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
