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

export function ScopeVisualizer() {
  const [isInsideFunction, setIsInsideFunction] = useState<boolean>(false);

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
            Interactive Experience 7
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Scope & Variable Isolation Visualizer
          </h3>
        </div>
        <Tag type="blue" size="md">
          Scope Isolation
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Variables assigned inside a function exist inside its <strong>Local Scope</strong>. They do not overwrite variables with the same name in the <strong>Global Scope</strong>. Toggle function execution below:
      </p>

      {/* 2-Zone Scope Canvas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Global Scope Zone */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '2px solid var(--ds-cyan)',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 700 }}>
              GLOBAL / MODULE SCOPE
            </span>
            <Tag type="cyan" size="sm">Persistent</Tag>
          </div>

          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', color: 'var(--ds-text-primary)', padding: '8px 12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', marginBottom: '10px' }}>
            score = <strong style={{ color: 'var(--ds-cyan)' }}>50</strong>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', margin: 0 }}>
            Outer script variable. Stays 50 regardless of internal local reassignments.
          </p>
        </div>

        {/* Local Scope Zone */}
        <div
          style={{
            padding: '1.25rem',
            background: isInsideFunction ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface)',
            border: isInsideFunction ? '2px solid var(--ds-purple)' : '1px dashed var(--ds-border-subtle)',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: isInsideFunction ? 'var(--ds-purple)' : 'var(--ds-text-muted)', fontWeight: 700 }}>
              FUNCTION LOCAL STACK FRAME
            </span>
            <Tag type={isInsideFunction ? 'purple' : 'cool-gray'} size="sm">
              {isInsideFunction ? 'Active Frame' : 'Frame Inactive'}
            </Tag>
          </div>

          <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', color: isInsideFunction ? 'var(--ds-text-primary)' : 'var(--ds-text-muted)', padding: '8px 12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', marginBottom: '10px' }}>
            {isInsideFunction ? (
              <span>score = <strong style={{ color: 'var(--ds-purple)' }}>90</strong> (Local)</span>
            ) : (
              <span style={{ fontStyle: 'italic' }}>Frame popped. No local variables.</span>
            )}
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', margin: 0 }}>
            {isInsideFunction
              ? 'Local variable score (90) exists only during function execution.'
              : 'When the function completes, its local frame is destroyed.'}
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button
          size="md"
          kind="primary"
          renderIcon={isInsideFunction ? Restart : ArrowRight}
          onClick={() => setIsInsideFunction(!isInsideFunction)}
        >
          {isInsideFunction ? 'Return from calculate() (Pop Frame)' : 'Call calculate() (Push Local Frame)'}
        </Button>
      </div>
    </div>
  );
}
