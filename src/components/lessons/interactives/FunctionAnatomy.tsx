'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  Code,
  Information,
  ArrowRight,
} from '@carbon/icons-react';

interface AnatomyToken {
  id: string;
  tokenText: string;
  role: string;
  tagColor: 'cyan' | 'purple' | 'teal' | 'blue' | 'green';
  description: string;
  codeSnippet: string;
}

const tokens: AnatomyToken[] = [
  {
    id: 'def',
    tokenText: 'def',
    role: 'Keyword: Definition Statement',
    tagColor: 'purple',
    description:
      'The "def" keyword instructs Python\'s compiler that a new function definition is starting. It registers the name in the current scope without executing the body yet.',
    codeSnippet: 'def greet(name):\n    print(f"Hello, {name}!")',
  },
  {
    id: 'name',
    tokenText: 'greet',
    role: 'Function Identifier (Name)',
    tagColor: 'cyan',
    description:
      'The function name (written in snake_case per PEP 8). This is the identifier used whenever you call or reference this function later.',
    codeSnippet: 'def greet(name):\n    ...',
  },
  {
    id: 'params',
    tokenText: '(name)',
    role: 'Parameter List (Input Slots)',
    tagColor: 'teal',
    description:
      'Parentheses enclose the parameter placeholders. When the function is called, incoming arguments fill these named variables.',
    codeSnippet: 'def greet(name):\n    # name is the parameter placeholder',
  },
  {
    id: 'colon',
    tokenText: ':',
    role: 'Colon: Block Delimiter',
    tagColor: 'blue',
    description:
      'The colon terminates the header line and indicates that an indented code block follows. Forgetting the colon raises a SyntaxError.',
    codeSnippet: 'def greet(name):\n#                ^ mandatory colon',
  },
  {
    id: 'body',
    tokenText: 'print(f"Hello, {name}!")',
    role: 'Function Body (4-Space Indented Block)',
    tagColor: 'green',
    description:
      'The indented block containing the instructions to execute when the function is called. Python uses 4-space indentation to determine what code belongs inside the function.',
    codeSnippet: 'def greet(name):\n    print(f"Hello, {name}!") # 4-space indent',
  },
];

export function FunctionAnatomy() {
  const [selectedTokenId, setSelectedTokenId] = useState<string>('def');

  const activeToken = tokens.find((t) => t.id === selectedTokenId) || tokens[0];

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
            Function Anatomy Explorer
          </h3>
        </div>
        <Tag type="purple" size="md">
          Syntax Dissector
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Every Python function is built from 5 distinct syntactic components. Click any part of the code below to inspect its role and rules:
      </p>

      {/* Interactive Code Line Dissector */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          border: '1px solid var(--ds-border-subtle)',
          borderRadius: '4px',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '1.125rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          {/* def */}
          <button
            type="button"
            onClick={() => setSelectedTokenId('def')}
            style={{
              background: selectedTokenId === 'def' ? 'rgba(165, 110, 255, 0.25)' : 'transparent',
              border: selectedTokenId === 'def' ? '1.5px solid var(--ds-purple)' : '1px solid transparent',
              borderRadius: '3px',
              padding: '4px 8px',
              color: 'var(--ds-purple)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            def
          </button>

          {/* greet */}
          <button
            type="button"
            onClick={() => setSelectedTokenId('name')}
            style={{
              background: selectedTokenId === 'name' ? 'var(--ds-cyan-dim)' : 'transparent',
              border: selectedTokenId === 'name' ? '1.5px solid var(--ds-cyan)' : '1px solid transparent',
              borderRadius: '3px',
              padding: '4px 8px',
              color: 'var(--ds-cyan)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            greet
          </button>

          {/* (name) */}
          <button
            type="button"
            onClick={() => setSelectedTokenId('params')}
            style={{
              background: selectedTokenId === 'params' ? 'var(--ds-teal-dim)' : 'transparent',
              border: selectedTokenId === 'params' ? '1.5px solid var(--ds-teal)' : '1px solid transparent',
              borderRadius: '3px',
              padding: '4px 8px',
              color: 'var(--ds-teal)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            (name)
          </button>

          {/* : */}
          <button
            type="button"
            onClick={() => setSelectedTokenId('colon')}
            style={{
              background: selectedTokenId === 'colon' ? 'rgba(69, 137, 245, 0.25)' : 'transparent',
              border: selectedTokenId === 'colon' ? '1.5px solid #4589f5' : '1px solid transparent',
              borderRadius: '3px',
              padding: '4px 8px',
              color: '#4589f5',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            :
          </button>
        </div>

        {/* Function Body */}
        <div style={{ paddingLeft: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setSelectedTokenId('body')}
            style={{
              background: selectedTokenId === 'body' ? 'var(--ds-emerald-dim)' : 'transparent',
              border: selectedTokenId === 'body' ? '1.5px solid var(--ds-emerald)' : '1px solid transparent',
              borderRadius: '3px',
              padding: '4px 10px',
              color: 'var(--ds-emerald)',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            print(f"Hello, &#123;name&#125;!")
          </button>
        </div>
      </div>

      {/* Live Dissected Explanation Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeToken.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface)',
            border: '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
              <code>{activeToken.tokenText}</code> — {activeToken.role}
            </div>
            <Tag type={activeToken.tagColor} size="sm">
              Component: {activeToken.id}
            </Tag>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: 0, lineHeight: 1.5 }}>
            {activeToken.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
